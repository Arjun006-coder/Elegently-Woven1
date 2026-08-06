import { C as stores, b as images, f as BRAND, g as designers, h as collections, n as Input, t as SiteLayout, w as testimonials, y as gallery } from "./SiteLayout-DkeX7Cnm.js";
import { a as Stars, i as SectionHeading, n as Eyebrow } from "./Bits-CL0zJp_w.js";
import { t as ProductCard } from "./ProductCard-CIdqp8vc.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { a as Route } from "./router-DuGEhyTP.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Instagram, MapPin, Play, Quote, Repeat, Scissors, ShieldCheck, Truck } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
var slides = [
	{
		image: images.hero1,
		eyebrow: "Muhurtham 2026",
		title: "Kanjivaram, woven for a lifetime",
		text: "Korvai borders and certified zari, loomed in Kanchipuram by third-generation weavers.",
		to: "/kanjivaram"
	},
	{
		image: images.hero3,
		eyebrow: "The Bridal Edit",
		title: "For the day you have imagined",
		text: "Hand-drawn zari pallus, private fittings and a stylist who stays with you until the muhurtham.",
		to: "/bridal"
	},
	{
		image: images.hero2,
		eyebrow: "Banaras Pit Looms",
		title: "Emerald katan, quietly regal",
		text: "Jaal and meenakari weaves in gemstone tones — limited to twelve pieces each.",
		to: "/banarasi"
	}
];
function Hero() {
	const [i, setI] = useState(0);
	useEffect(() => {
		const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
		return () => clearInterval(t);
	}, []);
	const slide = slides[i];
	return /* @__PURE__ */ jsxs("section", {
		className: "relative isolate h-[78vh] min-h-[34rem] overflow-hidden",
		children: [
			slides.map((s, idx) => /* @__PURE__ */ jsx(motion.img, {
				src: s.image,
				alt: s.title,
				width: 1920,
				height: 1088,
				animate: {
					opacity: idx === i ? 1 : 0,
					scale: idx === i ? 1.04 : 1
				},
				transition: {
					opacity: { duration: 1.1 },
					scale: {
						duration: 7,
						ease: "linear"
					}
				},
				className: "absolute inset-0 h-full w-full object-cover"
			}, s.title)),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 26
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .8 },
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ jsx(Eyebrow, { children: slide.eyebrow }),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-5 text-4xl leading-[1.05] font-light sm:text-6xl lg:text-7xl",
							children: slide.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: slide.text
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-9 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								asChild: true,
								size: "lg",
								className: "rounded-full px-8 tracking-[0.16em] uppercase",
								children: /* @__PURE__ */ jsx(Link, {
									to: slide.to,
									children: "Explore the edit"
								})
							}), /* @__PURE__ */ jsx(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "rounded-full px-8 tracking-[0.16em] uppercase",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/collections",
									children: "All collections"
								})
							})]
						})
					]
				}, slide.title), /* @__PURE__ */ jsxs("div", {
					className: "absolute right-5 bottom-8 flex items-center gap-3 sm:right-8",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Previous slide",
							onClick: () => setI((v) => (v - 1 + slides.length) % slides.length),
							className: "grid h-10 w-10 place-items-center rounded-full glass",
							children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							children: slides.map((s, idx) => /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": `Slide ${idx + 1}`,
								onClick: () => setI(idx),
								className: `h-1 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-4 bg-foreground/25"}`
							}, s.title))
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Next slide",
							onClick: () => setI((v) => (v + 1) % slides.length),
							className: "grid h-10 w-10 place-items-center rounded-full glass",
							children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
						})
					]
				})]
			})
		]
	});
}
var usps = [
	{
		icon: ShieldCheck,
		title: "Silk Mark certified",
		text: "Every pure silk carries a loom certificate."
	},
	{
		icon: Truck,
		title: "2–4 day delivery",
		text: "Free shipping across India above ₹2,999."
	},
	{
		icon: Repeat,
		title: "7-day easy returns",
		text: "Unworn, tagged sarees — no questions."
	},
	{
		icon: Scissors,
		title: "Fall, pico & blouse",
		text: "In-house tailoring at ₹899 flat."
	}
];
function ParallaxBanner({ image, eyebrow, title, text, to, cta }) {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
	return /* @__PURE__ */ jsxs("section", {
		className: "relative isolate my-24 h-[26rem] overflow-hidden sm:h-[30rem]",
		children: [
			/* @__PURE__ */ jsx(motion.img, {
				src: image,
				alt: "",
				loading: "lazy",
				style: { y },
				className: "absolute inset-0 h-[120%] w-full object-cover",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/20" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-5 pb-14 sm:px-8",
				children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: eyebrow }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-4 max-w-lg text-3xl font-light sm:text-5xl",
						children: title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 max-w-md text-sm text-muted-foreground",
						children: text
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						className: "mt-7 rounded-full px-8 tracking-[0.16em] uppercase",
						children: /* @__PURE__ */ jsx(Link, {
							to,
							children: cta
						})
					})
				]
			})
		]
	});
}
function ProductRow({ title, eyebrow, to, items }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-7xl px-5 py-16 sm:px-8",
		children: [/* @__PURE__ */ jsx(SectionHeading, {
			eyebrow,
			title,
			action: {
				label: "View all",
				to
			}
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4",
			children: items.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
		})]
	});
}
function Home() {
	const { liveProducts } = Route.useLoaderData();
	const featured = collections.filter((c) => [
		"bridal",
		"kanjivaram",
		"banarasi",
		"linen"
	].includes(c.slug));
	const categoryTiles = collections.filter((c) => [
		"festival",
		"wedding",
		"party-wear",
		"office-wear",
		"daily-wear",
		"designer",
		"cotton-sarees",
		"sale"
	].includes(c.slug));
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx("div", {
			className: "border-y border-border/70 bg-secondary/40",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4",
				children: usps.map((u) => /* @__PURE__ */ jsxs("div", {
					className: "flex min-w-0 items-start gap-3",
					children: [/* @__PURE__ */ jsx(u.icon, { className: "mt-0.5 h-5 w-5 shrink-0 text-gold" }), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm",
							children: u.title
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: u.text
						})]
					})]
				}, u.title))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-20 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Featured",
				title: "Collections of the season",
				description: "Four houses of weave, each with its own loom, its own history and its own drape."
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: featured.map((c) => /* @__PURE__ */ jsxs(Link, {
					to: `/${c.slug}`,
					className: "group relative overflow-hidden rounded-3xl hover-lift",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: c.image,
							alt: c.title,
							loading: "lazy",
							className: "h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
						}),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" }),
						/* @__PURE__ */ jsxs("div", {
							className: "absolute inset-x-5 bottom-5 text-background",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] tracking-[0.28em] uppercase opacity-80",
								children: c.eyebrow
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 font-serif text-2xl",
								children: c.title
							})]
						})
					]
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 pb-8 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Shop by",
				title: "Categories",
				action: {
					label: "All categories",
					to: "/categories"
				}
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
				children: categoryTiles.map((c) => /* @__PURE__ */ jsxs(Link, {
					to: `/${c.slug}`,
					className: "group flex flex-col items-center rounded-2xl border border-border/70 bg-card p-5 text-center transition-colors hover:border-gold",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: c.image,
							alt: "",
							loading: "lazy",
							className: "h-24 w-24 rounded-full object-cover"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-sm",
							children: c.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: c.eyebrow
						})
					]
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ jsx(ProductRow, {
			eyebrow: "Just In",
			title: "Latest arrivals",
			to: "/new-arrivals",
			items: liveProducts.slice(0, 4)
		}),
		/* @__PURE__ */ jsx(ParallaxBanner, {
			image: images.hero2,
			eyebrow: "Utsav Edit",
			title: "Festival silks that catch the diya light",
			text: "Luminous tissue, katan and korvai weaves for Diwali, Onam and Navratri.",
			to: "/festival",
			cta: "Shop festival"
		}),
		/* @__PURE__ */ jsx(ProductRow, {
			eyebrow: "Signature",
			title: "Best sellers",
			to: "/best-sellers",
			items: liveProducts.slice(4, 8)
		}),
		/* @__PURE__ */ jsx(ParallaxBanner, {
			image: images.hero3,
			eyebrow: "Shubh Vivah",
			title: "The wedding trousseau, curated with you",
			text: "Book a two-hour private appointment at our Basavanagudi flagship.",
			to: "/wedding",
			cta: "Book an appointment"
		}),
		/* @__PURE__ */ jsx(ProductRow, {
			eyebrow: "Most Loved",
			title: "Trending now",
			to: "/trending",
			items: liveProducts.slice(8, 12)
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsx("img", {
				src: images.story,
				alt: "Folded silk sarees",
				loading: "lazy",
				className: "rounded-3xl shadow-soft"
			}), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Since 1978" }),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-3xl font-light sm:text-4xl",
					children: "A family boutique, three generations deep"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-5 text-sm leading-relaxed text-muted-foreground",
					children: [BRAND.name, " began as a single loom-side counter in Basavanagudi. Today we work directly with 140 weaver families across Kanchipuram, Banaras, Chettinad and Sambalpur — no middlemen, no mill copies, no polyester passing as silk."]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm leading-relaxed text-muted-foreground",
					children: "Every saree is inspected twice: once at the loom, once at our store. What arrives at your door has been touched by hands that know the difference."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 grid grid-cols-3 gap-6",
					children: [
						["140+", "Weaver families"],
						["48 yrs", "Of six yards"],
						["26", "Countries shipped"]
					].map(([n, l]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "font-serif text-3xl",
						children: n
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: l
					})] }, l))
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-8 rounded-full px-8",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/about",
						children: "Our story"
					})
				})
			] })]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-y border-border/70 bg-secondary/40 py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Master Weavers",
					title: "The hands behind the drape",
					align: "center"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: designers.map((d, i) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl bg-card p-6 text-center shadow-soft",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: gallery[i + 1],
								alt: "",
								loading: "lazy",
								className: "mx-auto h-20 w-20 rounded-full object-cover"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 font-serif text-xl",
								children: d.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: d.craft
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-3 text-[11px] tracking-[0.2em] text-gold uppercase",
								children: [d.years, " years at the loom"]
							})
						]
					}, d.name))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-20 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "In Their Words",
				title: "Loved by 24,000 women"
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: testimonials.map((t) => /* @__PURE__ */ jsxs("figure", {
					className: "flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6",
					children: [
						/* @__PURE__ */ jsx(Quote, { className: "h-5 w-5 text-gold" }),
						/* @__PURE__ */ jsx("blockquote", {
							className: "mt-4 flex-1 text-sm leading-relaxed text-muted-foreground",
							children: t.text
						}),
						/* @__PURE__ */ jsxs("figcaption", {
							className: "mt-5",
							children: [
								/* @__PURE__ */ jsx(Stars, { value: t.rating }),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm",
									children: t.name
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: t.city
								})
							]
						})
					]
				}, t.name))
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 pb-20 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Watch",
				title: "Drape guides & loom films"
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [
					["How to drape a Kanjivaram in 4 minutes", "4:12"],
					["Inside a Banaras pit loom", "7:38"],
					["Caring for pure silk at home", "3:05"]
				].map(([title, dur], i) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => toast("Video player coming soon"),
					className: "group relative overflow-hidden rounded-2xl text-left",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: gallery[i + 4],
							alt: "",
							loading: "lazy",
							className: "h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
						}),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-foreground/30" }),
						/* @__PURE__ */ jsx("span", {
							className: "absolute inset-0 grid place-items-center",
							children: /* @__PURE__ */ jsx("span", {
								className: "grid h-14 w-14 place-items-center rounded-full glass",
								children: /* @__PURE__ */ jsx(Play, { className: "h-5 w-5" })
							})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "absolute inset-x-4 bottom-4 flex items-center justify-between text-background",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm",
								children: title
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs opacity-80",
								children: dur
							})]
						})
					]
				}, title))
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 pb-20 sm:px-8",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "@elegantlywoven",
				title: "From our Instagram",
				align: "center"
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8",
				children: gallery.map((g, i) => /* @__PURE__ */ jsxs("a", {
					href: "#",
					className: "group relative overflow-hidden rounded-xl",
					children: [/* @__PURE__ */ jsx("img", {
						src: g,
						alt: "",
						loading: "lazy",
						className: "aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
					}), /* @__PURE__ */ jsx("span", {
						className: "absolute inset-0 grid place-items-center bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100",
						children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5 text-background" })
					})]
				}, i))
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-t border-border/70 bg-secondary/40 py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "Visit Us" }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-4 text-3xl font-light",
						children: "Three stores, one counter of tea"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 space-y-6",
						children: stores.map((s) => /* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 border-b border-border/60 pb-5",
							children: [/* @__PURE__ */ jsx(MapPin, { className: "mt-1 h-4 w-4 shrink-0 text-gold" }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm",
									children: s.city
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: s.address
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-muted-foreground",
									children: [
										s.phone,
										" · ",
										BRAND.hours
									]
								})
							] })]
						}, s.city))
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl bg-card p-8 shadow-soft sm:p-12",
					children: [
						/* @__PURE__ */ jsx(Eyebrow, { children: "The Loom Letter" }),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-4 text-3xl font-light",
							children: "Fortnightly notes from the loom"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "New weaves, restocks and private sale invitations. No more than two emails a month."
						}),
						/* @__PURE__ */ jsxs("form", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							onSubmit: (e) => {
								e.preventDefault();
								toast.success("Welcome to the Loom Letter");
							},
							children: [/* @__PURE__ */ jsx(Input, {
								type: "email",
								required: true,
								placeholder: "Your email address",
								"aria-label": "Email",
								className: "rounded-full"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								className: "rounded-full px-8 tracking-[0.16em] uppercase",
								children: "Subscribe"
							})]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { Home as component };
