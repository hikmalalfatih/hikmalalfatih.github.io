"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, BriefcaseBusiness, Code2, ExternalLink, Music2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { profile, socialLinks, trademarkNotice } from "../data/profile";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import GreetingSplash from "./GreetingSplash";
import GalaxyBackground from "./GalaxyBackground";
import PortfolioSection from "./PortfolioSection";
import SiteNav from "./SiteNav";

export default function PortfolioSite() {
  const [activeTab, setActiveTab] = useState("projects");
  const [pageRevealed, setPageRevealed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveTab(params.get("tab") ?? "projects");
  }, []);

  useEffect(() => {
    const onVisibility = () => document.documentElement.classList.toggle("page-hidden", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const openPortfolio = useCallback((tab: string) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    history.replaceState(null, "", url);
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="site-shell">
      {pageRevealed && <GalaxyBackground />}
      <GreetingSplash onComplete={() => setPageRevealed(true)} />
      {pageRevealed && <SiteNav />}
      <div className={`portfolio-reveal ${pageRevealed ? "is-visible" : ""}`} aria-hidden={!pageRevealed} inert={!pageRevealed}>
        <main id="main-content">
        <section id="home" className="hero-section page-section">
          <div className="hero-content">
            <motion.p className="eyebrow hero-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.55 }}>
              <Sparkles size={15} /> Hardware repair · AI-powered productivity
            </motion.p>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              <span className="gradient-text">Restoring Apple Devices,</span><br />One Chip at a Time.
            </motion.h1>
            <RoleLine roles={profile.roles} reduceMotion={reduceMotion} enabled={pageRevealed} />
            <p className="hero-summary">{profile.summary}</p>
            <div className="button-row hero-buttons">
              <button className="button button-primary" onClick={() => openPortfolio("projects")}>Projects <ExternalLink size={16} /></button>
              <a className="button button-secondary" href="#contact">Contact Me <ArrowRight size={16} /></a>
            </div>
            <div className="hero-social">
              <span className="eyebrow">Find me</span>
              {socialLinks.map((social) => {
                const Icon = social.label === "LinkedIn" ? BriefcaseBusiness : Code2;
                return <a className="social-icon-button" href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} key={social.label}><Icon size={17} /></a>;
              })}
              <a className="social-icon-button" href="#contact" aria-label="Contact Hikmal"><ArrowRight size={17} /></a>
            </div>
          </div>
          <motion.aside className="glass daily-card" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.32, duration: 0.7 }}>
            <div className="daily-card-header"><span className="daily-icon"><Music2 size={19} /></span><div><p className="eyebrow">Daily Rotation</p><h2>Now Playing</h2></div><span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span></div>
            {profile.spotifyEmbedUrl ? (
              <iframe
                className="music-frame"
                src={profile.spotifyEmbedUrl}
                title="Spotify playlist"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            ) : (
              <div className="music-placeholder"><Music2 size={26} /><span>Add a Spotify embed URL to app/data/profile.ts to enable playback.</span></div>
            )}
            <p className="muted-copy">An album I enjoy listening to while working and creating.</p>
          </motion.aside>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDown size={15} /></a>
        </section>

        <AboutSection onPortfolioTab={openPortfolio} />
        <PortfolioSection initialTab={activeTab} onTabChange={setActiveTab} />
        <ContactSection />
        </main>
        <footer className="site-footer">
          <a href="#home" className="footer-top"><span>Back to top</span><ArrowUp size={15} /></a>
          <div><p>© {new Date().getFullYear()} {profile.name}</p><p>Designed and built with GitHub Copilot</p></div>
          <p className="trademark-notice">{trademarkNotice}</p>
        </footer>
      </div>
    </div>
  );
}

function RoleLine({ roles, reduceMotion, enabled }: { roles: readonly string[]; reduceMotion: boolean | null; enabled: boolean }) {
  const [typedRole, setTypedRole] = useState(roles[0]);

  useEffect(() => {
    if (!enabled || reduceMotion) {
      setTypedRole(roles[0]);
      return;
    }
    let roleIndex = 0;
    let characterCount = 0;
    let deleting = false;
    let timeout = 0;
    const tick = () => {
      const role = roles[roleIndex];
      if (!deleting) {
        characterCount += 1;
        setTypedRole(role.slice(0, characterCount));
        if (characterCount >= role.length) {
          deleting = true;
          timeout = window.setTimeout(tick, 1300);
          return;
        }
      } else {
        characterCount -= 1;
        setTypedRole(role.slice(0, characterCount));
        if (characterCount <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      timeout = window.setTimeout(tick, deleting ? 48 : 72);
    };
    timeout = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timeout);
  }, [enabled, reduceMotion, roles]);

  return <div className="role-line" aria-live="polite"><span className="role-caret" aria-hidden="true" />{typedRole}</div>;
}
