import { create } from 'zustand';

export interface TourStep {
  /** CSS selector, usually [data-tour="..."] */
  target?: string;
  title: string;
  body: string;
}

interface TourState {
  steps: TourStep[];
  index: number;
  active: boolean;
  start: (steps: TourStep[]) => void;
  next: () => void;
  back: () => void;
  end: () => void;
}

/** Guided "Show me around" tour (3–5 steps, always skippable). */
export const useTour = create<TourState>((set, get) => ({
  steps: [],
  index: 0,
  active: false,
  start: (steps) => set({ steps, index: 0, active: steps.length > 0 }),
  next: () => {
    const { index, steps } = get();
    if (index >= steps.length - 1) set({ active: false });
    else set({ index: index + 1 });
  },
  back: () => set((s) => ({ index: Math.max(0, s.index - 1) })),
  end: () => set({ active: false }),
}));

/** Per-page tour scripts, keyed by the first path segment. */
export const TOURS: Record<string, TourStep[]> = {
  home: [
    { target: '[data-tour="nav"]', title: 'Moving around', body: 'Use these buttons to go to Home, Community, Academy or Phone Practice.' },
    { target: '[data-tour="actions"]', title: 'Three big choices', body: 'Pick what you want to do today. Each card opens a different part of the app.' },
    { target: '[data-tour="a11y"]', title: 'Make it comfortable', body: 'Change text size, switch light or dark, turn on Calm mode, or have the page read aloud.' },
    { target: '[data-tour="help"]', title: 'Help is always here', body: 'Tap "Help me" on any page to learn how it works.' },
  ],
  community: [
    { target: '[data-tour="check"]', title: 'Check something', body: 'Paste a message, link or photo you are unsure about. It takes three short steps.' },
    { target: '[data-tour="filters"]', title: 'Find posts', body: 'Search, or filter by type, status and language.' },
    { target: '[data-tour="post"]', title: 'Open a post', body: 'Each post shows how strongly the evidence backs the claim. Tap a post to see the evidence.' },
  ],
  post: [
    { target: '[data-tour="breakdown"]', title: 'How strong is the evidence?', body: 'See how four kinds of evidence add up. Likes and votes never count.' },
    { target: '[data-tour="investigate"]', title: 'Run the demo investigation', body: 'Watch a simulated step-by-step check. Findings are sample data and clearly labelled.' },
    { target: '[data-tour="discussion"]', title: 'Add what you know', body: 'Share evidence with a source, a correction, or a comment.' },
  ],
  academy: [
    { target: '[data-tour="labs"]', title: 'Choose a lesson', body: 'Each card is a short lesson. The time shows roughly how long it takes.' },
    { target: '[data-tour="categories"]', title: 'Filter by topic', body: 'Show only scam, banking, AI or phone safety lessons.' },
  ],
  practice: [
    { target: '[data-tour="scenarios"]', title: 'Pick a situation', body: '"Gentle" ones are a good place to start. Everything happens on a pretend phone.' },
    { target: '[data-tour="phone"]', title: 'The practice phone', body: 'Tap on the phone just like a real one. Nothing you do here is real.' },
    { target: '[data-tour="coach"]', title: 'Ask the coach', body: 'Stuck? Get a small nudge, an explanation, or be shown the safer choice.' },
  ],
};
