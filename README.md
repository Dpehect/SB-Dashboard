# Horizon E-Commerce Dashboard

Bu proje, modern web teknolojilerinin sınırlarını zorlamak ve kullanıcı deneyimini en üst seviyeye taşımak amacıyla geliştirilmiş, profesyonel bir yönetim panelidir. Hem estetik hem de fonksiyonel olarak kusursuz bir denge kurmayı hedefleyen bu çalışma, bir Full Stack geliştiricinin teknik vizyonunu ve detaylara verdiği önemi yansıtmaktadır.

This project is a professional management dashboard developed to push the boundaries of modern web technologies and elevate user experience. Aiming to strike a perfect balance between aesthetics and functionality, this work reflects a Full Stack developer's technical vision and attention to detail.

## Teknik Stack | Technical Stack

Proje mimarisi, performans ve ölçeklenebilirlik odaklı en güncel araçlar üzerine kurulmuştur.

The project architecture is built on the latest tools focused on performance and scalability.

*   **Framework:** Next.js 15 (App Router) & React 19
*   **Styling:** Tailwind CSS 4 (Beta/Native)
*   **Animations:** Framer Motion (Spring dynamics & AnimatePresence)
*   **Form Management:** React Hook Form & Zod Validation
*   **Email Engine:** Nodemailer with Gmail SMTP Integration
*   **Design Language:** Visionary UI (Apple & Stripe aesthetics)

## Öne Çıkan Özellikler | Key Features

### Modern Auth Flow
Kullanıcı deneyimi odaklı giriş ve kayıt akışı, tek sayfa mimarisi üzerinden yönetilmektedir. Login ve Register modları arasındaki geçişler Framer Motion ile asenkron ve pürüzsüz hale getirilmiştir. Kayıt sonrası otomatik olarak devreye giren 6 haneli OTP (One-Time Password) doğrulama sistemi, güvenliği bir standart haline getirir.

User-centric login and registration flow, managed through a single-page architecture. Transitions between Login and Register modes are asynchronous and smooth using Framer Motion. The 6-digit OTP (One-Time Password) verification system, which activates automatically after registration, makes security a standard.

### Visionary UI/UX
Tasarım dili, Apple'ın sadeliği ile Stripe'ın geometrik düzenini harmanlamaktadır. Arka planda yer alan skew-y katmanları, hareketli orb öğeleri ve yüksek kaliteli glassmorphism efektleri, arayüzün yaşayan bir organizma gibi hissettirmesini sağlar. Tüm bileşenler, en az 44px'lik hit-target alanlarıyla mobil öncelikli (mobile-first) olarak tasarlanmıştır.

The design language blends Apple's simplicity with Stripe's geometric order. Background skew-y layers, moving orb elements, and high-quality glassmorphism effects make the interface feel like a living organism. All components are designed as mobile-first with at least 44px hit-target areas.

### Server Actions & SMTP
E-posta gönderimi ve veri işlemleri, Next.js 15'in Server Actions yetenekleri kullanılarak gerçekleştirilmiştir. Nodemailer entegrasyonu sayesinde gerçek zamanlı doğrulama kodları ve şifre sıfırlama talepleri doğrudan Gmail SMTP sunucuları üzerinden kullanıcıya ulaştırılır.

Email dispatch and data processing are performed using Next.js 15 Server Actions. Thanks to Nodemailer integration, real-time verification codes and password reset requests are delivered directly to the user through Gmail SMTP servers.

## Kurulum | Installation

1. Depoyu klonlayın / Clone the repo
2. Bağımlılıkları yükleyin / Install dependencies: `npm install`
3. Çevresel değişkenleri ayarlayın / Set env variables in `.env.local`:
   * `EMAIL_USER`: Gmail adresiniz
   * `EMAIL_PASS`: Gmail uygulama şifreniz
4. Uygulamayı çalıştırın / Run the app: `npm run dev`

## Sonuç | Conclusion

Bu çalışma, sadece kod yazmak değil, aynı zamanda bir ürün inşa etme sürecindeki tutkuyu temsil etmektedir. Mimari tercihlerden kullanılan animasyonların milisaniyelik gecikmelerine kadar her şey, modern bir Full Stack geliştiricinin sahip olması gereken hassasiyetle planlanmıştır.

This work represents not just coding, but the passion in the process of building a product. Everything, from architectural choices to the millisecond delays of the animations used, has been planned with the precision that a modern Full Stack developer should possess.
