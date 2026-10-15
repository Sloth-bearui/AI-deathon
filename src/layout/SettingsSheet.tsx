import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Sparkles, AlertTriangle } from 'lucide-react';
import { Button, Modal, toast } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { useCommunityStore } from '@/store/useCommunityStore';
import { useAcademyStore } from '@/store/useAcademyStore';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { AccessibilityBar } from './AccessibilityBar';

export const SettingsSheet: React.FC<{ open: boolean; onOpenChange: (o: boolean) => void }> = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useState(false);
  const setWelcomeDone = usePrefsStore((s) => s.setWelcomeDone);

  const resetAll = () => {
    useCommunityStore.getState().reset();
    useAcademyStore.getState().reset();
    useSimulatorStore.getState().reset();
    setConfirm(false);
    onOpenChange(false);
    toast.success('Demo data reset', 'Everything is back to the starting sample data.');
  };

  return (
    <Modal open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setConfirm(false); }} title={t('settings.title')} variant="sheet">
      <AccessibilityBar layout="stack" />
      <hr className="my-6 border-line" />
      <Button variant="secondary" fullWidth icon={<Sparkles />} onClick={() => { onOpenChange(false); setWelcomeDone(false); }}>
        {t('settings.welcomeAgain')}
      </Button>
      <div className="mt-6 rounded-2xl border border-bad/30 bg-bad/5 p-4">
        <p className="font-heading font-semibold">{t('settings.reset')}</p>
        <p className="mb-4 mt-1 text-sm text-ink-2">{t('settings.resetBody')}</p>
        {confirm ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="danger" icon={<AlertTriangle />} onClick={resetAll}>{t('settings.resetConfirm')}</Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Keep my data</Button>
          </div>
        ) : (
          <Button variant="danger" icon={<RotateCcw />} onClick={() => setConfirm(true)}>{t('settings.reset')}</Button>
        )}
      </div>
    </Modal>
  );
};
