import { n as getSession } from "./auth-DZmPN7vG.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, MapPin, Package } from "lucide-react";
//#region src/routes/account/index.tsx?tsr-split=component
function AccountDashboard() {
	const [session, setSession] = useState(null);
	useEffect(() => {
		getSession().then(setSession);
	}, []);
	if (!session) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-serif font-bold text-foreground tracking-wide",
					children: "Dashboard"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-2",
					children: "Manage your orders, addresses, and account details."
				})] }), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					className: "hidden sm:flex",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						children: "Back to Store"
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bg-primary/10 p-2 rounded-full",
								children: /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 text-primary" })
							}), /* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-lg",
								children: "Recent Orders"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground text-sm flex-1",
							children: "You haven't placed any orders yet."
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "link",
							className: "px-0 mt-4 self-start text-primary group",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/account/orders",
								children: ["View all orders ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bg-primary/10 p-2 rounded-full",
								children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-primary" })
							}), /* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-lg",
								children: "Shipping Addresses"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground text-sm flex-1",
							children: "Manage your delivery locations."
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "link",
							className: "px-0 mt-4 self-start text-primary group",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/account/addresses",
								children: ["Manage addresses ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-card border border-border p-6 rounded-xl shadow-sm",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-semibold text-lg mb-4",
					children: "Account Details"
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-4 text-sm",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-border/50 pb-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground font-medium",
								children: "Name"
							}), /* @__PURE__ */ jsx("span", {
								className: "sm:col-span-2",
								children: session.user.user_metadata?.full_name || "Not provided"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-border/50 pb-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground font-medium",
								children: "Email address"
							}), /* @__PURE__ */ jsx("span", {
								className: "sm:col-span-2",
								children: session.user.email
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground font-medium",
								children: "Security"
							}), /* @__PURE__ */ jsxs("span", {
								className: "sm:col-span-2 text-jade flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-jade" }), " Authenticated via Provider"]
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { AccountDashboard as component };
