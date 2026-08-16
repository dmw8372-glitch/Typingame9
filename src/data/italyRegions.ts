import { Region } from "../types";

export const ITALY_LIST: Region[] = [
  // 1. 북서부 (Nord-Ovest)
  {
    id: "it_piemonte",
    name_kr: "피에몬테",
    name_en: "Piemonte",
    level: "italy",
    lat: 45.0703,
    lng: 7.6869,
    region_group: "북서부",
    neighbors: ["it_valledaosta", "it_lombardia", "it_liguria"],
    description: "알프스 산맥으로 둘러싸인 이탈리아 북서부의 중심지로 토리노와 세계적인 바롤로 와인의 본고장입니다."
  },
  {
    id: "it_valledaosta",
    name_kr: "발레다오스타",
    name_en: "Valle d'Aosta",
    level: "italy",
    lat: 45.7373,
    lng: 7.3201,
    region_group: "북서부",
    neighbors: ["it_piemonte"],
    description: "몽블랑과 마터호른 등 알프스 최고봉들이 병풍처럼 둘러싼 이탈리아에서 가장 작고 높은 산악 자치주입니다."
  },
  {
    id: "it_liguria",
    name_kr: "리구리아",
    name_en: "Liguria",
    level: "italy",
    lat: 44.4056,
    lng: 8.9463,
    region_group: "북서부",
    neighbors: ["it_piemonte", "it_lombardia", "it_emiliaromagna", "it_toscana"],
    description: "친퀘테레와 제노바 항구를 품은 리비에라 해안의 에메랄드빛 절벽과 바다 풍경이 아름다운 주입니다."
  },
  {
    id: "it_lombardia",
    name_kr: "롬바르디아",
    name_en: "Lombardia",
    level: "italy",
    lat: 45.4642,
    lng: 9.1900,
    region_group: "북서부",
    neighbors: ["it_piemonte", "it_trentino", "it_veneto", "it_emiliaromagna", "it_valledaosta"],
    description: "패션과 금융의 세계적 수도 밀라노와 코모 호수가 위치한 이탈리아 최대의 경제 중심지입니다."
  },

  // 2. 북동부 (Nord-Est)
  {
    id: "it_trentino",
    name_kr: "트렌티노알토아디제",
    name_en: "Trentino-Alto Adige",
    level: "italy",
    lat: 46.0748,
    lng: 11.1217,
    region_group: "북동부",
    neighbors: ["it_lombardia", "it_veneto"],
    description: "유네스코 세계자연유산 돌로미티의 웅장한 침봉들과 알프스 사과밭이 장관을 이루는 산악 자치주입니다."
  },
  {
    id: "it_veneto",
    name_kr: "베네토",
    name_en: "Veneto",
    level: "italy",
    lat: 45.4408,
    lng: 12.3155,
    region_group: "북동부",
    neighbors: ["it_trentino", "it_friuli", "it_lombardia", "it_emiliaromagna"],
    description: "낭만의 수상 도시 베네치아와 베로나, 아드리아해 연안의 풍부한 문화유산이 빛나는 주입니다."
  },
  {
    id: "it_friuli",
    name_kr: "프리울리베네치아줄리아",
    name_en: "Friuli-Venezia Giulia",
    level: "italy",
    lat: 45.6495,
    lng: 13.7768,
    region_group: "북동부",
    neighbors: ["it_veneto"],
    description: "이탈리아 북동쪽 끝 국경 지대로 트리에스테 항구와 오스트리아-슬로베니아 문화가 교차하는 지역입니다."
  },
  {
    id: "it_emiliaromagna",
    name_kr: "에밀리아로마냐",
    name_en: "Emilia-Romagna",
    level: "italy",
    lat: 44.4949,
    lng: 11.3426,
    region_group: "북동부",
    neighbors: ["it_liguria", "it_lombardia", "it_veneto", "it_toscana", "it_marche"],
    description: "미식의 수도 볼로냐, 파르마 치즈와 페라리·람보르기니의 고향 '모터 밸리'가 위치한 주입니다."
  },

  // 3. 중부 (Centro)
  {
    id: "it_toscana",
    name_kr: "토스카나",
    name_en: "Toscana",
    level: "italy",
    lat: 43.7696,
    lng: 11.2558,
    region_group: "중부",
    neighbors: ["it_liguria", "it_emiliaromagna", "it_marche", "it_umbria", "it_lazio"],
    description: "르네상스의 발상지 피렌체, 사이프러스 나무가 늘어선 키안티 구릉과 피사의 사탑이 있는 예술의 고향입니다."
  },
  {
    id: "it_umbria",
    name_kr: "움브리아",
    name_en: "Umbria",
    level: "italy",
    lat: 43.1107,
    lng: 12.3908,
    region_group: "중부",
    neighbors: ["it_toscana", "it_marche", "it_lazio"],
    description: "'이탈리아의 녹색 심장'으로 불리는 내륙 주로 성 프란치스코의 아시시와 중세 언덕 마을들이 가득합니다."
  },
  {
    id: "it_marche",
    name_kr: "마르케",
    name_en: "Marche",
    level: "italy",
    lat: 43.6158,
    lng: 13.5189,
    region_group: "중부",
    neighbors: ["it_emiliaromagna", "it_toscana", "it_umbria", "it_lazio", "it_abruzzo"],
    description: "아드리아해의 아름다운 해변과 르네상스 거장 라파엘로의 고향 우르비노가 자리한 운치 있는 주입니다."
  },
  {
    id: "it_lazio",
    name_kr: "라치오",
    name_en: "Lazio",
    level: "italy",
    lat: 41.9028,
    lng: 12.4964,
    region_group: "중부",
    neighbors: ["it_toscana", "it_umbria", "it_marche", "it_abruzzo", "it_molise", "it_campania"],
    description: "천년 고도 로마와 바티칸을 품은 이탈리아의 심장이자 유구한 고대 로마 문명의 중심지입니다."
  },

  // 4. 남부 (Sud)
  {
    id: "it_abruzzo",
    name_kr: "아브루초",
    name_en: "Abruzzo",
    level: "italy",
    lat: 42.3498,
    lng: 13.3995,
    region_group: "남부",
    neighbors: ["it_marche", "it_lazio", "it_molise"],
    description: "아펜니노 산맥 최고봉 그란사소와 광활한 국립공원, 푸른 아드리아해를 동시에 품은 자연의 보고입니다."
  },
  {
    id: "it_molise",
    name_kr: "몰리세",
    name_en: "Molise",
    level: "italy",
    lat: 41.5603,
    lng: 14.6627,
    region_group: "남부",
    neighbors: ["it_abruzzo", "it_lazio", "it_campania", "it_puglia"],
    description: "이탈리아에서 두 번째로 작지만 전통 목축 문화와 고대 삼니움 유적의 원형을 고스란히 간직한 주입니다."
  },
  {
    id: "it_campania",
    name_kr: "캄파니아",
    name_en: "Campania",
    level: "italy",
    lat: 40.8518,
    lng: 14.2681,
    region_group: "남부",
    neighbors: ["it_lazio", "it_molise", "it_puglia", "it_basilicata"],
    description: "정통 나폴리 피자, 폼페이 유적, 세계에서 가장 아름다운 아말피 해안과 카프리 섬이 있는 남부의 중심입니다."
  },
  {
    id: "it_puglia",
    name_kr: "풀리아",
    name_en: "Puglia",
    level: "italy",
    lat: 41.1171,
    lng: 16.8719,
    region_group: "남부",
    neighbors: ["it_molise", "it_campania", "it_basilicata"],
    description: "이탈리아의 '구둣굽' 지형으로 원뿔형 돌집 트룰리의 알베로벨로와 눈부신 해안 절벽의 주입니다."
  },
  {
    id: "it_basilicata",
    name_kr: "바실리카타",
    name_en: "Basilicata",
    level: "italy",
    lat: 40.6404,
    lng: 15.8056,
    region_group: "남부",
    neighbors: ["it_campania", "it_puglia", "it_calabria"],
    description: "유네스코 세계유산 사시 디 마테라의 태고적 동굴 주거지와 웅장한 협곡이 경이로운 지역입니다."
  },
  {
    id: "it_calabria",
    name_kr: "칼라브리아",
    name_en: "Calabria",
    level: "italy",
    lat: 38.9098,
    lng: 16.5960,
    region_group: "남부",
    neighbors: ["it_basilicata", "it_sicilia"],
    description: "이탈리아 반도 '발끝'에 위치하여 티레니아해와 이오니아해의 두 바다를 끼고 에메랄드빛 해안이 펼쳐집니다."
  },

  // 5. 도서부 (Isole)
  {
    id: "it_sicilia",
    name_kr: "시칠리아",
    name_en: "Sicilia",
    level: "italy",
    lat: 37.5990,
    lng: 14.0154,
    region_group: "도서부",
    neighbors: ["it_calabria"],
    description: "지중해 최대의 섬으로 에트나 활화산, 고대 그리스 신전의 계곡, 찬란한 지중해 미식이 어우러진 섬입니다."
  },
  {
    id: "it_sardegna",
    name_kr: "사르데냐",
    name_en: "Sardegna",
    level: "italy",
    lat: 40.1209,
    lng: 9.0129,
    region_group: "도서부",
    neighbors: ["it_lazio", "it_toscana"],
    description: "코스타 스메랄다의 보석 같은 에메랄드빛 해변과 신비로운 고대 누라게 유적이 보존된 지중해의 낙원입니다."
  }
];
