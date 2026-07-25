# Rittwika's Portfolio & Notebook 🌸

A colorful "fairy garden" portfolio + public notes site — AI/ML and
development notes only. Plain HTML/CSS/JS, no build tools, no npm install.
Edit any file directly and refresh your browser to see the change.

> **Heads up:** there's a placeholder card for your **conda notes** on both
> `index.html` and `notes.html` (marked "Coming soon"). Send over the actual
> content and it'll get turned into a real note page at
> `notes/conda-basics.html`, same as the neural networks example.

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
│   └── (put your photo here as profile.jpg)
└── notes/
    ├── template.html        ← duplicate this for every new note
    └── intro-neural-networks.html  ← example note (AI/ML)
```

## 1. Add your photo

1. Save a photo of yourself as `images/profile.jpg` (square photos look best).
2. Open `index.html`, find the `photo-frame` div under `<!-- ABOUT -->`.
3. Delete the placeholder `<span>` text and uncomment the `<img>` line:
   ```html
   <img src="images/profile.jpg" alt="Portrait of Rittwika">
   ```

## 2. Add a new note

1. Copy `notes/template.html` and rename it, e.g. `notes/big-o-notation.html`.
2. Open it and fill in the title, category, date, tags, and content — it
   already has examples of headings, lists, code blocks, and quotes.
3. Open `notes.html`, copy one `<article class="note-card">` block, and edit:
   - `data-category` → `aiml` or `webdev` (or add a new filter button
     in the `filter-row` if you want a new category)
   - the category label, title, one-line summary, and the `href` to your new file
4. (Optional) Add the same card to the "Recent notes" section in `index.html`
   if you want it to show on the homepage too.

No build step — just save and refresh the page in your browser to check it.

## 3. Edit your details

- **Name/bio/tagline**: edit directly in `index.html` (hero and about sections).
- **Skills**: edit the `<div class="chips">` lists under the Skills section.
- **Projects**: edit or duplicate a `.project-card` block under Projects.
- **Contact links**: edit the email/GitHub/LinkedIn links in the footer of `index.html`.
- **Colors/fonts**: all defined at the top of `css/style.css` under `:root` —
  change one variable and it updates everywhere.

## 4. Preview locally

Just open `index.html` in your browser by double-clicking it. That's enough
to check your changes before publishing.

## 5. Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `your-username.github.io` if you
   want it at the root domain, or any name like `portfolio`).
2. Push this whole `portfolio` folder's contents to the repo:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On GitHub, go to your repo → **Settings** → **Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a live URL within a minute or two:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO/` (or
     `https://YOUR_USERNAME.github.io/` if the repo is named that way).

Every time you `git add . && git commit -m "..." && git push`, the live
site updates automatically — this is how you'll publish new notes going
forward.

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
