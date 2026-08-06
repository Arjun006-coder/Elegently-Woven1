import { redirect } from "@tanstack/react-router";
import { supabase } from "./supabase";

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getProfile(userId: string) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  return profile;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw redirect({
      to: "/auth",
      search: {
        redirect: window.location.pathname,
      },
    });
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  const profile = await getProfile(session.user.id);
    
  if (profile?.role !== "admin" && profile?.role !== "super_admin") {
    throw redirect({
      to: "/account",
    });
  }
  
  return session;
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = "/";
}
