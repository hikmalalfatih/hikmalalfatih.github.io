"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Sparkles } from "lucide-react";
import DynamicHeader from "./DynamicHeader";
import ExperienceTimeline from "./ExperienceTimeline";
import RoleSelection from "./RoleSelection";
import SkillSlider from "./SkillSlider";
import TicketReceipt from "./TicketReceipt";
import WizardProgress from "./WizardProgress";
import { cvUrl, experiences, profile } from "../data/portfolio";

const stageTransition = {
  type: "spring",
  stiffness: 190,
  damping: 24,
  mass: 0.8,
};

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [role, setRole] = useState(null);
  const [skill, setSkill] = useState(null);
  const [experience, setExperience] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const match = { role, skill, experience };
  const canContinue =
    currentStep === 0
      ? Boolean(role)
      : currentStep === 1
        ? Boolean(skill)
        : Boolean(experience);

  const changeStep = (direction) => {
    setCurrentStep((step) => Math.min(2, Math.max(0, step + direction)));
  };

  if (isPrinting) {
    return (
      <div className="wizard-backdrop wizard-grain min-h-svh">
        <TicketReceipt
          match={match}
          onStartOver={() => {
            setIsPrinting(false);
            setCurrentStep(0);
            setRole(null);
            setSkill(null);
            setExperience(null);
          }}
        />
      </div>
    );
  }

  return (
    <main className="wizard-backdrop wizard-grain relative isolate min-h-svh overflow-hidden px-4 pb-8 pt-5 text-white sm:px-6 sm:pt-7">
      <div className="pointer-events-none absolute left-1/2 top-[20rem] z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-300/[0.045] blur-[100px]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-6xl flex-col">
        <nav className="flex items-center justify-between">
          <a
            href={profile.portfolioUrl}
            className="group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white/85"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.055] text-emerald-100 transition group-hover:border-emerald-200/40">
              <Sparkles size={16} />
            </span>
            Hikmal Alfatih
          </a>
          <a
            href={cvUrl}
            download="Hikmal_Alfatih_Jibral_CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-medium text-white/65 transition hover:border-white/25 hover:text-white sm:px-4 sm:text-xs"
          >
            <Download size={14} /> <span>View CV</span>
          </a>
        </nav>

        <div className="mx-auto mt-12 w-full max-w-4xl sm:mt-16">
          <DynamicHeader role={role} skill={skill} experience={experience} />
        </div>

        <div className="mx-auto mt-9 w-full max-w-5xl sm:mt-12">
          <WizardProgress currentStep={currentStep} />
        </div>

        <div className="mx-auto mt-7 w-full max-w-5xl flex-1 sm:mt-9">
          <div className="glass-panel overflow-hidden rounded-[1.65rem] p-5 sm:rounded-[2rem] sm:p-8 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -13, scale: 0.99 }}
                transition={stageTransition}
              >
                {currentStep === 0 && (
                  <RoleSelection selectedRole={role} onSelect={setRole} />
                )}
                {currentStep === 1 && (
                  <SkillSlider selectedSkill={skill} onSelect={setSkill} />
                )}
                {currentStep === 2 && (
                  <ExperienceTimeline
                    selectedExperience={experience}
                    onSelect={setExperience}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) < 35) return;
                      const selectedIndex = Math.max(
                        0,
                        experiences.findIndex(
                          (item) => item.id === experience?.id
                        )
                      );
                      const direction = info.offset.x < 0 ? 1 : -1;
                      const nextIndex = Math.max(
                        0,
                        Math.min(
                          experiences.length - 1,
                          selectedIndex + direction
                        )
                      );
                      setExperience(experiences[nextIndex]);
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5 sm:mt-9 sm:pt-6">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => changeStep(-1)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-white/55 transition hover:text-white sm:text-sm"
                >
                  <ArrowLeft size={15} /> Back
                </button>
              ) : (
                <span className="px-3 py-2 text-[10px] text-white/35 sm:text-xs">
                  Takes less than a minute
                </span>
              )}
              <motion.button
                type="button"
                whileHover={canContinue ? { y: -2, scale: 1.015 } : undefined}
                whileTap={canContinue ? { scale: 0.975 } : undefined}
                disabled={!canContinue}
                onClick={() => {
                  if (currentStep < 2) changeStep(1);
                  else setIsPrinting(true);
                }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-200 px-5 py-3 text-xs font-bold text-emerald-950 shadow-[0_10px_35px_rgba(110,231,183,.12)] transition enabled:hover:bg-emerald-100 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 disabled:shadow-none sm:px-6 sm:text-sm"
              >
                {currentStep === 2 ? "Connect with Hikmal" : "Continue"}
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </div>

        <footer className="relative z-10 mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-1 pt-6 text-[10px] text-white/30 sm:text-xs">
          <span>Apple hardware repair · AI-powered productivity</span>
          <span>West Jakarta, Indonesia</span>
        </footer>
      </div>
    </main>
  );
}
