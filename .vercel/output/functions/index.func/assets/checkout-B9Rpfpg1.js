import { d as useShop, n as Input, t as SiteLayout, x as inr } from "./SiteLayout-DkeX7Cnm.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { i as Checkbox } from "./router-DuGEhyTP.js";
import { n as RadioGroupItem, r as Label, t as RadioGroup } from "./radio-group-CzccAS6Q.js";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, Gift, LogIn, MapPin, Plus, Truck } from "lucide-react";
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/routes/checkout.tsx?tsr-split=component
var savedAddresses = [{
	id: "home",
	label: "Home",
	name: "Aditi Rao",
	line: "12, Lotus Villa, 4th Cross, Jayanagar, Bengaluru 560011",
	phone: "+91 98800 11223",
	tag: "Default"
}, {
	id: "office",
	label: "Office",
	name: "Aditi Rao",
	line: "Prestige Tech Park, Kadubeesanahalli, Bengaluru 560103",
	phone: "+91 98800 11223"
}];
var slots = [
	"Today, 6 – 9 PM (express ₹199)",
	"Tomorrow, 10 AM – 1 PM",
	"Tomorrow, 4 – 8 PM",
	"Any weekday, 10 AM – 8 PM"
];
function Checkout() {
	const { subtotal, lines } = useShop();
	const navigate = useNavigate();
	const [address, setAddress] = useState("home");
	const [slot, setSlot] = useState(slots[1]);
	const [guest, setGuest] = useState(false);
	const [sameBilling, setSameBilling] = useState(true);
	const [adding, setAdding] = useState(false);
	const [gifting, setGifting] = useState(false);
	const shipping = subtotal > 2999 ? 0 : 149;
	const gst = Math.round(subtotal * .05);
	const total = subtotal + gst + shipping;
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl px-5 py-12 sm:px-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-light sm:text-4xl",
				children: "Checkout"
			}),
			/* @__PURE__ */ jsx("ol", {
				className: "mt-6 flex flex-wrap gap-4 text-xs tracking-[0.18em] uppercase",
				children: [
					"Bag",
					"Address",
					"Payment"
				].map((s, i) => /* @__PURE__ */ jsxs("li", {
					className: cn("flex items-center gap-2", i <= 1 ? "text-foreground" : "text-muted-foreground"),
					children: [/* @__PURE__ */ jsx("span", {
						className: cn("grid h-6 w-6 place-items-center rounded-full text-[10px]", i <= 1 ? "bg-primary text-primary-foreground" : "bg-secondary"),
						children: i < 1 ? /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) : i + 1
					}), s]
				}, s))
			}),
			/* @__PURE__ */ jsxs("form", {
				className: "mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]",
				onSubmit: (e) => {
					e.preventDefault();
					navigate({ to: "/payment" });
				},
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ jsxs("section", {
							className: "rounded-2xl border border-border/70 p-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
								children: [/* @__PURE__ */ jsx("p", {
									className: "eyebrow",
									children: "Account"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setGuest((g) => !g),
									className: "text-xs text-primary hover:underline",
									children: guest ? "Sign in instead" : "Continue as guest"
								})]
							}), guest ? /* @__PURE__ */ jsxs("div", {
								className: "mt-5 grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "gname",
										children: "Full name *"
									}), /* @__PURE__ */ jsx(Input, {
										id: "gname",
										required: true,
										className: "mt-2"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "gmail",
										children: "Email *"
									}), /* @__PURE__ */ jsx(Input, {
										id: "gmail",
										type: "email",
										required: true,
										className: "mt-2"
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "gphone",
											children: "Phone number *"
										}), /* @__PURE__ */ jsx(Input, {
											id: "gphone",
											type: "tel",
											required: true,
											placeholder: "Required for delivery updates",
											className: "mt-2"
										})]
									})
								]
							}) : /* @__PURE__ */ jsxs("p", {
								className: "mt-4 flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4 text-gold" }), " Signed in as aditi.rao@email.com"]
							})]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "rounded-2xl border border-border/70 p-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
									children: [/* @__PURE__ */ jsx("p", {
										className: "eyebrow",
										children: "Shipping address"
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setAdding((a) => !a),
										className: "flex items-center gap-1.5 text-xs text-primary hover:underline",
										children: [/* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }), " Add new"]
									})]
								}),
								/* @__PURE__ */ jsx(RadioGroup, {
									value: address,
									onValueChange: setAddress,
									className: "mt-5 space-y-3",
									children: savedAddresses.map((a) => /* @__PURE__ */ jsxs("label", {
										className: cn("flex cursor-pointer gap-3 rounded-xl border p-4 text-sm transition-colors", address === a.id ? "border-gold bg-accent/40" : "border-border"),
										children: [/* @__PURE__ */ jsx(RadioGroupItem, {
											value: a.id,
											className: "mt-1"
										}), /* @__PURE__ */ jsxs("span", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ jsxs("span", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-gold" }),
														a.name,
														" · ",
														a.label,
														a.tag ? /* @__PURE__ */ jsx("span", {
															className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase",
															children: a.tag
														}) : null
													]
												}),
												/* @__PURE__ */ jsx("span", {
													className: "mt-1 block text-xs text-muted-foreground",
													children: a.line
												}),
												/* @__PURE__ */ jsx("span", {
													className: "block text-xs text-muted-foreground",
													children: a.phone
												}),
												/* @__PURE__ */ jsx("span", {
													className: "mt-2 flex gap-4 text-xs text-primary",
													children: /* @__PURE__ */ jsx(Link, {
														to: "/account/addresses",
														children: "Edit"
													})
												})
											]
										})]
									}, a.id))
								}),
								adding ? /* @__PURE__ */ jsxs("div", {
									className: "mt-5 grid gap-4 rounded-xl bg-secondary/50 p-5 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "sm:col-span-2 grid h-28 place-items-center rounded-lg border border-dashed border-border text-xs text-muted-foreground",
											children: "Map location picker placeholder"
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "fn",
											children: "Full name *"
										}), /* @__PURE__ */ jsx(Input, {
											id: "fn",
											required: true,
											className: "mt-2"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "ph",
											children: "Phone number *"
										}), /* @__PURE__ */ jsx(Input, {
											id: "ph",
											type: "tel",
											required: true,
											className: "mt-2"
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ jsx(Label, {
												htmlFor: "st",
												children: "Street address *"
											}), /* @__PURE__ */ jsx(Input, {
												id: "st",
												required: true,
												className: "mt-2"
											})]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "pc",
											children: "Pincode *"
										}), /* @__PURE__ */ jsx(Input, {
											id: "pc",
											required: true,
											maxLength: 6,
											className: "mt-2"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "ct",
											children: "City *"
										}), /* @__PURE__ */ jsx(Input, {
											id: "ct",
											required: true,
											className: "mt-2"
										})] }),
										/* @__PURE__ */ jsx(Button, {
											type: "button",
											className: "rounded-full sm:col-span-2",
											onClick: () => setAdding(false),
											children: "Save address"
										})
									]
								}) : null,
								/* @__PURE__ */ jsxs("label", {
									className: "mt-5 flex cursor-pointer items-center gap-3 text-sm",
									children: [/* @__PURE__ */ jsx(Checkbox, {
										checked: sameBilling,
										onCheckedChange: (v) => setSameBilling(!!v)
									}), "Billing address is the same as shipping"]
								}),
								!sameBilling ? /* @__PURE__ */ jsxs("div", {
									className: "mt-4 grid gap-4 rounded-xl bg-secondary/50 p-5 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "bill",
											children: "Billing address"
										}), /* @__PURE__ */ jsx(Input, {
											id: "bill",
											className: "mt-2"
										})]
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "gstin",
										children: "GSTIN (optional)"
									}), /* @__PURE__ */ jsx(Input, {
										id: "gstin",
										className: "mt-2"
									})] })]
								}) : null
							]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "rounded-2xl border border-border/70 p-6",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "eyebrow",
									children: "Delivery slot"
								}),
								/* @__PURE__ */ jsx(RadioGroup, {
									value: slot,
									onValueChange: setSlot,
									className: "mt-5 grid gap-3 sm:grid-cols-2",
									children: slots.map((s) => /* @__PURE__ */ jsxs("label", {
										className: cn("flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors", slot === s ? "border-gold bg-accent/40" : "border-border"),
										children: [/* @__PURE__ */ jsx(RadioGroupItem, { value: s }), /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx(Truck, { className: "h-3.5 w-3.5 text-gold" }),
												" ",
												s
											]
										})]
									}, s))
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-5",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "instructions",
										children: "Delivery instructions"
									}), /* @__PURE__ */ jsx(Textarea, {
										id: "instructions",
										placeholder: "Leave with the security desk, call on arrival…",
										className: "mt-2"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "mt-5 flex cursor-pointer items-center gap-3 text-sm",
									children: [/* @__PURE__ */ jsx(Checkbox, {
										checked: gifting,
										onCheckedChange: (v) => setGifting(!!v)
									}), /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Gift, { className: "h-4 w-4 text-gold" }), " This is a gift"]
									})]
								}),
								gifting ? /* @__PURE__ */ jsx(Textarea, {
									placeholder: "Your gift message (up to 200 characters)",
									maxLength: 200,
									className: "mt-3"
								}) : null
							]
						})
					]
				}), /* @__PURE__ */ jsx("aside", {
					className: "lg:sticky lg:top-28 lg:h-fit",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border/70 p-6",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "eyebrow",
								children: "Order summary"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mt-5 space-y-4",
								children: [lines.map(({ product, qty }) => /* @__PURE__ */ jsxs("li", {
									className: "flex gap-3",
									children: [
										/* @__PURE__ */ jsx("img", {
											src: product.images[0],
											alt: "",
											loading: "lazy",
											className: "h-16 w-13 rounded-lg object-cover"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ jsx("p", {
												className: "truncate text-sm",
												children: product.name
											}), /* @__PURE__ */ jsxs("p", {
												className: "text-xs text-muted-foreground",
												children: ["Qty ", qty]
											})]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm",
											children: inr(product.price * qty)
										})
									]
								}, product.id)), !lines.length ? /* @__PURE__ */ jsx("li", {
									className: "text-sm text-muted-foreground",
									children: "Your bag is empty."
								}) : null]
							}),
							/* @__PURE__ */ jsxs("dl", {
								className: "mt-6 space-y-3 border-t border-border/70 pt-5 text-sm",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "text-muted-foreground",
											children: "Subtotal"
										}), /* @__PURE__ */ jsx("dd", { children: inr(subtotal) })]
									}),
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
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between border-t border-border/70 pt-4",
										children: [/* @__PURE__ */ jsx("dt", { children: "Total payable" }), /* @__PURE__ */ jsx("dd", {
											className: "font-serif text-xl",
											children: inr(total)
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								size: "lg",
								className: "mt-6 w-full rounded-full tracking-[0.16em] uppercase",
								children: "Continue to payment"
							}),
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "ghost",
								className: "mt-2 w-full rounded-full",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/cart",
									children: "Back to bag"
								})
							})
						]
					})
				})]
			})
		]
	}) });
}
//#endregion
export { Checkout as component };
