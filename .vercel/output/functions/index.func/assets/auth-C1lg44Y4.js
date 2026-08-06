import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/auth" });
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) navigate({
				to: search.redirect || "/account",
				replace: true
			});
			else setLoading(false);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (session) navigate({
				to: search.redirect || "/account",
				replace: true
			});
		});
		return () => subscription.unsubscribe();
	}, [navigate, search.redirect]);
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md space-y-8 bg-background p-8 rounded-xl shadow-sm border border-border",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "mt-6 text-3xl font-bold tracking-tight text-foreground font-serif",
					children: "Welcome to ElegantlyWoven"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Sign in to your account or create a new one"
				})]
			}), /* @__PURE__ */ jsx(Auth, {
				supabaseClient: supabase,
				appearance: {
					theme: ThemeSupa,
					variables: { default: { colors: {
						brand: "hsl(14, 48%, 33%)",
						brandAccent: "hsl(14, 48%, 28%)"
					} } },
					className: {
						container: "auth-container",
						button: "auth-button",
						input: "auth-input"
					}
				},
				theme: "default",
				providers: ["google"],
				redirectTo: `${window.location.origin}/auth/callback`
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
