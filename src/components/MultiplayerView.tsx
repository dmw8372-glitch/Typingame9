import React, { useState, useEffect } from "react";
import { Users, Play, Copy, Check, ArrowLeft, Crown, Zap, Flag, RefreshCw, Lock, Globe, Shield, Search, KeyRound, X } from "lucide-react";
import { MultiplayerRoom, RoomState, PlayerState, LobbyTracker, PublicRoomInfo } from "../lib/multiplayer";
import { Region } from "../types";

export type ModeScope = "korea" | "japan" | "usa" | "china" | "vietnam" | "germany" | "france" | "italy" | "spain" | "uk" | "world" | "sido" | "sigungu";

export const getMultiplayerTheme = (scopeOrLevel?: string) => {
  if (scopeOrLevel === "uk") {
    return {
      primaryBtn: "bg-indigo-700 hover:bg-indigo-600 text-white shadow-md shadow-indigo-700/20",
      primaryBg: "bg-indigo-700",
      border: "border-indigo-200 dark:border-indigo-800/80",
      lightCardBg: "bg-gradient-to-br from-indigo-50 via-blue-50/50 to-sky-50 dark:from-indigo-950/40 dark:via-indigo-950/20 dark:to-blue-950/20 border-indigo-200/90 dark:border-indigo-800/80",
      badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      badgeIcon: "text-indigo-600 dark:text-indigo-400",
      accentText: "text-indigo-600 dark:text-indigo-400",
      focusRing: "focus:ring-indigo-500/20 focus:border-indigo-500",
      avatarBg: "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-200",
      activeTabBtn: "bg-indigo-700 text-white border-indigo-700 shadow-sm",
      modeActiveBtn: "bg-indigo-700 text-white border-indigo-800 shadow-md ring-2 ring-indigo-400/40",
      subCardBg: "bg-indigo-50/70 dark:bg-indigo-950/40",
      subCardBorder: "border-indigo-200/80 dark:border-indigo-800/80",
      subCardText: "text-indigo-900 dark:text-indigo-200",
      joinBtn: "bg-indigo-900 dark:bg-indigo-700 dark:hover:bg-indigo-600 hover:bg-indigo-800 text-white",
      progressBg: "bg-indigo-600",
    };
  }
  if (scopeOrLevel === "spain") {
    return {
      primaryBtn: "bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20",
      primaryBg: "bg-red-600",
      border: "border-red-200 dark:border-red-800/80",
      lightCardBg: "bg-gradient-to-br from-red-50 via-amber-50/50 to-orange-50 dark:from-red-950/40 dark:via-red-950/20 dark:to-amber-950/20 border-red-200/90 dark:border-red-800/80",
      badgeBg: "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
      badgeIcon: "text-red-600 dark:text-red-400",
      accentText: "text-red-600 dark:text-red-400",
      focusRing: "focus:ring-red-500/20 focus:border-red-500",
      avatarBg: "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-200",
      activeTabBtn: "bg-red-600 text-white border-red-600 shadow-sm",
      modeActiveBtn: "bg-red-600 text-white border-red-700 shadow-md ring-2 ring-red-400/40",
      subCardBg: "bg-red-50/70 dark:bg-red-950/40",
      subCardBorder: "border-red-200/80 dark:border-red-800/80",
      subCardText: "text-red-900 dark:text-red-200",
      joinBtn: "bg-red-900 dark:bg-red-700 dark:hover:bg-red-600 hover:bg-red-800 text-white",
      progressBg: "bg-red-500",
    };
  }
  if (scopeOrLevel === "italy") {
    return {
      primaryBtn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20",
      primaryBg: "bg-emerald-600",
      border: "border-emerald-200 dark:border-emerald-800/80",
      lightCardBg: "bg-gradient-to-br from-emerald-50 via-teal-50/50 to-green-50 dark:from-emerald-950/40 dark:via-emerald-950/20 dark:to-teal-950/20 border-emerald-200/90 dark:border-emerald-800/80",
      badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      badgeIcon: "text-emerald-600 dark:text-emerald-400",
      accentText: "text-emerald-600 dark:text-emerald-400",
      focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
      avatarBg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200",
      activeTabBtn: "bg-emerald-600 text-white border-emerald-600 shadow-sm",
      modeActiveBtn: "bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/40",
      subCardBg: "bg-emerald-50/70 dark:bg-emerald-950/40",
      subCardBorder: "border-emerald-200/80 dark:border-emerald-800/80",
      subCardText: "text-emerald-900 dark:text-emerald-200",
      joinBtn: "bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 hover:bg-emerald-800 text-white",
      progressBg: "bg-emerald-500",
    };
  }
  if (scopeOrLevel === "france") {
    return {
      primaryBtn: "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20",
      primaryBg: "bg-blue-600",
      border: "border-blue-200 dark:border-blue-800/80",
      lightCardBg: "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-sky-50 dark:from-blue-950/40 dark:via-blue-950/20 dark:to-indigo-950/20 border-blue-200/90 dark:border-blue-800/80",
      badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      badgeIcon: "text-blue-600 dark:text-blue-400",
      accentText: "text-blue-600 dark:text-blue-400",
      focusRing: "focus:ring-blue-500/20 focus:border-blue-500",
      avatarBg: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200",
      activeTabBtn: "bg-blue-600 text-white border-blue-600 shadow-sm",
      modeActiveBtn: "bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/40",
      subCardBg: "bg-blue-50/70 dark:bg-blue-950/40",
      subCardBorder: "border-blue-200/80 dark:border-blue-800/80",
      subCardText: "text-blue-900 dark:text-blue-200",
      joinBtn: "bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-800 text-white",
      progressBg: "bg-blue-500",
    };
  }
  if (scopeOrLevel === "germany") {
    return {
      primaryBtn: "bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-md shadow-yellow-500/20 font-black",
      primaryBg: "bg-yellow-500",
      border: "border-yellow-200 dark:border-yellow-800/80",
      lightCardBg: "bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50 dark:from-yellow-950/40 dark:via-yellow-950/20 dark:to-amber-950/20 border-yellow-200/90 dark:border-yellow-800/80",
      badgeBg: "bg-yellow-50 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
      badgeIcon: "text-yellow-600 dark:text-yellow-400",
      accentText: "text-yellow-700 dark:text-yellow-400",
      focusRing: "focus:ring-yellow-500/20 focus:border-yellow-500",
      avatarBg: "bg-yellow-100 dark:bg-yellow-950/80 text-yellow-900 dark:text-yellow-200",
      activeTabBtn: "bg-yellow-500 text-slate-950 border-yellow-500 shadow-sm font-black",
      modeActiveBtn: "bg-yellow-500 text-slate-950 font-black border-yellow-600 shadow-md ring-2 ring-yellow-400/40",
      subCardBg: "bg-yellow-50/70 dark:bg-yellow-950/40",
      subCardBorder: "border-yellow-200/80 dark:border-yellow-800/80",
      subCardText: "text-yellow-950 dark:text-yellow-200",
      joinBtn: "bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-600 hover:bg-yellow-500 text-white",
      progressBg: "bg-yellow-500",
    };
  }
  if (scopeOrLevel === "vietnam") {
    return {
      primaryBtn: "bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20",
      primaryBg: "bg-red-600",
      border: "border-red-200 dark:border-red-800/80",
      lightCardBg: "bg-gradient-to-br from-red-50 via-red-50/50 to-orange-50 dark:from-red-950/40 dark:via-red-950/20 dark:to-orange-950/20 border-red-200/90 dark:border-red-800/80",
      badgeBg: "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
      badgeIcon: "text-red-600 dark:text-red-400",
      accentText: "text-red-600 dark:text-red-400",
      focusRing: "focus:ring-red-500/20 focus:border-red-500",
      avatarBg: "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-200",
      activeTabBtn: "bg-red-600 text-white border-red-600 shadow-sm",
      modeActiveBtn: "bg-red-600 text-white border-red-700 shadow-md ring-2 ring-red-400/40",
      subCardBg: "bg-red-50/70 dark:bg-red-950/40",
      subCardBorder: "border-red-200/80 dark:border-red-800/80",
      subCardText: "text-red-900 dark:text-red-200",
      joinBtn: "bg-red-900 dark:bg-red-700 dark:hover:bg-red-600 hover:bg-red-800 text-white",
      progressBg: "bg-red-500",
    };
  }
  if (scopeOrLevel === "china") {
    return {
      primaryBtn: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-black",
      primaryBg: "bg-amber-500",
      border: "border-amber-200 dark:border-amber-800/80",
      lightCardBg: "bg-gradient-to-br from-amber-50 via-amber-50/50 to-yellow-50 dark:from-amber-950/40 dark:via-amber-950/20 dark:to-yellow-950/20 border-amber-200/90 dark:border-amber-800/80",
      badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      badgeIcon: "text-amber-600 dark:text-amber-400",
      accentText: "text-amber-700 dark:text-amber-400",
      focusRing: "focus:ring-amber-500/20 focus:border-amber-500",
      avatarBg: "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200",
      activeTabBtn: "bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black",
      modeActiveBtn: "bg-amber-500 text-slate-950 font-black border-amber-600 shadow-md ring-2 ring-amber-400/40",
      subCardBg: "bg-amber-50/70 dark:bg-amber-950/40",
      subCardBorder: "border-amber-200/80 dark:border-amber-800/80",
      subCardText: "text-amber-950 dark:text-amber-200",
      joinBtn: "bg-amber-600 dark:bg-amber-700 dark:hover:bg-amber-600 hover:bg-amber-500 text-white",
      progressBg: "bg-amber-500",
    };
  }
  if (scopeOrLevel === "japan") {
    return {
      primaryBtn: "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20",
      primaryBg: "bg-rose-600",
      border: "border-rose-200 dark:border-rose-800/80",
      lightCardBg: "bg-gradient-to-br from-rose-50 via-rose-50/50 to-pink-50 dark:from-rose-950/40 dark:via-rose-950/20 dark:to-pink-950/20 border-rose-200/90 dark:border-rose-800/80",
      badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
      badgeIcon: "text-rose-600 dark:text-rose-400",
      accentText: "text-rose-600 dark:text-rose-400",
      focusRing: "focus:ring-rose-500/20 focus:border-rose-500",
      avatarBg: "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200",
      activeTabBtn: "bg-rose-600 text-white border-rose-600 shadow-sm",
      modeActiveBtn: "bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-400/40",
      subCardBg: "bg-rose-50/70 dark:bg-rose-950/40",
      subCardBorder: "border-rose-200/80 dark:border-rose-800/80",
      subCardText: "text-rose-900 dark:text-rose-200",
      joinBtn: "bg-rose-900 dark:bg-rose-700 dark:hover:bg-rose-600 hover:bg-rose-800 text-white",
      progressBg: "bg-rose-500",
    };
  }
  if (scopeOrLevel === "usa") {
    return {
      primaryBtn: "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20",
      primaryBg: "bg-blue-600",
      border: "border-blue-200 dark:border-blue-800/80",
      lightCardBg: "bg-gradient-to-br from-blue-50 via-blue-50/50 to-indigo-50 dark:from-blue-950/40 dark:via-blue-950/20 dark:to-indigo-950/20 border-blue-200/90 dark:border-blue-800/80",
      badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      badgeIcon: "text-blue-600 dark:text-blue-400",
      accentText: "text-blue-600 dark:text-blue-400",
      focusRing: "focus:ring-blue-500/20 focus:border-blue-500",
      avatarBg: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200",
      activeTabBtn: "bg-blue-600 text-white border-blue-600 shadow-sm",
      modeActiveBtn: "bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/40",
      subCardBg: "bg-blue-50/70 dark:bg-blue-950/40",
      subCardBorder: "border-blue-200/80 dark:border-blue-800/80",
      subCardText: "text-blue-900 dark:text-blue-200",
      joinBtn: "bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-800 text-white",
      progressBg: "bg-blue-500",
    };
  }
  if (scopeOrLevel === "world") {
    return {
      primaryBtn: "bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white shadow-md shadow-slate-900/20",
      primaryBg: "bg-slate-800 dark:bg-slate-700",
      border: "border-slate-300 dark:border-slate-700",
      lightCardBg: "bg-gradient-to-br from-slate-100 via-slate-100/70 to-slate-200/80 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-900/40 border-slate-300 dark:border-slate-700",
      badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
      badgeIcon: "text-slate-700 dark:text-slate-300",
      accentText: "text-slate-700 dark:text-slate-300",
      focusRing: "focus:ring-slate-500/20 focus:border-slate-500",
      avatarBg: "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      activeTabBtn: "bg-slate-800 dark:bg-slate-700 text-white border-slate-800 dark:border-slate-700 shadow-sm",
      modeActiveBtn: "bg-slate-700 dark:bg-slate-600 text-white border-slate-800 dark:border-slate-500 shadow-md ring-2 ring-slate-400/40",
      subCardBg: "bg-slate-100 dark:bg-slate-800/60",
      subCardBorder: "border-slate-300 dark:border-slate-700",
      subCardText: "text-slate-800 dark:text-slate-200",
      joinBtn: "bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white",
      progressBg: "bg-slate-600",
    };
  }
  // Default Korea (emerald green)
  return {
    primaryBtn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20",
    primaryBg: "bg-emerald-600",
    border: "border-emerald-200 dark:border-emerald-800/80",
    lightCardBg: "bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-teal-50 dark:from-emerald-950/40 dark:via-emerald-950/20 dark:to-teal-950/20 border-emerald-200/90 dark:border-emerald-800/80",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    badgeIcon: "text-emerald-600 dark:text-emerald-400",
    accentText: "text-emerald-600 dark:text-emerald-400",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
    avatarBg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200",
    activeTabBtn: "bg-emerald-600 text-white border-emerald-600 shadow-sm",
    modeActiveBtn: "bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/40",
    subCardBg: "bg-emerald-50/70 dark:bg-emerald-950/40",
    subCardBorder: "border-emerald-200/80 dark:border-emerald-800/80",
    subCardText: "text-emerald-900 dark:text-emerald-200",
    joinBtn: "bg-slate-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 hover:bg-slate-800 text-white",
    progressBg: "bg-emerald-500",
  };
};

export interface AllRegionsData {
  sido: Region[];
  sigungu: Region[];
  japan?: Region[];
  usa?: Region[];
  china?: Region[];
  vietnam?: Region[];
  germany?: Region[];
  france?: Region[];
  italy?: Region[];
  spain?: Region[];
  uk?: Region[];
  world: Region[];
}

interface MultiplayerViewProps {
  nickname: string;
  onSetNickname: (nick: string) => void;
  onBackToHome: () => void;
  allRegionsData: AllRegionsData;
  homeScope?: "korea" | "japan" | "usa" | "china" | "vietnam" | "germany" | "france" | "italy" | "spain" | "uk" | "world";
  existingRoom?: MultiplayerRoom | null;
  existingRoomState?: RoomState | null;
  onLeaveRoom?: () => void;
  onStartMultiplayerGame: (room: MultiplayerRoom, initialRoomState: RoomState) => void;
}

const generateCourseForPool = (pool: Region[], limit: number): Region[] => {
  if (!pool || pool.length === 0) return [];
  const maxSteps = Math.max(limit, 1);
  const path: Region[] = [];
  const visitedSet = new Set<string>();

  let current = pool[Math.floor(Math.random() * pool.length)];
  path.push(current);
  visitedSet.add(current.id);

  while (path.length < maxSteps) {
    // 1. Unvisited neighbors
    const unvisitedNeighbors = (current.neighbors || []).filter(
      (nId) => !visitedSet.has(nId) && pool.some((p) => p.id === nId)
    );

    if (unvisitedNeighbors.length > 0) {
      const nextId = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
      const nextReg = pool.find((r) => r.id === nextId);
      if (nextReg) {
        current = nextReg;
        path.push(current);
        visitedSet.add(current.id);
        continue;
      }
    }

    // 2. Nearest unvisited region geographically
    const unvisitedPool = pool.filter((r) => !visitedSet.has(r.id));
    if (unvisitedPool.length > 0) {
      let closest = unvisitedPool[0];
      let minDistance = Infinity;

      for (const unv of unvisitedPool) {
        const dist = Math.sqrt((unv.lat - current.lat) ** 2 + (unv.lng - current.lng) ** 2);
        if (dist < minDistance) {
          minDistance = dist;
          closest = unv;
        }
      }

      current = closest;
      path.push(current);
      visitedSet.add(current.id);
      continue;
    }

    // 3. Revisiting neighbors in pool if all visited
    const poolNeighbors = (current.neighbors || []).filter((nId) => pool.some((p) => p.id === nId));
    if (poolNeighbors.length > 0) {
      const nextId = poolNeighbors[Math.floor(Math.random() * poolNeighbors.length)];
      const nextReg = pool.find((r) => r.id === nextId);
      if (nextReg) {
        current = nextReg;
        path.push(current);
        continue;
      }
    }

    // 4. Fallback random
    const otherInPool = pool.filter((r) => r.id !== current?.id);
    const candidates = otherInPool.length > 0 ? otherInPool : pool;
    const nextReg = candidates[Math.floor(Math.random() * candidates.length)];
    if (nextReg) {
      current = nextReg;
      path.push(current);
    } else {
      break;
    }
  }

  return path;
};

const LEVEL_OPTIONS: { id: "sido" | "sigungu" | "uk" | "spain" | "italy" | "france" | "germany" | "japan" | "usa" | "china" | "vietnam" | "world"; label: string; flag: string }[] = [
  { id: "sido", label: "한국 광역지자체 (17)", flag: "🇰🇷" },
  { id: "sigungu", label: "한국 시·군·구 (229)", flag: "🇰🇷" },
  { id: "uk", label: "영국 113 구성국 및 주요 지역 (113)", flag: "🇬🇧" },
  { id: "spain", label: "스페인 자치지방 (19)", flag: "🇪🇸" },
  { id: "italy", label: "이탈리아 20개 주 (20)", flag: "🇮🇹" },
  { id: "france", label: "프랑스 18개 레지옹 (18)", flag: "🇫🇷" },
  { id: "germany", label: "독일 16개 연방주 (16)", flag: "🇩🇪" },
  { id: "japan", label: "일본 도도부현 (47)", flag: "🇯🇵" },
  { id: "usa", label: "미국 50개 주 (50)", flag: "🇺🇸" },
  { id: "china", label: "중국 성급행정구 (34)", flag: "🇨🇳" },
  { id: "vietnam", label: "베트남 성·직할시 (63)", flag: "🇻🇳" },
  { id: "world", label: "전세계 주요국 (195)", flag: "🌐" },
];

export const MultiplayerView: React.FC<MultiplayerViewProps> = ({
  nickname,
  onSetNickname,
  onBackToHome,
  allRegionsData,
  homeScope = "korea",
  existingRoom,
  existingRoomState,
  onLeaveRoom,
  onStartMultiplayerGame,
}) => {
  const [userNick, setUserNick] = useState(nickname || "");
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [activeRoom, setActiveRoom] = useState<MultiplayerRoom | null>(existingRoom || null);
  const [roomState, setRoomState] = useState<RoomState | null>(existingRoomState || null);
  const [copied, setCopied] = useState(false);
  const [customInputVal, setCustomInputVal] = useState<string | null>(null);

  // Sync if existingRoom or existingRoomState is passed/updated
  useEffect(() => {
    if (existingRoom) {
      setActiveRoom(existingRoom);
      existingRoom.init(
        (updatedRoom) => {
          setRoomState(updatedRoom);
        },
        (stations) => {
          setRoomState((prev) => {
            const latestState: RoomState = prev
              ? { ...prev, isStarted: true, stations }
              : {
                  roomCode: existingRoom.roomCode,
                  roomName: existingRoom.roomName || "타이핑 대전방",
                  level: selectedLevel,
                  targetCount: selectedTargetCount,
                  isStarted: true,
                  isPublic: true,
                  stations,
                  players: {},
                };
            onStartMultiplayerGame(existingRoom, latestState);
            return latestState;
          });
        }
      );
    }
    if (existingRoomState) {
      setRoomState(existingRoomState);
    }
  }, [existingRoom, existingRoomState]);

  // Room Creation Options
  const [createRoomName, setCreateRoomName] = useState("");
  const [createGameType, setCreateGameType] = useState<"typing" | "quiz">("typing");
  const [isPublicRoom, setIsPublicRoom] = useState(true);
  const [roomPasswordInput, setRoomPasswordInput] = useState("");

  // Real-time Discovered Rooms
  const [publicRooms, setPublicRooms] = useState<PublicRoomInfo[]>([]);

  // Password Modal for entering password-protected room
  const [targetRoomToJoin, setTargetRoomToJoin] = useState<PublicRoomInfo | null>(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Sub-level for Korea: "sido" (광역지자체) vs "sigungu" (시·군·구)
  const [koreaSubLevel, setKoreaSubLevel] = useState<"sido" | "sigungu">("sido");
  const [selectedTargetCount, setSelectedTargetCount] = useState<number>(20);

  useEffect(() => {
    if (nickname) {
      setUserNick(nickname);
    }
  }, [nickname]);

  // Default room name when user changes nickname or gameType
  useEffect(() => {
    if (userNick.trim() && !createRoomName) {
      setCreateRoomName(`${userNick.trim()}의 ${createGameType === "quiz" ? "퀴즈 대결방" : "타이핑 대결방"}`);
    }
  }, [userNick, createGameType]);

  // Real-time Lobby Tracker Subscription
  useEffect(() => {
    const tracker = new LobbyTracker((updatedRooms) => {
      setPublicRooms(updatedRooms);
    });
    tracker.init();

    return () => {
      tracker.destroy();
    };
  }, []);

  // Selected level derived from top scope and Korea sub-level choice
  const selectedLevel: "sido" | "sigungu" | "uk" | "spain" | "italy" | "france" | "germany" | "japan" | "usa" | "china" | "vietnam" | "world" =
    homeScope === "uk"
      ? "uk"
      : homeScope === "spain"
      ? "spain"
      : homeScope === "japan"
      ? "japan"
      : homeScope === "usa"
      ? "usa"
      : homeScope === "china"
      ? "china"
      : homeScope === "vietnam"
      ? "vietnam"
      : homeScope === "germany"
      ? "germany"
      : homeScope === "france"
      ? "france"
      : homeScope === "italy"
      ? "italy"
      : homeScope === "world"
      ? "world"
      : koreaSubLevel;

  // Active theme based on top level selection or room level
  const activeLevel = roomState?.level || selectedLevel;
  const activeThemeKey =
    activeLevel === "uk"
      ? "uk"
      : activeLevel === "spain"
      ? "spain"
      : activeLevel === "italy"
      ? "italy"
      : activeLevel === "france"
      ? "france"
      : activeLevel === "germany"
      ? "germany"
      : activeLevel === "vietnam"
      ? "vietnam"
      : activeLevel === "china"
      ? "china"
      : activeLevel === "japan"
      ? "japan"
      : activeLevel === "usa"
      ? "usa"
      : activeLevel === "world"
      ? "world"
      : "korea";

  const theme = getMultiplayerTheme(activeThemeKey);

  // Auto start multiplayer game for guests when host triggers race start
  useEffect(() => {
    if (activeRoom && roomState && roomState.isStarted && roomState.stations && roomState.stations.length > 0) {
      onStartMultiplayerGame(activeRoom, roomState);
    }
  }, [activeRoom, roomState, onStartMultiplayerGame]);

  const handleCreateRoom = () => {
    if (!userNick.trim()) return;
    onSetNickname(userNick.trim());

    // Generate random 4-digit room code
    const code = Math.floor(Math.random() * 8999 + 1000).toString();
    const finalRoomName = createRoomName.trim() || `${userNick.trim()}의 ${createGameType === "quiz" ? "퀴즈 대결방" : "타이핑 대결방"}`;
    const pwd = !isPublicRoom && roomPasswordInput.trim() ? roomPasswordInput.trim() : undefined;

    const room = new MultiplayerRoom(code, userNick, true, finalRoomName, isPublicRoom, pwd, createGameType);

    room.init(
      (updatedRoom) => {
        setRoomState(updatedRoom);
      },
      (stations, incomingGameType) => {
        setRoomState((prev) => {
          const effectiveGameType = incomingGameType || prev?.gameType || createGameType;
          const latestState: RoomState = prev
            ? { ...prev, isStarted: true, stations, gameType: effectiveGameType }
            : {
                roomCode: code,
                roomName: finalRoomName,
                level: selectedLevel,
                gameType: effectiveGameType,
                targetCount: selectedTargetCount,
                isStarted: true,
                isPublic: isPublicRoom,
                password: pwd,
                stations,
                players: {},
              };
          onStartMultiplayerGame(room, latestState);
          return latestState;
        });
      }
    );

    room.updateRoomConfig(selectedLevel, selectedTargetCount, isPublicRoom, finalRoomName, createGameType);
    setActiveRoom(room);
  };

  const handleDirectJoinRoom = (targetRoom: PublicRoomInfo) => {
    if (!userNick.trim()) {
      alert("닉네임을 먼저 입력해주세요!");
      return;
    }

    if (targetRoom.hasPassword) {
      setTargetRoomToJoin(targetRoom);
      setEnteredPassword("");
      setPasswordError("");
      return;
    }

    joinRoomByCode(targetRoom.roomCode);
  };

  const handlePasswordModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRoomToJoin) return;

    if (targetRoomToJoin.password && enteredPassword !== targetRoomToJoin.password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const code = targetRoomToJoin.roomCode;
    setTargetRoomToJoin(null);
    joinRoomByCode(code);
  };

  const handleJoinByCodeSubmit = () => {
    if (!userNick.trim() || !roomCodeInput.trim()) return;
    onSetNickname(userNick.trim());
    joinRoomByCode(roomCodeInput.trim());
  };

  const joinRoomByCode = (code: string) => {
    if (!userNick.trim()) return;
    onSetNickname(userNick.trim());

    const cleanedCode = code.toUpperCase().replace(/^ROOM-?/i, "");
    const room = new MultiplayerRoom(cleanedCode, userNick, false);

    room.init(
      (updatedRoom) => {
        setRoomState(updatedRoom);
      },
      (stations, incomingGameType) => {
        setRoomState((prev) => {
          const effectiveGameType = incomingGameType || prev?.gameType || "typing";
          const latestState: RoomState = prev
            ? { ...prev, isStarted: true, stations, gameType: effectiveGameType }
            : {
                roomCode: cleanedCode,
                roomName: `${userNick}의 참여방`,
                level: selectedLevel,
                gameType: effectiveGameType,
                targetCount: 20,
                isStarted: true,
                isPublic: true,
                stations,
                players: {},
              };
          onStartMultiplayerGame(room, latestState);
          return latestState;
        });
      }
    );

    setActiveRoom(room);
  };

  const handleCopyCode = () => {
    if (roomState?.roomCode) {
      navigator.clipboard.writeText(roomState.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartRace = () => {
    if (!activeRoom || !roomState) return;

    const currentGameType = roomState.gameType || "typing";
    // Pick connected targetCount stations for chosen level using neighbor course generator
    const sourceRegions = (allRegionsData as any)[roomState.level] || allRegionsData.sido;
    const chosen = generateCourseForPool(sourceRegions, roomState.targetCount);

    const updatedRoomState: RoomState = {
      ...roomState,
      isStarted: true,
      gameType: currentGameType,
      stations: chosen,
    };

    activeRoom.startGame(chosen, currentGameType);
    onStartMultiplayerGame(activeRoom, updatedRoomState);
  };

  const getCourseBadgeText = (level: string) => {
    switch (level) {
      case "uk":
        return "🇬🇧 영국";
      case "spain":
        return "🇪🇸 스페인";
      case "italy":
        return "🇮🇹 이탈리아";
      case "france":
        return "🇫🇷 프랑스";
      case "germany":
        return "🇩🇪 독일";
      case "vietnam":
        return "🇻🇳 베트남";
      case "china":
        return "🇨🇳 중국";
      case "japan":
        return "🇯🇵 일본";
      case "usa":
        return "🇺🇸 미국";
      case "world":
        return "🌐 전세계";
      case "sigungu":
        return "🇰🇷 시·군·구";
      default:
        return "🇰🇷 광역지자체";
    }
  };

  // If in lobby room (Inside Room Waiting Room)
  if (activeRoom && roomState) {
    const isHost = activeRoom.getIsHost() || (roomState.players && roomState.players[activeRoom.getMyPlayerId()]?.isHost) || false;
    const playersList: PlayerState[] = (Object.values(roomState.players || {}).filter(Boolean) as PlayerState[]);

    return (
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              activeRoom.leave();
              setActiveRoom(null);
              setRoomState(null);
              if (onLeaveRoom) {
                onLeaveRoom();
              }
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>방 나가기</span>
          </button>

          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${theme.badgeBg}`}>
              {roomState.gameType === "quiz" ? "퀴즈" : "타자 연습"}
            </span>

            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${roomState.isPublic ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"}`}>
              {roomState.isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {roomState.isPublic ? "공개방" : "비밀방"}
            </span>

            <div className={`flex items-center gap-2 ${theme.badgeBg} px-3.5 py-1.5 rounded-full border font-mono text-xs font-bold`}>
              <Users className={`w-4 h-4 ${theme.badgeIcon} animate-pulse`} />
              <span>{getCourseBadgeText(roomState.level)} 대기실</span>
            </div>
          </div>
        </div>

        {/* Room Title Banner */}
        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">대결 방 이름</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">{roomState.roomName || (roomState.gameType === "quiz" ? "퀴즈 대결방" : "타자 연습 대결방")}</h2>
          </div>
          <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 font-mono">
            {playersList.length}명 참여 중
          </span>
        </div>

        {/* Quiz Mode Distinct Features Banner */}
        {roomState.gameType === "quiz" && (
          <div className="mt-4 p-3.5 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-2xl flex items-start gap-2.5 text-purple-900 dark:text-purple-200 text-xs">
            <span className="text-base leading-none shrink-0">💡</span>
            <div>
              <p className="font-extrabold">멀티플레이 퀴즈 모드</p>
              <p className="text-[11px] text-purple-700 dark:text-purple-300 mt-0.5 leading-relaxed">
                퀴즈 모드에서는 각 참가자마다 <strong>서로 다른 무작위 문제 코스</strong>가 배정됩니다! 경기 중 지도에서 <strong>상대방의 주행 경로와 위치가 나랑 다른 색상</strong>으로 실시간 표시됩니다.
              </p>
            </div>
          </div>
        )}

        {/* Room Code Banner - Clean White Container */}
        <div className="mt-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-slate-900 dark:text-slate-100">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.accentText} block mb-1`}>
              초대 코드 (ROOM CODE)
            </span>
            <div className="text-3xl font-black font-mono tracking-wider text-amber-600 dark:text-amber-400">
              {roomState.roomCode}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">친구에게 이 코드를 알려주어 직접 들어오게할 수 있습니다!</p>
          </div>

          <button
            onClick={handleCopyCode}
            className="py-2.5 px-5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-600 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? "복사완료!" : "코드 복사하기"}</span>
          </button>
        </div>

        {/* Target Station Count & Game Mode Settings */}
        <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          {/* Host Mode Selector: 타자 연습 vs 퀴즈 */}
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span>🎮</span> 대전 모드 선택
              </span>
              <span className={`text-[10px] ${theme.accentText} font-bold`}>
                {isHost ? "방장 설정 가능" : "방장 설정 모드"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={!isHost}
                onClick={() => {
                  if (!isHost) return;
                  setRoomState((prev) => (prev ? { ...prev, gameType: "typing" } : null));
                  activeRoom.updateRoomConfig(roomState.level, roomState.targetCount, roomState.isPublic, roomState.roomName, "typing");
                }}
                className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  (roomState.gameType || "typing") === "typing"
                    ? `${theme.modeActiveBtn} shadow-md`
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                } ${!isHost ? "cursor-not-allowed opacity-90" : ""}`}
              >
                {(roomState.gameType || "typing") === "typing" && (
                  <Check className={`w-3.5 h-3.5 ${roomState.level === "germany" || roomState.level === "china" ? "text-slate-950" : "text-white"} stroke-[3]`} />
                )}
                <span>타자 연습</span>
              </button>

              <button
                type="button"
                disabled={!isHost}
                onClick={() => {
                  if (!isHost) return;
                  setRoomState((prev) => (prev ? { ...prev, gameType: "quiz" } : null));
                  activeRoom.updateRoomConfig(roomState.level, roomState.targetCount, roomState.isPublic, roomState.roomName, "quiz");
                }}
                className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  roomState.gameType === "quiz"
                    ? `${theme.modeActiveBtn} shadow-md`
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                } ${!isHost ? "cursor-not-allowed opacity-90" : ""}`}
              >
                {roomState.gameType === "quiz" && (
                  <Check className={`w-3.5 h-3.5 ${roomState.level === "germany" || roomState.level === "china" ? "text-slate-950" : "text-white"} stroke-[3]`} />
                )}
                <span>퀴즈</span>
              </button>
            </div>
          </div>
          {/* If Korea mode room, allow host to toggle between 광역지자체 and 시·군·구 */}
          {(roomState.level === "sido" || roomState.level === "sigungu") && (
            <div className={`p-3.5 ${theme.subCardBg} rounded-xl border ${theme.subCardBorder} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${theme.subCardText} flex items-center gap-1.5`}>
                  <span>🇰🇷</span> 대한민국 대결 행정구역 선택
                </span>
                <span className={`text-[10px] ${theme.accentText} font-bold`}>
                  현재: {roomState.level === "sido" ? "광역지자체 (17개)" : "시·군·구 (229개)"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={!isHost}
                  onClick={() => {
                    if (!isHost) return;
                    setKoreaSubLevel("sido");
                    setRoomState((prev) => (prev ? { ...prev, level: "sido" } : null));
                    activeRoom.updateRoomConfig("sido", roomState.targetCount, roomState.isPublic, roomState.roomName);
                  }}
                  className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    roomState.level === "sido"
                      ? `${theme.modeActiveBtn} shadow-md`
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  } ${!isHost ? "cursor-not-allowed opacity-90" : ""}`}
                >
                  {roomState.level === "sido" && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  <span>🏢 광역지자체 (17개)</span>
                </button>

                <button
                  type="button"
                  disabled={!isHost}
                  onClick={() => {
                    if (!isHost) return;
                    setKoreaSubLevel("sigungu");
                    setRoomState((prev) => (prev ? { ...prev, level: "sigungu" } : null));
                    activeRoom.updateRoomConfig("sigungu", roomState.targetCount, roomState.isPublic, roomState.roomName);
                  }}
                  className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    roomState.level === "sigungu"
                      ? `${theme.modeActiveBtn} shadow-md`
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  } ${!isHost ? "cursor-not-allowed opacity-90" : ""}`}
                >
                  {roomState.level === "sigungu" && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  <span>🏙️ 시·군·구 (229개)</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
              <div>
                <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">
                  정복 목표 역 수 설정
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  현재 설정: <strong className={`${theme.accentText} font-black`}>{roomState.targetCount}개 역</strong> 정복 레이스
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {isHost ? "방장 설정 가능" : "방장 설정을 기다리는 중..."}
            </span>
          </div>

          {/* Target Station Count Preset Selection Buttons (10개, 16개, 30개 - No extra labels) */}
          <div>
            <div className="grid grid-cols-3 gap-2.5">
              {[10, 16, 30].map((cnt) => {
                const isSelected = Number(roomState.targetCount) === Number(cnt);
                return (
                  <button
                    key={cnt}
                    type="button"
                    disabled={!isHost}
                    onClick={() => {
                      if (!isHost) return;
                      const numCnt = Number(cnt);
                      setSelectedTargetCount(numCnt);
                      setCustomInputVal(null);
                      setRoomState((prev) => (prev ? { ...prev, targetCount: numCnt } : null));
                      activeRoom.updateRoomConfig(roomState.level, numCnt, roomState.isPublic, roomState.roomName);
                    }}
                    className={`py-3 px-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? `${theme.modeActiveBtn} scale-[1.02]`
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    } ${!isHost ? "cursor-not-allowed opacity-90" : ""}`}
                  >
                    {isSelected && (
                      <Check className={`w-4 h-4 ${roomState.level === "germany" || roomState.level === "china" ? "text-slate-950" : "text-white"} stroke-[3]`} />
                    )}
                    <span>{cnt}개</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Input for Host (0 ~ 250 range) */}
            {isHost && (
              <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                  직접 숫자 입력:
                </span>
                <div className="relative flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={250}
                    value={customInputVal !== null ? customInputVal : (roomState.targetCount ?? "")}
                    placeholder="0~250"
                    onChange={(e) => {
                      const str = e.target.value;
                      setCustomInputVal(str);
                      const val = parseInt(str, 10);
                      if (!isNaN(val) && val >= 0 && val <= 250) {
                        setSelectedTargetCount(val);
                        setRoomState((prev) => (prev ? { ...prev, targetCount: val } : null));
                        activeRoom.updateRoomConfig(roomState.level, val, roomState.isPublic, roomState.roomName);
                      } else if (str === "") {
                        setSelectedTargetCount(0);
                        setRoomState((prev) => (prev ? { ...prev, targetCount: 0 } : null));
                      }
                    }}
                    onBlur={() => {
                      setCustomInputVal(null);
                      if (roomState.targetCount === undefined || isNaN(roomState.targetCount) || roomState.targetCount < 0) {
                        const fallback = 16;
                        setSelectedTargetCount(fallback);
                        setRoomState((prev) => (prev ? { ...prev, targetCount: fallback } : null));
                        activeRoom.updateRoomConfig(roomState.level, fallback, roomState.isPublic, roomState.roomName);
                      }
                    }}
                    className="w-28 px-3 py-2 text-xs font-black bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    개 (0 ~ 250개 입력 가능)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Players List with "플레이중" Indicator */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Users className={`w-4 h-4 ${theme.accentText}`} />
              참여 중인 운행사 ({playersList.length}명)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {playersList.map((player) => {
              const isPlaying = Boolean(
                !player.finished && (roomState.isStarted || (player.currentIndex !== undefined && player.currentIndex > 0))
              );

              return (
                <div
                  key={player.id}
                  className="p-3.5 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 ${theme.avatarBg} rounded-xl flex items-center justify-center font-bold text-sm`}>
                      {(player.nickname || "무명").substring(0, 2)}
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-900 dark:text-slate-100 block flex items-center gap-1">
                        {player.nickname || "무명 운행사"}
                        {player.isHost && (
                          <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-500 inline" />
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {player.id === activeRoom.getMyPlayerId() ? "(나)" : "참여자"}
                      </span>
                    </div>
                  </div>

                  {player.finished ? (
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 rounded-lg">
                      🏆 완주
                    </span>
                  ) : isPlaying ? (
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-700 rounded-lg animate-pulse flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping inline-block" />
                      플레이중
                    </span>
                  ) : (
                    <span className={`text-[11px] font-bold px-2.5 py-1 ${theme.badgeBg} rounded-lg border`}>
                      준비완료
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          {isHost ? (
            <button
              onClick={handleStartRace}
              className={`w-full sm:w-auto py-3.5 px-8 ${theme.primaryBtn} font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>멀티레이스 경기 시작!</span>
            </button>
          ) : (
            <div className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs rounded-2xl text-center flex items-center justify-center gap-2">
              <RefreshCw className={`w-4 h-4 animate-spin ${theme.accentText}`} />
              <span>방장이 경기를 시작할 때까지 잠시 기다려주세요...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Lobby Landing Selection with Realtime Room Browser
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Password Modal */}
      {targetRoomToJoin && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>비밀방 비밀번호 입력</span>
              </div>
              <button
                onClick={() => setTargetRoomToJoin(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-200">{targetRoomToJoin.roomName}</strong> 은(는) 비밀번호로 보호된 방입니다.
            </p>

            <form onSubmit={handlePasswordModalSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                  방 비밀번호
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => {
                      setEnteredPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    autoFocus
                  />
                </div>
                {passwordError && (
                  <p className="text-[11px] font-bold text-rose-500 mt-1">{passwordError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTargetRoomToJoin(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  입장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6">
        {/* Top Title Bar */}
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            실시간 멀티플레이 로비
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            실시간으로 생성된 다른 유저의 공개 방에 즉시 원클릭으로 입장할 수 있습니다!
          </p>
        </div>

        {/* User Nickname Input */}
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest block mb-2">
            운행사 닉네임 (NICKNAME)
          </label>
          <input
            type="text"
            value={userNick}
            onChange={(e) => setUserNick(e.target.value)}
            placeholder="대결 시 표시될 닉네임을 입력하세요"
            maxLength={12}
            className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 ${theme.focusRing} shadow-sm`}
          />
        </div>

        {/* Real-time Open Rooms List (Public Rooms Browser) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Globe className={`w-4 h-4 ${theme.accentText}`} />
              <span>실시간 생성된 대결 방 목록 ({publicRooms.length}개 발견)</span>
            </h3>

            <span className="text-[11px] text-slate-400 font-mono">
              자동 갱신 중...
            </span>
          </div>

          {publicRooms.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
              <RefreshCw className="w-6 h-6 mx-auto text-slate-400 animate-spin mb-2" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">현재 대기 중인 다른 방이 없습니다.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                아래에서 [새로운 방 만들기]를 눌러 친구들을 초대해보세요!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {publicRooms.map((room) => (
                <div
                  key={room.roomCode}
                  className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                          {room.roomName}
                        </span>
                        {room.hasPassword ? (
                          <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-bold rounded flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            비밀방
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded flex items-center gap-1">
                            <Globe className="w-2.5 h-2.5" />
                            공개방
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        방장: <strong className="text-slate-700 dark:text-slate-300">{room.hostNickname}</strong>
                      </p>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-amber-500 rounded-lg shrink-0">
                      #{room.roomCode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 bg-slate-200/70 dark:bg-slate-700 font-bold rounded text-[10px]">
                        {getCourseBadgeText(room.level)}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${room.gameType === "quiz" ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300" : "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"}`}>
                        {room.gameType === "quiz" ? "퀴즈" : "타자 연습"}
                      </span>
                      <span className="font-bold text-slate-600 dark:text-slate-300">
                        {room.targetCount}개 역
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold text-[10px]">
                        👥 {room.playerCount}명 대기중
                      </span>

                      <button
                        onClick={() => handleDirectJoinRoom(room)}
                        className={`py-1 px-3 ${room.hasPassword ? "bg-amber-600 hover:bg-amber-500" : theme.primaryBg} text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer`}
                      >
                        {room.hasPassword ? <Lock className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                        <span>{room.hasPassword ? "입장" : "바로 참가"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Room Creation and Direct Code Join Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Create Room Box */}
          <div className={`p-5 ${theme.lightCardBg} rounded-2xl flex flex-col justify-between shadow-sm space-y-4`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${theme.primaryBg} text-white rounded-xl w-fit shadow-md`}>
                  <Crown className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-white/80 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  방 설정 가능
                </span>
              </div>

              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">새로운 대결 방 만들기</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">방 생성 후 대기실에서 타자 연습 / 퀴즈 모드를 선택할 수 있습니다.</p>

              {/* Room Name Input */}
              <div className="mt-3">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  대결 방 이름
                </label>
                <input
                  type="text"
                  value={createRoomName}
                  onChange={(e) => setCreateRoomName(e.target.value)}
                  placeholder="예: 서울역 정복 스피드전"
                  maxLength={20}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Public vs Private Room Selector */}
              <div className="mt-3 space-y-2">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                  방 공개 여부
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPublicRoom(true)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPublicRoom
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>공개방</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPublicRoom(false)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      !isPublicRoom
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>비밀방</span>
                  </button>
                </div>

                {/* Password field if Private Room */}
                {!isPublicRoom && (
                  <div className="mt-2 animate-fade-in">
                    <label className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
                      비밀방 비밀번호 설정 (선택사항)
                    </label>
                    <input
                      type="password"
                      value={roomPasswordInput}
                      onChange={(e) => setRoomPasswordInput(e.target.value)}
                      placeholder="입장 비밀번호 입력"
                      className="w-full bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 rounded-xl p-2 text-xs font-bold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleCreateRoom}
              className={`mt-4 w-full py-2.5 ${theme.primaryBtn} font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
            >
              <span>{isPublicRoom ? "공개 방 생성하기" : "비밀 방 생성하기"}</span>
              <Play className="w-3.5 h-3.5 fill-white" />
            </button>
          </div>

          {/* Direct Room Code Join Box */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="p-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl w-fit mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">초대 코드로 비밀 입장</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">친구에게 직접 공유받은 4자리 초대 코드가 있다면 입력하세요.</p>

              <input
                type="text"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="예: 1234"
                maxLength={10}
                className={`w-full mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${theme.focusRing}`}
              />
            </div>

            <button
              onClick={handleJoinByCodeSubmit}
              disabled={!roomCodeInput.trim()}
              className={`mt-4 w-full py-2.5 ${theme.joinBtn} disabled:opacity-40 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
            >
              <span>코드 입력하여 참가하기</span>
              <Flag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
