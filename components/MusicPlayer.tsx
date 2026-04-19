"use client";

import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  src?: string;
}

export default function MusicPlayer({ src = "/music/song.mp3" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.pause();
    };
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((v) => !v);
  };

  return (
    <button
      id="music-player-btn"
      onClick={toggle}
      title={playing ? "Pause music" : "Play music"}
      aria-label={playing ? "Pause background music" : "Play background music"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md text-rose-500 border border-rose-100 rounded-2xl px-4 py-3 shadow-lg hover:shadow-rose-200/60 hover:bg-white transition-all duration-300 group"
    >
      <span className="text-xl">{playing ? "⏸️" : "🎵"}</span>
      <span className="text-sm font-semibold hidden sm:inline text-rose-400 group-hover:text-rose-500 transition-colors">
        {playing ? "Pause" : "Our Song"}
      </span>
      {/* Progress bar */}
      {playing && (
        <div className="hidden sm:flex gap-0.5 items-end h-4 ml-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-0.5 bg-rose-400 rounded-full"
              style={{
                height: `${Math.random() * 10 + 4}px`,
                animation: `heartbeat ${0.5 + i * 0.15}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
}
