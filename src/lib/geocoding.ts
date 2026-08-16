/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeocodedPlace {
  id: string;
  name: string;
  fullAddress: string;
  lat: number;
  lng: number;
  countryCode?: string;
  countryName?: string;
  city?: string;
}

/**
 * Searches detailed addresses and POIs globally using OpenStreetMap Nominatim and Photon Geocoding APIs.
 */
export async function searchAddressGeocoding(query: string): Promise<GeocodedPlace[]> {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim();
  const encoded = encodeURIComponent(cleanQuery);
  const results: GeocodedPlace[] = [];
  const seenCoords = new Set<string>();

  // 1. Nominatim OpenStreetMap Search
  try {
    const nomUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}&accept-language=ko,en&addressdetails=1&limit=6`;
    const res = await fetch(nomUrl, {
      headers: {
        "Accept-Language": "ko,en;q=0.9",
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const item of data) {
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          if (isNaN(lat) || isNaN(lng)) continue;

          const coordKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
          if (seenCoords.has(coordKey)) continue;
          seenCoords.add(coordKey);

          const addr = item.address || {};
          const name =
            item.name ||
            addr.amenity ||
            addr.building ||
            addr.road ||
            addr.suburb ||
            addr.city ||
            addr.town ||
            cleanQuery;

          const countryCode = (addr.country_code || "").toLowerCase();
          const countryName = addr.country || "";
          const city = addr.city || addr.town || addr.county || addr.state || "";

          const fullAddress = item.display_name || [addr.road, city, countryName].filter(Boolean).join(", ");

          results.push({
            id: `geo-${countryCode || "world"}-${lat}-${lng}`,
            name,
            fullAddress,
            lat,
            lng,
            countryCode,
            countryName,
            city,
          });
        }
      }
    }
  } catch (e) {
    console.error("Nominatim search error:", e);
  }

  // 2. Photon (Komoot OSM index) fallback / complement
  if (results.length < 5) {
    try {
      const photonUrl = `https://photon.komoot.io/api/?q=${encoded}&limit=5`;
      const res = await fetch(photonUrl);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.features)) {
          for (const feat of data.features) {
            const coords = feat.geometry?.coordinates;
            if (!coords || coords.length < 2) continue;

            const lng = coords[0];
            const lat = coords[1];
            if (isNaN(lat) || isNaN(lng)) continue;

            const coordKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
            if (seenCoords.has(coordKey)) continue;
            seenCoords.add(coordKey);

            const props = feat.properties || {};
            const name = props.name || props.street || props.city || cleanQuery;
            const countryCode = (props.countrycode || "").toLowerCase();
            const countryName = props.country || "";
            const city = props.city || props.state || "";

            const parts = [props.name, props.street, props.city, props.state, props.country].filter(Boolean);
            const fullAddress = parts.join(", ");

            results.push({
              id: `geo-${countryCode || "world"}-${lat}-${lng}`,
              name,
              fullAddress,
              lat,
              lng,
              countryCode,
              countryName,
              city,
            });
          }
        }
      }
    } catch (e) {
      console.error("Photon search error:", e);
    }
  }

  return results;
}
