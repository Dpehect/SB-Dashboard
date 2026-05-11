"use client";

import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";
import { AnimatedPage } from "./AnimatedPage";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[var(--background)] font-sans transition-colors duration-300">
      {/* Sidebar hidden on mobile, MobileNav shown instead */}
      <div className="hidden lg:block">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
      
      <main className="flex-1 transition-all duration-300 lg:ml-64 mb-20 lg:mb-0">
        <Navbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          title="Dashboard" 
        />
        
        <div className="p-4 md:p-8 pt-6">
          <AnimatedPage>
            {children}
          </AnimatedPage>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}


