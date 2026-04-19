"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MemoryCardProps {
  src: string;
  caption: string;
  index: number;
  isFeatured?: boolean;
  featuredTag?: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export default function MemoryCard({
  src,
  caption,
  index,
  isFeatured = false,
  featuredTag,
  onClick,
  onDelete,
}: MemoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 shadow-lg shadow-pink-100/30 hover:shadow-2xl hover:shadow-rose-300/50 border border-rose-50/50 bg-white dark:bg-[#2a0826] ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Featured Tag */}
      {isFeatured && featuredTag && (
        <div className="absolute top-4 left-4 z-20 bg-rose-500/90 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
          {featuredTag}
        </div>
      )}

      {/* Delete Button (only for non-local images usually, but we'll keep the logic) */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className={`relative overflow-hidden ${isFeatured ? "aspect-square md:aspect-[4/3]" : "aspect-[4/3]"}`}>
        <Image
          src={src}
          alt={caption}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p 
          className="text-white text-xl md:text-2xl font-bold drop-shadow-md"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          {caption}
        </p>
      </div>

      {/* Pink Glow Effect on Hover */}
      <div className="absolute inset-0 border-2 border-rose-400 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
