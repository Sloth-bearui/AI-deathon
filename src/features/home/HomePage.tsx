import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, GraduationCap, Smartphone, ArrowRight, Shield, Users, Eye, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, Button, GlassPanel } from '@/design-system';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stats = [
  { label: 'Claims Checked', value: '12,847', icon: CheckCircle2 },
  { label: 'Community Members', value: '4,231', icon: Users },
  { label: 'Scams Prevented', value: '3,592', icon: Shield },
  { label: 'Accuracy Rate', value: '94.2%', icon: TrendingUp },
];

const trendingClaims = [
  { text: '"RBI is banning all UPI apps from next month"', status: 'false' as const },
  { text: '"New govt scheme giving ₹5000 to all Aadhaar holders"', status: 'false' as const },
  { text: '"COVID booster doses cause infertility"', status: 'false' as const },
  { text: '"ISRO successfully tested reusable launch vehicle"', status: 'true' as const },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Hero */}
      <motion.section variants={item} className="text-center py-8 lg:py-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
          <Shield size={16} />
          <span>Community-powered verification</span>
        </div>
        <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-4 leading-tight">
          Don't forward.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
            Verify first.
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
          {t('home.subtitle')}
        </p>
      </motion.section>

      {/* Action Cards */}
      <motion.section variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Check Something */}
          <Card
            hover
            className="group cursor-pointer p-6 lg:p-8 relative overflow-hidden"
            onClick={() => navigate('/community')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Search className="text-accent" size={28} />
              </div>
              <h2 className="font-heading text-xl font-semibold mb-2">{t('home.check_title')}</h2>
              <p className="text-[var(--color-text-secondary)] mb-4 text-sm leading-relaxed">
                {t('home.check_desc')}
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                {t('home.check_cta')} <ArrowRight size={16} />
              </span>
            </div>
          </Card>

          {/* Learn */}
          <Card
            hover
            className="group cursor-pointer p-6 lg:p-8 relative overflow-hidden"
            onClick={() => navigate('/academy')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-emerald-400" size={28} />
              </div>
              <h2 className="font-heading text-xl font-semibold mb-2">{t('home.learn_title')}</h2>
              <p className="text-[var(--color-text-secondary)] mb-4 text-sm leading-relaxed">
                {t('home.learn_desc')}
              </p>
              <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-medium group-hover:gap-2 transition-all">
                {t('home.learn_cta')} <ArrowRight size={16} />
              </span>
            </div>
          </Card>

          {/* Practice */}
          <Card
            hover
            className="group cursor-pointer p-6 lg:p-8 relative overflow-hidden"
            onClick={() => navigate('/practice')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Smartphone className="text-violet-400" size={28} />
              </div>
              <h2 className="font-heading text-xl font-semibold mb-2">{t('home.practice_title')}</h2>
              <p className="text-[var(--color-text-secondary)] mb-4 text-sm leading-relaxed">
                {t('home.practice_desc')}
              </p>
              <span className="inline-flex items-center gap-1 text-violet-400 text-sm font-medium group-hover:gap-2 transition-all">
                {t('home.practice_cta')} <ArrowRight size={16} />
              </span>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section variants={item}>
        <GlassPanel className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={24} className="text-accent mx-auto mb-2" />
                <div className="font-heading text-2xl lg:text-3xl font-bold">{stat.value}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </motion.section>

      {/* Trending Claims */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-400" />
            Trending Claims
          </h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/community')}>
            View all <ArrowRight size={14} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trendingClaims.map((claim, i) => (
            <Card key={i} hover className="p-4 cursor-pointer flex items-start gap-3" onClick={() => navigate('/community')}>
              <span className={`mt-0.5 shrink-0 w-3 h-3 rounded-full ${
                claim.status === 'true' ? 'bg-emerald-400' : 'bg-red-400'
              }`} />
              <div>
                <p className="text-sm leading-relaxed">{claim.text}</p>
                <span className={`text-xs font-medium mt-1 inline-block ${
                  claim.status === 'true' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {claim.status === 'true' ? '✓ Verified True' : '✕ Verified False'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section variants={item} className="pb-8">
        <h2 className="font-heading text-xl font-semibold mb-6 text-center">How Reality Check Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Submit a Claim', desc: 'Paste a WhatsApp forward, URL, or type any claim you want verified.', icon: '📋' },
            { step: '2', title: 'Community Investigates', desc: 'Verified contributors research the claim using OSINT tools and credible sources.', icon: '🔍' },
            { step: '3', title: 'Get the Verdict', desc: 'See evidence, sources, and a clear verdict. Share the result with confidence.', icon: '✅' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="w-8 h-8 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center mx-auto mb-3">
                {s.step}
              </div>
              <h3 className="font-heading font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
