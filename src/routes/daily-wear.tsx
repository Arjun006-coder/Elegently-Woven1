import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/daily-wear")({
  component: () => <CollectionPage slug="daily-wear" />,
  head: collectionHead("daily-wear"),
});