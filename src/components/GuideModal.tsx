import React, { useState } from "react";
import {
  HelpCircle,
  X,
  MapPin,
  Keyboard,
  Users,
  Trophy,
  Sparkles,
  Navigation,
  CheckCircle2,
  Zap,
  Target,
  BookOpen,
  Compass,
  Award,
  Layers,
  Globe,
  Palette,
  Eye,
  Volume2
} from "lucide-react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  displayLanguage?: "ko" | "en";
  currentScope?: string;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  displayLanguage = "ko",
  currentScope = "korea",
}) => {
  const [activeTab, setActiveTab] = useState<"basics" | "modes" | "map" | "controls" | "tips">("basics");

  if (!isOpen) return null;

  const isEn = displayLanguage === "en";
  const isWorld = currentScope === "world";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-800 dark:text-slate-100 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isEn ? "Map Typing Detailed User Guide" : "지도 타자 여행 이용 상세 가이드"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isEn
                ? "Complete handbook for mastering geography and typing speed simultaneously"
                : "지리를 익히며 즐겁게 타자 실력을 쑥쑥 올리는 완벽 가이드북"}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1.5 my-4 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl shrink-0 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab("basics")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "basics"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{isEn ? "1. Basic Gameplay" : "1. 기본 진행 방법"}</span>
          </button>
          <button
            onClick={() => setActiveTab("modes")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "modes"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? "2. Modes & Regions" : "2. 모드 & 노선 안내"}</span>
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "map"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isEn ? "3. Map & Satellite" : "3. 지도 & 위성 설정"}</span>
          </button>
          <button
            onClick={() => setActiveTab("controls")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "controls"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>{isEn ? "4. Controls & Shortcuts" : "4. 조작법 & 단축키"}</span>
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "tips"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isEn ? "5. Strategy & Tips" : "5. 공략 & 고득점 꿀팁"}</span>
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="overflow-y-auto pr-1 space-y-4 text-xs leading-relaxed flex-1">
          {/* TAB 1: BASICS */}
          {activeTab === "basics" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 rounded-2xl p-4.5">
                <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEn ? "Core Game Rules" : "핵심 게임 진행 메커니즘"}</span>
                </h3>
                <ol className="space-y-2.5 text-slate-700 dark:text-slate-300 list-decimal pl-4">
                  <li>
                    <strong>{isEn ? "Target Location Name Input:" : "목적지 지명(역) 정확한 타자 입력:"}</strong>{" "}
                    {isEn
                      ? "Type the presented region name (e.g., Seoul, Busan, Tokyo, New York, Paris) in Korean or English into the main input console."
                      : "화면 하단 콘솔에 제시된 목적지 지명(예: 서울, 부산, 도쿄, 뉴욕, 파리 등)을 한글 또는 영문으로 정확하게 입력합니다."}
                  </li>
                  <li>
                    <strong>{isEn ? "Real-time Vehicle Driving & Territory Coloring:" : "실시간 열차/차량 주행 및 지도 색칠:"}</strong>{" "}
                    {isEn
                      ? "Upon correct entry, your vehicle instantly races along the route to the next station, and the visited region on the map lights up with crisp colors or flag graphics."
                      : "정확히 입력하면 선택한 탈것(열차, 지하철, 스포츠카, 비행기)이 선로/도로를 따라 다음 목적지로 즉시 주행하며, 방문한 지역이 지도상에 선명한 색상 또는 국기 패턴으로 색칠됩니다."}
                  </li>
                  <li>
                    <strong>{isEn ? "Speed (CPM) & Precision Metrics:" : "실시간 속도(CPM) 및 정확도 측정:"}</strong>{" "}
                    {isEn
                      ? "Characters Per Minute (CPM), Words Per Minute (WPM), typing accuracy %, and combo multipliers are continuously updated in real-time."
                      : "분당 타수(CPM), 단어 속도(WPM), 타자 정확도(%) 및 연속 성공 콤보가 초 단위로 정밀하게 계산되며, 오타 시 붉은 셰이킹 미스 효과가 발생합니다."}
                  </li>
                  <li>
                    <strong>{isEn ? "Course Completion & Certificate Export:" : "노선 완주 & 고해상도 인증서 발급:"}</strong>{" "}
                    {isEn
                      ? "Completing all stations on a route earns you route completion badges, increases global territory conquest %, and lets you export high-res journey image cards."
                      : "코스의 모든 구역을 주행하면 전체 영토 정복율이 올라가며, 완주 기록 카드 및 성과 뱃지를 PNG 이미지로 내보내어 자유롭게 공유할 수 있습니다."}
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                  <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5 text-xs">
                    <Compass className="w-4 h-4 text-emerald-500" />
                    <span>{isEn ? "Step 1: Check Target" : "1단계: 목적 지명 확인"}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {isEn
                      ? "Check the target display at top or the glowing destination pin on the map."
                      : "상단 목적지 뷰어와 지도 위 깜빡이는 다음 도착 목적지 핀을 확인합니다."}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                  <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5 text-xs">
                    <Keyboard className="w-4 h-4 text-sky-500" />
                    <span>{isEn ? "Step 2: Fast Typing" : "2단계: 신속 정확 타이핑"}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {isEn
                      ? "Type the place name accurately. Press Space or Enter for instant submission."
                      : "키보드로 지명을 정확히 작성합니다. 스페이스바나 엔터를 누르면 즉시 다음 역으로 이동합니다."}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                  <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5 text-xs">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>{isEn ? "Step 3: Map Conquest" : "3단계: 지도 영토 정복"}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {isEn
                      ? "The map smoothly pans, fills the area with color, and extends your travel path."
                      : "입력 완료 시 지도가 해당 구역으로 부드럽게 무빙하며 영토가 채워지고 이동 선로가 이어집니다."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODES */}
          {activeTab === "modes" && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>{isEn ? "🇰🇷 South Korea (Sido & Sigungu)" : "🇰🇷 대한민국 (광역시도 & 시·군·구 230여 지역)"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "Covers 16 metropolitan Sido regions and 230+ detailed Sigungu municipal areas. Drive along KTX, subway, and major national expressways while mastering Korean geography."
                    : "서울, 경기, 부산 등 16개 광역시도 코스부터 230여 개 전국 시·군·구 세부 코스까지 완벽 수록! KTX, 지하철 노선, 고속도로 등 실제 대한민국의 주요 교통망 기반 지리 여행을 즐길 수 있습니다."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>{isEn ? "🌍 Global Themes (Japan, USA, China, Vietnam, World)" : "🌍 해외 글로벌 테마 (일본, 미국, 중국, 베트남, 전세계)"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "Japan (47 Prefectures / Shinkansen), USA (50 States / Route 66), China (34 Provinces), Vietnam (63 Provinces), and World (197 Countries across 6 continents)."
                    : "일본 47 도도부현 신칸센 노선, 미국 50개 주 66번 국도(Route 66), 중국 34개 성·직할시, 베트남 63개 성, 전세계 197개국 6대 대륙 횡단 코스로 글로벌 지리 감각을 크게 확장하세요."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Target className="w-4 h-4 text-rose-500" />
                  <span>{isEn ? "🧠 Interactive Geography Quiz Mode" : "🧠 지리 지식 퀴즈 도전 모드"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "Text names are hidden! Guess place names strictly by looking at glowing map shapes, capital city hints, or country flag graphics."
                    : "지명이 직접 보이지 않습니다! 지도상에 깜빡이는 지형 모양, 수도 힌트, 또는 국기 그래픽만 보고 지명을 맞추는 지리 실력 검증 모드입니다."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>{isEn ? "👥 Real-time Multiplayer & AI Bot Racing" : "👥 실시간 멀티플레이 & AI 봇 레이싱"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "Create custom rooms with invite codes to race live against friends, or battle Novice, Intermediate, and Master AI typing bots."
                    : "초대 코드로 친구와 방을 만들어 동일한 코스에서 실시간 타자 스피드 대결을 펼치거나, 초급·중급·상급 AI 타자 봇을 상대로 박진감 넘치는 멀티 레이싱을 경험해보세요."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>{isEn ? "🏆 Hall of Fame Speed Track (20-Station Zero-Error Track)" : "🏆 명예의 전당 (20개 역 노오타 스피드 트랙)"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "20 random stations track requiring 100% accuracy and extreme typing speed for permanent global leaderboard entry."
                    : "20개 역을 오타 없이(정확도 100%) 초고속으로 완주하는 랭킹 트랙. 최고 기록을 달성하면 명예의 전당 글로벌 리더보드에 당신의 타자 닉네임이 자랑스럽게 등록됩니다."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: MAP & SATELLITE */}
          {activeTab === "map" && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Eye className="w-4 h-4 text-sky-500" />
                  <span>{isEn ? "🛰️ Real Satellite Map View vs 🗺️ Standard Map" : "🛰️ 실제 인공위성 촬영 지도 vs 🗺️ 일반 지적도 선택"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "Switch between clean minimalist vector maps and ultra-high-resolution ArcGIS World Imagery satellite photo maps. Toggle anytime via the map's floating bottom-right control button (🛰️/🗺️) or Settings."
                    : "우측 하단 지도 컨트롤의 (🛰️/🗺️) 버튼 또는 설정(Settings) 메뉴에서 언제든지 깔끔한 일반 지적도와 실제 고해상도 ArcGIS World Imagery 인공위성 촬영 지도 레이어를 자유롭게 전환할 수 있습니다."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Palette className="w-4 h-4 text-emerald-500" />
                  <span>{isEn ? "🎨 World Map Fill Mode (Solid Color vs Country Flags)" : "🎨 전세계 지도 채우기 방식 (기본: 단색 채우기 vs 국기 문양)"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "World map mode defaults to clean Solid Color fill (🎨). You can also switch to Country Flag mode (🚩) in Settings to see authentic national flag graphics fill visited countries."
                    : "전세계 모드에서 기본 설정은 깔끔한 단색 채우기(🎨)로 세팅되어 있습니다. 설정 창에서 국기 문양 채우기(🚩)로 변경하면 방문한 세계 국가들이 실제 국기 이미지로 지도에 채워집니다."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span>{isEn ? "🌈 Mode-Specific Visited Region Color Customizer" : "🌈 국가/모드별 방문 지역 커스텀 컬러링"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "Customize visited region map fill colors independently for South Korea, Japan, USA, China, Vietnam, and World maps in Settings."
                    : "설정 창에서 대한민국, 일본, 미국, 중국, 베트남, 전세계 모드 각각의 방문 지역 채우기 색상(예: 에메랄드, 파랑, 보라, 주황 등)을 나만의 취향에 맞게 자유롭게 지정할 수 있습니다."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <span>{isEn ? "🎧 Web Audio Mechanical Typing Sounds" : "🎧 리얼 타격감 오디오 엔진 & 볼륨 조절"}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isEn
                    ? "Includes authentic mechanical keyboard keypress clicks, error alert sounds, and completion chimes with customizable volume."
                    : "기계식 키보드의 경쾌한 타격음, 완성 성공 시의 맑은 차임벨, 오타 경고음 등 풍부한 생동감을 제공하며 설정에서 소리 크기 조절 및 테스트가 가능합니다."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CONTROLS */}
          {activeTab === "controls" && (
            <div className="space-y-3 animate-fade-in">
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xs flex items-center gap-1.5">
                  <Keyboard className="w-4 h-4 text-amber-500" />
                  <span>{isEn ? "Key Shortcuts & Convenience Controls" : "핵심 단축키 및 편의 기능 지원"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "Route & Visited List Toggle" : "노선 경로 & 방문 완료 목록"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      TAB / ALT+N
                    </kbd>
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "Close Modals / Popups" : "모든 모달 창 / 팝업 닫기"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      ESC
                    </kbd>
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "Restart Game Track" : "게임 즉시 재시작 / 새 트랙"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      F2 / ALT+R
                    </kbd>
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "User Guide" : "이용 안내 상세 가이드"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      F1 / ALT+G
                    </kbd>
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "Game Settings" : "설정 창 열기"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      F3 / ALT+S
                    </kbd>
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "Map Explorer" : "지도 탐색기 모달"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      F4 / ALT+M
                    </kbd>
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "Toggle Satellite Map" : "인공위성 지도 전환"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      F6 / ALT+V
                    </kbd>
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{isEn ? "Toggle Typing Lang" : "타자 언어 (한/영) 전환"}</span>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-slate-800 dark:text-slate-200">
                      F7 / ALT+T
                    </kbd>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl text-[11px] text-amber-900 dark:text-amber-300">
                <span className="font-bold">💡 {isEn ? "Interactive Map Explorer & Search:" : "지도 탐색기 & 지명 검색 기능:"}</span>{" "}
                {isEn
                  ? "Click the Map Explorer button at top right to search any global address, inspect exact coordinates, and freely toggle satellite view."
                  : "상단 우측 '지도 탐색기(Map Explorer)' 버튼을 누르면 전세계 주소를 지오코딩으로 검색하고, 해당 지점의 상세 정보 및 위성 지형을 자유롭게 감상할 수 있습니다."}
              </div>
            </div>
          )}

          {/* TAB 5: TIPS */}
          {activeTab === "tips" && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex gap-3">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400 shrink-0 h-fit">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                    {isEn ? "1. Prioritize Accuracy Over Pure Speed!" : "1. 오타 줄이기! 속도보다 정확도가 우선"}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {isEn
                      ? "Using Backspace frequently severely reduces your calculated CPM. Keeping correct finger placement and typing each character precisely yields the highest scores."
                      : "오타 발생 시 백스페이스 수정은 타자속도(CPM) 점수를 크게 낮춥니다. 올바른 기본 손가락 위치를 유지하고 리듬감 있게 정확하게 작성하는 것이 고득점의 핵심 비결입니다."}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0 h-fit">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                    {isEn ? "2. Master English Typing Mode" : "2. 영문 지명 입력(English Typing) 활용"}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {isEn
                      ? "Switch typing language to English in Settings to practice QWERTY typing with romanized place names (e.g., Seoul, Tokyo, New York)."
                      : "설정에서 타자 언어를 영문(English)으로 변경하면 알파벳 지명(예: Seoul, Tokyo, New York)으로 연습할 수 있어 영문 자판 연습과 해외 지명 표기법을 동시에 습득할 수 있습니다."}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex gap-3">
                <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-600 dark:text-sky-400 shrink-0 h-fit">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                    {isEn ? "3. Hall of Fame Leaderboard Strategy" : "3. 명예의 전당 랭킹 등재 노하우"}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {isEn
                      ? "Achieving 100% accuracy and high CPM on the 20-station speed track registers your name on the permanent global leaderboard."
                      : "20개 역 정복 스피드 트랙에서 100% 노오타 정확도와 400 CPM 이상의 타수로 빠르게 완주하면 글로벌 리더보드 최고 상위권에 본인 닉네임을 당당하게 등재시킬 수 있습니다."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {isEn ? "Master geography & typing with Map Typing!" : "즐겁게 지리를 학습하며 완벽한 타자 실력을 완성해보세요!"}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            {isEn ? "Got It!" : "가이드 확인 완료"}
          </button>
        </div>
      </div>
    </div>
  );
};


