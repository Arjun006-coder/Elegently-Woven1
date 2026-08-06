import { _ as discount, d as useShop, x as inr } from "./SiteLayout-DkeX7Cnm.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { a as Stars } from "./Bits-CL0zJp_w.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Eye, GitCompare, Heart, ShoppingBag, Truck } from "lucide-react";
//#region src/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
//#endregion
//#region src/components/shop/ProductCard.tsx
function ProductCardSkeleton() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx(Skeleton, { className: "aspect-4/5 w-full rounded-2xl" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/2" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/3" })
		]
	});
}
function ProductCard({ product, onQuickView }) {
	const { addToCart, toggleWishlist, wishlist, toggleCompare, compare } = useShop();
	const [hover, setHover] = useState(false);
	const off = discount(product);
	const saved = wishlist.includes(product.id);
	const primary = product.images[0] ?? "";
	const secondary = product.images[1] ?? primary;
	return /* @__PURE__ */ jsxs(motion.article, {
		initial: {
			opacity: 0,
			y: 18
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "group relative",
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative overflow-hidden rounded-2xl bg-secondary/50",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/product/$id",
					params: { id: product.id },
					"aria-label": product.name,
					children: /* @__PURE__ */ jsx("img", {
						src: hover ? secondary : primary,
						alt: product.name,
						loading: "lazy",
						width: 1024,
						height: 1280,
						className: "aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-2",
					children: [
						off > 0 ? /* @__PURE__ */ jsxs("span", {
							className: "rounded-full bg-primary px-2.5 py-1 text-[10px] tracking-widest text-primary-foreground uppercase",
							children: [off, "% off"]
						}) : null,
						product.badge ? /* @__PURE__ */ jsx("span", {
							className: "rounded-full bg-card/90 px-2.5 py-1 text-[10px] tracking-widest text-foreground uppercase",
							children: product.badge
						}) : null,
						product.stock === 0 ? /* @__PURE__ */ jsx("span", {
							className: "rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] tracking-widest text-background uppercase",
							children: "Sold out"
						}) : product.stock <= 4 ? /* @__PURE__ */ jsxs("span", {
							className: "rounded-full bg-jade px-2.5 py-1 text-[10px] tracking-widest text-jade-foreground uppercase",
							children: [
								"Only ",
								product.stock,
								" left"
							]
						}) : null
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "absolute top-3 right-3 flex flex-col gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => toggleWishlist(product.id),
							"aria-label": "Add to wishlist",
							className: "grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110",
							children: /* @__PURE__ */ jsx(Heart, { className: cn("h-4 w-4", saved && "fill-primary text-primary") })
						}),
						onQuickView ? /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => onQuickView(product),
							"aria-label": "Quick view",
							className: "grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110",
							children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
						}) : null,
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => toggleCompare(product.id),
							"aria-label": "Compare",
							className: "grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110",
							children: /* @__PURE__ */ jsx(GitCompare, { className: cn("h-4 w-4", compare.includes(product.id) && "text-primary") })
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						disabled: product.stock === 0,
						onClick: () => addToCart(product.id),
						className: "flex w-full items-center justify-center gap-2 rounded-full bg-card/95 py-3 text-[11px] tracking-[0.2em] uppercase shadow-soft backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50",
						children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "h-3.5 w-3.5" }), product.stock === 0 ? "Notify me" : "Quick add"]
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-4 space-y-1.5",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: product.weave
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-base leading-snug font-normal",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/product/$id",
						params: { id: product.id },
						className: "hover:text-primary",
						children: product.name
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx(Stars, { value: product.rating }), /* @__PURE__ */ jsxs("span", { children: [
						product.rating,
						" (",
						product.reviews,
						")"
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-base",
						children: inr(product.price)
					}), /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground line-through",
						children: inr(product.mrp)
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ jsx(Truck, { className: "h-3 w-3" }), " Delivery in 2–4 days"]
				})
			]
		})]
	});
}
//#endregion
export { ProductCardSkeleton as n, ProductCard as t };
