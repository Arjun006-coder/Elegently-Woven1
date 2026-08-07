import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { PageHero } from "./Bits";
import { CollectionView } from "./CollectionView";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { collectionBySlug, products as allProducts } from "@/lib/data";
import { useShop } from "@/lib/store";

export function CollectionPage({ slug }: { slug: string }) {
  const meta = collectionBySlug(slug);
  const { liveProducts } = useShop();

  const combinedProducts = useMemo(() => {
    return (liveProducts && liveProducts.length > 0) ? liveProducts : allProducts;
  }, [liveProducts]);

  const list = useMemo(() => {
    if (!slug || slug === 'collections') return combinedProducts;

    const normalized = slug.toLowerCase().replace(/[-_]/g, " ");
    const matched = combinedProducts.filter(p => {
      const cat = (p.category || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      const pSlug = (p.slug || "").toLowerCase();
      const weave = (p.weave || "").toLowerCase();
      const fabric = (p.fabric || "").toLowerCase();
      const occasion = (p.occasion || "").toLowerCase();

      return (
        cat.includes(normalized) ||
        pSlug.includes(normalized) ||
        weave.includes(normalized) ||
        fabric.includes(normalized) ||
        occasion.includes(normalized) ||
        name.includes(normalized)
      );
    });

    return matched.length > 0 ? matched : combinedProducts;
  }, [slug, combinedProducts]);

  return (
    <SiteLayout>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-xs text-muted-foreground sm:px-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{meta?.title ?? slug}</span>
      </nav>
      <div className="mt-6">
        <PageHero
          compact
          eyebrow={meta?.eyebrow}
          title={meta?.title ?? slug}
          description={meta?.description}
          image={meta?.image}
        />
      </div>
      <CollectionView source={list} />
    </SiteLayout>
  );
}

export function collectionHead(slug: string) {
  const meta = collectionBySlug(slug);
  const title = `${meta?.title ?? slug} — ElegantlyWoven`;
  const description = meta?.description ?? "Handloom sarees at ElegantlyWoven.";
  return () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `/${slug}` },
    ],
    links: [{ rel: "canonical", href: `/${slug}` }],
  });
}
