"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { products } from "@/lib/mockData";
import { Plus, Edit, Trash2, Package, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openQuickView = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="visionary-title text-3xl">Ürün Yönetimi</h2>
          <p className="visionary-alt mt-1">Stok ve ürün kataloğunuzu yönetin.</p>
        </div>
        <Button className="rounded-full shadow-lg">
          <Plus className="mr-2" size={18} /> Yeni Ürün Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-0 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                  <th className="px-8 py-5 visionary-alt">Ürün</th>
                  <th className="px-8 py-5 visionary-alt">Kategori</th>
                  <th className="px-8 py-5 visionary-alt">Fiyat</th>
                  <th className="px-8 py-5 visionary-alt">Stok</th>
                  <th className="px-8 py-5 visionary-alt">Durum</th>
                  <th className="px-8 py-5 visionary-alt text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {products.map((product) => (
                  <tr 
                    key={product.id} 
                    onClick={() => openQuickView(product)}
                    className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-xl bg-apple-gray/10 shrink-0">
                           <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white">{product.name}</p>
                          <p className="text-[12px] text-apple-gray">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[14px] text-apple-gray font-medium">{product.category}</td>
                    <td className="px-8 py-6 text-[14px] font-bold text-secondary-grey-900 dark:text-white">{product.price}</td>
                    <td className="px-8 py-6 text-[14px] font-medium text-apple-gray">{product.stock} Adet</td>
                    <td className="px-8 py-6">
                      <Badge 
                        className="rounded-full px-4 py-1"
                        variant={product.status === "Stokta Var" ? "success" : product.status === "Azalıyor" ? "warning" : "error"}
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
                        <Edit size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stack */}
          <div className="md:hidden divide-y divide-black/5 dark:divide-white/5">
            {products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => openQuickView(product)}
                className="p-6 flex items-center gap-4 active:bg-black/5"
              >
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-apple-gray/10 shrink-0">
                   <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start mb-1">
                      <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white truncate">{product.name}</p>
                      <p className="text-[14px] font-bold text-apple-blue ml-2">{product.price}</p>
                   </div>
                   <div className="flex justify-between items-center">
                      <p className="text-[12px] text-apple-gray font-medium">{product.category}</p>
                      <Badge 
                        className="rounded-full px-3 py-0.5 text-[10px]"
                        variant={product.status === "Stokta Var" ? "success" : product.status === "Azalıyor" ? "warning" : "error"}
                      >
                        {product.status}
                      </Badge>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick View Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Ürün Detayı"
      >
        {selectedProduct && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-black/5">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" />
             </div>
             
             <div>
                <h3 className="visionary-title text-2xl">{selectedProduct.name}</h3>
                <p className="text-apple-blue font-bold text-xl mt-1">{selectedProduct.price}</p>
                <p className="text-apple-gray text-[15px] mt-4 leading-relaxed">{selectedProduct.description}</p>
             </div>

             <div className="space-y-4">
                <p className="visionary-alt">Özellikler</p>
                <div className="flex flex-wrap gap-2">
                   {selectedProduct.specs.map(spec => (
                     <span key={spec} className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-sm font-medium text-secondary-grey-700 dark:text-apple-gray">
                        {spec}
                     </span>
                   ))}
                </div>
             </div>

             <div className="p-6 rounded-3xl bg-apple-blue/5 border border-apple-blue/10 flex items-center gap-4">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center text-white",
                  selectedProduct.status === "Stokta Var" ? "bg-success" : selectedProduct.status === "Azalıyor" ? "bg-warning" : "bg-error"
                )}>
                   {selectedProduct.status === "Stokta Var" ? <CheckCircle2 /> : selectedProduct.status === "Azalıyor" ? <AlertCircle /> : <XCircle />}
                </div>
                <div>
                   <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white">{selectedProduct.status}</p>
                   <p className="text-xs text-apple-gray">Depo mevcudu: {selectedProduct.stock} adet</p>
                </div>
             </div>

             <div className="flex gap-4 pt-4">
                <Button className="flex-1 h-14">Düzenle</Button>
                <Button variant="secondary" className="h-14 w-14 p-0">
                   <Trash2 size={20} className="text-error" />
                </Button>
             </div>
          </div>
        )}
      </Drawer>
    </DashboardLayout>
  );
}

import { cn } from "@/lib/utils";
