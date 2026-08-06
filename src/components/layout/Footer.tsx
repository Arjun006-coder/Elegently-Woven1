import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { BRAND, stores } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const columns = [
  {
    title: "The House",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Brand Story", to: "/about" },
      { label: "Store Locator", to: "/contact" },
      { label: "Contact Us", to: "/contact" },
      { label: "Gift Cards", to: "/gift-cards" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "New Arrivals", to: "/new-arrivals" },
      { label: "Bridal", to: "/bridal" },
      { label: "Kanjivaram", to: "/kanjivaram" },
      { label: "Banarasi", to: "/banarasi" },
      { label: "Sale", to: "/sale" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "My Orders", to: "/account/orders" },
      { label: "Track Order", to: "/track-order" },
      { label: "Returns", to: "/account/returns" },
      { label: "Refunds", to: "/account/refunds" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Use", to: "/terms" },
      { label: "Shipping Policy", to: "/shipping-policy" },
      { label: "Cancellation Policy", to: "/cancellation-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <p className="font-serif text-3xl">{BRAND.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{BRAND.tagline}</p>
            <form
              className="mt-8 flex max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("You're on the list", { description: "Look out for our fortnightly loom letter." });
              }}
            >
              <Input type="email" required placeholder="Your email" aria-label="Email" className="rounded-full" />
              <Button type="submit" className="rounded-full px-6">
                Join
              </Button>
            </form>
            <div className="mt-8 flex gap-3">
              {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow">{col.title}</p>
                <ul className="mt-5 space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-border/70 pt-10 sm:grid-cols-3">
          {stores.map((s) => (
            <div key={s.city} className="text-sm">
              <p className="flex items-center gap-2 font-serif text-lg">
                <MapPin className="h-4 w-4 text-gold" /> {s.city}
              </p>
              <p className="mt-1 text-muted-foreground">{s.address}</p>
              <p className="text-muted-foreground">{s.phone}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/70 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name} by {BRAND.poweredBy}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-1.5 hover:text-foreground">
              <Mail className="h-3.5 w-3.5" /> {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phone}`} className="flex items-center gap-1.5 hover:text-foreground">
              <Phone className="h-3.5 w-3.5" /> {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}