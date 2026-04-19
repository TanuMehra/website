"use client";

import { useEffect } from "react";

let globalAudio: HTMLAudioElement | null = null;
let hasStarted = false;

export default function MusicPlayer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!globalAudio) {
      globalAudio = new Audio("/music.mp3");
      globalAudio.loop = true;
      globalAudio.volume = 0.4;
    }

    const startMusic = () => {
      if (!hasStarted && globalAudio) {
        globalAudio
          .play()
          .then(() => {
            hasStarted = true;
            // Once started, we can cleanly remove the listeners
            removeListeners();
          })
          .catch((err) => {
            console.warn("Autoplay blocked by browser. Awaiting another interaction...", err);
          });
      }
    };

    const removeListeners = () => {
      document.removeEventListener("click", startMusic, { capture: true });
      document.removeEventListener("keydown", startMusic, { capture: true });
      document.removeEventListener("touchstart", startMusic, { capture: true });
    };

    // Only add listeners if it hasn't successfully started
    if (!hasStarted) {
      document.addEventListener("click", startMusic, { capture: true });
      document.addEventListener("keydown", startMusic, { capture: true });
      document.addEventListener("touchstart", startMusic, { capture: true });
    }

    return () => {
      // Cleanup happens if component unmounts before music starts
      // But we don't ever pause the actual audio!
      removeListeners();
    };
  }, []);

  return null; // Ensure this component is fully invisible!
}
