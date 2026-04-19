"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", emoji: "🏠" },
    { id: "memories", label: "Memories", emoji: "📸" },
    { id: "letter", label: "Letter", emoji: "💌" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-pink-100/50 border-b border-pink-100/60"
          : "bg-white/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setActivePage("home")} className="flex items-center gap-2 group" aria-label="Home">
          <span className="text-2xl heartbeat inline-block">❤️</span>
          <span
            className="font-script text-xl text-rose-500 font-bold tracking-wide group-hover:text-rose-600 transition-colors"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            My Love
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`relative font-medium transition-colors hover:text-rose-500 flex items-center gap-2 ${
                  isActive ? "text-rose-600 dark:text-rose-400 font-bold" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span>{link.emoji}</span>
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-rose-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-pink-50 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-rose-400 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-rose-400 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-rose-400 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-pink-100/60 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActivePage(link.id);
                      setMenuOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-xl transition-all font-medium flex items-center gap-3 ${
                      isActive
                        ? "bg-rose-50 dark:bg-[#3b0a2a] text-rose-600 dark:text-rose-400"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xl">{link.emoji}</span>
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}