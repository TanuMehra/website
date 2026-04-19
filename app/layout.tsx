import type { Metadata } from "next";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import HeartBackground from "@/components/HeartBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "For You, My Love ❤️",
  description: "A special surprise made just for you — a digital love letter to the one who means everything.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="transition-colors duration-700">
      <body className="bg-[#fff0f3] dark:bg-[#1f0916] text-gray-900 dark:text-rose-100 antialiased transition-colors duration-700">
        <ThemeProvider>
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              className: "dark:bg-gray-800 dark:text-rose-200",
              style: {
                background: "rgba(255, 255, 255, 0.95)",
                color: "#e11d48",
                backdropFilter: "blur(10px)",
                borderRadius: "1rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
              },
            }} 
          />
          <MusicPlayer />
          <HeartBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}