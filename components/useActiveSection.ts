"use client";

import { useEffect, useState } from "react";

/** Offset below the viewport top where a section counts as current: the header height plus a little. */
export const ACTIVE_OFFSET = 80;

/**
 * Which of the given sections is current: the last one in page order whose
 * top has passed the line ACTIVE_OFFSET px below the viewport top. The
 * observer's root is everything above that line, so a section intersects
 * it exactly while it has started, and a jump that skips sections still
 * reports each one's change. The last section also counts once it is
 * nearly all on screen, since a short final section may never reach the
 * line. IntersectionObserver only, no scroll handler.
 *
 * Returns null before any section has started, or when disabled.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const last = sections[sections.length - 1];
    const started = new Set<string>();
    let lastNearlyVisible = false;

    const resolve = () => {
      if (lastNearlyVisible) {
        setActive(last.id);
        return;
      }
      let current: string | null = null;
      for (const el of sections) if (started.has(el.id)) current = el.id;
      setActive(current);
    };

    let above: IntersectionObserver | null = null;
    const observeAbove = () => {
      above?.disconnect();
      started.clear();
      const belowLine = Math.max(0, window.innerHeight - ACTIVE_OFFSET);
      above = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) started.add(e.target.id);
            else started.delete(e.target.id);
          }
          resolve();
        },
        // Root: from far above the page down to the line.
        { rootMargin: `100000px 0px -${belowLine}px 0px`, threshold: 0 },
      );
      for (const el of sections) above.observe(el);
    };

    const end = new IntersectionObserver(
      ([entry]) => {
        lastNearlyVisible = entry.isIntersecting;
        resolve();
      },
      { threshold: 0.95 },
    );
    end.observe(last);

    observeAbove();
    window.addEventListener("resize", observeAbove);
    return () => {
      above?.disconnect();
      end.disconnect();
      window.removeEventListener("resize", observeAbove);
    };
  }, [ids, enabled]);

  return active;
}
