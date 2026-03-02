# Learning Logs

## Learning: What is `aria-label` and how it works

- Category: programming
- Detailed Explanation: `aria-label` is an ARIA attribute that provides an accessible name for an element so assistive technologies (like screen readers) can announce it. It is used when visible text is not present or when a short accessible name is needed. When present, `aria-label` is used in the accessible name computation and can override visible text in some cases, so prefer native labels (`<label>`, `alt`) when possible.
- Code Example(s):
  - `<button aria-label="Open menu"><svg>…</svg></button>`
  - `<input type="text" aria-label="Your city" />`
- Related Files:
  - index.html — index.html
  - learning-logs.md — .github/docs/learning-logs.md
- Actionable Takeaway: Audit UI for icon-only buttons and custom controls; add `aria-label`, `aria-labelledby`, or proper `<label>`s where needed.

- Beginner-Friendly Meaning: `aria-label` gives a short, readable name to elements that don't show text so screen readers can describe them.
- Deep Understanding: Screen readers compute an element's accessible name using multiple sources (visible text, `aria-label`, `aria-labelledby`, `alt`). `aria-label` is highest-priority for elements without visible text and should be concise. Prefer `aria-labelledby` when reusing nearby visible text. Avoid using `aria-label` on elements hidden from assistive tech (`aria-hidden="true"`). Test with a screen reader to ensure natural phrasing and avoid duplication.
- Mini Knowledge Check:
  1. When should you prefer a native `<label>` over `aria-label`?
  2. What attribute would you use for an icon-only button to make it accessible?
- Next Learning Step: Scan `index.html` for icon-only controls, add accessible names, and test with a screen reader.

## Learning: Using CSS custom properties for theming and maintainability

- Category: programming
- Detailed Explanation: CSS custom properties (variables) let you declare reusable design tokens (colors, fonts, spacing, radii, transitions) — typically in `:root` for global scope — and reference them via `var(--name)`. Centralized tokens simplify theme changes and maintenance and support runtime overrides (e.g., `[data-theme="teal"]`) so JavaScript can switch themes without changing CSS rules.
- Code Example(s):
  - `:root { --color-primary: #0d6efd; --font-sans: 'Inter', sans-serif; --spacing-sm: 8px; }`
  - `.button { background-color: var(--color-primary); padding: var(--spacing-sm); }`
- Related Files:
  - copilot-instructions.md — .github/copilot-instructions.md
  - custom.css — css/custom.css
- Actionable Takeaway: Define global design tokens in `:root` using descriptive names (e.g. `--color-primary`), override them per-theme with `[data-theme="<name>"]`, and persist the active theme in `localStorage`.

- Beginner-Friendly Meaning: Variables are named boxes for values (like colors). Use the name instead of repeating the value everywhere so a single change updates all uses.
- Deep Understanding: Custom properties are evaluated by the browser at runtime, enabling dynamic overrides and JavaScript interaction via `getComputedStyle` or toggling `data-theme` attributes. Use fallbacks `var(--name, fallback)` to prevent invalid values. They differ from preprocessor variables (Sass) because they exist in the final CSS and can be changed at runtime. Ensure semantic naming for maintainability and check browser support if targeting older platforms.
- Mini Knowledge Check:
  1. How do you read a CSS custom property inside a rule?
  2. What selector is commonly used to scope theme overrides for runtime theme switching?
- Next Learning Step: Implement a theme toggle that saves the choice in `localStorage` and applies a `data-theme` attribute to `<html>`.

## Learning: WCAG AA (4.5:1 for normal text)

- Category: testing
- Detailed Explanation: WCAG AA requires sufficient color contrast to ensure text is readable for users with low vision. For normal text, a contrast ratio of at least 4.5:1 between text and background is required (large text requires 3:1). This should be verified across themes and color tokens to preserve accessibility.
- Code Example(s):
  - No direct code example found in the current workspace.
- Related Files:
  - custom.css — css/custom.css
  - index.html — index.html
- Actionable Takeaway: Review color tokens in `css/custom.css`, run automated contrast checks (Lighthouse, axe, WebAIM), and adjust theme variables to meet 4.5:1 for normal text.

- Beginner-Friendly Meaning: Contrast ratio measures how different two colors are; higher ratios make text easier to read against its background.
- Deep Understanding: Contrast ratio is calculated from relative luminance: `(L1 + 0.05) / (L2 + 0.05)`. Automated tools detect common failures, but manual checks across devices and themes are recommended. When using CSS variables, verify that all variable combinations used for text/background meet the ratio — dynamic theming can introduce failing pairs if not tested.
- Mini Knowledge Check:
  1. What contrast ratio does WCAG AA require for normal text?
  2. Name two tools you can use to check color contrast.
- Next Learning Step: Run a site-wide audit with Lighthouse or axe, and update `css/custom.css` variables to fix any contrast violations.

## Learning: `DOMContentLoaded` vs `defer` attribute

- Category: programming
- Detailed Explanation: `DOMContentLoaded` is a DOM event that fires when the HTML document has been fully parsed and the DOM tree is ready to be manipulated. The `defer` attribute on an external `<script>` tells the browser to download the script while parsing continues but delay execution until after parsing finishes. Deferred scripts execute in document order and complete before `DOMContentLoaded` fires. Using `defer` or listening for `DOMContentLoaded` ensures your script can safely query and modify DOM elements without causing parser blocking or race conditions.
- Code Example(s):
  - Add a `DOMContentLoaded` listener in `js/scripts.js`:
    ```js
    document.addEventListener("DOMContentLoaded", function () {
      const el = document.getElementById("typingText");
      // safe DOM manipulation here
    });
    ```
  - Use `defer` in `index.html` to load the same script without blocking parsing:
    ```html
    <script src="js/scripts.js" defer></script>
    ```
- Related Files:
  - index.html — index.html
  - scripts.js — js/scripts.js
  - learning-logs.md — .github/docs/learning-logs.md
- Actionable Takeaway: Prefer `defer` for external scripts that need the DOM and require ordered execution; use `DOMContentLoaded` listeners for scripts that may be loaded without `defer` or when you want an explicit readiness callback.

- Beginner-Friendly Meaning: `DOMContentLoaded` is like a signal "the house is built" so workers can start; `defer` is hiring the worker early but telling them to wait until the house is finished before starting.
- Deep Understanding: `defer` improves performance by allowing the browser to continue parsing while downloading scripts; deferred scripts execute in order after parsing, which preserves dependencies. `async` differs by executing as soon as a script finishes downloading (out-of-order). `DOMContentLoaded` fires after parsing and after deferred scripts have executed, so relying on `DOMContentLoaded` guarantees both the DOM and deferred scripts are ready. Edge cases: `defer` only affects external scripts; `defer` on inline scripts is ignored. Inline scripts without `defer` block parsing and may be necessary when critical logic must run early.
- Mini Knowledge Check:
  1. Which attribute (`async` or `defer`) preserves script execution order?
  2. Will a `defer` script run before or after the `DOMContentLoaded` event?
- Next Learning Step: Compare `async` vs `defer` by creating a small test page with multiple scripts and observing execution order and DOM availability.

## Learning: WebP images and `loading="lazy"`

- Category: performance
- Detailed Explanation: WebP is a modern image format that produces smaller file sizes than JPEG/PNG for comparable quality, improving bandwidth and page speed. The `loading="lazy"` attribute defers image downloads until images are close to the viewport, reducing initial network requests and improving first-load performance. Use WebP to reduce image weight and `loading="lazy"` to defer non-critical images; however, provide fallbacks for older clients, serve correct `Content-Type` from the server/CDN, and avoid lazy-loading above-the-fold images (like hero images) to prevent perceived delays.
- Code Example(s):
  - No direct code example found in the current workspace.
  - Suggested snippet (example usage):
    ```html
    <picture>
      <source type="image/webp" srcset="assets/img/perfil.webp" />
      <img
        src="assets/img/perfil.jpg"
        alt="Caio Cabral"
        width="400"
        height="400"
        loading="lazy"
      />
    </picture>
    ```
- Related Files:
  - index.html — index.html
  - learning-logs.md — .github/docs/learning-logs.md
- Actionable Takeaway: Batch-convert large images to WebP, keep JPEG/PNG fallbacks via `<picture>`, avoid `loading="lazy"` on critical above-the-fold images, and include `width`/`height` (or CSS `aspect-ratio`) to prevent layout shifts.

- Beginner-Friendly Meaning: WebP makes images smaller so pages load faster; `loading="lazy"` tells the browser to download images later as the user scrolls.
- Deep Understanding: WebP is an encoded binary format — simply renaming a JPEG to `.webp` does not convert it. Proper conversion requires tooling (e.g., `cwebp`, ImageMagick, or `ffmpeg` for animated images). Browsers choose image formats by checking file contents and `Content-Type` sent by the server; many modern browsers support WebP, but older clients may not, so use `<picture>` or `srcset` to provide fallbacks. `loading="lazy"` is implemented by browsers and uses heuristics (distance to viewport, network conditions); lazy-loading reduces LCP pressure for pages with many images but can delay images that should appear immediately. Also ensure your CDN or server is configured to serve `image/webp` with the correct MIME type.
- Mini Knowledge Check:
  1. When should you avoid `loading="lazy"` on an image?
  2. How do you provide a non-WebP fallback for browsers that don't support WebP?
- Next Learning Step: Convert a copy of `assets/img/perfil.jpg` to WebP, add a `<picture>` fallback in `index.html`, and test in Chrome and Safari (and a non-WebP-supporting browser) to verify behavior.

## Learning: Minimize render-blocking resources (CSS in `head`; JS at end or with `defer`)

- Category: performance
- Detailed Explanation: Place critical CSS in the document `<head>` so the browser can fetch and apply styles before the first paint, avoiding flashes of unstyled content. Load non-critical JavaScript either at the end of the `<body>` or use the `defer` attribute on external scripts so the parser isn't blocked by script downloads/execution. `defer` downloads scripts in parallel while parsing and executes them in order after parsing completes; this preserves execution order without blocking initial rendering. This pattern speeds up first meaningful paint and reduces perceived load time while keeping script behavior predictable.
- Code Example(s):
  - In `index.html`:
    ```html
    <head>
      <link rel="stylesheet" href="css/custom.css" />
    </head>
    <body>
      <!-- content -->
      <script src="js/scripts.js" defer></script>
    </body>
    ```
- Related Files:
  - index.html — index.html
  - custom.css — css/custom.css
  - scripts.js — js/scripts.js
- Actionable Takeaway: Always include critical CSS in the `<head>` (or inline small critical rules) and load DOM-dependent scripts with `defer` or place them before `</body>`; use `async` only for independent third-party scripts.

- Beginner-Friendly Meaning: Put styles first so the page looks correct when it appears; let JavaScript come later so the browser can show the page faster.
- Deep Understanding: Stylesheets are intentionally render-blocking to avoid painting unstyled content. A blocking `<script>` halts HTML parsing until it downloads and runs, which can delay painting and increase Time to First Paint (TTFP). `defer` allows parallel download and delayed execution (after parsing), preserving script order and firing before `DOMContentLoaded`. `async` executes as soon as a script finishes downloading and can run out-of-order, making it unsuitable for scripts that depend on DOM or other scripts. For highly-critical, small CSS needed for first paint, inline those rules and load the full stylesheet asynchronously or via `rel="preload"` followed by `rel="stylesheet"` to lower blocking impact. Consider `preload`/`preconnect` for critical third-party resources and always measure impact with Lighthouse or browser devtools.
- Mini Knowledge Check:
  1. What happens when the browser encounters a normal `<script>` tag during parsing?
  2. When is `async` appropriate compared to `defer`?
- Next Learning Step: Run a Lighthouse performance audit on `index.html`, try adding `defer` to `scripts.js` (or move the tag before `</body>`), and compare metrics (First Contentful Paint, Largest Contentful Paint) before/after the change.

## Learning: Keep third-party CDN dependencies to a minimum

- Category: performance
- Detailed Explanation: Relying on many external CDNs increases the number of external failure points, introduces supply-chain and privacy risks, and can make builds less deterministic. Prefer bundling or self-hosting stable libraries in your repo or using a single well-audited CDN for widely-cached resources. When you do use a CDN, pin versions, add Subresource Integrity (SRI) and `crossorigin`, and provide a local fallback so your site remains usable if the third-party resource becomes unavailable.
- Code Example(s):
  - CDN include (convenient):
    - `<link href="https://cdn.example.com/bootstrap/5.x/bootstrap.min.css" rel="stylesheet">`
  - Self-hosted alternative (recommended):
    - `<link href="css/bootstrap.min.css" rel="stylesheet">`
- Related Files:
  - copilot-instructions.md — .github/copilot-instructions.md
  - index.html — index.html
- Actionable Takeaway: Only use external CDNs for stable, widely-cached libraries; otherwise vendor the dependency into your build (npm + bundler or download into `css/` or `js/`) and pin versions.

- Beginner-Friendly Meaning: Using fewer external CDNs means fewer external services that can fail, making your site more reliable and easier to control.
- Deep Understanding: CDNs improve global caching and reduce origin bandwidth, but each CDN adds an external trust boundary. Risks include downtime, altered/malicious files, privacy leakage through third-party requests, and harder offline reproducibility. Mitigations: pin exact versions, use SRI with `integrity` and `crossorigin` attributes, add a local fallback (check resource availability then load local copy), or move the dependency into your build pipeline (install via npm and bundle/minify with your tooling). Evaluate the trade-off: use CDN when it materially improves performance for your audience and you accept the external dependency; otherwise self-host for determinism and auditability.

- Common Mistakes:
  - Mistake: Adding multiple small CDN-hosted widgets → Fix: Replace with a locally hosted lightweight implementation or bundle the widget.
  - Mistake: Not pinning versions → Fix: Use exact versioned URLs or vendor the file into your repo and update consciously.
  - Mistake: No SRI or fallback → Fix: Add `integrity` + `crossorigin` and provide a local fallback loader.

- Mini Knowledge Check:
  1. Why can many CDNs reduce a site's reliability for end users?
  2. What are two mitigations you can apply if you must use a CDN?

- Next Learning Step: Try converting one CDN dependency to a vendored asset in the repo (download the file into `css/` or `js/`), update `index.html` to use the local copy, and run a Lighthouse audit to compare metrics.
