import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/wedding")({
  component: () => <CollectionPage slug="wedding" />,
  head: collectionHead("wedding"),
});