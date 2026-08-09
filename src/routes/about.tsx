import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero, SectionHeading } from "@/components/shop/Bits";
import { BRAND, stores } from "@/lib/data";
import { ShieldCheck, Award, Heart, Sparkles, MapPin } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: `About Us — ${BRAND.name}` },
      { name: "description", content: "Learn about ElegantlyWoven's heritage, master weavers, pure silk certification, and loom craftsmanship." },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Heritage"
        title="Weaving Traditions into Modern Luxury"
        description="ElegantlyWoven was founded with a single mission: to champion master handloom weavers and deliver uncompromised authentic sarees directly to patrons worldwide."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
            <p className="eyebrow">The Loom Atelier</p>
            <h2 className="text-3xl font-serif font-light text-foreground">Preserving Centuries of Craft</h2>
            <p>
              Every saree at ElegantlyWoven tells a story of patience, precision, and artistry. Our looms across Kanchipuram, Varanasi, Chanderi, and Bengal employ traditional technique passed down through generations of master weavers.
            </p>
            <p>
              By eliminating intermediary brokers, we ensure fair compensation for our artisans while offering certified half-fine and pure zari sarees directly to you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1610189014163-54942d512a81?w=800&q=80" alt="Weaving" className="rounded-2xl aspect-4/5 object-cover" />
            <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80" alt="Silk Saree" className="rounded-2xl aspect-4/5 object-cover mt-8" />
          </div>
        </div>

        <div className="mt-24 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 p-6 text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-gold mb-3" />
            <h3 className="font-serif text-lg">Silk Mark Certified</h3>
            <p className="mt-2 text-xs text-muted-foreground">Every saree comes with authentic hallmark certification ensuring 100% natural silk.</p>
          </div>
          <div className="rounded-2xl border border-border/70 p-6 text-center">
            <Award className="mx-auto h-8 w-8 text-gold mb-3" />
            <h3 className="font-serif text-lg">Direct Loom Support</h3>
            <p className="mt-2 text-xs text-muted-foreground">Fair wages and direct revenue share with our network of over 400 artisan weaving families.</p>
          </div>
          <div className="rounded-2xl border border-border/70 p-6 text-center">
            <Heart className="mx-auto h-8 w-8 text-gold mb-3" />
            <h3 className="font-serif text-lg">Bespoke Fitting</h3>
            <p className="mt-2 text-xs text-muted-foreground">Free unstitched blouse piece with fall & pico finishing options available on every saree.</p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
