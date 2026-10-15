import React, { useState } from 'react';
import { Card, Button } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import {
  ShieldAlert,
  PhoneCall,
  Zap,
  Briefcase,
  TrendingDown,
  RotateCcw,
  AlertTriangle,
  PlayCircle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const ScamPatternsLab: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [selectedPattern, setSelectedPattern] = useState<string>('digital-arrest');
  const [lossSimulationStep, setLossSimulationStep] = useState<number>(0);

  const patterns = [
    {
      id: 'digital-arrest',
      icon: <PhoneCall className="h-5 w-5 text-accent" />,
      title: isHi ? 'डिजिटल अरेस्ट / फर्जी पुलिस वीडियो कॉल' : 'Digital Arrest / Fake Police Video Call',
      messagePreview: isHi
        ? 'व्हाट्सएप वीडियो कॉल: "हम सीबीआई/कस्टम से बोल रहे हैं। आपके आधार नंबर से ताइवान भेजे गए पार्सल में 5 पासपोर्ट और 140 ग्राम नशीले पदार्थ मिले हैं। तुरंत इस सुरक्षित खाते में ₹2,00,000 जमानत राशि ट्रांसफर करें वर्ना 2 घंटे में गिरफ्तारी होगी।"'
        : 'WhatsApp Video Call: "We are calling from CBI/Customs HQ. A parcel sent to Taiwan using your Aadhaar card contains contraband. Transfer ₹2,00,000 to an RBI verification account immediately or face immediate arrest."',
      description: isHi
        ? 'धोखेबाज फर्जी पुलिस वर्दी पहनकर और पीछे पुलिस स्टेशन का बैकड्रॉप लगाकर वीडियो कॉल करते हैं और गिरफ्तारी का डर दिखाकर तुरंत पैसे ट्रांसफर करवाते हैं।'
        : 'Scammers dress in police uniforms on WhatsApp video calls claiming you sent illegal parcels, demanding immediate fund transfers.',
      takeaway: isHi
        ? 'भारत की कोई भी कानून प्रवर्तन एजेंसी (पुलिस, सीबीआई, ईडी, कस्टम) स्काइप या व्हाट्सएप वीडियो कॉल पर नागरिकों को कभी भी गिरफ्तार नहीं करती और न ही पैसे मांगती है।'
        : 'Indian law enforcement agencies NEVER arrest citizens or conduct formal judicial interrogations over Skype/WhatsApp video calls, nor do they demand bail deposits.',
      lossSteps: [
        { stage: '1. Fear Trigger', descEn: 'Intimidation call on Skype. Scammer displays fake Supreme Court arrest warrant.', descHi: 'स्काइप पर धमकी भरी कॉल। धोखेबाज फर्जी सुप्रीम कोर्ट गिरफ्तारी वारंट दिखाता है।', balance: '₹3,50,000.00', deduction: null },
        { stage: '2. Escrow Trap', descEn: 'Told to liquidate fixed deposits into "safe government verification account".', descHi: 'कहा जाता है कि अपनी फिक्स डिपॉजिट तोड़कर "सरकारी सुरक्षित जांच खाते" में ट्रांसफर करें।', balance: '₹3,50,000.00', deduction: null },
        { stage: '3. Real-Time Loss', descEn: 'Victim does RTGS transfer of ₹2,00,000. Scammers immediately cash out through ATM mules.', descHi: 'पीड़ित ₹2,00,000 का आरटीजीएस करता है। धोखेबाज तुरंत एटीएम से नकदी निकाल लेते हैं।', balance: '₹1,50,000.00', deduction: '-₹2,00,000.00' },
      ],
    },
    {
      id: 'electricity-cut',
      icon: <Zap className="h-5 w-5 text-amber-400" />,
      title: isHi ? 'बिजली कटौती धमकी एसएमएस' : 'Late Night Electricity Disconnection',
      messagePreview: isHi
        ? 'एसएमएस: "प्रिय उपभोक्ता, पिछले महीने का बिल अपडेट न होने के कारण आज रात 9:30 बजे आपकी बिजली काट दी जाएगी। तुरंत हमारे बिजली अधिकारी से 9810XXXXXX पर संपर्क करें।"'
        : 'SMS: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Immediately call our electricity officer on 9810XXXXXX."',
      description: isHi
        ? 'रात के समय एसएमएस भेजा जाता है ताकि लोग डर जाएं और दिए गए निजी मोबाइल नंबर पर कॉल करके फर्जी ऐप डाउनलोड कर लें।'
        : 'SMS sent late at night threatening imminent power cutoff unless you call a personal mobile number.',
      takeaway: isHi
        ? 'बिजली वितरण कंपनियां (Discoms) लिखित नोटिस और बिलिंग चक्र का पालन करती हैं; वे कभी भी व्यक्तिगत 10-अंकों के नंबर से रात में कटौती का नोटिस नहीं भेजतीं।'
        : 'Discoms adhere to strict regulatory billing cycles; they never send cutoff notices from personal 10-digit SIM cards demanding phone contact.',
      lossSteps: [
        { stage: '1. Midnight Panic', descEn: 'SMS received at 9:15 PM threatening power cutoff within 15 minutes.', descHi: 'रात 9:15 बजे बिजली काटने की धमकी भरा एसएमएस प्राप्त होता है।', balance: '₹42,000.00', deduction: null },
        { stage: '2. Remote Screen Share', descEn: 'Victim calls number. Fake officer asks to install "QuickSupport" or APK to pay ₹11 bill.', descHi: 'पीड़ित नंबर पर कॉल करता है। फर्जी अधिकारी ₹11 का बिल भरने के नाम पर स्क्रीन शेयरिंग ऐप इंस्टॉल करवाता है।', balance: '₹42,000.00', deduction: null },
        { stage: '3. Complete Drain', descEn: 'While victim types debit card PIN, scammer views screen remotely and drains ₹38,000.', descHi: 'स्क्रीन शेयरिंग के जरिए धोखेबाज कार्ड का पिन और ओटीपी देखकर ₹38,000 निकाल लेता है।', balance: '₹4,000.00', deduction: '-₹38,000.00' },
      ],
    },
    {
      id: 'youtube-like',
      icon: <Briefcase className="h-5 w-5 text-emerald-400" />,
      title: isHi ? 'घर बैठे यूट्यूब लाइक कार्य (पार्ट-टाइम घोटाला)' : 'Work-from-Home YouTube Like Task',
      messagePreview: isHi
        ? 'टेलीग्राम मैसेज: "प्रति वीडियो लाइक पर ₹150 कमाएं! पहले 3 वीडियो लाइक करने पर ₹450 तुरंत आपके बैंक में ट्रांसफर। अब अगले लेवल के लिए हमारे वीआईपी ट्रेडिंग टास्क में ₹5,000 जमा करें।"'
        : 'Telegram Message: "Earn ₹150 per YouTube video liked! First 3 tasks paid ₹450 instantly. Now deposit ₹5,000 to unlock VIP merchant crypto tasks with 40% guaranteed returns."',
      description: isHi
        ? 'शुरू में ₹200-₹500 का छोटा भुगतान करके विश्वास जीतते हैं, फिर लाखों रुपये का "प्रीपेड टास्क" या "क्रिप्टो निवेश" जमा करवाकर फरार हो जाते हैं।'
        : 'Victims earn small payouts for initial tasks, then are coerced into depositing large sums into fake "VIP crypto tasks".',
      takeaway: isHi
        ? 'कोई भी वैध नियोक्ता या कंपनी कभी भी आपका वेतन जारी करने या काम देने के लिए अग्रिम नकद जमा (Upfront Deposit) की मांग नहीं करती।'
        : 'Legitimate employers never demand upfront cash deposits, security deposits, or task fees to release your earned money.',
      lossSteps: [
        { stage: '1. The Bait Payout', descEn: 'Victim likes 3 videos and actually receives ₹450 in UPI (trust established).', descHi: 'पीड़ित 3 वीडियो लाइक करता है और उसे वास्तव में ₹450 प्राप्त होते हैं (विश्वास जीतना)।', balance: '₹60,450.00', deduction: '+₹450.00 (Bait)' },
        { stage: '2. The VIP Prepaid Task', descEn: 'Asked to deposit ₹5,000 to unlock VIP Level 2 tasks.', descHi: 'लेवल 2 टास्क अनलॉक करने के लिए ₹5,000 जमा करने को कहा जाता है।', balance: '₹55,450.00', deduction: '-₹5,000.00' },
        { stage: '3. Total Drain (Frozen Account)', descEn: 'Scammers claim "task error, account frozen! Deposit ₹50,000 to withdraw". Total loss: ₹55,000.', descHi: 'कहा जाता है कि "खाता फ्रीज हो गया, पैसे निकालने के लिए ₹50,000 और जमा करें"। पूरा पैसा गायब।', balance: '₹5,450.00', deduction: '-₹50,000.00' },
      ],
    },
  ];

  const current = patterns.find((p) => p.id === selectedPattern) || patterns[0];

  const handleSelectPattern = (id: string) => {
    setSelectedPattern(id);
    setLossSimulationStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border border-line bg-surface/50 text-sm text-ink-2 leading-relaxed">
        <p>
          <strong className="text-ink">
            {isHi ? 'वास्तविक घोटालों का विश्लेषण:' : 'Interactive Analysis & Financial Drain Simulator:'}
          </strong>{' '}
          {isHi
            ? 'भारत में सबसे अधिक प्रचलित तीन आधुनिक घोटालों में से एक को चुनें और देखें कि कैसे धोखेबाज संदेशों में हेरफेर करते हैं और पीड़ित का बैंक खाता कैसे खाली होता है।'
            : 'Select one of India\'s most widespread modern scam patterns to inspect the actual scam messages and simulate the exact financial loss timeline.'}
        </p>
      </div>

      {/* Pattern Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {patterns.map((p) => (
          <Card
            key={p.id}
            interactive
            onClick={() => handleSelectPattern(p.id)}
            className={`p-5 border-2 transition-all cursor-pointer ${
              selectedPattern === p.id
                ? 'border-[#5546F0] bg-[#F5F6FF] dark:bg-[#5546F0]/20 shadow-glow'
                : 'border-line hover:border-[#5546F0]/40'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {p.icon}
              <h4 className="font-heading text-sm font-bold text-ink">{p.title}</h4>
            </div>
            <p className="text-xs text-ink-2 leading-relaxed line-clamp-3">{p.description}</p>
          </Card>
        ))}
      </div>

      {/* Real Message Preview */}
      {current && (
        <div className="space-y-5 animate-fade-in">
          {/* Simulated Scam Message */}
          <div className="p-4 rounded-xl bg-surface/80 border-2 border-amber-500/30 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {isHi ? 'संदेश सामग्री का उदाहरण (Sample Scam Message):' : 'Sample Scam Message Content:'}
            </span>
            <div className="p-3.5 rounded-lg bg-black/50 border border-line font-mono text-xs sm:text-sm text-amber-100 leading-relaxed">
              "{current.messagePreview}"
            </div>
          </div>

          {/* INTERACTIVE FINANCIAL LOSS TIMELINE SIMULATOR */}
          <div className="p-5 rounded-2xl bg-[#070e1c] border-2 border-rose-500/50 text-white space-y-4 shadow-lift">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-rose-800">
              <span className="text-rose-300 font-bold flex items-center gap-1.5 uppercase">
                <TrendingDown className="h-4 w-4 text-rose-400" />
                {isHi ? 'बैंक खाता खाली होने का सिमुलेशन (Loss Timeline)' : 'Simulate How Money is Lost (Bank Drain Timeline)'}
              </span>
              <span className="text-rose-400 font-mono text-[11px] font-bold">
                STAGE {lossSimulationStep + 1} OF 3
              </span>
            </div>

            {/* Stepper buttons */}
            <div className="grid grid-cols-3 gap-2">
              {current.lossSteps.map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLossSimulationStep(idx)}
                  className={cn(
                    'p-2.5 rounded-xl border text-left text-xs font-mono transition-all',
                    lossSimulationStep === idx
                      ? 'bg-rose-500/30 border-rose-400 text-white font-bold shadow-sm'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white',
                  )}
                >
                  <span className="block text-[10px] opacity-70">STAGE {idx + 1}</span>
                  <span className="line-clamp-1">{step.stage}</span>
                </button>
              ))}
            </div>

            {/* Current Stage Output Card */}
            <div className="p-4 rounded-xl bg-black/60 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {current.lossSteps[lossSimulationStep].stage}
                </span>
                {current.lossSteps[lossSimulationStep].deduction && (
                  <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {current.lossSteps[lossSimulationStep].deduction}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {isHi
                  ? current.lossSteps[lossSimulationStep].descHi
                  : current.lossSteps[lossSimulationStep].descEn}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  {isHi ? 'सिम्युलेटेड बैंक बैलेंस:' : 'Simulated Account Balance:'}
                </span>
                <span className="text-base font-bold text-rose-400 font-mono">
                  {current.lossSteps[lossSimulationStep].balance}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1 text-xs">
              <span className="text-slate-400 font-mono">
                {isHi ? 'चरणों पर क्लिक करके नुकसान देखें' : 'Click stages above to see progression'}
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setLossSimulationStep((prev) => (prev + 1) % 3)}
              >
                {isHi ? 'अगला चरण देखें →' : 'Next Stage →'}
              </Button>
            </div>
          </div>

          {/* Forensic Protection Rule */}
          <div className="p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 space-y-2 text-sm text-ink">
            <h4 className="font-bold text-emerald-300 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-emerald-400" />
              {isHi ? 'सुरक्षा नियम और बचाव:' : 'Protection Rule:'}
            </h4>
            <p className="leading-relaxed text-ink-2">
              {current.takeaway}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScamPatternsLab;
