import { t as SiteLayout } from "./SiteLayout-DkeX7Cnm.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Headphones, RefreshCcw, XCircle } from "lucide-react";
//#region src/routes/payment-failed.tsx?tsr-split=component
function PaymentFailed() {
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-2xl px-5 py-20 text-center sm:px-8",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-destructive/10 text-destructive",
				children: /* @__PURE__ */ jsx(XCircle, { className: "h-9 w-9" })
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-8 text-3xl font-light sm:text-4xl",
				children: "Payment didn't go through"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "No money has left your account. Your bag is still saved — retry with UPI or a card, or pay cash on delivery."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-10 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ jsx(Button, {
					asChild: true,
					size: "lg",
					className: "rounded-full tracking-[0.16em] uppercase",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/payment",
						children: [/* @__PURE__ */ jsx(RefreshCcw, { className: "mr-2 h-4 w-4" }), " Retry payment"]
					})
				}), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					size: "lg",
					className: "rounded-full",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/cart",
						children: "Back to bag"
					})
				})]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx(Headphones, { className: "h-3.5 w-3.5 text-gold" }), " Stuck? Call +91 98450 22110, 10 AM – 8 PM IST."]
			})
		]
	}) });
}
//#endregion
export { PaymentFailed as component };
