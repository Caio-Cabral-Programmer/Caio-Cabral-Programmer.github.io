---
name: how-must-you-explain-something-to-me
description: Explain any requested topic in a super clear, didactic, beginner-friendly, and deep way, with practical examples, progressive difficulty, and verification prompts to ensure full understanding.
---

# Explanation Skill

## Purpose

Use this skill when the user asks for an explanation and wants to learn deeply, clearly, and step by step.

The explanation must work for:

- Beginners with little or no programming background
- Learners who want a complete and deep understanding
- Practical learners who need examples and real application

## When To Use

Activate this skill when requests include ideas like:

- "explain this"
- "teach me"
- "I am a beginner"
- "explain in detail"
- "I want to understand deeply"
- "explain with examples"
- "What is this or how does it work?"
- "What is this selected code?"

## Core Teaching Principles

1. **Clarity First**
   - Use simple and direct language.
   - Define every technical term before using it heavily.

2. **Progressive Depth**
   - Start with the basic intuition.
   - Then move to mechanics, edge cases, and advanced notes.

3. **Concrete Examples**
   - Use practical examples in each explanation.
   - Prefer examples from the current codebase when available.

4. **Why + How + When**
   - Explain why the concept matters.
   - Explain how it works.
   - Explain when to apply it and when to avoid it.

5. **Active Learning Support**
   - Include quick checks/questions the learner can answer.
   - Include common mistakes and how to avoid them.

## Required Explanation Structure

Every explanation MUST contain all sections below:

1. **Simple Definition**
   - One short beginner-friendly definition.

2. **Intuition (Mental Model)**
   - A plain-language analogy or mental model.

3. **Step-by-Step Breakdown**
   - Ordered steps showing exactly what happens.

4. **Practical Example(s)**
   - At least one practical example.
   - If code exists in the workspace, include a real code example.

5. **Deep Dive**
   - Important details: trade-offs, edge cases, and internal behavior.

6. **Common Mistakes**
   - List typical beginner mistakes and corrections.

7. **Mini Knowledge Check**
   - 2 to 4 short questions (or self-check prompts).

8. **Next Learning Step**
   - One focused next topic to study.

## Code-Example Rules

- Prefer examples from current project files whenever possible.
- If no relevant code exists, clearly state:
  - `No direct code example found in the current workspace.`
- Keep examples short and purposeful.
- Explain each line/group of lines in plain language.

## Depth Levels

Use one of these levels depending on the request:

- **Level 1 (Quick):** definition + one example.
- **Level 2 (Standard):** full structure with short deep dive.
- **Level 3 (Deep):** full structure + advanced trade-offs + extra examples.

If the user asks for "very detailed", "100%", "deep", or "beginner and advanced", default to **Level 3**.

## Output Template

Use this template for explanations:

```markdown
## Topic: <name>

### 1) Simple Definition

<short beginner-friendly definition>

### 2) Intuition (Mental Model)

<analogy or intuitive explanation>

### 3) Step-by-Step Breakdown

1. <step>
2. <step>
3. <step>

### 4) Practical Example(s)

- Example 1: <short scenario>
- Code example (if available):
```

  <code snippet>
  ```
- Explanation of the code:
  - <what this part does>
  - <what this part does>

### 5) Deep Dive

- <trade-off>
- <edge case>
- <performance/readability/maintainability note>

### 6) Common Mistakes

- Mistake: <incorrect approach> → Fix: <correct approach>
- Mistake: <incorrect approach> → Fix: <correct approach>

### 7) Mini Knowledge Check

1. <short check question>
2. <short check question>

### 8) Next Learning Step

<one concrete next study/practice action>

````

## Quality Checklist

Before finishing, confirm:

- The explanation is understandable for a beginner.
- The explanation also includes deep technical insight.
- Examples are practical and clearly explained.
- Jargon is defined or simplified.
- The user can apply the concept after reading.

## Good Explanation Snapshot

```markdown
Topic: Event Delegation in JavaScript

- Simple Definition: Event delegation is attaching one listener to a parent element to handle events from its children.
- Intuition: Instead of hiring one guard per room, you place one guard at the building entrance and check who came out.
- Practical Example: Handle clicks for many dynamic buttons by listening on their container.
- Deep Dive: Reduces listener count, works well with dynamic DOM, but requires careful target matching.
- Common Mistake: Using `event.target` without checking if it matches the expected selector.
````
Always inform in the chat when this skill was used to perform a task.