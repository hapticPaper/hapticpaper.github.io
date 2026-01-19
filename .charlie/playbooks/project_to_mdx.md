# Playbook: Project → MDX

Goal: take a project (repo or live site) and produce a **single** new file under `content/projects/` that fits this site's MDX pattern.

## Inputs

Ask for (or infer when obvious):

- **Title**
- **Live URL** (optional)
- **Repo URL** (optional)
- **One-sentence blurb** (what it is)
- **3–6 tags** (short, human-friendly)
- **2–4 highlights** (what makes it cool)
- **Anything notable** (design choices, tech stack, constraints)

If you have access to the repo/site content, quickly scan it to avoid guessing.

## Output

Create a new MDX file:

`content/projects/<slug>.mdx`

Where `<slug>` is kebab-case or snake_case matching how the repo/site is named (keep it simple; don’t over-normalize).

### Required frontmatter

```yaml
---
title: "..."
blurb: "..."
url: "https://..." # optional
repo: "https://..." # optional
tags:
  - "Tag"
  - "Tag"
---
```

### Body structure

Write a short, high-signal description that reads well on a portfolio site:

1. 1–2 paragraph intro (what it is, what problem it solves)
2. `## Why it’s cool`
   - 2–4 bullets focusing on the *why*, not a changelog
3. Optional: a callout when useful

```mdx
<Callout variant="note" title="...">

...

</Callout>
```

## Style guidelines

- Keep it concise (aim for ~150–300 words).
- Prefer concrete language over hype.
- Avoid clichés.
- Don’t claim results/metrics you can’t verify.
