import { supabase } from "../supabase";

export async function getLiveProducts(limit = 10, categorySlug?: string) {
  let query = supabase
    .from("products")
    .select(`
      id, name, slug, description, price, original_price, is_new, status, images
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);
    
  if (categorySlug) {
    // Basic category filter if we added categories to products. 
    // Assuming simple mapping for now.
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching live products:", error);
    return [];
  }

  // Map to the frontend Product type
  return data.map((p: any) => {
    let primaryImage = "https://images.unsplash.com/photo-1610189014163-54942d512a81?w=800&q=80";
    if (p.images && Array.isArray(p.images) && p.images.length > 0) {
      primaryImage = p.images[0];
    } else if (typeof p.images === 'string') {
      primaryImage = p.images;
    }
    
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      originalPrice: p.original_price,
      isNew: p.is_new,
      image: primaryImage,
      description: p.description,
    };
  });
}

export async function getLiveProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  let primaryImage = "https://images.unsplash.com/photo-1610189014163-54942d512a81?w=800&q=80";
  let imagesArray = [];
  
  if (data.images && Array.isArray(data.images)) {
    imagesArray = data.images;
    primaryImage = data.images[0] || primaryImage;
  } else if (typeof data.images === 'string') {
    imagesArray = [data.images];
    primaryImage = data.images;
  }

  return {
    ...data,
    image: primaryImage,
    images: imagesArray,
  };
}
