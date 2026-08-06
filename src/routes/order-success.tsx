import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package, Truck, Home, Download, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/shop/Bits";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/order-success")({
  component: OrderSuccess,
  head: () => ({
    meta: [
      { title: "Order Confirmed — ElegantlyWoven" },
      { name: "description", content: "Your saree order is confirmed. Track your parcel or download the invoice." },
      { property: "og:title", content: "Order Confirmed — ElegantlyWoven" },
      { property: "og:description", content: "Thank you for your order at ElegantlyWoven." },
      { property: "og:url", content: "/order-success" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/order-success" }],
  }),
});

const steps = [
  { icon: CheckCircle2, label: "Order placed", note: "Just now" },
  { icon: Package, label: "Quality check & packing", note: "Within 24 hours" },
  { icon: Truck, label: "Shipped", note: "Tomorrow" },
  { icon: Home, label: "Delivered", note: "In 3 – 4 days" },
];

function OrderSuccess() {
  const orderId = "MS-" + String(Math.floor(100000 + Math.random() * 899999));

  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-jade/10 text-jade">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-8 text-3xl font-light sm:text-4xl">Thank you — your order is confirmed</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Order <span className="text-foreground">{orderId}</span> · A confirmation has been sent to your email and WhatsApp.
        </p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.label} className="rounded-2xl border border-border/70 p-5">
              <s.icon className={i === 0 ? "h-5 w-5 text-jade" : "h-5 w-5 text-gold"} />
              <p className="mt-3 text-sm">{s.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full tracking-[0.16em] uppercase">
            <Link to="/track-order">Track order</Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full" onClick={() => toast.success("Invoice downloaded")}>
            <Download className="mr-2 h-4 w-4" /> Invoice
          </Button>
          <Button asChild variant="ghost" size="lg" className="rounded-full">
            <Link to="/collections">Continue shopping</Link>
          </Button>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <MessageCircle className="h-3.5 w-3.5 text-gold" /> Need a change? WhatsApp us within 2 hours on +91 98450 22110.
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <SectionHeading eyebrow="Styling next" title="Pair it with these" align="center" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {products.slice(6, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
