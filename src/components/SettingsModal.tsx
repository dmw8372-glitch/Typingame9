import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, X, Sliders, Check, Music, Keyboard, Navigation, Ticket, Globe, Palette, RotateCcw, Languages, Type, Sparkles, PenTool } from "lucide-react";
import {
  getSoundVolume,
  setSoundVolume,
  getSoundEnabled,
  setSoundEnabled,
  playSuccessSound,
} from "../utils/audio";
import { VehicleType, VEHICLE_LIST, getVehicleColorScheme, getVehicleName } from "../utils/vehicleAvatars";
import { VehicleCardPreview } from "./VehicleCardPreview";
import { ModeColors, WorldFillMode, LanguageOption, MapStyle, DEFAULT_MODE_COLORS, CustomVehicleConfig, DEFAULT_CUSTOM_VEHICLE } from "../types";
import { CharacterCustomizerModal } from "./CharacterCustomizerModal";
import { t } from "../utils/i18n";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  advanceMode?: "auto" | "manual";
  onUpdateAdvanceMode?: (mode: "auto" | "manual") => void;
  vehicleType?: VehicleType;
  onUpdateVehicleType?: (vehicle: VehicleType) => void;
  customVehicleConfig?: CustomVehicleConfig;
  onUpdateCustomVehicleConfig?: (config: CustomVehicleConfig) => void;
  startButtonStyle?: "ticket" | "simple";
  onUpdateStartButtonStyle?: (style: "ticket" | "simple") => void;
  ticketTearMode?: "auto" | "manual";
  onUpdateTicketTearMode?: (mode: "auto" | "manual") => void;
  regionLevel?: string;
  modeColors?: ModeColors;
  onUpdateModeColors?: (colors: ModeColors) => void;
  worldFillMode?: WorldFillMode;
  onUpdateWorldFillMode?: (mode: WorldFillMode) => void;
  typingLanguage?: LanguageOption;
  onUpdateTypingLanguage?: (lang: LanguageOption) => void;
  displayLanguage?: LanguageOption;
  onUpdateDisplayLanguage?: (lang: LanguageOption) => void;
  mapStyle?: MapStyle;
  onUpdateMapStyle?: (style: MapStyle) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  advanceMode = "auto",
  onUpdateAdvanceMode,
  vehicleType = "subway",
  onUpdateVehicleType,
  customVehicleConfig = DEFAULT_CUSTOM_VEHICLE,
  onUpdateCustomVehicleConfig,
  startButtonStyle = "ticket",
  onUpdateStartButtonStyle,
  ticketTearMode = "auto",
  onUpdateTicketTearMode,
  regionLevel,
  modeColors = DEFAULT_MODE_COLORS,
  onUpdateModeColors,
  worldFillMode = "color",
  onUpdateWorldFillMode,
  typingLanguage = "ko",
  onUpdateTypingLanguage,
  displayLanguage = "ko",
  onUpdateDisplayLanguage,
  mapStyle = "standard",
  onUpdateMapStyle,
}) => {
  const [volume, setVolumeState] = useState<number>(0.5);
  const [enabled, setEnabledState] = useState<boolean>(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  const isEn = displayLanguage === "en";

  // Get active vehicle color scheme matching current region level
  const vScheme = getVehicleColorScheme(regionLevel);

  // Derive theme colors
  const isJapan = regionLevel === "japan";
  const isUsa = regionLevel === "usa";
  const isChina = regionLevel === "china";
  const isVietnam = regionLevel === "vietnam";
  const isGermany = regionLevel === "germany";
  const isFrance = regionLevel === "france";
  const isItaly = regionLevel === "italy";
  const isSpain = regionLevel === "spain";
  const isUk = regionLevel === "uk";
  const isWorld = regionLevel === "world";

  const themePrimaryBg = isUk
    ? "bg-indigo-700 hover:bg-indigo-600 text-white font-bold shadow-indigo-700/20"
    : isSpain
    ? "bg-red-600 hover:bg-red-500 text-white font-bold shadow-red-600/20"
    : isGermany
    ? "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black shadow-yellow-500/20"
    : isFrance
    ? "bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-blue-600/20"
    : isItaly
    ? "bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-emerald-600/20"
    : isChina
    ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-amber-500/20"
    : isVietnam
    ? "bg-red-600 hover:bg-red-500 text-yellow-300 font-black shadow-red-500/20"
    : isJapan
    ? "bg-rose-600 hover:bg-rose-500 text-white font-bold"
    : isUsa
    ? "bg-blue-600 hover:bg-blue-500 text-white font-bold"
    : isWorld
    ? "bg-slate-700 hover:bg-slate-600 text-white font-bold"
    : "bg-emerald-600 hover:bg-emerald-500 text-white font-bold";

  const themePrimaryBorder = isUk
    ? "border-indigo-700"
    : isSpain
    ? "border-red-600"
    : isGermany
    ? "border-yellow-500"
    : isFrance
    ? "border-blue-600"
    : isItaly
    ? "border-emerald-600"
    : isChina
    ? "border-amber-500"
    : isVietnam
    ? "border-red-600"
    : isJapan
    ? "border-rose-600"
    : isUsa
    ? "border-blue-600"
    : isWorld
    ? "border-slate-700"
    : "border-emerald-600";

  const themePrimaryText = isSpain
    ? "text-red-600 dark:text-red-400 font-extrabold"
    : isGermany
    ? "text-yellow-700 dark:text-yellow-400 font-extrabold"
    : isFrance
    ? "text-blue-600 dark:text-blue-400 font-extrabold"
    : isItaly
    ? "text-emerald-700 dark:text-emerald-400 font-extrabold"
    : isChina
    ? "text-amber-500 dark:text-amber-400 font-extrabold"
    : isVietnam
    ? "text-red-600 dark:text-red-400 font-extrabold"
    : isJapan
    ? "text-rose-600 dark:text-rose-400 font-extrabold"
    : isUsa
    ? "text-blue-600 dark:text-blue-400 font-extrabold"
    : isWorld
    ? "text-slate-600 dark:text-slate-300 font-bold"
    : "text-emerald-600 dark:text-emerald-400 font-extrabold";

  const themeIconBg = isSpain
    ? "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800"
    : isGermany
    ? "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800"
    : isFrance
    ? "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800"
    : isItaly
    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
    : isChina
    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
    : isVietnam
    ? "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800"
    : isJapan
    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800"
    : isUsa
    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800"
    : isWorld
    ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
    : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800";

  const themeAccentClass = isSpain
    ? "accent-red-600"
    : isGermany
    ? "accent-yellow-500"
    : isFrance
    ? "accent-blue-600"
    : isItaly
    ? "accent-emerald-600"
    : isChina
    ? "accent-amber-500"
    : isVietnam
    ? "accent-red-600"
    : isJapan
    ? "accent-rose-600"
    : isUsa
    ? "accent-blue-600"
    : isWorld
    ? "accent-slate-700"
    : "accent-emerald-600";

  useEffect(() => {
    if (isOpen) {
      setVolumeState(getSoundVolume());
      setEnabledState(getSoundEnabled());
    }
  }, [isOpen]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolumeState(val);
    setSoundVolume(val);
  };

  const handleToggleEnabled = () => {
    const next = !enabled;
    setEnabledState(next);
    setSoundEnabled(next);
  };

  const testAudio = () => {
    playSuccessSound();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl text-slate-800 dark:text-slate-100 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${themeIconBg}`}>
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {isEn ? "Game Settings" : "환경 설정"}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {isEn ? "Configure avatars, typing behavior, languages & audio" : "이동수단 캐릭터, 타이핑 제출 방식 및 효과음 설정"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Form */}
        <div className="py-4 flex flex-col gap-5">
          {/* SECTION 1: VEHICLE SELECTION (이동수단) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Navigation className={`w-4 h-4 ${themePrimaryText}`} />
                <span>{isEn ? "Vehicle Avatar" : "이동수단 캐릭터"}</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {isEn ? "Select map runner avatar" : "지도 위 운행 캐릭터 선택"}
              </span>
            </div>

            {/* Prominent Customizer Button */}
            <button
              type="button"
              onClick={() => setIsCustomizerOpen(true)}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-black text-xs rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-between cursor-pointer border border-white/20 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span>{isEn ? "Custom Character & Drawing Editor" : "🎨 캐릭터 커스텀 꾸미기 & 직접 그리기"}</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-amber-400 text-slate-950 font-black">
                      NEW
                    </span>
                  </div>
                  <div className="text-[10px] text-white/80 font-medium">
                    {isEn ? "Customize color, face, expression, accessories or hand-draw canvas" : "캐릭터 색상, 표정, 장식 변경 및 손그림 캐릭터 제작"}
                  </div>
                </div>
              </div>
              <div className="py-1 px-3 bg-white/20 rounded-xl text-[11px] font-bold group-hover:bg-white group-hover:text-emerald-700 transition-colors">
                {isEn ? "Open Editor →" : "꾸미기 열기 →"}
              </div>
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {VEHICLE_LIST.map((item) => {
                const isSelected = vehicleType === item.id;
                const vName = getVehicleName(item.id, displayLanguage || "ko");
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === "custom_draw") {
                        setIsCustomizerOpen(true);
                      } else {
                        onUpdateVehicleType?.(item.id);
                      }
                    }}
                    className={`relative rounded-2xl p-2.5 flex flex-col items-center justify-between transition-all cursor-pointer border ${
                      isSelected
                        ? `bg-white dark:bg-slate-900 border-2 ${themePrimaryBorder} shadow-md ring-2 ring-emerald-500/10`
                        : "bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {/* Vehicle Preview Avatar */}
                    <VehicleCardPreview
                      type={item.id}
                      regionLevel={regionLevel}
                      customConfig={isSelected || item.id === "custom_draw" ? customVehicleConfig : undefined}
                    />

                    {/* Title & Subtitle */}
                    <div className="text-center my-1 w-full">
                      <div className="text-[11px] font-black text-slate-900 dark:text-white">{vName}</div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5 line-clamp-2 px-0.5">
                        {item.subtitle}
                      </div>
                    </div>

                    {/* Selected Badge Pill */}
                    {isSelected ? (
                      <div className={`mt-1 py-0.5 px-2 rounded-full text-[9px] font-extrabold flex items-center justify-center gap-1 shadow-xs ${vScheme.tailwindPill}`}>
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>{isEn ? "Selected" : "선택됨"}</span>
                      </div>
                    ) : (
                      <div className="mt-1 h-5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 1.5: START BUTTON STYLE SELECTION */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <Ticket className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEn ? "Start Button UI" : "출발 버튼 스타일 (Start Button UI)"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {isEn ? "Select design style of start button on home" : "홈 화면의 출발 버튼 디자인 선택"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onUpdateStartButtonStyle?.("ticket")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  startButtonStyle === "ticket"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "🎫 Boarding Pass Ticket" : "🎫 비행기 탑승권"}</span>
                {startButtonStyle === "ticket" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateStartButtonStyle?.("simple")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  startButtonStyle === "simple"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "🔘 Simple Button" : "🔘 기본 버튼"}</span>
                {startButtonStyle === "simple" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>

            {/* Sub-option for Ticket Tearing Mode */}
            {startButtonStyle === "ticket" && (
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {isEn ? "Tear Control" : "티켓 뜯는 방식 (Tear Control)"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isEn ? "Auto click vs Drag" : "자동 클릭 vs 터치/드래그"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateTicketTearMode?.("auto")}
                    className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      ticketTearMode === "auto"
                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    <span>{isEn ? "⚡ Auto Tear on Click" : "⚡ 클릭 시 자동 뜯기"}</span>
                    {ticketTearMode === "auto" && <Check className="w-3 h-3 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateTicketTearMode?.("manual")}
                    className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      ticketTearMode === "manual"
                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    <span>{isEn ? "🖐️ Manual Drag Tear" : "🖐️ 직접 터치/드래그"}</span>
                    {ticketTearMode === "manual" && <Check className="w-3 h-3 shrink-0" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
                  {ticketTearMode === "auto"
                    ? (isEn ? "✨ Tears automatically on single click." : "✨ 클릭 한 번으로 탑승권이 실감나게 자동으로 뜯어집니다.")
                    : (isEn ? "🖐️ Drag down the right edge of ticket to tear it off!" : "🖐️ 탑승권 오른쪽 [출발] 영역을 손가락이나 마우스로 직접 아래로 잡고 찢습니다!")}
                </p>
              </div>
            )}

            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              {startButtonStyle === "ticket"
                ? (isEn ? "✈️ Authentic airline boarding pass style start action." : "✈️ 실제 여행 탑승권 스타일로 우측 검정 티켓을 뜯어 출발합니다.")
                : (isEn ? "🔘 Simple single-color button style start action." : "🔘 심플한 단일 컬러 버튼 형태로 출발합니다.")}
            </p>
          </div>

          {/* SECTION 2: Next Region Advance / Completion Mode */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <Keyboard className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEn ? "Advance Mode" : "다음 지역 이동 방식"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {isEn ? "Condition to submit and move to next region" : "지명 입력 후 다음 지점으로 넘어가는 조건 설정"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onUpdateAdvanceMode?.("auto")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  advanceMode === "auto"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "⚡ Auto Advance" : "⚡ 자동 완료"}</span>
                {advanceMode === "auto" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateAdvanceMode?.("manual")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  advanceMode === "manual"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "⌨️ Manual Submit" : "⌨️ 수동 제출"}</span>
                {advanceMode === "manual" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              {advanceMode === "auto"
                ? (isEn ? "💡 Automatically advances once full target text is typed correctly." : "💡 정확하게 글자를 다 적으면 자동으로 다음 지역으로 넘어갑니다.")
                : (isEn ? "💡 Press [Space] or [Enter] after typing target text to submit." : "💡 정확하게 글자를 적은 후 [Space] 또는 [Enter] 키를 눌러 넘어갑니다.")}
            </p>
          </div>

          {/* SECTION 2.1: LANGUAGE SETTINGS (타이핑 언어 & 기본 표시 언어) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2.5">
              <Languages className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">언어 설정 (Language Settings)</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">타이핑 입력 대상 언어 및 화면 기본 표시 언어 개별 설정</span>
              </div>
            </div>

            {/* 1. 타이핑 언어 (Typing Target Language) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Keyboard className="w-3.5 h-3.5 text-slate-500" />
                  <span>타이핑 언어 (Typing Language)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">입력창에 입력할 대상 언어</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateTypingLanguage?.("ko")}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    typingLanguage === "ko"
                      ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <span>🇰🇷 한국어 (Korean)</span>
                  {typingLanguage === "ko" && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateTypingLanguage?.("en")}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    typingLanguage === "en"
                      ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <span>🇺🇸 영어 (English)</span>
                  {typingLanguage === "en" && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
                {typingLanguage === "ko"
                  ? "💡 한국어로 지명을 타이핑합니다 (예: 서울특별시, 일본, 워싱턴DC)."
                  : "💡 영문(English)으로 지명을 타이핑합니다 (예: Seoul, Japan, Washington D.C.)."}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200/60 dark:border-slate-700/60" />

            {/* 2. 기본 표시 언어 (Display UI Language) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-slate-500" />
                  <span>기본 글씨 표시 언어 (Display Language)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">화면 카드, 지도 및 주 제목 표시 언어</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateDisplayLanguage?.("ko")}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    displayLanguage === "ko"
                      ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <span>🇰🇷 한국어 (Korean)</span>
                  {displayLanguage === "ko" && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateDisplayLanguage?.("en")}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    displayLanguage === "en"
                      ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <span>🇺🇸 영어 (English)</span>
                  {displayLanguage === "en" && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
                {displayLanguage === "ko"
                  ? "💡 카드, 지도, 목록 등 화면의 메인 제목을 한국어로 표시합니다."
                  : "💡 카드, 지도, 목록 등 화면의 메인 제목을 영문(English)으로 표시합니다."}
              </p>
            </div>
          </div>

          {/* SECTION 2.45: Map Tile Layer Style (Standard Map vs Satellite Map) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <Globe className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEn ? "Map View Style" : "지도 배경 레이어 (일반 vs 위성 지도)"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {isEn ? "Switch map view background (Standard Vector vs Real Satellite Imagery)" : "지도 배경 레이어를 일반 지적도 또는 실제 인공위성 촬영 사진으로 변경"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onUpdateMapStyle?.("standard")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mapStyle === "standard"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "🗺️ Standard Map" : "🗺️ 일반 지도"}</span>
                {mapStyle === "standard" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateMapStyle?.("satellite")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mapStyle === "satellite"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "🛰️ Satellite Map" : "🛰️ 인공위성 지도"}</span>
                {mapStyle === "satellite" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              {mapStyle === "satellite"
                ? (isEn ? "🛰️ High-resolution real satellite photo imagery is active across all map views." : "🛰️ 고해상도 실제 인공위성 사진 지도로 지형을 관찰하며 주행합니다.")
                : (isEn ? "🗺️ Clean minimalist vector landmass map is active across all map views." : "🗺️ 깔끔한 벡터 지적도로 주행 지형을 직관적으로 보여줍니다.")}
            </p>
          </div>

          {/* SECTION 2.5: World Map Fill Mode (World Map Flag vs Solid Color) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <Globe className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEn ? "World Map Fill Style" : "전세계 지도 채우기 방식"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {isEn ? "Visited country fill pattern (Solid color vs Country Flag)" : "방문한 국가 채우기 형태 (단색 vs 나라 국기 문양)"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onUpdateWorldFillMode?.("color")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  worldFillMode === "color"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "🎨 Solid Color" : "🎨 단색 채우기"}</span>
                {worldFillMode === "color" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateWorldFillMode?.("flag")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  worldFillMode === "flag"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{isEn ? "🚩 Country Flag" : "🚩 국기 문양 채우기"}</span>
                {worldFillMode === "flag" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              {worldFillMode === "flag"
                ? (isEn ? "✨ Visited countries are filled with authentic country flag graphics on World Mode!" : "✨ 전세계 모드에서 방문하거나 지나는 국가가 실제 나라 국기 이미지로 지도에 채워집니다!")
                : (isEn ? "🎨 Visited countries are painted in clean solid colors on World Mode." : "🎨 전세계 모드에서 설정된 색상(기본 회색)으로 깔끔하게 채워집니다.")}
            </p>
          </div>

          {/* SECTION 2.6: Custom Visited Region Color per Mode */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Palette className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {isEn ? "Visited Region Colors" : "모드별 방문 지역 색상"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    {isEn ? "Customize map fill colors per mode" : "지나가는 지역의 지적도 채우기 색상 커스텀"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onUpdateModeColors?.(DEFAULT_MODE_COLORS)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-extrabold text-slate-600 dark:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                title={isEn ? "Reset to defaults" : "기본 색상으로 초기화"}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isEn ? "Reset" : "기본값 초기화"}</span>
              </button>
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                { key: "korea", label: isEn ? "🇰🇷 South Korea" : "🇰🇷 대한민국 (시도/시군구)", defaultColor: DEFAULT_MODE_COLORS.korea },
                { key: "japan", label: isEn ? "🇯🇵 Japan" : "🇯🇵 일본", defaultColor: DEFAULT_MODE_COLORS.japan },
                { key: "usa", label: isEn ? "🇺🇸 USA" : "🇺🇸 미국", defaultColor: DEFAULT_MODE_COLORS.usa },
                { key: "china", label: isEn ? "🇨🇳 China" : "🇨🇳 중국", defaultColor: DEFAULT_MODE_COLORS.china },
                { key: "vietnam", label: isEn ? "🇻🇳 Vietnam" : "🇻🇳 베트남", defaultColor: DEFAULT_MODE_COLORS.vietnam },
                { key: "germany", label: isEn ? "🇩🇪 Germany" : "🇩🇪 독일", defaultColor: DEFAULT_MODE_COLORS.germany },
                { key: "france", label: isEn ? "🇫🇷 France" : "🇫🇷 프랑스", defaultColor: DEFAULT_MODE_COLORS.france },
                { key: "italy", label: isEn ? "🇮🇹 Italy" : "🇮🇹 이탈리아", defaultColor: DEFAULT_MODE_COLORS.italy },
                { key: "spain", label: isEn ? "🇪🇸 Spain" : "🇪🇸 스페인", defaultColor: DEFAULT_MODE_COLORS.spain },
                { key: "uk", label: isEn ? "🇬🇧 UK" : "🇬🇧 영국", defaultColor: DEFAULT_MODE_COLORS.uk },
                { key: "world", label: isEn ? "🌐 World (Solid)" : "🌐 전세계 (단색 모드)", defaultColor: DEFAULT_MODE_COLORS.world },
              ].map((modeItem) => {
                const modeKey = modeItem.key as keyof ModeColors;
                const currentColor = modeColors[modeKey] || modeItem.defaultColor;

                const handleColorChange = (colorHex: string) => {
                  onUpdateModeColors?.({
                    ...modeColors,
                    [modeKey]: colorHex,
                  });
                };

                const PRESET_SWATCHES = [
                  "#059669", // Emerald
                  "#10b981", // Mint
                  "#f43f5e", // Rose
                  "#e11d48", // Crimson
                  "#3b82f6", // Blue
                  "#2563eb", // Royal Blue
                  "#f59e0b", // Amber
                  "#ef4444", // Red
                  "#475569", // Slate
                  "#8b5cf6", // Purple
                  "#06b6d4", // Cyan
                  "#ec4899", // Pink
                ];

                return (
                  <div key={modeItem.key} className="bg-white dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{modeItem.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{currentColor}</span>
                        <input
                          type="color"
                          value={currentColor}
                          onChange={(e) => handleColorChange(e.target.value)}
                          className="w-6 h-6 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600 bg-transparent p-0"
                        />
                      </div>
                    </div>

                    {/* Quick preset color swatches */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {PRESET_SWATCHES.map((swatch) => (
                        <button
                          key={swatch}
                          type="button"
                          onClick={() => handleColorChange(swatch)}
                          className={`w-4.5 h-4.5 rounded-full transition-transform cursor-pointer border ${
                            currentColor.toLowerCase() === swatch.toLowerCase()
                              ? "ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900 scale-110 border-white"
                              : "border-black/10 dark:border-white/10 hover:scale-110"
                          }`}
                          style={{ backgroundColor: swatch }}
                          title={swatch}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Sound On/Off Toggle */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {enabled && volume > 0 ? (
                <Volume2 className={`w-5 h-5 ${themePrimaryText}`} />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEn ? "Sound Effects" : "효과음 활성화"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {isEn ? "Typing and completion audio feedback" : "타이핑 및 정답 성공 소리"}
                </span>
              </div>
            </div>

            <button
              onClick={handleToggleEnabled}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                enabled ? themePrimaryBg.split(" ")[0] : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                  enabled ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* SECTION 4: Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                {isEn ? "Sound Volume" : "효과음 크기 (Sound Volume)"}
              </span>
              <span className={`font-mono ${themePrimaryText}`}>{Math.round(volume * 100)}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={enabled ? volume : 0}
              disabled={!enabled}
              onChange={handleVolumeChange}
              className={`w-full ${themeAccentClass} cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg disabled:opacity-40`}
            />

            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              <span>{isEn ? "Mute (0%)" : "음소거 (0%)"}</span>
              <span>{isEn ? "Mid (50%)" : "보통 (50%)"}</span>
              <span>{isEn ? "Max (100%)" : "최대 (100%)"}</span>
            </div>
          </div>

          {/* Sound Test Button */}
          <button
            onClick={testAudio}
            disabled={!enabled || volume === 0}
            className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Volume2 className={`w-4 h-4 ${themePrimaryText}`} />
            <span>{isEn ? "Test Sound Effect" : "효과음 테스트 들어보기"}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className={`py-2.5 px-6 ${themePrimaryBg} text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer`}
          >
            <Check className="w-4 h-4" />
            <span>{isEn ? "Done" : "확인"}</span>
          </button>
        </div>
      </div>

      {/* Character Customizer & Drawing Modal */}
      <CharacterCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={customVehicleConfig}
        onSaveConfig={(newConfig) => {
          onUpdateCustomVehicleConfig?.(newConfig);
          if (newConfig.mode === "custom_draw") {
            onUpdateVehicleType?.("custom_draw");
          } else {
            onUpdateVehicleType?.(newConfig.baseType || "person");
          }
        }}
        displayLanguage={displayLanguage}
      />
    </div>
  );
};

