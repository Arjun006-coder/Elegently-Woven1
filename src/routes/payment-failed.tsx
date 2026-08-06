import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle, RefreshCcw, Headphones } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/payment-failed")({
  component: PaymentFailed,
  head: () => ({
    meta: [
      { title: "Payment Failed — ElegantlyWoven" },
      { name: "description", content: "Your payment could not be completed. Retry with another method or contact support." },
      { property: "og:title", content: "Payment Failed — ElegantlyWoven" },
      { property: "og:description", content: "Retry your payment or reach our support team." },
      { property: "og:url", content: "/payment-failed" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/payment-failed" }],
  }),
});

function PaymentFailed() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-destructive/10 text-destructive">
          <XCircle className="h-9 w-9" />
        </span>
        <h1 className="mt-8 text-3xl font-light sm:text-4xl">Payment didn't go through</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          No money has left your account. Your bag is still saved — retry with UPI or a card, or pay cash on delivery.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full tracking-[0.16em] uppercase">
            <Link to="/payment">
              <RefreshCcw className="mr-2 h-4 w-4" /> Retry payment
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/cart">Back to bag</Link>
          </Button>
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Headphones className="h-3.5 w-3.5 text-gold" /> Stuck? Call +91 98450 22110, 10 AM – 8 PM IST.
        </p>
      </div>
    </SiteLayout>
  );
}
