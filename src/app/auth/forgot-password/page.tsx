"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { KeyRound, ArrowLeft, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sendVerificationEmail } from "@/app/actions/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir mail adresi giriniz"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("verificationCode", resetCode);
    localStorage.setItem("resetMode", "true");

    const result = await sendVerificationEmail(data.email, resetCode);
    
    if (result.success) {
      alert("Şifre sıfırlama kodu mail adresinize gönderildi.");
      router.push("/auth/verify");
    } else {
      alert("Hata: " + result.error);
    }
  };

  return (
    <AuthLayout>
      <div className="group relative overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[48px] border border-white/40 dark:border-white/10 p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 blur-[64px] rounded-full group-hover:bg-orange-500/20 transition-all duration-700" />
        
        <div className="relative mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="h-20 w-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-[24px] mx-auto mb-8 flex items-center justify-center text-white shadow-2xl shadow-orange-500/30"
          >
             <KeyRound size={40} strokeWidth={1.5} />
          </motion.div>
          <h1 className="visionary-title text-4xl mb-3 tracking-tighter">Şifremi Unuttum</h1>
          <p className="text-apple-gray font-medium tracking-wide flex items-center justify-center gap-2 px-4">
            Endişelenmeyin, size bir kurtarma kodu göndereceğiz
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative">
          <Input
            label="Kayıtlı Mail Adresiniz"
            placeholder="isim@sirket.com"
            className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-orange-500/10 transition-all"
            {...register("email")}
            error={errors.email?.message}
          />

          <Button 
            type="submit" 
            variant="none"
            className="w-full h-16 rounded-2xl text-xl font-bold mt-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white border-none shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-[0.98] group/btn overflow-hidden" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3 text-white">
                <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Gönderiliyor...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <Mail size={20} />
                <span>Sıfırlama Kodu Gönder</span>
              </div>
            )}
          </Button>
        </form>

        <div className="mt-12 text-center relative">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-[15px] text-apple-gray font-bold hover:text-orange-600 transition-colors">
            <ArrowLeft size={16} />
            Giriş Sayfasına Dön
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
