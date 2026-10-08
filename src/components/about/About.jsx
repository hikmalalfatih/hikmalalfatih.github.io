const About = () => {
  return (
    <section id="about" className="scroll-mt-24 border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.7fr_1.3fr] md:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            About me
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Curious by nature. Practical by experience.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
          <p>
            I’m a Jakarta-based hardware support technician who enjoys finding
            the root cause of a problem—not just the quickest workaround. My
            repair work spans device diagnostics, component-level troubleshooting,
            soldering, reballing, and board repair.
          </p>
          <p>
            I also enjoy finding practical ways to use AI: researching ideas,
            organizing information, and making everyday work more efficient.
            I use these tools as a thoughtful assistant, checking their output
            and bringing my own judgment to the result. I’m at my best where
            careful troubleshooting, curiosity, and continuous learning meet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
