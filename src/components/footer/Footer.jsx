const Footer = () => (
  <footer id="contact" className="scroll-mt-24 bg-ink text-white">
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            Contact
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a project or a device that needs attention?
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">
            I’m open to conversations about web development, technical
            support, and hardware repair.
          </p>
        </div>
        <a
          href="mailto:hikmalalfatih05@gmail.com"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-ink transition hover:bg-teal-50"
        >
          Email me <span aria-hidden="true">↗</span>
        </a>
        <a
          href="/CV_Hikmal_Alfatih_Jibral.pdf"
          download="CV_Hikmal_Alfatih_Jibral.pdf"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
        >
          Download CV <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-700 pt-6 text-sm text-slate-300 sm:flex-row sm:items-center">
        <a href="mailto:hikmalalfatih05@gmail.com" className="hover:text-white">
          hikmalalfatih05@gmail.com
        </a>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="https://www.linkedin.com/in/hikmal-alfatih-ba264a148"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://wa.me/6281903031378/?text=Hello%20Hikmal"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-white"
          >
            WhatsApp
          </a>
          <a href="#home" className="hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
