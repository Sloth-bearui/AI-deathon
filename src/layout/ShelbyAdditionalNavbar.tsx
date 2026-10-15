import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, GraduationCap, Users, Sparkles, X, ChevronDown, Shield } from 'lucide-react';
import { usePrefsStore } from '@/store/usePrefsStore';
import { cn } from '@/utils/cn';

export const ShelbyAdditionalNavbar: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  return (
    <aside aria-label="Creative Desk Navigation" className="fixed top-3 left-0 right-0 z-50 pointer-events-none px-4 flex justify-center">
      <AnimatePresence>
        {!isVisible ? (
          <motion.div
            key="trigger"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto"
          >
            <button
              type="button"
              onClick={() => setIsVisible(true)}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 dark:bg-[#111B3C]/95 border-[2.5px] border-[#2b26c7] text-[#111B3C] dark:text-white font-heading font-black text-xs shadow-[0_8px_24px_rgba(43,38,199,0.25)] hover:shadow-[0_10px_30px_rgba(43,38,199,0.38)] hover:-translate-y-0.5 transition-all"
              aria-label="Open Additional Desk Navigation"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FEF3A9] border border-[#2b26c7] text-[#2b26c7]">
                <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} />
              </span>
              <span>{isHi ? '✦ अतिरिक्त नेवबार खोलें' : '✦ 3D Desk Navigation Bar'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#2b26c7] group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: -40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="pointer-events-auto w-full max-w-5xl rounded-[36px] bg-white/95 dark:bg-[#0c1228]/95 backdrop-blur-xl border-[3px] border-[#2b26c7] shadow-[0_20px_50px_rgba(43,38,199,0.28)] p-2.5 sm:p-3.5 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2.5">
                <Link to="/" className="flex items-center gap-2" aria-label="Home">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#5546F0] text-white border-[2.5px] border-[#2b26c7] shadow-[3px_3px_0px_#2b26c7] hover:rotate-12 transition-transform">
                    <span className="font-heading font-black text-xs tracking-tighter">TRUST</span>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF3A9] text-[#2b26c7] border-[2.5px] border-[#2b26c7] shadow-[3px_3px_0px_#2b26c7] hover:-rotate-12 transition-transform">
                    <span className="text-lg select-none">🌸</span>
                  </div>

                  <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-[#7DD3FC] text-[#2b26c7] border-[2.5px] border-[#2b26c7] shadow-[3px_3px_0px_#2b26c7] hover:scale-110 transition-transform">
                    <Shield className="h-5 w-5" />
                  </div>
                </Link>

                <div className="hidden lg:flex items-center gap-1.5 pl-3">
                  <span className="text-[11px] font-mono font-black tracking-widest text-[#5546F0] uppercase">
                    [3D_DESK_NAV]
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F6FF] dark:bg-[#162142] border-[2px] border-[#2b26c7]/40 shadow-[2px_2px_0px_#2b26c7]">
                <span className="h-2 w-2 rounded-full bg-[#2b26c7] animate-ping" />
                <span className="h-2 w-2 rounded-full bg-[#2b26c7]" />
                <span className="h-2 w-2 rounded-full bg-[#2b26c7]" />
                <span className="h-2 w-2 rounded-full bg-[#2b26c7]" />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <NavLink
                  to="/practice"
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 rounded-full border-[2.5px] border-[#2b26c7] font-heading font-black text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-[3px_3px_0px_#2b26c7] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none',
                      isActive
                        ? 'bg-[#FFA8D5] text-[#111B3C]'
                        : 'bg-[#FCE7F3] text-[#111B3C] hover:bg-[#FFA8D5]',
                    )
                  }
                >
                  <Smartphone className="h-4 w-4 shrink-0" />
                  <span>{isHi ? 'अभ्यास सैंडबॉक्स' : 'Practice Sandbox'}</span>
                </NavLink>

                <NavLink
                  to="/academy"
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 rounded-full border-[2.5px] border-[#2b26c7] font-heading font-black text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-[3px_3px_0px_#2b26c7] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none',
                      isActive
                        ? 'bg-[#FEF3A9] text-[#111B3C]'
                        : 'bg-[#FFFBEB] text-[#111B3C] hover:bg-[#FEF3A9]',
                    )
                  }
                >
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  <span>{isHi ? 'अकादमी लैब्स' : 'Academy Labs'}</span>
                </NavLink>

                <NavLink
                  to="/community"
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 rounded-full border-[2.5px] border-[#2b26c7] font-heading font-black text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-[3px_3px_0px_#2b26c7] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none',
                      isActive
                        ? 'bg-[#7DD3FC] text-[#111B3C]'
                        : 'bg-[#E0F2FE] text-[#111B3C] hover:bg-[#7DD3FC]',
                    )
                  }
                >
                  <Users className="h-4 w-4 shrink-0" />
                  <span>{isHi ? 'कम्युनिटी ओएसआईएनटी' : 'Community OSINT'}</span>
                </NavLink>

                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-[#2b26c7] text-[#2b26c7] dark:text-white hover:bg-rose-100 hover:text-rose-600 transition-colors ml-1 shadow-[2px_2px_0px_#2b26c7]"
                  aria-label="Hide Additional Navbar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default ShelbyAdditionalNavbar;
