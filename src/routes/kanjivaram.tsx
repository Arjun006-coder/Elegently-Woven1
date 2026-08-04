import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/shop/CollectionPage";

export const Route = createFileRoute("/kanjivaram")({
  component: () => <CollectionPage slug="kanjivaram" />,
  head: collectionHead("kanjivaram"),
});