import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/products/new")({
  component: AddProduct,
});

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    status: "published",
    category: "",
    color: "",
    size: "Free Size",
    stock: "10",
    images: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let uploadedUrls: string[] = [];

    // Upload image files if any
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          alert('Failed to upload image: ' + uploadError.message);
          setLoading(false);
          return;
        }

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        if (data?.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }
      }
    }

    const { error } = await supabase.from("products").insert({
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[\s_]+/g, "-"),
      description: formData.description,
      price: parseFloat(formData.price),
      status: formData.status,
      category: formData.category,
      color: formData.color,
      size: formData.size,
      stock: parseInt(formData.stock, 10),
      images: uploadedUrls.length > 0 ? uploadedUrls : formData.images.split(",").map(url => url.trim()).filter(Boolean),
    });

    setLoading(false);

    if (error) {
      alert("Error saving product: " + error.message);
    } else {
      navigate({ to: "/admin/products" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif">Add Product</h1>
        <p className="text-muted-foreground mt-1">Create a new product listing in your store.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 md:p-8 border rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Product Name *</label>
            <input
              required
              type="text"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Kanjivaram Silk Saree"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <input
              type="text"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g. Silk, Cotton, Banarasi"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <input
              type="text"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="e.g. Emerald Green, Maroon"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Size</label>
            <input
              type="text"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              placeholder="e.g. Free Size, S, M, L"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Stock Quantity *</label>
            <input
              required
              type="number"
              min="0"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Price (₹) *</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="9999.00"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="published">Published (Active)</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Product Images (Upload)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(e) => {
                if (e.target.files) {
                  setImageFiles(Array.from(e.target.files));
                }
              }}
            />
            {imageFiles.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">{imageFiles.length} file(s) selected.</p>
            )}
            
            <p className="text-sm font-medium mt-4">OR Image URLs (comma separated)</p>
            <input
              type="text"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              disabled={imageFiles.length > 0}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">URL Slug (Optional)</label>
            <input
              type="text"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. kanjivaram-silk-saree-101"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed product information..."
            />
          </div>
        </div>

        <div className="pt-6 flex gap-4 border-t mt-6">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto px-8">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Product
          </Button>
          <Button type="button" variant="outline" className="w-full sm:w-auto px-8" onClick={() => navigate({ to: "/admin/products" })}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
