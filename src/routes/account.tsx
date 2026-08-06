import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { requireAuth, signOut, getSession } from "../lib/auth";
import { Session } from "@supabase/supabase-js";
import { Button } from "../components/ui/button";
import { LogOut, User, MapPin, CreditCard, ShoppingBag, LayoutDashboard, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/account")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: AccountLayout,
});

function AccountLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  if (!session) return null;

  const navItems = [
    { label: "Dashboard", to: "/account", icon: LayoutDashboard },
    { label: "Orders", to: "/account/orders", icon: ShoppingBag },
    { label: "Addresses", to: "/account/addresses", icon: MapPin },
    { label: "Payment Methods", to: "/account/payments", icon: CreditCard },
    { label: "Notifications", to: "/account/notifications", icon: Bell },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="p-4 bg-muted/30 rounded-xl mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-full text-primary">
                <User size={24} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{session.user.user_metadata?.full_name || "My Account"}</p>
                <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-8">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={signOut}>
              <LogOut size={16} /> Sign Out
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
