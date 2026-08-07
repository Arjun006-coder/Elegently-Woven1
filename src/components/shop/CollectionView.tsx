import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { QuickView } from "./QuickView";
import { filterGroups, inr, products as allProducts, type Product } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sorts = [
  { value: "popular", label: "Popularity" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "discount", label: "Discount" },
  { value: "rating", label: "Customer rating" },
];

type Selected = Record<string, string[]>;

function FilterPanel({
  selected,
  toggle,
  price,
  setPrice,
  inStock,
  setInStock,
  clear,
}: {
  selected: Selected;
  toggle: (key: string, value: string) => void;
  price: number[];
  setPrice: (v: number[]) => void;
  inStock: boolean;
  setInStock: (v: boolean) => void;
  clear: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="eyebrow">Filters</p>
        <button type="button" onClick={clear} className="text-xs text-primary hover:underline">
          Clear all
        </button>
      </div>

      <div>
        <p className="text-sm">Price</p>
        <Slider
          className="mt-4"
          value={price}
          min={0}
          max={200000}
          step={500}
          onValueChange={setPrice}
          aria-label="Price range"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          {inr(price[0] ?? 0)} — {inr(price[1] ?? 0)}
        </p>
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm">
        <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(!!v)} />
        In stock only
      </label>

      {filterGroups.map((g) => (
        <div key={g.key}>
          <p className="text-sm">{g.label}</p>
          <div className="mt-3 space-y-2.5">
            {g.options.map((o) => (
              <label key={o} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
                <Checkbox
                  checked={(selected[g.key] ?? []).includes(o)}
                  onCheckedChange={() => toggle(g.key, o)}
                />
                {o}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CollectionView({
  source,
  pageSize = 8,
}: {
  source?: Product[];
  pageSize?: number;
}) {
  const base = source ?? allProducts;
  const [selected, setSelected] = useState<Selected>({});
  const [price, setPrice] = useState<number[]>([0, 200000]);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("popular");
  const [visible, setVisible] = useState(pageSize);
  const [loading, setLoading] = useState(true);
  const [quick, setQuick] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [base]);

  const toggle = (key: string, value: string) =>
    setSelected((s) => {
      const cur = s[key] ?? [];
      return { ...s, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });

  const filtered = useMemo(() => {
    const lo = price[0] ?? 0;
    const hi = price[1] ?? Infinity;
    const out = base.filter((p) => {
      if (p.price < lo || p.price > hi) return false;
      if (inStock && p.stock === 0) return false;
      return Object.entries(selected).every(([key, vals]) => {
        if (!vals.length) return true;
        const field = (p as unknown as Record<string, string>)[key] ?? "";
        return vals.includes(field);
      });
    });
    const sorted = [...out];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "discount") sorted.sort((a, b) => b.mrp - b.price - (a.mrp - a.price));
    if (sort === "newest") sorted.reverse();
    if (sort === "popular") sorted.sort((a, b) => b.reviews - a.reviews);
    return sorted;
  }, [base, selected, price, inStock, sort]);

  const activeChips = Object.entries(selected).flatMap(([k, vals]) => vals.map((v) => ({ k, v })));

  const clear = () => {
    setSelected({});
    setPrice([2000, 80000]);
    setInStock(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2 no-scrollbar">
            <FilterPanel
              selected={selected}
              toggle={toggle}
              price={price}
              setPrice={setPrice}
              inStock={inStock}
              setInStock={setInStock}
              clear={clear}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 pb-4">
            <p className="truncate text-sm text-muted-foreground">
              {loading ? "Loading sarees…" : `${filtered.length} sarees`}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full lg:hidden">
                    <SlidersHorizontal className="mr-2 h-3.5 w-3.5" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[19rem] overflow-y-auto">
                  <SheetTitle className="px-5 pt-5 font-serif text-xl">Refine</SheetTitle>
                  <div className="p-5">
                    <FilterPanel
                      selected={selected}
                      toggle={toggle}
                      price={price}
                      setPrice={setPrice}
                      inStock={inStock}
                      setInStock={setInStock}
                      clear={clear}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44 rounded-full" aria-label="Sort by">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sorts.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeChips.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeChips.map((c) => (
                <button
                  key={`${c.k}-${c.v}`}
                  type="button"
                  onClick={() => toggle(c.k, c.v)}
                  className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs"
                >
                  {c.v} <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          ) : null}

          {loading ? (
            <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: pageSize }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length ? (
            <>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuick} />
                ))}
              </div>
              {visible < filtered.length ? (
                <div className="mt-14 flex flex-col items-center gap-3">
                  <Button variant="outline" className="rounded-full px-8" onClick={() => setVisible((v) => v + pageSize)}>
                    Load more
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Showing {Math.min(visible, filtered.length)} of {filtered.length}
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl">No sarees match these filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try widening your price range or clearing a filter.</p>
              <Button variant="outline" className="mt-6 rounded-full" onClick={clear}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <QuickView product={quick} onOpenChange={(v) => !v && setQuick(null)} />
    </div>
  );
}