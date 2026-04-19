"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SurpriseModal from "./SurpriseModal";

interface SectionProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function SurpriseSection({ setActivePage }: SectionProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <section
        id="surprise"
        className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative transition-colors duration-700 bg-gradient-to-br from-[#3b0a2a] via-[#19041a] to-[#3b0a2a] overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl w-full relative z-10"
        >
          <div className="flex justify-center gap-6 mb-12">
            {["💖", "❤️", "💕", "💗"].map((e, i) => (
              <motion.span
                key={i}
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5 + i * 0.5, 
                  delay: i * 0.4 
                }}
                className="text-4xl"
              >
                {e}
              </motion.span>
            ))}
          </div>

          <h2
            className="text-5xl md:text-6xl font-bold text-rose-500 mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            One Last Thing...
          </h2>
          
          <p
            className="text-rose-100/80 text-2xl md:text-3xl mb-16 leading-relaxed max-w-lg mx-auto italic"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            I don&apos;t need big promises,<br/>
            I just need you.<br/>
            If your heart feels the same...<br/>
            then you already know what to do 💕
          </p>

          <div className="flex justify-center items-center">
            <motion.button
              id="surprise-cta-button"
              whileHover={{ 
                scale: 1.08, 
                boxShadow: "0 0 80px rgba(244,63,94,0.6)",
                backgroundColor: "#fb7185" 
              }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowPopup(true)}
              className="pulse-glow bg-rose-500 text-white font-bold text-xl md:text-2xl px-16 py-6 rounded-full shadow-[0_20px_50px_rgba(244,63,94,0.4)] tracking-widest uppercase transition-all duration-500 relative group overflow-hidden"
            >
              <span className="relative z-10">Click only if you love me ❤️</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.button>
          </div>

          {!showPopup && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-rose-300/60 text-lg mt-12 tracking-wide font-medium"
            >
              (I already know the answer 😉)
            </motion.p>
          )}
        </motion.div>
      </section>

      <SurpriseModal 
        isOpen={showPopup} 
        onClose={() => {
          setShowPopup(false);
          setActivePage("home");
        }} 
      />
    </>
  );
}
