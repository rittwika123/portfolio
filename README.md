# Rittwika's Portfolio & Notebook 🌸

A colorful "fairy garden" portfolio + public notes site - AI/ML and
development notes only. Plain HTML/CSS/JS, no build tools, no npm install.
Edit any file directly and refresh your browser to see the change.

> **Heads up:** there's a placeholder card for your **conda notes** on both
> `index.html` and `notes.html` (marked "Read note"). Send over the actual
> content and it'll get turned into a real note page at


## File structure

```
portfolio/
├── index.html              ← homepage (hero, about, skills, projects, notes preview)
├── notes.html               ← full notes listing with category filter
├── css/
│   └── style.css            ← all styling, colors, fonts (edit here for design changes)
├── js/
│   └── script.js            ← animations, mobile menu, notes filter
├── images/
│   └── image.jpg
|   └── brain.png
└── notes/
    ├── template.html        ← duplicate this for every new note
```

## Notes on what's already built in

- **Splash intro**: a short loading screen plays once when `index.html`
  first loads (see `#splash` — it removes itself automatically).
- **Particle network**: an animated, mouse-reactive canvas behind the hero
  text, echoing the neural-network theme.
- **Self-drawing neural graph**: the SVG diagram in the hero draws itself
  on load.
- **Typing effect**: the line under the hero heading cycles through the
  phrases listed in `data-typing` on that `<span>` in `index.html` — edit
  that JSON array to change what it types.
- **Count-up stats**: the numbers in the stats strip animate up when
  scrolled into view. Update the `data-count` values by hand as your real
  numbers change (e.g. bump "Notes published" each time you add one).
- **Custom cursor + magnetic buttons + 3D card tilt**: desktop-only,
  automatically disabled on touch devices.
- **Scroll progress bar, nav auto-hide, active-section highlighting**:
  all handled globally in `script.js` — nothing to add per page.
- **Scroll-reveal + staggered animations**: sections and cards fade/slide
  in as you scroll, with cards in a grid staggering slightly.
- **Notes filtering**: the category buttons on `notes.html` animate cards
  in and out — pure client-side JS, no backend needed.
- **Mobile-responsive**: nav collapses into a menu button, grid layouts
  stack on small screens, and all the desktop-only effects above are
  automatically switched off for performance and usability.
- **Accessibility**: everything above respects
  `prefers-reduced-motion` — animations are skipped entirely for anyone
  who has that OS setting on.
