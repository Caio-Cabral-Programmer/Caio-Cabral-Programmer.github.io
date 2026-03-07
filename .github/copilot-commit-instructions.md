# Copilot Commit Message Instructions

> Rules for generating professional, consistent, and expressive Git commit messages
> for the **Caio Cabral Portfolio** project. Every commit message produced by GitHub
> Copilot **must** follow these guidelines.

---

## 1. Format — Conventional Commits

```
<type>(<scope>): <gitmoji> <short description>

[optional body]

[optional footer]
```

### Rules

- **type** — must be one of the allowed types listed in Section 2.
- **scope** — optional; use the affected area in `kebab-case`
  (e.g., `navbar`, `hero`, `theme`, `scripts`, `styles`).
- **gitmoji** — required; pick the most fitting emoji from Section 3.
- **short description** — imperative mood, English, no period at the end,
  max 72 characters total for the subject line.
- **body** — optional; use when the _why_ or _how_ needs explanation.
  Wrap at 72 characters per line.
- **footer** — optional; reference issues / breaking changes.
  e.g., `Closes #12`, `BREAKING CHANGE: removed dark-mode toggle`.

---

## 2. Allowed Types

| Type       | When to use                                                 |
| ---------- | ----------------------------------------------------------- |
| `feat`     | Introduces a new feature or visible UI addition             |
| `fix`      | Fixes a bug or broken behavior                              |
| `style`    | CSS / visual changes with no logic impact                   |
| `refactor` | Code restructure without feature or bug change              |
| `perf`     | Performance improvements (lazy loading, minification, etc.) |
| `a11y`     | Accessibility improvements (aria, contrast, keyboard nav)   |
| `content`  | Updates to copy, images, videos, or portfolio data          |
| `chore`    | Build process, dependency, config, or tooling updates       |
| `docs`     | Documentation changes only (README, comments, instructions) |
| `test`     | Adding or correcting tests (if applicable)                  |
| `revert`   | Reverts a previous commit                                   |
| `ci`       | CI/CD pipeline configuration changes                        |

---

## 3. Gitmoji Reference

| Emoji | Code                      | Meaning                                |
| ----- | ------------------------- | -------------------------------------- |
| ✨    | `:sparkles:`              | New feature                            |
| 🐛    | `:bug:`                   | Bug fix                                |
| 💄    | `:lipstick:`              | UI / styling update                    |
| ♻️    | `:recycle:`               | Refactor                               |
| ⚡️    | `:zap:`                   | Performance improvement                |
| ♿️    | `:wheelchair:`            | Accessibility improvement              |
| 📝    | `:memo:`                  | Documentation update                   |
| 🔧    | `:wrench:`                | Config / tooling change                |
| 🗑️    | `:wastebasket:`           | Remove code or files                   |
| 🎨    | `:art:`                   | Improve code structure / formatting    |
| 🔥    | `:fire:`                  | Remove feature or dead code            |
| 🚀    | `:rocket:`                | Deploy or release                      |
| 🌐    | `:globe_with_meridians:`  | Internationalization / language update |
| 🖼️    | `:frame_with_picture:`    | Add or update images / media           |
| 🎉    | `:tada:`                  | Initial commit or major milestone      |
| 🔒    | `:lock:`                  | Security fix                           |
| 📦    | `:package:`               | Add or update dependencies             |
| ⏪    | `:rewind:`                | Revert changes                         |
| 🚑    | `:ambulance:`             | Critical hotfix                        |
| 💡    | `:bulb:`                  | Add or update comments / ideas         |
| 🏗️    | `:building_construction:` | Architectural change                   |
| 📱    | `:iphone:`                | Responsive / mobile improvement        |
| 🌙    | `:crescent_moon:`         | Dark mode / theme feature              |
| 🎭    | `:performing_arts:`       | Theme switcher / multi-theme feature   |

---

## 4. Practical Examples

```
feat(hero): :sparkles: Add animated typing effect to hero section

fix(navbar): :bug: Correct scroll offset causing sections to be hidden behind navbar

style(theme): :lipstick: Update teal theme accent colors to improve contrast

refactor(scripts): :recycle: Extract theme persistence logic into ThemeSwitcher class

perf(assets): :zap: Convert hero background to WebP and add lazy loading

a11y(nav): :wheelchair: Add aria-label to hamburger menu button

content(projects): :frame_with_picture: Add screenshot and description for new project card

chore(deps): :package: Upgrade Bootstrap CDN link to 5.3.3

docs(readme): :memo: Add project structure and local setup instructions

revert: :rewind: Revert "feat(hero): Add video background" — causes layout shift

feat(theme): :performing_arts: Add orange and green theme variants with localStorage persistence
```

---

## 5. Writing the Body (when needed)

Use the body to explain **why** the change was made, not what — the diff
already shows what changed.

```
fix(navbar): :bug: Prevent navbar from overlapping section headings on scroll

The sticky navbar has a height of 70px, but scroll-margin-top was not
applied to sections. Added `scroll-margin-top: var(--navbar-height)` to
all [section] elements so anchor links land at the correct position.

Closes #8
```

---

## 6. Breaking Changes

If a commit introduces a breaking change, add a `BREAKING CHANGE:` footer:

```
refactor(theme): :art: Rename CSS custom property --accent to --accent-color

BREAKING CHANGE: Any external stylesheet referencing --accent will break.
Update all occurrences to --accent-color.
```

---

## 7. Quick Checklist

Before confirming a commit message, verify:

- [ ] Type is from the allowed list
- [ ] Scope (if used) is in `kebab-case` and reflects the affected area
- [ ] Gitmoji is present and matches the intent
- [ ] Subject line is in English, imperative mood, ≤ 72 characters, no trailing period
- [ ] Body (if present) explains _why_, not _what_
- [ ] Footer references issues or breaking changes if applicable
- [ ] No sensitive data, credentials, or secrets are referenced
