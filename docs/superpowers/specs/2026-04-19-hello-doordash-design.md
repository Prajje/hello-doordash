# hello-doordash — Design Spec

**Date:** 2026-04-19
**Author:** Prajwal Prakash
**Target role:** [Senior MLE — Computer Vision, DoorDash New Verticals](https://careersatdoordash.com/jobs/machine-learning-engineer-computer-vision/6333591/)

## Purpose

A single-page, interactive landing page that positions Prajwal Prakash for DoorDash's Senior MLE — Computer Vision role on the New Verticals (grocery & retail) team. Mirrors the structure and interactions of [`hello-adobe`](https://github.com/Prajje/hello-adobe), re-skinned with DoorDash brand and "Delivery at DoorDash" editorial feel, with each Signature Work card explicitly mapped onto a New Verticals CV problem.

## Success criteria

- A recruiter or hiring manager lands on the page and within 10 seconds sees: (1) name, (2) "Built for DoorDash," (3) DashPass member badge, (4) tagline that reads *Computer Vision Engineer*, (5) production-ML credentials.
- Every Signature Work card has a visible `NV →` line stating how that project maps to a New Verticals CV problem (inventory, shelf/product segmentation, entity resolution, Dasher efficiency, product knowledge graph, out-of-stock estimation).
- Site is fully static, deploys to GitHub Pages without a build step, and runs locally with `python3 -m http.server 8000`.
- Responsive at 375px / 768px / 1280px+. Honors `prefers-reduced-motion`.

## Non-goals (YAGNI)

- No build tooling, bundler, or framework. Vanilla HTML/CSS/JS only.
- No contact form backend — `mailto:` only.
- No analytics, no cookie banner.
- No dark mode variant.
- No CMS / content pipeline — copy is hand-authored in `index.html`.

## Repo & deploy

- **Repo name:** `hello-doordash` (new public repo under `Prajje`)
- **Branch:** `main`
- **Deploy:** GitHub Pages from `main` root → `https://prajje.github.io/hello-doordash/`
- **Local preview:** `python3 -m http.server 8000`

## File layout (mirrors hello-adobe)

```
hello-doordash/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── Prajwal_Prakash_Resume.pdf
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-19-hello-doordash-design.md
```

File-per-concern, single `styles.css`, single `main.js`. If `main.js` grows past ~500 lines it will be split by interaction (e.g., `route-map.js`, `counters.js`) — but default is one file to match hello-adobe.

## Visual system

### Color

| Token              | Hex       | Usage                             |
|--------------------|-----------|-----------------------------------|
| `--dd-red`         | `#EB1700` | Primary brand, accents, red bar   |
| `--dd-red-bright`  | `#FF3008` | Hover / active / dot pulse        |
| `--ink`            | `#111111` | Body text                         |
| `--ink-soft`       | `#4A4A4A` | Secondary text                    |
| `--cream`          | `#F7F2EE` | Section band backgrounds          |
| `--white`          | `#FFFFFF` | Base background                   |
| `--rule`           | `#E8E2DC` | Hairline rules                    |

### Typography

- **Inter** (300 / 400 / 600 / 700) — body + UI
- **Fraunces** (400 / 700 / 900, opsz 8..144) — display headings, red-bar, section titles
- **Source Code Pro** (500) — small metric labels, chips (reused from hello-adobe)

Loaded via Google Fonts `<link>` — same pattern as hello-adobe.

### Motif

Thin curved **route lines** + pulsing dots evoking packages in transit. Used in the hero canvas background and as a subtle divider ornament between sections.

### Favicon

Red rounded square (22-radius), white serif "P" — inline SVG data URL (same pattern as hello-adobe, color changed to `#EB1700`).

## Sections

### 1. Hero

- **Eyebrow row:** pill `● Built for DoorDash` + smaller chip `DashPass member since 2022`. Both left-aligned, chip is visually secondary (smaller, lighter weight, `--ink-soft`).
- **Typed name:** "Prajwal Prakash" — typewriter animation with blinking caret. Reused from hello-adobe.
- **Red bar:** short `--dd-red` underline under the name.
- **Rotating tagline:** vertical rotator cycling through *Computer Vision Engineer / Applied ML for Logistics / Production ML for Retail & Grocery*, returning to *Computer Vision Engineer* (same rotation pattern as hello-adobe).
- **Sub-copy:** "Senior MLE at Cogniac. Columbia MS. Four years shipping production computer-vision to the edge and the cloud — now aiming at DoorDash New Verticals."
- **CTAs:** `View Resume` (primary, scrolls to Experience) + `Download` (ghost, downloads PDF).
- **Scroll hint:** small "Scroll" label + animated line (reused).

### 2. Hero background — route-map canvas

Replaces hello-adobe's particle cloud. A `<canvas id="route-map">` renders:

- A soft grid of city streets (horizontal + vertical lines at ~8% opacity, `--ink` color).
- 3–5 bezier-curved "routes" laid over the grid in `--dd-red` at low alpha.
- Animated **delivery dots** that travel along each route, loop, and briefly pulse when they pass an intersection.
- Honors `prefers-reduced-motion`: if set, dots are rendered statically at their midpoints and animation is skipped.

Implementation: `requestAnimationFrame` loop in `main.js`, canvas resized on window resize (debounced).

### 3. Metric band

Same five animated counters as hello-adobe, same values:

| Metric                                  | Value    |
|-----------------------------------------|----------|
| Live Baccarat tables                    | `100+`   |
| Provisional patents                     | `3`      |
| Defect detection lift                   | `70%+`   |
| Annotation time cut                     | `80%`    |
| Inference speedup (INT8)                | `2×`     |

Counters trigger via IntersectionObserver on scroll (reused).

### 4. Timeline — "Experience"

Identical entries to hello-adobe, unchanged copy:

1. **Senior Machine Learning Engineer** — Cogniac Corporation (Feb 2022 – Present, San Jose, CA)
2. **Data Scientist** — UCSF, Dr. Ed Amorim Laboratory (2021, San Francisco, CA)
3. **Computer Vision Intern** — IntelinAir (2019–2020, New York, NY)
4. **MS Electrical Engineering** — Columbia University (Dec 2020)

Same visual (vertical timeline with dots).

### 5. Signature Work — 6 cards, NV-tilted

Each card keeps its existing technical narrative and adds a bottom `NV →` line (new, one italic line in `--dd-red`) mapping it to a New Verticals CV problem drawn from the JD.

| Card                                   | Existing narrative (kept)                                    | New `NV →` footer                                                          |
|----------------------------------------|--------------------------------------------------------------|----------------------------------------------------------------------------|
| Smart Blackjack Table                  | Segmentation + ViT + YOLO + K-Means on a cluttered scene     | `NV →` multi-object recognition & entity association on cluttered shelves  |
| AI-Automated Player Rating (Baccarat)  | Real-time CV + edge + LLM analytics across 100+ tables       | `NV →` real-time inventory vision on in-store Dasher devices               |
| Manufacturing & Railway Segmentation   | RF-DETR-Seg, SegFormer, SAM, DINO, YOLACT                     | `NV →` shelf / product / packaging segmentation at platform scale           |
| Multi-Agent HITL Annotation            | Multi-agent HITL pipeline — 80% annotation time cut          | `NV →` scaling the product knowledge graph catalog                          |
| Gigapixel Pathology Detection          | Two-zoom encoding, Inception V3, Conv2D-T — 94.71% accuracy  | `NV →` fine-grained detection inside dense retail imagery                   |
| Pineapple Density Estimation           | U-Net density estimation, weakly supervised, AWS             | `NV →` shelf-stock density & out-of-stock estimation from in-store photos   |

Card visual: same tilt-on-hover, same per-card gradient `--card-grad-a` / `--card-grad-b`, same letter badge. Gradients re-tuned to a DoorDash-leaning palette (reds, oranges, warm neutrals, one green for Pineapple).

### 6. "Why DoorDash" note

New short section between Signature Work and Footer. Editorial serif (Fraunces), left-aligned, max-width ~60ch, on `--cream` band.

> Copy (draft):
> "I've been a DashPass member since 2022 — four years of watching this platform become the front door to groceries, retail, and pretty much everything else in my neighborhood. Now I want to build the computer vision behind it: the models that keep catalogs accurate, shelves stocked, and Dashers fast. That's the problem I want next."

### 7. Footer CTA

Email (`mailto:`), GitHub, LinkedIn. Small text. Red top border. Same structure as hello-adobe.

## Interactions — reuse vs. new

| Interaction          | Status            |
|----------------------|-------------------|
| Typed name           | Reuse from hello-adobe |
| Rotating tagline     | Reuse             |
| Red bar              | Reuse, color swap |
| Metric counters      | Reuse             |
| Tilt cards           | Reuse (cap at 4°) |
| Scroll ink trail     | Reuse, color swap |
| Hero particle canvas | **Replace** with route-map canvas |

All motion-bearing interactions check `window.matchMedia('(prefers-reduced-motion: reduce)')` and degrade to static.

## Testing

- **Browsers:** latest Chrome, Safari, Firefox on macOS.
- **Breakpoints:** 375px (mobile), 768px (tablet), 1280px+ (desktop).
- **Accessibility:** all decorative canvas & icons use `aria-hidden="true"`; typed text has a static fallback `aria-label`; color contrast ≥ 4.5:1 for body copy.
- **Reduced motion:** verify typed name, rotator, counters, route-map, tilt all degrade.
- **Manual pass:** open `http://localhost:8000` and click through every CTA and anchor link. No console errors.

## Deployment

1. Repo created at `github.com/Prajje/hello-doordash`.
2. Push `main`.
3. Enable GitHub Pages in repo settings → source: `main` / root.
4. Verify live URL: `https://prajje.github.io/hello-doordash/`.

## Open decisions

None at spec-approval time. If copy for the "Why DoorDash" note needs tuning, that's a plan-level task.
