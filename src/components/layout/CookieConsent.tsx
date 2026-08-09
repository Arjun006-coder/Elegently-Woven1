import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Cookie, X, Settings, Check } from "lucide-react";

const COOKIE_CONSENT_KEY = "ew_cookie_consent";

interface CookiePrefs {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) {
      // Show after a short delay
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const consent = { essential: true, analytics: true, marketing: true, timestamp: Date.now() };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const acceptSelected = () => {
    const consent = { ...prefs, timestamp: Date.now() };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const rejectAll = () => {
    const consent = { essential: true, analytics: false, marketing: false, timestamp: Date.now() };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-[998] md:left-auto md:right-6 md:bottom-6 md:max-w-sm"
        >
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Cookie className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-sm">We use cookies 🍪</h3>
                </div>
                <button
                  onClick={rejectAll}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                  aria-label="Decline all cookies"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                We use cookies to improve your shopping experience, remember your cart, and show relevant products. See our{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 space-y-2.5 border-t border-border pt-3"
                >
                  {[
                    {
                      key: "essential",
                      label: "Essential Cookies",
                      desc: "Required for the site to work (cart, auth). Cannot be disabled.",
                      fixed: true,
                    },
                    {
                      key: "analytics",
                      label: "Analytics Cookies",
                      desc: "Help us understand which pages are popular so we can improve.",
                      fixed: false,
                    },
                    {
                      key: "marketing",
                      label: "Marketing Cookies",
                      desc: "Used to show you relevant products on other websites.",
                      fixed: false,
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={prefs[item.key as keyof CookiePrefs] as boolean}
                          disabled={item.fixed}
                          onChange={(e) =>
                            !item.fixed &&
                            setPrefs((p) => ({ ...p, [item.key]: e.target.checked }))
                          }
                        />
                        <div
                          className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                            prefs[item.key as keyof CookiePrefs]
                              ? "bg-primary border-primary"
                              : "border-border bg-background"
                          } ${item.fixed ? "opacity-60" : ""}`}
                        >
                          {prefs[item.key as keyof CookiePrefs] && (
                            <Check size={10} className="text-primary-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="flex gap-2 border-t border-border px-5 py-3 bg-secondary/20">
              <button
                onClick={() => setShowDetails((s) => !s)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings size={12} /> {showDetails ? "Hide" : "Manage"}
              </button>

              <div className="ml-auto flex gap-2">
                {showDetails ? (
                  <button
                    onClick={acceptSelected}
                    className="h-8 px-3 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Save Choices
                  </button>
                ) : (
                  <>
                    <button
                      onClick={rejectAll}
                      className="h-8 px-3 rounded-full text-xs font-medium border border-border hover:bg-secondary transition-colors"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={acceptAll}
                      className="h-8 px-3 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Accept All
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
