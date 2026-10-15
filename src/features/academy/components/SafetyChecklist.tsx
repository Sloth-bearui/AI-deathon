import React from 'react';
import { GlassPanel, Button } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { Printer, CheckSquare, ShieldCheck } from 'lucide-react';

interface Props {
  checklist: string[];
  title?: string;
}

export const SafetyChecklist: React.FC<Props> = ({
  checklist,
  title,
}) => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const handlePrint = () => {
    window.print();
  };

  const defaultHindiChecklist = [
    'अचानक तात्कालिकता या डराने वाले संदेशों पर तुरंत प्रतिक्रिया देने से बचें और 60 सेकंड रुकें।',
    'हमेशा प्रेषक के 10-अंकों के मोबाइल नंबर और लिंक URL की वर्तनी की सावधानीपूर्वक जांच करें।',
    'दावों को सीधे आधिकारिक सरकारी या नियामक वेबसाइटों (जैसे rbi.org.in, parivahan.gov.in) पर सत्यापित करें।',
    'पैसे प्राप्त करने के लिए कभी भी अपना UPI PIN दर्ज न करें और न ही बैंक OTP किसी के साथ साझा करें।',
  ];

  const displayedList = isHi ? defaultHindiChecklist : checklist;

  return (
    <GlassPanel
      title={title || (isHi ? 'प्रिंट करने योग्य डिजिटल सुरक्षा चेकलिस्ट' : 'Printable Safety Checklist')}
      subtitle={isHi ? 'इसे अपने डेस्क के पास रखें या परिवार के बुजुर्ग सदस्यों के साथ साझा करें।' : 'Keep this reference handy near your desk or share it with family members.'}
      icon={<CheckSquare />}
      actions={
        <Button
          variant="secondary"
          size="sm"
          icon={<Printer />}
          onClick={handlePrint}
          className="no-print"
        >
          {isHi ? 'चेकलिस्ट प्रिंट करें' : 'Print Checklist'}
        </Button>
      }
    >
      <div className="printable p-4 sm:p-6 rounded-2xl border border-line bg-surface/50 space-y-4">
        <div className="flex items-center gap-2 text-ok-ink font-heading font-bold text-lg border-b border-line pb-3">
          <ShieldCheck className="h-6 w-6" />
          <span>{isHi ? 'मुख्य डिजिटल सुरक्षा नियम' : 'Core Digital Safety Rules'}</span>
        </div>

        <ul className="space-y-3">
          {displayedList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-lg border-2 border-ok text-ok-ink text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span className="text-base sm:text-lg font-medium text-ink leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-line text-xs text-ink-3 flex flex-wrap items-center justify-between gap-2">
          <span>Reality Check — Digital Safety & OSINT Platform</span>
          <span className="font-bold text-rose-400">
            {isHi ? 'आपातकालीन राष्ट्रीय साइबर हेल्पलाइन: 1930 • cybercrime.gov.in' : 'Emergency National Cyber Helpline: 1930 • cybercrime.gov.in'}
          </span>
        </div>
      </div>
    </GlassPanel>
  );
};

export default SafetyChecklist;
