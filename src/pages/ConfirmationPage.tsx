import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Languages } from "lucide-react";
import { getBets } from "@/lib/bets";
import { flagUrl } from "@/data/countries";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, formatCurrency } from "@/lib/i18n";

const ConfirmationPage = () => {
  const { id = "" } = useParams();
  const bet = useMemo(() => getBets().find((b) => b.id === id), [id]);
  const { language, setLanguage } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  
  const confettiPieces = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      hue: Math.random() > 0.5 ? 45 : 0,
    })), []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!bet) return <Navigate to="/" replace />;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      {/* Language Toggle */}
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
          className="gap-2 border-gold/30 bg-background/60 backdrop-blur"
        >
          <Languages className="h-4 w-4" />
          {language === 'en' ? 'አማርኛ' : 'English'}
        </Button>
      </div>

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

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-gold">
          {language === 'am' ? 'ክፍያ ተልኳል' : 'Payment Submitted'}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-none sm:text-6xl">
          {language === 'am' ? 'በማረጋገጫ ላይ' : 'Being Verified'}
        </h1>
        <p className="mt-4 font-editorial text-base text-muted-foreground sm:text-lg">
          {language === 'am' 
            ? 'ክፍያዎ በማረጋገጫ ላይ ነው። የድጋፍ ቡድናችን በቅርቡ ያነጋግርዎታል።'
            : 'Your payment is being verified. Our support team will contact you soon.'}
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4 border-y border-border/60 py-6 text-left">
          <Field label={t('stake')} value={formatCurrency(bet.amount, language)} />
          <Field label={t('odds')} value={`${bet.odds.toFixed(2)}x`} />
          <Field label={t('payout')} value={formatCurrency(bet.payout, language)} highlight />
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {language === 'am' 
            ? '📞 የድጋፍ ቡድን ያነጋግርዎታል'
            : '📞 Support team will contact you'}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="bg-gradient-gold font-editorial uppercase tracking-wider text-primary-foreground hover:opacity-90">
            <Link to="/">{t('betOnAnother')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-editorial uppercase tracking-wider">
            <Link to="/my-bets">{t('viewMyBets')}</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const Field = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div>
    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    <p className={`font-display mt-2 text-3xl ${highlight ? "text-gold" : ""}`}>
      {value}
    </p>
  </div>
);

export default ConfirmationPage;