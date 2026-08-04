import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/festival")({
  component: () => <CollectionPage slug="festival" />,
  head: collectionHead("festival"),
});