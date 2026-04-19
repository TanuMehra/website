"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeartBackground from "@/components/HeartBackground";
import MemoryCard from "@/components/MemoryCard";
import MusicPlayer from "@/components/MusicPlayer";

const MEMORIES = [
  {
    src: "/memories/memory1.png",
    caption: "The day we held hands and promised forever 🌅",
    date: "Our First Walk",
  },
  {
    src: "/memories/memory2.png",
    caption: "Coffee, laughter, and you — the perfect combination ☕",
    date: "Our Favorite Cafe",
  },
  {
    src: "/memories/memory3.png",
    caption: "Counting stars with you made the universe feel smaller 🌌",
    date: "A Night to Remember",
  },
  {
    src: "/memories/memory4.png",
    caption: "Walking through petals with you, every spring feels new 🌸",
    date: "Cherry Blossom Season",
  },
  {
    src: "/memories/memory5.png",
    caption: "A single rose, like the way you have a single piece of my heart 🌹",
    date: "Just Because",
  },
  {
    src: "/memories/memory6.png",
    caption: "Candlelight and you — the most beautiful evening of my life 🕯️",
    date: "Our Special Dinner",
  },
];

export default function Memories() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fff0f3 0%, #fce4ec 35%, #f8bbd0 70%, #fce4ec 100%)",
      }}
    >
      <HeartBackground />
      <MusicPlayer />
      <Navbar />

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
            Every moment with you is a treasure I hold close to my heart 💕
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
          {MEMORIES.map((memory, i) => (
            <MemoryCard
              key={memory.src}
              src={memory.src}
              caption={memory.caption}
              date={memory.date}
              index={i}
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
            className="text-rose-400 text-2xl mb-6"
            style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.6rem" }}
          >
            These are just a few... the best ones live in my heart 💖
          </p>
          <motion.a
            href="/letter"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(244,63,94,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-12 py-4 rounded-2xl shadow-lg text-base tracking-wide transition-all duration-300"
          >
            Read My Letter 💌
          </motion.a>
        </motion.div>
      </main>
    </div>
  );
}