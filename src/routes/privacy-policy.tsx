import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPage,
  head: () => ({ meta: [{ title: "Privacy Policy — ElegantlyWoven" }] }),
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <h1 className="font-serif text-3xl font-light sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>At ElegantlyWoven (LumaScale LLP), we value the privacy of our patrons and visitors. This Privacy Policy details how we collect, process, and safeguard your personal information.</p>

          <h2 className="font-serif text-xl text-foreground mt-6">1. Information We Collect</h2>
          <p>We collect information you provide directly when creating an account, placing an order, or subscribing to our newsletter (e.g. name, shipping address, phone number, payment details).</p>

          <h2 className="font-serif text-xl text-foreground mt-6">2. Data Usage & Protection</h2>
          <p>Your personal data is strictly used for processing orders, managing your account, preventing fraud, and delivering tailored customer service. We do not sell or rent user data to third parties.</p>

          <h2 className="font-serif text-xl text-foreground mt-6">3. Security</h2>
          <p>All online payment transactions are processed over 256-bit SSL encrypted PCI-DSS compliant payment gateways.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
