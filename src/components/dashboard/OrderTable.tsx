"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Search,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  { id: "#12548", customer: "Ahmet Yılmaz", date: "12 May 2024", status: "Tamamlandı", amount: "₺1,250.00" },
  { id: "#12549", customer: "Ayşe Demir", date: "11 May 2024", status: "Bekliyor", amount: "₺850.50" },
  { id: "#12550", customer: "Mehmet Kaya", date: "10 May 2024", status: "İptal", amount: "₺2,100.00" },
  { id: "#12551", customer: "Fatma Şahin", date: "10 May 2024", status: "Tamamlandı", amount: "₺450.00" },
  { id: "#12552", customer: "Can Özkan", date: "09 May 2024", status: "Bekliyor", amount: "₺1,120.00" },
  { id: "#12553", customer: "Selin Ak", date: "09 May 2024", status: "Tamamlandı", amount: "₺3,400.00" },
  { id: "#12554", customer: "Deniz Yıldız", date: "08 May 2024", status: "İptal", amount: "₺95.00" },
  { id: "#12555", customer: "Ece Er", date: "08 May 2024", status: "Tamamlandı", amount: "₺1,750.00" },
];

export function OrderTable({ openDetails }: { openDetails?: (order: any) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const currentData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Tamamlandı": return "success";
      case "Bekliyor": return "warning";
      case "İptal": return "error";
      default: return "default";
    }
  };

  return (
    <Card className="overflow-hidden border border-black/5 dark:border-white/5 shadow-card">
      {/* Table Header Controls */}
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-bold text-secondary-grey-900 dark:text-white">Recent Orders</h3>
        
        <div className="flex items-center gap-2">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-apple-gray" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="rounded-xl bg-black/5 dark:bg-white/5 pl-10 pr-4 py-2 text-sm text-secondary-grey-900 dark:text-white outline-none focus:ring-1 focus:ring-apple-blue/20"
              />
           </div>
        </div>
      </div>

      {/* Table Content - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-apple-gray">ID</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-apple-gray">Customer</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-apple-gray">Date</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-apple-gray">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-apple-gray text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {currentData.map((order) => (
              <tr 
                key={order.id} 
                className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
                onClick={() => openDetails?.(order)}
              >
                <td className="px-6 py-4 text-[13px] font-semibold text-apple-blue">{order.id}</td>
                <td className="px-6 py-4">
                   <span className="text-[14px] font-medium text-secondary-grey-900 dark:text-white">{order.customer}</span>
                </td>
                <td className="px-6 py-4 text-[13px] text-apple-gray">{order.date}</td>
                <td className="px-6 py-4">
                  <Badge className="rounded-full px-3 py-1" variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </td>
                <td className="px-6 py-4 text-[14px] font-semibold text-secondary-grey-900 dark:text-white text-right">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stack View - Mobile */}
      <div className="md:hidden divide-y divide-black/5 dark:divide-white/5">
         {currentData.map((order) => (
           <div 
            key={order.id} 
            className="p-6 space-y-4 active:bg-black/5 transition-colors"
            onClick={() => openDetails?.(order)}
           >
              <div className="flex justify-between items-start">
                 <div>
                    <p className="text-xs font-bold text-apple-blue">{order.id}</p>
                    <p className="text-base font-bold text-secondary-grey-900 dark:text-white">{order.customer}</p>
                 </div>
                 <Badge className="rounded-full px-3 py-1" variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </div>
              <div className="flex justify-between items-end">
                 <p className="text-xs text-apple-gray font-medium">{order.date}</p>
                 <p className="text-base font-bold text-secondary-grey-900 dark:text-white">{order.amount}</p>
              </div>
           </div>
         ))}
      </div>


      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 p-6">
        <p className="text-sm text-secondary-grey-400">
           Gösterilen <span className="font-bold text-secondary-grey-700">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, orders.length)}</span> / <span className="font-bold text-secondary-grey-700">{orders.length}</span>
        </p>
        
        <div className="flex items-center gap-2">
           <Button 
            variant="secondary" 
            size="sm" 
            className="px-2"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
           >
              <ChevronLeft size={18} />
           </Button>
           
           {[...Array(totalPages)].map((_, i) => (
             <button
               key={i + 1}
               onClick={() => setCurrentPage(i + 1)}
               className={cn(
                 "h-8 w-8 rounded-lg text-sm font-bold transition-all",
                 currentPage === i + 1 
                  ? "bg-brand-500 text-white shadow-sm" 
                  : "text-secondary-grey-400 hover:bg-brand-50 hover:text-brand-500"
               )}
             >
               {i + 1}
             </button>
           ))}

           <Button 
            variant="secondary" 
            size="sm" 
            className="px-2"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
           >
              <ChevronRight size={18} />
           </Button>
        </div>
      </div>
    </Card>
  );
}
