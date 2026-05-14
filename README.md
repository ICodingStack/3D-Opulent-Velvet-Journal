# ✦ 3D Opulent Velvet Journal

> *Where digital craftsmanship meets timeless elegance.*

<br/>

## ✦ Preview & Screenshot

<p align="center">
  <a href="/assets/preview.png" target="_blank">
    <img src="/assets/preview.png" alt="3D Opulent Velvet Journal Preview" width="85%" style="border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
  </a>
</p>

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-c9a84c?style=flat-square&labelColor=0d0a12"/>
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-Pure_Vanilla-c9a84c?style=flat-square&labelColor=0d0a12"/>
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-3D_Transforms-c9a84c?style=flat-square&labelColor=0d0a12"/>
  <img alt="JS" src="https://img.shields.io/badge/JavaScript-Canvas_Art-c9a84c?style=flat-square&labelColor=0d0a12"/>
  <img alt="Version" src="https://img.shields.io/badge/Version-1.0.0-c9a84c?style=flat-square&labelColor=0d0a12"/>
</p>

<br/>

---

A hyper-realistic, ultra-luxurious digital journal that feels like opening a **$5,000 handmade velvet-leather book** from a royal library. Every pixel is crafted for cinematic opulence — deep velvet textures, 24k gold accents, and a breathtaking 3D page-turning effect that responds to touch, mouse, and keyboard.

---

## ✦ Features

| Feature | Description |
|---|---|
| **Realistic 3D Page Turns** | CSS `rotateY` transforms with physics-like ease curves, cast shadows, and volumetric depth |
| **9 Bespoke Illustrations** | Each page painted at runtime via Canvas 2D: sacred geometry, marble with gold inlays, celestial florals, aurora horizons, crystal lattices, and more |
| **Bokeh Particle System** | 80 animated golden dust particles with radial-gradient bokeh, drift, and fade lifecycle |
| **Mouse-Follow Light** | A soft radial specular highlight tracks your cursor across the journal cover |
| **Cinematic Background** | Animated gradient (void black → midnight purple → warm gold) layered with a velvet noise texture |
| **Black Velvet Cover** | Embossed gold title, ornamental seal, double-line inner border — no images required |
| **Gold Foil Details** | Top/bottom page edges shimmer with a linear-gradient foil effect |
| **Multi-Input Navigation** | Arrow buttons, keyboard arrows, mouse drag, swipe gesture |
| **Progress Dots** | Clickable timeline of all 9 pages with live active indicator |
| **Responsive Design** | Scales gracefully from 4K displays down to 375px mobile screens |
| **60fps Smooth** | Pure CSS transitions + `requestAnimationFrame` — zero heavy dependencies |
| **GitHub-Ready** | Clean folder structure, MIT licensed, zero build step |

---

## ✦ Live Demo

> **[▶ View Live Demo](#)** ← *(deploy to GitHub Pages / Netlify / Vercel)*

```
Settings → Pages → Deploy from /root → Save
```

Your journal will be live at `https://your-username.github.io/3d-opulent-velvet-journal/`

---

## ✦ Preview

```
┌─────────────────────────────────────────────────────────────┐
│          3D Opulent Velvet Journal                          │
│      Experience timeless elegance in digital form          │
│                                                             │
│   ◀   ┌──────────────┬──────────────┐   ▶                  │
│       │  Back page   │  Front page  │                       │
│       │  (ivory)     │  (velvet)    │                       │
│       │              │   OPULENT    │                       │
│       │   calligraphy│   JOURNAL    │                       │
│       │   & quote    │   ————————   │                       │
│       └──────────────┴──────────────┘                       │
│                  ● ○ ○ ○ ○ ○ ○ ○ ○                         │
└─────────────────────────────────────────────────────────────┘
```

---

## ✦ Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, `perspective`, `rotateY`, keyframe animations, `backface-visibility`
- **Vanilla JavaScript (ES6+)** — Canvas 2D API for all illustrations, particle system, drag detection
- **Google Fonts** — Cinzel · Cormorant Garamond · Playfair Display
- **Zero dependencies** — no frameworks, no bundlers, no npm required

---

## ✦ Folder Structure

```
3d-opulent-velvet-journal/
├── index.html          ← Entry point
├── css/
│   └── style.css       ← All styling: layout, 3D transforms, animations
├── js/
│   └── script.js       ← Particles, page art, turn engine, controls
├── assets/             ← Optional: add your own page images here
├── README.md
├── LICENSE
└── .gitignore
```

---

## ✦ Getting Started

No build step. No dependencies. Clone and open.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/3d-opulent-velvet-journal.git

# 2. Navigate to the project
cd 3d-opulent-velvet-journal

# 3. Open in browser
open index.html
# — or —
npx serve .          # for a local dev server (optional)
```

### Deploying to GitHub Pages

```bash
git init
git add .
git commit -m "✦ Initial commit — Opulent Journal v1.0.0"
git remote add origin https://github.com/YOUR_USERNAME/3d-opulent-velvet-journal.git
git push -u origin main
# Then enable Pages in repository Settings
```

---

## ✦ Customisation

### Changing Page Content
Open `js/script.js` and locate the `PAGES` array. Each entry has:
- `drawFront(ctx, w, h)` — the right-facing illustration
- `drawBack(ctx, w, h)` — the left-facing content after turning

### Swapping Colours
All palette tokens live in `css/style.css` under `:root`. Key variables:

```css
--clr-gold:        #c9a84c;   /* primary gold */
--clr-gold-bright: #e8c96a;   /* highlights */
--clr-void:        #080608;   /* background base */
```

### Adding Real Images
Place images in `/assets/` and paint them onto a canvas with `ctx.drawImage()` inside any draw function.

---

## ✦ Browser Support

| Browser | Version |
|---|---|
| Chrome / Edge | 90+ |
| Firefox | 85+ |
| Safari | 14+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

---

## ✦ License

```
MIT License — Copyright © 2025 Opulent Studio
```

See [LICENSE](LICENSE) for full text.

---

<p align="center">
  <i>Crafted with devotion · Opulent Journal · MMXXV</i>
</p>
