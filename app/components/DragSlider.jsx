"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function DragSlider({ children, onDragEnd, label }) {
  const viewportRef = useRef(null);

  return (
    <div ref={viewportRef} className="no-scrollbar overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={viewportRef}
        dragElastic={0.08}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab gap-3 pr-5 active:cursor-grabbing sm:gap-4"
        aria-label={label}
      >
        {children}
      </motion.div>
    </div>
  );
}
