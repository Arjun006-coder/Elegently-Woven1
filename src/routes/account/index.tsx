import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSession } from "../../lib/auth";
import { Session } from "@supabase/supabase-js";
import { ArrowRight, Package, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/account/")({
  component: AccountDashboard,
});

function AccountDashboard() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  if (!session) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your orders, addresses, and account details.</p>
        </div>
        <Button asChild variant="outline" className="hidden sm:flex">
          <Link to="/">Back to Store</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Recent Orders</h3>
          </div>
          <p className="text-muted-foreground text-sm flex-1">You haven't placed any orders yet.</p>
          <Button asChild variant="link" className="px-0 mt-4 self-start text-primary group">
            <Link to="/account/orders">
              View all orders <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Shipping Addresses</h3>
          </div>
          <p className="text-muted-foreground text-sm flex-1">Manage your delivery locations.</p>
          <Button asChild variant="link" className="px-0 mt-4 self-start text-primary group">
            <Link to="/account/addresses">
              Manage addresses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Account Details</h3>
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-border/50 pb-4">
            <span className="text-muted-foreground font-medium">Name</span>
            <span className="sm:col-span-2">{session.user.user_metadata?.full_name || "Not provided"}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-border/50 pb-4">
            <span className="text-muted-foreground font-medium">Email address</span>
            <span className="sm:col-span-2">{session.user.email}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <span className="text-muted-foreground font-medium">Security</span>
            <span className="sm:col-span-2 text-jade flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-jade"></span> Authenticated via Provider
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
