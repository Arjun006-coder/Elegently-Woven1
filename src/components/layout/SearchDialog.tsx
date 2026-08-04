import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Mic, Clock, TrendingUp, X, SearchX } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { products, inr } from "@/lib/data";
import { toast } from "sonner";

const recent = ["Kanjivaram maroon", "cotton daily wear", "bridal under 60000"];
const trending = ["Banarasi jaal", "Tissue silk", "Organza party", "Handloom cotton", "Emerald silk"];
const quickCats = [
  { label: "Bridal", to: "/bridal" },
  { label: "Festival", to: "/festival" },
  { label: "Linen", to: "/linen" },
  { label: "Sale", to: "/sale" },
];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (q.trim().length < 2) return [];
    const t = q.toLowerCase();
    return products
      .filter((p) => [p.name, p.weave, p.fabric, p.occasion, p.color].join(" ").toLowerCase().includes(t))
      .slice(0, 6);
  }, [q]);

  const go = (term: string) => {
    onOpenChange(false);
    navigate({ to: "/search", search: { q: term } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-24 max-w-2xl translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Search sarees</DialogTitle>
        <form
          className="flex items-center gap-3 border-b border-border/70 px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) go(q.trim());
          }}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for Kanjivaram, cotton, bridal…"
            className="flex-1 bg-transparent text-sm outline-none"
            aria-label="Search sarees"
          />
          <button
            type="button"
            aria-label="Voice search"
            onClick={() => toast("Listening…", { description: "Voice search preview" })}
            className="grid h-8 w-8 place-items-center rounded-full bg-secondary"
          >
            <Mic className="h-3.5 w-3.5" />
          </button>
          {q ? (
            <button type="button" onClick={() => setQ("")} aria-label="Clear">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : null}
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {q.trim().length >= 2 ? (
            results.length ? (
              <ul className="space-y-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenChange(false);
                        navigate({ to: "/product/$id", params: { id: p.id } });
                      }}
                      className="flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors hover:bg-secondary"
                    >
                      <img src={p.images[0]} alt="" loading="lazy" className="h-16 w-13 rounded-lg object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {p.weave} · {p.occasion}
                        </span>
                      </span>
                      <span className="text-sm">{inr(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center">
                <SearchX className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-4 text-sm">No sarees matched “{q}”</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a weave (Banarasi), a colour (emerald) or an occasion (bridal).
                </p>
              </div>
            )
          ) : (
            <div className="space-y-7">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <Clock className="h-3 w-3" /> Recent searches
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => go(r)}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs transition-colors hover:bg-accent"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" /> Trending searches
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {trending.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => go(r)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-gold"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">Popular categories</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {quickCats.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => {
                        onOpenChange(false);
                        navigate({ to: c.to });
                      }}
                      className="rounded-xl bg-secondary px-3 py-3 text-xs tracking-wide uppercase transition-colors hover:bg-accent"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}