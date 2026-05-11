"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  LogOut, 
  Settings, 
  CreditCard,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function CombinedAuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    if (mode === "register") {
      setMode("verify");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f6f9fc] overflow-hidden font-sans antialiased selection:bg-[#635bff]/20">
      {/* 1. Stripe Style Background Layer - SKEWED */}
      <div className="absolute top-0 left-0 w-full h-[65%] bg-gradient-to-br from-[#4318ff] to-[#12c2e9] skew-y-[-6deg] origin-top-left -translate-y-24 z-0 shadow-2xl" />

      {/* Animated Elements in Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            x: [0, 20, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[30%] w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
        />
      </div>

      {/* 2. Main Form Card Container */}
      <main className="relative z-10 flex items-center justify-center pt-8 pb-24 px-6 min-h-screen">
        <AnimatePresence mode="wait">
          {mode === "verify" ? (
            <OTPView key="verify" onComplete={() => window.location.href = "/"} email={email} />
          ) : (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-full max-w-[480px] bg-white rounded-[32px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] p-10 md:p-14 border border-white/20"
            >
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#635bff] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Sparkles size={12} />
                  <span>{mode === "login" ? "Dashboard Erişimi" : "Yeni Başlangıç"}</span>
                </div>
                <h1 className="text-[#1a1f36] text-4xl font-extrabold tracking-tight mb-3">
                  {mode === "login" ? "Hoş Geldiniz" : "Hesap Oluştur"}
                </h1>
                <p className="text-[#4f566b] text-lg font-medium leading-relaxed">
                  {mode === "login" ? "İşletmenizi yönetmeye hemen başlayın." : "SB Database ekosistemine ilk adımı atın."}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-7">
                {mode === "register" && (
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-[#1a1f36] ml-1">Tam Adınız</label>
                    <input
                      type="text"
                      required
                      placeholder="Yunus Emre"
                      className="w-full h-15 px-6 bg-white border border-slate-200 rounded-2xl text-[#1a1f36] outline-none transition-all focus:border-[#635bff] focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 font-medium text-lg"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[13px] font-bold uppercase tracking-wider text-[#1a1f36] ml-1">Email Adresi</label>
                  <input
                    type="email"
                    required
                    placeholder="isim@sirket.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-15 px-6 bg-white border border-slate-200 rounded-2xl text-[#1a1f36] outline-none transition-all focus:border-[#635bff] focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 font-medium text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-[#1a1f36]">Şifre</label>
                    {mode === "login" && (
                      <Link href="/auth/forgot-password" className="text-sm font-bold text-[#635bff] hover:text-[#4318ff] transition-colors">
                        Şifremi Unuttum
                      </Link>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-15 px-6 bg-white border border-slate-200 rounded-2xl text-[#1a1f36] outline-none transition-all focus:border-[#635bff] focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 font-medium text-lg"
                  />
                </div>

                <button
                  disabled={isLoading}
                  className="w-full h-16 bg-[#635bff] text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-500/20 hover:bg-[#4318ff] hover:-translate-y-1 hover:shadow-blue-500/30 active:translate-y-0 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4 group"
                >
                  {isLoading ? (
                    <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === "login" ? "Oturum Aç" : "Hemen Kaydol"}</span>
                      <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <p className="text-[#4f566b] font-medium text-base">
                  {mode === "login" ? "Hesabınız yok mu?" : "Zaten üye misiniz?"}{" "}
                  <button
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="text-[#635bff] font-extrabold hover:text-[#4318ff] ml-1 transition-colors"
                  >
                    {mode === "login" ? "Yeni Hesap Oluştur" : "Giriş Yap"}
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

// 3. OTP View (Apple & Stripe Style)
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

    if (value && i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[480px] bg-white rounded-[32px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25)] p-12 text-center"
    >
      <div className="h-20 w-20 bg-blue-50 text-[#635bff] rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
        <ShieldCheck size={40} />
      </div>
      <h2 className="text-[#1a1f36] text-3xl font-extrabold mb-4">Kodu Doğrula</h2>
      <p className="text-[#4f566b] mb-12 font-medium text-lg leading-relaxed px-4">
        <span className="font-bold text-[#1a1f36]">{email || "Mail adresinize"}</span> gönderilen 6 haneli güvenlik kodunu girin.
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
              className="w-12 h-16 md:w-14 md:h-20 text-center text-3xl font-bold bg-[#f6f9fc] border border-slate-200 rounded-2xl shadow-sm focus:border-[#635bff] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              onChange={(e) => handleInput(e, i)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[i] && i > 0) {
                  inputRefs.current[i - 1]?.focus();
                }
              }}
            />
          ))}
        </div>
        <button
          className="w-full h-16 bg-[#1a1f36] text-white rounded-2xl font-bold text-xl hover:bg-black hover:shadow-2xl transition-all active:scale-[0.98]"
          disabled={loading || otp.some(d => !d)}
        >
          {loading ? "Doğrulanıyor..." : "Hesabı Onayla"}
        </button>
      </form>
    </motion.div>
  );
}

// 4. User Dropdown (Apple Visionary Blur)
function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all active:scale-95 shadow-lg"
      >
        <div className="h-8 w-8 bg-gradient-to-tr from-white/40 to-white/10 rounded-full flex items-center justify-center font-bold border border-white/30">A</div>
        <span className="font-bold text-sm tracking-wide">Ahmet</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="absolute right-0 mt-4 w-64 z-40 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border border-white/20 rounded-[28px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] p-2.5 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-black/5 dark:border-white/5 mb-2">
                <p className="text-[10px] font-black text-[#86868b] uppercase tracking-[0.2em] mb-1">Hesap Yönetimi</p>
                <p className="text-sm font-bold text-[#1d1d1f] dark:text-white truncate">ahmet@company.com</p>
              </div>
              <div className="space-y-1">
                <DropdownItem icon={<Settings size={18} />} label="Ayarlar" />
                <DropdownItem icon={<CreditCard size={18} />} label="Faturalandırma" />
                <div className="h-px bg-black/5 dark:bg-white/10 my-2 mx-2" />
                <DropdownItem icon={<LogOut size={18} />} label="Çıkış Yap" variant="danger" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({ icon, label, variant = "default" }: { icon: any, label: string, variant?: "default" | "danger" }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold transition-all ${
      variant === "danger" 
        ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" 
        : "text-[#1d1d1f] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.97]"
    }`}>
      <span className={variant === "danger" ? "text-red-500" : "text-[#635bff]"}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
