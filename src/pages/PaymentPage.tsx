import { useState, useEffect, useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Copy, Check, MessageCircle, Languages, QrCode, Camera, X } from "lucide-react";
import { getBets } from "@/lib/bets";
import { flagUrl } from "@/data/countries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, formatCurrency } from "@/lib/i18n";
import { QRCodeSVG } from 'qrcode.react';

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
  const [showQRModal, setShowQRModal] = useState(false);

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
        // Show QR modal instead of navigating
        setShowQRModal(true);
        
        toast({
          title: language === 'am' ? 'ክፍያ ተልኳል!' : 'Payment Submitted!',
          description: language === 'am' 
            ? 'የQR ኮድ በስክሪንሾት ያድርጉ እና ክፍያውን ይክፈሉ'
            : 'Screenshot the QR code and complete your payment',
        });
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

  const handleCloseQR = () => {
    setShowQRModal(false);
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
              ? 'ውርርዎን ለማጠናቀቅ በቴሌብር ይክፈሉ'
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
                {language === 'am' ? 'የክፍያ መጠን' : 'Amount to Pay'}
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
                  ? '3. ይህንን ቁጥር ይጠቀሙ:'
                  : '3. Use this number:'}
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
                  ? `4. ${formatCurrency(bet.amount, language)} ይላኩ`
                  : `4. Send ${formatCurrency(bet.amount, language)}`}
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

      {/* QR Code Modal - Shows AFTER successful submission */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={handleCloseQR}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-card p-8"
            >
              <Button
                onClick={handleCloseQR}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-3 text-gold mb-6">
                  <QrCode className="h-8 w-8" />
                  <h2 className="font-display text-3xl">
                    {language === 'am' ? 'QR ኮድ' : 'QR CODE'}
                  </h2>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <QRCodeSVG 
                    value={TELEBIRR_NUMBER}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                  <p className="mt-4 text-center font-display text-sm text-black">
                    {TELEBIRR_NUMBER}
                  </p>
                  <p className="mt-2 text-center font-display text-3xl text-black font-bold">
                    {formatCurrency(bet.amount, language)}
                  </p>
                </div>

                <div className="mt-6 rounded-lg border border-gold/30 bg-gold/5 p-4">
                  <div className="flex items-start gap-3">
                    <Camera className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <div className="space-y-2 text-left">
                      <p className="font-editorial text-sm font-bold text-gold">
                        {language === 'am' ? '⚠️ አስፈላጊ:' : '⚠️ Important:'}
                      </p>
                      <ol className="space-y-1 font-editorial text-sm text-muted-foreground list-decimal list-inside">
                        <li>{language === 'am' ? 'ይህንን QR በስክሪንሾት ያድርጉ' : 'Screenshot this QR code'}</li>
                        <li>{language === 'am' ? 'ቴሌብር አፕ ይክፈቱ' : 'Open TeleBirr app'}</li>
                        <li>{language === 'am' ? 'QR ስካን ይምረጡ' : 'Select Scan QR'}</li>
                        <li>{language === 'am' ? 'ክፍያውን ይክፈሉ' : 'Complete payment'}</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCloseQR}
                  className="mt-6 w-full bg-gradient-gold font-editorial uppercase tracking-wider text-primary-foreground hover:opacity-90"
                >
                  {language === 'am' ? 'ተረድቻል' : 'Got It'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
