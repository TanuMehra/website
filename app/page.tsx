"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeartBackground from "../components/HeartBackground";
import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import MemoriesSection from "../components/MemoriesSection";
import LetterSection from "../components/LetterSection";
import SurpriseSection from "../components/SurpriseSection";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="relative min-h-screen">
      <HeartBackground />

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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center text-center px-6 transition-colors duration-700 bg-[radial-gradient(ellipse_at_60%_40%,#fce4ec_0%,#f8bbd0_40%,#f48fb1_80%)] dark:bg-[radial-gradient(ellipse_at_60%_40%,#4a1538_0%,#2a0826_40%,#19041a_80%)]"
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
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-xl md:text-2xl text-rose-400 mb-10 leading-relaxed font-medium max-w-lg mx-auto" 
              style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.8rem" }}
            >
              I made something just for you...<br/>
              Something that holds a piece of my heart 💕
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              onClick={() => setEntered(true)}
              className="pulse-glow bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 text-white font-bold text-lg md:text-xl px-12 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Enter 💞
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────
          MAIN CONTENT (shown after entry)
      ────────────────────────────────────────── */}
      <AnimatePresence>
        {entered && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col w-full relative z-10"
          >
            <Navbar activePage={activePage} setActivePage={setActivePage} />
            <AnimatePresence mode="wait">
              {activePage === "home" && (
                <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <HomeSection setActivePage={setActivePage} />
                </motion.div>
              )}
              {activePage === "memories" && (
                <motion.div key="memories" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <MemoriesSection setActivePage={setActivePage} />
                </motion.div>
              )}
              {activePage === "letter" && (
                <motion.div key="letter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <LetterSection setActivePage={setActivePage} />
                </motion.div>
              )}
              {activePage === "final" && (
                <motion.div key="final" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
                  <SurpriseSection setActivePage={setActivePage} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}