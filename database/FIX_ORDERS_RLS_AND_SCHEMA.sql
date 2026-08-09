-- ====================================================================
-- ELEGANTLYWOVEN — FIX ORDERS RLS & DROP FK CONSTRAINT (RUN THIS IN SUPABASE)
-- ====================================================================
-- This script fixes the FK constraint incompatible type error (42804):
-- 1. Drops foreign key constraint 'order_items_product_id_fkey'
-- 2. Alters 'order_items.product_id' to TEXT
-- 3. Unlocks RLS policies on 'orders' and 'order_items' for guest/auth orders
-- ====================================================================

-- 1. DROP THE INCOMPATIBLE FOREIGN KEY CONSTRAINT ON PRODUCT_ID
ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;

-- 2. ALTER ORDER_ITEMS TO ALLOW STRING PRODUCT IDs & ADD DETAILS
ALTER TABLE public.order_items ALTER COLUMN product_id TYPE TEXT USING product_id::text;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.order_items ALTER COLUMN order_id DROP NOT NULL;

-- 3. ALTER ORDERS TABLE TO ADD ALL MISSING COLUMNS & MAKE GUEST FIELDS NULLABLE
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subtotal NUMERIC DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_charge NUMERIC DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tax_amount NUMERIC DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'UPI';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Paid';

-- Allow guest orders without strict user_id foreign key errors
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='shipping_address_id') THEN
    ALTER TABLE public.orders ALTER COLUMN shipping_address_id DROP NOT NULL;
  END IF;
END $$;

-- 4. ENABLE RLS & CREATE PERMISSIVE POLICIES FOR BOTH GUEST & LOGGED-IN USERS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public/anon order insert" ON public.orders;
DROP POLICY IF EXISTS "Allow public/anon order select" ON public.orders;
DROP POLICY IF EXISTS "Allow public/anon order_items insert" ON public.order_items;
DROP POLICY IF EXISTS "Allow public/anon order_items select" ON public.order_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.orders;
DROP POLICY IF EXISTS "Enable insert for users" ON public.orders;

-- CREATE FULLY PERMISSIVE POLICIES FOR ORDERS
CREATE POLICY "Allow public/anon order insert" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public/anon order select" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public/anon order update" ON public.orders FOR UPDATE USING (true);

-- CREATE FULLY PERMISSIVE POLICIES FOR ORDER_ITEMS
CREATE POLICY "Allow public/anon order_items insert" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public/anon order_items select" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Allow public/anon order_items update" ON public.order_items FOR UPDATE USING (true);
