import { WORLD_COUNTRIES } from "../data/worldCountries";
import { Region } from "../types";

/**
 * Common synonyms and aliases for world countries in Korean and English
 */
const COUNTRY_SYNONYMS: Record<string, string[]> = {
  kr: ["대한민국", "한국", "남한", "코리아", "korea", "south korea", "republic of korea"],
  kp: ["북한", "조선", "조선민주주의인민공화국", "north korea", "dprk"],
  us: ["미국", "미합중국", "usa", "us", "united states", "america"],
  gb: ["영국", "대영제국", "uk", "united kingdom", "britain", "england"],
  jp: ["일본", "japan", "nippon"],
  cn: ["중국", "중화인민공화국", "china", "prc"],
  tw: ["대만", "타이완", "중화민국", "taiwan"],
  ru: ["러시아", "러시아연방", "russia"],
  de: ["독일", "germany", "deutschland"],
  fr: ["프랑스", "불란서", "france"],
  it: ["이탈리아", "이태리", "italy", "italia"],
  es: ["스페인", "에스파냐", "spain", "espana"],
  ae: ["아랍에미리트", "아랍에미레이트", "uae", "united arab emirates"],
  sa: ["사우디아라비아", "사우디", "saudi arabia", "saudi"],
  za: ["남아프리카공화국", "남아공", "south africa"],
  cd: ["콩고민주공화국", "민주콩고", "dr congo", "drc"],
  cg: ["콩고", "콩고공화국", "congo"],
  cf: ["중앙아프리카공화국", "중앙아프리카", "중아공", "car", "central african republic"],
  va: ["바티칸", "바티칸시국", "바티칸시티", "교황청", "vatican", "vatican city", "holy see"],
  nl: ["네덜란드", "화란", "netherlands", "holland"],
  ch: ["스위스", "switzerland"],
  tr: ["튀르키예", "터키", "turkey", "turkiye"],
  vn: ["베트남", "월남", "vietnam"],
  au: ["호주", "오스트레일리아", "australia"],
  at: ["오스트리아", "austria"],
  cz: ["체코", "체코공화국", "czechia", "czech republic"],
  do: ["도미니카공화국", "도미니카 공화국", "dominican republic"],
  dm: ["도미니카", "도미니카연방", "dominica"],
  kn: ["세인트키츠네비스", "세인트키츠 네비스", "saint kitts and nevis", "saint kitts"],
  lc: ["세인트루시아", "saint lucia"],
  vc: ["세인트빈센트그레나딘", "세인트빈센트 그레나딘", "세인트빈센트", "saint vincent and the grenadines", "saint vincent"],
  tt: ["트리니다드토바고", "트리니다드 토바고", "trinidad and tobago", "trinidad"],
  ag: ["안티과바부다", "안티과 바부다", "antigua and barbuda", "antigua"],
  ba: ["보스니아헤르체고비나", "보스니아 헤르체고비나", "보스니아", "bosnia and herzegovina", "bosnia"],
  mk: ["북마케도니아", "마케도니아", "north macedonia", "macedonia"],
  sz: ["에스와티니", "스와질란드", "스와질랜드", "eswatini", "swaziland"],
  st: ["상투메프린시페", "상투메 프린시페", "sao tome and principe", "sao tome"],
  cv: ["카보베르데", "cape verde", "cabo verde"],
  ci: ["코트디부아르", "코트디부아르공화국", "상아해안", "ivory coast", "cote d'ivoire"],
  tl: ["동티모르", "티모르레스테", "east timor", "timor-leste"],
  mm: ["미얀마", "버마", "myanmar", "burma"],
  nz: ["뉴질랜드", "new zealand"],
  pg: ["파푸아뉴기니", "papua new guinea"],
  sb: ["솔로몬제도", "솔로몬 제도", "solomon islands"],
  mh: ["마샬제도", "마셜제도", "마샬 제도", "marshall islands"],
  fm: ["미크로네시아", "미크로네시아연방", "micronesia"],
  la: ["라오스", "laos"],
  kh: ["캄보디아", "cambodia"],
  sg: ["싱가포르", "싱가폴", "singapore"],
  my: ["말레이시아", "malaysia"],
  id: ["인도네시아", "indonesia"],
  ph: ["필리핀", "philippines"],
  in: ["인도", "india"],
  pk: ["파키스탄", "pakistan"],
  bd: ["방글라데시", "bangladesh"],
  lk: ["스리랑카", "sri lanka"],
  np: ["네팔", "nepal"],
  bt: ["부탄", "bhutan"],
  mv: ["몰디브", "maldives"],
  mn: ["몽골", "몽고", "mongolia"],
  kz: ["카자흐스탄", "kazakhstan"],
  uz: ["우즈베키스탄", "uzbekistan"],
  tm: ["투르크메니스탄", "turkmenistan"],
  tj: ["타지키스탄", "tajikistan"],
  kg: ["키르기스스탄", "키르기스", "kyrgyzstan"],
  af: ["아프가니스탄", "afghanistan"],
  ir: ["이란", "iran"],
  iq: ["이라크", "iraq"],
  qa: ["카타르", "qatar"],
  kw: ["쿠웨이트", "kuwait"],
  bh: ["바레인", "bahrain"],
  om: ["오만", "oman"],
  ye: ["예멘", "yemen"],
  jo: ["요르단", "jordan"],
  lb: ["레바논", "lebanon"],
  il: ["이스라엘", "israel"],
  ps: ["팔레스타인", "palestine"],
  sy: ["시리아", "syria"],
  ge: ["조지아", "그루지야", "georgia"],
  am: ["아르메니아", "armenia"],
  az: ["아제르바이잔", "azerbaijan"],
  cy: ["키프로스", "사이프러스", "cyprus"],
  eg: ["이집트", "egypt"],
  ma: ["모로코", "morocco"],
  dz: ["알제리", "algeria"],
  tn: ["튀니지", "tunisia"],
  ly: ["리비아", "libya"],
  sd: ["수단", "sudan"],
  ss: ["남수단", "south sudan"],
  et: ["에티오피아", "ethiopia"],
  ke: ["케냐", "kenya"],
  ng: ["나이지리아", "nigeria"],
  gh: ["가나", "ghana"],
  sn: ["세네갈", "senegal"],
  ml: ["말리", "mali"],
  cm: ["카메룬", "cameroon"],
  tz: ["탄자니아", "tanzania"],
  ug: ["우간다", "uganda"],
  rw: ["르완다", "rwanda"],
  bi: ["부룬디", "burundi"],
  ao: ["앙골라", "angola"],
  zm: ["잠비아", "zambia"],
  zw: ["짐바브웨", "zimbabwe"],
  mz: ["모잠비크", "mozambique"],
  mg: ["마다가스카르", "madagascar"],
  bw: ["보츠와나", "botswana"],
  nam: ["나미비아", "namibia"],
  so: ["소말리아", "somalia"],
  td: ["차드", "chad"],
  ne: ["니제르", "niger"],
  bf: ["부르키나파소", "burkina faso"],
  bj: ["베냉", "benin"],
  tg: ["토고", "togo"],
  lr: ["라이베리아", "liberia"],
  sl: ["시에라리온", "sierra leone"],
  gn: ["기니", "guinea"],
  gw: ["기니비사우", "guinea-bissau"],
  gm: ["감비아", "gambia"],
  mr: ["모리타니", "mauritania"],
  er: ["에리트레아", "eritrea"],
  dj: ["지부티", "djibouti"],
  ga: ["가봉", "gabon"],
  gq: ["적도기니", "equatorial guinea"],
  km: ["코모로", "comoros"],
  mu: ["모리셔스", "mauritius"],
  sc: ["세이셸", "seychelles"],
  ls: ["레소토", "lesotho"],
  mw: ["말라위", "malawi"],
  ca: ["캐나다", "canada"],
  mx: ["멕시코", "mexico"],
  br: ["브라질", "brazil"],
  ar: ["아르헨티나", "argentina"],
  cl: ["칠레", "chile"],
  co: ["콜롬비아", "colombia"],
  pe: ["페루", "peru"],
  ve: ["베네수엘라", "venezuela"],
  ec: ["에콰도르", "ecuador"],
  bo: ["볼리비아", "bolivia"],
  py: ["파라과이", "paraguay"],
  uy: ["우루과이", "uruguay"],
  gy: ["가이아나", "guyana"],
  sr: ["수리남", "suriname"],
  gt: ["과테말라", "guatemala"],
  bz: ["벨리즈", "belize"],
  sv: ["엘살바도르", "el salvador"],
  hn: ["온두라스", "honduras"],
  ni: ["니카라과", "nicaragua"],
  cr: ["코스타리카", "costa rica"],
  pa: ["파나마", "panama"],
  cu: ["쿠바", "cuba"],
  jm: ["자메이카", "jamaica"],
  ht: ["아이티", "하이티", "haiti"],
  bs: ["바하마", "bahamas"],
  bb: ["바베이도스", "barbados"],
  gd: ["그레나다", "grenada"],
  pt: ["포르투갈", "portugal"],
  be: ["벨기에", "belgium"],
  lu: ["룩셈부르크", "luxembourg"],
  ie: ["아일랜드", "ireland"],
  dk: ["덴마크", "denmark"],
  se: ["스웨덴", "sweden"],
  no: ["노르웨이", "norway"],
  fi: ["핀란드", "finland"],
  is: ["아이슬란드", "iceland"],
  pl: ["폴란드", "poland"],
  sk: ["슬로바키아", "slovakia"],
  hu: ["헝가리", "hungary"],
  ro: ["루마니아", "romania"],
  bg: ["불가리아", "bulgaria"],
  gr: ["그리스", "greece"],
  hr: ["크로아티아", "croatia"],
  si: ["슬로베니아", "slovenia"],
  rs: ["세르비아", "serbia"],
  me: ["몬테네그로", "montenegro"],
  al: ["알바니아", "albania"],
  ua: ["우크라이나", "ukraine"],
  by: ["벨라루스", "belarus"],
  md: ["몰도바", "moldova"],
  lt: ["리투아니아", "lithuania"],
  lv: ["라트비아", "latvia"],
  ee: ["에스토니아", "estonia"],
  mt: ["몰타", "malta"],
  ad: ["안도라", "andorra"],
  mc: ["모나코", "monaco"],
  sm: ["산마리노", "san marino"],
  li: ["리히텐슈타인", "liechtenstein"],
  fj: ["피지", "fiji"],
  vu: ["바누아투", "vanuatu"],
  ws: ["사모아", "samoa"],
  to: ["통가", "tonga"],
  tv: ["투발루", "tuvalu"],
  ki: ["키리바시", "kiribati"],
  nr: ["나우루", "nauru"],
  pw: ["팔라우", "palau"],
};

/**
 * Clean input string for comparison (strips spaces, punctuation, lowercases)
 */
export function normalizeCountryInput(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\s\-_.,/·'"`()]/g, "")
    .trim();
}

/**
 * Check if the user's input matches the country (by official Korean/English name or known synonyms)
 */
export function isCountryMatch(country: Region, userInput: string): boolean {
  const normUser = normalizeCountryInput(userInput);
  if (!normUser) return false;

  const normKr = normalizeCountryInput(country.name_kr);
  const normEn = normalizeCountryInput(country.name_en || "");
  const normId = normalizeCountryInput(country.id);

  if (normUser === normKr || normUser === normEn || normUser === normId) {
    return true;
  }

  // Check synonym dictionary
  const idKey = country.id.toLowerCase();
  const synonyms = COUNTRY_SYNONYMS[idKey] || [];
  for (const syn of synonyms) {
    if (normalizeCountryInput(syn) === normUser) {
      return true;
    }
  }

  return false;
}

/**
 * Filter countries for flag mini-game (excluding Kosovo 'xk' as mentioned in prompt: "코소보를 뺀 전세계 196개 나라")
 */
export function getFlagGameCountries(): Region[] {
  return WORLD_COUNTRIES.filter((c) => c.id !== "xk" && c.id.length === 2);
}
