import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/trending")({
  component: () => <CollectionPage slug="trending" />,
  head: collectionHead("trending"),
});