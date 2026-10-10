"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Hand,
  Laptop,
  MessageSquareText,
  Monitor,
  ScanSearch,
  Sparkles,
  Workflow,
} from "lucide-react";
import DragSlider from "./DragSlider";
import { skills } from "../data/portfolio";

const icons = {
  circuit: Activity,
  cpu: Cpu,
  devices: Laptop,
  message: MessageSquareText,
  microchip: Cpu,
  monitor: Monitor,
  scan: ScanSearch,
  sparkles: Sparkles,
  workflow: Workflow,
};

export default function SkillSlider({ selectedSkill, onSelect }) {
  return (
    <section aria-labelledby="skill-question">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-200/70">
            Step 02 · Explore the details
          </p>
          <h2
            id="skill-question"
            className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Which core skill matters most?
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/45">
          <Hand size={13} /> Drag to explore
        </span>
      </div>
      <DragSlider label="Drag horizontally to browse skills">
        {skills.map((skill, index) => {
          const Icon = icons[skill.icon];
          const isSelected = selectedSkill?.id === skill.id;

          return (
            <motion.button
              key={skill.id}
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(skill)}
              aria-pressed={isSelected}
              className={`flex w-[min(78vw,270px)] flex-none flex-col rounded-2xl border p-5 text-left transition-colors sm:w-[290px] sm:p-6 ${
                isSelected
                  ? "border-emerald-200/60 bg-emerald-200/[0.09]"
                  : "border-white/[0.09] bg-white/[0.04] hover:border-white/20"
              }`}
            >
              <span className="flex w-full items-center justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${
                    isSelected
                      ? "bg-emerald-200/15 text-emerald-100"
                      : "bg-white/[0.06] text-white/65"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.7} />
                </span>
                <span className="text-xs tabular-nums text-white/35">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(skills.length).padStart(2, "0")}
                </span>
              </span>
              <span className="mt-7 text-[10px] font-semibold uppercase tracking-[0.17em] text-emerald-100/60">
                {skill.category}
              </span>
              <span className="mt-2 min-h-12 text-lg font-semibold leading-6 text-white">
                {skill.name}
              </span>
              <span className="mt-2 min-h-[4.5rem] text-sm leading-6 text-white/50">
                {skill.detail}
              </span>
              <span
                className={`mt-5 h-px w-full ${
                  isSelected ? "bg-emerald-200/45" : "bg-white/10"
                }`}
              />
              <span className="mt-3 text-xs font-medium text-white/60">
                {isSelected ? "Selected for your match" : "Select this skill"}
              </span>
            </motion.button>
          );
        })}
      </DragSlider>
    </section>
  );
}
