import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { byId, type Product } from "./data";

export type CartLine = { id: string; qty: number; blouse?: boolean; giftWrap?: boolean };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  recent: string[];
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  markViewed: (id: string) => void;
  cartCount: number;
  subtotal: number;
  lines: Array<{ product: Product; qty: number }>;
};

const ShopContext = createContext<ShopState | null>(null);
const KEY = "meera-shop-v1";

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setCart(s.cart ?? []);
        setWishlist(s.wishlist ?? []);
        setCompare(s.compare ?? []);
        setRecent(s.recent ?? []);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, compare, recent }));
  }, [cart, wishlist, compare, recent, ready]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((l) => l.id === id);
      if (found) return c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...c, { id, qty }];
    });
    toast.success("Added to your bag", { description: byId(id)?.name });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => c.flatMap((l) => (l.id === id ? (qty <= 0 ? [] : [{ ...l, qty }]) : [l])));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
    toast("Removed from bag");
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((w) => {
      const has = w.includes(id);
      toast[has ? "message" : "success"](has ? "Removed from wishlist" : "Saved to wishlist");
      return has ? w.filter((x) => x !== id) : [id, ...w];
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((c) => {
      if (c.includes(id)) return c.filter((x) => x !== id);
      if (c.length >= 3) {
        toast.error("You can compare up to 3 sarees");
        return c;
      }
      return [...c, id];
    });
  }, []);

  const markViewed = useCallback((id: string) => {
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const lines = useMemo(
    () =>
      cart.flatMap((l) => {
        const product = byId(l.id);
        return product ? [{ product, qty: l.qty }] : [];
      }),
    [cart],
  );

  const value: ShopState = {
    cart,
    wishlist,
    compare,
    recent,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    toggleCompare,
    markViewed,
    cartCount: cart.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.product.price * l.qty, 0),
    lines,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("meera-theme") as "light" | "dark" | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("meera-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return { theme, toggle };
}

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}