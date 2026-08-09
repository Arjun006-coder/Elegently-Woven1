import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/account/refunds")({
  component: AccountRefunds,
});

function AccountRefunds() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">Refund Status</h1>
        <p className="text-muted-foreground mt-2">Track store credits and bank refunds.</p>
      </div>

      <div className="bg-card border border-border p-12 rounded-xl text-center shadow-sm">
        <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">No pending refunds</h3>
        <p className="text-muted-foreground">Approved returns are processed to your original payment method within 5–7 working days.</p>
      </div>
    </div>
  );
}
