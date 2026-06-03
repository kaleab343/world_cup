import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Trophy, Users, Languages } from "lucide-react";
import { getCountry, flagUrl } from "@/data/countries";
import { placeBet } from "@/lib/bets";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, formatCurrency } from "@/lib/i18n";

const CountryPage = () => {
  const { code = "" } = useParams();
  const navigate = useNavigate();
  const country = getCountry(code);
  const { language, setLanguage } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const amount = 100; // Fixed at 100 Birr

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

      {/* Full-bleed flag background */}
      <div className="absolute inset-0">
        <motion.div
          key={country.code}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${flagUrl(country.code, "w1280")})`,
            filter: "blur(8px)",
            opacity: 0.4
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
      <div className="absolute inset-0 bg-floodlight" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold sm:tracking-[0.3em]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t('backToCountries')}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-6 sm:mt-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold sm:tracking-[0.3em]">{t('group')} {country.group}</p>
          <h1 className="font-display mt-2 text-[clamp(2.5rem,12vw,12rem)] leading-[0.9] tracking-tight sm:mt-3">
            {country.name.toUpperCase()}
          </h1>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Betting panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-xl border border-border/70 bg-card/80 p-4 backdrop-blur-xl sm:p-8"
          >
            <div className="flex items-baseline justify-between border-b border-border/60 pb-4 sm:pb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                {t('oddsToWin')}
              </span>
              <span className="font-display text-4xl text-gold sm:text-6xl">{country.odds.toFixed(2)}x</span>
            </div>

            <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                  {t('yourBet')}
                </label>
                <div className="mt-3 flex items-center justify-center gap-3 rounded-lg border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-6 sm:gap-4">
                  <span className="font-display text-5xl text-gold sm:text-6xl">{formatCurrency(amount, language)}</span>
                </div>
                <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
                  {language === 'am' ? 'ውርርዎ 100 ብር ተስተካክሏል' : 'Bet amount fixed at 100 Birr'}
                </p>
              </div>

              <div className="rounded-lg border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-4 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                  {t('potentialPayout')}
                </p>
                <p className="font-display mt-2 text-3xl sm:text-5xl">
                  <span className="block text-base sm:inline sm:text-5xl">{t('bet')} {formatCurrency(amount, language)}</span>
                  <span className="mx-2 hidden sm:inline">→</span>
                  <span className="mt-1 block text-gold sm:mt-0 sm:inline">
                    {t('win')} {formatCurrency(payout, language)}
                  </span>
                </p>
              </div>

              <Button
                onClick={handlePlace}
                size="lg"
                className="font-editorial h-12 w-full bg-gradient-gold text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-glow hover:opacity-90 sm:h-14 sm:text-base sm:tracking-[0.2em]"
              >
                {t('placeBetOn')} {country.name}
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <StatCard
              icon={<Trophy className="h-4 w-4 sm:h-5 sm:w-5" />}
              label={t('worldCupWins')}
              value={country.worldCupWins.toString()}
            />
            <StatCard
              icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />}
              label={t('winProbability')}
              value={`${country.winProbability}%`}
            />
            <div className="rounded-xl border border-border/70 bg-card/80 p-4 backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-2 text-gold sm:gap-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">{t('groupOpponents')}</p>
              </div>
              <ul className="mt-3 space-y-2 sm:mt-4">
                {country.opponents.map((o) => (
                  <li key={o} className="flex items-center justify-between border-b border-border/40 pb-2 font-editorial text-base last:border-0 sm:text-lg">
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
  <div className="rounded-xl border border-border/70 bg-card/80 p-4 backdrop-blur-xl sm:p-6">
    <div className="flex items-center gap-2 text-gold sm:gap-3">
      {icon}
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">{label}</p>
    </div>
    <p className="font-display mt-2 text-4xl sm:mt-3 sm:text-5xl">{value}</p>
  </div>
);

export default CountryPage;