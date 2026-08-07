import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { byId, type Product } from "./data";
import { supabase } from "./supabase";

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
  liveProducts: Product[];
};

const ShopContext = createContext<ShopState | null>(null);
const KEY = "ew-shop-v1";

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Fetch live products so we can resolve byId for live items
  useEffect(() => {
    supabase.from("products").select("*").then(({ data, error }) => {
      if (error) {
        console.error("Error fetching live products in ShopProvider:", error);
        return;
      }
      if (data) {
        const formatted = data.map((d: any) => {
          let imgs: string[] = [];
          if (Array.isArray(d.images)) {
            imgs = d.images.filter(Boolean);
          } else if (typeof d.images === 'string' && d.images.trim()) {
            try {
              const cleaned = d.images.replace(/^\{|\}$/g, '').replace(/^\[|\]$/g, '');
              imgs = cleaned.split(',').map((s: string) => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
            } catch {
              imgs = [d.images];
            }
          }
          if (imgs.length === 0) {
            imgs = ["https://images.unsplash.com/photo-1610189014163-54942d512a81?w=800&q=80"];
          }

          const productPrice = Number(d.price) || 9999;
          const productMrp = Number(d.mrp) || (productPrice * 1.2);

          return {
            id: d.id,
            name: d.name,
            slug: d.slug,
            description: d.description || "Handcrafted saree from ElegantlyWoven.",
            price: productPrice,
            mrp: productMrp,
            image: imgs[0],
            images: imgs,
            isNew: d.is_new ?? true,
            status: d.status || "active",
            stock: d.stock ?? 10,
            category: d.category || "Silk Sarees",
            weave: d.weave || d.category || "Silk",
            fabric: d.fabric || "Pure Silk",
            color: d.color || "Emerald",
            rating: 4.9,
            reviews: 18,
          };
        });
        setLiveProducts(formatted);
      }
    });
  }, []);

  // 2. Auth & Cloud Sync Initialization
  useEffect(() => {
    let subscription: any;
    
    const initSync = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUserId(session.user.id);
        
        // Fetch cloud cart
        const { data: cartData } = await supabase.from("cart_items").select("product_id, quantity").eq("user_id", session.user.id);
        if (cartData) {
          setCart(cartData.map(c => ({ id: c.product_id, qty: c.quantity })));
        }
        
        // Fetch cloud wishlist
        const { data: wishData } = await supabase.from("wishlists").select("product_id").eq("user_id", session.user.id);
        if (wishData) {
          setWishlist(wishData.map(w => w.product_id));
        }
      } else {
        // Fallback to local storage if not logged in
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) {
            const s = JSON.parse(raw);
            setCart(s.cart ?? []);
            setWishlist(s.wishlist ?? []);
            setCompare(s.compare ?? []);
            setRecent(s.recent ?? []);
          }
        } catch { /* ignore */ }
      }
      setReady(true);
    };
    
    initSync();
    
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user.id !== userId) {
        initSync();
      }
    });
    
    return () => data.subscription.unsubscribe();
  }, [userId]);

  // 3. Local storage persistence (for anon users or non-synced data)
  useEffect(() => {
    if (!ready) return;
    if (!userId) {
      localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, compare, recent }));
    } else {
      // Still persist compare/recent locally as they aren't cloud synced yet
      localStorage.setItem(KEY, JSON.stringify({ cart: [], wishlist: [], compare, recent }));
    }
  }, [cart, wishlist, compare, recent, ready, userId]);

  // Resolve product either from live DB or fallback to mock data
  const getProduct = useCallback((id: string) => {
    return liveProducts.find((p) => p.id === id) || byId(id);
  }, [liveProducts]);

  const addToCart = useCallback(async (id: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((l) => l.id === id);
      return found ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...c, { id, qty }];
    });
    
    // Cloud sync
    if (userId) {
      const { data: existing } = await supabase.from("cart_items").select("quantity").eq("user_id", userId).eq("product_id", id).single();
      if (existing) {
        await supabase.from("cart_items").update({ quantity: existing.quantity + qty }).eq("user_id", userId).eq("product_id", id);
      } else {
        await supabase.from("cart_items").insert({ user_id: userId, product_id: id, quantity: qty });
      }
    }
    
    const p = getProduct(id);
    toast.success("Added to your bag", { description: p?.name });
  }, [userId, getProduct]);

  const setQty = useCallback(async (id: string, qty: number) => {
    setCart((c) => c.flatMap((l) => (l.id === id ? (qty <= 0 ? [] : [{ ...l, qty }]) : [l])));
    
    if (userId) {
      if (qty <= 0) {
        await supabase.from("cart_items").delete().eq("user_id", userId).eq("product_id", id);
      } else {
        await supabase.from("cart_items").update({ quantity: qty }).eq("user_id", userId).eq("product_id", id);
      }
    }
  }, [userId]);

  const removeFromCart = useCallback(async (id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
    if (userId) {
      await supabase.from("cart_items").delete().eq("user_id", userId).eq("product_id", id);
    }
    toast("Removed from bag");
  }, [userId]);

  const clearCart = useCallback(async () => {
    setCart([]);
    if (userId) {
      await supabase.from("cart_items").delete().eq("user_id", userId);
    }
  }, [userId]);

  const toggleWishlist = useCallback(async (id: string) => {
    setWishlist((w) => {
      const has = w.includes(id);
      
      // Async sync to cloud
      if (userId) {
        if (has) {
          supabase.from("wishlists").delete().eq("user_id", userId).eq("product_id", id).then();
        } else {
          supabase.from("wishlists").insert({ user_id: userId, product_id: id }).then();
        }
      }
      
      toast[has ? "message" : "success"](has ? "Removed from wishlist" : "Saved to wishlist");
      return has ? w.filter((x) => x !== id) : [id, ...w];
    });
  }, [userId]);

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
        const product = getProduct(l.id);
        return product ? [{ product, qty: l.qty }] : [];
      }),
    [cart, getProduct],
  );

  const value: ShopState = {
    cart, wishlist, compare, recent,
    addToCart, setQty, removeFromCart, clearCart,
    toggleWishlist, toggleCompare, markViewed,
    cartCount: cart.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.product.price * l.qty, 0),
    lines, liveProducts,
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
    const stored = localStorage.getItem("ew-theme") as "light" | "dark" | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("ew-theme", next);
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