import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle2, ChevronRight, Search, Shield, Eye, Fingerprint, Globe, Lock, Zap } from 'lucide-react';
import { Card, Button, Badge, GlassPanel, ProgressRing } from '@/design-system';
import { useAcademyStore } from '@/store/useAcademyStore';
import { cn } from '@/utils/cn';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const moduleIcons: Record<string, React.ElementType> = {
  'reverse-image': Search,
  'url-anatomy': Globe,
  'social-engineering': Shield,
  'deepfake-detection': Eye,
  'privacy-settings': Lock,
  'password-hygiene': Fingerprint,
};

const difficultyColors: Record<string, string> = {
  beginner: 'text-emerald-400',
  intermediate: 'text-amber-400',
  advanced: 'text-red-400',
};

export const AcademyList: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { modules, getModuleProgress } = useAcademyStore();

  const totalCompleted = modules.filter((m) => {
    const progress = getModuleProgress(m.id);
    return progress === 100;
  }).length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">{t('academy.title')}</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">{t('academy.subtitle')}</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={item}>
        <GlassPanel className="p-6">
          <div className="flex items-center gap-6">
            <ProgressRing progress={modules.length > 0 ? Math.round((totalCompleted / modules.length) * 100) : 0} size={80} />
            <div>
              <div className="font-heading text-2xl font-bold">
                {totalCompleted} / {modules.length}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">Modules completed</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Learn at your own pace. No pressure, no scores.
              </p>
            </div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Module Grid */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => {
            const Icon = moduleIcons[mod.id] || BookOpen;
            const progress = getModuleProgress(mod.id);
            const isComplete = progress === 100;

            return (
              <motion.div key={mod.id} variants={item}>
                <Card
                  hover
                  className="p-5 cursor-pointer group relative overflow-hidden"
                  onClick={() => navigate(`/academy/${mod.id}`)}
                >
                  {isComplete && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 size={20} className="text-emerald-400" />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110',
                      isComplete ? 'bg-emerald-400/15' : 'bg-accent/15'
                    )}>
                      <Icon size={24} className={isComplete ? 'text-emerald-400' : 'text-accent'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold mb-1">{mod.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">{mod.description}</p>

                      <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {mod.duration}
                        </span>
                        <Badge variant="default">
                          <span className={difficultyColors[mod.difficulty]}>{mod.difficulty}</span>
                        </Badge>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} /> {mod.steps} steps
                        </span>
                      </div>

                      {/* Progress bar */}
                      {progress > 0 && !isComplete && (
                        <div className="mt-3">
                          <div className="h-1.5 rounded-full bg-[var(--color-surface)] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-accent mt-1 inline-block">{progress}% complete</span>
                        </div>
                      )}
                    </div>
                    <ChevronRight size={18} className="text-[var(--color-text-muted)] shrink-0 group-hover:translate-x-1 transition-transform mt-1" />
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
