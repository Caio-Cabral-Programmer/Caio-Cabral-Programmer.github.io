---
name: learning-log
description: Create a conversation-based learning log that captures new learnings (code, programming, syntax, business context), includes detailed explanations, real examples from the current codebase when available, and always lists related file names with full file paths.
---

# Learning Log Skill

## Purpose

Use this skill when the user asks to create a **learning log** from the current conversation, explanation, or implementation work. Create that log in ".github\docs\learning-logs.md".

This skill must produce a structured record of **new learnings** such as:

- Code patterns and architecture decisions
- Programming concepts and language syntax
- Bug fixes and root-cause analysis
- Tooling/build/testing workflows
- Product/business rules that affect implementation

## When To Use

Use this skill when prompts include ideas like:

- "create a learning log"
- "summarize what was learned"
- "document learnings from this conversation"
- "register what I learned"
- "save key technical/business insights"

## Required Output Rules

Every learning-log entry MUST include all fields below:

1. **Learning Title**
   - Short and specific.

2. **Category**
   - One of: `code`, `programming`, `syntax`, `business`, `architecture`, `debugging`, `performance`, `testing`, `workflow`.

3. **Detailed Explanation**
   - Explain what was learned, why it matters, and when to apply it.
   - Include practical context from the conversation.
   - Prefer clear technical reasoning over generic summaries.

4. **Code Example(s) From Project (if available)**
   - Include at least one concrete example taken from existing code when relevant.
   - If there is no matching code example, explicitly write: `No direct code example found in the current workspace.`
   - Keep snippets concise and focused.

5. **Related Files**
   - Always list the related file name(s) and file path(s).
   - Use explicit path format (workspace-relative or absolute).
   - If multiple files are relevant, list all of them.

6. **Actionable Takeaway**
   - One clear next-step habit/rule the user can reuse.

## Explanation Mode (Beginner + Deep)

When the user requests a learning log based on an explanation (or explicitly asks for a very clear/didactic/deep explanation), each learning entry must additionally follow this teaching standard:

1. **Explain for Beginners First**
   - Start with plain-language meaning.
   - Define technical terms.

2. **Then Expand to Deep Understanding**
   - Add internal mechanics, trade-offs, and edge cases.
   - Clarify why the concept matters in real projects.

3. **Use Practical Examples**
   - Include examples from current code when available.
   - If unavailable, state explicitly: `No direct code example found in the current workspace.`

4. **Add a Mini Knowledge Check**
   - Include 2 short questions to validate understanding.

5. **Add a Next Step**
   - Suggest one concrete follow-up topic or exercise.

## Evidence & Accuracy Rules

- Only include learnings supported by the current conversation and/or repository context.
- Do not invent examples, files, or business rules.
- If uncertain, mark assumptions explicitly.
- Prioritize **new** learnings over obvious restatements.

## Suggested Process

1. Review the conversation and identify candidate learnings.
2. Validate each learning against code/context.
3. Collect file names and paths tied to each learning.
4. Draft entries using the required structure.
5. Ensure each entry has a detailed explanation and practical takeaway.

## Output Template

Use this template for each item:

```markdown
## Learning: <specific title>

- Category: <code|programming|syntax|business|architecture|debugging|performance|testing|workflow>
- Detailed Explanation: <clear explanation of what was learned, why it matters, and where to apply>
- Code Example(s):
  - <short snippet or reference from the project>
  - <optional second example>
- Related Files:
  - <file name> — <file path>
  - <file name> — <file path>
- Actionable Takeaway: <one concrete habit/rule>
```

When explanation mode is requested, extend each item with:

```markdown
- Beginner-Friendly Meaning: <simple plain-language explanation>
- Deep Understanding: <internal behavior, trade-offs, edge cases>
- Mini Knowledge Check:
  1.  <short question>
  2.  <short question>
- Next Learning Step: <one focused next topic or exercise>
```

## Good Entry Example

```markdown
## Learning: Cache repeated DOM queries to reduce unnecessary lookups

- Category: programming
- Detailed Explanation: Re-querying the same DOM elements inside multiple handlers increases maintenance cost and can hurt readability/performance. Caching those elements once during initialization keeps event handlers simpler and avoids repeated selectors.
- Code Example(s):
  - `const navbarElement = document.querySelector('#mainNav');`
  - `const navLinks = document.querySelectorAll('.nav-link');`
- Related Files:
  - scripts.js — js/scripts.js
- Actionable Takeaway: When a selector is used more than once, cache it in a descriptive constant during startup.
```

## Good Entry Example (Explanation Mode)

```markdown
## Learning: Why event delegation scales better for dynamic lists

- Category: programming
- Detailed Explanation: Event delegation attaches a single listener to a parent element and handles child interactions by checking the event target. This keeps code simpler when items are created dynamically and avoids attaching many individual listeners.
- Code Example(s):
  - `listElement.addEventListener('click', handleListClick);`
  - `if (!event.target.matches('.remove-item-btn')) return;`
- Related Files:
  - scripts.js — js/scripts.js
- Actionable Takeaway: Prefer a parent-level listener for repeated or dynamic child elements.
- Beginner-Friendly Meaning: One listener on the container can manage clicks from all current and future child buttons.
- Deep Understanding: This pattern improves maintainability and can reduce memory overhead, but requires precise target filtering to avoid handling unrelated clicks.
- Mini Knowledge Check:
  1.  Why does event delegation work well with elements added after initial page load?
  2.  What can go wrong if target filtering is not strict?
- Next Learning Step: Practice writing a delegated handler for add/remove actions in a dynamic to-do list.
```

## Completion Checklist

Before finishing, confirm:

- The log contains truly new learnings.
- Each learning has a detailed explanation.
- Code examples are included when available.
- Related files include file names and paths.
- Explanation mode fields are present when requested.
- No fabricated details were added.

Always inform in the chat when this skill was used to perform a task.
