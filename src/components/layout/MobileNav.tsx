"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  User, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileRoutes = [
  { label: "Dash", icon: LayoutDashboard, href: "/" },
  { label: "Ürünler", icon: Package, href: "/products" },
  { label: "Siparişler", icon: ShoppingBag, href: "/orders" },
  { label: "Profil", icon: User, href: "/profile" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-[100] w-full lg:hidden">
      {/* iOS Style Blur Background */}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-black/5 dark:border-white/5" />
      
      <div className="relative flex items-center justify-around h-20 pb-4 px-6">
        {mobileRoutes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link 
              key={route.href} 
              href={route.href}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={cn(
                "h-10 w-10 flex items-center justify-center rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-apple-blue text-white shadow-lg shadow-apple-blue/20" 
                  : "text-apple-gray hover:bg-black/5 dark:hover:bg-white/5"
              )}>
                <route.icon size={22} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isActive ? "text-apple-blue" : "text-apple-gray"
              )}>
                {route.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
