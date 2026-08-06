import { Link, Outlet } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { LayoutDashboard, Package, Settings, ShoppingCart, Users } from "lucide-react";
//#region src/routes/admin.tsx?tsr-split=component
function AdminLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen bg-muted/20",
		children: [/* @__PURE__ */ jsxs("aside", {
			className: "w-64 bg-card border-r border-border hidden md:flex flex-col",
			children: [/* @__PURE__ */ jsx("div", {
				className: "p-6",
				children: /* @__PURE__ */ jsx("h2", {
					className: "text-xl font-serif font-bold text-primary tracking-wide",
					children: "ElegantlyWoven Admin"
				})
			}), /* @__PURE__ */ jsxs("nav", {
				className: "flex-1 px-4 space-y-2",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						to: "/admin",
						className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
						activeProps: { className: "bg-primary/10 text-primary" },
						children: [/* @__PURE__ */ jsx(LayoutDashboard, { size: 18 }), "Dashboard"]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/admin/products",
						className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
						activeProps: { className: "bg-primary/10 text-primary" },
						children: [/* @__PURE__ */ jsx(Package, { size: 18 }), "Products"]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/admin/orders",
						className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
						activeProps: { className: "bg-primary/10 text-primary" },
						children: [/* @__PURE__ */ jsx(ShoppingCart, { size: 18 }), "Orders"]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/admin/customers",
						className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
						activeProps: { className: "bg-primary/10 text-primary" },
						children: [/* @__PURE__ */ jsx(Users, { size: 18 }), "Customers"]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/admin/settings",
						className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
						activeProps: { className: "bg-primary/10 text-primary" },
						children: [/* @__PURE__ */ jsx(Settings, { size: 18 }), "Settings"]
					})
				]
			})]
		}), /* @__PURE__ */ jsx("main", {
			className: "flex-1 p-8",
			children: /* @__PURE__ */ jsx(Outlet, {})
		})]
	});
}
//#endregion
export { AdminLayout as component };
