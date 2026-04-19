# hello-doordash Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single-page, vanilla HTML/CSS/JS landing page at `github.com/Prajje/hello-doordash` and `prajje.github.io/hello-doordash` that positions Prajwal Prakash for DoorDash's Senior MLE — Computer Vision role on New Verticals, in the visual language of the "Delivery at DoorDash" engineering blog.

**Architecture:** Static site, no build tooling. Single `index.html`, single `css/styles.css`, single `js/main.js`, assets in `assets/`. Structure mirrors [hello-adobe](https://github.com/Prajje/hello-adobe): hero → metric band → timeline → signature work → Why DoorDash → footer. The only new interaction is a `route-map` canvas in the hero (replaces particles). All motion-bearing interactions check `prefers-reduced-motion`.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (no framework). Google Fonts (Inter, Fraunces, Source Code Pro). GSAP + ScrollTrigger + VanillaTilt via CDN (same as hello-adobe). GitHub Pages for deploy.

**Testing note:** Static site — "tests" are manual verifications against a locally-served page. Each task ends with a concrete visual/behavioral check at `http://localhost:8000`. Run `python3 -m http.server 8000` from the repo root once and leave it running across tasks.

**Working directory for all tasks:** `/Users/prajwal/hello-doordash`

**Reference source (copy patterns, do not blindly copy):** `https://github.com/Prajje/hello-adobe` — you can fetch its files with `curl -sL https://raw.githubusercontent.com/Prajje/hello-adobe/main/<path>`.

---

## File layout (end state)

```
hello-doordash/
├── README.md
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   └── Prajwal_Prakash_Resume.pdf
└── docs/superpowers/
    ├── specs/2026-04-19-hello-doordash-design.md  (already present)
    └── plans/2026-04-19-hello-doordash.md         (this file)
```

---

### Task 1: Repo scaffold and README

**Files:**
- Create: `README.md`
- Create: `index.html` (empty shell)
- Create: `css/styles.css` (empty)
- Create: `js/main.js` (empty)
- Create: `assets/.gitkeep`

- [ ] **Step 1: Create README.md**

```markdown
# hello-doordash

DoorDash-styled interactive landing page for Prajwal Prakash — targeting the Senior MLE, Computer Vision role on New Verticals (grocery & retail). Single-file-per-concern, vanilla HTML/CSS/JS, deployed via GitHub Pages.

**Live:** https://prajje.github.io/hello-doordash/

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
```

- [ ] **Step 2: Create the minimal index.html shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Prajwal Prakash — Computer Vision Engineer. Built for DoorDash." />
  <title>Prajwal Prakash — Built for DoorDash</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=Inter:wght@300;400;500;600;700&family=Source+Code+Pro:wght@500&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="css/styles.css" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23EB1700'/%3E%3Ctext x='50' y='70' font-family='Georgia,serif' font-size='62' font-weight='900' text-anchor='middle' fill='white'%3EP%3C/text%3E%3C/svg%3E" />
</head>
<body>
  <main><!-- sections added in later tasks --></main>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js"></script>
  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Create empty css/styles.css and js/main.js placeholders**

`css/styles.css`:
```css
/* hello-doordash — styles (tokens added in Task 2) */
```

`js/main.js`:
```js
/* hello-doordash — interactions */
(() => {
  // populated in later tasks
})();
```

- [ ] **Step 4: Touch assets/.gitkeep so the directory is tracked**

Run: `touch assets/.gitkeep`

- [ ] **Step 5: Verify**

Run: `python3 -m http.server 8000` (leave running) and open `http://localhost:8000`.
Expected: blank white page, no console errors, favicon is a red square with white "P".

- [ ] **Step 6: Commit**

```bash
git add README.md index.html css/styles.css js/main.js assets/.gitkeep
git commit -m "scaffold: repo skeleton, empty index, fonts wired"
```

---

### Task 2: CSS tokens, reset, typography base

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Write the token + reset + base block**

Replace the contents of `css/styles.css` with:

```css
/* =========================================================
   hello-doordash — Tokens, Reset, Typography
   ========================================================= */

:root {
  --dd-red:        #EB1700;
  --dd-red-bright: #FF3008;
  --dd-red-deep:   #B01000;
  --ink:           #111111;
  --ink-soft:      #4A4A4A;
  --ink-faint:     #8A8A8A;
  --cream:         #F7F2EE;
  --white:         #FFFFFF;
  --rule:          #E8E2DC;

  --font-sans:   'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-serif:  'Fraunces', Georgia, 'Times New Roman', serif;
  --font-mono:   'Source Code Pro', ui-monospace, Menlo, monospace;

  --max-w: 1180px;
  --pad-x: clamp(20px, 4vw, 56px);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

body {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

img, svg, canvas { display: block; max-width: 100%; }

a { color: inherit; text-decoration: none; }
a:hover { color: var(--dd-red); }

button { font: inherit; cursor: pointer; }

h1, h2, h3, h4 { font-family: var(--font-serif); font-weight: 700; line-height: 1.1; letter-spacing: -0.015em; }

section { padding-block: clamp(72px, 10vw, 140px); padding-inline: var(--pad-x); }

.section-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--dd-red);
  margin-bottom: 14px;
}

.section-title { font-size: clamp(32px, 5vw, 56px); max-width: 14ch; margin-bottom: 48px; }
.section-title .accent { color: var(--dd-red); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 2: Verify**

Reload `http://localhost:8000`. Expected: page still blank, but inspecting body in devtools shows `font-family: "Inter", ...` and the CSS custom properties are present on `:root`.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "css: add tokens, reset, and typography base"
```

---

### Task 3: Hero — HTML + CSS (static)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Add hero markup inside `<main>` in index.html**

Place this as the first child of `<main>`:

```html
<!-- Scroll progress ink trail -->
<div class="ink-trail" aria-hidden="true"><span class="ink-fill"></span></div>

<!-- ================= HERO ================= -->
<section class="hero" id="hero">
  <div class="hero-bg" aria-hidden="true">
    <canvas id="route-map"></canvas>
  </div>
  <div class="hero-inner">
    <div class="eyebrow-row">
      <p class="eyebrow">
        <span class="eyebrow-dot"></span>
        Built for <span class="dd-word">DoorDash</span>
      </p>
      <span class="dashpass-chip">
        <span class="dashpass-mark">DP</span>
        DashPass member since 2022
      </span>
    </div>

    <h1 class="hero-name" aria-label="Prajwal Prakash">
      <span class="typed" data-text="Prajwal Prakash"></span>
      <span class="caret" aria-hidden="true"></span>
    </h1>
    <div class="red-bar" aria-hidden="true"></div>
    <div class="rotating-tagline" aria-label="Role">
      <div class="rotator">
        <span>Computer Vision Engineer</span>
        <span>Applied ML for Logistics</span>
        <span>Production ML for Retail &amp; Grocery</span>
        <span>Computer Vision Engineer</span>
      </div>
    </div>

    <p class="hero-sub">
      Senior MLE at Cogniac. Columbia MS. Four years shipping production computer-vision to the edge and the cloud — now aiming at DoorDash New Verticals.
    </p>

    <div class="cta-row">
      <a href="#experience" class="btn btn-primary">View Resume</a>
      <a href="assets/Prajwal_Prakash_Resume.pdf" download class="btn btn-ghost">
        <span>Download</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="hero-scroll-hint" aria-hidden="true">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>
```

- [ ] **Step 2: Append hero styles to css/styles.css**

```css
/* =========================================================
   HERO
   ========================================================= */

.ink-trail {
  position: fixed; top: 0; left: 0;
  width: 3px; height: 100vh;
  background: var(--rule);
  z-index: 100;
}
.ink-fill {
  display: block; width: 100%; height: 0;
  background: var(--dd-red);
  transition: height 0.08s linear;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex; align-items: center;
  overflow: hidden;
  padding-block: clamp(100px, 14vh, 180px) clamp(60px, 10vh, 120px);
  background: var(--white);
}
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-bg canvas { width: 100%; height: 100%; }
.hero-inner { position: relative; z-index: 1; max-width: var(--max-w); margin-inline: auto; width: 100%; }

.eyebrow-row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin-bottom: 36px; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-mono); font-size: 12px; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink-soft);
  padding: 8px 16px; border: 1px solid var(--rule); border-radius: 999px;
  background: var(--white);
}
.eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--dd-red); }
.dd-word { color: var(--dd-red); font-weight: 700; letter-spacing: 0.14em; }

.dashpass-chip {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-sans); font-size: 12px; font-weight: 500;
  color: var(--ink-faint);
  padding: 6px 12px; border: 1px dashed var(--rule); border-radius: 999px;
}
.dashpass-mark {
  display: inline-block; padding: 2px 6px; border-radius: 4px;
  background: var(--dd-red); color: var(--white);
  font-family: var(--font-mono); font-size: 10px; font-weight: 500; letter-spacing: 0.08em;
}

.hero-name {
  font-family: var(--font-serif); font-weight: 900;
  font-size: clamp(54px, 10vw, 128px);
  line-height: 0.98; letter-spacing: -0.03em;
  color: var(--ink);
}
.typed { display: inline; }
.caret {
  display: inline-block; width: 4px; height: 0.9em;
  background: var(--dd-red); margin-left: 6px; vertical-align: -0.08em;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }

.red-bar { width: 96px; height: 6px; background: var(--dd-red); margin: 24px 0 24px; }

.rotating-tagline { height: 1.5em; overflow: hidden; font-size: clamp(18px, 2.2vw, 24px); font-weight: 500; color: var(--ink); }
.rotator { display: flex; flex-direction: column; animation: rotate-tagline 10s infinite; }
.rotator span { height: 1.5em; line-height: 1.5em; }
@keyframes rotate-tagline {
  0%, 22%  { transform: translateY(0); }
  25%, 47% { transform: translateY(-1.5em); }
  50%, 72% { transform: translateY(-3em); }
  75%, 97% { transform: translateY(-4.5em); }
  100%     { transform: translateY(-4.5em); }
}

.hero-sub {
  max-width: 62ch; margin-top: 28px;
  font-size: clamp(16px, 1.4vw, 19px);
  line-height: 1.55; color: var(--ink-soft);
}

.cta-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 40px; }
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 26px; border-radius: 999px;
  font-weight: 600; font-size: 15px; letter-spacing: 0.01em;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn-primary { background: var(--dd-red); color: var(--white); }
.btn-primary:hover { background: var(--dd-red-bright); color: var(--white); transform: translateY(-2px); }
.btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
.btn-ghost:hover { background: var(--ink); color: var(--white); transform: translateY(-2px); }

.hero-scroll-hint {
  position: absolute; left: var(--pad-x); bottom: 28px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--ink-faint);
}
.scroll-line {
  width: 1px; height: 44px; background: var(--ink-faint);
  animation: scroll-pulse 2.2s infinite ease-in-out;
  transform-origin: top;
}
@keyframes scroll-pulse {
  0%, 100% { transform: scaleY(0.2); opacity: 0.3; }
  50%      { transform: scaleY(1);   opacity: 1; }
}

@media (max-width: 600px) {
  .hero-name { font-size: clamp(44px, 13vw, 80px); }
  .eyebrow-row { gap: 10px; }
  .dashpass-chip { font-size: 11px; }
}
```

- [ ] **Step 3: Verify**

Reload `http://localhost:8000`. Expected:
- Eyebrow row shows `● Built for DoorDash` pill on the left, `DashPass member since 2022` chip next to it.
- Large serif name "Prajwal Prakash" with a blinking red caret (not yet typed — that's Task 4; it should appear static for now because `.typed` has `data-text` but no JS yet).
- Short red bar under the name.
- Rotating tagline area is visible (CSS animation running — cycles through 3 taglines).
- Sub-copy and two CTA buttons are visible.
- "Scroll" hint at bottom-left.
- No console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "hero: static markup and styling (no JS yet)"
```

---

### Task 4: Hero JS — typed name + scroll ink trail

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Populate main.js with the prefersReduced check, ink trail, and typed name**

Replace contents of `js/main.js` with:

```js
/* =========================================================
   hello-doordash — Interactions
   ========================================================= */

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Scroll progress ink trail ----------
  const inkFill = document.querySelector('.ink-fill');
  if (inkFill) {
    const updateInk = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      inkFill.style.height = `${Math.min(100, Math.max(0, pct))}%`;
    };
    window.addEventListener('scroll', updateInk, { passive: true });
    updateInk();
  }

  // ---------- Typewriter on hero name ----------
  const typed = document.querySelector('.typed');
  if (typed && !prefersReduced) {
    const text = typed.dataset.text || '';
    typed.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        typed.textContent += text.charAt(i);
        i++;
        setTimeout(tick, 80);
      } else {
        const caret = document.querySelector('.caret');
        if (caret) setTimeout(() => caret.remove(), 2000);
      }
    };
    setTimeout(tick, 400);
  } else if (typed) {
    typed.textContent = typed.dataset.text || '';
    const caret = document.querySelector('.caret');
    if (caret) caret.remove();
  }
})();
```

- [ ] **Step 2: Verify**

Hard-reload `http://localhost:8000` (Cmd-Shift-R). Expected:
- On load, the name is empty, then types out "Prajwal Prakash" character-by-character over ~1.5s.
- Caret disappears ~2s after typing completes.
- Scrolling fills the left-edge ink trail in red.
- Enable `Emulate prefers-reduced-motion` in devtools → Rendering → reload. Name should appear instantly, caret gone.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "hero: typed name and scroll ink trail"
```

---

### Task 5: Hero route-map canvas

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Append route-map animation to js/main.js inside the IIFE, after the typed-name block**

```js
  // ---------- Route-map canvas in hero ----------
  const canvas = document.getElementById('route-map');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, routes, dots, gridStep;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridStep = Math.max(60, Math.min(w, h) / 10);
    };

    // Quadratic bezier helper
    const bezier = (t, p0, p1, p2) => {
      const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
      const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
      return { x, y };
    };

    const seedRoutes = () => {
      routes = [];
      const count = 4;
      for (let i = 0; i < count; i++) {
        const p0 = { x: Math.random() * w * 0.3, y: Math.random() * h };
        const p2 = { x: w * 0.7 + Math.random() * w * 0.3, y: Math.random() * h };
        const p1 = { x: (p0.x + p2.x) / 2 + (Math.random() - 0.5) * w * 0.4,
                     y: (p0.y + p2.y) / 2 + (Math.random() - 0.5) * h * 0.5 };
        routes.push({ p0, p1, p2 });
      }
      dots = routes.map((_, i) => ({
        route: i,
        t: Math.random(),
        speed: 0.0012 + Math.random() * 0.0018,
        pulse: 0
      }));
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(17,17,17,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    };

    const drawRoutes = () => {
      ctx.strokeStyle = 'rgba(235,23,0,0.22)';
      ctx.lineWidth = 1.4;
      routes.forEach(r => {
        ctx.beginPath();
        ctx.moveTo(r.p0.x, r.p0.y);
        ctx.quadraticCurveTo(r.p1.x, r.p1.y, r.p2.x, r.p2.y);
        ctx.stroke();
      });
    };

    const drawDots = () => {
      dots.forEach(d => {
        const r = routes[d.route];
        const pos = bezier(d.t, r.p0, r.p1, r.p2);
        const baseR = 4;
        const pulseR = baseR + d.pulse * 8;
        if (d.pulse > 0) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,48,8,${0.2 * (1 - d.pulse)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, baseR, 0, Math.PI * 2);
        ctx.fillStyle = '#EB1700';
        ctx.fill();
      });
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      drawRoutes();
      if (!prefersReduced) {
        dots.forEach(d => {
          const prevT = d.t;
          d.t += d.speed;
          if (d.t >= 1) d.t = 0;
          // Trigger a pulse when crossing a grid-proportional midpoint (0.5)
          if (prevT < 0.5 && d.t >= 0.5) d.pulse = 1;
          if (d.pulse > 0) d.pulse = Math.max(0, d.pulse - 0.015);
        });
      }
      drawDots();
      if (!prefersReduced) requestAnimationFrame(step);
    };

    const init = () => { resize(); seedRoutes(); step(); };
    init();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); seedRoutes(); if (prefersReduced) step(); }, 120);
    });
  }
```

- [ ] **Step 2: Verify**

Reload `http://localhost:8000`. Expected:
- Behind the hero text you see a faint grid and 4 red curved routes.
- 4 red dots travel along the curves, looping, with a soft bright pulse at the halfway point of each pass.
- Resize the window — grid and routes re-seed, no stretching artifacts.
- Enable `prefers-reduced-motion` → dots freeze in place, no animation loop. No console errors.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "hero: route-map canvas with animated delivery dots"
```

---

### Task 6: Metric band + animated counters

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] **Step 1: Append metric band markup to `<main>` in index.html, after `</section>` of hero**

```html
<!-- ================= METRIC BAND ================= -->
<section class="metric-band">
  <div class="metric">
    <span class="metric-value" data-count="100" data-suffix="+">0</span>
    <span class="metric-label">Live Baccarat tables</span>
  </div>
  <div class="metric">
    <span class="metric-value" data-count="3" data-suffix="">0</span>
    <span class="metric-label">Provisional patents</span>
  </div>
  <div class="metric">
    <span class="metric-value" data-count="70" data-suffix="%+">0</span>
    <span class="metric-label">Defect detection lift</span>
  </div>
  <div class="metric">
    <span class="metric-value" data-count="80" data-suffix="%">0</span>
    <span class="metric-label">Annotation time cut</span>
  </div>
  <div class="metric">
    <span class="metric-value" data-count="2" data-suffix="×">0</span>
    <span class="metric-label">Inference speedup (INT8)</span>
  </div>
</section>
```

- [ ] **Step 2: Append metric styles to css/styles.css**

```css
/* =========================================================
   METRIC BAND
   ========================================================= */

.metric-band {
  background: var(--ink);
  color: var(--white);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  padding-block: clamp(48px, 6vw, 72px);
}
.metric { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
.metric-value {
  font-family: var(--font-serif); font-weight: 900;
  font-size: clamp(36px, 4vw, 56px); line-height: 1;
  color: var(--dd-red-bright);
  letter-spacing: -0.02em;
}
.metric-label {
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(255,255,255,0.7);
}

@media (max-width: 900px) {
  .metric-band { grid-template-columns: repeat(2, 1fr); gap: 28px; }
}
@media (max-width: 480px) {
  .metric-band { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Append counter animation to js/main.js inside the IIFE (after the route-map block)**

```js
  // ---------- Metric count-up ----------
  const metricEls = document.querySelectorAll('.metric-value');
  if (metricEls.length && 'IntersectionObserver' in window) {
    const countUp = el => {
      const target = parseFloat(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      if (prefersReduced) { el.textContent = target + suffix; return; }
      const duration = 1400;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const display = Math.round(target * eased);
        el.textContent = display + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
    };
    const mio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { countUp(e.target); mio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    metricEls.forEach(el => mio.observe(el));
  }
```

- [ ] **Step 4: Verify**

Reload and scroll the page. Expected: the metric band shows five counters. On first entering the viewport each counter counts up from 0 to its target (100+, 3, 70%+, 80%, 2×) over ~1.4s. With reduced motion, they appear instantly at their final values. Layout is 5-up on desktop, 2-up on tablet, 1-up on small mobile.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "metrics: animated 5-counter band on black"
```

---

### Task 7: Timeline — Experience

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] **Step 1: Append timeline markup to `<main>` after the metric band**

```html
<!-- ================= TIMELINE ================= -->
<section class="timeline-section" id="experience">
  <p class="section-label">Experience</p>
  <h2 class="section-title">Four years of <span class="accent">production ML.</span></h2>

  <ol class="timeline">
    <li class="node">
      <div class="node-dot" aria-hidden="true"></div>
      <div class="node-meta">
        <span class="node-date">Feb 2022 — Present</span>
        <span class="node-place">San Jose, CA</span>
      </div>
      <div class="node-body">
        <h3>Senior Machine Learning Engineer</h3>
        <p class="node-org">Cogniac Corporation</p>
        <p class="node-vertical">Casino Gaming</p>
        <ul>
          <li>Shipped a vision-powered, <strong>AI-automated player rating system at the edge</strong> across 100+ live Baccarat tables in Asia.</li>
          <li>Engineered an end-to-end <strong>smart blackjack table</strong>: segmentation card detection, <strong>ViT</strong> suit/rank classification, <strong>YOLO</strong> point-count chip detection, K-Means player–card association, customizable game-state logic, dynamic side bets, calibration workflows. Contributed to <strong>3 provisional patents.</strong></li>
          <li>Optimized inference to run <strong>3+ tables per Cogniac Edgeflow device</strong> — doubling revenue from this client.</li>
          <li>Built an <strong>LLM-powered post-game analytics dashboard</strong> — enabling pit bosses to place top-performing dealers on high-stakes tables, cutting fraud-related losses.</li>
        </ul>
        <p class="node-vertical">Manufacturing &amp; Railway</p>
        <ul>
          <li>Architected a new segmentation pipeline into the Cogniac platform and fine-tuned <strong>RF-DETR-Seg, SegFormer, ViT, SAM, DINO</strong> on manufacturing inspection workflows — <strong>70%+ defect-detection lift</strong> on targeted use cases.</li>
          <li>Fine-tuned <strong>YOLACT</strong> for real-time crack detection on railways — helping a client achieve their best safety record in 2023.</li>
          <li>Built a <strong>multi-agent, human-in-the-loop annotation</strong> pipeline — <strong>80% reduction in annotation time</strong> and <strong>30% label-quality improvement</strong> on two tested workflows.</li>
          <li>Architected platform-wide <strong>post-training quantization</strong> (FP32 / FP16 → INT8) — <strong>2× lower inference latency</strong> with no meaningful accuracy loss.</li>
        </ul>
      </div>
    </li>

    <li class="node">
      <div class="node-dot" aria-hidden="true"></div>
      <div class="node-meta">
        <span class="node-date">2021</span>
        <span class="node-place">San Francisco, CA</span>
      </div>
      <div class="node-body">
        <h3>Data Scientist</h3>
        <p class="node-org">UCSF — Dr. Ed Amorim Laboratory</p>
        <ul>
          <li>Built a <strong>U-Net</strong> with a MobileNet encoder measuring iris and pupil diameter as quantitative biomarkers for dementia staging.</li>
          <li>Applied <strong>PSPNet</strong> for multi-resolution feature extraction; developed multi-task models detecting multiple clinical biomarkers simultaneously.</li>
        </ul>
      </div>
    </li>

    <li class="node">
      <div class="node-dot" aria-hidden="true"></div>
      <div class="node-meta">
        <span class="node-date">2019 — 2020</span>
        <span class="node-place">New York, NY</span>
      </div>
      <div class="node-body">
        <h3>Computer Vision Intern</h3>
        <p class="node-org">IntelinAir</p>
        <ul>
          <li>Built <strong>large-scale pineapple flower counting</strong> from aerial imagery via deep density estimation on a U-Net backbone — deployed on <strong>AWS.</strong> Published in Frontiers in Plant Science.</li>
          <li>Applied <strong>weakly supervised learning</strong> via relative ranking of density maps to leverage unlabeled data.</li>
          <li>Detected cancerous cells in <strong>gigapixel pathology images</strong> — preprocessed at two zoom levels, encoded via Inception V3, decoded via Conv2D-Transpose. <strong>94.71% accuracy.</strong></li>
        </ul>
      </div>
    </li>

    <li class="node">
      <div class="node-dot" aria-hidden="true"></div>
      <div class="node-meta">
        <span class="node-date">Dec 2020</span>
        <span class="node-place">New York, NY</span>
      </div>
      <div class="node-body">
        <h3>MS Electrical Engineering</h3>
        <p class="node-org">Columbia University</p>
        <ul>
          <li>Concentration: Data-Driven Analysis and Computation.</li>
          <li>Leadership Fellowship · Teaching Assistant · Research Assistant — Applied Deep Learning.</li>
        </ul>
      </div>
    </li>
  </ol>
</section>
```

- [ ] **Step 2: Append timeline styles to css/styles.css**

```css
/* =========================================================
   TIMELINE
   ========================================================= */

.timeline-section { max-width: var(--max-w); margin-inline: auto; }

.timeline { list-style: none; position: relative; padding-left: 36px; }
.timeline::before {
  content: ''; position: absolute; left: 9px; top: 8px; bottom: 8px;
  width: 2px; background: var(--rule);
}
.node {
  position: relative;
  padding-bottom: 56px;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.node.in-view { opacity: 1; transform: none; }
.node-dot {
  position: absolute; left: -32px; top: 4px;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--white); border: 4px solid var(--dd-red);
  box-shadow: 0 0 0 4px var(--white);
}
.node-meta {
  display: flex; gap: 14px; flex-wrap: wrap;
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink-faint); margin-bottom: 6px;
}
.node-body h3 { font-size: clamp(20px, 2vw, 26px); margin-bottom: 2px; }
.node-org { color: var(--dd-red); font-weight: 600; margin-bottom: 14px; }
.node-vertical {
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--ink-soft); margin-top: 16px; margin-bottom: 6px;
}
.node-body ul { padding-left: 20px; color: var(--ink-soft); }
.node-body li { margin-bottom: 8px; line-height: 1.55; }
.node-body strong { color: var(--ink); font-weight: 600; }
```

- [ ] **Step 3: Append reveal observer to js/main.js inside the IIFE**

```js
  // ---------- In-view reveal for timeline nodes ----------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.node').forEach(n => io.observe(n));
  } else {
    document.querySelectorAll('.node').forEach(n => n.classList.add('in-view'));
  }
```

- [ ] **Step 4: Verify**

Reload and scroll. Expected: timeline renders with a vertical red-dot rail, four entries in order (Cogniac → UCSF → IntelinAir → Columbia). Each node fades and rises in as it scrolls into view. With reduced motion, they appear instantly.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "timeline: experience nodes with in-view reveal"
```

---

### Task 8: Signature Work — 6 cards with NV-mapping footers

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] **Step 1: Append signature-work markup after the timeline in index.html**

```html
<!-- ================= SIGNATURE WORK ================= -->
<section class="signature-work" id="work">
  <p class="section-label">Signature Work</p>
  <h2 class="section-title">A few things I've <span class="accent">built &amp; shipped.</span></h2>

  <div class="card-grid">
    <article class="cc-card" data-tilt style="--card-grad-a:#EB1700;--card-grad-b:#7A0800;">
      <div class="card-badge">Sb</div>
      <div class="card-body">
        <h3>Smart Blackjack Table</h3>
        <p class="card-sub">End-to-end vision system · 3 provisional patents</p>
        <p>Segmentation-based card detection, ViT suit/rank classification, YOLO point-count chip detection, K-Means player–card association. Game-state logic, dynamic side bets, and calibration workflows on the Cogniac Edgeflow.</p>
        <div class="chips"><span>Segmentation</span><span>ViT</span><span>YOLO</span><span>K-Means</span><span>Edge</span></div>
        <p class="nv-map"><span class="nv-arrow">NV →</span> multi-object recognition &amp; entity association on cluttered shelves.</p>
      </div>
    </article>

    <article class="cc-card" data-tilt style="--card-grad-a:#FF9A00;--card-grad-b:#CC3300;">
      <div class="card-badge">Bc</div>
      <div class="card-body">
        <h3>AI-Automated Player Rating</h3>
        <p class="card-sub">100+ live Baccarat tables · Asia</p>
        <p>Vision-powered player rating at the edge. Optimized to run 3+ tables per Edgeflow device — <strong>doubling revenue</strong> from the client. LLM-powered post-game analytics dashboard cut fraud-related losses.</p>
        <div class="chips"><span>Real-time CV</span><span>Edge</span><span>LLM Agents</span><span>Production</span></div>
        <p class="nv-map"><span class="nv-arrow">NV →</span> real-time inventory vision on in-store Dasher devices.</p>
      </div>
    </article>

    <article class="cc-card" data-tilt style="--card-grad-a:#FF3008;--card-grad-b:#B01000;">
      <div class="card-badge">Mf</div>
      <div class="card-body">
        <h3>Manufacturing &amp; Railway Segmentation</h3>
        <p class="card-sub">Platform pipeline · 70%+ defect detection</p>
        <p>Architected a new segmentation pipeline into the Cogniac platform — fine-tuned RF-DETR-Seg, SegFormer, ViT, SAM, DINO. YOLACT for real-time rail crack detection — <strong>best safety record, 2023.</strong></p>
        <div class="chips"><span>RF-DETR-Seg</span><span>SegFormer</span><span>SAM</span><span>DINO</span><span>YOLACT</span></div>
        <p class="nv-map"><span class="nv-arrow">NV →</span> shelf / product / packaging segmentation at platform scale.</p>
      </div>
    </article>

    <article class="cc-card" data-tilt style="--card-grad-a:#A4539E;--card-grad-b:#5B2A7B;">
      <div class="card-badge">Hl</div>
      <div class="card-body">
        <h3>Multi-Agent HITL Annotation</h3>
        <p class="card-sub">Proof-of-concept · 2 tested workflows</p>
        <p>Multi-agent, human-in-the-loop annotation pipeline that offloads routine labeling. <strong>80% reduction</strong> in annotation time and <strong>30% label-quality improvement.</strong></p>
        <div class="chips"><span>LLM Agents</span><span>HITL</span><span>Annotation</span></div>
        <p class="nv-map"><span class="nv-arrow">NV →</span> scaling the product knowledge graph catalog.</p>
      </div>
    </article>

    <article class="cc-card" data-tilt style="--card-grad-a:#4B5FB6;--card-grad-b:#1F2A66;">
      <div class="card-badge">Pc</div>
      <div class="card-body">
        <h3>Gigapixel Pathology Detection</h3>
        <p class="card-sub">IntelinAir · 94.71% accuracy</p>
        <p>Preprocessed gigapixel pathology images at two zoom levels, encoded through Inception V3 to extract 2048-d activations. Decoder trained via Conv2D-Transpose to produce the true mask.</p>
        <div class="chips"><span>Inception V3</span><span>Conv2D-T</span><span>Gigapixel</span></div>
        <p class="nv-map"><span class="nv-arrow">NV →</span> fine-grained detection inside dense retail imagery.</p>
      </div>
    </article>

    <article class="cc-card" data-tilt style="--card-grad-a:#00A85A;--card-grad-b:#006B33;">
      <div class="card-badge">Pd</div>
      <div class="card-body">
        <h3>Pineapple Density Estimation</h3>
        <p class="card-sub">Frontiers in Plant Science, 2020</p>
        <p>Large-scale pineapple flower counting from aerial imagery using deep density estimation on a U-Net backbone. Deployed on AWS. Weakly supervised learning via relative ranking of density maps.</p>
        <div class="chips"><span>U-Net</span><span>Weakly-Supervised</span><span>AWS</span></div>
        <a class="card-link" href="https://doi.org/10.3389/fpls.2020.599705" target="_blank" rel="noopener">Read paper ↗</a>
        <p class="nv-map"><span class="nv-arrow">NV →</span> shelf-stock density &amp; out-of-stock estimation from in-store photos.</p>
      </div>
    </article>
  </div>
</section>
```

- [ ] **Step 2: Append card styles to css/styles.css**

```css
/* =========================================================
   SIGNATURE WORK
   ========================================================= */

.signature-work { background: var(--cream); }
.signature-work > .section-label,
.signature-work > .section-title { max-width: var(--max-w); margin-inline: auto; }
.signature-work > .section-title { margin-bottom: 48px; }

.card-grid {
  max-width: var(--max-w); margin-inline: auto;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
}
@media (max-width: 1000px) { .card-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .card-grid { grid-template-columns: 1fr; } }

.cc-card {
  position: relative;
  background: var(--white);
  border-radius: 20px;
  padding: 28px;
  overflow: hidden;
  box-shadow: 0 1px 0 var(--rule), 0 10px 30px rgba(0,0,0,0.06);
  transform-style: preserve-3d;
  transition: box-shadow 0.3s ease;
}
.cc-card::before {
  content: ''; position: absolute; inset: 0 0 auto 0; height: 6px;
  background: linear-gradient(90deg, var(--card-grad-a), var(--card-grad-b));
}
.card-badge {
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, var(--card-grad-a), var(--card-grad-b));
  color: var(--white); font-family: var(--font-serif); font-weight: 900;
  font-size: 18px; display: grid; place-items: center;
  margin-bottom: 18px;
}
.card-body h3 { font-size: 22px; margin-bottom: 4px; }
.card-sub {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--ink-faint); margin-bottom: 12px;
}
.card-body p { color: var(--ink-soft); font-size: 15px; line-height: 1.55; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.chips span {
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-soft); background: var(--cream); border: 1px solid var(--rule);
  padding: 4px 10px; border-radius: 999px;
}
.card-link {
  display: inline-block; margin-top: 14px;
  color: var(--dd-red); font-weight: 600; font-size: 13px;
}
.nv-map {
  margin-top: 18px; padding-top: 14px;
  border-top: 1px dashed var(--rule);
  font-family: var(--font-serif); font-style: italic; font-size: 14px;
  color: var(--ink);
}
.nv-arrow {
  font-family: var(--font-mono); font-style: normal; font-weight: 600;
  font-size: 11px; letter-spacing: 0.14em; color: var(--dd-red);
  margin-right: 8px;
}
```

- [ ] **Step 3: Append tilt init to js/main.js inside the IIFE**

```js
  // ---------- Tilt on cards ----------
  if (window.VanillaTilt && !prefersReduced) {
    window.VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 4,
      speed: 600,
      glare: true,
      'max-glare': 0.12,
      perspective: 1200,
    });
  }
```

- [ ] **Step 4: Verify**

Reload and scroll to Signature Work. Expected:
- Section has a warm cream background.
- Six cards in a 3×2 grid on desktop, collapsing to 2-up then 1-up on narrower viewports.
- Each card has a top gradient bar, a lettered badge, title, sub-line, description, tech chips.
- Below the chips, a dashed separator and a red `NV →` italic line stating the New Verticals mapping.
- Hovering a card tilts it gently (~4° max) and shows a faint glare.
- Pineapple card has a "Read paper ↗" link above its NV line.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "work: 6 signature-work cards with NV-mapping footers"
```

---

### Task 9: Why DoorDash note

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Append Why DoorDash section to `<main>` after signature work**

```html
<!-- ================= WHY DOORDASH ================= -->
<section class="why-dd" id="why">
  <div class="why-inner">
    <p class="section-label">Why DoorDash</p>
    <p class="why-body">
      I've been a <strong>DashPass member since 2022</strong> — four years of watching this platform become the front door to groceries, retail, and pretty much everything else in my neighborhood. Now I want to build the computer vision behind it: the models that keep catalogs accurate, shelves stocked, and Dashers fast. That's the problem I want next.
    </p>
    <p class="why-sign">— Prajwal</p>
  </div>
</section>
```

- [ ] **Step 2: Append styles to css/styles.css**

```css
/* =========================================================
   WHY DOORDASH
   ========================================================= */

.why-dd { background: var(--white); }
.why-inner { max-width: 68ch; margin-inline: auto; }
.why-body {
  font-family: var(--font-serif); font-weight: 400;
  font-size: clamp(20px, 2.4vw, 28px); line-height: 1.45;
  color: var(--ink); margin-bottom: 24px;
}
.why-body strong { color: var(--dd-red); font-weight: 700; }
.why-sign {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--ink-faint);
}
```

- [ ] **Step 3: Verify**

Reload. Expected: between the Signature Work band and the footer, a single centered editorial paragraph in Fraunces serif, with "DashPass member since 2022" in red, followed by a `— Prajwal` sign-off.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "why-dd: editorial note referencing DashPass since 2022"
```

---

### Task 10: Footer CTA

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Append footer markup to `<main>` after Why DoorDash**

```html
<!-- ================= FOOTER ================= -->
<section class="footer-cta" id="contact">
  <div class="footer-inner">
    <p class="section-label section-label-light">Get in touch</p>
    <h2 class="footer-headline">Let's <span class="dd-word">DoorDash</span> together.</h2>

    <div class="contact-grid">
      <a class="contact-btn" href="mailto:prakash.prajwalp@gmail.com">
        <span class="contact-label">Email</span>
        <span class="contact-value">prakash.prajwalp@gmail.com</span>
      </a>
      <a class="contact-btn" href="https://linkedin.com/in/prajwal-prakash7" target="_blank" rel="noopener">
        <span class="contact-label">LinkedIn</span>
        <span class="contact-value">/in/prajwal-prakash7</span>
      </a>
      <a class="contact-btn" href="https://github.com/Prajje" target="_blank" rel="noopener">
        <span class="contact-label">GitHub</span>
        <span class="contact-value">@Prajje</span>
      </a>
      <a class="contact-btn contact-btn-primary" href="assets/Prajwal_Prakash_Resume.pdf" download>
        <span class="contact-label">Resume</span>
        <span class="contact-value">Download PDF →</span>
      </a>
    </div>

    <p class="footer-note">Built for <span class="dd-word">DoorDash</span> · April 2026</p>
  </div>
</section>
```

- [ ] **Step 2: Append styles to css/styles.css**

```css
/* =========================================================
   FOOTER CTA
   ========================================================= */

.footer-cta {
  background: var(--ink);
  color: var(--white);
  border-top: 6px solid var(--dd-red);
}
.footer-inner { max-width: var(--max-w); margin-inline: auto; }
.section-label-light { color: var(--dd-red-bright); }
.footer-headline {
  font-size: clamp(36px, 6vw, 72px);
  margin-bottom: 56px; color: var(--white);
}
.footer-headline .dd-word { color: var(--dd-red-bright); }

.contact-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  margin-bottom: 48px;
}
@media (max-width: 900px) { .contact-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .contact-grid { grid-template-columns: 1fr; } }

.contact-btn {
  display: flex; flex-direction: column; gap: 6px;
  padding: 22px; border-radius: 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.contact-btn:hover { background: rgba(255,255,255,0.08); transform: translateY(-2px); border-color: var(--dd-red-bright); color: var(--white); }
.contact-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
.contact-value { font-size: 15px; font-weight: 500; }
.contact-btn-primary { background: var(--dd-red); border-color: var(--dd-red); }
.contact-btn-primary:hover { background: var(--dd-red-bright); border-color: var(--dd-red-bright); }

.footer-note {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}
```

- [ ] **Step 3: Verify**

Reload. Expected: black footer band with red top border, "Let's DoorDash together." headline, 4 contact cards (email, LinkedIn, GitHub, Resume download), small footer note. Cards tilt-hover with red border. "Download PDF →" card is solid DoorDash red.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "footer: contact grid with mailto/LinkedIn/GitHub/resume"
```

---

### Task 11: Add resume PDF asset

**Files:**
- Create: `assets/Prajwal_Prakash_Resume.pdf`

- [ ] **Step 1: Fetch the current resume from hello-adobe**

Run: `curl -sL https://raw.githubusercontent.com/Prajje/hello-adobe/main/assets/Prajwal_Prakash_Resume.pdf -o assets/Prajwal_Prakash_Resume.pdf && file assets/Prajwal_Prakash_Resume.pdf`

Expected output: `assets/Prajwal_Prakash_Resume.pdf: PDF document, version 1.x, ...`

If the hello-adobe repo does not contain the PDF, ask the user to copy their latest resume PDF into `assets/Prajwal_Prakash_Resume.pdf` manually before continuing.

- [ ] **Step 2: Verify**

Click the "Download" CTA in the hero and the "Download PDF →" card in the footer. Expected: browser downloads the PDF file.

- [ ] **Step 3: Commit (only if file is not too large — check size first)**

```bash
ls -lh assets/Prajwal_Prakash_Resume.pdf
git add assets/Prajwal_Prakash_Resume.pdf
git commit -m "assets: add resume PDF"
```

If the PDF is larger than 5 MB, leave it out of git and add it to `.gitignore`, and ask the user to upload it directly on GitHub after publishing.

---

### Task 12: Responsive + reduced-motion + accessibility audit

**Files:**
- Modify: `css/styles.css` (only if issues found)

- [ ] **Step 1: Viewport audit**

With the server running, open devtools → Device toolbar. Test at: 375×667 (iPhone SE), 768×1024 (iPad), 1280×800 (laptop), 1920×1080 (desktop).

Check for each viewport:
- No horizontal scroll.
- Hero name wraps cleanly (no overflow past the viewport).
- Eyebrow row wraps the DashPass chip below the main pill on narrow widths.
- Metric band collapses to 2-up at ≤900px and 1-up at ≤480px.
- Card grid collapses correctly.
- Contact grid collapses correctly.

Fix any overflow or cramped spacing by tweaking the relevant `@media` blocks already in `styles.css`. If nothing is broken, skip fixes.

- [ ] **Step 2: Reduced-motion audit**

Devtools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload.

Expected:
- Typed name appears instantly, caret removed.
- Rotating tagline: still animated via CSS `@keyframes`. That's acceptable for minor oscillation, but if you prefer, add a `@media (prefers-reduced-motion: reduce) { .rotator { animation: none; } }` rule and show only the first tagline. Make that change if you want full compliance.
- Route-map canvas: dots freeze.
- Counters: show final values instantly.
- Timeline nodes: appear instantly.
- Card tilt: disabled.

- [ ] **Step 3: Accessibility quick check**

- Tab through the page — focus order flows hero CTAs → timeline → cards → footer links.
- Each `<a>` has visible focus (default browser outline is fine since we haven't removed it).
- `aria-hidden="true"` on decorative canvas, dots, scroll hint.
- `aria-label` on `.hero-name` carries the full name for screen readers.
- Color contrast: body ink on white = 17.4:1 (pass), DoorDash red on white for headings/accents — check with devtools contrast tool; `#EB1700` on `#FFFFFF` is ~5.3:1 (passes for large text, borderline for 14px body). Where it's used for small text (e.g., `.nv-arrow`), confirm it's ≥ 3:1 since those are bold.

- [ ] **Step 4: Commit any fixes**

```bash
git add css/styles.css
git commit -m "a11y/responsive: audit fixes"
```

(If no fixes, skip this commit.)

---

### Task 13: Push to GitHub and enable Pages

**Files:** none

- [ ] **Step 1: Create the remote repo via gh**

Run: `gh repo create Prajje/hello-doordash --public --description "DoorDash landing page — interactive resume for Senior MLE, Computer Vision (New Verticals)" --source=. --remote=origin --push`

Expected: repo is created, `main` is pushed, origin is set. Output ends with the repo URL.

- [ ] **Step 2: Enable GitHub Pages**

Run: `gh api -X POST repos/Prajje/hello-doordash/pages -f 'source[branch]=main' -f 'source[path]=/'`

Expected: JSON response with `"status": "building"` or `"status": null`.

- [ ] **Step 3: Wait ~30s, then verify the live site**

Run: `sleep 30 && curl -sI https://prajje.github.io/hello-doordash/ | head -3`

Expected: `HTTP/2 200`.

Then open `https://prajje.github.io/hello-doordash/` in a browser and click through: hero animations run, metric band counts up on scroll, timeline reveals, cards tilt, footer works, resume downloads.

- [ ] **Step 4: Final commit to update the description (if needed)**

If the description was wrong or missing, update it via:
`gh repo edit Prajje/hello-doordash --description "DoorDash landing page — interactive resume for Senior MLE, Computer Vision (New Verticals)"`

---

## Self-review checklist (already run by plan author)

- **Spec coverage:** every section in the spec (repo/stack, visual system, hero, route-map, metrics, timeline, signature work with NV footers, Why DoorDash, footer, interactions, testing, deploy) maps to tasks 1–13. ✓
- **Placeholders:** none. Each code-bearing step shows the actual code. ✓
- **Type/name consistency:** class names used across HTML, CSS, and JS line up (`.typed`, `.rotator`, `.ink-fill`, `#route-map`, `.metric-value`, `.node`, `.cc-card`, `.nv-map`, `.contact-btn`). ✓
