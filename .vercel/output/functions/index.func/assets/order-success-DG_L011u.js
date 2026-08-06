import { S as products, t as SiteLayout } from "./SiteLayout-DkeX7Cnm.js";
import { i as SectionHeading } from "./Bits-CL0zJp_w.js";
import { t as ProductCard } from "./ProductCard-CIdqp8vc.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { CheckCircle2, Download, Home, MessageCircle, Package, Truck } from "lucide-react";
//#region src/routes/order-success.tsx?tsr-split=component
var steps = [
	{
		icon: CheckCircle2,
		label: "Order placed",
		note: "Just now"
	},
	{
		icon: Package,
		label: "Quality check & packing",
		note: "Within 24 hours"
	},
	{
		icon: Truck,
		label: "Shipped",
		note: "Tomorrow"
	},
	{
		icon: Home,
		label: "Delivered",
		note: "In 3 – 4 days"
	}
];
function OrderSuccess() {
	const orderId = "MS-" + String(Math.floor(1e5 + Math.random() * 899999));
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-4xl px-5 py-16 text-center sm:px-8",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-jade/10 text-jade",
				children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-9 w-9" })
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-8 text-3xl font-light sm:text-4xl",
				children: "Thank you — your order is confirmed"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					"Order ",
					/* @__PURE__ */ jsx("span", {
						className: "text-foreground",
						children: orderId
					}),
					" · A confirmation has been sent to your email and WhatsApp."
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4",
				children: steps.map((s, i) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border/70 p-5",
					children: [
						/* @__PURE__ */ jsx(s.icon, { className: i === 0 ? "h-5 w-5 text-jade" : "h-5 w-5 text-gold" }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm",
							children: s.label
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: s.note
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-10 flex flex-wrap justify-center gap-3",
				children: [
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "lg",
						className: "rounded-full tracking-[0.16em] uppercase",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/track-order",
							children: "Track order"
						})
					}),
					/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "lg",
						className: "rounded-full",
						onClick: () => toast.success("Invoice downloaded"),
						children: [/* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }), " Invoice"]
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "ghost",
						size: "lg",
						className: "rounded-full",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/collections",
							children: "Continue shopping"
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx(MessageCircle, { className: "h-3.5 w-3.5 text-gold" }), " Need a change? WhatsApp us within 2 hours on +91 98450 22110."]
			})
		]
	}), /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-7xl px-5 pb-20 sm:px-8",
		children: [/* @__PURE__ */ jsx(SectionHeading, {
			eyebrow: "Styling next",
			title: "Pair it with these",
			align: "center"
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4",
			children: products.slice(6, 10).map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
		})]
	})] });
}
//#endregion
export { OrderSuccess as component };
