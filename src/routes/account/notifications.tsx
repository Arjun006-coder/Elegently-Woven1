import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { getSession } from "../../lib/auth";
import { Session } from "@supabase/supabase-js";
import { Bell, Package, Tag, Heart, Loader2 } from "lucide-react";

export const Route = createFileRoute("/account/notifications")({
  component: AccountNotifications,
});

const ICON_MAP: Record<string, any> = {
  Package,
  Tag,
  Heart,
  Bell
};

function AccountNotifications() {
  const [session, setSession] = useState<Session | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
      if (session) fetchNotifications(session.user.id);
    });
  }, []);

  async function fetchNotifications(userId: string) {
    setLoading(true);
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
    setLoading(false);
  }

  async function markAsRead(id: string) {
    if (!session) return;
    
    // Optimistic update
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    
    await supabase.from("notifications").update({ is_read: true }).eq("id", id).eq("user_id", session.user.id);
  }

  if (!session) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">Notifications</h1>
        <p className="text-muted-foreground mt-2">Stay updated on your orders and exclusive offers.</p>
      </div>
      
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = ICON_MAP[notification.icon] || Bell;
              return (
                <div 
                  key={notification.id} 
                  className={`p-6 flex gap-4 transition-colors hover:bg-muted/30 cursor-pointer ${!notification.is_read ? 'bg-primary/5' : ''}`}
                  onClick={() => !notification.is_read && markAsRead(notification.id)}
                >
                  <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${!notification.is_read ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className={`text-base font-medium ${!notification.is_read ? 'text-foreground' : 'text-foreground/80'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">We'll let you know when there are updates to your orders or account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
