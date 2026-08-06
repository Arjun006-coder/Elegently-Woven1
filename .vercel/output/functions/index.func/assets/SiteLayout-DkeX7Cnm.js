import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { a as signOut, t as getProfile } from "./auth-DZmPN7vG.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import * as React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Bell, Check, ChevronDown, ChevronRight, Circle, Clock, Facebook, Globe, Headphones, Heart, Instagram, LogOut, Mail, MapPin, Menu, MessageCircle, Mic, Moon, Phone, Search, SearchX, Send, ShoppingBag, Sun, TrendingUp, User, X, Youtube } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
//#region src/assets/hero-1.jpg
var hero_1_default = "/assets/hero-1-DGYqBd-s.jpg";
//#endregion
//#region src/assets/hero-2.jpg
var hero_2_default = "/assets/hero-2-D4rta4J8.jpg";
//#endregion
//#region src/assets/hero-3.jpg
var hero_3_default = "/assets/hero-3-CIUFwofW.jpg";
//#endregion
//#region src/assets/story.jpg
var story_default = "/assets/story-BB77fCPM.jpg";
//#endregion
//#region src/assets/p1.jpg
var p1_default = "/assets/p1-DaOl32a1.jpg";
//#endregion
//#region src/assets/p2.jpg
var p2_default = "/assets/p2-Dsp7ukG0.jpg";
//#endregion
//#region src/assets/p3.jpg
var p3_default = "/assets/p3-Cl36kRgt.jpg";
//#endregion
//#region src/assets/p4.jpg
var p4_default = "/assets/p4-3ImBYp5g.jpg";
//#endregion
//#region src/assets/p5.jpg
var p5_default = "/assets/p5-CVo_LY_x.jpg";
//#endregion
//#region src/assets/p6.jpg
var p6_default = "/assets/p6-Djqp3W-a.jpg";
//#endregion
//#region src/assets/p7.jpg
var p7_default = "/assets/p7-BLnmxPi7.jpg";
//#endregion
//#region src/assets/p8.jpg
var p8_default = "/assets/p8-3VA1gGQK.jpg";
//#endregion
//#region src/lib/data.ts
var BRAND = {
	name: "ElegantlyWoven",
	tagline: "Curated women's fashion, delivered with elegance",
	phone: "+91 98000 00000",
	whatsapp: "+91 98000 00000",
	email: "hello@elegantlywoven.com",
	address: "LumaScale, India",
	hours: "Mon – Sat · 10:00 AM to 8:00 PM",
	poweredBy: "LumaScale"
};
var images = {
	hero1: hero_1_default,
	hero2: hero_2_default,
	hero3: hero_3_default,
	story: story_default
};
var gallery = [
	p1_default,
	p2_default,
	p3_default,
	p4_default,
	p5_default,
	p6_default,
	p7_default,
	p8_default
];
var seeds = [
	[
		"Anantha Kanjivaram",
		"Kanjivaram",
		"Pure Mulberry Silk",
		"Wedding",
		"Maroon",
		"Zari Butta",
		42500,
		54e3,
		0
	],
	[
		"Kashi Banarasi Jaal",
		"Banarasi",
		"Katan Silk",
		"Wedding",
		"Emerald",
		"Jaal",
		28900,
		36500,
		1
	],
	[
		"Champa Tissue Drape",
		"Tissue Silk",
		"Tissue Silk",
		"Party",
		"Champagne",
		"Plain",
		18600,
		24e3,
		2
	],
	[
		"Rangoli Handloom Cotton",
		"Handloom",
		"Kora Cotton",
		"Daily",
		"Beige",
		"Temple Stripe",
		4890,
		6500,
		3
	],
	[
		"Gulaab Organza",
		"Designer",
		"Organza",
		"Party",
		"Rose Gold",
		"Sequin",
		15900,
		21e3,
		4
	],
	[
		"Nakshatra Linen",
		"Linen",
		"Pure Linen",
		"Office",
		"Soft Black",
		"Minimal",
		6490,
		8200,
		5
	],
	[
		"Vivaha Bridal Silk",
		"Bridal",
		"Pure Silk",
		"Bridal",
		"Red",
		"Heavy Zari",
		68e3,
		82e3,
		6
	],
	[
		"Chandni Chiffon",
		"Designer",
		"Chiffon",
		"Party",
		"Ivory",
		"Polka Zari",
		9800,
		12500,
		7
	],
	[
		"Meenakari Kanjivaram",
		"Kanjivaram",
		"Pure Mulberry Silk",
		"Festival",
		"Emerald",
		"Korvai",
		38500,
		46e3,
		1
	],
	[
		"Sanskriti Banarasi",
		"Banarasi",
		"Katan Silk",
		"Festival",
		"Maroon",
		"Meenakari",
		24500,
		31e3,
		0
	],
	[
		"Ujjwal Silk Cotton",
		"Silk",
		"Silk Cotton",
		"Daily",
		"Champagne",
		"Checks",
		5290,
		7100,
		2
	],
	[
		"Aarambh Cotton Handloom",
		"Cotton",
		"Handloom Cotton",
		"Office",
		"Ivory",
		"Stripe",
		3890,
		4900,
		3
	],
	[
		"Roshni Rose Tissue",
		"Tissue Silk",
		"Tissue Silk",
		"Wedding",
		"Rose Gold",
		"Zari Border",
		21500,
		27500,
		4
	],
	[
		"Shyama Linen Weave",
		"Linen",
		"Pure Linen",
		"Office",
		"Soft Black",
		"Stripe",
		7290,
		9400,
		5
	],
	[
		"Sindoor Bridal Banarasi",
		"Bridal",
		"Katan Silk",
		"Bridal",
		"Red",
		"Heavy Jaal",
		54900,
		68e3,
		6
	],
	[
		"Mrinal Ivory Silk",
		"Silk",
		"Pure Silk",
		"Wedding",
		"Ivory",
		"Zari Butta",
		26900,
		33500,
		7
	],
	[
		"Kalyani Kanjivaram",
		"Kanjivaram",
		"Pure Mulberry Silk",
		"Bridal",
		"Maroon",
		"Rich Pallu",
		59500,
		71e3,
		0
	],
	[
		"Padmini Designer Drape",
		"Designer",
		"Georgette",
		"Party",
		"Emerald",
		"Embroidered",
		13900,
		18500,
		1
	],
	[
		"Suvarna Festival Silk",
		"Silk",
		"Pure Silk",
		"Festival",
		"Champagne",
		"Zari Buttas",
		19900,
		25500,
		2
	],
	[
		"Neel Kamal Cotton",
		"Cotton",
		"Mul Cotton",
		"Daily",
		"Beige",
		"Block Print",
		2990,
		3900,
		3
	],
	[
		"Amara Rose Handloom",
		"Handloom",
		"Handloom Silk",
		"Festival",
		"Rose Gold",
		"Temple Border",
		16500,
		21500,
		4
	],
	[
		"Tamas Office Linen",
		"Linen",
		"Pure Linen",
		"Office",
		"Soft Black",
		"Plain",
		5890,
		7500,
		5
	],
	[
		"Raktim Wedding Silk",
		"Silk",
		"Pure Silk",
		"Wedding",
		"Red",
		"Korvai",
		44900,
		55e3,
		6
	],
	[
		"Shwet Ivory Chiffon",
		"Designer",
		"Chiffon",
		"Party",
		"Ivory",
		"Hand Painted",
		11900,
		15500,
		7
	]
];
var badges = [
	"New",
	"Bestseller",
	"Trending",
	"Limited",
	"New"
];
var products = seeds.map((s, i) => {
	const [name, weave, fabric, occasion, color, pattern, price, mrp, img] = s;
	const imgs = [
		img,
		(img + 3) % 8,
		(img + 5) % 8,
		(img + 1) % 8
	].map((n) => gallery[n]);
	return {
		id: `${name.toLowerCase().replace(/[^a-z]+/g, "-")}-${i + 1}`,
		name,
		weave,
		fabric,
		occasion,
		color,
		pattern,
		border: pattern.includes("Zari") ? "Zari" : "Contrast",
		price,
		mrp,
		rating: Number((4.1 + i * 7 % 9 / 10).toFixed(1)),
		reviews: 24 + i * 37 % 480,
		stock: [
			12,
			4,
			0,
			7,
			21,
			2
		][i % 6] ?? 8,
		images: imgs,
		tags: [
			weave,
			occasion,
			fabric
		],
		badge: badges[i % 5],
		blouse: i % 3 !== 0,
		length: i % 4 === 0 ? "6.3 m with blouse" : "5.5 m",
		description: `${name} is a handpicked ${fabric.toLowerCase()} saree woven with a ${pattern.toLowerCase()} motif and finished with a traditional ${occasion.toLowerCase()} palette. Each piece is loomed by our master weavers and takes 18–24 days to complete.`
	};
});
var byId = (id) => products.find((p) => p.id === id);
var collections = [
	{
		slug: "collections",
		title: "All Collections",
		eyebrow: "The House",
		description: "Every weave in the ElegantlyWoven atelier — from six-yard everyday cottons to heirloom bridal Kanjivarams.",
		image: hero_1_default
	},
	{
		slug: "categories",
		title: "Shop by Category",
		eyebrow: "Browse",
		description: "Find your saree by weave, fabric and occasion.",
		image: hero_2_default
	},
	{
		slug: "new-arrivals",
		title: "New Arrivals",
		eyebrow: "Just In",
		description: "Freshly loomed drapes, added to the atelier this fortnight.",
		image: hero_2_default,
		filter: (p) => p.badge === "New" || p.rating > 4.5
	},
	{
		slug: "trending",
		title: "Trending Now",
		eyebrow: "Most Loved",
		description: "What India is draping this season.",
		image: hero_1_default,
		filter: (p) => p.badge === "Trending" || p.reviews > 200
	},
	{
		slug: "best-sellers",
		title: "Best Sellers",
		eyebrow: "Signature",
		description: "Our most requested weaves, reordered season after season.",
		image: hero_3_default,
		filter: (p) => p.badge === "Bestseller" || p.reviews > 260
	},
	{
		slug: "festival",
		title: "Festival Collection",
		eyebrow: "Utsav",
		description: "Luminous silks for Diwali, Onam, Pongal and Navratri.",
		image: hero_2_default,
		filter: (p) => p.occasion === "Festival"
	},
	{
		slug: "wedding",
		title: "Wedding Collection",
		eyebrow: "Shubh Vivah",
		description: "For the sangeet, the muhurtham and every ritual in between.",
		image: hero_3_default,
		filter: (p) => p.occasion === "Wedding"
	},
	{
		slug: "bridal",
		title: "Bridal Collection",
		eyebrow: "The Bride",
		description: "Heirloom bridal sarees with hand-drawn zari pallus.",
		image: hero_3_default,
		filter: (p) => p.occasion === "Bridal"
	},
	{
		slug: "party-wear",
		title: "Party Wear",
		eyebrow: "After Dark",
		description: "Organza, chiffon and tissue drapes with a modern edge.",
		image: hero_1_default,
		filter: (p) => p.occasion === "Party"
	},
	{
		slug: "office-wear",
		title: "Office Wear",
		eyebrow: "Everyday Elegance",
		description: "Crisp linens and cottons that hold a pleat all day.",
		image: story_default,
		filter: (p) => p.occasion === "Office"
	},
	{
		slug: "daily-wear",
		title: "Daily Wear",
		eyebrow: "Soft Comfort",
		description: "Breathable mul and kora cottons for the everyday six yards.",
		image: story_default,
		filter: (p) => p.occasion === "Daily"
	},
	{
		slug: "silk-sarees",
		title: "Silk Sarees",
		eyebrow: "Pure Silk",
		description: "Mark-of-purity silks with certified zari.",
		image: hero_1_default,
		filter: (p) => p.fabric.includes("Silk")
	},
	{
		slug: "cotton-sarees",
		title: "Cotton Sarees",
		eyebrow: "Handspun",
		description: "Mul, kora and handloom cottons from Chettinad and Bengal.",
		image: story_default,
		filter: (p) => p.fabric.includes("Cotton")
	},
	{
		slug: "banarasi",
		title: "Banarasi Sarees",
		eyebrow: "Varanasi",
		description: "Katan silk woven on Banaras pit looms.",
		image: hero_2_default,
		filter: (p) => p.weave === "Banarasi"
	},
	{
		slug: "kanjivaram",
		title: "Kanjivaram Sarees",
		eyebrow: "Kanchipuram",
		description: "Korvai borders, contrast pallus, pure mulberry silk.",
		image: hero_1_default,
		filter: (p) => p.weave === "Kanjivaram"
	},
	{
		slug: "linen",
		title: "Linen Sarees",
		eyebrow: "Modern Classic",
		description: "Feather-light pure linen with understated borders.",
		image: story_default,
		filter: (p) => p.fabric.includes("Linen")
	},
	{
		slug: "designer",
		title: "Designer Sarees",
		eyebrow: "Atelier",
		description: "Limited pieces created with our in-house design studio.",
		image: hero_3_default,
		filter: (p) => p.weave === "Designer"
	},
	{
		slug: "handloom",
		title: "Handloom Collection",
		eyebrow: "Weaver Direct",
		description: "Bought straight from the loom, at fair weaver prices.",
		image: story_default,
		filter: (p) => p.weave === "Handloom"
	},
	{
		slug: "sale",
		title: "The Sale",
		eyebrow: "Up to 30% Off",
		description: "Season-end pricing on select weaves. While stocks last.",
		image: hero_2_default,
		filter: (p) => p.mrp - p.price > 5e3
	}
];
var collectionBySlug = (slug) => collections.find((c) => c.slug === slug);
var megaMenu = [
	{
		label: "Weaves",
		items: [
			{
				label: "Kanjivaram",
				to: "/kanjivaram"
			},
			{
				label: "Banarasi",
				to: "/banarasi"
			},
			{
				label: "Silk Sarees",
				to: "/silk-sarees"
			},
			{
				label: "Cotton Sarees",
				to: "/cotton-sarees"
			},
			{
				label: "Linen",
				to: "/linen"
			},
			{
				label: "Handloom",
				to: "/handloom"
			}
		]
	},
	{
		label: "Occasion",
		items: [
			{
				label: "Bridal",
				to: "/bridal"
			},
			{
				label: "Wedding",
				to: "/wedding"
			},
			{
				label: "Festival",
				to: "/festival"
			},
			{
				label: "Party Wear",
				to: "/party-wear"
			},
			{
				label: "Office Wear",
				to: "/office-wear"
			},
			{
				label: "Daily Wear",
				to: "/daily-wear"
			}
		]
	},
	{
		label: "Curated",
		items: [
			{
				label: "New Arrivals",
				to: "/new-arrivals"
			},
			{
				label: "Trending",
				to: "/trending"
			},
			{
				label: "Best Sellers",
				to: "/best-sellers"
			},
			{
				label: "Designer",
				to: "/designer"
			},
			{
				label: "Gift Cards",
				to: "/gift-cards"
			},
			{
				label: "Sale",
				to: "/sale"
			}
		]
	}
];
var filterGroups = [
	{
		key: "occasion",
		label: "Occasion",
		options: [
			"Bridal",
			"Wedding",
			"Festival",
			"Party",
			"Office",
			"Daily"
		]
	},
	{
		key: "fabric",
		label: "Fabric",
		options: [
			"Pure Mulberry Silk",
			"Katan Silk",
			"Pure Silk",
			"Tissue Silk",
			"Handloom Cotton",
			"Mul Cotton",
			"Kora Cotton",
			"Silk Cotton",
			"Pure Linen",
			"Organza",
			"Chiffon",
			"Georgette"
		]
	},
	{
		key: "color",
		label: "Colour",
		options: [
			"Maroon",
			"Red",
			"Emerald",
			"Champagne",
			"Rose Gold",
			"Ivory",
			"Beige",
			"Soft Black"
		]
	},
	{
		key: "pattern",
		label: "Pattern",
		options: [
			"Zari Butta",
			"Jaal",
			"Plain",
			"Sequin",
			"Stripe",
			"Checks",
			"Block Print",
			"Embroidered",
			"Hand Painted",
			"Minimal"
		]
	},
	{
		key: "border",
		label: "Border",
		options: ["Zari", "Contrast"]
	},
	{
		key: "length",
		label: "Length",
		options: ["5.5 m", "6.3 m with blouse"]
	}
];
var testimonials = [
	{
		name: "Priya Sharma",
		city: "Mumbai",
		text: "My muhurtham Kanjivaram came beautifully packaged with the weaver's certificate. The zari is unbelievably fine.",
		rating: 5
	},
	{
		name: "Ananya Rao",
		city: "Bengaluru",
		text: "I have bought eleven cottons from ElegantlyWoven. They hold colour after twenty washes.",
		rating: 5
	},
	{
		name: "Fatima Sheikh",
		city: "Hyderabad",
		text: "The style advisor helped me pick a Banarasi within my budget. Delivered in two days — amazing!",
		rating: 4.5
	},
	{
		name: "Divya Menon",
		city: "Kochi",
		text: "Packaging felt like a luxury gift box. My mother thought I spent twice as much.",
		rating: 5
	}
];
var stores = [
	{
		city: "Mumbai",
		address: "14, Linking Road, Bandra West",
		phone: "+91 98000 00001"
	},
	{
		city: "Delhi",
		address: "27, Connaught Place, New Delhi",
		phone: "+91 98000 00002"
	},
	{
		city: "Bengaluru",
		address: "8, UB City Mall, Vittal Mallya Road",
		phone: "+91 98000 00003"
	}
];
var designers = [
	{
		name: "Kamakshi Iyer",
		craft: "Kanjivaram Korvai",
		years: 32
	},
	{
		name: "Rehman Ansari",
		craft: "Banarasi Katan",
		years: 28
	},
	{
		name: "Sujata Behera",
		craft: "Handloom Ikat",
		years: 19
	},
	{
		name: "Nithya Prasad",
		craft: "Contemporary Drapes",
		years: 11
	}
];
products[0], products[3], products[2], products[5];
var inr = (n) => new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0
}).format(n);
var discount = (p) => Math.round((p.mrp - p.price) / p.mrp * 100);
//#endregion
//#region src/lib/store.tsx
var ShopContext = createContext(null);
var KEY = "ew-shop-v1";
function ShopProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [compare, setCompare] = useState([]);
	const [recent, setRecent] = useState([]);
	const [liveProducts, setLiveProducts] = useState([]);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);
	useEffect(() => {
		supabase.from("products").select("*").then(({ data }) => {
			if (data) {
				const formatted = data.map((d) => ({
					...d,
					isNew: d.is_new,
					images: Array.isArray(d.images) ? d.images : typeof d.images === "string" ? JSON.parse(d.images) : [d.images],
					weave: d.category || "Silk",
					fabric: d.fabric || "Silk",
					color: d.color || "Red"
				}));
				setLiveProducts(formatted);
			}
		});
	}, []);
	useEffect(() => {
		const initSync = async () => {
			const { data: { session } } = await supabase.auth.getSession();
			if (session) {
				setUserId(session.user.id);
				const { data: cartData } = await supabase.from("cart_items").select("product_id, quantity").eq("user_id", session.user.id);
				if (cartData) setCart(cartData.map((c) => ({
					id: c.product_id,
					qty: c.quantity
				})));
				const { data: wishData } = await supabase.from("wishlists").select("product_id").eq("user_id", session.user.id);
				if (wishData) setWishlist(wishData.map((w) => w.product_id));
			} else try {
				const raw = localStorage.getItem(KEY);
				if (raw) {
					const s = JSON.parse(raw);
					setCart(s.cart ?? []);
					setWishlist(s.wishlist ?? []);
					setCompare(s.compare ?? []);
					setRecent(s.recent ?? []);
				}
			} catch {}
			setReady(true);
		};
		initSync();
		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			if (session?.user.id !== userId) initSync();
		});
		return () => data.subscription.unsubscribe();
	}, [userId]);
	useEffect(() => {
		if (!ready) return;
		if (!userId) localStorage.setItem(KEY, JSON.stringify({
			cart,
			wishlist,
			compare,
			recent
		}));
		else localStorage.setItem(KEY, JSON.stringify({
			cart: [],
			wishlist: [],
			compare,
			recent
		}));
	}, [
		cart,
		wishlist,
		compare,
		recent,
		ready,
		userId
	]);
	const getProduct = useCallback((id) => {
		return liveProducts.find((p) => p.id === id) || byId(id);
	}, [liveProducts]);
	const addToCart = useCallback(async (id, qty = 1) => {
		setCart((c) => {
			return c.find((l) => l.id === id) ? c.map((l) => l.id === id ? {
				...l,
				qty: l.qty + qty
			} : l) : [...c, {
				id,
				qty
			}];
		});
		if (userId) {
			const { data: existing } = await supabase.from("cart_items").select("quantity").eq("user_id", userId).eq("product_id", id).single();
			if (existing) await supabase.from("cart_items").update({ quantity: existing.quantity + qty }).eq("user_id", userId).eq("product_id", id);
			else await supabase.from("cart_items").insert({
				user_id: userId,
				product_id: id,
				quantity: qty
			});
		}
		const p = getProduct(id);
		toast.success("Added to your bag", { description: p?.name });
	}, [userId, getProduct]);
	const setQty = useCallback(async (id, qty) => {
		setCart((c) => c.flatMap((l) => l.id === id ? qty <= 0 ? [] : [{
			...l,
			qty
		}] : [l]));
		if (userId) if (qty <= 0) await supabase.from("cart_items").delete().eq("user_id", userId).eq("product_id", id);
		else await supabase.from("cart_items").update({ quantity: qty }).eq("user_id", userId).eq("product_id", id);
	}, [userId]);
	const removeFromCart = useCallback(async (id) => {
		setCart((c) => c.filter((l) => l.id !== id));
		if (userId) await supabase.from("cart_items").delete().eq("user_id", userId).eq("product_id", id);
		toast("Removed from bag");
	}, [userId]);
	const clearCart = useCallback(async () => {
		setCart([]);
		if (userId) await supabase.from("cart_items").delete().eq("user_id", userId);
	}, [userId]);
	const toggleWishlist = useCallback(async (id) => {
		setWishlist((w) => {
			const has = w.includes(id);
			if (userId) if (has) supabase.from("wishlists").delete().eq("user_id", userId).eq("product_id", id).then();
			else supabase.from("wishlists").insert({
				user_id: userId,
				product_id: id
			}).then();
			toast[has ? "message" : "success"](has ? "Removed from wishlist" : "Saved to wishlist");
			return has ? w.filter((x) => x !== id) : [id, ...w];
		});
	}, [userId]);
	const toggleCompare = useCallback((id) => {
		setCompare((c) => {
			if (c.includes(id)) return c.filter((x) => x !== id);
			if (c.length >= 3) {
				toast.error("You can compare up to 3 sarees");
				return c;
			}
			return [...c, id];
		});
	}, []);
	const markViewed = useCallback((id) => {
		setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8));
	}, []);
	const lines = useMemo(() => cart.flatMap((l) => {
		const product = getProduct(l.id);
		return product ? [{
			product,
			qty: l.qty
		}] : [];
	}), [cart, getProduct]);
	const value = {
		cart,
		wishlist,
		compare,
		recent,
		addToCart,
		setQty,
		removeFromCart,
		clearCart,
		toggleWishlist,
		toggleCompare,
		markViewed,
		cartCount: cart.reduce((n, l) => n + l.qty, 0),
		subtotal: lines.reduce((n, l) => n + l.product.price * l.qty, 0),
		lines,
		liveProducts
	};
	return /* @__PURE__ */ jsx(ShopContext.Provider, {
		value,
		children
	});
}
function useShop() {
	const ctx = useContext(ShopContext);
	if (!ctx) throw new Error("useShop must be used inside ShopProvider");
	return ctx;
}
function useTheme() {
	const [theme, setTheme] = useState("light");
	useEffect(() => {
		const initial = localStorage.getItem("ew-theme") ?? "light";
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	return {
		theme,
		toggle: useCallback(() => {
			setTheme((t) => {
				const next = t === "dark" ? "light" : "dark";
				localStorage.setItem("ew-theme", next);
				document.documentElement.classList.toggle("dark", next === "dark");
				return next;
			});
		}, [])
	};
}
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet = DialogPrimitive.Root;
var SheetTrigger = DialogPrimitive.Trigger;
var SheetPortal = DialogPrimitive.Portal;
var SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
var SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/layout/SearchDialog.tsx
var recent = [
	"Kanjivaram maroon",
	"cotton daily wear",
	"bridal under 60000"
];
var trending = [
	"Banarasi jaal",
	"Tissue silk",
	"Organza party",
	"Handloom cotton",
	"Emerald silk"
];
var quickCats = [
	{
		label: "Bridal",
		to: "/bridal"
	},
	{
		label: "Festival",
		to: "/festival"
	},
	{
		label: "Linen",
		to: "/linen"
	},
	{
		label: "Sale",
		to: "/sale"
	}
];
function SearchDialog({ open, onOpenChange }) {
	const [q, setQ] = useState("");
	const navigate = useNavigate();
	const results = useMemo(() => {
		if (q.trim().length < 2) return [];
		const t = q.toLowerCase();
		return products.filter((p) => [
			p.name,
			p.weave,
			p.fabric,
			p.occasion,
			p.color
		].join(" ").toLowerCase().includes(t)).slice(0, 6);
	}, [q]);
	const go = (term) => {
		onOpenChange(false);
		navigate({
			to: "/search",
			search: { q: term }
		});
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "top-24 max-w-2xl translate-y-0 gap-0 overflow-hidden p-0",
			children: [
				/* @__PURE__ */ jsx(DialogTitle, {
					className: "sr-only",
					children: "Search sarees"
				}),
				/* @__PURE__ */ jsxs("form", {
					className: "flex items-center gap-3 border-b border-border/70 px-5 py-4",
					onSubmit: (e) => {
						e.preventDefault();
						if (q.trim()) go(q.trim());
					},
					children: [
						/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
						/* @__PURE__ */ jsx("input", {
							autoFocus: true,
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search for Kanjivaram, cotton, bridal…",
							className: "flex-1 bg-transparent text-sm outline-none",
							"aria-label": "Search sarees"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Voice search",
							onClick: () => toast("Listening…", { description: "Voice search preview" }),
							className: "grid h-8 w-8 place-items-center rounded-full bg-secondary",
							children: /* @__PURE__ */ jsx(Mic, { className: "h-3.5 w-3.5" })
						}),
						q ? /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setQ(""),
							"aria-label": "Clear",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-muted-foreground" })
						}) : null
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "max-h-[60vh] overflow-y-auto p-5",
					children: q.trim().length >= 2 ? results.length ? /* @__PURE__ */ jsx("ul", {
						className: "space-y-1",
						children: results.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => {
								onOpenChange(false);
								navigate({
									to: "/product/$id",
									params: { id: p.id }
								});
							},
							className: "flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors hover:bg-secondary",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: p.images[0],
									alt: "",
									loading: "lazy",
									className: "h-16 w-13 rounded-lg object-cover"
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block truncate text-sm",
										children: p.name
									}), /* @__PURE__ */ jsxs("span", {
										className: "block text-xs text-muted-foreground",
										children: [
											p.weave,
											" · ",
											p.occasion
										]
									})]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-sm",
									children: inr(p.price)
								})
							]
						}) }, p.id))
					}) : /* @__PURE__ */ jsxs("div", {
						className: "py-12 text-center",
						children: [
							/* @__PURE__ */ jsx(SearchX, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-4 text-sm",
								children: [
									"No sarees matched “",
									q,
									"”"
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Try a weave (Banarasi), a colour (emerald) or an occasion (bridal)."
							})
						]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "space-y-7",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
								className: "eyebrow flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }), " Recent searches"]
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: recent.map((r) => /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => go(r),
									className: "rounded-full bg-secondary px-3 py-1.5 text-xs transition-colors hover:bg-accent",
									children: r
								}, r))
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
								className: "eyebrow flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3" }), " Trending searches"]
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: trending.map((r) => /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => go(r),
									className: "rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-gold",
									children: r
								}, r))
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "eyebrow",
								children: "Popular categories"
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
								children: quickCats.map((c) => /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => {
										onOpenChange(false);
										navigate({ to: c.to });
									},
									className: "rounded-xl bg-secondary px-3 py-3 text-xs tracking-wide uppercase transition-colors hover:bg-accent",
									children: c.label
								}, c.label))
							})] })
						]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/components/layout/Header.tsx
function Header() {
	const { cartCount, wishlist } = useShop();
	const [session, setSession] = useState(null);
	const { theme, toggle } = useTheme();
	const [searchOpen, setSearchOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [lang, setLang] = useState("EN");
	const [isAdmin, setIsAdmin] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [unreadCount, setUnreadCount] = useState(0);
	useEffect(() => {
		const checkSession = async () => {
			const { data } = await supabase.auth.getSession();
			setSession(data.session);
			if (data.session) {
				const profile = await getProfile(data.session.user.id);
				setIsAdmin(profile?.role === "admin" || profile?.role === "super_admin");
				const { data: notifs } = await supabase.from("notifications").select("*").eq("user_id", data.session.user.id).order("created_at", { ascending: false }).limit(3);
				if (notifs) {
					setNotifications(notifs);
					setUnreadCount(notifs.filter((n) => !n.is_read).length);
				}
			}
		};
		checkSession();
		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
			setSession(session);
			if (session) {
				const profile = await getProfile(session.user.id);
				setIsAdmin(profile?.role === "admin" || profile?.role === "super_admin");
			} else setIsAdmin(false);
		});
		return () => subscription.unsubscribe();
	}, []);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setSearchOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "bg-primary text-primary-foreground",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-[11px] tracking-[0.18em] uppercase sm:px-8",
				children: [/* @__PURE__ */ jsx("p", {
					className: "truncate",
					children: "Flat 15% off your first order · code WOVEN15"
				}), /* @__PURE__ */ jsxs("div", {
					className: "hidden items-center gap-6 sm:flex",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/track-order",
							className: "hover:text-gold",
							children: "Track order"
						}),
						session ? /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/account",
								className: "flex items-center gap-1.5 hover:text-gold",
								children: "Account"
							}), /* @__PURE__ */ jsx("button", {
								onClick: signOut,
								className: "flex items-center gap-1.5 hover:text-gold",
								title: "Sign Out",
								children: /* @__PURE__ */ jsx(LogOut, { className: "h-3 w-3" })
							})]
						}) : /* @__PURE__ */ jsxs(Link, {
							to: "/auth",
							className: "flex items-center gap-1.5 hover:text-gold",
							children: [/* @__PURE__ */ jsx(User, { className: "h-3 w-3" }), " Sign In"]
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/contact",
							className: "flex items-center gap-1.5 hover:text-gold",
							children: [/* @__PURE__ */ jsx(Headphones, { className: "h-3 w-3" }), " Support"]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx("header", {
			className: cn("sticky top-0 z-40 border-b transition-all duration-300", scrolled ? "border-border/70 glass" : "border-transparent bg-background"),
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 sm:px-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
							"aria-label": "Open menu",
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-secondary lg:hidden",
							children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
						}), /* @__PURE__ */ jsxs(SheetContent, {
							side: "left",
							className: "w-[19rem] overflow-y-auto",
							children: [/* @__PURE__ */ jsx(SheetTitle, {
								className: "px-4 pt-4 font-serif text-2xl",
								children: BRAND.name
							}), /* @__PURE__ */ jsxs("nav", {
								className: "space-y-6 p-4",
								children: [megaMenu.map((group) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "eyebrow",
									children: group.label
								}), /* @__PURE__ */ jsx("ul", {
									className: "mt-3 space-y-2 text-sm",
									children: group.items.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										to: i.to,
										className: "text-muted-foreground hover:text-foreground",
										children: i.label
									}) }, i.to))
								})] }, group.label)), /* @__PURE__ */ jsx(Link, {
									to: "/account",
									className: "block border-t border-border pt-4 text-sm",
									children: "My Account"
								})]
							})]
						})] }), /* @__PURE__ */ jsxs(Link, {
							to: "/",
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block truncate font-serif text-2xl leading-none sm:text-3xl",
								children: BRAND.name
							}), /* @__PURE__ */ jsx("span", {
								className: "hidden text-[9px] tracking-[0.35em] text-muted-foreground uppercase sm:block",
								children: "Handloom Atelier"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("nav", {
						className: "hidden items-center justify-center gap-8 text-xs tracking-[0.18em] uppercase lg:flex",
						children: [megaMenu.map((group) => /* @__PURE__ */ jsxs("div", {
							className: "group relative",
							children: [/* @__PURE__ */ jsxs("button", {
								type: "button",
								className: "flex items-center gap-1 py-2 hover:text-primary",
								children: [
									group.label,
									" ",
									/* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" })
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "invisible absolute top-full left-1/2 w-56 -translate-x-1/2 rounded-2xl border border-border/70 bg-card p-4 opacity-0 shadow-lift transition-all duration-200 group-hover:visible group-hover:opacity-100",
								children: /* @__PURE__ */ jsx("ul", {
									className: "space-y-2 text-[13px] tracking-normal normal-case",
									children: group.items.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										to: i.to,
										className: "block rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
										children: i.label
									}) }, i.to))
								})
							})]
						}, group.label)), /* @__PURE__ */ jsx(Link, {
							to: "/sale",
							className: "text-primary hover:opacity-80",
							children: "Offers"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1 sm:gap-2",
						children: [
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setSearchOpen(true),
								"aria-label": "Search",
								className: "grid h-9 w-9 place-items-center rounded-full hover:bg-secondary",
								children: /* @__PURE__ */ jsx(Search, { className: "h-[18px] w-[18px]" })
							}),
							/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								"aria-label": "Language",
								className: "hidden h-9 w-9 place-items-center rounded-full hover:bg-secondary sm:grid",
								children: /* @__PURE__ */ jsx(Globe, { className: "h-[18px] w-[18px]" })
							}), /* @__PURE__ */ jsx(DropdownMenuContent, {
								align: "end",
								children: [
									"EN",
									"हिन्दी",
									"தமிழ்",
									"ಕನ್ನಡ"
								].map((l) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
									onClick: () => setLang(l),
									children: [
										l,
										" ",
										lang === l ? "·" : ""
									]
								}, l))
							})] }),
							/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsxs(DropdownMenuTrigger, {
								"aria-label": "Notifications",
								className: "relative hidden h-9 w-9 place-items-center rounded-full hover:bg-secondary sm:grid",
								children: [/* @__PURE__ */ jsx(Bell, { className: "h-[18px] w-[18px]" }), unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" })]
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								className: "w-72",
								children: [
									/* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Notifications" }),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									notifications.length > 0 ? notifications.map((n) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
										className: "flex-col items-start gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: `text-sm ${!n.is_read ? "font-semibold" : ""}`,
											children: n.title
										}), /* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: new Date(n.created_at).toLocaleDateString()
										})]
									}, n.id)) : /* @__PURE__ */ jsx("div", {
										className: "px-2 py-4 text-center text-sm text-muted-foreground",
										children: "No notifications"
									}),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									/* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsx(Link, {
											to: "/account/notifications",
											children: "View all"
										})
									})
								]
							})] }),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: toggle,
								"aria-label": "Toggle theme",
								className: "grid h-9 w-9 place-items-center rounded-full hover:bg-secondary",
								children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-[18px] w-[18px]" }) : /* @__PURE__ */ jsx(Moon, { className: "h-[18px] w-[18px]" })
							}),
							/* @__PURE__ */ jsxs(Link, {
								to: "/wishlist",
								"aria-label": "Wishlist",
								className: "relative grid h-9 w-9 place-items-center rounded-full hover:bg-secondary",
								children: [/* @__PURE__ */ jsx(Heart, { className: "h-[18px] w-[18px]" }), wishlist.length ? /* @__PURE__ */ jsx("span", {
									className: "absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground",
									children: wishlist.length
								}) : null]
							}),
							/* @__PURE__ */ jsxs(Link, {
								to: "/cart",
								"aria-label": "Cart",
								className: "relative grid h-9 w-9 place-items-center rounded-full hover:bg-secondary",
								children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "h-[18px] w-[18px]" }), cartCount ? /* @__PURE__ */ jsx("span", {
									className: "absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground",
									children: cartCount
								}) : null]
							}),
							/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								"aria-label": "Account",
								className: "grid h-9 w-9 place-items-center rounded-full hover:bg-secondary",
								children: /* @__PURE__ */ jsx(User, { className: "h-[18px] w-[18px]" })
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								className: "w-52",
								children: [
									/* @__PURE__ */ jsx(DropdownMenuLabel, { children: "My Account" }),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									session ? /* @__PURE__ */ jsxs(Fragment, { children: [
										/* @__PURE__ */ jsx(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Link, {
												to: "/account",
												children: "Dashboard"
											})
										}),
										/* @__PURE__ */ jsx(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Link, {
												to: "/orders",
												children: "My Orders"
											})
										}),
										/* @__PURE__ */ jsx(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Link, {
												to: "/wishlist",
												children: "Wishlist"
											})
										}),
										isAdmin && /* @__PURE__ */ jsx(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Link, {
												to: "/admin",
												className: "text-primary font-medium",
												children: "Admin Dashboard"
											})
										}),
										/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
										/* @__PURE__ */ jsx(DropdownMenuItem, {
											onClick: signOut,
											className: "cursor-pointer text-red-600",
											children: "Sign out"
										})
									] }) : /* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsx(Link, {
											to: "/auth",
											children: "Sign In"
										})
									})
								]
							})] })
						]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(SearchDialog, {
			open: searchOpen,
			onOpenChange: setSearchOpen
		})
	] });
}
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/layout/Footer.tsx
var columns = [
	{
		title: "The House",
		links: [
			{
				label: "About Us",
				to: "/about"
			},
			{
				label: "Brand Story",
				to: "/about"
			},
			{
				label: "Store Locator",
				to: "/contact"
			},
			{
				label: "Contact Us",
				to: "/contact"
			},
			{
				label: "Gift Cards",
				to: "/gift-cards"
			}
		]
	},
	{
		title: "Collections",
		links: [
			{
				label: "New Arrivals",
				to: "/new-arrivals"
			},
			{
				label: "Bridal",
				to: "/bridal"
			},
			{
				label: "Kanjivaram",
				to: "/kanjivaram"
			},
			{
				label: "Banarasi",
				to: "/banarasi"
			},
			{
				label: "Sale",
				to: "/sale"
			}
		]
	},
	{
		title: "Customer Care",
		links: [
			{
				label: "My Orders",
				to: "/account/orders"
			},
			{
				label: "Track Order",
				to: "/track-order"
			},
			{
				label: "Returns",
				to: "/account/returns"
			},
			{
				label: "Refunds",
				to: "/account/refunds"
			},
			{
				label: "FAQs",
				to: "/faqs"
			}
		]
	},
	{
		title: "Policies",
		links: [
			{
				label: "Privacy Policy",
				to: "/privacy-policy"
			},
			{
				label: "Terms of Use",
				to: "/terms"
			},
			{
				label: "Shipping Policy",
				to: "/shipping-policy"
			},
			{
				label: "Cancellation Policy",
				to: "/cancellation-policy"
			}
		]
	}
];
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "mt-24 border-t border-border/70 bg-secondary/40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 py-16 sm:px-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-12 lg:grid-cols-[1.3fr_2fr]",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-serif text-3xl",
							children: BRAND.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground",
							children: BRAND.tagline
						}),
						/* @__PURE__ */ jsxs("form", {
							className: "mt-8 flex max-w-sm gap-2",
							onSubmit: (e) => {
								e.preventDefault();
								toast.success("You're on the list", { description: "Look out for our fortnightly loom letter." });
							},
							children: [/* @__PURE__ */ jsx(Input, {
								type: "email",
								required: true,
								placeholder: "Your email",
								"aria-label": "Email",
								className: "rounded-full"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								className: "rounded-full px-6",
								children: "Join"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-8 flex gap-3",
							children: [
								Instagram,
								Facebook,
								Youtube,
								MessageCircle
							].map((Icon, i) => /* @__PURE__ */ jsx("a", {
								href: "#",
								"aria-label": "Social link",
								className: "grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-primary",
								children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
							}, i))
						})
					] }), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 gap-8 sm:grid-cols-4",
						children: columns.map((col) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: col.title
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-5 space-y-3 text-sm",
							children: col.links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: l.to,
								className: "text-muted-foreground transition-colors hover:text-foreground",
								children: l.label
							}) }, l.label))
						})] }, col.title))
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 border-t border-border/70 pt-10 sm:grid-cols-3",
					children: stores.map((s) => /* @__PURE__ */ jsxs("div", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "flex items-center gap-2 font-serif text-lg",
								children: [
									/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-gold" }),
									" ",
									s.city
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-muted-foreground",
								children: s.address
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground",
								children: s.phone
							})
						]
					}, s.city))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 flex flex-col gap-4 border-t border-border/70 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ jsxs("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						BRAND.name,
						" by ",
						BRAND.poweredBy,
						". All rights reserved."
					] }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-5",
						children: [/* @__PURE__ */ jsxs("a", {
							href: `mailto:${BRAND.email}`,
							className: "flex items-center gap-1.5 hover:text-foreground",
							children: [
								/* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5" }),
								" ",
								BRAND.email
							]
						}), /* @__PURE__ */ jsxs("a", {
							href: `tel:${BRAND.phone}`,
							className: "flex items-center gap-1.5 hover:text-foreground",
							children: [
								/* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5" }),
								" ",
								BRAND.phone
							]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/layout/FloatingWidgets.tsx
function FloatingWidgets() {
	const [showTop, setShowTop] = useState(false);
	const [chat, setChat] = useState(false);
	useEffect(() => {
		const onScroll = () => setShowTop(window.scrollY > 600);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6",
		children: [
			/* @__PURE__ */ jsx(AnimatePresence, { children: chat ? /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 20,
					scale: .96
				},
				animate: {
					opacity: 1,
					y: 0,
					scale: 1
				},
				exit: {
					opacity: 0,
					y: 20,
					scale: .96
				},
				className: "pointer-events-auto w-[19rem] overflow-hidden rounded-2xl glass shadow-lift",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-b border-border/60 px-4 py-3",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx(Headphones, { className: "h-4 w-4 text-gold" }), " Saree stylist"]
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setChat(false),
							"aria-label": "Close chat",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-3 px-4 py-4 text-sm",
						children: [/* @__PURE__ */ jsx("p", {
							className: "rounded-2xl rounded-bl-sm bg-secondary px-3 py-2",
							children: "Namaste! Tell us the occasion and budget — we'll shortlist three drapes for you."
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Typically replies in 2 minutes"
						})]
					}),
					/* @__PURE__ */ jsxs("form", {
						className: "flex items-center gap-2 border-t border-border/60 px-3 py-3",
						onSubmit: (e) => e.preventDefault(),
						children: [/* @__PURE__ */ jsx(Input, {
							placeholder: "Type a message",
							className: "h-9 rounded-full",
							"aria-label": "Message"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							"aria-label": "Send",
							className: "grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
						})]
					})
				]
			}) : null }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: showTop ? /* @__PURE__ */ jsx(motion.button, {
				type: "button",
				initial: {
					opacity: 0,
					scale: .8
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: .8
				},
				onClick: () => window.scrollTo({
					top: 0,
					behavior: "smooth"
				}),
				"aria-label": "Back to top",
				className: "pointer-events-auto grid h-11 w-11 place-items-center rounded-full glass shadow-soft",
				children: /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" })
			}) : null }),
			/* @__PURE__ */ jsx("a", {
				href: `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`,
				target: "_blank",
				rel: "noreferrer",
				"aria-label": "Chat on WhatsApp",
				className: "pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-jade text-jade-foreground shadow-lift transition-transform hover:scale-105",
				children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setChat((c) => !c),
				"aria-label": "Open live chat",
				className: "pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105",
				children: /* @__PURE__ */ jsx(Headphones, { className: "h-5 w-5" })
			})
		]
	});
}
//#endregion
//#region src/components/layout/SiteLayout.tsx
function SiteLayout({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(FloatingWidgets, {})
		]
	});
}
//#endregion
export { stores as C, products as S, discount as _, SheetTitle as a, images as b, DialogContent as c, useShop as d, BRAND as f, designers as g, collections as h, SheetContent as i, DialogTitle as l, collectionBySlug as m, Input as n, SheetTrigger as o, byId as p, Sheet as r, Dialog as s, SiteLayout as t, ShopProvider as u, filterGroups as v, testimonials as w, inr as x, gallery as y };
