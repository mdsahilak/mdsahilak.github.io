# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Md Sahil Ak. No build system - pure HTML/CSS/JS served directly via GitHub Pages.

## Development

To develop locally, open `index.html` in a browser or use any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve
```

No build, lint, or test commands exist.

## Architecture

**Single-page static site:**
- `index.html` - Complete page structure with inline SVG icons. The only JS is a small
  inline `<script>` at the bottom: an `IntersectionObserver` that fades project cards in
  (adds `.visible`, with a staggered `transition-delay` per card) as they scroll into view.
- `styles/index.css` - All styles, driven entirely by CSS custom properties.
- `images/` - Project hero images and the `memoji_*` avatars (the navbar brand logo / favicon).

**Page structure:** sticky `.navbar` (just the "Sahil Ak" brand pill) → `main` with
`.section` bands (Apps, Web) of project `.card`s → `.footer` with round social pills and
the copyright line. There is no hero, no contact section, and no nav links by design.

**Design System** (in CSS `:root`):
- Mirrors the **TimeWave design system** (timewaveapp.com), whose tokens are exact
  `float × 255` conversions of the TimeWave app's Xcode asset catalog (Display P3).
  Keep this site's palette in sync with that source of truth.
- Grayscale, **adaptive** theme: light is the `:root` default; dark and high-contrast are
  layered on via `@media (prefers-color-scheme: dark)` and `(prefers-contrast: more)`.
  Depth comes from surface layering — page is `--bg-secondary` (#f7f7f7), raised cards are
  `--bg` (#fbfbfb) — not from color.
- Visual language: **capsule/pill** shapes (`--pill: 9999px`) for buttons, tags, and the
  brand pill; full-width bands separated by hairline `--border` dividers; centered column
  capped at `--max-width` (940px).
- Always use the semantic tokens (`var(--text)`, `var(--bg)`, `var(--border)`, etc.) so all
  appearance variants update automatically; avoid hardcoded hex in component rules.
- Responsive: cards use `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`, so
  column count is derived from width (one breakpoint at 768px for section padding).
- Respects `prefers-reduced-motion` (card fade-in is disabled).
