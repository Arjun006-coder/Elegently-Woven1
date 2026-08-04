import { Link } from "@tanstack/react-router";
import { PageHero } from "./Bits";
import { CollectionView } from "./CollectionView";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { collectionBySlug, products } from "@/lib/data";

export function CollectionPage({ slug }: { slug: string }) {
  const meta = collectionBySlug(slug);
  const items = meta?.filter ? products.filter(meta.filter) : products;
  const list = items.length ? items : products;

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
  const title = `${meta?.title ?? slug} — Meera Silks`;
  const description = meta?.description ?? "Handloom sarees at Meera Silks.";
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