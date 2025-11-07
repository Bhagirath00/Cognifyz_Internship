# Cognifyz Internship Portfolio

A curated, multi-level web portfolio demonstrating foundational to advanced front‑end skills. The repository is organized into three Levels, each containing focused tasks and polished mini‑projects. The homepage provides a clean, card‑based navigation experience with professional theming, premium typography, and responsive layouts.

## Overview
- **Tech stack:** HTML, CSS, vanilla JS. No build required.
- **Design language:** Dark, premium UI with gradient accents, metallic borders, soft shadows, and Motion‑aware micro‑interactions.
- **Typography:** Inter (UI), Clash Display / Playfair Display (headings), Montserrat (legacy sections).
- **Icons:** Font Awesome.
- **Local dev:** Live Server (via `npm run start`).

## Level‑wise Tasks and Inner Projects

### Level 1 — Foundations
- **Task 1: HTML & CSS Basics**
  - [Webpage](Level1/Task1/Webpage/index.html)
    - Purpose: Simple static page to practice semantic HTML and responsive images.
    - Tech: HTML5, CSS (Inter font), mobile-first layout.
    - Highlights: Clean typography, responsive hero image, accessible structure.
  - [Basic Form](Level1/Task1/BasicForm/index.html)
    - Purpose: Collect user input with validation and usable layout.
    - Tech: HTML forms, CSS for focus/invalid states.
    - Highlights: Required fields, inline hints, keyboard-friendly navigation.
  - [Navigation Menu](Level1/Task1/NavMenu/index.html)
    - Purpose: Build a responsive multi-level navbar and landing sections.
    - Tech: Flexbox/Grid, Font Awesome, scroll-based section layout.
    - Highlights: Dropdowns, hero CTA, services/portfolio cards, contact form.
- **Task 2: Intro to JavaScript**
  - [Color Button](Level1/Task2/ColorButton/index.html)
    - Purpose: Introduce DOM manipulation and dynamic styles.
    - Tech: Vanilla JS, CSS variables, canvas particles backdrop.
    - Highlights: Random color generation with contrast-aware text.
  - [Time Alert](Level1/Task2/TimeAlert/index.html)
    - Purpose: Conditional UI based on current time of day.
    - Tech: Vanilla JS modules (simple), CSS modal + backdrop effects.
    - Highlights: Accessible modal, animated open/close, keyboard focus trap.
  - [Calculator](Level1/Task2/Calculator/index.html)
    - Purpose: Minimal calculator (addition) with history log.
    - Tech: Vanilla JS event handling + keyboard input, CSS grid keypad.
    - Highlights: Live result display, history panel, graceful error handling.

### Level 2 — Responsive Interfaces
- **Task 1: Components**
  - [Responsive Card (Bulma)](Level2/Task1/ResponsiveCard/bulmaCard.html)
    - Purpose: Component design with a utility framework.
    - Tech: Bulma + custom CSS (dark luxury theme), SVG icon, 3D tilt.
    - Highlights: Badge, layered shadows, micro-interactions, responsive spacing.
  - [Responsive Grid (Bootstrap)](Level2/Task1/ResponsiveGrid/bootstrapGrid.html)
    - Purpose: Showcase grid systems and content cards.
    - Tech: Bootstrap 5, Inter + Clash Display typography.
    - Highlights: Three-topic grid (AI/ML/Data), metallic dividers, hover lift.
- **Task 2: Pages & Navigation**
  - [Responsive Page](Level2/Task2/ResponsivePage/index.html)
    - Purpose: Full multi-section page with a consistent design system.
    - Tech: Custom CSS, Flexbox/Grid, Font Awesome.
    - Highlights: Polished footer, accessible contact section, responsive cards.
  - [Hamburger Menu](Level2/Task2/HamburgerMenu/index.html)
    - Purpose: Advanced header with off-canvas navigation for mobile.
    - Tech: Custom CSS + minimal JS, prefers-reduced-motion considerations.
    - Highlights: Animated underline links, clean hero, minimal professional footer.

### Level 3 — Advanced UI/UX
- **Task 1: Image Interfaces**
  - [Image Gallery](Level3/Task1/ImageGallery/index.html)
    - Purpose: Explore filtering, search, and media presentation.
    - Tech: Vanilla JS (filter/search/favorite), CSS grid/masonry-like layouts.
    - Highlights: Lightbox, favorites, animated filtering, stats updates.
  - [Slideshow](Level3/Task1/Slideshow/index.html)
    - Purpose: Premium slideshow UX with multiple controls.
    - Tech: HTML/CSS animations + JS controls, responsive clamp sizing.
    - Highlights: Play/pause, speed/effect toggles, dots/thumbnails, fullscreen.
- **Task 2: Landing Page**
  - [Landing Page](Level3/Task2/index.html)
    - Purpose: Marketing page with conversions in mind.
    - Tech: IntersectionObserver animations, form validation, counters.
    - Highlights: Hero metrics, testimonials carousel, apply/contact sections.

## Key UI/UX Enhancements
- Card‑based homepage, no tabbed nav; back buttons on inner sections.
- Consistent spacing scale, rounded corners, and elevation on hover.
- Responsive grids via CSS Grid, Flexbox, Bootstrap 5, and Bulma.
- Accessible semantics, focus states, keyboard support on interactive views.
- Motion‑safe micro‑interactions and polished iconography.

## Getting Started

### Prerequisites
- Node.js (for Live Server dev convenience).

### Install & Run
```bash
npm install
npm run start
# Opens http://127.0.0.1:5173 with index.html
```
Alternative (open any project directly from file system) — no build required.

## Conventions
- Folder naming: `Level{N}/Task{N}/ProjectName/`.
- Each project is self‑contained with its own `index.html` (and `style.css`, `script.js` when needed).
- Fonts loaded via Google/Fontshare; icons via CDN (Font Awesome).

## Notes & Decisions
- Homepage: Removed legacy Level tabs and "View Projects" buttons in favor of clickable cards.
- Image sizes balanced for readability (e.g., slideshow cinematic ratio with responsive constraints).
- Footer and contact sections modernized; hamburger menu simplified (removed search box) and refined.

## Contributing / Extending
- Add new tasks by following the Level/Task structure and linking from `index.html`.
- Keep UI consistent: use the shared typography and spacing scales.
- Prefer progressive enhancement; avoid heavy dependencies unless necessary.

## License
This repository is for internship/portfolio demonstration purposes.
