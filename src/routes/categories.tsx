import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero, SectionHeading } from "@/components/shop/Bits";
import { collections, images, products } from "@/lib/data";

export const Route = createFileRoute("/categories")({
  component: Categories,
  head: () => ({
    meta: [
      { title: "Shop Saree Categories — ElegantlyWoven" },
      {
        name: "description",
        content: "Browse sarees by weave, fabric and occasion — Kanjivaram, Banarasi, linen, cotton, bridal and more.",
      },
      { property: "og:title", content: "Shop Saree Categories — ElegantlyWoven" },
      { property: "og:description", content: "Find your saree by weave, fabric and occasion." },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
});

function Categories() {
  const groups = [
    { label: "By Weave", slugs: ["kanjivaram", "banarasi", "silk-sarees", "cotton-sarees", "linen", "handloom"] },
    { label: "By Occasion", slugs: ["bridal", "wedding", "festival", "party-wear", "office-wear", "daily-wear"] },
    { label: "Curated", slugs: ["new-arrivals", "trending", "best-sellers", "designer", "sale"] },
  ];

  return (
    <SiteLayout>
      <PageHero
        compact
        eyebrow="Browse"
        title="Shop by category"
        description="Forty-eight years of weaves, sorted the way our store is laid out."
        image={images.hero2}
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        {groups.map((g) => (
          <div key={g.label} className="mb-16">
            <SectionHeading eyebrow={g.label} title={g.label.replace("By ", "")} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.slugs.map((slug) => {
                const c = collections.find((x) => x.slug === slug);
                if (!c) return null;
                const count = c.filter ? products.filter(c.filter).length : products.length;
                return (
                  <Link
                    key={slug}
                    to={`/${slug}`}
                    className="group relative overflow-hidden rounded-2xl hover-lift"
                  >
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 text-background">
                      <p className="font-serif text-xl">{c.title}</p>
                      <p className="mt-1 text-xs opacity-80">{count} sarees</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}
