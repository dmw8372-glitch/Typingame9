import { Region } from "../types";

export const FRANCE_LIST: Region[] = [
  // 1. 수도권 및 북부
  {
    id: "fr_idf",
    name_kr: "일드프랑스",
    name_en: "Île-de-France",
    level: "france",
    lat: 48.8566,
    lng: 2.3522,
    region_group: "수도권",
    neighbors: ["fr_hdf", "fr_ges", "fr_bfc", "fr_cvl", "fr_nor"],
    description: "프랑스의 수도 파리와 에펠탑, 루브르 박물관, 베르사유 궁전이 위치한 국가의 심장부입니다."
  },
  {
    id: "fr_hdf",
    name_kr: "오드프랑스",
    name_en: "Hauts-de-France",
    level: "france",
    lat: 50.6292,
    lng: 3.0573,
    region_group: "북부",
    neighbors: ["fr_idf", "fr_nor", "fr_ges"],
    description: "프랑스 최북단의 관문으로 활기찬 예술 도시 릴, 도버 해협의 칼레, 유네스코 아미앵 대성당이 있습니다."
  },

  // 2. 북서부 및 서부
  {
    id: "fr_nor",
    name_kr: "노르망디",
    name_en: "Normandy",
    level: "france",
    lat: 49.1828,
    lng: -0.3707,
    region_group: "북서부",
    neighbors: ["fr_hdf", "fr_idf", "fr_cvl", "fr_pdl", "fr_bre"],
    description: "신비로운 몽생미셸 수도원, 에트르타의 코끼리 절벽, 인상파 화가들의 안식처이자 카망베르 치즈의 본고장입니다."
  },
  {
    id: "fr_bre",
    name_kr: "브르타뉴",
    name_en: "Brittany",
    level: "france",
    lat: 48.1173,
    lng: -1.6778,
    region_group: "북서부",
    neighbors: ["fr_nor", "fr_pdl"],
    description: "대서양을 향해 뻗은 반도로 고유한 켈트 문화, 생말로의 해적 성곽, 달콤한 크레페와 갈레트의 고향입니다."
  },
  {
    id: "fr_pdl",
    name_kr: "페이드라루아르",
    name_en: "Pays de la Loire",
    level: "france",
    lat: 47.2184,
    lng: -1.5536,
    region_group: "서부",
    neighbors: ["fr_bre", "fr_nor", "fr_cvl", "fr_naq"],
    description: "루아르강 하구의 번영을 누린 낭트의 기계섬 거대 코끼리와 르망 24시간 자동차 경주로 유명합니다."
  },

  // 3. 중부 및 동부
  {
    id: "fr_cvl",
    name_kr: "상트르발드루아르",
    name_en: "Centre-Val de Loire",
    level: "france",
    lat: 47.9029,
    lng: 1.9093,
    region_group: "중부",
    neighbors: ["fr_idf", "fr_nor", "fr_pdl", "fr_naq", "fr_ara", "fr_bfc"],
    description: "루아르 계곡의 찬란한 르네상스 고성들(샹보르, 쉬농소)과 잔 다르크의 구국 도시 오를레앙이 있습니다."
  },
  {
    id: "fr_bfc",
    name_kr: "부르고뉴프랑슈콩테",
    name_en: "Bourgogne-Franche-Comté",
    level: "france",
    lat: 47.3220,
    lng: 5.0415,
    region_group: "동부",
    neighbors: ["fr_ges", "fr_idf", "fr_cvl", "fr_ara"],
    description: "세계 최고의 명품 와인 산지 부르고뉴와 미식 도시 디종, 쥐라 산맥의 울창한 숲과 호수를 품고 있습니다."
  },
  {
    id: "fr_ges",
    name_kr: "그랑테스트",
    name_en: "Grand Est",
    level: "france",
    lat: 48.5734,
    lng: 7.7521,
    region_group: "동부",
    neighbors: ["fr_hdf", "fr_idf", "fr_bfc"],
    description: "유럽의 수도 스트라스부르의 쁘띠 프랑스, 랭스의 샴페인 하우스와 동화 같은 알자스 목조 가옥이 펼쳐집니다."
  },

  // 4. 남서부 및 남부
  {
    id: "fr_naq",
    name_kr: "누벨아키텐",
    name_en: "Nouvelle-Aquitaine",
    level: "france",
    lat: 44.8378,
    lng: -0.5792,
    region_group: "남서부",
    neighbors: ["fr_pdl", "fr_cvl", "fr_ara", "fr_occ"],
    description: "프랑스 최대 면적의 레지옹으로 세계적인 보르도 와인, 라스코 동굴벽화, 필라 사구와 비아리츠 해변이 있습니다."
  },
  {
    id: "fr_occ",
    name_kr: "옥시타니",
    name_en: "Occitanie",
    level: "france",
    lat: 43.6047,
    lng: 1.4442,
    region_group: "남부",
    neighbors: ["fr_naq", "fr_ara", "fr_pac"],
    description: "붉은 벽돌의 도시 툴루즈, 완벽하게 보존된 중세 성채 카르카손과 지중해부터 피레네 산맥까지 닿는 지역입니다."
  },
  {
    id: "fr_ara",
    name_kr: "오베르뉴론알프",
    name_en: "Auvergne-Rhône-Alpes",
    level: "france",
    lat: 45.7640,
    lng: 4.8357,
    region_group: "남동부",
    neighbors: ["fr_bfc", "fr_cvl", "fr_naq", "fr_occ", "fr_pac"],
    description: "미식의 수도 리옹, 유럽 최고봉 몽블랑과 알프스 산맥, 안시 호수의 절경을 자랑하는 산악·미식 명소입니다."
  },
  {
    id: "fr_pac",
    name_kr: "프로방스알프코트다쥐르",
    name_en: "Provence-Alpes-Côte d'Azur",
    level: "france",
    lat: 43.2965,
    lng: 5.3698,
    region_group: "남동부",
    neighbors: ["fr_ara", "fr_occ"],
    description: "지중해 햇살 가득한 코발트빛 코트다쥐르 해안, 니스, 칸 영화제, 마르세유와 보랏빛 라벤더 들판의 프로방스입니다."
  },
  {
    id: "fr_cor",
    name_kr: "코르시카",
    name_en: "Corsica",
    level: "france",
    lat: 41.9267,
    lng: 8.7369,
    region_group: "도서부",
    neighbors: ["fr_pac"],
    description: "나폴레옹의 고향이자 '아름다운 섬(Île de Beauté)'으로 불리는 지중해의 에메랄드빛 절경 섬입니다."
  },

  // 5. 해외 영토 (DROM)
  {
    id: "fr_gua",
    name_kr: "과들루프",
    name_en: "Guadeloupe",
    level: "france",
    lat: 46.0,
    lng: -7.0,
    region_group: "해외영토",
    neighbors: ["fr_mq"],
    description: "카리브해 소앤틸리스 제도의 나비 모양 화산 군도로 수려한 에메랄드 해변과 열대우림을 간직한 해외 레지옹입니다."
  },
  {
    id: "fr_mq",
    name_kr: "마르티니크",
    name_en: "Martinique",
    level: "france",
    lat: 46.0,
    lng: -5.0,
    region_group: "해외영토",
    neighbors: ["fr_gua"],
    description: "카리브해의 아름다운 '꽃의 섬'으로 펠레 화산, 전통 크리올 문화와 카리브해 럼주의 명산지입니다."
  },
  {
    id: "fr_gf",
    name_kr: "프랑스령기아나",
    name_en: "French Guiana",
    level: "france",
    lat: 44.0,
    lng: -7.0,
    region_group: "해외영토",
    neighbors: ["fr_gua", "fr_mq"],
    description: "남아메리카 북동부의 아마존 열대우림 지대이자 유럽우주국(ESA)의 쿠루 우주 로켓 발사 기지가 위치합니다."
  },
  {
    id: "fr_reu",
    name_kr: "레위니옹",
    name_en: "La Réunion",
    level: "france",
    lat: 44.0,
    lng: -5.0,
    region_group: "해외영토",
    neighbors: ["fr_yt"],
    description: "인도양 남서부의 장엄한 화산섬으로 유네스코 세계자연유산 국립공원과 피통드라푸르네즈 활화산이 있습니다."
  },
  {
    id: "fr_yt",
    name_kr: "마요트",
    name_en: "Mayotte",
    level: "france",
    lat: 44.0,
    lng: -3.5,
    region_group: "해외영토",
    neighbors: ["fr_reu"],
    description: "모잠비크 해협 인도양의 군도로 세계 최대 규모의 산호초 석호(라군)와 풍요로운 해양 생태계의 낙원입니다."
  }
];
