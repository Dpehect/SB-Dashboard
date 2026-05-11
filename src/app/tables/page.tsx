import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OrderTable } from "@/components/dashboard/OrderTable";

export default function TablesPage() {
  return (
    <DashboardLayout>
       {/* Page Header */}
       <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary-grey-700">Veri Tabloları</h2>
          <p className="text-secondary-grey-400 mt-1">Sipariş verilerini yönetin ve filtreleyin.</p>
       </div>

       {/* Order Table Component */}
       <OrderTable />
    </DashboardLayout>
  );
}
