import { S as products, _ as discount, a as SheetTitle, c as DialogContent, d as useShop, f as BRAND, i as SheetContent, l as DialogTitle, m as collectionBySlug, o as SheetTrigger, p as byId, r as Sheet, s as Dialog, t as SiteLayout, u as ShopProvider, v as filterGroups, x as inr } from "./SiteLayout-DkeX7Cnm.js";
import { n as getLiveProducts, t as getLiveProductBySlug } from "./products-CfQGF9KC.js";
import { i as requireAuth, r as requireAdmin } from "./auth-DZmPN7vG.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { a as Stars, r as PageHero } from "./Bits-CL0zJp_w.js";
import { n as ProductCardSkeleton, t as ProductCard } from "./ProductCard-CIdqp8vc.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, notFound, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { z } from "zod";
import { Check, ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SelectPrimitive from "@radix-ui/react-select";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-CX5IKeUG.css";
//#endregion
//#region src/lib/error-reporting.ts
/**
* Captures and logs application errors. Safe to call from both
* server and client environments. In production, wire this up to
* your chosen observability provider (Sentry, Datadog, etc.).
*/
function reportError(error, context = {}) {
	if (typeof window === "undefined") {
		console.error("[ElegantlyWoven Error]", describeError(error), context);
		return;
	}
	console.error("[ElegantlyWoven Error]", {
		message: getErrorMessage(error),
		stack: error instanceof Error ? error.stack : void 0,
		route: window.location.pathname,
		...context
	});
}
function getErrorMessage(error) {
	if (error instanceof Response) return `HTTP ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	return String(error);
}
function describeError(error) {
	if (error instanceof Error) return `${error.name}: ${error.message}\n${error.stack ?? ""}`;
	return String(error);
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/components/layout/LoadingScreen.tsx
function LoadingScreen() {
	const [show, setShow] = useState(true);
	useEffect(() => {
		const t = setTimeout(() => setShow(false), 1300);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ jsx(AnimatePresence, { children: show ? /* @__PURE__ */ jsx(motion.div, {
		exit: { opacity: 0 },
		transition: {
			duration: .6,
			ease: "easeInOut"
		},
		className: "fixed inset-0 z-[100] grid place-items-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx(motion.p, {
					initial: {
						opacity: 0,
						y: 12,
						letterSpacing: "0.4em"
					},
					animate: {
						opacity: 1,
						y: 0,
						letterSpacing: "0.18em"
					},
					transition: {
						duration: 1,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "font-serif text-3xl sm:text-4xl",
					children: BRAND.name
				}),
				/* @__PURE__ */ jsx(motion.div, {
					initial: { width: 0 },
					animate: { width: "9rem" },
					transition: {
						duration: 1.1,
						ease: "easeInOut"
					},
					className: "mx-auto mt-5 h-px bg-gold"
				}),
				/* @__PURE__ */ jsx(motion.p, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: { delay: .4 },
					className: "eyebrow mt-5",
					children: "Handloom Atelier"
				})
			]
		})
	}) : null });
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	useEffect(() => {
		reportError(error, { boundary: "root_error_boundary" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "An unexpected error occurred. Please try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$41 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ElegantlyWoven — Premium Women's Fashion by LumaScale" },
			{
				name: "description",
				content: "ElegantlyWoven is your destination for premium women's fashion — curated sarees, kurtis, dresses, accessories and more. Pan-India delivery. Powered by LumaScale."
			},
			{
				name: "author",
				content: "LumaScale"
			},
			{
				name: "generator",
				content: "ElegantlyWoven Platform"
			},
			{
				property: "og:site_name",
				content: "ElegantlyWoven"
			},
			{
				property: "og:title",
				content: "ElegantlyWoven — Premium Women's Fashion"
			},
			{
				property: "og:description",
				content: "Curated women's fashion, delivered with elegance."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "ElegantlyWoven — Premium Women's Fashion"
			},
			{
				name: "twitter:description",
				content: "Curated women's fashion, delivered with elegance."
			},
			{
				name: "theme-color",
				content: "#7c3d2b"
			},
			{
				name: "robots",
				content: "index, follow"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "OnlineStore",
				name: "ElegantlyWoven",
				description: "Premium women's fashion e-commerce platform",
				url: "https://elegantlywoven.com",
				founder: {
					"@type": "Organization",
					name: "LumaScale"
				},
				potentialAction: {
					"@type": "SearchAction",
					target: "https://elegantlywoven.com/search?q={search_term_string}",
					"query-input": "required name=search_term_string"
				}
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$41.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs(ShopProvider, { children: [
			/* @__PURE__ */ jsx(LoadingScreen, {}),
			/* @__PURE__ */ jsx(Outlet, {}),
			/* @__PURE__ */ jsx(Toaster$1, { position: "top-center" })
		] })
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$40 = () => import("./routes-zlPRGL0R.js");
var Route$40 = createFileRoute("/")({
	loader: async () => {
		return { liveProducts: await getLiveProducts(12) };
	},
	component: lazyRouteComponent($$splitComponentImporter$40, "component"),
	head: () => ({
		meta: [
			{ title: "ElegantlyWoven — Luxury Handloom Sarees from Bengaluru" },
			{
				name: "description",
				content: "Shop certified Kanjivaram, Banarasi, silk, cotton and linen sarees at ElegantlyWoven. Weaver-direct pricing, bridal styling and pan-India delivery in 2–4 days."
			},
			{
				property: "og:title",
				content: "ElegantlyWoven — Luxury Handloom Sarees"
			},
			{
				property: "og:description",
				content: "Handpicked heirloom sarees from Kanchipuram, Banaras and beyond."
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	})
});
//#endregion
//#region src/routes/account.tsx
var $$splitComponentImporter$39 = () => import("./account-CbbY4Mlw.js");
var Route$39 = createFileRoute("/account")({
	beforeLoad: async () => {
		await requireAuth();
	},
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
//#endregion
//#region src/routes/admin.tsx
var $$splitComponentImporter$38 = () => import("./admin-DEqLrDnZ.js");
var Route$38 = createFileRoute("/admin")({
	beforeLoad: async () => {
		await requireAdmin();
	},
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
//#endregion
//#region src/routes/auth.tsx
var $$splitComponentImporter$37 = () => import("./auth-C1lg44Y4.js");
var authSearchSchema = z.object({ redirect: z.string().optional() });
var Route$37 = createFileRoute("/auth")({
	validateSearch: authSearchSchema,
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
//#endregion
//#region src/components/shop/QuickView.tsx
function QuickView({ product, onOpenChange }) {
	const { addToCart } = useShop();
	return /* @__PURE__ */ jsx(Dialog, {
		open: !!product,
		onOpenChange,
		children: /* @__PURE__ */ jsx(DialogContent, {
			className: "max-w-3xl overflow-hidden p-0",
			children: product ? /* @__PURE__ */ jsxs("div", {
				className: "grid gap-0 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsx("img", {
					src: product.images[0],
					alt: product.name,
					loading: "lazy",
					className: "h-64 w-full object-cover sm:h-full"
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-7",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: product.weave
						}),
						/* @__PURE__ */ jsx(DialogTitle, {
							className: "mt-3 font-serif text-2xl font-light",
							children: product.name
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx(Stars, { value: product.rating }),
								" ",
								product.rating,
								" · ",
								product.reviews,
								" reviews"
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex items-baseline gap-3",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-2xl",
									children: inr(product.price)
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-sm text-muted-foreground line-through",
									children: inr(product.mrp)
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-sm text-primary",
									children: [discount(product), "% off"]
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: product.description
						}),
						/* @__PURE__ */ jsxs("dl", {
							className: "mt-5 grid grid-cols-2 gap-y-2 text-xs",
							children: [
								/* @__PURE__ */ jsx("dt", {
									className: "text-muted-foreground",
									children: "Fabric"
								}),
								/* @__PURE__ */ jsx("dd", { children: product.fabric }),
								/* @__PURE__ */ jsx("dt", {
									className: "text-muted-foreground",
									children: "Occasion"
								}),
								/* @__PURE__ */ jsx("dd", { children: product.occasion }),
								/* @__PURE__ */ jsx("dt", {
									className: "text-muted-foreground",
									children: "Blouse"
								}),
								/* @__PURE__ */ jsx("dd", { children: product.blouse ? "Included (unstitched)" : "Not included" }),
								/* @__PURE__ */ jsx("dt", {
									className: "text-muted-foreground",
									children: "Length"
								}),
								/* @__PURE__ */ jsx("dd", { children: product.length })
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-7 flex gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								className: "flex-1 rounded-full",
								onClick: () => addToCart(product.id),
								children: "Add to bag"
							}), /* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "outline",
								className: "flex-1 rounded-full",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/product/$id",
									params: { id: product.id },
									children: "Full details"
								})
							})]
						})
					]
				})]
			}) : null
		})
	});
}
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/slider.tsx
var Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(SliderPrimitive.Root, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ jsx(SliderPrimitive.Track, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = SliderPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/shop/CollectionView.tsx
var sorts = [
	{
		value: "popular",
		label: "Popularity"
	},
	{
		value: "newest",
		label: "Newest first"
	},
	{
		value: "price-asc",
		label: "Price: low to high"
	},
	{
		value: "price-desc",
		label: "Price: high to low"
	},
	{
		value: "discount",
		label: "Discount"
	},
	{
		value: "rating",
		label: "Customer rating"
	}
];
function FilterPanel({ selected, toggle, price, setPrice, inStock, setInStock, clear }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "Filters"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: clear,
					className: "text-xs text-primary hover:underline",
					children: "Clear all"
				})]
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-sm",
					children: "Price"
				}),
				/* @__PURE__ */ jsx(Slider, {
					className: "mt-4",
					value: price,
					min: 2e3,
					max: 8e4,
					step: 1e3,
					onValueChange: setPrice,
					"aria-label": "Price range"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						inr(price[0] ?? 0),
						" — ",
						inr(price[1] ?? 0)
					]
				})
			] }),
			/* @__PURE__ */ jsxs("label", {
				className: "flex cursor-pointer items-center gap-3 text-sm",
				children: [/* @__PURE__ */ jsx(Checkbox, {
					checked: inStock,
					onCheckedChange: (v) => setInStock(!!v)
				}), "In stock only"]
			}),
			filterGroups.map((g) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm",
				children: g.label
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-3 space-y-2.5",
				children: g.options.map((o) => /* @__PURE__ */ jsxs("label", {
					className: "flex cursor-pointer items-center gap-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ jsx(Checkbox, {
						checked: (selected[g.key] ?? []).includes(o),
						onCheckedChange: () => toggle(g.key, o)
					}), o]
				}, o))
			})] }, g.key))
		]
	});
}
function CollectionView({ source, pageSize = 8 }) {
	const base = source ?? products;
	const [selected, setSelected] = useState({});
	const [price, setPrice] = useState([2e3, 8e4]);
	const [inStock, setInStock] = useState(false);
	const [sort, setSort] = useState("popular");
	const [visible, setVisible] = useState(pageSize);
	const [loading, setLoading] = useState(true);
	const [quick, setQuick] = useState(null);
	useEffect(() => {
		setLoading(true);
		const t = setTimeout(() => setLoading(false), 550);
		return () => clearTimeout(t);
	}, [base]);
	const toggle = (key, value) => setSelected((s) => {
		const cur = s[key] ?? [];
		return {
			...s,
			[key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
		};
	});
	const filtered = useMemo(() => {
		const lo = price[0] ?? 0;
		const hi = price[1] ?? Infinity;
		const sorted = [...base.filter((p) => {
			if (p.price < lo || p.price > hi) return false;
			if (inStock && p.stock === 0) return false;
			return Object.entries(selected).every(([key, vals]) => {
				if (!vals.length) return true;
				const field = p[key] ?? "";
				return vals.includes(field);
			});
		})];
		if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
		if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
		if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
		if (sort === "discount") sorted.sort((a, b) => b.mrp - b.price - (a.mrp - a.price));
		if (sort === "newest") sorted.reverse();
		if (sort === "popular") sorted.sort((a, b) => b.reviews - a.reviews);
		return sorted;
	}, [
		base,
		selected,
		price,
		inStock,
		sort
	]);
	const activeChips = Object.entries(selected).flatMap(([k, vals]) => vals.map((v) => ({
		k,
		v
	})));
	const clear = () => {
		setSelected({});
		setPrice([2e3, 8e4]);
		setInStock(false);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl px-5 py-12 sm:px-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-10 lg:flex-row",
			children: [/* @__PURE__ */ jsx("aside", {
				className: "hidden w-64 shrink-0 lg:block",
				children: /* @__PURE__ */ jsx("div", {
					className: "sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2 no-scrollbar",
					children: /* @__PURE__ */ jsx(FilterPanel, {
						selected,
						toggle,
						price,
						setPrice,
						inStock,
						setInStock,
						clear
					})
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 pb-4",
						children: [/* @__PURE__ */ jsx("p", {
							className: "truncate text-sm text-muted-foreground",
							children: loading ? "Loading sarees…" : `${filtered.length} sarees`
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									className: "rounded-full lg:hidden",
									children: [/* @__PURE__ */ jsx(SlidersHorizontal, { className: "mr-2 h-3.5 w-3.5" }), " Filters"]
								})
							}), /* @__PURE__ */ jsxs(SheetContent, {
								side: "left",
								className: "w-[19rem] overflow-y-auto",
								children: [/* @__PURE__ */ jsx(SheetTitle, {
									className: "px-5 pt-5 font-serif text-xl",
									children: "Refine"
								}), /* @__PURE__ */ jsx("div", {
									className: "p-5",
									children: /* @__PURE__ */ jsx(FilterPanel, {
										selected,
										toggle,
										price,
										setPrice,
										inStock,
										setInStock,
										clear
									})
								})]
							})] }), /* @__PURE__ */ jsxs(Select, {
								value: sort,
								onValueChange: setSort,
								children: [/* @__PURE__ */ jsx(SelectTrigger, {
									className: "w-44 rounded-full",
									"aria-label": "Sort by",
									children: /* @__PURE__ */ jsx(SelectValue, {})
								}), /* @__PURE__ */ jsx(SelectContent, { children: sorts.map((s) => /* @__PURE__ */ jsx(SelectItem, {
									value: s.value,
									children: s.label
								}, s.value)) })]
							})]
						})]
					}),
					activeChips.length ? /* @__PURE__ */ jsx("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: activeChips.map((c) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => toggle(c.k, c.v),
							className: "flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs",
							children: [
								c.v,
								" ",
								/* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
							]
						}, `${c.k}-${c.v}`))
					}) : null,
					loading ? /* @__PURE__ */ jsx("div", {
						className: "mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4",
						children: Array.from({ length: pageSize }).map((_, i) => /* @__PURE__ */ jsx(ProductCardSkeleton, {}, i))
					}) : filtered.length ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
						className: "mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4",
						children: filtered.slice(0, visible).map((p) => /* @__PURE__ */ jsx(ProductCard, {
							product: p,
							onQuickView: setQuick
						}, p.id))
					}), visible < filtered.length ? /* @__PURE__ */ jsxs("div", {
						className: "mt-14 flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							className: "rounded-full px-8",
							onClick: () => setVisible((v) => v + pageSize),
							children: "Load more"
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Showing ",
								Math.min(visible, filtered.length),
								" of ",
								filtered.length
							]
						})]
					}) : null] }) : /* @__PURE__ */ jsxs("div", {
						className: "py-24 text-center",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "font-serif text-2xl",
								children: "No sarees match these filters"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Try widening your price range or clearing a filter."
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "outline",
								className: "mt-6 rounded-full",
								onClick: clear,
								children: "Clear filters"
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ jsx(QuickView, {
			product: quick,
			onOpenChange: (v) => !v && setQuick(null)
		})]
	});
}
//#endregion
//#region src/components/shop/CollectionPage.tsx
function CollectionPage({ slug }) {
	const meta = collectionBySlug(slug);
	const { liveProducts } = useShop();
	let items = liveProducts;
	if (slug !== "collections") items = liveProducts.filter((p) => p.category?.toLowerCase() === slug.toLowerCase() || p.slug?.includes(slug));
	const list = items;
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
				/* @__PURE__ */ jsx("span", {
					className: "text-foreground",
					children: meta?.title ?? slug
				})
			]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-6",
			children: /* @__PURE__ */ jsx(PageHero, {
				compact: true,
				eyebrow: meta?.eyebrow,
				title: meta?.title ?? slug,
				description: meta?.description,
				image: meta?.image
			})
		}),
		/* @__PURE__ */ jsx(CollectionView, { source: list })
	] });
}
function collectionHead(slug) {
	const meta = collectionBySlug(slug);
	const title = `${meta?.title ?? slug} — ElegantlyWoven`;
	const description = meta?.description ?? "Handloom sarees at ElegantlyWoven.";
	return () => ({
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:url",
				content: `/${slug}`
			}
		],
		links: [{
			rel: "canonical",
			href: `/${slug}`
		}]
	});
}
//#endregion
//#region src/routes/banarasi.tsx
var $$splitComponentImporter$36 = () => import("./banarasi-0Ze8wQvJ.js");
var Route$36 = createFileRoute("/banarasi")({
	component: lazyRouteComponent($$splitComponentImporter$36, "component"),
	head: collectionHead("banarasi")
});
//#endregion
//#region src/routes/best-sellers.tsx
var $$splitComponentImporter$35 = () => import("./best-sellers-B8JV0JVp.js");
var Route$35 = createFileRoute("/best-sellers")({
	component: lazyRouteComponent($$splitComponentImporter$35, "component"),
	head: collectionHead("best-sellers")
});
//#endregion
//#region src/routes/bridal.tsx
var $$splitComponentImporter$34 = () => import("./bridal-1eHBykSO.js");
var Route$34 = createFileRoute("/bridal")({
	component: lazyRouteComponent($$splitComponentImporter$34, "component"),
	head: collectionHead("bridal")
});
//#endregion
//#region src/routes/cart.tsx
var $$splitComponentImporter$33 = () => import("./cart-OTV4aJRu.js");
var Route$33 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$33, "component"),
	head: () => ({
		meta: [
			{ title: "Your Shopping Bag — ElegantlyWoven" },
			{
				name: "description",
				content: "Review the sarees in your bag, apply a coupon and proceed to secure checkout."
			},
			{
				property: "og:title",
				content: "Your Shopping Bag — ElegantlyWoven"
			},
			{
				property: "og:description",
				content: "Review your saree selection before checkout."
			},
			{
				property: "og:url",
				content: "/cart"
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/cart"
		}]
	})
});
//#endregion
//#region src/routes/categories.tsx
var $$splitComponentImporter$32 = () => import("./categories-CHvQ_OLA.js");
var Route$32 = createFileRoute("/categories")({
	component: lazyRouteComponent($$splitComponentImporter$32, "component"),
	head: () => ({
		meta: [
			{ title: "Shop Saree Categories — ElegantlyWoven" },
			{
				name: "description",
				content: "Browse sarees by weave, fabric and occasion — Kanjivaram, Banarasi, linen, cotton, bridal and more."
			},
			{
				property: "og:title",
				content: "Shop Saree Categories — ElegantlyWoven"
			},
			{
				property: "og:description",
				content: "Find your saree by weave, fabric and occasion."
			},
			{
				property: "og:url",
				content: "/categories"
			}
		],
		links: [{
			rel: "canonical",
			href: "/categories"
		}]
	})
});
//#endregion
//#region src/routes/checkout.tsx
var $$splitComponentImporter$31 = () => import("./checkout-B9Rpfpg1.js");
var Route$31 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$31, "component"),
	head: () => ({
		meta: [
			{ title: "Secure Checkout — ElegantlyWoven" },
			{
				name: "description",
				content: "Confirm your delivery address, slot and gifting options before payment."
			},
			{
				property: "og:title",
				content: "Secure Checkout — ElegantlyWoven"
			},
			{
				property: "og:description",
				content: "Confirm delivery details for your saree order."
			},
			{
				property: "og:url",
				content: "/checkout"
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/checkout"
		}]
	})
});
//#endregion
//#region src/routes/collections.tsx
var $$splitComponentImporter$30 = () => import("./collections-DEaEzxf4.js");
var Route$30 = createFileRoute("/collections")({
	component: lazyRouteComponent($$splitComponentImporter$30, "component"),
	head: collectionHead("collections")
});
//#endregion
//#region src/routes/cotton-sarees.tsx
var $$splitComponentImporter$29 = () => import("./cotton-sarees-ChklzRi6.js");
var Route$29 = createFileRoute("/cotton-sarees")({
	component: lazyRouteComponent($$splitComponentImporter$29, "component"),
	head: collectionHead("cotton-sarees")
});
//#endregion
//#region src/routes/daily-wear.tsx
var $$splitComponentImporter$28 = () => import("./daily-wear-ED3g5pFH.js");
var Route$28 = createFileRoute("/daily-wear")({
	component: lazyRouteComponent($$splitComponentImporter$28, "component"),
	head: collectionHead("daily-wear")
});
//#endregion
//#region src/routes/designer.tsx
var $$splitComponentImporter$27 = () => import("./designer-C6Zi8PlN.js");
var Route$27 = createFileRoute("/designer")({
	component: lazyRouteComponent($$splitComponentImporter$27, "component"),
	head: collectionHead("designer")
});
//#endregion
//#region src/routes/festival.tsx
var $$splitComponentImporter$26 = () => import("./festival-BmEtzjMD.js");
var Route$26 = createFileRoute("/festival")({
	component: lazyRouteComponent($$splitComponentImporter$26, "component"),
	head: collectionHead("festival")
});
//#endregion
//#region src/routes/handloom.tsx
var $$splitComponentImporter$25 = () => import("./handloom-CC-iIIu8.js");
var Route$25 = createFileRoute("/handloom")({
	component: lazyRouteComponent($$splitComponentImporter$25, "component"),
	head: collectionHead("handloom")
});
//#endregion
//#region src/routes/kanjivaram.tsx
var $$splitComponentImporter$24 = () => import("./kanjivaram-Du-BydMG.js");
var Route$24 = createFileRoute("/kanjivaram")({
	component: lazyRouteComponent($$splitComponentImporter$24, "component"),
	head: collectionHead("kanjivaram")
});
//#endregion
//#region src/routes/linen.tsx
var $$splitComponentImporter$23 = () => import("./linen-GhREfIPQ.js");
var Route$23 = createFileRoute("/linen")({
	component: lazyRouteComponent($$splitComponentImporter$23, "component"),
	head: collectionHead("linen")
});
//#endregion
//#region src/routes/new-arrivals.tsx
var $$splitComponentImporter$22 = () => import("./new-arrivals-BoGfelgG.js");
var Route$22 = createFileRoute("/new-arrivals")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: collectionHead("new-arrivals")
});
//#endregion
//#region src/routes/office-wear.tsx
var $$splitComponentImporter$21 = () => import("./office-wear-CdYlCHv9.js");
var Route$21 = createFileRoute("/office-wear")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: collectionHead("office-wear")
});
//#endregion
//#region src/routes/order-success.tsx
var $$splitComponentImporter$20 = () => import("./order-success-DG_L011u.js");
var Route$20 = createFileRoute("/order-success")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => ({
		meta: [
			{ title: "Order Confirmed — ElegantlyWoven" },
			{
				name: "description",
				content: "Your saree order is confirmed. Track your parcel or download the invoice."
			},
			{
				property: "og:title",
				content: "Order Confirmed — ElegantlyWoven"
			},
			{
				property: "og:description",
				content: "Thank you for your order at ElegantlyWoven."
			},
			{
				property: "og:url",
				content: "/order-success"
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/order-success"
		}]
	})
});
//#endregion
//#region src/routes/party-wear.tsx
var $$splitComponentImporter$19 = () => import("./party-wear-DOr2RLne.js");
var Route$19 = createFileRoute("/party-wear")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: collectionHead("party-wear")
});
//#endregion
//#region src/routes/payment.tsx
var $$splitComponentImporter$18 = () => import("./payment-CuwZbxel.js");
var Route$18 = createFileRoute("/payment")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({
		meta: [
			{ title: "Payment — ElegantlyWoven" },
			{
				name: "description",
				content: "Pay securely by UPI, card, netbanking, wallet or cash on delivery."
			},
			{
				property: "og:title",
				content: "Payment — ElegantlyWoven"
			},
			{
				property: "og:description",
				content: "Secure payment options for your saree order."
			},
			{
				property: "og:url",
				content: "/payment"
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/payment"
		}]
	})
});
//#endregion
//#region src/routes/payment-failed.tsx
var $$splitComponentImporter$17 = () => import("./payment-failed-rMoIrSi0.js");
var Route$17 = createFileRoute("/payment-failed")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({
		meta: [
			{ title: "Payment Failed — ElegantlyWoven" },
			{
				name: "description",
				content: "Your payment could not be completed. Retry with another method or contact support."
			},
			{
				property: "og:title",
				content: "Payment Failed — ElegantlyWoven"
			},
			{
				property: "og:description",
				content: "Retry your payment or reach our support team."
			},
			{
				property: "og:url",
				content: "/payment-failed"
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/payment-failed"
		}]
	})
});
//#endregion
//#region src/routes/sale.tsx
var $$splitComponentImporter$16 = () => import("./sale-DOLEQ-uB.js");
var Route$16 = createFileRoute("/sale")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: collectionHead("sale")
});
//#endregion
//#region src/routes/silk-sarees.tsx
var $$splitComponentImporter$15 = () => import("./silk-sarees-DFYOkQaY.js");
var Route$15 = createFileRoute("/silk-sarees")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: collectionHead("silk-sarees")
});
//#endregion
//#region src/routes/track-order.tsx
var $$splitComponentImporter$14 = () => import("./track-order-BWsE0Xkp.js");
var Route$14 = createFileRoute("/track-order")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
//#endregion
//#region src/routes/trending.tsx
var $$splitComponentImporter$13 = () => import("./trending-BXJeaxvc.js");
var Route$13 = createFileRoute("/trending")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: collectionHead("trending")
});
//#endregion
//#region src/routes/wedding.tsx
var $$splitComponentImporter$12 = () => import("./wedding-4ow4aJjV.js");
var Route$12 = createFileRoute("/wedding")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: collectionHead("wedding")
});
//#endregion
//#region src/routes/wishlist.tsx
var $$splitComponentImporter$11 = () => import("./wishlist-NM4TDdlE.js");
var Route$11 = createFileRoute("/wishlist")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({
		meta: [
			{ title: "Your Wishlist — ElegantlyWoven" },
			{
				name: "description",
				content: "The sarees you saved for later, ready to move into your bag."
			},
			{
				property: "og:title",
				content: "Your Wishlist — ElegantlyWoven"
			},
			{
				property: "og:description",
				content: "Sarees you saved at ElegantlyWoven."
			},
			{
				property: "og:url",
				content: "/wishlist"
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/wishlist"
		}]
	})
});
//#endregion
//#region src/routes/account/index.tsx
var $$splitComponentImporter$10 = () => import("./account-Df3rLr62.js");
var Route$10 = createFileRoute("/account/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
//#endregion
//#region src/routes/account/addresses.tsx
var $$splitComponentImporter$9 = () => import("./addresses-CmEI5qzR.js");
var Route$9 = createFileRoute("/account/addresses")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
//#endregion
//#region src/routes/account/notifications.tsx
var $$splitComponentImporter$8 = () => import("./notifications-C5ZcQAhH.js");
var Route$8 = createFileRoute("/account/notifications")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
//#endregion
//#region src/routes/account/orders.tsx
var $$splitComponentImporter$7 = () => import("./orders-L0VH_Q96.js");
var Route$7 = createFileRoute("/account/orders")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/account/payments.tsx
var $$splitComponentImporter$6 = () => import("./payments-COkSWXVP.js");
var Route$6 = createFileRoute("/account/payments")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/admin/index.tsx
var $$splitComponentImporter$5 = () => import("./admin-DY6ka9tN.js");
var Route$5 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/admin/settings.tsx
var $$splitComponentImporter$4 = () => import("./settings-C9evkiJS.js");
var Route$4 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/auth.callback.tsx
var $$splitComponentImporter$3 = () => import("./auth.callback-BnL3um6b.js");
var Route$3 = createFileRoute("/auth/callback")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/product.$id.tsx
var $$splitComponentImporter$2 = () => import("./product._id-Bt7ct_W7.js");
var Route$2 = createFileRoute("/product/$id")({
	loader: async ({ params }) => {
		let product = await getLiveProductBySlug(params.id);
		if (!product) {
			const mockProduct = byId(params.id);
			if (!mockProduct) throw notFound();
			product = mockProduct;
		} else product = {
			...byId("ms-100482"),
			...product,
			mrp: product.originalPrice || product.price * 1.2,
			rating: 4.8,
			reviews: 124,
			stock: 10,
			weave: "Live Product",
			fabric: "Pure Silk"
		};
		return { product };
	},
	head: ({ loaderData, params }) => {
		if (!loaderData) return { meta: [{ title: "Saree unavailable — ElegantlyWoven" }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.product;
		return {
			meta: [
				{ title: `${p.name} — ${p.weave} Saree | ElegantlyWoven` },
				{
					name: "description",
					content: p.description.slice(0, 155)
				},
				{
					property: "og:title",
					content: `${p.name} — ElegantlyWoven`
				},
				{
					property: "og:description",
					content: p.description.slice(0, 155)
				},
				{
					property: "og:type",
					content: "product"
				},
				{
					property: "og:url",
					content: `/product/${params.id}`
				}
			],
			links: [{
				rel: "canonical",
				href: `/product/${params.id}`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/admin/products.index.tsx
var $$splitComponentImporter$1 = () => import("./products.index-CQx3r3nN.js");
var Route$1 = createFileRoute("/admin/products/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/admin/products.new.tsx
var $$splitComponentImporter = () => import("./products.new-BgO5Q8MX.js");
var Route = createFileRoute("/admin/products/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$40.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$41
});
var AccountRoute = Route$39.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$41
});
var AdminRoute = Route$38.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$41
});
var AuthRoute = Route$37.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$41
});
var BanarasiRoute = Route$36.update({
	id: "/banarasi",
	path: "/banarasi",
	getParentRoute: () => Route$41
});
var BestSellersRoute = Route$35.update({
	id: "/best-sellers",
	path: "/best-sellers",
	getParentRoute: () => Route$41
});
var BridalRoute = Route$34.update({
	id: "/bridal",
	path: "/bridal",
	getParentRoute: () => Route$41
});
var CartRoute = Route$33.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$41
});
var CategoriesRoute = Route$32.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$41
});
var CheckoutRoute = Route$31.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$41
});
var CollectionsRoute = Route$30.update({
	id: "/collections",
	path: "/collections",
	getParentRoute: () => Route$41
});
var CottonSareesRoute = Route$29.update({
	id: "/cotton-sarees",
	path: "/cotton-sarees",
	getParentRoute: () => Route$41
});
var DailyWearRoute = Route$28.update({
	id: "/daily-wear",
	path: "/daily-wear",
	getParentRoute: () => Route$41
});
var DesignerRoute = Route$27.update({
	id: "/designer",
	path: "/designer",
	getParentRoute: () => Route$41
});
var FestivalRoute = Route$26.update({
	id: "/festival",
	path: "/festival",
	getParentRoute: () => Route$41
});
var HandloomRoute = Route$25.update({
	id: "/handloom",
	path: "/handloom",
	getParentRoute: () => Route$41
});
var KanjivaramRoute = Route$24.update({
	id: "/kanjivaram",
	path: "/kanjivaram",
	getParentRoute: () => Route$41
});
var LinenRoute = Route$23.update({
	id: "/linen",
	path: "/linen",
	getParentRoute: () => Route$41
});
var NewArrivalsRoute = Route$22.update({
	id: "/new-arrivals",
	path: "/new-arrivals",
	getParentRoute: () => Route$41
});
var OfficeWearRoute = Route$21.update({
	id: "/office-wear",
	path: "/office-wear",
	getParentRoute: () => Route$41
});
var OrderSuccessRoute = Route$20.update({
	id: "/order-success",
	path: "/order-success",
	getParentRoute: () => Route$41
});
var PartyWearRoute = Route$19.update({
	id: "/party-wear",
	path: "/party-wear",
	getParentRoute: () => Route$41
});
var PaymentRoute = Route$18.update({
	id: "/payment",
	path: "/payment",
	getParentRoute: () => Route$41
});
var PaymentFailedRoute = Route$17.update({
	id: "/payment-failed",
	path: "/payment-failed",
	getParentRoute: () => Route$41
});
var SaleRoute = Route$16.update({
	id: "/sale",
	path: "/sale",
	getParentRoute: () => Route$41
});
var SilkSareesRoute = Route$15.update({
	id: "/silk-sarees",
	path: "/silk-sarees",
	getParentRoute: () => Route$41
});
var TrackOrderRoute = Route$14.update({
	id: "/track-order",
	path: "/track-order",
	getParentRoute: () => Route$41
});
var TrendingRoute = Route$13.update({
	id: "/trending",
	path: "/trending",
	getParentRoute: () => Route$41
});
var WeddingRoute = Route$12.update({
	id: "/wedding",
	path: "/wedding",
	getParentRoute: () => Route$41
});
var WishlistRoute = Route$11.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$41
});
var AccountIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AccountRoute
});
var AccountAddressesRoute = Route$9.update({
	id: "/addresses",
	path: "/addresses",
	getParentRoute: () => AccountRoute
});
var AccountNotificationsRoute = Route$8.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AccountRoute
});
var AccountOrdersRoute = Route$7.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AccountRoute
});
var AccountPaymentsRoute = Route$6.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => AccountRoute
});
var AdminIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AuthCallbackRoute = Route$3.update({
	id: "/callback",
	path: "/callback",
	getParentRoute: () => AuthRoute
});
var ProductIdRoute = Route$2.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$41
});
var AdminProductsIndexRoute = Route$1.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => AdminRoute
});
var AdminProductsNewRoute = Route.update({
	id: "/products/new",
	path: "/products/new",
	getParentRoute: () => AdminRoute
});
var AccountRouteChildren = {
	AccountAddressesRoute,
	AccountNotificationsRoute,
	AccountOrdersRoute,
	AccountPaymentsRoute,
	AccountIndexRoute
};
var AccountRouteWithChildren = AccountRoute._addFileChildren(AccountRouteChildren);
var AdminRouteChildren = {
	AdminSettingsRoute,
	AdminIndexRoute,
	AdminProductsNewRoute,
	AdminProductsIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var AuthRouteChildren = { AuthCallbackRoute };
var rootRouteChildren = {
	IndexRoute,
	AccountRoute: AccountRouteWithChildren,
	AdminRoute: AdminRouteWithChildren,
	AuthRoute: AuthRoute._addFileChildren(AuthRouteChildren),
	BanarasiRoute,
	BestSellersRoute,
	BridalRoute,
	CartRoute,
	CategoriesRoute,
	CheckoutRoute,
	CollectionsRoute,
	CottonSareesRoute,
	DailyWearRoute,
	DesignerRoute,
	FestivalRoute,
	HandloomRoute,
	KanjivaramRoute,
	LinenRoute,
	NewArrivalsRoute,
	OfficeWearRoute,
	OrderSuccessRoute,
	PartyWearRoute,
	PaymentRoute,
	PaymentFailedRoute,
	SaleRoute,
	SilkSareesRoute,
	TrackOrderRoute,
	TrendingRoute,
	WeddingRoute,
	WishlistRoute,
	ProductIdRoute
};
var routeTree = Route$41._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$40 as a, getRouter, Checkbox as i, Route$2 as n, CollectionPage as r, router_exports as t };
