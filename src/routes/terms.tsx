import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({ meta: [{ title: "Terms of Use — ElegantlyWoven" }] }),
});

function TermsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <h1 className="font-serif text-3xl font-light sm:text-4xl">Terms & Conditions</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>Welcome to ElegantlyWoven. By browsing our website or purchasing products, you agree to comply with and be bound by the following terms of use.</p>

          <h2 className="font-serif text-xl text-foreground mt-6">1. Product Authenticity</h2>
          <p>Each saree is handcrafted by skilled weavers. Minor variations in weave, texture, or color are natural characteristics of authentic handloom textiles.</p>

          <h2 className="font-serif text-xl text-foreground mt-6">2. Pricing & Orders</h2>
          <p>Prices are displayed in Indian Rupees (INR) inclusive of GST. We reserve the right to revise product prices or cancel orders in case of typographical errors.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
