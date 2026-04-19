"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface MemoryCardProps {
  src: string;
  caption: string;
  index: number;
  date?: string;
}

export default function MemoryCard({ src, caption, index, date }: MemoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg shadow-rose-100/50 border border-rose-50 hover:shadow-2xl hover:shadow-rose-200/50 transition-all duration-500 cursor-pointer"
    >
      {/* Image container with zoom on hover */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={caption}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Caption */}
      <div className="p-5">
        <p
          className="text-rose-600 font-medium text-base leading-snug"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {caption}
        </p>
        {date && (
          <p className="text-rose-300 text-xs mt-1.5 font-semibold tracking-wide uppercase">{date}</p>
        )}
      </div>

      {/* Hover heart badge */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
        <span className="text-2xl drop-shadow-lg">❤️</span>
      </div>
    </motion.div>
  );
}
