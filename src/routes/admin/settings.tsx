import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your store preferences and system settings.</p>
      </div>

      <div className="bg-card p-6 border rounded-xl shadow-sm text-center">
        <p className="text-muted-foreground">Settings configuration panel coming soon.</p>
      </div>
    </div>
  );
}
