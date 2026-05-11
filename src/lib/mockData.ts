export const products = [
  {
    id: "PRD-001",
    name: "iPhone 15 Pro Max",
    category: "Akıllı Telefon",
    price: "₺82.999",
    rawPrice: 82999,
    stock: 24,
    status: "Stokta Var",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Titanyum tasarım, A17 Pro çip ve gelişmiş kamera sistemi.",
    specs: ["256GB", "Doğal Titanyum", "6.7 inç Ekran"]
  },
  {
    id: "PRD-002",
    name: "MacBook Pro 14 M3",
    category: "Dizüstü Bilgisayar",
    price: "₺64.500",
    rawPrice: 64500,
    stock: 8,
    status: "Azalıyor",
    image: "https://images.unsplash.com/photo-1517336714467-d13a863f1774?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Profesyonel performans için güçlendirilmiş M3 Pro çip.",
    specs: ["18GB RAM", "512GB SSD", "Uzay Siyahı"]
  },
  {
    id: "PRD-003",
    name: "AirPods Max Silver",
    category: "Ses Sistemleri",
    price: "₺24.800",
    rawPrice: 24800,
    stock: 15,
    status: "Stokta Var",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Yüksek sadakatli ses ve aktif gürültü engelleme.",
    specs: ["Uzamsal Ses", "20 Saat Pil Ömrü", "Gümüş"]
  },
  {
    id: "PRD-004",
    name: "iPad Pro 11 M2",
    category: "Tablet",
    price: "₺34.200",
    rawPrice: 34200,
    stock: 0,
    status: "Tükendi",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Dünyanın en gelişmiş mobil ekranı ve M2 çip.",
    specs: ["Liquid Retina", "128GB", "Wi-Fi + Cellular"]
  }
];

export const orders = [
  { 
    id: "#ORD-8821", 
    customer: "Caner Yıldız", 
    email: "caner@yildiz.com",
    date: "12 May 2024", 
    status: "Teslim Edildi", 
    amount: "₺82.999",
    productImage: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=100&h=100",
    productName: "iPhone 15 Pro Max",
    address: "Nişantaşı, Abdi İpekçi Cd. No:42, Şişli/İstanbul"
  },
  { 
    id: "#ORD-8822", 
    customer: "Melis Er", 
    email: "melis@creative.studio",
    date: "11 May 2024", 
    status: "Yolda", 
    amount: "₺24.800",
    productImage: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=100&h=100",
    productName: "AirPods Max",
    address: "Alsancak, Kıbrıs Şehitleri Cd., İzmir"
  },
  { 
    id: "#ORD-8823", 
    customer: "Burak Kaya", 
    email: "burak@techline.com",
    date: "11 May 2024", 
    status: "Hazırlanıyor", 
    amount: "₺64.500",
    productImage: "https://images.unsplash.com/photo-1517336714467-d13a863f1774?auto=format&fit=crop&q=80&w=100&h=100",
    productName: "MacBook Pro 14",
    address: "Çankaya, Eskişehir Yolu No:10, Ankara"
  }
];

export const salesData = [
  { name: "Pzt", sales: 42000 },
  { name: "Sal", sales: 38000 },
  { name: "Çar", sales: 56000 },
  { name: "Per", sales: 48000 },
  { name: "Cum", sales: 72000 },
  { name: "Cmt", sales: 84000 },
  { name: "Paz", sales: 69000 },
];

export const statData = [
  { title: "Günlük Gelir", value: "₺142,384", trend: "+12.5%", trendType: "up" },
  { title: "Yeni Sipariş", value: "48", trend: "+8.2%", trendType: "up" },
  { title: "Aktif İlanlar", value: "156", trend: "Sabit", trendType: "neutral" },
  { title: "Müşteri Skoru", value: "4.9/5", trend: "+0.1", trendType: "up" },
];
