import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/account/payments")({
  component: AccountPayments,
});

function AccountPayments() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">Payment Methods</h1>
        <p className="text-muted-foreground mt-2">Manage your saved payment options.</p>
      </div>
      
      <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-medium mb-3">Secure Payments</h3>
          <p className="text-muted-foreground mb-8">
            For your security and to comply with PCI-DSS standards, ElegantlyWoven does not store your credit card details on our servers. All transactions are securely processed and tokenized by our payment gateway partners (Razorpay & Stripe).
          </p>
          
          <div className="w-full bg-muted/30 border border-border rounded-lg p-4 flex items-center gap-4 text-left">
            <CreditCard className="h-6 w-6 text-muted-foreground shrink-0" />
            <div>
              <p className="text-sm font-medium">Add payment method at checkout</p>
              <p className="text-xs text-muted-foreground mt-0.5">You can save cards securely during your next purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
