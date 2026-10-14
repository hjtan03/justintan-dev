"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/data/site";

/** Offset below which a section counts as the one in view. Matches the header height plus a little. */
const ACTIVE_OFFSET = 80;
/** Header height in px, used to treat the hero name as gone once its bottom passes the header. */
const HEADER_HEIGHT = 52;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // On the home page the name stays hidden while the hero name is in view.
  const [nameHidden, setNameHidden] = useState(isHome);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 2);

      if (!isHome) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const item of site.nav) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = item.id;
      }
      if (atBottom) current = site.nav[site.nav.length - 1]?.id ?? current;
      setActive(current);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setNameHidden(false);
      return;
    }
    const hero = document.getElementById("hero-heading");
    if (!hero) {
      setNameHidden(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hidden while any part of the hero name is below the header's bottom edge.
        setNameHidden(entry.isIntersecting || entry.boundingClientRect.top > HEADER_HEIGHT);
      },
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="site-header" data-scrolled={scrolled ? "" : undefined}>
      <nav className="page site-header-inner" aria-label="Site">
        <Link href="/" className="site-header-name" data-hidden={nameHidden ? "" : undefined}>
          {site.name}
        </Link>
        <ul className="site-nav">
          {site.nav.map((item) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                className="site-nav-link"
                aria-current={isHome && active === item.id ? "location" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
