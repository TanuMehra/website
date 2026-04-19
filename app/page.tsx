"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import HeartBackground from "../components/HeartBackground";
import SurpriseModal from "../components/SurpriseModal";
import TypingText from "../components/TypingText";
import CountdownTimer from "../components/CountdownTimer";
import MusicPlayer from "../components/MusicPlayer";

const TYPING_TEXTS = [
  "You are my sunshine ☀️",
  "My heart belongs to you 💕",
  "Every moment with you is magic ✨",
  "You make me smile every day 🌸",
  "I cherish every memory we share 💝",
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [easterTriggered, setEasterTriggered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Easter egg: triple-click the title shows a secret message
  const handleTitleClick = () => {
    setClickCount((c) => {
      const next = c + 1;
      if (next >= 3) {
        setEasterTriggered(true);
        setTimeout(() => setEasterTriggered(false), 3000);
        return 0;
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <HeartBackground />
      <MusicPlayer />

      {/* ──────────────────────────────────────────
          ENTRY SCREEN
      ────────────────────────────────────────── */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center text-center px-6"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, #fce4ec 0%, #f8bbd0 40%, #f48fb1 80%)",
            }}
          >
            {/* Decorative blobs */}
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-pink-300/30 blur-3xl" />

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="text-6xl mb-6 heartbeat inline-block"
            >
              ❤️
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Hey Love ❤️
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="text-white/90 text-xl md:text-2xl mb-10 max-w-md leading-relaxed"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              I made something just for you...
              <br />
              <span className="text-white/70 text-lg">with all my heart 💖</span>
            </motion.p>

            <motion.button
              id="entry-button"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.07, boxShadow: "0 20px 60px rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEntered(true)}
              className="pulse-glow bg-white text-rose-500 font-bold text-lg px-12 py-4 rounded-2xl shadow-2xl tracking-wide cursor-pointer transition-all duration-300 border-2 border-white/60"
            >
              Enter 💖
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────
          MAIN CONTENT (shown after entry)
      ────────────────────────────────────────── */}
      <AnimatePresence>
        {entered && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Navbar />

            {/* ── HERO SECTION ── */}
            <section
              id="home"
              className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative"
              style={{
                background:
                  "linear-gradient(135deg, #fff0f3 0%, #fce4ec 40%, #f8bbd0 80%, #fce4ec 100%)",
              }}
            >
              {/* Decorative blobs */}
              <div className="absolute top-20 left-0 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-rose-400 text-sm font-semibold px-5 py-2 rounded-full border border-rose-100 shadow-sm mb-8"
              >
                <span className="heartbeat inline-block">❤️</span>
                Made with love, just for you
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                onClick={handleTitleClick}
                className="text-6xl md:text-8xl font-bold text-rose-500 mb-6 leading-none cursor-pointer select-none"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                For You ❤️
              </motion.h1>

              {/* Easter egg message */}
              <AnimatePresence>
                {easterTriggered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-2xl border border-rose-100 z-20"
                  >
                    <p className="text-rose-500 font-bold text-xl">🤫 You found my secret!</p>
                    <p className="text-rose-400 text-sm mt-1" style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.1rem" }}>
                      You're the only one who has my whole heart 💕
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="text-xl md:text-2xl text-rose-400 mb-12 h-10"
                style={{ fontFamily: "Dancing Script, cursive", minHeight: "3rem" }}
              >
                <TypingText texts={TYPING_TEXTS} />
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 mb-20"
              >
                <motion.a
                  href="/memories"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(244,63,94,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg text-base tracking-wide cursor-pointer transition-all duration-300"
                >
                  See Our Memories 📸
                </motion.a>
                <motion.a
                  href="/letter"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(244,63,94,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/80 backdrop-blur-sm text-rose-500 font-bold px-10 py-4 rounded-2xl border-2 border-rose-100 shadow-md text-base tracking-wide cursor-pointer transition-all duration-300 hover:bg-white"
                >
                  Read My Letter 💌
                </motion.a>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="w-full max-w-lg"
              >
                <CountdownTimer />
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-rose-300"
              >
                <span className="text-xs tracking-widest uppercase font-semibold">Scroll</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-xl"
                >
                  ↓
                </motion.div>
              </motion.div>
            </section>

            {/* ── FINAL SURPRISE SECTION ── */}
            <section
              id="surprise"
              className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative"
              style={{
                background:
                  "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="max-w-xl w-full"
              >
                {/* Floating hearts decoration */}
                <div className="flex justify-center gap-4 mb-8">
                  {["💖", "❤️", "💕", "💗"].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.3 }}
                      className="text-3xl"
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                <h2
                  className="text-4xl md:text-5xl font-bold text-rose-500 mb-4"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  One Last Thing...
                </h2>
                <p
                  className="text-rose-400 text-xl mb-10 leading-relaxed"
                  style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.4rem" }}
                >
                  Press the button below if you believe in us 💕
                </p>

                <motion.button
                  id="surprise-cta-button"
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 25px 60px rgba(244,63,94,0.55)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setModalOpen(true)}
                  className="pulse-glow bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 text-white font-bold text-lg md:text-xl px-14 py-5 rounded-2xl shadow-2xl tracking-wide cursor-pointer transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">
                    Click only if you love me ❤️
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <p className="text-rose-300 text-sm mt-5">
                  (I already know the answer 😉)
                </p>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <SurpriseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}