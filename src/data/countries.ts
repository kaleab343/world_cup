// 48 nations of the 2026 FIFA World Cup (USA, Canada, Mexico), official Final Draw
// held 5 December 2025. Groups A–L of 4 teams each; opponents are the real group-mates.
// Flag images served from flagcdn.com (ISO 3166-1 alpha-2 codes).
// Odds are mock data — swap with a live odds API in production.

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
  // Group A
  { code: "mx", name: "Mexico",         odds: 85.00,  group: "A", winProbability: 0.59, worldCupWins: 0, opponents: ["South Africa", "South Korea", "Czechia"] },
  { code: "za", name: "South Africa",   odds: 85.55,  group: "A", winProbability: 0.58, worldCupWins: 0, opponents: ["Mexico", "South Korea", "Czechia"] },
  { code: "kr", name: "South Korea",    odds: 149.50, group: "A", winProbability: 0.33, worldCupWins: 0, opponents: ["Mexico", "South Africa", "Czechia"] },
  { code: "cz", name: "Czechia",        odds: 138.20, group: "A", winProbability: 0.36, worldCupWins: 0, opponents: ["Mexico", "South Africa", "South Korea"] },

  // Group B
  { code: "ca", name: "Canada",         odds: 134.00, group: "B", winProbability: 0.37, worldCupWins: 0, opponents: ["Bosnia and Herzegovina", "Qatar", "Switzerland"] },
  { code: "ba", name: "Bosnia and Herzegovina", odds: 115.00, group: "B", winProbability: 0.43, worldCupWins: 0, opponents: ["Canada", "Qatar", "Switzerland"] },
  { code: "qa", name: "Qatar",          odds: 207.10, group: "B", winProbability: 0.24, worldCupWins: 0, opponents: ["Canada", "Bosnia and Herzegovina", "Switzerland"] },
  { code: "ch", name: "Switzerland",    odds: 96.00,  group: "B", winProbability: 0.52, worldCupWins: 0, opponents: ["Canada", "Bosnia and Herzegovina", "Qatar"] },

  // Group C
  { code: "br", name: "Brazil",         odds: 42.50,  group: "C", winProbability: 1.18, worldCupWins: 5, opponents: ["Morocco", "Haiti", "Scotland"] },
  { code: "ma", name: "Morocco",        odds: 53.00,  group: "C", winProbability: 0.94, worldCupWins: 0, opponents: ["Brazil", "Haiti", "Scotland"] },
  { code: "ht", name: "Haiti",          odds: 221.00, group: "C", winProbability: 0.23, worldCupWins: 0, opponents: ["Brazil", "Morocco", "Scotland"] },
  { code: "gb-sct", name: "Scotland",   odds: 90.00,  group: "C", winProbability: 0.56, worldCupWins: 0, opponents: ["Brazil", "Morocco", "Haiti"] },

  // Group D
  { code: "us", name: "United States",  odds: 124.35, group: "D", winProbability: 0.40, worldCupWins: 0, opponents: ["Paraguay", "Australia", "Türkiye"] },
  { code: "py", name: "Paraguay",       odds: 140.00, group: "D", winProbability: 0.36, worldCupWins: 0, opponents: ["United States", "Australia", "Türkiye"] },
  { code: "au", name: "Australia",      odds: 155.00, group: "D", winProbability: 0.32, worldCupWins: 0, opponents: ["United States", "Paraguay", "Türkiye"] },
  { code: "tr", name: "Türkiye",        odds: 70.55,  group: "D", winProbability: 0.71, worldCupWins: 0, opponents: ["United States", "Paraguay", "Australia"] },

  // Group E
  { code: "de", name: "Germany",        odds: 51.15,  group: "E", winProbability: 0.98, worldCupWins: 4, opponents: ["Curaçao", "Côte d'Ivoire", "Ecuador"] },
  { code: "cw", name: "Curaçao",        odds: 295.00, group: "E", winProbability: 0.17, worldCupWins: 0, opponents: ["Germany", "Côte d'Ivoire", "Ecuador"] },
  { code: "ci", name: "Côte d'Ivoire",  odds: 69.60,  group: "E", winProbability: 0.72, worldCupWins: 0, opponents: ["Germany", "Curaçao", "Ecuador"] },
  { code: "ec", name: "Ecuador",        odds: 205.00, group: "E", winProbability: 0.24, worldCupWins: 0, opponents: ["Germany", "Curaçao", "Côte d'Ivoire"] },

  // Group F
  { code: "nl", name: "Netherlands",    odds: 55.75,  group: "F", winProbability: 0.90, worldCupWins: 0, opponents: ["Japan", "Sweden", "Tunisia"] },
  { code: "jp", name: "Japan",          odds: 58.00,  group: "F", winProbability: 0.86, worldCupWins: 0, opponents: ["Netherlands", "Sweden", "Tunisia"] },
  { code: "se", name: "Sweden",         odds: 70.50,  group: "F", winProbability: 0.71, worldCupWins: 0, opponents: ["Netherlands", "Japan", "Tunisia"] },
  { code: "tn", name: "Tunisia",        odds: 65.00,  group: "F", winProbability: 0.77, worldCupWins: 0, opponents: ["Netherlands", "Japan", "Sweden"] },

  // Group G
  { code: "be", name: "Belgium",        odds: 60.00,  group: "G", winProbability: 0.83, worldCupWins: 0, opponents: ["Egypt", "Iran", "New Zealand"] },
  { code: "eg", name: "Egypt",          odds: 65.00,  group: "G", winProbability: 0.77, worldCupWins: 0, opponents: ["Belgium", "Iran", "New Zealand"] },
  { code: "ir", name: "Iran",           odds: 185.00, group: "G", winProbability: 0.27, worldCupWins: 0, opponents: ["Belgium", "Egypt", "New Zealand"] },
  { code: "nz", name: "New Zealand",    odds: 175.00, group: "G", winProbability: 0.29, worldCupWins: 0, opponents: ["Belgium", "Egypt", "Iran"] },

  // Group H
  { code: "es", name: "Spain",          odds: 32.50,  group: "H", winProbability: 1.54, worldCupWins: 1, opponents: ["Cabo Verde", "Saudi Arabia", "Uruguay"] },
  { code: "cv", name: "Cabo Verde",     odds: 125.00, group: "H", winProbability: 0.40, worldCupWins: 0, opponents: ["Spain", "Saudi Arabia", "Uruguay"] },
  { code: "sa", name: "Saudi Arabia",   odds: 223.00, group: "H", winProbability: 0.22, worldCupWins: 0, opponents: ["Spain", "Cabo Verde", "Uruguay"] },
  { code: "uy", name: "Uruguay",        odds: 130.00, group: "H", winProbability: 0.38, worldCupWins: 2, opponents: ["Spain", "Cabo Verde", "Saudi Arabia"] },

  // Group I
  { code: "fr", name: "France",         odds: 26.50,  group: "I", winProbability: 1.89, worldCupWins: 2, opponents: ["Senegal", "Iraq", "Norway"] },
  { code: "sn", name: "Senegal",        odds: 70.30,  group: "I", winProbability: 0.71, worldCupWins: 0, opponents: ["France", "Iraq", "Norway"] },
  { code: "iq", name: "Iraq",           odds: 193.50, group: "I", winProbability: 0.26, worldCupWins: 0, opponents: ["France", "Senegal", "Norway"] },
  { code: "no", name: "Norway",         odds: 63.50,  group: "I", winProbability: 0.79, worldCupWins: 0, opponents: ["France", "Senegal", "Iraq"] },

  // Group J
  { code: "ar", name: "Argentina",      odds: 30.00,  group: "J", winProbability: 1.67, worldCupWins: 3, opponents: ["Algeria", "Austria", "Jordan"] },
  { code: "dz", name: "Algeria",        odds: 51.25,  group: "J", winProbability: 0.98, worldCupWins: 0, opponents: ["Argentina", "Austria", "Jordan"] },
  { code: "at", name: "Austria",        odds: 131.65, group: "J", winProbability: 0.38, worldCupWins: 0, opponents: ["Argentina", "Algeria", "Jordan"] },
  { code: "jo", name: "Jordan",         odds: 199.00, group: "J", winProbability: 0.25, worldCupWins: 0, opponents: ["Argentina", "Algeria", "Austria"] },

  // Group K
  { code: "pt", name: "Portugal",       odds: 38.00,  group: "K", winProbability: 1.32, worldCupWins: 0, opponents: ["Congo DR", "Uzbekistan", "Colombia"] },
  { code: "cd", name: "Congo DR",       odds: 145.00, group: "K", winProbability: 0.34, worldCupWins: 0, opponents: ["Portugal", "Uzbekistan", "Colombia"] },
  { code: "uz", name: "Uzbekistan",     odds: 240.00, group: "K", winProbability: 0.21, worldCupWins: 0, opponents: ["Portugal", "Congo DR", "Colombia"] },
  { code: "co", name: "Colombia",       odds: 93.50,  group: "K", winProbability: 0.53, worldCupWins: 0, opponents: ["Portugal", "Congo DR", "Uzbekistan"] },

  // Group L
  { code: "gb-eng", name: "England",    odds: 40.60,  group: "L", winProbability: 1.23, worldCupWins: 1, opponents: ["Croatia", "Ghana", "Panama"] },
  { code: "hr", name: "Croatia",        odds: 67.50,  group: "L", winProbability: 0.74, worldCupWins: 0, opponents: ["England", "Ghana", "Panama"] },
  { code: "gh", name: "Ghana",          odds: 89.00,  group: "L", winProbability: 0.56, worldCupWins: 0, opponents: ["England", "Croatia", "Panama"] },
  { code: "pa", name: "Panama",         odds: 143.50, group: "L", winProbability: 0.35, worldCupWins: 0, opponents: ["England", "Croatia", "Ghana"] },
];

export const flagUrl = (code: string, size: "w320" | "w640" | "w1280" = "w640") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getCountry = (code: string) => COUNTRIES.find((c) => c.code === code);
