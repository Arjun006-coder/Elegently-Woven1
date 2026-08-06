import { S as products, _ as discount, d as useShop, n as Input, p as byId, t as SiteLayout, w as testimonials, x as inr } from "./SiteLayout-DkeX7Cnm.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { a as Stars, i as SectionHeading, n as Eyebrow } from "./Bits-CL0zJp_w.js";
import { t as ProductCard } from "./ProductCard-CIdqp8vc.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { n as Route } from "./router-DuGEhyTP.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Check, ChevronDown, CreditCard, Heart, Minus, Play, Plus, Rotate3d, RotateCcw, Share2, ShieldCheck, ShoppingBag, Sparkles, Store, Truck } from "lucide-react";
import { cva } from "class-variance-authority";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as TabsPrimitive from "@radix-ui/react-tabs";
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/components/ui/progress.tsx
var Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(ProgressPrimitive.Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ jsx(ProgressPrimitive.Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = ProgressPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	className: "flex",
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/tabs.tsx
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsPrimitive.Content.displayName;
//#endregion
//#region src/routes/product.$id.tsx?tsr-split=component
var colors = [
	"Maroon",
	"Emerald",
	"Champagne",
	"Ivory"
];
var fabrics = [
	"Pure Silk",
	"Silk Cotton",
	"Tissue"
];
function ProductPage() {
	const { product } = Route.useLoaderData();
	const { addToCart, toggleWishlist, wishlist, markViewed, recent } = useShop();
	const [active, setActive] = useState(0);
	const [qty, setQty] = useState(1);
	const [color, setColor] = useState(product.color);
	const [fabric, setFabric] = useState(fabrics[0]);
	const [pin, setPin] = useState("");
	const [pinResult, setPinResult] = useState(null);
	const [zoom, setZoom] = useState(false);
	useEffect(() => {
		markViewed(product.id);
		setActive(0);
		setQty(1);
	}, [product.id, markViewed]);
	const similar = products.filter((p) => p.weave === product.weave && p.id !== product.id).slice(0, 4);
	const recommended = products.filter((p) => p.id !== product.id).slice(4, 8);
	const bundle = products.filter((p) => p.id !== product.id).slice(1, 3);
	const bundleTotal = bundle.reduce((n, p) => n + p.price, product.price);
	const recentItems = recent.flatMap((id) => byId(id) && id !== product.id ? [byId(id)] : []).slice(0, 4);
	const spec = [
		["Weave", product.weave],
		["Fabric", product.fabric],
		["Pattern", product.pattern],
		["Border", product.border],
		["Colour", product.color],
		["Occasion", product.occasion],
		["Length", product.length],
		["Blouse", product.blouse ? "Included (0.8 m unstitched)" : "Not included"],
		["Zari", "Certified half-fine silver zari"],
		["Wash care", "Dry clean only"],
		["Weaver", "Kamakshi Iyer, Loom #14"],
		["Country of origin", "India"]
	];
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsxs("nav", {
			"aria-label": "Breadcrumb",
			className: "mx-auto max-w-7xl px-5 pt-6 text-xs text-muted-foreground sm:px-8",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "hover:text-foreground",
					children: "Home"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "mx-2",
					children: "/"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/collections",
					className: "hover:text-foreground",
					children: "Collections"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "mx-2",
					children: "/"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "text-foreground",
					children: product.name
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_1fr]",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "relative overflow-hidden rounded-3xl bg-secondary/40",
					onMouseEnter: () => setZoom(true),
					onMouseLeave: () => setZoom(false),
					children: [
						/* @__PURE__ */ jsx(motion.img, {
							src: product.images[active],
							alt: product.name,
							width: 1024,
							height: 1280,
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							className: cn("aspect-4/5 w-full object-cover transition-transform duration-700", zoom && "scale-125")
						}, active),
						/* @__PURE__ */ jsxs("div", {
							className: "absolute top-4 left-4 flex flex-col gap-2",
							children: [discount(product) > 0 ? /* @__PURE__ */ jsxs(Badge, {
								className: "rounded-full",
								children: [discount(product), "% off"]
							}) : null, product.badge ? /* @__PURE__ */ jsx(Badge, {
								variant: "secondary",
								className: "rounded-full",
								children: product.badge
							}) : null]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "absolute right-4 bottom-4 flex gap-2",
							children: [/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => toast("360° viewer coming soon"),
								className: "flex items-center gap-2 rounded-full glass px-3 py-2 text-xs",
								children: [/* @__PURE__ */ jsx(Rotate3d, { className: "h-4 w-4" }), " 360° view"]
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => toast("Drape film coming soon"),
								className: "flex items-center gap-2 rounded-full glass px-3 py-2 text-xs",
								children: [/* @__PURE__ */ jsx(Play, { className: "h-4 w-4" }), " Video"]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 grid grid-cols-4 gap-3",
					children: product.images.map((img, i) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setActive(i),
						"aria-label": `View image ${i + 1}`,
						className: cn("overflow-hidden rounded-xl border transition-colors", i === active ? "border-gold" : "border-transparent"),
						children: /* @__PURE__ */ jsx("img", {
							src: img,
							alt: "",
							loading: "lazy",
							className: "aspect-4/5 w-full object-cover"
						})
					}, i))
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-center text-xs text-muted-foreground",
					children: "Hover the image to zoom"
				})
			] }), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs(Eyebrow, { children: [
					product.weave,
					" · ",
					product.fabric
				] }),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-3 text-3xl font-light sm:text-4xl",
					children: product.name
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(Stars, { value: product.rating }),
								" ",
								product.rating
							]
						}),
						/* @__PURE__ */ jsx("span", { children: "·" }),
						/* @__PURE__ */ jsxs("a", {
							href: "#reviews",
							className: "hover:text-foreground",
							children: [product.reviews, " reviews"]
						}),
						/* @__PURE__ */ jsx("span", { children: "·" }),
						product.stock > 0 ? product.stock < 5 ? /* @__PURE__ */ jsxs("span", {
							className: "text-red-500 font-medium",
							children: [
								"Only ",
								product.stock,
								" left in stock — order soon!"
							]
						}) : /* @__PURE__ */ jsxs("span", { children: [product.stock, " in stock"] }) : /* @__PURE__ */ jsx("span", {
							className: "text-red-600 font-bold",
							children: "Sold out"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap items-baseline gap-3",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-3xl",
							children: inr(product.price)
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground line-through",
							children: inr(product.mrp)
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-primary",
							children: [discount(product), "% off"]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "w-full text-xs text-muted-foreground",
							children: "Inclusive of all taxes · GST invoice available"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
							className: "text-sm",
							children: ["Colour · ", /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: color
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [product.color, ...colors.filter((c) => c !== product.color)].map((c) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setColor(c),
								className: cn("rounded-full border px-4 py-2 text-xs transition-colors", color === c ? "border-gold bg-accent" : "border-border hover:border-gold"),
								children: c
							}, c))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
							className: "text-sm",
							children: ["Fabric · ", /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: fabric
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: fabrics.map((f) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setFabric(f),
								className: cn("rounded-full border px-4 py-2 text-xs transition-colors", fabric === f ? "border-gold bg-accent" : "border-border hover:border-gold"),
								children: f
							}, f))
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-border/70 p-4 text-sm",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-gold" }), " Blouse & size"]
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground",
								children: [
									product.blouse ? "0.8 m unstitched blouse piece included. Free size — stitching available up to 44\" bust." : "Blouse not included. Add matching blouse fabric at checkout.",
									" ",
									"Saree length ",
									product.length,
									". Fall & pico at ₹299."
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center rounded-full border border-border",
									children: [
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setQty((q) => Math.max(1, q - 1)),
											"aria-label": "Decrease",
											className: "grid h-10 w-10 place-items-center",
											children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ jsx("span", {
											className: "w-8 text-center text-sm",
											children: qty
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setQty((q) => q + 1),
											"aria-label": "Increase",
											className: "grid h-10 w-10 place-items-center",
											children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" })
										})
									]
								}),
								/* @__PURE__ */ jsxs(Button, {
									size: "lg",
									className: "flex-1 rounded-full tracking-[0.16em] uppercase",
									disabled: product.stock === 0,
									onClick: () => addToCart(product.id, qty),
									children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }), " Add to bag"]
								}),
								/* @__PURE__ */ jsx(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									className: "flex-1 rounded-full tracking-[0.16em] uppercase",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/checkout",
										children: "Buy now"
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-6 text-xs",
							children: [/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => toggleWishlist(product.id),
								className: "flex items-center gap-2 hover:text-primary",
								children: [/* @__PURE__ */ jsx(Heart, { className: cn("h-4 w-4", wishlist.includes(product.id) && "fill-primary text-primary") }), wishlist.includes(product.id) ? "Saved" : "Add to wishlist"]
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => toast.success("Link copied to clipboard"),
								className: "flex items-center gap-2 hover:text-primary",
								children: [/* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }), " Share"]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl bg-secondary/50 p-5",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm",
									children: "Delivery & services"
								}),
								/* @__PURE__ */ jsxs("form", {
									className: "mt-3 flex gap-2",
									onSubmit: (e) => {
										e.preventDefault();
										setPinResult(/^\d{6}$/.test(pin) ? `Delivers by ${new Date(Date.now() + 2592e5).toLocaleDateString("en-IN", {
											day: "numeric",
											month: "short"
										})} · COD available` : "Enter a valid 6-digit pincode");
									},
									children: [/* @__PURE__ */ jsx(Input, {
										value: pin,
										onChange: (e) => setPin(e.target.value),
										placeholder: "Enter pincode",
										"aria-label": "Pincode",
										className: "rounded-full",
										maxLength: 6
									}), /* @__PURE__ */ jsx(Button, {
										type: "submit",
										variant: "outline",
										className: "rounded-full px-6",
										children: "Check"
									})]
								}),
								pinResult ? /* @__PURE__ */ jsx("p", {
									className: "mt-3 text-xs text-jade",
									children: pinResult
								}) : null,
								/* @__PURE__ */ jsxs("ul", {
									className: "mt-4 space-y-2 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Truck, { className: "h-3.5 w-3.5 text-gold" }), " Free insured shipping above ₹2,999"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5 text-gold" }), " 7-day return · 15-day replacement"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx(CreditCard, { className: "h-3.5 w-3.5 text-gold" }),
												" EMI from ",
												inr(Math.round(product.price / 6)),
												"/mo · 6 months no cost"
											]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-gold" }), " Silk Mark certified · loom certificate included"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Store, { className: "h-3.5 w-3.5 text-gold" }), " Sold by ElegantlyWoven Retail LLP · 4.8★ seller"]
										})
									]
								})
							]
						})
					]
				})
			] })]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8",
			children: /* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "details",
				className: "mt-10",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "flex-wrap",
						children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "details",
								children: "Description"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "specs",
								children: "Specifications"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "care",
								children: "Care"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "qa",
								children: "Q & A"
							})
						]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "details",
						className: "max-w-3xl pt-6 text-sm leading-relaxed text-muted-foreground",
						children: [/* @__PURE__ */ jsx("p", { children: product.description }), /* @__PURE__ */ jsxs("p", {
							className: "mt-4",
							children: [
								"The pallu carries a traditional ",
								product.pattern.toLowerCase(),
								" motif, framed by a ",
								product.border.toLowerCase(),
								" border. Ideal for ",
								product.occasion.toLowerCase(),
								" wear, styled with temple jewellery and a low bun."
							]
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "specs",
						className: "pt-6",
						children: /* @__PURE__ */ jsx("dl", {
							className: "grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2",
							children: spec.map(([k, v]) => /* @__PURE__ */ jsxs("div", {
								className: "bg-card px-4 py-3",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "text-xs text-muted-foreground",
									children: k
								}), /* @__PURE__ */ jsx("dd", {
									className: "mt-1 text-sm",
									children: v
								})]
							}, k))
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "care",
						className: "max-w-3xl pt-6 text-sm text-muted-foreground",
						children: /* @__PURE__ */ jsxs("ul", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Dry clean only for the first three washes." }),
								/* @__PURE__ */ jsx("li", { children: "Store wrapped in muslin; refold along a new line every three months." }),
								/* @__PURE__ */ jsx("li", { children: "Never spray perfume directly on zari." }),
								/* @__PURE__ */ jsx("li", { children: "Keep away from direct sunlight to preserve the dye." })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "qa",
						className: "max-w-3xl pt-6",
						children: /* @__PURE__ */ jsx(Accordion, {
							type: "single",
							collapsible: true,
							children: [
								["Is the zari pure silver?", "It is certified half-fine zari — silver coated with gold, tested at our Kanchipuram unit."],
								["Will the colour bleed?", "No. All our silks are pre-treated; the first dry clean is on us if it does."],
								["Can I get a matching blouse stitched?", "Yes, add stitching at checkout and share measurements over WhatsApp."]
							].map(([q, a]) => /* @__PURE__ */ jsxs(AccordionItem, {
								value: q,
								children: [/* @__PURE__ */ jsx(AccordionTrigger, {
									className: "text-left text-sm",
									children: q
								}), /* @__PURE__ */ jsx(AccordionContent, {
									className: "text-sm text-muted-foreground",
									children: a
								})]
							}, q))
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			id: "reviews",
			className: "mx-auto max-w-7xl px-5 py-16 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Reviews",
				title: `${product.reviews} customer reviews`
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-10 lg:grid-cols-[18rem_1fr]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border/70 p-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-serif text-5xl",
							children: product.rating
						}),
						/* @__PURE__ */ jsx(Stars, {
							value: product.rating,
							className: "mt-2"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"Based on ",
								product.reviews,
								" verified purchases"
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-6 space-y-3",
							children: [
								5,
								4,
								3,
								2,
								1
							].map((star, i) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 text-xs",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "w-3",
										children: star
									}),
									/* @__PURE__ */ jsx(Progress, {
										value: [
											78,
											14,
											5,
											2,
											1
										][i],
										className: "h-1.5"
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "w-8 text-right text-muted-foreground",
										children: [[
											78,
											14,
											5,
											2,
											1
										][i], "%"]
									})
								]
							}, star))
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							className: "mt-6 w-full rounded-full",
							onClick: () => toast("Review form coming soon"),
							children: "Write a review"
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-6",
					children: testimonials.map((t) => /* @__PURE__ */ jsxs("article", {
						className: "border-b border-border/70 pb-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "grid h-9 w-9 place-items-center rounded-full bg-secondary text-xs",
									children: t.name[0]
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm",
									children: t.name
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-xs text-muted-foreground",
									children: [t.city, " · Verified purchase"]
								})] }),
								/* @__PURE__ */ jsx(Stars, {
									value: t.rating,
									className: "ml-auto"
								})
							]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: t.text
						})]
					}, t.name))
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 pb-16 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Save more",
				title: "Frequently bought together"
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-6 rounded-3xl border border-border/70 p-6 lg:flex-row lg:items-center",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex flex-1 flex-wrap items-center gap-4",
					children: [product, ...bundle].map((p, i) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [i > 0 ? /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 text-muted-foreground" }) : null, /* @__PURE__ */ jsxs("div", {
							className: "w-28",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: p.images[0],
									alt: "",
									loading: "lazy",
									className: "aspect-4/5 w-full rounded-xl object-cover"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 truncate text-xs",
									children: p.name
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: inr(p.price)
								})
							]
						})]
					}, p.id))
				}), /* @__PURE__ */ jsxs("div", {
					className: "shrink-0 lg:text-right",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Bundle total"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-serif text-2xl",
							children: inr(Math.round(bundleTotal * .92))
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-jade",
							children: "Save 8% on this set"
						}),
						/* @__PURE__ */ jsxs(Button, {
							className: "mt-3 rounded-full px-7",
							onClick: () => [product, ...bundle].forEach((p) => addToCart(p.id)),
							children: [/* @__PURE__ */ jsx(Check, { className: "mr-2 h-4 w-4" }), " Add all three"]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 pb-16 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Complete the look",
				title: "Similar sarees",
				action: {
					label: "View all",
					to: "/collections"
				}
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4",
				children: (similar.length ? similar : recommended).map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
			})]
		}),
		recentItems.length ? /* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 pb-20 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Recently viewed",
				title: "Pick up where you left off"
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4",
				children: recentItems.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
			})]
		}) : null
	] });
}
//#endregion
export { ProductPage as component };
