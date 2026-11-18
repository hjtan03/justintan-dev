"use client";

import { site } from "@/lib/data/site";
import { useActiveSection } from "@/components/useActiveSection";

const ids = ["hero", ...site.nav.map((item) => item.id)];

/**
 * Persistent label in the margin column naming the current section, so a
 * reader well below the fold knows where they are. It takes over from each
 * section's own margin heading as that heading scrolls under the header.
 * Hidden while the hero is current. Decorative for assistive tech: the
 * headings already carry the structure.
 */
export function SectionIndicator() {
  const active = useActiveSection(ids, true);
  const label = site.nav.find((item) => item.id === active)?.label;
  return (
    <p className="section-indicator" aria-hidden="true" data-visible={label ? "" : undefined}>
      {label ?? ""}
    </p>
  );
}
