import { S as products, b as images, h as collections, t as SiteLayout } from "./SiteLayout-DkeX7Cnm.js";
import { i as SectionHeading, r as PageHero } from "./Bits-CL0zJp_w.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/categories.tsx?tsr-split=component
function Categories() {
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx(PageHero, {
		compact: true,
		eyebrow: "Browse",
		title: "Shop by category",
		description: "Forty-eight years of weaves, sorted the way our store is laid out.",
		image: images.hero2
	}), /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-7xl px-5 py-16 sm:px-8",
		children: [
			{
				label: "By Weave",
				slugs: [
					"kanjivaram",
					"banarasi",
					"silk-sarees",
					"cotton-sarees",
					"linen",
					"handloom"
				]
			},
			{
				label: "By Occasion",
				slugs: [
					"bridal",
					"wedding",
					"festival",
					"party-wear",
					"office-wear",
					"daily-wear"
				]
			},
			{
				label: "Curated",
				slugs: [
					"new-arrivals",
					"trending",
					"best-sellers",
					"designer",
					"sale"
				]
			}
		].map((g) => /* @__PURE__ */ jsxs("div", {
			className: "mb-16",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: g.label,
				title: g.label.replace("By ", "")
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: g.slugs.map((slug) => {
					const c = collections.find((x) => x.slug === slug);
					if (!c) return null;
					const count = c.filter ? products.filter(c.filter).length : products.length;
					return /* @__PURE__ */ jsxs(Link, {
						to: `/${slug}`,
						className: "group relative overflow-hidden rounded-2xl hover-lift",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: c.image,
								alt: c.title,
								loading: "lazy",
								className: "h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
							}),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" }),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute inset-x-5 bottom-5 text-background",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-serif text-xl",
									children: c.title
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-1 text-xs opacity-80",
									children: [count, " sarees"]
								})]
							})
						]
					}, slug);
				})
			})]
		}, g.label))
	})] });
}
//#endregion
export { Categories as component };
