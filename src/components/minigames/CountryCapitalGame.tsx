import React, { useState, useMemo } from "react";
import { Region } from "../../types";
import { WORLD_COUNTRIES } from "../../data/worldCountries";
import { playSuccessSound, playCompleteSound } from "../../utils/audio";
import { ChevronLeft, RotateCcw, Trophy, CheckCircle2, XCircle, Building2 } from "lucide-react";

// Curated Country-to-Capital dataset for popular/recognized countries
const COUNTRY_CAPITALS: Record<string, { capital_kr: string; capital_en: string }> = {
  kr: { capital_kr: "서울", capital_en: "Seoul" },
  jp: { capital_kr: "도쿄", capital_en: "Tokyo" },
  cn: { capital_kr: "베이징", capital_en: "Beijing" },
  us: { capital_kr: "워싱턴 D.C.", capital_en: "Washington D.C." },
  gb: { capital_kr: "런던", capital_en: "London" },
  fr: { capital_kr: "파리", capital_en: "Paris" },
  de: { capital_kr: "베를린", capital_en: "Berlin" },
  it: { capital_kr: "로마", capital_en: "Rome" },
  es: { capital_kr: "마드리드", capital_en: "Madrid" },
  ca: { capital_kr: "오타와", capital_en: "Ottawa" },
  au: { capital_kr: "캔버라", capital_en: "Canberra" },
  ru: { capital_kr: "모스크바", capital_en: "Moscow" },
  br: { capital_kr: "브라질리아", capital_en: "Brasilia" },
  in: { capital_kr: "뉴델리", capital_en: "New Delhi" },
  vn: { capital_kr: "하노이", capital_en: "Hanoi" },
  th: { capital_kr: "방콕", capital_en: "Bangkok" },
  sg: { capital_kr: "싱가포르", capital_en: "Singapore" },
  eg: { capital_kr: "카이로", capital_en: "Cairo" },
  mx: { capital_kr: "멕시코시티", capital_en: "Mexico City" },
  ar: { capital_kr: "부에노스아이레스", capital_en: "Buenos Aires" },
  tr: { capital_kr: "앙카라", capital_en: "Ankara" },
  sa: { capital_kr: "리야드", capital_en: "Riyadh" },
  ae: { capital_kr: "아부다비", capital_en: "Abu Dhabi" },
  ch: { capital_kr: "베른", capital_en: "Bern" },
  at: { capital_kr: "빈", capital_en: "Vienna" },
  nl: { capital_kr: "암스테르담", capital_en: "Amsterdam" },
  be: { capital_kr: "브뤼셀", capital_en: "Brussels" },
  se: { capital_kr: "스톡홀름", capital_en: "Stockholm" },
  no: { capital_kr: "오슬로", capital_en: "Oslo" },
  fi: { capital_kr: "헬싱키", capital_en: "Helsinki" },
  id: { capital_kr: "자카르타", capital_en: "Jakarta" },
  my: { capital_kr: "쿠알라룸푸르", capital_en: "Kuala Lumpur" },
  ph: { capital_kr: "마닐라", capital_en: "Manila" },
  za: { capital_kr: "프리토리아", capital_en: "Pretoria" },
  nz: { capital_kr: "웰링턴", capital_en: "Wellington" },
  pt: { capital_kr: "리스본", capital_en: "Lisbon" },
  gr: { capital_kr: "아테네", capital_en: "Athens" },
  pl: { capital_kr: "바르샤바", capital_en: "Warsaw" },
  cz: { capital_kr: "프라하", capital_en: "Prague" },
};

interface CountryCapitalGameProps {
  onBackToList: () => void;
}

export const CountryCapitalGame: React.FC<CountryCapitalGameProps> = ({ onBackToList }) => {
  const eligibleCountries = useMemo(() => {
    return WORLD_COUNTRIES.filter((c) => COUNTRY_CAPITALS[c.id]);
  }, []);

  const [shuffledList, setShuffledList] = useState<Region[]>(() => {
    return [...eligibleCountries].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCapital, setSelectedCapital] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentCountry = shuffledList[currentIndex] || shuffledList[0];
  const currentCapitalInfo = COUNTRY_CAPITALS[currentCountry?.id] || { capital_kr: "수도", capital_en: "Capital" };

  // 4 choices
  const choices = useMemo(() => {
    if (!currentCountry) return [];
    const others = eligibleCountries
      .filter((c) => c.id !== currentCountry.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => COUNTRY_CAPITALS[c.id].capital_kr);

    return [...others, currentCapitalInfo.capital_kr].sort(() => Math.random() - 0.5);
  }, [currentCountry, currentIndex, eligibleCountries, currentCapitalInfo]);

  const handleSelect = (capital: string) => {
    if (isAnswerRevealed || isFinished) return;

    setSelectedCapital(capital);
    setIsAnswerRevealed(true);

    const isCorrect = capital === currentCapitalInfo.capital_kr;
    if (isCorrect) {
      playSuccessSound();
      setScore((p) => p + 1);
    }

    setTimeout(() => {
      setSelectedCapital(null);
      setIsAnswerRevealed(false);
      if (currentIndex + 1 >= 10) {
        setIsFinished(true);
        playCompleteSound();
      } else {
        setCurrentIndex((p) => p + 1);
      }
    }, 500);
  };

  const handleRestart = () => {
    setShuffledList([...eligibleCountries].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSelectedCapital(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setIsFinished(false);
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
          세계 수도 맞히기 (10문제)
        </h1>

        <div className="w-16" />
      </div>

      {!isFinished ? (
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500">
              문제 {currentIndex + 1} / 10
            </span>
            <span className="text-xs font-black text-emerald-600">
              현재 점수: {score}점
            </span>
          </div>

          <div className="flex flex-col items-center justify-center my-6 space-y-3">
            <img
              src={`https://flagcdn.com/w160/${currentCountry.id.toLowerCase()}.png`}
              alt=""
              className="w-20 h-14 rounded-xl object-cover shadow-sm border border-slate-200"
            />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {currentCountry.name_kr}의 수도는?
            </h2>
            <p className="text-xs text-slate-400">({currentCountry.name_en})</p>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {choices.map((cap, idx) => {
              let btnStyle = "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100";
              if (isAnswerRevealed) {
                if (cap === currentCapitalInfo.capital_kr) {
                  btnStyle = "bg-emerald-600 border-emerald-600 text-white font-black";
                } else if (cap === selectedCapital) {
                  btnStyle = "bg-rose-600 border-rose-600 text-white font-black";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(cap)}
                  disabled={isAnswerRevealed}
                  className={`p-3.5 rounded-2xl border text-center font-bold text-sm transition-all shadow-xs cursor-pointer ${btnStyle}`}
                >
                  {cap}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Result */
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-scale-in">
          <div className="inline-flex p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl text-emerald-600 border border-emerald-200">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              수도 퀴즈 완료!
            </h2>
            <p className="text-base font-black text-emerald-600 mt-2">
              10문제 중 {score}문제를 맞혔습니다!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
    </div>
  );
};
