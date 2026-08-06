import { S as products, d as useShop, p as byId, t as SiteLayout, x as inr } from "./SiteLayout-DkeX7Cnm.js";
import { i as SectionHeading, r as PageHero, t as EmptyState } from "./Bits-CL0zJp_w.js";
import { t as ProductCard } from "./ProductCard-CIdqp8vc.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
//#region src/routes/wishlist.tsx?tsr-split=component
function WishlistPage() {
	const { wishlist, toggleWishlist, addToCart } = useShop();
	const saved = wishlist.flatMap((id) => byId(id) ? [byId(id)] : []);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx(PageHero, {
		eyebrow: "Saved",
		title: "Your wishlist",
		description: "Sarees you loved, kept aside. Move them to your bag before they sell out.",
		compact: true
	}), /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl px-5 py-14 sm:px-8",
		children: [saved.length ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: [
					saved.length,
					" saved · total ",
					inr(saved.reduce((n, p) => n + p.price, 0))
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex shrink-0 gap-2",
				children: [/* @__PURE__ */ jsxs(Button, {
					className: "rounded-full",
					onClick: () => saved.forEach((p) => addToCart(p.id)),
					children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }), " Move all to bag"]
				}), /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					className: "rounded-full",
					onClick: () => saved.forEach((p) => toggleWishlist(p.id)),
					children: [/* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }), " Clear"]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4",
			children: saved.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
		})] }) : /* @__PURE__ */ jsx(EmptyState, {
			icon: /* @__PURE__ */ jsx(Heart, { className: "h-9 w-9" }),
			title: "Nothing saved yet",
			description: "Tap the heart on any saree to keep it here while you decide.",
			action: {
				label: "Browse collections",
				to: "/collections"
			}
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-20",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Handpicked",
				title: "You might love these"
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4",
				children: products.slice(0, 4).map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
			})]
		})]
	})] });
}
//#endregion
export { WishlistPage as component };
