# Copilot Instructions — Caio Cabral Portfolio

> These instructions define the coding standards, conventions, and best practices
> for every file in this project. All code generated or refactored by GitHub Copilot
> **must** follow the rules below.

---

## 1. Project Overview

| Item            | Detail                                                     |
| --------------- | ---------------------------------------------------------- |
| Type            | Static personal portfolio website                          |
| Stack           | HTML 5, CSS 3 (+ Bootstrap 5.3), Vanilla JavaScript (ES6+) |
| Hosting         | GitHub Pages                                               |
| Browser support | Latest 2 versions of Chrome, Firefox, Safari, Edge         |

---

## 2. Language & Naming Conventions

### 2.1 Language

- **All** identifiers (variables, functions, classes, IDs, data attributes,
  file names) **must be in English**.
- Comments **must be written in English** — short and descriptive.
- User-facing text (UI labels, paragraphs) may remain in Portuguese or English
  as defined by the project owner.

### 2.2 Naming Style

| Context               | Convention                 | Example                                  |
| --------------------- | -------------------------- | ---------------------------------------- |
| CSS class names       | `kebab-case`               | `.hero-section`, `.btn-accent`           |
| CSS custom properties | `--kebab-case`             | `--bg-primary`, `--accent-glow`          |
| HTML `id` attributes  | `camelCase`                | `id="mainNav"`, `id="typingText"`        |
| JS variables / funcs  | `camelCase`                | `const navHeight`, `function typeLoop()` |
| JS constants (config) | `UPPER_SNAKE_CASE`         | `const TYPE_SPEED = 80`                  |
| JS classes            | `PascalCase`               | `class ThemeSwitcher {}`                 |
| File names            | `kebab-case`               | `custom.css`, `scripts.js`               |
| Data attributes       | `kebab-case` after `data-` | `data-aos-delay`, `data-category`        |

### 2.3 Self-Descriptive Names

- Names must clearly communicate **what** the element is or **what** the
  function does without needing additional context.
- Avoid abbreviations except widely accepted ones (`btn`, `nav`, `img`, `el`).
- Bad: `function f()`, `const x`
- Good: `function updateActiveNavLink()`, `const navbarElement`

---

## 3. HTML Guidelines

### 3.1 Structure & Semantics

- Use semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<aside>`, `<footer>`.
- Each `<section>` must have a unique `id` matching its navigation link.
- Keep proper heading hierarchy (`h1` → `h2` → `h3` …); only **one** `<h1>`
  per page.

### 3.2 Accessibility (a11y)

- Every `<img>` must have a meaningful `alt` attribute.
- Interactive elements must have `aria-label` when the visible text is
  insufficient.
- External links must include `rel="noopener"` and `target="_blank"`.
- Form controls must have associated `<label>` elements.
- Color contrast must meet **WCAG AA** (4.5:1 for normal text).

### 3.3 Comments

- Add a **section comment** before each major block:
  ```html
  <!-- ======================== Hero Section ======================== -->
  ```
- Use brief inline comments for non-obvious logic only.

### 3.4 Formatting

- Indent with **2 spaces** (no tabs).
- Attributes on one line when ≤ 3; otherwise, one attribute per line.
- Self-closing tags: `<img />`, `<br />`, `<hr />`.

---

## 4. CSS Guidelines

### 4.1 Architecture

- All custom styles live in `css/custom.css`.
- Use **CSS custom properties** (`:root` variables) for colors, fonts, spacing,
  radii, and transitions — never hard-code repeated values.
- Group rules by component/section with clear **section headers**:
  ```css
  /* ========== Navbar ========== */
  ```

### 4.2 Specificity & Overrides

- Avoid `!important` unless overriding Bootstrap defaults that cannot be
  resolved otherwise. Document **why** when used.
- Prefer class selectors over ID selectors for styling.
- Never use inline styles in HTML.

### 4.3 Responsive Design

- Follow **mobile-first** approach: base styles for mobile, then
  `@media (min-width: …)` for larger screens.
- Breakpoints must align with Bootstrap 5.3:
  - `sm` — 576px
  - `md` — 768px
  - `lg` — 992px
  - `xl` — 1200px
  - `xxl` — 1400px
- Group all responsive overrides at the **bottom** of the file, ordered from
  smallest to largest breakpoint.

### 4.4 Theming

- The project supports **multiple color themes** via CSS custom properties.
- Theme variables are defined in `:root` (default) and overridden via
  `[data-theme="<name>"]` selectors on `<html>`.
- Theme names: `blue`, `teal`, `orange`, `green`.
- The active theme is persisted in `localStorage` under the key `portfolio-theme`.

### 4.5 Formatting

- Indent with **2 spaces**.
- One declaration per line.
- Opening brace on the same line as the selector; closing brace on its own line.
- Blank line between rule blocks.

---

## 5. JavaScript Guidelines

### 5.1 General

- Use **ES6+ syntax**: `const`/`let` (never `var`), arrow functions, template
  literals, destructuring, modules (when applicable).
- Wrap all code inside `DOMContentLoaded` or use `defer` on `<script>`.
- Keep functions **small and focused** (≤ 30 lines ideally).
- Avoid global variables — encapsulate in IIFEs or modules.

### 5.2 DOM Interaction

- Cache DOM queries in variables; never query the same element twice.
- Use `addEventListener` — never inline event handlers (`onclick="…"`).
- Use event delegation when attaching the same handler to many elements.

### 5.3 Error Handling

- Wrap async operations (`clipboard`, `fetch`) in `try/catch`.
- Log errors to the console with `console.error()` and provide user-friendly
  fallback behavior.

### 5.4 Comments & Documentation

- Add a **file header comment** explaining the file's purpose.
- Add a brief JSDoc-style comment above each function:
  ```js
  /**
   * Toggles the "scrolled" class on the navbar based on scroll position.
   */
  function handleNavbarScroll() { … }
  ```
- Use inline comments sparingly, only for non-obvious logic.

### 5.5 Formatting

- Indent with **2 spaces**.
- Semicolons at end of statements.
- Single quotes for strings (or template literals when interpolating).
- Trailing commas in multi-line arrays/objects.

---

## 6. Bootstrap 5.3 Usage

- Use Bootstrap utility classes for spacing, flexbox, and grid when they
  reduce custom CSS.
- Prefer Bootstrap's responsive utilities (`d-none d-md-block`) over writing
  custom media queries for show/hide.
- Never modify Bootstrap source files — override in `custom.css` only.
- Use Bootstrap's JavaScript components (Collapse, Toast, Modal) via
  data attributes — avoid re-implementing the same behavior manually.
- Reference: <https://getbootstrap.com/docs/5.3/>

---

## 7. Performance

- Optimize images (WebP preferred) and use `loading="lazy"` for images
  below the fold.
- Minimize render-blocking resources: load CSS in `<head>`, JS at end of
  `<body>` or with `defer`.
- Keep third-party CDN dependencies to a minimum.
- Use `passive: true` on scroll/touch event listeners.

---

## 8. Project Structure

```
/
├── index.html              # Main (and only) HTML page
├── css/
│   └── custom.css          # All custom styles
├── js/
│   └── scripts.js          # All custom JavaScript
├── assets/
│   ├── img/                # Images (profile, project screenshots, etc.)
│   └── video/              # Demo videos for project modals
├── .github/
│   ├── copilot-instructions.md   # This file
│   └── docs/
│       └── improvement-suggestions.md    # Refactoring roadmap
└── README.md
```

---

## 9. Git & Version Control

- Write commit messages in English, imperative mood:
  `"Add theme switcher feature"`, `"Fix navbar scroll offset"`.
- Keep commits small and focused on a single change.
- Branch naming: `feature/<name>`, `fix/<name>`, `refactor/<name>`.

---

## 10. Summary Checklist

Before every commit, verify:

- [ ] All names are self-descriptive and in English
- [ ] Each HTML section, CSS block, and JS function has a brief comment
- [ ] No `var` — only `const` and `let`
- [ ] No inline styles or inline event handlers
- [ ] CSS variables used for all colors, fonts, and shared values
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Accessibility attributes (`alt`, `aria-label`) are present
- [ ] No console warnings or errors
- [ ] Code is formatted with 2-space indentation and consistent style
