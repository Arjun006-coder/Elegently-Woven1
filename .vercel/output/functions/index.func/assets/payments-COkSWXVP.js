import { jsx, jsxs } from "react/jsx-runtime";
import { CreditCard, ShieldCheck } from "lucide-react";
//#region src/routes/account/payments.tsx?tsr-split=component
function AccountPayments() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-serif font-bold text-foreground tracking-wide",
			children: "Payment Methods"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-2",
			children: "Manage your saved payment options."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "bg-card border border-border p-8 rounded-xl shadow-sm",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center text-center max-w-md mx-auto",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6",
						children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-8 w-8 text-primary" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-xl font-medium mb-3",
						children: "Secure Payments"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground mb-8",
						children: "For your security and to comply with PCI-DSS standards, ElegantlyWoven does not store your credit card details on our servers. All transactions are securely processed and tokenized by our payment gateway partners (Razorpay & Stripe)."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "w-full bg-muted/30 border border-border rounded-lg p-4 flex items-center gap-4 text-left",
						children: [/* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6 text-muted-foreground shrink-0" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium",
							children: "Add payment method at checkout"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "You can save cards securely during your next purchase."
						})] })]
					})
				]
			})
		})]
	});
}
//#endregion
export { AccountPayments as component };
