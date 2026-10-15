import React, { useState } from 'react';
import { GlassPanel, Button, toast } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { MessageCircleQuestion } from 'lucide-react';

interface Props {
  questions: string[];
}

export const Reflection: React.FC<Props> = ({ questions }) => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    toast.success(
      isHi ? 'विचार सहेजे गए' : 'Reflection recorded',
      isHi ? 'आपके नोट्स इस डिवाइस पर स्थानीय रूप से सुरक्षित हैं।' : 'Your notes are saved locally on this device.',
    );
  };

  const hindiQuestions = [
    'क्या आपने या आपके परिवार के किसी सदस्य ने हाल ही में ऐसा कोई संदेश या कॉल देखा है?',
    'अगली बार जब आप ऐसा तात्कालिक चेतावनी पैटर्न देखेंगे, तो आपका पहला कदम क्या होगा?',
  ];

  const displayedQuestions = isHi && questions.length <= 2 ? hindiQuestions : questions;

  return (
    <GlassPanel
      title={isHi ? 'व्यक्तिगत विचार और चर्चा' : 'Personal Reflection & Discussion'}
      subtitle={isHi ? 'इन अवधारणाओं को अपनी दैनिक डिजिटल आदतों से जोड़कर सोचें।' : 'Pause to relate these concepts to your everyday digital habits.'}
      icon={<MessageCircleQuestion />}
    >
      <form onSubmit={handleSave} className="space-y-5">
        {displayedQuestions.map((q, idx) => (
          <div key={idx} className="space-y-2">
            <label htmlFor={`reflection-${idx}`} className="label text-sm sm:text-base font-medium text-ink">
              {idx + 1}. {q}
            </label>
            <textarea
              id={`reflection-${idx}`}
              rows={2}
              placeholder={isHi ? 'अपने विचार या हाल ही की कोई वास्तविक घटना यहाँ लिखें...' : 'Jot down your thoughts or a real-life situation you noticed...'}
              value={answers[idx] || ''}
              onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
              className="field min-h-[64px] resize-y text-sm w-full"
            />
          </div>
        ))}

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="secondary" size="md">
            {saved ? (isHi ? 'नोट्स अपडेट करें ✓' : 'Update Reflection ✓') : (isHi ? 'नोट्स सहेजें' : 'Save My Notes')}
          </Button>
        </div>
      </form>
    </GlassPanel>
  );
};

export default Reflection;
