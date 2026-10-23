import "./globals.css";

export const metadata = {
  title: "Hikmal Alfatih | Apple Hardware Repair Specialist",
  description:
    "Apple device hardware technician focused on board-level repair, chip diagnostics, and AI-powered productivity.",
  metadataBase: new URL("https://hikmalalfatih.github.io"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hikmal Alfatih | Apple Hardware Repair Specialist",
    description: "Board-level Apple device repair, precision diagnostics, and AI-powered productivity.",
    url: "https://hikmalalfatih.github.io",
    siteName: "Hikmal Alfatih",
    type: "website",
    images: ["/images/profile.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/profile.jpeg"],
    title: "Hikmal Alfatih | Apple Hardware Repair Specialist",
    description: "Board-level Apple device repair, precision diagnostics, and AI-powered productivity.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.supabase.co https://challenges.cloudflare.com; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com; frame-src https://open.spotify.com https://embed.music.apple.com https://challenges.cloudflare.com; form-action 'self'" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hikmal Alfatih",
              jobTitle: "Apple Device Hardware Technician",
              url: "https://hikmalalfatih.github.io",
              sameAs: ["https://linkedin.com/in/hikmalalfatih"],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
