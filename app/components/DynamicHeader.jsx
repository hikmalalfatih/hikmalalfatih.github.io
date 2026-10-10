"use client";

import { motion } from "framer-motion";

function SentencePart({ value, placeholder, className = "" }) {
  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <motion.span
        key={value || placeholder}
        initial={{ opacity: 0, y: 9 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className={
          value
            ? "font-semibold text-emerald-200"
            : "font-medium italic text-white/35"
        }
      >
        {value || placeholder}
      </motion.span>
    </span>
  );
}

export default function DynamicHeader({ role, skill, experience }) {
  return (
    <header className="mx-auto w-full max-w-5xl text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45 sm:text-xs">
        Talent Scout Wizard
      </p>
      <h1
        aria-live="polite"
        className="mx-auto mt-5 max-w-4xl text-balance text-2xl font-light leading-[1.45] tracking-tight text-white/70 sm:text-3xl md:text-[2.55rem]"
      >
        I am looking for a{" "}
        <SentencePart value={role?.title} placeholder="[ROLE]" /> specialized in{" "}
        <SentencePart value={skill?.name} placeholder="[SKILL]" /> with{" "}
        <SentencePart value={experience?.summary} placeholder="[EXPERIENCE]" />.
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
        A little context goes a long way. Shape the kind of match you have in mind.
      </p>
    </header>
  );
}
