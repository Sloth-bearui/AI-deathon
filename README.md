# Reality Check

> Community-powered OSINT and digital literacy platform

**Reality Check** helps people verify suspicious claims, learn digital safety skills, and practice handling real-world scam scenarios — all in a safe, accessible environment.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🏗 Architecture

| Layer | Tech | Purpose |
|-------|------|---------|
| Framework | React 18 + TypeScript | Component-based UI |
| Build | Vite | Fast dev server + bundling |
| Styling | Tailwind CSS 3 + CSS variables | Design system tokens |
| State | Zustand + localStorage | Persistent client-side state |
| Routing | React Router v6 | SPA navigation |
| Animation | Framer Motion | Page transitions, micro-interactions |
| UI Primitives | Radix UI | Accessible accordion, tabs, tooltip, dialog |
| Icons | Lucide React | Consistent SVG icon library |
| i18n | react-i18next | English + Hindi translations |

### Frontend-Only Prototype

This is a **hackathon prototype** — all data is seeded from JSON files and persisted in `localStorage`. No backend, no real OSINT scans, no actual network requests.

## 📁 Project Structure

```
src/
├── app/              # App component + React Router config
├── data/             # Sample JSON data (posts, contributors, scenarios)
├── design-system/    # Reusable UI components (Button, Card, Badge, etc.)
├── features/
│   ├── home/         # Landing page with hero + action cards
│   ├── community/    # Feed, post detail, claim submission
│   ├── academy/      # Learning modules with step-by-step content
│   └── simulator/    # Interactive phone simulator for scam practice
├── i18n/             # Translation dictionaries (en, hi)
├── layout/           # AppShell, Sidebar, BottomNav, TopBar, etc.
├── store/            # Zustand stores (prefs, community, academy, simulator)
├── types/            # TypeScript interfaces
└── utils/            # Helper utilities (cn, formatDate)
```

## 🎨 Design Decisions

### Visual Direction: "Calm Clarity"

- **Dark default** (`#0B1220` base) with fully designed **light mode** (`#F7F9FC`)
- **One luminous accent**: teal-cyan `#2DD4BF`
- **Typography**: Atkinson Hyperlegible (body) + Space Grotesk (headings)
- Glassmorphism panels, subtle mesh gradients, dot pattern overlays

### Accessibility (WCAG AA Minimum)

- All interactive elements have **56px minimum touch targets**
- **Text scaling**: 85% to 150% via accessibility bar
- **Calm mode**: reduces animations and visual noise
- **Read aloud**: Web Speech API integration
- **Bilingual**: English ↔ Hindi toggle
- First-run **welcome modal** with text size picker
- Keyboard navigation throughout

### Relevance Point System

The Relevance Point System exists **only inside `src/features/community/`**. Post relevance scores and contributor reliability are two **separate systems** displayed in separate UI panels on the post detail page:

- **Post Relevance Score**: Composite of source quality, community votes, evidence depth, and recency
- **Contributor Reliability**: Displayed separately — accuracy percentage and submission count

## 🔧 Features

### Community Feed (`/community`)
- Search, filter by category, sort by newest/trending
- Status badges: Verified True, Verified False, Misleading, Under Review, Unverified
- Post detail with verdict banner, investigation stepper, evidence accordion
- Claim submission with text/URL/image upload modes

### Reality Check Academy (`/academy`)
- Six learning modules on phishing, UPI scams, deepfakes, phone security, AI literacy, common Indian scams
- Step-by-step interactive content with tips, checklists, and reflections
- Per-step completion tracking with progress rings

### Phone Practice Simulator (`/practice`)
- Node-graph-based interactive scenarios
- Realistic phone frame UI with status bar, notch, home indicator
- Choice → consequence → commentary feedback loop
- Decision recap with safe/risky scoring
- Scenarios: KYC SMS scam, UPI collect trick, plus "coming soon" placeholders

### Accessibility Bar
- Text size controls (–/+)
- Dark/light theme toggle
- Calm mode (reduced motion)
- Read aloud (Web Speech API)
- Language toggle (EN ↔ हिंदी)
- Reset to defaults

## 📝 Notes

- **No placeholders**: All content is real sample data based on actual Indian scam patterns
- **No backend dependency**: Everything runs client-side
- **localStorage persistence**: User progress, preferences, and community data survive page refreshes
- **Responsive**: Sidebar on desktop, bottom tab bar on mobile
- **Context-aware help**: Floating help button shows page-specific guidance

## License

Hackathon project — MIT License
