import { Link } from "@tanstack/react-router";
import { PageHero } from "./Bits";
import { CollectionView } from "./CollectionView";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { collectionBySlug } from "@/lib/data";
import { useShop } from "@/lib/store";

export function CollectionPage({ slug }: { slug: string }) {
  const meta = collectionBySlug(slug);
  const { liveProducts } = useShop();
  
  // Custom filter logic since meta.filter is designed for mock data structure
  let items = liveProducts;
  if (slug !== 'collections') {
    items = liveProducts.filter(p => p.category?.toLowerCase() === slug.toLowerCase() || p.slug?.includes(slug));
  }
  const list = items;

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
