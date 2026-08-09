import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw, Package } from "lucide-react";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/account/returns")({
  component: AccountReturns,
});

function AccountReturns() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">Returns & Exchanges</h1>
        <p className="text-muted-foreground mt-2">Request a doorstep pickup for returns or size exchanges.</p>
      </div>

      <div className="bg-card border border-border p-12 rounded-xl text-center shadow-sm">
        <RotateCcw className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">No active return requests</h3>
        <p className="text-muted-foreground mb-6">Eligible delivered orders will show a return button in My Orders.</p>
      </div>
    </div>
  );
}
