import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Check,
  Palette,
  Smile,
  PenTool,
  RotateCcw,
  Eraser,
  Sparkles,
  Trash2,
  Crown,
  Glasses,
  Headphones,
  Undo2,
  Download,
  Paintbrush
} from "lucide-react";
import { VehicleCardPreview } from "./VehicleCardPreview";
import { CustomVehicleConfig, ExpressionType, AccessoryType } from "../types";
import { VehicleType } from "../utils/vehicleAvatars";

interface CharacterCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CustomVehicleConfig;
  onSaveConfig: (newConfig: CustomVehicleConfig) => void;
  displayLanguage?: "ko" | "en";
}

const COLOR_SWATCHES = [
  "#10b981", // Emerald
  "#059669", // Dark Emerald
  "#3b82f6", // Blue
  "#2563eb", // Royal Blue
  "#ef4444", // Red
  "#dc2626", // Dark Red
  "#f59e0b", // Amber
  "#d97706", // Dark Amber
  "#f43f5e", // Rose
  "#e11d48", // Dark Rose
  "#8b5cf6", // Purple
  "#7c3aed", // Dark Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#f97316", // Orange
  "#1e293b", // Dark Slate
  "#ffffff", // White
];

export const CharacterCustomizerModal: React.FC<CharacterCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  displayLanguage = "ko",
}) => {
  const isEn = displayLanguage === "en";
  const [activeTab, setActiveTab] = useState<"preset" | "draw">(
    config.mode === "custom_draw" ? "draw" : "preset"
  );

  // Preset customization state
  const [baseType, setBaseType] = useState<VehicleType>(config.baseType || "person");
  const [bodyColor, setBodyColor] = useState<string>(config.bodyColor || "#10b981");
  const [accentColor, setAccentColor] = useState<string>(config.accentColor || "#047857");
  const [expression, setExpression] = useState<ExpressionType>(config.expression || "happy");
  const [accessory, setAccessory] = useState<AccessoryType>(config.accessory || "none");

  // Hand-draw canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>("#1e293b");
  const [brushSize, setBrushSize] = useState<number>(6);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [drawnDataUrl, setDrawnDataUrl] = useState<string | null>(config.customDrawDataUrl || null);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(config.mode === "custom_draw" ? "draw" : "preset");
      setBaseType(config.baseType || "person");
      setBodyColor(config.bodyColor || "#10b981");
      setAccentColor(config.accentColor || "#047857");
      setExpression(config.expression || "happy");
      setAccessory(config.accessory || "none");
      setDrawnDataUrl(config.customDrawDataUrl || null);
    }
  }, [isOpen, config]);

  // Load existing drawing into canvas when tab switches to "draw"
  useEffect(() => {
    if (isOpen && activeTab === "draw" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (config.customDrawDataUrl) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          saveCanvasToUndo();
        };
        img.src = config.customDrawDataUrl;
      } else {
        // Draw helper outline
        drawGridHelper(ctx, canvas.width, canvas.height);
        saveCanvasToUndo();
      }
    }
  }, [isOpen, activeTab]);

  const drawGridHelper = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Soft transparent guide circle
    ctx.save();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };

  const saveCanvasToUndo = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    setUndoStack((prev) => [...prev.slice(-10), url]);
    setDrawnDataUrl(url);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    if (isEraser) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = penColor;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasToUndo();
    }
  };

  const handleUndo = () => {
    if (undoStack.length <= 1 || !canvasRef.current) return;
    const newStack = [...undoStack];
    newStack.pop(); // remove current
    const previousUrl = newStack[newStack.length - 1];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      setUndoStack(newStack);
      setDrawnDataUrl(previousUrl);
    };
    img.src = previousUrl;
  };

  const handleClearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridHelper(ctx, canvas.width, canvas.height);
    saveCanvasToUndo();
  };

  const addStickerToCanvas = (type: "eyes" | "smile" | "hat" | "wheels") => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    if (type === "eyes") {
      ctx.fillStyle = penColor;
      // left eye
      ctx.beginPath();
      ctx.arc(cx - 20, cy - 15, 8, 0, Math.PI * 2);
      ctx.fill();
      // right eye
      ctx.beginPath();
      ctx.arc(cx + 20, cy - 15, 8, 0, Math.PI * 2);
      ctx.fill();
      // eye shines
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx - 18, cy - 17, 3, 0, Math.PI * 2);
      ctx.arc(cx + 22, cy - 17, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "smile") {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(cx, cy + 5, 20, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
    } else if (type === "hat") {
      ctx.fillStyle = penColor;
      ctx.beginPath();
      ctx.arc(cx, cy - 45, 25, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(cx - 35, cy - 45, 70, 6);
    } else if (type === "wheels") {
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(cx - 30, cy + 50, 12, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy + 50, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx - 30, cy + 50, 4, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy + 50, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    saveCanvasToUndo();
  };

  const handleApplyPreset = () => {
    const updated: CustomVehicleConfig = {
      mode: "preset",
      baseType,
      bodyColor,
      accentColor,
      expression,
      accessory,
      customDrawDataUrl: drawnDataUrl,
    };
    onSaveConfig(updated);
    onClose();
  };

  const handleApplyDrawing = () => {
    if (!drawnDataUrl) return;
    const updated: CustomVehicleConfig = {
      mode: "custom_draw",
      baseType,
      bodyColor,
      accentColor,
      expression,
      accessory,
      customDrawDataUrl: drawnDataUrl,
    };
    onSaveConfig(updated);
    onClose();
  };

  if (!isOpen) return null;

  const currentPreviewConfig: CustomVehicleConfig = {
    mode: activeTab === "draw" ? "custom_draw" : "preset",
    baseType,
    bodyColor,
    accentColor,
    expression,
    accessory,
    customDrawDataUrl: drawnDataUrl,
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl text-slate-800 dark:text-slate-100 my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {isEn ? "Character Customizer & Drawer" : "나만의 캐릭터 꾸미기 & 직접 그리기"}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {isEn ? "Customize avatar color, face & hat or hand-draw your character" : "색상, 표정, 장식을 직접 조율하거나 canvas에 직접 나만의 캐릭터를 그리세요"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl my-4 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("preset")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "preset"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>{isEn ? "🎨 Colors & Accessories" : "🎨 색상·표정·장식 커스텀"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("draw")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "draw"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>{isEn ? "✏️ Hand-Draw Canvas" : "✏️ 직접 그린 캐릭터"}</span>
          </button>
        </div>

        {/* Top Realtime Preview Card */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
              <VehicleCardPreview
                type={activeTab === "draw" ? "custom_draw" : baseType}
                customConfig={currentPreviewConfig}
              />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{isEn ? "Realtime Character Preview" : "실시간 완성 캐릭터"}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-white font-extrabold">
                  {activeTab === "draw" ? (isEn ? "Hand Drawn" : "손그림") : (isEn ? "Custom Preset" : "커스텀 프리셋")}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {activeTab === "draw"
                  ? (isEn ? "Your hand-drawn drawing will float directly over map stations!" : "내가 그린 캐릭터 그림이 지도 위 역명과 함께 둥둥 떠서 주행합니다!")
                  : (isEn ? "Customized colors, faces, and hats apply immediately." : "선택한 피부색, 표정, 장식이 지도 위 캐릭터에 그대로 반영됩니다.")}
              </p>
            </div>
          </div>
        </div>

        {/* TAB 1: PRESET CUSTOMIZER */}
        {activeTab === "preset" && (
          <div className="space-y-4 py-1">
            {/* Base Model Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                {isEn ? "1. Select Base Model" : "1. 베이스 이동수단 캐릭터 선택"}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "person", name: isEn ? "Traveler" : "🎒 여행자" },
                  { id: "subway", name: isEn ? "Subway" : "🚇 지하철" },
                  { id: "car", name: isEn ? "Car" : "🚗 자동차" },
                  { id: "plane", name: isEn ? "Airplane" : "✈️ 비행기" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBaseType(item.id as VehicleType)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      baseType === item.id
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Main Body Color */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isEn ? "Body / Skin Color" : "몸체 / 피부 메인 색상"}
                  </span>
                  <input
                    type="color"
                    value={bodyColor}
                    onChange={(e) => setBodyColor(e.target.value)}
                    className="w-6 h-6 rounded-lg cursor-pointer border border-slate-300 bg-transparent p-0"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch}
                      type="button"
                      onClick={() => setBodyColor(swatch)}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                        bodyColor.toLowerCase() === swatch.toLowerCase()
                          ? "ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900 scale-110 border-white"
                          : "border-black/10 dark:border-white/10 hover:scale-110"
                      }`}
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </div>
              </div>

              {/* Accent / Hat Color */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isEn ? "Accent / Hat Color" : "모자 / 스카프 / 포인트 색상"}
                  </span>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-6 h-6 rounded-lg cursor-pointer border border-slate-300 bg-transparent p-0"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch}
                      type="button"
                      onClick={() => setAccentColor(swatch)}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                        accentColor.toLowerCase() === swatch.toLowerCase()
                          ? "ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900 scale-110 border-white"
                          : "border-black/10 dark:border-white/10 hover:scale-110"
                      }`}
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Expression Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                {isEn ? "2. Select Character Expression (표정)" : "2. 표정 선택"}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: "happy", icon: "😄", name: isEn ? "Happy" : "방긋" },
                  { id: "smile", icon: "😊", name: isEn ? "Smile" : "미소" },
                  { id: "wink", icon: "😉", name: isEn ? "Wink" : "윙크" },
                  { id: "sunglasses", icon: "😎", name: isEn ? "Cool" : "선글라스" },
                  { id: "cute", icon: "🥺", name: isEn ? "Sparkle" : "왕눈이" },
                  { id: "surprised", icon: "😲", name: isEn ? "Surprised" : "놀람" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setExpression(item.id as ExpressionType)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      expression === item.id
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[11px]">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessory Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                {isEn ? "3. Select Hat / Accessory (장식)" : "3. 장식 & 모자 선택"}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: "none", icon: "❌", name: isEn ? "None" : "없음" },
                  { id: "cap", icon: "🧢", name: isEn ? "Cap" : "야구모자" },
                  { id: "crown", icon: "👑", name: isEn ? "Crown" : "왕관" },
                  { id: "glasses", icon: "👓", name: isEn ? "Glasses" : "안경" },
                  { id: "ribbon", icon: "🎀", name: isEn ? "Ribbon" : "리본" },
                  { id: "headphones", icon: "🎧", name: isEn ? "Headphones" : "헤드폰" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAccessory(item.id as AccessoryType)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      accessory === item.id
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[11px]">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Preset Button */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={handleApplyPreset}
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEn ? "Apply Character Customization" : "커스텀 캐릭터 적용하기"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: HAND DRAWING CANVAS */}
        {activeTab === "draw" && (
          <div className="space-y-4 py-1">
            {/* Canvas Toolbar & Controls */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              {/* Tool Mode & Pen Color */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsEraser(false)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer ${
                      !isEraser
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 border-slate-200 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Paintbrush className="w-3.5 h-3.5" />
                    <span>{isEn ? "Pen Tool" : "펜 (그리기)"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEraser(true)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer ${
                      isEraser
                        ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 border-slate-200 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>{isEn ? "Eraser" : "지우개"}</span>
                  </button>
                </div>

                {/* Pen Color Swatches */}
                {!isEraser && (
                  <div className="flex items-center gap-1">
                    {["#1e293b", "#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#ffffff"].map(
                      (c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setPenColor(c)}
                          className={`w-5 h-5 rounded-full border cursor-pointer ${
                            penColor === c
                              ? "ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900 scale-110"
                              : "border-slate-300"
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      )
                    )}
                    <input
                      type="color"
                      value={penColor}
                      onChange={(e) => setPenColor(e.target.value)}
                      className="w-5 h-5 rounded-full cursor-pointer bg-transparent border-0 p-0"
                    />
                  </div>
                )}

                {/* Undo & Clear */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={undoStack.length <= 1}
                    className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
                    title={isEn ? "Undo last stroke" : "되돌리기"}
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleClearCanvas}
                    className="p-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-200 dark:border-rose-800 hover:bg-rose-100 cursor-pointer"
                    title={isEn ? "Clear canvas" : "전체 지우기"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Brush Size Slider */}
              <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="shrink-0">{isEn ? "Brush Size" : "붓/지우개 크기"}</span>
                <input
                  type="range"
                  min="2"
                  max="28"
                  step="1"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <span className="font-mono w-6 text-right text-emerald-600">{brushSize}px</span>
              </div>

              {/* Preset Stamps / Stickers */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-[11px] font-bold text-slate-500 shrink-0">
                  {isEn ? "Stickers:" : "가이드 스탬프:"}
                </span>
                <button
                  type="button"
                  onClick={() => addStickerToCanvas("eyes")}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                >
                  👀 눈 스티커
                </button>
                <button
                  type="button"
                  onClick={() => addStickerToCanvas("smile")}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                >
                  👄 미소 입
                </button>
                <button
                  type="button"
                  onClick={() => addStickerToCanvas("hat")}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                >
                  🧢 모자
                </button>
                <button
                  type="button"
                  onClick={() => addStickerToCanvas("wheels")}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                >
                  ⚙️ 바퀴
                </button>
              </div>
            </div>

            {/* Drawing Canvas Area */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative bg-white dark:bg-slate-950 rounded-3xl border-2 border-emerald-500/40 shadow-inner p-2 touch-none">
                <canvas
                  ref={canvasRef}
                  width={260}
                  height={260}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-[260px] h-[260px] bg-white dark:bg-slate-900 rounded-2xl cursor-crosshair shadow-xs"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium text-center">
                {isEn ? "✏️ Draw inside the box using mouse or touch screen" : "✏️ 하얀 상자 안에서 손가락이나 마우스로 원하는 캐릭터를 마음껏 그리세요"}
              </p>
            </div>

            {/* Save Drawing Button */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={handleApplyDrawing}
                disabled={!drawnDataUrl}
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEn ? "Save & Play with Drawn Character" : "내가 그린 캐릭터 저장 & 플레이하기"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
