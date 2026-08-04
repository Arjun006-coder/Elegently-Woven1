import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/sale")({
  component: () => <CollectionPage slug="sale" />,
  head: collectionHead("sale"),
});