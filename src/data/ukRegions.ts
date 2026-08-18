/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Region } from "../types";

export const UK_REGIONS: Region[] = [
  // ==========================================
  // 1. 잉글랜드 남부 (England South - 30개)
  // ==========================================
  {
    id: "uk_greater_london",
    name_kr: "그레이터런던",
    name_en: "Greater London",
    level: "uk",
    lat: 51.5074,
    lng: -0.1278,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_city_of_london", "uk_westminster", "uk_camden", "uk_greenwich", "uk_surrey", "uk_kent", "uk_essex", "uk_hertfordshire", "uk_berkshire", "uk_buckinghamshire"],
    description: "영국의 수도이자 세계적인 금융·문화의 중심지. 빅벤, 런던탑, 버킹엄 궁전, 대영박물관이 위치한 템스강의 심장부입니다."
  },
  {
    id: "uk_city_of_london",
    name_kr: "시티오브런던",
    name_en: "City of London",
    level: "uk",
    lat: 51.5155,
    lng: -0.0922,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_westminster", "uk_camden"],
    description: "런던의 역사적 기원이자 '스퀘어 마일'로 불리는 세계 최대의 국제 금융 허브. 세인트 폴 대성당과 영란은행이 위치합니다."
  },
  {
    id: "uk_westminster",
    name_kr: "웨스트민스터",
    name_en: "Westminster",
    level: "uk",
    lat: 51.4975,
    lng: -0.1357,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_city_of_london", "uk_camden"],
    description: "영국 의회 정치의 본산. 웨스트민스터 사원, 국회의사당, 총리 관저가 있는 다우닝가 10번지가 위치한 정치의 중심지입니다."
  },
  {
    id: "uk_camden",
    name_kr: "캠던",
    name_en: "Camden",
    level: "uk",
    lat: 51.5290,
    lng: -0.1255,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_city_of_london", "uk_westminster", "uk_hertfordshire"],
    description: "캠던 마켓과 개성 넘치는 언더그라운드 록 문화, 대영도서관 및 리젠트 파크가 있는 런던 북부의 예술적 명소입니다."
  },
  {
    id: "uk_greenwich",
    name_kr: "그리니치",
    name_en: "Greenwich",
    level: "uk",
    lat: 51.4826,
    lng: 0.0077,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_kent", "uk_surrey"],
    description: "본초자오선(경도 0도)과 그리니치 표준시(GMT)의 발상지. 유네스코 해양 런던 유산과 왕립천문대가 있는 유서 깊은 지역입니다."
  },
  {
    id: "uk_surrey",
    name_kr: "서리",
    name_en: "Surrey",
    level: "uk",
    lat: 51.3148,
    lng: -0.5600,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_greenwich", "uk_kent", "uk_east_sussex", "uk_west_sussex", "uk_hampshire", "uk_berkshire"],
    description: "런던 남부의 울창한 전원 카운티. 길퍼드 대성당과 햄프턴 코트 궁전 인근의 아름다운 녹지 및 쾌적한 주거지로 유명합니다."
  },
  {
    id: "uk_kent",
    name_kr: "켄트",
    name_en: "Kent",
    level: "uk",
    lat: 51.2787,
    lng: 0.5217,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_greenwich", "uk_surrey", "uk_east_sussex", "uk_essex"],
    description: "'잉글랜드의 정원'이라 불리는 비옥한 카운티. 캔터베리 대성당, 도버 백색 절벽(White Cliffs), 리즈 성이 위치합니다."
  },
  {
    id: "uk_east_sussex",
    name_kr: "이스트서식스",
    name_en: "East Sussex",
    level: "uk",
    lat: 50.9200,
    lng: 0.2800,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_kent", "uk_surrey", "uk_west_sussex", "uk_brighton"],
    description: "1066년 노르만 정복의 헤이스팅스 전투 무대이자 세븐시스터스 백악질 해안 절벽의 장관을 자랑하는 남부 해안주입니다."
  },
  {
    id: "uk_west_sussex",
    name_kr: "웨스트서식스",
    name_en: "West Sussex",
    level: "uk",
    lat: 50.9500,
    lng: -0.4500,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_surrey", "uk_east_sussex", "uk_hampshire", "uk_brighton"],
    description: "치체스터 대성당과 사우스다운스 국립공원의 완만한 구릉지, 에런들 고성이 자리한 남해안의 평화로운 휴양지입니다."
  },
  {
    id: "uk_brighton",
    name_kr: "브라이턴",
    name_en: "Brighton and Hove",
    level: "uk",
    lat: 50.8225,
    lng: -0.1372,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_east_sussex", "uk_west_sussex"],
    description: "영국에서 가장 활기찬 해변 리조트 도시. 로열 파빌리온의 독특한 오리엔탈 궁전과 피어(Pier), 예술 축제로 유명합니다."
  },
  {
    id: "uk_hampshire",
    name_kr: "햄프셔",
    name_en: "Hampshire",
    level: "uk",
    lat: 51.0570,
    lng: -1.3080,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_surrey", "uk_west_sussex", "uk_berkshire", "uk_wiltshire", "uk_dorset", "uk_southampton", "uk_portsmouth", "uk_isle_of_wight"],
    description: "고대 앵글로색슨의 수도 윈체스터와 뉴포레스트 국립공원이 자리하며 제인 오스틴이 집필 활동을 펼친 문학의 고향입니다."
  },
  {
    id: "uk_southampton",
    name_kr: "사우샘프턴",
    name_en: "Southampton",
    level: "uk",
    lat: 50.9097,
    lng: -1.4044,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_hampshire", "uk_portsmouth", "uk_isle_of_wight"],
    description: "1912년 타이타닉호가 첫 출항한 유서 깊은 항구 도시이자 영국 유수의 해양 크루즈 모항이자 프리미어리그 축구 클럽 연고지입니다."
  },
  {
    id: "uk_portsmouth",
    name_kr: "포츠머스",
    name_en: "Portsmouth",
    level: "uk",
    lat: 50.8198,
    lng: -1.0880,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_hampshire", "uk_southampton", "uk_isle_of_wight"],
    description: "영국 왕립 해군의 심장이자 트라팔가 해전의 기함 빅토리호, 찰스 디킨스의 생가와 스피내커 타워가 솟아있는 해양 도시입니다."
  },
  {
    id: "uk_isle_of_wight",
    name_kr: "와이트섬",
    name_en: "Isle of Wight",
    level: "uk",
    lat: 50.6938,
    lng: -1.3047,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_hampshire", "uk_portsmouth", "uk_southampton"],
    description: "빅토리아 여왕의 여름 별장 오스본 하우스와 침식 백악질 암초 '더 니들스', 유서 깊은 요트 레이스로 유명한 남해안 섬입니다."
  },
  {
    id: "uk_berkshire",
    name_kr: "버크셔",
    name_en: "Berkshire",
    level: "uk",
    lat: 51.4543,
    lng: -0.9781,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_surrey", "uk_hampshire", "uk_oxfordshire", "uk_buckinghamshire", "uk_wiltshire"],
    description: "영국 왕실의 거처 윈저 성(Windsor Castle)과 로열 애스콧 경마 대회가 열리는 '왕실의 카운티(Royal County)'입니다."
  },
  {
    id: "uk_oxfordshire",
    name_kr: "옥스퍼드셔",
    name_en: "Oxfordshire",
    level: "uk",
    lat: 51.7520,
    lng: -1.2577,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_berkshire", "uk_buckinghamshire", "uk_gloucestershire", "uk_wiltshire"],
    description: "영어권에서 가장 오래된 명문 옥스퍼드 대학교의 첨탑 도시이자 처칠 수상의 생가 블레넘 궁전(Blenheim Palace)이 위치합니다."
  },
  {
    id: "uk_buckinghamshire",
    name_kr: "버킹엄셔",
    name_en: "Buckinghamshire",
    level: "uk",
    lat: 51.8000,
    lng: -0.8000,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_berkshire", "uk_oxfordshire", "uk_bedfordshire", "uk_hertfordshire"],
    description: "칠턴 구릉지의 전원 풍경과 2차 대전 튜링 암호 해독 기지 블레츨리 파크(Bletchley Park) 및 밀턴킨스가 있는 지역입니다."
  },
  {
    id: "uk_hertfordshire",
    name_kr: "하트퍼드셔",
    name_en: "Hertfordshire",
    level: "uk",
    lat: 51.8098,
    lng: -0.2377,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_camden", "uk_buckinghamshire", "uk_bedfordshire", "uk_cambridgeshire", "uk_essex"],
    description: "세인트 올번스 로마 시대 유적과 해리 포터 스튜디오(워너 브라더스)가 자리한 런던 북부의 역사적인 주거지입니다."
  },
  {
    id: "uk_essex",
    name_kr: "에식스",
    name_en: "Essex",
    level: "uk",
    lat: 51.7343,
    lng: 0.4691,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_greater_london", "uk_kent", "uk_hertfordshire", "uk_cambridgeshire", "uk_suffolk"],
    description: "영국에서 가장 오래된 로마 식민 도시 콜체스터와 템스 에스추어리 연안의 활기찬 항만 및 풍요로운 평야 지대입니다."
  },
  {
    id: "uk_bedfordshire",
    name_kr: "베드퍼드셔",
    name_en: "Bedfordshire",
    level: "uk",
    lat: 52.1386,
    lng: -0.4667,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_buckinghamshire", "uk_hertfordshire", "uk_cambridgeshire"],
    description: "루턴 공항과 윕스네이드 야생동물 공원, 존 번연의 천로역정 배경이 된 그레이트 우즈강 유역의 주입니다."
  },
  {
    id: "uk_suffolk",
    name_kr: "서퍽",
    name_en: "Suffolk",
    level: "uk",
    lat: 52.1872,
    lng: 0.9706,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_essex", "uk_cambridgeshire", "uk_norfolk"],
    description: "화가 컨스터블의 전원 풍경과 입스위치 항구, 중세 서튼 후(Sutton Hoo) 앵글로색슨 배 무덤 유적이 발굴된 역사적인 곳입니다."
  },
  {
    id: "uk_norfolk",
    name_kr: "노퍽",
    name_en: "Norfolk",
    level: "uk",
    lat: 52.6309,
    lng: 1.2974,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_suffolk", "uk_cambridgeshire"],
    description: "동부 이스트 앵글리아의 중심지. 노리치 대성당과 광활한 수로 국립공원 '노퍽 브로드(The Broads)', 샌드링엄 왕실 별장이 위치합니다."
  },
  {
    id: "uk_cambridgeshire",
    name_kr: "케임브리지셔",
    name_en: "Cambridgeshire",
    level: "uk",
    lat: 52.2053,
    lng: 0.1218,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_essex", "uk_hertfordshire", "uk_bedfordshire", "uk_norfolk", "uk_suffolk"],
    description: "세계적 석학들을 배출한 케임브리지 대학교와 캠강의 펀팅(Punting), 첨단 테크 클러스터 '실리콘 펜(Silicon Fen)'의 본고장입니다."
  },
  {
    id: "uk_gloucestershire",
    name_kr: "글로스터셔",
    name_en: "Gloucestershire",
    level: "uk",
    lat: 51.8642,
    lng: -2.2381,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_oxfordshire", "uk_wiltshire", "uk_somerset", "uk_bristol"],
    description: "동화 같은 석조 가옥의 코츠월즈(Cotswolds) 마을들과 해리 포터 회랑으로 유명한 글로스터 대성당이 있는 전원 명소입니다."
  },
  {
    id: "uk_bristol",
    name_kr: "브리스틀",
    name_en: "Bristol",
    level: "uk",
    lat: 51.4545,
    lng: -2.5879,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_gloucestershire", "uk_somerset"],
    description: "서남부의 창의적 문화 수도. 뱅크시(Banksy)의 거리 예술, 브루넬의 클리프턴 현수교와 세계 최대 열기구 축제로 유명합니다."
  },
  {
    id: "uk_somerset",
    name_kr: "서머싯",
    name_en: "Somerset",
    level: "uk",
    lat: 51.1000,
    lng: -3.0000,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_bristol", "uk_gloucestershire", "uk_wiltshire", "uk_dorset", "uk_devon"],
    description: "유네스코 고대 로마 온천 도시 바스(Bath), 체다 치즈의 체다 협곡, 글래스톤베리 음악 페스티벌의 본고장입니다."
  },
  {
    id: "uk_wiltshire",
    name_kr: "윌트셔",
    name_en: "Wiltshire",
    level: "uk",
    lat: 51.3500,
    lng: -1.9000,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_berkshire", "uk_hampshire", "uk_dorset", "uk_somerset", "uk_gloucestershire", "uk_oxfordshire"],
    description: "인류 최대의 선사 시대 미스터리 스톤헨지(Stonehenge)와 에이브버리 거석군, 솔즈베리 대성당의 마그나카르타 원본이 보존된 곳입니다."
  },
  {
    id: "uk_dorset",
    name_kr: "도싯",
    name_en: "Dorset",
    level: "uk",
    lat: 50.7112,
    lng: -2.4373,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_hampshire", "uk_wiltshire", "uk_somerset", "uk_devon"],
    description: "쥐라기 공룡 화석이 출토되는 유네스코 쥐라기 해안(Jurassic Coast)과 천연 석회암 아치 더들 도어(Durdle Door)가 압권입니다."
  },
  {
    id: "uk_devon",
    name_kr: "데번",
    name_en: "Devon",
    level: "uk",
    lat: 50.7155,
    lng: -3.5309,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_somerset", "uk_dorset", "uk_cornwall"],
    description: "다트무어 국립공원의 야생 조랑말과 잉글리시 리비에라 해변, 클로티드 크림티의 원조로 사랑받는 서남부 휴양 카운티입니다."
  },
  {
    id: "uk_cornwall",
    name_kr: "콘월",
    name_en: "Cornwall",
    level: "uk",
    lat: 50.2660,
    lng: -5.0527,
    region_group: "잉글랜드 남부",
    neighbors: ["uk_devon"],
    description: "영국 본토 최남서단 랜즈엔드(Land's End)와 아서 왕 전설의 틴타겔 성, 온실 식물원 이든 프로젝트 및 서핑 해변이 펼쳐집니다."
  },

  // ==========================================
  // 2. 잉글랜드 북부/중부 (England North/Midlands - 25개)
  // ==========================================
  {
    id: "uk_northamptonshire",
    name_kr: "노샘프턴셔",
    name_en: "Northamptonshire",
    level: "uk",
    lat: 52.2405,
    lng: -0.9027,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_warwickshire", "uk_leicestershire", "uk_rutland", "uk_cambridgeshire", "uk_bedfordshire", "uk_buckinghamshire", "uk_oxfordshire"],
    description: "F1 모터스포츠의 성지 실버스톤 서킷과 전통 명품 수제화 제조의 중심지로 유명한 중부 내륙 카운티입니다."
  },
  {
    id: "uk_herefordshire",
    name_kr: "헤러퍼드셔",
    name_en: "Herefordshire",
    level: "uk",
    lat: 52.0564,
    lng: -2.7160,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_shropshire", "uk_worcestershire", "uk_gloucestershire", "uk_powys", "uk_monmouthshire"],
    description: "헤러퍼드 품종 소와 향긋한 사과 사이다(Cider), 중세 세계지도 마파 문디(Mappa Mundi)를 소장한 헤러퍼드 대성당이 있습니다."
  },
  {
    id: "uk_worcestershire",
    name_kr: "우스터셔",
    name_en: "Worcestershire",
    level: "uk",
    lat: 52.1936,
    lng: -2.2216,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_shropshire", "uk_staffordshire", "uk_west_midlands", "uk_warwickshire", "uk_gloucestershire", "uk_herefordshire"],
    description: "우스터소스(Worcestershire sauce)의 고향이자 음악가 에드워드 엘가의 생가, 몰번 힐스의 수려한 온천 구릉이 펼쳐집니다."
  },
  {
    id: "uk_warwickshire",
    name_kr: "워릭셔",
    name_en: "Warwickshire",
    level: "uk",
    lat: 52.2823,
    lng: -1.5849,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_west_midlands", "uk_worcestershire", "uk_staffordshire", "uk_leicestershire", "uk_northamptonshire", "uk_oxfordshire", "uk_gloucestershire"],
    description: "대문호 셰익스피어의 고향 스트랫퍼드어폰에이번과 천년 요새 워릭 성(Warwick Castle)이 자리한 낭만적인 중부 주입니다."
  },
  {
    id: "uk_west_midlands",
    name_kr: "웨스트미들랜즈",
    name_en: "West Midlands",
    level: "uk",
    lat: 52.4862,
    lng: -1.8904,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_warwickshire", "uk_worcestershire", "uk_staffordshire", "uk_shropshire"],
    description: "영국 제2의 대도시 버밍엄과 산업혁명의 발상지. 불링 쇼핑센터, 블랙컨트리 유산 및 재규어 랜드로버 본사가 자리합니다."
  },
  {
    id: "uk_staffordshire",
    name_kr: "스태퍼드셔",
    name_en: "Staffordshire",
    level: "uk",
    lat: 52.8067,
    lng: -2.1172,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_west_midlands", "uk_warwickshire", "uk_derbyshire", "uk_cheshire", "uk_shropshire", "uk_worcestershire"],
    description: "세계적 도자기 명가 웨지우드(Wedgwood)의 포터리스(The Potteries)와 스토크온트렌트, 올턴 타워스 테마파크가 위치합니다."
  },
  {
    id: "uk_shropshire",
    name_kr: "슈롭셔",
    name_en: "Shropshire",
    level: "uk",
    lat: 52.7073,
    lng: -2.7553,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_cheshire", "uk_staffordshire", "uk_worcestershire", "uk_herefordshire", "uk_powys", "uk_wrexham"],
    description: "인류 최초의 철교 아이언브리지 협곡(유네스코)과 찰스 다윈의 출생지 슈루즈베리가 있는 산업혁명의 요람입니다."
  },
  {
    id: "uk_derbyshire",
    name_kr: "더비셔",
    name_en: "Derbyshire",
    level: "uk",
    lat: 53.1500,
    lng: -1.6000,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_nottinghamshire", "uk_leicestershire", "uk_staffordshire", "uk_cheshire", "uk_greater_manchester", "uk_west_yorkshire", "uk_south_yorkshire"],
    description: "영국 최초의 국립공원 피크 디스트릭트(Peak District)의 웅장한 바위산과 챗즈워스 하우스(오만과 편견 촬영지)로 유명합니다."
  },
  {
    id: "uk_nottinghamshire",
    name_kr: "노팅엄셔",
    name_en: "Nottinghamshire",
    level: "uk",
    lat: 53.1000,
    lng: -1.0000,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_derbyshire", "uk_leicestershire", "uk_lincolnshire", "uk_south_yorkshire"],
    description: "의적 로빈 후드의 전설이 깃든 셔우드 숲과 노팅엄 고성, 유서 깊은 레이스 산업과 노팅엄 대학교가 위치합니다."
  },
  {
    id: "uk_leicestershire",
    name_kr: "레스터셔",
    name_en: "Leicestershire",
    level: "uk",
    lat: 52.6369,
    lng: -1.1398,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_nottinghamshire", "uk_derbyshire", "uk_staffordshire", "uk_warwickshire", "uk_northamptonshire", "uk_rutland", "uk_lincolnshire"],
    description: "리처드 3세 국왕의 유골이 발견된 레스터와 레드 레스터 치즈의 고향이자 프리미어리그 동화 우승의 레스터 시티 FC 연고지입니다."
  },
  {
    id: "uk_rutland",
    name_kr: "러틀랜드",
    name_en: "Rutland",
    level: "uk",
    lat: 52.6667,
    lng: -0.6333,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_leicestershire", "uk_lincolnshire", "uk_northamptonshire"],
    description: "잉글랜드에서 가장 작은 역사적 카운티로 거대한 인공 호수 러틀랜드 워터와 물수리 조류 보호구역으로 유명합니다."
  },
  {
    id: "uk_lincolnshire",
    name_kr: "링컨셔",
    name_en: "Lincolnshire",
    level: "uk",
    lat: 53.2307,
    lng: -0.5406,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_nottinghamshire", "uk_leicestershire", "uk_rutland", "uk_south_yorkshire", "uk_east_riding"],
    description: "중세 200년 동안 세계 최고 높이였던 링컨 대성당과 아이작 뉴턴의 생가 울스소프 매너가 있는 농업 중심 카운티입니다."
  },
  {
    id: "uk_cheshire",
    name_kr: "체셔",
    name_en: "Cheshire",
    level: "uk",
    lat: 53.1905,
    lng: -2.8916,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_merseyside", "uk_greater_manchester", "uk_derbyshire", "uk_staffordshire", "uk_shropshire", "uk_flintshire", "uk_wrexham"],
    description: "로마 성벽과 독특한 목조 2층 상가 '로우스(Rows)'가 보존된 체스터, 체셔 고양이의 기원이 된 풍요로운 평원 지대입니다."
  },
  {
    id: "uk_greater_manchester",
    name_kr: "그레이터맨체스터",
    name_en: "Greater Manchester",
    level: "uk",
    lat: 53.4808,
    lng: -2.2426,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_cheshire", "uk_merseyside", "uk_lancashire", "uk_west_yorkshire", "uk_derbyshire"],
    description: "세계 최초의 산업 도시이자 축구 명가 맨체스터 유나이티드·맨체스터 시티, 오아시스의 음악 유산이 살아 숨쉬는 북부 중심지입니다."
  },
  {
    id: "uk_merseyside",
    name_kr: "머지사이드",
    name_en: "Merseyside",
    level: "uk",
    lat: 53.4084,
    lng: -2.9916,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_greater_manchester", "uk_cheshire", "uk_lancashire"],
    description: "전설적인 밴드 비틀스(The Beatles)의 고향 리버풀과 로열 앨버트 독, 안필드 스타디움의 열정이 빛나는 유서 깊은 항구 도시입니다."
  },
  {
    id: "uk_lancashire",
    name_kr: "랭커셔",
    name_en: "Lancashire",
    level: "uk",
    lat: 53.7632,
    lng: -2.7031,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_merseyside", "uk_greater_manchester", "uk_west_yorkshire", "uk_north_yorkshire", "uk_cumbria"],
    description: "붉은 장미의 가문 랭커스터와 프레스턴, 서해안의 대표 해변 테마파크 도시 블랙풀(Blackpool)이 위치합니다."
  },
  {
    id: "uk_south_yorkshire",
    name_kr: "사우스요크셔",
    name_en: "South Yorkshire",
    level: "uk",
    lat: 53.3811,
    lng: -1.4701,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_west_yorkshire", "uk_north_yorkshire", "uk_east_riding", "uk_lincolnshire", "uk_nottinghamshire", "uk_derbyshire"],
    description: "스테인리스강을 탄생시킨 '철강의 도시' 셰필드와 피크 디스트릭트 경계의 아름다운 자연을 품은 역동적인 산업 도시주입니다."
  },
  {
    id: "uk_west_yorkshire",
    name_kr: "웨스트요크셔",
    name_en: "West Yorkshire",
    level: "uk",
    lat: 53.8008,
    lng: -1.5491,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_greater_manchester", "uk_lancashire", "uk_north_yorkshire", "uk_south_yorkshire", "uk_derbyshire"],
    description: "금융·상업 도시 리즈(Leeds)와 브론테 자매의 하워스 무어랜드, 헨리 무어 조각 공원이 위치한 요크셔의 핵심부입니다."
  },
  {
    id: "uk_north_yorkshire",
    name_kr: "노스요크셔",
    name_en: "North Yorkshire",
    level: "uk",
    lat: 53.9599,
    lng: -1.0873,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_west_yorkshire", "uk_south_yorkshire", "uk_east_riding", "uk_durham", "uk_cumbria", "uk_lancashire"],
    description: "웅장한 고딕 양식 요크 민스터 대성당과 바이킹 유적 요크(York), 요크셔 데일스 및 무어스 국립공원의 장엄한 자연을 자랑합니다."
  },
  {
    id: "uk_east_riding",
    name_kr: "이스트라이딩",
    name_en: "East Riding of Yorkshire",
    level: "uk",
    lat: 53.8427,
    lng: -0.4287,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_north_yorkshire", "uk_south_yorkshire", "uk_hull", "uk_lincolnshire"],
    description: "베벌리 민스터와 험버강 하구의 플램버러 헤드 백악질 절벽, 고요한 요크셔 월즈의 전원 풍경이 펼쳐지는 카운티입니다."
  },
  {
    id: "uk_hull",
    name_kr: "킹스턴어폰헐",
    name_en: "Kingston upon Hull",
    level: "uk",
    lat: 53.7457,
    lng: -0.3367,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_east_riding"],
    description: "유럽 최대 수족관 '더 딥(The Deep)'과 험버 브리지, 노예제 폐지 운동가 윌리엄 윌버포스의 고향인 북해 항구 도시입니다."
  },
  {
    id: "uk_cumbria",
    name_kr: "컴브리아",
    name_en: "Cumbria",
    level: "uk",
    lat: 54.4609,
    lng: -3.0886,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_lancashire", "uk_north_yorkshire", "uk_durham", "uk_northumberland", "uk_dumfries_and_galloway", "uk_scottish_borders"],
    description: "영국 최대의 자연 명소 레이크 디스트릭트(호수 지방)와 피터 래빗의 고향, 잉글랜드 최고봉 스카펠 파이크가 자리합니다."
  },
  {
    id: "uk_durham",
    name_kr: "더럼",
    name_en: "County Durham",
    level: "uk",
    lat: 54.7761,
    lng: -1.5733,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_tyne_and_wear", "uk_northumberland", "uk_cumbria", "uk_north_yorkshire"],
    description: "유네스코 세계유산 노르만 양식 더럼 대성당과 유서 깊은 더럼 대학교, 석탄 광산 유산의 비미시 박물관이 유명합니다."
  },
  {
    id: "uk_tyne_and_wear",
    name_kr: "타인위어",
    name_en: "Tyne and Wear",
    level: "uk",
    lat: 54.9783,
    lng: -1.6178,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_northumberland", "uk_durham"],
    description: "타인강의 밀레니엄 브리지와 뉴캐슬어폰타인, 앤서니 곰리의 거대 철제 조각상 '북방의 천사(Angel of the North)'가 우뚝 서 있습니다."
  },
  {
    id: "uk_northumberland",
    name_kr: "노섬벌랜드",
    name_en: "Northumberland",
    level: "uk",
    lat: 55.2000,
    lng: -2.0000,
    region_group: "잉글랜드 북부/중부",
    neighbors: ["uk_tyne_and_wear", "uk_durham", "uk_cumbria", "uk_scottish_borders"],
    description: "로마 제국의 북쪽 국경 하드리아누스 성벽(Hadrian's Wall)과 해리 포터의 호그와트 성으로 등장한 안위크 성(Alnwick Castle)이 있습니다."
  },

  // ==========================================
  // 3. 스코틀랜드 (Scotland - 32개)
  // ==========================================
  {
    id: "uk_edinburgh",
    name_kr: "에든버러",
    name_en: "City of Edinburgh",
    level: "uk",
    lat: 55.9533,
    lng: -3.1883,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_fife", "uk_west_lothian", "uk_midlothian", "uk_east_lothian", "uk_scottish_borders"],
    description: "스코틀랜드의 고도이자 수도. 사화산 위에 솟은 에든버러 성, 로열 마일, 프린세스 스트리트 및 세계 최대 프린지 페스티벌의 무대입니다."
  },
  {
    id: "uk_glasgow",
    name_kr: "글래스고",
    name_en: "Glasgow",
    level: "uk",
    lat: 55.8642,
    lng: -4.2518,
    region_group: "스코틀랜드",
    neighbors: ["uk_edinburgh", "uk_south_lanarkshire", "uk_north_lanarkshire", "uk_renfrewshire", "uk_east_dunbartonshire", "uk_west_dunbartonshire", "uk_stirling"],
    description: "스코틀랜드 최대의 경제·음악 도시. 찰스 레니 매킨토시의 아르누보 건축, 켈빈그로브 미술관과 열정적인 축구 올드팜 더비의 도시입니다."
  },
  {
    id: "uk_aberdeen",
    name_kr: "애버딘",
    name_en: "Aberdeen City",
    level: "uk",
    lat: 57.1497,
    lng: -2.0943,
    region_group: "스코틀랜드",
    neighbors: ["uk_aberdeenshire"],
    description: "북해 유전 에너지 수도이자 화강암 건축물들이 은빛으로 빛나는 스코틀랜드 제3의 도시 '실버 시티(Silver City)'입니다."
  },
  {
    id: "uk_aberdeenshire",
    name_kr: "애버딘셔",
    name_en: "Aberdeenshire",
    level: "uk",
    lat: 57.2869,
    lng: -2.3816,
    region_group: "스코틀랜드",
    neighbors: ["uk_aberdeen", "uk_highlands", "uk_moray", "uk_angus"],
    description: "영국 왕실의 여름 휴양지 밸모럴 성(Balmoral Castle)과 던노타 성의 절벽 요새가 장관을 이루는 동북부 카운티입니다."
  },
  {
    id: "uk_dundee",
    name_kr: "던디",
    name_en: "Dundee",
    level: "uk",
    lat: 56.4620,
    lng: -2.9707,
    region_group: "스코틀랜드",
    neighbors: ["uk_angus", "uk_perth_and_kinross", "uk_fife"],
    description: "영국 유일의 유네스코 디자인 도시. 테이강 연안의 빅토리아 앤 앨버트(V&A) 디자인 뮤지엄과 디스커버리 남극 탐험선이 있습니다."
  },
  {
    id: "uk_fife",
    name_kr: "파이프",
    name_en: "Fife",
    level: "uk",
    lat: 56.2500,
    lng: -3.1500,
    region_group: "스코틀랜드",
    neighbors: ["uk_edinburgh", "uk_dundee", "uk_perth_and_kinross", "uk_clackmannanshire"],
    description: "골프의 발상지 세인트앤드루스 올드 코스(Old Course)와 명문 세인트앤드루스 대학교, 포스 철교(Forth Bridge)가 자리합니다."
  },
  {
    id: "uk_highlands",
    name_kr: "하이랜드",
    name_en: "Highland",
    level: "uk",
    lat: 57.4778,
    lng: -4.2247,
    region_group: "스코틀랜드",
    neighbors: ["uk_aberdeenshire", "uk_moray", "uk_perth_and_kinross", "uk_argyll_and_bute", "uk_outer_hebrides", "uk_orkney"],
    description: "네스호(Loch Ness)의 전설, 글렌코 협곡, 영국 최고봉 벤네비스(Ben Nevis) 및 환상적인 스카이섬(Isle of Skye)이 펼쳐진 대자연입니다."
  },
  {
    id: "uk_moray",
    name_kr: "모리",
    name_en: "Moray",
    level: "uk",
    lat: 57.6500,
    lng: -3.3167,
    region_group: "스코틀랜드",
    neighbors: ["uk_highlands", "uk_aberdeenshire"],
    description: "세계 스카치위스키 생산의 절반 이상을 차지하는 스페이사이드(Speyside) 몰트위스키 양조 트레일의 중심지입니다."
  },
  {
    id: "uk_angus",
    name_kr: "앵거스",
    name_en: "Angus",
    level: "uk",
    lat: 56.6700,
    lng: -2.8900,
    region_group: "스코틀랜드",
    neighbors: ["uk_aberdeenshire", "uk_dundee", "uk_perth_and_kinross"],
    description: "글래미스 성(셰익스피어 맥베스의 배경)과 블랙 앵거스 소의 원산지이자 아브로스 훈제 대구(Smokie)로 유명합니다."
  },
  {
    id: "uk_perth_and_kinross",
    name_kr: "퍼스킨로스",
    name_en: "Perth and Kinross",
    level: "uk",
    lat: 56.3950,
    lng: -3.4308,
    region_group: "스코틀랜드",
    neighbors: ["uk_highlands", "uk_aberdeenshire", "uk_angus", "uk_dundee", "uk_fife", "uk_clackmannanshire", "uk_stirling"],
    description: "스코틀랜드 국왕들의 대관식 장소였던 스콘 궁전(Scone Palace)과 스콘의 돌, 테이강 유역의 아름다운 자연을 품고 있습니다."
  },
  {
    id: "uk_stirling",
    name_kr: "스털링",
    name_en: "Stirling",
    level: "uk",
    lat: 56.1165,
    lng: -3.9369,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_perth_and_kinross", "uk_argyll_and_bute", "uk_falkirk", "uk_clackmannanshire"],
    description: "스코틀랜드 독립 영웅 윌리엄 월리스 기념탑과 배넉번 전투 현장, 암벽 위의 웅장한 스털링 성이 내려다보는 역사의 관문입니다."
  },
  {
    id: "uk_falkirk",
    name_kr: "폴커크",
    name_en: "Falkirk",
    level: "uk",
    lat: 56.0019,
    lng: -3.7839,
    region_group: "스코틀랜드",
    neighbors: ["uk_stirling", "uk_clackmannanshire", "uk_west_lothian", "uk_north_lanarkshire"],
    description: "세계 유일의 회전식 선박 리프트 '폴커크 휠(Falkirk Wheel)'과 거대 신화 속 말 조각상 '더 켈피스(The Kelpies)'가 있습니다."
  },
  {
    id: "uk_clackmannanshire",
    name_kr: "클라크매넌셔",
    name_en: "Clackmannanshire",
    level: "uk",
    lat: 56.1333,
    lng: -3.7500,
    region_group: "스코틀랜드",
    neighbors: ["uk_stirling", "uk_perth_and_kinross", "uk_fife", "uk_falkirk"],
    description: "스코틀랜드에서 가장 작은 카운티이자 오칠 힐스(Ochil Hills) 기슭의 중세 캐슬 캠벨과 유서 깊은 모직 방적 유산이 있습니다."
  },
  {
    id: "uk_west_lothian",
    name_kr: "웨스트로디언",
    name_en: "West Lothian",
    level: "uk",
    lat: 55.9000,
    lng: -3.5000,
    region_group: "스코틀랜드",
    neighbors: ["uk_edinburgh", "uk_falkirk", "uk_midlothian", "uk_north_lanarkshire", "uk_south_lanarkshire"],
    description: "스코틀랜드 여왕 메리 스튜어트가 탄생한 린리스고 궁전(Linlithgow Palace)과 리빙스턴 신도시가 있는 중부 요충지입니다."
  },
  {
    id: "uk_midlothian",
    name_kr: "미들로디언",
    name_en: "Midlothian",
    level: "uk",
    lat: 55.8333,
    lng: -3.1000,
    region_group: "스코틀랜드",
    neighbors: ["uk_edinburgh", "uk_west_lothian", "uk_east_lothian", "uk_scottish_borders"],
    description: "다빈치 코드의 미스터리 무대인 정교한 석조 조각의 로슬린 예배당(Rosslyn Chapel)과 펜틀랜드 힐스가 위치합니다."
  },
  {
    id: "uk_east_lothian",
    name_kr: "이스트로디언",
    name_en: "East Lothian",
    level: "uk",
    lat: 55.9500,
    lng: -2.7833,
    region_group: "스코틀랜드",
    neighbors: ["uk_edinburgh", "uk_midlothian", "uk_scottish_borders"],
    description: "포스 만 남쪽 해안을 따라 골프 코스 '뮤어필드(Muirfield)'와 탄탈론 고성, 바스 록의 거대한 가넷 바닷새 군락지가 있습니다."
  },
  {
    id: "uk_scottish_borders",
    name_kr: "스코티시보더스",
    name_en: "Scottish Borders",
    level: "uk",
    lat: 55.6000,
    lng: -2.8000,
    region_group: "스코틀랜드",
    neighbors: ["uk_edinburgh", "uk_midlothian", "uk_east_lothian", "uk_dumfries_and_galloway", "uk_south_lanarkshire", "uk_northumberland", "uk_cumbria"],
    description: "잉글랜드와의 국경 지대로 멜로즈 수도원과 소설가 월터 스콧 경의 애버츠퍼드 하우스, 고요한 트위드강 계곡이 흐릅니다."
  },
  {
    id: "uk_dumfries_and_galloway",
    name_kr: "덤프리스갤로웨이",
    name_en: "Dumfries and Galloway",
    level: "uk",
    lat: 55.0709,
    lng: -3.6053,
    region_group: "스코틀랜드",
    neighbors: ["uk_scottish_borders", "uk_south_lanarkshire", "uk_east_ayrshire", "uk_south_ayrshire", "uk_cumbria"],
    description: "스코틀랜드 국민 시인 로버트 번스의 생애 마지막 안식처와 삼각형 삼각 성곽 칼라버록 성, 갤로웨이 삼림공원이 있습니다."
  },
  {
    id: "uk_south_lanarkshire",
    name_kr: "사우스라나크셔",
    name_en: "South Lanarkshire",
    level: "uk",
    lat: 55.6000,
    lng: -3.8000,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_north_lanarkshire", "uk_west_lothian", "uk_scottish_borders", "uk_dumfries_and_galloway", "uk_east_ayrshire"],
    description: "유네스코 산업 유산 유토피아 방적촌 뉴 래너크(New Lanark)와 클라이드 폭포의 절경이 있는 라나크셔 남부입니다."
  },
  {
    id: "uk_north_lanarkshire",
    name_kr: "노스라나크셔",
    name_en: "North Lanarkshire",
    level: "uk",
    lat: 55.8500,
    lng: -3.9500,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_south_lanarkshire", "uk_falkirk", "uk_west_lothian", "uk_east_dunbartonshire"],
    description: "스코틀랜드 철강 및 중공업의 역사적 중심지인 마더웰과 쿰버놀드, 스트라스클라이드 컨트리 파크가 위치합니다."
  },
  {
    id: "uk_east_dunbartonshire",
    name_kr: "이스트던바턴셔",
    name_en: "East Dunbartonshire",
    level: "uk",
    lat: 55.9333,
    lng: -4.2000,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_west_dunbartonshire", "uk_stirling", "uk_north_lanarkshire"],
    description: "하이랜드 하이킹의 출발점 밀른가비(Milngavie)와 로마 안토니누스 성벽 유적이 통과하는 쾌적한 전원 지역입니다."
  },
  {
    id: "uk_west_dunbartonshire",
    name_kr: "웨스트던바턴셔",
    name_en: "West Dunbartonshire",
    level: "uk",
    lat: 55.9500,
    lng: -4.5667,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_east_dunbartonshire", "uk_stirling", "uk_argyll_and_bute", "uk_renfrewshire"],
    description: "화산암 암벽 위의 덤바턴 고성과 로몬드 호수 남쪽 기슭의 관문 도시 발로크(Balloch)가 위치합니다."
  },
  {
    id: "uk_renfrewshire",
    name_kr: "렌프루셔",
    name_en: "Renfrewshire",
    level: "uk",
    lat: 55.8500,
    lng: -4.4333,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_east_renfrewshire", "uk_inverclyde", "uk_north_ayrshire"],
    description: "세계적인 페이즐리 패턴(Paisley) 직물의 본산 페이즐리 수도원과 글래스고 국제공항이 위치한 교통의 요충지입니다."
  },
  {
    id: "uk_east_renfrewshire",
    name_kr: "이스트렌프루셔",
    name_en: "East Renfrewshire",
    level: "uk",
    lat: 55.7833,
    lng: -4.3167,
    region_group: "스코틀랜드",
    neighbors: ["uk_glasgow", "uk_renfrewshire", "uk_south_lanarkshire", "uk_east_ayrshire", "uk_north_ayrshire"],
    description: "글래스고 남서부의 우수한 교육 환경과 루거런 공원, 그린뱅크 정원의 전원 풍경을 자랑하는 주거 지역입니다."
  },
  {
    id: "uk_inverclyde",
    name_kr: "인버클라이드",
    name_en: "Inverclyde",
    level: "uk",
    lat: 55.9500,
    lng: -4.7500,
    region_group: "스코틀랜드",
    neighbors: ["uk_renfrewshire", "uk_north_ayrshire", "uk_argyll_and_bute"],
    description: "증기기관의 아버지 제임스 와트의 출생지 그리녹(Greenock)과 클라이드강 하구의 대형 크루즈선 터미널이 위치합니다."
  },
  {
    id: "uk_north_ayrshire",
    name_kr: "노스에어셔",
    name_en: "North Ayrshire",
    level: "uk",
    lat: 55.6667,
    lng: -4.7500,
    region_group: "스코틀랜드",
    neighbors: ["uk_south_ayrshire", "uk_east_ayrshire", "uk_renfrewshire", "uk_east_renfrewshire", "uk_inverclyde", "uk_argyll_and_bute"],
    description: "스코틀랜드 축소판이라 불리는 아란 섬(Isle of Arran)과 브로딕 성, 클라이드 만 해안의 아름다운 휴양지입니다."
  },
  {
    id: "uk_south_ayrshire",
    name_kr: "사우스에어셔",
    name_en: "South Ayrshire",
    level: "uk",
    lat: 55.4500,
    lng: -4.6333,
    region_group: "스코틀랜드",
    neighbors: ["uk_north_ayrshire", "uk_east_ayrshire", "uk_dumfries_and_galloway"],
    description: "로버트 번스의 탄생지 얼로웨이와 절벽 위의 쿨진 성(Culzean Castle), 명문 골프 코스 턴베리가 있는 서남부 해안입니다."
  },
  {
    id: "uk_east_ayrshire",
    name_kr: "이스트에어셔",
    name_en: "East Ayrshire",
    level: "uk",
    lat: 55.5000,
    lng: -4.3000,
    region_group: "스코틀랜드",
    neighbors: ["uk_north_ayrshire", "uk_south_ayrshire", "uk_south_lanarkshire", "uk_dumfries_and_galloway", "uk_east_renfrewshire"],
    description: "세계 최대 스카치위스키 브랜드 조니 워커(Johnnie Walker)의 탄생지 킬마녹과 딘 캐슬 컨트리 파크가 있습니다."
  },
  {
    id: "uk_argyll_and_bute",
    name_kr: "아가일뷰트",
    name_en: "Argyll and Bute",
    level: "uk",
    lat: 56.1000,
    lng: -5.3000,
    region_group: "스코틀랜드",
    neighbors: ["uk_highlands", "uk_stirling", "uk_west_dunbartonshire", "uk_inverclyde", "uk_north_ayrshire"],
    description: "싱글몰트 위스키의 성지 아일라(Islay) 섬과 로몬드 호수, 서해안 피오르 해안선의 수려한 섬들이 모여 있는 곳입니다."
  },
  {
    id: "uk_orkney",
    name_kr: "오크니제도",
    name_en: "Orkney Islands",
    level: "uk",
    lat: 58.9809,
    lng: -2.9605,
    region_group: "스코틀랜드",
    neighbors: ["uk_highlands", "uk_shetland"],
    description: "유네스코 신석기 유적 스카라 브레(Skara Brae)와 스텐네스 거석, 스캐퍼플로 해군 기지 유적을 품은 북방의 고대 군도입니다."
  },
  {
    id: "uk_shetland",
    name_kr: "셰틀랜드제도",
    name_en: "Shetland Islands",
    level: "uk",
    lat: 60.1530,
    lng: -1.1493,
    region_group: "스코틀랜드",
    neighbors: ["uk_orkney"],
    description: "영국 최북단의 노르웨이 바이킹 문화권 군도. 셰틀랜드 포니 조랑말, 업 헬리 아 불꽃 축제, 북해 바닷새의 낙원입니다."
  },
  {
    id: "uk_outer_hebrides",
    name_kr: "아우터헤브리디스",
    name_en: "Outer Hebrides",
    level: "uk",
    lat: 58.2094,
    lng: -6.3849,
    region_group: "스코틀랜드",
    neighbors: ["uk_highlands"],
    description: "스코틀랜드 게일어 문화의 본산이자 칼라니시 거석군(Callanish Stones), 해리스 트위드 모직물과 백사장이 펼쳐진 서부 군도입니다."
  },

  // ==========================================
  // 4. 웨일스 (Wales - 16개)
  // ==========================================
  {
    id: "uk_cardiff",
    name_kr: "카디프",
    name_en: "Cardiff",
    level: "uk",
    lat: 51.4816,
    lng: -3.1791,
    region_group: "웨일스",
    neighbors: ["uk_newport", "uk_vale_of_glamorgan", "uk_bridgend"],
    description: "웨일스의 수도이자 항구 도시. 카디프 성, 웨일스 밀레니엄 센터, 럭비의 성지 프린시펄리티 스타디움이 위치합니다."
  },
  {
    id: "uk_swansea",
    name_kr: "스완지",
    name_en: "Swansea",
    level: "uk",
    lat: 51.6214,
    lng: -3.9436,
    region_group: "웨일스",
    neighbors: ["uk_carmarthenshire", "uk_neath_port_talbot"],
    description: "시인 딜런 토머스의 고향이자 영국 최초의 '뛰어난 자연경관 지역(AONB)'으로 지정된 가워 반도(Gower Peninsula)의 관문입니다."
  },
  {
    id: "uk_newport",
    name_kr: "뉴포트",
    name_en: "Newport",
    level: "uk",
    lat: 51.5842,
    lng: -2.9977,
    region_group: "웨일스",
    neighbors: ["uk_cardiff", "uk_vale_of_glamorgan", "uk_monmouthshire"],
    description: "로마 군단 기지 카를레온(Caerleon)과 세계에 몇 남지 않은 뉴포트 운반교(Transporter Bridge)가 있는 남동 웨일스의 관문입니다."
  },
  {
    id: "uk_wrexham",
    name_kr: "렉섬",
    name_en: "Wrexham",
    level: "uk",
    lat: 53.0430,
    lng: -2.9925,
    region_group: "웨일스",
    neighbors: ["uk_flintshire", "uk_denbighshire", "uk_powys", "uk_cheshire", "uk_shropshire"],
    description: "유네스코 세계유산 폰트치실터 수도교(Pontcysyllte Aqueduct)와 라이언 레이놀즈의 렉섬 AFC 축구 신화로 유명한 북동부 중심지입니다."
  },
  {
    id: "uk_flintshire",
    name_kr: "플린트셔",
    name_en: "Flintshire",
    level: "uk",
    lat: 53.2333,
    lng: -3.1333,
    region_group: "웨일스",
    neighbors: ["uk_wrexham", "uk_denbighshire", "uk_cheshire"],
    description: "디강 하구의 플린트 고성과 성 위니프레드 성지 샘물(Holywell), 항공기 날개 제조의 첨단 산업 카운티입니다."
  },
  {
    id: "uk_denbighshire",
    name_kr: "덴비셔",
    name_en: "Denbighshire",
    level: "uk",
    lat: 53.1833,
    lng: -3.4167,
    region_group: "웨일스",
    neighbors: ["uk_conwy", "uk_flintshire", "uk_wrexham", "uk_powys", "uk_gwynedd"],
    description: "클루이드 계곡의 비옥한 전원 풍경과 랑골렌 국제 뮤지컬 아이스테드포드 페스티벌, 덴비 고성이 자리합니다."
  },
  {
    id: "uk_conwy",
    name_kr: "콘위",
    name_en: "Conwy",
    level: "uk",
    lat: 53.2800,
    lng: -3.8300,
    region_group: "웨일스",
    neighbors: ["uk_gwynedd", "uk_denbighshire"],
    description: "에드워드 1세의 웅장한 콘위 성(유네스코)과 성곽 도시, 영국에서 가장 작은 집과 빅토리아풍 해변 리조트 란디드노가 있습니다."
  },
  {
    id: "uk_gwynedd",
    name_kr: "귄에드",
    name_en: "Gwynedd",
    level: "uk",
    lat: 52.9000,
    lng: -3.9000,
    region_group: "웨일스",
    neighbors: ["uk_conwy", "uk_powys", "uk_ceredigion", "uk_anglesey", "uk_denbighshire"],
    description: "스노도니아 국립공원(Eryri)의 최고봉 스노든산과 유네스코 카나번 성(Caernarfon Castle), 웨일스어의 문화적 요람입니다."
  },
  {
    id: "uk_anglesey",
    name_kr: "앵글시섬",
    name_en: "Isle of Anglesey",
    level: "uk",
    lat: 53.2500,
    lng: -4.3500,
    region_group: "웨일스",
    neighbors: ["uk_gwynedd"],
    description: "메나이 현수교로 연결된 섬으로 홀리헤드 항구에서 아일랜드 더블린 페리가 출항하며 세계에서 가장 긴 지명 마을이 있습니다."
  },
  {
    id: "uk_powys",
    name_kr: "포위스",
    name_en: "Powys",
    level: "uk",
    lat: 52.3000,
    lng: -3.4000,
    region_group: "웨일스",
    neighbors: ["uk_gwynedd", "uk_ceredigion", "uk_carmarthenshire", "uk_shropshire", "uk_herefordshire", "uk_denbighshire", "uk_wrexham"],
    description: "웨일스 최대 면적의 카운티로 브레콘 비콘스(Brecon Beacons) 국립공원과 세계적인 책 마을 헤이온와이(Hay-on-Wye)가 자리합니다."
  },
  {
    id: "uk_ceredigion",
    name_kr: "케레디기온",
    name_en: "Ceredigion",
    level: "uk",
    lat: 52.2500,
    lng: -4.0000,
    region_group: "웨일스",
    neighbors: ["uk_gwynedd", "uk_powys", "uk_carmarthenshire", "uk_pembrokeshire"],
    description: "카디건 만의 돌고래 서식지와 국립웨일스도서관이 있는 대학 도시 애버리스트위스, 수려한 서부 해안선이 펼쳐집니다."
  },
  {
    id: "uk_pembrokeshire",
    name_kr: "펨브룩셔",
    name_en: "Pembrokeshire",
    level: "uk",
    lat: 51.8000,
    lng: -4.9000,
    region_group: "웨일스",
    neighbors: ["uk_carmarthenshire", "uk_ceredigion"],
    description: "영국 유일의 완전한 해안 국립공원(Pembrokeshire Coast)과 웨일스의 수호성인 세인트 데이비즈 대성당, 텐비 해변이 있습니다."
  },
  {
    id: "uk_carmarthenshire",
    name_kr: "카마던셔",
    name_en: "Carmarthenshire",
    level: "uk",
    lat: 51.8500,
    lng: -4.3000,
    region_group: "웨일스",
    neighbors: ["uk_pembrokeshire", "uk_ceredigion", "uk_powys", "uk_swansea", "uk_neath_port_talbot"],
    description: "아서 왕의 마법사 멀린의 고향 카마던과 국립웨일스식물원, 펜딘 샌즈의 황금빛 모래사장이 펼쳐집니다."
  },
  {
    id: "uk_neath_port_talbot",
    name_kr: "니스포트탤벗",
    name_en: "Neath Port Talbot",
    level: "uk",
    lat: 51.6500,
    lng: -3.7833,
    region_group: "웨일스",
    neighbors: ["uk_swansea", "uk_carmarthenshire", "uk_bridgend"],
    description: "배우 안소니 홉킨스의 고향이자 마검 컨트리 파크와 웨일스 남부의 웅장한 폭포 계곡 '워터폴 컨트리'가 있습니다."
  },
  {
    id: "uk_bridgend",
    name_kr: "브리젠드",
    name_en: "Bridgend",
    level: "uk",
    lat: 51.5072,
    lng: -3.5786,
    region_group: "웨일스",
    neighbors: ["uk_neath_port_talbot", "uk_vale_of_glamorgan", "uk_cardiff"],
    description: "오그모어 해안 고성과 머서모어 모래언덕 국립자연보호구역, 카디프와 스완지를 잇는 교통의 허브입니다."
  },
  {
    id: "uk_vale_of_glamorgan",
    name_kr: "베일오브글래모건",
    name_en: "Vale of Glamorgan",
    level: "uk",
    lat: 51.4500,
    lng: -3.4000,
    region_group: "웨일스",
    neighbors: ["uk_cardiff", "uk_bridgend", "uk_newport"],
    description: "웨일스 본토 최남단 배리 아일랜드 해변과 글래모건 헤리티지 코스트의 웅장한 석회암 해안 절벽을 자랑합니다."
  },

  // ==========================================
  // 5. 북아일랜드 (Northern Ireland - 10개)
  // ==========================================
  {
    id: "uk_belfast",
    name_kr: "벨파스트",
    name_en: "Belfast",
    level: "uk",
    lat: 54.5973,
    lng: -5.9301,
    region_group: "북아일랜드",
    neighbors: ["uk_antrim", "uk_down", "uk_lisburn", "uk_bangor"],
    description: "북아일랜드의 수도. 타이타닉호가 건조된 타이타닉 벨파스트 박물관, 시청사, 퀸스 대학교와 화려한 평화 벽화들이 유명합니다."
  },
  {
    id: "uk_derry",
    name_kr: "데리런던데리",
    name_en: "Derry / Londonderry",
    level: "uk",
    lat: 54.9966,
    lng: -7.3086,
    region_group: "북아일랜드",
    neighbors: ["uk_tyrone", "uk_antrim"],
    description: "아일랜드 섬에서 유일하게 완전 보존된 17세기 성곽 도시. 평화의 다리(Peace Bridge)와 유서 깊은 포일강의 문화 도시입니다."
  },
  {
    id: "uk_lisburn",
    name_kr: "리스번",
    name_en: "Lisburn",
    level: "uk",
    lat: 54.5103,
    lng: -6.0425,
    region_group: "북아일랜드",
    neighbors: ["uk_belfast", "uk_antrim", "uk_down", "uk_armagh"],
    description: "아일랜드 전통 아마 리넨 방직 산업의 요람이자 라간 계곡의 수려한 자연을 품은 북아일랜드의 유서 깊은 도시입니다."
  },
  {
    id: "uk_antrim",
    name_kr: "앤트림",
    name_en: "County Antrim",
    level: "uk",
    lat: 54.8500,
    lng: -6.1500,
    region_group: "북아일랜드",
    neighbors: ["uk_belfast", "uk_down", "uk_derry", "uk_lisburn"],
    description: "유네스코 세계자연유산 주상절리 자이언츠 코즈웨이(Giant's Causeway)와 부시밀스 위스키 양조장, 캐릭어리드 출렁다리가 있습니다."
  },
  {
    id: "uk_down",
    name_kr: "다운",
    name_en: "County Down",
    level: "uk",
    lat: 54.3500,
    lng: -5.9000,
    region_group: "북아일랜드",
    neighbors: ["uk_belfast", "uk_antrim", "uk_armagh", "uk_lisburn", "uk_newry", "uk_bangor"],
    description: "모른 산맥(Mourne Mountains)의 웅장한 화강암 산봉우리들과 성 패트릭의 무덤이 있는 다운패트릭, 스트랭퍼드 호수가 위치합니다."
  },
  {
    id: "uk_armagh",
    name_kr: "아마",
    name_en: "County Armagh",
    level: "uk",
    lat: 54.3503,
    lng: -6.6528,
    region_group: "북아일랜드",
    neighbors: ["uk_down", "uk_tyrone", "uk_lisburn", "uk_newry"],
    description: "아일랜드 기독교의 영적 중심지이자 성 패트릭이 세운 두 개의 대성당, 과수원 사과밭으로 '사과의 도시'라 불립니다."
  },
  {
    id: "uk_tyrone",
    name_kr: "티론",
    name_en: "County Tyrone",
    level: "uk",
    lat: 54.6000,
    lng: -7.1000,
    region_group: "북아일랜드",
    neighbors: ["uk_derry", "uk_armagh", "uk_fermanagh"],
    description: "스페린 산맥(Sperrin Mountains)의 고요한 구릉과 얼스터 아메리칸 민속촌이 자리한 북아일랜드 중앙의 카운티입니다."
  },
  {
    id: "uk_fermanagh",
    name_kr: "퍼매너",
    name_en: "County Fermanagh",
    level: "uk",
    lat: 54.3500,
    lng: -7.6333,
    region_group: "북아일랜드",
    neighbors: ["uk_tyrone", "uk_armagh"],
    description: "상·하 에른 호수(Lough Erne)의 에메랄드빛 수로와 에니스킬린 성, 마블 아치 동굴 유네스코 지질공원이 있는 호수의 고장입니다."
  },
  {
    id: "uk_newry",
    name_kr: "뉴리",
    name_en: "Newry",
    level: "uk",
    lat: 54.1784,
    lng: -6.3374,
    region_group: "북아일랜드",
    neighbors: ["uk_down", "uk_armagh"],
    description: "모른 산맥과 링 오브 걸리언 사이에 자리 잡은 국경 관문 도시이자 성 패트릭 유적과 유서 깊은 운하가 흐릅니다."
  },
  {
    id: "uk_bangor",
    name_kr: "뱅고어",
    name_en: "Bangor",
    level: "uk",
    lat: 54.6600,
    lng: -5.6700,
    region_group: "북아일랜드",
    neighbors: ["uk_belfast", "uk_down"],
    description: "벨파스트 만 남쪽 입구의 아름다운 마리나 요트 항구와 6세기 고대 수도원 유적을 간직한 해안 휴양 도시입니다."
  }
];
