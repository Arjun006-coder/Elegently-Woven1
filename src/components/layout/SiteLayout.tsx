import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWidgets } from "./FloatingWidgets";
import { WelcomeModal } from "./WelcomeModal";
import { CookieConsent } from "./CookieConsent";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWidgets />
      <WelcomeModal />
      <CookieConsent />
    </div>
  );
}