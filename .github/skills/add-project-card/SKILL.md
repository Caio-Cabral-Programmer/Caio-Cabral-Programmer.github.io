# Skill: Add New Project Card

## Purpose

Add a new project card (with its modal) to the Projects section in `index.html`.

---

## When to Use This Skill

Invoke this skill whenever the user asks to:

- Add a new personal project to the portfolio
- Create a project card for a new technology (C#, Java, React, Angular, etc.)
- Add project information to the Projects section

---

## Projects Section Structure

The Projects section is located in `index.html` inside:

```html
<section class="section-padding bg-darker" id="projects">
  <div class="container">
    ...
    <div class="row g-4" id="projectsGrid">
      <!-- C# Projects -->
      <!-- [C# cards go here] -->

      <!-- Java Projects -->
      <!-- [Java cards go here] -->

      <!-- React Projects -->
      <!-- [React cards go here] -->

      <!-- Angular Projects -->
      <!-- [Angular cards go here] -->
    </div>
  </div>
</section>
```

**Important:** Modals are placed immediately after their corresponding card, inside the same `#projectsGrid` row.

---

## Filter Button Categories

The filter buttons map to `data-category` values on each `.projects-card`:

| Button label | `data-filter` / `data-category` value |
| ------------ | ------------------------------------- |
| All          | `all` (special — shows all)           |
| C#           | `csharp`                              |
| Java         | `java`                                |
| React        | `react`                               |
| Angular      | `angular`                             |

If adding a new technology category, also add a filter button:

```html
<button class="btn btn-filter" data-filter="<new-category>">Label</button>
```

---

## Card Template

```html
<!-- [Tech] Projects -->
<div
  class="col-md-6 col-lg-4 projects-card"
  data-category="<category>"
  data-aos="fade-up"
  data-aos-delay="<100|200|300|400>"
>
  <div
    class="project-card"
    data-bs-toggle="modal"
    data-bs-target="#<uniqueModalId>"
  >
    <div class="project-image">
      <div
        class="project-image-icon d-flex align-items-center justify-content-center h-100"
      >
        <i
          class="<font-awesome-icon-class>"
          style="font-size: 5rem; color: var(--accent); opacity: 0.6"
        ></i>
      </div>
      <div class="project-overlay">
        <i class="fas fa-search-plus fa-2x"></i>
      </div>
    </div>
    <div class="project-info">
      <span class="project-tech">Tech 1 | Tech 2 | Tech 3</span>
      <h3 class="project-name">Project Name</h3>
      <p class="project-desc">Short one-line description of the project</p>
    </div>
  </div>
</div>
```

**Rules:**

- `data-category` must match one of the filter values in the table above.
- `data-bs-target` must be unique across the page (e.g., `#csharpProjectModal2`).
- `data-aos-delay`: increment by 100 for each card within the same row (100, 200, 300…).
- Icon: use Font Awesome free icons. Prefer brand icons (`fab`) when available (e.g., `fab fa-react`, `fab fa-angular`, `fab fa-java`, `fab fa-microsoft`).
- Never use inline `style` for layout — only for overriding icon color/size as shown.

---

## Modal Template

Place the modal immediately after the card, still inside `#projectsGrid`:

```html
<!-- [Tech] Project Modal [N] -->
<div
  class="modal fade"
  id="<uniqueModalId>"
  tabindex="-1"
  aria-labelledby="<uniqueModalId>Label"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content bg-dark border-0">
      <div class="modal-header border-0">
        <h5 class="modal-title fw-bold" id="<uniqueModalId>Label">
          Project Name
        </h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body text-start">
        <div
          class="p-4 mb-4 rounded text-center"
          style="background: var(--bg-card)"
        >
          <i
            class="<font-awesome-icon-class> mb-3"
            style="font-size: 4rem; color: var(--accent)"
          ></i>
        </div>
        <p class="text-muted">
          Full description of the project (2–4 sentences).
        </p>
        <ul class="project-features">
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
          <!-- Add as many bullet points as needed -->
        </ul>
        <div class="mt-3">
          <!-- Tech badges - use org-tech-badge class -->
          <span class="org-tech-badge me-1"
            ><i class="<icon> me-1"></i>Badge Label</span
          >
          <!-- Last badge has no me-1 margin class -->
          <span class="org-tech-badge"
            ><i class="<icon> me-1"></i>Last Badge</span
          >
        </div>
      </div>
      <div class="modal-footer border-0 justify-content-center">
        <a
          href="<github-url>"
          target="_blank"
          rel="noopener"
          class="btn btn-accent"
          ><i class="fas fa-external-link-alt me-2"></i>Ver no GitHub</a
        >
      </div>
    </div>
  </div>
</div>
```

**Rules:**

- The `id` on the modal and the `aria-labelledby`/`id` on `<h5>` must match: id is `<uniqueModalId>`, label is `<uniqueModalId>Label`.
- `modal-content` uses `bg-dark border-0`.
- `modal-header` and `modal-footer` use `border-0`.
- The icon in the modal header area uses `font-size: 4rem` (card uses `5rem`).
- All external links must have `target="_blank"` and `rel="noopener"`.
- Badge icons: prefer `fab` brand icons; acceptable fallbacks are `fas fa-database`, `fas fa-leaf`, `fas fa-book`, `fas fa-cloud`, `fas fa-check-circle`, `fas fa-language`, `fas fa-server`.

---

## ID Naming Convention

Modal IDs follow this pattern: `<category>ProjectModal<N>` in `camelCase`.

| Category | Example IDs                                    |
| -------- | ---------------------------------------------- |
| C#       | `csharpProjectModal1`, `csharpProjectModal2`   |
| Java     | `javaProjectModal1`, `javaProjectModal2`       |
| React    | `reactProjectModal1`, `reactProjectModal2`     |
| Angular  | `angularProjectModal1`, `angularProjectModal2` |

---

## Recommended Icon Map

| Technology               | Icon class            |
| ------------------------ | --------------------- |
| React                    | `fab fa-react`        |
| Angular                  | `fab fa-angular`      |
| Java / Spring Boot       | `fab fa-java`         |
| .NET / ASP.NET / C#      | `fab fa-microsoft`    |
| Node.js                  | `fab fa-node-js`      |
| Python                   | `fab fa-python`       |
| Database (generic)       | `fas fa-database`     |
| Spring Boot (badge only) | `fas fa-leaf`         |
| Swagger / Docs           | `fas fa-book`         |
| Cloud / Railway          | `fas fa-cloud`        |
| Validation               | `fas fa-check-circle` |
| TypeScript               | `fas fa-language`     |
| Serilog / Logging        | `fas fa-scroll`       |

---

## Checklist Before Committing

- [ ] `data-category` uses a valid filter value
- [ ] `data-bs-target` and modal `id` match exactly
- [ ] Modal `aria-labelledby` matches the `<h5>` `id`
- [ ] No duplicate modal IDs anywhere in the page
- [ ] All external links have `target="_blank" rel="noopener"`
- [ ] Card and modal use the same icon class
- [ ] Tech stack string on the card matches the badges in the modal
- [ ] `aos-delay` values are incremented for cards in the same category block
