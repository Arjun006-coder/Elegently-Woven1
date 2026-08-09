-- =============================================================================
-- ELEGANTLYWOVEN — MASTER SUPABASE CONSOLIDATED SCHEMA (OPTIMIZED)
-- Company: LumaScale | Product: ElegantlyWoven
-- =============================================================================
-- HOW TO USE:
--   1. Go to your Supabase project → SQL Editor
--   2. Paste this entire script
--   3. Click Run
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- -----------------------------------------------------------------------------
-- 1. PRODUCTS TABLE & COLUMNS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku TEXT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(12,2) NOT NULL,
  mrp NUMERIC(12,2),
  status TEXT DEFAULT 'active',
  stock INT DEFAULT 10,
  category VARCHAR(100),
  color VARCHAR(50),
  size VARCHAR(50) DEFAULT 'Free Size',
  weave VARCHAR(100),
  fabric VARCHAR(100),
  pattern VARCHAR(100),
  border VARCHAR(100),
  occasion VARCHAR(100),
  length VARCHAR(50) DEFAULT '6.3 m',
  blouse BOOLEAN DEFAULT TRUE,
  rating NUMERIC(3,2) DEFAULT 4.8,
  reviews INT DEFAULT 12,
  views_count INT DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  original_price NUMERIC(12,2),
  is_new BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safe alter statements to migrate any missing product columns
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 10;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS color VARCHAR(50);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS size VARCHAR(50) DEFAULT 'Free Size';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS weave VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS fabric VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS pattern VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS border VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS occasion VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS length VARCHAR(50) DEFAULT '6.3 m';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS blouse BOOLEAN DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2) DEFAULT 4.8;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS reviews INT DEFAULT 12;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS views_count INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS original_price NUMERIC(12,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_bestseller BOOLEAN DEFAULT FALSE;

-- RLS policies for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public products read access" ON public.products;
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
DROP POLICY IF EXISTS "Anyone can delete products" ON public.products;

CREATE POLICY "Public products read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON public.products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete products" ON public.products FOR DELETE USING (true);

-- -----------------------------------------------------------------------------
-- 2. USER ADDRESSES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    label VARCHAR(50) DEFAULT 'Home',
    recipient_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure user_addresses has recipient_name and address_line_1 even if created by old schema
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_addresses' AND column_name = 'full_name') THEN
    ALTER TABLE public.user_addresses RENAME COLUMN full_name TO recipient_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_addresses' AND column_name = 'address_line1') THEN
    ALTER TABLE public.user_addresses RENAME COLUMN address_line1 TO address_line_1;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_addresses' AND column_name = 'address_line2') THEN
    ALTER TABLE public.user_addresses RENAME COLUMN address_line2 TO address_line_2;
  END IF;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own addresses." ON public.user_addresses;
DROP POLICY IF EXISTS "Users can insert their own addresses." ON public.user_addresses;
DROP POLICY IF EXISTS "Users can update their own addresses." ON public.user_addresses;
DROP POLICY IF EXISTS "Users can delete their own addresses." ON public.user_addresses;

CREATE POLICY "Users can view their own addresses." ON public.user_addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own addresses." ON public.user_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses." ON public.user_addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses." ON public.user_addresses FOR DELETE USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 3. WISHLISTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Fix wishlists column if created from old 2-table schema
ALTER TABLE public.wishlists ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(id) ON DELETE CASCADE;

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their wishlist" ON public.wishlists;
CREATE POLICY "Users can manage their wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 4. CART ITEMS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

ALTER TABLE public.cart_items ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.cart_items ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(id) ON DELETE CASCADE;
ALTER TABLE public.cart_items ADD COLUMN IF NOT EXISTS quantity INT DEFAULT 1;

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their cart" ON public.cart_items;
CREATE POLICY "Users can manage their cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 5. NOTIFICATIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) DEFAULT 'Bell',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 6. ORDERS & ORDER ITEMS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Processing',
    total_amount DECIMAL(12, 2) NOT NULL,
    subtotal DECIMAL(12, 2) DEFAULT 0,
    shipping_charge DECIMAL(12, 2) DEFAULT 0,
    tax_amount DECIMAL(12, 2) DEFAULT 0,
    shipping_address JSONB,
    shipping_address_id UUID REFERENCES public.user_addresses(id),
    phone_number VARCHAR(20),
    payment_method VARCHAR(50) DEFAULT 'UPI',
    payment_status VARCHAR(50) DEFAULT 'Paid',
    tracking_number VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subtotal DECIMAL(12, 2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_charge DECIMAL(12, 2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(12, 2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address JSONB;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'UPI';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'Paid';

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert their orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

CREATE POLICY "Users can view their orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (true);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INT NOT NULL,
    price_at_time DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can insert their order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;

CREATE POLICY "Users can view their order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE public.orders.id = order_items.order_id AND public.orders.user_id = auth.uid())
);
CREATE POLICY "Users can insert their order items" ON public.order_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE public.orders.id = order_items.order_id AND public.orders.user_id = auth.uid())
);
CREATE POLICY "Admins can view all order items" ON public.order_items FOR SELECT USING (true);

-- -----------------------------------------------------------------------------
-- 7. PROFILES & AUTH TRIGGER
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  display_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "System can insert profiles" ON public.profiles;

CREATE POLICY "Users can view profile" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "System can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 8. SUPABASE STORAGE BUCKET (product-images) & POLICIES
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload product-images" ON storage.objects;

CREATE POLICY "Public Access product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public Upload product-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
