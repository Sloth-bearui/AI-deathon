import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app';
import '@/i18n';
import '@/index.css';

// Apply saved theme / text size / calm mode before first paint (prevents a flash).
try {
  const prefs = JSON.parse(localStorage.getItem('rc_prefs') ?? 'null')?.state;
  const root = document.documentElement;
  const theme = prefs?.theme === 'light' ? 'light' : 'dark';
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  if (prefs?.textScale) root.style.setProperty('--text-scale', String(prefs.textScale));
  if (prefs?.calmMode) root.classList.add('calm');
} catch {
  /* corrupted prefs are ignored; defaults apply */
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
