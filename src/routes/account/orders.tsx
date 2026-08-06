import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/account/orders")({
  component: AccountOrders,
});

function AccountOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">My Orders</h1>
        <p className="text-muted-foreground mt-2">View and track your recent purchases.</p>
      </div>
      
      <div className="bg-card border border-border p-12 rounded-xl text-center shadow-sm">
        <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">No orders found</h3>
        <p className="text-muted-foreground mb-6">Looks like you haven't made any purchases yet.</p>
        <Button asChild variant="outline">
          <Link to="/collections">Start Shopping</Link>
        </Button>
      </div>

      {/* Example Order (Commented out until we have real order data)
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="bg-muted/30 px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm font-medium">Order #EW-100482</p>
              <p className="text-xs text-muted-foreground mt-0.5">Placed on Aug 02, 2026</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                Processing
              </span>
              <Button size="sm" variant="outline" className="h-8 w-full sm:w-auto">
                Track Order
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1610189014163-54942d512a81?w=200&q=80" alt="Product" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium truncate">Kanjivaram Silk Saree</h4>
                <p className="text-sm text-muted-foreground mt-1">Qty: 1</p>
                <p className="text-sm font-medium mt-2">₹12,499</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
