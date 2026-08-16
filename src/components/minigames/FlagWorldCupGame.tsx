import React, { useState, useMemo } from "react";
import { Region } from "../../types";
import { WORLD_COUNTRIES } from "../../data/worldCountries";
import { playSuccessSound, playCompleteSound } from "../../utils/audio";
import { ChevronLeft, RotateCcw, Trophy, Crown, Heart, Sparkles } from "lucide-react";

interface FlagWorldCupGameProps {
  onBackToList: () => void;
}

export const FlagWorldCupGame: React.FC<FlagWorldCupGameProps> = ({ onBackToList }) => {
  // Pick 16 distinct popular/interesting countries
  const candidateCountries = useMemo(() => {
    return [...WORLD_COUNTRIES]
      .filter((c) => c.id !== "xk" && c.id.length === 2)
      .sort(() => Math.random() - 0.5)
      .slice(0, 16);
  }, []);

  const [currentRoundList, setCurrentRoundList] = useState<Region[]>(candidateCountries);
  const [nextRoundList, setNextRoundList] = useState<Region[]>([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [winner, setWinner] = useState<Region | null>(null);

  const optionA = currentRoundList[matchIndex * 2];
  const optionB = currentRoundList[matchIndex * 2 + 1];

  const roundName = useMemo(() => {
    if (currentRoundList.length === 16) return "16강";
    if (currentRoundList.length === 8) return "8강";
    if (currentRoundList.length === 4) return "4강 (준결승)";
    if (currentRoundList.length === 2) return "결승전 (FINAL)";
    return "";
  }, [currentRoundList.length]);

  const handlePick = (chosen: Region) => {
    playSuccessSound();
    const updatedNext = [...nextRoundList, chosen];

    // If current round matches are done
    if ((matchIndex + 1) * 2 >= currentRoundList.length) {
      if (updatedNext.length === 1) {
        // We have a winner!
        setWinner(updatedNext[0]);
        playCompleteSound();
      } else {
        // Next tournament round
        setCurrentRoundList(updatedNext);
        setNextRoundList([]);
        setMatchIndex(0);
      }
    } else {
      setNextRoundList(updatedNext);
      setMatchIndex((p) => p + 1);
    }
  };

  const handleRestart = () => {
    const fresh = [...WORLD_COUNTRIES]
      .filter((c) => c.id !== "xk" && c.id.length === 2)
      .sort(() => Math.random() - 0.5)
      .slice(0, 16);
    setCurrentRoundList(fresh);
    setNextRoundList([]);
    setMatchIndex(0);
    setWinner(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
        <button
          type="button"
          onClick={onBackToList}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>목록</span>
        </button>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          국기 이상형 월드컵 (16강)
        </h1>

        <div className="w-16" />
      </div>

      {!winner ? (
        <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl text-center">
          {/* Round Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-extrabold text-xs rounded-full border border-amber-300 dark:border-amber-700">
              🏆 {roundName}
            </span>
            <span className="text-xs font-bold text-slate-500">
              매치 {matchIndex + 1} / {currentRoundList.length / 2}
            </span>
          </div>

          <p className="text-sm font-black text-slate-800 dark:text-slate-200 mb-6">
            더 마음에 드는 아름다운 국기를 선택해주세요!
          </p>

          {/* 2 Flag Options Versus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Option A */}
            {optionA && (
              <button
                type="button"
                onClick={() => handlePick(optionA)}
                className="group flex flex-col items-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 rounded-3xl transition-all duration-200 hover:shadow-xl cursor-pointer"
              >
                <div className="w-full max-w-[240px] aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={`https://flagcdn.com/w640/${optionA.id.toLowerCase()}.png`}
                    alt={optionA.name_kr}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  {optionA.name_kr}
                </span>
                <span className="text-xs text-slate-400 font-medium">({optionA.name_en})</span>
              </button>
            )}

            {/* Option B */}
            {optionB && (
              <button
                type="button"
                onClick={() => handlePick(optionB)}
                className="group flex flex-col items-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 rounded-3xl transition-all duration-200 hover:shadow-xl cursor-pointer"
              >
                <div className="w-full max-w-[240px] aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={`https://flagcdn.com/w640/${optionB.id.toLowerCase()}.png`}
                    alt={optionB.name_kr}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  {optionB.name_kr}
                </span>
                <span className="text-xs text-slate-400 font-medium">({optionB.name_en})</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Winner Display */
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-scale-in">
          <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-950/50 rounded-2xl text-amber-600 dark:text-amber-400 border border-amber-300">
            <Crown className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-1">
              🏆 우승 국기
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {winner.name_kr}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">({winner.name_en})</p>
          </div>

          <div className="w-full max-w-[280px] mx-auto aspect-[3/2] rounded-2xl overflow-hidden shadow-xl border-4 border-amber-400 bg-white my-4">
            <img
              src={`https://flagcdn.com/w640/${winner.id.toLowerCase()}.png`}
              alt={winner.name_kr}
              className="w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>새 월드컵 시작</span>
            </button>
            <button
              type="button"
              onClick={onBackToList}
              className="py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-black text-sm rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>미니게임 목록</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
