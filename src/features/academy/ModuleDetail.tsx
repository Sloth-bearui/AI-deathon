import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, BookOpen, Clock, AlertCircle, Lightbulb } from 'lucide-react';
import { Card, Button, GlassPanel, Stepper, Badge, ProgressRing } from '@/design-system';
import { useAcademyStore } from '@/store/useAcademyStore';
import { cn } from '@/utils/cn';

// Module content data (inline since this is a prototype)
const moduleContent: Record<string, { steps: Array<{ title: string; content: string; tip?: string; checklist?: string[] }> }> = {
  'reverse-image': {
    steps: [
      {
        title: 'What is Reverse Image Search?',
        content: 'Reverse image search lets you upload an image to find where else it appears online. This helps you check if an image is being used out of context, is old, or has been manipulated. It\'s one of the most powerful tools for verifying visual claims.',
        tip: 'When someone sends you a shocking image, your first instinct should be to verify it — not forward it.',
      },
      {
        title: 'How to Use Google Reverse Image Search',
        content: 'Go to images.google.com, click the camera icon, and either paste the image URL or upload the image from your device. Google will show you visually similar images and pages where the image appears. Look for the oldest or most credible source.',
        checklist: ['Open images.google.com', 'Click the camera icon', 'Upload or paste image URL', 'Review results for original source'],
      },
      {
        title: 'Using TinEye and Yandex',
        content: 'Besides Google, TinEye (tineye.com) specializes in finding exact matches and shows results sorted by date. Yandex Images often finds matches that Google misses, especially for content from South and Central Asia. Always try multiple tools.',
        tip: 'Different search engines index different parts of the web. Using at least two tools gives much better coverage.',
      },
      {
        title: 'Practice: Verify an Image',
        content: 'Here\'s a practice exercise: Next time you receive a forwarded image that makes a bold claim, run it through reverse image search before deciding whether to share it. Document what you find — the original source, date, and context.',
        checklist: ['Find an image from a recent forward', 'Run it through Google Images', 'Run it through TinEye', 'Compare the original context with the claim', 'Decide: would you forward this?'],
      },
    ],
  },
  'url-anatomy': {
    steps: [
      {
        title: 'Parts of a URL',
        content: 'Every URL has key parts: the protocol (http/https), domain name, path, and sometimes query parameters. The domain name is the most important part for verification — it tells you who owns the website. Always check the domain carefully.',
        tip: 'Scammers often create domains that look similar to real ones, like "gov-india.in" instead of "india.gov.in".',
      },
      {
        title: 'Spotting Fake Domains',
        content: 'Look for these red flags: misspellings (amaz0n.com), extra words (amazon-secure-login.com), unusual TLDs (.xyz, .tk), and subdomains designed to deceive (amazon.malicious-site.com). The real domain is always right before the TLD.',
        checklist: ['Check for misspellings in the domain', 'Look at the TLD (.com, .org, .gov.in)', 'Identify the actual domain (before the TLD)', 'Check if HTTPS is present'],
      },
      {
        title: 'Using WHOIS Lookup',
        content: 'WHOIS databases tell you who registered a domain and when. A legitimate organization\'s website is usually registered for multiple years under a real name. New domains registered with privacy protection and claiming to be government or bank sites are suspicious.',
      },
      {
        title: 'Practice: Analyze URLs',
        content: 'Examine these examples: Which one is real?\n\n• rbi.org.in/scripts/NotificationUser.aspx\n• rbi-secure-banking.com/notification\n• india-rbi.org/scheme/pm-yojana\n\nOnly the first one is the real RBI website. The others use deceptive domain names to trick you.',
        checklist: ['Identify the real domain in each URL', 'Check domain registration date', 'Look for HTTPS', 'Verify the domain matches the organization'],
      },
    ],
  },
  'social-engineering': {
    steps: [
      {
        title: 'What is Social Engineering?',
        content: 'Social engineering is the art of manipulating people into giving up confidential information or taking harmful actions. It relies on human psychology — trust, fear, urgency, and curiosity — rather than technical hacking.',
        tip: 'The most successful scams don\'t hack your phone. They hack your mind.',
      },
      {
        title: 'Common Tactics',
        content: 'Urgency ("Your account will be blocked in 24 hours!"), authority ("This is from the IT department"), social proof ("Everyone is doing this"), and fear ("Your Aadhaar has been compromised"). Recognizing these emotional triggers is your best defense.',
        checklist: ['Identify urgency language', 'Question claimed authority', 'Don\'t be pressured by deadlines', 'Verify through official channels'],
      },
      {
        title: 'Real Indian Scam Examples',
        content: 'KYC scams ("Complete your KYC or lose your bank account"), lottery scams ("You\'ve won ₹10 lakhs!"), tech support scams ("We detected a virus"), and UPI collect request scams. These all use social engineering to bypass your rational thinking.',
      },
      {
        title: 'How to Protect Yourself',
        content: 'Always pause before acting on urgent messages. Never share OTPs, passwords, or PINs with anyone — no legitimate organization will ask for these. When in doubt, contact the organization directly using their official website or app.',
        checklist: ['Pause before responding to urgent messages', 'Never share OTPs or passwords', 'Verify by calling official numbers', 'Use official apps, not links from messages'],
      },
    ],
  },
};

// Default content for modules without specific content
const defaultSteps = [
  {
    title: 'Introduction',
    content: 'This module will help you understand the topic and develop practical skills for digital safety.',
    tip: 'Take your time with each step. There\'s no rush.',
  },
  {
    title: 'Key Concepts',
    content: 'We\'ll cover the fundamental concepts you need to know to protect yourself online.',
  },
  {
    title: 'Practical Examples',
    content: 'Real-world examples will help you recognize these situations when you encounter them.',
    checklist: ['Review each example carefully', 'Think about similar situations you\'ve encountered', 'Discuss with family members'],
  },
  {
    title: 'Summary & Next Steps',
    content: 'Congratulations on completing this module! Apply what you\'ve learned in your daily digital life.',
  },
];

export const ModuleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { modules, completeStep, getModuleProgress } = useAcademyStore();

  const mod = useMemo(() => modules.find((m) => m.id === id), [modules, id]);
  const content = moduleContent[id || ''] || { steps: defaultSteps };
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  if (!mod) {
    return (
      <div className="text-center py-20">
        <h2 className="font-heading text-xl font-semibold mb-2">Module not found</h2>
        <Button variant="ghost" onClick={() => navigate('/academy')}>
          <ArrowLeft size={16} /> Back to Academy
        </Button>
      </div>
    );
  }

  const step = content.steps[currentStep];
  const progress = getModuleProgress(mod.id);
  const isStepCompleted = completedSteps.has(currentStep);

  const handleComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);
    completeStep(mod.id, currentStep);
  };

  const handleNext = () => {
    if (!isStepCompleted) handleComplete();
    if (currentStep < content.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate('/academy')}>
        <ArrowLeft size={16} /> {t('common.back')}
      </Button>

      {/* Module header */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold">{mod.title}</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{mod.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1"><Clock size={12} />{mod.duration}</span>
            <Badge variant="default">{mod.difficulty}</Badge>
          </div>
        </div>
        <ProgressRing progress={progress} size={56} strokeWidth={4} />
      </div>

      {/* Stepper */}
      <Stepper
        steps={content.steps.map((s) => s.title)}
        currentStep={currentStep}
      />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 lg:p-8">
            <h2 className="font-heading text-xl font-semibold mb-4">{step.title}</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line mb-6">
              {step.content}
            </p>

            {/* Tip */}
            {step.tip && (
              <GlassPanel className="p-4 flex items-start gap-3 mb-6">
                <Lightbulb size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-400 mb-1">Tip</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{step.tip}</p>
                </div>
              </GlassPanel>
            )}

            {/* Checklist */}
            {step.checklist && (
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium mb-2">Checklist:</p>
                {step.checklist.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 p-2 rounded-card hover:bg-[var(--color-hover)] cursor-pointer transition-colors">
                    <input type="checkbox" className="w-5 h-5 accent-[var(--color-accent)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Mark complete */}
            {!isStepCompleted && (
              <Button variant="secondary" size="sm" onClick={handleComplete}>
                <CheckCircle2 size={16} /> Mark as completed
              </Button>
            )}
            {isStepCompleted && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle2 size={16} /> Step completed
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0}>
          <ArrowLeft size={16} /> Previous
        </Button>
        <span className="text-sm text-[var(--color-text-muted)]">
          {currentStep + 1} / {content.steps.length}
        </span>
        {currentStep < content.steps.length - 1 ? (
          <Button onClick={handleNext}>
            Next <ArrowRight size={16} />
          </Button>
        ) : (
          <Button onClick={() => { handleComplete(); navigate('/academy'); }}>
            Finish Module <CheckCircle2 size={16} />
          </Button>
        )}
      </div>
    </motion.div>
  );
};
