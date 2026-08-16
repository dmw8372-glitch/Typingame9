import { Region } from "../types";

export const GERMANY_LIST: Region[] = [
  // 1. 수도 및 도시주
  {
    id: "de_be",
    name_kr: "베를린",
    name_en: "Berlin",
    level: "germany",
    lat: 52.5200,
    lng: 13.4050,
    region_group: "동부",
    neighbors: ["de_bb"],
    description: "독일의 수도이자 브란덴부르크 문, 베를린 장벽 유적, 풍부한 문화와 예술을 품은 역동적인 메트로폴리스입니다."
  },
  {
    id: "de_hh",
    name_kr: "함부르크",
    name_en: "Hamburg",
    level: "germany",
    lat: 53.5511,
    lng: 9.9937,
    region_group: "북부",
    neighbors: ["de_sh", "de_ni"],
    description: "엘베강 하구의 독일 최대 항구 도시이자 창고 지구(슈파이허슈타트)와 엘프필하모니로 유명한 도시주입니다."
  },
  {
    id: "de_hb",
    name_kr: "브레멘",
    name_en: "Bremen",
    level: "germany",
    lat: 53.0793,
    lng: 8.8017,
    region_group: "북부",
    neighbors: ["de_ni"],
    description: "그림 형제의 브레멘 음악대 동상과 유네스코 롤란트 석상, 유서 깊은 한자동맹의 항구 도시주입니다."
  },

  // 2. 남부 독일
  {
    id: "de_by",
    name_kr: "바이에른",
    name_en: "Bavaria",
    level: "germany",
    lat: 48.1351,
    lng: 11.5820,
    region_group: "남부",
    neighbors: ["de_bw", "de_he", "de_th", "de_sn"],
    description: "독일 최대 면적의 주로 알프스 산맥, 노이슈반슈타인 성, 옥토버페스트와 뮌헨의 맥주 문화로 유명합니다."
  },
  {
    id: "de_bw",
    name_kr: "바덴뷔르템베르크",
    name_en: "Baden-Württemberg",
    level: "germany",
    lat: 48.7758,
    lng: 9.1829,
    region_group: "남부",
    neighbors: ["de_by", "de_he", "de_rp"],
    description: "검은 숲(슈바르츠발트)과 하이델베르크 고성, 메르세데스-벤츠와 포르쉐의 본고장 슈투트가르트가 위치합니다."
  },

  // 3. 서부 및 중부 독일
  {
    id: "de_nw",
    name_kr: "노르트라인베스트팔렌",
    name_en: "North Rhine-Westphalia",
    level: "germany",
    lat: 51.2277,
    lng: 6.7735,
    region_group: "서부",
    neighbors: ["de_ni", "de_he", "de_rp"],
    description: "독일 최대 인구 주로 웅장한 쾰른 대성당, 패션의 뒤셀도르프, 라인강변의 경제 중심지입니다."
  },
  {
    id: "de_he",
    name_kr: "헤센",
    name_en: "Hesse",
    level: "germany",
    lat: 50.1109,
    lng: 8.6821,
    region_group: "중부",
    neighbors: ["de_bw", "de_by", "de_th", "de_ni", "de_nw", "de_rp"],
    description: "유럽 금융의 심장 프랑크푸르트와 온천 도시 비스바덴, 괴테의 생가가 위치한 독일 교통의 허브입니다."
  },
  {
    id: "de_rp",
    name_kr: "라인란트팔츠",
    name_en: "Rhineland-Palatinate",
    level: "germany",
    lat: 49.9929,
    lng: 8.2473,
    region_group: "서부",
    neighbors: ["de_nw", "de_he", "de_bw", "de_sl"],
    description: "라인강 중류 계곡의 고성과 로렐라이 언덕, 세계적인 리슬링 와인 산지와 구텐베르크의 마인츠가 유명합니다."
  },
  {
    id: "de_sl",
    name_kr: "자를란트",
    name_en: "Saarland",
    level: "germany",
    lat: 49.2402,
    lng: 6.9969,
    region_group: "서부",
    neighbors: ["de_rp"],
    description: "프랑스와 국경을 접하며 자르강 루프(Saarschleife) 절경과 펠클링엔 제철소 유네스코 유산이 있는 주입니다."
  },

  // 4. 북부 독일
  {
    id: "de_ni",
    name_kr: "니더작센",
    name_en: "Lower Saxony",
    level: "germany",
    lat: 52.3759,
    lng: 9.7320,
    region_group: "북부",
    neighbors: ["de_sh", "de_hh", "de_mv", "de_bb", "de_st", "de_th", "de_he", "de_nw", "de_hb"],
    description: "북해 연안과 하르츠 산맥을 아우르며 산업 도시 하노버와 폭스바겐의 본거지 볼프스부르크가 위치합니다."
  },
  {
    id: "de_sh",
    name_kr: "슐레스비히홀슈타인",
    name_en: "Schleswig-Holstein",
    level: "germany",
    lat: 54.3233,
    lng: 10.1228,
    region_group: "북부",
    neighbors: ["de_hh", "de_ni", "de_mv"],
    description: "북해와 발트해 두 바다를 품은 독일 최북단 주로 킬 위크 요트 축제와 한자 도시 뤼베크가 있습니다."
  },
  {
    id: "de_mv",
    name_kr: "메클렌부르크포어포메른",
    name_en: "Mecklenburg-Vorpommern",
    level: "germany",
    lat: 53.6355,
    lng: 11.4012,
    region_group: "동북부",
    neighbors: ["de_sh", "de_ni", "de_bb"],
    description: "발트해의 아름다운 뤼겐 섬 백악 절벽과 천 개의 호수, 슈베린 성의 낭만을 간직한 청정 자연의 주입니다."
  },

  // 5. 동부 및 중동부 독일
  {
    id: "de_bb",
    name_kr: "브란덴부르크",
    name_en: "Brandenburg",
    level: "germany",
    lat: 52.4125,
    lng: 12.5316,
    region_group: "동부",
    neighbors: ["de_be", "de_mv", "de_st", "de_sn", "de_ni"],
    description: "베를린을 둘러싼 호수와 숲의 고장이자 유네스코 상수시 궁전이 위치한 포츠담의 주입니다."
  },
  {
    id: "de_sn",
    name_kr: "작센",
    name_en: "Saxony",
    level: "germany",
    lat: 51.0504,
    lng: 13.7373,
    region_group: "동부",
    neighbors: ["de_by", "de_th", "de_st", "de_bb"],
    description: "엘베강의 피렌체 드레스덴과 바흐·괴테의 음악 도시 라이프치히, 마이센 도자기가 찬란한 문화 주입니다."
  },
  {
    id: "de_st",
    name_kr: "작센안할트",
    name_en: "Saxony-Anhalt",
    level: "germany",
    lat: 52.1205,
    lng: 11.6276,
    region_group: "동부",
    neighbors: ["de_ni", "de_bb", "de_sn", "de_th"],
    description: "마르틴 루터의 종교개혁지 비텐베르크, 바우하우스 건축의 데사우, 마그데부르크 대성당이 있는 역사적 주입니다."
  },
  {
    id: "de_th",
    name_kr: "튀링겐",
    name_en: "Thuringia",
    level: "germany",
    lat: 50.9848,
    lng: 11.0299,
    region_group: "중부",
    neighbors: ["de_he", "de_by", "de_sn", "de_st", "de_ni"],
    description: "독일의 녹색 심장이라 불리는 숲의 고장이며 바이마르 고전문학과 바르트부르크 성, 에어푸르트가 있습니다."
  }
];
