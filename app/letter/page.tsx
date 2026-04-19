"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeartBackground from "@/components/HeartBackground";
import MusicPlayer from "@/components/MusicPlayer";

const LETTER_PARAGRAPHS = [
  "To my dearest love,",
  "From the moment you came into my life, everything changed. The colors became brighter, the music sounded sweeter, and somehow, being alive felt like a gift rather than a routine.",
  "You are my morning coffee and my late-night peace. You are the reason I smile at my phone when no one is watching, and the reason I sleep better knowing you exist in this world.",
  "I have crossed many distances — emotional, physical, and internal — but none felt as easy as finding my way back to you. You are home.",
  "I love the way you laugh at your own jokes, the way your eyes light up when you talk about what you love, and the way you make even the most ordinary moments feel extraordinary.",
  "I am not perfect, and neither are we — but what we have is real, and honest, and worth protecting. I choose you. Every morning. Every night. In every small and big way.",
  "Thank you for trusting me with your heart. I promise to hold it gently, cherish it deeply, and never take a single moment for granted.",
  "For as long as my heart beats — it beats for you. Always.",
  "Forever yours, always 💖",
];

export default function Letter() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < LETTER_PARAGRAPHS.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), visibleCount === 0 ? 600 : 1200);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fff0f3 0%, #fce4ec 40%, #f8bbd0 80%, #fce4ec 100%)",
      }}
    >
      <HeartBackground />
      <MusicPlayer />
      <Navbar />

      <main className="relative z-10 pt-28 pb-24 px-4 flex flex-col items-center">
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
            My Love Letter
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

          <div className="bg-white/85 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl shadow-rose-200/40 border border-rose-100/60">
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

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visibleCount >= LETTER_PARAGRAPHS.length ? 1 : 0, y: visibleCount >= LETTER_PARAGRAPHS.length ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.04, boxShadow: "0 15px 40px rgba(244,63,94,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg text-base tracking-wide text-center"
          >
            Back to Home 🏠
          </motion.a>
          <motion.a
            href="/memories"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/80 backdrop-blur-sm text-rose-500 font-bold px-10 py-4 rounded-2xl border-2 border-rose-100 shadow-md text-base tracking-wide text-center hover:bg-white transition-all"
          >
            See Our Memories 📸
          </motion.a>
        </motion.div>
      </main>
    </div>
  );
}