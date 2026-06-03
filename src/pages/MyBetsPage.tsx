import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBets } from "@/lib/bets";
import { flagUrl } from "@/data/countries";
import { Button } from "@/components/ui/button";

const MyBetsPage = () => {
  const bets = getBets();

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold">
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </Link>

        <h1 className="font-display mt-8 text-6xl sm:text-7xl">
          My <span className="bg-gradient-gold bg-clip-text text-transparent">Bets</span>
        </h1>
        <p className="mt-3 font-editorial text-muted-foreground">
          {bets.length} {bets.length === 1 ? "bet" : "bets"} placed for World Cup 2026.
        </p>

        {bets.length === 0 ? (
          <div className="mt-16 rounded-xl border border-border/70 bg-card/80 p-12 text-center">
            <p className="font-editorial text-lg text-muted-foreground">No bets yet.</p>
            <Button asChild className="mt-6 bg-gradient-gold uppercase tracking-wider text-primary-foreground">
              <Link to="/">Place your first bet</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {bets.map((b) => (
              <li
                key={b.id}
                className="flex items-center gap-5 rounded-xl border border-border/70 bg-card/80 p-4 backdrop-blur-xl"
              >
                <img src={flagUrl(b.countryCode, "w320")} alt="" className="h-16 w-24 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="font-display text-2xl">{b.countryName}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {new Date(b.placedAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Stake → Win</p>
                  <p className="font-display text-xl">
                    €{b.amount} →{" "}
                    <span className="bg-gradient-gold bg-clip-text text-transparent">€{b.payout}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyBetsPage;