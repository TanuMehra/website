"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ isDark: false, toggleDark: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("love_theme");
    
    // Wrap state updates in a timeout to avoid cascading render warnings
    const timer = setTimeout(() => {
      setMounted(true);
      if (savedTheme === "dark") {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("love_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("love_theme", "light");
    }
  };

  // Prevent flash of incorrect theme (hydration mismatch)
  if (!mounted) {
    return <span className="opacity-0">{children}</span>;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
