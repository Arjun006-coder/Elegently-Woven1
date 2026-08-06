import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/routes/auth.callback.tsx?tsr-split=component
function AuthCallback() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	useEffect(() => {
		const processCallback = async () => {
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				console.error("Auth callback error:", error);
				setError(error.message);
				return;
			}
			if (data.session) navigate({
				to: "/account",
				replace: true
			});
			else {
				const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
					if (session) {
						subscription.unsubscribe();
						navigate({
							to: "/account",
							replace: true
						});
					}
				});
				setTimeout(() => {
					if (!data.session) {
						subscription.unsubscribe();
						setError("Authentication failed or timed out. Please try again.");
					}
				}, 5e3);
			}
		};
		processCallback();
	}, [navigate]);
	if (error) return /* @__PURE__ */ jsxs("div", {
		className: "min-h-[60vh] flex flex-col items-center justify-center p-4 text-center",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-2xl font-serif text-red-800 mb-4",
				children: "Authentication Error"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mb-6",
				children: error
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => navigate({ to: "/auth" }),
				className: "bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium tracking-wide uppercase",
				children: "Return to Sign In"
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-[60vh] flex flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-primary mb-4" }),
			/* @__PURE__ */ jsx("h2", {
				className: "text-xl font-serif tracking-wide",
				children: "Completing Sign In..."
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground mt-2",
				children: "Please wait while we securely log you in."
			})
		]
	});
}
//#endregion
export { AuthCallback as component };
