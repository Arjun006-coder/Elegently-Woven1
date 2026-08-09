import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWidgets } from "./FloatingWidgets";
import { CookieConsent } from "./CookieConsent";
import { OnboardingModal } from "@/components/auth/OnboardingModal";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWidgets />
      <CookieConsent />
      <OnboardingModal />
    </div>
  );
}