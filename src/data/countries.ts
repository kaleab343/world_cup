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
  { code: "at", name: "Austria",        odds: 131.65, group: "A", winProbability: 0.38, worldCupWins: 0, opponents: ["Switzerland", "Belgium", "Hungary"] },
  { code: "be", name: "Belgium",        odds: 60.00, group: "A", winProbability: 0.83, worldCupWins: 0, opponents: ["Spain", "Switzerland", "Austria"] },
  { code: "ba", name: "Bosnia and Herzegovina", odds: 115.00, group: "A", winProbability: 0.43, worldCupWins: 0, opponents: ["Croatia", "Serbia", "Hungary"] },
  { code: "hr", name: "Croatia",        odds: 67.50, group: "A", winProbability: 0.74, worldCupWins: 0, opponents: ["Portugal", "Serbia", "Bosnia"] },
  { code: "cz", name: "Czechia",        odds: 138.20, group: "A", winProbability: 0.36, worldCupWins: 0, opponents: ["Poland", "Ukraine", "Slovakia"] },
  { code: "gb-eng", name: "England",    odds: 40.60,  group: "A", winProbability: 1.23, worldCupWins: 1, opponents: ["France", "Denmark", "Switzerland"] },
  { code: "fr", name: "France",         odds: 26.50,  group: "A", winProbability: 1.89, worldCupWins: 2, opponents: ["Netherlands", "England", "Portugal"] },
  { code: "de", name: "Germany",        odds: 51.15, group: "A", winProbability: 0.98, worldCupWins: 4, opponents: ["Spain", "Poland", "Ukraine"] },
  { code: "nl", name: "Netherlands",    odds: 55.75, group: "A", winProbability: 0.90, worldCupWins: 0, opponents: ["Portugal", "France", "Denmark"] },
  { code: "no", name: "Norway",         odds: 63.50, group: "A", winProbability: 0.79, worldCupWins: 0, opponents: ["Sweden", "Denmark", "Finland"] },
  { code: "pt", name: "Portugal",       odds: 38.00,  group: "A", winProbability: 1.32, worldCupWins: 0, opponents: ["Netherlands", "Croatia", "Serbia"] },
  { code: "gb-sct", name: "Scotland",   odds: 90.00, group: "A", winProbability: 0.56, worldCupWins: 0, opponents: ["England", "Wales", "Ireland"] },
  { code: "es", name: "Spain",          odds: 32.50,  group: "A", winProbability: 1.54, worldCupWins: 1, opponents: ["Germany", "Belgium", "Croatia"] },
  { code: "se", name: "Sweden",         odds: 70.50, group: "A", winProbability: 0.71, worldCupWins: 0, opponents: ["Norway", "Denmark", "Finland"] },
  { code: "ch", name: "Switzerland",    odds: 96.00, group: "A", winProbability: 0.52, worldCupWins: 0, opponents: ["Belgium", "Denmark", "Austria"] },
  { code: "tr", name: "Türkiye",        odds: 70.55, group: "A", winProbability: 0.71, worldCupWins: 0, opponents: ["Portugal", "Croatia", "Serbia"] },
  
  // Africa
  { code: "dz", name: "Algeria",        odds: 51.25, group: "B", winProbability: 0.98, worldCupWins: 0, opponents: ["Egypt", "Tunisia", "Nigeria"] },
  { code: "cv", name: "Cabo Verde",     odds: 125.00, group: "B", winProbability: 0.40, worldCupWins: 0, opponents: ["Senegal", "Ghana", "Morocco"] },
  { code: "cm", name: "Cameroon",       odds: 89.30, group: "B", winProbability: 0.56, worldCupWins: 0, opponents: ["Ghana", "Ivory Coast", "Nigeria"] },
  { code: "cd", name: "Congo DR",       odds: 145.00, group: "B", winProbability: 0.34, worldCupWins: 0, opponents: ["Cameroon", "Ghana", "Senegal"] },
  { code: "ci", name: "Côte d'Ivoire",  odds: 69.60, group: "B", winProbability: 0.72, worldCupWins: 0, opponents: ["Cameroon", "Ghana", "Senegal"] },
  { code: "eg", name: "Egypt",          odds: 65.00, group: "B", winProbability: 0.77, worldCupWins: 0, opponents: ["Morocco", "Tunisia", "Algeria"] },
  { code: "gh", name: "Ghana",          odds: 89.00, group: "B", winProbability: 0.56, worldCupWins: 0, opponents: ["Senegal", "Nigeria", "Cameroon"] },
  { code: "ma", name: "Morocco",        odds: 53.00, group: "B", winProbability: 0.94, worldCupWins: 0, opponents: ["Senegal", "Egypt", "Tunisia"] },
  { code: "sn", name: "Senegal",        odds: 70.30, group: "B", winProbability: 0.71, worldCupWins: 0, opponents: ["Morocco", "Nigeria", "Ghana"] },
  { code: "za", name: "South Africa",   odds: 85.55, group: "B", winProbability: 0.58, worldCupWins: 0, opponents: ["Nigeria", "Ghana", "Cameroon"] },
  { code: "tn", name: "Tunisia",        odds: 65.00, group: "B", winProbability: 0.77, worldCupWins: 0, opponents: ["Morocco", "Egypt", "Algeria"] },
  
  // Asia
  { code: "au", name: "Australia",      odds: 155.00, group: "C", winProbability: 0.32, worldCupWins: 0, opponents: ["South Korea", "Japan", "New Zealand"] },
  { code: "ir", name: "Iran",           odds: 185.00, group: "C", winProbability: 0.27, worldCupWins: 0, opponents: ["Japan", "Saudi Arabia", "Iraq"] },
  { code: "iq", name: "Iraq",           odds: 193.50, group: "C", winProbability: 0.26, worldCupWins: 0, opponents: ["Iran", "Saudi Arabia", "Jordan"] },
  { code: "jp", name: "Japan",          odds: 58.00, group: "C", winProbability: 0.86, worldCupWins: 0, opponents: ["South Korea", "Iran", "Saudi Arabia"] },
  { code: "jo", name: "Jordan",         odds: 199.00, group: "C", winProbability: 0.25, worldCupWins: 0, opponents: ["Saudi Arabia", "Iraq", "Qatar"] },
  { code: "qa", name: "Qatar",          odds: 207.10, group: "C", winProbability: 0.24, worldCupWins: 0, opponents: ["Saudi Arabia", "Iraq", "Jordan"] },
  { code: "sa", name: "Saudi Arabia",   odds: 223.00, group: "C", winProbability: 0.22, worldCupWins: 0, opponents: ["Iran", "Japan", "Iraq"] },
  { code: "kr", name: "South Korea",    odds: 149.50, group: "C", winProbability: 0.33, worldCupWins: 0, opponents: ["Japan", "Australia", "Iraq"] },
  { code: "uz", name: "Uzbekistan",     odds: 240.00, group: "C", winProbability: 0.21, worldCupWins: 0, opponents: ["Iran", "Iraq", "Saudi Arabia"] },
  
  // South America
  { code: "ar", name: "Argentina",      odds: 30.00,  group: "D", winProbability: 1.67, worldCupWins: 3, opponents: ["Brazil", "Chile", "Canada"] },
  { code: "br", name: "Brazil",         odds: 42.50,  group: "D", winProbability: 1.18, worldCupWins: 5, opponents: ["Argentina", "Uruguay", "Colombia"] },
  { code: "cl", name: "Chile",          odds: 99.50, group: "D", winProbability: 0.50, worldCupWins: 0, opponents: ["Argentina", "Peru", "Bolivia"] },
  { code: "co", name: "Colombia",       odds: 93.50, group: "D", winProbability: 0.53, worldCupWins: 0, opponents: ["Brazil", "Uruguay", "Ecuador"] },
  { code: "ec", name: "Ecuador",        odds: 205.00, group: "D", winProbability: 0.24, worldCupWins: 0, opponents: ["Colombia", "Peru", "Venezuela"] },
  { code: "py", name: "Paraguay",       odds: 140.00, group: "D", winProbability: 0.36, worldCupWins: 0, opponents: ["Brazil", "Argentina", "Venezuela"] },
  { code: "uy", name: "Uruguay",        odds: 130.00, group: "D", winProbability: 0.38, worldCupWins: 2, opponents: ["Brazil", "Colombia", "Ecuador"] },
  
  // CONCACAF
  { code: "ca", name: "Canada",         odds: 134.00, group: "E", winProbability: 0.37, worldCupWins: 0, opponents: ["USA", "Mexico", "Panama"] },
  { code: "cr", name: "Costa Rica",     odds: 260.00, group: "E", winProbability: 0.19, worldCupWins: 0, opponents: ["Mexico", "USA", "Panama"] },
  { code: "cw", name: "Curaçao",        odds: 295.00, group: "E", winProbability: 0.17, worldCupWins: 0, opponents: ["Panama", "Haiti", "Jamaica"] },
  { code: "ht", name: "Haiti",          odds: 221.00, group: "E", winProbability: 0.23, worldCupWins: 0, opponents: ["Curaçao", "Jamaica", "Panama"] },
  { code: "mx", name: "Mexico",         odds: 85.00, group: "E", winProbability: 0.59, worldCupWins: 0, opponents: ["USA", "Canada", "Jamaica"] },
  { code: "pa", name: "Panama",         odds: 143.50, group: "E", winProbability: 0.35, worldCupWins: 0, opponents: ["Canada", "Costa Rica", "Jamaica"] },
  { code: "us", name: "United States",  odds: 124.35, group: "E", winProbability: 0.40, worldCupWins: 0, opponents: ["Mexico", "Canada", "Costa Rica"] },
  
  // Oceania
  { code: "nz", name: "New Zealand",    odds: 175.00, group: "F", winProbability: 0.29, worldCupWins: 0, opponents: ["Australia", "Fiji", "Solomon Islands"] },
];

export const flagUrl = (code: string, size: "w320" | "w640" | "w1280" = "w640") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getCountry = (code: string) => COUNTRIES.find((c) => c.code === code);