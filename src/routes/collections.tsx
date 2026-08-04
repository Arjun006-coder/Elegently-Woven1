import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/collections")({
  component: () => <CollectionPage slug="collections" />,
  head: collectionHead("collections"),
});