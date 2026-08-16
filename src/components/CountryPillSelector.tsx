import React from "react";

export interface CountryOption {
  id: "korea" | "japan" | "usa" | "china" | "vietnam" | "germany" | "france" | "italy" | "spain" | "world";
  name_kr: string;
  name_en: string;
  code: string; // ISO 2 code for flagcdn
  activeBg: string;
  ringColor: string;
}

export const COUNTRY_OPTIONS: CountryOption[] = [
  {
    id: "korea",
    name_kr: "대한민국",
    name_en: "South Korea",
    code: "kr",
    activeBg: "bg-emerald-500",
    ringColor: "ring-emerald-400/40 shadow-emerald-500/40",
  },
  {
    id: "japan",
    name_kr: "일본",
    name_en: "Japan",
    code: "jp",
    activeBg: "bg-rose-500",
    ringColor: "ring-rose-400/40 shadow-rose-500/40",
  },
  {
    id: "usa",
    name_kr: "미국",
    name_en: "USA",
    code: "us",
    activeBg: "bg-blue-600",
    ringColor: "ring-blue-400/40 shadow-blue-500/40",
  },
  {
    id: "vietnam",
    name_kr: "베트남",
    name_en: "Vietnam",
    code: "vn",
    activeBg: "bg-red-600",
    ringColor: "ring-red-400/40 shadow-red-500/40",
  },
  {
    id: "china",
    name_kr: "중국",
    name_en: "China",
    code: "cn",
    activeBg: "bg-amber-500",
    ringColor: "ring-amber-400/40 shadow-amber-500/40",
  },
  {
    id: "germany",
    name_kr: "독일",
    name_en: "Germany",
    code: "de",
    activeBg: "bg-yellow-500",
    ringColor: "ring-yellow-400/40 shadow-yellow-500/40",
  },
  {
    id: "france",
    name_kr: "프랑스",
    name_en: "France",
    code: "fr",
    activeBg: "bg-blue-600",
    ringColor: "ring-blue-500/40 shadow-blue-600/40",
  },
  {
    id: "italy",
    name_kr: "이탈리아",
    name_en: "Italy",
    code: "it",
    activeBg: "bg-emerald-600",
    ringColor: "ring-emerald-500/40 shadow-emerald-600/40",
  },
  {
    id: "spain",
    name_kr: "스페인",
    name_en: "Spain",
    code: "es",
    activeBg: "bg-red-600",
    ringColor: "ring-red-500/40 shadow-red-600/40",
  },
  {
    id: "world",
    name_kr: "전세계 (197개국)",
    name_en: "World (UN)",
    code: "un",
    activeBg: "bg-slate-600",
    ringColor: "ring-slate-400/40 shadow-slate-500/40",
  },
];

interface CountryPillSelectorProps {
  currentScope: string;
  onSelectScope: (scopeId: CountryOption["id"]) => void;
}

export const CountryPillSelector: React.FC<CountryPillSelectorProps> = ({
  currentScope,
  onSelectScope,
}) => {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <span>여행 국가 / 모드 선택</span>
          <span className="text-[10px] font-normal text-slate-400">
            (국기를 터치하여 변경)
          </span>
        </label>
      </div>

      {/* Horizontal Pill Bar Container matching IMG_0892.jpeg */}
      <div className="w-full bg-[#f1f3f6] dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-[30px] p-2 sm:p-2.5 shadow-inner flex items-center gap-2 sm:gap-3 overflow-x-auto select-none no-scrollbar">
        {COUNTRY_OPTIONS.map((item) => {
          const isSelected = currentScope === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectScope(item.id)}
              className={`relative shrink-0 transition-all duration-200 focus:outline-none cursor-pointer ${
                isSelected
                  ? `p-1.5 sm:p-2 rounded-2xl sm:rounded-[20px] ${item.activeBg} shadow-lg ${item.ringColor} ring-4 scale-105`
                  : "p-0.5 hover:scale-105 active:scale-95 opacity-90 hover:opacity-100"
              }`}
              title={item.name_kr}
            >
              {/* Circular Flag Coin / UN Coin */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md bg-white border-2 border-white/95 flex items-center justify-center">
                {item.id === "world" ? (
                  <div className="w-full h-full bg-[#2782f6] flex items-center justify-center relative select-none">
                    {/* Crisp UN Globe & Wreath Emblem matching IMG_0893.jpeg */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs"
                      fill="none"
                      stroke="currentColor"
                    >
                      {/* Central Steering / Globe Wheel */}
                      <circle cx="50" cy="46" r="16" strokeWidth="4.5" />
                      <circle cx="50" cy="46" r="5" fill="currentColor" stroke="none" />
                      
                      {/* Wheel Spokes / Dots matching IMG_0893 */}
                      <circle cx="50" cy="36" r="2.2" fill="currentColor" stroke="none" />
                      <circle cx="50" cy="56" r="2.2" fill="currentColor" stroke="none" />
                      <circle cx="40" cy="46" r="2.2" fill="currentColor" stroke="none" />
                      <circle cx="60" cy="46" r="2.2" fill="currentColor" stroke="none" />
                      <circle cx="43" cy="39" r="2" fill="currentColor" stroke="none" />
                      <circle cx="57" cy="53" r="2" fill="currentColor" stroke="none" />
                      <circle cx="43" cy="53" r="2" fill="currentColor" stroke="none" />
                      <circle cx="57" cy="39" r="2" fill="currentColor" stroke="none" />

                      {/* Surrounding U-Shaped Laurel Wreath */}
                      <path
                        d="M 23,37 C 23,61 38,72 50,72 C 62,72 77,61 77,37"
                        strokeWidth="6.5"
                        strokeLinecap="round"
                      />
                      {/* Bottom Ribbon / Bow Tie */}
                      <path
                        d="M 43,73 L 50,79 L 57,73"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={`https://flagcdn.com/w80/${item.code}.png`}
                    alt={item.name_kr}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as any).style.display = "none";
                    }}
                  />
                )}
                {/* 3D Gloss Coin Reflection Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 via-white/5 to-black/15 pointer-events-none" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
