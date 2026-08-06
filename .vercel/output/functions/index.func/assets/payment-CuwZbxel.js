import { d as useShop, n as Input, t as SiteLayout, x as inr } from "./SiteLayout-DkeX7Cnm.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { n as RadioGroupItem, r as Label, t as RadioGroup } from "./radio-group-CzccAS6Q.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Banknote, CreditCard, Landmark, Lock, ShieldCheck, Smartphone, Wallet } from "lucide-react";
//#region src/routes/payment.tsx?tsr-split=component
var methods = [
	{
		id: "upi",
		label: "UPI / QR",
		icon: Smartphone,
		note: "GPay, PhonePe, Paytm, BHIM"
	},
	{
		id: "card",
		label: "Credit / Debit card",
		icon: CreditCard,
		note: "Visa, Mastercard, RuPay, Amex"
	},
	{
		id: "netbanking",
		label: "Netbanking",
		icon: Landmark,
		note: "58 banks supported"
	},
	{
		id: "wallet",
		label: "Wallets & EMI",
		icon: Wallet,
		note: "No-cost EMI from 3 months"
	},
	{
		id: "cod",
		label: "Cash on delivery",
		icon: Banknote,
		note: "₹49 handling fee"
	}
];
function PaymentPage() {
	const { subtotal, clearCart } = useShop();
	const navigate = useNavigate();
	const [method, setMethod] = useState("upi");
	const [processing, setProcessing] = useState(false);
	const shipping = subtotal > 2999 ? 0 : 149;
	const cod = method === "cod" ? 49 : 0;
	const total = subtotal + Math.round(subtotal * .05) + shipping + cod;
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl px-5 py-12 sm:px-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-light sm:text-4xl",
				children: "Payment"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-2 flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5 text-jade" }), " 256-bit encrypted · PCI-DSS compliant gateway"]
			}),
			/* @__PURE__ */ jsxs("form", {
				className: "mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]",
				onSubmit: (e) => {
					e.preventDefault();
					setProcessing(true);
					setTimeout(() => {
						if (method === "netbanking") navigate({ to: "/payment-failed" });
						else {
							clearCart();
							navigate({ to: "/order-success" });
						}
					}, 1400);
				},
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(RadioGroup, {
					value: method,
					onValueChange: setMethod,
					className: "space-y-3",
					children: methods.map((m) => /* @__PURE__ */ jsxs("label", {
						className: cn("flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-sm transition-colors", method === m.id ? "border-gold bg-accent/40" : "border-border"),
						children: [
							/* @__PURE__ */ jsx(RadioGroupItem, { value: m.id }),
							/* @__PURE__ */ jsx(m.icon, { className: "h-4 w-4 text-gold" }),
							/* @__PURE__ */ jsxs("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block",
									children: m.label
								}), /* @__PURE__ */ jsx("span", {
									className: "block text-xs text-muted-foreground",
									children: m.note
								})]
							})
						]
					}, m.id))
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-6 rounded-2xl bg-secondary/50 p-6",
					children: [
						method === "upi" ? /* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "vpa",
								children: "UPI ID"
							}), /* @__PURE__ */ jsx(Input, {
								id: "vpa",
								placeholder: "name@bank",
								className: "mt-2"
							})] }), /* @__PURE__ */ jsx("div", {
								className: "grid h-24 w-24 place-items-center rounded-lg border border-dashed border-border text-[10px] text-muted-foreground",
								children: "Scan QR"
							})]
						}) : null,
						method === "card" ? /* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "cnum",
										children: "Card number"
									}), /* @__PURE__ */ jsx(Input, {
										id: "cnum",
										inputMode: "numeric",
										placeholder: "0000 0000 0000 0000",
										className: "mt-2"
									})]
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "exp",
									children: "Expiry"
								}), /* @__PURE__ */ jsx(Input, {
									id: "exp",
									placeholder: "MM / YY",
									className: "mt-2"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "cvv",
									children: "CVV"
								}), /* @__PURE__ */ jsx(Input, {
									id: "cvv",
									type: "password",
									maxLength: 4,
									className: "mt-2"
								})] })
							]
						}) : null,
						method === "netbanking" ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "You will be redirected to your bank's secure page."
						}) : null,
						method === "wallet" ? /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"EMI from ",
								inr(Math.round(total / 6)),
								"/month for 6 months, interest borne by us."
							]
						}) : null,
						method === "cod" ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Pay in cash or by UPI at your doorstep. Available on orders below ₹40,000."
						}) : null
					]
				})] }), /* @__PURE__ */ jsx("aside", { children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border/70 p-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: "Amount payable"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 font-serif text-3xl",
							children: inr(total)
						}),
						/* @__PURE__ */ jsxs("ul", {
							className: "mt-5 space-y-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ jsxs("li", { children: ["Subtotal ", inr(subtotal)] }),
								/* @__PURE__ */ jsxs("li", { children: ["GST ", inr(Math.round(subtotal * .05))] }),
								/* @__PURE__ */ jsxs("li", { children: ["Shipping ", shipping ? inr(shipping) : "Free"] }),
								cod ? /* @__PURE__ */ jsxs("li", { children: ["COD handling ", inr(cod)] }) : null
							]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							size: "lg",
							disabled: processing,
							className: "mt-6 w-full rounded-full tracking-[0.16em] uppercase",
							children: processing ? "Processing…" : `Pay ${inr(total)}`
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-jade" }), " Money-back guarantee on damaged parcels"]
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							className: "mt-2 w-full rounded-full",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/checkout",
								children: "Back to address"
							})
						})
					]
				}) })]
			})
		]
	}) });
}
//#endregion
export { PaymentPage as component };
