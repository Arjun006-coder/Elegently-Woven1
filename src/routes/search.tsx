import { useMemo, useState } from "react";
import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, SearchX } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { PageHero, EmptyState } from "@/components/shop/Bits";
import { products, type Product } from "@/lib/data";
import { useShop } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || "",
    };
  },
  component: SearchPage,
  head: ({ search }) => ({
    meta: [
      { title: `Search results for "${search.q || 'Sarees'}" — ElegantlyWoven` },
      { name: "description", content: "Search through our handcrafted collection of Banarasi, Kanjivaram, and silk sarees." },
    ],
  }),
});

function SearchPage() {
  const { q: initialQ } = useSearch({ from: "/search" });
  const [query, setQuery] = useState(initialQ);
  const { liveProducts } = useShop();

  const allItems = useMemo(() => {
    return liveProducts && liveProducts.length > 0 ? liveProducts : products;
  }, [liveProducts]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return allItems;
    const term = query.toLowerCase().trim();
    return allItems.filter((p) => {
      const combined = [p.name, p.weave, p.fabric, p.occasion, p.color, p.category, p.description]
        .join(" ")
        .toLowerCase();
      return combined.includes(term);
    });
  }, [query, allItems]);

  return (
    <SiteLayout>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-xs text-muted-foreground sm:px-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Search</span>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">Handloom Search</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Search Collection</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex w-full max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-soft"
          >
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Kanjivaram, Banarasi, silk, emerald…"
              className="w-full bg-transparent text-sm outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{searchResults.length}</span> results {query ? `for "${query}"` : ""}
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <SearchX className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-xl font-serif font-light mb-2">No sarees found matching "{query}"</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Try searching for broader terms like "silk", "cotton", "bridal", "pink", or browse our collections.
              </p>
              <Button asChild rounded-full variant="outline">
                <Link to="/collections">Browse All Collections</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
