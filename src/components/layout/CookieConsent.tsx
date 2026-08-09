import { useState, useEffect } from "react";
import { Cookie, X, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ew_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("ew_cookie_consent", "all");
    localStorage.setItem("ew_cookie_timestamp", new Date().toISOString());
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("ew_cookie_consent", "essential");
    localStorage.setItem("ew_cookie_timestamp", new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-500 sm:left-6 sm:right-auto">
      <div className="rounded-2xl border border-gold/30 bg-card/95 p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 text-primary">
            <Cookie className="h-5 w-5 text-gold shrink-0" />
            <h4 className="font-serif text-base font-semibold tracking-wide">Cookie & Privacy Preferences</h4>
          </div>
          <button
            onClick={acceptEssential}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
          We use cookies and local cache storage to personalize your saree browsing experience, save your shopping bag, and optimize speed. Read our{" "}
          <Link to="/privacy-policy" className="underline text-foreground hover:text-gold">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            onClick={acceptAll}
            className="rounded-full bg-primary text-primary-foreground text-xs px-5 hover:bg-primary/90"
          >
            <Check className="mr-1.5 h-3.5 w-3.5" /> Accept All
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={acceptEssential}
            className="rounded-full text-xs px-4"
          >
            Essential Only
          </Button>
          <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1">
            <Shield className="h-3 w-3 text-jade" /> SSL Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
