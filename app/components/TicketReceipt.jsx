"use client";

import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowLeft,
  AtSign,
  MapPin,
  Phone,
  ScanLine,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { cvUrl, profile } from "../data/portfolio";

export default function TicketReceipt({ match, onStartOver }) {
  return (
    <main className="relative z-10 flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
      />
      <div className="relative z-10 mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55">
        <span className="relative h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-200" />
        </span>
        Your match is ready
      </div>

      <motion.article
        initial={{ y: -180, opacity: 0, rotate: -1.5, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 105,
          damping: 16,
          mass: 0.9,
        }}
        className="ticket-paper relative z-10 w-full max-w-[440px] rounded-t-[4px] px-6 pb-9 pt-7 text-slate-900 shadow-[0_35px_120px_rgba(0,0,0,.6)] sm:px-9 sm:pt-9"
      >
        <div className="flex items-start justify-between border-b border-dashed border-slate-400/60 pb-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.23em] text-slate-500">
              Talent scout · match receipt
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tight">
              HIKMAL <span className="font-light">/</span> PROFILE
            </h1>
            <p className="mt-1 text-[10px] tracking-[0.1em] text-slate-500">
              HARDWARE · REPAIR · AI PRODUCTIVITY
            </p>
          </div>
          <ScanLine size={23} strokeWidth={1.5} className="text-slate-500" />
        </div>

        <section className="border-b border-dashed border-slate-400/60 py-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Your search
          </p>
          <p className="mt-2 text-sm leading-6">
            You are looking for a{" "}
            <strong className="font-bold">{match.role.title}</strong>{" "}
            specialized in{" "}
            <strong className="font-bold">{match.skill.name}</strong> with{" "}
            <strong className="font-bold">
              {match.experience.summary}
            </strong>
            .
          </p>
        </section>

        <section className="border-b border-dashed border-slate-400/60 py-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Meet your match
          </p>
          <h2 className="mt-2 text-lg font-extrabold">{profile.name}</h2>
          <p className="mt-1 text-xs font-semibold text-slate-600">
            {match.experience.role}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {match.experience.company} · {match.experience.period}
          </p>

          <div className="mt-5 space-y-3">
            <a
              href={`mailto:${profile.email}?subject=Let's%20connect`}
              className="flex items-center gap-3 text-xs font-medium text-slate-800 hover:text-emerald-800"
            >
              <AtSign size={14} /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-3 text-xs font-medium text-slate-800 hover:text-emerald-800"
            >
              <Phone size={14} /> {profile.phone}
            </a>
            <p className="flex items-center gap-3 text-xs text-slate-600">
              <MapPin size={14} /> {profile.location}
            </p>
          </div>
        </section>

        <section className="flex items-center justify-between gap-4 pt-5">
          <div className="max-w-[215px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Keep in touch
            </p>
            <p className="mt-2 text-xs font-bold leading-5">
              Scan for my portfolio, career story, and contact details.
            </p>
            <a
              href={cvUrl}
              download="Hikmal_Alfatih_Jibral_CV.pdf"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-emerald-900"
            >
              <ArrowDownToLine size={13} /> Download CV
            </a>
          </div>
          <div className="shrink-0 rounded-lg bg-white p-2">
            <QRCodeSVG
              value={`${profile.portfolioUrl}/?source=match-ticket`}
              size={96}
              level="M"
              marginSize={0}
              bgColor="#ffffff"
              fgColor="#0b1110"
              title="Scan to visit Hikmal Alfatih's portfolio"
            />
          </div>
        </section>

        <div className="mt-6 border-t border-dashed border-slate-400/60 pt-4 text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] text-slate-500">
            THANK YOU · LET&apos;S CONNECT
          </p>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-block text-[10px] font-semibold text-slate-600 underline decoration-slate-400 underline-offset-2"
          >
            {profile.linkedinUrl.replace("https://", "")}
          </a>
        </div>
      </motion.article>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, type: "spring", stiffness: 240, damping: 22 }}
        onClick={onStartOver}
        className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs font-medium text-white/65 backdrop-blur transition hover:border-white/30 hover:text-white"
      >
        <ArrowLeft size={14} /> Start another match
      </motion.button>
    </main>
  );
}
