"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir mail adresi giriniz"),
  password: z.string().min(1, "Şifre zorunludur"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/");
  };

  return (
    <AuthLayout>
      <div className="group relative overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[48px] border border-white/40 dark:border-white/10 p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
        {/* Glow effect that matches Apple style */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-apple-blue/20 blur-[64px] rounded-full group-hover:bg-apple-blue/30 transition-all duration-700" />
        
        <div className="relative mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="h-20 w-20 bg-gradient-to-br from-apple-blue to-[#64D2FF] rounded-[24px] mx-auto mb-8 flex items-center justify-center text-white shadow-2xl shadow-apple-blue/30 rotate-3"
          >
             <ShieldCheck size={40} strokeWidth={1.5} />
          </motion.div>
          <h1 className="visionary-title text-4xl mb-3 tracking-tighter">Tekrar Hoş Geldiniz</h1>
          <p className="text-apple-gray font-medium tracking-wide flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-apple-blue" />
            Horizon'un geleceğine adım atın
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative">
          <div className="space-y-2">
            <Input
              label="İşletme Maili"
              placeholder="isim@sirket.com"
              className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-apple-blue/10 transition-all"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold uppercase tracking-widest text-apple-gray">Şifre</label>
              <Link href="/auth/forgot-password" size="sm" className="text-xs font-bold text-apple-blue hover:opacity-70 transition-opacity">
                Şifremi Unuttum
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-apple-blue/10 transition-all"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button 
            type="submit" 
            variant="none"
            className="w-full h-16 rounded-2xl text-xl font-bold mt-6 bg-apple-blue text-white shadow-xl shadow-apple-blue/25 hover:shadow-apple-blue/40 transition-all active:scale-[0.98] group/btn overflow-hidden" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Erişim Sağlanıyor...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Dashboard'a Gir</span>
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </form>

        <div className="mt-12 text-center relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/5 dark:border-white/5"></div>
          </div>
          <div className="relative">
            <span className="bg-[#FBFBFD] dark:bg-[#121212] px-4 text-xs font-bold text-apple-gray uppercase tracking-widest">veya</span>
          </div>
          
          <p className="mt-8 text-[15px] text-apple-gray font-medium">
            Hesabınız yok mu?{" "}
            <Link href="/auth/register" className="text-apple-blue font-extrabold hover:opacity-70 transition-opacity">
              Hemen Kaydolun
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
