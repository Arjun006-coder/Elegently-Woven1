import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { IndianRupee, Package, ShoppingCart, Users, AlertTriangle, ArrowUpRight, Percent, Building2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { inr } from "../../lib/data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    platformCommission: 0,
    netBusinessPayout: 0,
    totalOrders: 0,
    activeProducts: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);

      // 1. Fetch Orders
      const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      // 2. Fetch Products
      const { data: products } = await supabase
        .from("products")
        .select("*");

      // 3. Fetch Customers
      const { data: customers } = await supabase
        .from("profiles")
        .select("id");

      const validOrders = orders || [];
      const revenue = validOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
      const commission = validOrders.reduce((sum, o) => {
        const comm = Number(o.platform_commission);
        return sum + (isNaN(comm) || comm === 0 ? (Number(o.total_amount) || 0) * 0.01 : comm);
      }, 0);
      const netPayout = Math.max(0, revenue - commission);

      const activeProds = (products || []).filter((p) => p.status === "published" || p.status === "active" || !p.status);
      const lowStock = (products || []).filter((p) => (p.stock || 0) < 5);

      setStats({
        totalRevenue: revenue,
        platformCommission: commission,
        netBusinessPayout: netPayout,
        totalOrders: validOrders.length,
        activeProducts: activeProds.length,
        totalCustomers: customers ? customers.length : 0,
      });

      setRecentOrders(validOrders.slice(0, 5));
      setLowStockProducts(lowStock.slice(0, 5));
      setLoading(false);
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time overview of sales, orders, and financial payouts.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <ShoppingCart size={16} /> Manage Orders
          </Link>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
          >
            <Package size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* Main KPI Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-gold/30 bg-gradient-to-br from-card to-accent/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gross Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-bold text-foreground">{inr(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total sales from confirmed orders</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-50/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Business Payout (99%)</CardTitle>
            <Building2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-bold text-emerald-600">{inr(stats.netBusinessPayout)}</div>
            <p className="text-xs text-muted-foreground mt-1">Net revenue transferred to store owner</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-50/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Commission (1%)</CardTitle>
            <Percent className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-bold text-amber-600">{inr(stats.platformCommission)}</div>
            <p className="text-xs text-muted-foreground mt-1">System infrastructure fee</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <Link to="/admin/orders" className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1">
              View all orders <ArrowUpRight size={12} />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProducts}</div>
            <Link to="/admin/products" className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1">
              Manage inventory <ArrowUpRight size={12} />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Registered Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <Link to="/admin/customers" className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1">
              Customer directory <ArrowUpRight size={12} />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/admin/orders" className="text-xs text-primary hover:underline">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-sm text-muted-foreground">Loading recent orders...</div>
            ) : recentOrders.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-12">No orders placed yet.</div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sm">#{ord.order_number}</p>
                      <p className="text-xs text-muted-foreground">
                        {ord.customer_name || ord.customer_email || "Customer"} · {new Date(ord.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-semibold text-sm">{inr(ord.total_amount)}</p>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {ord.status || "Processing"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Low Stock Alerts
            </CardTitle>
            <Link to="/admin/products" className="text-xs text-primary hover:underline">
              Manage
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-sm text-muted-foreground">Checking stock...</div>
            ) : lowStockProducts.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-12">All inventory levels are good.</div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between border-b border-border/60 pb-2.5 last:border-0 last:pb-0">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-medium text-sm truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category || "General"}</p>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      {p.stock} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
