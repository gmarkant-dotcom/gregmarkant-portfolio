# Portfolio Site — Phase 1 Build Instructions
## Scaffold + Ticker + CSS Token Foundation

Hand these instructions to Cursor verbatim. Work through them in order.

---

## 1. Initialize the project

In your terminal (not inside Cursor's composer — do this first manually):

```bash
npm create vite@latest gregmarkant-portfolio -- --template react
cd gregmarkant-portfolio
npm install
```

> Why Vite over Next.js for this phase: no SSR needed, faster dev server, simpler config. 
> You can migrate to Next.js later if you need SSR for OG image generation.

Open the project folder in Cursor.

---

## 2. Install dependencies you'll need across all phases

```bash
npm install framer-motion
npm install howler
npm install clsx
```

- `framer-motion` — tile reorder animations (Phase 4)
- `howler` — audio playback (Phase 5)
- `clsx` — conditional classname utility (used everywhere)

---

## 3. Clean the Vite boilerplate

**Delete these files:**
```
src/assets/react.svg
public/vite.svg
src/App.css
```

**Replace `src/App.jsx` with:**
```jsx
function App() {
  return (
    <div className="site-wrapper">
      <p>scaffold ready</p>
    </div>
  )
}

export default App
```

**Replace `src/index.css` entirely** — you'll build this out in step 4.

---

## 4. Build the CSS token system in `src/index.css`

This is the most important file in Phase 1. Everything that changes per album theme
is defined here as a CSS custom property. Components never hardcode colors.

```css
/* ============================================================
   RESET
   ============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ============================================================
   THEME TOKENS — applied to :root by default (no album selected)
   The applyTheme() function in Phase 3 overwrites these on
   document.documentElement when an album is chosen.
   ============================================================ */
:root {
  /* Background layers */
  --bg-primary: #111111;
  --bg-secondary: #1a1a1a;
  --bg-tile: #222222;

  /* Text */
  --text-primary: #f0f0f0;
  --text-secondary: #888888;
  --text-accent: #ffffff;

  /* Accent / highlight */
  --accent: #ffffff;
  --accent-soft: #444444;

  /* Ticker */
  --ticker-bg: #000000;
  --ticker-text: #ffffff;

  /* Borders */
  --border-color: rgba(255, 255, 255, 0.1);

  /* Typography */
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-display: 'Inter', system-ui, sans-serif;
  --font-weight-display: 400;

  /* Transitions — all themed elements use this */
  --theme-transition: background-color 0.6s ease, color 0.6s ease, border-color 0.6s ease;

  /* Tile */
  --tile-bg: #1e1e1e;
  --tile-border: rgba(255, 255, 255, 0.08);
  --tile-hover-lift: -6px;

  /* Grain overlay opacity (toggled per theme) */
  --grain-opacity: 0;
}

/* ============================================================
   BASE
   ============================================================ */
html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-primary);
  font-weight: 400;
  line-height: 1.6;
  min-height: 100vh;
  transition: var(--theme-transition);
  /* Grain texture overlay — rendered as a pseudo-element */
  position: relative;
}

/* Grain overlay — activated via --grain-opacity token */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
  mix-blend-mode: overlay;
}

.site-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ============================================================
   TICKER
   ============================================================ */
.ticker-bar {
  width: 100%;
  background-color: var(--ticker-bg);
  color: var(--ticker-text);
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0;
  border-bottom: 0.5px solid var(--border-color);
  transition: var(--theme-transition);
  position: sticky;
  top: 0;
  z-index: 100;
}

.ticker-inner {
  display: inline-block;
  animation: ticker-scroll 60s linear infinite;
  font-size: 13px;
  letter-spacing: 0.02em;
  font-weight: 400;
}

.ticker-inner:hover {
  animation-play-state: paused;
}

/* Duplicate the text so the loop is seamless */
.ticker-inner span {
  padding-right: 80px;
}

@keyframes ticker-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ============================================================
   UTILITY
   ============================================================ */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 5. Build the Ticker component

Create `src/components/Ticker.jsx`:

```jsx
const TICKER_TEXT = "Greg Markant · World-class orchestrator · First-class human · 16 years translating C-suite ambition into programs that drive KPIs, unlock revenue, and make teams indispensable · Fortune 500 clients across tech, CPG, retail, banking, pharma, and beyond · Integrated marketing · Brand strategy · Creative production · Marketing operations · P&L ownership · Two fierce daughters · Tennis is life · Music is everything"

export default function Ticker() {
  // We duplicate the text string so the CSS animation loops seamlessly
  const repeated = `${TICKER_TEXT}     ${TICKER_TEXT}`

  return (
    <div className="ticker-bar" role="marquee" aria-label="Greg Markant executive summary">
      <div className="ticker-inner">
        <span>{repeated}</span>
      </div>
    </div>
  )
}
```

---

## 6. Wire everything into `src/App.jsx`

```jsx
import Ticker from './components/Ticker'

function App() {
  return (
    <>
      <Ticker />
      <div className="site-wrapper">
        {/* Phase 3: VinylSelector goes here */}
        {/* Phase 4: WorkGrid goes here */}
      </div>
    </>
  )
}

export default App
```

---

## 7. Create the folder structure for all future phases

Run this in your terminal from the project root:

```bash
mkdir -p src/components
mkdir -p src/data
mkdir -p src/hooks
mkdir -p public/albums
mkdir -p public/audio
mkdir -p public/projects
```

**What each folder is for:**

| Folder | Purpose |
|---|---|
| `src/components` | All React components (Ticker, VinylSelector, WorkGrid, WorkTile) |
| `src/data` | `themes.config.js` and `projects.data.js` — the two data files that drive the whole site |
| `src/hooks` | `useTheme.js` custom hook (Phase 3) |
| `public/albums` | Album cover images (add your three covers here as `purple-rain.jpg`, `joshua-tree.jpg`, `body-talk.jpg`) |
| `public/audio` | 30-second audio clips (add as `purple-rain-clip.mp3`, etc.) |
| `public/projects` | Hero images for each work tile |

---

## 8. Create the theme config stub — `src/data/themes.config.js`

This file is the architectural foundation from Phase 2. Create it now as a stub 
so every future component can import from it immediately. You'll fill in the real 
values during Phase 3.

```js
export const themes = {
  purple_rain: {
    id: 'purple_rain',
    label: 'Purple Rain',
    artist: 'Prince',
    year: 1984,
    coverImage: '/albums/purple-rain.jpg',
    audioClip: '/audio/purple-rain-clip.mp3',
    tokens: {
      '--bg-primary': '#0d0010',
      '--bg-secondary': '#1a0020',
      '--bg-tile': '#1e0028',
      '--text-primary': '#f5e6ff',
      '--text-secondary': '#c9a8e0',
      '--text-accent': '#ffffff',
      '--accent': '#c724b1',
      '--accent-soft': '#7b2d8b',
      '--ticker-bg': '#0d0010',
      '--ticker-text': '#e066d4',
      '--border-color': 'rgba(199, 36, 177, 0.2)',
      '--font-primary': 'Georgia, serif',
      '--font-display': 'Georgia, serif',
      '--font-weight-display': '700',
      '--tile-bg': '#1e0028',
      '--tile-border': 'rgba(199, 36, 177, 0.15)',
      '--grain-opacity': '0.04',
    },
    layoutVariant: 'dark',
    tileStyle: 'dark-sleeve',
  },

  joshua_tree: {
    id: 'joshua_tree',
    label: 'The Joshua Tree',
    artist: 'U2',
    year: 1987,
    coverImage: '/albums/joshua-tree.jpg',
    audioClip: '/audio/joshua-tree-clip.mp3',
    tokens: {
      '--bg-primary': '#0a0a0a',
      '--bg-secondary': '#141414',
      '--bg-tile': '#1a1a1a',
      '--text-primary': '#e8e0d0',
      '--text-secondary': '#8a7f6e',
      '--text-accent': '#ffffff',
      '--accent': '#c4a45a',
      '--accent-soft': '#5a4a2a',
      '--ticker-bg': '#0a0a0a',
      '--ticker-text': '#c4a45a',
      '--border-color': 'rgba(196, 164, 90, 0.15)',
      '--font-primary': '"Georgia", serif',
      '--font-display': '"Georgia", serif',
      '--font-weight-display': '400',
      '--tile-bg': '#161410',
      '--tile-border': 'rgba(196, 164, 90, 0.12)',
      '--grain-opacity': '0.03',
    },
    layoutVariant: 'wide',
    tileStyle: 'desert-sleeve',
  },

  body_talk: {
    id: 'body_talk',
    label: 'Body Talk',
    artist: 'Robyn',
    year: 2010,
    coverImage: '/albums/body-talk.jpg',
    audioClip: '/audio/body-talk-clip.mp3',
    tokens: {
      '--bg-primary': '#f5f5f5',
      '--bg-secondary': '#ebebeb',
      '--bg-tile': '#ffffff',
      '--text-primary': '#111111',
      '--text-secondary': '#555555',
      '--text-accent': '#000000',
      '--accent': '#e31e24',
      '--accent-soft': '#f5c0c2',
      '--ticker-bg': '#111111',
      '--ticker-text': '#f5f5f5',
      '--border-color': 'rgba(0, 0, 0, 0.1)',
      '--font-primary': '"Inter", system-ui, sans-serif',
      '--font-display': '"Inter", system-ui, sans-serif',
      '--font-weight-display': '500',
      '--tile-bg': '#ffffff',
      '--tile-border': 'rgba(0, 0, 0, 0.08)',
      '--grain-opacity': '0',
    },
    layoutVariant: 'light',
    tileStyle: 'clean-sleeve',
  },
}

// Helper: get theme by id, fallback to first theme
export function getTheme(id) {
  return themes[id] ?? Object.values(themes)[0]
}

// Helper: get all themes as an array (for rendering the vinyl selector)
export function getAllThemes() {
  return Object.values(themes)
}
```

---

## 9. Create the project data stub — `src/data/projects.data.js`

Create this now as an empty array with one example entry. 
You'll populate it fully in Phase 4.

```js
export const projects = [
  {
    id: 'jpmc-vip-001',
    client: 'JPMorgan Chase',
    projectName: 'Chairman's Circle VIP Program',
    year: 2019,
    endYear: 2022,
    heroImage: '/projects/jpmc-vip.jpg',
    caption: 'Led end-to-end strategy and production for JPMC\'s premier VIP client hospitality program across US Open, Kentucky Derby, and Wimbledon. Managed $4M+ annual portfolio, 14-vendor ecosystem, and C-suite stakeholder relationships.',
    industry: 'banking',
    skills: ['experiential', 'partnerships', 'operations', 'strategy'],
    featured: true,
  },
  // Add more entries here in Phase 4
]

// All unique industries across projects — used to build filter pills
export function getIndustries() {
  return [...new Set(projects.map(p => p.industry))].sort()
}

// All unique skills across projects — used to build filter pills  
export function getSkills() {
  return [...new Set(projects.flatMap(p => p.skills))].sort()
}
```

---

## 10. Verify the dev server runs clean

```bash
npm run dev
```

You should see:
- A black page with the sticky ticker scrolling across the top
- No console errors
- The ticker pauses on hover

If the ticker animation feels too fast or slow, adjust the `60s` value in 
`@keyframes ticker-scroll` in `index.css`. 60s is a good starting point for 
this length of text.

---

## Phase 1 complete checklist

- [ ] Vite/React project initialized
- [ ] All three npm packages installed (framer-motion, howler, clsx)
- [ ] Boilerplate cleaned
- [ ] `index.css` built with full CSS token system
- [ ] `Ticker.jsx` component built and wired into `App.jsx`
- [ ] Folder structure created (`components`, `data`, `hooks`, `public/albums`, etc.)
- [ ] `themes.config.js` created with all three album objects and helper functions
- [ ] `projects.data.js` created with stub entry
- [ ] Dev server runs with no errors
- [ ] Deployed to Vercel (run `vercel` in terminal, follow prompts)

---

## Notes for Phase 2 (what comes next)

When you open Phase 2 instructions, the first thing Cursor will do is create 
`src/hooks/useTheme.js` — a custom React hook that wraps the `applyTheme()` logic 
and holds the currently active theme in state. That hook + the config file you just 
built is the entire theme engine. Nothing else is needed.

**Before Phase 2, do this manually:**
- Source your three album cover images (high-res JPG, square crop, min 800x800px)
- Source your three audio clips (30s MP3, ideally the most recognizable 30s of each track)
- Drop them into `public/albums/` and `public/audio/` with the exact filenames defined in `themes.config.js`
