"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleDark } = useTheme();

  const playClickSound = () => {
    const audio = new Audio("/music.mp3"); // Using available sound, kept very quiet and short
    audio.volume = 0.1;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setTimeout(() => audio.pause(), 500); // just a tiny blip
  };



  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={() => {
                playClickSound();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsOpen(false);
              }}
              className="bg-white/90 backdrop-blur text-pink-500 p-3 rounded-full shadow-lg border border-pink-100 hover:bg-pink-50 transition-all hover:scale-110 group"
              title="Scroll to Top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
              </svg>
            </button>
            <button
              onClick={() => {
                playClickSound();
                toggleDark();
                setIsOpen(false);
              }}
              className="bg-gray-800 text-yellow-300 p-3 rounded-full shadow-lg border border-gray-700 hover:bg-gray-900 transition-all hover:scale-110"
              title="Toggle Dark Mode"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          playClickSound();
          setIsOpen(!isOpen);
        }}
        className={`bg-gradient-to-tr from-pink-500 to-rose-400 text-white p-4 rounded-full shadow-xl shadow-rose-300/50 hover:shadow-2xl hover:shadow-rose-400/50 transition-transform duration-300 ${
          isOpen ? "rotate-45 scale-95" : "hover:scale-110"
        }`}
        title="Quick Actions"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}
