import appleWallpaper from "../../assets/apple.jpg";

const groups = [
  {
    title: "AI productivity & workflows",
    description:
      "Using AI tools to research, organize ideas, and streamline everyday work.",
    skills: [
      "AI-assisted research",
      "Prompt writing",
      "Content & idea development",
      "Workflow productivity",
      "Output review & verification",
    ],
  },
  {
    title: "IT support & troubleshooting",
    description: "Diagnosing issues and helping people get back to work.",
    skills: [
      "Desktop & laptop support",
      "Hardware diagnostics",
      "Operating system support",
      "Technical support",
    ],
  },
  {
    title: "Hardware repair",
    description: "Device-level repair with a component-first mindset.",
    skills: [
      "iPhone & iPad repair",
      "Board-level diagnostics",
      "Soldering & reballing",
      "IC replacement",
      "Board swap",
    ],
  },
  {
    title: "Tools & workflow",
    description: "Tools for collaboration, delivery, and everyday problem solving.",
    skills: ["Git & GitHub", "VS Code", "Vercel", "macOS", "Windows"],
  },
];

const Services = () => (
  <section id="skills" className="scroll-mt-24 border-y border-slate-200 bg-white">
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Skills
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Two disciplines. One troubleshooting mindset.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.title}
            className="rounded-2xl border border-slate-200 bg-paper p-6 sm:p-7"
          >
            {group.title === "Hardware repair" && (
              <div className="mb-5 overflow-hidden rounded-xl">
                <img
                  src={appleWallpaper}
                  alt="Apple logo artwork representing Apple device repair"
                  className="h-36 w-full object-cover object-center"
                />
              </div>
            )}
            <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {group.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
