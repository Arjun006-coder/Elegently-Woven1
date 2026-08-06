import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Repeat,
  Scissors,
  Play,
  Instagram,
  MapPin,
  Quote,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading, Eyebrow, Stars } from "@/components/shop/Bits";
import { BRAND, collections, designers, gallery, images, products, stores, testimonials } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLiveProducts } from "@/lib/api/products";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  loader: async () => {
    const liveProducts = await getLiveProducts(12);
    return { liveProducts };
  },
  component: Home,
  head: () => ({
    meta: [
      { title: "ElegantlyWoven — Luxury Handloom Sarees from Bengaluru" },
      {
        name: "description",
        content:
          "Shop certified Kanjivaram, Banarasi, silk, cotton and linen sarees at ElegantlyWoven. Weaver-direct pricing, bridal styling and pan-India delivery in 2–4 days.",
      },
      { property: "og:title", content: "ElegantlyWoven — Luxury Handloom Sarees" },
      {
        property: "og:description",
        content: "Handpicked heirloom sarees from Kanchipuram, Banaras and beyond.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const slides = [
  {
    image: images.hero1,
    eyebrow: "Muhurtham 2026",
    title: "Kanjivaram, woven for a lifetime",
    text: "Korvai borders and certified zari, loomed in Kanchipuram by third-generation weavers.",
    to: "/kanjivaram",
  },
  {
    image: images.hero3,
    eyebrow: "The Bridal Edit",
    title: "For the day you have imagined",
    text: "Hand-drawn zari pallus, private fittings and a stylist who stays with you until the muhurtham.",
    to: "/bridal",
  },
  {
    image: images.hero2,
    eyebrow: "Banaras Pit Looms",
    title: "Emerald katan, quietly regal",
    text: "Jaal and meenakari weaves in gemstone tones — limited to twelve pieces each.",
    to: "/banarasi",
  },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);
  const slide = slides[i]!;

  return (
    <section className="relative isolate h-[78vh] min-h-[34rem] overflow-hidden">
      {slides.map((s, idx) => (
        <motion.img
          key={s.title}
          src={s.image}
          alt={s.title}
          width={1920}
          height={1088}
          animate={{ opacity: idx === i ? 1 : 0, scale: idx === i ? 1.04 : 1 }}
          transition={{ opacity: { duration: 1.1 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8">
        <motion.div key={slide.title} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.05] font-light sm:text-6xl lg:text-7xl">{slide.title}</h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{slide.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-8 tracking-[0.16em] uppercase">
              <Link to={slide.to}>Explore the edit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 tracking-[0.16em] uppercase">
              <Link to="/collections">All collections</Link>
            </Button>
          </div>
        </motion.div>

        <div className="absolute right-5 bottom-8 flex items-center gap-3 sm:right-8">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
            className="grid h-10 w-10 place-items-center rounded-full glass"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-4 bg-foreground/25"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setI((v) => (v + 1) % slides.length)}
            className="grid h-10 w-10 place-items-center rounded-full glass"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

const usps = [
  { icon: ShieldCheck, title: "Silk Mark certified", text: "Every pure silk carries a loom certificate." },
  { icon: Truck, title: "2–4 day delivery", text: "Free shipping across India above ₹2,999." },
  { icon: Repeat, title: "7-day easy returns", text: "Unworn, tagged sarees — no questions." },
  { icon: Scissors, title: "Fall, pico & blouse", text: "In-house tailoring at ₹899 flat." },
];

function ParallaxBanner({
  image,
  eyebrow,
  title,
  text,
  to,
  cta,
}: {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  to: string;
  cta: string;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section className="relative isolate my-24 h-[26rem] overflow-hidden sm:h-[30rem]">
      <motion.img
        src={image}
        alt=""
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/20" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-5 pb-14 sm:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-lg text-3xl font-light sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">{text}</p>
        <Button asChild className="mt-7 rounded-full px-8 tracking-[0.16em] uppercase">
          <Link to={to}>{cta}</Link>
        </Button>
      </div>
    </section>
  );
}

function ProductRow({
  title,
  eyebrow,
  to,
  items,
}: {
  title: string;
  eyebrow: string;
  to: string;
  items: typeof products;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <SectionHeading eyebrow={eyebrow} title={title} action={{ label: "View all", to }} />
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  const { liveProducts } = Route.useLoaderData();
  const featured = collections.filter((c) =>
    ["bridal", "kanjivaram", "banarasi", "linen"].includes(c.slug),
  );
  const categoryTiles = collections.filter((c) =>
    ["festival", "wedding", "party-wear", "office-wear", "daily-wear", "designer", "cotton-sarees", "sale"].includes(c.slug),
  );

  return (
    <SiteLayout>
      <Hero />

      <div className="border-y border-border/70 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {usps.map((u) => (
            <div key={u.title} className="flex min-w-0 items-start gap-3">
              <u.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div className="min-w-0">
                <p className="text-sm">{u.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{u.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="Featured"
          title="Collections of the season"
          description="Four houses of weave, each with its own loom, its own history and its own drape."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => (
            <Link key={c.slug} to={`/${c.slug}`} className="group relative overflow-hidden rounded-3xl hover-lift">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-background">
                <p className="text-[10px] tracking-[0.28em] uppercase opacity-80">{c.eyebrow}</p>
                <p className="mt-2 font-serif text-2xl">{c.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <SectionHeading eyebrow="Shop by" title="Categories" action={{ label: "All categories", to: "/categories" }} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categoryTiles.map((c) => (
            <Link
              key={c.slug}
              to={`/${c.slug}`}
              className="group flex flex-col items-center rounded-2xl border border-border/70 bg-card p-5 text-center transition-colors hover:border-gold"
            >
              <img src={c.image} alt="" loading="lazy" className="h-24 w-24 rounded-full object-cover" />
              <p className="mt-4 text-sm">{c.title}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{c.eyebrow}</p>
            </Link>
          ))}
        </div>
      </section>

      <ProductRow eyebrow="Just In" title="Latest arrivals" to="/new-arrivals" items={liveProducts.slice(0, 4)} />

      <ParallaxBanner
        image={images.hero2}
        eyebrow="Utsav Edit"
        title="Festival silks that catch the diya light"
        text="Luminous tissue, katan and korvai weaves for Diwali, Onam and Navratri."
        to="/festival"
        cta="Shop festival"
      />

      <ProductRow eyebrow="Signature" title="Best sellers" to="/best-sellers" items={liveProducts.slice(4, 8)} />

      <ParallaxBanner
        image={images.hero3}
        eyebrow="Shubh Vivah"
        title="The wedding trousseau, curated with you"
        text="Book a two-hour private appointment at our Basavanagudi flagship."
        to="/wedding"
        cta="Book an appointment"
      />

      <ProductRow eyebrow="Most Loved" title="Trending now" to="/trending" items={liveProducts.slice(8, 12)} />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <img src={images.story} alt="Folded silk sarees" loading="lazy" className="rounded-3xl shadow-soft" />
        <div>
          <Eyebrow>Since 1978</Eyebrow>
          <h2 className="mt-4 text-3xl font-light sm:text-4xl">A family boutique, three generations deep</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {BRAND.name} began as a single loom-side counter in Basavanagudi. Today we work directly with 140 weaver
            families across Kanchipuram, Banaras, Chettinad and Sambalpur — no middlemen, no mill copies, no polyester
            passing as silk.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Every saree is inspected twice: once at the loom, once at our store. What arrives at your door has been
            touched by hands that know the difference.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {[
              ["140+", "Weaver families"],
              ["48 yrs", "Of six yards"],
              ["26", "Countries shipped"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-3xl">{n}</p>
                <p className="mt-1 text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-8 rounded-full px-8">
            <Link to="/about">Our story</Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Master Weavers" title="The hands behind the drape" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {designers.map((d, i) => (
              <div key={d.name} className="rounded-2xl bg-card p-6 text-center shadow-soft">
                <img
                  src={gallery[i + 1]}
                  alt=""
                  loading="lazy"
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                />
                <p className="mt-4 font-serif text-xl">{d.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.craft}</p>
                <p className="mt-3 text-[11px] tracking-[0.2em] text-gold uppercase">{d.years} years at the loom</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading eyebrow="In Their Words" title="Loved by 24,000 women" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6">
              <Quote className="h-5 w-5 text-gold" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{t.text}</blockquote>
              <figcaption className="mt-5">
                <Stars value={t.rating} />
                <p className="mt-2 text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.city}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <SectionHeading eyebrow="Watch" title="Drape guides & loom films" />
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["How to drape a Kanjivaram in 4 minutes", "4:12"],
            ["Inside a Banaras pit loom", "7:38"],
            ["Caring for pure silk at home", "3:05"],
          ].map(([title, dur], i) => (
            <button
              key={title}
              type="button"
              onClick={() => toast("Video player coming soon")}
              className="group relative overflow-hidden rounded-2xl text-left"
            >
              <img
                src={gallery[i + 4]}
                alt=""
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full glass">
                  <Play className="h-5 w-5" />
                </span>
              </span>
              <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-background">
                <span className="text-sm">{title}</span>
                <span className="text-xs opacity-80">{dur}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <SectionHeading eyebrow="@elegantlywoven" title="From our Instagram" align="center" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {gallery.map((g, i) => (
            <a key={i} href="#" className="group relative overflow-hidden rounded-xl">
              <img src={g} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="h-5 w-5 text-background" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-border/70 bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Visit Us</Eyebrow>
            <h2 className="mt-4 text-3xl font-light">Three stores, one counter of tea</h2>
            <div className="mt-8 space-y-6">
              {stores.map((s) => (
                <div key={s.city} className="flex gap-3 border-b border-border/60 pb-5">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm">{s.city}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.address}</p>
                    <p className="text-xs text-muted-foreground">{s.phone} · {BRAND.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-soft sm:p-12">
            <Eyebrow>The Loom Letter</Eyebrow>
            <h2 className="mt-4 text-3xl font-light">Fortnightly notes from the loom</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              New weaves, restocks and private sale invitations. No more than two emails a month.
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Welcome to the Loom Letter");
              }}
            >
              <Input type="email" required placeholder="Your email address" aria-label="Email" className="rounded-full" />
              <Button type="submit" className="rounded-full px-8 tracking-[0.16em] uppercase">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
