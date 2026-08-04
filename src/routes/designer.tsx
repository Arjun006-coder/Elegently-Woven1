import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/designer")({
  component: () => <CollectionPage slug="designer" />,
  head: collectionHead("designer"),
});