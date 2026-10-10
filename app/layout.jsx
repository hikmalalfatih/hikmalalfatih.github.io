import "./globals.css";

export const metadata = {
  title: "Hikmal Alfatih | Talent Scout Wizard",
  description:
    "Explore Hikmal Alfatih's Apple hardware repair, board-level diagnostics, and AI-powered productivity experience.",
  metadataBase: new URL("https://hikmalalfatih.github.io"),
  openGraph: {
    title: "Hikmal Alfatih | Talent Scout Wizard",
    description:
      "A hands-on Apple hardware repair specialist and AI-powered productivity enthusiast.",
    url: "https://hikmalalfatih.github.io",
    siteName: "Hikmal Alfatih",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
