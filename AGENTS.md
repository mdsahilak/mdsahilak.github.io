# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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
- `index.html` - Complete page structure with inline SVG icons
- `styles/index.css` - All styles using CSS custom properties (variables)
- `scripts/index.js` - Command palette (Cmd+K) functionality

**Design System** (in CSS `:root`):
- Linear-inspired dark theme with accent gradient (#667eea → #764ba2)
- CSS custom properties for colors, spacing, radii, and transitions
- Mobile-first responsive design with breakpoints at 640px, 768px, 1024px

**Key Feature - Command Palette:**
- Opens with Cmd+K / Ctrl+K
- Keyboard navigation with arrow keys, Enter to select, Escape to close
- Single-letter shortcuts when empty: H (Home), A (About), C (Contact)
- Two action types: `scroll` (in-page navigation) and `link` (external URLs)
