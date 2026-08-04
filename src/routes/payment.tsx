import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Smartphone, Landmark, Wallet, Banknote, ShieldCheck, Lock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { inr } from "@/lib/data";
import { useShop } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/payment")({
  component: PaymentPage,
  head: () => ({
    meta: [
      { title: "Payment — Meera Silks" },
      { name: "description", content: "Pay securely by UPI, card, netbanking, wallet or cash on delivery." },
      { property: "og:title", content: "Payment — Meera Silks" },
      { property: "og:description", content: "Secure payment options for your saree order." },
      { property: "og:url", content: "/payment" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/payment" }],
  }),
});

const methods = [
  { id: "upi", label: "UPI / QR", icon: Smartphone, note: "GPay, PhonePe, Paytm, BHIM" },
  { id: "card", label: "Credit / Debit card", icon: CreditCard, note: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Netbanking", icon: Landmark, note: "58 banks supported" },
  { id: "wallet", label: "Wallets & EMI", icon: Wallet, note: "No-cost EMI from 3 months" },
  { id: "cod", label: "Cash on delivery", icon: Banknote, note: "₹49 handling fee" },
];

function PaymentPage() {
  const { subtotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal > 2999 ? 0 : 149;
  const cod = method === "cod" ? 49 : 0;
  const total = subtotal + Math.round(subtotal * 0.05) + shipping + cod;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <h1 className="text-3xl font-light sm:text-4xl">Payment</h1>
        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-jade" /> 256-bit encrypted · PCI-DSS compliant gateway
        </p>

        <form
          className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]"
          onSubmit={(e) => {
            e.preventDefault();
            setProcessing(true);
            setTimeout(() => {
              if (method === "netbanking") {
                navigate({ to: "/payment-failed" });
              } else {
                clearCart();
                navigate({ to: "/order-success" });
              }
            }, 1400);
          }}
        >
          <div>
            <RadioGroup value={method} onValueChange={setMethod} className="space-y-3">
              {methods.map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-sm transition-colors",
                    method === m.id ? "border-gold bg-accent/40" : "border-border",
                  )}
                >
                  <RadioGroupItem value={m.id} />
                  <m.icon className="h-4 w-4 text-gold" />
                  <span className="min-w-0">
                    <span className="block">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">{m.note}</span>
                  </span>
                </label>
              ))}
            </RadioGroup>

            <div className="mt-6 rounded-2xl bg-secondary/50 p-6">
              {method === "upi" ? (
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <Label htmlFor="vpa">UPI ID</Label>
                    <Input id="vpa" placeholder="name@bank" className="mt-2" />
                  </div>
                  <div className="grid h-24 w-24 place-items-center rounded-lg border border-dashed border-border text-[10px] text-muted-foreground">
                    Scan QR
                  </div>
                </div>
              ) : null}
              {method === "card" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="cnum">Card number</Label>
                    <Input id="cnum" inputMode="numeric" placeholder="0000 0000 0000 0000" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="exp">Expiry</Label>
                    <Input id="exp" placeholder="MM / YY" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="password" maxLength={4} className="mt-2" />
                  </div>
                </div>
              ) : null}
              {method === "netbanking" ? (
                <p className="text-sm text-muted-foreground">You will be redirected to your bank's secure page.</p>
              ) : null}
              {method === "wallet" ? (
                <p className="text-sm text-muted-foreground">
                  EMI from {inr(Math.round(total / 6))}/month for 6 months, interest borne by us.
                </p>
              ) : null}
              {method === "cod" ? (
                <p className="text-sm text-muted-foreground">
                  Pay in cash or by UPI at your doorstep. Available on orders below ₹40,000.
                </p>
              ) : null}
            </div>
          </div>

          <aside>
            <div className="rounded-2xl border border-border/70 p-6">
              <p className="eyebrow">Amount payable</p>
              <p className="mt-4 font-serif text-3xl">{inr(total)}</p>
              <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                <li>Subtotal {inr(subtotal)}</li>
                <li>GST {inr(Math.round(subtotal * 0.05))}</li>
                <li>Shipping {shipping ? inr(shipping) : "Free"}</li>
                {cod ? <li>COD handling {inr(cod)}</li> : null}
              </ul>
              <Button type="submit" size="lg" disabled={processing} className="mt-6 w-full rounded-full tracking-[0.16em] uppercase">
                {processing ? "Processing…" : `Pay ${inr(total)}`}
              </Button>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Money-back guarantee on damaged parcels
              </p>
              <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
                <Link to="/checkout">Back to address</Link>
              </Button>
            </div>
          </aside>
        </form>
      </div>
    </SiteLayout>
  );
}