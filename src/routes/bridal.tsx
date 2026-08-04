import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/bridal")({
  component: () => <CollectionPage slug="bridal" />,
  head: collectionHead("bridal"),
});