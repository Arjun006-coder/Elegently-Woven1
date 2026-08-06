import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { redirect } from "@tanstack/react-router";
//#region src/lib/auth.ts
async function getSession() {
	const { data: { session } } = await supabase.auth.getSession();
	return session;
}
async function getProfile(userId) {
	const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single();
	return profile;
}
async function requireAuth() {
	const session = await getSession();
	if (!session) throw redirect({
		to: "/auth",
		search: { redirect: window.location.pathname }
	});
	return session;
}
async function requireAdmin() {
	const session = await requireAuth();
	const profile = await getProfile(session.user.id);
	if (profile?.role !== "admin" && profile?.role !== "super_admin") throw redirect({ to: "/account" });
	return session;
}
async function signOut() {
	await supabase.auth.signOut();
	window.location.href = "/";
}
//#endregion
export { signOut as a, requireAuth as i, getSession as n, requireAdmin as r, getProfile as t };
