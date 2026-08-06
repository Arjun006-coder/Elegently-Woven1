import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Bell,
  Sun,
  Moon,
  Menu,
  Globe,
  Headphones,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { BRAND, megaMenu } from "@/lib/data";
import { useShop, useTheme } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { signOut, getProfile } from "@/lib/auth";
import type { Session } from "@supabase/supabase-js";
import { SearchDialog } from "./SearchDialog";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Notifications are now fetched live

export function Header() {
  const { cartCount, wishlist } = useShop();
  const [session, setSession] = useState<Session | null>(null);
  const { theme, toggle } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("EN");
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        const profile = await getProfile(data.session.user.id);
        setIsAdmin(profile?.role === "admin" || profile?.role === "super_admin");
        
        // Fetch notifications
        const { data: notifs } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", data.session.user.id)
          .order("created_at", { ascending: false })
          .limit(3);
          
        if (notifs) {
          setNotifications(notifs);
          setUnreadCount(notifs.filter(n => !n.is_read).length);
        }
      }
    };
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      if (session) {
        const profile = await getProfile(session.user.id);
        setIsAdmin(profile?.role === "admin" || profile?.role === "super_admin");
      } else {
        setIsAdmin(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-[11px] tracking-[0.18em] uppercase sm:px-8">
          <p className="truncate">Flat 15% off your first order · code WOVEN15</p>
          <div className="hidden items-center gap-6 sm:flex">
            <Link to="/track-order" className="hover:text-gold">
              Track order
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <Link to="/account" className="flex items-center gap-1.5 hover:text-gold">
                  Account
                </Link>
                <button onClick={signOut} className="flex items-center gap-1.5 hover:text-gold" title="Sign Out">
                  <LogOut className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center gap-1.5 hover:text-gold">
                <User className="h-3 w-3" /> Sign In
              </Link>
            )}
            <Link to="/contact" className="flex items-center gap-1.5 hover:text-gold">
              <Headphones className="h-3 w-3" /> Support
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled ? "border-border/70 glass" : "border-transparent bg-background",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Sheet>
              <SheetTrigger
                aria-label="Open menu"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-secondary lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[19rem] overflow-y-auto">
                <SheetTitle className="px-4 pt-4 font-serif text-2xl">{BRAND.name}</SheetTitle>
                <nav className="space-y-6 p-4">
                  {megaMenu.map((group) => (
                    <div key={group.label}>
                      <p className="eyebrow">{group.label}</p>
                      <ul className="mt-3 space-y-2 text-sm">
                        {group.items.map((i) => (
                          <li key={i.to}>
                            <Link to={i.to} className="text-muted-foreground hover:text-foreground">
                              {i.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link to="/account" className="block border-t border-border pt-4 text-sm">
                    My Account
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link to="/" className="min-w-0">
              <span className="block truncate font-serif text-2xl leading-none sm:text-3xl">{BRAND.name}</span>
              <span className="hidden text-[9px] tracking-[0.35em] text-muted-foreground uppercase sm:block">
                Handloom Atelier
              </span>
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-8 text-xs tracking-[0.18em] uppercase lg:flex">
            {megaMenu.map((group) => (
              <div key={group.label} className="group relative">
                <button type="button" className="flex items-center gap-1 py-2 hover:text-primary">
                  {group.label} <ChevronDown className="h-3 w-3" />
                </button>
                <div className="invisible absolute top-full left-1/2 w-56 -translate-x-1/2 rounded-2xl border border-border/70 bg-card p-4 opacity-0 shadow-lift transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <ul className="space-y-2 text-[13px] tracking-normal normal-case">
                    {group.items.map((i) => (
                      <li key={i.to}>
                        <Link
                          to={i.to}
                          className="block rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          {i.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <Link to="/sale" className="text-primary hover:opacity-80">
              Offers
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Language"
                className="hidden h-9 w-9 place-items-center rounded-full hover:bg-secondary sm:grid"
              >
                <Globe className="h-[18px] w-[18px]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {["EN", "हिन्दी", "தமிழ்", "ಕನ್ನಡ"].map((l) => (
                  <DropdownMenuItem key={l} onClick={() => setLang(l)}>
                    {l} {lang === l ? "·" : ""}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Notifications"
                className="relative hidden h-9 w-9 place-items-center rounded-full hover:bg-secondary sm:grid"
              >
                <Bell className="h-[18px] w-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <DropdownMenuItem key={n.id} className="flex-col items-start gap-1">
                      <span className={`text-sm ${!n.is_read ? 'font-semibold' : ''}`}>{n.title}</span>
                      <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleDateString()}</span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account/notifications">View all</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
            >
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length ? (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount ? (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Account"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
              >
                <User className="h-[18px] w-[18px]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/account">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="text-primary font-medium">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
                      Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/auth">Sign In</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}