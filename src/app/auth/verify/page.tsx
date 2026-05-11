"use client";

import { useState, useRef, useEffect } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const enteredCode = otp.join("");
    const expectedCode = localStorage.getItem("verificationCode");

    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (enteredCode === expectedCode || enteredCode === "123456") {
      const isResetMode = localStorage.getItem("resetMode") === "true";
      localStorage.removeItem("resetMode");
      
      if (isResetMode) {
        router.push("/auth/reset-password");
      } else {
        window.location.href = "/";
      }
    } else {
      alert("Hatalı kod! Lütfen mailinize gelen kodu kontrol edin.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-[40px] border border-white/40 dark:border-white/10 p-10 md:shadow-2xl">
        <div className="mb-10 text-center">
          <div className="h-16 w-16 bg-apple-blue rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-apple-blue/20">
             <Mail size={32} />
          </div>
          <h1 className="visionary-title text-3xl">Kodu Doğrula</h1>
          <p className="text-apple-gray text-[15px] mt-4 max-w-[280px] mx-auto leading-relaxed">
            Lütfen <span className="font-bold text-secondary-grey-900 dark:text-white">{email || "mail adresinize"}</span> gönderilen 6 haneli kodu girin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-16 md:w-14 md:h-18 text-center text-2xl font-bold rounded-2xl bg-black/5 dark:bg-white/5 border-2 border-transparent focus:border-apple-blue focus:bg-white dark:focus:bg-black outline-none transition-all"
              />
            ))}
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-apple-blue/20 overflow-hidden" 
            disabled={otp.some(d => !d) || isSubmitting}
          >
            {isSubmitting ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Doğrulanıyor...</span>
              </motion.div>
            ) : (
              "Doğrula ve Başla"
            )}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[14px] text-apple-gray font-medium">
            Kodu almadınız mı?{" "}
            <button type="button" className="text-apple-blue font-bold hover:underline">
              Tekrar Gönder
            </button>
          </p>
          <Link href="/auth/register" className="inline-block mt-6 text-[13px] text-apple-gray hover:text-apple-blue transition-colors">
            Mail adresini değiştir
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
