import { Check } from "lucide-react";

const steps = ["Role", "Core skill", "Experience"];

export default function WizardProgress({ currentStep }) {
  return (
    <ol
      aria-label="Wizard progress"
      className="mx-auto flex w-full max-w-lg items-center justify-center"
    >
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <li
            key={step}
            className="flex flex-1 items-center last:flex-none"
            aria-current={isCurrent ? "step" : undefined}
          >
            <div className="flex min-w-0 flex-col items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold transition-colors ${
                  isComplete || isCurrent
                    ? "border-emerald-200 bg-emerald-200 text-emerald-950"
                    : "border-white/15 bg-white/[0.04] text-white/40"
                }`}
              >
                {isComplete ? <Check size={14} /> : `0${index + 1}`}
              </span>
              <span
                className={`whitespace-nowrap text-[10px] sm:text-xs ${
                  isCurrent ? "text-white" : "text-white/40"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                className={`mb-5 mx-2 h-px flex-1 sm:mx-4 ${
                  isComplete ? "bg-emerald-200/70" : "bg-white/10"
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
