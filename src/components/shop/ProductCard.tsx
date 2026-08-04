import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Eye, GitCompare, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { discount, inr, type Product } from "@/lib/data";
import { useShop } from "@/lib/store";
import { Stars } from "./Bits";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-4/5 w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compare } = useShop();
  const [hover, setHover] = useState(false);
  const off = discount(product);
  const saved = wishlist.includes(product.id);
  const primary = product.images[0] ?? "";
  const secondary = product.images[1] ?? primary;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary/50">
        <Link to="/product/$id" params={{ id: product.id }} aria-label={product.name}>
          <img
            src={hover ? secondary : primary}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-2">
          {off > 0 ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] tracking-widest text-primary-foreground uppercase">
              {off}% off
            </span>
          ) : null}
          {product.badge ? (
            <span className="rounded-full bg-card/90 px-2.5 py-1 text-[10px] tracking-widest text-foreground uppercase">
              {product.badge}
            </span>
          ) : null}
          {product.stock === 0 ? (
            <span className="rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] tracking-widest text-background uppercase">
              Sold out
            </span>
          ) : product.stock <= 4 ? (
            <span className="rounded-full bg-jade px-2.5 py-1 text-[10px] tracking-widest text-jade-foreground uppercase">
              Only {product.stock} left
            </span>
          ) : null}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label="Add to wishlist"
            className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
          </button>
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label="Quick view"
              className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110"
            >
              <Eye className="h-4 w-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => toggleCompare(product.id)}
            aria-label="Compare"
            className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110"
          >
            <GitCompare className={cn("h-4 w-4", compare.includes(product.id) && "text-primary")} />
          </button>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            disabled={product.stock === 0}
            onClick={() => addToCart(product.id)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-card/95 py-3 text-[11px] tracking-[0.2em] uppercase shadow-soft backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {product.stock === 0 ? "Notify me" : "Quick add"}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="eyebrow">{product.weave}</p>
        <h3 className="text-base leading-snug font-normal">
          <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Stars value={product.rating} />
          <span>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base">{inr(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Truck className="h-3 w-3" /> Delivery in 2–4 days
        </p>
      </div>
    </motion.article>
  );
}