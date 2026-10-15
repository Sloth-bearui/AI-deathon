import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app';
import '@/i18n';
import '@/index.css';

// Apply saved preferences on mount
const applyPrefs = () => {
  try {
    const raw = localStorage.getItem('rc_prefs');
    if (raw) {
      const prefs = JSON.parse(raw)?.state;
      if (prefs) {
        // Theme
        document.documentElement.classList.toggle('dark', prefs.theme === 'dark');
        document.documentElement.classList.toggle('light', prefs.theme === 'light');
        // Text scale
        if (prefs.textScale) {
          document.documentElement.style.setProperty('--text-scale', String(prefs.textScale));
        }
        // Calm mode
        if (prefs.calmMode) {
          document.documentElement.classList.add('calm');
        }
      }
    }
  } catch {
    // noop
  }
};

applyPrefs();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
