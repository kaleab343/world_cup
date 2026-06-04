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
  // Group A - Strong contenders
  { code: "ar", name: "Argentina",   odds: 4.5,  group: "A", winProbability: 18, worldCupWins: 3, opponents: ["Peru", "Chile", "Canada"] },
  { code: "br", name: "Brazil",      odds: 4.2,  group: "A", winProbability: 20, worldCupWins: 5, opponents: ["Uruguay", "Colombia", "Paraguay"] },
  { code: "fr", name: "France",      odds: 5.0,  group: "A", winProbability: 16, worldCupWins: 2, opponents: ["Netherlands", "England", "Portugal"] },
  { code: "es", name: "Spain",       odds: 6.0,  group: "A", winProbability: 13, worldCupWins: 1, opponents: ["Germany", "Belgium", "Croatia"] },
  
  // Group B - European Teams
  { code: "de", name: "Germany",     odds: 7.0,  group: "B", winProbability: 12, worldCupWins: 4, opponents: ["Spain", "Poland", "Ukraine"] },
  { code: "gb-eng", name: "England", odds: 7.5,  group: "B", winProbability: 11, worldCupWins: 1, opponents: ["France", "Denmark", "Switzerland"] },
  { code: "pt", name: "Portugal",    odds: 9.0,  group: "B", winProbability: 9,  worldCupWins: 0, opponents: ["Netherlands", "Croatia", "Serbia"] },
  { code: "nl", name: "Netherlands", odds: 10.0, group: "B", winProbability: 8,  worldCupWins: 0, opponents: ["Portugal", "France", "Denmark"] },
  
  // Group C - European & South American Mix
  { code: "be", name: "Belgium",     odds: 14.0, group: "C", winProbability: 6,  worldCupWins: 0, opponents: ["Spain", "Switzerland", "Austria"] },
  { code: "uy", name: "Uruguay",     odds: 16.0, group: "C", winProbability: 5,  worldCupWins: 2, opponents: ["Brazil", "Colombia", "Ecuador"] },
  { code: "hr", name: "Croatia",     odds: 20.0, group: "C", winProbability: 4,  worldCupWins: 0, opponents: ["Portugal", "Serbia", "Poland"] },
  { code: "co", name: "Colombia",    odds: 22.0, group: "C", winProbability: 3.8, worldCupWins: 0, opponents: ["Brazil", "Uruguay", "Ecuador"] },
  
  // Group D - CONCACAF (Hosts) + Strong Teams
  { code: "us", name: "USA",         odds: 20.0, group: "D", winProbability: 4.5, worldCupWins: 0, opponents: ["Mexico", "Canada", "Costa Rica"] },
  { code: "mx", name: "Mexico",      odds: 25.0, group: "D", winProbability: 3.5, worldCupWins: 0, opponents: ["USA", "Canada", "Jamaica"] },
  { code: "ca", name: "Canada",      odds: 40.0, group: "D", winProbability: 2.0, worldCupWins: 0, opponents: ["USA", "Mexico", "Panama"] },
  
  // Group E - European Teams
  { code: "ch", name: "Switzerland", odds: 35.0, group: "E", winProbability: 2.3, worldCupWins: 0, opponents: ["Belgium", "Denmark", "Austria"] },
  { code: "dk", name: "Denmark",     odds: 40.0, group: "E", winProbability: 2.0, worldCupWins: 0, opponents: ["Netherlands", "Switzerland", "Norway"] },
  { code: "pl", name: "Poland",      odds: 50.0, group: "E", winProbability: 1.6, worldCupWins: 0, opponents: ["Germany", "Ukraine", "Czech Republic"] },
  { code: "rs", name: "Serbia",      odds: 60.0, group: "E", winProbability: 1.3, worldCupWins: 0, opponents: ["Croatia", "Portugal", "Hungary"] },
  
  // Group F - Asian & African Teams
  { code: "jp", name: "Japan",       odds: 35.0, group: "F", winProbability: 2.2, worldCupWins: 0, opponents: ["South Korea", "Iran", "Saudi Arabia"] },
  { code: "kr", name: "South Korea", odds: 45.0, group: "F", winProbability: 1.8, worldCupWins: 0, opponents: ["Japan", "Australia", "Iraq"] },
  { code: "ma", name: "Morocco",     odds: 30.0, group: "F", winProbability: 2.5, worldCupWins: 0, opponents: ["Senegal", "Egypt", "Tunisia"] },
  { code: "sn", name: "Senegal",     odds: 40.0, group: "F", winProbability: 2.0, worldCupWins: 0, opponents: ["Morocco", "Nigeria", "Ghana"] },
  
  // Group G - More Qualified Teams
  { code: "au", name: "Australia",   odds: 70.0, group: "G", winProbability: 1.0, worldCupWins: 0, opponents: ["South Korea", "Japan", "New Zealand"] },
  { code: "ec", name: "Ecuador",     odds: 65.0, group: "G", winProbability: 1.2, worldCupWins: 0, opponents: ["Colombia", "Peru", "Venezuela"] },
  { code: "gh", name: "Ghana",       odds: 80.0, group: "G", winProbability: 0.9, worldCupWins: 0, opponents: ["Senegal", "Nigeria", "Cameroon"] },
  { code: "cm", name: "Cameroon",    odds: 90.0, group: "G", winProbability: 0.8, worldCupWins: 0, opponents: ["Ghana", "Ivory Coast", "Mali"] },
  
  // Group H - Additional Qualifiers
  { code: "ng", name: "Nigeria",     odds: 60.0, group: "H", winProbability: 1.3, worldCupWins: 0, opponents: ["Senegal", "Ghana", "Algeria"] },
  { code: "ci", name: "Ivory Coast", odds: 85.0, group: "H", winProbability: 0.85, worldCupWins: 0, opponents: ["Cameroon", "Mali", "Burkina Faso"] },
  { code: "eg", name: "Egypt",       odds: 75.0, group: "H", winProbability: 1.0, worldCupWins: 0, opponents: ["Morocco", "Tunisia", "Algeria"] },
  { code: "dz", name: "Algeria",     odds: 95.0, group: "H", winProbability: 0.7, worldCupWins: 0, opponents: ["Egypt", "Tunisia", "Nigeria"] },
  
  // Group I - More Teams
  { code: "tn", name: "Tunisia",     odds: 100.0, group: "I", winProbability: 0.6, worldCupWins: 0, opponents: ["Morocco", "Egypt", "Algeria"] },
  { code: "sa", name: "Saudi Arabia",odds: 90.0,  group: "I", winProbability: 0.75, worldCupWins: 0, opponents: ["Iran", "Japan", "Iraq"] },
  { code: "ir", name: "Iran",        odds: 85.0,  group: "I", winProbability: 0.8, worldCupWins: 0, opponents: ["Japan", "Saudi Arabia", "UAE"] },
  { code: "qa", name: "Qatar",       odds: 120.0, group: "I", winProbability: 0.5, worldCupWins: 0, opponents: ["Saudi Arabia", "Iraq", "Jordan"] },
  
  // Group J - South American & CONCACAF
  { code: "pe", name: "Peru",        odds: 80.0,  group: "J", winProbability: 0.9, worldCupWins: 0, opponents: ["Argentina", "Chile", "Paraguay"] },
  { code: "cl", name: "Chile",       odds: 85.0,  group: "J", winProbability: 0.8, worldCupWins: 0, opponents: ["Argentina", "Peru", "Bolivia"] },
  { code: "py", name: "Paraguay",    odds: 110.0, group: "J", winProbability: 0.6, worldCupWins: 0, opponents: ["Brazil", "Argentina", "Venezuela"] },
  { code: "ve", name: "Venezuela",   odds: 130.0, group: "J", winProbability: 0.5, worldCupWins: 0, opponents: ["Paraguay", "Ecuador", "Bolivia"] },
  
  // Group K - CONCACAF & Others
  { code: "cr", name: "Costa Rica",  odds: 110.0, group: "K", winProbability: 0.6, worldCupWins: 0, opponents: ["Mexico", "USA", "Panama"] },
  { code: "pa", name: "Panama",      odds: 140.0, group: "K", winProbability: 0.45, worldCupWins: 0, opponents: ["Canada", "Costa Rica", "Jamaica"] },
  { code: "jm", name: "Jamaica",     odds: 150.0, group: "K", winProbability: 0.4, worldCupWins: 0, opponents: ["Mexico", "Panama", "Honduras"] },
  { code: "hn", name: "Honduras",    odds: 160.0, group: "K", winProbability: 0.35, worldCupWins: 0, opponents: ["Jamaica", "El Salvador", "Trinidad"] },
  
  // Group L - European & Other Teams
  { code: "ua", name: "Ukraine",     odds: 70.0,  group: "L", winProbability: 1.0, worldCupWins: 0, opponents: ["Poland", "Czech Republic", "Slovakia"] },
  { code: "at", name: "Austria",     odds: 80.0,  group: "L", winProbability: 0.9, worldCupWins: 0, opponents: ["Switzerland", "Belgium", "Hungary"] },
  { code: "cz", name: "Czech Republic", odds: 100.0, group: "L", winProbability: 0.6, worldCupWins: 0, opponents: ["Poland", "Ukraine", "Slovakia"] },
  { code: "hu", name: "Hungary",     odds: 120.0, group: "L", winProbability: 0.5, worldCupWins: 0, opponents: ["Serbia", "Austria", "Romania"] },
  { code: "nz", name: "New Zealand", odds: 140.0, group: "L", winProbability: 0.4, worldCupWins: 0, opponents: ["Australia", "Fiji", "Solomon Islands"] },
];

export const flagUrl = (code: string, size: "w320" | "w640" | "w1280" = "w640") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getCountry = (code: string) => COUNTRIES.find((c) => c.code === code);