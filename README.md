# Portfolio Starter

A plain HTML/CSS/JS portfolio template. No build tools, no frameworks —
open `index.html` in a browser and it works.

## Files
- `index.html` — all your content lives here. Sections are marked with
  `EDIT:` comments showing what to change.
- `style.css` — all the styling. Colors/fonts are defined as CSS variables
  at the top of the file under `:root`.
- `script.js` — small interactive bits (typing effect, nav highlighting,
  mobile menu, copy-email button).

## What to personalize
1. `<title>` and meta description at the top of `index.html`.
2. Hero section: your name, the typed terminal line (in `script.js`,
   `linesToType`), and the one-line subtitle.
3. About section: your bio + the three "facts."
4. Projects: duplicate a `.project-card` block for each project, update
   the title, description, tags, and GitHub link.
5. Skills: add/remove `<li class="pill">` items.
6. Education: duplicate a `.commitlog__entry` block per entry.
7. Contact: your email and social links.

## Running locally
Easiest: open `index.html` directly in your browser.
Better (auto-reloads on save): use the VS Code "Live Server" extension,
or run `npx serve` in this folder.

## Deploying
Push this folder to a GitHub repo, then import that repo on Vercel or
Netlify — both auto-detect static sites and deploy with no config needed.
