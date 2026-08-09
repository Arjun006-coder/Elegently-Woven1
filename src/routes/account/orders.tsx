import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, Loader2, Printer, MessageSquare, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { supabase } from "../../lib/supabase";
import { inr } from "../../lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export const Route = createFileRoute("/account/orders")({
  component: AccountOrders,
});

function AccountOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (user) {
        try {
          const { data: ordersData } = await supabase
            .from("orders")
            .select("*")
            .or(`user_id.eq.${user.id},customer_email.eq.${user.email}`)
            .order("created_at", { ascending: false });

          if (ordersData && ordersData.length > 0) {
            setOrders(ordersData);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Error fetching user orders:", err);
        }
      }

      // Check session storage for recently placed order as fallback
      try {
        const raw = sessionStorage.getItem("ew_last_order");
        if (raw) {
          const parsed = JSON.parse(raw);
          setOrders([
            {
              id: "local-1",
              order_number: parsed.orderNumber || "EW-908123",
              status: "Processing",
              total_amount: parsed.total || 14999,
              created_at: parsed.date || new Date().toISOString(),
              payment_method: parsed.method?.toUpperCase() || "UPI",
              items: parsed.items || [],
            },
          ]);
        } else {
          setOrders([]);
        }
      } catch {
        setOrders([]);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  const generateWhatsAppLink = (ord: any) => {
    const text = `*ElegantlyWoven - Order Receipt*
--------------------------------
Order #: ${ord.order_number}
Date: ${new Date(ord.created_at).toLocaleDateString()}
Total Paid: ₹${ord.total_amount?.toLocaleString("en-IN")}
Status: ${ord.status || "Processing"}
Payment Method: ${ord.payment_method || "UPI"}

Thank you for shopping with ElegantlyWoven!`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">My Orders</h1>
        <p className="text-muted-foreground mt-2">View order status, download invoices, and track delivery.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-card border border-border p-12 rounded-xl text-center shadow-sm">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-6">Looks like you haven't made any purchases yet.</p>
          <Button asChild variant="outline">
            <Link to="/collections">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="bg-muted/30 px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm font-medium">Order #{order.order_number}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Placed on {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                    {order.status || "Processing"}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedOrder(order);
                      setInvoiceOpen(true);
                    }}
                    className="h-8"
                  >
                    <Printer size={13} className="mr-1" /> Invoice
                  </Button>
                  <Button size="sm" variant="default" asChild className="h-8">
                    <Link to="/track-order">Track Order</Link>
                  </Button>
                </div>
              </div>

              <div className="p-6 divide-y divide-border">
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item: any, idx: number) => {
                    const prodName = item.name || "Handcrafted Saree";
                    const prodImg = item.image || "https://images.unsplash.com/photo-1610189014163-54942d512a81?w=200&q=80";
                    const price = item.price || order.total_amount;
                    return (
                      <div key={idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                        <div className="h-16 w-14 rounded-md overflow-hidden bg-muted shrink-0">
                          <img src={prodImg} alt={prodName} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-medium truncate">{prodName}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity || item.qty || 1}</p>
                          <p className="text-sm font-medium mt-1">{inr(price)}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-between items-center text-sm py-2">
                    <span>Order Total ({order.payment_method || "UPI"})</span>
                    <span className="font-semibold text-base font-serif">{inr(order.total_amount)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customer Invoice Modal */}
      <Dialog open={invoiceOpen} onOpenChange={setInvoiceOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center pr-6">
              <span>Tax Invoice</span>
              <Button size="sm" onClick={() => window.print()} className="flex items-center gap-1.5">
                <Printer size={14} /> Print
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 pt-4 text-foreground">
              <div className="flex justify-between items-start border-b border-border pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary">ElegantlyWoven</h2>
                  <p className="text-xs text-muted-foreground">Luxury Handloom Atelier</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-primary">#{selectedOrder.order_number}</p>
                  <p className="text-xs text-muted-foreground">Date: {new Date(selectedOrder.created_at).toLocaleDateString("en-IN")}</p>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="border rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-muted text-muted-foreground font-medium border-b">
                    <tr>
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((it: any, i: number) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-2.5 font-medium">{it.name || "Handcrafted Saree"}</td>
                          <td className="p-2.5 text-center">{it.quantity || it.qty || 1}</td>
                          <td className="p-2.5 text-right">{inr(it.price || selectedOrder.total_amount)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-2.5 font-medium">Handcrafted Saree Order</td>
                        <td className="p-2.5 text-center">1</td>
                        <td className="p-2.5 text-right">{inr(selectedOrder.total_amount)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end text-xs pt-1">
                <div className="w-56 space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span>{inr(selectedOrder.subtotal || selectedOrder.total_amount * 0.95)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (5%):</span>
                    <span>{inr(selectedOrder.tax_amount || selectedOrder.total_amount * 0.05)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm border-t border-border pt-2 text-foreground">
                    <span>Total Paid:</span>
                    <span className="font-serif">{inr(selectedOrder.total_amount)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 text-xs text-center">
                <a
                  href={generateWhatsAppLink(selectedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-medium hover:underline inline-flex items-center gap-1"
                >
                  <MessageSquare size={13} /> Share Receipt via WhatsApp
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
