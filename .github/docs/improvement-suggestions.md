# Improvement Suggestions — Current Status Audit

> Last audit: 2026-03-07
> Scope: `index.html`, `css/custom.css`, `js/scripts.js`, repository root structure.

---

## Status Legend

| Status     | Meaning                                  |
| ---------- | ---------------------------------------- |
| ✅ Done    | Implemented and verified in current code |
| 🟡 Partial | Partially implemented; still needs work  |
| ❌ Pending | Not implemented                          |

---

## Current Status By Item

## 1. ✅ Fix incorrect author name in CSS header

**Current state:** Implemented.
**Evidence:** `css/custom.css:2` contains `Caio Cabral - Portfolio Custom CSS`.

---

## 2. ❌ Remove inline style in HTML

**Current state:** Not implemented; scope increased.
**Evidence:** Inline styles still exist in multiple places, including the toast wrapper (`index.html:1340`) and project/modal icon containers (`index.html:492`, `index.html:583`, `index.html:627`, `index.html:631`, `index.html:707`, `index.html:750`, `index.html:754`, `index.html:825`, `index.html:872`, `index.html:876`).

**Updated action:**

1. Create reusable CSS classes for modal backgrounds and icon sizing/color.
2. Replace all `style="..."` occurrences in `index.html`.

---

## 3. ❌ Wrap page content in `<main>` tag

**Current state:** Not implemented.
**Evidence:** `index.html` has `<nav>`, `<header>`, `<section>`, and `<footer>`, but no `<main>` wrapper.

---

## 4. ✅ Standardize all comments/text to English

**Current state:** Completed (marked done by user).
**Evidence:** User requested this item be marked done. Please verify the changes in `index.html` and `js/scripts.js` to confirm English text and messages are present.

---

## 5. ❌ Add missing JSDoc comments to all functions

**Current state:** Mostly missing.
**Evidence:** Only theme application has JSDoc (`js/scripts.js:259`). Functions like `updateActiveNav`, `typeLoop`, `attachEmailCopy`, `formatMonthYear`, `parseLocalDate`, `computeDuration`, and `updateTimelineDates` still have no JSDoc blocks.

---

## 6. 🟡 Add CSS section headers for every block

**Current state:** Mostly implemented.
**Evidence:** Major blocks are already organized with headers (for example Navbar, Hero, Projects, Theme Switcher, Footer, Responsive) in `css/custom.css`.

**Remaining gap:** Some internal subgroups still use generic comments and can be standardized to one consistent section-header pattern.

---

## 7. ❌ Reduce `!important` usage

**Current state:** Not implemented.
**Evidence:** `css/custom.css` still contains multiple `!important` declarations (`css/custom.css:48`, `css/custom.css:93`, `css/custom.css:96`, `css/custom.css:150`, `css/custom.css:266`, `css/custom.css:336`, `css/custom.css:774`, `css/custom.css:1013`, `css/custom.css:1027`, `css/custom.css:1138`, `css/custom.css:1172`).

---

## 8. 🟡 Add `loading="lazy"` to below-the-fold images

**Current state:** Partial.
**Evidence:** Lazy loading already exists for project-related images (`index.html:447`, `index.html:497`), and the hero image remains without lazy loading (correct for above-the-fold).

**Remaining gap:** Re-check all future image additions to keep the rule enforced consistently.

---

## 9. ❌ Extract JS configuration constants to the top

**Current state:** Not implemented.
**Evidence:** Typing constants (`TYPE_SPEED`, `DELETE_SPEED`, `PAUSE_END`, `PAUSE_START`) are still declared inside the typing block around `js/scripts.js:76-79`.

---

## 10. ❌ Improve portfolio filter with event delegation

**Current state:** Not implemented.
**Evidence:** Individual click handlers are still attached with `filterBtns.forEach(... addEventListener ...)` in `js/scripts.js:108-123`.

---

## 11. ❌ Add `<meta>` tags for Open Graph / social sharing

**Current state:** Not implemented.
**Evidence:** No `og:*` meta tags found in `index.html` head section.

---

## 12. ❌ Add a skip-to-content link for accessibility

**Current state:** Not implemented.
**Evidence:** No `.skip-link` anchor exists at the beginning of `<body>` in `index.html`, and no `.skip-link` styles exist in `css/custom.css`.

---

## 13. ❌ Convert hero profile image to WebP

**Current state:** Not implemented.
**Evidence:** Hero image still uses `assets/img/perfil.jpg` directly (`index.html:151`), with no `<picture>` and no `perfil.webp` usage.

---

## 14. ❌ Add `preload` for critical fonts

**Current state:** Not implemented.
**Evidence:** Font links include `preconnect` and stylesheet includes, but no `rel="preload"` for the critical font stylesheet in `index.html` head.

---

## 15. ❌ Add smooth scroll support comment

**Current state:** Not implemented.
**Evidence:** `scroll-behavior: smooth` exists in `css/custom.css:30`, but the compatibility comment is missing.

---

## 16. ❌ Create a 404 page

**Current state:** Not implemented.
**Evidence:** No `404.html` exists in repository root.

---

## 17. ❌ Add print stylesheet

**Current state:** Not implemented.
**Evidence:** No `@media print` block exists in `css/custom.css`.

---

## Architecture Review

**Verdict:** Adequate for a small static portfolio, but approaching maintainability limits.

**Strengths:**

1. Clear single-page architecture and conventional folder layout.
2. CSS uses design tokens (`:root` custom properties) and theme overrides.
3. JavaScript is centralized in one file with coherent feature grouping.

**Risks:**

1. `index.html` is very large (1300+ lines), which increases editing and regression risk.
2. Repeated modal markup and repeated inline style patterns increase duplication.
3. `js/scripts.js` is monolithic (single DOMContentLoaded block) and should be split by feature.

**Recommendation:** Keep current architecture, but refactor incrementally:

1. Remove all inline styles first.
2. Extract reusable modal/icon classes in CSS.
3. Split JS into small modules or at least isolated sections with explicit config constants at top.

---

## Security Review

**Verdict:** Baseline is good for a static site, with moderate hardening opportunities.

**What is good now:**

1. External links using `target="_blank"` consistently include `rel="noopener"`.
2. Bootstrap and Font Awesome CDN links include `integrity` and `crossorigin`.
3. No obvious dangerous dynamic HTML injection from user input.

**Hardening opportunities:**

1. Add a Content Security Policy via `<meta http-equiv="Content-Security-Policy" ...>` tailored to current CDNs.
2. Consider adding `rel="noreferrer"` for external links where referrer leakage should be minimized.
3. Replace remaining `innerHTML` usage with safer DOM assembly where possible (`js/scripts.js:250`), even if current data is controlled.
4. Consider SRI or self-hosting strategy for AOS from unpkg (currently no integrity).

---

## Coding Standards Review

**Verdict:** Partially adequate; important guideline violations still exist.

**Compliant areas:**

1. Naming in English is generally good.
2. Semantic sections and major section comments exist in HTML/CSS.
3. CSS variable usage is strong and consistent.

**Non-compliant or weak areas:**

1. No-inline-style rule is currently violated in many places.
2. Portuguese comments/messages remain where English standard was required.
3. Missing JSDoc for most functions.
4. Excessive `!important` usage without explicit justification comments.
5. JS formatting convention in instructions prefers single quotes, but file uses mostly double quotes.
6. Responsive overrides are not fully grouped at the bottom because some media-query blocks appear earlier for hero controls.

---

## Updated Execution Order

| Step | Task                                                   | Priority | Status     |
| ---- | ------------------------------------------------------ | -------- | ---------- |
| 1    | Remove all inline styles (global cleanup)              | 🔴       | ❌ Pending |
| 2    | Add `<main>` and skip-link for accessibility           | 🔴       | ❌ Pending |
| 3    | Standardize English comments/toast messages            | 🔴       | ✅ Done    |
| 4    | Add missing JSDoc in `js/scripts.js`                   | 🟡       | ❌ Pending |
| 5    | Refactor `!important` usage with rationale             | 🟡       | ❌ Pending |
| 6    | Extract JS constants and adopt filter event delegation | 🟡       | ❌ Pending |
| 7    | Add OG tags and font preload                           | 🟢       | ❌ Pending |
| 8    | Add WebP hero image, `404.html`, and print styles      | 🟢       | ❌ Pending |

---

## Notes

1. Item 1 from the original list is complete and can be removed from active backlog.
2. Item 8 is partially done and should stay in checklist form for future regressions.
3. Item 2 should be treated as a broader refactor, not only a toast-container fix.
