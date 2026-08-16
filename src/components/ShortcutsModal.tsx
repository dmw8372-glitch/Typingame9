import React from "react";
import {
  Keyboard,
  X,
  Zap,
  MapPin,
  Settings,
  HelpCircle,
  Trophy,
  Globe,
  Compass,
  Volume2,
  RefreshCw,
  Sparkles,
  Info
} from "lucide-react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  displayLanguage?: "ko" | "en";
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  displayLanguage = "ko",
}) => {
  if (!isOpen) return null;

  const isEn = displayLanguage === "en";

  const shortcutGroups = [
    {
      title: isEn ? "Window & Modal Navigation" : "모달 창 & 화면 탐색",
      icon: <HelpCircle className="w-4 h-4 text-emerald-500" />,
      items: [
        { key: "Tab / Alt+N", label: isEn ? "Toggle Course & Visited List" : "노선 경로 & 방문 현황 열기/닫기" },
        { key: "ESC", label: isEn ? "Close All Modals & Popups" : "모든 모달 창 / 팝업 닫기" },
        { key: "F1 / Alt+G / ?", label: isEn ? "Open Detailed User Guide" : "이용 안내 상세 가이드 열기" },
        { key: "F3 / Alt+S", label: isEn ? "Open Settings Menu" : "게임 설정 창 열기" },
        { key: "F4 / Alt+M", label: isEn ? "Open Interactive Map Explorer" : "지도 탐색기 모달 열기" },
        { key: "F5 / Alt+L", label: isEn ? "Open Hall of Fame Leaderboard" : "명예의 전당 랭킹 열기" },
        { key: "F9 / Alt+I", label: isEn ? "Open Service Overview About" : "서비스 소개 모달 열기" },
        { key: "Shift+K / Alt+K", label: isEn ? "Open Shortcuts Cheatsheet" : "단축키 모음 창 열기" },
      ],
    },
    {
      title: isEn ? "Gameplay & Fast Controls" : "게임 진행 & 빠른 조작",
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      items: [
        { key: "F2 / Alt+R", label: isEn ? "Instant Game Restart / New Track" : "게임 즉시 재시작 / 새 트랙" },
        { key: "Alt+P / Pause", label: isEn ? "Pause / Resume Gameplay" : "게임 일시 정지 / 재개하기" },
        { key: "F8 / Alt+Q", label: isEn ? "Toggle Typing Mode ↔ Geography Quiz" : "타자 연습 ↔ 지리 퀴즈 모드 전환" },
      ],
    },
    {
      title: isEn ? "Map & Typing Environment" : "지도 & 환경 설정",
      icon: <Compass className="w-4 h-4 text-sky-500" />,
      items: [
        { key: "F6 / Alt+V", label: isEn ? "Toggle Satellite ↔ Vector Map View" : "일반 지적도 ↔ 인공위성 사진 지도 전환" },
        { key: "F7 / Alt+T", label: isEn ? "Toggle Typing Language (KO ↔ EN)" : "한글 ↔ English 타자 입력 언어 전환" },
        { key: "Alt+U", label: isEn ? "Mute / Unmute Sound Effects" : "효과음 음소거 / 활성화 토글" },
        { key: "Alt+C", label: isEn ? "Toggle Solid Color ↔ National Flags Fill" : "지도 채우기 (단색 ↔ 국기 문양) 전환" },
        { key: "Alt+E", label: isEn ? "Toggle Interface Language (KO ↔ EN)" : "화면 표시 언어 (한국어 ↔ English) 전환" },
      ],
    },
    {
      title: isEn ? "Quick Continent & Region Switch" : "빠른 대륙 & 국가 전환 (Alt + 숫자 / 숫자)",
      icon: <Globe className="w-4 h-4 text-purple-500" />,
      items: [
        { key: "Alt+1 / 1", label: isEn ? "Switch to South Korea Map" : "🇰🇷 대한민국 지도 전환" },
        { key: "Alt+2 / 2", label: isEn ? "Switch to Japan Map" : "🇯🇵 일본 지도 전환" },
        { key: "Alt+3 / 3", label: isEn ? "Switch to USA Map" : "🇺🇸 미국 지도 전환" },
        { key: "Alt+4 / 4", label: isEn ? "Switch to China Map" : "🇨🇳 중국 지도 전환" },
        { key: "Alt+5 / 5", label: isEn ? "Switch to Vietnam Map" : "🇻🇳 베트남 지도 전환" },
        { key: "Alt+6 / 6", label: isEn ? "Switch to World 197 Countries Map" : "🌐 전세계 197개국 지도 전환" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-800 dark:text-slate-100 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-600 dark:text-amber-400">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {isEn ? "Keyboard Shortcuts Cheatsheet" : "키보드 단축키 안내"}
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300/50">
                PRO SHORTCUTS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isEn
                ? "Master MAP TYPING effortlessly using key combinations and function keys"
                : "단축키를 활용하여 마우스 클릭 없이 스피디하게 모드 변경 및 게임 조작을 수행하세요"}
            </p>
          </div>
        </div>

        {/* Shortcuts Content */}
        <div className="overflow-y-auto my-4 pr-1 space-y-4 text-xs flex-1 scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortcutGroups.map((group, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-2.5"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs pb-2 border-b border-slate-200 dark:border-slate-700">
                  {group.icon}
                  <span>{group.title}</span>
                </div>

                <div className="space-y-1.5">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700/80"
                    >
                      <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                        {item.label}
                      </span>
                      <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg font-mono font-bold text-[10px] text-slate-800 dark:text-slate-200 shrink-0 shadow-xs">
                        {item.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex items-center gap-2.5 text-amber-800 dark:text-amber-300 text-[11px]">
            <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>
              {isEn
                ? "Tip: Function keys (F1~F10) and Alt combinations work smoothly anytime without interrupting typing input!"
                : "💡 팁: 기능키(F1~F10) 및 Alt 키 조합 단축키는 타자 입력 중에도 텍스트 방해 없이 바로 실행됩니다!"}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            Press ESC to close
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
          >
            {isEn ? "Got it" : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};
