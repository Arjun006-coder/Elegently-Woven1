import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Store,
  Sparkles,
  Rotate3d,
  Play,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading, Stars, Eyebrow } from "@/components/shop/Bits";
import { byId, discount, inr, products, testimonials } from "@/lib/data";
import { getLiveProductBySlug } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    let product = await getLiveProductBySlug(params.id);
    
    if (!product) {
      const mockProduct = byId(params.id);
      if (!mockProduct) throw notFound();
      product = mockProduct;
    }
    
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Saree unavailable — ElegantlyWoven" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — ${p.weave} Saree | ElegantlyWoven` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.name} — ElegantlyWoven` },
        { property: "og:description", content: p.description.slice(0, 155) },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.id}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.id}` }],
    };
  },
  component: ProductPage,
});

const colors = ["Maroon", "Emerald", "Champagne", "Ivory"];
const fabrics = ["Pure Silk", "Silk Cotton", "Tissue"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, markViewed, recent } = useShop();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.color);
  const [fabric, setFabric] = useState(fabrics[0]!);
  const [pin, setPin] = useState("");
  const [zoom, setZoom] = useState(false);
  const [view360Open, setView360Open] = useState(false);
  const [view360Angle, setView360Angle] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userReviewName, setUserReviewName] = useState("");
  const [userReviewText, setUserReviewText] = useState("");

  useEffect(() => {
    markViewed(product.id);
    setActive(0);
    setQty(1);
  }, [product.id, markViewed]);

  const similar = products.filter((p) => p.weave === product.weave && p.id !== product.id).slice(0, 4);
  const recommended = products.filter((p) => p.id !== product.id).slice(4, 8);
  const bundle = products.filter((p) => p.id !== product.id).slice(1, 3);
  const bundleTotal = bundle.reduce((n, p) => n + p.price, product.price);
  const recentItems = recent.flatMap((id) => (byId(id) && id !== product.id ? [byId(id)!] : [])).slice(0, 4);

  const spec: Array<[string, string]> = [
    ["Weave", product.weave],
    ["Fabric", product.fabric],
    ["Pattern", product.pattern],
    ["Border", product.border],
    ["Colour", product.color],
    ["Occasion", product.occasion],
    ["Length", product.length],
    ["Blouse", product.blouse ? "Included (0.8 m unstitched)" : "Not included"],
    ["Zari", "Certified half-fine silver zari"],
    ["Wash care", "Dry clean only"],
    ["Weaver", "Kamakshi Iyer, Loom #14"],
    ["Country of origin", "India"],
  ];

  return (
    <SiteLayout>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-xs text-muted-foreground sm:px-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/collections" className="hover:text-foreground">Collections</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div
            className="relative overflow-hidden rounded-3xl bg-secondary/40"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <motion.img
              key={active}
              src={product.images[active]}
              alt={product.name}
              width={1024}
              height={1280}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "aspect-4/5 w-full object-cover transition-transform duration-700",
                zoom && "scale-125",
              )}
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {discount(product) > 0 ? <Badge className="rounded-full">{discount(product)}% off</Badge> : null}
              {product.badge ? <Badge variant="secondary" className="rounded-full">{product.badge}</Badge> : null}
            </div>
            <div className="absolute right-4 bottom-4 flex gap-2">
              <button
                type="button"
                onClick={() => setView360Open(true)}
                className="flex items-center gap-2 rounded-full glass px-3 py-2 text-xs hover:bg-card/90 transition-colors"
              >
                <Rotate3d className="h-4 w-4" /> 360° view
              </button>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2 rounded-full glass px-3 py-2 text-xs hover:bg-card/90 transition-colors"
              >
                <Play className="h-4 w-4" /> Video
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {(product.images as string[]).map((img: string, i: number) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "overflow-hidden rounded-xl border transition-colors",
                  i === active ? "border-gold" : "border-transparent",
                )}
              >
                <img src={img} alt="" loading="lazy" className="aspect-4/5 w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Hover the image to zoom</p>
        </div>

        <div>
          <Eyebrow>{product.weave} · {product.fabric}</Eyebrow>
          <h1 className="mt-3 text-3xl font-light sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Stars value={product.rating} /> {product.rating}
            </span>
            <span>·</span>
            <a href="#reviews" className="hover:text-foreground">{product.reviews} reviews</a>
            <span>·</span>
            {product.stock > 0 ? (
              product.stock < 5 ? (
                <span className="text-red-500 font-medium">Only {product.stock} left in stock — order soon!</span>
              ) : (
                <span>{product.stock} in stock</span>
              )
            ) : (
              <span className="text-red-600 font-bold">Sold out</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl">{inr(product.price)}</span>
            <span className="text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="text-primary">{discount(product)}% off</span>
            <span className="w-full text-xs text-muted-foreground">Inclusive of all taxes · GST invoice available</span>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-sm">Colour · <span className="text-muted-foreground">{color}</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[product.color, ...colors.filter((c) => c !== product.color)].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs transition-colors",
                      color === c ? "border-gold bg-accent" : "border-border hover:border-gold",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm">Fabric · <span className="text-muted-foreground">{fabric}</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                {fabrics.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFabric(f)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs transition-colors",
                      fabric === f ? "border-gold bg-accent" : "border-border hover:border-gold",
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 p-4 text-sm">
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold" /> Blouse & size
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {product.blouse
                  ? "0.8 m unstitched blouse piece included. Free size — stitching available up to 44\" bust."
                  : "Blouse not included. Add matching blouse fabric at checkout."}{" "}
                Saree length {product.length}. Fall & pico at ₹299.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-border">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid h-10 w-10 place-items-center">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid h-10 w-10 place-items-center">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 rounded-full tracking-[0.16em] uppercase"
                disabled={product.stock === 0}
                onClick={() => addToCart(product.id, qty)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to bag
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 rounded-full tracking-[0.16em] uppercase">
                <Link to="/checkout">Buy now</Link>
              </Button>
            </div>

            <div className="flex gap-6 text-xs">
              <button type="button" onClick={() => toggleWishlist(product.id)} className="flex items-center gap-2 hover:text-primary">
                <Heart className={cn("h-4 w-4", wishlist.includes(product.id) && "fill-primary text-primary")} />
                {wishlist.includes(product.id) ? "Saved" : "Add to wishlist"}
              </button>
              <button
                type="button"
                onClick={() => toast.success("Link copied to clipboard")}
                className="flex items-center gap-2 hover:text-primary"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-5">
              <p className="text-sm">Delivery & services</p>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setPinResult(
                    /^\d{6}$/.test(pin)
                      ? `Delivers by ${new Date(Date.now() + 3 * 864e5).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · COD available`
                      : "Enter a valid 6-digit pincode",
                  );
                }}
              >
                <Input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter pincode"
                  aria-label="Pincode"
                  className="rounded-full"
                  maxLength={6}
                />
                <Button type="submit" variant="outline" className="rounded-full px-6">
                  Check
                </Button>
              </form>
              {pinResult ? <p className="mt-3 text-xs text-jade">{pinResult}</p> : null}
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-gold" /> Free insured shipping above ₹2,999</li>
                <li className="flex items-center gap-2"><RotateCcw className="h-3.5 w-3.5 text-gold" /> 7-day return · 15-day replacement</li>
                <li className="flex items-center gap-2"><CreditCard className="h-3.5 w-3.5 text-gold" /> EMI from {inr(Math.round(product.price / 6))}/mo · 6 months no cost</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> Silk Mark certified · loom certificate included</li>
                <li className="flex items-center gap-2"><Store className="h-3.5 w-3.5 text-gold" /> Sold by ElegantlyWoven Retail LLP · 4.8★ seller</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Tabs defaultValue="details" className="mt-10">
          <TabsList className="flex-wrap">
            <TabsTrigger value="details">Description</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="care">Care</TabsTrigger>
            <TabsTrigger value="qa">Q & A</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="max-w-3xl pt-6 text-sm leading-relaxed text-muted-foreground">
            <p>{product.description}</p>
            <p className="mt-4">
              The pallu carries a traditional {product.pattern.toLowerCase()} motif, framed by a {product.border.toLowerCase()} border.
              Ideal for {product.occasion.toLowerCase()} wear, styled with temple jewellery and a low bun.
            </p>
          </TabsContent>
          <TabsContent value="specs" className="pt-6">
            <dl className="grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2">
              {spec.map(([k, v]) => (
                <div key={k} className="bg-card px-4 py-3">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="care" className="max-w-3xl pt-6 text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li>Dry clean only for the first three washes.</li>
              <li>Store wrapped in muslin; refold along a new line every three months.</li>
              <li>Never spray perfume directly on zari.</li>
              <li>Keep away from direct sunlight to preserve the dye.</li>
            </ul>
          </TabsContent>
          <TabsContent value="qa" className="max-w-3xl pt-6">
            <Accordion type="single" collapsible>
              {[
                ["Is the zari pure silver?", "It is certified half-fine zari — silver coated with gold, tested at our Kanchipuram unit."],
                ["Will the colour bleed?", "No. All our silks are pre-treated; the first dry clean is on us if it does."],
                ["Can I get a matching blouse stitched?", "Yes, add stitching at checkout and share measurements over WhatsApp."],
              ].map(([q, a]) => (
                <AccordionItem key={q} value={q!}>
                  <AccordionTrigger className="text-left text-sm">{q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>

      <section id="reviews" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading eyebrow="Reviews" title={`${product.reviews} customer reviews`} />
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div className="rounded-2xl border border-border/70 p-6">
            <p className="font-serif text-5xl">{product.rating}</p>
            <Stars value={product.rating} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Based on {product.reviews} verified purchases</p>
            <div className="mt-6 space-y-3">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-3">{star}</span>
                  <Progress value={[78, 14, 5, 2, 1][i]} className="h-1.5" />
                  <span className="w-8 text-right text-muted-foreground">{[78, 14, 5, 2, 1][i]}%</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-6 w-full rounded-full" onClick={() => setReviewOpen(true)}>
              Write a review
            </Button>
          </div>
          <div className="space-y-6">
            {testimonials.map((t) => (
              <article key={t.name} className="border-b border-border/70 pb-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-xs">{t.name[0]}</span>
                  <div>
                    <p className="text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city} · Verified purchase</p>
                  </div>
                  <Stars value={t.rating} className="ml-auto" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <SectionHeading eyebrow="Save more" title="Frequently bought together" />
        <div className="flex flex-col gap-6 rounded-3xl border border-border/70 p-6 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap items-center gap-4">
            {[product, ...bundle].map((p, i) => (
              <div key={p.id} className="flex items-center gap-4">
                {i > 0 ? <Plus className="h-4 w-4 text-muted-foreground" /> : null}
                <div className="w-28">
                  <img src={p.images[0]} alt="" loading="lazy" className="aspect-4/5 w-full rounded-xl object-cover" />
                  <p className="mt-2 truncate text-xs">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{inr(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 lg:text-right">
            <p className="text-xs text-muted-foreground">Bundle total</p>
            <p className="font-serif text-2xl">{inr(Math.round(bundleTotal * 0.92))}</p>
            <p className="text-xs text-jade">Save 8% on this set</p>
            <Button
              className="mt-3 rounded-full px-7"
              onClick={() => [product, ...bundle].forEach((p) => addToCart(p.id))}
            >
              <Check className="mr-2 h-4 w-4" /> Add all three
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <SectionHeading eyebrow="Complete the look" title="Similar sarees" action={{ label: "View all", to: "/collections" }} />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {(similar.length ? similar : recommended).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {recentItems.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <SectionHeading eyebrow="Recently viewed" title="Pick up where you left off" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {recentItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* 360° Viewer Modal */}
      <Dialog open={view360Open} onOpenChange={setView360Open}>
        <DialogContent className="max-w-xl text-center">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">360° Loom View — {product.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative aspect-4/5 w-full max-w-md overflow-hidden rounded-2xl bg-secondary/30">
              <img
                src={(product.images as string[])[view360Angle % (product.images as string[]).length] || product.images[0]}
                alt="360 view angle"
                className="h-full w-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full glass"
                  onClick={() => setView360Angle((a) => (a - 1 + product.images.length) % product.images.length)}
                >
                  Rotate Left ↺
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full glass"
                  onClick={() => setView360Angle((a) => (a + 1) % product.images.length)}
                >
                  Rotate Right ↻
                </Button>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Click buttons above to rotate angle in 3D view mode</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Drape Video Preview Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-2xl text-center">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Drape & Craft Film — {product.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 overflow-hidden rounded-2xl bg-black aspect-video flex items-center justify-center relative">
            <img src={product.images[0]} alt="Video cover" className="h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center bg-black/40">
              <Play className="h-16 w-16 text-gold mb-3 animate-pulse" />
              <h3 className="text-xl font-serif">{product.name} Craftsmanship</h3>
              <p className="mt-2 text-xs text-white/80 max-w-md">
                Handwoven by artisan weavers using pure silk and zari threads. Fall and pallu drape view video demonstration.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Write a Review Modal */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Write a Review for {product.name}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReviewOpen(false);
              toast.success("Thank you for your review!", {
                description: "Your rating & review have been submitted successfully.",
              });
              setUserReviewName("");
              setUserReviewText("");
            }}
            className="space-y-4 mt-2"
          >
            <div>
              <Label>Overall Rating</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="p-1 text-gold focus:outline-none"
                  >
                    <Star className={cn("h-6 w-6", star <= userRating ? "fill-gold text-gold" : "text-muted")} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="rname">Your Name *</Label>
              <Input
                id="rname"
                required
                value={userReviewName}
                onChange={(e) => setUserReviewName(e.target.value)}
                placeholder="e.g. Aditi Rao"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rtext">Your Review *</Label>
              <Textarea
                id="rtext"
                required
                value={userReviewText}
                onChange={(e) => setUserReviewText(e.target.value)}
                placeholder="Describe the fabric quality, weave, drape, and delivery experience…"
                className="mt-1"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full rounded-full mt-4">
              Submit Review
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
