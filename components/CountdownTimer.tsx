"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const START_DATE = new Date("2025-09-02T00:00:00");

interface TimerState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getDiff(): TimerState {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - START_DATE.getTime());
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;
  const days = Math.floor(diff / 86400000);
  return { days, hours, minutes, seconds };
}

function Digit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-md shadow-rose-100/40"
      >
        <span
          className="text-2xl sm:text-3xl font-bold text-rose-500"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-xs text-rose-300 uppercase tracking-widest mt-2 font-semibold">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timer, setTimer] = useState<TimerState>(getDiff());

  useEffect(() => {
    const id = setInterval(() => setTimer(getDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p
        className="text-rose-400 text-sm uppercase tracking-widest font-semibold"
      >
        Together Since September 2, 2025 💕
      </p>
      <div className="flex gap-3 sm:gap-4">
        <Digit label="Days" value={timer.days} />
        <Digit label="Hours" value={timer.hours} />
        <Digit label="Mins" value={timer.minutes} />
        <Digit label="Secs" value={timer.seconds} />
      </div>
    </div>
  );
}
