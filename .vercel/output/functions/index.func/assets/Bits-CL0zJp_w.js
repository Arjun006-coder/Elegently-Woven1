import { t as cn } from "./utils-C_uf36nf.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Star } from "lucide-react";
//#region src/components/shop/Bits.tsx
function Eyebrow({ children, className }) {
	return /* @__PURE__ */ jsx("p", {
		className: cn("eyebrow", className),
		children
	});
}
function SectionHeading({ eyebrow, title, description, action, align = "left" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", align === "center" && "sm:flex-col sm:items-center sm:text-center"),
		children: [/* @__PURE__ */ jsxs("div", {
			className: cn("max-w-2xl", align === "center" && "mx-auto text-center"),
			children: [
				eyebrow ? /* @__PURE__ */ jsx(Eyebrow, { children: eyebrow }) : null,
				/* @__PURE__ */ jsx("h2", {
					className: "mt-3 text-3xl font-light sm:text-4xl",
					children: title
				}),
				description ? /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: description
				}) : null
			]
		}), action ? /* @__PURE__ */ jsx(Link, {
			to: action.to,
			className: "shrink-0 border-b border-gold pb-1 text-xs tracking-[0.2em] uppercase transition-colors hover:text-primary",
			children: action.label
		}) : null]
	});
}
function Stars({ value, className }) {
	return /* @__PURE__ */ jsx("span", {
		className: cn("inline-flex items-center gap-0.5", className),
		"aria-label": `${value} out of 5`,
		children: [
			1,
			2,
			3,
			4,
			5
		].map((i) => /* @__PURE__ */ jsx(Star, { className: cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-gold text-gold" : "text-muted-foreground/40") }, i))
	});
}
function PageHero({ eyebrow, title, description, image, compact }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative isolate overflow-hidden border-b border-border/60",
		children: [image ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("img", {
			src: image,
			alt: "",
			loading: "lazy",
			className: "absolute inset-0 h-full w-full object-cover",
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" })] }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-secondary/60" }), /* @__PURE__ */ jsxs("div", {
			className: cn("relative mx-auto max-w-7xl px-5 sm:px-8", compact ? "py-14" : "py-20 sm:py-28"),
			children: [
				eyebrow ? /* @__PURE__ */ jsx(Eyebrow, { children: eyebrow }) : null,
				/* @__PURE__ */ jsx("h1", {
					className: "mt-4 max-w-2xl text-4xl font-light sm:text-5xl lg:text-6xl",
					children: title
				}),
				description ? /* @__PURE__ */ jsx("p", {
					className: "mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base",
					children: description
				}) : null
			]
		})]
	});
}
function EmptyState({ icon, title, description, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid h-24 w-24 place-items-center rounded-full bg-secondary text-gold shadow-soft",
				children: icon
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-8 text-2xl font-light",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: description
			}),
			action ? /* @__PURE__ */ jsx(Link, {
				to: action.to,
				className: "mt-8 rounded-full bg-primary px-7 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-opacity hover:opacity-90",
				children: action.label
			}) : null
		]
	});
}
//#endregion
export { Stars as a, SectionHeading as i, Eyebrow as n, PageHero as r, EmptyState as t };
