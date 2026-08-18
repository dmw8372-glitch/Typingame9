import React from "react";
import mapTypingLogoSrc from "../assets/images/map_typing_logo_transparent.png";

interface LogoProps {
  src?: string;
  className?: string;
  alt?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Logo: React.FC<LogoProps> = ({
  src = mapTypingLogoSrc,
  className = "w-9 h-9",
  alt = "MAP TYPING Logo",
  onClick,
  style,
}) => {
  return (
    <img
      src={src || mapTypingLogoSrc}
      alt={alt}
      onClick={onClick}
      style={style}
      className={`object-contain select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

