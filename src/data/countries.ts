// 48 nations participating in the 2026 FIFA World Cup.
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
  { code: "ar", name: "Argentina",   odds: 4.5,  group: "A", winProbability: 18, worldCupWins: 3, opponents: ["Mexico", "Saudi Arabia", "Poland"] },
  { code: "br", name: "Brazil",      odds: 4.2,  group: "B", winProbability: 20, worldCupWins: 5, opponents: ["Serbia", "Switzerland", "Cameroon"] },
  { code: "fr", name: "France",      odds: 5.0,  group: "C", winProbability: 16, worldCupWins: 2, opponents: ["Denmark", "Tunisia", "Australia"] },
  { code: "es", name: "Spain",       odds: 6.0,  group: "D", winProbability: 13, worldCupWins: 1, opponents: ["Germany", "Japan", "Costa Rica"] },
  { code: "de", name: "Germany",     odds: 8.0,  group: "D", winProbability: 10, worldCupWins: 4, opponents: ["Spain", "Japan", "Costa Rica"] },
  { code: "gb-eng", name: "England", odds: 7.5,  group: "E", winProbability: 11, worldCupWins: 1, opponents: ["Iran", "USA", "Wales"] },
  { code: "pt", name: "Portugal",    odds: 9.0,  group: "F", winProbability: 9,  worldCupWins: 0, opponents: ["Ghana", "Uruguay", "South Korea"] },
  { code: "nl", name: "Netherlands", odds: 12.0, group: "G", winProbability: 7,  worldCupWins: 0, opponents: ["Senegal", "Ecuador", "Qatar"] },
  { code: "be", name: "Belgium",     odds: 15.0, group: "H", winProbability: 6,  worldCupWins: 0, opponents: ["Canada", "Morocco", "Croatia"] },
  { code: "it", name: "Italy",       odds: 13.0, group: "B", winProbability: 7,  worldCupWins: 4, opponents: ["Switzerland", "Cameroon", "Serbia"] },
  { code: "uy", name: "Uruguay",     odds: 18.0, group: "F", winProbability: 5,  worldCupWins: 2, opponents: ["Portugal", "Ghana", "South Korea"] },
  { code: "hr", name: "Croatia",     odds: 22.0, group: "H", winProbability: 4,  worldCupWins: 0, opponents: ["Belgium", "Canada", "Morocco"] },
  { code: "mx", name: "Mexico",      odds: 28.0, group: "A", winProbability: 3,  worldCupWins: 0, opponents: ["Argentina", "Saudi Arabia", "Poland"] },
  { code: "us", name: "USA",         odds: 25.0, group: "E", winProbability: 3,  worldCupWins: 0, opponents: ["England", "Iran", "Wales"] },
  { code: "ca", name: "Canada",      odds: 50.0, group: "H", winProbability: 1.5,worldCupWins: 0, opponents: ["Belgium", "Morocco", "Croatia"] },
  { code: "ma", name: "Morocco",     odds: 35.0, group: "H", winProbability: 2,  worldCupWins: 0, opponents: ["Belgium", "Canada", "Croatia"] },
  { code: "sn", name: "Senegal",     odds: 45.0, group: "G", winProbability: 1.8,worldCupWins: 0, opponents: ["Netherlands", "Ecuador", "Qatar"] },
  { code: "jp", name: "Japan",       odds: 40.0, group: "D", winProbability: 2,  worldCupWins: 0, opponents: ["Spain", "Germany", "Costa Rica"] },
  { code: "kr", name: "South Korea", odds: 55.0, group: "F", winProbability: 1.2,worldCupWins: 0, opponents: ["Portugal", "Ghana", "Uruguay"] },
  { code: "au", name: "Australia",   odds: 80.0, group: "C", winProbability: 0.8,worldCupWins: 0, opponents: ["France", "Denmark", "Tunisia"] },
  { code: "ch", name: "Switzerland", odds: 50.0, group: "B", winProbability: 1.4,worldCupWins: 0, opponents: ["Brazil", "Cameroon", "Serbia"] },
  { code: "dk", name: "Denmark",     odds: 45.0, group: "C", winProbability: 1.6,worldCupWins: 0, opponents: ["France", "Tunisia", "Australia"] },
  { code: "rs", name: "Serbia",      odds: 65.0, group: "B", winProbability: 1.0,worldCupWins: 0, opponents: ["Brazil", "Switzerland", "Cameroon"] },
  { code: "pl", name: "Poland",      odds: 60.0, group: "A", winProbability: 1.1,worldCupWins: 0, opponents: ["Argentina", "Mexico", "Saudi Arabia"] },
  { code: "ec", name: "Ecuador",     odds: 90.0, group: "G", winProbability: 0.7,worldCupWins: 0, opponents: ["Netherlands", "Senegal", "Qatar"] },
  { code: "gh", name: "Ghana",       odds: 100.0,group: "F", winProbability: 0.6,worldCupWins: 0, opponents: ["Portugal", "Uruguay", "South Korea"] },
  { code: "cm", name: "Cameroon",    odds: 120.0,group: "B", winProbability: 0.5,worldCupWins: 0, opponents: ["Brazil", "Switzerland", "Serbia"] },
  { code: "ng", name: "Nigeria",     odds: 70.0, group: "A", winProbability: 0.9,worldCupWins: 0, opponents: ["Argentina", "Mexico", "Poland"] },
  { code: "ci", name: "Ivory Coast", odds: 110.0,group: "G", winProbability: 0.5,worldCupWins: 0, opponents: ["Netherlands", "Senegal", "Ecuador"] },
  { code: "eg", name: "Egypt",       odds: 130.0,group: "E", winProbability: 0.4,worldCupWins: 0, opponents: ["England", "USA", "Iran"] },
  { code: "dz", name: "Algeria",     odds: 150.0,group: "C", winProbability: 0.3,worldCupWins: 0, opponents: ["France", "Denmark", "Australia"] },
  { code: "tn", name: "Tunisia",     odds: 200.0,group: "C", winProbability: 0.2,worldCupWins: 0, opponents: ["France", "Denmark", "Australia"] },
  { code: "sa", name: "Saudi Arabia",odds: 150.0,group: "A", winProbability: 0.3,worldCupWins: 0, opponents: ["Argentina", "Mexico", "Poland"] },
  { code: "ir", name: "Iran",        odds: 180.0,group: "E", winProbability: 0.25,worldCupWins: 0, opponents: ["England", "USA", "Wales"] },
  { code: "qa", name: "Qatar",       odds: 250.0,group: "G", winProbability: 0.15,worldCupWins: 0, opponents: ["Netherlands", "Senegal", "Ecuador"] },
  { code: "ae", name: "UAE",         odds: 250.0,group: "D", winProbability: 0.15,worldCupWins: 0, opponents: ["Spain", "Germany", "Japan"] },
  { code: "jo", name: "Jordan",      odds: 300.0,group: "F", winProbability: 0.1, worldCupWins: 0, opponents: ["Portugal", "Ghana", "Uruguay"] },
  { code: "uz", name: "Uzbekistan",  odds: 300.0,group: "H", winProbability: 0.1, worldCupWins: 0, opponents: ["Belgium", "Canada", "Morocco"] },
  { code: "cr", name: "Costa Rica",  odds: 200.0,group: "D", winProbability: 0.2, worldCupWins: 0, opponents: ["Spain", "Germany", "Japan"] },
  { code: "pa", name: "Panama",      odds: 250.0,group: "E", winProbability: 0.15,worldCupWins: 0, opponents: ["England", "USA", "Iran"] },
  { code: "py", name: "Paraguay",    odds: 180.0,group: "A", winProbability: 0.25,worldCupWins: 0, opponents: ["Argentina", "Mexico", "Saudi Arabia"] },
  { code: "ve", name: "Venezuela",   odds: 220.0,group: "F", winProbability: 0.2, worldCupWins: 0, opponents: ["Portugal", "Uruguay", "Ghana"] },
  { code: "co", name: "Colombia",    odds: 35.0, group: "G", winProbability: 2.2, worldCupWins: 0, opponents: ["Netherlands", "Ecuador", "Qatar"] },
  { code: "cl", name: "Chile",       odds: 90.0, group: "B", winProbability: 0.7, worldCupWins: 0, opponents: ["Brazil", "Switzerland", "Serbia"] },
  { code: "gb-wls", name: "Wales",   odds: 150.0,group: "E", winProbability: 0.3, worldCupWins: 0, opponents: ["England", "USA", "Iran"] },
  { code: "gb-sct", name: "Scotland",odds: 130.0,group: "H", winProbability: 0.4, worldCupWins: 0, opponents: ["Belgium", "Canada", "Morocco"] },
  { code: "no", name: "Norway",      odds: 60.0, group: "D", winProbability: 1.2, worldCupWins: 0, opponents: ["Spain", "Germany", "Japan"] },
  { code: "tr", name: "Türkiye",     odds: 75.0, group: "F", winProbability: 1.0, worldCupWins: 0, opponents: ["Portugal", "Ghana", "Uruguay"] },
];

export const flagUrl = (code: string, size: "w320" | "w640" | "w1280" = "w640") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getCountry = (code: string) => COUNTRIES.find((c) => c.code === code);