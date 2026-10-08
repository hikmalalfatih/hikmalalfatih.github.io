import portrait from "../../assets/profileImage.JPG";
import appleWallpaper from "../../assets/apple.jpg";

const Header = () => {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:py-28">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            Hardware support & AI-powered productivity
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            I help keep devices working—and everyday work moving.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            I’m Hikmal Alfatih, a hardware support technician who repairs
            devices, troubleshoots technical issues, and uses AI tools
            thoughtfully to work smarter.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Get in touch
            </a>
            <a
              href="/CV_Hikmal_Alfatih_Jibral.pdf"
              download="CV_Hikmal_Alfatih_Jibral.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-slate-400 hover:bg-slate-50"
            >
              Download my CV <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Based in Jakarta, Indonesia
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-teal-100/70" />
          <img
            src={portrait}
            alt="Hikmal Alfatih"
            className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top shadow-card"
          />
          <div className="absolute -bottom-5 -left-5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card">
            <p className="text-sm font-semibold text-ink">Hardware × AI</p>
            <p className="mt-1 text-xs text-slate-500">Practical, end-to-end problem solving</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 sm:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center p-7 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
              Apple device support
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Careful diagnostics. Thoughtful repairs.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Practical experience supporting Apple devices, backed by
              specialist repair training.
            </p>
          </div>
          <div className="relative min-h-48 sm:min-h-64">
            <img
              src={appleWallpaper}
              alt="Apple logo artwork representing Apple device repair"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
