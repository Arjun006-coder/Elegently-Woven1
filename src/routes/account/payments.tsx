import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Plus, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/account/payments")({
  component: AccountPayments,
});

function AccountPayments() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">Saved Payment Methods</h1>
        <p className="text-muted-foreground mt-2">Manage your saved cards and UPI IDs for faster checkout.</p>
      </div>

      <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-gold" />
            <h3 className="font-semibold text-lg">Saved Cards & UPI</h3>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Plus size={16} /> Add Method
          </Button>
        </div>

        <p className="text-muted-foreground text-sm py-4">No saved payment methods. Payment details are tokenized during checkout for security.</p>
      </div>

      <div className="rounded-xl bg-secondary/50 p-4 flex items-center gap-3 text-xs text-muted-foreground">
        <ShieldCheck className="h-5 w-5 text-jade shrink-0" />
        <span>ElegantlyWoven does not store CVV or full card numbers. All payment data is handled by PCI-DSS Level 1 certified partners.</span>
      </div>
    </div>
  );
}
