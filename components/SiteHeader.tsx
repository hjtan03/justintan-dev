"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/data/site";
import { useActiveSection } from "@/components/useActiveSection";

/** Header height in px, used to treat the hero name as gone once its bottom passes the header. */
const HEADER_HEIGHT = 52;

const navIds = site.nav.map((item) => item.id);

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  // On the home page the name stays hidden while the hero name is in view.
  const [nameHidden, setNameHidden] = useState(isHome);
  // Shared with the margin-column indicator: same observer logic, same answer.
  const active = useActiveSection(navIds, isHome);

  // The hairline under the header appears once the page has scrolled at all.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 2);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

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
