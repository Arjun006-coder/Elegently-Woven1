import { t as cn } from "./utils-C_uf36nf.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { IndianRupee, Package, ShoppingCart, Users } from "lucide-react";
//#region src/components/ui/card.tsx
var Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
//#region src/routes/admin/index.tsx?tsr-split=component
function AdminDashboard() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight text-foreground font-serif",
				children: "Dashboard"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "Overview of your store's performance."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-sm font-medium",
							children: "Total Revenue"
						}), /* @__PURE__ */ jsx(IndianRupee, { className: "h-4 w-4 text-muted-foreground" })]
					}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("div", {
						className: "text-2xl font-bold",
						children: "₹0.00"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "+0% from last month"
					})] })] }),
					/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-sm font-medium",
							children: "Orders"
						}), /* @__PURE__ */ jsx(ShoppingCart, { className: "h-4 w-4 text-muted-foreground" })]
					}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("div", {
						className: "text-2xl font-bold",
						children: "+0"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "+0% from last month"
					})] })] }),
					/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-sm font-medium",
							children: "Active Products"
						}), /* @__PURE__ */ jsx(Package, { className: "h-4 w-4 text-muted-foreground" })]
					}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("div", {
						className: "text-2xl font-bold",
						children: "0"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Ready for sale"
					})] })] }),
					/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-sm font-medium",
							children: "Total Customers"
						}), /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-muted-foreground" })]
					}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("div", {
						className: "text-2xl font-bold",
						children: "+0"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "New registered users"
					})] })] })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-7",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "col-span-4",
					children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Recent Orders" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground text-center py-12",
						children: "No orders yet."
					}) })]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "col-span-3",
					children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Low Stock Alerts" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground text-center py-12",
						children: "All inventory levels are good."
					}) })]
				})]
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
