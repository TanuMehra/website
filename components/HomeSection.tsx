"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";
interface SectionProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function HomeSection({ setActivePage }: SectionProps) {
  const [easterTriggered, setEasterTriggered] = useState(false);
  const [, setClickCount] = useState(0);

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
    <>
      {/* ── HERO SECTION ── */}
      <section
        id="home"
        className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative transition-colors duration-700 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200 dark:from-[#2a0826] dark:via-[#19041a] dark:to-[#3b0a2a]"
      >
        <div className="absolute top-20 left-0 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />

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
                You&apos;re the only one who has my whole heart 💕
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mb-12"
        >
          <p
            className="text-lg md:text-2xl text-rose-400 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.8rem" }}
          >
            Out of all the moments in my life...<br/>
            the most beautiful ones are the ones with you 💫<br/><br/>
            You didn&apos;t just enter my life...<br/>
            you became my favorite place 🏡💖
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <motion.button
            onClick={() => setActivePage("memories")}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(244,63,94,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg text-base tracking-wide cursor-pointer transition-all duration-300"
          >
            See Our Memories 📸
          </motion.button>
          <motion.button
            onClick={() => setActivePage("letter")}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(244,63,94,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/80 backdrop-blur-sm text-rose-500 font-bold px-10 py-4 rounded-2xl border-2 border-rose-100 shadow-md text-base tracking-wide cursor-pointer transition-all duration-300 hover:bg-white"
          >
            Read My Letter 💌
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="w-full max-w-lg"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-rose-300"
        >
          <span className="text-xs tracking-widest uppercase font-semibold">Navigate</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
