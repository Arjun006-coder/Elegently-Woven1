import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      // Clear sensitive query/hash from URL bar immediately for security
      if (typeof window !== "undefined" && (window.location.hash || window.location.search)) {
        try {
          window.history.replaceState(null, "", window.location.pathname);
        } catch {}
      }

      const { data, error: sessionErr } = await supabase.auth.getSession();
      
      if (sessionErr) {
        console.error("Auth callback error:", sessionErr);
        setError(sessionErr.message);
        return;
      }

      if (data.session) {
        // Session established securely!
        navigate({ to: "/account", replace: true });
      } else {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            subscription.unsubscribe();
            navigate({ to: "/account", replace: true });
          }
        });

        // 4 second timeout fallback
        setTimeout(async () => {
          const { data: check } = await supabase.auth.getSession();
          if (check.session) {
            subscription.unsubscribe();
            navigate({ to: "/account", replace: true });
          } else {
            subscription.unsubscribe();
            setError("Session verification expired. Please sign in again.");
          }
        }, 4000);
      }
    };

    processCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-serif text-red-800 mb-4">Security Verification</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
        <button
          onClick={() => navigate({ to: "/auth", replace: true })}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium tracking-wide uppercase"
        >
          Return to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <h2 className="text-xl font-serif tracking-wide">Completing Secure Sign In...</h2>
      <p className="text-sm text-muted-foreground mt-2">Authenticating credentials with PKCE security protocol.</p>
    </div>
  );
}
