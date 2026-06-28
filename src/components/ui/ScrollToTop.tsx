"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-[80px] sm:bottom-[30px] right-[20px] sm:right-[30px] z-50 w-[44px] h-[44px] rounded-full bg-white shadow-lg border border-[#EEE] flex items-center justify-center hover:bg-[#F8F5F0] transition-colors"
          title="回到顶部"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 44 44"
          >
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#F0F0F0"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#B39B7E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.1s ease" }}
            />
          </svg>
          <ChevronUp size={18} className="text-[#B39B7E] relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
