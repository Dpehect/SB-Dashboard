import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BusinessRegistrationForm } from "@/components/dashboard/BusinessRegistrationForm";

export default function BusinessRegistrationPage() {
  return (
    <DashboardLayout>
       {/* Page Header */}
       <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-secondary-grey-700">Yeni İşletme Kaydı</h2>
          <p className="text-secondary-grey-400 mt-2">İşletmenizi platforma kaydederek satışlarınızı anlık takip etmeye başlayın.</p>
       </div>

       {/* Form Component */}
       <BusinessRegistrationForm />
    </DashboardLayout>
  );
}
