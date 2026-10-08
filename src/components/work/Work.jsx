const Work = () => (
  <section id="work" className="scroll-mt-24">
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Selected work
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Work that brings ideas to life.
      </h2>
      <article className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card md:grid md:grid-cols-[1fr_1fr]">
        <div className="flex min-h-64 items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-10 text-white">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-200">
              Hardware · AI workflows
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">
              Hikmal<span className="text-teal-300">.</span>
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Portfolio & professional profile
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="text-sm font-semibold text-accent">01 / Portfolio</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">
            Personal portfolio
          </h3>
          <p className="mt-4 leading-7 text-slate-600">
            A digital profile presenting my experience in hardware repair,
            technical support, and practical use of AI tools.
          </p>
          <a
            href="https://maleyxc.vercel.app/"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-accent hover:text-teal-800"
          >
            View live site <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  </section>
);

export default Work;
