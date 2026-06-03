import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Trophy, Users } from "lucide-react";
import { getCountry, flagUrl } from "@/data/countries";
import { placeBet } from "@/lib/bets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const CountryPage = () => {
  const { code = "" } = useParams();
  const navigate = useNavigate();
  const country = getCountry(code);
  const [amount, setAmount] = useState(50);

  if (!country) return <Navigate to="/" replace />;

  const payout = useMemo(
    () => Math.round(amount * country.odds * 100) / 100,
    [amount, country.odds]
  );

  const handlePlace = () => {
    const bet = placeBet(country.code, amount);
    navigate(`/confirmation/${bet.id}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Full-bleed flag */}
      <motion.img
        key={country.code}
        src={flagUrl(country.code, "w1280")}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
        animate={{ opacity: 0.35, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      <div className="absolute inset-0 bg-floodlight" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all countries
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Group {country.group}</p>
          <h1 className="font-display mt-3 text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-tight">
            {country.name.toUpperCase()}
          </h1>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Betting panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-xl border border-border/70 bg-card/80 p-8 backdrop-blur-xl"
          >
            <div className="flex items-baseline justify-between border-b border-border/60 pb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Odds to win
              </span>
              <span className="font-display text-6xl text-gold">{country.odds.toFixed(2)}x</span>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label htmlFor="bet-amount" className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Your bet (EUR)
                </label>
                <div className="mt-3 flex items-center gap-4">
                  <span className="font-display text-3xl text-gold">€</span>
                  <Input
                    id="bet-amount"
                    type="number"
                    min={1}
                    max={100000}
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1, Math.min(100000, Number(e.target.value) || 0)))}
                    className="font-display h-14 border-border/60 bg-secondary/40 text-3xl"
                  />
                </div>
                <Slider
                  value={[amount]}
                  min={5}
                  max={1000}
                  step={5}
                  onValueChange={(v) => setAmount(v[0])}
                  className="mt-5"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>€5</span><span>€1,000</span>
                </div>
              </div>

              <div className="rounded-lg border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-6">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Potential payout
                </p>
                <p className="font-display mt-2 text-5xl">
                  Bet €{amount.toLocaleString()} →{" "}
                  <span className="bg-gradient-gold bg-clip-text text-transparent">
                    Win €{payout.toLocaleString()}
                  </span>
                </p>
              </div>

              <Button
                onClick={handlePlace}
                size="lg"
                className="font-editorial h-14 w-full bg-gradient-gold text-base font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-glow hover:opacity-90"
              >
                Place Bet on {country.name}
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <StatCard
              icon={<Trophy className="h-5 w-5" />}
              label="World Cup Wins"
              value={country.worldCupWins.toString()}
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Win Probability"
              value={`${country.winProbability}%`}
            />
            <div className="rounded-xl border border-border/70 bg-card/80 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-gold">
                <Users className="h-5 w-5" />
                <p className="font-mono text-xs uppercase tracking-[0.3em]">Group stage opponents</p>
              </div>
              <ul className="mt-4 space-y-2">
                {country.opponents.map((o) => (
                  <li key={o} className="flex items-center justify-between border-b border-border/40 pb-2 font-editorial text-lg last:border-0">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl border border-border/70 bg-card/80 p-6 backdrop-blur-xl">
    <div className="flex items-center gap-3 text-gold">
      {icon}
      <p className="font-mono text-xs uppercase tracking-[0.3em]">{label}</p>
    </div>
    <p className="font-display mt-3 text-5xl">{value}</p>
  </div>
);

export default CountryPage;