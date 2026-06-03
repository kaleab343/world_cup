import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { COUNTRIES, flagUrl } from "@/data/countries";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";

const HomePage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const t = (key: any) => getTranslation(language, key);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
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
      {/* Flag mosaic background with blend effect */}
      <div
        className="absolute inset-0 grid gap-1 p-1"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
        aria-hidden="true"
      >
        {COUNTRIES.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: [0.55, 0.75, 0.55],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              delay: i * 0.015, 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="aspect-[4/3] overflow-hidden rounded-sm bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${flagUrl(c.code, "w320")})`,
              mixBlendMode: "lighten"
            }}
          />
        ))}
      </div>

      {/* Vignette + floodlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="absolute inset-0 bg-floodlight" />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur"
        >
          <Trophy className="h-3.5 w-3.5" /> {t('worldCup')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="font-display mt-6 text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] tracking-tight"
        >
          {t('whoWillWin')} <br />
          <span className="bg-gradient-gold bg-clip-text text-transparent">{t('winItAll')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 max-w-xl font-editorial text-base text-muted-foreground sm:text-lg"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            onClick={() => document.getElementById("flags")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-gold font-editorial text-base font-bold uppercase tracking-wider text-primary-foreground shadow-glow hover:opacity-90"
          >
            {t('placeYourBet')} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t('finalDate')}
          </span>
        </motion.div>
      </section>

      {/* Interactive flag grid */}
      <section id="flags" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">{t('selectNation')}</p>
            <h2 className="font-display mt-2 text-5xl sm:text-6xl">{t('allContenders')}</h2>
          </div>
          <p className="hidden font-mono text-xs text-muted-foreground sm:block">{COUNTRIES.length} {t('teams')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {COUNTRIES.map((c, i) => (
            <motion.button
              key={c.code}
              type="button"
              onClick={() => navigate(`/country/${c.code}`)}
              aria-label={`${t('betOn')} ${c.name}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * i, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-md border border-border/60 bg-card shadow-md transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <img
                src={flagUrl(c.code, "w320")}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-2.5 text-left">
                <p className="font-display text-lg leading-none tracking-wide text-foreground sm:text-xl">
                  {c.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-gold">
                  {c.odds.toFixed(2)}x
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {t('footer')}
      </footer>
    </div>
  );
};

export default HomePage;