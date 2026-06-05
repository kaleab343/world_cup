// 48 nations participating in the 2026 FIFA World Cup (USA, Canada, Mexico).
// Flag images served from flagcdn.com (ISO 3166-1 alpha-2 codes).
// Odds are mock data — swap with a live odds API in production.
// Note: Italy did NOT qualify for 2026 World Cup

export type Country = {
  code: string; // ISO alpha-2
  name: string;
  odds: number;
  group: string;
  winProbability: number; // percentage
  worldCupWins: number;
  opponents: string[];
};

export const COUNTRIES: Country[] = [
  // Europe
  { code: "at", name: "Austria",        odds: 263.30, group: "A", winProbability: 0.38, worldCupWins: 0, opponents: ["Switzerland", "Belgium", "Hungary"] },
  { code: "be", name: "Belgium",        odds: 120.00, group: "A", winProbability: 0.83, worldCupWins: 0, opponents: ["Spain", "Switzerland", "Austria"] },
  { code: "ba", name: "Bosnia and Herzegovina", odds: 230.00, group: "A", winProbability: 0.43, worldCupWins: 0, opponents: ["Croatia", "Serbia", "Hungary"] },
  { code: "hr", name: "Croatia",        odds: 135.00, group: "A", winProbability: 0.74, worldCupWins: 0, opponents: ["Portugal", "Serbia", "Bosnia"] },
  { code: "cz", name: "Czechia",        odds: 276.40, group: "A", winProbability: 0.36, worldCupWins: 0, opponents: ["Poland", "Ukraine", "Slovakia"] },
  { code: "gb-eng", name: "England",    odds: 81.20,  group: "A", winProbability: 1.23, worldCupWins: 1, opponents: ["France", "Denmark", "Switzerland"] },
  { code: "fr", name: "France",         odds: 53.00,  group: "A", winProbability: 1.89, worldCupWins: 2, opponents: ["Netherlands", "England", "Portugal"] },
  { code: "de", name: "Germany",        odds: 102.30, group: "A", winProbability: 0.98, worldCupWins: 4, opponents: ["Spain", "Poland", "Ukraine"] },
  { code: "nl", name: "Netherlands",    odds: 111.50, group: "A", winProbability: 0.90, worldCupWins: 0, opponents: ["Portugal", "France", "Denmark"] },
  { code: "no", name: "Norway",         odds: 127.00, group: "A", winProbability: 0.79, worldCupWins: 0, opponents: ["Sweden", "Denmark", "Finland"] },
  { code: "pt", name: "Portugal",       odds: 76.00,  group: "A", winProbability: 1.32, worldCupWins: 0, opponents: ["Netherlands", "Croatia", "Serbia"] },
  { code: "gb-sct", name: "Scotland",   odds: 180.00, group: "A", winProbability: 0.56, worldCupWins: 0, opponents: ["England", "Wales", "Ireland"] },
  { code: "es", name: "Spain",          odds: 65.00,  group: "A", winProbability: 1.54, worldCupWins: 1, opponents: ["Germany", "Belgium", "Croatia"] },
  { code: "se", name: "Sweden",         odds: 141.00, group: "A", winProbability: 0.71, worldCupWins: 0, opponents: ["Norway", "Denmark", "Finland"] },
  { code: "ch", name: "Switzerland",    odds: 192.00, group: "A", winProbability: 0.52, worldCupWins: 0, opponents: ["Belgium", "Denmark", "Austria"] },
  { code: "tr", name: "Türkiye",        odds: 141.10, group: "A", winProbability: 0.71, worldCupWins: 0, opponents: ["Portugal", "Croatia", "Serbia"] },
  
  // Africa
  { code: "dz", name: "Algeria",        odds: 102.50, group: "B", winProbability: 0.98, worldCupWins: 0, opponents: ["Egypt", "Tunisia", "Nigeria"] },
  { code: "cv", name: "Cabo Verde",     odds: 250.00, group: "B", winProbability: 0.40, worldCupWins: 0, opponents: ["Senegal", "Ghana", "Morocco"] },
  { code: "cm", name: "Cameroon",       odds: 178.60, group: "B", winProbability: 0.56, worldCupWins: 0, opponents: ["Ghana", "Ivory Coast", "Nigeria"] },
  { code: "cd", name: "Congo DR",       odds: 290.00, group: "B", winProbability: 0.34, worldCupWins: 0, opponents: ["Cameroon", "Ghana", "Senegal"] },
  { code: "ci", name: "Côte d'Ivoire",  odds: 139.20, group: "B", winProbability: 0.72, worldCupWins: 0, opponents: ["Cameroon", "Ghana", "Senegal"] },
  { code: "eg", name: "Egypt",          odds: 130.00, group: "B", winProbability: 0.77, worldCupWins: 0, opponents: ["Morocco", "Tunisia", "Algeria"] },
  { code: "gh", name: "Ghana",          odds: 178.00, group: "B", winProbability: 0.56, worldCupWins: 0, opponents: ["Senegal", "Nigeria", "Cameroon"] },
  { code: "ma", name: "Morocco",        odds: 106.00, group: "B", winProbability: 0.94, worldCupWins: 0, opponents: ["Senegal", "Egypt", "Tunisia"] },
  { code: "sn", name: "Senegal",        odds: 140.60, group: "B", winProbability: 0.71, worldCupWins: 0, opponents: ["Morocco", "Nigeria", "Ghana"] },
  { code: "za", name: "South Africa",   odds: 171.10, group: "B", winProbability: 0.58, worldCupWins: 0, opponents: ["Nigeria", "Ghana", "Cameroon"] },
  { code: "tn", name: "Tunisia",        odds: 130.00, group: "B", winProbability: 0.77, worldCupWins: 0, opponents: ["Morocco", "Egypt", "Algeria"] },
  
  // Asia
  { code: "au", name: "Australia",      odds: 310.00, group: "C", winProbability: 0.32, worldCupWins: 0, opponents: ["South Korea", "Japan", "New Zealand"] },
  { code: "ir", name: "Iran",           odds: 370.00, group: "C", winProbability: 0.27, worldCupWins: 0, opponents: ["Japan", "Saudi Arabia", "Iraq"] },
  { code: "iq", name: "Iraq",           odds: 387.00, group: "C", winProbability: 0.26, worldCupWins: 0, opponents: ["Iran", "Saudi Arabia", "Jordan"] },
  { code: "jp", name: "Japan",          odds: 116.00, group: "C", winProbability: 0.86, worldCupWins: 0, opponents: ["South Korea", "Iran", "Saudi Arabia"] },
  { code: "jo", name: "Jordan",         odds: 398.00, group: "C", winProbability: 0.25, worldCupWins: 0, opponents: ["Saudi Arabia", "Iraq", "Qatar"] },
  { code: "qa", name: "Qatar",          odds: 414.20, group: "C", winProbability: 0.24, worldCupWins: 0, opponents: ["Saudi Arabia", "Iraq", "Jordan"] },
  { code: "sa", name: "Saudi Arabia",   odds: 446.00, group: "C", winProbability: 0.22, worldCupWins: 0, opponents: ["Iran", "Japan", "Iraq"] },
  { code: "kr", name: "South Korea",    odds: 299.00, group: "C", winProbability: 0.33, worldCupWins: 0, opponents: ["Japan", "Australia", "Iraq"] },
  { code: "uz", name: "Uzbekistan",     odds: 480.00, group: "C", winProbability: 0.21, worldCupWins: 0, opponents: ["Iran", "Iraq", "Saudi Arabia"] },
  
  // South America
  { code: "ar", name: "Argentina",      odds: 60.00,  group: "D", winProbability: 1.67, worldCupWins: 3, opponents: ["Brazil", "Chile", "Canada"] },
  { code: "br", name: "Brazil",         odds: 85.00,  group: "D", winProbability: 1.18, worldCupWins: 5, opponents: ["Argentina", "Uruguay", "Colombia"] },
  { code: "cl", name: "Chile",          odds: 199.00, group: "D", winProbability: 0.50, worldCupWins: 0, opponents: ["Argentina", "Peru", "Bolivia"] },
  { code: "co", name: "Colombia",       odds: 187.00, group: "D", winProbability: 0.53, worldCupWins: 0, opponents: ["Brazil", "Uruguay", "Ecuador"] },
  { code: "ec", name: "Ecuador",        odds: 410.00, group: "D", winProbability: 0.24, worldCupWins: 0, opponents: ["Colombia", "Peru", "Venezuela"] },
  { code: "py", name: "Paraguay",       odds: 280.00, group: "D", winProbability: 0.36, worldCupWins: 0, opponents: ["Brazil", "Argentina", "Venezuela"] },
  { code: "uy", name: "Uruguay",        odds: 260.00, group: "D", winProbability: 0.38, worldCupWins: 2, opponents: ["Brazil", "Colombia", "Ecuador"] },
  
  // CONCACAF
  { code: "ca", name: "Canada",         odds: 268.00, group: "E", winProbability: 0.37, worldCupWins: 0, opponents: ["USA", "Mexico", "Panama"] },
  { code: "cr", name: "Costa Rica",     odds: 520.00, group: "E", winProbability: 0.19, worldCupWins: 0, opponents: ["Mexico", "USA", "Panama"] },
  { code: "cw", name: "Curaçao",        odds: 590.00, group: "E", winProbability: 0.17, worldCupWins: 0, opponents: ["Panama", "Haiti", "Jamaica"] },
  { code: "ht", name: "Haiti",          odds: 442.00, group: "E", winProbability: 0.23, worldCupWins: 0, opponents: ["Curaçao", "Jamaica", "Panama"] },
  { code: "mx", name: "Mexico",         odds: 170.00, group: "E", winProbability: 0.59, worldCupWins: 0, opponents: ["USA", "Canada", "Jamaica"] },
  { code: "pa", name: "Panama",         odds: 287.00, group: "E", winProbability: 0.35, worldCupWins: 0, opponents: ["Canada", "Costa Rica", "Jamaica"] },
  { code: "us", name: "United States",  odds: 248.70, group: "E", winProbability: 0.40, worldCupWins: 0, opponents: ["Mexico", "Canada", "Costa Rica"] },
  
  // Oceania
  { code: "nz", name: "New Zealand",    odds: 350.00, group: "F", winProbability: 0.29, worldCupWins: 0, opponents: ["Australia", "Fiji", "Solomon Islands"] },
];

export const flagUrl = (code: string, size: "w320" | "w640" | "w1280" = "w640") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getCountry = (code: string) => COUNTRIES.find((c) => c.code === code);