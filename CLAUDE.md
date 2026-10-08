# Personal Website — justintan.dev

Portfolio site for Hong-Ming Justin Tan (goes by Justin). MS CS at
Northwestern, applied AI/ML focus, targeting startup and
founder-adjacent roles.

## Stack
- Next.js (App Router), TypeScript
- Tailwind CSS
- MDX for project writeups (content/projects/*.mdx)
- Framer Motion, used sparingly for scroll reveals and hover states
- Deployed on Vercel, domain justintan.dev (connect at the end, not now)

## Structure
1. Hero: positioning line, links to resume, GitHub, LinkedIn, email
2. Projects: 2 featured with full MDX writeups, 5 in a compact grid
3. Experience: short timeline
4. Beyond code: violin, travel vlogs, one brief hobby line
5. Contact

## Content rules
- All content lives in content/ or lib/data/, never hardcoded in components
- No "coming soon" sections, no placeholder content, no unbuilt ideas
- Video and social links in a typed data file so a live YouTube feed can
  replace the static array later without touching components
- Nothing goes on the site that Justin can't defend in an interview

## Design
- Readable first, distinctive second. Generous whitespace, strong type
  hierarchy, one accent color
- Motion is subtle: fade and slide on scroll, nothing that delays reading
- Fully responsive, dark mode

## Writing
- No em dashes. Use commas, colons, or separate sentences
- Project writeups: problem, what was built, one hard technical decision,
  result. Prose, not bullet lists
- Scope is stated honestly (team size, guided project, current state).
  Do not upgrade contributions or invent metrics.

## Contact
- Email: tanjustin03@gmail.com
- GitHub: https://github.com/hjtan03
- LinkedIn: https://www.linkedin.com/in/hongmingtan

## Hero line (draft)
MS CS student at Northwestern working on applied AI. I build systems
that turn messy real-world input, video, camera frames, natural
language, into something structured and usable.
