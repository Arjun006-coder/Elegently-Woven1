import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/cotton-sarees")({
  component: () => <CollectionPage slug="cotton-sarees" />,
  head: collectionHead("cotton-sarees"),
});