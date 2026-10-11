export type Experience = {
  role: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
  logo?: string;
};

export type Education = {
  institution: string;
  program: string;
  period?: string;
  logo?: string;
};

export type PortfolioProject = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
};

export const profile = {
  name: "Hikmal Alfatih",
  headline:
    "Apple Device Hardware Technician | Board-Level Repair Specialist | AI-Powered Productivity",
  location: "West Jakarta, Indonesia",
  portraitUrl: "/images/profile.jpeg",
  linkedin: "https://linkedin.com/in/hikmalalfatih",
  github: "",
  instagram: "",
  spotifyEmbedUrl:
    "https://open.spotify.com/embed/playlist/41SqSul9i9tlw7RVt7sBkZ?utm_source=generator&theme=0",
  resumeUrl: "/resume.pdf",
  summary:
    "I’m an Apple device hardware technician with hands-on experience progressing from interface repair to advanced board-level diagnostics. I focus on reliable repairs, careful troubleshooting, and using AI tools such as GitHub Copilot to build websites and work more efficiently.",
  roles: [
    "Apple Device Hardware Technician",
    "Board-Level Repair Specialist",
    "AI-Powered Productivity",
  ],
} as const;

export const experiences: Experience[] = [
  {
    role: "Machine Expert (Board-Level Repair Technician)",
    organization: "Applenesia",
    location: "Bandung, West Java, Indonesia",
    period: "September 2025 — Present",
    logo: "/logos/experience/applenesia.png",
    highlights: [
      "Diagnose complex mainboard faults and restore no-power iPhone and iPad devices.",
      "Perform IC replacement, ACP, reballing, precision soldering, and board swaps.",
      "Focus on precise, reliable repairs rather than quick fixes.",
    ],
  },
  {
    role: "Interface Expert (Apple Device Repair Technician)",
    organization: "PT. Eka Putra Berkat",
    location: "Bandung, West Java, Indonesia",
    period: "November 2023 — September 2025",
    logo: "/logos/experience/eka-putra-berkat.png",
    highlights: [
      "Replaced and installed displays, batteries, and interface components.",
      "Troubleshot hardware across iPhone, iPad, MacBook, and Apple Watch.",
    ],
  },
  {
    role: "Interface Expert (Apple Device Repair Technician)",
    organization: "PT. iColor Digital Indonesia",
    location: "West Jakarta, Indonesia",
    period: "October 2022 — July 2023",
    logo: "/logos/experience/icolor-digital.png",
    highlights: [
      "Repaired screens, batteries, buttons, and other Apple device hardware.",
      "Installed replacement components with close attention to detail.",
    ],
  },
  {
    role: "Account Executive",
    organization: "MyRepublic ID",
    location: "Jakarta, Indonesia",
    period: "April 2022 — September 2022",
    logo: "/logos/experience/myrepublic.png",
    highlights: [
      "Promoted WiFi solutions and developed sales strategies.",
      "Matched recommendations to customers’ connectivity needs.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Universitas Terbuka",
    program: "Bachelor’s Program in Information Systems · In Progress",
    logo: "/logos/education/universitas-terbuka.png",
  },
  {
    institution: "PPKD Jakarta Barat",
    program: "Computer Operator Training",
    period: "July 2023 — September 2023",
    logo: "/logos/education/ppkd-jakarta-barat.png",
  },
  {
    institution: "Pondok Pesantren Alfachriyah",
    program: "Qur’anic Studies",
    period: "May 2019 — May 2021",
    logo: "/logos/education/alfachriyah.png",
  },
  {
    institution: "SMA 95",
    program: "Natural Sciences and Biology",
    period: "May 2018 — May 2019",
    logo: "/logos/education/sma-95.png",
  },
];

export const projects: PortfolioProject[] = [
  {
    title: "Azul Home",
    subtitle: "Ruang Temu — rumah kecil kita",
    description:
      "A personal project built with help from GitHub Copilot. The site describes itself as a private space for keeping dreams, memories, and feelings close.",
    image: "/projects/azul-home.png",
    tags: ["Web", "GitHub Copilot", "Vercel"],
    href: "https://azul-home.vercel.app",
  },
];

export const certificates = ["Machine Expert Certification"];
export const awards: string[] = [];

export const skillGroups = [
  {
    title: "Apple Devices",
    skills: ["iPhone", "iPad", "MacBook", "Apple Watch"],
  },
  {
    title: "Board-Level Repair",
    skills: [
      "Troubleshooting",
      "Chip-Level Diagnostics",
      "IC Replacement",
      "Reballing",
      "Soldering",
      "ACP",
      "Swap Board",
      "Component-Level Repair",
      "LCD & Battery Replacement",
    ],
  },
  {
    title: "AI & Productivity",
    skills: [
      "GitHub Copilot",
      "AI-Assisted Web Development",
      "Prompt Engineering",
      "Generative AI Tools",
      "Workflow Optimization",
      "Process Efficiency",
    ],
  },
  {
    title: "Build & Deploy",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "GitHub Pages"],
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: profile.linkedin, description: "Let’s connect professionally" },
  { label: "GitHub", href: profile.github, description: "Explore my code" },
  { label: "Instagram", href: profile.instagram, description: "Follow along" },
].filter((link) => link.href);

export const trademarkNotice =
  "Apple, iPhone, iPad, MacBook and Apple Watch are trademarks of Apple Inc. This site is independent and not affiliated with Apple.";
