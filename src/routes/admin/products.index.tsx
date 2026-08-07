import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Loader2, Trash2, Eye, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products/")({
  component: AdminProducts,
});

function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  async function deleteProduct(id: string) {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete product");
    } else {
      toast.success("Product deleted successfully");
      fetchProducts();
    }
  }

  async function updateStock(id: string, currentStock: number, change: number) {
    const newStock = Math.max(0, currentStock + change);
    
    // Optimistic update
    setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
    
    const { error } = await supabase.from("products").update({ stock: newStock }).eq("id", id);
    if (error) {
      toast.error("Failed to update stock");
      fetchProducts(); // Revert on failure
    }
  }

  const totalViews = products.reduce((sum, p) => sum + (p.views_count || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif">Inventory & Analytics</h1>
          <p className="text-muted-foreground mt-1">Manage stock quantities and track product views.</p>
        </div>
        <Link to="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border p-6 rounded-xl shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Products</p>
          <p className="text-3xl font-serif mt-2">{products.length}</p>
        </div>
        <div className="bg-card border p-6 rounded-xl shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Low Stock Alerts</p>
          <p className="text-3xl font-serif mt-2 text-red-500">{products.filter(p => p.stock < 5).length}</p>
        </div>
        <div className="bg-card border p-6 rounded-xl shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Product Views</p>
          <div className="flex items-center gap-3 mt-2">
            <Eye className="text-blue-500 h-8 w-8" />
            <p className="text-3xl font-serif">{totalViews}</p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Stock Qty</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No products found. Add your first product!
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category || 'Uncategorized'} · {product.color || 'No color'} · ₹{product.price?.toFixed(2)}</p>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${(product.status === 'published' || product.status === 'active') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {product.status === 'active' ? 'Active' : (product.status || 'Draft')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye size={14} /> {product.views_count || 0}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateStock(product.id, product.stock || 0, -1)}>
                        <Minus size={12} />
                      </Button>
                      <span className={`w-6 text-center font-medium ${product.stock < 5 ? 'text-red-500' : ''}`}>{product.stock || 0}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateStock(product.id, product.stock || 0, 1)}>
                        <Plus size={12} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 size={14} className="mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
