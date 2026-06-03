// Lightweight client-side bet store.
// NOTE: In production, replace with API calls to /api/bets (Node/Express scaffold)
// and plug JWT/session auth before persisting.

import { COUNTRIES } from "@/data/countries";

export type Bet = {
  id: string;
  countryCode: string;
  countryName: string;
  amount: number;
  odds: number;
  payout: number;
  placedAt: string;
  payoutDate: string;
};

const KEY = "wc26_bets";
export const FINAL_DATE = "July 19, 2026";

export function getBets(): Bet[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function placeBet(countryCode: string, amount: number): Bet {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  if (!country) throw new Error("Unknown country");
  // Basic sanitization — never trust client input on the server side either.
  const sanitized = Math.max(1, Math.min(100000, Math.floor(amount)));
  const bet: Bet = {
    id: crypto.randomUUID(),
    countryCode,
    countryName: country.name,
    amount: sanitized,
    odds: country.odds,
    payout: Math.round(sanitized * country.odds * 100) / 100,
    placedAt: new Date().toISOString(),
    payoutDate: FINAL_DATE,
  };
  const all = getBets();
  all.unshift(bet);
  localStorage.setItem(KEY, JSON.stringify(all));
  return bet;
}