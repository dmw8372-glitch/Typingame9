/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import { ZoomIn, ZoomOut, Compass, Navigation } from "lucide-react";
import { Region, ModeColors, WorldFillMode, MapStyle, DEFAULT_MODE_COLORS, CustomVehicleConfig } from "../types";
import { WORLD_COUNTRIES } from "../data/worldCountries";
import { ALL_REGIONS, SIDO_LIST, SIGUNGU_LIST, JAPAN_LIST, USA_LIST, CHINA_LIST, VIETNAM_LIST, GERMANY_LIST, FRANCE_LIST, ITALY_LIST, SPAIN_LIST, UK_LIST } from "../data/regions";
import { PlayerState } from "../lib/multiplayer";
import { VehicleType, getMapVehicleMarkerHtml } from "../utils/vehicleAvatars";
import { CountryFlag } from "./CountryFlag";

interface MapProps {
  regions: Region[];
  activeRegion: Region | null;
  visitedRegions: Region[];
  courseHistory: string[]; // List of region IDs in travel order
  upcomingRegions: Region[];
  showSimple: boolean;
  isQuizMode?: boolean;
  multiplayerPlayers?: Record<string, PlayerState>;
  myPlayerId?: string;
  coursePath?: Region[];
  regionLevel?: string;
  vehicleType?: VehicleType;
  customVehicleConfig?: CustomVehicleConfig;
  modeColors?: ModeColors;
  worldFillMode?: WorldFillMode;
  displayLanguage?: "ko" | "en";
  mapStyle?: MapStyle;
  onToggleMapStyle?: (style: MapStyle) => void;
}

const MapComponent: React.FC<MapProps> = ({
  regions = [],
  activeRegion,
  visitedRegions = [],
  courseHistory = [],
  upcomingRegions = [],
  showSimple,
  isQuizMode = false,
  multiplayerPlayers,
  myPlayerId,
  coursePath = [],
  regionLevel,
  vehicleType = "subway",
  customVehicleConfig,
  modeColors = DEFAULT_MODE_COLORS,
  worldFillMode = "color",
  displayLanguage = "ko",
  mapStyle = "standard",
  onToggleMapStyle,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeMapStyle, setActiveMapStyle] = useState<MapStyle>(mapStyle || "standard");

  useEffect(() => {
    if (mapStyle && mapStyle !== activeMapStyle) {
      setActiveMapStyle(mapStyle);
    }
  }, [mapStyle]);

  const activeModeColors = modeColors || DEFAULT_MODE_COLORS;
  const activeWorldFillMode = worldFillMode || "color";

  const getModeVisitedColor = (level: string) => {
    if (level === "japan") return activeModeColors.japan || DEFAULT_MODE_COLORS.japan;
    if (level === "usa") return activeModeColors.usa || DEFAULT_MODE_COLORS.usa;
    if (level === "china") return activeModeColors.china || DEFAULT_MODE_COLORS.china;
    if (level === "vietnam") return activeModeColors.vietnam || DEFAULT_MODE_COLORS.vietnam;
    if (level === "germany") return activeModeColors.germany || DEFAULT_MODE_COLORS.germany;
    if (level === "france") return activeModeColors.france || DEFAULT_MODE_COLORS.france;
    if (level === "italy") return activeModeColors.italy || DEFAULT_MODE_COLORS.italy;
    if (level === "spain") return activeModeColors.spain || DEFAULT_MODE_COLORS.spain;
    if (level === "uk") return activeModeColors.uk || DEFAULT_MODE_COLORS.uk;
    if (level === "world") return activeModeColors.world || DEFAULT_MODE_COLORS.world;
    return activeModeColors.korea || DEFAULT_MODE_COLORS.korea;
  };

  const ensureFlagPattern = (mapInstance: L.Map | null, countryCode: string) => {
    if (!mapInstance || !countryCode) return;
    try {
      const container = mapInstance.getContainer();
      const svg = container.querySelector("svg");
      if (!svg) return;

      let defs = svg.querySelector("defs#map-flag-defs");
      if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.setAttribute("id", "map-flag-defs");
        svg.insertBefore(defs, svg.firstChild);
      }

      const cleanCode = countryCode.toLowerCase().trim();
      const patternId = `flag-pattern-${cleanCode}`;
      if (!defs.querySelector(`[id="${patternId}"]`) && !document.getElementById(patternId)) {
        const flagUrl = `https://flagcdn.com/w320/${cleanCode}.png`;

        const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        pattern.setAttribute("id", patternId);
        pattern.setAttribute("patternUnits", "objectBoundingBox");
        pattern.setAttribute("width", "1");
        pattern.setAttribute("height", "1");

        const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS("http://www.w3.org/1999/xlink", "href", flagUrl);
        image.setAttribute("href", flagUrl);
        image.setAttribute("x", "0");
        image.setAttribute("y", "0");
        image.setAttribute("width", "100%");
        image.setAttribute("height", "100%");
        image.setAttribute("preserveAspectRatio", "none");

        pattern.appendChild(image);
        defs.appendChild(pattern);
      }
    } catch (e) {
      // ignore
    }
  };
  
  const [zoomLevel, setZoomLevel] = useState<number>(8);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  // Layer groups for markers, polylines, and geojson polygons
  const layersRef = useRef<{
    geojson: L.LayerGroup | null;
    polylines: L.LayerGroup | null;
    markers: L.LayerGroup | null;
  }>({ geojson: null, polylines: null, markers: null });

  const geoJsonDataRef = useRef<any>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const loadedLevelRef = useRef<string | null>(null);
  const prevVehiclePosRef = useRef<{ lat: number; lng: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Convert leaflet zoom level to UI zoom percentage (6 -> 100%, 14 -> 650%)
  const zoomPercent = Math.round(((zoomLevel - 6) / (14 - 6)) * 550 + 100);

  // 1. Initialize map instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Safety cleanup for leftover Leaflet container state
    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    const effectiveLevel = regionLevel || activeRegion?.level || (regions && regions.length > 0 ? regions[0]?.level : "sido");
    const isWorldMode = effectiveLevel === "world";
    const isChinaMode = effectiveLevel === "china";
    const isJapanMode = effectiveLevel === "japan";
    const isUsaMode = effectiveLevel === "usa";
    const isVietnamMode = effectiveLevel === "vietnam";
    const isGermanyMode = effectiveLevel === "germany";
    const isFranceMode = effectiveLevel === "france";
    const isItalyMode = effectiveLevel === "italy";
    const isSpainMode = effectiveLevel === "spain";
    const isUkMode = effectiveLevel === "uk";

    const hasValidActiveCoords =
      activeRegion &&
      typeof activeRegion.lat === "number" &&
      typeof activeRegion.lng === "number" &&
      !isNaN(activeRegion.lat) &&
      !isNaN(activeRegion.lng);

    const initialCenter: L.LatLngExpression = hasValidActiveCoords
      ? [activeRegion.lat, activeRegion.lng]
      : isWorldMode
      ? [20, 10]
      : isChinaMode
      ? [35.0, 104.0]
      : isJapanMode
      ? [36.2, 138.2]
      : isUsaMode
      ? [37.0, -95.7]
      : isFranceMode
      ? [46.603354, 1.888334]
      : isGermanyMode
      ? [51.1657, 10.4515]
      : isItalyMode
      ? [41.8719, 12.5674]
      : isSpainMode
      ? [40.4637, -3.7492]
      : isUkMode
      ? [54.5, -3.0]
      : isVietnamMode
      ? [15.8, 107.5]
      : [36.2, 127.8];
    const initialZoom = isWorldMode ? 3 : isChinaMode ? 4 : isUsaMode ? 4 : (isGermanyMode || isFranceMode || isItalyMode || isSpainMode || isUkMode) ? 6 : isVietnamMode ? 6.5 : isJapanMode ? 6 : 8;

    try {
      // Create leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });

      // Setup Layer Groups (GeoJSON on bottom, polylines in middle, markers on top)
      layersRef.current.geojson = L.layerGroup().addTo(map);
      layersRef.current.polylines = L.layerGroup().addTo(map);
      layersRef.current.markers = L.layerGroup().addTo(map);

      mapRef.current = map;

      // Force size calculation repeatedly to guarantee proper rendering on Windows PC Chrome/Edge
      const timer1 = setTimeout(() => map.invalidateSize(), 50);
      const timer2 = setTimeout(() => map.invalidateSize(), 200);
      const timer3 = setTimeout(() => map.invalidateSize(), 500);
      const timer4 = setTimeout(() => map.invalidateSize(), 1000);

      // Synchronize map zoom to state
      map.on("zoomend", () => {
        setZoomLevel(map.getZoom());
      });

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        if (mapRef.current) {
          try {
            mapRef.current.remove();
          } catch (e) {
            console.error("Map remove error:", e);
          }
          mapRef.current = null;
        }
      };
    } catch (err) {
      console.error("Leaflet initialization error:", err);
    }
  }, []);

  // Handle tile layer creation and switching between Standard and Satellite map styles
  useEffect(() => {
    if (!mapRef.current) return;

    if (tileLayerRef.current) {
      try {
        tileLayerRef.current.remove();
      } catch (e) {
        // ignore
      }
      tileLayerRef.current = null;
    }

    if (activeMapStyle === "satellite") {
      // ArcGIS World Imagery (real high-resolution satellite imagery)
      tileLayerRef.current = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 18,
          attribution: "Esri, Maxar, Earthstar Geographics",
        }
      ).addTo(mapRef.current);
    } else {
      // CartoDB Light No Labels (minimalist vector landmass map)
      tileLayerRef.current = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 18,
          subdomains: "abcd",
        }
      ).addTo(mapRef.current);
    }

    if (geoJsonLayerRef.current) {
      applyGeoJsonStyle();
    }
  }, [activeMapStyle]);

  // Handle Container Resizing automatically
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Fit course bounds when regions change initially
  useEffect(() => {
    if (!mapRef.current || !regions || regions.length === 0) return;
    const validCoords = regions
      .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
      .map((r) => [r.lat, r.lng] as [number, number]);
    if (validCoords.length > 0) {
      const bounds = L.latLngBounds(validCoords);
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [regions]);

  // 2. Map panning / centering on active node or fitting full course bounds on completion
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const timer1 = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 50);

    const timer2 = setTimeout(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize();

      // If entire course is completed (e.g. in results view), zoom out to fit all visited regions cleanly
      if (visitedRegions.length > 0 && visitedRegions.length === regions.length) {
        const validCoords = visitedRegions
          .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
          .map((r) => [r.lat, r.lng] as [number, number]);
        if (validCoords.length > 0) {
          const bounds = L.latLngBounds(validCoords);
          if (bounds.isValid()) {
            mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 8, animate: true });
            return;
          }
        }
      }

      if (activeRegion && typeof activeRegion.lat === "number" && typeof activeRegion.lng === "number" && !isNaN(activeRegion.lat) && !isNaN(activeRegion.lng)) {
        const isWorld = activeRegion.level === "world";
        const isChina = activeRegion.level === "china";
        const isUsa = activeRegion.level === "usa";
        const isJapan = activeRegion.level === "japan";
        const isVietnam = activeRegion.level === "vietnam";
        const isGermany = activeRegion.level === "germany";
        const isFrance = activeRegion.level === "france";
        const isItaly = activeRegion.level === "italy";
        const isSpain = activeRegion.level === "spain";
        const isUk = activeRegion.level === "uk";

        const regId = (activeRegion.id || "").toLowerCase();
        const isMicrostate = ["va", "mc", "sm", "li", "ad", "mt", "sg", "bh", "mv", "bb", "ag", "dm", "gd", "kn", "lc", "vc", "st", "nr", "tv", "pw", "hk", "mo"].includes(regId);
        const isSmallCountry = ["lu", "bn", "kw", "qa", "cy", "jm", "bs", "tt", "cv", "km", "mu", "sc", "ws", "to", "ki", "mh", "fm"].includes(regId);

        let targetZoom = 3;
        if (regId.startsWith("geo-")) {
          targetZoom = 13;
        } else if (isWorld) {
          if (regId === "va" || regId === "mc") {
            targetZoom = 13;
          } else if (isMicrostate) {
            targetZoom = 10;
          } else if (isSmallCountry) {
            targetZoom = 7.5;
          } else {
            targetZoom = 3.5;
          }
        } else if (isChina) {
          targetZoom = 5;
        } else if (isUsa) {
          targetZoom = 5;
        } else if (isGermany) {
          targetZoom = 6.5;
        } else if (isItaly) {
          targetZoom = 6.5;
        } else if (isUk) {
          targetZoom = 7.5;
        } else if (isSpain) {
          if (["es_ceuta", "es_melilla"].includes(regId)) {
            targetZoom = 11;
          } else if (["es_canarias", "es_baleares"].includes(regId)) {
            targetZoom = 7.5;
          } else {
            targetZoom = 6.5;
          }
        } else if (isFrance) {
          // Overseas territories need tailored zoom, mainland France is 6.5
          if (["fr_gua", "fr_mq", "fr_yt", "fr_reu"].includes(regId)) {
            targetZoom = 9;
          } else if (regId === "fr_gf") {
            targetZoom = 6.5;
          } else {
            targetZoom = 6.5;
          }
        } else if (isVietnam) {
          targetZoom = 7;
        } else if (isJapan) {
          targetZoom = 6.5;
        } else {
          targetZoom = 8;
        }

        const currentZoom = mapRef.current.getZoom();
        if (currentZoom < targetZoom || Math.abs(currentZoom - targetZoom) > 1) {
          mapRef.current.setView([activeRegion.lat, activeRegion.lng], targetZoom, {
            animate: true,
          });
        } else {
          mapRef.current.panTo([activeRegion.lat, activeRegion.lng], {
            animate: true,
            duration: 0.6,
          });
        }
      } else if (regions && regions.length > 0) {
        try {
          const validCoords = regions
            .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
            .map((r) => [r.lat, r.lng] as [number, number]);
          if (validCoords.length > 0) {
            const bounds = L.latLngBounds(validCoords);
            if (bounds.isValid()) {
              mapRef.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 8 });
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [activeRegion, visitedRegions, regions, showSimple]);

  // Helper functions for GeoJSON feature identification and styling
  const getFeatureRegionId = (feature: any) => {
    if (!feature || !feature.properties) return "";
    const props = feature.properties;
    const rawId = [
      props.region_id,
      props.id,
      props.ID,
      props.code,
      props.adcode,
      props["ISO3166-1-Alpha-2"],
      props.ISO_A2,
      props.ISO_A2_EH,
      props.POSTAL,
      props.WB_A2,
      props.iso_a2,
      props.ADM0_A3,
      props.iso_a3,
      feature.id,
    ].find((v) => v && String(v).trim() !== "" && String(v).trim() !== "-99" && String(v).trim() !== "-9");

    return rawId ? String(rawId).toLowerCase().trim() : "";
  };

  // Helper to determine the precise effective region level
  const getEffectiveLevel = (
    rawLevel?: string,
    activeReg?: Region | null,
    regList?: Region[]
  ): string => {
    // 1. If explicit rawLevel is passed (e.g. "sigungu", "sido", "japan", "usa", "china", "vietnam", "world"), prioritize it
    if (rawLevel && (rawLevel as string) !== "korea") {
      return rawLevel;
    }
    // 2. Otherwise check activeRegion or item level from regList
    const itemLevel = activeReg?.level || regList?.[0]?.level;
    if (itemLevel && (itemLevel as string) !== "korea") {
      return itemLevel;
    }
    if (itemLevel === "sigungu" || regList?.some((r) => r.level === "sigungu")) {
      return "sigungu";
    }
    return "sido";
  };

  const getRegionForFeature = (feature: any, currentLevel: string): Region | undefined => {
    if (!feature || !feature.properties) return undefined;
    const props = feature.properties;

    // Direct ID lookup in ALL_REGIONS first (e.g. jp_hokkaido, us_california, china_beijing, vn_hanoi, etc.)
    const directId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
    if (directId) {
      const directMatch = ALL_REGIONS.find((r) => r.id.toLowerCase() === directId);
      if (directMatch) return directMatch;
    }

    const isJapanMode = currentLevel === "japan" || String(props.id || "").startsWith("jp_") || Boolean(props.nam_ja);
    const isUsaMode = currentLevel === "usa" || String(props.id || "").startsWith("us_");
    const isChinaMode = currentLevel === "china" || Boolean(props.adcode) || (props.parent && props.parent.adcode === 100000);
    const isVietnamMode = currentLevel === "vietnam" || String(props.id || "").startsWith("vn_") || String(props.iso_3166_2 || "").startsWith("VN-");
    const isGermanyMode = currentLevel === "germany" || String(props.id || "").startsWith("de_") || String(props.iso_3166_2 || "").startsWith("DE-");
    const isFranceMode = currentLevel === "france" || String(props.id || "").startsWith("fr_") || String(props.iso_3166_2 || "").startsWith("FR-");
    const isItalyMode = currentLevel === "italy" || String(props.id || "").startsWith("it_") || String(props.iso_3166_2 || "").startsWith("IT-");
    const isSpainMode = currentLevel === "spain" || String(props.id || "").startsWith("es_") || Boolean(props.cod_ccaa);
    const isUkMode = currentLevel === "uk" || String(props.id || "").startsWith("uk_") || String(props.region_id || "").startsWith("uk_") || Boolean(props.CTYUA23CD);
    const isWorldMode = currentLevel === "world" || Boolean(props.ADM0_A3 || props["ISO3166-1-Alpha-2"] || props.ISO_A2);

    if (isUkMode) {
      const pool = UK_LIST;
      const pId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
      if (pId) {
        const foundById = pool.find((r) => r.id.toLowerCase() === pId || r.id.toLowerCase() === `uk_${pId.replace("uk-", "").replace("uk_", "")}`);
        if (foundById) return foundById;
      }
      const pNam = String(props.name || props.NAME || props.name_en || props.name_kr || props.CTYUA23NM || "").toLowerCase().trim();
      if (pNam) {
        const cleanPNam = pNam.replace(/[\s.,'\-]+/g, "");
        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().replace(/[\s.,'\-]+/g, "");
          const kr = r.name_kr.toLowerCase().trim();
          return cleanPNam === en || cleanPNam === kr || cleanPNam.includes(en) || en.includes(cleanPNam) || cleanPNam.includes(kr);
        });
        if (found) return found;
      }
    }

    if (isSpainMode) {
      const pool = SPAIN_LIST;
      const pId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
      if (pId) {
        const foundById = pool.find((r) => r.id.toLowerCase() === pId || r.id.toLowerCase() === `es_${pId.replace("es-", "").replace("es_", "")}`);
        if (foundById) return foundById;
      }
      const cod = String(props.cod_ccaa || "").trim();
      if (cod) {
        const codToId: Record<string, string> = {
          "01": "es_andalucia", "02": "es_aragon", "03": "es_asturias", "04": "es_baleares",
          "05": "es_canarias", "06": "es_cantabria", "07": "es_castillayleon", "08": "es_castillalamancha",
          "09": "es_catalunya", "10": "es_valencia", "11": "es_extremadura", "12": "es_galicia",
          "13": "es_madrid", "14": "es_murcia", "15": "es_navarra", "16": "es_paisvasco",
          "17": "es_larioha", "18": "es_ceuta", "19": "es_melilla"
        };
        const mappedId = codToId[cod];
        if (mappedId) {
          const found = pool.find((r) => r.id === mappedId);
          if (found) return found;
        }
      }
      const pNam = String(props.name || props.NAME || props.noml_ccaa || props.name_es || props.name_en || props.name_kr || "").toLowerCase().trim();
      if (pNam) {
        const cleanPNam = pNam.replace(/[\s.,'\-]+/g, "");
        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().replace(/[\s.,'\-]+/g, "");
          const es = (r.name_es || "").toLowerCase().replace(/[\s.,'\-]+/g, "");
          const kr = r.name_kr.toLowerCase().trim();
          return cleanPNam === en || cleanPNam === es || cleanPNam === kr || cleanPNam.includes(en) || cleanPNam.includes(es) || en.includes(cleanPNam) || es.includes(cleanPNam) || cleanPNam.includes(kr);
        });
        if (found) return found;
      }
    }

    if (isItalyMode) {
      const pool = ITALY_LIST;
      const pId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
      if (pId) {
        const foundById = pool.find((r) => r.id.toLowerCase() === pId || r.id.toLowerCase() === `it_${pId.replace("it-", "").replace("it_", "")}`);
        if (foundById) return foundById;
      }
      const iso = String(props.iso_3166_2 || props.code || "").toUpperCase().trim();
      if (iso) {
        const mapped = pool.find((r) => r.id.toLowerCase() === `it_${iso.replace("IT-", "").toLowerCase()}`);
        if (mapped) return mapped;
      }
      const pNam = String(props.name || props.NAME || props.name_it || props.name_en || props.name_kr || "").toLowerCase().trim();
      if (pNam) {
        const cleanPNam = pNam.replace(/[\s.,'\-]+/g, "");
        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().replace(/[\s.,'\-]+/g, "");
          const kr = r.name_kr.toLowerCase().trim();
          const it = (r.name_it || "").toLowerCase().replace(/[\s.,'\-]+/g, "");
          return cleanPNam === en || cleanPNam === it || cleanPNam === kr || cleanPNam.includes(en) || en.includes(cleanPNam) || cleanPNam.includes(kr);
        });
        if (found) return found;
      }
    }

    if (isFranceMode) {
      const pool = FRANCE_LIST;
      const pId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
      if (pId) {
        const foundById = pool.find((r) => r.id.toLowerCase() === pId || r.id.toLowerCase() === `fr_${pId.replace("fr-", "").replace("fr_", "")}`);
        if (foundById) return foundById;
      }
      const iso = String(props.iso_3166_2 || props.code || "").toUpperCase().trim();
      if (iso) {
        const mapped = pool.find((r) => r.id.toLowerCase() === `fr_${iso.replace("FR-", "").toLowerCase()}`);
        if (mapped) return mapped;
      }
      const pNam = String(props.name || props.NAME || props.nom || props.name_fr || props.name_en || props.name_kr || "").toLowerCase().trim();
      if (pNam) {
        const cleanPNam = pNam.replace(/[\s.,'\-]+/g, "");
        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().replace(/[\s.,'\-]+/g, "");
          const kr = r.name_kr.toLowerCase().trim();
          return cleanPNam === en || cleanPNam === kr || cleanPNam.includes(en) || en.includes(cleanPNam) || cleanPNam.includes(kr);
        });
        if (found) return found;
      }
    }

    if (isGermanyMode) {
      const pool = GERMANY_LIST;
      const pId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
      if (pId) {
        const foundById = pool.find((r) => r.id.toLowerCase() === pId || r.id.toLowerCase() === `de_${pId.replace("de-", "").replace("de_", "")}`);
        if (foundById) return foundById;
      }
      const iso = String(props.iso_3166_2 || "").toUpperCase().trim();
      if (iso) {
        const mapped = pool.find((r) => r.id.toLowerCase() === `de_${iso.replace("DE-", "").toLowerCase()}`);
        if (mapped) return mapped;
      }
      const pNam = String(props.name || props.NAME || props.name_de || props.name_en || props.name_kr || "").toLowerCase().trim();
      if (pNam) {
        const cleanPNam = pNam.replace(/[\s.,'\-]+/g, "");
        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().replace(/[\s.,'\-]+/g, "");
          const kr = r.name_kr.toLowerCase().trim();
          return cleanPNam === en || cleanPNam === kr || cleanPNam.includes(en) || en.includes(cleanPNam) || cleanPNam.includes(kr);
        });
        if (found) return found;
      }
    }

    if (isChinaMode) {
      const pool = CHINA_LIST;
      const mapID: Record<string, string> = {
        '110000': 'china_beijing', '120000': 'china_tianjin', '310000': 'china_shanghai', '500000': 'china_chongqing',
        '130000': 'china_hebei', '140000': 'china_shanxi', '150000': 'china_inner_mongolia', '210000': 'china_liaoning',
        '220000': 'china_jilin', '230000': 'china_heilongjiang', '320000': 'china_jiangsu', '330000': 'china_zhejiang',
        '340000': 'china_anhui', '350000': 'china_fujian', '360000': 'china_jiangxi', '370000': 'china_shandong',
        '410000': 'china_henan', '420000': 'china_hubei', '430000': 'china_hunan', '440000': 'china_guangdong',
        '450000': 'china_guangxi', '460000': 'china_hainan', '510000': 'china_sichuan', '520000': 'china_guizhou',
        '530000': 'china_yunnan', '540000': 'china_tibet', '610000': 'china_shaanxi', '620000': 'china_gansu',
        '630000': 'china_qinghai', '640000': 'china_ningxia', '650000': 'china_xinjiang', '810000': 'china_hongkong',
        '820000': 'china_macau', '710000': 'china_taiwan'
      };
      const pId = String(props.adcode || props.id || "").trim();
      const targetId = mapID[pId];
      if (targetId) {
        const found = pool.find((r) => r.id === targetId);
        if (found) return found;
      }
      const pNam = String(props.name || props.NAME || "").trim();
      if (pNam) {
        const foundText = pool.find((r) => {
          const en = r.name_en.toLowerCase();
          const kr = r.name_kr;
          return pNam.includes(kr) || kr.includes(pNam) || pNam.toLowerCase().includes(en);
        });
        if (foundText) return foundText;
      }
    }

    if (isVietnamMode) {
      const pool = VIETNAM_LIST;
      const pId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
      if (pId) {
        const foundById = pool.find((r) => r.id.toLowerCase() === pId);
        if (foundById) return foundById;
      }
      const pNam = String(props.name || props.NAME || props.NAME_LONG || props.nam || props.name_kr || "").toLowerCase().trim();
      if (pNam) {
        const cleanPNam = pNam.replace(/[\s.,'\-]+/g, "");
        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().replace(/[\s.,'\-]+/g, "");
          const kr = r.name_kr.toLowerCase().trim();
          return cleanPNam === en || cleanPNam === kr || cleanPNam.includes(en) || en.includes(cleanPNam) || cleanPNam.includes(kr);
        });
        if (found) return found;
      }
    }

    if (isJapanMode) {
      const pool = JAPAN_LIST;
      const pId = String(props.id || props.region_id || props.ID || feature.id || "").toLowerCase().trim();
      if (pId) {
        const foundById = pool.find((r) => r.id.toLowerCase() === pId);
        if (foundById) return foundById;
      }
      const pNam = String(props.nam || props.name || props.NAME || props.NAME_LONG || "").toLowerCase().trim();
      const pJa = String(props.nam_ja || props.name_ja || "").trim();

      const found = pool.find((r) => {
        const en = r.name_en.toLowerCase().trim();
        const kr = r.name_kr.toLowerCase().trim();
        if (pNam && (pNam === en || pNam.replace(/\s+/g, "") === en || pNam.includes(en) || en.includes(pNam))) return true;
        if (pJa && (pJa === kr || pJa.includes(kr) || kr.includes(pJa))) return true;
        return false;
      });
      if (found) return found;
    }

    if (isUsaMode) {
      const pool = USA_LIST;
      const stateId = String(props.id || props.region_id || props.postal || props.POSTAL || "").toLowerCase().trim();
      if (stateId) {
        const found = pool.find((r) => r.id.toLowerCase() === stateId || r.id.toLowerCase() === `us_${stateId}`);
        if (found) return found;
      }

      const stateName = String(props.name || props.NAME || props.state_name || props.STATE_NAME || "").toLowerCase().trim();
      if (stateName) {
        if (stateName === "district of columbia" || stateName === "dc") {
          return pool.find((r) => r.id === "us_washington_dc");
        }
        if (stateName === "washington") {
          return pool.find((r) => r.id === "us_washington");
        }

        const exact = pool.find((r) => {
          const en = r.name_en.toLowerCase().trim();
          const kr = r.name_kr.toLowerCase().trim();
          return en === stateName || kr === stateName || r.id.toLowerCase() === stateName || r.id.replace("us_", "").replace(/_/g, " ") === stateName;
        });
        if (exact) return exact;

        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().trim();
          return stateName.includes(en) || en.includes(stateName);
        });
        if (found) return found;
      }
    }

    if (isWorldMode) {
      const pool = WORLD_COUNTRIES;

      const rawIso2Candidates = [
        props.region_id,
        props["ISO3166-1-Alpha-2"],
        props.ISO_A2,
        props.ISO_A2_EH,
        props.POSTAL,
        props.WB_A2,
        props.iso_a2,
        feature.id,
      ]
        .filter((v) => v && String(v).trim() !== "" && String(v).trim() !== "-99" && String(v).trim() !== "-9")
        .map((v) => String(v).toLowerCase().trim());

      for (const code of rawIso2Candidates) {
        if (code === "gl") {
          const foundDk = pool.find((r) => r.id.toLowerCase() === "dk");
          if (foundDk) return foundDk;
        }
        if (code === "na" || code === "nam") {
          const foundNam = pool.find((r) => r.id.toLowerCase() === "nam");
          if (foundNam) return foundNam;
        }
        if (code.length === 2) {
          const found = pool.find((r) => r.id.toLowerCase() === code);
          if (found) return found;
        }
      }

      const rawIso3Candidates = [
        props["ISO3166-1-Alpha-3"],
        props.ADM0_A3,
        props.ISO_A3,
        props.ISO_A3_EH,
        props.WB_A3,
        props.iso_a3,
      ]
        .filter((v) => v && String(v).trim() !== "" && String(v).trim() !== "-99" && String(v).trim() !== "-9")
        .map((v) => String(v).toLowerCase().trim());

      const iso3Map: Record<string, string> = {
        grl: "dk", dnk: "dk", aut: "at", swe: "se", usa: "us", kor: "kr", jpn: "jp", chn: "cn",
        twn: "tw", mng: "mn", vnm: "vn", tha: "th", sgp: "sg", mys: "my", idn: "id", phl: "ph",
        lao: "la", khm: "kh", mmr: "mm", brn: "bn", tls: "tl", ind: "in", pak: "pk", bgd: "bd",
        lka: "lk", npl: "np", btn: "bt", mdv: "mv", kaz: "kz", uzb: "uz", tkm: "tm", tjk: "tj",
        kgz: "kg", afg: "af", irn: "ir", irq: "iq", sau: "sa", are: "ae", qat: "qa", kwt: "kw",
        bhr: "bh", omn: "om", yem: "ye", jor: "jo", lbn: "lb", isr: "il", pse: "ps", syr: "sy",
        tur: "tr", geo: "ge", arm: "am", aze: "az", cyp: "cy", gbr: "gb", fra: "fr", deu: "de",
        ita: "it", esp: "es", prt: "pt", nld: "nl", bel: "be", lux: "lu", che: "ch", irl: "ie",
        nor: "no", fin: "fi", isl: "is", pol: "pl", cze: "cz", svk: "sk", hun: "hu", rou: "ro",
        bgr: "bg", grc: "gr", hrv: "hr", svn: "si", bih: "ba", srb: "rs", mne: "me", mkd: "mk",
        alb: "al", ukr: "ua", blr: "by", mda: "md", ltu: "lt", lva: "lv", est: "ee", rus: "ru",
        mlt: "mt", and: "ad", mco: "mc", smr: "sm", vat: "va", lie: "li", xkx: "xk", can: "ca",
        mex: "mx", bra: "br", arg: "ar", chl: "cl", col: "co", per: "pe", ven: "ve", ecu: "ec",
        bol: "bo", pry: "py", ury: "uy", guy: "gy", sur: "sr", gtm: "gt", blz: "bz", slv: "sv",
        hnd: "hn", nic: "ni", cri: "cr", pan: "pa", cub: "cu", jam: "jm", hti: "ht", dom: "do",
        bhs: "bs", tto: "tt", brb: "bb", atg: "ag", dma: "dm", grd: "gd", kna: "kn", lca: "lc",
        vct: "vc", egy: "eg", zaf: "za", nga: "ng", ken: "ke", mar: "ma", dza: "dz", tun: "tn",
        eth: "et", gha: "gh", tza: "tz", uga: "ug", rwa: "rw", bdi: "bi", cod: "cd", cog: "cg",
        ago: "ao", zmb: "zm", zwe: "zw", moz: "mz", mdg: "mg", sen: "sn", mli: "ml", civ: "ci",
        cmr: "cm", sdn: "sd", ssd: "ss", lby: "ly", bwa: "bw", nam: "nam", som: "so", tcd: "td",
        ner: "ne", bfa: "bf", ben: "bj", tgo: "tg", lbr: "lr", sle: "sl", gin: "gn", gnb: "gw",
        gmb: "gm", mrt: "mr", eri: "er", dji: "dj", caf: "cf", gab: "ga", gnq: "gq", stp: "st",
        com: "km", mus: "mu", syc: "sc", cpv: "cv", lso: "ls", swz: "sz", mwi: "mw", aus: "au",
        nzl: "nz", fji: "fj", png: "pg", slb: "sb", vut: "vu", wsm: "ws", ton: "to", tuv: "tv",
        kir: "ki", nru: "nr", mhl: "mh", fsm: "fm", plw: "pw"
      };

      for (const iso3 of rawIso3Candidates) {
        const mappedIso2 = iso3Map[iso3];
        if (mappedIso2) {
          const foundByIso3 = pool.find((r) => r.id.toLowerCase() === mappedIso2);
          if (foundByIso3) return foundByIso3;
        }
      }

      const propNames = [
        props.NAME_KO,
        props.name,
        props.NAME,
        props.NAME_LONG,
        props.ADMIN,
        props.admin,
        props.BRK_NAME,
        props.FORMAL_EN,
        props.GEOUNIT,
        props.SOVEREIGNT,
      ]
        .filter(Boolean)
        .map((s) => String(s).toLowerCase().trim());

      if (propNames.length > 0) {
        const foundByName = pool.find((r) => {
          const rNameEn = r.name_en.toLowerCase().trim();
          const rNameKr = r.name_kr.toLowerCase().trim();
          return propNames.some(
            (pName) =>
              pName === rNameEn ||
              pName === rNameKr ||
              pName.includes(rNameEn) ||
              rNameEn.includes(pName)
          );
        });
        if (foundByName) return foundByName;
      }

      return undefined;
    }

    if (currentLevel === "sido" || currentLevel === "korea") {
      const pool = SIDO_LIST;
      const directId = String(props.region_id || props.id || props.code || "").trim();
      if (directId) {
        const found = pool.find((r) => r.id.toLowerCase() === directId.toLowerCase());
        if (found) return found;
      }

      const name = String(props.name || props.NAME || "").trim();

      if (name.includes("충청남도") || name.includes("충남")) return pool.find((r) => r.id === "chungnam");
      if (name.includes("충청북도") || name.includes("충북")) return pool.find((r) => r.id === "chungbuk");
      if (name.includes("전라북도") || name.includes("전북")) return pool.find((r) => r.id === "jeonbuk");
      if (name.includes("전라남도") || name.includes("전남")) return pool.find((r) => r.id === "jeonnam" || r.id === "jeonnam_gwangju");
      if (name.includes("경상북도") || name.includes("경북")) return pool.find((r) => r.id === "gyeongbuk");
      if (name.includes("경상남도") || name.includes("경남")) return pool.find((r) => r.id === "gyeongnam");
      if (name.includes("서울특별시") || name.includes("서울")) return pool.find((r) => r.id === "seoul");
      if (name.includes("부산")) return pool.find((r) => r.id === "busan");
      if (name.includes("대구")) return pool.find((r) => r.id === "daegu");
      if (name.includes("인천")) return pool.find((r) => r.id === "incheon");
      if (name.includes("광주")) return pool.find((r) => r.id === "gwangju" || r.id === "jeonnam_gwangju");
      if (name.includes("대전")) return pool.find((r) => r.id === "daejeon");
      if (name.includes("울산")) return pool.find((r) => r.id === "ulsan");
      if (name.includes("세종")) return pool.find((r) => r.id === "sejong");
      if (name.includes("경기")) return pool.find((r) => r.id === "gyeonggi");
      if (name.includes("강원")) return pool.find((r) => r.id === "gangwon" || r.id === "gangwon_special");
      if (name.includes("제주")) return pool.find((r) => r.id === "jeju");
    }

    if (currentLevel === "sigungu" || currentLevel === "korea") {
      const rawRegionId = String(props.region_id || props.id || "").toLowerCase().trim();
      if (rawRegionId) {
        const foundById = SIGUNGU_LIST.find((r) => r.id.toLowerCase() === rawRegionId);
        if (foundById) return foundById;
      }

      const prefixMap: Record<string, string> = {
        '11': 'seoul', '21': 'busan', '22': 'daegu', '23': 'incheon', '24': 'gwangju',
        '25': 'daejeon', '26': 'ulsan', '29': 'sejong', '31': 'gyeonggi', '32': 'gangwon',
        '33': 'chungbuk', '34': 'chungnam', '35': 'jeonbuk', '36': 'jeonnam', '37': 'gyeongbuk',
        '38': 'gyeongnam', '39': 'jeju'
      };
      const code = String(props.code || "");
      const name = String(props.name || props.NAME || "").trim();

      const prefix = code.slice(0, 2);
      const cityPrefix = prefixMap[prefix];

      if (cityPrefix) {
        let nameKey = name;
        if (name === "중구") nameKey = "jung";
        else if (name === "서구") nameKey = "seo";
        else if (name === "동구") nameKey = "dong";
        else if (name === "남구") nameKey = cityPrefix === "incheon" ? "michuhol" : "nam";
        else if (name === "북구") nameKey = "buk";
        else if (name === "강서구" && cityPrefix === "busan") nameKey = "gangseo";
        else if (name === "미추홀구") nameKey = "michuhol";
        else if (name === "고성군") nameKey = cityPrefix === "gyeongnam" ? "goseong" : "goseong";
        else if (name === "군위군") nameKey = "gunwi";

        const constructedId = `${cityPrefix}_${nameKey}`;
        const foundByConstructed = SIGUNGU_LIST.find((r) => r.id.toLowerCase() === constructedId.toLowerCase());
        if (foundByConstructed) return foundByConstructed;
      }

      if (name) {
        const foundByName = SIGUNGU_LIST.find((r) => r.name_kr === name || r.name_kr.includes(name) || name.includes(r.name_kr));
        if (foundByName) return foundByName;
      }
    }

    return undefined;
  };

  const getFeatureStyle = (feature: any, currentLevel: string, visitedIds: Set<string>, activeId?: string) => {
    const reg = getRegionForFeature(feature, currentLevel);
    const regId = reg ? reg.id.toLowerCase() : getFeatureRegionId(feature);

    const isVisited = regId ? visitedIds.has(regId) : false;
    const isActive = regId ? activeId === regId : false;

    const isWorldMode = currentLevel === "world";
    const modeVisitedColor = getModeVisitedColor(currentLevel);

    if (isActive) {
      if (isWorldMode && activeWorldFillMode === "flag" && regId) {
        ensureFlagPattern(mapRef.current, regId);
        return {
          fillColor: `url(#flag-pattern-${regId.toLowerCase()})`,
          fillOpacity: 1.0,
          color: "#f59e0b",
          weight: 3.5,
        };
      }
      return {
        fillColor: modeVisitedColor,
        fillOpacity: 0.95,
        color: currentLevel === "spain" ? "#991b1b" : currentLevel === "italy" ? "#065f46" : currentLevel === "france" ? "#1e3a8a" : currentLevel === "germany" ? "#854d0e" : currentLevel === "vietnam" ? "#ffffff" : currentLevel === "japan" ? "#881337" : currentLevel === "usa" ? "#1e3a8a" : currentLevel === "china" ? "#78350f" : "#0f172a",
        weight: 3,
      };
    } else if (isVisited) {
      if (isWorldMode && activeWorldFillMode === "flag" && regId) {
        ensureFlagPattern(mapRef.current, regId);
        return {
          fillColor: `url(#flag-pattern-${regId.toLowerCase()})`,
          fillOpacity: 0.95,
          color: "#334155",
          weight: 1.5,
        };
      }
      return {
        fillColor: modeVisitedColor,
        fillOpacity: 0.85,
        color: modeVisitedColor,
        weight: 1.8,
      };
    } else {
      if (activeMapStyle === "satellite") {
        return {
          fillColor: "#000000",
          fillOpacity: 0.15,
          color: "#38bdf8",
          weight: 1.5,
        };
      }
      if (currentLevel === "spain") {
        return {
          fillColor: "#ffffff",
          fillOpacity: 0.65,
          color: "#fca5a5",
          weight: 1.2,
        };
      }
      if (currentLevel === "italy") {
        return {
          fillColor: "#ffffff",
          fillOpacity: 0.65,
          color: "#a7f3d0",
          weight: 1.2,
        };
      }
      if (currentLevel === "france") {
        return {
          fillColor: "#ffffff",
          fillOpacity: 0.65,
          color: "#93c5fd",
          weight: 1.2,
        };
      }
      if (currentLevel === "germany") {
        return {
          fillColor: "#ffffff",
          fillOpacity: 0.65,
          color: "#fde047",
          weight: 1.2,
        };
      }
      if (currentLevel === "vietnam") {
        return {
          fillColor: "#ffffff",
          fillOpacity: 0.65,
          color: "#fca5a5",
          weight: 1.2,
        };
      }
      if (currentLevel === "uk") {
        return {
          fillColor: "#ffffff",
          fillOpacity: 0.65,
          color: "#a5b4fc",
          weight: 1.2,
        };
      }
      return {
        fillColor: "#ffffff",
        fillOpacity: 0.65,
        color: "#cbd5e1",
        weight: 1,
      };
    }
  };

  // Function to apply styles to cached GeoJSON layer
  const applyGeoJsonStyle = () => {
    if (!geoJsonLayerRef.current) return;
    const currentLevel = getEffectiveLevel(regionLevel, activeRegion, regions);
    const visitedIds = new Set(
      visitedRegions
        .filter(Boolean)
        .map((r) => r.id?.toLowerCase())
        .filter((id): id is string => Boolean(id))
    );
    const activeId = activeRegion?.id?.toLowerCase();

    if (activeWorldFillMode === "flag" && currentLevel === "world" && mapRef.current) {
      WORLD_COUNTRIES.forEach((c) => ensureFlagPattern(mapRef.current, c.id));
      visitedRegions.forEach((r) => ensureFlagPattern(mapRef.current, r.id));
      if (activeRegion) ensureFlagPattern(mapRef.current, activeRegion.id);
    }

    geoJsonLayerRef.current.setStyle((feature: any) =>
      getFeatureStyle(feature, currentLevel, visitedIds, activeId)
    );
  };

  // 3-A. Load and instantiate GeoJSON Layer Group ONCE per region level
  useEffect(() => {
    const geojsonGroup = layersRef.current.geojson;
    if (!geojsonGroup) return;

    const currentLevel = getEffectiveLevel(regionLevel, activeRegion, regions);

    if (loadedLevelRef.current !== currentLevel || !geoJsonLayerRef.current) {
      loadedLevelRef.current = currentLevel;
      prevVehiclePosRef.current = null;
      geojsonGroup.clearLayers();
      geoJsonLayerRef.current = null;

      const jsonUrl =
        currentLevel === "sido"
          ? "/geojson/provinces.json"
          : currentLevel === "sigungu"
          ? "/geojson/municipalities.json"
          : currentLevel === "japan"
          ? "/geojson/japan-prefectures.json"
          : currentLevel === "usa"
          ? "/geojson/us-states.json"
          : currentLevel === "china"
          ? "/geojson/china-provinces.json"
          : currentLevel === "vietnam"
          ? "/geojson/vietnam-provinces.json"
          : currentLevel === "germany"
          ? "/geojson/germany-states.json"
          : currentLevel === "france"
          ? "/geojson/france-states.json"
          : currentLevel === "italy"
          ? "/geojson/italy-regions.json"
          : currentLevel === "spain"
          ? "/geojson/spain-regions.json"
          : currentLevel === "uk"
          ? "/geojson/uk-regions.json"
          : "/geojson/world.json";

      fetch(jsonUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          geoJsonDataRef.current = data;
          let cleanData = data;

          if (data.UTF8Encoding) {
            try {
              cleanData = JSON.parse(JSON.stringify(data));
              const decodeCoordinate = (coordinate: string, encodeOffsets: [number, number]) => {
                const result = [];
                let prevX = encodeOffsets[0];
                let prevY = encodeOffsets[1];
                for (let i = 0; i < coordinate.length; i += 2) {
                  let x = coordinate.charCodeAt(i) - 64;
                  let y = coordinate.charCodeAt(i + 1) - 64;
                  x = (x >> 1) ^ (-(x & 1));
                  y = (y >> 1) ^ (-(y & 1));
                  x = prevX + x;
                  y = prevY + y;
                  prevX = x;
                  prevY = y;
                  result.push([x / 1024, y / 1024]);
                }
                return result;
              };

              cleanData.features.forEach((feature: any) => {
                if (!feature.geometry) return;
                const { type, coordinates, encodeOffsets } = feature.geometry;
                if (!coordinates || !encodeOffsets) return;
                if (type === "Polygon") {
                  feature.geometry.coordinates = coordinates.map((ring: any, i: number) =>
                    typeof ring === "string" ? decodeCoordinate(ring, encodeOffsets[i]) : ring
                  );
                } else if (type === "MultiPolygon") {
                  feature.geometry.coordinates = coordinates.map((polygon: any, i: number) =>
                    polygon.map((ring: any, j: number) =>
                      typeof ring === "string" ? decodeCoordinate(ring, encodeOffsets[i][j]) : ring
                    )
                  );
                }
              });
              delete cleanData.UTF8Encoding;
            } catch (e) {
              console.error("GeoJSON decoding error:", e);
            }
          }

          const visitedIds = new Set(visitedRegions.map((r) => r.id.toLowerCase()));
          const activeId = activeRegion?.id?.toLowerCase();

          const layer = L.geoJSON(cleanData, {
            filter: (feature) => {
              const geom = feature?.geometry as any;
              return Boolean(
                feature &&
                geom &&
                geom.type &&
                geom.coordinates &&
                Array.isArray(geom.coordinates) &&
                geom.coordinates.length > 0
              );
            },
            style: (feature) => getFeatureStyle(feature, currentLevel, visitedIds, activeId),
            onEachFeature: (feature, l) => {
              const reg = getRegionForFeature(feature, currentLevel);
              if (reg && !isQuizMode) {
                l.on("mouseover", () => setHoveredRegion(reg));
                l.on("mouseout", () => setHoveredRegion(null));
              }
            },
          }).addTo(geojsonGroup);

          geoJsonLayerRef.current = layer;
          applyGeoJsonStyle();
        })
        .catch((err) => console.error("Failed to load GeoJSON:", err));
    }
  }, [regionLevel, regions, activeRegion?.id, activeRegion?.level]);

  // 3-B. Instantly update GeoJSON polygon colors via setStyle when visited or active region changes
  useEffect(() => {
    applyGeoJsonStyle();
  }, [visitedRegions, activeRegion, isQuizMode, modeColors, worldFillMode]);

  // 3-C. Render stations, connection tracks, and active train avatar marker
  useEffect(() => {
    const map = mapRef.current;
    const markersGroup = layersRef.current.markers;
    const polylinesGroup = layersRef.current.polylines;

    if (!map || !markersGroup || !polylinesGroup) return;

    // Clear previous drawings for markers & tracks
    markersGroup.clearLayers();
    polylinesGroup.clearLayers();

    const currentLevel = getEffectiveLevel(regionLevel, activeRegion, regions);

    const isJapanMode = currentLevel === "japan";
    const isUsaMode = currentLevel === "usa";
    const isChinaMode = currentLevel === "china";
    const isVietnamMode = currentLevel === "vietnam";
    const isGermanyMode = currentLevel === "germany";
    const isFranceMode = currentLevel === "france";
    const isItalyMode = currentLevel === "italy";
    const isSpainMode = currentLevel === "spain";
    const isUkMode = currentLevel === "uk";
    const isWorldMode = currentLevel === "world";

    // -- B. Draw Rail Track Lines --
    const drawnPairs = new Set<string>();

    // 1) Visited Paths (Clean thin line for traveled path)
    const visitedCoords: L.LatLngExpression[] = visitedRegions
      .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
      .map((r) => [r.lat, r.lng]);

    if (visitedCoords.length > 1) {
      // Single clean thin line: Visited mode color
      const polylineColor = isVietnamMode ? "#facc15" : getModeVisitedColor(currentLevel);
      L.polyline(visitedCoords, {
        color: polylineColor,
        weight: isVietnamMode ? 3.5 : 2.5,
        lineCap: "round",
        lineJoin: "round",
        opacity: 0.9,
      }).addTo(polylinesGroup);

      // Add to drawn set to avoid duplicate connection lines
      for (let i = 0; i < courseHistory.length - 1; i++) {
        drawnPairs.add(`${courseHistory[i]}-${courseHistory[i + 1]}`);
        drawnPairs.add(`${courseHistory[i + 1]}-${courseHistory[i]}`);
      }
    }

    // 2) Unvisited general connection lines (thin slate line)
    regions.forEach((reg) => {
      if (reg && typeof reg.lat === "number" && typeof reg.lng === "number" && !isNaN(reg.lat) && !isNaN(reg.lng) && reg.neighbors) {
        reg.neighbors.forEach((neighId) => {
          const neighReg = regions.find((r) => r.id === neighId);
          if (neighReg && typeof neighReg.lat === "number" && typeof neighReg.lng === "number" && !isNaN(neighReg.lat) && !isNaN(neighReg.lng)) {
            const key = `${reg.id}-${neighId}`;
            const revKey = `${neighId}-${reg.id}`;

            if (!drawnPairs.has(key) && !drawnPairs.has(revKey)) {
              drawnPairs.add(key);
              L.polyline([[reg.lat, reg.lng], [neighReg.lat, neighReg.lng]], {
                color: "rgba(100, 116, 139, 0.25)",
                weight: 1.5,
              }).addTo(polylinesGroup);
            }
          }
        });
      }
    });

    // -- B. Draw Region Node Points --
    regions.forEach((reg) => {
      if (!reg || typeof reg.lat !== "number" || typeof reg.lng !== "number" || isNaN(reg.lat) || isNaN(reg.lng)) return;

      const isVisited = visitedRegions.some((vr) => vr.id === reg.id);
      const isActive = activeRegion?.id === reg.id;
      const isNext = upcomingRegions?.[0]?.id === reg.id;

      let fillColor = "rgba(15, 23, 42, 0.85)";
      let color = "rgba(148, 163, 184, 0.6)";
      let radius = 6;
      let weight = 1;

      if (isActive) {
        fillColor = isJapanMode ? "#e11d48" : isUsaMode ? "#2563eb" : isChinaMode ? "#f59e0b" : isVietnamMode ? "#dc2626" : isWorldMode ? "#1e293b" : "#f59e0b";
        color = isVietnamMode ? "#facc15" : "#ffffff";
        radius = isVietnamMode ? 8.5 : 8;
        weight = isVietnamMode ? 3 : 2;
      } else if (isVisited) {
        fillColor = isVietnamMode ? "#facc15" : getModeVisitedColor(currentLevel);
        color = isVietnamMode ? "#dc2626" : "rgba(255, 255, 255, 0.6)";
        radius = isVietnamMode ? 7.5 : 5.5;
        weight = isVietnamMode ? 2.5 : 1;
      } else if (isNext) {
        fillColor = isVietnamMode ? "#ef4444" : isChinaMode ? "#f59e0b" : "#3b82f6";
        color = isVietnamMode ? "#facc15" : isChinaMode ? "rgba(245, 158, 11, 0.6)" : "rgba(59, 130, 246, 0.5)";
        radius = 6;
        weight = 1.5;
      } else if (isVietnamMode) {
        fillColor = "rgba(15, 23, 42, 0.85)";
        color = "#dc2626";
        radius = 5;
        weight = 1.5;
      } else if (isChinaMode) {
        fillColor = "#d97706";
        color = "#78350f";
        radius = 5;
        weight = 1;
      }

      // We skip drawing active node circle since it's covered by the 3D train avatar
      if (!isActive) {
        const marker = L.circleMarker([reg.lat, reg.lng], {
          radius,
          fillColor,
          fillOpacity: 0.95,
          color,
          weight,
        }).addTo(markersGroup);

        // Bind interactive events
        if (!isQuizMode) {
          marker.on("mouseover", () => setHoveredRegion(reg));
          marker.on("mouseout", () => setHoveredRegion(null));
        }
      }
    });

    // -- C. Draw Beautiful Smiling Train Avatar Marker on Active Node --
    if (activeRegion && typeof activeRegion.lat === "number" && typeof activeRegion.lng === "number" && !isNaN(activeRegion.lat) && !isNaN(activeRegion.lng)) {
      if (isQuizMode) {
        const rippleBgClass = isJapanMode
          ? "bg-rose-500/40"
          : isUsaMode
          ? "bg-blue-500/40"
          : isChinaMode
          ? "bg-amber-500/40"
          : isGermanyMode
          ? "bg-amber-500/40"
          : isFranceMode
          ? "bg-blue-500/40"
          : isItalyMode
          ? "bg-emerald-500/40"
          : isSpainMode
          ? "bg-red-500/40"
          : isUkMode
          ? "bg-indigo-500/40"
          : isWorldMode
          ? "bg-slate-500/40"
          : "bg-emerald-500/40";

        const dotBgClass = isJapanMode
          ? "bg-rose-600"
          : isUsaMode
          ? "bg-blue-600"
          : isChinaMode
          ? "bg-amber-500"
          : isGermanyMode
          ? "bg-amber-500"
          : isFranceMode
          ? "bg-blue-600"
          : isItalyMode
          ? "bg-emerald-600"
          : isSpainMode
          ? "bg-red-600"
          : isUkMode
          ? "bg-indigo-600"
          : isWorldMode
          ? "bg-slate-600"
          : "bg-emerald-600";

        const quizIcon = L.divIcon({
          className: "custom-quiz-marker-wrapper",
          html: `
            <div class="relative flex items-center justify-center select-none" style="transform: translate(-50%, -50%);">
              <!-- Soft pulsing ripple ring behind -->
              <div class="absolute w-8 h-8 ${rippleBgClass} rounded-full animate-ping pointer-events-none" style="animation-duration: 1.8s;"></div>
              
              <!-- Clean location target dot -->
              <div class="w-4 h-4 ${dotBgClass} border-2 border-white rounded-full shadow-lg z-10 flex items-center justify-center">
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([activeRegion.lat, activeRegion.lng], { icon: quizIcon }).addTo(markersGroup);
      } else {
        const activeVehicle: VehicleType = (vehicleType as VehicleType) || "subway";
        const markerDisplayName = displayLanguage === "en"
          ? (activeRegion.name_en || activeRegion.name_kr)
          : (activeRegion.name_kr || activeRegion.name_en);

        const { html, iconSize } = getMapVehicleMarkerHtml(
          activeVehicle,
          regionLevel,
          markerDisplayName,
          activeRegion.id,
          customVehicleConfig
        );

        const vehicleIcon = L.divIcon({
          className: "custom-vehicle-marker-wrapper",
          html,
          iconSize,
          iconAnchor: [0, 0],
        });

        const targetLat = activeRegion.lat;
        const targetLng = activeRegion.lng;

        // Reset previous animation if running
        if (animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }

        const prevPos = prevVehiclePosRef.current;
        const dist = prevPos
          ? Math.hypot(targetLat - prevPos.lat, targetLng - prevPos.lng)
          : 0;

        // If detailed address search result, render pin with popup directly
        if (activeRegion.id.startsWith("geo-")) {
          const geoMarker = L.marker([targetLat, targetLng], { icon: vehicleIcon }).addTo(markersGroup);
          if (activeRegion.description) {
            geoMarker.bindPopup(`
              <div style="font-family: sans-serif; padding: 6px; max-width: 240px; text-align: left;">
                <div style="font-weight: 900; font-size: 13px; color: #0f172a; margin-bottom: 3px;">📍 ${activeRegion.name_kr}</div>
                <div style="font-size: 11px; color: #475569; line-height: 1.4; margin-bottom: 4px;">${activeRegion.description}</div>
                <div style="font-size: 10px; color: #059669; font-weight: 700;">위도 ${activeRegion.lat.toFixed(4)}, 경도 ${activeRegion.lng.toFixed(4)}</div>
              </div>
            `, { offset: [0, -25] }).openPopup();
          }
          prevVehiclePosRef.current = { lat: targetLat, lng: targetLng };
        } else if (prevPos && dist > 0.001) {
          const startLat = prevPos.lat;
          const startLng = prevPos.lng;

          const vehicleMarker = L.marker([startLat, startLng], { icon: vehicleIcon }).addTo(markersGroup);

          // Add class for active walking legs / driving motion
          setTimeout(() => {
            const el = vehicleMarker.getElement();
            if (el) {
              el.classList.add("is-moving");
            }
          }, 0);

          const duration = 1400; // 1.4 seconds path movement
          const startTime = performance.now();

          const animateStep = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (cubic ease-in-out for smooth acceleration and deceleration)
            const eased = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            const curLat = startLat + (targetLat - startLat) * eased;
            const curLng = startLng + (targetLng - startLng) * eased;

            vehicleMarker.setLatLng([curLat, curLng]);
            prevVehiclePosRef.current = { lat: curLat, lng: curLng };

            if (mapRef.current && progress < 1) {
              mapRef.current.panTo([curLat, curLng], { animate: false });
            }

            if (progress < 1) {
              animFrameRef.current = requestAnimationFrame(animateStep);
            } else {
              vehicleMarker.setLatLng([targetLat, targetLng]);
              prevVehiclePosRef.current = { lat: targetLat, lng: targetLng };
              animFrameRef.current = null;
              const markerEl = vehicleMarker.getElement();
              if (markerEl) {
                markerEl.classList.remove("is-moving");
              }
            }
          };

          animFrameRef.current = requestAnimationFrame(animateStep);
        } else {
          L.marker([targetLat, targetLng], { icon: vehicleIcon }).addTo(markersGroup);
          prevVehiclePosRef.current = { lat: targetLat, lng: targetLng };
        }
      }
    }

    // -- D. Draw Multiplayer Opponents on the Map --
    if (multiplayerPlayers && coursePath && coursePath.length > 0) {
      Object.values(multiplayerPlayers).forEach((player: PlayerState) => {
        if (player.id !== myPlayerId) {
          const stationIdx = Math.min(player.currentIndex, coursePath.length - 1);
          const pStation = coursePath[stationIdx];
          if (pStation && typeof pStation.lat === "number" && typeof pStation.lng === "number" && !isNaN(pStation.lat) && !isNaN(pStation.lng)) {
            const isFinished = player.finished;
            const opponentIcon = L.divIcon({
              className: "custom-opponent-marker-wrapper",
              html: `
                <div class="relative flex flex-col items-center justify-center select-none" style="transform: translate(-50%, -85%);">
                  <!-- Opponent Pulse Wave -->
                  <div class="absolute w-12 h-12 bg-cyan-500/30 rounded-full animate-ping pointer-events-none" style="animation-duration: 1.8s; top: 10px;"></div>
                  
                  <!-- Opponent Avatar Badge -->
                  <div class="relative shadow-xl flex items-center justify-center bg-cyan-600 text-white font-black rounded-2xl border-2 border-white px-2.5 py-1 text-xs gap-1">
                    <span>👥 ${player.nickname}</span>
                  </div>
                  
                  <!-- Progress Badge -->
                  <div class="mt-1 bg-slate-900 text-amber-300 border border-slate-700 px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-lg whitespace-nowrap">
                    ${isFinished ? "🏆 완주 성공!" : `${stationIdx + 1} / ${player.totalStations || coursePath.length}`}
                  </div>
                </div>
              `,
              iconSize: [80, 45],
              iconAnchor: [0, 0],
            });

            L.marker([pStation.lat, pStation.lng], { icon: opponentIcon, zIndexOffset: 800 }).addTo(markersGroup);
          }
        }
      });
    }
  }, [regions, activeRegion, visitedRegions, courseHistory, upcomingRegions, multiplayerPlayers, myPlayerId, coursePath, modeColors, worldFillMode]);

  // Handle Zoom adjustments manually
  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleZoomSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextZoom = Number(e.target.value);
    mapRef.current?.setZoom(nextZoom);
  };

  const handleResetView = () => {
    if (activeRegion && typeof activeRegion.lat === "number" && typeof activeRegion.lng === "number" && !isNaN(activeRegion.lat) && !isNaN(activeRegion.lng)) {
      const isWorld = activeRegion.level === "world";
      const isChina = activeRegion.level === "china";
      const isUsa = activeRegion.level === "usa";
      const isJapan = activeRegion.level === "japan";
      const isVietnam = activeRegion.level === "vietnam";
      const isFrance = activeRegion.level === "france";
      const isItaly = activeRegion.level === "italy";
      const isSpain = activeRegion.level === "spain";
      const isUk = activeRegion.level === "uk";
      const targetZoom = isWorld ? 3 : isChina ? 5 : isUsa ? 5 : isVietnam ? 5 : (isFrance || isItaly || isSpain || isUk) ? 6.5 : isJapan ? 6 : 8;
      mapRef.current?.setView([activeRegion.lat, activeRegion.lng], targetZoom);
    } else {
      const currentLevel = regionLevel || (regions && regions[0]?.level);
      if (currentLevel === "china") mapRef.current?.setView([35.0, 104.0], 4);
      else if (currentLevel === "usa") mapRef.current?.setView([37.0, -95.7], 4);
      else if (currentLevel === "japan") mapRef.current?.setView([36.2, 138.2], 6);
      else if (currentLevel === "vietnam") mapRef.current?.setView([15.8, 107.5], 5);
      else if (currentLevel === "france") mapRef.current?.setView([46.6, 1.9], 6);
      else if (currentLevel === "germany") mapRef.current?.setView([51.2, 10.4], 6);
      else if (currentLevel === "italy") mapRef.current?.setView([41.9, 12.6], 6);
      else if (currentLevel === "spain") mapRef.current?.setView([40.5, -3.7], 6);
      else if (currentLevel === "uk") mapRef.current?.setView([54.5, -3.0], 6);
      else if (currentLevel === "world") mapRef.current?.setView([20, 10], 3);
      else mapRef.current?.setView([36.2, 127.8], 8);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-100 dark:bg-slate-900 overflow-hidden select-none flex-1 flex flex-col">
      {/* 1. Leaflet map render container */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full min-h-[500px] z-10 transition-all duration-300"
        style={{ height: "100%", width: "100%", minHeight: "500px" }}
      />

      {/* 2. Floating Hover Tooltip overlay */}
      {hoveredRegion && (
        <div
          id="map-tooltip"
          className="absolute z-20 top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 border border-slate-200 shadow-xl rounded-2xl text-slate-800 max-w-xs animate-fade-in"
        >
          <div className="flex items-center gap-1.5">
            <CountryFlag id={hoveredRegion.id} />
            <span className="text-sm font-black text-slate-900">
              {displayLanguage === "en" ? (hoveredRegion.name_en || hoveredRegion.name_kr) : (hoveredRegion.name_kr || hoveredRegion.name_en)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              ({displayLanguage === "en" ? hoveredRegion.name_kr : hoveredRegion.name_en})
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{hoveredRegion.description}</p>
          <div className="flex gap-1.5 items-center mt-2.5 pt-2 border-t border-slate-100">
            <span className="px-2 py-0.5 rounded-full text-[9px] bg-slate-100 text-slate-500 font-semibold">
              {hoveredRegion.region_group}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-100 text-amber-700 font-semibold">
              {hoveredRegion.level === "sido" ? "광역 자치" : "기초 시군구"}
            </span>
          </div>
        </div>
      )}

      {/* 3. Map Controls Rail Overlay (Right Side - exact metrotyping.kr style) */}
      <div
        id="map-controls"
        className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-3xl border border-slate-200 shadow-xl w-14"
      >
        {/* Map View Mode Toggle (Standard vs Satellite) */}
        <button
          onClick={() => {
            const nextStyle: MapStyle = activeMapStyle === "satellite" ? "standard" : "satellite";
            setActiveMapStyle(nextStyle);
            onToggleMapStyle?.(nextStyle);
          }}
          className={`w-9 h-9 rounded-2xl shadow-md cursor-pointer flex flex-col items-center justify-center transition-all ${
            activeMapStyle === "satellite"
              ? "bg-slate-900 text-amber-300 ring-2 ring-amber-400/50 border border-amber-400/30"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
          }`}
          title={
            activeMapStyle === "satellite"
              ? (displayLanguage === "en" ? "Switch to Standard Map" : "일반 지도로 변경")
              : (displayLanguage === "en" ? "Switch to Satellite Map" : "인공위성 지도로 변경")
          }
        >
          <span className="text-sm leading-none">{activeMapStyle === "satellite" ? "🛰️" : "🗺️"}</span>
        </button>
        <span className="text-[9px] font-black text-slate-500 text-center -mt-1.5 leading-none">
          {activeMapStyle === "satellite"
            ? (displayLanguage === "en" ? "Satellite" : "위성")
            : (displayLanguage === "en" ? "Standard" : "일반")}
        </span>

        <button
          className="p-2.5 bg-amber-500 text-white rounded-2xl shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          onClick={handleResetView}
          title="Center view"
        >
          <Compass className="w-4.5 h-4.5" />
        </button>

        <span className="text-[10px] font-black text-slate-400 tracking-wider">지도</span>

        <hr className="w-8 border-slate-200 my-0.5" />

        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 14}
          className="p-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-slate-700 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Vertical range slider */}
        <div className="h-24 flex items-center justify-center relative my-1">
          <input
            type="range"
            min="6"
            max="14"
            step="0.1"
            value={zoomLevel}
            onChange={handleZoomSlider}
            className="accent-amber-500 h-1.5 cursor-pointer w-20 -rotate-90 origin-center bg-slate-200 rounded-lg appearance-none"
          />
        </div>

        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 6}
          className="p-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-slate-700 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] font-black text-slate-800">{zoomPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export const Map = React.memo(MapComponent);
