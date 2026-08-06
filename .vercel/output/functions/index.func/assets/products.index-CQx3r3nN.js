import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Eye, Loader2, Minus, Plus, Trash2 } from "lucide-react";
//#region src/components/ui/table.tsx
var Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ jsx("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
//#endregion
//#region src/routes/admin/products.index.tsx?tsr-split=component
function AdminProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchProducts();
	}, []);
	async function fetchProducts() {
		setLoading(true);
		const { data, error } = await supabase.from("products").select("id, name, price, status, slug, stock, views_count, category, color").order("created_at", { ascending: false });
		if (error) console.error("Error fetching products:", error);
		else setProducts(data || []);
		setLoading(false);
	}
	async function deleteProduct(id) {
		if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) toast.error("Failed to delete product");
		else {
			toast.success("Product deleted successfully");
			fetchProducts();
		}
	}
	async function updateStock(id, currentStock, change) {
		const newStock = Math.max(0, currentStock + change);
		setProducts(products.map((p) => p.id === id ? {
			...p,
			stock: newStock
		} : p));
		const { error } = await supabase.from("products").update({ stock: newStock }).eq("id", id);
		if (error) {
			toast.error("Failed to update stock");
			fetchProducts();
		}
	}
	const totalViews = products.reduce((sum, p) => sum + (p.views_count || 0), 0);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-bold tracking-tight text-foreground font-serif",
					children: "Inventory & Analytics"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-1",
					children: "Manage stock quantities and track product views."
				})] }), /* @__PURE__ */ jsx(Link, {
					to: "/admin/products/new",
					children: /* @__PURE__ */ jsxs(Button, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Plus, { size: 16 }), " Add Product"]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-card border p-6 rounded-xl shadow-sm",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Total Products"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-3xl font-serif mt-2",
							children: products.length
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-card border p-6 rounded-xl shadow-sm",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Low Stock Alerts"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-3xl font-serif mt-2 text-red-500",
							children: products.filter((p) => p.stock < 5).length
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-card border p-6 rounded-xl shadow-sm",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Total Product Views"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mt-2",
							children: [/* @__PURE__ */ jsx(Eye, { className: "text-blue-500 h-8 w-8" }), /* @__PURE__ */ jsx("p", {
								className: "text-3xl font-serif",
								children: totalViews
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "border rounded-lg bg-card overflow-hidden",
				children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsx(TableHead, { children: "Product Info" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Status" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Views" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Stock Qty" }),
					/* @__PURE__ */ jsx(TableHead, {
						className: "text-right",
						children: "Actions"
					})
				] }) }), /* @__PURE__ */ jsx(TableBody, { children: loading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
					colSpan: 5,
					className: "h-24 text-center",
					children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin mx-auto text-muted-foreground" })
				}) }) : products.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
					colSpan: 5,
					className: "h-24 text-center text-muted-foreground",
					children: "No products found. Add your first product!"
				}) }) : products.map((product) => /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsxs(TableCell, { children: [/* @__PURE__ */ jsx("p", {
						className: "font-medium",
						children: product.name
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							product.category || "Uncategorized",
							" · ",
							product.color || "No color",
							" · ₹",
							product.price?.toFixed(2)
						]
					})] }),
					/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", {
						className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`,
						children: product.status || "Draft"
					}) }),
					/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx(Eye, { size: 14 }),
							" ",
							product.views_count || 0
						]
					}) }),
					/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(Button, {
								variant: "outline",
								size: "icon",
								className: "h-7 w-7",
								onClick: () => updateStock(product.id, product.stock || 0, -1),
								children: /* @__PURE__ */ jsx(Minus, { size: 12 })
							}),
							/* @__PURE__ */ jsx("span", {
								className: `w-6 text-center font-medium ${product.stock < 5 ? "text-red-500" : ""}`,
								children: product.stock || 0
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "outline",
								size: "icon",
								className: "h-7 w-7",
								onClick: () => updateStock(product.id, product.stock || 0, 1),
								children: /* @__PURE__ */ jsx(Plus, { size: 12 })
							})
						]
					}) }),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-right space-x-2",
						children: /* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => deleteProduct(product.id),
							className: "text-red-600 border-red-200 hover:bg-red-50",
							children: [/* @__PURE__ */ jsx(Trash2, {
								size: 14,
								className: "mr-1"
							}), " Delete"]
						})
					})
				] }, product.id)) })] })
			})
		]
	});
}
//#endregion
export { AdminProducts as component };
