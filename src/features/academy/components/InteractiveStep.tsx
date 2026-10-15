import React from 'react';
import type { Lab } from '@/types';
import { GlassPanel } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { PhishingInspector } from './labs/PhishingInspector';
import { UpiSafetyLab } from './labs/UpiSafetyLab';
import { DeepfakeSpotter } from './labs/DeepfakeSpotter';
import { AIImageLab } from './labs/AIImageLab';
import { NotificationLab } from './labs/NotificationLab';
import { ScamPatternsLab } from './labs/ScamPatternsLab';
import { Sparkles } from 'lucide-react';

interface Props {
  lab: Lab;
}

export const InteractiveStep: React.FC<Props> = ({ lab }) => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const renderLabContent = () => {
    switch (lab.id) {
      case 'lab-001':
        return <PhishingInspector />;
      case 'lab-002':
        return <UpiSafetyLab />;
      case 'lab-003':
        return <DeepfakeSpotter />;
      case 'lab-004':
        return <NotificationLab />;
      case 'lab-005':
        return <AIImageLab />;
      case 'lab-006':
      default:
        return <ScamPatternsLab />;
    }
  };

  return (
    <GlassPanel
      title={isHi ? 'इंटरैक्टिव अभ्यास और परिणाम सिमुलेशन' : 'Hands-on Practice & Consequence Simulation'}
      subtitle={isHi ? 'डिजिटल सुरक्षा आदतें बनाने के लिए नीचे दिए गए सिमुलेशन के साथ सीधे बातचीत करें।' : 'Interact directly with the simulation below to explore safe choices and dangerous consequences.'}
      icon={<Sparkles />}
    >
      {renderLabContent()}
    </GlassPanel>
  );
};

export default InteractiveStep;
