/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomVehicleConfig, ExpressionType, AccessoryType } from "../types";
import { getCountryFlagUrl } from "./flagUtils";

export type VehicleType = "subway" | "person" | "car" | "plane" | "custom_draw";

export interface VehicleInfo {
  id: VehicleType;
  name: string;
  subtitle: string;
}

export const VEHICLE_LIST: VehicleInfo[] = [
  { id: "subway", name: "지하철", subtitle: "쾌적한 꼬마 지하철" },
  { id: "person", name: "여행자", subtitle: "배낭을 멘 꼬마 여행자" },
  { id: "car", name: "자동차", subtitle: "듬직한 꼬마 자동차" },
  { id: "plane", name: "비행기", subtitle: "하늘을 나는 꼬마 비행기" },
  { id: "custom_draw", name: "나만의 캐릭터", subtitle: "직접 커스텀/그린 캐릭터" },
];

export function getVehicleName(id: string, lang: string = "ko"): string {
  if (lang === "en") {
    switch (id) {
      case "subway": return "Subway";
      case "person": return "Traveler";
      case "car": return "Car";
      case "plane": return "Airplane";
      case "custom_draw": return "Custom Character";
      default: return id;
    }
  }
  const found = VEHICLE_LIST.find((v) => v.id === id);
  return found ? found.name : id;
}

export interface VehicleColorScheme {
  primary: string;      // Main body color hex
  dark: string;         // Dark accent hex
  light: string;        // Light tint hex
  glass: string;        // Glass / detail hex
  eye: string;          // Eye / highlight hex
  tailwindBorder: string;
  tailwindBg: string;
  tailwindText: string;
  tailwindPill: string;
  tailwindRipple: string;
}

export function getVehicleColorScheme(regionLevel?: string, customConfig?: CustomVehicleConfig): VehicleColorScheme {
  if (customConfig?.bodyColor) {
    const primary = customConfig.bodyColor;
    const dark = customConfig.accentColor || "#047857";
    return {
      primary,
      dark,
      light: "#d1fae5",
      glass: "#34d399",
      eye: customConfig.eyeColor || "#a7f3d0",
      tailwindBorder: "border-emerald-500",
      tailwindBg: "bg-emerald-50 dark:bg-emerald-950/40",
      tailwindText: "text-emerald-600 dark:text-emerald-400",
      tailwindPill: "bg-emerald-600 text-white",
      tailwindRipple: "bg-emerald-500/30",
    };
  }

  if (regionLevel === "japan") {
    return {
      primary: "#f43f5e",
      dark: "#881337",
      light: "#ffe4e6",
      glass: "#fb7185",
      eye: "#fecdd3",
      tailwindBorder: "border-rose-500",
      tailwindBg: "bg-rose-50 dark:bg-rose-950/40",
      tailwindText: "text-rose-600 dark:text-rose-400",
      tailwindPill: "bg-rose-600 text-white",
      tailwindRipple: "bg-rose-500/30",
    };
  }
  if (regionLevel === "usa") {
    return {
      primary: "#2563eb",
      dark: "#1e3a8a",
      light: "#dbeafe",
      glass: "#60a5fa",
      eye: "#bfdbfe",
      tailwindBorder: "border-blue-500",
      tailwindBg: "bg-blue-50 dark:bg-blue-950/40",
      tailwindText: "text-blue-600 dark:text-blue-400",
      tailwindPill: "bg-blue-600 text-white",
      tailwindRipple: "bg-blue-500/30",
    };
  }
  if (regionLevel === "china") {
    return {
      primary: "#f59e0b",
      dark: "#78350f",
      light: "#fef3c7",
      glass: "#fbbf24",
      eye: "#fef08a",
      tailwindBorder: "border-amber-500",
      tailwindBg: "bg-amber-50 dark:bg-amber-950/40",
      tailwindText: "text-amber-800 dark:text-amber-400",
      tailwindPill: "bg-amber-500 text-slate-950 font-black",
      tailwindRipple: "bg-amber-500/30",
    };
  }
  if (regionLevel === "vietnam") {
    return {
      primary: "#dc2626",
      dark: "#991b1b",
      light: "#fee2e2",
      glass: "#ef4444",
      eye: "#fef08a",
      tailwindBorder: "border-red-500",
      tailwindBg: "bg-red-50 dark:bg-red-950/40",
      tailwindText: "text-red-600 dark:text-red-400",
      tailwindPill: "bg-red-600 text-yellow-300 font-black",
      tailwindRipple: "bg-red-500/30",
    };
  }
  if (regionLevel === "germany") {
    return {
      primary: "#eab308",
      dark: "#854d0e",
      light: "#fef9c3",
      glass: "#facc15",
      eye: "#fef08a",
      tailwindBorder: "border-yellow-500",
      tailwindBg: "bg-yellow-50 dark:bg-yellow-950/40",
      tailwindText: "text-yellow-700 dark:text-yellow-400",
      tailwindPill: "bg-yellow-500 text-slate-950 font-bold",
      tailwindRipple: "bg-yellow-500/30",
    };
  }
  if (regionLevel === "france") {
    return {
      primary: "#2563eb",
      dark: "#1e3a8a",
      light: "#dbeafe",
      glass: "#60a5fa",
      eye: "#bfdbfe",
      tailwindBorder: "border-blue-500",
      tailwindBg: "bg-blue-50 dark:bg-blue-950/40",
      tailwindText: "text-blue-600 dark:text-blue-400",
      tailwindPill: "bg-blue-600 text-white font-bold",
      tailwindRipple: "bg-blue-500/30",
    };
  }
  if (regionLevel === "italy") {
    return {
      primary: "#059669",
      dark: "#064e3b",
      light: "#d1fae5",
      glass: "#34d399",
      eye: "#a7f3d0",
      tailwindBorder: "border-emerald-500",
      tailwindBg: "bg-emerald-50 dark:bg-emerald-950/40",
      tailwindText: "text-emerald-700 dark:text-emerald-400",
      tailwindPill: "bg-emerald-600 text-white font-bold",
      tailwindRipple: "bg-emerald-500/30",
    };
  }
  if (regionLevel === "spain") {
    return {
      primary: "#dc2626",
      dark: "#991b1b",
      light: "#fee2e2",
      glass: "#f87171",
      eye: "#fef08a",
      tailwindBorder: "border-red-500",
      tailwindBg: "bg-red-50 dark:bg-red-950/40",
      tailwindText: "text-red-600 dark:text-red-400",
      tailwindPill: "bg-red-600 text-white font-bold",
      tailwindRipple: "bg-red-500/30",
    };
  }
  if (regionLevel === "uk") {
    return {
      primary: "#1e3a8a",
      dark: "#0f172a",
      light: "#dbeafe",
      glass: "#3b82f6",
      eye: "#bfdbfe",
      tailwindBorder: "border-indigo-500",
      tailwindBg: "bg-indigo-50 dark:bg-indigo-950/40",
      tailwindText: "text-indigo-700 dark:text-indigo-400",
      tailwindPill: "bg-indigo-700 text-white font-bold",
      tailwindRipple: "bg-indigo-500/30",
    };
  }
  if (regionLevel === "world") {
    return {
      primary: "#64748b",
      dark: "#1e293b",
      light: "#f1f5f9",
      glass: "#94a3b8",
      eye: "#cbd5e1",
      tailwindBorder: "border-slate-500",
      tailwindBg: "bg-slate-100 dark:bg-slate-800/50",
      tailwindText: "text-slate-700 dark:text-slate-300",
      tailwindPill: "bg-slate-700 text-white",
      tailwindRipple: "bg-slate-500/30",
    };
  }
  // Default: Korea (Emerald)
  return {
    primary: "#10b981",
    dark: "#047857",
    light: "#d1fae5",
    glass: "#34d399",
    eye: "#a7f3d0",
    tailwindBorder: "border-emerald-500",
    tailwindBg: "bg-emerald-50 dark:bg-emerald-950/40",
    tailwindText: "text-emerald-600 dark:text-emerald-400",
    tailwindPill: "bg-emerald-600 text-white",
    tailwindRipple: "bg-emerald-500/30",
  };
}

/**
 * Generate expression HTML (Eyes/Mouth)
 */
export function getExpressionHtml(expression: ExpressionType = "happy", eyeColor: string = "#1e293b"): string {
  switch (expression) {
    case "smile":
      return `
        <div class="flex flex-col items-center">
          <div class="flex justify-between w-5 px-0.5">
            <div class="w-2 h-1 border-t-2 border-[#1e293b] rounded-t-full"></div>
            <div class="w-2 h-1 border-t-2 border-[#1e293b] rounded-t-full"></div>
          </div>
          <div class="w-2.5 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5"></div>
          <div class="flex justify-between w-6 absolute bottom-1 px-0.5">
            <div class="w-1.5 h-1 bg-rose-400/80 rounded-full"></div>
            <div class="w-1.5 h-1 bg-rose-400/80 rounded-full"></div>
          </div>
        </div>
      `;
    case "wink":
      return `
        <div class="flex flex-col items-center">
          <div class="flex items-center justify-between w-5 px-0.5">
            <div class="w-2 h-1 border-b-2 border-[#1e293b] rounded-b-full"></div>
            <div class="w-1.5 h-2 bg-[#1e293b] rounded-full"></div>
          </div>
          <div class="w-2 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5"></div>
        </div>
      `;
    case "sunglasses":
      return `
        <div class="flex flex-col items-center relative">
          <div class="w-7 h-2.5 bg-slate-900 rounded-md border border-slate-700 flex items-center justify-around px-0.5 shadow-xs">
            <div class="w-2.5 h-1.5 bg-slate-800 rounded-xs border-t border-white/50"></div>
            <div class="w-2.5 h-1.5 bg-slate-800 rounded-xs border-t border-white/50"></div>
          </div>
          <div class="w-2 h-0.5 bg-slate-900 mt-0.5 rounded-full"></div>
        </div>
      `;
    case "cute":
      return `
        <div class="flex flex-col items-center">
          <div class="flex justify-between w-5 px-0.5">
            <div class="w-2 h-2.5 bg-[#1e293b] rounded-full relative flex items-start justify-end p-0.5">
              <div class="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <div class="w-2 h-2.5 bg-[#1e293b] rounded-full relative flex items-start justify-end p-0.5">
              <div class="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div class="w-2.5 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5"></div>
          <div class="flex justify-between w-6 absolute bottom-1 px-0.5">
            <div class="w-1.5 h-1 bg-pink-400/80 rounded-full"></div>
            <div class="w-1.5 h-1 bg-pink-400/80 rounded-full"></div>
          </div>
        </div>
      `;
    case "surprised":
      return `
        <div class="flex flex-col items-center">
          <div class="flex justify-between w-5 px-0.5">
            <div class="w-2 h-2 bg-[#1e293b] rounded-full"></div>
            <div class="w-2 h-2 bg-[#1e293b] rounded-full"></div>
          </div>
          <div class="w-1.5 h-1.5 bg-[#1e293b] rounded-full mt-0.5"></div>
        </div>
      `;
    case "happy":
    default:
      return `
        <div class="flex flex-col items-center">
          <div class="flex justify-between w-5 px-0.5">
            <div class="w-1.5 h-2 rounded-full" style="background-color: ${eyeColor};"></div>
            <div class="w-1.5 h-2 rounded-full" style="background-color: ${eyeColor};"></div>
          </div>
          <div class="w-2.5 h-1 border-b-2 rounded-b-full mt-0.5" style="border-color: ${eyeColor};"></div>
        </div>
      `;
  }
}

/**
 * Generate accessory HTML (Hat, Crown, Glasses, Ribbon, Headphones)
 */
export function getAccessoryHtml(accessory: AccessoryType = "none"): string {
  switch (accessory) {
    case "cap":
      return `
        <div class="absolute -top-3 z-30 flex flex-col items-center">
          <div class="w-7 h-3 bg-red-600 rounded-t-full border border-white/40 shadow-xs relative">
            <div class="absolute -bottom-0.5 -right-1 w-8 h-1 bg-red-800 rounded-full"></div>
          </div>
        </div>
      `;
    case "crown":
      return `
        <div class="absolute -top-3.5 z-30 flex items-center justify-center">
          <div class="w-6 h-3.5 bg-amber-400 border border-amber-600 rounded-t-xs flex items-end justify-between px-0.5 shadow-xs relative">
            <div class="w-1 h-1 bg-rose-500 rounded-full absolute top-0 left-0.5"></div>
            <div class="w-1 h-1 bg-blue-500 rounded-full absolute top-0 left-2.5"></div>
            <div class="w-1 h-1 bg-emerald-500 rounded-full absolute top-0 right-0.5"></div>
          </div>
        </div>
      `;
    case "glasses":
      return `
        <div class="absolute top-2 z-30 flex items-center justify-center">
          <div class="w-7 h-2.5 flex items-center justify-between px-0.5">
            <div class="w-3 h-3 border-2 border-slate-900 rounded-full bg-white/20"></div>
            <div class="w-1 h-0.5 bg-slate-900"></div>
            <div class="w-3 h-3 border-2 border-slate-900 rounded-full bg-white/20"></div>
          </div>
        </div>
      `;
    case "ribbon":
      return `
        <div class="absolute -top-2.5 right-1 z-30">
          <div class="w-4 h-3 bg-pink-500 rounded-full border border-white flex items-center justify-center shadow-xs">
            <div class="w-1 h-1 bg-pink-700 rounded-full"></div>
          </div>
        </div>
      `;
    case "headphones":
      return `
        <div class="absolute -top-2 z-30 w-9 h-6 border-t-3 border-slate-800 rounded-t-full flex justify-between px-0">
          <div class="w-2.5 h-3.5 bg-indigo-600 rounded-lg border border-white shadow-xs -ml-1"></div>
          <div class="w-2.5 h-3.5 bg-indigo-600 rounded-lg border border-white shadow-xs -mr-1"></div>
        </div>
      `;
    case "none":
    default:
      return "";
  }
}

/**
 * Generate HTML string for Leaflet Marker Icon on Map based on vehicleType, regionLevel, and customConfig
 */
export function getMapVehicleMarkerHtml(
  vehicleType: VehicleType,
  regionLevel: string | undefined,
  activeRegionName: string,
  activeRegionId?: string,
  customConfig?: CustomVehicleConfig
): { html: string; iconSize: [number, number] } {
  const c = getVehicleColorScheme(regionLevel, customConfig);
  const flagUrl = getCountryFlagUrl(activeRegionId);

  // Check if hand-drawn custom character is active
  if (vehicleType === "custom_draw" || (customConfig?.mode === "custom_draw" && customConfig?.customDrawDataUrl)) {
    const drawImg = customConfig?.customDrawDataUrl;
    const avatarInnerHtml = drawImg
      ? `
        <div class="relative flex flex-col items-center justify-center drop-shadow-xl" style="width: 52px; height: 52px;">
          <img src="${drawImg}" class="w-13 h-13 object-contain filter drop-shadow-md" alt="custom character" />
        </div>
      `
      : `
        <div class="relative flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-2xl border-2 border-white shadow-xl text-white text-xl font-black">
          🎨
        </div>
      `;

    const html = `
      <div class="relative flex flex-col items-center justify-center select-none" style="transform: translate(-50%, -85%);">
        <div class="absolute w-12 h-12 ${c.tailwindRipple} rounded-full animate-ping pointer-events-none" style="animation-duration: 2s; top: 12px;"></div>
        ${avatarInnerHtml}
        <div class="mt-2.5 bg-slate-900 border border-slate-800 shadow-xl px-3.5 py-1.5 rounded-full text-[13px] font-black text-white tracking-tight whitespace-nowrap z-50 flex items-center gap-1.5">
          ${flagUrl ? `<img src="${flagUrl}" class="w-4 h-3 object-cover rounded-xs border border-white/20 inline-block shrink-0" alt="" />` : `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>`}
          <span>${activeRegionName}</span>
        </div>
      </div>
    `;
    return { html, iconSize: [52, 54] };
  }

  // Preset custom colors / expressions / accessories
  const bodyColor = customConfig?.bodyColor || c.primary;
  const accentColor = customConfig?.accentColor || c.dark;
  const eyeColor = customConfig?.eyeColor || c.eye;
  const exprHtml = getExpressionHtml(customConfig?.expression || "happy", eyeColor);
  const accHtml = getAccessoryHtml(customConfig?.accessory || "none");

  const effectiveVehicle = (customConfig?.baseType || ((vehicleType as string) === "custom_draw" ? "person" : vehicleType)) as VehicleType;

  let avatarInnerHtml = "";

  if (effectiveVehicle === "subway") {
    avatarInnerHtml = `
      <div class="relative shadow-2xl flex flex-col items-center vehicle-avatar-body" style="width: 46px; height: 50px;">
        ${accHtml}
        <!-- Main shell -->
        <div class="absolute inset-0 border-2 border-white rounded-2xl flex flex-col items-center py-1 shadow-lg" style="background-color: ${bodyColor};">
          <!-- Roof rail connector -->
          <div class="w-8 h-1 rounded-t-md -mt-2" style="background-color: ${accentColor};"></div>
          <!-- Dark Front glass -->
          <div class="w-9 h-5 bg-[#0f172a] rounded-lg flex items-center justify-center mt-1 relative">
            ${exprHtml}
          </div>
          <!-- Dual front headlights -->
          <div class="flex justify-between w-8 px-0.5 mt-2">
            <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/20"></div>
            <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/20"></div>
          </div>
        </div>
      </div>
    `;
  } else if (effectiveVehicle === "person") {
    avatarInnerHtml = `
      <div class="relative flex flex-col items-center drop-shadow-xl person-avatar-body" style="width: 48px; height: 54px;">
        ${accHtml}
        <!-- Cap/Hat -->
        <div class="w-8 h-3.5 rounded-t-full relative z-20 flex items-center justify-center border border-white/30" style="background-color: ${bodyColor};">
          <div class="absolute -bottom-0.5 w-10 h-1.5 rounded-full" style="background-color: ${accentColor};"></div>
        </div>
        <!-- Face -->
        <div class="w-8 h-7 bg-[#ffedd5] rounded-b-2xl border border-orange-200/60 z-10 flex flex-col items-center pt-1.5 relative -mt-0.5 shadow-xs">
          ${exprHtml}
        </div>
        <!-- Scarf -->
        <div class="w-9 h-2.5 rounded-full z-20 -mt-1 shadow-xs border border-white/40" style="background-color: ${accentColor};"></div>
        <!-- Body & Backpack -->
        <div class="relative w-8 h-4 rounded-b-xl border border-white/30 flex justify-center z-10" style="background-color: ${bodyColor};">
          <!-- Backpack on back -->
          <div class="absolute -right-1 top-0 w-3 h-4 rounded-r-lg border border-white/30" style="background-color: ${accentColor};"></div>
          <!-- Animated Boots (Legs) -->
          <div class="flex justify-between w-5 absolute -bottom-2.5">
            <div class="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md person-leg-left shadow-xs"></div>
            <div class="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md person-leg-right shadow-xs"></div>
          </div>
        </div>
      </div>
    `;
  } else if (effectiveVehicle === "car") {
    avatarInnerHtml = `
      <div class="relative flex flex-col items-center drop-shadow-xl vehicle-avatar-body" style="width: 50px; height: 48px;">
        ${accHtml}
        <!-- Roof / Windshield cabin -->
        <div class="w-8 h-5 bg-[#0f172a] rounded-t-xl border-2 border-white/80 relative flex items-center justify-center pt-0.5 z-10 shadow-sm">
          ${exprHtml}
        </div>
        <!-- Main Car Body -->
        <div class="w-12 h-6 border-2 border-white rounded-2xl relative flex items-center justify-between px-1 z-20 shadow-md" style="background-color: ${bodyColor};">
          <!-- Dual Headlights -->
          <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40"></div>
          <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40"></div>
          <!-- Grill Smile -->
          <div class="absolute left-1/2 -translate-x-1/2 bottom-1 w-3 h-1.5 rounded-b-full border-b-2 border-white/80"></div>
        </div>
        <!-- 3D Wheels -->
        <div class="flex justify-between w-11 z-30 -mt-1.5">
          <div class="w-3.5 h-3.5 bg-[#1e293b] rounded-full border-2 border-slate-400 flex items-center justify-center">
            <div class="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <div class="w-3.5 h-3.5 bg-[#1e293b] rounded-full border-2 border-slate-400 flex items-center justify-center">
            <div class="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    `;
  } else if (effectiveVehicle === "plane") {
    avatarInnerHtml = `
      <div class="relative flex flex-col items-center justify-center drop-shadow-xl vehicle-avatar-body" style="width: 52px; height: 48px;">
        ${accHtml}
        <div class="relative flex items-center justify-center transform -rotate-12">
          <!-- Tail Fin -->
          <div class="absolute -top-3.5 left-1 w-3.5 h-5.5 rounded-t-full rounded-bl-md shadow-xs border border-white/40 transform -rotate-12 z-0" style="background-color: ${bodyColor};"></div>
          <!-- Upper / Far Wing -->
          <div class="absolute -top-1.5 left-3.5 w-5 h-2.5 rounded-full border border-white/30 transform -rotate-25 z-0" style="background-color: ${accentColor};"></div>
          <!-- Main Fuselage -->
          <div class="w-13 h-5.5 bg-gradient-to-b from-slate-50 to-slate-200 border border-slate-300/80 rounded-full relative z-10 flex items-center px-1 shadow-md">
            <!-- Side Window Stripe -->
            <div class="w-4 h-1 bg-sky-300/80 rounded-full ml-2 border border-sky-400/50"></div>
            <!-- Cockpit Window -->
            <div class="w-3 h-2 bg-sky-400 rounded-full ml-1 border border-white/80 shadow-xs flex items-center justify-center">
              <div class="w-1 h-1 bg-white/90 rounded-full"></div>
            </div>
          </div>
          <!-- Near Wing -->
          <div class="absolute -bottom-1.5 left-3.5 w-6 h-3 rounded-full border border-white/50 shadow-md transform rotate-12 z-20" style="background-color: ${bodyColor};"></div>
        </div>
      </div>
    `;
  }

  const html = `
    <div class="relative flex flex-col items-center justify-center select-none" style="transform: translate(-50%, -85%);">
      <div class="absolute w-12 h-12 ${c.tailwindRipple} rounded-full animate-ping pointer-events-none" style="animation-duration: 2s; top: 12px;"></div>
      ${avatarInnerHtml}
      <div class="mt-2.5 bg-slate-900 border border-slate-800 shadow-xl px-3.5 py-1.5 rounded-full text-[13px] font-black text-white tracking-tight whitespace-nowrap z-50 flex items-center gap-1.5">
        ${flagUrl ? `<img src="${flagUrl}" class="w-4 h-3 object-cover rounded-xs border border-white/20 inline-block shrink-0" alt="" />` : `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>`}
        <span>${activeRegionName}</span>
      </div>
    </div>
  `;

  return { html, iconSize: [52, 54] };
}
