"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  LogOut, 
  Settings, 
  CreditCard,
  ShieldCheck,
  Zap,
  PenTool
} from "lucide-react";
import Link from "next/link";

export default function CombinedAuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    if (mode === "register") {
      setMode("verify");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F6] overflow-hidden selection:bg-[#C5A059]/20">
      {/* 1. Niche Editorial Background - Skewed Muted Tones */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-[#1A1A1A] skew-y-[-4deg] origin-top-left -translate-y-24 z-0 shadow-[0_20px_50px_rgba(0,0,0,0.2)]" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

      {/* Floating Elements - Organic Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-[#2D3436]/20 rounded-full blur-[100px]"
        />
      </div>

      {/* 2. Main Container */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-16 pb-24 px-6 min-h-screen">
        
        {/* Branding Accent */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <span style={{ fontFamily: "var(--font-signature)" }} className="text-6xl text-[#C5A059] block mb-[-15px]">
            SB Database
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
            Editorial Management Suite
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "verify" ? (
            <OTPView key="verify" onComplete={() => window.location.href = "/"} email={email} />
          ) : (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1.2 }}
              className="w-full max-w-[500px] bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] p-12 md:p-16 border border-white/50 relative overflow-hidden"
            >
              {/* Subtle Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5A059]/5 to-transparent rounded-bl-full" />

              <div className="mb-14">
                <h1 style={{ fontFamily: "var(--font-serif)" }} className="text-[#1A1A1A] text-5xl font-light tracking-tight mb-4">
                  {mode === "login" ? "Oturum Açın" : "Hesap Oluştur"}
                </h1>
                <p className="text-[#636E72] text-lg font-light leading-relaxed">
                  {mode === "login" ? "Verilerinizin derinliğine yeniden dalın." : "Dijital varlığınızı bugün temellendirin."}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-8">
                {mode === "register" && (
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2D3436]/60 ml-1">İsim Soyisim</label>
                    <input
                      type="text"
                      required
                      placeholder="Gürlek Yunus Emre"
                      className="w-full h-16 px-8 bg-[#FAF9F6] border border-[#E5E5E7] rounded-2xl text-[#1A1A1A] outline-none transition-all focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 placeholder:text-slate-300 text-lg font-light"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2D3436]/60 ml-1">İşletme Maili</label>
                  <input
                    type="email"
                    required
                    placeholder="name@studio.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-16 px-8 bg-[#FAF9F6] border border-[#E5E5E7] rounded-2xl text-[#1A1A1A] outline-none transition-all focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 placeholder:text-slate-300 text-lg font-light"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2D3436]/60">Gizli Şifre</label>
                    {mode === "login" && (
                      <Link href="/auth/forgot-password" className="text-xs font-bold text-[#C5A059] hover:opacity-70 transition-opacity italic">
                        Şifremi Unuttum
                      </Link>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-16 px-8 bg-[#FAF9F6] border border-[#E5E5E7] rounded-2xl text-[#1A1A1A] outline-none transition-all focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 placeholder:text-slate-300 text-lg font-light"
                  />
                </div>

                <button
                  disabled={isLoading}
                  className="w-full h-18 bg-[#1A1A1A] text-white rounded-2xl font-bold text-xl shadow-2xl shadow-black/20 hover:bg-[#2D3436] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all flex items-center justify-center gap-4 mt-10 group"
                >
                  {isLoading ? (
                    <div className="h-6 w-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal">
                        {mode === "login" ? "Erişim Sağla" : "Serüveni Başlat"}
                      </span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-14 pt-10 border-t border-slate-100 text-center">
                <p className="text-[#636E72] font-light text-base">
                  {mode === "login" ? "Aramıza katılmak ister misiniz?" : "Zaten bir hesabınız var mı?"}{" "}
                  <button
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="text-[#C5A059] font-bold hover:underline underline-offset-8 ml-2 transition-all italic"
                  >
                    {mode === "login" ? "Hesap Oluşturun" : "Giriş Yapın"}
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// 3. OTP View (Bespoke Style)
function OTPView({ email, onComplete }: { email: string, onComplete: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    onComplete();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[i] = value.slice(-1);
    setOtp(newOtp);
    if (value && i < 5) inputRefs.current[i + 1]?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[500px] bg-white rounded-[40px] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] p-16 text-center"
    >
      <div className="h-20 w-20 bg-[#FAF9F6] text-[#C5A059] rounded-3xl flex items-center justify-center mx-auto mb-10 border border-[#E5E5E7] shadow-sm">
        <ShieldCheck size={40} strokeWidth={1.5} />
      </div>
      <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-[#1A1A1A] text-4xl font-light mb-4">Kimlik Doğrulama</h2>
      <p className="text-[#636E72] mb-12 font-light text-lg px-2 leading-relaxed">
        <span className="font-medium text-[#1A1A1A]">{email || "Mail adresinize"}</span> gönderilen 6 haneli kodu lütfen buraya nakşedin.
      </p>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="flex justify-between gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              className="w-12 h-18 md:w-16 md:h-20 text-center text-3xl font-light bg-[#FAF9F6] border border-[#E5E5E7] rounded-2xl focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 outline-none transition-all shadow-sm"
              onChange={(e) => handleInput(e, i)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
              }}
            />
          ))}
        </div>
        <button
          className="w-full h-18 bg-[#1A1A1A] text-white rounded-2xl font-bold text-xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl"
          disabled={loading || otp.some(d => !d)}
        >
          <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal">
            {loading ? "Doğrulanıyor..." : "Mührü Onayla"}
          </span>
        </button>
      </form>
    </motion.div>
  );
}

function DropdownItem({ icon, label, variant = "default" }: { icon: any, label: string, variant?: "default" | "danger" }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold transition-all ${
      variant === "danger" 
        ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" 
        : "text-[#1d1d1f] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.97]"
    }`}>
      <span className={variant === "danger" ? "text-red-500" : "text-[#C5A059]"}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
