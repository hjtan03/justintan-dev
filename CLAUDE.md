# Personal Website — justintan.dev

Portfolio site for Hong-Ming Justin Tan (goes by Justin). MS CS at
Northwestern, graduating December 2026, looking for full-time software
engineering work from January 2027. Applied AI/ML focus.

Design intent (color, type, spacing, motion, links, what the site does
not do) lives in DESIGN.md. Read it before changing how anything looks.

## Stack
- Next.js (App Router), TypeScript
- Tailwind CSS v4, tokens in app/globals.css
- MDX for project writeups (content/projects/*.mdx)
- Motion is CSS only; no animation library
- Deployed on Vercel, domain justintan.dev (connect at the end, not now)

## Structure
1. Hero: positioning line, availability line, links to resume, GitHub,
   LinkedIn, email
2. Projects: 2 featured with full MDX writeups, then a grid in two
   groups driven by data: selected work (full entries) and earlier work
   (dense list)
3. Experience: short timeline
4. Beyond code: violin, travel vlogs, one brief hobby line
5. Contact

## Content rules
- All content lives in content/ or lib/data/, never hardcoded in components
- Site-level strings (name, hero line, availability, nav) are in
  lib/data/site.ts; the social card reads from there too
- No "coming soon" sections, no placeholder content, no unbuilt ideas
- Video and social links in a typed data file so a live YouTube feed can
  replace the static array later without touching components
- Images go in public/images/ and render through components/Figure.tsx
- Nothing goes on the site that Justin can't defend in an interview

## Writing
- No em dashes. Use commas, colons, or separate sentences
- Typographic punctuation in content: curly quotes and apostrophes, en
  dashes in ranges
- Project writeups: problem, what was built, one hard technical decision,
  result. Prose, not bullet lists
- Scope is stated honestly (team size, guided project, current state).
  Do not upgrade contributions or invent metrics.

## Conventions
- One commit per logical change, Conventional Commits, body says why
- Work on a branch, not main
- After a change: `npm run build`, then check both themes at 390px and
  1440px

## Contact
- Email: tanjustin03@gmail.com
- GitHub: https://github.com/hjtan03
- LinkedIn: https://www.linkedin.com/in/hongmingtan
