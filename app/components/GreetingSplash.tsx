"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  { text: "Halo", language: "Indonesian", lang: "id", direction: "ltr" },
  { text: "Hello", language: "English", lang: "en", direction: "ltr" },
  { text: "مرحبا", language: "Arabic · Marhaba", lang: "ar", direction: "rtl" },
  { text: "你好", language: "Chinese", lang: "zh", direction: "ltr" },
  { text: "สวัสดี", language: "Thai", lang: "th", direction: "ltr" },
  { text: "こんにちは", language: "Japanese", lang: "ja", direction: "ltr" },
  { text: "Sampurasun", language: "Sundanese", lang: "su", direction: "ltr" },
];

export default function GreetingSplash({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const [finalFrame, setFinalFrame] = useState(false);

  useEffect(() => {
    let greetingTimer = 0;
    let finishTimer = 0;
    let greetingIndex = 0;

    const close = () => {
      setFinishing(true);
      document.documentElement.classList.remove("splash-active");
      finishTimer = window.setTimeout(() => {
        setVisible(false);
        onComplete();
      }, reduceMotion ? 80 : 180);
    };

    const showFinalFrame = () => {
      setFinalFrame(true);
      finishTimer = window.setTimeout(close, reduceMotion ? 500 : 1200);
    };

    document.documentElement.classList.add("splash-active");
    greetingTimer = window.setInterval(() => {
      greetingIndex += 1;
      if (greetingIndex < greetings.length) {
        setIndex(greetingIndex);
        return;
      }
      window.clearInterval(greetingTimer);
      showFinalFrame();
    }, reduceMotion ? 300 : 420);

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
          ? { opacity: 0, scale: 1.015 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: reduceMotion ? 0.08 : 0.18, ease: [0.22, 1, 0.36, 1] }}
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
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={greeting.lang}
              className="splash-greeting"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.22 }}
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
