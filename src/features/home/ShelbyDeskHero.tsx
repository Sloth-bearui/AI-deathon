import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  GraduationCap,
  Users,
  ArrowRight,
  Sparkles,
  Terminal,
  BookOpen,
  Laptop,
  AlertTriangle,
  RotateCw,
  Camera,
  Shield,
  Move,
} from 'lucide-react';
import { usePrefsStore } from '@/store/usePrefsStore';
import { cn } from '@/utils/cn';

interface ThreatTab {
  id: string;
  badge: string;
  title: string;
  sender: string;
  snippet: string;
  cue: string;
  accent: string;
}

const threatTabs: ThreatTab[] = [
  {
    id: 'tab-sms',
    badge: '01 SMS',
    title: 'Bank KYC Deactivation Threat',
    sender: '+91-98401XXXXX (Personal SIM)',
    snippet: 'URGENT: Nova Bank debit card is DEACTIVATED due to KYC. Re-activate: novabank-kyc.site/login',
    cue: 'Unregistered .site domain & personal 10-digit SIM sender',
    accent: '#FFA8D5',
  },
  {
    id: 'tab-upi',
    badge: '02 UPI',
    title: 'OLX Reverse-Debit Collect Trap',
    sender: 'Deepak Kumar (Buyer)',
    snippet: 'SwiftPay: Deepak Kumar requested ₹4,500. Enter UPI PIN to deposit money into account.',
    cue: 'Reverse Debit: UPI PIN is ONLY for paying out, never to receive money!',
    accent: '#FEF3A9',
  },
  {
    id: 'tab-apk',
    badge: '03 APK',
    title: 'Traffic Challan Spyware APK',
    sender: 'echallan-parivahan.live',
    snippet: 'Police: ₹2,000 pending fine on DL01-AB-1234. Install Parivahan_Challan.apk to clear fine.',
    cue: 'Malicious sideload requests READ_SMS and Accessibility Service permissions',
    accent: '#7DD3FC',
  },
  {
    id: 'tab-voice',
    badge: '04 AI',
    title: 'Family Emergency Voice Clone',
    sender: 'Unknown WhatsApp Call',
    snippet: '"Dad, please send ₹30,000 urgently! Police arrested my friend and my phone broke."',
    cue: 'Neural TTS artifact: robotic phase drift and missing breath micro-patterns',
    accent: '#C7D2FE',
  },
];

export const ShelbyDeskHero: React.FC = () => {
  const navigate = useNavigate();
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [activeTabId, setActiveTabId] = useState<string>('tab-sms');
  const [rubikRotation, setRubikRotation] = useState<number>(0);
  const [cameraFlash, setCameraFlash] = useState<boolean>(false);
  const [isOpeningNotebook, setIsOpeningNotebook] = useState<boolean>(false);
  const [isOpeningLaptop, setIsOpeningLaptop] = useState<boolean>(false);
  const [isOpeningPhone, setIsOpeningPhone] = useState<boolean>(false);

  const activeTab = threatTabs.find((t) => t.id === activeTabId) || threatTabs[0];

  const handleNotebookClick = () => {
    setIsOpeningNotebook(true);
    setTimeout(() => {
      navigate('/academy');
    }, 420);
  };

  const handleLaptopClick = () => {
    setIsOpeningLaptop(true);
    setTimeout(() => {
      navigate('/community');
    }, 420);
  };

  const handlePhonePracticeClick = () => {
    setIsOpeningPhone(true);
    setTimeout(() => {
      navigate('/practice');
    }, 420);
  };

  const triggerCamera = () => {
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 300);
  };

  return (
    <section className="relative overflow-hidden rounded-[44px] bg-[#FFFDF5] dark:bg-[#070b18] border-[3.5px] border-[#2b26c7] p-4 sm:p-7 lg:p-9 shadow-[0_25px_60px_rgba(43,38,199,0.18)] my-6 select-none">
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pb-5 border-b-[3px] border-[#2b26c7]/20">
        <div className="flex items-center gap-3">
          <div className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#5546F0] text-white border-[3px] border-[#2b26c7] shadow-[3.5px_3.5px_0px_#2b26c7] hover:rotate-12 transition-transform cursor-pointer">
            <span className="font-heading font-black text-sm tracking-tighter">TRUST</span>
            <span className="absolute -bottom-1 -right-1 text-xs">↗</span>
          </div>

          <div className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF3A9] text-[#2b26c7] border-[3px] border-[#2b26c7] shadow-[3.5px_3.5px_0px_#2b26c7] hover:-rotate-12 transition-transform cursor-pointer">
            <span className="text-2xl select-none">🌸</span>
          </div>

          <div className="group hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-[#7DD3FC] text-[#2b26c7] border-[3px] border-[#2b26c7] shadow-[3.5px_3.5px_0px_#2b26c7] hover:scale-110 transition-transform cursor-pointer">
            <Shield className="h-6 w-6" />
          </div>

          <div className="hidden md:flex items-center gap-2 pl-3">
            <div className="h-7 w-9 rounded-xl border-2 border-[#2b26c7] bg-[#FFA8D5] flex items-center justify-center relative shadow-[2px_2px_0px_#2b26c7]">
              <span className="text-[11px] font-black text-[#2b26c7]">TV</span>
              <div className="absolute -top-1.5 left-3 w-0.5 h-1.5 bg-[#2b26c7]" />
              <div className="absolute -bottom-1.5 left-1.5 w-1 h-1.5 bg-[#2b26c7]" />
              <div className="absolute -bottom-1.5 right-1.5 w-1 h-1.5 bg-[#2b26c7]" />
            </div>
            <span className="text-xs font-mono font-black text-[#2b26c7] dark:text-indigo-300">
              3D_DESK_STUDIO
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-[#121a36] border-[2.5px] border-[#2b26c7] shadow-[3px_3px_0px_#2b26c7]">
          <span className="h-2 w-2 rounded-full bg-[#2b26c7] animate-ping" />
          <span className="h-2 w-2 rounded-full bg-[#2b26c7]" />
          <span className="h-2 w-2 rounded-full bg-[#2b26c7]" />
          <span className="h-2 w-2 rounded-full bg-[#2b26c7]" />
          <span className="font-mono text-xs font-bold text-[#2b26c7] dark:text-indigo-200 ml-1">
            IMMERSIVE DESK STATION
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/practice"
            className="px-4 py-2 rounded-full border-[2.5px] border-[#2b26c7] bg-[#FFA8D5] text-[#111B3C] font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#2b26c7] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all flex items-center gap-1.5"
          >
            <Smartphone className="h-4 w-4" />
            <span>Practice Sandbox</span>
          </Link>

          <Link
            to="/academy"
            className="px-4 py-2 rounded-full border-[2.5px] border-[#2b26c7] bg-[#FEF3A9] text-[#111B3C] font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#2b26c7] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Academy Labs</span>
          </Link>

          <Link
            to="/community"
            className="px-4 py-2 rounded-full border-[2.5px] border-[#2b26c7] bg-[#7DD3FC] text-[#111B3C] font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#2b26c7] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all flex items-center gap-1.5"
          >
            <Users className="h-4 w-4" />
            <span>Community OSINT</span>
          </Link>
        </div>
      </div>

      <div className="relative pt-6 pb-2" style={{ perspective: '1400px' }}>
        <div
          className="relative rounded-[36px] bg-[#FAF8EE] dark:bg-[#0e142b] border-[3px] border-[#2b26c7] p-5 sm:p-8 lg:p-10 shadow-[0_30px_60px_-15px_rgba(43,38,199,0.22),inset_0_4px_12px_rgba(255,255,255,0.8)] transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(10deg)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none rounded-[36px] border-b-[8px] border-[#2b26c7]/30" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 flex flex-col justify-between">
              <motion.div
                drag
                dragConstraints={{ left: -80, right: 80, top: -50, bottom: 50 }}
                dragElastic={0.25}
                whileDrag={{ scale: 1.08, rotate: -4, zIndex: 40, cursor: 'grabbing' }}
                whileHover={{ scale: 1.03, y: -6 }}
                animate={isOpeningNotebook ? { scale: 1.2, opacity: 0, y: -40 } : { scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                onClick={handleNotebookClick}
                className="cursor-grab active:cursor-grabbing group relative block w-full rounded-[34px] bg-[#FFF0F7] dark:bg-[#1a1226] border-[3.5px] border-[#2b26c7] p-5 sm:p-6 shadow-[8px_8px_0px_#2b26c7] hover:shadow-[12px_12px_0px_#2b26c7] transition-shadow overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
                aria-label="Movable 3D Notebook - click to enter Academy"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono font-black text-[#5546F0] bg-white dark:bg-[#111B3C] px-2.5 py-1 rounded-full border-2 border-[#2b26c7] shadow-[2px_2px_0px_#2b26c7]">
                    <Move className="h-3.5 w-3.5" /> 3D MOVABLE
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FEF3A9] border-2 border-[#2b26c7] text-[#2b26c7] text-[11px] font-heading font-black uppercase shadow-[2px_2px_0px_#2b26c7]">
                    CLICK TO ENTER
                  </span>
                </div>

                <div className="relative mx-auto my-3 w-full max-w-[270px] aspect-[4/3] rounded-2xl bg-[#FFE4E6] border-[3px] border-[#2b26c7] shadow-[6px_6px_0px_#2b26c7] flex flex-col justify-between p-4 overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b26c7]/30">
                    <div className="flex gap-1.5">
                      <span className="h-3 w-3 rounded-full border-2 border-[#2b26c7] bg-white shadow-sm" />
                      <span className="h-3 w-3 rounded-full border-2 border-[#2b26c7] bg-white shadow-sm" />
                      <span className="h-3 w-3 rounded-full border-2 border-[#2b26c7] bg-white shadow-sm" />
                      <span className="h-3 w-3 rounded-full border-2 border-[#2b26c7] bg-white shadow-sm" />
                      <span className="h-3 w-3 rounded-full border-2 border-[#2b26c7] bg-white shadow-sm" />
                    </div>
                    <span className="text-xs font-mono font-black text-[#2b26c7] bg-[#FEF3A9] px-2 py-0.5 rounded-md border-2 border-[#2b26c7]">
                      2026 // ACADEMY
                    </span>
                  </div>

                  <div className="space-y-2 py-1">
                    <div className="h-2 w-4/5 rounded bg-[#2b26c7]/25" />
                    <div className="h-2 w-full rounded bg-[#2b26c7]/20" />
                    <div className="h-2 w-5/6 rounded bg-[#2b26c7]/20" />
                    <div className="h-2 w-2/3 rounded bg-[#2b26c7]/20" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t-2 border-[#2b26c7]/20 text-xs font-heading font-black text-[#5546F0]">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-[#5546F0]" /> Academy Labs
                    </span>
                    <span className="bg-[#FEF3A9] text-[#2b26c7] px-2.5 py-0.5 rounded-full border-2 border-[#2b26c7]">
                      7 Labs
                    </span>
                  </div>

                  <div className="absolute -bottom-4 -right-2 h-20 w-4 bg-[#FEF3A9] border-2 border-[#2b26c7] rotate-45 pointer-events-none" />
                </div>

                <div className="mt-3 pt-3 border-t-2 border-[#2b26c7]/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-black text-[#111B3C] dark:text-white group-hover:text-[#5546F0] transition-colors">
                      {isHi ? 'अकादमी नोटबुक' : 'Academy Labs'}
                    </h3>
                    <span className="text-xs text-[#596784] dark:text-slate-300">
                      Drag around or tap to study
                    </span>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-[#5546F0] text-white group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div
                className="relative w-full rounded-[38px] bg-white dark:bg-[#0c142e] border-[3.5px] border-[#2b26c7] p-5 sm:p-6 shadow-[9px_9px_0px_#2b26c7]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#2b26c7]/20 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#FFA8D5] border-2 border-[#2b26c7]" />
                    <span className="h-3.5 w-3.5 rounded-full bg-[#FEF3A9] border-2 border-[#2b26c7]" />
                    <span className="h-3.5 w-3.5 rounded-full bg-[#7DD3FC] border-2 border-[#2b26c7]" />
                    <span className="text-xs font-mono font-black text-[#2b26c7] dark:text-indigo-300 ml-1">
                      SMARTPHONE_ON_3D_DESK
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-black uppercase text-[#2b26c7] bg-[#FEF3A9] px-2.5 py-0.5 rounded-full border-2 border-[#2b26c7]">
                    SWITCH TABS
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  {threatTabs.map((t) => {
                    const active = t.id === activeTabId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTabId(t.id)}
                        className={cn(
                          'py-2 px-2.5 rounded-xl border-2 border-[#2b26c7] font-heading font-black text-xs transition-all text-center',
                          active
                            ? 'shadow-[2.5px_2.5px_0px_#2b26c7] -translate-y-0.5'
                            : 'bg-slate-50 dark:bg-slate-800 text-[#596784] hover:bg-slate-100',
                        )}
                        style={{
                          backgroundColor: active ? t.accent : undefined,
                          color: active ? '#111B3C' : undefined,
                        }}
                      >
                        {t.badge}
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-[28px] bg-slate-900 border-[3.5px] border-[#2b26c7] p-4 text-white shadow-inner flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      SIMULATOR DISPLAY
                    </span>
                    <span>09:41</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab.id}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 my-auto py-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400 text-rose-300 font-mono font-bold flex items-center gap-1">
                          <AlertTriangle className="h-3.5 w-3.5" /> THREAT DETECTED
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 truncate max-w-[160px]">
                          {activeTab.sender}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                        <p className="font-heading font-black text-xs text-[#FFA8D5]">
                          {activeTab.title}
                        </p>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          "{activeTab.snippet}"
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#5546F0]/20 border border-[#5546F0]/40 text-xs font-mono text-indigo-200 flex items-start gap-2">
                        <Terminal className="h-4 w-4 text-[#7DD3FC] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[#FEF3A9] font-bold block">ANOMALY:</span>
                          <span>{activeTab.cue}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      AIR-GAPPED ENVIRONMENT
                    </span>
                    <button
                      type="button"
                      onClick={handlePhonePracticeClick}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5546F0] hover:bg-[#6C5CE7] text-white font-heading font-bold text-xs shadow-sm hover:-translate-y-0.5 transition-transform"
                    >
                      <span>Open Full Practice</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#596784] dark:text-slate-400 pt-1">
                  <span className="font-mono text-[11px] text-[#2b26c7] dark:text-indigo-300 font-bold">
                    Tap tabs to isolate threats
                  </span>
                  <button
                    type="button"
                    onClick={handlePhonePracticeClick}
                    className="font-bold text-[#5546F0] hover:underline flex items-center gap-1"
                  >
                    Launch Full Practice Simulator →
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
              <motion.div
                whileHover={{ scale: 1.03, y: -6 }}
                animate={isOpeningLaptop ? { scale: 1.2, opacity: 0, y: -40 } : { scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                onClick={handleLaptopClick}
                className="cursor-pointer group relative block w-full rounded-[34px] bg-[#F0FDF4] dark:bg-[#0c1f1c] border-[3.5px] border-[#2b26c7] p-5 shadow-[8px_8px_0px_#2b26c7] hover:shadow-[12px_12px_0px_#2b26c7] transition-shadow overflow-hidden"
                aria-label="Click Laptop to enter Community"
              >
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#7DD3FC] border-2 border-[#2b26c7] text-[#111B3C] text-[10px] font-heading font-black tracking-wide uppercase shadow-[2px_2px_0px_#2b26c7]">
                  CLICK TO ENTER
                </div>

                <div className="relative mx-auto my-2 w-full max-w-[230px] aspect-[16/10] rounded-xl bg-slate-900 border-[3px] border-[#2b26c7] shadow-[5px_5px_0px_#2b26c7] p-2.5 text-white flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1 border-b border-white/10">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      COMMUNITY_OSINT
                    </span>
                    <span>LIVE</span>
                  </div>

                  <div className="space-y-1 py-1">
                    <p className="text-[11px] font-heading font-black text-[#7DD3FC] truncate">
                      TRAI 1600-Series Order Verified
                    </p>
                    <p className="text-[10px] text-slate-300 truncate">
                      95 pts • Authentic Govt Advisory
                    </p>
                    <p className="text-[11px] font-heading font-black text-[#FFA8D5] truncate">
                      RBI Rupee QR Fee Forward Debunked
                    </p>
                  </div>

                  <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#FEF3A9]">
                    <span>16 CLAIMS</span>
                    <span>VIEW TERMINAL →</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t-2 border-[#2b26c7]/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-black text-[#111B3C] dark:text-white group-hover:text-[#5546F0] transition-colors">
                      {isHi ? 'कम्युनिटी ओएसआईएनटी' : 'Community OSINT'}
                    </h3>
                    <span className="text-xs text-[#596784] dark:text-slate-300">
                      Peer-verified news & claims
                    </span>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-[#5546F0] text-white group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>

              <div className="p-4 rounded-[30px] bg-[#FFFBEB] dark:bg-[#1f1b0a] border-[2.5px] border-[#2b26c7] shadow-[5px_5px_0px_#2b26c7] space-y-3">
                <div className="flex items-center justify-between text-xs font-heading font-black text-[#2b26c7] dark:text-amber-300">
                  <span>3D DESK PROPS</span>
                  <span className="text-[10px] font-mono bg-[#FEF3A9] px-2 py-0.5 rounded-full border border-[#2b26c7]">
                    INTERACTIVE
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRubikRotation((prev) => prev + 90)}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-[#2b26c7] font-heading font-black text-xs text-[#111B3C] dark:text-white shadow-[2px_2px_0px_#2b26c7] hover:rotate-3 transition-transform text-center flex items-center justify-center gap-1.5"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Rubik ({rubikRotation}°)</span>
                  </button>

                  <button
                    type="button"
                    onClick={triggerCamera}
                    className="py-2 px-3.5 rounded-xl bg-[#FFA8D5] border-2 border-[#2b26c7] text-[#111B3C] font-heading font-black text-xs shadow-[2px_2px_0px_#2b26c7] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                    aria-label="Click camera to flash"
                  >
                    <Camera className="h-4 w-4" />
                    <span>{cameraFlash ? 'FLASH!' : 'Camera'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShelbyDeskHero;
