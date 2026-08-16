/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Zap, Sliders } from "lucide-react";
import { Region } from "../types";
import { playTypingSound, playErrorSound, initAudio } from "../utils/audio";
import { CountryFlag } from "./CountryFlag";
import { MacroControlPanel } from "./MacroControlPanel";

// Hangul Jamo Constants
const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const COMPLEX_JUNGSUNG_MAP: Record<string, string[]> = {
  'ㅘ': ['ㅗ', 'ㅏ'],
  'ㅙ': ['ㅗ', 'ㅐ'],
  'ㅚ': ['ㅗ', 'ㅣ'],
  'ㅝ': ['ㅜ', 'ㅓ'],
  'ㅞ': ['ㅜ', 'ㅔ'],
  'ㅟ': ['ㅜ', 'ㅣ'],
  'ㅢ': ['ㅡ', 'ㅣ']
};

const COMPLEX_JONGSUNG_MAP: Record<string, string[]> = {
  'ㄳ': ['ㄱ', 'ㅅ'],
  'ㄵ': ['ㄴ', 'ㅈ'],
  'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'],
  'ㄻ': ['ㄹ', 'ㅁ'],
  'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'],
  'ㄾ': ['ㄹ', 'ㅌ'],
  'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'],
  'ㅄ': ['ㅂ', 'ㅅ']
};

interface Decomposed {
  chosung: string;
  jungsung: string;
  jongsung: string;
}

function decomposeHangul(char: string): Decomposed | null {
  if (!char) return null;
  const code = char.charCodeAt(0);
  if (code >= 0xAC00 && code <= 0xD7A3) {
    const syllableIndex = code - 0xAC00;
    const choIdx = Math.floor(syllableIndex / 588);
    const jungIdx = Math.floor((syllableIndex % 588) / 28);
    const jongIdx = syllableIndex % 28;
    return {
      chosung: CHOSUNG[choIdx],
      jungsung: JUNGSUNG[jungIdx],
      jongsung: JONGSUNG[jongIdx],
    };
  }
  // Single Jamo Consonant
  if (code >= 0x3131 && code <= 0x314E) {
    return {
      chosung: char,
      jungsung: '',
      jongsung: '',
    };
  }
  // Single Jamo Vowel
  if (code >= 0x314F && code <= 0x3163) {
    return {
      chosung: '',
      jungsung: char,
      jongsung: '',
    };
  }
  return null;
}

function countTotalJamos(str: string): number {
  let count = 0;
  for (const char of str) {
    const dec = decomposeHangul(char);
    if (dec) {
      if (dec.chosung) count += 1;
      if (dec.jungsung) {
        const compJung = COMPLEX_JUNGSUNG_MAP[dec.jungsung];
        count += compJung ? compJung.length : 1;
      }
      if (dec.jongsung) {
        const compJong = COMPLEX_JONGSUNG_MAP[dec.jongsung];
        count += compJong ? compJong.length : 1;
      }
    } else {
      count += 1;
    }
  }
  return count;
}

function getHangulMatchStatus(typedChar: string, targetChar: string): "exact" | "partial" | "none" {
  if (typedChar === targetChar) return "exact";
  if (!typedChar || !targetChar) return "none";

  const typedDec = decomposeHangul(typedChar);
  const targetDec = decomposeHangul(targetChar);

  if (!typedDec || !targetDec) return "none";

  if (targetDec.chosung && !typedDec.chosung) {
    return "none";
  }

  if (typedDec.chosung && typedDec.chosung !== targetDec.chosung) {
    return "none";
  }

  if (typedDec.jungsung && typedDec.jungsung !== targetDec.jungsung) {
    const complexParts = COMPLEX_JUNGSUNG_MAP[targetDec.jungsung];
    if (complexParts && complexParts[0] === typedDec.jungsung) {
      return "partial";
    }
    return "none";
  }

  if (typedDec.jongsung && typedDec.jongsung !== targetDec.jongsung) {
    const complexParts = COMPLEX_JONGSUNG_MAP[targetDec.jongsung];
    if (complexParts && complexParts[0] === typedDec.jongsung) {
      return "partial";
    }
    return "none";
  }

  if (!typedDec.jungsung && targetDec.jungsung) return "partial";
  if (!typedDec.jongsung && targetDec.jongsung) return "partial";

  return "none";
}

function isHangulPrefix(typed: string, target: string): boolean {
  if (typed.length === 0) return true;
  if (typed.length > target.length) return false;

  for (let i = 0; i < typed.length - 1; i++) {
    if (typed[i] !== target[i]) return false;
  }

  const lastIdx = typed.length - 1;
  const lastTypedChar = typed[lastIdx];
  const lastTargetChar = target[lastIdx];
  const nextTargetChar = lastIdx + 1 < target.length ? target[lastIdx + 1] : null;

  const status = getHangulMatchStatus(lastTypedChar, lastTargetChar);
  if (status === "exact" || status === "partial") {
    return true;
  }

  // Check Hangul intermediate IME composition state (e.g. "전"+"주" -> "젖", "충"+"주" -> "춤", "서"+"울" -> "성")
  if (nextTargetChar) {
    const typedDec = decomposeHangul(lastTypedChar);
    const currDec = decomposeHangul(lastTargetChar);
    const nextDec = decomposeHangul(nextTargetChar);

    if (typedDec && currDec && nextDec) {
      const choMatch = typedDec.chosung === currDec.chosung;
      const jungMatch =
        typedDec.jungsung === currDec.jungsung ||
        (COMPLEX_JUNGSUNG_MAP[currDec.jungsung] &&
          COMPLEX_JUNGSUNG_MAP[currDec.jungsung][0] === typedDec.jungsung);

      if (choMatch && jungMatch && typedDec.jongsung) {
        // Case A: Current target char has no 받침 (e.g. "서" + "울" -> "성")
        if (!currDec.jongsung && typedDec.jongsung === nextDec.chosung) {
          return true;
        }
        // Case B: Current target char has a 받침, but Windows IME temporarily attached next char's 초성 as 받침 (e.g. "전"+"주" -> "젖", "인"+"천" -> "잊")
        if (typedDec.jongsung === nextDec.chosung) {
          return true;
        }
        // Case C: Current target char already has a 받침 (e.g. "별"), typedDec created complex 받침 'ㄽ' matching nextTargetChar's 초성 'ㅅ'
        const complexParts = COMPLEX_JONGSUNG_MAP[typedDec.jongsung];
        if (
          complexParts &&
          complexParts[0] === currDec.jongsung &&
          complexParts[1] === nextDec.chosung
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

interface TypingConsoleProps {
  regions: Region[];
  currentRegion: Region;
  prevRegion: Region | null;
  nextRegion: Region | null;
  onSuccess: (inputLength: number, totalKeystrokes: number, errors: number) => void;
  onKeystroke?: (currentStationKeystrokes: number, currentStationErrors: number) => void;
  onMacroActivated?: () => void;
  strictMode: boolean;
  advanceMode?: "auto" | "manual";
  typingLanguage?: "ko" | "en";
  displayLanguage?: "ko" | "en";
  isMacroActive?: boolean;
  setIsMacroActive?: React.Dispatch<React.SetStateAction<boolean>>;
  isMacroModalOpen?: boolean;
  setIsMacroModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  macroSpeedMs?: number;
  setMacroSpeedMs?: React.Dispatch<React.SetStateAction<number>>;
  autoAdvanceDelayMs?: number;
  setAutoAdvanceDelayMs?: React.Dispatch<React.SetStateAction<number>>;
}

export const TypingConsole: React.FC<TypingConsoleProps> = ({
  regions,
  currentRegion,
  prevRegion,
  nextRegion,
  onSuccess,
  onKeystroke,
  onMacroActivated,
  strictMode,
  advanceMode = "auto",
  typingLanguage = "ko",
  displayLanguage = "ko",
  isMacroActive: propIsMacroActive,
  setIsMacroActive: propSetIsMacroActive,
  isMacroModalOpen: propIsMacroModalOpen,
  setIsMacroModalOpen: propSetIsMacroModalOpen,
  macroSpeedMs: propMacroSpeedMs,
  setMacroSpeedMs: propSetMacroSpeedMs,
  autoAdvanceDelayMs: propAutoAdvanceDelayMs,
  setAutoAdvanceDelayMs: propSetAutoAdvanceDelayMs,
}) => {
  const [inputVal, setInputVal] = useState("");
  const totalKeysRef = useRef(0);
  const errorCountRef = useRef(0);

  const [totalKeys, setTotalKeys] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTransitioningRef = useRef(false);
  const isComposingRef = useRef(false);
  const ignoreUntilRef = useRef<number>(0);

  // Secret Macro State, Speed Settings & Key Sequence Tracking
  const [localIsMacroActive, setLocalIsMacroActive] = useState(false);
  const [localIsMacroModalOpen, setLocalIsMacroModalOpen] = useState(false);

  const [localMacroSpeedMs, setLocalMacroSpeedMs] = useState<number>(() => {
    const saved = localStorage.getItem("macro_speed_ms");
    return saved ? Math.max(1, parseInt(saved, 10)) : 25;
  });

  const [localAutoAdvanceDelayMs, setLocalAutoAdvanceDelayMs] = useState<number>(() => {
    const saved = localStorage.getItem("macro_auto_delay_ms");
    return saved ? Math.max(0, parseInt(saved, 10)) : 0;
  });

  const isMacroActive = propIsMacroActive ?? localIsMacroActive;
  const setIsMacroActive = propSetIsMacroActive ?? setLocalIsMacroActive;
  const isMacroModalOpen = propIsMacroModalOpen ?? localIsMacroModalOpen;
  const setIsMacroModalOpen = propSetIsMacroModalOpen ?? setLocalIsMacroModalOpen;
  const macroSpeedMs = propMacroSpeedMs ?? localMacroSpeedMs;
  const setMacroSpeedMs = propSetMacroSpeedMs ?? setLocalMacroSpeedMs;
  const autoAdvanceDelayMs = propAutoAdvanceDelayMs ?? localAutoAdvanceDelayMs;
  const setAutoAdvanceDelayMs = propSetAutoAdvanceDelayMs ?? setLocalAutoAdvanceDelayMs;

  useEffect(() => {
    localStorage.setItem("macro_speed_ms", macroSpeedMs.toString());
  }, [macroSpeedMs]);

  useEffect(() => {
    localStorage.setItem("macro_auto_delay_ms", autoAdvanceDelayMs.toString());
  }, [autoAdvanceDelayMs]);

  const keyBufferRef = useRef<{ code: string; shift: boolean; time: number }[]>([]);

  // Listen for secret Shift+P+J+M shortcut
  useEffect(() => {
    const handleMacroKey = (e: KeyboardEvent) => {
      if (!e || !e.key) return;

      if (e.key === "Escape") {
        setIsMacroModalOpen(false);
        return;
      }

      const now = Date.now();
      const recent = keyBufferRef.current.filter((k) => now - k.time < 2000);

      const isP = e.code === "KeyP" || e.key.toUpperCase() === "P" || e.key === "ㅔ" || e.key === "ㅖ";
      const isJ = e.code === "KeyJ" || e.key.toUpperCase() === "J" || e.key === "ㅓ";
      const isM = e.code === "KeyM" || e.key.toUpperCase() === "M" || e.key === "ㅡ";

      if (isP || isJ || isM) {
        recent.push({
          code: isP ? "KeyP" : isJ ? "KeyJ" : "KeyM",
          shift: e.shiftKey,
          time: now,
        });
        keyBufferRef.current = recent;

        if (recent.length >= 3) {
          const last3 = recent.slice(-3);
          const matchPJM =
            last3[0].code === "KeyP" &&
            last3[1].code === "KeyJ" &&
            last3[2].code === "KeyM";
          const shiftHeld = last3.some((k) => k.shift) || e.shiftKey;

          if (matchPJM && shiftHeld) {
            setIsMacroActive(true);
            setIsMacroModalOpen((prev) => !prev);
            if (onMacroActivated) onMacroActivated();
            keyBufferRef.current = [];
          }
        }
      }
    };

    window.addEventListener("keydown", handleMacroKey);
    return () => window.removeEventListener("keydown", handleMacroKey);
  }, [onMacroActivated]);

  // Macro execution timer effect with customizable speed
  useEffect(() => {
    if (!isMacroActive) return;

    const interval = setInterval(() => {
      if (isTransitioningRef.current) return;

      const targetName = typingLanguage === "en"
        ? (currentRegion?.name_en || currentRegion?.name_kr || "")
        : (currentRegion?.name_kr || currentRegion?.name_en || "");

      if (!targetName) return;

      const currentInput = inputRef.current ? inputRef.current.value : inputVal;

      if (currentInput.length < targetName.length) {
        const nextVal = targetName.slice(0, currentInput.length + 1);

        setInputVal(nextVal);
        if (inputRef.current) {
          inputRef.current.value = nextVal;
        }

        totalKeysRef.current += 1;
        setTotalKeys(totalKeysRef.current);
        playTypingSound();

        if (onKeystroke) {
          onKeystroke(totalKeysRef.current, errorCountRef.current);
        }

        if (nextVal.trim() === targetName.trim()) {
          if (autoAdvanceDelayMs > 0) {
            setTimeout(() => {
              handleComplete(targetName);
            }, autoAdvanceDelayMs);
          } else {
            handleComplete(targetName);
          }
        }
      } else {
        if (autoAdvanceDelayMs > 0) {
          setTimeout(() => {
            handleComplete(targetName);
          }, autoAdvanceDelayMs);
        } else {
          handleComplete(targetName);
        }
      }
    }, macroSpeedMs);

    return () => clearInterval(interval);
  }, [isMacroActive, currentRegion, typingLanguage, inputVal, macroSpeedMs, autoAdvanceDelayMs]);

  // Focus recovery helper
  const focusInput = () => {
    if (isMacroModalOpen) return;
    if (!inputRef.current) return;
    const active = document.activeElement;
    const isOtherInput =
      active &&
      (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT") &&
      active !== inputRef.current;

    if (!isOtherInput) {
      inputRef.current.focus();
    }
  };

  // Focus input on load & listen to window events so typing always works even after pausing or clicking outside
  useEffect(() => {
    focusInput();

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignore system shortcuts
      if (!e.key || e.ctrlKey || e.altKey || e.metaKey || e.key.startsWith("F")) return;

      const active = document.activeElement;
      const isOtherInput =
        active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT") &&
        active !== inputRef.current;

      if (!isOtherInput && inputRef.current) {
        if (document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    const handleWindowFocus = () => {
      focusInput();
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("pointerdown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("pointerdown", handleGlobalKeyDown);
    };
  }, []);

  const handleComplete = (targetName: string) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    ignoreUntilRef.current = Date.now() + 400;

    // Force blur to immediately force the browser IME to finalize/discard any pending composition session
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.value = "";
    }
    setInputVal("");

    const clearInputDom = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setInputVal("");
    };

    // Aggressively clear leftover IME buffers across frames
    clearInputDom();
    requestAnimationFrame(clearInputDom);
    setTimeout(clearInputDom, 0);
    setTimeout(clearInputDom, 20);
    setTimeout(clearInputDom, 50);

    onSuccess(targetName.length, totalKeysRef.current, errorCountRef.current);

    // Refocus after transition with clean DOM state
    setTimeout(() => {
      clearInputDom();
      if (inputRef.current) {
        inputRef.current.value = "";
        focusInput();
      }
      clearInputDom();
      isTransitioningRef.current = false;
    }, 150);

    // Safety fallback to unlock transitions
    setTimeout(() => {
      clearInputDom();
      isTransitioningRef.current = false;
    }, 300);
  };

  // Reset input when target region changes
  useEffect(() => {
    setInputVal("");
    totalKeysRef.current = 0;
    errorCountRef.current = 0;
    setTotalKeys(0);
    setErrorCount(0);
    ignoreUntilRef.current = Date.now() + 300;

    if (inputRef.current) {
      inputRef.current.value = "";
      try {
        inputRef.current.blur();
      } catch (e) {
        // ignore
      }
    }

    const timer1 = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = "";
        focusInput();
      }
      setInputVal("");
      isTransitioningRef.current = false;
    }, 150);

    const timer2 = setTimeout(() => {
      if (inputRef.current && (isTransitioningRef.current || Date.now() < ignoreUntilRef.current)) {
        if (inputVal === "") inputRef.current.value = "";
      }
    }, 250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentRegion]);

  // Keep focus on clicking anywhere in the container
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    initAudio();
    focusInput();
  };

  // Helper to generate station sequence number
  const getStationNumber = (regionId: string | undefined): number => {
    if (!regionId) return 100;
    const idx = regions.findIndex((r) => r.id === regionId);
    return idx !== -1 ? 311 + idx : 311;
  };

  const getTargetName = (): string => {
    if (typingLanguage === "en") {
      return currentRegion?.name_en || currentRegion?.name_kr || "";
    }
    return currentRegion?.name_kr || currentRegion?.name_en || "";
  };

  const getSubName = (): string => {
    if (typingLanguage === "en") {
      return currentRegion?.name_kr || "";
    }
    return currentRegion?.name_en || "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTransitioningRef.current || Date.now() < ignoreUntilRef.current) {
      if (inputRef.current) inputRef.current.value = "";
      setInputVal("");
      return;
    }

    initAudio();
    const rawVal = e.target.value;
    const val = typingLanguage === "en" ? rawVal.replace(/^\s+/, "") : rawVal.replace(/\s+/g, "");
    const targetName = getTargetName();

    const prevJamos = typingLanguage === "en" ? inputVal.length : countTotalJamos(inputVal);
    const currJamos = typingLanguage === "en" ? val.length : countTotalJamos(val);

    if (currJamos > prevJamos) {
      let isCorrect = false;
      if (typingLanguage === "en") {
        const normVal = val.toLowerCase();
        const normTarget = targetName.toLowerCase();
        const noHyphenVal = normVal.replace(/-/g, "");
        const noHyphenTarget = normTarget.replace(/-/g, "");
        isCorrect = normTarget.startsWith(normVal) || noHyphenTarget.startsWith(noHyphenVal);
      } else {
        isCorrect = isHangulPrefix(val, targetName);
      }

      if (!isCorrect) {
        errorCountRef.current += 1;
        setErrorCount(errorCountRef.current);
        playErrorSound();

        // Reduce typing count by 2 on errors as requested
        totalKeysRef.current = Math.max(0, totalKeysRef.current - 2);
        setTotalKeys(totalKeysRef.current);
      } else {
        totalKeysRef.current += (currJamos - prevJamos);
        setTotalKeys(totalKeysRef.current);
        playTypingSound();
      }

      if (onKeystroke) {
        onKeystroke(totalKeysRef.current, errorCountRef.current);
      }
    } else {
      // Character deletion (Backspace)
      const decrease = prevJamos - currJamos;
      totalKeysRef.current = Math.max(0, totalKeysRef.current - decrease);
      setTotalKeys(totalKeysRef.current);
      playTypingSound();
      if (onKeystroke) {
        onKeystroke(totalKeysRef.current, errorCountRef.current);
      }
    }

    setInputVal(val);

    // Check completion
    const isMatched = typingLanguage === "en"
      ? (val.toLowerCase().trim() === targetName.toLowerCase().trim() ||
         val.toLowerCase().replace(/-/g, "").trim() === targetName.toLowerCase().replace(/-/g, "").trim())
      : (val.trim() === targetName.trim());

    if (advanceMode === "auto" && isMatched) {
      handleComplete(targetName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e || typeof e.key !== "string") return;
    const targetName = getTargetName();
    const isMatched = typingLanguage === "en"
      ? (inputVal.toLowerCase().trim() === targetName.toLowerCase().trim() ||
         inputVal.toLowerCase().replace(/-/g, "").trim() === targetName.toLowerCase().replace(/-/g, "").trim())
      : (inputVal.trim() === targetName.trim());

    if (e.key === " " || e.code === "Space") {
      if (isMatched) {
        e.preventDefault();
        handleComplete(targetName);
        return;
      }
      if (typingLanguage === "en" && targetName.includes(" ")) {
        return;
      } else {
        e.preventDefault();
      }
      return;
    }
    if (e.key === "Enter") {
      if (isMatched) {
        handleComplete(targetName);
      }
      return;
    }
  };

  const renderTargetWithHighlights = () => {
    const target = getTargetName();
    const isWorld = currentRegion?.level === "world";
    const totalLength = Math.max(target.length, inputVal.length);
    const isVeryLong = totalLength >= 8;
    const isLong = totalLength >= 5;
    const charSizeClass = isVeryLong
      ? "text-xl sm:text-2xl md:text-[28px]"
      : isLong
      ? "text-2xl sm:text-3xl md:text-[36px]"
      : "text-3xl sm:text-4xl md:text-[44px]";
    const minHeightClass = isLong
      ? "min-h-[2.5rem] md:min-h-[3rem]"
      : "min-h-[3.5rem]";

    const activeUnderline = isWorld ? "border-b-4 border-slate-500 pb-0.5" : "border-b-4 border-emerald-500 pb-0.5";
    const cursorBg = isWorld
      ? "w-[3.5px] h-[1.1em] bg-slate-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(100,116,139,0.8)]"
      : "w-[3.5px] h-[1.1em] bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]";

    const extraChars = inputVal.length > target.length ? inputVal.slice(target.length).split("") : [];

    return (
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-nowrap whitespace-nowrap relative max-w-full overflow-x-auto pt-4 pb-1 no-scrollbar">
        {target.split("").map((char, index) => {
          let colorClass = "";
          let displayedChar = char;
          let showCorrectAbove = false;
          let underlineClass = "border-b-4 border-slate-200 pb-0.5";

          if (index < inputVal.length) {
            const typedChar = inputVal[index];
            displayedChar = typedChar;

            if (typingLanguage === "en") {
              if (typedChar.toLowerCase() === char.toLowerCase()) {
                colorClass = "text-slate-800 dark:text-slate-100";
                underlineClass = activeUnderline;
              } else {
                colorClass = "text-rose-500 dark:text-rose-400";
                underlineClass = "border-b-4 border-rose-500 pb-0.5";
                showCorrectAbove = true;
              }
            } else {
              if (typedChar === char) {
                colorClass = "text-slate-800 dark:text-slate-100";
                underlineClass = activeUnderline;
              } else {
                const isLastChar = index === inputVal.length - 1;
                const status = getHangulMatchStatus(typedChar, char);

                if (isLastChar && status === "partial") {
                  colorClass = "text-slate-800 dark:text-slate-100";
                  underlineClass = activeUnderline;
                } else {
                  colorClass = "text-rose-500 dark:text-rose-400";
                  underlineClass = "border-b-4 border-rose-500 pb-0.5";
                  showCorrectAbove = true;
                }
              }
            }
          } else {
            displayedChar = char;
            colorClass = "text-slate-300 dark:text-slate-600";
            underlineClass = "border-b-4 border-slate-200 dark:border-slate-700 pb-0.5";
          }

          const hasCursor = index === inputVal.length;

          return (
            <span key={index} className={`relative flex items-center select-none py-0.5 px-1 ${minHeightClass}`}>
              {showCorrectAbove && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-rose-600 dark:text-rose-300 font-sans font-black text-xs bg-rose-100 dark:bg-rose-950/90 border border-rose-300 dark:border-rose-700 px-1.5 py-0.5 rounded-md shadow-md leading-none whitespace-nowrap z-20 animate-fade-in pointer-events-none">
                  {char}
                </span>
              )}

              {hasCursor && (
                <span className={`${cursorBg} mr-[3px]`} />
              )}

              <span className={`${colorClass} ${underlineClass} ${charSizeClass} tracking-normal transition-colors font-sans font-black`}>
                {displayedChar}
              </span>
            </span>
          );
        })}

        {extraChars.map((extraChar, extraIdx) => {
          const isLastExtra = extraIdx === extraChars.length - 1;

          return (
            <span key={`extra-${extraIdx}`} className={`relative flex items-center select-none py-1 px-1 ${minHeightClass}`}>
              <span className={`text-rose-500 dark:text-rose-400 border-b-4 border-rose-500 pb-0.5 ${charSizeClass} tracking-normal transition-colors font-sans font-black`}>
                {extraChar}
              </span>
              {isLastExtra && (
                <span className={`${cursorBg} ml-[3px]`} />
              )}
            </span>
          );
        })}

        {inputVal.length === target.length && (
          <span className={`${cursorBg} ml-[3px]`} />
        )}
      </div>
    );
  };

  const prevDisplayName = displayLanguage === "en" ? (prevRegion?.name_en || prevRegion?.name_kr || "") : (prevRegion?.name_kr || prevRegion?.name_en || "");
  const nextDisplayName = displayLanguage === "en" ? (nextRegion?.name_en || nextRegion?.name_kr || "") : (nextRegion?.name_kr || nextRegion?.name_en || "");

  return (
    <>
      <MacroControlPanel
        isOpen={isMacroModalOpen}
        onClose={() => setIsMacroModalOpen(false)}
        isMacroActive={isMacroActive}
        setIsMacroActive={setIsMacroActive}
        macroSpeedMs={macroSpeedMs}
        setMacroSpeedMs={setMacroSpeedMs}
        autoAdvanceDelayMs={autoAdvanceDelayMs}
        setAutoAdvanceDelayMs={setAutoAdvanceDelayMs}
        displayLanguage={displayLanguage}
      />

      <div
        onClick={handleContainerClick}
        className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-[28px] px-4 sm:px-6 py-2.5 md:px-8 md:py-3.5 shadow-2xl border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 relative cursor-text select-none min-h-[90px] overflow-visible"
      >
        {/* Floating Macro Badge */}
        {isMacroActive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMacroModalOpen(true);
            }}
            className="absolute -top-3.5 right-6 z-30 flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/80 text-amber-300 text-[11px] font-black px-3 py-1 rounded-full shadow-xl backdrop-blur-md cursor-pointer transition-all hover:scale-105"
            title={displayLanguage === "en" ? "Click to open Macro Control Panel (Shift+P+J+M)" : "클릭하여 비밀 매크로 조작창 열기 (Shift+P+J+M)"}
          >
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{displayLanguage === "en" ? `Macro ON (${macroSpeedMs}ms)` : `매크로 ON (${macroSpeedMs}ms)`}</span>
            <Sliders className="w-3 h-3 text-amber-400 ml-0.5" />
          </button>
        )}
      {/* Invisible actual input field that maintains active system IME focus */}
      <input
        key={currentRegion?.id || "typing-input"}
        ref={inputRef}
        type="text"
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={() => {
          isComposingRef.current = false;
          if ((isTransitioningRef.current || Date.now() < ignoreUntilRef.current) && inputRef.current) {
            inputRef.current.value = "";
            setInputVal("");
          }
        }}
        onBlur={() => {
          setTimeout(() => {
            if (!isTransitioningRef.current) {
              focusInput();
            }
          }, 10);
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Left spacer / Prev region preview */}
      <div className="hidden sm:flex flex-col items-start min-w-[90px]">
        {prevRegion ? (
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-slate-400">
              {displayLanguage === "en" ? "Prev" : "이전"}
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate max-w-[95px] flex items-center gap-1">
              <CountryFlag id={prevRegion.id} />
              <span className="truncate">{prevDisplayName}</span>
            </span>
          </div>
        ) : (
          <div className="flex flex-col text-left opacity-30">
            <span className="text-[10px] font-bold text-slate-400">
              {displayLanguage === "en" ? "Start" : "출발"}
            </span>
            <span className="text-xs font-bold text-slate-400">-</span>
          </div>
        )}
      </div>

      {/* Center Target Input Block */}
      <div className="flex flex-col items-center justify-center flex-1 w-full overflow-visible">
        {renderTargetWithHighlights()}
        <span className="text-xs text-slate-400 font-sans font-medium text-center mt-1 select-none flex items-center justify-center gap-1.5">
          <CountryFlag id={currentRegion?.id} />
          <span>{getSubName()}</span>
        </span>
      </div>

      {/* Right Side: Next region preview matching maptyping.com */}
      <div className="flex flex-col items-end text-right min-w-[90px]">
        {nextRegion ? (
          <div className="flex flex-col items-end">
            <span className={`text-xs font-bold ${currentRegion?.level === "world" ? "text-slate-500 dark:text-slate-400" : "text-emerald-600 dark:text-emerald-400"}`}>
              {displayLanguage === "en" ? "Next" : "다음"}
            </span>
            <span className="text-sm md:text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate max-w-[105px] flex items-center gap-1">
              <CountryFlag id={nextRegion.id} />
              <span className="truncate">{nextDisplayName}</span>
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-end opacity-40">
            <span className={`text-xs font-bold ${currentRegion?.level === "world" ? "text-slate-500" : "text-emerald-600"}`}>
              {displayLanguage === "en" ? "End" : "종착"}
            </span>
            <span className="text-sm font-bold text-slate-500">
              {displayLanguage === "en" ? "Final Station" : "마지막 역"}
            </span>
          </div>
        )}
      </div>
      </div>
    </>
  );
};
