"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings, 
  CreditCard, 
  LogOut, 
  ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Profilim", icon: User, href: "/profile" },
    { label: "İşletme Ayarları", icon: Settings, href: "/isletme-kaydi" },
    { label: "Abonelik Planı", icon: CreditCard, href: "/billing" },
    { label: "Çıkış Yap", icon: LogOut, href: "/auth/login", danger: true },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
      >
        <div className="h-9 w-9 overflow-hidden rounded-full bg-apple-blue/10 flex items-center justify-center border border-apple-blue/20">
          <User size={20} className="text-apple-blue" />
        </div>
        <ChevronDown 
          size={14} 
          className={cn("text-apple-gray transition-transform duration-300", isOpen && "rotate-180")} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl glass shadow-2xl z-[100]"
          >
            <div className="p-2 space-y-1">
              <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 mb-1">
                <p className="text-[14px] font-bold text-secondary-grey-900 dark:text-white">Ahmet Yılmaz</p>
                <p className="text-[12px] text-apple-gray font-medium">ahmet@abctech.com</p>
              </div>
              
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all group",
                    item.danger 
                      ? "text-error hover:bg-error/10" 
                      : "text-secondary-grey-700 dark:text-apple-gray hover:bg-apple-blue/10 hover:text-apple-blue dark:hover:text-white"
                  )}
                >
                  <item.icon size={18} className={cn("transition-colors", item.danger ? "" : "group-hover:text-apple-blue")} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
