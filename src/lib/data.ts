import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import story from "@/assets/story.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export const BRAND = {
  name: "ElegantlyWoven",
  tagline: "Curated women's fashion, delivered with elegance",
  phone: "+91 98000 00000",
  whatsapp: "+91 98000 00000",
  email: "hello@elegantlywoven.com",
  address: "LumaScale, India",
  hours: "Mon – Sat · 10:00 AM to 8:00 PM",
  poweredBy: "LumaScale",
};

export const images = { hero1, hero2, hero3, story };
export const gallery = [p1, p2, p3, p4, p5, p6, p7, p8];

export type Product = {
  id: string;
  name: string;
  weave: string;
  fabric: string;
  occasion: string;
  color: string;
  pattern: string;
  border: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
  tags: string[];
  badge?: "New" | "Bestseller" | "Limited" | "Trending" | undefined;
  blouse: boolean;
  length: string;
  description: string;
};

const seeds: Array<
  [string, string, string, string, string, string, number, number, number]
> = [
  ["Anantha Kanjivaram", "Kanjivaram", "Pure Mulberry Silk", "Wedding", "Maroon", "Zari Butta", 42500, 54000, 0],
  ["Kashi Banarasi Jaal", "Banarasi", "Katan Silk", "Wedding", "Emerald", "Jaal", 28900, 36500, 1],
  ["Champa Tissue Drape", "Tissue Silk", "Tissue Silk", "Party", "Champagne", "Plain", 18600, 24000, 2],
  ["Rangoli Handloom Cotton", "Handloom", "Kora Cotton", "Daily", "Beige", "Temple Stripe", 4890, 6500, 3],
  ["Gulaab Organza", "Designer", "Organza", "Party", "Rose Gold", "Sequin", 15900, 21000, 4],
  ["Nakshatra Linen", "Linen", "Pure Linen", "Office", "Soft Black", "Minimal", 6490, 8200, 5],
  ["Vivaha Bridal Silk", "Bridal", "Pure Silk", "Bridal", "Red", "Heavy Zari", 68000, 82000, 6],
  ["Chandni Chiffon", "Designer", "Chiffon", "Party", "Ivory", "Polka Zari", 9800, 12500, 7],
  ["Meenakari Kanjivaram", "Kanjivaram", "Pure Mulberry Silk", "Festival", "Emerald", "Korvai", 38500, 46000, 1],
  ["Sanskriti Banarasi", "Banarasi", "Katan Silk", "Festival", "Maroon", "Meenakari", 24500, 31000, 0],
  ["Ujjwal Silk Cotton", "Silk", "Silk Cotton", "Daily", "Champagne", "Checks", 5290, 7100, 2],
  ["Aarambh Cotton Handloom", "Cotton", "Handloom Cotton", "Office", "Ivory", "Stripe", 3890, 4900, 3],
  ["Roshni Rose Tissue", "Tissue Silk", "Tissue Silk", "Wedding", "Rose Gold", "Zari Border", 21500, 27500, 4],
  ["Shyama Linen Weave", "Linen", "Pure Linen", "Office", "Soft Black", "Stripe", 7290, 9400, 5],
  ["Sindoor Bridal Banarasi", "Bridal", "Katan Silk", "Bridal", "Red", "Heavy Jaal", 54900, 68000, 6],
  ["Mrinal Ivory Silk", "Silk", "Pure Silk", "Wedding", "Ivory", "Zari Butta", 26900, 33500, 7],
  ["Kalyani Kanjivaram", "Kanjivaram", "Pure Mulberry Silk", "Bridal", "Maroon", "Rich Pallu", 59500, 71000, 0],
  ["Padmini Designer Drape", "Designer", "Georgette", "Party", "Emerald", "Embroidered", 13900, 18500, 1],
  ["Suvarna Festival Silk", "Silk", "Pure Silk", "Festival", "Champagne", "Zari Buttas", 19900, 25500, 2],
  ["Neel Kamal Cotton", "Cotton", "Mul Cotton", "Daily", "Beige", "Block Print", 2990, 3900, 3],
  ["Amara Rose Handloom", "Handloom", "Handloom Silk", "Festival", "Rose Gold", "Temple Border", 16500, 21500, 4],
  ["Tamas Office Linen", "Linen", "Pure Linen", "Office", "Soft Black", "Plain", 5890, 7500, 5],
  ["Raktim Wedding Silk", "Silk", "Pure Silk", "Wedding", "Red", "Korvai", 44900, 55000, 6],
  ["Shwet Ivory Chiffon", "Designer", "Chiffon", "Party", "Ivory", "Hand Painted", 11900, 15500, 7],
];

const badges = ["New", "Bestseller", "Trending", "Limited", "New"] as const;

export const products: Product[] = seeds.map((s, i) => {
  const [name, weave, fabric, occasion, color, pattern, price, mrp, img] = s;
  const imgs = [img, (img + 3) % 8, (img + 5) % 8, (img + 1) % 8].map((n) => gallery[n] as string);
  return {
    id: `${name.toLowerCase().replace(/[^a-z]+/g, "-")}-${i + 1}`,
    name,
    weave,
    fabric,
    occasion,
    color,
    pattern,
    border: pattern.includes("Zari") ? "Zari" : "Contrast",
    price,
    mrp,
    rating: Number((4.1 + ((i * 7) % 9) / 10).toFixed(1)),
    reviews: 24 + ((i * 37) % 480),
    stock: ([12, 4, 0, 7, 21, 2] as const)[i % 6] ?? 8,
    images: imgs,
    tags: [weave, occasion, fabric],
    badge: badges[i % 5],
    blouse: i % 3 !== 0,
    length: i % 4 === 0 ? "6.3 m with blouse" : "5.5 m",
    description: `${name} is a handpicked ${fabric.toLowerCase()} saree woven with a ${pattern.toLowerCase()} motif and finished with a traditional ${occasion.toLowerCase()} palette. Each piece is loomed by our master weavers and takes 18–24 days to complete.`,
  };
});

export const byId = (id: string) => products.find((p) => p.id === id);

export type CollectionMeta = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  filter?: (p: Product) => boolean;
};

export const collections: CollectionMeta[] = [
  { slug: "collections", title: "All Collections", eyebrow: "The House", description: "Every weave in the ElegantlyWoven atelier — from six-yard everyday cottons to heirloom bridal Kanjivarams.", image: hero1 },
  { slug: "categories", title: "Shop by Category", eyebrow: "Browse", description: "Find your saree by weave, fabric and occasion.", image: hero2 },
  { slug: "new-arrivals", title: "New Arrivals", eyebrow: "Just In", description: "Freshly loomed drapes, added to the atelier this fortnight.", image: hero2, filter: (p) => p.badge === "New" || p.rating > 4.5 },
  { slug: "trending", title: "Trending Now", eyebrow: "Most Loved", description: "What India is draping this season.", image: hero1, filter: (p) => p.badge === "Trending" || p.reviews > 200 },
  { slug: "best-sellers", title: "Best Sellers", eyebrow: "Signature", description: "Our most requested weaves, reordered season after season.", image: hero3, filter: (p) => p.badge === "Bestseller" || p.reviews > 260 },
  { slug: "festival", title: "Festival Collection", eyebrow: "Utsav", description: "Luminous silks for Diwali, Onam, Pongal and Navratri.", image: hero2, filter: (p) => p.occasion === "Festival" },
  { slug: "wedding", title: "Wedding Collection", eyebrow: "Shubh Vivah", description: "For the sangeet, the muhurtham and every ritual in between.", image: hero3, filter: (p) => p.occasion === "Wedding" },
  { slug: "bridal", title: "Bridal Collection", eyebrow: "The Bride", description: "Heirloom bridal sarees with hand-drawn zari pallus.", image: hero3, filter: (p) => p.occasion === "Bridal" },
  { slug: "party-wear", title: "Party Wear", eyebrow: "After Dark", description: "Organza, chiffon and tissue drapes with a modern edge.", image: hero1, filter: (p) => p.occasion === "Party" },
  { slug: "office-wear", title: "Office Wear", eyebrow: "Everyday Elegance", description: "Crisp linens and cottons that hold a pleat all day.", image: story, filter: (p) => p.occasion === "Office" },
  { slug: "daily-wear", title: "Daily Wear", eyebrow: "Soft Comfort", description: "Breathable mul and kora cottons for the everyday six yards.", image: story, filter: (p) => p.occasion === "Daily" },
  { slug: "silk-sarees", title: "Silk Sarees", eyebrow: "Pure Silk", description: "Mark-of-purity silks with certified zari.", image: hero1, filter: (p) => p.fabric.includes("Silk") },
  { slug: "cotton-sarees", title: "Cotton Sarees", eyebrow: "Handspun", description: "Mul, kora and handloom cottons from Chettinad and Bengal.", image: story, filter: (p) => p.fabric.includes("Cotton") },
  { slug: "banarasi", title: "Banarasi Sarees", eyebrow: "Varanasi", description: "Katan silk woven on Banaras pit looms.", image: hero2, filter: (p) => p.weave === "Banarasi" },
  { slug: "kanjivaram", title: "Kanjivaram Sarees", eyebrow: "Kanchipuram", description: "Korvai borders, contrast pallus, pure mulberry silk.", image: hero1, filter: (p) => p.weave === "Kanjivaram" },
  { slug: "linen", title: "Linen Sarees", eyebrow: "Modern Classic", description: "Feather-light pure linen with understated borders.", image: story, filter: (p) => p.fabric.includes("Linen") },
  { slug: "designer", title: "Designer Sarees", eyebrow: "Atelier", description: "Limited pieces created with our in-house design studio.", image: hero3, filter: (p) => p.weave === "Designer" },
  { slug: "handloom", title: "Handloom Collection", eyebrow: "Weaver Direct", description: "Bought straight from the loom, at fair weaver prices.", image: story, filter: (p) => p.weave === "Handloom" },
  { slug: "sale", title: "The Sale", eyebrow: "Up to 30% Off", description: "Season-end pricing on select weaves. While stocks last.", image: hero2, filter: (p) => p.mrp - p.price > 5000 },
];

export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);

export const megaMenu = [
  {
    label: "Weaves",
    items: [
      { label: "Kanjivaram", to: "/kanjivaram" },
      { label: "Banarasi", to: "/banarasi" },
      { label: "Silk Sarees", to: "/silk-sarees" },
      { label: "Cotton Sarees", to: "/cotton-sarees" },
      { label: "Linen", to: "/linen" },
      { label: "Handloom", to: "/handloom" },
    ],
  },
  {
    label: "Occasion",
    items: [
      { label: "Bridal", to: "/bridal" },
      { label: "Wedding", to: "/wedding" },
      { label: "Festival", to: "/festival" },
      { label: "Party Wear", to: "/party-wear" },
      { label: "Office Wear", to: "/office-wear" },
      { label: "Daily Wear", to: "/daily-wear" },
    ],
  },
  {
    label: "Curated",
    items: [
      { label: "New Arrivals", to: "/new-arrivals" },
      { label: "Trending", to: "/trending" },
      { label: "Best Sellers", to: "/best-sellers" },
      { label: "Designer", to: "/designer" },
      { label: "Gift Cards", to: "/gift-cards" },
      { label: "Sale", to: "/sale" },
    ],
  },
];

export const filterGroups = [
  { key: "occasion", label: "Occasion", options: ["Bridal", "Wedding", "Festival", "Party", "Office", "Daily"] },
  { key: "fabric", label: "Fabric", options: ["Pure Mulberry Silk", "Katan Silk", "Pure Silk", "Tissue Silk", "Handloom Cotton", "Mul Cotton", "Kora Cotton", "Silk Cotton", "Pure Linen", "Organza", "Chiffon", "Georgette"] },
  { key: "color", label: "Colour", options: ["Maroon", "Red", "Emerald", "Champagne", "Rose Gold", "Ivory", "Beige", "Soft Black"] },
  { key: "pattern", label: "Pattern", options: ["Zari Butta", "Jaal", "Plain", "Sequin", "Stripe", "Checks", "Block Print", "Embroidered", "Hand Painted", "Minimal"] },
  { key: "border", label: "Border", options: ["Zari", "Contrast"] },
  { key: "length", label: "Length", options: ["5.5 m", "6.3 m with blouse"] },
];

export const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", text: "My muhurtham Kanjivaram came beautifully packaged with the weaver's certificate. The zari is unbelievably fine.", rating: 5 },
  { name: "Ananya Rao", city: "Bengaluru", text: "I have bought eleven cottons from ElegantlyWoven. They hold colour after twenty washes.", rating: 5 },
  { name: "Fatima Sheikh", city: "Hyderabad", text: "The style advisor helped me pick a Banarasi within my budget. Delivered in two days — amazing!", rating: 4.5 },
  { name: "Divya Menon", city: "Kochi", text: "Packaging felt like a luxury gift box. My mother thought I spent twice as much.", rating: 5 },
];

export const stores = [
  { city: "Mumbai", address: "14, Linking Road, Bandra West", phone: "+91 98000 00001" },
  { city: "Delhi", address: "27, Connaught Place, New Delhi", phone: "+91 98000 00002" },
  { city: "Bengaluru", address: "8, UB City Mall, Vittal Mallya Road", phone: "+91 98000 00003" },
];

export const designers = [
  { name: "Kamakshi Iyer", craft: "Kanjivaram Korvai", years: 32 },
  { name: "Rehman Ansari", craft: "Banarasi Katan", years: 28 },
  { name: "Sujata Behera", craft: "Handloom Ikat", years: 19 },
  { name: "Nithya Prasad", craft: "Contemporary Drapes", years: 11 },
];

export const orders = [
  { id: "EW-100482", date: "18 Jul 2026", total: 42500, status: "Out for Delivery", items: 1, product: products[0] },
  { id: "EW-100455", date: "02 Jul 2026", total: 34390, status: "Delivered", items: 2, product: products[3] },
  { id: "EW-100411", date: "21 Jun 2026", total: 18600, status: "Delivered", items: 1, product: products[2] },
  { id: "EW-100380", date: "09 Jun 2026", total: 6490, status: "Returned", items: 1, product: products[5] },
];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const discount = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const faqs = [
  { q: "Are the silks certified?", a: "Every pure silk saree carries the Silk Mark of India and a weaver certificate with the loom number." },
  { q: "Do you stitch blouses?", a: "Yes. We offer fall-and-pico plus custom blouse stitching at checkout for a flat ₹899." },
  { q: "What is the delivery time?", a: "Metro cities receive orders in 2–3 days; the rest of India in 4–6 days. Bridal orders ship in 7 days after fitting confirmation." },
  { q: "Can I return a saree?", a: "Unworn sarees with tags can be returned within 7 days. Custom-stitched and bridal pieces are exchange-only." },
  { q: "Do you ship internationally?", a: "We ship to 26 countries via DHL. Duties are calculated at checkout." },
  { q: "Is Cash on Delivery available?", a: "COD is available on orders up to ₹25,000 across 14,000+ pincodes." },
];