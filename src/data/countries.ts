// 48 nations of the 2026 FIFA World Cup (USA, Canada, Mexico), official Final Draw
// held 5 December 2025. Groups A–L of 4 teams each; opponents are the real group-mates.
// Flag images served from flagcdn.com (ISO 3166-1 alpha-2 codes).
// Odds are set so a fixed 100 Birr bet pays out 100 × odds (e.g. odds 263.30 → 26,330 Birr).

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
  { code: "mx", name: "Mexico",         odds: 170.00, group: "A", winProbability: 0.59, worldCupWins: 0, opponents: ["South Africa", "South Korea", "Czechia"] },
  { code: "za", name: "South Africa",   odds: 171.10, group: "A", winProbability: 0.58, worldCupWins: 0, opponents: ["Mexico", "South Korea", "Czechia"] },
  { code: "kr", name: "South Korea",    odds: 299.00, group: "A", winProbability: 0.33, worldCupWins: 0, opponents: ["Mexico", "South Africa", "Czechia"] },
  { code: "cz", name: "Czechia",        odds: 276.40, group: "A", winProbability: 0.36, worldCupWins: 0, opponents: ["Mexico", "South Africa", "South Korea"] },

  // Group B
  { code: "ca", name: "Canada",         odds: 268.00, group: "B", winProbability: 0.37, worldCupWins: 0, opponents: ["Bosnia and Herzegovina", "Qatar", "Switzerland"] },
  { code: "ba", name: "Bosnia and Herzegovina", odds: 230.00, group: "B", winProbability: 0.43, worldCupWins: 0, opponents: ["Canada", "Qatar", "Switzerland"] },
  { code: "qa", name: "Qatar",          odds: 414.20, group: "B", winProbability: 0.24, worldCupWins: 0, opponents: ["Canada", "Bosnia and Herzegovina", "Switzerland"] },
  { code: "ch", name: "Switzerland",    odds: 192.00, group: "B", winProbability: 0.52, worldCupWins: 0, opponents: ["Canada", "Bosnia and Herzegovina", "Qatar"] },

  // Group C
  { code: "br", name: "Brazil",         odds: 85.00,  group: "C", winProbability: 1.18, worldCupWins: 5, opponents: ["Morocco", "Haiti", "Scotland"] },
  { code: "ma", name: "Morocco",        odds: 106.00, group: "C", winProbability: 0.94, worldCupWins: 0, opponents: ["Brazil", "Haiti", "Scotland"] },
  { code: "ht", name: "Haiti",          odds: 442.00, group: "C", winProbability: 0.23, worldCupWins: 0, opponents: ["Brazil", "Morocco", "Scotland"] },
  { code: "gb-sct", name: "Scotland",   odds: 180.00, group: "C", winProbability: 0.56, worldCupWins: 0, opponents: ["Brazil", "Morocco", "Haiti"] },

  // Group D
  { code: "us", name: "United States",  odds: 248.70, group: "D", winProbability: 0.40, worldCupWins: 0, opponents: ["Paraguay", "Australia", "Türkiye"] },
  { code: "py", name: "Paraguay",       odds: 280.00, group: "D", winProbability: 0.36, worldCupWins: 0, opponents: ["United States", "Australia", "Türkiye"] },
  { code: "au", name: "Australia",      odds: 310.00, group: "D", winProbability: 0.32, worldCupWins: 0, opponents: ["United States", "Paraguay", "Türkiye"] },
  { code: "tr", name: "Türkiye",        odds: 141.10, group: "D", winProbability: 0.71, worldCupWins: 0, opponents: ["United States", "Paraguay", "Australia"] },

  // Group E
  { code: "de", name: "Germany",        odds: 102.30, group: "E", winProbability: 0.98, worldCupWins: 4, opponents: ["Curaçao", "Côte d'Ivoire", "Ecuador"] },
  { code: "cw", name: "Curaçao",        odds: 590.00, group: "E", winProbability: 0.17, worldCupWins: 0, opponents: ["Germany", "Côte d'Ivoire", "Ecuador"] },
  { code: "ci", name: "Côte d'Ivoire",  odds: 139.20, group: "E", winProbability: 0.72, worldCupWins: 0, opponents: ["Germany", "Curaçao", "Ecuador"] },
  { code: "ec", name: "Ecuador",        odds: 410.00, group: "E", winProbability: 0.24, worldCupWins: 0, opponents: ["Germany", "Curaçao", "Côte d'Ivoire"] },

  // Group F
  { code: "nl", name: "Netherlands",    odds: 111.50, group: "F", winProbability: 0.90, worldCupWins: 0, opponents: ["Japan", "Sweden", "Tunisia"] },
  { code: "jp", name: "Japan",          odds: 116.00, group: "F", winProbability: 0.86, worldCupWins: 0, opponents: ["Netherlands", "Sweden", "Tunisia"] },
  { code: "se", name: "Sweden",         odds: 141.00, group: "F", winProbability: 0.71, worldCupWins: 0, opponents: ["Netherlands", "Japan", "Tunisia"] },
  { code: "tn", name: "Tunisia",        odds: 130.00, group: "F", winProbability: 0.77, worldCupWins: 0, opponents: ["Netherlands", "Japan", "Sweden"] },

  // Group G
  { code: "be", name: "Belgium",        odds: 120.00, group: "G", winProbability: 0.83, worldCupWins: 0, opponents: ["Egypt", "Iran", "New Zealand"] },
  { code: "eg", name: "Egypt",          odds: 130.00, group: "G", winProbability: 0.77, worldCupWins: 0, opponents: ["Belgium", "Iran", "New Zealand"] },
  { code: "ir", name: "Iran",           odds: 370.00, group: "G", winProbability: 0.27, worldCupWins: 0, opponents: ["Belgium", "Egypt", "New Zealand"] },
  { code: "nz", name: "New Zealand",    odds: 350.00, group: "G", winProbability: 0.29, worldCupWins: 0, opponents: ["Belgium", "Egypt", "Iran"] },

  // Group H
  { code: "es", name: "Spain",          odds: 65.00,  group: "H", winProbability: 1.54, worldCupWins: 1, opponents: ["Cabo Verde", "Saudi Arabia", "Uruguay"] },
  { code: "cv", name: "Cabo Verde",     odds: 250.00, group: "H", winProbability: 0.40, worldCupWins: 0, opponents: ["Spain", "Saudi Arabia", "Uruguay"] },
  { code: "sa", name: "Saudi Arabia",   odds: 446.00, group: "H", winProbability: 0.22, worldCupWins: 0, opponents: ["Spain", "Cabo Verde", "Uruguay"] },
  { code: "uy", name: "Uruguay",        odds: 260.00, group: "H", winProbability: 0.38, worldCupWins: 2, opponents: ["Spain", "Cabo Verde", "Saudi Arabia"] },

  // Group I
  { code: "fr", name: "France",         odds: 53.00,  group: "I", winProbability: 1.89, worldCupWins: 2, opponents: ["Senegal", "Iraq", "Norway"] },
  { code: "sn", name: "Senegal",        odds: 140.60, group: "I", winProbability: 0.71, worldCupWins: 0, opponents: ["France", "Iraq", "Norway"] },
  { code: "iq", name: "Iraq",           odds: 387.00, group: "I", winProbability: 0.26, worldCupWins: 0, opponents: ["France", "Senegal", "Norway"] },
  { code: "no", name: "Norway",         odds: 127.00, group: "I", winProbability: 0.79, worldCupWins: 0, opponents: ["France", "Senegal", "Iraq"] },

  // Group J
  { code: "ar", name: "Argentina",      odds: 60.00,  group: "J", winProbability: 1.67, worldCupWins: 3, opponents: ["Algeria", "Austria", "Jordan"] },
  { code: "dz", name: "Algeria",        odds: 102.50, group: "J", winProbability: 0.98, worldCupWins: 0, opponents: ["Argentina", "Austria", "Jordan"] },
  { code: "at", name: "Austria",        odds: 263.30, group: "J", winProbability: 0.38, worldCupWins: 0, opponents: ["Argentina", "Algeria", "Jordan"] },
  { code: "jo", name: "Jordan",         odds: 398.00, group: "J", winProbability: 0.25, worldCupWins: 0, opponents: ["Argentina", "Algeria", "Austria"] },

  // Group K
  { code: "pt", name: "Portugal",       odds: 76.00,  group: "K", winProbability: 1.32, worldCupWins: 0, opponents: ["Congo DR", "Uzbekistan", "Colombia"] },
  { code: "cd", name: "Congo DR",       odds: 290.00, group: "K", winProbability: 0.34, worldCupWins: 0, opponents: ["Portugal", "Uzbekistan", "Colombia"] },
  { code: "uz", name: "Uzbekistan",     odds: 480.00, group: "K", winProbability: 0.21, worldCupWins: 0, opponents: ["Portugal", "Congo DR", "Colombia"] },
  { code: "co", name: "Colombia",       odds: 187.00, group: "K", winProbability: 0.53, worldCupWins: 0, opponents: ["Portugal", "Congo DR", "Uzbekistan"] },

  // Group L
  { code: "gb-eng", name: "England",    odds: 81.20,  group: "L", winProbability: 1.23, worldCupWins: 1, opponents: ["Croatia", "Ghana", "Panama"] },
  { code: "hr", name: "Croatia",        odds: 135.00, group: "L", winProbability: 0.74, worldCupWins: 0, opponents: ["England", "Ghana", "Panama"] },
  { code: "gh", name: "Ghana",          odds: 178.00, group: "L", winProbability: 0.56, worldCupWins: 0, opponents: ["England", "Croatia", "Panama"] },
  { code: "pa", name: "Panama",         odds: 287.00, group: "L", winProbability: 0.35, worldCupWins: 0, opponents: ["England", "Croatia", "Ghana"] },
];

export const flagUrl = (code: string, size: "w320" | "w640" | "w1280" = "w640") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getCountry = (code: string) => COUNTRIES.find((c) => c.code === code);
