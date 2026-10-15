import React, { useState } from 'react';
import { Card } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { ZoomIn, CheckCircle2, Eye, ShieldAlert } from 'lucide-react';

export const DeepfakeSpotter: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const [zoomedArea, setZoomedArea] = useState<string | null>(null);

  const clues = [
    {
      id: 'ear',
      label: isHi ? 'कान की बनावट और चश्मे का फ्रेम' : 'Earlobe & Glasses',
      detail: isHi
        ? 'ध्यान दें कि चश्मे का फ्रेम बिना कोई स्वाभाविक छाया बनाए त्वचा में मिल रहा है, और कान की बाली की बनावट अस्वाभाविक रूप से पिघली हुई दिखती है।'
        : 'Notice how the glasses frame blends into the skin without casting a shadow, and the earlobe has an unnatural melted curvature.',
    },
    {
      id: 'teeth',
      label: isHi ? 'दांतों की बनावट (Dental Alignment)' : 'Dental Alignment',
      detail: isHi
        ? 'एआई मॉडल अक्सर व्यक्तिगत दांतों के बीच की प्राकृतिक दूरी बनाने में विफल रहते हैं, जिससे वे एक ठोस सफेद पट्टी की तरह दिखते हैं।'
        : 'Diffusion models often generate individual teeth that lack clear boundaries, resembling a solid continuous white bar.',
    },
    {
      id: 'hair',
      label: isHi ? 'बालों की सीमा और पृष्ठभूमि' : 'Hairline Boundary',
      detail: isHi
        ? 'जहां बाल पृष्ठभूमि से मिलते हैं, वह किनारा असामान्य रूप से धुंधला है और उसमें पैची डिजिटल कलाकृतियां (artifacts) दिखाई देती हैं।'
        : 'The edge where the hair meets the background is unnaturally blurred with patchy digital artifacts.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border border-line bg-surface/50 text-sm text-ink-2 leading-relaxed">
        <p>
          <strong className="text-ink">
            {isHi ? 'इंटरैक्टिव एआई डीपफेक डिटेक्शन:' : 'Interactive Exercise:'}
          </strong>{' '}
          {isHi
            ? 'इस सिंथेटिक चेहरे पर निरीक्षण बिंदुओं (Pins) पर टैप करके एआई द्वारा बनाई गई सूक्ष्म खामियों को ज़ूम करके देखें।'
            : 'Tap the inspection targets on this synthetic face portrait to zoom in on telltale AI generation artifacts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Synthetic Portrait Container */}
        <Card className="relative overflow-hidden p-0 border-2 border-accent/40 aspect-square max-w-sm mx-auto bg-black flex items-center justify-center shadow-lift">
          <img
            src="/media/deepfake-celebrity.svg"
            alt="Synthetic face diagram"
            className="w-full h-full object-cover"
          />

          {/* Interactive Inspection Pins */}
          <button
            type="button"
            onClick={() => setZoomedArea('ear')}
            className="absolute left-1/4 top-1/2 -translate-y-8 -translate-x-2 p-2.5 rounded-full bg-accent text-accent-on shadow-lift hover:scale-110 transition-transform text-xs font-bold ring-2 ring-white/50"
            title={isHi ? 'कान और चश्मा जांचें' : 'Inspect ear & glasses'}
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setZoomedArea('teeth')}
            className="absolute left-1/2 top-2/3 -translate-x-4 -translate-y-4 p-2.5 rounded-full bg-accent text-accent-on shadow-lift hover:scale-110 transition-transform text-xs font-bold ring-2 ring-white/50"
            title={isHi ? 'मुंह और दांत जांचें' : 'Inspect mouth'}
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setZoomedArea('hair')}
            className="absolute right-1/4 top-1/4 p-2.5 rounded-full bg-accent text-accent-on shadow-lift hover:scale-110 transition-transform text-xs font-bold ring-2 ring-white/50"
            title={isHi ? 'हेयरलाइन जांचें' : 'Inspect hairline'}
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </Card>

        {/* Clue Details */}
        <div className="space-y-3">
          <h4 className="font-heading text-base font-bold text-ink flex items-center gap-2">
            <Eye className="h-5 w-5 text-accent" />
            {isHi ? 'पहचाने गए एआई आर्टिफैक्ट्स:' : 'AI Artifact Inspection Points:'}
          </h4>

          {clues.map((c) => (
            <div
              key={c.id}
              onClick={() => setZoomedArea(c.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                zoomedArea === c.id
                  ? 'border-accent bg-accent/15 shadow-glow'
                  : 'border-line bg-surface/40 hover:border-accent/40'
              }`}
            >
              <div className="flex items-center justify-between font-semibold text-sm text-ink mb-1">
                <span>{c.label}</span>
                {zoomedArea === c.id && <CheckCircle2 className="h-4 w-4 text-accent-ink" />}
              </div>
              <p className="text-xs text-ink-2 leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeepfakeSpotter;
