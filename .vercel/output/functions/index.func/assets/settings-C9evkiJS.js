import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/admin/settings.tsx?tsr-split=component
function AdminSettings() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold tracking-tight text-foreground font-serif",
			children: "Settings"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Configure your store preferences and system settings."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "bg-card p-6 border rounded-xl shadow-sm text-center",
			children: /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: "Settings configuration panel coming soon."
			})
		})]
	});
}
//#endregion
export { AdminSettings as component };
