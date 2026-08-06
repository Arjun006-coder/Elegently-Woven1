import { a as signOut, n as getSession } from "./auth-DZmPN7vG.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, CreditCard, LayoutDashboard, LogOut, MapPin, ShoppingBag, User } from "lucide-react";
//#region src/routes/account.tsx?tsr-split=component
function AccountLayout() {
	const [session, setSession] = useState(null);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	useEffect(() => {
		getSession().then(setSession);
	}, []);
	if (!session) return null;
	const navItems = [
		{
			label: "Dashboard",
			to: "/account",
			icon: LayoutDashboard
		},
		{
			label: "Orders",
			to: "/account/orders",
			icon: ShoppingBag
		},
		{
			label: "Addresses",
			to: "/account/addresses",
			icon: MapPin
		},
		{
			label: "Payment Methods",
			to: "/account/payments",
			icon: CreditCard
		},
		{
			label: "Notifications",
			to: "/account/notifications",
			icon: Bell
		}
	];
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col md:flex-row gap-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "w-full md:w-64 shrink-0 space-y-2",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "p-4 bg-muted/30 rounded-xl mb-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mb-2",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bg-primary/10 p-2 rounded-full text-primary",
								children: /* @__PURE__ */ jsx(User, { size: 24 })
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-semibold truncate",
									children: session.user.user_metadata?.full_name || "My Account"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground truncate",
									children: session.user.email
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "space-y-1",
						children: navItems.map((item) => {
							const isActive = pathname === item.to;
							return /* @__PURE__ */ jsxs(Link, {
								to: item.to,
								className: cn("flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"),
								children: [/* @__PURE__ */ jsx(item.icon, { size: 18 }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "pt-8",
						children: /* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							className: "w-full flex items-center justify-center gap-2",
							onClick: signOut,
							children: [/* @__PURE__ */ jsx(LogOut, { size: 16 }), " Sign Out"]
						})
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex-1 min-w-0",
				children: /* @__PURE__ */ jsx(Outlet, {})
			})]
		})
	});
}
//#endregion
export { AccountLayout as component };
