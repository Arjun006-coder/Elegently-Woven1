import { supabase } from "../supabase";

export async function getLiveProducts(limit = 10, categorySlug?: string) {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching live products:", error);
    return [];
  }

  return data.map((p: any) => {
    let imgs: string[] = [];
    if (Array.isArray(p.images)) {
      imgs = p.images.filter(Boolean);
    } else if (typeof p.images === 'string' && p.images.trim()) {
      try {
        const cleaned = p.images.replace(/^\{|\}$/g, '').replace(/^\[|\]$/g, '');
        imgs = cleaned.split(',').map((s: string) => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
      } catch {
        imgs = [p.images];
      }
    }
    if (imgs.length === 0) {
      imgs = ["https://images.unsplash.com/photo-1610189014163-54942d512a81?w=800&q=80"];
    }

    const priceNum = Number(p.price) || 9999;
    const mrpNum = Number(p.mrp) || Number(p.original_price) || (priceNum * 1.2);

    return {
      id: p.id,
      name: p.name,
      slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: priceNum,
      mrp: mrpNum,
      originalPrice: mrpNum,
      isNew: p.is_new ?? true,
      image: imgs[0],
      images: imgs,
      description: p.description || "Handcrafted saree from ElegantlyWoven.",
      category: p.category || "Silk Sarees",
      weave: p.weave || p.category || "Silk",
      fabric: p.fabric || "Pure Silk",
      color: p.color || "Emerald",
      rating: 4.9,
      reviews: 18,
    };
  });
}

export async function getLiveProductBySlug(idOrSlug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .maybeSingle();

  if (error || !data) return null;

  let imgs: string[] = [];
  if (Array.isArray(data.images)) {
    imgs = data.images.filter(Boolean);
  } else if (typeof data.images === 'string' && data.images.trim()) {
    try {
      const cleaned = data.images.replace(/^\{|\}$/g, '').replace(/^\[|\]$/g, '');
      imgs = cleaned.split(',').map((s: string) => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
    } catch {
      imgs = [data.images];
    }
  }
  if (imgs.length === 0) {
    imgs = ["https://images.unsplash.com/photo-1610189014163-54942d512a81?w=800&q=80"];
  }

  const priceNum = Number(data.price) || 9999;
  const mrpNum = Number(data.mrp) || Number(data.original_price) || Math.round(priceNum * 1.25);

  return {
    id: data.id,
    name: data.name,
    slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    price: priceNum,
    mrp: mrpNum,
    originalPrice: mrpNum,
    isNew: data.is_new ?? true,
    image: imgs[0],
    images: imgs,
    description: data.description || "Handcrafted authentic saree from ElegantlyWoven atelier.",
    category: data.category || "Silk Sarees",
    weave: data.category || data.weave || "Handloom Silk",
    fabric: data.fabric || "Pure Silk",
    pattern: data.pattern || "Zari Jaal Motif",
    border: data.border || "Classic Temple Zari Border",
    color: data.color || "Emerald Green",
    occasion: data.occasion || "Wedding / Festival",
    length: "6.3 meters (with blouse piece)",
    blouse: true,
    size: data.size || "Free Size",
    stock: data.stock ?? 10,
    rating: 4.9,
    reviews: 24,
  };
}
