/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RegionLevel = "sido" | "sigungu" | "world" | "japan" | "usa" | "china" | "vietnam" | "germany" | "france" | "italy" | "spain" | "uk" | "random";

export interface Region {
  id: string;
  name_kr: string; // Korean name (the typing target)
  name_en: string; // English name
  name_vi?: string; // Optional Vietnamese name
  name_it?: string; // Optional Italian name
  name_es?: string; // Optional Spanish name
  level: RegionLevel;
  lat: number;
  lng: number;
  region_group: string;
  neighbors: string[]; // Adjacent region IDs
  description?: string; // Optional default descriptions/trivia
}

export type PlayMode = "single" | "quiz";

export interface ModeColors {
  korea: string;
  japan: string;
  usa: string;
  china: string;
  vietnam: string;
  germany: string;
  france: string;
  italy: string;
  spain: string;
  uk: string;
  world: string;
}

export type WorldFillMode = "color" | "flag";
export type LanguageOption = "ko" | "en";
export type MapStyle = "standard" | "satellite";

export type ExpressionType = "happy" | "smile" | "wink" | "sunglasses" | "cute" | "surprised";
export type AccessoryType = "none" | "cap" | "crown" | "glasses" | "ribbon" | "headphones";

export interface CustomVehicleConfig {
  mode: "preset" | "custom_draw";
  baseType?: "subway" | "person" | "car" | "plane";
  isCustomColor?: boolean;
  bodyColor?: string;
  accentColor?: string;
  eyeColor?: string;
  expression?: ExpressionType;
  accessory?: AccessoryType;
  customDrawDataUrl?: string | null;
}

export const DEFAULT_CUSTOM_VEHICLE: CustomVehicleConfig = {
  mode: "preset",
  baseType: "person",
  isCustomColor: false,
  bodyColor: undefined,
  accentColor: undefined,
  eyeColor: undefined,
  expression: "happy",
  accessory: "none",
  customDrawDataUrl: null,
};

export const DEFAULT_MODE_COLORS: ModeColors = {
  korea: "#059669",
  japan: "#f43f5e",
  usa: "#3b82f6",
  china: "#f59e0b",
  vietnam: "#ef4444",
  germany: "#eab308",
  france: "#2563eb",
  italy: "#15803d",
  spain: "#dc2626",
  uk: "#1e3a8a",
  world: "#475569",
};

export interface GameSettings {
  level: RegionLevel;
  regionGroup: string;
  targetCount: number; // 10, 30, 50, or full
  strictMode: boolean; // strict typing or lenient
  advanceMode?: "auto" | "manual"; // 자동 완료 or 수동 제출 (Space/Enter)
  modeColors?: ModeColors;
  worldFillMode?: WorldFillMode;
  typingLanguage?: LanguageOption; // "ko" (한국어) | "en" (영어)
  displayLanguage?: LanguageOption; // "ko" (한국어) | "en" (영어)
  mapStyle?: MapStyle; // "standard" (일반 지도) | "satellite" (위성 지도)
}

export interface PlayStats {
  cpm: number; // characters per minute (타수)
  accuracy: number; // correct characters / total inputs
  elapsedTime: number; // in seconds
  combo: number;
  maxCombo: number;
  visitedCount: number;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  type: "locate" | "name" | "trivia";
  region: Region;
  prompt: string;
  options?: string[]; // Multiple choice options (for name or trivia)
  correctAnswer: string; // Region ID or Korean name
}

export interface RegionTrivia {
  regionId: string;
  name: string;
  trivia: string[];
  tips: string;
}
