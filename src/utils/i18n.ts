import { LanguageOption } from "../types";

export function sanitizeNameEn(nameEn: string): string {
  if (!nameEn) return "";
  return nameEn
    .replace(/-do|-si|-gun|-gu/gi, "") // strip Korean administrative suffix hyphens if present
    .replace(/[\s.,'"\-]+/g, ""); // strip spaces, dots, hyphens, quotes
}

export const uiTranslations: Record<LanguageOption, Record<string, string>> = {
  ko: {
    // App Header & Tabs
    appTitle: "타입트립",
    appSubtitle: "지리 지식과 타이핑을 결합한 전국/세계 여행 게임",
    singlePlayer: "싱글플레이",
    multiplayer: "멀티플레이",
    typingMode: "타이핑 코스",
    quizMode: "위치 퀴즈",
    sido: "광역 (17개 시도)",
    sigungu: "시군구 (228개)",
    world: "세계 지도 (200개국)",
    japan: "일본 (47개 도도부현)",
    usa: "미국 (50개 주)",
    china: "중국 (34개 성급)",
    vietnam: "베트남 (63개 성)",
    exploreMap: "전국지도 보기",
    guide: "가이드",
    leaderboard: "순위표",
    settings: "설정",
    restart: "다시 시작",
    startGame: "게임 시작",
    playAgain: "다시 하기",

    // Stats
    progress: "진행도",
    speed: "타수 (CPM)",
    accuracy: "정확도",
    errors: "오타",
    timeSpent: "소요 시간",
    remaining: "남은 지역",
    completed: "완료한 지역",
    avgSpeed: "평균 타수",
    maxSpeed: "최고 타수",
    totalErrors: "총 오타",
    totalTime: "총 소요시간",

    // Typing & Quiz Console
    prev: "이전",
    next: "다음",
    startStation: "시작 역",
    finalStation: "마지막 역",
    quizPrompt: "지도의 하이라이트된 지역의 이름을 입력하세요",
    hint: "힌트",
    chosungHint: "초성 힌트",
    typingPlaceholder: "지역 이름을 입력하고 Space/Enter 키를 누르세요",

    // Vehicles
    subway: "지하철",
    ktx: "KTX/SRT",
    bus: "고속버스",
    plane: "항공기",
    bicycle: "자전거",
    ferry: "선박",
    spaceship: "우주선",
    car: "자율주행 자동차",
    drone: "드론",
    balloon: "열기구",
    world_plane: "세계 비행기",
    submarine: "해저 탐사선",
    cruise: "유람선",

    // Settings Modal
    settingsTitle: "게임 설정",
    soundEffects: "사운드 효과",
    soundVolume: "효과음 음량",
    vehicleIcon: "탈것 아이콘",
    advanceMode: "어드밴스 모드",
    autoAdvance: "자동 완료",
    manualAdvance: "수동 제출 (Space/Enter)",
    strictMode: "엄격 모드",
    strictDesc: "오타 발생 시 입력을 진행할 수 없습니다.",
    languageSettings: "언어 설정",
    typingLanguage: "타이핑 언어",
    displayLanguage: "기본 글씨 표시 언어",
    mapColorMode: "지도 색상 모드",
    korean: "한국어",
    english: "영어",
    close: "닫기",

    // Completion / Results
    completionTitle: "완주 성공!",
    stampTourComplete: "스탬프 투어 완주 성공",
    congratsMsg: "모든 코스를 완벽하게 완주하였습니다!",
    saveImage: "이미지 저장",
    share: "공유하기",

    // Map explorer
    mapExplorerTitle: "전국 지도 탐색기",
    searchPlaceholder: "지역명 검색...",
    visited: "방문함",
    unvisited: "미방문",

    // Multiplayer
    roomCode: "방 코드",
    joinRoom: "방 참가",
    createRoom: "방 만들기",
    lobby: "대기실",
    players: "참여자",
    ready: "준비",
  },
  en: {
    // App Header & Tabs
    appTitle: "TypeTrip",
    appSubtitle: "Explore the world through interactive typing and geography quizzes",
    singlePlayer: "Single Player",
    multiplayer: "Multiplayer",
    typingMode: "Typing Mode",
    quizMode: "Map Quiz",
    sido: "Provinces (17)",
    sigungu: "Districts (228)",
    world: "World (200)",
    japan: "Japan (47)",
    usa: "USA (50)",
    china: "China (34)",
    vietnam: "Vietnam (63)",
    exploreMap: "Explore Map",
    guide: "Guide",
    leaderboard: "Leaderboard",
    settings: "Settings",
    restart: "Restart",
    startGame: "Start Game",
    playAgain: "Play Again",

    // Stats
    progress: "Progress",
    speed: "Speed (CPM)",
    accuracy: "Accuracy",
    errors: "Errors",
    timeSpent: "Time Spent",
    remaining: "Remaining",
    completed: "Completed",
    avgSpeed: "Avg Speed",
    maxSpeed: "Max Speed",
    totalErrors: "Total Errors",
    totalTime: "Total Time",

    // Typing & Quiz Console
    prev: "Prev",
    next: "Next",
    startStation: "Start Station",
    finalStation: "Final Station",
    quizPrompt: "Enter the name of the highlighted region on the map",
    hint: "Hint",
    chosungHint: "First Consonants",
    typingPlaceholder: "Type region name and press Space/Enter",

    // Vehicles
    subway: "Subway",
    ktx: "Express Train",
    bus: "Express Bus",
    plane: "Airplane",
    bicycle: "Bicycle",
    ferry: "Ferry",
    spaceship: "Spaceship",
    car: "Autonomous Car",
    drone: "Drone",
    balloon: "Hot Air Balloon",
    world_plane: "World Flight",
    submarine: "Submarine",
    cruise: "Cruise Ship",

    // Settings Modal
    settingsTitle: "Game Settings",
    soundEffects: "Sound Effects",
    soundVolume: "Sound Volume",
    vehicleIcon: "Vehicle Avatar",
    advanceMode: "Advance Mode",
    autoAdvance: "Auto Advance",
    manualAdvance: "Manual Submit (Space/Enter)",
    strictMode: "Strict Mode",
    strictDesc: "Typing stops when an error occurs until corrected.",
    languageSettings: "Language Settings",
    typingLanguage: "Typing Target Language",
    displayLanguage: "UI Display Language",
    mapColorMode: "Map Color Theme",
    korean: "Korean",
    english: "English",
    close: "Close",

    // Completion / Results
    completionTitle: "Course Completed!",
    stampTourComplete: "Stamp Tour Complete",
    congratsMsg: "You have successfully completed the entire journey!",
    saveImage: "Save Card Image",
    share: "Share Result",

    // Map explorer
    mapExplorerTitle: "Map Explorer",
    searchPlaceholder: "Search region...",
    visited: "Visited",
    unvisited: "Unvisited",

    // Multiplayer
    roomCode: "Room Code",
    joinRoom: "Join Room",
    createRoom: "Create Room",
    lobby: "Lobby",
    players: "Players",
    ready: "Ready",
  }
};

export function t(key: string, lang: LanguageOption = "ko"): string {
  return uiTranslations[lang]?.[key] || uiTranslations["ko"]?.[key] || key;
}

export function translateGroup(group: string, lang: LanguageOption = "ko"): string {
  if (lang === "ko") return group;
  const groupMap: Record<string, string> = {
    "수도권": "Capital Area",
    "강원권": "Gangwon",
    "충청권": "Chungcheong",
    "호남권": "Honam",
    "영남권": "Yeongnam",
    "제주권": "Jeju",
    "북아메리카": "North America",
    "남아메리카": "South America",
    "유럽": "Europe",
    "아시아": "Asia",
    "아프리카": "Africa",
    "오세아니아": "Oceania",
    "중동": "Middle East",
    "동북아시아": "Northeast Asia",
    "동남아시아": "Southeast Asia",
    "관동": "Kanto",
    "관서": "Kansai",
    "큐슈": "Kyushu",
    "홋카이도": "Hokkaido",
    "동북": "Tohoku",
    "중부": "Chubu",
    "중국지방": "Chugoku",
    "시코쿠": "Shikoku",
    "동부": "East Coast",
    "서부": "West Coast",
    "중부미국": "Midwest",
    "남부": "South",
    "화북": "North China",
    "화동": "East China",
    "화남": "South China",
    "서남": "Southwest",
    "서북": "Northwest",
    "동북중국": "Northeast China",
    "북부": "North Vietnam",
    "중부베트남": "Central Vietnam",
    "남부베트남": "South Vietnam",
  };
  return groupMap[group] || group;
}
