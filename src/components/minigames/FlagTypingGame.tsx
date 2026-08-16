import React, { useState, useEffect, useRef, useMemo } from "react";
import { Region } from "../../types";
import { getFlagGameCountries, isCountryMatch } from "../../utils/countrySynonyms";
import { playSuccessSound, playCompleteSound } from "../../utils/audio";
import { ChevronLeft, RotateCcw, Trophy, CheckCircle2, XCircle, ArrowRight, Sparkles, Volume2, VolumeX } from "lucide-react";

interface FlagTypingGameProps {
  onBackToList: () => void;
  onUpdateRecord?: (score: number, missed: number) => void;
}

interface PlayHistoryItem {
  country: Region;
  userAnswer: string;
  isCorrect: boolean;
}

export const FlagTypingGame: React.FC<FlagTypingGameProps> = ({ onBackToList, onUpdateRecord }) => {
  const allCountries = useMemo(() => getFlagGameCountries(), []);
  
  // Shuffle countries on start
  const [shuffledList, setShuffledList] = useState<Region[]>(() => {
    return [...allCountries].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Game state
  const [inputVal, setInputVal] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<PlayHistoryItem[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [lastAnswerInfo, setLastAnswerInfo] = useState<{
    country: Region;
    userAnswer: string;
    isCorrect: boolean;
  } | null>(null);

  // Highest score & previous record
  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem("typetrip_flag_typing_best");
    return saved ? parseInt(saved, 10) : 0;
  });

  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentCountry = shuffledList[currentIndex] || shuffledList[0];
  const correctCount = history.filter((h) => h.isCorrect).length;
  const missedCount = history.filter((h) => !h.isCorrect).length;

  // Auto focus input on mount and next item
  useEffect(() => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isFinished, hasStarted]);

  // Timer countdown
  useEffect(() => {
    if (hasStarted && !isFinished) {
      timerRef.current = window.setInterval(() => {
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [hasStarted, isFinished]);

  const handleGameOver = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFinished(true);
    playCompleteSound();

    setHistory((prevHistory) => {
      const finalCorrect = prevHistory.filter((h) => h.isCorrect).length;
      const finalMissed = prevHistory.filter((h) => !h.isCorrect).length;

      // Save records
      localStorage.setItem("typetrip_flag_typing_last_score", String(finalCorrect));
      localStorage.setItem("typetrip_flag_typing_last_missed", String(finalMissed));

      const currentBest = parseInt(localStorage.getItem("typetrip_flag_typing_best") || "0", 10);
      if (finalCorrect > currentBest) {
        localStorage.setItem("typetrip_flag_typing_best", String(finalCorrect));
        localStorage.setItem("typetrip_flag_typing_best_missed", String(finalMissed));
        setBestScore(finalCorrect);
      }

      if (onUpdateRecord) {
        onUpdateRecord(finalCorrect, finalMissed);
      }
      return prevHistory;
    });
  };

  const handleRestart = () => {
    const newShuffled = [...allCountries].sort(() => Math.random() - 0.5);
    setShuffledList(newShuffled);
    setCurrentIndex(0);
    setInputVal("");
    setHasStarted(false);
    setTimeLeft(60);
    setIsFinished(false);
    setHistory([]);
    setFeedback(null);
    setLastAnswerInfo(null);
  };

  const submitAnswer = () => {
    if (isFinished || !currentCountry) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    const trimmed = inputVal.trim();
    if (!trimmed) {
      // If user pressed confirm without typing, treat as skip and show answer
      setHistory((prev) => [
        ...prev,
        { country: currentCountry, userAnswer: "(건너뜀)", isCorrect: false },
      ]);
      setLastAnswerInfo({
        country: currentCountry,
        userAnswer: "(건너뜀)",
        isCorrect: false,
      });
      setInputVal("");
      setCurrentIndex((prev) => (prev + 1) % shuffledList.length);
      return;
    }

    const isMatch = isCountryMatch(currentCountry, trimmed);

    if (isMatch) {
      playSuccessSound();
      setFeedback("correct");
      setTimeout(() => setFeedback(null), 400);

      setHistory((prev) => [
        ...prev,
        { country: currentCountry, userAnswer: trimmed, isCorrect: true },
      ]);
      setLastAnswerInfo({
        country: currentCountry,
        userAnswer: trimmed,
        isCorrect: true,
      });
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 400);
      setHistory((prev) => [
        ...prev,
        { country: currentCountry, userAnswer: trimmed, isCorrect: false },
      ]);
      setLastAnswerInfo({
        country: currentCountry,
        userAnswer: trimmed,
        isCorrect: false,
      });
    }

    setInputVal("");
    setCurrentIndex((prev) => (prev + 1) % shuffledList.length);
  };

  const handleSkip = () => {
    if (isFinished || !currentCountry) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    setHistory((prev) => [
      ...prev,
      { country: currentCountry, userAnswer: "(건너뜀)", isCorrect: false },
    ]);
    setLastAnswerInfo({
      country: currentCountry,
      userAnswer: "(건너뜀)",
      isCorrect: false,
    });

    setInputVal("");
    setCurrentIndex((prev) => (prev + 1) % shuffledList.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitAnswer();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStarted && e.target.value.length > 0) {
      setHasStarted(true);
    }
    setInputVal(e.target.value);
  };

  const flagSrc = currentCountry
    ? `https://flagcdn.com/w640/${currentCountry.id.toLowerCase()}.png`
    : "";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Top Header Bar */}
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
          국기 타이핑
        </h1>

        <div className="w-16" />
      </div>

      {/* Main Game Box / Result Box */}
      {!isFinished ? (
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Subtle Progress Bar */}
          {hasStarted && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 10
                    ? "bg-rose-500"
                    : timeLeft <= 25
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>
          )}

          {/* Top Status Bar */}
          <div className="flex items-center justify-between mb-6 pt-1">
            <button
              type="button"
              onClick={onBackToList}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              그만하기
            </button>

            <div className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              {!hasStarted ? (
                <span>60초 · 입력하면 시작해요</span>
              ) : (
                <span className={`font-mono ${timeLeft <= 10 ? "text-rose-600 dark:text-rose-400 animate-pulse font-black" : ""}`}>
                  ⏱️ {timeLeft}초 남음
                </span>
              )}
            </div>

            <div className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400">
              {correctCount} 맞힘
            </div>
          </div>

          {/* Center Flag Display Container */}
          <div className="flex flex-col items-center justify-center my-4 sm:my-6 relative">
            <div className="relative group p-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center justify-center">
              <div className="w-56 h-36 sm:w-72 sm:h-48 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-white border border-slate-200 dark:border-slate-700 transition-transform duration-200">
                <img
                  src={flagSrc}
                  alt="Country Flag"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to 256x192 if large size fails
                    if (currentCountry) {
                      e.currentTarget.src = `https://flagcdn.com/w320/${currentCountry.id.toLowerCase()}.png`;
                    }
                  }}
                />
              </div>

              {/* Feedback Animation Overlay */}
              {feedback === "correct" && (
                <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center animate-scale-in">
                  <span className="bg-emerald-600 text-white font-black px-4 py-1.5 rounded-full text-sm shadow-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 정답! +1
                  </span>
                </div>
              )}
              {feedback === "wrong" && (
                <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center animate-scale-in">
                  <span className="bg-rose-600 text-white font-black px-4 py-1.5 rounded-full text-sm shadow-lg flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> 다시 입력해보세요!
                  </span>
                </div>
              )}
            </div>

            {/* Answer Display Underneath the Flag */}
            {lastAnswerInfo ? (
              <div className="mt-3 px-3.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/90 rounded-xl flex items-center justify-center gap-2 text-xs animate-fade-in shadow-xs">
                <span className="text-slate-400 dark:text-slate-500 font-medium">직전 정답:</span>
                <span className={`font-black ${lastAnswerInfo.isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {lastAnswerInfo.country.name_kr}
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-normal text-[11px]">
                  ({lastAnswerInfo.country.name_en})
                </span>
                {lastAnswerInfo.isCorrect ? (
                  <span className="text-[10px] font-black px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 rounded">
                    정답 (+1)
                  </span>
                ) : (
                  <span className="text-[10px] font-black px-1.5 py-0.5 bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 rounded">
                    {lastAnswerInfo.userAnswer === "(건너뜀)" ? "건너뜀" : `입력: ${lastAnswerInfo.userAnswer}`}
                  </span>
                )}
              </div>
            ) : (
              <div className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                <span>확인 버튼이나 Enter를 누르면 국기 밑에 정답이 표시돼요</span>
              </div>
            )}
          </div>

          {/* Input Box and Action Buttons */}
          <div className="space-y-3 mt-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="정답 입력 후 Enter"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                className="w-full bg-white dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-500 rounded-2xl px-4 py-3.5 text-center text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all shadow-inner"
              />
            </div>

            {/* Confirmation and Skip Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={submitAnswer}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-black text-sm sm:text-base rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>확인</span>
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.99] border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-black text-sm sm:text-base rounded-2xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>넘기기</span>
              </button>
            </div>
          </div>

          {/* Quick Sub-Stats */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>진행: {currentIndex + 1}번째 국기</span>
            <span>최고 기록: <strong className="text-amber-500">{bestScore}개</strong></span>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-scale-in">
          <div className="inline-flex p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl text-emerald-600 dark:text-emerald-400 mb-1 border border-emerald-200 dark:border-emerald-800">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">
              GAME OVER
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              60초 타임오버!
            </h2>
          </div>

          {/* Big Score Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">맞힌 국기</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
                {correctCount}
              </span>
              <span className="text-[10px] text-slate-400 block">개</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">오답 / 넘김</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-700 dark:text-slate-300 font-mono">
                {missedCount}
              </span>
              <span className="text-[10px] text-slate-400 block">개</span>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block">최고 기록</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-300 font-mono">
                {bestScore}
              </span>
              <span className="text-[10px] text-slate-400 block">개</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-black text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
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

          {/* Review List Table */}
          {history.length > 0 && (
            <div className="text-left mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                📋 이번 판 국기 복습 ({history.length}개)
              </span>

              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border ${
                      item.isCorrect
                        ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50"
                        : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`https://flagcdn.com/w40/${item.country.id.toLowerCase()}.png`}
                        alt=""
                        className="w-7 h-5 rounded object-cover shadow-xs border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="font-extrabold text-slate-900 dark:text-white block">
                          {item.country.name_kr} ({item.country.name_en})
                        </span>
                        {!item.isCorrect && item.userAnswer !== "(건너뜀)" && (
                          <span className="text-[10px] text-rose-500 font-medium block">
                            내가 입력한 답: {item.userAnswer}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      {item.isCorrect ? (
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          ✓ 정답
                        </span>
                      ) : (
                        <span className="text-xs font-black text-rose-500">
                          {item.userAnswer === "(건너뜀)" ? "건너뜀" : "오답"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Description Section (matches screenshot exactly) */}
      <div className="w-full max-w-2xl mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-left space-y-2 select-none">
        <h3 className="text-sm font-black text-slate-900 dark:text-white">이 게임은</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          국기 하나가 뜨면 그 나라의 한국어 이름을 입력하고 Enter를 누르면 돼요. 60초 동안 몇 개를 맞히는지 겨루고, 모르는 국기는 넘기기로 건너뛸 수 있어요. 코소보를 뺀 전세계 196개 나라 국기가 무작위로 나와요.
        </p>
      </div>
    </div>
  );
};
