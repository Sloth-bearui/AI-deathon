import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Lab } from '@/types';
import { mockApi } from '@/services/mockApi';
import { useAcademyStore } from '@/store/useAcademyStore';
import { usePrefsStore } from '@/store/usePrefsStore';
import { LessonIntro } from '../components/LessonIntro';
import { InteractiveStep } from '../components/InteractiveStep';
import { Reflection } from '../components/Reflection';
import { SafetyChecklist } from '../components/SafetyChecklist';
import { Button, Card, GlassPanel, EmptyState, SkeletonList, toast } from '@/design-system';
import { ArrowLeft, CheckCircle2, BookOpen, Layers, Sparkles } from 'lucide-react';

interface LessonItem {
  id: string;
  title: string;
  type: string;
  content: string;
}

export const LabPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lab, setLab] = useState<Lab | null>(null);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const isCompleted = useAcademyStore((s) => slug ? s.isLabCompleted(slug) || (lab?.id ? s.isLabCompleted(lab.id) : false) : false);
  const toggleComplete = useAcademyStore((s) => s.toggleCompleteLab);
  const setLastActive = useAcademyStore((s) => s.setLastActiveLab);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      const data = await mockApi.getLabBySlug(slug);
      setLab(data || null);
      if (data) {
        setLastActive(data.slug);
        const loadedLessons = await mockApi.getLessonsForLab(data.id);
        setLessons(loadedLessons);
      }
      setLoading(false);
    }
    load();
  }, [slug, setLastActive]);

  if (loading) {
    return (
      <div className="container-page py-10">
        <SkeletonList count={2} />
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={<BookOpen />}
          title={isHi ? 'लर्निंग लैब नहीं मिला' : 'Learning Lab Not Found'}
          description={isHi ? 'हम इस पाठ मॉड्यूल को खोजने में असमर्थ रहे।' : 'We could not locate this lesson module.'}
          action={<Button to="/academy" icon={<ArrowLeft />}>{isHi ? 'अकादमी पर वापस जाएं' : 'Back to Academy'}</Button>}
        />
      </div>
    );
  }

  const handleToggleComplete = () => {
    toggleComplete(lab.slug);
    if (!isCompleted) {
      toast.success(
        isHi ? 'पाठ पूरा हुआ!' : 'Lesson completed!',
        isHi ? 'इस सुरक्षा मॉड्यूल को पूरा करने पर बधाई।' : 'Great job finishing this safety module.',
      );
    } else {
      toast.info(
        isHi ? 'स्थिति अपडेट की गई' : 'Status updated',
        isHi ? 'अपूर्ण के रूप में चिह्नित किया गया।' : 'Marked as uncompleted.',
      );
    }
  };

  return (
    <div className="container-page space-y-8">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          to="/academy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-3 hover:text-accent-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isHi ? 'अकादमी पर वापस' : 'Back to Academy'}</span>
        </Link>

        <Button
          variant={isCompleted ? 'secondary' : 'primary'}
          size="md"
          icon={<CheckCircle2 className={isCompleted ? 'text-ok-ink' : ''} />}
          onClick={handleToggleComplete}
          className="shadow-sm"
        >
          {isCompleted
            ? (isHi ? 'पूर्ण हुआ ✓ (रद्द करने के लिए टैप करें)' : 'Completed ✓ (Tap to Undo)')
            : (isHi ? 'पूर्ण के रूप में चिह्नित करें' : 'Mark as Completed')}
        </Button>
      </div>

      {/* Main Title */}
      <div>
        <span className="eyebrow block mb-1">
          {isHi ? 'इंटरैक्टिव लर्निंग लैब' : 'Interactive Lesson Lab'}
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-ink">
          {lab.title}
        </h1>
        <p className="text-sm sm:text-base text-ink-2 mt-1">
          {isHi
            ? `अनुमानित समय: ~${lab.minutes} मिनट • स्व-गति से सीखें, कोई ग्रेडिंग नहीं`
            : `Estimated completion time: ~${lab.minutes} minutes • Self-paced, no grading`}
        </p>
      </div>

      {/* 1. Lesson Introduction & Objectives */}
      <LessonIntro lab={lab} />

      {/* 2. Structured Lesson Steps & Message Guides (Loaded from lessons.json) */}
      {lessons.length > 0 && (
        <GlassPanel
          title={isHi ? 'पाठ मार्गदर्शिका और मुख्य विषय' : 'Lesson Content & Guide'}
          subtitle={isHi ? 'विस्तृत संदेश विश्लेषण और सुरक्षा अवधारणाओं को पढ़ें।' : 'Explore key message patterns and technical breakdowns.'}
          icon={<Layers />}
        >
          <div className="space-y-4">
            {/* Step navigation tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-line">
              {lessons.map((ls, idx) => (
                <button
                  key={ls.id}
                  type="button"
                  onClick={() => setActiveLessonIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    activeLessonIdx === idx
                      ? 'bg-accent/20 text-accent-ink border border-accent/40 shadow-sm'
                      : 'bg-surface/50 text-ink-3 hover:text-ink hover:bg-surface'
                  }`}
                >
                  {idx + 1}. {ls.title}
                </button>
              ))}
            </div>

            {/* Active Lesson Step Content */}
            {lessons[activeLessonIdx] && (
              <Card className="p-5 sm:p-6 bg-surface/70 border-line space-y-3">
                <div className="flex items-center justify-between text-xs text-ink-3">
                  <span className="font-bold text-accent-ink uppercase tracking-wider">
                    {isHi ? 'भाग' : 'Topic'} {activeLessonIdx + 1} / {lessons.length}
                  </span>
                  <span className="capitalize px-2 py-0.5 rounded bg-black/30 border border-line">
                    {lessons[activeLessonIdx].type}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-ink">
                  {lessons[activeLessonIdx].title}
                </h3>
                <p className="text-sm sm:text-base text-ink-2 leading-relaxed whitespace-pre-line">
                  {lessons[activeLessonIdx].content}
                </p>
              </Card>
            )}
          </div>
        </GlassPanel>
      )}

      {/* 3. Interactive Hands-On Step (with Consequence Simulation) */}
      <InteractiveStep lab={lab} />

      {/* 4. Personal Reflection */}
      <Reflection questions={lab.reflection} />

      {/* 5. Printable Safety Checklist */}
      <SafetyChecklist checklist={lab.checklist} />

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <Button to="/academy" variant="ghost" icon={<ArrowLeft />}>
          {isHi ? 'सभी पाठ' : 'All Lessons'}
        </Button>

        <Button
          variant={isCompleted ? 'secondary' : 'primary'}
          size="md"
          icon={<CheckCircle2 />}
          onClick={handleToggleComplete}
        >
          {isCompleted
            ? (isHi ? 'पूर्ण के रूप में चिह्नित ✓' : 'Marked as Completed ✓')
            : (isHi ? 'पूर्ण के रूप में चिह्नित करें' : 'Mark as Completed')}
        </Button>
      </div>
    </div>
  );
};

export default LabPage;
