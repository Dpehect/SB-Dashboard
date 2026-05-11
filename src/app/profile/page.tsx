import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { 
  Building2, 
  MapPin, 
  CreditCard, 
  Plus, 
  ExternalLink,
  ShoppingBag,
  Globe,
  Upload
} from "lucide-react";

const integrations = [
  { name: "Shopify", desc: "Global e-ticaret altyapısı", icon: "S", color: "bg-[#96bf48]" },
  { name: "Trendyol", desc: "Türkiye'nin en büyük pazaryeri", icon: "T", color: "bg-[#f27a1a]" },
  { name: "Amazon", desc: "Dünya çapında satış yapın", icon: "A", color: "bg-[#232f3e]" },
  { name: "Hepsiburada", desc: "Yerel pazaryeri entegrasyonu", icon: "H", color: "bg-[#ff6000]" },
];

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-secondary-grey-900 dark:text-white">İşletme Profili</h2>
        <p className="text-apple-gray mt-1">İşletme bilgilerinizi ve platform entegrasyonlarınızı yönetin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: General Info */}
        <div className="lg:col-span-8 space-y-8">
           {/* Logo & Basic Info */}
           <Card className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="relative group">
                 <div className="h-32 w-32 rounded-3xl bg-black/5 dark:bg-white/5 border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-apple-gray group-hover:border-apple-blue group-hover:text-apple-blue transition-all cursor-pointer overflow-hidden">
                    <Upload size={32} />
                    <span className="text-[10px] font-bold mt-2 uppercase tracking-widest">Logo Yükle</span>
                 </div>
              </div>
              
              <div className="flex-1 space-y-4 w-full">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="İşletme Ünvanı" defaultValue="ABC Teknoloji Anonim Şirketi" />
                    <Input label="Vergi Dairesi" defaultValue="Boğaziçi Kurumlar" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Vergi Numarası" defaultValue="1234567890" />
                    <Input label="E-posta" defaultValue="kurumsal@abctech.com" />
                 </div>
              </div>
           </Card>

           {/* Address Section */}
           <Card className="space-y-6">
              <div className="flex items-center gap-2 text-secondary-grey-900 dark:text-white mb-2">
                 <MapPin size={20} className="text-apple-blue" />
                 <h3 className="text-lg font-bold">Adres Bilgileri</h3>
              </div>
              
              <div className="space-y-4">
                 <Input label="Açık Adres" placeholder="Cadde, sokak, no..." />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="İl" defaultValue="İstanbul" />
                    <Input label="İlçe" defaultValue="Beşiktaş" />
                    <Input label="Posta Kodu" defaultValue="34330" />
                 </div>
              </div>
              
              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
                 <Button>Değişiklikleri Kaydet</Button>
              </div>
           </Card>
        </div>

        {/* Right: Integration "App Store" */}
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-secondary-grey-900 dark:text-white tracking-tight">Entegrasyonlar</h3>
              <Button variant="ghost" size="sm" className="text-apple-blue hover:bg-apple-blue/5">Tümünü Gör</Button>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {integrations.map((app) => (
                <Card key={app.name} className="group hover:border-apple-blue/20 transition-all cursor-pointer">
                   <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                         <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm", app.color)}>
                            {app.icon}
                         </div>
                         <div>
                            <p className="text-[15px] font-bold text-secondary-grey-900 dark:text-white">{app.name}</p>
                            <p className="text-[12px] text-apple-gray">{app.desc}</p>
                         </div>
                      </div>
                      <button className="text-apple-gray group-hover:text-apple-blue transition-colors">
                         <ExternalLink size={18} />
                      </button>
                   </div>
                   <div className="mt-6">
                      <Button variant="secondary" className="w-full text-xs font-bold py-2 h-9">Bağla</Button>
                   </div>
                </Card>
              ))}
              
              <button className="w-full py-8 border-2 border-dashed border-black/5 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center text-apple-gray hover:border-apple-blue hover:text-apple-blue transition-all group">
                 <div className="h-10 w-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-2 group-hover:bg-apple-blue/10 transition-all">
                    <Plus size={20} />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest">Yeni Ekle</span>
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { cn } from "@/lib/utils";
