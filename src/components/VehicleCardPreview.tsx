import React from "react";
import { VehicleType, getVehicleColorScheme } from "../utils/vehicleAvatars";
import { CustomVehicleConfig } from "../types";

interface VehicleCardPreviewProps {
  type: VehicleType;
  regionLevel?: string;
  customConfig?: CustomVehicleConfig;
}

export const VehicleCardPreview: React.FC<VehicleCardPreviewProps> = ({ type, regionLevel, customConfig }) => {
  const c = getVehicleColorScheme(regionLevel, customConfig);

  // If hand-drawn image
  if (type === "custom_draw" || (customConfig?.mode === "custom_draw" && customConfig?.customDrawDataUrl)) {
    const drawImg = customConfig?.customDrawDataUrl;
    return (
      <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1">
        <div className="absolute bottom-1 w-12 h-2.5 bg-slate-400/20 rounded-full blur-[2px]" />
        {drawImg ? (
          <img
            src={drawImg}
            alt="Custom drawn avatar"
            className="w-16 h-16 object-contain filter drop-shadow-md transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl border-2 border-white shadow-lg flex flex-col items-center justify-center text-white font-black text-2xl">
            🎨
            <span className="text-[9px] mt-0.5 font-bold">그리기</span>
          </div>
        )}
      </div>
    );
  }

  const bodyColor = (customConfig?.isCustomColor && customConfig?.bodyColor) ? customConfig.bodyColor : c.primary;
  const accentColor = (customConfig?.isCustomColor && customConfig?.accentColor) ? customConfig.accentColor : c.dark;
  const eyeColor = (customConfig?.isCustomColor && customConfig?.eyeColor) ? customConfig.eyeColor : c.eye;
  const expr = customConfig?.expression || "happy";
  const acc = customConfig?.accessory || "none";

  // Use the explicit `type` prop for cards unless in custom_draw mode or baseType is explicitly defined for custom_draw
  const effectiveType: VehicleType = (type === "custom_draw" ? (customConfig?.baseType || "person") : type) as VehicleType;

  // Expression JSX
  const renderExpression = () => {
    switch (expr) {
      case "smile":
        return (
          <div className="flex flex-col items-center relative w-full h-full justify-center">
            <div className="flex justify-between w-6 px-0.5">
              <div className="w-2 h-1 border-t-2 border-[#1e293b] rounded-t-full" />
              <div className="w-2 h-1 border-t-2 border-[#1e293b] rounded-t-full" />
            </div>
            <div className="w-2.5 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5" />
            <div className="flex justify-between w-7 absolute bottom-1 px-0.5">
              <div className="w-1.5 h-1 bg-rose-400/80 rounded-full" />
              <div className="w-1.5 h-1 bg-rose-400/80 rounded-full" />
            </div>
          </div>
        );
      case "wink":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center justify-between w-6 px-0.5">
              <div className="w-2 h-1 border-b-2 border-[#1e293b] rounded-b-full" />
              <div className="w-1.5 h-2.5 bg-[#1e293b] rounded-full" />
            </div>
            <div className="w-2.5 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5" />
          </div>
        );
      case "sunglasses":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-7 h-2.5 bg-slate-900 rounded-md border border-slate-700 flex items-center justify-around px-0.5 shadow-xs">
              <div className="w-2.5 h-1.5 bg-slate-800 rounded-xs border-t border-white/60" />
              <div className="w-2.5 h-1.5 bg-slate-800 rounded-xs border-t border-white/60" />
            </div>
            <div className="w-2.5 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5" />
          </div>
        );
      case "cute":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <div className="flex justify-between w-6 px-0.5">
              <div className="w-2 h-2.5 bg-[#1e293b] rounded-full relative flex items-start justify-end p-0.5">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="w-2 h-2.5 bg-[#1e293b] rounded-full relative flex items-start justify-end p-0.5">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
            <div className="w-2.5 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5" />
            <div className="flex justify-between w-7 absolute bottom-0.5 px-0.5">
              <div className="w-1.5 h-1 bg-pink-400/80 rounded-full" />
              <div className="w-1.5 h-1 bg-pink-400/80 rounded-full" />
            </div>
          </div>
        );
      case "surprised":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex justify-between w-6 px-0.5">
              <div className="w-2 h-2 bg-[#1e293b] rounded-full" />
              <div className="w-2 h-2 bg-[#1e293b] rounded-full" />
            </div>
            <div className="w-2 h-2 bg-[#1e293b] rounded-full mt-0.5" />
          </div>
        );
      case "happy":
      default:
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex justify-between w-6 px-0.5">
              <div className="w-1.5 h-2.5 rounded-full" style={{ backgroundColor: eyeColor }} />
              <div className="w-1.5 h-2.5 rounded-full" style={{ backgroundColor: eyeColor }} />
            </div>
            <div className="w-2.5 h-1 border-b-2 rounded-b-full mt-0.5" style={{ borderColor: eyeColor }} />
          </div>
        );
    }
  };

  // Accessory JSX
  const renderAccessory = () => {
    switch (acc) {
      case "cap":
        return (
          <div className="absolute -top-3 z-30 flex flex-col items-center">
            <div className="w-8 h-3.5 bg-red-600 rounded-t-full border border-white/40 shadow-xs relative">
              <div className="absolute -bottom-0.5 -right-1 w-9 h-1 bg-red-800 rounded-full" />
            </div>
          </div>
        );
      case "crown":
        return (
          <div className="absolute -top-3.5 z-30 flex items-center justify-center">
            <div className="w-7 h-4 bg-amber-400 border border-amber-600 rounded-t-xs flex items-end justify-between px-0.5 shadow-xs relative">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full absolute top-0 left-0.5" />
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute top-0 left-3" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute top-0 right-0.5" />
            </div>
          </div>
        );
      case "glasses":
        return (
          <div className="absolute top-2 z-30 flex items-center justify-center">
            <div className="w-8 h-3 flex items-center justify-between px-0.5">
              <div className="w-3.5 h-3.5 border-2 border-slate-900 rounded-full bg-white/20" />
              <div className="w-1 h-0.5 bg-slate-900" />
              <div className="w-3.5 h-3.5 border-2 border-slate-900 rounded-full bg-white/20" />
            </div>
          </div>
        );
      case "ribbon":
        return (
          <div className="absolute -top-2.5 right-1 z-30">
            <div className="w-4 h-3 bg-pink-500 rounded-full border border-white flex items-center justify-center shadow-xs">
              <div className="w-1 h-1 bg-pink-700 rounded-full" />
            </div>
          </div>
        );
      case "headphones":
        return (
          <div className="absolute -top-2 z-30 w-10 h-7 border-t-3 border-slate-800 rounded-t-full flex justify-between px-0">
            <div className="w-3 h-4 bg-indigo-600 rounded-lg border border-white shadow-xs -ml-1" />
            <div className="w-3 h-4 bg-indigo-600 rounded-lg border border-white shadow-xs -mr-1" />
          </div>
        );
      case "none":
      default:
        return null;
    }
  };

  if (effectiveType === "person") {
    return (
      <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1 person-avatar-body">
        <div className="absolute bottom-1 w-12 h-2.5 bg-slate-400/20 rounded-full blur-[2px]" />
        {renderAccessory()}

        {/* Cap/Hat */}
        <div className="w-9 h-4 rounded-t-full relative z-20 flex items-center justify-center border border-white/40 shadow-xs" style={{ backgroundColor: bodyColor }}>
          <div className="absolute -bottom-0.5 w-11 h-1.5 rounded-full shadow-xs" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Face */}
        <div className="w-9 h-8 bg-[#ffedd5] rounded-b-2xl border border-orange-200/80 z-10 flex flex-col items-center pt-1.5 relative -mt-0.5 shadow-sm overflow-visible">
          {renderExpression()}
        </div>

        {/* Scarf */}
        <div className="w-10 h-3 rounded-full z-20 -mt-1 shadow-xs border border-white/40" style={{ backgroundColor: accentColor }} />

        {/* Body & Backpack */}
        <div className="relative w-9 h-5 rounded-b-xl border border-white/40 flex justify-center z-10 shadow-sm" style={{ backgroundColor: bodyColor }}>
          <div className="absolute -right-1.5 top-0 w-3.5 h-5 rounded-r-xl border border-white/40" style={{ backgroundColor: accentColor }} />
          <div className="flex justify-between w-6 absolute -bottom-2.5">
            <div className="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md shadow-xs person-leg-left" />
            <div className="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md shadow-xs person-leg-right" />
          </div>
        </div>
      </div>
    );
  }

  if (effectiveType === "car") {
    return (
      <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1">
        <div className="absolute bottom-2 w-14 h-3 bg-slate-400/25 rounded-full blur-[2px]" />
        {renderAccessory()}

        {/* Cabin / Windshield */}
        <div className="w-10 h-6 bg-[#0f172a] rounded-t-2xl border-2 border-white relative flex flex-col items-center justify-center z-10 shadow-xs overflow-hidden">
          {renderExpression()}
        </div>

        {/* Main Body */}
        <div className="w-14 h-7 border-2 border-white rounded-2xl relative flex items-center justify-between px-1.5 z-20 shadow-md -mt-0.5" style={{ backgroundColor: bodyColor }}>
          <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40" />
          <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-4 h-1.5 rounded-b-full border-b-2 border-white/90" />
        </div>

        {/* Wheels */}
        <div className="flex justify-between w-13 z-30 -mt-2">
          <div className="w-4 h-4 bg-[#1e293b] rounded-full border-2 border-slate-300 flex items-center justify-center shadow-xs">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <div className="w-4 h-4 bg-[#1e293b] rounded-full border-2 border-slate-300 flex items-center justify-center shadow-xs">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (effectiveType === "plane") {
    return (
      <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1">
        <div className="absolute bottom-3 w-12 h-2.5 bg-slate-400/20 rounded-full blur-[2px]" />
        {renderAccessory()}

        <div className="relative flex items-center justify-center transform -rotate-12 transition-transform hover:scale-105">
          <div
            className="absolute -top-4 left-1 w-4 h-6 rounded-t-full rounded-bl-md shadow-xs border border-white/40 transform -rotate-12 z-0"
            style={{ backgroundColor: bodyColor }}
          />
          <div
            className="absolute -top-2 left-4 w-6 h-3 rounded-full border border-white/30 transform -rotate-25 z-0"
            style={{ backgroundColor: accentColor }}
          />
          <div className="w-15 h-6 bg-gradient-to-b from-slate-50 to-slate-200 border border-slate-300/80 rounded-full relative z-10 flex items-center px-1 shadow-md">
            <div className="w-4.5 h-1 bg-sky-300/90 rounded-full ml-2.5 border border-sky-400/50" />
            <div className="w-3.5 h-2.5 bg-sky-400 rounded-full ml-1 border border-white/90 shadow-xs flex items-center justify-center">
              <div className="w-1 h-1 bg-white/90 rounded-full" />
            </div>
          </div>
          <div
            className="absolute -bottom-2 left-4 w-7 h-3.5 rounded-full border border-white/50 shadow-md transform rotate-12 z-20"
            style={{ backgroundColor: bodyColor }}
          />
        </div>
      </div>
    );
  }

  // Default: Subway
  return (
    <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1">
      <div className="absolute bottom-1 w-12 h-2.5 bg-slate-400/20 rounded-full blur-[2px]" />
      {renderAccessory()}

      <div className="relative shadow-xl flex flex-col items-center w-12 h-14">
        <div className="absolute inset-0 border-2 border-white rounded-2xl flex flex-col items-center py-1 shadow-md" style={{ backgroundColor: bodyColor }}>
          <div className="w-9 h-1 rounded-t-md -mt-2" style={{ backgroundColor: accentColor }} />
          <div className="w-10 h-6 bg-[#0f172a] rounded-xl flex items-center justify-center mt-1 relative overflow-hidden">
            {renderExpression()}
          </div>
          <div className="flex justify-between w-9 px-1 mt-2">
            <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_6px_#fef08a] border border-white/20" />
            <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_6px_#fef08a] border border-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
