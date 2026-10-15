import React, { useState, useEffect } from 'react';
import { Card, Button } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Lock,
  PhoneCall,
  Smartphone,
  ArrowDownRight,
  TrendingDown,
  Layers,
  History,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const UpiSafetyLab: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [step, setStep] = useState<'initial' | 'entering-pin' | 'debit-consequence' | 'double-dip-trap' | 'double-dip-drained' | 'safe-outcome'>('initial');
  const [pin, setPin] = useState('');
  const [accountBalance, setAccountBalance] = useState(35000);
  const [balanceDraining, setBalanceDraining] = useState(false);

  const handleApprove = () => {
    setStep('entering-pin');
  };

  const handleDecline = () => {
    setStep('safe-outcome');
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length >= 4) {
      setStep('debit-consequence');
      setBalanceDraining(true);
      // Simulate live balance drop
      setTimeout(() => {
        setAccountBalance(30500);
        setBalanceDraining(false);
      }, 800);
    }
  };

  const handleDoubleDipApprove = () => {
    setStep('double-dip-drained');
    setBalanceDraining(true);
    setTimeout(() => {
      setAccountBalance(21500);
      setBalanceDraining(false);
    }, 800);
  };

  const handleReset = () => {
    setStep('initial');
    setPin('');
    setAccountBalance(35000);
    setBalanceDraining(false);
  };

  return (
    <div className="space-y-6">
      {/* Live Bank Account Balance Widget Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface/90 border border-[#E8EAF4] text-ink shadow-lift flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#5546F0] uppercase block mb-1 font-bold">
            [SIMULATED_SAVINGS_ACCOUNT // NOVA BANK]
          </span>
          <h3 className="font-heading text-lg font-bold text-ink flex items-center gap-2">
            A/C: Rahul Sharma (XX8492)
          </h3>
          <span className="text-xs text-ink-3">IFSC: NOVA000492 • Primary UPI Linked</span>
        </div>

        <div className="text-right bg-[#F5F6FF] px-4 py-2.5 rounded-xl border border-[#E8EAF4] w-full sm:w-auto">
          <span className="text-xs text-ink-3 uppercase font-mono block">
            {isHi ? 'उपलब्ध शेष राशि (Live Balance)' : 'Available Balance'}
          </span>
          <span
            className={cn(
              'font-heading text-2xl sm:text-3xl font-black font-mono transition-all duration-500',
              accountBalance < 35000 ? 'text-rose-500' : 'text-emerald-600',
              balanceDraining && 'animate-pulse scale-105',
            )}
          >
            ₹{accountBalance.toLocaleString('en-IN')}.00
          </span>
        </div>
      </div>

      {/* Scenario Context Card */}
      <div className="p-4 rounded-xl border border-line bg-surface/50 text-sm text-ink-2 leading-relaxed">
        <p>
          <strong className="text-ink">
            {isHi ? 'वास्तविक स्थिति परिदृश्य:' : 'Real-World Attack Scenario:'}
          </strong>{' '}
          {isHi
            ? 'आपने ऑनलाइन सेकंड-हैंड साइकिल ₹4,500 में बेचने के लिए पोस्ट की। एक खरीदार मैसेज करता है: "मैंने यूपीआई से पैसे भेज दिए हैं! अपने फोन पर रिक्वेस्ट स्वीकार करें और पिन डालकर पैसे जमा करें।"'
            : 'You posted a bicycle for sale online for ₹4,500. A buyer messages: "I have transferred the money via UPI! Please accept the request on your phone and enter your UPI PIN to receive it into your account."'}
        </p>
      </div>

      {/* STEP 1: INITIAL PROMPT */}
      {step === 'initial' && (
        <Card className="max-w-md mx-auto p-6 border border-[#5546F0]/40 bg-surface/95 text-ink space-y-5 shadow-lift">
          <div className="flex items-center justify-between text-xs text-[#5546F0] pb-2 border-b border-line">
            <span className="font-bold flex items-center gap-1.5">
              <Smartphone className="h-4 w-4" /> SwiftPay UPI
            </span>
            <span className="bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
              COLLECT REQUEST
            </span>
          </div>

          <div className="text-center space-y-1 py-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-ink-2">
              {isHi ? 'अनुरोधकर्ता: दीपक कुमार (खरीदार)' : 'Collect Request From: Deepak Kumar'}
            </span>
            <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#5546F0]">
              ₹4,500.00
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono">
              {isHi ? '"भुगतान अधिकृत करने के लिए अपना UPI PIN दर्ज करें"' : '"Enter 6-digit UPI PIN to authorise"'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <Button
              variant="danger"
              size="md"
              onClick={handleDecline}
              className="font-bold"
            >
              {isHi ? 'अस्वीकार करें (Decline)' : 'Decline Request'}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleApprove}
              className="font-bold"
            >
              {isHi ? 'स्वीकार करें और PIN डालें' : 'Approve & Enter PIN'}
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: ENTERING PIN SCREEN */}
      {step === 'entering-pin' && (
        <Card className="max-w-md mx-auto p-6 border-2 border-amber-500/60 bg-[#0f172a] text-white space-y-5 shadow-lift animate-fade-in">
          <div className="flex items-center justify-between text-xs text-amber-300 pb-2 border-b border-amber-500/20">
            <span className="font-bold flex items-center gap-1">
              <Lock className="h-4 w-4" /> {isHi ? 'UPI PIN दर्ज करें' : 'Enter UPI PIN'}
            </span>
            <span className="text-slate-400">Nova Bank A/C XX8492</span>
          </div>

          <form onSubmit={handleConfirmPin} className="space-y-4 text-center">
            <p className="text-sm text-slate-300">
              {isHi
                ? 'दीपक कुमार को ₹4,500.00 का भुगतान अधिकृत करने के लिए अपना 6-अंकीय UPI PIN दर्ज करें:'
                : 'Enter your confidential 6-digit UPI PIN to authorize payment of ₹4,500.00 to Deepak Kumar:'}
            </p>

            <input
              type="password"
              maxLength={6}
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              autoFocus
              className="w-44 mx-auto text-center font-mono text-2xl tracking-[0.4em] py-2 px-3 rounded-xl bg-slate-900 border-2 border-amber-400 text-amber-300 focus:outline-none"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button size="sm" variant="secondary" onClick={handleReset}>
                {isHi ? 'रद्द करें' : 'Cancel'}
              </Button>
              <Button
                size="sm"
                variant="danger"
                disabled={pin.length < 4}
                onClick={handleConfirmPin}
              >
                {isHi ? 'पुष्टि करें (Confirm PIN)' : 'Confirm PIN & Submit'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* STEP 3: DEBIT CONSEQUENCE & LIVE DRAIN */}
      {(step === 'debit-consequence' || step === 'double-dip-trap' || step === 'double-dip-drained') && (
        <div className="space-y-5 animate-fade-in">
          {/* 1. Live Bank Statement Entry with Real-Time Loss */}
          <div className="p-5 rounded-2xl bg-rose-950/70 border-2 border-rose-500 shadow-[0_0_35px_rgba(244,63,94,0.35)] text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-rose-300 font-bold uppercase tracking-wider pb-2 border-b border-rose-800">
              <span className="flex items-center gap-1.5">
                <TrendingDown className="h-4 w-4 text-rose-400" />
                {isHi ? 'बैंक खाता कटौती विवरण' : 'Live Bank Statement Entry'}
              </span>
              <span className="text-rose-400 font-mono font-bold animate-pulse">● MONEY DEDUCTED</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-rose-500/30 flex items-center justify-between text-sm">
              <div>
                <p className="font-bold text-white">UPI-OUT/DEEPAK_KUMAR/48920194</p>
                <p className="text-xs text-slate-300">Today • 11:15 AM • Nova Bank Mobile Banking</p>
              </div>
              <span className="font-mono text-xl font-black text-rose-400">
                -₹4,500.00
              </span>
            </div>

            <p className="text-xs font-mono text-rose-200">
              {isHi
                ? `आपके खाते से ₹4,500.00 कट चुके हैं। शेष राशि: ₹${accountBalance.toLocaleString('en-IN')}.00.`
                : `₹4,500.00 was debited from your savings account. Remaining balance: ₹${accountBalance.toLocaleString('en-IN')}.00.`}
            </p>
          </div>

          {/* 2. THE SCAMMER'S SECOND TRAP: "THE REFUND TRICK" */}
          {step === 'debit-consequence' && (
            <div className="p-5 rounded-2xl bg-surface/90 border-2 border-amber-500/50 space-y-4">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold uppercase pb-2 border-b border-line">
                <span>💬 WhatsApp • Deepak Kumar (Buyer)</span>
                <span className="text-emerald-400">Online</span>
              </div>

              <div className="space-y-2 text-sm text-ink-2">
                <div className="p-3 rounded-2xl rounded-tl-none bg-slate-900 border border-line text-slate-200">
                  <p className="font-semibold text-amber-300 mb-1">
                    {isHi ? 'खरीदार का दूसरा संदेश:' : 'Scammer\'s Follow-Up Trap:'}
                  </p>
                  <p>
                    {isHi
                      ? '"अरे भाई! बैंक सर्वर में गलती हो गई और आपके पैसे कट गए! घबराओ मत, मैं रिफंड प्रोसेस कर रहा हूँ। मैंने ₹9,000 की रिवर्सल रिक्वेस्ट भेजी है, जल्दी से पिन डालकर अप्रूव करो ताकि पुराने ₹4,500 और नए ₹4,500 दोनों वापस आ जाएं!"'
                      : '"Oh brother! A server technical glitch happened and your money got deducted by mistake! Do not worry, I am processing a reverse refund right now. I just sent a ₹9,000 reversal request, quickly approve with PIN so you get both payments back!"'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-amber-200 font-medium">
                  {isHi ? '⚠️ सावधान: यह क्लासिक "डबल रिफंड फ्रॉड" है। क्या आप दूसरा अनुरोध स्वीकार करेंगे?' : '⚠️ Beware: This is the classic "Double Refund Trap". What will you do?'}
                </span>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={handleDoubleDipApprove}
                  >
                    {isHi ? 'रिफंड के लिए पिन डालें (गलत)' : 'Approve Refund (Wrong)'}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setStep('double-dip-drained')}
                  >
                    {isHi ? 'तुरंत रुकें और 1930 पर कॉल करें' : 'Stop & Block Scammer'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SECOND DRAIN OR BLOCKED OUTCOME */}
          {step === 'double-dip-drained' && (
            <div className="p-5 rounded-2xl border-2 border-rose-500/40 bg-rose-500/10 space-y-4 text-ink leading-relaxed">
              <h4 className="font-heading text-lg font-bold text-rose-300 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-rose-400 shrink-0" />
                {isHi ? 'खाता खाली होने का विश्लेषण (How Victims Lose Everything)' : 'How Victims Lose Everything (Attack Analysis)'}
              </h4>

              <div className="text-sm space-y-2 text-ink-2">
                <p>
                  {isHi
                    ? 'धोखेबाज घबराहट का फायदा उठाकर बार-बार "रिफंड" का नाटक करते हैं। जब तक पीड़ित को समझ आता है, तब तक कई कलेक्ट रिक्वेस्ट के जरिए पूरे बैंक खाते की जमा पूंजी निकाल ली जाती है।'
                    : 'Scammers exploit panic by pretending to issue a "refund", tricking victims into approving subsequent collect requests until savings accounts are completely wiped out.'}
                </p>
                <p className="font-semibold text-ink bg-surface/60 p-3 rounded-xl border border-line">
                  💡 {isHi
                    ? 'स्वर्ण नियम: पैसे प्राप्त करने के लिए कभी भी UPI PIN की आवश्यकता नहीं होती है। केवल पैसे भेजने के लिए PIN की आवश्यकता होती है!'
                    : 'Absolute Golden Rule: You NEVER enter a UPI PIN to receive money. UPI PIN is solely used to SEND money from your account!'}
                </p>
              </div>

              {/* Emergency Recovery Steps */}
              <div className="pt-2 border-t border-rose-500/20 space-y-2">
                <span className="text-xs uppercase font-bold text-rose-300 flex items-center gap-1.5">
                  <PhoneCall className="h-4 w-4" />
                  {isHi ? 'वास्तविक जीवन में तत्काल आपातकालीन कदम:' : 'Emergency Real-Life Action Protocol:'}
                </span>
                <ol className="text-xs space-y-1.5 list-decimal list-inside text-ink-2">
                  <li>
                    {isHi
                      ? 'तुरंत राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें (गोल्डन ऑवर में 4 घंटे के भीतर पैसा रोका जा सकता है)।'
                      : 'Call the National Cybercrime Helpline 1930 immediately (funds can be frozen within the first 4 hours).'}
                  </li>
                  <li>
                    {isHi
                      ? 'अपने बैंक ऐप से अपना UPI हैंडल तुरंत ब्लॉक करें।'
                      : 'Freeze or deregister your UPI handle in your banking application.'}
                  </li>
                  <li>
                    {isHi
                      ? 'cybercrime.gov.in पर औपचारिक वित्तीय धोखाधड़ी शिकायत दर्ज करें।'
                      : 'Lodge an official financial fraud dispute at cybercrime.gov.in and request a chargeback from NPCI.'}
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
                  {isHi ? 'सिमुलेशन रिवाइंड करें और सही तरीका सीखें' : 'Rewind Simulation & Try Safe Action'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SAFE OUTCOME SCREEN */}
      {step === 'safe-outcome' && (
        <div className="p-6 rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/10 text-ink space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold text-emerald-300">
                {isHi ? 'शानदार निर्णय! आपका खाता 100% सुरक्षित है।' : 'Brilliant Decision! Bank Balance 100% Protected.'}
              </h4>
              <p className="text-xs text-ink-3">
                {isHi ? 'आपने धोखेबाज कलेक्ट अनुरोध को सही ढंग से अस्वीकार कर दिया।' : 'You accurately declined the fraudulent collect request.'}
              </p>
            </div>
          </div>

          <div className="text-sm space-y-2 text-ink-2 leading-relaxed bg-surface/60 p-4 rounded-xl border border-line">
            <p>
              {isHi
                ? 'खरीदार वास्तव में आपके खाते से पैसे निकालने की कोशिश कर रहा था। असली भुगतान सीधे आपके बैंक खाते में जमा होते हैं और आपको केवल क्रेडिट एसएमएस प्राप्त होता है।'
                : 'The buyer was trying to drain your funds. Real UPI payments are credited directly into your account; you only receive an SMS confirmation, never a request to type your secret PIN.'}
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="secondary" size="sm" icon={<RotateCcw />} onClick={handleReset}>
              {isHi ? 'दोबारा अभ्यास करें' : 'Practice Scenario Again'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpiSafetyLab;
