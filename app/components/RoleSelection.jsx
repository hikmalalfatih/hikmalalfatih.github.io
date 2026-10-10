"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Laptop, Sparkles, Wrench } from "lucide-react";
import { roles } from "../data/portfolio";

const icons = {
  cpu: Cpu,
  laptop: Laptop,
  sparkles: Sparkles,
  wrench: Wrench,
};

export default function RoleSelection({ selectedRole, onSelect }) {
  return (
    <section aria-labelledby="role-question">
      <div className="mb-7">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-200/70">
          Step 01 · Choose a direction
        </p>
        <h2
          id="role-question"
          className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          What kind of talent do you need?
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {roles.map((role, index) => {
          const Icon = icons[role.icon];
          const isSelected = selectedRole?.id === role.id;

          return (
            <motion.button
              key={role.id}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 270,
                damping: 25,
                delay: index * 0.045,
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(role)}
              aria-pressed={isSelected}
              className={`group flex min-h-28 w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                isSelected
                  ? "border-emerald-200/70 bg-emerald-200/[0.09] ring-1 ring-emerald-200/30"
                  : "border-white/[0.09] bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.065]"
              }`}
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${
                  isSelected
                    ? "border-emerald-200/30 bg-emerald-200/10 text-emerald-100"
                    : "border-white/10 bg-white/[0.04] text-white/65"
                }`}
              >
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 text-sm font-semibold text-white sm:text-base">
                  {role.title}
                  <ArrowUpRight
                    size={15}
                    className={`shrink-0 transition ${
                      isSelected
                        ? "text-emerald-200"
                        : "text-white/25 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
                    }`}
                  />
                </span>
                <span className="mt-1.5 block text-xs leading-5 text-white/45 sm:text-sm">
                  {role.subtitle}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
