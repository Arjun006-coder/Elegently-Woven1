import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/best-sellers")({
  component: () => <CollectionPage slug="best-sellers" />,
  head: collectionHead("best-sellers"),
});