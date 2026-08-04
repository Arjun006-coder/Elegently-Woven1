import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/linen")({
  component: () => <CollectionPage slug="linen" />,
  head: collectionHead("linen"),
});