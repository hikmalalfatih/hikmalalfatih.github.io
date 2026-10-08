const roles = [
  {
    period: "Professional experience",
    title: "Machine Expert",
    organization: "Applenesia",
    description:
      "Diagnose and repair Apple devices, from hardware troubleshooting and component-level work to board repair. Focus on careful inspection, reliable repairs, and clear customer communication.",
    tags: ["Apple device repair", "Board-level diagnostics", "Customer support"],
  },
  {
    period: "2023",
    title: "Computer Operator",
    organization: "PPKD Jakarta Barat",
    description:
      "Completed computer operator training, building a foundation in day-to-day computer use and workplace support.",
    tags: ["Computer operation", "Technical fundamentals"],
  },
  {
    period: "2022",
    title: "iPhone Expert Technician",
    organization: "Hardware Repair Technician Training Program · Applenesia Training Center",
    description:
      "Completed specialist training focused on Apple hardware repair and practical troubleshooting.",
    tags: ["Technician training", "Hardware diagnostics"],
  },
];

const Experience = () => (
  <section id="experience" className="scroll-mt-24">
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Experience
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          A career built on solving real-world problems.
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          Hands-on repair experience and focused technical training, presented
          as a concise timeline.
        </p>
      </div>
      <ol className="mt-12 max-w-4xl border-l border-slate-200">
        {roles.map((role) => (
          <li key={role.title} className="relative pb-10 pl-8 last:pb-0">
            <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-accent ring-1 ring-teal-700" />
            <p className="text-sm font-medium text-accent">{role.period}</p>
            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h3 className="text-xl font-semibold text-ink">{role.title}</h3>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {role.organization}
              </p>
              <p className="mt-4 leading-7 text-slate-600">{role.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
