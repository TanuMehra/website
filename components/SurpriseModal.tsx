"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurpriseModal({ isOpen, onClose }: SurpriseModalProps) {
  const hasConfetti = useRef(false);

  useEffect(() => {
    if (isOpen && !hasConfetti.current) {
      hasConfetti.current = true;

      // Heart burst confetti
      const colors = ["#f43f5e", "#fb7185", "#fda4af", "#fce7f3", "#FF69B4", "#FF1493"];
      const shapes = [confetti.shapeFromText({ text: "❤️", scalar: 2 })];

      // First burst from center top
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { x: 0.5, y: 0.3 },
        colors,
        shapes,
        scalar: 2,
        gravity: 0.8,
        drift: 0,
      });

      // Sides
      setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.5 }, colors });
        confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.5 }, colors });
      }, 300);

      setTimeout(() => hasConfetti.current = false, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="surprise-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-[100] px-4"
          style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            id="surprise-modal-content"
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative max-w-md w-full text-center"
          >
            {/* Glass card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-rose-200/60 border border-rose-100/60">
              {/* Pulsing heart */}
              <motion.div
                animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-7xl mb-4 inline-block"
              >
                ❤️
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl md:text-4xl text-rose-600 font-bold mb-3 leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                I Love You Forever
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-rose-400 text-lg mb-2"
                style={{ fontFamily: "Dancing Script, cursive", fontSize: "1.25rem" }}
              >
                Always &amp; Unconditionally
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-rose-300 text-base mt-2 mb-8 leading-relaxed"
              >
                You are my everything. My heart beats only for you.
                No words can fully express how much you mean to me. 💖
              </motion.p>

              <motion.button
                id="surprise-modal-close"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(244,63,94,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-10 py-3.5 rounded-2xl shadow-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-300 text-base tracking-wide"
              >
                Close with Love 💝
              </motion.button>
            </div>

            {/* Decorative rings */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-300/20 to-pink-300/20 -z-10 blur-xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}