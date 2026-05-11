"use client";

import { Bell, Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { UserDropdown } from "./UserDropdown";

interface NavbarProps {
  onMenuClick: () => void;
  title: string;
}

export function Navbar({ onMenuClick, title }: NavbarProps) {
  return (
    <nav className="sticky top-4 z-30 mx-4 flex flex-col items-start justify-between rounded-2xl bg-white/60 p-4 backdrop-blur-xl transition-all md:flex-row md:items-center dark:bg-navy-800/60 border border-black/5 dark:border-white/5">
      {/* Left side: Breadcrumbs & Title */}
      <div className="mb-2 ml-2 md:mb-0">
        <p className="text-xs font-semibold text-apple-gray uppercase tracking-wider">
          {title}
        </p>
      </div>

      {/* Right side: Search & Icons */}
      <div className="flex w-full items-center gap-4 md:w-auto">
        <button 
          onClick={onMenuClick}
          className="mr-2 text-apple-gray lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-1 items-center gap-2 rounded-xl bg-black/5 px-4 py-2 md:w-64 dark:bg-white/10">
          <Search size={16} className="text-apple-gray" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-transparent text-[14px] text-secondary-grey-900 outline-none placeholder:text-apple-gray dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3 text-apple-gray">
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <Bell size={18} />
          </button>
          <ThemeToggle />
          
          <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-1" />
          
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
