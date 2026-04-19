"use client";

import { motion } from "framer-motion";

interface SectionProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function About({ setActivePage }: SectionProps) {
  return (
    <div id="about" className="w-full relative min-h-screen flex flex-col justify-center transition-colors duration-700 bg-gradient-to-br from-rose-50 via-pink-100 to-rose-50 dark:from-[#3b0a2a] dark:via-[#2a0826] dark:to-[#3b0a2a] pt-20 border-t border-rose-200 dark:border-[#4a1538]">
      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-black/50 backdrop-blur-2xl p-10 sm:p-16 rounded-[3rem] shadow-2xl border border-white dark:border-rose-900/50"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-6xl mb-6 inline-block heartbeat">📖</span>
            <h1
              className="text-4xl sm:text-5xl font-bold text-rose-500 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              About Our Story
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-rose-600/90 dark:text-rose-100/80 text-lg leading-relaxed max-w-2xl text-center"
          >
            <p>
              This website is a digital love letter, a timeline of our sweetest moments, and a testament to how much you mean to me.
            </p>
            <p>
              Every pixel, every color, and every animation was carefully crafted to reflect the warmth and happiness you bring into my life every single day.
            </p>
            <p className="font-medium text-rose-500 text-2xl mt-8 italic" style={{ fontFamily: "Dancing Script, cursive" }}>
              &quot;Because forever wouldn&apos;t be long enough with you.&quot;
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <motion.button
            onClick={() => setActivePage("surprise")}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(244,63,94,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-16 py-5 rounded-2xl shadow-lg text-lg tracking-wide transition-all duration-300"
          >
            One Last Thing 🎁
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
