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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Loader2, Search, Printer, Share2, MessageSquare, Mail, RefreshCw, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }

  async function handleStatusChange(orderId: string, userId: string | null, newStatus: string, orderNum: string) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update status: " + error.message);
    } else {
      toast.success(`Order #${orderNum} status updated to ${newStatus}`);
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));

      // Notify customer if user_id exists
      if (userId) {
        try {
          await supabase.from("notifications").insert({
            user_id: userId,
            title: `Order #${orderNum} Updated`,
            description: `Your order status has been updated to ${newStatus}.`,
            icon: "Truck",
          });
        } catch {}
      }
    }
  }

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      (o.order_number || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.customer_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.customer_email || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.customer_phone || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || (o.status || "Processing").toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const generateWhatsAppMessage = (order: any) => {
    const itemsList = Array.isArray(order.items)
      ? order.items.map((i: any) => `• ${i.name} (x${i.quantity || i.qty || 1}) - ₹${i.price}`).join("\n")
      : "1x Handcrafted Saree";

    const text = `*ElegantlyWoven - Order Receipt*
--------------------------------
Order #: ${order.order_number}
Date: ${new Date(order.created_at).toLocaleDateString()}
Customer: ${order.customer_name || "Valued Customer"}
Phone: ${order.customer_phone || order.phone_number || "N/A"}

*Items Ordered:*
${itemsList}

*Total Amount:* ₹${order.total_amount?.toLocaleString("en-IN")}
*Payment Method:* ${order.payment_method || "UPI"}
*Status:* ${order.status || "Processing"}

*Delivery Address:*
${typeof order.shipping_address === "object" ? order.shipping_address?.line || JSON.stringify(order.shipping_address) : order.shipping_address || "On File"}

Thank you for shopping with ElegantlyWoven!`;

    const phone = (order.customer_phone || order.phone_number || "").replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(text);
    return phone ? `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}` : `https://api.whatsapp.com/send?text=${encoded}`;
  };

  const generateEmailLink = (order: any) => {
    const subject = encodeURIComponent(`Order Receipt & Confirmation - #${order.order_number}`);
    const body = encodeURIComponent(`Dear ${order.customer_name || "Customer"},

Thank you for your order with ElegantlyWoven!

Order Number: #${order.order_number}
Total Amount: ₹${order.total_amount}
Payment Status: ${order.payment_status || "Paid"}
Order Status: ${order.status || "Processing"}

Best regards,
ElegantlyWoven Team`);

    return `mailto:${order.customer_email || ""}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif">Customer Orders</h1>
          <p className="text-muted-foreground mt-1">Track, manage, and print invoices for all customer purchases.</p>
        </div>
        <Button variant="outline" onClick={fetchOrders} className="flex items-center gap-2 self-start">
          <RefreshCw size={16} /> Refresh Orders
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order #, name, phone, or email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["all", "processing", "shipped", "delivered", "cancelled"].map((st) => (
            <Button
              key={st}
              variant={statusFilter === st ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(st)}
              className="capitalize text-xs"
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order # / Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total & Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions / Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((ord) => (
                <TableRow key={ord.id}>
                  <TableCell>
                    <p className="font-semibold text-sm">#{ord.order_number}</p>
                    <p className="text-xs text-muted-foreground">{new Date(ord.created_at).toLocaleDateString("en-IN")}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{ord.customer_name || "Guest Customer"}</p>
                    <p className="text-xs text-muted-foreground">{ord.customer_phone || ord.phone_number || "No phone"}</p>
                    {ord.customer_email && <p className="text-[11px] text-muted-foreground">{ord.customer_email}</p>}
                  </TableCell>
                  <TableCell>
                    <p className="font-serif font-semibold text-sm">{inr(ord.total_amount)}</p>
                    <p className="text-xs text-muted-foreground">{ord.payment_method || "UPI"} · {ord.payment_status || "Paid"}</p>
                  </TableCell>
                  <TableCell>
                    <select
                      className="text-xs font-semibold px-2 py-1 rounded-md border border-input bg-background"
                      value={ord.status || "Processing"}
                      onChange={(e) => handleStatusChange(ord.id, ord.user_id, e.target.value, ord.order_number)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(ord);
                        setInvoiceModalOpen(true);
                      }}
                      className="h-8"
                    >
                      <Printer size={14} className="mr-1" /> Invoice
                    </Button>
                    <a
                      href={generateWhatsAppMessage(ord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-8 px-2.5 text-xs font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                      title="Share via WhatsApp"
                    >
                      <MessageSquare size={13} className="mr-1" /> WhatsApp
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Printable Invoice Modal */}
      <Dialog open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center pr-6">
              <span>Order Invoice</span>
              <Button
                size="sm"
                onClick={() => window.print()}
                className="flex items-center gap-1.5"
              >
                <Printer size={14} /> Print Invoice
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 pt-4 text-foreground id-printable-invoice">
              <div className="flex justify-between items-start border-b border-border pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary">ElegantlyWoven</h2>
                  <p className="text-xs text-muted-foreground">Luxury Handloom Atelier · LumaScale</p>
                  <p className="text-xs text-muted-foreground">GSTIN: 29AAAAA0000A1Z5</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">INVOICE</p>
                  <p className="text-xs font-semibold text-primary">#{selectedOrder.order_number}</p>
                  <p className="text-xs text-muted-foreground">Date: {new Date(selectedOrder.created_at).toLocaleDateString("en-IN")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-semibold text-muted-foreground uppercase tracking-wider mb-1">Customer Details</p>
                  <p className="font-medium text-sm">{selectedOrder.customer_name || "Valued Customer"}</p>
                  <p className="text-muted-foreground">{selectedOrder.customer_email || "N/A"}</p>
                  <p className="text-muted-foreground">{selectedOrder.customer_phone || selectedOrder.phone_number || "N/A"}</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground uppercase tracking-wider mb-1">Shipping Address</p>
                  <p className="text-muted-foreground">
                    {typeof selectedOrder.shipping_address === "object"
                      ? `${selectedOrder.shipping_address?.line || ""}, ${selectedOrder.shipping_address?.city || ""}, ${selectedOrder.shipping_address?.state || ""} ${selectedOrder.shipping_address?.pincode || ""}`
                      : selectedOrder.shipping_address || "Address on File"}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-muted text-muted-foreground font-medium border-b">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Price</th>
                      <th className="p-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((it: any, i: number) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-2.5 font-medium">{it.name || "Handcrafted Saree"}</td>
                          <td className="p-2.5 text-center">{it.quantity || it.qty || 1}</td>
                          <td className="p-2.5 text-right">{inr(it.price || selectedOrder.total_amount)}</td>
                          <td className="p-2.5 text-right">{inr((it.price || selectedOrder.total_amount) * (it.quantity || it.qty || 1))}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-2.5 font-medium">Handcrafted Saree Order</td>
                        <td className="p-2.5 text-center">1</td>
                        <td className="p-2.5 text-right">{inr(selectedOrder.total_amount)}</td>
                        <td className="p-2.5 text-right">{inr(selectedOrder.total_amount)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Summary Calculation */}
              <div className="flex justify-end pt-2 text-xs">
                <div className="w-60 space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span>{inr(selectedOrder.subtotal || selectedOrder.total_amount * 0.95)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (5%):</span>
                    <span>{inr(selectedOrder.tax_amount || selectedOrder.total_amount * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping:</span>
                    <span>{selectedOrder.shipping_charge ? inr(selectedOrder.shipping_charge) : "FREE"}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm border-t border-border pt-2 text-foreground">
                    <span>Total Paid:</span>
                    <span className="font-serif">{inr(selectedOrder.total_amount)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border/60 text-xs">
                <a
                  href={generateWhatsAppMessage(selectedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-medium hover:underline inline-flex items-center gap-1"
                >
                  <MessageSquare size={13} /> Share Invoice on WhatsApp
                </a>
                <a
                  href={generateEmailLink(selectedOrder)}
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  <Mail size={13} /> Email Invoice
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
