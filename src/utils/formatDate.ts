const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/** "3 hours ago" for recent items, otherwise "14 Oct 2026". */
export function formatDate(iso: string, lang: 'en' | 'hi' = 'en'): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const diff = Date.now() - d.getTime();
  const rtf = new Intl.RelativeTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { numeric: 'auto' });
  if (diff >= 0 && diff < HOUR) return rtf.format(-Math.max(1, Math.round(diff / MIN)), 'minute');
  if (diff >= 0 && diff < DAY) return rtf.format(-Math.round(diff / HOUR), 'hour');
  if (diff >= 0 && diff < 7 * DAY) return rtf.format(-Math.round(diff / DAY), 'day');
  return formatAbsolute(iso, lang);
}

export function formatAbsolute(iso: string, lang: 'en' | 'hi' = 'en'): string {
  return new Date(iso).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}
