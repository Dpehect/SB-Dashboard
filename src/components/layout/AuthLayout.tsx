"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF9F6]">
      {/* Niche Editorial Background Layer */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-[#1A1A1A] skew-y-[-4deg] origin-top-left -translate-y-24 z-0 shadow-2xl" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

      {/* Organic Floating Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[120px]" 
         />
      </div>

      <div className="relative z-10 w-full max-w-lg h-full md:h-auto flex flex-col justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 70, 
            damping: 20,
            mass: 1.2
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
