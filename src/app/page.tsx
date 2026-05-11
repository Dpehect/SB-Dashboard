"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { statData } from "@/lib/mockData";
import { 
  BarChart3, 
  TrendingUp,
  Package,
  CreditCard,
  User,
  ShoppingBag,
  LayoutDashboard
} from "lucide-react";

import { redirect } from "next/navigation";

export default function Home() {
  // Demo gereği başlangıçta login sayfasına yönlendiriyoruz
  redirect("/auth");
  
  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="visionary-title text-4xl">Hoş Geldiniz, Ahmet</h1>
        <p className="visionary-alt mt-2">Bugün için işletme özetiniz burada.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statData.map((stat, i) => (
          <StatCard 
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendType={stat.trendType as "up" | "down"}
            delay={i * 0.1}
            icon={i === 0 ? <CreditCard /> : i === 1 ? <User /> : i === 2 ? <ShoppingBag /> : <LayoutDashboard />}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
           <SalesChart />
        </div>
        
        <div className="lg:col-span-4">
           <Card className="h-full flex flex-col justify-between py-8">
              <div>
                 <h3 className="visionary-title text-xl px-2">Hızlı İşlemler</h3>
                 <p className="visionary-alt mt-1 px-2">Sık kullanılan araçlar</p>
              </div>
              
              <div className="space-y-4 mt-8">
                 <QuickActionItem 
                    title="Ürün Ekle" 
                    desc="Yeni bir ürün girişi yapın" 
                    icon={<Package size={20} className="text-apple-blue" />}
                 />
                 <QuickActionItem 
                    title="Rapor Al" 
                    desc="Detaylı Excel çıktısı oluşturun" 
                    icon={<BarChart3 size={20} className="text-apple-blue" />}
                 />
                 <QuickActionItem 
                    title="Kampanya" 
                    desc="Yeni indirim kuponu tanımlayın" 
                    icon={<TrendingUp size={20} className="text-apple-blue" />}
                 />
              </div>
              
              <div className="mt-8 px-2">
                 <Button className="w-full">Tüm İşlemleri Gör</Button>
              </div>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function QuickActionItem({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer group active:scale-95">
       <div className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-black transition-all shadow-sm">
          {icon}
       </div>
       <div>
          <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white">{title}</p>
          <p className="text-xs text-apple-gray font-medium">{desc}</p>
       </div>
    </div>
  );
}
