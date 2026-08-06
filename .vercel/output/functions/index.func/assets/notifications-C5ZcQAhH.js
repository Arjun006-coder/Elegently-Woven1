import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { n as getSession } from "./auth-DZmPN7vG.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, Heart, Loader2, Package, Tag } from "lucide-react";
//#region src/routes/account/notifications.tsx?tsr-split=component
var ICON_MAP = {
	Package,
	Tag,
	Heart,
	Bell
};
function AccountNotifications() {
	const [session, setSession] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getSession().then((session) => {
			setSession(session);
			if (session) fetchNotifications(session.user.id);
		});
	}, []);
	async function fetchNotifications(userId) {
		setLoading(true);
		const { data, error } = await supabase.from("notifications").select("*").eq("user_id", userId).order("created_at", { ascending: false });
		if (!error && data) setNotifications(data);
		setLoading(false);
	}
	async function markAsRead(id) {
		if (!session) return;
		setNotifications(notifications.map((n) => n.id === id ? {
			...n,
			is_read: true
		} : n));
		await supabase.from("notifications").update({ is_read: true }).eq("id", id).eq("user_id", session.user.id);
	}
	if (!session) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-serif font-bold text-foreground tracking-wide",
			children: "Notifications"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-2",
			children: "Stay updated on your orders and exclusive offers."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden",
			children: loading ? /* @__PURE__ */ jsx("div", {
				className: "flex justify-center p-12",
				children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
			}) : notifications.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "divide-y divide-border",
				children: notifications.map((notification) => {
					const Icon = ICON_MAP[notification.icon] || Bell;
					return /* @__PURE__ */ jsxs("div", {
						className: `p-6 flex gap-4 transition-colors hover:bg-muted/30 cursor-pointer ${!notification.is_read ? "bg-primary/5" : ""}`,
						onClick: () => !notification.is_read && markAsRead(notification.id),
						children: [/* @__PURE__ */ jsx("div", {
							className: `shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${!notification.is_read ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`,
							children: /* @__PURE__ */ jsx(Icon, { size: 18 })
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-start gap-4",
								children: [/* @__PURE__ */ jsx("h4", {
									className: `text-base font-medium ${!notification.is_read ? "text-foreground" : "text-foreground/80"}`,
									children: notification.title
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground whitespace-nowrap",
									children: new Date(notification.created_at).toLocaleDateString()
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground mt-1 leading-relaxed",
								children: notification.description
							})]
						})]
					}, notification.id);
				})
			}) : /* @__PURE__ */ jsxs("div", {
				className: "p-12 text-center",
				children: [
					/* @__PURE__ */ jsx(Bell, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" }),
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-medium mb-2",
						children: "No notifications yet"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground",
						children: "We'll let you know when there are updates to your orders or account."
					})
				]
			})
		})]
	});
}
//#endregion
export { AccountNotifications as component };
