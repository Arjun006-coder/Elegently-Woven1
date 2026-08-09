import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/shop/Bits";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faqs")({
  component: FaqsPage,
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — ElegantlyWoven" },
      { name: "description", content: "Answers regarding saree authenticity, Silk Mark certification, shipping, custom blouse stitching, and returns." },
    ],
  }),
});

const faqs = [
  { q: "Are all sarees Silk Mark certified?", a: "Yes. Every silk saree at ElegantlyWoven is certified 100% pure silk by the Silk Mark Organisation of India. A Silk Mark hologram certificate is shipped inside your package." },
  { q: "How long does shipping take within India?", a: "Metro cities receive delivery within 2–3 business days. Non-metro locations are delivered within 4–5 days via Express insured courier (Bluedart/Delhivery)." },
  { q: "What is your return & exchange policy?", a: "We offer a hassle-free 7-day return and 15-day exchange policy on unworn, unstitched sarees with original tags intact." },
  { q: "Is Cash on Delivery (COD) available?", a: "COD is available across 26,000+ pincodes in India for orders up to ₹40,000." },
  { q: "Do you offer international shipping?", a: "Yes! We ship worldwide to over 70 countries including USA, UK, UAE, Singapore, Canada, and Australia." },
  { q: "Can I get blouse stitching done with my order?", a: "Yes, you can add custom unstitched or tailored blouse stitching at checkout. Measurement forms will be sent via WhatsApp after order confirmation." },
];

function FaqsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Help & Support"
        title="Frequently Asked Questions"
        description="Everything you need to know about our sarees, orders, shipping, and care."
      />

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-2xl px-6 bg-card">
              <AccordionTrigger className="text-left font-serif text-lg py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteLayout>
  );
}
