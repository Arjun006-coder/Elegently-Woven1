import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/routes/admin/products.new.tsx?tsr-split=component
function AddProduct() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [imageFiles, setImageFiles] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		slug: "",
		description: "",
		price: "",
		status: "published",
		category: "",
		color: "",
		size: "Free Size",
		stock: "10",
		images: ""
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let uploadedUrls = [];
		if (imageFiles.length > 0) for (const file of imageFiles) {
			const fileExt = file.name.split(".").pop();
			const filePath = `${`${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`}`;
			const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, file);
			if (uploadError) {
				console.error("Error uploading image:", uploadError);
				alert("Failed to upload image: " + uploadError.message);
				setLoading(false);
				return;
			}
			const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
			if (data?.publicUrl) uploadedUrls.push(data.publicUrl);
		}
		const { error } = await supabase.from("products").insert({
			name: formData.name,
			slug: formData.slug || formData.name.toLowerCase().replace(/[\s_]+/g, "-"),
			description: formData.description,
			price: parseFloat(formData.price),
			status: formData.status,
			category: formData.category,
			color: formData.color,
			size: formData.size,
			stock: parseInt(formData.stock, 10),
			images: uploadedUrls.length > 0 ? uploadedUrls : formData.images.split(",").map((url) => url.trim()).filter(Boolean)
		});
		setLoading(false);
		if (error) alert("Error saving product: " + error.message);
		else navigate({ to: "/admin/products" });
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-3xl mx-auto space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold tracking-tight text-foreground font-serif",
			children: "Add Product"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Create a new product listing in your store."
		})] }), /* @__PURE__ */ jsxs("form", {
			onSubmit: handleSubmit,
			className: "space-y-6 bg-card p-6 md:p-8 border rounded-xl shadow-sm",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Product Name *"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							placeholder: "e.g. Kanjivaram Silk Saree"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Category"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.category,
							onChange: (e) => setFormData({
								...formData,
								category: e.target.value
							}),
							placeholder: "e.g. Silk, Cotton, Banarasi"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Color"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.color,
							onChange: (e) => setFormData({
								...formData,
								color: e.target.value
							}),
							placeholder: "e.g. Emerald Green, Maroon"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Size"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.size,
							onChange: (e) => setFormData({
								...formData,
								size: e.target.value
							}),
							placeholder: "e.g. Free Size, S, M, L"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Initial Stock Quantity *"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "number",
							min: "0",
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.stock,
							onChange: (e) => setFormData({
								...formData,
								stock: e.target.value
							}),
							placeholder: "10"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Price (₹) *"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "number",
							min: "0",
							step: "0.01",
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.price,
							onChange: (e) => setFormData({
								...formData,
								price: e.target.value
							}),
							placeholder: "9999.00"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Status"
						}), /* @__PURE__ */ jsxs("select", {
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.status,
							onChange: (e) => setFormData({
								...formData,
								status: e.target.value
							}),
							children: [/* @__PURE__ */ jsx("option", {
								value: "published",
								children: "Published (Active)"
							}), /* @__PURE__ */ jsx("option", {
								value: "draft",
								children: "Draft (Hidden)"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2 md:col-span-2",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Product Images (Upload)"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "file",
								multiple: true,
								accept: "image/*",
								className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
								onChange: (e) => {
									if (e.target.files) setImageFiles(Array.from(e.target.files));
								}
							}),
							imageFiles.length > 0 && /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: [imageFiles.length, " file(s) selected."]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mt-4",
								children: "OR Image URLs (comma separated)"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
								value: formData.images,
								onChange: (e) => setFormData({
									...formData,
									images: e.target.value
								}),
								placeholder: "https://example.com/image1.jpg, https://example.com/image2.jpg",
								disabled: imageFiles.length > 0
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "URL Slug (Optional)"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.slug,
							onChange: (e) => setFormData({
								...formData,
								slug: e.target.value
							}),
							placeholder: "e.g. kanjivaram-silk-saree-101"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Description"
						}), /* @__PURE__ */ jsx("textarea", {
							rows: 5,
							className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
							value: formData.description,
							onChange: (e) => setFormData({
								...formData,
								description: e.target.value
							}),
							placeholder: "Detailed product information..."
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "pt-6 flex gap-4 border-t mt-6",
				children: [/* @__PURE__ */ jsxs(Button, {
					type: "submit",
					disabled: loading,
					className: "w-full sm:w-auto px-8",
					children: [loading ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : null, "Save Product"]
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					className: "w-full sm:w-auto px-8",
					onClick: () => navigate({ to: "/admin/products" }),
					children: "Cancel"
				})]
			})]
		})]
	});
}
//#endregion
export { AddProduct as component };
