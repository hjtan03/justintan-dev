# Design system, justintan.dev

The reference for how the site looks and moves. CLAUDE.md holds
structure and content rules; this file holds the visual decisions, so a
change can be checked against intent without reading the stylesheet.
Everything here is implemented in `app/globals.css` unless a path says
otherwise.

## Direction

Readable first, distinctive second. An editorial page: one serif for
reading, one sans for labels and headings, one accent, a margin column
for quiet metadata, generous but structured whitespace. Nothing on the
page competes with the text.

## Color

All tokens are `oklch()` in the Tailwind `@theme` block, with dark values
overriding on `:root` under `prefers-color-scheme: dark`. Every neutral
shares one warm hue (85) at chroma 0.004 to 0.012, so the page reads warm
without the grey being nameable. Nothing is pure `#000` or `#fff`.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--color-bg` | page background | 98.5% L | 19% L |
| `--color-rule` | hairlines, separators, image borders | 90% L | 30% L |
| `--color-ring` | focus ring (same as accent) | accent | derived accent |
| `--color-accent` | links at rest, active nav, hero rule | `oklch(42% 0.14 262)` | seed +0.24 L, +0.01 C |
| `--color-text-muted` | metadata, margin labels, captions, secondary text | 50% L | 68% L |
| `--color-text` | body copy | 30% L | 84% L |
| `--color-text-strong` | headings | 17% L | 95% L |
| `--color-selection` | `::selection` background | 90% L, chroma 0.045 at hue 262 | 36% L |

The three text steps are deliberately far apart; that gap is the main
thing that keeps the page from reading flat. The dark accent is derived
from the light seed with relative color syntax rather than a second hex,
because `l + 0.08` only reached 3.0:1 on the dark background. Every
text-on-background pair clears 4.5:1 in both themes; the lowest is muted
text at 5.7:1 light and 6.4:1 dark.

The one place color appears at size is the hero rule. The accent is
otherwise reserved for links and the current nav item. Semantic colors
(success, warning) do not exist on this site.

## Type

Newsreader (variable, `wght` and `opsz`, from `next/font/google`) for
everything meant to be read. Instrument Sans (variable, `wdth` and
`wght`, self-hosted from the upstream release so its stylistic sets and
width axis are available) for headings, labels, navigation and
captions. Optical size is set explicitly: `"opsz" 18` for body,
`"opsz" 28` for the two ledes. No stylistic set is applied.

| Step | Size | Leading | Used for |
|---|---|---|---|
| display | `clamp(4.25rem, 13vw, 9rem)` | 0.95 | hero name (sans, 600) |
| page-title | `clamp(2.25rem, 5vw, 3.25rem)` | 1.08 | writeup title (sans, 600) |
| feature | 2rem | 1.1 | featured project titles (sans, 600, accent) |
| lede | 1.35rem | 1.45 | hero lede and writeup summary (serif italic) |
| body | 1.125rem | 1.65 | running text, availability line (serif) |
| entry | 1.125rem | 1.3 | grid entry titles (sans, 600) |
| compact | 0.9375rem | 1.55 | earlier-work entries, link rows (serif or sans) |
| meta | 0.875rem | 1.5 | margin column, captions, stacks, nav (sans) |

Headings and ledes use `text-wrap: balance`; paragraphs use `pretty`.
Dates and any aligned digits use `tabular-nums`; prose keeps proportional
figures. Punctuation in content is typographic: curly quotes and
apostrophes, en dashes in ranges, no em dashes anywhere, no `--`, no
three-dot ellipsis.

Fallback: a hand-written `Newsreader Fallback` face maps Georgia to
Newsreader's metrics (size-adjust 91.52%, ascent 80.31%, descent
28.95%) so the page barely reflows when the webfont lands. Instrument
Sans falls back to Arial through `next/font`'s own metrics.

## Layout

One container, 53rem wide with 1.5rem side padding. Above 900px each
row is a two-column grid: a 10rem margin column for labels, roles and
dates, a 3rem gap, then a 40rem main column for everything that is
read. Below 900px the margin content stacks above its main content.

Margin labels align to the cap height of the main column's first line
through `text-box-trim: trim-start` on both sides. Browsers without it
fall back to a per-row `--aside-offset`.

## Spacing

Outer is always at least inner, measured from the last baseline to the
next cap height rather than box to box. Every value is a multiple of
0.25rem.

| Relationship | Box value | Optical, roughly |
|---|---|---|
| heading to its own body | 0.25 to 0.5rem | 20 to 26px |
| body to the item's own links or stack | 0.25 to 0.5rem | 18 to 30px |
| between records (grid, experience) | 2.5rem total, with a hairline | 54px |
| between featured projects | 4rem | 76px |
| between groups (Work and Education, selected and earlier) | 5rem | 94px |
| between sections | 8rem (6rem below 900px) | 140px |

The hero's minimum height tracks the viewport (capped at 52rem) and its
top padding yields on short screens, so the first project title always
straddles the fold. There is no scroll cue.

## Motion

Three things move, nothing else.

1. The hero sequence on load: name rises (480ms), rule draws (500ms,
   from 420ms), then lede, availability and links fade together (360ms,
   from 760ms).
2. The IDX request-flow diagram traces its arrows once when it scrolls
   into view on the writeup page. The home page shows it static.
3. The header name fades and lifts in once the hero name has scrolled
   under the header (opacity and transform only).

No property named `color` ever transitions, so a theme change is
instant. No hover state changes font weight. `prefers-reduced-motion`
removes all three sequences.

## Links and focus

Default link: underline in `currentColor`, thickness `max(1px, 0.08em)`,
offset 0.2em, skip-ink. Links inside headings use `max(1px, 0.12em)`.
These defaults are `:where()` rules so component classes override them
without `!important`.

- Running text (`.text-link`, `.prose a`): inherit color, underline at
  rest, accent on hover.
- Standalone links (`.nav-link`): accent, sans, 500, no underline at
  rest, underline on hover.
- Featured titles (`.title-link`): accent, underline on hover and focus.
- Header nav: muted, accent when current or hovered.

Hover rules sit behind `@media (hover: hover)`. Focus is
`:focus-visible` with a two-layer box-shadow (2px page color, then 2px
ring) and a transparent outline for forced-colors mode.

## Images and media

Screenshots go through `components/Figure.tsx`: a 1px `--color-rule`
border, 3px radius, caption in meta size below. Landscape images span
the main column; phone screenshots are capped at 20rem and sit side by
side in a `.figure-row` only when two belong together. No drawn browser
chrome or phone frames. Video embeds are a poster and a play control;
the player loads on request.

## Sharing surfaces

The Open Graph and Twitter card (`app/opengraph-image.tsx`) renders the
name, the hero line and the domain in the site's own faces on the light
palette. The favicon is a "JT" monogram traced from Instrument Sans
that inverts with the browser's color scheme; the Apple touch icon is
the monogram on the accent.

## What the site does not do

- No pure black or white, in either theme.
- No second accent, no gradients, no shadows except the focus ring.
- No font-weight change on hover or active state.
- No color transitions; theme switching never animates.
- No scroll-cue arrows or chevrons.
- No carousel, gallery, lightbox, or drawn device frames.
- No live third-party embeds on load.
- No em dashes, straight quotes, or `...` in content.
- No "coming soon", placeholders, or unbuilt ideas.
