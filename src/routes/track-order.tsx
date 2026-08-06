import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Package, Search, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/track-order")({
  component: TrackOrder,
});

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 min-h-[70vh]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-light mb-4">Track Your Order</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Enter your order number and email address below to see the latest updates on your delivery.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
          {!hasSearched ? (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium">Order Number</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    required 
                    type="text" 
                    placeholder="e.g. EW-100482" 
                    className="pl-10 h-12"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input 
                  required 
                  type="email" 
                  placeholder="The email used at checkout" 
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full h-12 text-sm tracking-widest uppercase">
                <Search className="mr-2 h-4 w-4" /> Find Order
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-3">Order Not Found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We couldn't find an order matching "{orderId}" for {email}. Please check the details and try again.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" onClick={() => setHasSearched(false)}>
                  Try Again
                </Button>
                <Button asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
