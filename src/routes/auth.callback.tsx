import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { sendOrderEmail } from "../lib/email";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // PKCE flow: exchange the ?code= query param for a real session
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
          // PKCE: exchange code for session (secure — token never in URL)
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
            setError(exchangeError.message);
            return;
          }
          if (data.session) {
            await handleSuccessfulLogin(data.session.user);
            return;
          }
        }

        // Fallback: check if session already exists (implicit flow or re-visit)
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          setError(sessionError.message);
          return;
        }

        if (sessionData.session) {
          await handleSuccessfulLogin(sessionData.session.user);
          return;
        }

        // Last resort: listen for auth state change
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (session) {
            subscription.unsubscribe();
            await handleSuccessfulLogin(session.user);
          }
        });

        // Timeout after 8 seconds
        setTimeout(() => {
          subscription.unsubscribe();
          setError("Authentication timed out. Please try signing in again.");
        }, 8000);

      } catch (err: any) {
        console.error("Auth callback exception:", err);
        setError(err.message || "An unexpected error occurred during sign-in.");
      }
    };

    const handleSuccessfulLogin = async (user: any) => {
      // Clean sensitive tokens/codes from URL bar
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }

      // Send welcome email (non-blocking, fire and forget)
      if (user?.email) {
        sendOrderEmail({
          type: "welcome",
          to: user.email,
          customerName:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email.split("@")[0] ||
            "Valued Customer",
        });
      }
      navigate({ to: "/account", replace: true });
    };

    processCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-serif text-red-800 mb-4">Sign-In Error</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">{error}</p>
        <button
          onClick={() => navigate({ to: "/auth" })}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium tracking-wide uppercase hover:opacity-90 transition-opacity"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <h2 className="text-xl font-serif tracking-wide">Completing Sign In...</h2>
      <p className="text-sm text-muted-foreground mt-2">Please wait while we securely log you in.</p>
    </div>
  );
}
