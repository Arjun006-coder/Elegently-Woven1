import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/silk-sarees")({
  component: () => <CollectionPage slug="silk-sarees" />,
  head: collectionHead("silk-sarees"),
});