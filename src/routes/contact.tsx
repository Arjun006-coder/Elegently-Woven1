import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/shop/Bits";
import { BRAND, stores } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: `Contact Us & Stores — ${BRAND.name}` },
      { name: "description", content: "Get in touch with ElegantlyWoven client support or visit our flagship boutiques in Bengaluru, Hyderabad, and Chennai." },
    ],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Client Concierge"
        title="We are here to assist you"
        description="Have a question about a weave, custom blouse stitching, or order status? Reach out to our team."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-light">Visit Our Flagship Stores</h2>
              <p className="mt-2 text-sm text-muted-foreground">Experience our saree drapes in person at our luxury ateliers.</p>
            </div>

            <div className="space-y-6">
              {stores.map((s) => (
                <div key={s.city} className="rounded-2xl border border-border/70 p-6 bg-card">
                  <h3 className="flex items-center gap-2 font-serif text-xl">
                    <MapPin className="h-5 w-5 text-gold" /> {s.city} Store
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.address}</p>
                  <p className="mt-2 text-sm text-primary font-medium">{s.phone}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-border text-sm">
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4 text-gold" /> {BRAND.email}
              </a>
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4 text-gold" /> {BRAND.phone}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 p-8 bg-card">
            <h2 className="font-serif text-2xl font-light">Send us a message</h2>
            <p className="mt-2 text-xs text-muted-foreground">Our concierge responds within 2 business hours.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                toast.success("Message Sent", { description: "Thank you for contacting us. We will get back to you shortly." });
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <Label htmlFor="cname">Your Name *</Label>
                <Input id="cname" required placeholder="Full Name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cemail">Email Address *</Label>
                <Input id="cemail" type="email" required placeholder="name@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cphone">Phone Number</Label>
                <Input id="cphone" type="tel" placeholder="+91 98000 00000" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="msg">Message *</Label>
                <Textarea id="msg" required rows={4} placeholder="How can we help you?" className="mt-1" />
              </div>
              <Button type="submit" className="w-full rounded-full mt-2">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
