import { useState, useEffect, useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Copy, Check, MessageCircle, Languages } from "lucide-react";
import { getBets } from "@/lib/bets";
import { flagUrl } from "@/data/countries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, formatCurrency } from "@/lib/i18n";

const TELEBIRR_NUMBER = "+251912345678"; // Replace with actual TeleBirr number
const TELEGRAM_SUPPORT = "https://t.me/worldcup2026support"; // Replace with actual Telegram group
const API_ENDPOINT = (import.meta.env.VITE_API_ENDPOINT || "https://worldcup-backend-r8kf.onrender.com") + "/submit-payment.php";

console.log('API_ENDPOINT:', API_ENDPOINT); // Debug log

const PaymentPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const bet = useMemo(() => getBets().find((b) => b.id === id), [id]);
  const { language, setLanguage } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const { toast } = useToast();
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!bet) return <Navigate to="/" replace />;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TELEBIRR_NUMBER);
    setCopied(true);
    toast({
      title: language === 'am' ? 'ተገልብጧል!' : 'Copied!',
      description: language === 'am' ? 'የስልክ ቁጥር ተገልብጧል' : 'Phone number copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: language === 'am' ? 'ስህተት' : 'Error',
        description: language === 'am' ? 'የስልክ ቁጥር ያስፈልጋል' : 'Phone number is required',
        variant: "destructive",
      });
      return;
    }

    if (!screenshot) {
      toast({
        title: language === 'am' ? 'ስህተት' : 'Error',
        description: language === 'am' ? 'የክፍያ ማረጋገጫ ስክሪንሾት ያስፈልጋል' : 'Payment screenshot is required',
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('phoneNumber', phoneNumber);
      formData.append('betId', bet.id);
      formData.append('countryName', bet.countryName);
      formData.append('amount', bet.amount.toString());
      formData.append('payout', bet.payout.toString());
      formData.append('screenshot', screenshot);

      toast({
        title: language === 'am' ? 'በመላክ ላይ...' : 'Submitting...',
        description: language === 'am' ? 'እባክዎ ይጠብቁ' : 'Please wait',
      });

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Show success modal
        setShowSuccessModal(true);
        
        // Clear form
        setPhoneNumber('');
        setScreenshot(null);
        setPreviewUrl('');
        
        // No auto-redirect - user must click button
      } else {
        throw new Error(result.message || 'Failed to submit payment');
      }
    } catch (error: any) {
      toast({
        title: language === 'am' ? 'ስህተት' : 'Error',
        description: error.message || (language === 'am' ? 'ክፍያ መላክ አልተቻለም' : 'Failed to submit payment'),
        variant: "destructive",
      });
    }
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

      <img
        src={flagUrl(bet.countryCode, "w1280")}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to={`/country/${bet.countryCode}`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {language === 'am' ? 'ተመለስ' : 'Back'}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <h1 className="font-display text-5xl sm:text-7xl">
            {language === 'am' ? 'ክፍያ' : 'PAYMENT'}
          </h1>
          <p className="mt-3 font-editorial text-muted-foreground">
            {language === 'am' 
              ? 'ውርርድዎን ለማጠናቀቅ በቴሌብር ይክፈሉ'
              : 'Complete your bet payment via TeleBirr'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          {/* Bet Summary */}
          <div className="rounded-xl border border-border/70 bg-card/80 p-6 backdrop-blur-xl">
            <h2 className="font-display text-2xl text-gold">{bet.countryName}</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-sm text-muted-foreground">
                {language === 'am' ? 'ውርርድ መጠን' : 'Amount to Pay'}
              </span>
              <span className="font-display text-4xl text-gold">{formatCurrency(bet.amount, language)}</span>
            </div>
          </div>

          {/* TeleBirr Instructions */}
          <div className="rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-6">
            <h3 className="font-display text-xl">
              {language === 'am' ? 'በቴሌብር ይክፈሉ' : 'Pay with TeleBirr'}
            </h3>
            <div className="mt-4 space-y-3">
              <p className="font-editorial text-sm text-muted-foreground">
                {language === 'am' 
                  ? '1. ወደ ቴሌብር መተግበሪያዎ ይሂዱ'
                  : '1. Open your TeleBirr app'}
              </p>
              <p className="font-editorial text-sm text-muted-foreground">
                {language === 'am' 
                  ? '2. ገንዘብ ላክ ይምረጡ'
                  : '2. Select Send Money'}
              </p>
              <p className="font-editorial text-sm text-muted-foreground">
                {language === 'am'
                  ? `3. ይህንን ቁጥር በመጠቀም ${formatCurrency(bet.amount, language)} ይላኩ:`
                  : `3. Send ${formatCurrency(bet.amount, language)} to this number:`}
              </p>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-border/60 bg-secondary/40 p-3">
                  <p className="font-display text-2xl text-gold">{TELEBIRR_NUMBER}</p>
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>

              <p className="font-editorial text-sm text-muted-foreground">
                {language === 'am'
                  ? '4. ክፍያዎን ለማረጋገጥ ከታች ያለውን የክፍያ ስክሪንሾት (screenshot) ይላኩ።'
                  : '4. To confirm your payment, send the payment screenshot below.'}
              </p>
            </div>
          </div>

          {/* Payment Confirmation Form */}
          <div className="rounded-xl border border-border/70 bg-card/80 p-6 backdrop-blur-xl">
            <h3 className="font-display text-xl">
              {language === 'am' ? 'ክፍያ ያረጋግጡ' : 'Confirm Payment'}
            </h3>
            
            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {language === 'am' ? 'የእርስዎ የቴሌብር ስልክ ቁጥር' : 'Your TeleBirr Phone Number'}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+251912345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screenshot">
                  {language === 'am' ? 'የክፍያ ማረጋገጫ ስክሪንሾት' : 'Payment Confirmation Screenshot'}
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Input
                      id="screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="h-12"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12"
                      onClick={() => document.getElementById('screenshot')?.click()}
                    >
                      <Upload className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {previewUrl && (
                    <div className="rounded-lg border border-border/60 bg-secondary/20 p-3">
                      <img 
                        src={previewUrl} 
                        alt="Payment screenshot preview" 
                        className="max-h-64 w-full rounded object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="h-12 w-full bg-gradient-gold font-editorial uppercase tracking-wider text-primary-foreground hover:opacity-90"
              >
                {language === 'am' ? 'ክፍያ አረጋግጥ' : 'Confirm Payment'}
              </Button>
            </div>
          </div>

          {/* Telegram Support */}
          <div className="rounded-xl border border-border/70 bg-card/80 p-6 text-center backdrop-blur-xl">
            <MessageCircle className="mx-auto h-10 w-10 text-gold" />
            <h3 className="mt-3 font-display text-xl">
              {language === 'am' ? 'ድጋፍ ያስፈልግዎታል?' : 'Need Help?'}
            </h3>
            <p className="mt-2 font-editorial text-sm text-muted-foreground">
              {language === 'am' 
                ? 'የእኛን የቴሌግራም ድጋፍ ቡድን ይቀላቀሉ'
                : 'Join our Telegram support group'}
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-4"
            >
              <a href={TELEGRAM_SUPPORT} target="_blank" rel="noopener noreferrer">
                {language === 'am' ? 'ቴሌግራም ድጋፍ' : 'Telegram Support'}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Success Modal - Shows after payment submission */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-card p-8 text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold shadow-glow"
              >
                <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 font-display text-3xl text-gold"
              >
                {language === 'am' ? '✅ ክፍያ ተልኳል!' : '✅ Payment Submitted!'}
              </motion.h2>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 space-y-4"
              >
                <div className="rounded-lg border border-gold/20 bg-gold/5 p-6">
                  <MessageCircle className="mx-auto h-12 w-12 text-gold mb-4" />
                  <p className="font-editorial text-base text-muted-foreground leading-relaxed">
                    {language === 'am' 
                      ? 'ክፍያዎ በማረጋገጫ ላይ ነው። የድጋፍ ቡድናችን በቅርቡ በቴሌግራም ያነጋግርዎታል።'
                      : 'Your payment is being verified. Our support team will contact you soon via Telegram.'}
                  </p>
                </div>
              </motion.div>

              {/* Manual redirect button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Button
                  onClick={() => navigate('/')}
                  className="w-full bg-gradient-gold font-editorial uppercase tracking-wider text-primary-foreground hover:opacity-90"
                >
                  {language === 'am' ? 'ወደ አገር ምርጫ ተመለስ' : 'Back to Country Selection'}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
