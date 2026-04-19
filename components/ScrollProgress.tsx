"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 origin-left z-50 rounded-r-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
