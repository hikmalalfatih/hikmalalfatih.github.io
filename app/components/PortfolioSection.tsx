"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Award,
  Bot,
  CircuitBoard,
  Code2,
  Cpu,
  ExternalLink,
  FolderKanban,
  Laptop,
  Monitor,
  Smartphone,
  Sparkles,
  Tablet,
  Watch,
  Workflow,
  Wrench,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { awards, certificates, projects, skillGroups, type PortfolioProject } from "../data/profile";
import Reveal from "./Reveal";

type Tab = "projects" | "certificates" | "awards" | "tech";
const tabs: { id: Tab; label: string; icon: typeof FolderKanban }[] = [
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "certificates", label: "Certificates", icon: Award },
  ...(awards.length ? [{ id: "awards" as const, label: "Awards", icon: Award }] : []),
  { id: "tech", label: "Tech Stack", icon: Laptop },
];

export default function PortfolioSection({
  initialTab = "projects",
  onTabChange,
}: {
  initialTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  const [tab, setTab] = useState<Tab>((tabs.find((item) => item.id === initialTab)?.id ?? "projects") as Tab);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [certificateZoomed, setCertificateZoomed] = useState(false);

  const selectTab = useCallback((next: Tab) => {
    setTab(next);
    onTabChange?.(next);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", next);
    history.replaceState(null, "", url);
  }, [onTabChange]);

  useEffect(() => {
    const onPopState = () => {
      const requested = new URLSearchParams(location.search).get("tab");
      if (tabs.some((item) => item.id === requested)) setTab(requested as Tab);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const next = tabs.find((item) => item.id === initialTab)?.id;
    if (next && next !== tab) setTab(next);
  }, [initialTab, tab]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((i) => ((i ?? 0) + 1) % certificates.length);
      if (event.key === "ArrowLeft") setLightboxIndex((i) => ((i ?? 0) + certificates.length - 1) % certificates.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  useEffect(() => {
    if (!selectedProject && lightboxIndex === null) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = old; };
  }, [selectedProject, lightboxIndex]);

  return (
    <section id="portfolio" className="page-section" aria-labelledby="portfolio-title">
      <Reveal><div className="section-heading"><p className="eyebrow">Selected work & capabilities</p><h2 id="portfolio-title">Portfolio</h2></div></Reveal>
      <div className="portfolio-tabs glass" role="tablist" aria-label="Portfolio categories" onKeyDown={(event) => {
        if (!["ArrowRight", "ArrowLeft"].includes(event.key)) return;
        event.preventDefault();
        const currentIndex = tabs.findIndex((item) => item.id === tab);
        const nextIndex = (currentIndex + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
        selectTab(tabs[nextIndex].id);
        document.getElementById(`portfolio-tab-${tabs[nextIndex].id}`)?.focus();
      }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`portfolio-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={tab === id}
            aria-controls={`portfolio-panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => selectTab(id)}
          >
            {tab === id && <motion.span layoutId="portfolio-tab-indicator" className="tab-indicator" />}
            <Icon size={16} /><span>{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          id={`portfolio-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`portfolio-tab-${tab}`}
          className="portfolio-panel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {tab === "projects" && (
            <div className="project-grid">
              {projects.map((project) => (
                <article className="glass project-card" key={project.title}>
                  <ProjectPreview project={project} />
                  <div className="project-content">
                    <div><p className="eyebrow">Featured project</p><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p></div>
                    <p className="muted-copy">{project.description}</p>
                    <div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                    <div className="button-row">
                      <a className="button button-primary" href={project.href} target="_blank" rel="noopener noreferrer">Live Demo <ExternalLink size={15} /></a>
                      <button className="button button-secondary" onClick={() => setSelectedProject(project)}>Details <ArrowRight size={15} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === "certificates" && (
            <div className="credential-grid">
              {certificates.map((certificate, index) => (
                <button className="glass credential-card" key={certificate} onClick={() => { setCertificateZoomed(false); setLightboxIndex(index); }}>
                  <span className="credential-art">
                    <img src="/certificates/machine-expert.jpg" alt="" loading="lazy" decoding="async" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </span>
                  <strong>{certificate}</strong><small>Applenesia</small>
                </button>
              ))}
            </div>
          )}

          {tab === "awards" && awards.map((award) => <div className="glass credential-card" key={award}>{award}</div>)}

          {tab === "tech" && (
            <div className="tech-groups">
              {skillGroups.map((group) => (
                <section key={group.title} className="tech-group">
                  <h3 className="eyebrow">{group.title}</h3>
                  <div className="tech-grid">
                    {group.skills.map((skill, index) => (
                      <div className="glass tech-tile" key={skill}>
                        <span className="tech-icon">{techGlyph(skill, index)}</span><span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <Modal title={selectedProject.title} onClose={() => setSelectedProject(null)}>
            <ProjectPreview project={selectedProject} />
            <p className="muted-copy">{selectedProject.description}</p>
            <div className="tag-list">{selectedProject.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="button-row"><a className="button button-primary" href={selectedProject.href} target="_blank" rel="noopener noreferrer">Visit project <ExternalLink size={15} /></a></div>
          </Modal>
        )}
        {lightboxIndex !== null && (
          <Modal title={certificates[lightboxIndex]} onClose={() => setLightboxIndex(null)}>
            <div className={`certificate-lightbox ${certificateZoomed ? "certificate-zoomed" : ""}`}>
              <img src="/certificates/machine-expert.jpg" alt={`${certificates[lightboxIndex]} certificate`} />
            </div>
            <button className="button button-secondary" type="button" aria-pressed={certificateZoomed} onClick={() => setCertificateZoomed((value) => !value)}>{certificateZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}{certificateZoomed ? "Zoom out" : "Zoom in"}</button>
            {certificates.length > 1 && <div className="button-row"><button className="button button-secondary" onClick={() => setLightboxIndex((i) => ((i ?? 0) + certificates.length - 1) % certificates.length)}><ArrowLeft size={15} /> Previous</button><button className="button button-secondary" onClick={() => setLightboxIndex((i) => ((i ?? 0) + 1) % certificates.length)}>Next <ArrowRight size={15} /></button></div>}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectPreview({ project }: { project: PortfolioProject }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="project-visual">
      {project.image && !imageFailed ? (
        <img
          src={project.image}
          alt={`${project.title} website preview`}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : project.preview === "applenesia" ? (
        <div className="project-preview project-preview-applenesia" role="img" aria-label="Preview of the Applenesia Apple service website">
          <div className="applenesia-preview-nav"><strong>Applenesia<span>.tnj</span></strong><span>LAYANAN　 DAFTAR HARGA　 LOKASI</span></div>
          <div className="applenesia-preview-hero">
            <p>APPLE SERVICE SPECIALIST · TANJUNG PINANG</p>
            <h4>Spesialis Servis Apple <span>Terbaik di Tanjung Pinang.</span></h4>
            <small>Layanan perbaikan iPhone, MacBook, iPad, dan Apple Watch.</small>
            <span className="applenesia-preview-button">Jadwalkan servis</span>
          </div>
        </div>
      ) : project.preview === "maley-agent" ? (
        <div className="project-preview project-preview-agent" role="img" aria-label="Preview of the Maley Agent AI mission-control dashboard">
          <aside className="agent-preview-sidebar">
            <strong><span /> Mission Control</strong>
            <small>pusat kendali tim AI</small>
            <span className="agent-preview-active">▣　Maley Office</span>
            <span>🤖　Agent Overview</span>
            <span>📋　Task Queue</span>
            <span>▥　System Metrics</span>
            <span>◷　Real-Time Log</span>
          </aside>
          <div className="agent-preview-main">
            <div className="agent-preview-top"><strong>maley Office</strong><span>TUNNEL OFF　 ● Resume</span></div>
            <div className="agent-preview-scene">
              <div className="agent-preview-window"><span>BANDUNG · 22/10/26</span><strong>maleyMarginCall</strong><small>TRADING ROOM · MALey OFFICE</small></div>
              <div className="agent-preview-floor"><Bot size={54} strokeWidth={1.3} /><span>AI AGENT　 ·　 READY</span></div>
              <div className="agent-preview-console"><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="project-placeholder" role="img" aria-label="Azul Home project preview">
          <span className="placeholder-window"><span /><span /><span /></span>
          <strong>{project.title}</strong><small>{project.subtitle}</small>
        </div>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    modalRef.current?.querySelector<HTMLElement>("button, a, input, [tabindex]:not([tabindex='-1'])")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !modalRef.current) return;
      const elements = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ));
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div ref={modalRef} className="glass modal-card" role="dialog" aria-modal="true" aria-label={title} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.28 }}>
        <div className="modal-header"><h2>{title}</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button></div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function techGlyph(skill: string, index: number) {
  if (/iphone/i.test(skill)) return <Smartphone size={19} />;
  if (/ipad/i.test(skill)) return <Tablet size={19} />;
  if (/macbook/i.test(skill)) return <Laptop size={19} />;
  if (/watch/i.test(skill)) return <Watch size={19} />;
  if (/ai|copilot|prompt|generative/i.test(skill)) return <Sparkles size={19} />;
  if (/solder|ic replacement|acp/i.test(skill)) return <Cpu size={19} />;
  if (/repair|board|diagnostics|troubleshooting/i.test(skill)) return <CircuitBoard size={19} />;
  if (/workflow|efficiency|productivity/i.test(skill)) return <Workflow size={19} />;
  if (/lcd|battery|interface/i.test(skill)) return <Monitor size={19} />;
  if (/vercel|github|next|react|typescript|tailwind|code/i.test(skill)) return <Code2 size={19} />;
  return index % 2 ? <Wrench size={19} /> : <Activity size={19} />;
}
