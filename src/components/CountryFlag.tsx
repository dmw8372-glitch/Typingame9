import React from "react";
import { getCountryFlagUrl } from "../utils/flagUtils";

interface CountryFlagProps {
  id: string | undefined | null;
  className?: string;
  alt?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  id,
  className = "w-5 h-3.5 object-cover rounded-xs border border-slate-300/80 dark:border-slate-700/80 shadow-2xs inline-block shrink-0 align-middle",
  alt = "",
}) => {
  const url = getCountryFlagUrl(id);
  if (!url) return null;

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLElement).style.display = "none";
      }}
    />
  );
};
