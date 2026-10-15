# Reality Check

> Futuristic, community-powered OSINT and digital literacy platform for all generations.

**Reality Check** empowers users to verify viral rumors, dissect misinformation with step-by-step simulated OSINT workflows, master digital self-defense across interactive labs, and practice high-stress scam scenarios inside a simulated smartphone environment.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle & verify typecheck
npm run build
```

---

## 🎯 Architectural Philosophy & Constraints

1. **Client-Side Prototype**: Pure React 18 + Vite + TypeScript. No external server dependencies or tracking.
2. **Deterministic State Persistence**: All user preferences, community submissions, academy completions, and simulator outcomes persist cleanly in `localStorage` under keys `rc_prefs`, `rc_community`, `rc_academy`, and `rc_simulator`.
3. **Simulated OSINT Engine**: Genuine, step-by-step open-source intelligence methodologies (domain WHOIS, image reverse lookup, TLS certificate examination, EXIF analysis) simulated with realistic timing, scan lines, and clear educational disclosures. No fake "AI percentage truth detectors" or real network scans.
4. **Fictionalized Safety Boundaries**: Brand names in scam simulations are strictly fictional ("Nova Bank", "SwiftPay", "QuickPost", "VelocePay") to prevent real-world trademark confusion.
5. **Strict Scoring Isolation**:
   - The **Relevance Point System** is strictly confined to `src/features/community/`.
   - Home, Academy, and Simulator contain **zero** scores, XP, meters, streaks, ranks, or leaderboards. Academy uses completion checkmarks only. Simulator focuses exclusively on safety outcomes and reflection.
   - Post relevance and contributor reliability are maintained in separate UI panels; contributor history never modifies a post's score.

---

## 📁 Repository Map

```
src/
├── app/
│   ├── App.tsx                     # Core application root with layout & shell
│   ├── router.tsx                  # React Router v6 tree with lazy loaded routes
│   ├── providers.tsx               # Theme, i18n, and tooltip context providers
│   └── NotFoundPage.tsx            # Accessible 404 handler with fallback actions
├── data/
│   ├── posts.json                  # Community feed claims & metadata
│   ├── contributors.json           # Contributor reliability profiles
│   ├── investigations.json         # Step-by-step OSINT investigation stages
│   ├── labs.json                   # Academy digital literacy labs
│   ├── lessons.json                # Foundational safety lessons
│   └── scenarios/                  # 6 interactive phone practice scenarios
│       ├── fake-kyc-sms.json
│       ├── upi-collect-trick.json
│       ├── parcel-link.json
│       ├── family-emergency.json
│       ├── fake-app-update.json
│       └── whatsapp-lottery.json
├── design-system/                  # Design tokens & accessible Radix primitives
│   ├── tokens.css                  # CSS custom properties (colors, typography, radii)
│   ├── Button.tsx                  # 56px touch target accessible button variants
│   ├── Card.tsx & GlassPanel.tsx   # Premium glassmorphic containers with glow borders
│   ├── Badge.tsx & Tag.tsx         # Semantic status indicators and topic pills
│   ├── Modal.tsx & Tabs.tsx        # Radix UI dialog and tab primitives
│   ├── Tooltip.tsx & Toast.tsx     # Micro-feedback and accessible tooltips
│   ├── Accordion.tsx & Stepper.tsx # Expandable evidence cards & investigation timelines
│   ├── ProgressRing.tsx            # Accessible circular progress for academy steps
│   ├── Skeleton.tsx                # Shimmer loading states
│   └── EmptyState.tsx              # Helpful zero-state illustrations & call-to-actions
├── features/
│   ├── home/                       # Landing experience (WelcomeHero, ThreeBigActions, ContinueCard)
│   ├── community/                  # Community verification & OSINT investigations
│   │   ├── pages/                  # Feed, PostDetail, ContributorProfile
│   │   ├── components/             # ClaimHeader, MediaViewer, EvidenceCard, SourceComparisonTable
│   │   └── scoring/                # Relevance calculation, formula explanation, history
│   ├── academy/                    # Digital safety & forensics learning labs
│   │   ├── pages/                  # AcademyHome, LabPage
│   │   └── components/labs/        # 6 specialized interactive verification labs
│   └── simulator/                  # Interactive smartphone scam simulator
│       ├── pages/                  # ScenarioPicker, PhoneSimulatorPage
│       ├── engine/                 # Scenario graph engine, outcome resolver, hooks
│       ├── device/                 # PhoneFrame, StatusBar, PracticeRibbon, LockScreen, NotificationShade
│       ├── device/apps/            # Messages, Browser, Bank, Settings, Phone dialer apps
│       └── components/             # GuidanceCoach (4 hint tiers), OutcomeScreen, ActionTimeline
├── i18n/                           # react-i18next English and Hindi dictionaries
├── layout/                         # TopBar, Sidebar, BottomNav, AccessibilityBar, HelpFab
├── services/                       # mockApi.ts, investigationEngine.ts
├── store/                          # Zustand stores (usePrefsStore, useCommunityStore, etc.)
├── types/                          # Comprehensive TypeScript contracts
└── utils/                          # cn, formatDate helpers
```

---

## 🎨 Design System: "Calm Clarity"

- **Theme Palette**:
  - Dark mode base: `#0B1220` with layered surface tokens (`#111C33`, `#1A2847`).
  - Light mode base: `#F7F9FC` with crisp surface borders and balanced contrast.
  - Accent: High-legibility luminous cyan `#2DD4BF` with purple/indigo contextual gradients.
- **Typography**: Space Grotesk (headings and identifiers) + Atkinson Hyperlegible (body text engineered for low-vision readers).
- **Accessibility (WCAG AA Compliance)**:
  - Minimum touch target: **56px** on mobile and primary controls.
  - Dynamic text zoom: **85% to 150%** live scaling.
  - In-app **Calm Mode**: instantly halts ambient mesh gradients and reduces motion.
  - **Read-Aloud**: Native Web Speech API integration for synthesizing claim text and explanations.
  - **Bilingual**: Instant toggle between English and Hindi (`hi`).

---

## ⚖️ The Community Relevance Point System

The Relevance Point System is mathematically grounded and strictly confined to community posts:

$$\text{Relevance Score} = 0.35 \times \text{Evidence} + 0.30 \times \text{Source} + 0.20 \times \text{Corroboration} + 0.15 \times \text{Reproducibility}$$

| Score Range | Classification Band | UI Indication |
|---|---|---|
| **80 – 100** | Well Supported | High-confidence badge, green border |
| **50 – 79** | Partly Supported | Moderate confidence, amber/cyan badge |
| **25 – 49** | Weakly Supported | Low confidence, amber badge |
| **0 – 24** | Unsupported | Red badge, warning indicator |
| **null** | Not Enough Evidence Yet | Neutral gray badge |

### Separation of Post Score & Contributor Reliability
- **Post Relevance**: Evaluates purely the verifiable facts of a submission.
- **Contributor Reliability**: Shows factual activity (`reportsReviewed`, `laterCorroborated`, and categorical descriptor `new` | `developing` | `established`).
- *A contributor's reputation never alters a post's score.*

---

## 📱 Interactive Phone Practice Simulator

Simulate high-risk social engineering scenarios inside a realistic phone interface equipped with:
- **Phone Frame**: Hardware notch, status bar (dynamic time, Wi-Fi, battery), and bottom home indicator.
- **Practice Ribbon**: Prominently displays *"Safe Practice Environment — No Real Money or Data at Risk"*.
- **Integrated Apps**:
  - `MessagesApp`: SMS threads with suspicious senders, copyable OTPs, and URL previews.
  - `BrowserApp`: Fictional payment gateways with clickable SSL lock icons revealing domain mismatches.
  - `BankApp`: Fictional Nova Bank interface for reviewing UPI collect requests and transaction alerts.
  - `SettingsApp`: Permission manager demonstrating dangerous accessibility / SMS read toggles.
  - `PhoneApp`: Inbound call UI with caller ID spoofing analysis.
- **Guidance Coach**: 4 interactive scaffolding modes for learners of any comfort level:
  1. `none`: Free-form independent decision making.
  2. `nudge`: Gentle questions highlighting irregularities.
  3. `explain`: Highlights why specific cues are dangerous before making a move.
  4. `showMe`: Visual red-flag highlights directly on suspicious links and requests.

---

## 🎬 3-Minute Demonstration Script

### Minute 1: First Impression & Accessibility Bar
1. Navigate to `/`. Observe the calm, futuristic aesthetic and the three large primary actions (*Check a Claim*, *Learn Digital Safety*, *Practice on a Safe Phone*).
2. Open the **Accessibility Bar** at the top:
   - Scale text up to **125%** and **150%**; notice the layout adjusts responsively.
   - Toggle **Calm Mode** to reduce visual movement.
   - Switch language to **हिंदी** to preview localized headings.
3. Click **"Check a Claim"** to enter the Community Feed.

### Minute 2: Community Feed, OSINT Investigation & Relevance Points
1. On `/community`, search for `"Electricity Bill"` or filter by **WhatsApp**.
2. Click on a post (e.g. *Electricity Disconnection SMS Warning*).
3. Review the **Relevance Point Badge** (e.g. `84 · Well Supported`).
4. Click **"How this score is calculated"** to expand the 4-factor formula breakdown.
5. In the timeline, click **"Run Simulated Investigation"**. Watch the scan-line animation trace domain DNS checks and reverse image search, culminating in an updated evidence log.
6. Open the **Contributor Profile** link to verify that contributor reliability stats are strictly isolated from the post's relevance points.

### Minute 3: Safe Phone Practice & Academy Lab
1. Navigate to `/practice` and select **"Fake KYC SMS & Urgent Link"**.
2. Select your Guidance level (e.g., **"Nudge"** or **"Explain"**).
3. In the simulated SMS app, tap the link to open the simulated browser.
4. Tap the browser URL bar padlock icon to inspect the domain mismatch (`nova-bank.verify-acc.xyz` vs legitimate bank).
5. Choose **"Refuse and report via official bank helpline"** to trigger the safe resolution outcome screen.
6. Switch to `/academy` and open the **Phishing Inspector** lab to practice dissecting domain structures with instant visual feedback.

---

## 📄 License
MIT License. Built for hackathon demonstration and public educational literacy.
