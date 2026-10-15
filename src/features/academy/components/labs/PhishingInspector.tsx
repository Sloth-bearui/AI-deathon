import React, { useState } from 'react';
import { Card, Button } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  ExternalLink,
  Lock,
  PhoneCall,
  Globe,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const PhishingInspector: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [inspectedSender, setInspectedSender] = useState(false);
  const [inspectedUrl, setInspectedUrl] = useState(false);
  const [inspectedUrgency, setInspectedUrgency] = useState(false);

  const [simulationState, setSimulationState] = useState<'inspecting' | 'fake-site' | 'takeover-consequence'>('inspecting');
  const [username, setUsername] = useState('user_rahul');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [savingsBalance, setSavingsBalance] = useState(85000);
  const [isDraining, setIsDraining] = useState(false);

  const allFound = inspectedSender && inspectedUrl && inspectedUrgency;

  const handleOpenFakeSite = () => {
    setSimulationState('fake-site');
  };

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulationState('takeover-consequence');
    setIsDraining(true);
    setTimeout(() => {
      setSavingsBalance(200);
      setIsDraining(false);
    }, 900);
  };

  const handleReset = () => {
    setSimulationState('inspecting');
    setInspectedSender(false);
    setInspectedUrl(false);
    setInspectedUrgency(false);
    setPassword('');
    setOtp('');
    setSavingsBalance(85000);
    setIsDraining(false);
  };

  return (
    <div className="space-y-6">
      {/* Exercise Description */}
      <div className="p-4 rounded-xl border border-line bg-surface/50 text-sm text-ink-2 leading-relaxed">
        <p>
          <strong className="text-ink">
            {isHi ? 'इंटरैक्टिव अभ्यास:' : 'Interactive Exercise & Simulation:'}
          </strong>{' '}
          {isHi
            ? 'इस आने वाले एसएमएस के तीन संदिग्ध हिस्सों पर टैप करके जांचें। या लिंक पर क्लिक करके देखें कि यदि कोई गलत कदम उठाता है तो क्या वास्तविक परिणाम होते हैं।'
            : 'Tap on the three suspicious parts of this incoming SMS to inspect why they are red flags. Or tap the link to simulate the dangerous real-world consequences if someone falls for it.'}
        </p>
      </div>

      {/* STATE 1: INSPECTION MODE */}
      {simulationState === 'inspecting' && (
        <div className="space-y-6 animate-fade-in">
          {/* Simulated SMS Card */}
          <Card className="p-5 sm:p-6 border-2 border-line bg-surface/70 space-y-4 shadow-lift">
            {/* Flag 1: Sender */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-line">
              <div>
                <span className="text-ink-3">{isHi ? 'भेजने वाला: ' : 'From: '}</span>
                <button
                  type="button"
                  onClick={() => setInspectedSender(true)}
                  className={cn(
                    'font-mono px-2 py-1 rounded transition-all font-semibold',
                    inspectedSender
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : 'bg-accent/15 text-accent-ink hover:ring-2 hover:ring-accent',
                  )}
                >
                  +91-98401XXXXX ({isHi ? 'जांच के लिए टैप करें' : 'Tap to inspect'})
                </button>
              </div>
              <span className="text-ink-3">{isHi ? 'आज 11:42 AM' : 'Today 11:42 AM'}</span>
            </div>

            {/* Flag 2 & 3: Urgency & URL in body */}
            <div className="p-4 rounded-xl bg-surface/90 border border-line text-sm leading-relaxed space-y-3">
              <p>
                <button
                  type="button"
                  onClick={() => setInspectedUrgency(true)}
                  className={cn(
                    'text-left transition-all px-2 py-1 rounded font-medium',
                    inspectedUrgency
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-accent/10 text-ink hover:ring-2 hover:ring-accent',
                  )}
                >
                  {isHi
                    ? '"अति आवश्यक: अपूर्ण केवाईसी के कारण आपका Nova Bank डेबिट कार्ड तुरंत निष्क्रिय कर दिया गया है।"'
                    : '"URGENT: Your Nova Bank debit card is DEACTIVATED immediately due to incomplete KYC."'}
                </button>
              </p>

              <p className="text-ink-2">
                {isHi ? 'कृपया 24 घंटे के भीतर अपने कार्ड को पुनः सक्रिय करें:' : 'Please re-activate your card within 24 hours at:'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setInspectedUrl(true);
                  }}
                  className={cn(
                    'font-mono font-semibold transition-all px-2 py-1 rounded break-all',
                    inspectedUrl
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : 'bg-accent/15 text-accent-ink hover:ring-2 hover:ring-accent',
                  )}
                >
                  http://novabank-kyc-reactivate.site/login
                </button>
              </p>

              {/* Dangerous choice prompt */}
              <div className="pt-2 border-t border-line/60 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-rose-300 font-bold">
                  {isHi ? '⚠️ अनुभव करें: यदि कोई इस लिंक पर क्लिक करे तो क्या होता है?' : '⚠️ See what happens if a victim clicks this link:'}
                </span>
                <Button
                  size="sm"
                  variant="danger"
                  icon={<ExternalLink />}
                  onClick={handleOpenFakeSite}
                >
                  {isHi ? 'लिंक खोलें और परिणाम देखें' : 'Simulate Clicking Link'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Feedback Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className={cn(
                'p-4 rounded-xl border text-xs leading-relaxed transition-all',
                inspectedSender ? 'border-ok/40 bg-ok/10 text-ink' : 'border-line bg-surface/30 opacity-70 text-ink-3',
              )}
            >
              <span className="font-semibold block text-ink mb-1">
                {inspectedSender ? (isHi ? '✓ व्यक्तिगत फ़ोन नंबर' : '✓ Personal Phone Number') : (isHi ? 'संकेत 1: प्रेषक की जांच' : 'Flag 1: Sender Check')}
              </span>
              {inspectedSender
                ? (isHi
                    ? 'असली भारतीय बैंक केवल 6-अक्षर वाले पंजीकृत हेडर (जैसे AD-NOVABK) से एसएमएस भेजते हैं, कभी भी 10-अंकों के व्यक्तिगत सिम कार्ड से नहीं।'
                    : 'Real Indian banks send SMS from registered 6-character TRAI headers (e.g. AD-NOVABK), never personal 10-digit mobile SIMs.')
                : (isHi ? 'ऊपर दिए गए प्रेषक नंबर पर टैप करें।' : 'Tap the sender number above.')}
            </div>

            <div
              className={cn(
                'p-4 rounded-xl border text-xs leading-relaxed transition-all',
                inspectedUrgency ? 'border-ok/40 bg-ok/10 text-ink' : 'border-line bg-surface/30 opacity-70 text-ink-3',
              )}
            >
              <span className="font-semibold block text-ink mb-1">
                {inspectedUrgency ? (isHi ? '✓ कृत्रिम तात्कालिकता' : '✓ Artificial Urgency') : (isHi ? 'संकेत 2: भाषा की जांच' : 'Flag 2: Urgency Check')}
              </span>
              {inspectedUrgency
                ? (isHi
                    ? 'धोखेबाज घबराहट पैदा करने के लिए तत्काल ब्लॉकिंग की धमकी देते हैं ताकि आप बिना सोचे-समझे लिंक पर क्लिक कर दें।'
                    : 'Scammers engineer panic with 24-hour deactivation threats so you act impulsively without verifying.')
                : (isHi ? 'तात्कालिक चेतावनी टेक्स्ट पर टैप करें।' : 'Tap the urgent warning text above.')}
            </div>

            <div
              className={cn(
                'p-4 rounded-xl border text-xs leading-relaxed transition-all',
                inspectedUrl ? 'border-ok/40 bg-ok/10 text-ink' : 'border-line bg-surface/30 opacity-70 text-ink-3',
              )}
            >
              <span className="font-semibold block text-ink mb-1">
                {inspectedUrl ? (isHi ? '✓ फर्जी डोमेन नाम' : '✓ Fraudulent Domain') : (isHi ? 'संकेत 3: URL की जांच' : 'Flag 3: URL Check')}
              </span>
              {inspectedUrl
                ? (isHi
                    ? 'असुरक्षित "http://" और फर्जी ".site" एक्सटेंशन देखें। असली बैंकों का डोमेन ".co.in" या ".bank.in" होता है।'
                    : 'Notice the unencrypted "http://" and bogus ".site" extension. Legitimate banks use HTTPS and official bank domains.')
                : (isHi ? 'लिंक URL पर टैप करें।' : 'Tap the link URL above.')}
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: FAKE PHISHING PORTAL SIMULATION */}
      {simulationState === 'fake-site' && (
        <Card className="max-w-md mx-auto p-0 overflow-hidden border-2 border-rose-500/60 bg-[#0a0f1d] text-white shadow-lift animate-fade-in">
          {/* Fake Browser URL Bar */}
          <div className="bg-slate-900 p-3 border-b border-rose-500/30 flex items-center gap-2 text-xs">
            <span className="text-rose-400 font-mono flex items-center gap-1 bg-black/60 px-2 py-1 rounded w-full border border-rose-500/30">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              http://novabank-kyc-reactivate.site/login
            </span>
          </div>

          <form onSubmit={handleFakeSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1 pb-2">
              <h4 className="font-heading text-lg font-bold text-rose-300">
                Nova Bank Online KYC Portal
              </h4>
              <p className="text-xs text-slate-300">
                {isHi ? 'कार्ड तुरंत सक्रिय करने के लिए नेटबैंकिंग लॉगिन और ओटीपी दर्ज करें:' : 'Enter NetBanking credentials & OTP to unlock debit card:'}
              </p>
            </div>

            <div className="space-y-3 text-xs text-left">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  {isHi ? 'यूजर आईडी / कस्टमर आईडी:' : 'User ID / Customer ID:'}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  {isHi ? 'नेटबैंकिंग पासवर्ड:' : 'NetBanking Password:'}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  {isHi ? 'एसएमएस से प्राप्त 6-अंकीय ओटीपी:' : 'SMS 6-Digit OTP:'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="849201"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-rose-500/50 text-rose-300 font-mono font-bold tracking-widest text-center"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <Button size="sm" variant="secondary" onClick={handleReset}>
                {isHi ? 'पीछे हटें' : 'Step Back'}
              </Button>
              <Button size="sm" variant="danger" onClick={handleFakeSubmit}>
                {isHi ? 'विवरण जमा करें (गलत कदम)' : 'Submit Credentials'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* STATE 3: CONSEQUENCE SIMULATION: REAL-WORLD ACCOUNT TAKEOVER & LIVE DRAIN */}
      {simulationState === 'takeover-consequence' && (
        <div className="space-y-5 animate-fade-in">
          {/* Live Bank Passbook Statement Card */}
          <div className="p-5 rounded-2xl bg-rose-950/70 border-2 border-rose-500 shadow-[0_0_35px_rgba(244,63,94,0.35)] text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-rose-300 font-bold uppercase tracking-wider pb-2 border-b border-rose-800">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                {isHi ? 'लाइव बैंक खाता कटौती विवरण' : 'Live Bank Passbook Statement'}
              </span>
              <span className="text-rose-400 font-mono font-bold animate-pulse">● SAVINGS DRAINED</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-black/60 border border-rose-500/30 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="font-bold text-white">RTGS-OUT/MULE_ACC_3910/SWIFTCASH</p>
                  <p className="text-[10px] sm:text-xs text-slate-400">Immediate Real-Time Gross Settlement</p>
                </div>
                <span className="font-mono text-base sm:text-lg font-black text-rose-400">
                  -₹50,000.00
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-rose-500/30 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="font-bold text-white">IMPS-OUT/TRANSFER_BATCH_902</p>
                  <p className="text-[10px] sm:text-xs text-slate-400">Instant Mobile Payment Service</p>
                </div>
                <span className="font-mono text-base sm:text-lg font-black text-rose-400">
                  -₹34,800.00
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-rose-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                {isHi ? 'शुरुआती शेषराशि: ₹85,000.00' : 'Initial Balance: ₹85,000.00'}
              </span>
              <span className="text-sm font-bold text-rose-400">
                {isHi ? 'वर्तमान शेषराशि:' : 'Remaining Balance:'} ₹{savingsBalance.toLocaleString('en-IN')}.00
              </span>
            </div>
          </div>

          {/* Hacker Exfiltration Console */}
          <div className="p-5 rounded-2xl bg-black border-2 border-rose-500 text-white space-y-3 font-mono shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase tracking-wider pb-2 border-b border-rose-900">
              <span className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                {isHi ? 'हमलावर का नियंत्रण कंसोल (डेटा चोरी)' : 'Attacker Live Exfiltration Console'}
              </span>
              <span className="animate-pulse text-rose-500 font-extrabold">● LIVE INTERCEPTION</span>
            </div>

            <div className="text-xs space-y-1.5 text-rose-200">
              <p>[+] Connection established from victim IP: 103.212.43.19 (Mumbai, IN)</p>
              <p className="text-amber-300">
                [+] HARVESTED CREDENTIALS: Username="{username}" | Password="••••••••" | OTP="{otp || '849201'}"
              </p>
              <p>[+] Automated session hijacked via fake reverse-proxy API</p>
              <p className="text-rose-400 font-bold">
                [!] UNAUTHORIZED RTGS TRANSFER: ₹50,000.00 transferred to Mule A/C XX3910 (SwiftCash LLC)
              </p>
              <p className="text-rose-400 font-bold">
                [!] 2FA REGISTERED NUMBER: Altered from +91-98... to attacker's SIM (+91-7002XXXXXX)
              </p>
              <p className="text-emerald-400">[✓] Victim NetBanking password changed. Legitimate user locked out.</p>
            </div>
          </div>

          {/* Consequence Analysis Card */}
          <div className="p-5 rounded-2xl border-2 border-rose-500/40 bg-rose-500/10 space-y-4 text-ink leading-relaxed">
            <h4 className="font-heading text-lg font-bold text-rose-300 flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-rose-400 shrink-0" />
              {isHi ? 'विनाशकारी परिणाम (क्या हुआ?)' : 'Disastrous Consequences (What Happened?)'}
            </h4>

            <div className="text-sm space-y-2 text-ink-2">
              <p>
                {isHi
                  ? 'जैसे ही आपने फर्जी साइट पर अपना पासवर्ड और ओटीपी डाला, हमलावर की स्वचालित स्क्रिप्ट ने आपके असली बैंक खाते में लॉग इन किया और मिनटों के भीतर सारे पैसे निकाल लिए।'
                  : 'The moment credentials were submitted, the attacker\'s backend script logged into legitimate online banking, changed the registered mobile number, and initiated an irreversible fund transfer.'}
              </p>
            </div>

            {/* Emergency Protocols */}
            <div className="pt-2 border-t border-rose-500/20 space-y-2">
              <span className="text-xs uppercase font-bold text-rose-300 flex items-center gap-1.5">
                <PhoneCall className="h-4 w-4" />
                {isHi ? 'वास्तविक आपातकालीन बचाव कदम:' : 'Emergency Real-Life Action Protocol:'}
              </span>
              <ol className="text-xs space-y-1.5 list-decimal list-inside text-ink-2">
                <li>
                  {isHi
                    ? 'बैंक की आधिकारिक 24x7 फ्रॉड हेल्पलाइन पर कॉल करके अपने सभी कार्ड और नेटबैंकिंग खाते को तुरंत ब्लॉक (Hotlist) करवाएं।'
                    : 'Call official 24x7 bank helpline immediately to freeze your NetBanking and hotlist debit cards.'}
                </li>
                <li>
                  {isHi
                    ? 'राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर तुरंत शिकायत दर्ज कराएं।'
                    : 'Dial National Cybercrime Helpline 1930 to freeze transactions in transit.'}
                </li>
                <li>
                  {isHi
                    ? 'अपने गृह बैंक शाखा में जाकर लिखित शिकायत और साइबर पुलिस पावती जमा करें।'
                    : 'Visit your home bank branch with an FIR receipt to dispute unauthorized transfers.'}
                </li>
              </ol>
            </div>

            {/* Rewind Button */}
            <div className="pt-3 flex justify-end">
              <Button
                variant="primary"
                size="md"
                icon={<RotateCcw />}
                onClick={handleReset}
              >
                {isHi ? 'सिमुलेशन रिवाइंड करें और सुरक्षित जांच सीखें' : 'Rewind Simulation & Practice Safe Inspection'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhishingInspector;
