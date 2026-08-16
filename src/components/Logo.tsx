import React, { useState, useEffect } from "react";
import mapTypingLogoSrc from "../assets/images/map_typing_app_logo_1785158271788.jpg";

interface LogoProps {
  src?: string;
  className?: string;
  alt?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const transparentCache = new Map<string, string>();

export function getTransparentLogo(imgSrc: string): Promise<string> {
  if (transparentCache.has(imgSrc)) {
    return Promise.resolve(transparentCache.get(imgSrc)!);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(imgSrc);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Check if pixel is white or near-white background
          const minChannel = Math.min(r, g, b);
          if (minChannel > 200) {
            const avg = (r + g + b) / 3;
            if (avg >= 240) {
              data[i + 3] = 0; // Fully transparent
            } else {
              // Smooth gradient alpha transition for antialiasing
              const factor = (avg - 200) / (240 - 200);
              const alpha = Math.max(0, Math.floor(255 * (1 - factor)));
              data[i + 3] = Math.min(data[i + 3], alpha);
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const transparentUrl = canvas.toDataURL("image/png");
        transparentCache.set(imgSrc, transparentUrl);
        resolve(transparentUrl);
      } catch (err) {
        console.error("Transparent logo error:", err);
        resolve(imgSrc);
      }
    };
    img.onerror = () => resolve(imgSrc);
    img.src = imgSrc;
  });
}

export const Logo: React.FC<LogoProps> = ({
  src = mapTypingLogoSrc,
  className = "w-9 h-9",
  alt = "MAP TYPING Logo",
  onClick,
  style,
}) => {
  const [transparentSrc, setTransparentSrc] = useState<string>(
    () => transparentCache.get(src || mapTypingLogoSrc) || (src || mapTypingLogoSrc)
  );

  const targetSrc = src || mapTypingLogoSrc;

  useEffect(() => {
    let isMounted = true;
    if (!transparentCache.has(targetSrc)) {
      getTransparentLogo(targetSrc).then((res) => {
        if (isMounted) setTransparentSrc(res);
      });
    } else {
      setTransparentSrc(transparentCache.get(targetSrc)!);
    }
    return () => {
      isMounted = false;
    };
  }, [targetSrc]);

  return (
    <img
      src={transparentSrc}
      alt={alt}
      onClick={onClick}
      style={{
        mixBlendMode: transparentSrc === targetSrc ? "multiply" : "normal",
        ...style,
      }}
      className={`object-contain select-none transition-all ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};
