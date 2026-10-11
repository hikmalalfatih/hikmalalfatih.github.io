"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const stars = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 67.73 + 3) % 100}%`,
  top: `${(index * 37.19 + 5) % 100}%`,
  size: 1 + (index % 3),
  delay: `${-((index * 1.37) % 8)}s`,
}));

const meteors = Array.from({ length: 5 }, (_, index) => ({
  left: `${(index * 31 + 12) % 105}%`,
  top: `${(index * 23 + 3) % 82}%`,
  width: `${110 + (index % 3) * 45}px`,
  duration: `${3.2 + (index % 4) * 0.85}s`,
  delay: `${-((index * 2.7) % 12)}s`,
}));

export default function GalaxyBackground() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const galaxyX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -260]);
  const galaxyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 340]);
  const starsX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 150]);
  const starsY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -240]);
  const horizontalOffset = useMotionValue(0);
  const horizontalDrift = useSpring(horizontalOffset, { stiffness: 52, damping: 19, mass: 0.8 });

  useEffect(() => {
    if (reduceMotion) return;
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < Math.abs(event.deltaY) * 0.25) return;
      horizontalOffset.set(
        Math.max(-360, Math.min(360, horizontalOffset.get() - event.deltaX * 0.65)),
      );
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [horizontalOffset, reduceMotion]);

  return (
    <div className="galaxy-background" aria-hidden="true">
      <motion.div
        className="galaxy-stars"
        style={{ x: starsX, y: starsY }}
      >
        <motion.div className="galaxy-star-drift" style={{ x: horizontalDrift }}>
          {stars.map((star, index) => (
            <i
              className="galaxy-star"
              key={index}
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="galaxy-parallax" style={{ x: galaxyX, y: galaxyY }}>
        <motion.div className="galaxy-horizontal-drift" style={{ x: horizontalDrift }}>
          <div className="galaxy-nebula" />
          <div className="galaxy-disc">
            <span className="galaxy-core" />
          </div>
        </motion.div>
      </motion.div>
      {!reduceMotion && (
        <motion.div className="meteor-field" style={{ x: horizontalDrift, y: galaxyY }}>
          {meteors.map((meteor, index) => (
            <i
              className="falling-meteor"
              key={index}
              style={{
                left: meteor.left,
                top: meteor.top,
                width: meteor.width,
                animationDuration: meteor.duration,
                animationDelay: meteor.delay,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
