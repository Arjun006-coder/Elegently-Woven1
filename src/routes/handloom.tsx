import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/handloom")({
  component: () => <CollectionPage slug="handloom" />,
  head: collectionHead("handloom"),
});