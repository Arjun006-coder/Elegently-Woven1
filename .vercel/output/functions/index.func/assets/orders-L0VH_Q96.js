import { t as Button } from "./button-Bq5vK6RO.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Package } from "lucide-react";
//#region src/routes/account/orders.tsx?tsr-split=component
function AccountOrders() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-serif font-bold text-foreground tracking-wide",
			children: "My Orders"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-2",
			children: "View and track your recent purchases."
		})] }), /* @__PURE__ */ jsxs("div", {
			className: "bg-card border border-border p-12 rounded-xl text-center shadow-sm",
			children: [
				/* @__PURE__ */ jsx(Package, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" }),
				/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-medium mb-2",
					children: "No orders found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mb-6",
					children: "Looks like you haven't made any purchases yet."
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/collections",
						children: "Start Shopping"
					})
				})
			]
		})]
	});
}
//#endregion
export { AccountOrders as component };
