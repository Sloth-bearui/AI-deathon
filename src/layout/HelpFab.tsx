import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelpCircle, Compass, ArrowRight, ArrowLeft, X, CheckCircle2 } from 'lucide-react';
import { Button, Modal } from '@/design-system';
import { TOURS, useTour } from '@/hooks/useTour';

interface HelpTopic { title: string; points: string[] }

/** Plain-language page help, keyed by route. */
function helpFor(path: string): { key: string; topic: HelpTopic } {
  if (path.startsWith('/community/post/'))
    return {
      key: 'post',
      topic: {
        title: 'Reading a post',
        points: [
          'At the top is the claim — what the message says is true.',
          'The points panel shows how strongly evidence supports the claim, from 0 to 100. Likes and votes never change it.',
          'Tap "Run the investigation" to watch a demonstration check. Findings are sample data.',
          'At the bottom you can add evidence with a source link, a correction, or a comment.',
        ],
      },
    };
  if (path.startsWith('/community/contributor/'))
    return { key: 'community', topic: { title: 'Contributor profile', points: ['This page shows what a person has shared before.', 'It never changes how a post is judged. Every post stands on its own evidence.'] } };
  if (path.startsWith('/community'))
    return {
      key: 'community',
      topic: {
        title: 'The community feed',
        points: [
          'Each card is a message, photo or video someone was unsure about.',
          'Use the search box or filters to find a topic.',
          'Tap "Check something" to share a message you received. It takes three short steps.',
        ],
      },
    };
  if (path.startsWith('/academy/'))
    return { key: 'academy', topic: { title: 'Inside a lesson', points: ['Read the short introduction first.', 'Then try the activity, think about the questions, and print the safety checklist if you like.', 'Tap "Mark as completed" when you are done.'] } };
  if (path.startsWith('/academy'))
    return { key: 'academy', topic: { title: 'The Academy', points: ['Short lessons about staying safe online.', 'Pick any card. There is no test and no rush.'] } };
  if (path.startsWith('/practice/'))
    return {
      key: 'practice',
      topic: {
        title: 'Using the practice phone',
        points: ['This is a pretend phone. Nothing you tap is real.', 'Tap the choices shown on the phone screen.', 'Stuck? Open the coach for a hint.', 'At the end you will see what happened and safer choices.'],
      },
    };
  if (path.startsWith('/practice'))
    return { key: 'practice', topic: { title: 'Phone practice', points: ['Pick a situation to practise.', '"Gentle" ones are a good place to start.'] } };
  return {
    key: 'home',
    topic: { title: 'Getting started', points: ['Choose one of the three big cards.', 'Use the Display controls to make text bigger or turn on Calm mode.', 'Tap "Help me" on any page.'] },
  };
}

/** Spotlight overlay for the guided tour. Picks the first *visible* matching element. */
const TourOverlay: React.FC = () => {
  const { active, steps, index, next, back, end } = useTour();
  const [rect, setRect] = useState<DOMRect | null>(null);
  const step = steps[index];

  useLayoutEffect(() => {
    if (!active || !step?.target) { setRect(null); return; }
    const els = Array.from(document.querySelectorAll<HTMLElement>(step.target));
    const el = els.find((e) => e.getClientRects().length > 0 && e.offsetParent !== null) ?? null;
    if (!el) { setRect(null); return; }
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const update = () => setRect(el.getBoundingClientRect());
    const tm = setTimeout(update, 320);
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => { clearTimeout(tm); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [active, step]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') end(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, end]);

  if (!active || !step) return null;
  const pad = 8;
  const below = rect ? rect.bottom + 220 < window.innerHeight : true;

  return (
    <div className="fixed inset-0 z-[140]" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-body">
      <div className="absolute inset-0" onClick={end} aria-hidden />
      {rect ? (
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-2xl transition-all duration-300"
          style={{
            top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2,
            boxShadow: '0 0 0 3px rgb(var(--c-accent)), 0 0 0 9999px rgb(3 7 18 / 0.65)',
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-[rgb(3_7_18/0.65)]" aria-hidden />
      )}
      <div
        className="glass-strong rc-pop absolute left-1/2 w-[min(92vw,420px)] -translate-x-1/2 rounded-glass p-6"
        style={rect ? (below ? { top: Math.min(rect.bottom + 20, window.innerHeight - 260) } : { top: Math.max(16, rect.top - 250) }) : { top: '30%' }}
      >
        <p className="eyebrow mb-1">Step {index + 1} of {steps.length}</p>
        <h2 id="tour-title" className="text-2xl font-semibold">{step.title}</h2>
        <p id="tour-body" className="mt-2 text-ink-2">{step.body}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {index > 0 && <Button variant="ghost" size="sm" icon={<ArrowLeft />} onClick={back}>Back</Button>}
          <Button variant="ghost" size="sm" icon={<X />} onClick={end}>Skip tour</Button>
          <Button size="sm" className="ml-auto" autoFocus iconRight={index === steps.length - 1 ? <CheckCircle2 /> : <ArrowRight />} onClick={next}>
            {index === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

/** Floating "Help me" button available on every page. */
export const HelpFab: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const startTour = useTour((s) => s.start);
  const { key, topic } = helpFor(pathname);
  const tourSteps = TOURS[key] ?? [];

  return (
    <>
      <button
        type="button"
        data-tour="help"
        onClick={() => setOpen(true)}
        className="no-print fixed bottom-[88px] right-4 z-40 inline-flex min-h-[56px] items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 font-heading text-lg font-bold text-accent-on shadow-[0_10px_30px_-8px_rgb(var(--c-accent)/0.7)] transition-transform hover:-translate-y-0.5 lg:bottom-6 lg:right-6"
      >
        <HelpCircle className="h-6 w-6" aria-hidden /> {t('help.button')}
      </button>

      <Modal open={open} onOpenChange={setOpen} title={t('help.title')} description={topic.title} variant="sheet" closeLabel={t('help.close')}>
        <ul className="space-y-3">
          {topic.points.map((p, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-line bg-surface/50 p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-heading font-bold text-accent-ink" aria-hidden>{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {tourSteps.length > 0 && (
          <Button
            className="mt-6"
            fullWidth
            size="lg"
            icon={<Compass />}
            onClick={() => { setOpen(false); setTimeout(() => startTour(tourSteps), 250); }}
          >
            {t('help.tour')}
          </Button>
        )}
      </Modal>
      <TourOverlay />
    </>
  );
};
