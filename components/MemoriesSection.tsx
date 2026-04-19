"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MemoryCard from "@/components/MemoryCard";
import Image from "next/image";

const PREDEFINED_MEMORIES = [
  {
    src: "/rose.png",
    caption: "Every Rose Reminds Me of You 🌹",
    isFeatured: true,
    featuredTag: "A Special Gift 🌹",
  },
  {
    src: "/image.png",
    caption: "Our Moment 💖",
  },
  {
    src: "/image1.png",
    caption: "First Time Together 🌙",
  },
  {
    src: "/image2.png",
    caption: "That Day… My Heart Knew ❤️",
  },
  {
    src: "/imageme.png",
    caption: "You Are My Always 💞",
  },
];

interface SectionProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Memories({ setActivePage }: SectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Note: We are using predefined paths for security as requested.
  // Manual upload feature is disabled to ensure only local assets are loaded.

  return (
    <div id="memories" className="w-full relative min-h-screen flex flex-col transition-colors duration-700 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50 dark:from-[#2a0826] dark:via-[#19041a] dark:to-[#3b0a2a] pt-20 border-t border-rose-100 dark:border-[#3b0a2a]">
      <main className="relative z-10 pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block text-5xl mb-4 heartbeat"
          >
            📸
          </motion.span>

          <h1
            className="text-5xl md:text-7xl font-bold text-rose-500 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Our Memories
          </h1>

          <p
            className="text-rose-400 text-xl md:text-2xl max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.4rem" }}
          >
            Every picture here is not just a memory...<br/>
            it’s a feeling I never want to lose 💕
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-rose-300 to-transparent"
          />
        </motion.div>

        {/* Memory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PREDEFINED_MEMORIES.map((memory, i) => (
            <MemoryCard
              key={memory.src}
              src={memory.src}
              caption={memory.caption}
              index={i}
              isFeatured={memory.isFeatured}
              featuredTag={memory.featuredTag}
              onClick={() => setSelectedImage(memory.src)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mt-20"
        >
          <p
            className="text-rose-400 text-2xl mb-10 italic"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            These are just a few... the best ones live in my heart ✨
          </p>
          <motion.button
            onClick={() => setActivePage("letter")}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(244,63,94,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-12 py-4 rounded-2xl shadow-lg text-lg tracking-wide transition-all duration-300"
          >
            Read My Letter 💌
          </motion.button>
        </motion.div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected Memory"
                fill
                className="object-contain"
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white text-3xl hover:text-rose-400 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}