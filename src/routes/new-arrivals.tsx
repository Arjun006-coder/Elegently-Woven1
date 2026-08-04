import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/new-arrivals")({
  component: () => <CollectionPage slug="new-arrivals" />,
  head: collectionHead("new-arrivals"),
});