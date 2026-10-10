"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, BriefcaseBusiness, Hand, MapPin } from "lucide-react";
import DragSlider from "./DragSlider";
import { experiences } from "../data/portfolio";

export default function ExperienceTimeline({
  selectedExperience,
  onSelect,
  onDragEnd,
}) {
  const activeIndex = experiences.findIndex(
    (experience) => experience.id === selectedExperience?.id
  );

  return (
    <section aria-labelledby="experience-question">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-200/70">
            Step 03 · Find your fit
          </p>
          <h2
            id="experience-question"
            className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Which experience stands out?
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/45">
          <Hand size={13} /> Swipe the timeline
        </span>
      </div>

      <DragSlider
        label="Drag horizontally to browse career experience"
        onDragEnd={onDragEnd}
      >
        {experiences.map((experience, index) => {
          const isSelected = selectedExperience?.id === experience.id;

          return (
            <motion.button
              key={experience.id}
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(experience)}
              aria-pressed={isSelected}
              className={`relative flex w-[min(82vw,300px)] flex-none flex-col rounded-2xl border p-5 text-left transition-colors sm:w-[320px] sm:p-6 ${
                isSelected
                  ? "border-emerald-200/60 bg-emerald-200/[0.09]"
                  : "border-white/[0.09] bg-white/[0.04] hover:border-white/20"
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-emerald-100">
                  <BriefcaseBusiness size={18} strokeWidth={1.7} />
                </span>
                <span className="text-xs tabular-nums text-white/40">
                  0{index + 1}
                </span>
              </span>
              <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/70">
                {experience.period}
              </span>
              <span className="mt-2 min-h-12 text-base font-semibold leading-6 text-white">
                {experience.role}
              </span>
              <span className="mt-1 text-sm font-medium text-white/70">
                {experience.company}
              </span>
              <span className="mt-2 flex items-center gap-1.5 text-xs text-white/40">
                <MapPin size={12} /> {experience.location}
              </span>
              <span className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-100">
                {isSelected ? "Selected experience" : "Select experience"}
                <ArrowDownRight size={14} />
              </span>
            </motion.button>
          );
        })}
      </DragSlider>

      <AnimatePresence mode="wait">
        {selectedExperience && (
          <motion.div
            key={selectedExperience.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 230, damping: 24 }}
            className="mt-5 rounded-2xl border border-white/[0.09] bg-black/20 p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/40">
                  Experience snapshot
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-100">
                  {selectedExperience.summary}
                </p>
              </div>
              <span className="rounded-full border border-emerald-200/20 bg-emerald-200/[0.07] px-3 py-1 text-[10px] text-emerald-100/80">
                Added to your match
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/55">
              {selectedExperience.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {selectedExperience.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/55"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
