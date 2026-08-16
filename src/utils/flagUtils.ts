/**
 * Helper to get flag image URL for countries / regions
 */
export function getCountryFlagUrl(id: string | undefined | null): string | null {
  if (!id) return null;
  const code = id.toLowerCase().trim();

  // Directly 2 letters (World countries like kr, us, jp, cn, gb, fr, de, sg, va, mc, sm, li, ad, mt, mv, bh, lu, etc.)
  if (code.length === 2) {
    return `https://flagcdn.com/w40/${code}.png`;
  }

  // Handle region IDs prefixed with country codes
  if (code.startsWith("usa_") || code.startsWith("us_")) return `https://flagcdn.com/w40/us.png`;
  if (code.startsWith("japan_") || code.startsWith("jp_")) return `https://flagcdn.com/w40/jp.png`;
  if (code.startsWith("vietnam_") || code.startsWith("vn_")) return `https://flagcdn.com/w40/vn.png`;
  if (code.startsWith("china_") || code.startsWith("cn_")) return `https://flagcdn.com/w40/cn.png`;
  if (code.startsWith("germany_") || code.startsWith("de_")) return `https://flagcdn.com/w40/de.png`;
  if (code.startsWith("france_") || code.startsWith("fr_")) return `https://flagcdn.com/w40/fr.png`;
  if (
    code.startsWith("seoul_") ||
    code.startsWith("gyeonggi_") ||
    code.startsWith("busan_") ||
    code.startsWith("jeju_") ||
    code.startsWith("incheon_") ||
    code.startsWith("daegu_") ||
    code.startsWith("gwangju_") ||
    code.startsWith("daejeon_") ||
    code.startsWith("ulsan_") ||
    code.startsWith("sejong_") ||
    code.startsWith("gangwon_") ||
    code.startsWith("chungbuk_") ||
    code.startsWith("chungnam_") ||
    code.startsWith("jeonbuk_") ||
    code.startsWith("jeonnam_") ||
    code.startsWith("gyeongbuk_") ||
    code.startsWith("gyeongnam_")
  ) {
    return `https://flagcdn.com/w40/kr.png`;
  }

  return null;
}
