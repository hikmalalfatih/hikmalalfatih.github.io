import { useEffect, useState } from "react";
import appleWallpaper from "../../assets/apple.jpg";

const greetings = [
  { text: "Halo", language: "Bahasa Indonesia", lang: "id" },
  { text: "Hello", language: "English", lang: "en" },
  { text: "مرحبًا", language: "العربية", lang: "ar" },
  { text: "你好", language: "中文 · Mandarin", lang: "zh" },
  { text: "สวัสดี", language: "ภาษาไทย", lang: "th" },
  { text: "こんにちは", language: "日本語", lang: "ja" },
  { text: "Hola", language: "Español", lang: "es" },
  { text: "Bonjour", language: "Français", lang: "fr" },
  { text: "नमस्ते", language: "हिन्दी", lang: "hi" },
];

const Welcome = ({ onComplete }) => {
  const [activeGreeting, setActiveGreeting] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isClosing) {
      const timeout = window.setTimeout(onComplete, 900);
      return () => window.clearTimeout(timeout);
    }

    const isLastGreeting = activeGreeting === greetings.length - 1;
    const timeout = window.setTimeout(() => {
      if (isLastGreeting) {
        setIsClosing(true);
      } else {
        setActiveGreeting((current) => current + 1);
      }
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [activeGreeting, isClosing, onComplete]);

  const greeting = greetings[activeGreeting];

  return (
    <section
      aria-label="Welcome"
      className={`fixed inset-0 z-50 grid min-h-[100svh] place-items-center overflow-hidden bg-black px-6 text-white transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isClosing
          ? "pointer-events-none scale-[1.04] opacity-0 blur-sm"
          : "scale-100 opacity-100 blur-0"
      }`}
    >
      <img
        src={appleWallpaper}
        alt=""
        aria-hidden="true"
        className="welcome-art pointer-events-none absolute -right-24 top-1/2 h-[75svh] max-h-[680px] w-auto -translate-y-1/2 opacity-[0.12] grayscale brightness-0 invert sm:right-[8%]"
      />
      <div className="relative w-full max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
          Hikmal Alfatih
        </p>
        <div
          className="mt-12 min-h-36"
          aria-live="polite"
          aria-atomic="true"
        >
          <p
            key={greeting.lang}
            lang={greeting.lang}
            dir={greeting.lang === "ar" ? "rtl" : "auto"}
            className="animate-[welcome-in_500ms_ease-out_both] text-6xl font-semibold tracking-tight sm:text-8xl"
          >
            {greeting.text}
          </p>
          <p className="mt-4 text-sm tracking-[0.2em] text-white/55">
            {greeting.language}
          </p>
        </div>
        <p className="mt-12 text-xs tracking-[0.24em] text-white/40">
          {isClosing ? "WELCOME" : "A MOMENT IN EVERY LANGUAGE"}
        </p>
      </div>
      <style>{`
        @keyframes welcome-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .welcome-art {
          animation: welcome-float 9s ease-in-out infinite alternate;
        }
        @keyframes welcome-float {
          from { transform: translateY(-48%) rotate(-5deg) scale(.96); }
          to { transform: translateY(-52%) rotate(5deg) scale(1.04); }
        }
        @keyframes site-reveal {
          from { opacity: 0; transform: translateY(18px) scale(.99); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .welcome-art { animation: none; }
          .welcome-art, [class*="animate-"] { animation-duration: 1ms !important; }
        }
      `}</style>
    </section>
  );
};

export default Welcome;
