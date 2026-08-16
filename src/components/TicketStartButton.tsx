import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "motion/react";
import { Plane, Globe, Ticket, Scissors, MoveDown, Hand, Sparkles } from "lucide-react";
import { playTicketTearSound, playTicketPerforationTickSound } from "../utils/audio";

interface TicketStartButtonProps {
  homeScope: "korea" | "japan" | "usa" | "china" | "vietnam" | "germany" | "france" | "italy" | "world" | "random" | string;
  level: string;
  travelWay: "typing" | "quiz";
  isRankingChallenge: boolean;
  nickname: string;
  targetCount: number;
  ticketTearMode?: "auto" | "manual";
  onStart: () => void;
  onValidateRanking?: () => boolean;
}

interface ScopeTheme {
  topStripe: string;
  logoBg: string;
  logoText: string;
  flightLine: string;
  planeColor: string;
  cardBg: string;
  cardBorder: string;
  planeBg: string;
}

const scopeThemes: Record<string, ScopeTheme> = {
  korea: {
    topStripe: "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400",
    logoBg: "bg-emerald-600 text-white",
    logoText: "text-emerald-700 dark:text-emerald-400",
    flightLine: "border-emerald-300 dark:border-emerald-800/80",
    planeColor: "text-emerald-600 dark:text-emerald-400",
    planeBg: "bg-[#f4faf7] dark:bg-slate-900",
    cardBg: "bg-[#f4faf7] dark:bg-slate-900",
    cardBorder: "border-emerald-200 dark:border-emerald-950",
  },
  japan: {
    topStripe: "bg-gradient-to-r from-red-700 via-rose-500 to-amber-500",
    logoBg: "bg-rose-600 text-white",
    logoText: "text-rose-700 dark:text-rose-400",
    flightLine: "border-rose-300 dark:border-rose-800/80",
    planeColor: "text-rose-600 dark:text-rose-400",
    planeBg: "bg-[#fdfafb] dark:bg-slate-900",
    cardBg: "bg-[#fdfafb] dark:bg-slate-900",
    cardBorder: "border-rose-200 dark:border-rose-950",
  },
  usa: {
    topStripe: "bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-400",
    logoBg: "bg-blue-600 text-white",
    logoText: "text-blue-700 dark:text-blue-400",
    flightLine: "border-blue-300 dark:border-blue-800/80",
    planeColor: "text-blue-600 dark:text-blue-400",
    planeBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBorder: "border-blue-200 dark:border-blue-950",
  },
  china: {
    topStripe: "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400",
    logoBg: "bg-amber-500 text-slate-950",
    logoText: "text-amber-800 dark:text-amber-400",
    flightLine: "border-amber-300 dark:border-amber-800/80",
    planeColor: "text-amber-600 dark:text-amber-400",
    planeBg: "bg-[#fdfbf7] dark:bg-slate-900",
    cardBg: "bg-[#fdfbf7] dark:bg-slate-900",
    cardBorder: "border-amber-200 dark:border-amber-950",
  },
  vietnam: {
    topStripe: "bg-gradient-to-r from-red-700 via-red-600 to-rose-500",
    logoBg: "bg-red-600 text-white font-bold",
    logoText: "text-red-600 dark:text-red-400",
    flightLine: "border-red-300 dark:border-red-800/80",
    planeColor: "text-red-600 dark:text-red-400",
    planeBg: "bg-[#fff8f8] dark:bg-slate-900",
    cardBg: "bg-[#fff8f8] dark:bg-slate-900",
    cardBorder: "border-red-200 dark:border-red-950",
  },
  germany: {
    topStripe: "bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400",
    logoBg: "bg-yellow-500 text-slate-950 font-bold",
    logoText: "text-yellow-700 dark:text-yellow-400",
    flightLine: "border-yellow-300 dark:border-yellow-800/80",
    planeColor: "text-yellow-600 dark:text-yellow-400",
    planeBg: "bg-[#fefdf8] dark:bg-slate-900",
    cardBg: "bg-[#fefdf8] dark:bg-slate-900",
    cardBorder: "border-yellow-200 dark:border-yellow-950",
  },
  france: {
    topStripe: "bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-400",
    logoBg: "bg-blue-600 text-white font-bold",
    logoText: "text-blue-700 dark:text-blue-400",
    flightLine: "border-blue-300 dark:border-blue-800/80",
    planeColor: "text-blue-600 dark:text-blue-400",
    planeBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBorder: "border-blue-200 dark:border-blue-950",
  },
  italy: {
    topStripe: "bg-gradient-to-r from-emerald-600 via-zinc-100 to-rose-600",
    logoBg: "bg-emerald-600 text-white font-bold",
    logoText: "text-emerald-700 dark:text-emerald-400",
    flightLine: "border-emerald-300 dark:border-emerald-800/80",
    planeColor: "text-emerald-600 dark:text-emerald-400",
    planeBg: "bg-[#f4faf7] dark:bg-slate-900",
    cardBg: "bg-[#f4faf7] dark:bg-slate-900",
    cardBorder: "border-emerald-200 dark:border-emerald-950",
  },
  spain: {
    topStripe: "bg-gradient-to-r from-red-600 via-yellow-500 to-red-600",
    logoBg: "bg-red-600 text-white font-bold",
    logoText: "text-red-700 dark:text-red-400",
    flightLine: "border-red-300 dark:border-red-800/80",
    planeColor: "text-red-600 dark:text-red-400",
    planeBg: "bg-[#fff8f8] dark:bg-slate-900",
    cardBg: "bg-[#fff8f8] dark:bg-slate-900",
    cardBorder: "border-red-200 dark:border-red-950",
  },
  uk: {
    topStripe: "bg-gradient-to-r from-blue-900 via-red-600 to-blue-800",
    logoBg: "bg-blue-900 text-white font-bold",
    logoText: "text-blue-900 dark:text-blue-400",
    flightLine: "border-blue-300 dark:border-blue-800/80",
    planeColor: "text-blue-800 dark:text-blue-400",
    planeBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBorder: "border-blue-200 dark:border-blue-950",
  },
  world: {
    topStripe: "bg-gradient-to-r from-slate-700 via-slate-600 to-amber-500",
    logoBg: "bg-slate-700 text-white",
    logoText: "text-slate-700 dark:text-slate-300",
    flightLine: "border-slate-300 dark:border-slate-700",
    planeColor: "text-slate-600 dark:text-slate-400",
    planeBg: "bg-[#f8fafc] dark:bg-slate-900",
    cardBg: "bg-[#f8fafc] dark:bg-slate-900",
    cardBorder: "border-slate-200 dark:border-slate-800",
  },
};

interface ScrapParticle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  size: number;
  vx: number;
  vy: number;
}

export const TicketStartButton: React.FC<TicketStartButtonProps> = ({
  homeScope,
  level,
  travelWay,
  isRankingChallenge,
  nickname,
  targetCount,
  ticketTearMode = "auto",
  onStart,
  onValidateRanking,
}) => {
  const [isTearing, setIsTearing] = useState(false);
  const [tearProgress, setTearProgress] = useState(0); // 0.0 ~ 1.0 continuous tear progress
  const [isFullyTorn, setIsFullyTorn] = useState(false);
  const [boardingTime, setBoardingTime] = useState("");
  const [particles, setParticles] = useState<ScrapParticle[]>([]);

  const lastTickThreshold = useRef(-1);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setBoardingTime(`${hrs}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => {
      clearInterval(timer);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const theme = scopeThemes[homeScope] || scopeThemes.korea;

  const destinationMap = {
    korea: { code: "KOR", kr: "대한민국" },
    japan: { code: "JPN", kr: "일본" },
    usa: { code: "USA", kr: "미국" },
    china: { code: "CHN", kr: "중국" },
    vietnam: { code: "VNM", kr: "베트남" },
    germany: { code: "DEU", kr: "독일" },
    france: { code: "FRA", kr: "프랑스" },
    italy: { code: "ITA", kr: "이탈리아" },
    spain: { code: "ESP", kr: "스페인" },
    uk: { code: "GBR", kr: "영국" },
    world: { code: "WLD", kr: "전세계" },
  };

  const dest = destinationMap[homeScope] || destinationMap.korea;

  let unitText = "구역";
  if (homeScope === "korea") {
    unitText = level === "sido" ? "광역시도" : "시군구";
  } else if (homeScope === "japan") {
    unitText = "도도부현";
  } else if (homeScope === "usa") {
    unitText = "50개 주";
  } else if (homeScope === "china") {
    unitText = "성·행정구";
  } else if (homeScope === "vietnam") {
    unitText = "주요 성·시";
  } else if (homeScope === "germany") {
    unitText = "16개 연방주";
  } else if (homeScope === "france") {
    unitText = "18개 레지옹";
  } else if (homeScope === "italy") {
    unitText = "20개 주";
  } else if (homeScope === "spain") {
    unitText = "17개 자치주·시";
  } else if (homeScope === "uk") {
    unitText = "113개 자치구·카운티";
  } else if (homeScope === "world") {
    unitText = "세계 국가";
  }

  // Spawn paper scrap particles along the active tearing Y position
  const spawnParticlesAtRatio = (ratio: number) => {
    const yPos = ratio * 160;
    const newItems: ScrapParticle[] = [];
    for (let i = 0; i < 3; i++) {
      newItems.push({
        id: Math.random(),
        x: (Math.random() - 0.5) * 16,
        y: yPos + (Math.random() - 0.5) * 8,
        rotate: Math.random() * 360,
        size: Math.random() * 5 + 3,
        vx: (Math.random() + 0.2) * 50,
        vy: (Math.random() - 0.4) * 60,
      });
    }
    setParticles((prev) => [...prev.slice(-18), ...newItems]);
  };

  // Check perforation ticks (8 ticks along the seam)
  const checkTearMilestones = (ratio: number) => {
    const step = Math.floor(ratio * 8);
    if (step > lastTickThreshold.current && ratio > 0.05) {
      lastTickThreshold.current = step;
      playTicketPerforationTickSound();
      spawnParticlesAtRatio(ratio);
    }
  };

  // Slow continuous automatic tear animation
  const startAutoTearAnimation = () => {
    if (isTearing || isFullyTorn) return;
    if (onValidateRanking && !onValidateRanking()) {
      return;
    }

    setIsTearing(true);
    setTearProgress(0);
    lastTickThreshold.current = -1;

    const startTime = performance.now();
    const tearDuration = 800; // 800ms gradual, realistic tearing!

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / tearDuration);

      setTearProgress(progress);
      checkTearMilestones(progress);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        // Full tear complete!
        playTicketTearSound();
        setIsFullyTorn(true);

        setTimeout(() => {
          onStart();
          setTimeout(() => {
            setIsTearing(false);
            setIsFullyTorn(false);
            setTearProgress(0);
            lastTickThreshold.current = -1;
          }, 400);
        }, 300);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  // Drag handler for manual tearing mode
  const handleDrag = (_: any, info: PanInfo) => {
    if (isTearing || isFullyTorn) return;

    // Measure drag distance (downwards + slightly outwards)
    const dist = Math.max(0, info.offset.y * 0.9 + info.offset.x * 0.35);
    const maxDist = 110;
    const ratio = Math.min(1, Math.max(0, dist / maxDist));

    setTearProgress(ratio);
    checkTearMilestones(ratio);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isTearing || isFullyTorn) return;

    const dist = Math.max(0, info.offset.y * 0.9 + info.offset.x * 0.35);
    const velocity = info.velocity.y;

    if (dist >= 70 || velocity > 220) {
      // Completed manual tear!
      if (onValidateRanking && !onValidateRanking()) {
        setTearProgress(0);
        lastTickThreshold.current = -1;
        return;
      }

      setIsTearing(true);
      playTicketTearSound();

      // Finish remaining tear progress smoothly
      const startProg = tearProgress;
      const startTime = performance.now();
      const finishDuration = 220;

      const finishStep = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, startProg + (1 - startProg) * (elapsed / finishDuration));
        setTearProgress(p);

        if (p < 1) {
          animationFrameRef.current = requestAnimationFrame(finishStep);
        } else {
          setIsFullyTorn(true);
          setTimeout(() => {
            onStart();
            setTimeout(() => {
              setIsTearing(false);
              setIsFullyTorn(false);
              setTearProgress(0);
              lastTickThreshold.current = -1;
            }, 400);
          }, 300);
        }
      };

      animationFrameRef.current = requestAnimationFrame(finishStep);
    } else {
      // Snap back if not torn far enough
      setTearProgress(0);
      lastTickThreshold.current = -1;
    }
  };

  return (
    <div className="w-full relative select-none pt-1">
      {/* Flight Boarding Pass Card Wrapper */}
      <div
        className={`relative w-full ${theme.cardBg} border ${theme.cardBorder} rounded-3xl shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl`}
      >
        {/* Top Airline Accent Stripe */}
        <div className={`h-1.5 w-full ${theme.topStripe}`} />

        <div className="flex flex-row items-stretch min-h-[175px] relative">
          {/* ================= LEFT MAIN TICKET BODY ================= */}
          <motion.div
            animate={{
              x: -tearProgress * 6,
              rotate: -tearProgress * 1.5,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex-1 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between relative"
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-5 h-5 rounded-md ${theme.logoBg} flex items-center justify-center font-bold shadow-xs`}
                >
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span className={`text-xs font-black tracking-wider ${theme.logoText} font-mono`}>
                  MAP TYPING
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-black text-slate-800 dark:text-slate-200 tracking-tight leading-none">
                  탑승권
                </div>
                <div className="text-[8px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                  BOARDING PASS
                </div>
              </div>
            </div>

            {/* Route row: ROOM ---- ✈ ---- DEST */}
            <div className="my-2 flex items-center justify-between px-1">
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tighter">
                  ROOM
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  방구석
                </div>
              </div>

              {/* Dotted Flight Line & Plane */}
              <div className="flex-1 mx-3 flex items-center justify-center relative">
                <div className={`w-full border-b-2 border-dashed ${theme.flightLine}`} />
                <div className={`absolute p-1 ${theme.planeBg} ${theme.planeColor}`}>
                  <Plane className="w-4 h-4 rotate-90 stroke-[2.5]" />
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tighter">
                  {dest.code}
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {dest.kr}
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-800 my-0.5" />

            {/* Details Grid (4 items) */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-left pt-0.5">
              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  탑승객 <span className="font-mono text-[8px] text-slate-400">PASSENGER</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                  {nickname.trim() || "방구석 여행자"}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  방식 <span className="font-mono text-[8px] text-slate-400">CLASS</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                  {travelWay === "quiz"
                    ? "퀴즈 연습"
                    : isRankingChallenge
                    ? "타자 (랭킹)"
                    : "타자 연습"}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  단위 <span className="font-mono text-[8px] text-slate-400">UNIT</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                  {unitText}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  지역 <span className="font-mono text-[8px] text-slate-400">STOPS</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {targetCount}곳
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= SEAM NOTCHES & DASHED PERFORATION ================= */}
          <div className="relative w-0 flex items-center justify-center z-10 select-none">
            {/* Top semicircle cutout */}
            <div className="absolute -top-2 -translate-x-1/2 w-4 h-4 bg-slate-100 dark:bg-slate-950 rounded-full border-b border-slate-300 dark:border-slate-800 shadow-inner z-20" />
            {/* Bottom semicircle cutout */}
            <div className="absolute -bottom-2 -translate-x-1/2 w-4 h-4 bg-slate-100 dark:bg-slate-950 rounded-full border-t border-slate-300 dark:border-slate-800 shadow-inner z-20" />
            
            {/* Vertical dashed perforation line */}
            <div className="h-full border-r-2 border-dashed border-slate-300 dark:border-slate-700" />

            {/* Progressive Jagged Rip Line Effect SVG */}
            {tearProgress > 0 && (
              <svg
                className="absolute left-0 top-0 h-full w-5 -translate-x-1/2 overflow-visible pointer-events-none z-30"
                viewBox="0 0 16 160"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 8 0 L 13 14 L 3 28 L 14 42 L 2 56 L 12 70 L 4 84 L 13 98 L 3 112 L 11 126 L 5 140 L 8 160"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.8"
                  style={{
                    pathLength: tearProgress,
                  }}
                  className="drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]"
                />
              </svg>
            )}

            {/* Floating Paper Scrap Particles on Rip */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: p.y, opacity: 1, scale: 1, rotate: p.rotate }}
                animate={{
                  x: p.vx * 1.6,
                  y: p.y + p.vy,
                  opacity: 0,
                  rotate: p.rotate + 360,
                  scale: 0.2,
                }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="absolute w-2 h-3 bg-white/95 dark:bg-slate-200 border border-slate-300 rounded-2xs shadow-xs pointer-events-none z-40"
              />
            ))}
          </div>

          {/* ================= RIGHT BLACK STUB (DEPARTURE / TEAR STUB) ================= */}
          <motion.button
            type="button"
            drag={ticketTearMode === "manual" && !isTearing && !isFullyTorn ? "y" : false}
            dragConstraints={{ top: 0, bottom: 130, left: 0, right: 60 }}
            dragElastic={0.15}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onClick={startAutoTearAnimation}
            animate={
              isFullyTorn
                ? {
                    x: 320,
                    y: 160,
                    rotate: 65,
                    skewY: 10,
                    opacity: 0,
                    scale: 0.7,
                  }
                : tearProgress > 0
                ? {
                    x: tearProgress * 26,
                    y: tearProgress * 55,
                    rotate: tearProgress * 28,
                    skewY: -tearProgress * 6,
                    opacity: 1,
                    scale: 1 + tearProgress * 0.03,
                  }
                : { x: 0, y: 0, rotate: 0, skewY: 0, opacity: 1, scale: 1 }
            }
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 280,
            }}
            className={`w-28 sm:w-32 md:w-36 bg-slate-950 dark:bg-slate-950 text-white flex flex-col items-center justify-between p-3.5 relative cursor-grab active:cursor-grabbing group hover:bg-slate-900 transition-colors shrink-0 rounded-r-3xl border-l border-slate-800 select-none overflow-hidden touch-none ${
              isTearing || isFullyTorn ? "pointer-events-none" : ""
            }`}
          >
            {/* Tear Line Flash / Spark line on rip */}
            {tearProgress > 0 && (
              <motion.div
                style={{ height: `${tearProgress * 100}%` }}
                className="absolute left-0 top-0 w-1.5 bg-white/95 shadow-[0_0_14px_rgba(255,255,255,1)] z-30"
              />
            )}

            {/* Scissor / Tear Hint */}
            <div className="absolute top-2 left-2 text-slate-500 opacity-60 group-hover:opacity-100 transition-opacity">
              <Scissors className={`w-3.5 h-3.5 -rotate-90 ${tearProgress > 0 ? "animate-bounce text-amber-400" : ""}`} />
            </div>

            {/* Direct Tear Drag Handle Overlay Badge for Manual Mode */}
            {ticketTearMode === "manual" && !isTearing && tearProgress === 0 && (
              <div className="absolute top-1.5 right-2 flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded-full text-[8px] font-bold animate-pulse">
                <Hand className="w-2.5 h-2.5" />
                <span>드래그</span>
              </div>
            )}

            {/* Active tearing percentage badge */}
            {tearProgress > 0 && !isFullyTorn && (
              <div className="absolute top-1.5 right-2 bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full text-[8px] font-black shadow-xs flex items-center gap-0.5 animate-pulse">
                <Sparkles className="w-2 h-2" />
                <span>{Math.round(tearProgress * 100)}% 뜯음</span>
              </div>
            )}

            {/* Stub Content */}
            <div className="flex flex-col items-center justify-center my-auto text-center w-full">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white group-hover:text-amber-400 transition-colors drop-shadow-sm flex items-center gap-1">
                출발
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                BOARDING
              </span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-200 mt-1">
                {boardingTime || "11:03"}
              </span>

              {/* Touch Drag Down Cue Arrow in Manual Mode */}
              {ticketTearMode === "manual" && tearProgress === 0 && (
                <div className="mt-1 flex items-center gap-0.5 text-[9px] font-bold text-amber-400 animate-bounce">
                  <MoveDown className="w-3 h-3" />
                  <span>천천히 잡고 뜯기</span>
                </div>
              )}
            </div>

            {/* Decorative Barcode graphic */}
            <div className="w-full flex justify-between items-end h-6 px-1.5 opacity-60 group-hover:opacity-90 transition-opacity mt-1">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2, 1].map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-300 dark:bg-slate-400 rounded-xs h-full"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </div>

            {/* Hover ripple overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-r-3xl transition-opacity pointer-events-none" />
          </motion.button>
        </div>
      </div>

      {/* Sub-label under ticket */}
      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium text-center mt-2 flex items-center justify-center gap-1">
        <Ticket className="w-3.5 h-3.5 text-amber-500" />
        {ticketTearMode === "manual" ? (
          <span className="font-bold text-slate-700 dark:text-slate-300">
            🖐️ 탑승권 [출발]을 손가락/마우스로 <strong className="text-amber-600 dark:text-amber-400">천천히 아래로 잡아당겨 뜯어보세요!</strong> (점선 구멍 소리와 함께 뜯어집니다)
          </span>
        ) : (
          <span>우측 검정색 탑승권 [출발]을 누르면 점선을 따라 천천히 실감나게 뜯어집니다.</span>
        )}
      </p>
    </div>
  );
};
