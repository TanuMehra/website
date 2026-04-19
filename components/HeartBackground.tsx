"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["❤️", "💖", "💕", "💗", "💓", "🌹", "✨", "💝"];

export default function HeartBackground() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    
    // Wrap in timeout to avoid synchronous setState warning in some environments
    const timer = setTimeout(() => setHearts(generated), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 float-heart select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: 0.7,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}