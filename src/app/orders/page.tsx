"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { orders } from "@/lib/mockData";
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  CreditCard,
  Truck,
  Package,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDetails = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Teslim Edildi": return "success";
      case "Yolda": return "warning";
      case "Hazırlanıyor": return "default";
      default: return "default";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h2 className="visionary-title text-3xl">Sipariş Takibi</h2>
        <p className="visionary-alt mt-1">Gelen siparişleri ve teslimat süreçlerini yönetin.</p>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <th className="px-8 py-5 visionary-alt">Sipariş / Ürün</th>
                <th className="px-8 py-5 visionary-alt">Müşteri</th>
                <th className="px-8 py-5 visionary-alt">Tarih</th>
                <th className="px-8 py-5 visionary-alt">Tutar</th>
                <th className="px-8 py-5 visionary-alt">Durum</th>
                <th className="px-8 py-5 visionary-alt text-right">Detay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {orders.map((order) => (
                <tr 
                  key={order.id} 
                  onClick={() => openDetails(order)}
                  className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-xl bg-apple-gray/10 shrink-0">
                         <img src={order.productImage} alt={order.productName} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-apple-blue">{order.id}</p>
                        <p className="text-[13px] text-secondary-grey-900 dark:text-white font-medium">{order.productName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <div>
                        <p className="text-[14px] font-bold text-secondary-grey-900 dark:text-white">{order.customer}</p>
                        <p className="text-[12px] text-apple-gray">{order.email}</p>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-[14px] text-apple-gray font-medium">{order.date}</td>
                  <td className="px-8 py-6 text-[14px] font-bold text-secondary-grey-900 dark:text-white">{order.amount}</td>
                  <td className="px-8 py-6">
                    <Badge 
                      className="rounded-full px-4 py-1"
                      variant={getStatusVariant(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="h-10 w-10 flex items-center justify-center rounded-full bg-black/5 text-apple-gray transition-all group-hover:bg-apple-blue group-hover:text-white">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stack */}
        <div className="md:hidden divide-y divide-black/5 dark:divide-white/5">
           {orders.map((order) => (
             <div 
              key={order.id} 
              onClick={() => openDetails(order)}
              className="p-6 space-y-4 active:bg-black/5 transition-colors"
             >
                <div className="flex items-center gap-4">
                   <div className="h-16 w-16 overflow-hidden rounded-2xl bg-apple-gray/10 shrink-0">
                      <img src={order.productImage} alt={order.productName} className="h-full w-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                         <p className="text-[14px] font-bold text-apple-blue">{order.id}</p>
                         <Badge className="rounded-full px-3 py-0.5 text-[10px]" variant={getStatusVariant(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white truncate">{order.customer}</p>
                   </div>
                </div>
                <div className="flex justify-between items-end pt-2 border-t border-black/5">
                   <p className="text-xs text-apple-gray font-medium">{order.productName}</p>
                   <p className="text-base font-extrabold text-secondary-grey-900 dark:text-white">{order.amount}</p>
                </div>
             </div>
           ))}
        </div>
      </Card>

      {/* Details Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Sipariş Detayı"
      >
        {selectedOrder && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="rounded-3xl bg-apple-blue/5 p-6 border border-apple-blue/10 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-apple-blue flex items-center justify-center text-white shadow-lg shadow-apple-blue/20">
                   <Truck size={28} />
                </div>
                <div>
                   <p className="visionary-title text-apple-blue">{selectedOrder.status}</p>
                   <p className="text-[13px] text-apple-gray font-medium">{selectedOrder.date} tarihinde güncellendi.</p>
                </div>
             </div>

             <div className="space-y-4">
                <p className="visionary-alt">Müşteri & Teslimat</p>
                <div className="p-5 rounded-3xl border border-black/5 dark:border-white/5 space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center">
                         <User size={20} className="text-apple-gray" />
                      </div>
                      <div>
                         <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white">{selectedOrder.customer}</p>
                         <p className="text-[13px] text-apple-gray">{selectedOrder.email}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 pt-4 border-t border-black/5">
                      <MapPin size={20} className="text-apple-gray mt-1 shrink-0" />
                      <p className="text-[14px] text-apple-gray leading-relaxed">{selectedOrder.address}</p>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <p className="visionary-alt">Sipariş İçeriği</p>
                <div className="flex items-center justify-between p-5 rounded-3xl bg-black/[0.02] dark:bg-white/5 border border-black/5">
                   <div className="flex items-center gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl">
                         <img src={selectedOrder.productImage} alt={selectedOrder.productName} className="h-full w-full object-cover" />
                      </div>
                      <div>
                         <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white">{selectedOrder.productName}</p>
                         <p className="text-[13px] text-apple-gray">1 Adet</p>
                      </div>
                   </div>
                   <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white">{selectedOrder.amount}</p>
                </div>
             </div>

             <div className="pt-6 space-y-4">
                <Button className="w-full h-14 rounded-2xl text-lg">Durumu Güncelle</Button>
                <div className="flex gap-4">
                   <Button variant="secondary" className="flex-1 h-12">Fatura İndir</Button>
                   <Button variant="ghost" className="flex-1 h-12 text-error">İptal Et</Button>
                </div>
             </div>
          </div>
        )}
      </Drawer>
    </DashboardLayout>
  );
}

import { cn } from "@/lib/utils";
