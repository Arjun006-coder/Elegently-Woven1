import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { requireAdmin } from "../lib/auth";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Store } from "lucide-react";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    await requireAdmin();
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="group block">
            <h2 className="text-xl font-serif font-bold text-primary tracking-wide group-hover:opacity-80 transition-opacity">
              ElegantlyWoven
            </h2>
            <span className="text-xs text-muted-foreground">Admin Portal</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary mb-4 border-b border-border/50 pb-3"
          >
            <Store size={18} />
            Back to Storefront
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            activeProps={{ className: "bg-primary/10 text-primary" }}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            activeProps={{ className: "bg-primary/10 text-primary" }}
          >
            <Package size={18} />
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            activeProps={{ className: "bg-primary/10 text-primary" }}
          >
            <ShoppingCart size={18} />
            Orders
          </Link>
          <Link
            to="/admin/customers"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            activeProps={{ className: "bg-primary/10 text-primary" }}
          >
            <Users size={18} />
            Customers
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            activeProps={{ className: "bg-primary/10 text-primary" }}
          >
            <Settings size={18} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
