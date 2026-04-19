import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-[#fff0f3] antialiased">{children}</body>
    </html>
  );
}