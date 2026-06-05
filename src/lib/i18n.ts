export type Language = 'en' | 'am';

export const translations = {
  en: {
    // HomePage
    worldCup: 'FIFA World Cup 2026',
    whoWillWin: 'WHO WILL',
    winItAll: 'WIN IT ALL?',
    heroSubtitle: '48 nations. One trophy. Pick your champion below and place your bet on history.',
    placeYourBet: 'Place Your Bet',
    finalDate: 'Final · July 19, 2026',
    selectNation: 'Select a nation',
    allContenders: 'All 48 contenders',
    teams: 'teams',
    betOn: 'Bet on',
    footer: 'Demo platform · For entertainment only · 18+',
    
    // CountryPage
    backToCountries: 'Back',
    group: 'Group',
    oddsToWin: 'Odds to win',
    yourBet: 'Your bet (ETB)',
    potentialPayout: 'Potential payout',
    bet: 'Bet',
    win: 'Win',
    placeBetOn: 'Place Bet on',
    worldCupWins: 'World Cup Wins',
    winProbability: 'Win Probability',
    groupOpponents: 'Group stage opponents',
    
    // ConfirmationPage
    betConfirmed: 'Bet confirmed',
    betPlaced: 'Your bet is placed. Now sit back and watch the magic happen.',
    stake: 'Stake',
    odds: 'Odds',
    payout: 'Payout',
    expectedPayoutDate: 'Expected payout date',
    betOnAnother: 'Bet on Another Country',
    viewMyBets: 'View My Bets',
    
    // MyBetsPage
    backHome: 'Back home',
    myBets: 'My',
    betsTitle: 'Bets',
    betsPlaced: 'bets placed for World Cup 2026',
    bet: 'bet',
    bets: 'bets',
    noBetsYet: 'No bets yet.',
    placeFirstBet: 'Place your first bet',
    stakeWin: 'Stake → Win',
    cashOut: 'Cash Out',
    
    // WithdrawalsPage
    withdrawalAmount: 'Withdrawal Amount',
    withdrawTo: 'Withdraw to',
    bankAccount: 'Bank Account',
    mobileWallet: 'Mobile Wallet',
    requestWithdrawal: 'Request Withdrawal',
    
    // QR Code
    useQR: 'Use QR Code',
    qrInstructions: 'Important Instructions:',
    screenshotQR: 'Screenshot this QR code on your phone',
    
    // Currency
    currency: 'ETB',
    currencySymbol: 'Br',
  },
  am: {
    // HomePage
    worldCup: 'የፊፋ የዓለም ዋንጫ 2026',
    whoWillWin: 'ማን',
    winItAll: 'ያሸንፋል?',
    heroSubtitle: '48 ሀገራት። አንድ ዋንጫ። ቻምፒዮንዎን ይምረጡ እና ውርርዎን ያድርጉ።',
    placeYourBet: 'ውርርዎን ያድርጉ',
    finalDate: 'ፍፃሜ · ጁላይ 19, 2026',
    selectNation: 'ሀገር ይምረጡ',
    allContenders: '48 ተወዳዳሪዎች',
    teams: 'ቡድኖች',
    betOn: 'ውርር በ',
    footer: 'ለመዝናኛ ብቻ · 18+',
    
    // CountryPage
    backToCountries: 'ተመለስ',
    group: 'ቡድን',
    oddsToWin: 'የማሸነፍ እድል',
    yourBet: 'ውርርዎ (ብር)',
    potentialPayout: 'የሚያገኙት ገንዘብ',
    bet: 'ውርርድ',
    win: 'ያሸንፋሉ',
    placeBetOn: 'ውርርድ ያድርጉ በ',
    worldCupWins: 'የዓለም ዋንጫ ድሎች',
    winProbability: 'የማሸነፍ መቶኛ',
    groupOpponents: 'የቡድን ደረጃ ተቀናቃኞች',
    
    // ConfirmationPage
    betConfirmed: 'ውርር ተረጋግጧል',
    betPlaced: 'ውርርዎ ተቀምጧል። አሁን ተቀምጠው ድንቅ ነገሩን ይመልከቱ።',
    stake: 'ውርር',
    odds: 'እድል',
    payout: 'ክፍያ',
    expectedPayoutDate: 'የሚጠበቅ የክፍያ ቀን',
    betOnAnother: 'በሌላ ሀገር ላይ ውርር ያድርጉ',
    viewMyBets: 'ውርሮቼን ይመልከቱ',
    
    // MyBetsPage
    backHome: 'ወደ ቤት',
    myBets: 'የኔ',
    betsTitle: 'ውርሮች',
    betsPlaced: 'ለዓለም ዋንጫ 2026 የተደረጉ ውርሮች',
    bet: 'ውርር',
    bets: 'ውርሮች',
    noBetsYet: 'ገና ምንም ውርር የለም።',
    placeFirstBet: 'የመጀመሪያ ውርርዎን ያድርጉ',
    stakeWin: 'ውርር → አሸናፊ',
    cashOut: 'ገንዘብ ውጣ',
    
    // WithdrawalsPage
    withdrawalAmount: 'የመውጣት መጠን',
    withdrawTo: 'መውጫ ወደ',
    bankAccount: 'የባንክ ሂሳብ',
    mobileWallet: 'ሞባይል ዋሌት',
    requestWithdrawal: 'መውጣት ይጠይቁ',
    
    // QR Code
    useQR: 'QR ኮድ ይጠቀሙ',
    qrInstructions: 'አስፈላጊ መመሪያዎች:',
    screenshotQR: 'ይህንን QR ኮድ በስልክዎ ያስቀምጡ',
    
    // Currency
    currency: 'ብር',
    currencySymbol: 'ብር',
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations.en): string => {
  return translations[lang][key] || translations.en[key];
};

export const formatCurrency = (amount: number, lang: Language): string => {
  const symbol = translations[lang].currencySymbol;
  return `${symbol}${amount.toLocaleString()}`;
};
