import { useCallback, useEffect, useState } from 'react';
import { usePrefsStore } from '@/store/usePrefsStore';

/** Reads the current page's main content using the browser's Web Speech API. */
export function useReadAloud() {
  const lang = usePrefsStore((s) => s.language);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speaking, setSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text?: string) => {
      if (!supported) return false;
      const main = document.getElementById('main-content');
      // Skip elements marked as not for reading (decorative, phone chrome, etc.)
      let content = text;
      if (!content && main) {
        const clone = main.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('[aria-hidden="true"], [data-no-read], script, style').forEach((n) => n.remove());
        content = clone.innerText;
      }
      content = (content ?? '').replace(/\s+/g, ' ').trim();
      if (!content) return false;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(content.slice(0, 6000));
      u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      u.rate = 0.95;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
      return true;
    },
    [lang, supported],
  );

  const toggle = useCallback(() => (speaking ? stop() : speak()), [speaking, speak, stop]);

  useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); }, [supported]);

  return { supported, speaking, speak, stop, toggle };
}
