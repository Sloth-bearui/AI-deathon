import React from 'react';
import type { Lab } from '@/types';
import { GlassPanel } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { CheckCircle, BookOpen } from 'lucide-react';

interface Props {
  lab: Lab;
  introText?: string;
}

export const LessonIntro: React.FC<Props> = ({ lab, introText }) => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const hindiObjectives = [
    'डिजिटल संचार और संदेशों में धोखाधड़ी के सूक्ष्म संकेतों को पहचानना सीखें',
    'क्लिक करने या शेयर करने से पहले हमेशा सत्यापन करने की आदत बनाएं',
    'आपातकालीन शिकायत दर्ज करने और वित्तीय नुकसान से बचने के उपायों को समझें',
  ];

  const objectives = isHi ? hindiObjectives : lab.objectives;

  return (
    <GlassPanel
      title={isHi ? 'पाठ अवलोकन और मुख्य अवधारणाएं' : 'Lesson Overview & Key Concepts'}
      subtitle={lab.summary}
      icon={<BookOpen />}
    >
      <div className="space-y-4 text-ink-2 text-sm sm:text-base leading-relaxed">
        <p className="text-ink font-medium">{introText || lab.description}</p>

        {objectives && objectives.length > 0 && (
          <div className="p-4 rounded-xl border border-line bg-surface/50 space-y-2">
            <span className="eyebrow block text-xs">
              {isHi ? 'आप क्या सीखेंगे' : 'What you will learn'}
            </span>
            <ul className="space-y-2 text-sm">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-ok-ink shrink-0 mt-0.5" />
                  <span className="text-ink-2">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default LessonIntro;
