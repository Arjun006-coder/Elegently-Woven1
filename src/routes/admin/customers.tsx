import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { inr } from "../../lib/data";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Loader2, Search, ShieldCheck, UserCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomersPage,
});

function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);

    const { data: profileData, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profileErr) {
      console.error("Error fetching profiles:", profileErr);
      toast.error("Failed to load customers");
      setLoading(false);
      return;
    }

    const { data: orderData } = await supabase
      .from("orders")
      .select("user_id, total_amount");

    const userOrdersMap: Record<string, { count: number; spend: number }> = {};
    (orderData || []).forEach((ord) => {
      if (ord.user_id) {
        if (!userOrdersMap[ord.user_id]) {
          userOrdersMap[ord.user_id] = { count: 0, spend: 0 };
        }
        userOrdersMap[ord.user_id]!.count += 1;
        userOrdersMap[ord.user_id]!.spend += Number(ord.total_amount) || 0;
      }
    });

    const enriched = (profileData || []).map((prof) => ({
      ...prof,
      orderCount: userOrdersMap[prof.id]?.count || 0,
      totalSpend: userOrdersMap[prof.id]?.spend || 0,
    }));

    setCustomers(enriched);
    setLoading(false);
  }

  async function toggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === "admin" ? "customer" : "admin";
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      toast.error("Failed to update role: " + error.message);
    } else {
      toast.success(`Role updated to ${newRole}`);
      setCustomers(customers.map((c) => (c.id === userId ? { ...c, role: newRole } : c)));
    }
  }

  const filtered = customers.filter(
    (c) =>
      (c.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif">Customer Directory</h1>
          <p className="text-muted-foreground mt-1">Manage registered users, view order stats, and set admin privileges.</p>
        </div>
        <Button variant="outline" onClick={fetchCustomers} className="flex items-center gap-2 self-start">
          <RefreshCw size={16} /> Refresh
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customer by name or email..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Orders Placed</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Admin Role Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((cust) => (
                <TableRow key={cust.id}>
                  <TableCell>
                    <p className="font-semibold text-sm">{cust.full_name || "Customer"}</p>
                    <p className="text-xs text-muted-foreground">{cust.email}</p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        cust.role === "admin" || cust.role === "super_admin"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {cust.role || "customer"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-sm">{cust.orderCount} orders</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-serif font-semibold text-sm">{inr(cust.totalSpend)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {new Date(cust.created_at || Date.now()).toLocaleDateString("en-IN")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant={cust.role === "admin" ? "outline" : "default"}
                      onClick={() => toggleRole(cust.id, cust.role || "customer")}
                      className="h-8"
                    >
                      {cust.role === "admin" ? (
                        <>
                          <UserCheck size={14} className="mr-1" /> Remove Admin
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={14} className="mr-1" /> Make Admin
                        </>
                      )}
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
