"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag,
  Package,
  Plus,
  Settings, 
  TableProperties,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Ürün Yönetimi",
    icon: Package,
    href: "/products",
  },
  {
    label: "Sipariş Takibi",
    icon: ShoppingBag,
    href: "/orders",
  },
  {
    label: "İşletme Profili",
    icon: Store,
    href: "/profile",
  },
  {
    label: "İşletme Kaydı",
    icon: Plus, // Using Plus as it was Business Registration (initial)
    href: "/isletme-kaydi",
  },
  {
    label: "Veri Tabloları",
    icon: TableProperties,
    href: "/tables",
  },
  {
    label: "Ayarlar",
    icon: Settings,
    href: "/ayarlar",
  },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-[var(--sidebar-bg)] backdrop-blur-xl transition-transform lg:translate-x-0 border-r border-black/5 dark:border-white/5",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-24 items-center px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-apple-blue flex items-center justify-center">
               <div className="h-4 w-4 rounded-full border-2 border-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-secondary-grey-900 dark:text-white">
              Dashboard
            </span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-8 right-4 text-apple-gray lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="mt-4 px-3 space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-apple-blue/10 text-apple-blue dark:bg-white/10 dark:text-white" 
                    : "text-apple-gray hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <route.icon 
                  size={18} 
                  className={cn(
                    "transition-colors",
                    isActive ? "text-apple-blue dark:text-white" : "text-apple-gray"
                  )}
                />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
