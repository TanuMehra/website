"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LETTER_PARAGRAPHS = [
  "I don't know how to explain this perfectly...",
  "but loving you feels like home.",
  "In a world full of temporary things,",
  "you are my forever 🌙",
  "I choose you...",
  "in every moment,",
  "in every lifetime ❤️",
  "Forever yours, always 💞",
];

interface SectionProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Letter({ setActivePage }: SectionProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < LETTER_PARAGRAPHS.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), visibleCount === 0 ? 600 : 1200);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  return (
    <div id="letter" className="w-full relative min-h-screen flex flex-col justify-center transition-colors duration-700 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50 dark:from-[#2a0826] dark:via-[#19041a] dark:to-[#3b0a2a] pt-20 border-t border-rose-100 dark:border-[#3b0a2a]">
      <main className="relative z-10 pt-28 pb-24 px-4 flex flex-col items-center overflow-x-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-block text-5xl mb-4 heartbeat"
          >
            💌
          </motion.span>
          <h1
            className="text-4xl md:text-6xl font-bold text-rose-500"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            My Love 💖
          </h1>
          <p
            className="text-rose-400 mt-3 text-lg"
            style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.25rem" }}
          >
            Written from the deepest part of my heart 🌹
          </p>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-2xl w-full"
        >
          {/* Glow effect */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-300/30 via-pink-200/30 to-rose-300/30 blur-xl -z-10" />

          <div className="bg-white/85 dark:bg-black/60 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl shadow-rose-200/40 dark:shadow-rose-900/40 border border-rose-100/60 dark:border-rose-900/60">
            {/* Decorative top bar */}
            <div className="flex justify-center mb-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              <span className="mx-3 text-rose-300 text-sm">❤️</span>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            </div>

            {/* Letter content */}
            <div className="space-y-5">
              {LETTER_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={visibleCount > i ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`leading-relaxed ${
                    i === 0
                      ? "text-rose-600 font-bold text-lg italic"
                      : i === LETTER_PARAGRAPHS.length - 1
                      ? "text-rose-500 font-semibold text-right pt-4 border-t border-rose-100"
                      : "text-rose-700/80 text-base sm:text-lg"
                  }`}
                  style={{
                    fontFamily:
                      i === 0 || i === LETTER_PARAGRAPHS.length - 1
                        ? "Dancing Script, cursive"
                        : "Playfair Display, serif",
                    fontSize:
                      i === 0 || i === LETTER_PARAGRAPHS.length - 1
                        ? "1.35rem"
                        : undefined,
                  }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Bottom decoration */}
            <div className="flex justify-center mt-10">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              <span className="mx-3 text-rose-300 text-sm">💕</span>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Action button - linear movement to Final section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visibleCount >= LETTER_PARAGRAPHS.length ? 1 : 0, y: visibleCount >= LETTER_PARAGRAPHS.length ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => setActivePage("final")}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(244,63,94,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-16 py-5 rounded-2xl shadow-lg text-lg tracking-wide"
          >
            One Last Thing 🎁
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}