/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Zap, X, Sliders, ShieldAlert, Sparkles, Clock, Keyboard, Play, Pause, Gauge } from "lucide-react";

interface MacroControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isMacroActive: boolean;
  setIsMacroActive: (active: boolean | ((prev: boolean) => boolean)) => void;
  macroSpeedMs: number;
  setMacroSpeedMs: (speed: number) => void;
  autoAdvanceDelayMs: number;
  setAutoAdvanceDelayMs: (delay: number) => void;
  displayLanguage?: "ko" | "en";
}

export const SPEED_PRESETS = [
  { label: "⚡ 초광속", enLabel: "Ultra", ms: 5, desc: "~12,000타/분" },
  { label: "🚀 초고속", enLabel: "Very Fast", ms: 15, desc: "~4,000타/분" },
  { label: "🏎️ 고속", enLabel: "Fast", ms: 30, desc: "~2,000타/분" },
  { label: "🚗 보통", enLabel: "Medium", ms: 60, desc: "~1,000타/분" },
  { label: "🚶 인간형", enLabel: "Human-like", ms: 120, desc: "~500타/분" },
  { label: "🐢 느림", enLabel: "Slow", ms: 250, desc: "~240타/분" },
];

export const MacroControlPanel: React.FC<MacroControlPanelProps> = ({
  isOpen,
  onClose,
  isMacroActive,
  setIsMacroActive,
  macroSpeedMs,
  setMacroSpeedMs,
  autoAdvanceDelayMs,
  setAutoAdvanceDelayMs,
  displayLanguage = "ko",
}) => {
  const isEn = displayLanguage === "en";

  // Prevent back-page scroll or focus issues when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const estimatedCpm = Math.round(60000 / Math.max(1, macroSpeedMs));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 md:p-8 space-y-6 transform transition-all scale-100">
        {/* Glow ambient background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight text-white">
                  {isEn ? "Secret Macro Control Panel" : "비밀 매크로 조작창"}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  SECRET
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn ? "Customize auto-typing speed & delay" : "타자 속도 및 매크로 동작 세부 설정"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isEn ? "Close (Esc)" : "닫기 (Esc)"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Power Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isMacroActive ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-slate-700 text-slate-400"}`}>
              {isMacroActive ? <Play className="w-5 h-5 fill-amber-400" /> : <Pause className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {isEn ? "Macro State" : "매크로 작동 상태"}
              </div>
              <div className="text-xs text-slate-400">
                {isMacroActive
                  ? (isEn ? "Active - Typing automatically" : "작동 중 - 자동으로 타자를 입력합니다")
                  : (isEn ? "Paused - Normal typing mode" : "정지됨 - 수동 입력 모드")}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMacroActive((prev) => !prev)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 ${
              isMacroActive
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
          >
            <Zap className={`w-4 h-4 ${isMacroActive ? "fill-slate-950" : ""}`} />
            <span>{isMacroActive ? (isEn ? "ENABLED" : "작동 중 (ON)") : (isEn ? "DISABLED" : "꺼짐 (OFF)")}</span>
          </button>
        </div>

        {/* Typing Speed Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>{isEn ? "Typing Speed (Delay per char)" : "타자 속도 (글자당 간격)"}</span>
            </label>

            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
              <span className="text-base font-black text-amber-400">{macroSpeedMs}</span>
              <span className="text-xs text-slate-400 font-bold">ms</span>
              <span className="text-xs text-slate-500">|</span>
              <span className="text-xs font-bold text-emerald-400">
                ~{estimatedCpm.toLocaleString()} {isEn ? "CPM" : "타/분"}
              </span>
            </div>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-3 gap-2">
            {SPEED_PRESETS.map((preset) => {
              const isSelected = macroSpeedMs === preset.ms;
              return (
                <button
                  key={preset.ms}
                  onClick={() => setMacroSpeedMs(preset.ms)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10"
                      : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  <span className="text-xs font-bold">{isEn ? preset.enLabel : preset.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{preset.ms}ms ({preset.desc})</span>
                </button>
              );
            })}
          </div>

          {/* Fine Tuning Slider & Direct Input */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-bold w-12">1ms</span>
              <input
                type="range"
                min={1}
                max={300}
                step={1}
                value={macroSpeedMs}
                onChange={(e) => setMacroSpeedMs(Number(e.target.value))}
                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-xs text-slate-400 font-bold w-12 text-right">300ms</span>
            </div>
          </div>
        </div>

        {/* Auto Advance Delay Section */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? "Station Completion Delay" : "다음 역 넘어갈 때 대기시간"}</span>
            </label>
            <span className="text-xs font-bold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              {autoAdvanceDelayMs}ms
            </span>
          </div>

          <div className="flex gap-2">
            {[0, 50, 150, 300, 500].map((delay) => (
              <button
                key={delay}
                onClick={() => setAutoAdvanceDelayMs(delay)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  autoAdvanceDelayMs === delay
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {delay === 0 ? (isEn ? "Instant (0ms)" : "즉시 (0ms)") : `${delay}ms`}
              </button>
            ))}
          </div>
        </div>

        {/* Info & Warning Box */}
        <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-2xl text-xs space-y-1.5 text-amber-200/90">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <ShieldAlert className="w-4 h-4" />
            <span>{isEn ? "Shortcut & Leaderboard Notice" : "단축어 안내 및 주의사항"}</span>
          </div>
          <p className="text-[11px] text-amber-300/80 leading-relaxed">
            • <b>Shift + P + J + M</b> : {isEn ? "Open/Close Macro Control Panel" : "언제든 비밀 매크로 조작창 열기/닫기"}
            <br />
            • <b>Esc</b> : {isEn ? "Close Control Window" : "조작창 닫기"}
            <br />
            • {isEn ? "When macro is used, leaderboard score registration is disabled." : "매크로 사용 중 완주 시 랭킹(리더보드) 등록이 제한됩니다."}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>{isEn ? "Save & Close" : "설정 적용 및 닫기"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
