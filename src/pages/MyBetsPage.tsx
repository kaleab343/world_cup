import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Languages } from "lucide-react";
import { getBets } from "@/lib/bets";
import { flagUrl } from "@/data/countries";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, formatCurrency } from "@/lib/i18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const MyBetsPage = () => {
  const bets = getBets();
  const { language, setLanguage } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const [cashOutBet, setCashOutBet] = useState<any>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState<"bank" | "mobile">("bank");
  const { toast } = useToast();

  const handleCashOut = () => {
    if (!accountNumber.trim()) {
      toast({
        title: language === 'am' ? 'ስህተት' : 'Error',
        description: language === 'am' ? 'የሂሳብ ቁጥር ያስፈልጋል' : 'Account number is required',
        variant: "destructive",
      });
      return;
    }

    toast({
      title: language === 'am' ? 'የመውጣት ጥያቄ ተጀምሯል' : 'Withdrawal Requested',
      description: language === 'am' 
        ? `${formatCurrency(cashOutBet.payout, language)} የመውጫ ጥያቄዎ በሂደት ላይ ነው።`
        : `Your withdrawal of ${formatCurrency(cashOutBet.payout, language)} is being processed.`,
    });
    
    setCashOutBet(null);
    setAccountNumber("");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-12">
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

      <div className="mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold">
          <ArrowLeft className="h-3.5 w-3.5" /> {t('backHome')}
        </Link>

        <h1 className="font-display mt-8 text-6xl sm:text-7xl">
          {t('myBets')} <span className="text-gold">{t('betsTitle')}</span>
        </h1>
        <p className="mt-3 font-editorial text-muted-foreground">
          {bets.length} {bets.length === 1 ? t('betSingular') : t('betsPlural')} {t('betsPlaced')}
        </p>

        {bets.length === 0 ? (
          <div className="mt-16 rounded-xl border border-border/70 bg-card/80 p-12 text-center">
            <p className="font-editorial text-lg text-muted-foreground">{t('noBetsYet')}</p>
            <Button asChild className="mt-6 bg-gradient-gold uppercase tracking-wider text-primary-foreground">
              <Link to="/">{t('placeFirstBet')}</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {bets.map((b) => (
              <li
                key={b.id}
                className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card/80 p-4 backdrop-blur-xl sm:flex-row sm:items-center"
              >
                <img src={flagUrl(b.countryCode, "w320")} alt="" className="h-16 w-24 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="font-display text-2xl">{b.countryName}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {new Date(b.placedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <div className="text-left sm:text-right">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t('stakeWin')}</p>
                    <p className="font-display text-xl">
                      {formatCurrency(b.amount, language)} →{" "}
                      <span className="text-gold">{formatCurrency(b.payout, language)}</span>
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setCashOutBet(b)}
                    className="bg-gradient-gold font-editorial uppercase tracking-wider text-primary-foreground hover:opacity-90"
                  >
                    {t('cashOut')}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cash Out Dialog */}
      <Dialog open={!!cashOutBet} onOpenChange={() => setCashOutBet(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'am' ? 'ገንዘብ መውጣት' : 'Cash Out'}
            </DialogTitle>
            <DialogDescription>
              {language === 'am' 
                ? `${formatCurrency(cashOutBet?.payout || 0, language)} ለመውጣት ዝግጁ ነዎት።`
                : `You are about to withdraw ${formatCurrency(cashOutBet?.payout || 0, language)}.`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-4">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {language === 'am' ? 'የመውጣት መጠን' : 'Withdrawal Amount'}
              </p>
              <p className="font-display mt-1 text-4xl text-gold">
                {formatCurrency(cashOutBet?.payout || 0, language)}
              </p>
            </div>

            <div className="space-y-2">
              <Label>{language === 'am' ? 'መውጫ ዘዴ' : 'Withdrawal Method'}</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={withdrawMethod === "bank" ? "default" : "outline"}
                  onClick={() => setWithdrawMethod("bank")}
                  className="flex-1"
                >
                  {t('bankAccount')}
                </Button>
                <Button
                  type="button"
                  variant={withdrawMethod === "mobile" ? "default" : "outline"}
                  onClick={() => setWithdrawMethod("mobile")}
                  className="flex-1"
                >
                  {t('mobileWallet')}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">
                {withdrawMethod === "bank" 
                  ? (language === 'am' ? 'የባንክ ሂሳብ ቁጥር' : 'Bank Account Number')
                  : (language === 'am' ? 'የስልክ ቁጥር' : 'Mobile Number')
                }
              </Label>
              <Input
                id="account"
                type="text"
                placeholder={withdrawMethod === "bank" ? "1234567890" : "+251912345678"}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleCashOut}
              className="w-full bg-gradient-gold font-editorial uppercase tracking-wider text-primary-foreground hover:opacity-90"
            >
              {t('requestWithdrawal')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBetsPage;