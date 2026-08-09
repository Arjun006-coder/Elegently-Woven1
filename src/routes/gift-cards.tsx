import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/shop/Bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Gift, Sparkles, Check } from "lucide-react";
import { inr } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/gift-cards")({
  component: GiftCardsPage,
  head: () => ({
    meta: [
      { title: "ElegantlyWoven E-Gift Cards" },
      { name: "description", content: "Gift six yards of timeless elegance with ElegantlyWoven luxury handloom gift vouchers." },
    ],
  }),
});

const amounts = [5000, 10000, 25000, 50000];

function GiftCardsPage() {
  const [selectedAmt, setSelectedAmt] = useState(amounts[1]!);
  const [recipientEmail, setRecipientEmail] = useState("");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="The Gift of Choice"
        title="ElegantlyWoven E-Gift Cards"
        description="Delight someone special with a luxury gift card valid across all handloom sarees, custom blouses, and accessories."
      />

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="rounded-3xl border border-border/70 p-8 bg-card shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <Gift className="h-6 w-6 text-gold" />
            <h2 className="font-serif text-2xl font-light">Select Voucher Value</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setSelectedAmt(amt)}
                className={`rounded-2xl border p-4 text-center transition-all ${
                  selectedAmt === amt
                    ? "border-gold bg-accent/40 font-semibold"
                    : "border-border hover:border-gold"
                }`}
              >
                <p className="text-xl font-serif">{inr(amt)}</p>
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Gift Card Added to Bag!", {
                description: `E-Gift Card worth ${inr(selectedAmt)} ready for checkout.`,
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="remail">Recipient Email *</Label>
              <Input
                id="remail"
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gmsg">Personal Message</Label>
              <Textarea id="gmsg" rows={3} placeholder="Write a warm note to accompany the gift card…" className="mt-1" />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full mt-4">
              Purchase Gift Card · {inr(selectedAmt)}
            </Button>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}
