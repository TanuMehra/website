"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  texts: string[];
  className?: string;
}

export default function TypingText({ texts, className = "" }: TypingTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const current = texts[textIndex];
  const displayText = current.slice(0, charIndex);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, current.length]);

  return (
    <span className={className}>
      {displayText}
      <span className="cursor-blink text-rose-400 ml-0.5">|</span>
    </span>
  );
}
