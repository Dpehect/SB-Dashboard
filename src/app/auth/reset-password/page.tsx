"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Lock, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Şiüre en az 8 karakter olmalıdır"),
  confirmPassword: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    // Simulate API call to update password
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSuccess(true);
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  };

  return (
    <AuthLayout>
      <div className="group relative overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[48px] border border-white/40 dark:border-white/10 p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[64px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
        
        {!isSuccess ? (
          <>
            <div className="relative mb-12 text-center">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="h-20 w-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-[24px] mx-auto mb-8 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30"
              >
                 <Lock size={40} strokeWidth={1.5} />
              </motion.div>
              <h1 className="visionary-title text-4xl mb-3 tracking-tighter">Yeni Şifre</h1>
              <p className="text-apple-gray font-medium tracking-wide flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-emerald-500" />
                Güçlü bir şifre belirleyin
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
              <Input
                label="Yeni Şifre"
                type="password"
                placeholder="••••••••"
                className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-emerald-500/10 transition-all"
                {...register("password")}
                error={errors.password?.message}
              />
              <Input
                label="Şifre Tekrar"
                type="password"
                placeholder="••••••••"
                className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-emerald-500/10 transition-all"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Button 
                type="submit" 
                variant="none"
                className="w-full h-16 rounded-2xl text-xl font-bold mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-none shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all active:scale-[0.98] group/btn overflow-hidden" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Şifre Güncelleniyor...</span>
                  </div>
                ) : (
                  "Şifreyi Kaydet"
                )}
              </Button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="h-24 w-24 bg-emerald-500/10 text-emerald-500 rounded-full mx-auto mb-8 flex items-center justify-center">
               <CheckCircle2 size={56} />
            </div>
            <h2 className="visionary-title text-3xl mb-4">Şifre Başarıyla Değişti</h2>
            <p className="text-apple-gray font-medium mb-8">
              Yeni şifreniz aktif edildi. Giriş sayfasına yönlendiriliyorsunuz.
            </p>
            <div className="h-1 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-full bg-emerald-500" 
               />
            </div>
          </motion.div>
        )}
      </div>
    </AuthLayout>
  );
}
