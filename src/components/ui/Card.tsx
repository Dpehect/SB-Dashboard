"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass";
  delay?: number;
}

export function Card({ children, className, variant = "default", delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: delay 
      }}
      whileHover={{ y: -2, scale: 1.005 }}
      className={cn(
        "rounded-3xl p-6 transition-all duration-300 glass",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

