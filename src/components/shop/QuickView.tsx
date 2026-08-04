import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { discount, inr, type Product } from "@/lib/data";
import { useShop } from "@/lib/store";
import { Stars } from "./Bits";

export function QuickView({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (v: boolean) => void;
}) {
  const { addToCart } = useShop();
  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        {product ? (
          <div className="grid gap-0 sm:grid-cols-2">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="h-64 w-full object-cover sm:h-full"
            />
            <div className="p-7">
              <p className="eyebrow">{product.weave}</p>
              <DialogTitle className="mt-3 font-serif text-2xl font-light">{product.name}</DialogTitle>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Stars value={product.rating} /> {product.rating} · {product.reviews} reviews
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl">{inr(product.price)}</span>
                <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
                <span className="text-sm text-primary">{discount(product)}% off</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              <dl className="mt-5 grid grid-cols-2 gap-y-2 text-xs">
                <dt className="text-muted-foreground">Fabric</dt>
                <dd>{product.fabric}</dd>
                <dt className="text-muted-foreground">Occasion</dt>
                <dd>{product.occasion}</dd>
                <dt className="text-muted-foreground">Blouse</dt>
                <dd>{product.blouse ? "Included (unstitched)" : "Not included"}</dd>
                <dt className="text-muted-foreground">Length</dt>
                <dd>{product.length}</dd>
              </dl>
              <div className="mt-7 flex gap-3">
                <Button className="flex-1 rounded-full" onClick={() => addToCart(product.id)}>
                  Add to bag
                </Button>
                <Button asChild variant="outline" className="flex-1 rounded-full">
                  <Link to="/product/$id" params={{ id: product.id }}>
                    Full details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}