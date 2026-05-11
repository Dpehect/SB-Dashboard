"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserPlus, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sendVerificationEmail } from "@/app/actions/auth";

const registerSchema = z.object({
  fullName: z.string().min(3, "Ad Soyad en az 3 karakter olmalıdır"),
  email: z.string().email("Geçerli bir işletme maili giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("verificationCode", verificationCode);

    const result = await sendVerificationEmail(data.email, verificationCode);
    
    if (result.success) {
      router.push("/auth/verify");
    } else {
      alert("Mail gönderilemedi: " + (result.error || "Bilinmeyen hata"));
    }
  };

  return (
    <AuthLayout>
      <div className="group relative overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[48px] border border-white/40 dark:border-white/10 p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[64px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />
        
        <div className="relative mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: -3 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="h-20 w-20 bg-gradient-to-br from-purple-500 to-[#A855F7] rounded-[24px] mx-auto mb-8 flex items-center justify-center text-white shadow-2xl shadow-purple-500/30"
          >
             <Rocket size={40} strokeWidth={1.5} />
          </motion.div>
          <h1 className="visionary-title text-4xl mb-3 tracking-tighter">Yeni Bir Çağ Başlat</h1>
          <p className="text-apple-gray font-medium tracking-wide flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-purple-500" />
            İşletmenizi geleceğe taşıyın
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
          <Input
            label="Tam Adınız"
            placeholder="Yunus Emre Gürlek"
            className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-purple-500/10 transition-all"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          <Input
            label="İşletme Maili"
            placeholder="isim@sirket.com"
            className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-purple-500/10 transition-all"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Güçlü Bir Şifre"
            type="password"
            placeholder="••••••••"
            className="h-16 bg-white/50 dark:bg-black/20 border-white/40 dark:border-white/10 rounded-2xl px-6 text-lg focus:ring-4 focus:ring-purple-500/10 transition-all"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button 
            type="submit" 
            variant="none"
            className="w-full h-16 rounded-2xl text-xl font-bold mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all active:scale-[0.98] group/btn overflow-hidden" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3 text-white">
                <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Hesap Hazırlanıyor...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <span>Serüvene Başla</span>
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </form>

        <div className="mt-12 text-center relative">
          <p className="text-[15px] text-apple-gray font-medium">
            Zaten bir hesabınız var mı?{" "}
            <Link href="/auth/login" className="text-purple-600 font-extrabold hover:opacity-70 transition-opacity">
              Oturum Açın
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
