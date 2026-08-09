import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sparkles, ShieldCheck, Mail, BookOpen, Check } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [collectionOptIn, setCollectionOptIn] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  async function checkOnboarding() {
    const session = await getSession();
    if (!session) return;

    const uid = session.user.id;
    setUserId(uid);
    setUserEmail(session.user.email || "");
    setUserName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Valued Customer");

    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", uid)
      .maybeSingle();

    if (profile && !profile.onboarding_completed) {
      setOpen(true);
    }
  }

  async function handleCompleteOnboarding() {
    if (!termsAccepted) {
      toast.error("Please accept the Terms & Privacy Policy to continue");
      return;
    }

    setSaving(true);
    if (userId) {
      const { error } = await supabase
        .from("profiles")
        .update({
          onboarding_completed: true,
          collection_updates_opt_in: collectionOptIn,
          marketing_opt_in: collectionOptIn,
          terms_accepted_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        console.warn("Profile onboarding update warning:", error);
      }
    }

    setSaving(false);
    setOpen(false);
    toast.success(`Welcome to ElegantlyWoven, ${userName}!`, {
      description: collectionOptIn
        ? "You're now subscribed to exclusive luxury collection drops."
        : "Your account preferences have been saved.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 border-gold/30">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-gold/10 text-gold">
            <Sparkles className="h-6 w-6" />
          </div>
          <DialogTitle className="font-serif text-2xl font-normal tracking-wide">
            Welcome to ElegantlyWoven
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            Handcrafted Silk & Handloom Atelier · User Guide & Member Terms
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2 text-sm text-foreground">
          {/* Quick User Guide Section */}
          <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3">
            <h4 className="font-serif font-medium text-base text-primary flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gold" /> Member Shopping Guide
            </h4>
            <ul className="text-xs space-y-2 text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-gold font-bold">•</span>
                <span><strong>Silk Mark Authenticity:</strong> Every saree comes with a Silk Mark certification tag & loom origin certificate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold font-bold">•</span>
                <span><strong>Live Tracking & Invoices:</strong> View order timelines and download printable tax invoices anytime in your <Link to="/account/orders" className="text-primary underline">My Orders</Link> dashboard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold font-bold">•</span>
                <span><strong>7-Day Easy Returns:</strong> Insured shipping with doorstep exchange guarantee across India.</span>
              </li>
            </ul>
          </div>

          {/* Opt-In & Preferences */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-gold/30 bg-accent/30 cursor-pointer hover:bg-accent/50 transition-colors">
              <Checkbox
                id="optin"
                checked={collectionOptIn}
                onCheckedChange={(v) => setCollectionOptIn(!!v)}
                className="mt-0.5"
              />
              <div className="min-w-0 flex-1 text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-gold" /> Opt-In to New Collection Email Drops
                </span>
                <p className="text-muted-foreground mt-1 leading-snug">
                  Receive classy email updates with photos & details whenever a new handloom saree collection is added to stock.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-border cursor-pointer">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(v) => setTermsAccepted(!!v)}
                className="mt-0.5"
              />
              <div className="min-w-0 flex-1 text-xs text-muted-foreground">
                I accept the{" "}
                <Link to="/terms" className="text-primary underline" target="_blank">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="text-primary underline" target="_blank">
                  Privacy Policy
                </Link>
                .
              </div>
            </label>
          </div>

          <Button
            onClick={handleCompleteOnboarding}
            disabled={saving}
            className="w-full rounded-full uppercase tracking-widest text-xs py-5 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {saving ? "Saving Preferences..." : "Explore Collections"} <Check className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Encrypted & secure account verification
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
