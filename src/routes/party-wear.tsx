import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/party-wear")({
  component: () => <CollectionPage slug="party-wear" />,
  head: collectionHead("party-wear"),
});