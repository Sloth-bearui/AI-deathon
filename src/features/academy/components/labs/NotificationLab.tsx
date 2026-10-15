import React, { useState } from 'react';
import { Card, Button } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Download,
  KeyRound,
  FileWarning,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const NotificationLab: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [state, setState] = useState<'prompt' | 'installing-apk' | 'spyware-consequence' | 'safe-outcome'>('prompt');

  const handleReset = () => setState('prompt');

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border border-line bg-surface/50 text-sm text-ink-2 leading-relaxed">
        <p>
          <strong className="text-ink">
            {isHi ? 'वास्तविक स्थिति परिदृश्य:' : 'Interactive Exercise:'}
          </strong>{' '}
          {isHi
            ? 'इंटरनेट ब्राउज़ करते समय एक उच्च-प्राथमिकता वाला फर्जी पुश नोटिफिकेशन स्क्रीन पर आता है: "ट्रैफिक चालान लंबित: ₹2,000 जुर्माना। अदालती गिरफ्तारी से बचने के लिए 24 घंटे में भुगतान करें।"'
            : 'A high-priority push notification suddenly appears while browsing: "Traffic E-Challan pending: ₹2,000 fine for DL01-AB-1234. Settle in 24 hours to avoid court arrest."'}
        </p>
      </div>

      {state === 'prompt' && (
        <Card className="max-w-md mx-auto p-5 border-2 border-warn/40 bg-surface/80 space-y-4 shadow-lift">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold pb-2 border-b border-line">
            <AlertTriangle className="h-4 w-4" />
            <span>{isHi ? 'सिम्युलेटेड नोटिफिकेशन बैनर' : 'Simulated Push Notification'}</span>
          </div>

          <p className="text-sm font-semibold text-ink leading-relaxed">
            {isHi
              ? 'तत्काल यातायात पुलिस चालान नोटिस: जुर्माना भरने के लिए http://echallan-parivahan-gov.in.live/pay पर क्लिक करें।'
              : 'Immediate Traffic Police Challan Notice: Click http://echallan-parivahan-gov.in.live/pay to settle fine.'}
          </p>

          <div className="space-y-2 pt-2">
            <Button
              size="sm"
              variant="secondary"
              fullWidth
              onClick={() => setState('safe-outcome')}
            >
              {isHi ? 'आधिकारिक mParivahan ऐप / पोर्टल पर मैन्युअल रूप से जांचें' : 'Check official Parivahan app / portal manually'}
            </Button>

            <Button
              size="sm"
              variant="danger"
              fullWidth
              onClick={() => setState('installing-apk')}
            >
              {isHi ? 'जुर्माना भरने के लिए तुरंत लिंक पर टैप करें (गलत कदम)' : 'Tap link immediately to pay fine (Wrong Move)'}
            </Button>
          </div>
        </Card>
      )}

      {state === 'installing-apk' && (
        <Card className="max-w-md mx-auto p-6 border-2 border-rose-500/50 bg-[#0c1222] text-white space-y-4 shadow-lift animate-fade-in">
          <div className="flex items-center gap-2 text-xs text-rose-300 font-bold uppercase pb-2 border-b border-rose-500/20">
            <Download className="h-4 w-4 animate-bounce" />
            <span>{isHi ? 'अनधिकृत APK डाउनलोड चेतावनी' : 'Sideloading Suspicious APK'}</span>
          </div>

          <div className="text-sm space-y-3">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
              <FileWarning className="h-6 w-6 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-200">Parivahan_Challan_Pay.apk</p>
                <p className="text-xs text-rose-300/80">
                  {isHi ? 'अज्ञात स्रोत से डाउनलोड किया गया' : 'Downloaded from untrusted external domain'}
                </p>
              </div>
            </div>

            <div className="text-xs space-y-2 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-700">
              <p className="font-bold text-white">
                {isHi ? 'यह ऐप निम्नलिखित खतरनाक अनुमतियों का अनुरोध कर रहा है:' : 'This app requests dangerous device permissions:'}
              </p>
              <ul className="list-disc list-inside space-y-1 text-amber-300">
                <li>{isHi ? 'एसएमएस पढ़ें और प्राप्त करें (READ_SMS)' : 'Read and intercept all SMS (READ_SMS)'}</li>
                <li>{isHi ? 'एक्सेसिबिलिटी सेवा (स्क्रीन पर सब कुछ देखना)' : 'Accessibility Service (Read full screen contents)'}</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <Button size="sm" variant="secondary" onClick={handleReset}>
                {isHi ? 'रद्द करें (सुरक्षित)' : 'Cancel (Safe)'}
              </Button>
              <Button size="sm" variant="danger" onClick={() => setState('spyware-consequence')}>
                {isHi ? 'अनुमतियां दें और इंस्टॉल करें' : 'Grant Permissions & Install'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {state === 'spyware-consequence' && (
        <div className="space-y-4 animate-fade-in">
          {/* Live Bank SMS Deduction Alert */}
          <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.35)] text-white space-y-2">
            <div className="flex items-center justify-between text-xs text-rose-300 font-bold uppercase">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                {isHi ? 'अनधिकृत बैंक कटौती अलर्ट' : 'Unauthorized Bank Debit Alert'}
              </span>
              <span className="text-rose-400 font-mono animate-pulse">● MONEY DRAINED</span>
            </div>
            <p className="font-mono text-sm sm:text-base font-bold text-rose-100 bg-black/40 p-3 rounded-xl border border-rose-500/30">
              {isHi
                ? 'डेबिट चेतावनी: आपके Nova Bank A/C XX8492 से ₹42,000.00 IMPS द्वारा निकाल लिए गए हैं। शेष शेषराशि: ₹1,200.00। दुर्भावनापूर्ण ऐप ने एसएमएस ओटीपी को पृष्ठभूमि में स्वतः पढ़ लिया।'
                : 'DEBIT ALERT: ₹42,000.00 debited from Nova Bank A/C XX8492 via IMPS to unknown merchant. Available Balance: ₹1,200.00. The malicious APK intercepted and silently forwarded your 2FA OTP.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-rose-500/50 bg-rose-500/10 text-white space-y-3 shadow-lift">
            <div className="flex items-center justify-between text-xs text-rose-300 font-bold uppercase">
              <span className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-400" />
                {isHi ? 'परिणाम: डिवाइस में स्पाइवेयर मैलवेयर स्थापित' : 'Consequence: Banking Spyware Active on Device'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/60 border border-rose-500/30 text-xs font-mono space-y-1.5 text-rose-200">
              <p className="text-rose-400 font-bold">[!] ACCESSIBILITY EXPLOIT ACTIVE</p>
              <p>[+] Malware now silently forwards all incoming 2FA SMS to attacker Telegram bot</p>
              <p>[+] Keylogger captures bank login credentials in background</p>
              <p className="text-amber-300">[+] ₹42,000 unauthorized transaction approved using intercepted OTP</p>
            </div>

            <div className="text-sm text-ink-2 space-y-2 pt-2">
              <p>
                {isHi
                  ? 'सरकारी चालान कभी भी ".apk" फ़ाइलों को डाउनलोड करने के लिए नहीं कहते। वे हमेशा आधिकारिक echallan.parivahan.gov.in पोर्टल पर खुले रूप में भुगतान किए जाते हैं।'
                  : 'Traffic departments never distribute Android APK files for paying fines. Official fines are settled strictly via https://echallan.parivahan.gov.in.'}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="md" icon={<RotateCcw />} onClick={handleReset}>
                {isHi ? 'सिमुलेशन रिवाइंड करें' : 'Rewind Simulation'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {state === 'safe-outcome' && (
        <div className="p-5 rounded-2xl border border-ok/40 bg-ok/10 text-sm text-ink space-y-3 animate-fade-in">
          <h4 className="font-bold text-ok-ink flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            {isHi ? 'सुरक्षित कदम! आपने मैलवेयर से खुद को बचाया।' : 'Safe Move! You Evaded Malware.'}
          </h4>
          <p className="text-ink-2 leading-relaxed">
            {isHi
              ? 'जब आपने आधिकारिक पोर्टल पर अपना वाहन नंबर दर्ज किया, तो कोई भी चालान लंबित नहीं था। फर्जी नोटिफिकेशन केवल आपका ध्यान भटकाने और दुर्भावनापूर्ण ऐप इंस्टॉल करवाने का जाल था।'
              : 'When checking the official mParivahan app, there were zero pending fines. The push notification was malicious spam designed to sideload banking spyware.'}
          </p>
          <div className="flex justify-end pt-1">
            <Button variant="secondary" size="sm" icon={<RotateCcw />} onClick={handleReset}>
              {isHi ? 'दोबारा अभ्यास करें' : 'Practice Again'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationLab;
