const Navbar = () => {
  const links = [
    ["About", "#about"],
    ["Experience", "#experience"],
    ["Skills", "#skills"],
    ["Projects", "#work"],
    ["Contact", "#contact"],
  ];

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#home" className="font-semibold tracking-tight text-ink">
          Hikmal Alfatih<span className="text-accent">.</span>
        </a>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {label}
            </a>
          ))}
          <a
            href="/CV_Hikmal_Alfatih_Jibral.pdf"
            download="CV_Hikmal_Alfatih_Jibral.pdf"
            className="font-semibold text-accent transition hover:text-teal-800"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
