"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function SiteNav() {
  const [active, setActive] = useState("home");
  const activeRef = useRef(active);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      () => {
        const marker = window.innerHeight * 0.35;
        const passed = sections.filter((section) => section.getBoundingClientRect().top <= marker);
        const current = passed[passed.length - 1] ?? sections[0];
        if (!current || current.id === activeRef.current) return;
        const id = current.id;
        activeRef.current = id;
        setActive(id);
        const url = new URL(window.location.href);
        url.hash = id;
        history.replaceState(null, "", url);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="site-nav glass" aria-label="Main navigation">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => {
              activeRef.current = link.id;
              setActive(link.id);
            }}
            aria-current={active === link.id ? "location" : undefined}
            className="site-nav-link"
          >
            {active === link.id && (
              <motion.span
                className="site-nav-active"
                layoutId="nav-active"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {active === link.id && <span className="typing-bubble" aria-hidden="true"><i /><i /><i /></span>}
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
