"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IDX Exchange request flow.
 *
 * Inline SVG so it adapts to light and dark themes, stays crisp at any
 * size, and ships no image bytes. Colors come from the site's tokens
 * with hardcoded fallbacks — rename the custom properties below if
 * yours differ.
 *
 * On scroll into view it traces the request lifecycle once, in order:
 * request, query text, filters, query, rows, response. That sequence is
 * the point of the diagram, so the animation is informational rather
 * than decorative. It runs once and never repeats.
 *
 * Pass animate={false} for the static version (home page featured
 * block). Under prefers-reduced-motion it renders complete immediately.
 */

type Props = {
  animate?: boolean;
  className?: string;
};

export function IdxArchitecture({ animate = true, className }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(!animate);

  useEffect(() => {
    if (!animate || shown) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, shown]);

  return (
    <figure className={className} style={{ margin: 0 }}>
      <svg
        ref={ref}
        viewBox="0 0 660 430"
        role="img"
        aria-labelledby="idx-arch-title idx-arch-desc"
        className={`idx-arch${shown ? " is-shown" : ""}`}
      >
        <title id="idx-arch-title">IDX Exchange request flow</title>
        <desc id="idx-arch-desc">
          The React frontend sends a request to the Express API. For
          natural language search the API sends the query text to Claude
          and receives structured filters back. The API then queries
          MySQL directly and returns rows to the browser. Claude never
          touches the database.
        </desc>

        <defs>
          <marker
            id="idx-arrow"
            viewBox="0 0 8 8"
            refX="4"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 6 4 L 0 7 z" className="idx-arrow-head" />
          </marker>
        </defs>

        {/* Nodes */}
        <g className="idx-node" style={{ "--i": 0 } as React.CSSProperties}>
          <rect x="30" y="18" width="250" height="66" rx="6" />
          <text x="155" y="45" className="idx-node-title">
            Browser
          </text>
          <text x="155" y="66" className="idx-node-sub">
            React frontend
          </text>
        </g>

        <g className="idx-node" style={{ "--i": 1 } as React.CSSProperties}>
          <rect x="30" y="182" width="250" height="66" rx="6" />
          <text x="155" y="209" className="idx-node-title">
            Express API
          </text>
          <text x="155" y="230" className="idx-node-sub">
            Node.js backend
          </text>
        </g>

        <g
          className="idx-node idx-node--accent"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <rect x="400" y="182" width="220" height="66" rx="6" />
          <text x="510" y="209" className="idx-node-title">
            Claude API
          </text>
          <text x="510" y="230" className="idx-node-sub">
            filter extraction only
          </text>
        </g>

        <g className="idx-node" style={{ "--i": 3 } as React.CSSProperties}>
          <rect x="30" y="346" width="250" height="66" rx="6" />
          <text x="155" y="373" className="idx-node-title">
            MySQL
          </text>
          <text x="155" y="394" className="idx-node-sub">
            property and open house data
          </text>
        </g>

        {/* Flow, in request order */}
        <g className="idx-flow" style={{ "--i": 0 } as React.CSSProperties}>
          <path d="M 110 88 L 110 176" pathLength={1} markerEnd="url(#idx-arrow)" />
          <text x="102" y="140" className="idx-label idx-label--end">
            request
          </text>
        </g>

        <g className="idx-flow" style={{ "--i": 1 } as React.CSSProperties}>
          <path d="M 284 205 L 392 205" pathLength={1} markerEnd="url(#idx-arrow)" />
          <text x="338" y="196" className="idx-label idx-label--mid">
            query text
          </text>
        </g>

        <g className="idx-flow" style={{ "--i": 2 } as React.CSSProperties}>
          <path d="M 396 232 L 288 232" pathLength={1} markerEnd="url(#idx-arrow)" />
          <text x="342" y="251" className="idx-label idx-label--mid">
            filters
          </text>
        </g>

        <g className="idx-flow" style={{ "--i": 3 } as React.CSSProperties}>
          <path d="M 110 252 L 110 340" pathLength={1} markerEnd="url(#idx-arrow)" />
          <text x="102" y="304" className="idx-label idx-label--end">
            query
          </text>
        </g>

        <g className="idx-flow" style={{ "--i": 4 } as React.CSSProperties}>
          <path d="M 200 342 L 200 254" pathLength={1} markerEnd="url(#idx-arrow)" />
          <text x="208" y="304" className="idx-label idx-label--start">
            rows
          </text>
        </g>

        <g className="idx-flow" style={{ "--i": 5 } as React.CSSProperties}>
          <path d="M 200 178 L 200 90" pathLength={1} markerEnd="url(#idx-arrow)" />
          <text x="208" y="140" className="idx-label idx-label--start">
            response
          </text>
        </g>
      </svg>

      <style>{`
        .idx-arch {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
          font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
        }

        .idx-arch rect {
          fill: none;
          stroke: var(--color-rule, #E4E3DE);
          stroke-width: 1.25;
        }

        .idx-node--accent rect {
          stroke: var(--color-accent, #15418C);
        }

        .idx-node-title {
          fill: var(--color-text, #1A1A18);
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-anchor: middle;
        }

        .idx-node--accent .idx-node-title {
          fill: var(--color-accent, #15418C);
        }

        .idx-node-sub {
          fill: var(--color-muted, #6B6B66);
          font-size: 12.5px;
          text-anchor: middle;
        }

        .idx-flow path {
          fill: none;
          stroke: var(--color-muted, #6B6B66);
          stroke-width: 1.25;
        }

        .idx-arrow-head {
          fill: var(--color-muted, #6B6B66);
        }

        .idx-label {
          fill: var(--color-muted, #6B6B66);
          font-size: 12.5px;
        }
        .idx-label--end   { text-anchor: end; }
        .idx-label--start { text-anchor: start; }
        .idx-label--mid   { text-anchor: middle; }

        /* Resting state before reveal */
        .idx-arch .idx-node,
        .idx-arch .idx-flow text,
        .idx-arch .idx-flow path {
          opacity: 0;
        }
        .idx-arch .idx-flow path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }

        /* Revealed */
        .idx-arch.is-shown .idx-node {
          opacity: 1;
          transition: opacity 320ms ease-out;
          transition-delay: calc(var(--i) * 70ms);
        }

        .idx-arch.is-shown .idx-flow path {
          opacity: 1;
          stroke-dashoffset: 0;
          transition:
            opacity 60ms linear,
            stroke-dashoffset 300ms ease-out;
          transition-delay: calc(360ms + var(--i) * 300ms);
        }

        .idx-arch.is-shown .idx-flow text {
          opacity: 1;
          transition: opacity 200ms ease-out;
          transition-delay: calc(520ms + var(--i) * 300ms);
        }

        @media (prefers-reduced-motion: reduce) {
          .idx-arch .idx-node,
          .idx-arch .idx-flow text,
          .idx-arch .idx-flow path {
            opacity: 1;
            stroke-dashoffset: 0;
            transition: none;
          }
        }
      `}</style>
    </figure>
  );
}
