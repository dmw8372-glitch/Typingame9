/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Region } from "../types";

export const SPAIN_REGIONS: Region[] = [
  {
    id: "es_madrid",
    name_kr: "마드리드",
    name_en: "Madrid",
    name_es: "Comunidad de Madrid",
    level: "spain",
    lat: 40.4168,
    lng: -3.7038,
    region_group: "수도권",
    neighbors: ["es_castillalamancha", "es_castillayleon"],
    description: "스페인의 수도이자 정치·문화·경제의 중심지. 프라도 미술관, 왕궁, 푸에르타 델 솔 광장 및 레알 마드리드의 홈구장 산티아고 베르나베우가 위치합니다."
  },
  {
    id: "es_catalunya",
    name_kr: "카탈루냐",
    name_en: "Catalonia",
    name_es: "Cataluña",
    level: "spain",
    lat: 41.5912,
    lng: 1.5209,
    region_group: "동부",
    neighbors: ["es_aragon", "es_valencia", "es_baleares"],
    description: "바르셀로나를 주도로 하는 지중해 연안 자치주. 가우디의 사그라다 파밀리아 성당, 구엘 공원 및 독자적인 카탈루냐 언어와 문화가 숨쉬는 곳입니다."
  },
  {
    id: "es_andalucia",
    name_kr: "안달루시아",
    name_en: "Andalusia",
    name_es: "Andalucía",
    level: "spain",
    lat: 37.5443,
    lng: -4.7278,
    region_group: "안달루시아/남부",
    neighbors: ["es_extremadura", "es_castillalamancha", "es_murcia", "es_ceuta"],
    description: "플라멩코와 투우의 본고장. 그라나다의 알람브라 궁전, 세비야 대성당, 코르도바의 메스키타 등 찬란한 이슬람과 기독교 융합 문화유산이 가득합니다."
  },
  {
    id: "es_valencia",
    name_kr: "발렌시아",
    name_en: "Valencia",
    name_es: "Comunitat Valenciana",
    level: "spain",
    lat: 39.4840,
    lng: -0.7533,
    region_group: "동부",
    neighbors: ["es_catalunya", "es_aragon", "es_castillalamancha", "es_murcia", "es_baleares"],
    description: "스페인 대표 요리 파에야(Paella)의 발상지. 예술과 과학의 도시(CAC), 온화한 지중해 해변 및 매년 열리는 화려한 라스 파야스(불꽃 축제)로 유명합니다."
  },
  {
    id: "es_galicia",
    name_kr: "갈리시아",
    name_en: "Galicia",
    name_es: "Galicia",
    level: "spain",
    lat: 42.5751,
    lng: -8.1339,
    region_group: "북부",
    neighbors: ["es_asturias", "es_castillayleon"],
    description: "산티아고 순례길(카미노 데 산티아고)의 종착지인 산티아고 대성당이 있는 녹색의 땅. 켈트 문화 유산과 신선한 문어 요리(폴보 아 페이라)가 유명합니다."
  },
  {
    id: "es_paisvasco",
    name_kr: "바스크",
    name_en: "Basque Country",
    name_es: "País Vasco",
    level: "spain",
    lat: 42.9896,
    lng: -2.6189,
    region_group: "북부",
    neighbors: ["es_cantabria", "es_castillayleon", "es_larioha", "es_navarra"],
    description: "세계 최고의 미식 도시 산세바스티안과 빌바오 구겐하임 미술관이 있는 곳. 독특한 바스크어(에우스케라)와 핀초스(Pintxos) 미식 문화가 발달했습니다."
  },
  {
    id: "es_castillalamancha",
    name_kr: "카스티야이라만차",
    name_en: "Castile-La Mancha",
    name_es: "Castilla-La Mancha",
    level: "spain",
    lat: 39.5796,
    lng: -3.0039,
    region_group: "중부",
    neighbors: ["es_madrid", "es_castillayleon", "es_aragon", "es_valencia", "es_murcia", "es_andalucia", "es_extremadura"],
    description: "세르반테스의 소설 《돈키호테》의 배경인 풍차 마을 콘수에그라와 천년 고도 톨레도가 위치한 광활한 고원 지대입니다."
  },
  {
    id: "es_castillayleon",
    name_kr: "카스티야이레온",
    name_en: "Castile and León",
    name_es: "Castilla y León",
    level: "spain",
    lat: 41.7636,
    lng: -4.7245,
    region_group: "중부",
    neighbors: ["es_galicia", "es_asturias", "es_cantabria", "es_paisvasco", "es_larioha", "es_aragon", "es_madrid", "es_castillalamancha", "es_extremadura"],
    description: "스페인에서 가장 면적이 넓은 자치주. 세고비아의 로마 수도교, 살라망카 대학교, 부르고스 대성당 등 중세 역사와 건축의 보고입니다."
  },
  {
    id: "es_aragon",
    name_kr: "아라곤",
    name_en: "Aragon",
    name_es: "Aragón",
    level: "spain",
    lat: 41.6561,
    lng: -0.8773,
    region_group: "동부",
    neighbors: ["es_navarra", "es_larioha", "es_castillayleon", "es_castillalamancha", "es_valencia", "es_catalunya"],
    description: "피레네 산맥의 험준한 자연과 사라고사의 필라르 성모 성당이 돋보이는 곳. 화가 프란시스코 고야의 고향이자 무데하르 양식 건축이 유명합니다."
  },
  {
    id: "es_extremadura",
    name_kr: "에스트레마두라",
    name_en: "Extremadura",
    name_es: "Extremadura",
    level: "spain",
    lat: 39.4937,
    lng: -6.0679,
    region_group: "중부",
    neighbors: ["es_castillayleon", "es_castillalamancha", "es_andalucia"],
    description: "포르투갈 국경에 접한 유서 깊은 지역. 로마 시대 극장과 유적군이 잘 보존된 메리다(Mérida)와 최고급 하몬 이베리코(Jamón Ibérico)의 산지입니다."
  },
  {
    id: "es_asturias",
    name_kr: "아스투리아스",
    name_en: "Asturias",
    name_es: "Principado de Asturias",
    level: "spain",
    lat: 43.3614,
    lng: -5.8593,
    region_group: "북부",
    neighbors: ["es_galicia", "es_castillayleon", "es_cantabria"],
    description: "스페인 왕위 계승자의 칭호(아스투리아스 공)가 유래한 유서 깊은 공국. 피코스 데 에우로파 국립공원의 웅장한 산세와 사과주(시드라)가 유명합니다."
  },
  {
    id: "es_navarra",
    name_kr: "나바라",
    name_en: "Navarre",
    name_es: "Comunidad Foral de Navarra",
    level: "spain",
    lat: 42.6954,
    lng: -1.6761,
    region_group: "북부",
    neighbors: ["es_paisvasco", "es_larioha", "es_aragon"],
    description: "헤밍웨이의 소설로 유명해진 팜플로나의 산페르민 소몰이 축제(엔시에로)가 열리는 곳. 피레네 산맥의 울창한 숲과 고대 나바라 왕국의 역사를 간직합니다."
  },
  {
    id: "es_cantabria",
    name_kr: "칸타브리아",
    name_en: "Cantabria",
    name_es: "Cantabria",
    level: "spain",
    lat: 43.1828,
    lng: -3.9878,
    region_group: "북부",
    neighbors: ["es_asturias", "es_castillayleon", "es_paisvasco"],
    description: "구석기 시대의 걸작 알타미라 동굴 벽화가 있는 유서 깊은 해안 지역. 주도 산탄데르의 엘 사르디네로 해변과 푸른 해안선이 장관을 이룹니다."
  },
  {
    id: "es_murcia",
    name_kr: "무르시아",
    name_en: "Murcia",
    name_es: "Región de Murcia",
    level: "spain",
    lat: 37.9922,
    lng: -1.1307,
    region_group: "동부",
    neighbors: ["es_andalucia", "es_castillalamancha", "es_valencia"],
    description: "일조량이 풍부한 '유럽의 과수원'. 지중해 최대 석호인 마르 메노르(Mar Menor)와 로마 원형극장이 있는 고대 항구 카르타헤나가 자리합니다."
  },
  {
    id: "es_larioha",
    name_kr: "라리오하",
    name_en: "La Rioja",
    name_es: "La Rioja",
    level: "spain",
    lat: 42.2871,
    lng: -2.5396,
    region_group: "북부",
    neighbors: ["es_paisvasco", "es_castillayleon", "es_navarra", "es_aragon"],
    description: "세계적인 품질을 자랑하는 스페인 최고급 와인의 산지(DOCa Rioja). 에브로 강 유역을 따라 끝없이 펼쳐진 유서 깊은 포도밭과 와이너리로 유명합니다."
  },
  {
    id: "es_baleares",
    name_kr: "발레아레스제도",
    name_en: "Balearic Islands",
    name_es: "Islas Baleares",
    level: "spain",
    lat: 39.6953,
    lng: 3.0176,
    region_group: "도서/자치시",
    neighbors: ["es_catalunya", "es_valencia"],
    description: "지중해의 대표 휴양 군도. 마요르카(라파엘 나달의 고향), 세계적인 클럽과 해변의 이비자, 메노르카, 포르멘테라 섬으로 구성되어 있습니다."
  },
  {
    id: "es_canarias",
    name_kr: "카나리아제도",
    name_en: "Canary Islands",
    name_es: "Islas Canarias",
    level: "spain",
    lat: 28.2916,
    lng: -16.6291,
    region_group: "도서/자치시",
    neighbors: ["es_andalucia"],
    description: "대서양에 위치한 화산 군도. 스페인 최고봉 테이데 화산(3,718m)이 있는 테네리페 섬과 그란카나리아 섬 등 사계절 따뜻한 천혜의 휴양지입니다."
  },
  {
    id: "es_ceuta",
    name_kr: "세우타",
    name_en: "Ceuta",
    name_es: "Ciudad Autónoma de Ceuta",
    level: "spain",
    lat: 35.8894,
    lng: -5.3213,
    region_group: "도서/자치시",
    neighbors: ["es_andalucia", "es_melilla"],
    description: "지브롤터 해협을 마주보는 북아프리카 모로코 북동부 연안의 스페인 자치시. 기독교, 이슬람, 유대교, 힌두교 문화가 공존하는 전략적 요충지입니다."
  },
  {
    id: "es_melilla",
    name_kr: "멜리야",
    name_en: "Melilla",
    name_es: "Ciudad Autónoma de Melilla",
    level: "spain",
    lat: 35.2923,
    lng: -2.9381,
    region_group: "도서/자치시",
    neighbors: ["es_andalucia", "es_ceuta"],
    description: "북아프리카 연안의 스페인 자치시. 바르셀로나 다음으로 스페인에서 모더니즘 양식 건축물이 가장 많은 아름다운 지중해 요새 도시입니다."
  }
];
