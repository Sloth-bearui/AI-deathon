import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/usePrefsStore';
import { Button } from '@/design-system';
import {
  ShieldCheck,
  Smartphone,
  Terminal,
  Activity,
  AlertTriangle,
  Zap,
  ArrowRight,
  Lock,
  Wifi,
  Battery,
  Layers,
  Sparkles,
  CheckCircle2,
  Crosshair,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface ThreatPayload {
  id: string;
  code: string;
  nameEn: string;
  nameHi: string;
  vector: string;
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  sender: string;
  messageTextEn: string;
  messageTextHi: string;
  suspiciousCue: string;
  isolationProtocol: string;
  telemetryLogs: string[];
}

const threatPayloads: ThreatPayload[] = [
  {
    id: 'payload-kyc',
    code: '01 // SMS_PHISHING',
    nameEn: 'Fake KYC Suspension Link',
    nameHi: 'फर्जी केवाईसी निलंबन एसएमएस',
    vector: 'SMISHING_ATTACK',
    severity: 'CRITICAL',
    sender: '+91-98401XXXXX',
    messageTextEn: 'URGENT: Your Nova Bank debit card is DEACTIVATED due to incomplete KYC. Re-activate in 24h: http://novabank-kyc.site/login',
    messageTextHi: 'अति आवश्यक: अपूर्ण केवाईसी के कारण आपका Nova Bank डेबिट कार्ड ब्लॉक हो गया है। 24 घंटे में शुरू करें: http://novabank-kyc.site/login',
    suspiciousCue: 'UNAUTHORIZED_DOMAIN: ".site" & PERSONAL_SIM_SENDER',
    isolationProtocol: 'ISOLATE_LINK_DETONATION',
    telemetryLogs: [
      '09:42:01.102 [TRAI_GATEWAY] Incoming packet from +91-98401XXXXX',
      '09:42:01.140 [HEURISTICS] Anomaly flag: Alphanumeric bank header missing',
      '09:42:01.189 [SANDBOX_DNS] Target host "novabank-kyc.site" flagged fresh domain',
      '09:42:01.240 [CONTAINMENT] Outgoing credential exfiltration blocked in sandbox',
    ],
  },
  {
    id: 'payload-upi',
    code: '02 // UPI_COLLECT_TRAP',
    nameEn: 'Second-Hand Collect Trick',
    nameHi: 'ओएलएक्स यूपीआई कलेक्ट जाल',
    vector: 'SOCIAL_ENGINEERING_REVERSE_DEBIT',
    severity: 'CRITICAL',
    sender: 'Deepak Kumar (Buyer)',
    messageTextEn: 'SwiftPay: Deepak Kumar requested ₹4,500. Enter 6-digit UPI PIN to deposit money into your account.',
    messageTextHi: 'SwiftPay: दीपक कुमार ने ₹4,500 का अनुरोध किया। अपने खाते में पैसे जमा करने के लिए 6-अंकीय UPI PIN दर्ज करें।',
    suspiciousCue: 'REVERSE_DEBIT_TRAP: PIN_NEVER_REQUIRED_TO_RECEIVE',
    isolationProtocol: 'BLOCK_PIN_AUTHORIZATION',
    telemetryLogs: [
      '11:15:22.019 [PAYMENT_GATEWAY] Incoming UPI collect intent #NPCI_9482',
      '11:15:22.064 [LOGIC_PROBE] Buyer claim "depositing" vs protocol "outgoing debit"',
      '11:15:22.120 [ALERT_RAISED] High-risk reversal mismatch detected',
      '11:15:22.180 [CONTAINMENT] PIN prompt intercepted. User account safeguarded.',
    ],
  },
  {
    id: 'payload-apk',
    code: '03 // ROGUE_PARIVAHAN_APK',
    nameEn: 'Traffic Challan Spyware APK',
    nameHi: 'फर्जी ई-चालान स्पाइवेयर ऐप',
    vector: 'MALICIOUS_ANDROID_SIDELOAD',
    severity: 'HIGH',
    sender: 'Alert: echallan-parivahan.live',
    messageTextEn: 'Traffic Police: ₹2,000 pending fine on DL01-AB-1234. Install Parivahan_Challan_Pay.apk to clear fine.',
    messageTextHi: 'यातायात पुलिस: DL01-AB-1234 पर ₹2,000 का चालान लंबित। जुर्माना भरने के लिए Parivahan_Challan_Pay.apk डाउनलोड करें।',
    suspiciousCue: 'DANGEROUS_PERMS: READ_SMS & ACCESSIBILITY_SERVICE',
    isolationProtocol: 'SANDBOX_APK_DETONATION',
    telemetryLogs: [
      '14:02:11.412 [PACKAGE_MGR] Dissecting "Parivahan_Challan_Pay.apk"',
      '14:02:11.490 [STATIC_ANALYSIS] Requests READ_SMS and ACCESSIBILITY_SERVICE',
      '14:02:11.530 [BEHAVIORAL] APK attempts silent background relay to Telegram C2',
      '14:02:11.590 [NEUTRALIZED] Virtual emulator quarantined binary payload',
    ],
  },
  {
    id: 'payload-deepfake',
    code: '04 // AI_VOICE_CLONE',
    nameEn: 'Family Emergency Voice Clone',
    nameHi: 'एआई वॉयस क्लोन आपातकाल',
    vector: 'SYNTHETIC_MEDIA_DEEPFAKE',
    severity: 'ELEVATED',
    sender: 'Unknown WhatsApp Call',
    messageTextEn: '"Dad, please send ₹30,000 urgently! Police arrested my friend and my phone broke. Transfer immediately."',
    messageTextHi: '"पापा, तुरंत ₹30,000 भेज दीजिए! पुलिस ने मेरे दोस्त को पकड़ लिया है, मेरा फोन टूट गया है। तुरंत पैसे ट्रांसफर करें।"',
    suspiciousCue: 'SPEECH_SYNTHESIS_GLITCH: FREQUENCY_CUTOFF_AT_16KHZ',
    isolationProtocol: 'ACOUSTIC_FREQUENCY_ISOLATION',
    telemetryLogs: [
      '17:20:44.200 [VOICE_ANALYSIS] Audio frequency spectrum sample ingested',
      '17:20:44.270 [ACOUSTIC_PROBE] Detected robotic phase drift and missing breath micro-patterns',
      '17:20:44.340 [HEURISTIC_MATCH] 97.4% probability of neural TTS diffusion clone',
      '17:20:44.410 [SAFETY_ADVICE] Recommended secondary verification call via regular cellular SIM',
    ],
  },
];

export const TechnicalPhoneSandboxHero: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [activePayloadId, setActivePayloadId] = useState<string>('payload-kyc');
  const [scanActive, setScanActive] = useState<boolean>(true);
  const [pulseTick, setPulseTick] = useState<number>(0);

  const activePayload = threatPayloads.find((p) => p.id === activePayloadId) || threatPayloads[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-6 lg:py-12 border-b border-[#E8EAF4]">
      {/* Tactical Stasis Crosshair Elements & Coordinates */}
      <div className="pointer-events-none absolute inset-0 flex justify-between p-4 text-[10px] font-mono text-[#5546F0]/35 select-none">
        <div className="flex flex-col gap-1">
          <span>[SYS_NODE: RC-OSINT-IND-01]</span>
          <span>[LAT: 28.6139° N / LNG: 77.2090° E]</span>
          <span>[SANDBOX_STATUS: ACTIVE_DETONATION]</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span>[SECURITY_LEVEL: AIR_GAPPED]</span>
          <span>[CONTAINMENT_RATE: 99.8%]</span>
          <span className="text-emerald-500 font-bold">● TELEMETRY_STREAM_LIVE</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 px-4">
        {/* Top Eyebrow & Hero Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#5546F0]/20 bg-[#F5F6FF] text-[#5546F0] text-xs font-mono tracking-wider uppercase shadow-sm">
            <Crosshair className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{isHi ? 'एआई साइबर सुरक्षा और ओएसआईएनटी सैंडबॉक्स' : 'AI-POWERED OSINT & THREAT DETONATION SANDBOX'}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.1]">
            {isHi ? (
              <>
                संदिग्ध दावों और घोटालों का <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5546F0] via-[#6C5CE7] to-[#8B5CF6]">सुरक्षित सैंडबॉक्स</span>
              </>
            ) : (
              <>
                Isolate. Detonate. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5546F0] via-[#6C5CE7] to-[#8B5CF6]">Verify Without Risk.</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-ink-2 max-w-2xl mx-auto leading-relaxed">
            {isHi
              ? 'व्हाट्सएप फॉरवर्ड, बैंकिंग एसएमएस और फर्जी वेबसाइटों को अपने डिवाइस को खतरे में डाले बिना एक सुरक्षित आभासी स्मार्टफोन सैंडबॉक्स में निष्पादित और जांचें।'
              : 'Detonate suspicious WhatsApp forwards, phishing SMS, and APK malware inside an emulated, air-gapped smartphone sandbox. Zero real money or personal data at risk.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              to="/practice"
              variant="primary"
              size="lg"
              icon={<Smartphone />}
              iconRight={<ArrowRight />}
              technicalCode="SANDBOX_LAUNCH"
            >
              {isHi ? 'सुरक्षित फोन सिम्युलेटर खोलें' : 'Enter Practice Sandbox'}
            </Button>

            <Button
              to="/community"
              variant="cyber"
              size="lg"
              icon={<Terminal />}
              technicalCode="OSINT_FEED"
            >
              {isHi ? 'सामुदायिक दावा फ़ीड देखें' : 'Examine Verified Feed'}
            </Button>
          </div>
        </div>

        {/* THREAT VECTOR SELECTOR TABS (Stasis Style) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-ink-3 pb-1 border-b border-line/40">
            <span className="flex items-center gap-1.5 uppercase font-bold text-[#5546F0]">
              <Activity className="h-3.5 w-3.5" />
              {isHi ? 'लाइव खतरा पेलोड चुनें:' : 'SELECT ACTIVE THREAT PAYLOAD TO DETONATE:'}
            </span>
            <span className="hidden sm:inline text-ink-3">
              [INTERACTIVE_SIMULATION_READY]
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {threatPayloads.map((payload) => {
              const active = payload.id === activePayloadId;
              return (
                <button
                  key={payload.id}
                  type="button"
                  onClick={() => setActivePayloadId(payload.id)}
                  className={cn(
                    'p-3.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group',
                    active
                      ? 'bg-[#F5F6FF] border-[#5546F0] text-[#111B3C] shadow-[0_4px_16px_rgba(85,70,240,0.15)] ring-1 ring-[#5546F0]/40'
                      : 'bg-surface/80 border-[#E8EAF4] text-ink-2 hover:border-[#5546F0]/40 hover:bg-[#F5F6FF]',
                  )}
                >
                  {/* Active Indicator Top Laser Bar */}
                  {active && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5546F0] via-[#6C5CE7] to-[#8B5CF6]" />
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-ink-3">
                    <span className={active ? 'text-[#5546F0] font-bold' : ''}>{payload.code}</span>
                    <span
                      className={cn(
                        'px-1.5 py-0.2 rounded text-[10px] font-bold',
                        payload.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-600' : 'bg-amber-500/20 text-amber-700',
                      )}
                    >
                      {payload.severity}
                    </span>
                  </div>

                  <p className="font-heading font-bold text-sm text-ink group-hover:text-[#5546F0] transition-colors line-clamp-1">
                    {isHi ? payload.nameHi : payload.nameEn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTERPIECE: STASIS CYBERSECURITY SANDBOX PHONE & TELEMETRY MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* LEFT TELEMETRY CONSOLE (4 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0f1124] border border-[#5546F0]/30 text-white space-y-4 shadow-lift relative">
              {/* Tactical Corner Ticks */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-[#5546F0]/50">+</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-[#5546F0]/50">+</span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#5546F0]/50">+</span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#5546F0]/50">+</span>

              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#5546F0]/20">
                <span className="flex items-center gap-1.5 text-[#6C5CE7] font-bold">
                  <Terminal className="h-4 w-4 text-[#818cf8]" />
                  FORENSIC TELEMETRY STREAM
                </span>
                <span className="text-[10px] bg-[#5546F0]/20 px-2 py-0.5 rounded text-[#818cf8] border border-[#5546F0]/30 font-bold">
                  SANDBOX_v2.4
                </span>
              </div>

              {/* Threat Vector Metadata */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">VECTOR:</span>
                  <span className="font-bold text-rose-300">{activePayload.vector}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">SUSPICIOUS_CUE:</span>
                  <span className="font-bold text-amber-300 text-right">{activePayload.suspiciousCue}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">CONTAINMENT:</span>
                  <span className="font-bold text-emerald-300">{activePayload.isolationProtocol}</span>
                </div>
              </div>

              {/* Scrolling Terminal Code Output */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-[#5546F0]/20 font-mono text-[11px] space-y-2 text-indigo-200">
                <div className="text-[10px] text-slate-400 flex items-center justify-between pb-1 border-b border-white/10">
                  <span>REAL-TIME DETONATION LOGS</span>
                  <span className="text-emerald-400 animate-pulse">● EXECUTING</span>
                </div>
                {activePayload.telemetryLogs.map((log, i) => (
                  <p key={i} className="leading-relaxed">
                    <span className="text-[#6C5CE7] mr-1.5">&gt;</span>
                    {log}
                  </p>
                ))}
              </div>

              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">SANDBOX MEMORY: 512MB [CLEARED]</span>
                <Link
                  to="/practice"
                  className="font-bold text-[#818cf8] hover:text-white flex items-center gap-1 hover:underline"
                >
                  {isHi ? 'सिम्युलेटर में खोलें' : 'Open in Phone Sim'} →
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT / CENTER: THE TECHNICAL PHONE HUD (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center">
            {/* Outer Cyber Glow Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md p-4 sm:p-6 rounded-[40px] bg-gradient-to-b from-[#111B3C] via-[#0d132b] to-[#070b1a] border-2 border-[#5546F0]/30 shadow-[0_12px_40px_rgba(85,70,240,0.2)]">
              {/* Tactical Status Bar on Titanium Edge */}
              <div className="flex items-center justify-between text-[11px] font-mono text-indigo-300/80 mb-3 px-2">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  EMULATED_NODE_IOS18
                </span>
                <span className="bg-black/40 px-2 py-0.5 rounded border border-[#5546F0]/30 font-bold">
                  SANDBOX CONTAINMENT ACTIVE
                </span>
              </div>

              {/* PHONE DEVICE MOCKUP */}
              <div className="relative rounded-[32px] overflow-hidden border-4 border-slate-800 bg-[#060a14] shadow-2xl aspect-[9/16] max-h-[520px] flex flex-col justify-between p-4 text-white">
                {/* Laser Sweep Scanline Animation */}
                <div
                  className="pointer-events-none absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-[#6C5CE7] to-transparent opacity-70 blur-[1px] animate-scan z-30"
                  style={{ animationDuration: '3s' }}
                />

                {/* Technical HUD Grid Overlay on Screen */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(85,70,240,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(85,70,240,0.3) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Top Notch & Phone Status Bar */}
                <div className="relative z-20 flex items-center justify-between text-xs font-mono text-slate-300 px-3 pt-1">
                  <span>09:41</span>
                  {/* Hardware Notch */}
                  <div className="h-4 w-28 rounded-full bg-black border border-white/10 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5546F0]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[#818cf8]">
                    <Wifi className="h-3.5 w-3.5" />
                    <Battery className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* PHONE SCREEN CONTENT: INCOMING SUSPICIOUS ATTACK CARD */}
                <div className="relative z-20 space-y-4 my-auto">
                  {/* Real-time Threat Containment Tag */}
                  <div className="flex items-center justify-between text-[11px] font-mono px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-500/60 text-rose-300">
                    <span className="flex items-center gap-1 font-bold">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400 animate-bounce" />
                      SUSPICIOUS PAYLOAD ISOLATED
                    </span>
                    <span className="font-mono">[SANDBOX_SAFE]</span>
                  </div>

                  {/* Simulated Incoming Message Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-[#5546F0]/40 space-y-3 backdrop-blur-md relative shadow-[0_4px_24px_rgba(85,70,240,0.18)]">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-[#5546F0]/20 grid place-items-center text-[#818cf8] font-bold text-xs border border-[#5546F0]/40">
                          !
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{activePayload.sender}</p>
                          <p className="text-[10px] text-slate-400">Incoming Message • Now</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30">
                        FLAGGED
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                      "{isHi ? activePayload.messageTextHi : activePayload.messageTextEn}"
                    </p>

                    {/* Forensic Annotation Lock Overlay */}
                    <div className="p-2.5 rounded-lg bg-[#5546F0]/15 border border-[#5546F0]/30 text-[11px] font-mono text-indigo-200 flex items-start gap-2">
                      <Crosshair className="h-4 w-4 text-[#818cf8] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">ANOMALY DETECTED:</span>
                        <span className="text-[#c7d2fe]">{activePayload.suspiciousCue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Safe Sandbox Actions */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      type="button"
                      className="py-2.5 px-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-200 font-bold hover:bg-rose-500/30 transition-colors text-center"
                    >
                      [ BLOCK_SENDER ]
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-3 rounded-xl bg-[#5546F0]/20 border border-[#5546F0]/50 text-indigo-200 font-bold hover:bg-[#5546F0]/30 transition-colors text-center"
                    >
                      [ OSINT_TRACE ]
                    </button>
                  </div>
                </div>

                {/* Phone Bottom Home Indicator */}
                <div className="relative z-20 flex flex-col items-center gap-1 pt-2">
                  <div className="h-1 w-28 rounded-full bg-slate-600" />
                  <span className="text-[9px] font-mono text-slate-400">REALITY CHECK SANDBOX SHELL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalPhoneSandboxHero;
