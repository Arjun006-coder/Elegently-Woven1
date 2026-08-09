import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, MapPin, Plus, Truck, Gift, LogIn } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { inr } from "@/lib/data";
import { useShop } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Secure Checkout — ElegantlyWoven" },
      { name: "description", content: "Confirm your delivery address, slot and gifting options before payment." },
      { property: "og:title", content: "Secure Checkout — ElegantlyWoven" },
      { property: "og:description", content: "Confirm delivery details for your saree order." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
});

const savedAddresses = [
  { id: "home", label: "Home", name: "Aditi Rao", line: "12, Lotus Villa, 4th Cross, Jayanagar, Bengaluru 560011", phone: "+91 98800 11223", tag: "Default" },
  { id: "office", label: "Office", name: "Aditi Rao", line: "Prestige Tech Park, Kadubeesanahalli, Bengaluru 560103", phone: "+91 98800 11223" },
];

const slots = ["Today, 6 – 9 PM (express ₹199)", "Tomorrow, 10 AM – 1 PM", "Tomorrow, 4 – 8 PM", "Any weekday, 10 AM – 8 PM"];

function Checkout() {
  const { subtotal, lines } = useShop();
  const navigate = useNavigate();
  const [address, setAddress] = useState("home");
  const [slot, setSlot] = useState(slots[1]!);
  const [guest, setGuest] = useState(false);
  const [sameBilling, setSameBilling] = useState(true);
  const [adding, setAdding] = useState(false);
  const [gifting, setGifting] = useState(false);

  const [guestName, setGuestName] = useState("Aditi Rao");
  const [guestEmail, setGuestEmail] = useState("aditi.rao@email.com");
  const [guestPhone, setGuestPhone] = useState("+91 98800 11223");

  const shipping = subtotal > 2999 ? 0 : 149;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAddressObj = savedAddresses.find((a) => a.id === address) || savedAddresses[0];
    const checkoutPayload = {
      name: guest ? guestName : selectedAddressObj?.name || "Aditi Rao",
      email: guest ? guestEmail : "aditi.rao@email.com",
      phone: guest ? guestPhone : selectedAddressObj?.phone || "+91 98800 11223",
      address: {
        line: selectedAddressObj?.line || "12, Lotus Villa, Jayanagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560011",
      },
      slot,
    };
    sessionStorage.setItem("ew_checkout_data", JSON.stringify(checkoutPayload));
    navigate({ to: "/payment" });
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <h1 className="text-3xl font-light sm:text-4xl">Checkout</h1>

        <ol className="mt-6 flex flex-wrap gap-4 text-xs tracking-[0.18em] uppercase">
          {["Bag", "Address", "Payment"].map((s, i) => (
            <li key={s} className={cn("flex items-center gap-2", i <= 1 ? "text-foreground" : "text-muted-foreground")}>
              <span className={cn("grid h-6 w-6 place-items-center rounded-full text-[10px]", i <= 1 ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                {i < 1 ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>

        <form className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]" onSubmit={handleCheckoutSubmit}>
          <div className="space-y-8">
            <section className="rounded-2xl border border-border/70 p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="eyebrow">Account</p>
                <button type="button" onClick={() => setGuest((g) => !g)} className="text-xs text-primary hover:underline">
                  {guest ? "Sign in instead" : "Continue as guest"}
                </button>
              </div>
              {guest ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="gname">Full name *</Label>
                    <Input id="gname" required value={guestName} onChange={(e) => setGuestName(e.target.value)} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="gmail">Email *</Label>
                    <Input id="gmail" type="email" required value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="mt-2" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="gphone">Phone number *</Label>
                    <Input id="gphone" type="tel" required value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder="Required for delivery updates" className="mt-2" />
                  </div>
                </div>
              ) : (
                <p className="mt-4 flex items-center gap-2 text-sm">
                  <LogIn className="h-4 w-4 text-gold" /> Signed in as aditi.rao@email.com
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-border/70 p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="eyebrow">Shipping address</p>
                <button type="button" onClick={() => setAdding((a) => !a)} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                  <Plus className="h-3 w-3" /> Add new
                </button>
              </div>

              <RadioGroup value={address} onValueChange={setAddress} className="mt-5 space-y-3">
                {savedAddresses.map((a) => (
                  <label
                    key={a.id}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-xl border p-4 text-sm transition-colors",
                      address === a.id ? "border-gold bg-accent/40" : "border-border",
                    )}
                  >
                    <RadioGroupItem value={a.id} className="mt-1" />
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-gold" />
                        {a.name} · {a.label}
                        {a.tag ? <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase">{a.tag}</span> : null}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">{a.line}</span>
                      <span className="block text-xs text-muted-foreground">{a.phone}</span>
                      <span className="mt-2 flex gap-4 text-xs text-primary">
                        <Link to="/account/addresses">Edit</Link>
                      </span>
                    </span>
                  </label>
                ))}
              </RadioGroup>

              {adding ? (
                <div className="mt-5 grid gap-4 rounded-xl bg-secondary/50 p-5 sm:grid-cols-2">
                  <div className="sm:col-span-2 grid h-28 place-items-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                    Map location picker placeholder
                  </div>
                  <div>
                    <Label htmlFor="fn">Full name *</Label>
                    <Input id="fn" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="ph">Phone number *</Label>
                    <Input id="ph" type="tel" required className="mt-2" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="st">Street address *</Label>
                    <Input id="st" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="pc">Pincode *</Label>
                    <Input id="pc" required maxLength={6} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="ct">City *</Label>
                    <Input id="ct" required className="mt-2" />
                  </div>
                  <Button type="button" className="rounded-full sm:col-span-2" onClick={() => setAdding(false)}>
                    Save address
                  </Button>
                </div>
              ) : null}

              <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm">
                <Checkbox checked={sameBilling} onCheckedChange={(v) => setSameBilling(!!v)} />
                Billing address is the same as shipping
              </label>
              {!sameBilling ? (
                <div className="mt-4 grid gap-4 rounded-xl bg-secondary/50 p-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="bill">Billing address</Label>
                    <Input id="bill" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="gstin">GSTIN (optional)</Label>
                    <Input id="gstin" className="mt-2" />
                  </div>
                </div>
              ) : null}
            </section>

            <section className="rounded-2xl border border-border/70 p-6">
              <p className="eyebrow">Delivery slot</p>
              <RadioGroup value={slot} onValueChange={setSlot} className="mt-5 grid gap-3 sm:grid-cols-2">
                {slots.map((s) => (
                  <label
                    key={s}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors",
                      slot === s ? "border-gold bg-accent/40" : "border-border",
                    )}
                  >
                    <RadioGroupItem value={s} />
                    <span className="flex items-center gap-2">
                      <Truck className="h-3.5 w-3.5 text-gold" /> {s}
                    </span>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-5">
                <Label htmlFor="instructions">Delivery instructions</Label>
                <Textarea id="instructions" placeholder="Leave with the security desk, call on arrival…" className="mt-2" />
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm">
                <Checkbox checked={gifting} onCheckedChange={(v) => setGifting(!!v)} />
                <span className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-gold" /> This is a gift
                </span>
              </label>
              {gifting ? <Textarea placeholder="Your gift message (up to 200 characters)" maxLength={200} className="mt-3" /> : null}
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-border/70 p-6">
              <p className="eyebrow">Order summary</p>
              <ul className="mt-5 space-y-4">
                {lines.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-3">
                    <img src={product.images[0]} alt="" loading="lazy" className="h-16 w-13 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {qty}</p>
                    </div>
                    <p className="text-sm">{inr(product.price * qty)}</p>
                  </li>
                ))}
                {!lines.length ? <li className="text-sm text-muted-foreground">Your bag is empty.</li> : null}
              </ul>
              <dl className="mt-6 space-y-3 border-t border-border/70 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{inr(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">GST (5%)</dt>
                  <dd>{inr(gst)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping ? inr(shipping) : "Free"}</dd>
                </div>
                <div className="flex justify-between border-t border-border/70 pt-4">
                  <dt>Total payable</dt>
                  <dd className="font-serif text-xl">{inr(total)}</dd>
                </div>
              </dl>
              <Button type="submit" size="lg" className="mt-6 w-full rounded-full tracking-[0.16em] uppercase">
                Continue to payment
              </Button>
              <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
                <Link to="/cart">Back to bag</Link>
              </Button>
            </div>
          </aside>
        </form>
      </div>
    </SiteLayout>
  );
}
