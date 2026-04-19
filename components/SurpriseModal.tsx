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

      const colors = ["#f43f5e", "#fb7185", "#fda4af", "#fce7f3", "#eb4d4b", "#686de0"];
      const shapes = [confetti.shapeFromText({ text: "❤️", scalar: 2 })];

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 2.5,
      });

      setTimeout(() => {
        confetti({ particleCount: 80, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors });
        confetti({ particleCount: 80, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors });
      }, 400);

      setTimeout(() => (hasConfetti.current = false), 2000);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="surprise-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex items-center justify-center z-[200] px-4 touch-none pointer-events-auto"
          style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(31, 9, 22, 0.8)" }}
        >
          <motion.div
            id="surprise-modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="relative max-w-xl w-full text-center"
          >
            {/* Main glass card */}
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.4)] border border-white/20 select-none">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  filter: ["drop-shadow(0 0 10px rgba(244,63,94,0))", "drop-shadow(0 0 20px rgba(244,63,94,0.6))", "drop-shadow(0 0 10px rgba(244,63,94,0))"]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-9xl mb-12 inline-block"
              >
                💖
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                I knew it... 💖
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl md:text-3xl text-rose-100/90 mb-14 leading-relaxed tracking-wide"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                And I promise...<br/>
                I will spend my life proving<br/>
                that your click was the best decision ever 💞
              </motion.div>

              <motion.button
                id="surprise-modal-close"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255,255,255,1)",
                  color: "#f43f5e"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-white text-rose-500 font-bold px-20 py-5 rounded-full shadow-2xl text-xl tracking-widest uppercase transition-all duration-300 transform"
              >
                Continue 💕
              </motion.button>
            </div>

            {/* Background glow behind card */}
            <div className="absolute -inset-10 bg-rose-500/20 rounded-full mix-blend-screen blur-[100px] -z-10 animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}