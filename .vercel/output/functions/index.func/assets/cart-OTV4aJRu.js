import { S as products, d as useShop, n as Input, t as SiteLayout, x as inr } from "./SiteLayout-DkeX7Cnm.js";
import { i as SectionHeading, t as EmptyState } from "./Bits-CL0zJp_w.js";
import { t as ProductCard } from "./ProductCard-CIdqp8vc.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { i as Checkbox } from "./router-DuGEhyTP.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Gift, Heart, Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
//#region src/routes/cart.tsx?tsr-split=component
function CartPage() {
	const { lines, setQty, removeFromCart, subtotal, toggleWishlist } = useShop();
	const [coupon, setCoupon] = useState("");
	const [applied, setApplied] = useState(null);
	const [giftWrap, setGiftWrap] = useState(false);
	const wrapFee = giftWrap ? 249 : 0;
	const discountValue = applied?.value ?? 0;
	const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 149;
	const taxable = Math.max(subtotal - discountValue, 0);
	const gst = Math.round(taxable * .05);
	const total = taxable + gst + shipping + wrapFee;
	if (!lines.length) return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsx(EmptyState, {
		icon: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-9 w-9" }),
		title: "Your bag is empty",
		description: "Six yards of something beautiful is waiting. Start with our best sellers.",
		action: {
			label: "Shop best sellers",
			to: "/best-sellers"
		}
	}) });
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl px-5 py-12 sm:px-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-light sm:text-4xl",
				children: "Shopping bag"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [lines.length, " saree(s) reserved for 60 minutes"]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-6",
					children: [lines.map(({ product, qty }) => /* @__PURE__ */ jsxs("article", {
						className: "grid grid-cols-[6rem_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 p-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:p-5",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/product/$id",
							params: { id: product.id },
							children: /* @__PURE__ */ jsx("img", {
								src: product.images[0],
								alt: product.name,
								loading: "lazy",
								className: "aspect-4/5 w-full rounded-xl object-cover"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "eyebrow",
									children: product.weave
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-1 truncate text-base",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/product/$id",
										params: { id: product.id },
										className: "hover:text-primary",
										children: product.name
									})
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										product.color,
										" · ",
										product.fabric,
										" · ",
										product.length
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-3 flex items-baseline gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-base",
										children: inr(product.price * qty)
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground line-through",
										children: inr(product.mrp * qty)
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 flex flex-wrap items-center gap-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center rounded-full border border-border",
											children: [
												/* @__PURE__ */ jsx("button", {
													type: "button",
													"aria-label": "Decrease",
													onClick: () => setQty(product.id, qty - 1),
													className: "grid h-9 w-9 place-items-center",
													children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" })
												}),
												/* @__PURE__ */ jsx("span", {
													className: "w-7 text-center text-sm",
													children: qty
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													"aria-label": "Increase",
													onClick: () => setQty(product.id, qty + 1),
													className: "grid h-9 w-9 place-items-center",
													children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" })
												})
											]
										}),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => {
												toggleWishlist(product.id);
												removeFromCart(product.id);
											},
											className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary",
											children: [/* @__PURE__ */ jsx(Heart, { className: "h-3.5 w-3.5" }), " Move to wishlist"]
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => toast("Saved for later"),
											className: "text-xs text-muted-foreground hover:text-primary",
											children: "Save for later"
										}),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => removeFromCart(product.id),
											className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive",
											children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
										})
									]
								})
							]
						})]
					}, product.id)), /* @__PURE__ */ jsxs("label", {
						className: "flex cursor-pointer items-start gap-3 rounded-2xl border border-border/70 p-5 text-sm",
						children: [/* @__PURE__ */ jsx(Checkbox, {
							checked: giftWrap,
							onCheckedChange: (v) => setGiftWrap(!!v),
							className: "mt-0.5"
						}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Gift, { className: "h-4 w-4 text-gold" }), " Add gift wrap (₹249)"]
						}), /* @__PURE__ */ jsx("span", {
							className: "mt-1 block text-xs text-muted-foreground",
							children: "Muslin wrap, brass seal and a hand-written note."
						})] })]
					})]
				}), /* @__PURE__ */ jsx("aside", {
					className: "lg:sticky lg:top-28 lg:h-fit",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border/70 p-6",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "eyebrow",
								children: "Price details"
							}),
							/* @__PURE__ */ jsxs("form", {
								className: "mt-5 flex gap-2",
								onSubmit: (e) => {
									e.preventDefault();
									if (coupon.trim().toUpperCase() === "LUMA15") {
										setApplied({
											code: "LUMA15",
											value: Math.round(subtotal * .15)
										});
										toast.success("Coupon applied!", { description: "15% off applied successfully." });
									} else toast.error("Invalid coupon", { description: "Try LUMA15" });
								},
								children: [/* @__PURE__ */ jsx(Input, {
									value: coupon,
									onChange: (e) => setCoupon(e.target.value),
									placeholder: "Coupon code",
									"aria-label": "Coupon",
									className: "rounded-full"
								}), /* @__PURE__ */ jsx(Button, {
									type: "submit",
									variant: "outline",
									className: "rounded-full px-6",
									children: "Apply"
								})]
							}),
							applied ? /* @__PURE__ */ jsxs("p", {
								className: "mt-3 flex items-center gap-2 text-xs text-jade",
								children: [
									/* @__PURE__ */ jsx(Tag, { className: "h-3.5 w-3.5" }),
									" ",
									applied.code,
									" applied"
								]
							}) : null,
							/* @__PURE__ */ jsxs("dl", {
								className: "mt-6 space-y-3 text-sm",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "text-muted-foreground",
											children: "Subtotal"
										}), /* @__PURE__ */ jsx("dd", { children: inr(subtotal) })]
									}),
									applied ? /* @__PURE__ */ jsxs("div", {
										className: "flex justify-between text-jade",
										children: [/* @__PURE__ */ jsx("dt", { children: "Coupon discount" }), /* @__PURE__ */ jsxs("dd", { children: ["-", inr(discountValue)] })]
									}) : null,
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "text-muted-foreground",
											children: "GST (5%)"
										}), /* @__PURE__ */ jsx("dd", { children: inr(gst) })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "text-muted-foreground",
											children: "Shipping"
										}), /* @__PURE__ */ jsx("dd", { children: shipping ? inr(shipping) : "Free" })]
									}),
									giftWrap ? /* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "text-muted-foreground",
											children: "Gift wrap"
										}), /* @__PURE__ */ jsx("dd", { children: inr(wrapFee) })]
									}) : null,
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between border-t border-border/70 pt-4 text-base",
										children: [/* @__PURE__ */ jsx("dt", { children: "Grand total" }), /* @__PURE__ */ jsx("dd", {
											className: "font-serif text-xl",
											children: inr(total)
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								size: "lg",
								className: "mt-6 w-full rounded-full tracking-[0.16em] uppercase",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/checkout",
									children: "Proceed to checkout"
								})
							}),
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "ghost",
								className: "mt-2 w-full rounded-full",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/collections",
									children: "Continue shopping"
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-20",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "You may also like",
					title: "Complete the trousseau"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4",
					children: products.slice(12, 16).map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
				})]
			})
		]
	}) });
}
//#endregion
export { CartPage as component };
