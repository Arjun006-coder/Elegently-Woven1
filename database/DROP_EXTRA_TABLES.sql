-- ====================================================================
-- ELEGANTLYWOVEN — QUICK DROP SCRIPT FOR ALL 48 EXTRA / UNUSED TABLES
-- ====================================================================
-- Copy and paste this script directly into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mvwwevgxmxcqcabdkzjy/sql/new
-- ====================================================================

DROP VIEW IF EXISTS public.v_active_products CASCADE;

DROP TABLE IF EXISTS 
  public.audit_logs,
  public.brands,
  public.categories,
  public.collections,
  public.coupon_usage,
  public.coupons,
  public.flash_sale_products,
  public.flash_sales,
  public.gift_cards,
  public.inventory,
  public.login_history,
  public.loyalty_accounts,
  public.loyalty_transactions,
  public.notification_templates,
  public.order_status_history,
  public.payment_gateway_logs,
  public.payment_transactions,
  public.permissions,
  public.popular_searches,
  public.product_analytics,
  public.product_collections,
  public.product_images,
  public.product_specifications,
  public.product_tags,
  public.product_variants,
  public.product_videos,
  public.push_subscriptions,
  public.recently_viewed,
  public.referral_rewards,
  public.refunds,
  public.related_products,
  public.return_items,
  public.returns,
  public.review_images,
  public.review_reports,
  public.review_votes,
  public.reviews,
  public.role_permissions,
  public.roles,
  public.saved_payment_methods,
  public.search_history,
  public.shipment_tracking_events,
  public.shipments,
  public.support_messages,
  public.support_tickets,
  public.user_sessions,
  public.wallet_transactions,
  public.wishlist_items
CASCADE;
