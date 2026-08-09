import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Heart,
  MapPin,
  Bell,
  Package,
  ShieldCheck,
  RotateCcw,
  Truck,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const SEEN_WELCOME_KEY = "ew_welcome_seen_v2";

const steps = [
  {
    icon: ShoppingBag,
    title: "Browse & Buy Premium Sarees",
    desc: "Explore 500+ handloom sarees. Use filters to find by weave, occasion, or price. Add to bag and checkout in 3 simple steps.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Heart,
    title: "Save to Your Wishlist",
    desc: "Tap the heart icon on any product to save it. Your wishlist syncs across devices when you're logged in.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: MapPin,
    title: "Manage Delivery Addresses",
    desc: "Save multiple addresses (Home, Office, etc.) in My Account → Addresses for faster checkout every time.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Package,
    title: "Track Your Orders",
    desc: "All your orders live in My Account → Orders. You'll also get email and in-app notifications at every order milestone.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: ShieldCheck,
    title: "Our Guarantees & Policies",
    desc: "7-day returns · 15-day replacement · Free shipping over ₹2,999 · GST invoice with every order · COD available.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Only show once per user, after login
    const checkAndShow = async () => {
      const seen = localStorage.getItem(SEEN_WELCOME_KEY);
      if (seen) return;

      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Delay slightly so the page is ready
        setTimeout(() => setOpen(true), 800);
      }
    };

    checkAndShow();

    // Also listen for fresh login events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        const seen = localStorage.getItem(SEEN_WELCOME_KEY);
        if (!seen) {
          setTimeout(() => setOpen(true), 1000);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleClose = () => {
    localStorage.setItem(SEEN_WELCOME_KEY, "1");
    setOpen(false);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const currentStep = steps[step]!;
  const Icon = currentStep.icon;
  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-background rounded-3xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 grid h-8 w-8 place-items-center rounded-full hover:bg-secondary transition-colors text-muted-foreground"
              aria-label="Close welcome guide"
            >
              <X size={16} />
            </button>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 pt-6 px-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? "w-8 bg-primary" : i < step ? "w-3 bg-primary/40" : "w-3 bg-border"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Icon */}
            <div className="flex justify-center mt-6">
              <div className={`grid h-20 w-20 place-items-center rounded-3xl ${currentStep.bg}`}>
                <Icon className={`h-10 w-10 ${currentStep.color}`} />
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="px-8 pt-5 pb-2 text-center"
              >
                <h2 className="text-xl font-serif font-bold text-foreground">{currentStep.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{currentStep.desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Policy quick links on last step */}
            {isLast && (
              <div className="mx-8 mt-4 grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "Shipping Policy", href: "/shipping-policy" },
                  { label: "Return Policy", href: "/cancellation-policy" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms & Conditions", href: "/terms" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleClose}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    <ChevronRight size={12} className="shrink-0" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 p-8 pt-6">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 h-11 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium tracking-wide uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {isLast ? (
                  <>
                    <Check size={15} /> Start Shopping
                  </>
                ) : (
                  <>
                    Next <ChevronRight size={15} />
                  </>
                )}
              </button>
            </div>

            {/* Skip all */}
            {!isLast && (
              <button
                onClick={handleClose}
                className="w-full pb-5 text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip intro
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
