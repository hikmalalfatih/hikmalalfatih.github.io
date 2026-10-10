# Hikmal Alfatih — Talent Scout Wizard

An interactive, recruiter-facing portfolio built with Next.js App Router,
Tailwind CSS, Framer Motion, and Lucide React. The experience guides visitors
through role, skill, and experience choices, then prints a personalized contact
receipt.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production and GitHub Pages

```bash
npm run build
```

Next.js is configured for static export; the deployable site is written to
`out/`. Push to `main` to run the GitHub Pages workflow. The site uses no server
runtime or API routes, so the static export works on GitHub Pages.

## CV content

Experience, education, contact information, skills, and role options are
maintained in `app/data/portfolio.js`. The downloadable CV is in `public/`.

## Project structure

- `app/page.jsx` and `app/layout.jsx` — App Router entry and metadata.
- `app/components/Wizard.jsx` — wizard state, step transitions, and final print.
- `app/components/DynamicHeader.jsx` — live recruiter sentence builder.
- `app/components/RoleSelection.jsx` — role selection.
- `app/components/SkillSlider.jsx` — draggable skills slider.
- `app/components/ExperienceTimeline.jsx` — draggable career timeline.
- `app/components/TicketReceipt.jsx` — animated resume/contact ticket and QR.
- `app/data/portfolio.js` — CV-based portfolio content.
