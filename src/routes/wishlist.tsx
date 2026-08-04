import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EmptyState, PageHero, SectionHeading } from "@/components/shop/Bits";
import { ProductCard } from "@/components/shop/ProductCard";
import { byId, inr, products } from "@/lib/data";
import { useShop } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({
    meta: [
      { title: "Your Wishlist — Meera Silks" },
      { name: "description", content: "The sarees you saved for later, ready to move into your bag." },
      { property: "og:title", content: "Your Wishlist — Meera Silks" },
      { property: "og:description", content: "Sarees you saved at Meera Silks." },
      { property: "og:url", content: "/wishlist" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
});

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const saved = wishlist.flatMap((id) => (byId(id) ? [byId(id)!] : []));

  return (
    <SiteLayout>
      <PageHero eyebrow="Saved" title="Your wishlist" description="Sarees you loved, kept aside. Move them to your bag before they sell out." compact />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        {saved.length ? (
          <>
            <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <p className="text-sm text-muted-foreground">{saved.length} saved · total {inr(saved.reduce((n, p) => n + p.price, 0))}</p>
              <div className="flex shrink-0 gap-2">
                <Button className="rounded-full" onClick={() => saved.forEach((p) => addToCart(p.id))}>
                  <ShoppingBag className="mr-2 h-4 w-4" /> Move all to bag
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => saved.forEach((p) => toggleWishlist(p.id))}>
                  <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {saved.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={<Heart className="h-9 w-9" />}
            title="Nothing saved yet"
            description="Tap the heart on any saree to keep it here while you decide."
            action={{ label: "Browse collections", to: "/collections" }}
          />
        )}

        <div className="mt-20">
          <SectionHeading eyebrow="Handpicked" title="You might love these" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}