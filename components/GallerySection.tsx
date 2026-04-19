"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface UploadedImage {
  id: string;
  url: string;
}

interface SectionProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Gallery({ setActivePage }: SectionProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("love_gallery_images");
    
    // Wrap in timeout to avoid synchronous setState warning
    const timer = setTimeout(() => {
      setIsClient(true);
      if (saved) {
        try {
          setImages(JSON.parse(saved));
        } catch {
          console.error("Failed to parse saved gallery images");
        }
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Save changes to local storage whenever images update
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("love_gallery_images", JSON.stringify(images));
      } catch (e: unknown) {
        if (e && typeof e === 'object' && ('name' in e || 'code' in e)) {
          const err = e as { name?: string; code?: number };
          if (err.name === "QuotaExceededError" || err.code === 22) {
            toast.error("Local storage limit reached! Please delete some older memories.");
          }
        }
      }
    }
  }, [images, isClient]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          
          const max_size = 600;
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7)); // compress to 70% quality JPEG to save local storage space
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadPromise = async () => {
      let uploaded = 0;
      for (let i = 0; i < files.length; i++) {
          const file = files[i];
          try {
              const compressedUrl = await compressImage(file);
              const newImage: UploadedImage = {
                  id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                  url: compressedUrl,
              };
              setImages((prev) => [newImage, ...prev]);
              uploaded++;
          } catch (error) {
              console.error("Error compressing image", error);
              throw new Error("Failed to process one or more images.");
          }
      }
      return uploaded;
    };

    toast.promise(uploadPromise(), {
      loading: 'Uploading memories...',
      success: (count) => `Successfully added ${count} new memor${count === 1 ? 'y' : 'ies'}! 💖`,
      error: 'Failed to upload images 😢',
    });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Memory deleted.");
  };

  if (!isClient) return null;

  return (
    <div id="gallery" className="w-full relative min-h-screen flex flex-col justify-center transition-colors duration-700 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50 dark:from-[#2a0826] dark:via-[#19041a] dark:to-[#3b0a2a] pt-20 border-t border-rose-200 dark:border-[#4a1538]">
      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl font-bold text-rose-500 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Our Personal Gallery 🖼️
          </h1>
          <p
            className="text-rose-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Upload and save your favorite memories here. These are saved just for you on this device.
          </p>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="pulse-glow relative inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-rose-200/50 hover:from-rose-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Memory
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
          />
        </motion.div>

        {images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-rose-300 mt-20"
          >
            <span className="text-6xl block mb-4 opacity-50">☁️</span>
            <p className="text-xl font-medium">No images uploaded yet.</p>
            <p className="mt-2 opacity-80">Click the button above to add some magic!</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  key={img.id}
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm shadow-xl shadow-rose-100/40 border border-white"
                >
                  <Image
                    src={img.url}
                    alt="Uploaded memory"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={img.url.startsWith('data:')}
                  />
                  {/* Glassmorphism Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-500/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium text-sm drop-shadow-md mb-2">Beautiful Memory 💖</p>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(img.id, e)}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-rose-500 hover:text-white text-rose-500 backdrop-blur-md p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    title="Delete image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-20"
        >
          <motion.button
            onClick={() => setActivePage("memories")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/80 backdrop-blur-sm text-rose-500 font-bold px-12 py-4 rounded-2xl border-2 border-rose-100 shadow-md text-base tracking-wide transition-all duration-300 hover:bg-white"
          >
            Back to Memories ⬅️
          </motion.button>
          <motion.button
            onClick={() => setActivePage("letter")}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(244,63,94,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold px-12 py-4 rounded-2xl shadow-lg text-base tracking-wide transition-all duration-300"
          >
            Read My Letter 💌
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
