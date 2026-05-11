"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  businessName: z.string().min(2, "İşletme adı en az 2 karakter olmalıdır"),
  taxNumber: z.string().length(10, "Vergi numarası 10 haneli olmalıdır"),
  sector: z.string().min(1, "Lütfen bir sektör seçiniz"),
  apiKey: z.string().min(10, "API Key en az 10 karakter olmalıdır"),
  apiSecret: z.string().min(10, "API Secret en az 10 karakter olmalıdır"),
});

type FormData = z.infer<typeof schema>;

const steps = [
  { id: 1, title: "Genel Bilgiler", description: "İşletme temel bilgileri" },
  { id: 2, title: "Sektör & Faaliyet", description: "Sektör ve kategori seçimi" },
  { id: 3, title: "Entegrasyon", description: "E-ticaret API bağlantısı" },
];

export function BusinessRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ["businessName", "taxNumber"];
    if (currentStep === 2) fieldsToValidate = ["sector"];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="text-success" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-secondary-grey-700">Kayıt Başarıyla Tamamlandı!</h2>
        <p className="text-secondary-grey-400 mt-2 max-w-md">
          İşletme kaydınız alınmıştır. E-ticaret entegrasyonu doğrulandıktan sonra dashboard üzerinden satışlarınızı takip edebilirsiniz.
        </p>
        <Button className="mt-8" onClick={() => window.location.reload()}>
          Dashboard'a Dön
        </Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper Header */}
      <div className="mb-8 flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="relative flex flex-col items-center flex-1">
            <div
              className={cn(
                "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                currentStep === step.id
                  ? "border-brand-500 bg-brand-500 text-white"
                  : currentStep > step.id
                  ? "border-success bg-success text-white"
                  : "border-brand-100 bg-white text-secondary-grey-400"
              )}
            >
              {currentStep > step.id ? (
                <CheckCircle2 size={20} />
              ) : (
                <span className="text-sm font-bold">{step.id}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className={cn(
                "text-xs font-bold transition-colors",
                currentStep >= step.id ? "text-secondary-grey-700" : "text-secondary-grey-400"
              )}>
                {step.title}
              </p>
            </div>
            {/* Connector Line */}
            {step.id !== steps.length && (
              <div className="absolute top-5 left-1/2 w-full h-[2px] bg-brand-100 -z-0" />
            )}
          </div>
        ))}
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-secondary-grey-700">İşletme Temel Bilgileri</h3>
                <p className="text-sm text-secondary-grey-400">Lütfen yasal işletme bilgilerinizi giriniz.</p>
              </div>
              <Input
                label="İşletme Adı"
                placeholder="Örn: ABC Teknoloji Ltd."
                {...register("businessName")}
                error={errors.businessName?.message}
              />
              <Input
                label="Vergi Numarası"
                placeholder="10 Haneli Vergi No"
                maxLength={10}
                {...register("taxNumber")}
                error={errors.taxNumber?.message}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-secondary-grey-700">Sektör ve Faaliyet</h3>
                <p className="text-sm text-secondary-grey-400">İşletmenizin ana faaliyet alanını seçiniz.</p>
              </div>
              <Select
                label="Sektör Seçimi"
                options={[
                  { label: "Teknoloji & Yazılım", value: "tech" },
                  { label: "Moda & Tekstil", value: "fashion" },
                  { label: "Gıda & Hızlı Tüketim", value: "food" },
                  { label: "Mobilya & Dekorasyon", value: "furniture" },
                ]}
                {...register("sector")}
                error={errors.sector?.message}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-secondary-grey-700">E-ticaret Entegrasyonu</h3>
                <p className="text-sm text-secondary-grey-400">Platform bağlantısı için API anahtarlarınızı giriniz.</p>
              </div>
              <Input
                label="API Key"
                placeholder="Platform API Anahtarınız"
                {...register("apiKey")}
                error={errors.apiKey?.message}
              />
              <Input
                label="API Secret"
                type="password"
                placeholder="Platform API Secret"
                {...register("apiSecret")}
                error={errors.apiSecret?.message}
              />
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-xs text-brand-500 font-medium">
                  Not: API anahtarlarınız uçtan uca şifrelenerek güvenli bir şekilde saklanacaktır.
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              className={cn(currentStep === 1 && "invisible")}
            >
              <ChevronLeft className="mr-2" size={20} /> Geri
            </Button>
            
            {currentStep < steps.length ? (
              <Button type="button" onClick={nextStep}>
                İleri <ChevronRight className="ml-2" size={20} />
              </Button>
            ) : (
              <Button type="submit">
                Kaydı Tamamla
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
