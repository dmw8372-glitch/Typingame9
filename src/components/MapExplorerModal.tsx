import React, { useState, useMemo, useEffect, useRef } from "react";
import { X, Search, Globe, Compass, MapPin, Loader2, Sparkles } from "lucide-react";
import { Region, ModeColors, WorldFillMode, MapStyle } from "../types";
import { Map } from "./Map";
import { CountryFlag } from "./CountryFlag";
import { searchAddressGeocoding, GeocodedPlace } from "../lib/geocoding";

interface MapExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sidoList: Region[];
  sigunguList: Region[];
  japanList?: Region[];
  usaList?: Region[];
  chinaList?: Region[];
  vietnamList?: Region[];
  germanyList?: Region[];
  franceList?: Region[];
  italyList?: Region[];
  spainList?: Region[];
  worldList: Region[];
  modeColors?: ModeColors;
  worldFillMode?: WorldFillMode;
  mapStyle?: MapStyle;
  onToggleMapStyle?: (style: MapStyle) => void;
}

type ExplorerLevel = "sido" | "sigungu" | "spain" | "italy" | "france" | "germany" | "japan" | "usa" | "china" | "vietnam" | "world";

export const MapExplorerModal: React.FC<MapExplorerModalProps> = ({
  isOpen,
  onClose,
  sidoList,
  sigunguList,
  japanList = [],
  usaList = [],
  chinaList = [],
  vietnamList = [],
  germanyList = [],
  franceList = [],
  italyList = [],
  spainList = [],
  worldList,
  modeColors,
  worldFillMode,
  mapStyle,
  onToggleMapStyle,
}) => {
  const [level, setLevel] = useState<ExplorerLevel>("sido");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Address Geocoding state for Google Maps style address search
  const [geocodedPlaces, setGeocodedPlaces] = useState<GeocodedPlace[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentList = useMemo(() => {
    if (level === "sido") return sidoList;
    if (level === "sigungu") return sigunguList;
    if (level === "spain") return spainList;
    if (level === "italy") return italyList;
    if (level === "france") return franceList;
    if (level === "germany") return germanyList;
    if (level === "japan") return japanList;
    if (level === "usa") return usaList;
    if (level === "china") return chinaList;
    if (level === "vietnam") return vietnamList;
    return worldList;
  }, [level, sidoList, sigunguList, spainList, italyList, franceList, germanyList, japanList, usaList, chinaList, vietnamList, worldList]);

  const filteredRegions = useMemo(() => {
    if (!searchTerm.trim()) return currentList;
    const term = searchTerm.toLowerCase();
    return currentList.filter(
      (r) =>
        r.name_kr.toLowerCase().includes(term) ||
        r.name_en.toLowerCase().includes(term) ||
        r.region_group.toLowerCase().includes(term)
    );
  }, [currentList, searchTerm]);

  // Effect to perform Google Maps style address search with debouncing
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = searchTerm.trim();
    if (!trimmed || trimmed.length < 2) {
      setGeocodedPlaces([]);
      setIsGeocoding(false);
      return;
    }

    setIsGeocoding(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const places = await searchAddressGeocoding(trimmed);
        setGeocodedPlaces(places);
      } catch (err) {
        console.error("Geocoding search error:", err);
      } finally {
        setIsGeocoding(false);
      }
    }, 350);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [searchTerm]);

  const handleSelectGeocodedPlace = (place: GeocodedPlace) => {
    const dynamicRegion: Region = {
      id: place.id,
      name_kr: place.name,
      name_en: place.fullAddress,
      level: level || "world",
      lat: place.lat,
      lng: place.lng,
      region_group: place.countryName || place.city || "상세 주소",
      neighbors: [],
      description: place.fullAddress,
    };
    setSelectedRegion(dynamicRegion);
  };

  const mapRegions = useMemo(() => {
    if (selectedRegion && selectedRegion.id.startsWith("geo-")) {
      return [selectedRegion, ...filteredRegions];
    }
    return filteredRegions;
  }, [filteredRegions, selectedRegion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-5xl w-full h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>지도 탐색기</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  구글 맵 상세 주소 검색 지원
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                국가/지역명 뿐만 아니라 도로명, 시/구, 빌딩, 명소 등 상세 주소도 구글 맵처럼 검색할 수 있습니다
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Selector Tabs & Search Filter */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 overflow-x-auto">
          {/* Tabs */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex gap-1 w-full sm:w-auto shrink-0 overflow-x-auto">
            <button
              onClick={() => {
                setLevel("sido");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "sido"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇰🇷 한국 광역</span>
            </button>

            <button
              onClick={() => {
                setLevel("sigungu");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "sigungu"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇰🇷 시·군·구</span>
            </button>

            <button
              onClick={() => {
                setLevel("spain");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "spain"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇪🇸 스페인 ({spainList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("italy");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "italy"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇮🇹 이탈리아 ({italyList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("france");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "france"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇫🇷 프랑스 ({franceList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("germany");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "germany"
                  ? "bg-yellow-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇩🇪 독일 ({germanyList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("japan");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "japan"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇯🇵 일본 ({japanList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("usa");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "usa"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇺🇸 미국 ({usaList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("china");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "china"
                  ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇨🇳 중국 ({chinaList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("vietnam");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "vietnam"
                  ? "bg-red-600 text-yellow-300 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇻🇳 베트남 ({vietnamList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("world");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "world"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>🌐 전세계 ({worldList.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="상세 주소, 도로명, 명소, 도시, 국가 검색..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {isGeocoding ? (
              <Loader2 className="w-3.5 h-3.5 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2 animate-spin" />
            ) : searchTerm ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setGeocodedPlaces([]);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Content Body: Map + List Split View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Map Section (Col 8) */}
          <div className="md:col-span-8 h-64 md:h-full relative border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <Map
              regions={mapRegions}
              activeRegion={selectedRegion || undefined}
              visitedRegions={selectedRegion ? [selectedRegion] : []}
              showSimple={true}
              regionLevel={level}
              modeColors={modeColors}
              worldFillMode={worldFillMode}
              mapStyle={mapStyle}
              onToggleMapStyle={onToggleMapStyle}
            />
          </div>

          {/* Region List Section (Col 4) */}
          <div className="md:col-span-4 h-full flex flex-col bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <span>검색 및 탐색</span>
                {isGeocoding && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 animate-pulse font-medium">
                    (구글 맵 주소 조회 중...)
                  </span>
                )}
              </span>
              {selectedRegion && (
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline text-[11px]"
                >
                  선택 해제
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {/* 1. Google Maps Detailed Address Results Section */}
              {(geocodedPlaces.length > 0 || isGeocoding) && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-black text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-950/30 px-2.5 py-1.5 rounded-xl border border-amber-500/20">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>📍 구글 맵 스타일 상세 주소 검색 결과</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{geocodedPlaces.length}건</span>
                  </div>

                  {isGeocoding && geocodedPlaces.length === 0 ? (
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                      <span>전 세계 상세 주소를 검색하는 중입니다...</span>
                    </div>
                  ) : (
                    geocodedPlaces.map((place) => {
                      const isSelected = selectedRegion?.id === place.id;
                      return (
                        <button
                          key={place.id}
                          onClick={() => handleSelectGeocodedPlace(place)}
                          className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                            isSelected
                              ? "bg-emerald-500/10 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/30"
                              : "bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-900/50 hover:border-amber-400 dark:hover:border-amber-700 text-slate-800 dark:text-slate-100 shadow-sm"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              <span className="text-xs font-black truncate">{place.name}</span>
                              {place.countryCode && <CountryFlag id={place.countryCode} />}
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {place.fullAddress}
                            </p>
                            <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                              <span>📍 {place.lat.toFixed(4)}, {place.lng.toFixed(4)}</span>
                              {place.countryName && (
                                <span className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-sans font-bold">
                                  {place.countryName}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              {/* 2. Preset Regional Course List */}
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 px-1 flex items-center justify-between">
                  <span>🗺️ 주요 지역/국가 코스 ({filteredRegions.length}개)</span>
                </div>

                {filteredRegions.length === 0 && geocodedPlaces.length === 0 && !isGeocoding ? (
                  <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">
                      검색 결과가 없습니다.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      상세 주소 (예: "도쿄 시부야", "뉴욕 타임스퀘어", "에펠탑", "강남구 테헤란로 123")를 직접 검색해 보세요.
                    </p>
                  </div>
                ) : (
                  filteredRegions.map((region) => {
                    const isSelected = selectedRegion?.id === region.id;
                    return (
                      <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2 ${
                          isSelected
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-sm"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <CountryFlag id={region.id} />
                            <span className="text-xs font-black">{region.name_kr}</span>
                            <span className="text-[10px] text-slate-400 font-medium">({region.name_en})</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {region.description || `${region.region_group} 지역의 주요 코스입니다.`}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                          {region.region_group}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

