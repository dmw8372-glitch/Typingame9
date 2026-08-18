import { supabase } from "./supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Region } from "../types";

export type MultiplayerLevel = "sido" | "sigungu" | "japan" | "usa" | "china" | "vietnam" | "germany" | "france" | "italy" | "spain" | "uk" | "world";
export type MultiplayerGameType = "typing" | "quiz";

export interface PlayerState {
  id: string;
  nickname: string;
  isHost: boolean;
  isReady: boolean;
  currentIndex: number;
  totalStations: number;
  cpm: number;
  accuracy: number;
  finished: boolean;
  finishTime?: number;
  stations?: Region[]; // Individual course path (for quiz mode or custom courses)
  score?: number; // Quiz correct count
  colorIndex?: number; // Distinct index (0..5) for map path rendering
}

export interface RoomState {
  roomCode: string;
  roomName: string;
  level: MultiplayerLevel;
  gameType?: MultiplayerGameType;
  targetCount: number;
  isStarted: boolean;
  isPublic: boolean;
  password?: string;
  stations: Region[];
  players: Record<string, PlayerState>;
}

export interface PublicRoomInfo {
  roomCode: string;
  roomName: string;
  hostNickname: string;
  level: MultiplayerLevel;
  gameType?: MultiplayerGameType;
  targetCount: number;
  playerCount: number;
  isStarted: boolean;
  isPublic: boolean;
  hasPassword?: boolean;
  password?: string;
  lastSeen: number;
}

export class LobbyTracker {
  private channel: RealtimeChannel | null = null;
  private bc: BroadcastChannel | null = null;
  private roomsMap: Map<string, PublicRoomInfo> = new Map();
  private onRoomsUpdateCallback?: (rooms: PublicRoomInfo[]) => void;
  private cleanupTimer: any = null;

  constructor(onRoomsUpdate: (rooms: PublicRoomInfo[]) => void) {
    this.onRoomsUpdateCallback = onRoomsUpdate;
  }

  public init() {
    // 1. Setup local BroadcastChannel for same-browser multi-tab discovery
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        this.bc = new BroadcastChannel("global_lobby_bc");
        this.bc.onmessage = (msg) => {
          if (msg.data && msg.data.type === "room_announce" && msg.data.payload) {
            this.handleAnnounce(msg.data.payload);
          }
        };
      } catch (e) {
        console.warn("Lobby BC init error:", e);
      }
    }

    // 2. Setup Supabase Realtime channel for global cross-device lobby discovery
    try {
      this.channel = supabase.channel("global_lobby_discovery");
      this.channel
        .on("broadcast", { event: "room_announce" }, (p) => {
          if (p.payload) {
            this.handleAnnounce(p.payload);
          }
        })
        .subscribe();
    } catch (err) {
      console.warn("Lobby Supabase channel error:", err);
    }

    // Cleanup stale rooms or empty rooms (playerCount <= 0 or heartbeated > 5s ago)
    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      let changed = false;
      this.roomsMap.forEach((room, code) => {
        if (now - room.lastSeen > 5000 || room.playerCount <= 0) {
          this.roomsMap.delete(code);
          changed = true;
        }
      });
      if (changed) {
        this.notify();
      }
    }, 1500);
  }

  private handleAnnounce(payload: PublicRoomInfo) {
    if (!payload || !payload.roomCode) return;
    if (payload.playerCount <= 0) {
      if (this.roomsMap.has(payload.roomCode)) {
        this.roomsMap.delete(payload.roomCode);
        this.notify();
      }
      return;
    }
    this.roomsMap.set(payload.roomCode, {
      ...payload,
      lastSeen: Date.now(),
    });
    this.notify();
  }

  private notify() {
    if (this.onRoomsUpdateCallback) {
      const list = Array.from(this.roomsMap.values()).sort((a, b) => b.lastSeen - a.lastSeen);
      this.onRoomsUpdateCallback(list);
    }
  }

  public destroy() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    if (this.channel) {
      try {
        this.channel.unsubscribe();
      } catch (e) {}
      this.channel = null;
    }
    if (this.bc) {
      try {
        this.bc.close();
      } catch (e) {}
      this.bc = null;
    }
  }
}

export class MultiplayerRoom {
  private channel: RealtimeChannel | null = null;
  private bc: BroadcastChannel | null = null;
  private lobbyChannel: RealtimeChannel | null = null;
  private lobbyBc: BroadcastChannel | null = null;

  private roomCode: string;
  private myPlayerId: string;
  private myNickname: string;
  private isHost: boolean = false;

  private onRoomUpdateCallback?: (room: RoomState) => void;
  private onGameStartCallback?: (stations: Region[], gameType?: MultiplayerGameType) => void;

  private currentState: RoomState;

  constructor(
    roomCode: string,
    nickname: string,
    isHost: boolean,
    roomName?: string,
    isPublic: boolean = true,
    password?: string,
    gameType: MultiplayerGameType = "typing"
  ) {
    this.roomCode = (roomCode || "").toUpperCase().trim().replace(/^ROOM-?/i, "");
    this.myNickname = (nickname || "").trim() || "무명 운행사";
    this.myPlayerId = "player_" + Math.random().toString(36).substring(2, 9);
    this.isHost = isHost;

    this.currentState = {
      roomCode: this.roomCode,
      roomName: roomName || `${this.myNickname}의 ${gameType === "quiz" ? "퀴즈 대전방" : "타이핑 대전방"}`,
      level: "sido",
      gameType: gameType,
      targetCount: gameType === "quiz" ? 10 : 20,
      isStarted: false,
      isPublic: isPublic,
      password: password,
      stations: [],
      players: {
        [this.myPlayerId]: {
          id: this.myPlayerId,
          nickname: this.myNickname,
          isHost,
          isReady: isHost,
          currentIndex: 0,
          totalStations: gameType === "quiz" ? 10 : 20,
          cpm: 0,
          accuracy: 100,
          finished: false,
          colorIndex: 0,
        },
      },
    };
  }

  private heartbeatTimer: any = null;
  private syncRetryTimer: any = null;
  private lobbyAnnounceTimer: any = null;

  private handleIncomingEvent(event: string, payload: any) {
    if (!payload) return;

    try {
      if (event === "request_sync") {
        if (payload.playerId) {
          const { playerId, nickname } = payload;
          this.currentState.players = this.currentState.players || {};
          const existing = this.currentState.players[playerId];
          const assignedColorIndex = Object.keys(this.currentState.players).length % 6;
          
          this.currentState.players[playerId] = {
            id: playerId,
            nickname: nickname || "무명 운행사",
            isHost: existing ? existing.isHost : false,
            isReady: true,
            currentIndex: existing ? existing.currentIndex : 0,
            totalStations: this.currentState.targetCount || 20,
            cpm: existing ? existing.cpm : 0,
            accuracy: existing ? existing.accuracy : 100,
            finished: existing ? existing.finished : false,
            finishTime: existing ? existing.finishTime : undefined,
            stations: existing ? existing.stations : undefined,
            score: existing ? existing.score : 0,
            colorIndex: existing?.colorIndex !== undefined ? existing.colorIndex : assignedColorIndex,
          };

          if (this.onRoomUpdateCallback) {
            this.onRoomUpdateCallback({ ...this.currentState });
          }

          if (this.isHost) {
            this.broadcastState();
          }
        }
      } else if (event === "room_sync") {
        const incomingRoom: RoomState = payload;
        if (!incomingRoom || !incomingRoom.players) return;

        if (this.isHost) {
          const mergedPlayers = { ...this.currentState.players };
          Object.values(incomingRoom.players || {}).forEach((p: PlayerState) => {
            if (p && p.id && p.id !== this.myPlayerId) {
              mergedPlayers[p.id] = {
                ...(mergedPlayers[p.id] || {}),
                ...p,
                isHost: false,
              };
            }
          });
          this.currentState.players = mergedPlayers;
          if (this.currentState.players[this.myPlayerId]) {
            this.currentState.players[this.myPlayerId].isHost = true;
          }
        } else {
          const mergedPlayers = { ...(incomingRoom.players || {}) };
          if (this.currentState.players[this.myPlayerId]) {
            mergedPlayers[this.myPlayerId] = {
              ...(incomingRoom.players[this.myPlayerId] || this.currentState.players[this.myPlayerId]),
              isHost: false,
            };
          }
          this.currentState = {
            ...incomingRoom,
            players: mergedPlayers,
          };
        }

        if (this.onRoomUpdateCallback) {
          this.onRoomUpdateCallback({ ...this.currentState });
        }
      } else if (event === "player_progress") {
        const { playerId, currentIndex, cpm, accuracy, finished, finishTime, stations, score } = payload;
        if (playerId && this.currentState.players) {
          if (!this.currentState.players[playerId]) {
            const assignedColorIndex = Object.keys(this.currentState.players).length % 6;
            this.currentState.players[playerId] = {
              id: playerId,
              nickname: payload.nickname || "무명 운행사",
              isHost: false,
              isReady: true,
              currentIndex: currentIndex ?? 0,
              totalStations: this.currentState.targetCount || 20,
              cpm: cpm ?? 0,
              accuracy: accuracy ?? 100,
              finished: !!finished,
              finishTime,
              stations: stations,
              score: score ?? 0,
              colorIndex: assignedColorIndex,
            };
          } else {
            this.currentState.players[playerId].currentIndex = currentIndex ?? 0;
            this.currentState.players[playerId].cpm = cpm ?? 0;
            this.currentState.players[playerId].accuracy = accuracy ?? 100;
            this.currentState.players[playerId].finished = !!finished;
            if (finishTime) {
              this.currentState.players[playerId].finishTime = finishTime;
            }
            if (stations && Array.isArray(stations) && stations.length > 0) {
              this.currentState.players[playerId].stations = stations;
            }
            if (score !== undefined) {
              this.currentState.players[playerId].score = score;
            }
          }

          if (this.onRoomUpdateCallback) {
            this.onRoomUpdateCallback({ ...this.currentState });
          }
        }
      } else if (event === "start_game") {
        const gameType = payload.gameType || "typing";
        this.currentState.isStarted = true;
        this.currentState.gameType = gameType;
        if (payload.stations && Array.isArray(payload.stations)) {
          this.currentState.stations = payload.stations;
        }
        if (this.onGameStartCallback) {
          this.onGameStartCallback(payload.stations || [], gameType);
        }
        if (this.onRoomUpdateCallback) {
          this.onRoomUpdateCallback({ ...this.currentState });
        }
      }
    } catch (err) {
      console.warn("Error handling incoming multiplayer message:", err);
    }
  }

  private postToBroadcastChannel(event: string, payload: any) {
    if (this.bc) {
      try {
        this.bc.postMessage({ type: event, payload, senderId: this.myPlayerId });
      } catch (e) {
        console.warn("BroadcastChannel post error:", e);
      }
    }
  }

  private announceToLobby() {
    if (!this.isHost) return;

    const info: PublicRoomInfo = {
      roomCode: this.currentState.roomCode,
      roomName: this.currentState.roomName,
      hostNickname: this.myNickname,
      level: this.currentState.level,
      gameType: this.currentState.gameType || "typing",
      targetCount: this.currentState.targetCount,
      playerCount: Object.keys(this.currentState.players || {}).length,
      isStarted: this.currentState.isStarted,
      isPublic: this.currentState.isPublic,
      hasPassword: !!this.currentState.password,
      password: this.currentState.password,
      lastSeen: Date.now(),
    };

    // Broadcast to global lobby via Supabase
    try {
      if (!this.lobbyChannel) {
        this.lobbyChannel = supabase.channel("global_lobby_discovery");
        this.lobbyChannel.subscribe();
      }
      this.lobbyChannel.send({
        type: "broadcast",
        event: "room_announce",
        payload: info,
      });
    } catch (e) {
      console.warn("Lobby announce error:", e);
    }

    // Broadcast to global lobby via local BroadcastChannel
    try {
      if (!this.lobbyBc && typeof window !== "undefined" && "BroadcastChannel" in window) {
        this.lobbyBc = new BroadcastChannel("global_lobby_bc");
      }
      this.lobbyBc?.postMessage({
        type: "room_announce",
        payload: info,
      });
    } catch (e) {
      console.warn("Lobby BC announce error:", e);
    }
  }

  public init(
    onRoomUpdate: (room: RoomState) => void,
    onGameStart: (stations: Region[], gameType?: MultiplayerGameType) => void
  ) {
    this.onRoomUpdateCallback = onRoomUpdate;
    this.onGameStartCallback = onGameStart;

    // 1. Setup local BroadcastChannel for instant cross-tab / local testing
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        this.bc = new BroadcastChannel(`room_bc_${this.roomCode}`);
        this.bc.onmessage = (msg) => {
          if (msg.data && msg.data.senderId !== this.myPlayerId) {
            this.handleIncomingEvent(msg.data.type, msg.data.payload);
          }
        };
      } catch (e) {
        console.warn("BroadcastChannel init error:", e);
      }
    }

    // 2. Join Supabase Broadcast & Presence channel safely
    try {
      this.channel = supabase.channel(`room_${this.roomCode}`, {
        config: {
          presence: {
            key: this.myPlayerId,
          },
        },
      });

      this.channel
        .on("broadcast", { event: "request_sync" }, (p) => this.handleIncomingEvent("request_sync", p.payload))
        .on("broadcast", { event: "room_sync" }, (p) => this.handleIncomingEvent("room_sync", p.payload))
        .on("broadcast", { event: "player_progress" }, (p) => this.handleIncomingEvent("player_progress", p.payload))
        .on("broadcast", { event: "start_game" }, (p) => this.handleIncomingEvent("start_game", p.payload))
        .on("presence", { event: "sync" }, () => {
          try {
            const state = this.channel?.presenceState();
            if (state) {
              let updated = false;
              Object.keys(state).forEach((key) => {
                const presence = state[key]?.[0] as any;
                if (presence && presence.nickname) {
                  this.currentState.players = this.currentState.players || {};
                  if (!this.currentState.players[key]) {
                    const isThisPlayerHost = key === this.myPlayerId ? this.isHost : false;
                    this.currentState.players[key] = {
                      id: key,
                      nickname: presence.nickname,
                      isHost: isThisPlayerHost,
                      isReady: true,
                      currentIndex: 0,
                      totalStations: this.currentState.targetCount || 20,
                      cpm: 0,
                      accuracy: 100,
                      finished: false,
                    };
                    updated = true;
                  }
                }
              });
              if (updated && this.isHost) {
                this.broadcastState();
                this.announceToLobby();
              } else if (updated && this.onRoomUpdateCallback) {
                this.onRoomUpdateCallback({ ...this.currentState });
              }
            }
          } catch (pe) {
            console.warn("Presence sync error:", pe);
          }
        });

      this.channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          try {
            await this.channel?.track({
              id: this.myPlayerId,
              nickname: this.myNickname,
              isHost: this.isHost,
            });
          } catch (e) {
            console.warn("Presence track error:", e);
          }

          if (this.isHost) {
            this.broadcastState();
            this.announceToLobby();

            // Start Host periodic heartbeat so new guests always get state immediately & lobby is updated
            if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = setInterval(() => {
              this.broadcastState();
              this.announceToLobby();
            }, 1500);
          } else {
            const sendRequestSync = () => {
              try {
                this.channel?.send({
                  type: "broadcast",
                  event: "request_sync",
                  payload: { playerId: this.myPlayerId, nickname: this.myNickname },
                });
              } catch (e) {
                console.warn("Send request_sync error:", e);
              }
              this.postToBroadcastChannel("request_sync", { playerId: this.myPlayerId, nickname: this.myNickname });
            };

            sendRequestSync();
            // Retry sending sync request a few times in case host was still connecting
            let retryCount = 0;
            if (this.syncRetryTimer) clearInterval(this.syncRetryTimer);
            this.syncRetryTimer = setInterval(() => {
              retryCount++;
              if (retryCount >= 5) {
                clearInterval(this.syncRetryTimer);
                return;
              }
              sendRequestSync();
            }, 1000);
          }
        }
      });
    } catch (err) {
      console.warn("Supabase channel subscribe error:", err);
    }

    if (this.onRoomUpdateCallback) {
      this.onRoomUpdateCallback(this.currentState);
    }
  }

  public updateRoomConfig(
    level: MultiplayerLevel,
    targetCount: number,
    isPublic?: boolean,
    roomName?: string,
    gameType?: MultiplayerGameType
  ) {
    if (!this.isHost) return;
    this.currentState.level = level;
    this.currentState.targetCount = targetCount;
    if (isPublic !== undefined) this.currentState.isPublic = isPublic;
    if (roomName !== undefined) this.currentState.roomName = roomName;
    if (gameType !== undefined) this.currentState.gameType = gameType;

    this.currentState.players = this.currentState.players || {};
    Object.keys(this.currentState.players).forEach((p) => {
      if (this.currentState.players[p]) {
        this.currentState.players[p].totalStations = targetCount;
      }
    });
    this.broadcastState();
    this.announceToLobby();
  }

  public startGame(stations: Region[], gameType: MultiplayerGameType = "typing") {
    if (!this.isHost) return;
    this.currentState.isStarted = true;
    this.currentState.gameType = gameType;
    this.currentState.stations = stations;

    try {
      this.channel?.send({
        type: "broadcast",
        event: "start_game",
        payload: { stations, gameType },
      });
    } catch (e) {
      console.warn("Send start_game error:", e);
    }
    this.postToBroadcastChannel("start_game", { stations, gameType });

    this.broadcastState();
    this.announceToLobby();
  }

  public resetToLobby() {
    this.currentState.isStarted = false;
    this.currentState.stations = [];
    if (this.currentState.players) {
      Object.keys(this.currentState.players).forEach((id) => {
        if (this.currentState.players[id]) {
          this.currentState.players[id].currentIndex = 0;
          this.currentState.players[id].finished = false;
          this.currentState.players[id].finishTime = undefined;
          this.currentState.players[id].cpm = 0;
          this.currentState.players[id].accuracy = 100;
          this.currentState.players[id].stations = undefined;
          this.currentState.players[id].score = 0;
        }
      });
    }
    this.broadcastState();
    this.announceToLobby();
    if (this.onRoomUpdateCallback) {
      this.onRoomUpdateCallback({ ...this.currentState });
    }
  }

  public updateProgress(
    currentIndex: number,
    cpm: number,
    accuracy: number,
    finished: boolean,
    finishTime?: number,
    stations?: Region[],
    score?: number
  ) {
    if (this.currentState.players[this.myPlayerId]) {
      this.currentState.players[this.myPlayerId].currentIndex = currentIndex;
      this.currentState.players[this.myPlayerId].cpm = cpm;
      this.currentState.players[this.myPlayerId].accuracy = accuracy;
      this.currentState.players[this.myPlayerId].finished = finished;
      if (finishTime) {
        this.currentState.players[this.myPlayerId].finishTime = finishTime;
      }
      if (stations && Array.isArray(stations) && stations.length > 0) {
        this.currentState.players[this.myPlayerId].stations = stations;
      }
      if (score !== undefined) {
        this.currentState.players[this.myPlayerId].score = score;
      }
    }

    const payload = {
      playerId: this.myPlayerId,
      nickname: this.myNickname,
      currentIndex,
      cpm,
      accuracy,
      finished,
      finishTime,
      stations,
      score,
    };

    try {
      this.channel?.send({
        type: "broadcast",
        event: "player_progress",
        payload,
      });
    } catch (e) {
      console.warn("Send player_progress error:", e);
    }
    this.postToBroadcastChannel("player_progress", payload);

    if (this.onRoomUpdateCallback) {
      this.onRoomUpdateCallback({ ...this.currentState });
    }
  }

  private broadcastState() {
    if (!this.isHost) return;
    try {
      this.channel?.send({
        type: "broadcast",
        event: "room_sync",
        payload: this.currentState,
      });
    } catch (e) {
      console.warn("Send room_sync error:", e);
    }
    this.postToBroadcastChannel("room_sync", this.currentState);
  }

  public leave() {
    // Send immediate room_announce with playerCount: 0 to remove room from lobby instantly
    try {
      const closeInfo: PublicRoomInfo = {
        roomCode: this.currentState.roomCode,
        roomName: this.currentState.roomName,
        hostNickname: this.myNickname,
        level: this.currentState.level,
        targetCount: this.currentState.targetCount,
        playerCount: 0,
        isStarted: false,
        isPublic: false,
        lastSeen: Date.now(),
      };
      if (!this.lobbyChannel) {
        this.lobbyChannel = supabase.channel("global_lobby_discovery");
      }
      this.lobbyChannel.send({
        type: "broadcast",
        event: "room_announce",
        payload: closeInfo,
      });

      if (!this.lobbyBc && typeof window !== "undefined" && "BroadcastChannel" in window) {
        this.lobbyBc = new BroadcastChannel("global_lobby_bc");
      }
      this.lobbyBc?.postMessage({
        type: "room_announce",
        payload: closeInfo,
      });
    } catch (e) {
      console.warn("Leave broadcast error:", e);
    }

    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.syncRetryTimer) {
      clearInterval(this.syncRetryTimer);
      this.syncRetryTimer = null;
    }
    if (this.lobbyAnnounceTimer) {
      clearInterval(this.lobbyAnnounceTimer);
      this.lobbyAnnounceTimer = null;
    }
    if (this.channel) {
      try {
        this.channel.unsubscribe();
      } catch (e) {
        console.warn("Unsubscribe error:", e);
      }
      this.channel = null;
    }
    if (this.lobbyChannel) {
      try {
        this.lobbyChannel.unsubscribe();
      } catch (e) {}
      this.lobbyChannel = null;
    }
    if (this.bc) {
      try {
        this.bc.close();
      } catch (e) {
        console.warn("BC close error:", e);
      }
      this.bc = null;
    }
    if (this.lobbyBc) {
      try {
        this.lobbyBc.close();
      } catch (e) {}
      this.lobbyBc = null;
    }
  }

  public getMyPlayerId() {
    return this.myPlayerId;
  }

  public getIsHost() {
    return this.isHost;
  }
}
