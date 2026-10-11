"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const greetings = [
  { text: "Halo", language: "Indonesian", lang: "id", direction: "ltr" },
  { text: "Hello", language: "English", lang: "en", direction: "ltr" },
  { text: "مرحبا", language: "Arabic · Marhaba", lang: "ar", direction: "rtl" },
  { text: "Hola", language: "Spanish", lang: "es", direction: "ltr" },
  { text: "Bonjour", language: "French", lang: "fr", direction: "ltr" },
  { text: "Hallo", language: "German", lang: "de", direction: "ltr" },
  { text: "こんにちは", language: "Japanese", lang: "ja", direction: "ltr" },
  { text: "안녕하세요", language: "Korean", lang: "ko", direction: "ltr" },
  { text: "你好", language: "Chinese", lang: "zh", direction: "ltr" },
  { text: "नमस्ते", language: "Hindi", lang: "hi", direction: "ltr" },
  { text: "Ciao", language: "Italian", lang: "it", direction: "ltr" },
  { text: "Olá", language: "Portuguese", lang: "pt", direction: "ltr" },
  { text: "Merhaba", language: "Turkish", lang: "tr", direction: "ltr" },
  { text: "Привет", language: "Russian", lang: "ru", direction: "ltr" },
  { text: "สวัสดี", language: "Thai", lang: "th", direction: "ltr" },
  { text: "Sampurasun", language: "Sundanese", lang: "su", direction: "ltr" },
];

export default function GreetingSplash() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const [finalFrame, setFinalFrame] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("portfolio-welcome-seen")) return;
    setVisible(true);
    const started = performance.now();
    let ready = false;
    let completed = false;
    let finalFrameStarted = false;
    let greetingTimer = 0;
    let finishTimer = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const close = () => {
      if (completed) return;
      completed = true;
      setFinishing(true);
      sessionStorage.setItem("portfolio-welcome-seen", "true");
      document.documentElement.classList.remove("splash-active");
      finishTimer = window.setTimeout(() => setVisible(false), 550);
    };

    const showFinalFrame = () => {
      if (completed || finalFrameStarted) return;
      finalFrameStarted = true;
      setFinalFrame(true);
      finishTimer = window.setTimeout(close, 500);
    };

    document.documentElement.classList.add("splash-active");
    if (reduced) {
      greetingTimer = window.setTimeout(close, 1000);
    } else {
      const readinessParts: Promise<unknown>[] = [document.fonts?.ready ?? Promise.resolve()];
      if (profile.portraitUrl) {
        readinessParts.push(
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = profile.portraitUrl;
            if (image.complete) resolve();
          }),
        );
      }
      const readiness = Promise.all(readinessParts).then(() => {
        ready = true;
      });

      greetingTimer = window.setInterval(() => {
        const elapsed = performance.now() - started;
        setIndex((value) => (value + 1) % greetings.length);
        if (elapsed >= 4500 || (ready && elapsed >= 3000)) {
          window.clearInterval(greetingTimer);
          void readiness.then(showFinalFrame);
        }
      }, 260);

      window.setTimeout(() => {
        ready = true;
        if (performance.now() - started >= 3000) showFinalFrame();
      }, 5000);
    }

    return () => {
      window.clearInterval(greetingTimer);
      window.clearTimeout(finishTimer);
      document.documentElement.classList.remove("splash-active");
    };
  }, []);

  if (!visible) return null;
  const greeting = greetings[index];

  return (
    <motion.div
      className="welcome-splash"
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={
        finishing
          ? { opacity: 0, scale: 1.035, filter: "blur(12px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
      aria-label="Welcome"
    >
      <div className="splash-center">
        {finalFrame ? (
          <div className="splash-final">
            <p>Welcome to my portfolio</p>
            <strong>Hikmal Alfatih</strong>
            <span>Apple Hardware Repair · AI-Powered Productivity</span>
          </div>
        ) : reduceMotion ? (
          <div className="reduced-greetings">
            <div className="splash-greeting" lang="id"><span>Halo</span><small>Indonesian</small></div>
            <div className="splash-greeting" lang="en"><span>Hello</span><small>English</small></div>
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={greeting.lang}
              className="splash-greeting"
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.35 }}
              lang={greeting.lang}
              dir={greeting.direction}
            >
              <span>{greeting.text}</span>
              <small>{greeting.language}</small>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <p className="splash-signature">Hikmal Alfatih · Hardware & AI</p>
    </motion.div>
  );
}
