import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/shipping-policy")({
  component: ShippingPolicyPage,
  head: () => ({ meta: [{ title: "Shipping Policy — ElegantlyWoven" }] }),
});

function ShippingPolicyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <h1 className="font-serif text-3xl font-light sm:text-4xl">Shipping Policy</h1>
        <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>We offer free insured domestic shipping on all orders over ₹2,999 within India.</p>
          <h2 className="font-serif text-xl text-foreground mt-6">Domestic Dispatch Times</h2>
          <p>Standard orders ship within 24 hours. Orders requiring custom blouse stitching or fall-pico attachment dispatch within 48–72 hours.</p>
          <h2 className="font-serif text-xl text-foreground mt-6">International Deliveries</h2>
          <p>International shipments take 4–8 business days via DHL/FedEx Express.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
