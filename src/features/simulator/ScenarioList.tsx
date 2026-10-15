import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Smartphone, Shield, AlertTriangle, ChevronRight, Clock, RotateCcw } from 'lucide-react';
import { Card, Button, Badge, GlassPanel } from '@/design-system';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { cn } from '@/utils/cn';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const scenarioMeta = [
  {
    id: 'fake-kyc-sms',
    title: 'KYC Scam SMS',
    description: 'You receive an SMS claiming your bank KYC needs urgent update or your account will be blocked. What do you do?',
    type: 'SMS Scam',
    difficulty: 'Beginner',
    duration: '3-5 min',
    icon: '📱',
    color: 'from-red-500/20 to-orange-500/10',
  },
  {
    id: 'upi-collect-trick',
    title: 'UPI Collect Scam',
    description: 'Someone on an online marketplace sends you a UPI collect request instead of paying you. Can you spot the trick?',
    type: 'UPI Scam',
    difficulty: 'Beginner',
    duration: '3-5 min',
    icon: '💰',
    color: 'from-amber-500/20 to-yellow-500/10',
  },
  {
    id: 'fake-job-offer',
    title: 'Fake Job on WhatsApp',
    description: 'You get a WhatsApp message offering a work-from-home job with amazing pay. Is it real or a scam?',
    type: 'Job Scam',
    difficulty: 'Intermediate',
    duration: '5-7 min',
    icon: '💼',
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    id: 'aadhaar-phishing',
    title: 'Aadhaar Phishing Call',
    description: 'Someone calls claiming to be from UIDAI and says your Aadhaar is being misused. They need your details to "fix" it.',
    type: 'Phone Scam',
    difficulty: 'Intermediate',
    duration: '5-7 min',
    icon: '📞',
    color: 'from-violet-500/20 to-purple-500/10',
  },
];

export const ScenarioList: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { completedScenarios, resetScenario } = useSimulatorStore();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">{t('simulator.title')}</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">{t('simulator.subtitle')}</p>
      </motion.div>

      {/* Safety notice */}
      <motion.div variants={item}>
        <GlassPanel className="p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
            <Shield size={24} className="text-accent" />
          </div>
          <div>
            <h2 className="font-heading font-semibold mb-1">Safe Practice Environment</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              This is a simulated phone — nothing here is real. No actual messages are sent, no real money is involved, 
              and no personal data is at risk. Practice freely and learn from mistakes safely.
            </p>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Scenario cards */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarioMeta.map((scenario) => {
            const isCompleted = completedScenarios.includes(scenario.id);
            return (
              <motion.div key={scenario.id} variants={item}>
                <Card
                  hover
                  className="p-5 cursor-pointer group relative overflow-hidden"
                  onClick={() => navigate(`/practice/${scenario.id}`)}
                >
                  <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', scenario.color)} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{scenario.icon}</span>
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <Badge variant="success">Completed</Badge>
                        )}
                        {isCompleted && (
                          <button
                            onClick={(e) => { e.stopPropagation(); resetScenario(scenario.id); }}
                            className="w-8 h-8 rounded-full hover:bg-[var(--color-hover)] flex items-center justify-center"
                            title="Retry"
                          >
                            <RotateCcw size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="font-heading font-semibold mb-1.5">{scenario.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">{scenario.description}</p>

                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                      <Badge variant="default">{scenario.type}</Badge>
                      <span className="flex items-center gap-1"><Clock size={12} />{scenario.duration}</span>
                      <Badge variant="default">{scenario.difficulty}</Badge>
                    </div>

                    <div className="flex items-center gap-1 mt-3 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                      {isCompleted ? 'Review' : 'Start practice'} <ChevronRight size={16} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
