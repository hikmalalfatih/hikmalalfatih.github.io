"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowRight, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { awards, certificates, education, experiences, profile, projects } from "../data/profile";
import Reveal from "./Reveal";

export default function AboutSection({
  onPortfolioTab,
}: {
  onPortfolioTab: (tab: string) => void;
}) {
  const [showPortrait, setShowPortrait] = useState(true);
  const [failedImage, setFailedImage] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0);

  return (
    <section id="about" className="page-section" aria-labelledby="about-title">
      <Reveal>
        <SectionTitle eyebrow="A little about me" title="About Me" id="about-title" />
      </Reveal>
      <div className="about-intro">
        <Reveal className="about-copy">
          <p className="eyebrow blue-text">Hi, I’m</p>
          <h3 className="about-name">Hikmal Alfatih</h3>
          <p className="muted-copy">
            {profile.summary} I’m always learning new repair techniques and
            finding thoughtful ways to solve complex problems.
          </p>
          <div className="button-row">
            <a className="button button-primary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <ArrowDownToLine size={17} /> View Resume
            </a>
            <button className="button button-secondary" onClick={() => onPortfolioTab("projects")}>
              View Projects <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>

        <Reveal className="portrait-reveal" delay={0.12}>
          <div className="portrait-stage">
            <div className="portrait-orbit">
              <span className="apple-leaf" aria-hidden="true" />
              <div className="apple-frame">
                <div className={`apple-frame-content ${showPortrait ? "portrait-show" : "board-show"}`}>
                  {profile.portraitUrl && !failedImage && (
                    <img
                      className="portrait-image"
                      src={profile.portraitUrl}
                      alt="Portrait of Hikmal Alfatih"
                      loading="lazy"
                      decoding="async"
                      onError={() => setFailedImage(true)}
                    />
                  )}
                  {!showPortrait && (
                    <img
                      className="board-study-image"
                      src="/images/board-study.jpeg"
                      alt="Hikmal"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {(!profile.portraitUrl || failedImage) && showPortrait && <span className="portrait-fallback">HA</span>}
                </div>
              </div>
            </div>
            <button
              className="artwork-toggle"
              type="button"
              aria-label={`Show ${showPortrait ? "Maley" : "Hikmal"}`}
              onClick={() => setShowPortrait((value) => !value)}
            >
              <span className="artwork-toggle-dot" /> {showPortrait ? "Maley" : "Hikmal"}
            </button>
          </div>
        </Reveal>

        <Reveal className="about-side-copy" delay={0.18}>
          <p className="eyebrow">Precision, patience, progress</p>
          <p>
            From replacing an interface component to tracing a fault on a
            logic board, I enjoy understanding how things work and bringing
            them back to life.
          </p>
          <div className="location-pill"><MapPin size={15} /> {profile.location}</div>
        </Reveal>
      </div>

      <div className="about-columns">
        <Reveal className="glass info-panel">
          <h3 className="panel-heading"><GraduationCap /> Education</h3>
          <div className="education-list">
            {education.map((item) => (
              <article className="education-item" key={item.institution}>
                <OrganizationLogo
                  src={item.logo}
                  alt={item.institution}
                  fallback={item.institution.slice(0, 2).toUpperCase()}
                />
                <div>
                  <h4>{item.institution}</h4>
                  <p>{item.program}</p>
                  {item.period && <small>{item.period}</small>}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal className="glass info-panel" delay={0.1}>
          <h3 className="panel-heading"><BriefcaseBusiness /> Experience</h3>
          <div className="experience-list">
            {experiences.map((item, index) => (
              <article className="experience-item" key={`${item.organization}-${item.period}`}>
                <button
                  type="button"
                  className="experience-toggle"
                  aria-expanded={expandedExperience === index}
                  aria-controls={`experience-details-${index}`}
                  onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
                >
                  <OrganizationLogo
                    src={item.logo}
                    alt={item.organization}
                    fallback={item.organization.replace(/[^A-Z]/g, "").slice(0, 2) || "EX"}
                  />
                  <span>
                    <strong>{item.role}</strong>
                    <small>{item.organization} · {item.period}</small>
                  </span>
                  <ArrowRight size={16} className={expandedExperience === index ? "rotate-icon" : ""} />
                </button>
                {expandedExperience === index && (
                  <div className="experience-details" id={`experience-details-${index}`}>
                    <p className="muted-copy">{item.location}</p>
                    <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="stats-grid">
        <StatCard count={projects.length} label="PROJECTS" caption="A personal project built with GitHub Copilot" onClick={() => onPortfolioTab("projects")} />
        <StatCard count={certificates.length} label="CERTIFICATES" caption="Skills validated through training" onClick={() => onPortfolioTab("certificates")} />
        {awards.length > 0 && <StatCard count={awards.length} label="AWARDS" caption="Recognitions and achievements" onClick={() => onPortfolioTab("awards")} />}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div>;
}

function OrganizationLogo({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className={`monogram ${src && !imageFailed ? "has-logo" : ""}`}>
      {src && !imageFailed ? (
        <img src={src} alt={`${alt} logo`} loading="lazy" onError={() => setImageFailed(true)} />
      ) : (
        fallback
      )}
    </span>
  );
}

function StatCard({
  count,
  label,
  caption,
  onClick,
}: {
  count: number;
  label: string;
  caption: string;
  onClick: () => void;
}) {
  return (
    <button className="glass stat-card" onClick={onClick}>
      <span className="stat-count">{count}</span>
      <span className="eyebrow">{label}</span>
      <span className="muted-copy">{caption}</span>
      <ArrowRight size={17} className="stat-arrow" />
    </button>
  );
}
