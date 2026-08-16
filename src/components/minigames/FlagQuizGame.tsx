import React, { useState, useEffect, useMemo } from "react";
import { Region } from "../../types";
import { getFlagGameCountries } from "../../utils/countrySynonyms";
import { playSuccessSound, playCompleteSound } from "../../utils/audio";
import { ChevronLeft, RotateCcw, Trophy, CheckCircle2, XCircle } from "lucide-react";

interface FlagQuizGameProps {
  onBackToList: () => void;
}

export const FlagQuizGame: React.FC<FlagQuizGameProps> = ({ onBackToList }) => {
  const allCountries = useMemo(() => getFlagGameCountries(), []);
  const [shuffledList, setShuffledList] = useState<Region[]>(() => {
    return [...allCountries].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasStarted, setHasStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem("typetrip_flag_quiz_best");
    return saved ? parseInt(saved, 10) : 0;
  });

  const currentCountry = shuffledList[currentIndex] || shuffledList[0];

  // 4 choices for current country (1 correct + 3 random distractors)
  const choices = useMemo(() => {
    if (!currentCountry) return [];
    const distractors = allCountries
      .filter((c) => c.id !== currentCountry.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...distractors, currentCountry].sort(() => Math.random() - 0.5);
  }, [currentCountry, currentIndex, allCountries]);

  // Timer countdown
  useEffect(() => {
    let interval: number | null = null;
    if (hasStarted && !isGameOver) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasStarted, isGameOver]);

  const handleGameOver = () => {
    setIsGameOver(true);
    playCompleteSound();
    setCorrectCount((finalScore) => {
      localStorage.setItem("typetrip_flag_quiz_last_score", String(finalScore));
      const curBest = parseInt(localStorage.getItem("typetrip_flag_quiz_best") || "0", 10);
      if (finalScore > curBest) {
        localStorage.setItem("typetrip_flag_quiz_best", String(finalScore));
        setBestScore(finalScore);
      }
      return finalScore;
    });
  };

  const handleSelectChoice = (choice: Region) => {
    if (isAnswerRevealed || isGameOver) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    setSelectedChoice(choice.id);
    setIsAnswerRevealed(true);

    const isCorrect = choice.id === currentCountry.id;
    if (isCorrect) {
      playSuccessSound();
      setCorrectCount((p) => p + 1);
    } else {
      setWrongCount((p) => p + 1);
    }

    setTimeout(() => {
      setSelectedChoice(null);
      setIsAnswerRevealed(false);
      setCurrentIndex((p) => (p + 1) % shuffledList.length);
    }, 450);
  };

  const handleRestart = () => {
    setShuffledList([...allCountries].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSelectedChoice(null);
    setIsAnswerRevealed(false);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeLeft(60);
    setHasStarted(false);
    setIsGameOver(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Top Header */}
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
          국기 퀴즈 (4지선다)
        </h1>

        <div className="w-16" />
      </div>

      {!isGameOver ? (
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
          {/* Top Status */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={onBackToList}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              그만하기
            </button>

            <div className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300">
              {!hasStarted ? "선택하면 60초 타이머 시작" : `⏱️ ${timeLeft}초`}
            </div>

            <div className="text-xs sm:text-sm font-black text-blue-600 dark:text-blue-400">
              {correctCount} 맞힘
            </div>
          </div>

          {/* Flag Box */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="w-56 h-36 sm:w-64 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 dark:border-slate-700 bg-white">
              <img
                src={`https://flagcdn.com/w640/${currentCountry.id.toLowerCase()}.png`}
                alt="Country Flag"
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {choices.map((choice, idx) => {
              let btnClass = "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100";
              if (isAnswerRevealed) {
                if (choice.id === currentCountry.id) {
                  btnClass = "bg-emerald-600 border-emerald-600 text-white font-black";
                } else if (choice.id === selectedChoice) {
                  btnClass = "bg-rose-600 border-rose-600 text-white font-black";
                }
              }

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelectChoice(choice)}
                  disabled={isAnswerRevealed}
                  className={`p-3.5 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${btnClass}`}
                >
                  <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <span className="truncate">{choice.name_kr}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>진행: {currentIndex + 1}번째</span>
            <span>최고 기록: <strong className="text-amber-500">{bestScore}개</strong></span>
          </div>
        </div>
      ) : (
        /* Result */
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-scale-in">
          <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-950/50 rounded-2xl text-blue-600 dark:text-blue-400 mb-1 border border-blue-200 dark:border-blue-800">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              국기 퀴즈 종료!
            </h2>
            <p className="text-xs text-slate-500 mt-1">60초 동안 빠르고 정확하게 선택했어요.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-emerald-600 block">맞힌 개수</span>
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono">{correctCount}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-500 block">틀린 개수</span>
              <span className="text-2xl font-black text-slate-700 dark:text-slate-300 font-mono">{wrongCount}</span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-amber-600 block">최고 기록</span>
              <span className="text-2xl font-black text-amber-700 dark:text-amber-300 font-mono">{bestScore}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 하기</span>
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

      {/* Description */}
      <div className="w-full max-w-xl mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-left space-y-2 select-none">
        <h3 className="text-sm font-black text-slate-900 dark:text-white">이 게임은</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          국기를 보고 4개의 보기 중 올바른 나라 이름을 고르는 퀴즈입니다. 60초 동안 많은 국기를 맞혀보세요.
        </p>
      </div>
    </div>
  );
};
