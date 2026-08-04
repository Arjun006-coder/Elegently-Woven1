import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/office-wear")({
  component: () => <CollectionPage slug="office-wear" />,
  head: collectionHead("office-wear"),
});