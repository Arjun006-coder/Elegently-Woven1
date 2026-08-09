import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/cancellation-policy")({
  component: CancellationPolicyPage,
  head: () => ({ meta: [{ title: "Cancellation & Return Policy — ElegantlyWoven" }] }),
});

function CancellationPolicyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <h1 className="font-serif text-3xl font-light sm:text-4xl">Cancellation & Return Policy</h1>
        <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>You can cancel an order within 4 hours of placement for a 100% full refund before shipment processing begins.</p>
          <h2 className="font-serif text-xl text-foreground mt-6">7-Day Returns</h2>
          <p>Unworn sarees with original Silk Mark tags intact can be returned within 7 days of delivery for store credit or refund.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
