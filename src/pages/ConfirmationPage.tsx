import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { getBets } from "@/lib/bets";
import { flagUrl } from "@/data/countries";
import { Button } from "@/components/ui/button";

const ConfirmationPage = () => {
  const { id = "" } = useParams();
  const bet = useMemo(() => getBets().find((b) => b.id === id), [id]);
  const [confettiPieces] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      hue: Math.random() > 0.5 ? 45 : 0,
    }))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!bet) return <Navigate to="/" replace />;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      <img
        src={flagUrl(bet.countryCode, "w1280")}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      <div className="absolute inset-0 bg-floodlight" />

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confettiPieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 720 }}
            transition={{ delay: p.delay, duration: p.duration, ease: "easeIn", repeat: Infinity, repeatDelay: 3 }}
            className="absolute top-0 h-2.5 w-2.5 rounded-sm"
            style={{
              left: `${p.x}%`,
              background: p.hue === 45 ? "hsl(45 95% 55%)" : "hsl(45 25% 96%)",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-border/70 bg-card/90 p-10 text-center backdrop-blur-xl sm:p-14"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold shadow-glow"
        >
          <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
        </motion.div>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-gold">Bet confirmed</p>
        <h1 className="font-display mt-3 text-5xl leading-none sm:text-7xl">
          {bet.countryName.toUpperCase()}
        </h1>
        <p className="mt-4 font-editorial text-base text-muted-foreground sm:text-lg">
          Your bet is placed. Now sit back and watch the magic happen.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4 border-y border-border/60 py-6 text-left">
          <Field label="Stake" value={`€${bet.amount.toLocaleString()}`} />
          <Field label="Odds" value={`${bet.odds.toFixed(2)}x`} />
          <Field label="Payout" value={`€${bet.payout.toLocaleString()}`} highlight />
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Expected payout date · <span className="text-gold">{bet.payoutDate}</span>
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="bg-gradient-gold font-editorial uppercase tracking-wider text-primary-foreground hover:opacity-90">
            <Link to="/">Bet on Another Country</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-editorial uppercase tracking-wider">
            <Link to="/my-bets">View My Bets</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const Field = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div>
    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    <p className={`font-display mt-2 text-3xl ${highlight ? "bg-gradient-gold bg-clip-text text-transparent" : ""}`}>
      {value}
    </p>
  </div>
);

export default ConfirmationPage;