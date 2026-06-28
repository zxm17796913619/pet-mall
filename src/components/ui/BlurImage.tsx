"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function BlurImage({ src, alt, className = "", aspectRatio }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallback = `https://picsum.photos/seed/${encodeURIComponent(alt)}/600/800`;

  return (
    <div className={`relative overflow-hidden bg-[#E8E3DC] ${aspectRatio ?? ""} ${className}`}>
      {/* Blur placeholder */}
      <motion.div
        className="absolute inset-0 bg-[#E8E3DC]"
        animate={{ opacity: loaded ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.img
        src={error ? fallback : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover ${className}`}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        loading="lazy"
      />
    </div>
  );
}
