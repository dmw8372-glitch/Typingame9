import React, { useState, useEffect } from "react";
import { FlagTypingGame } from "./FlagTypingGame";
import { FlagQuizGame } from "./FlagQuizGame";
import { FlagWorldCupGame } from "./FlagWorldCupGame";
import { CountryCapitalGame } from "./CountryCapitalGame";
import { ChevronLeft, Play, Trophy, Sparkles, Gamepad2 } from "lucide-react";

type MiniGameMode = "menu" | "flag_typing" | "flag_quiz" | "flag_worldcup" | "country_capital";
type FilterCategory = "all" | "typing" | "quiz" | "worldcup";

interface MiniGamesHubProps {
  onBackToMain: () => void;
  onOpenLeaderboard?: () => void;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({ onBackToMain, onOpenLeaderboard }) => {
  const [activeGame, setActiveGame] = useState<MiniGameMode>("menu");
  const [filter, setFilter] = useState<FilterCategory>("all");

  // Load records from local storage
  const [flagTypingLast, setFlagTypingLast] = useState<{ score: number; missed: number } | null>(null);
  const [flagTypingBest, setFlagTypingBest] = useState<{ score: number; missed: number } | null>(null);
  const [flagQuizLast, setFlagQuizLast] = useState<number | null>(null);
  const [flagQuizBest, setFlagQuizBest] = useState<number | null>(null);

  const loadRecords = () => {
    const ftLastScore = localStorage.getItem("typetrip_flag_typing_last_score");
    const ftLastMissed = localStorage.getItem("typetrip_flag_typing_last_missed");
    if (ftLastScore !== null) {
      setFlagTypingLast({
        score: parseInt(ftLastScore, 10),
        missed: parseInt(ftLastMissed || "0", 10),
      });
    }

    const ftBestScore = localStorage.getItem("typetrip_flag_typing_best");
    const ftBestMissed = localStorage.getItem("typetrip_flag_typing_best_missed");
    if (ftBestScore !== null) {
      setFlagTypingBest({
        score: parseInt(ftBestScore, 10),
        missed: parseInt(ftBestMissed || "0", 10),
      });
    }

    const fqLastScore = localStorage.getItem("typetrip_flag_quiz_last_score");
    if (fqLastScore !== null) {
      setFlagQuizLast(parseInt(fqLastScore, 10));
    }

    const fqBestScore = localStorage.getItem("typetrip_flag_quiz_best");
    if (fqBestScore !== null) {
      setFlagQuizBest(parseInt(fqBestScore, 10));
    }
  };

  useEffect(() => {
    loadRecords();
  }, [activeGame]);

  if (activeGame === "flag_typing") {
    return (
      <FlagTypingGame
        onBackToList={() => {
          setActiveGame("menu");
          loadRecords();
        }}
      />
    );
  }

  if (activeGame === "flag_quiz") {
    return (
      <FlagQuizGame
        onBackToList={() => {
          setActiveGame("menu");
          loadRecords();
        }}
      />
    );
  }

  if (activeGame === "flag_worldcup") {
    return (
      <FlagWorldCupGame
        onBackToList={() => {
          setActiveGame("menu");
          loadRecords();
        }}
      />
    );
  }

  if (activeGame === "country_capital") {
    return (
      <CountryCapitalGame
        onBackToList={() => {
          setActiveGame("menu");
          loadRecords();
        }}
      />
    );
  }

  // Games definition
  const games = [
    {
      id: "flag_typing" as MiniGameMode,
      category: "typing" as FilterCategory,
      tag: "국기",
      title: "국기 타이핑",
      description: "국기를 보고 나라 이름을 입력해요",
      recordString: flagTypingLast
        ? `직전 ${flagTypingLast.score}개 맞힘 · 오답 ${flagTypingLast.missed}  최고 ${flagTypingBest?.score || 0}개 맞힘 · 오답 ${flagTypingBest?.missed || 0}`
        : "아직 기록 없음",
      hasRecord: !!flagTypingLast,
      badgeColor: "text-blue-600 dark:text-blue-400",
      banner: (
        <div className="w-full h-44 sm:h-52 bg-gradient-to-b from-[#1e4579] to-[#0f274a] relative overflow-hidden flex items-center justify-center p-4">
          {/* Background flags */}
          <div className="absolute left-6 bottom-8 w-24 h-16 rounded-md overflow-hidden shadow-lg -rotate-12 opacity-85 border border-white/20">
            <img src="https://flagcdn.com/w160/br.png" alt="Brazil" className="w-full h-full object-cover" />
          </div>
          <div className="absolute right-6 bottom-8 w-24 h-16 rounded-md overflow-hidden shadow-lg rotate-12 opacity-85 border border-white/20">
            <img src="https://flagcdn.com/w160/za.png" alt="South Africa" className="w-full h-full object-cover" />
          </div>

          {/* Center Flag: South Korea */}
          <div className="relative z-10 w-36 h-24 sm:w-44 sm:h-28 rounded-lg overflow-hidden shadow-2xl border-2 border-white/60">
            <img src="https://flagcdn.com/w320/kr.png" alt="Korea" className="w-full h-full object-cover" />
          </div>

          {/* Typing Prompt Bubble */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-slate-950/80 backdrop-blur-md px-5 py-1.5 rounded-full border border-white/30 text-white font-black text-xs sm:text-sm tracking-wider flex items-center gap-1 shadow-lg">
            <span>대한민</span>
            <span className="w-1.5 h-3.5 bg-white animate-pulse" />
          </div>
        </div>
      ),
    },
    {
      id: "flag_quiz" as MiniGameMode,
      category: "quiz" as FilterCategory,
      tag: "국기",
      title: "국기 퀴즈",
      description: "국기를 보고 나라 이름을 넷 중에서 골라요",
      recordString: flagQuizLast !== null
        ? `직전 ${flagQuizLast}개 맞힘   최고 ${flagQuizBest || 0}개 맞힘`
        : "아직 기록 없음",
      hasRecord: flagQuizLast !== null,
      badgeColor: "text-blue-600 dark:text-blue-400",
      banner: (
        <div className="w-full h-44 sm:h-52 bg-gradient-to-b from-[#183968] to-[#0c203d] relative overflow-hidden flex items-center justify-center p-4">
          <div className="grid grid-cols-2 gap-2 w-48 sm:w-56">
            <div className="aspect-[3/2] rounded-md overflow-hidden shadow-md border border-white/20">
              <img src="https://flagcdn.com/w160/fi.png" alt="Finland" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/2] rounded-md overflow-hidden shadow-md border border-white/20">
              <img src="https://flagcdn.com/w160/kr.png" alt="Korea" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/2] rounded-md overflow-hidden shadow-md border border-white/20">
              <img src="https://flagcdn.com/w160/mx.png" alt="Mexico" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/2] rounded-md overflow-hidden shadow-md border border-white/20">
              <img src="https://flagcdn.com/w160/au.png" alt="Australia" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Question Badge */}
          <div className="absolute right-6 bottom-4 w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-xl border-2 border-white">
            ?
          </div>
        </div>
      ),
    },
    {
      id: "country_capital" as MiniGameMode,
      category: "quiz" as FilterCategory,
      tag: "수도",
      title: "세계 수도 맞히기",
      description: "나라 이름을 보고 올바른 수도를 맞혀보세요",
      recordString: "10문제 스피드 퀴즈",
      hasRecord: true,
      badgeColor: "text-emerald-600 dark:text-emerald-400",
      banner: (
        <div className="w-full h-44 sm:h-52 bg-gradient-to-b from-[#144436] to-[#0a261e] relative overflow-hidden flex flex-col items-center justify-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-11 rounded-lg overflow-hidden shadow-lg border border-white/30">
              <img src="https://flagcdn.com/w160/fr.png" alt="France" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black text-white">➔</span>
            <div className="bg-white/10 backdrop-blur-md border border-white/30 px-3.5 py-2 rounded-xl text-white font-black text-sm">
              파리 (Paris)
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "flag_worldcup" as MiniGameMode,
      category: "worldcup" as FilterCategory,
      tag: "월드컵",
      title: "국기 이상형 월드컵",
      description: "가장 아름다운 세계 국기를 골라보세요 (16강)",
      recordString: "16강 토너먼트",
      hasRecord: true,
      badgeColor: "text-amber-600 dark:text-amber-400",
      banner: (
        <div className="w-full h-44 sm:h-52 bg-gradient-to-b from-[#472265] to-[#251036] relative overflow-hidden flex items-center justify-center p-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-16 rounded-lg overflow-hidden shadow-xl -rotate-6 border-2 border-amber-300">
              <img src="https://flagcdn.com/w160/jp.png" alt="Japan" className="w-full h-full object-cover" />
            </div>
            <span className="text-amber-400 font-black text-xl italic drop-shadow-md">VS</span>
            <div className="w-24 h-16 rounded-lg overflow-hidden shadow-xl rotate-6 border-2 border-amber-300">
              <img src="https://flagcdn.com/w160/us.png" alt="USA" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const filteredGames = games.filter((g) => {
    if (filter === "all") return true;
    return g.category === filter;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center animate-fade-in select-none text-slate-800 dark:text-slate-100">
      {/* Top Header Navigation */}
      <div className="w-full flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onBackToMain}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>메인</span>
        </button>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          미니게임
        </h1>

        <div className="w-16" />
      </div>

      {/* Subtitle */}
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-5">
        짧게 한 판. 플레이하고 최고 기록에 도전해보세요.
      </p>

      {/* Category Filter Pills (matches screenshot) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
            filter === "all"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          전체 {games.length}
        </button>
        <button
          type="button"
          onClick={() => setFilter("typing")}
          className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
            filter === "typing"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          타이핑 {games.filter((g) => g.category === "typing").length}
        </button>
        <button
          type="button"
          onClick={() => setFilter("quiz")}
          className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
            filter === "quiz"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          퀴즈 {games.filter((g) => g.category === "quiz").length}
        </button>
        <button
          type="button"
          onClick={() => setFilter("worldcup")}
          className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
            filter === "worldcup"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          월드컵 {games.filter((g) => g.category === "worldcup").length}
        </button>
      </div>

      {/* Retro Cartridge Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="flex flex-col rounded-3xl overflow-hidden bg-slate-200/90 dark:bg-slate-800/90 border-2 border-slate-300 dark:border-slate-700 p-2.5 shadow-lg relative group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Top Cartridge Vents / Slits */}
            <div className="w-full flex items-center justify-center gap-1.5 pb-2 px-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-1 h-2 bg-slate-400/50 dark:bg-slate-600/50 rounded-full" />
              ))}
            </div>

            {/* Cartridge Main Body */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col flex-1">
              {/* Artwork Banner */}
              {game.banner}

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                <div className="space-y-1">
                  <span className={`text-[11px] font-black uppercase tracking-wider block ${game.badgeColor}`}>
                    {game.tag}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {game.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 font-mono font-medium block truncate">
                    {game.recordString}
                  </span>
                </div>
              </div>

              {/* Bottom Gold Cartridge Pins Bar */}
              <div className="w-full h-3 bg-amber-200/80 dark:bg-amber-900/60 border-t border-amber-300 dark:border-amber-700 flex items-center justify-around px-2">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-full bg-amber-500/70" />
                ))}
              </div>
            </div>

            {/* Action Button Below Cartridge */}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setActiveGame(game.id)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>시작하기</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
