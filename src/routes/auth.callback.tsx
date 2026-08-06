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
    // Supabase handles the OAuth hash automatically via the client.
    // We just wait for the session to be established and then redirect.
    const processCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth callback error:", error);
        setError(error.message);
        return;
      }

      if (data.session) {
        // Successful login!
        navigate({ to: "/account", replace: true });
      } else {
        // Give it a brief moment if the hash is still processing
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            subscription.unsubscribe();
            navigate({ to: "/account", replace: true });
          }
        });
        
        // Timeout after 5 seconds if no session is created
        setTimeout(() => {
          if (!data.session) {
            subscription.unsubscribe();
            setError("Authentication failed or timed out. Please try again.");
          }
        }, 5000);
      }
    };

    processCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-serif text-red-800 mb-4">Authentication Error</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <button
          onClick={() => navigate({ to: "/auth" })}
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
      <h2 className="text-xl font-serif tracking-wide">Completing Sign In...</h2>
      <p className="text-sm text-muted-foreground mt-2">Please wait while we securely log you in.</p>
    </div>
  );
}
