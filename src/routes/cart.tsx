import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Heart, Gift, ShoppingBag, Tag } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EmptyState, SectionHeading } from "@/components/shop/Bits";
import { ProductCard } from "@/components/shop/ProductCard";
import { inr, products } from "@/lib/data";
import { useShop } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Shopping Bag — ElegantlyWoven" },
      { name: "description", content: "Review the sarees in your bag, apply a coupon and proceed to secure checkout." },
      { property: "og:title", content: "Your Shopping Bag — ElegantlyWoven" },
      { property: "og:description", content: "Review your saree selection before checkout." },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
});

function CartPage() {
  const { lines, setQty, removeFromCart, subtotal, toggleWishlist } = useShop();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; value: number } | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);

  const wrapFee = giftWrap ? 249 : 0;
  const discountValue = applied?.value ?? 0;
  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 149;
  const taxable = Math.max(subtotal - discountValue, 0);
  const gst = Math.round(taxable * 0.05);
  const total = taxable + gst + shipping + wrapFee;

  if (!lines.length) {
    return (
      <SiteLayout>
        <EmptyState
          icon={<ShoppingBag className="h-9 w-9" />}
          title="Your bag is empty"
          description="Six yards of something beautiful is waiting. Start with our best sellers."
          action={{ label: "Shop best sellers", to: "/best-sellers" }}
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <h1 className="text-3xl font-light sm:text-4xl">Shopping bag</h1>
        <p className="mt-2 text-sm text-muted-foreground">{lines.length} saree(s) reserved for 60 minutes</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            {lines.map(({ product, qty }) => (
              <article key={product.id} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 p-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:p-5">
                <Link to="/product/$id" params={{ id: product.id }}>
                  <img src={product.images[0]} alt={product.name} loading="lazy" className="aspect-4/5 w-full rounded-xl object-cover" />
                </Link>
                <div className="min-w-0">
                  <p className="eyebrow">{product.weave}</p>
                  <h2 className="mt-1 truncate text-base">
                    <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.color} · {product.fabric} · {product.length}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-base">{inr(product.price * qty)}</span>
                    <span className="text-xs text-muted-foreground line-through">{inr(product.mrp * qty)}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center rounded-full border border-border">
                      <button type="button" aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)} className="grid h-9 w-9 place-items-center">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm">{qty}</span>
                      <button type="button" aria-label="Increase" onClick={() => setQty(product.id, qty + 1)} className="grid h-9 w-9 place-items-center">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        toggleWishlist(product.id);
                        removeFromCart(product.id);
                      }}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                    >
                      <Heart className="h-3.5 w-3.5" /> Move to wishlist
                    </button>
                    <button
                      type="button"
                      onClick={() => toast("Saved for later")}
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Save for later
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/70 p-5 text-sm">
              <Checkbox checked={giftWrap} onCheckedChange={(v) => setGiftWrap(!!v)} className="mt-0.5" />
              <span>
                <span className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-gold" /> Add gift wrap (₹249)
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Muslin wrap, brass seal and a hand-written note.
                </span>
              </span>
            </label>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-border/70 p-6">
              <p className="eyebrow">Price details</p>
              <form
                className="mt-5 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (coupon.trim().toUpperCase() === "LUMA15") {
                    setApplied({ code: "LUMA15", value: Math.round(subtotal * 0.15) });
                    toast.success("Coupon applied!", {
                      description: "15% off applied successfully.",
                    });
                  } else {
                    toast.error("Invalid coupon", { description: "Try LUMA15" });
                  }
                }}
              >
                <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" aria-label="Coupon" className="rounded-full" />
                <Button type="submit" variant="outline" className="rounded-full px-6">
                  Apply
                </Button>
              </form>
              {applied ? (
                <p className="mt-3 flex items-center gap-2 text-xs text-jade">
                  <Tag className="h-3.5 w-3.5" /> {applied.code} applied
                </p>
              ) : null}

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{inr(subtotal)}</dd>
                </div>
                {applied ? (
                  <div className="flex justify-between text-jade">
                    <dt>Coupon discount</dt>
                    <dd>-{inr(discountValue)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">GST (5%)</dt>
                  <dd>{inr(gst)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping ? inr(shipping) : "Free"}</dd>
                </div>
                {giftWrap ? (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Gift wrap</dt>
                    <dd>{inr(wrapFee)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-border/70 pt-4 text-base">
                  <dt>Grand total</dt>
                  <dd className="font-serif text-xl">{inr(total)}</dd>
                </div>
              </dl>

              <Button asChild size="lg" className="mt-6 w-full rounded-full tracking-[0.16em] uppercase">
                <Link to="/checkout">Proceed to checkout</Link>
              </Button>
              <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
                <Link to="/collections">Continue shopping</Link>
              </Button>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <SectionHeading eyebrow="You may also like" title="Complete the trousseau" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {products.slice(12, 16).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
