import { n as Input, t as SiteLayout } from "./SiteLayout-DkeX7Cnm.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Package, Search } from "lucide-react";
//#region src/routes/track-order.tsx?tsr-split=component
function TrackOrder() {
	const [orderId, setOrderId] = useState("");
	const [email, setEmail] = useState("");
	const [hasSearched, setHasSearched] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		setHasSearched(true);
	};
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl px-5 py-24 sm:px-8 min-h-[70vh]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "text-center mb-12",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-serif font-light mb-4",
				children: "Track Your Order"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground max-w-lg mx-auto",
				children: "Enter your order number and email address below to see the latest updates on your delivery."
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm",
			children: !hasSearched ? /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-6 max-w-md mx-auto",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Order Number"
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx(Package, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
								required: true,
								type: "text",
								placeholder: "e.g. EW-100482",
								className: "pl-10 h-12",
								value: orderId,
								onChange: (e) => setOrderId(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Email Address"
						}), /* @__PURE__ */ jsx(Input, {
							required: true,
							type: "email",
							placeholder: "The email used at checkout",
							className: "h-12",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "submit",
						size: "lg",
						className: "w-full h-12 text-sm tracking-widest uppercase",
						children: [/* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4" }), " Find Order"]
					})
				]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "text-center py-8",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mx-auto h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-6",
						children: /* @__PURE__ */ jsx(Search, { className: "h-8 w-8 text-muted-foreground" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-xl font-medium mb-3",
						children: "Order Not Found"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-muted-foreground mb-8 max-w-md mx-auto",
						children: [
							"We couldn't find an order matching \"",
							orderId,
							"\" for ",
							email,
							". Please check the details and try again."
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row justify-center gap-4",
						children: [/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							onClick: () => setHasSearched(false),
							children: "Try Again"
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							children: /* @__PURE__ */ jsx(Link, {
								to: "/contact",
								children: "Contact Support"
							})
						})]
					})
				]
			})
		})]
	}) });
}
//#endregion
export { TrackOrder as component };
