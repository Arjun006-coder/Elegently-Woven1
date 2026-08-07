-- =============================================================================
-- ELEGANTLYWOVEN — COMPLETE SUPABASE POSTGRESQL SCHEMA
-- Company: LumaScale | Product: ElegantlyWoven
-- Version: 1.0.0 | Generated: 2026
-- =============================================================================
-- HOW TO USE:
--   1. Go to your Supabase project → SQL Editor
--   2. Paste this entire file
--   3. Click Run
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- =============================================================================
-- SECTION 1: ENUMS
-- =============================================================================

CREATE TYPE user_role_enum AS ENUM ('customer', 'admin', 'super_admin', 'staff', 'warehouse');
CREATE TYPE gender_enum AS ENUM ('female', 'male', 'non_binary', 'prefer_not_to_say');
CREATE TYPE address_type_enum AS ENUM ('home', 'office', 'other');
CREATE TYPE product_status_enum AS ENUM ('active', 'draft', 'archived', 'out_of_stock');
CREATE TYPE order_status_enum AS ENUM (
  'pending', 'confirmed', 'processing', 'packed',
  'shipped', 'out_for_delivery', 'delivered',
  'cancelled', 'return_requested', 'returned',
  'exchange_requested', 'exchanged', 'refund_initiated', 'refunded'
);
CREATE TYPE payment_status_enum AS ENUM ('pending', 'processing', 'success', 'failed', 'refunded', 'partially_refunded');
CREATE TYPE payment_method_enum AS ENUM ('upi', 'credit_card', 'debit_card', 'net_banking', 'wallet', 'cod', 'emi', 'gift_card');
CREATE TYPE payment_gateway_enum AS ENUM ('razorpay', 'stripe', 'cod', 'internal');
CREATE TYPE review_status_enum AS ENUM ('pending', 'approved', 'rejected', 'flagged');
CREATE TYPE return_reason_enum AS ENUM ('defective', 'wrong_item', 'size_issue', 'not_as_described', 'changed_mind', 'other');
CREATE TYPE return_status_enum AS ENUM ('requested', 'approved', 'picked_up', 'received', 'processed', 'rejected');
CREATE TYPE coupon_type_enum AS ENUM ('percentage', 'flat', 'free_shipping', 'buy_x_get_y', 'gift_card');
CREATE TYPE coupon_applies_to_enum AS ENUM ('all', 'category', 'product', 'brand', 'collection');
CREATE TYPE notification_channel_enum AS ENUM ('email', 'sms', 'push', 'in_app');
CREATE TYPE notification_type_enum AS ENUM (
  'order_placed', 'order_confirmed', 'order_shipped', 'order_delivered',
  'order_cancelled', 'return_update', 'refund_processed',
  'wishlist_back_in_stock', 'price_drop', 'new_arrival',
  'coupon_expiring', 'account_activity', 'review_approved', 'general'
);
CREATE TYPE ticket_status_enum AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_priority_enum AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE loyalty_transaction_type_enum AS ENUM ('earn', 'redeem', 'expire', 'adjust');
CREATE TYPE shipment_status_enum AS ENUM ('label_created', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned');

-- =============================================================================
-- HELPER: updated_at trigger function
-- =============================================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- SECTION 2: USER MANAGEMENT
-- =============================================================================

-- 2.1 profiles (extends Supabase auth.users via FK)
CREATE TABLE profiles (
  id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email             TEXT NOT NULL UNIQUE,
  full_name         TEXT,
  display_name      TEXT,
  phone             TEXT,
  phone_verified    BOOLEAN DEFAULT FALSE,
  avatar_url        TEXT,
  date_of_birth     DATE,
  gender            gender_enum,
  anniversary_date  DATE,
  role              user_role_enum NOT NULL DEFAULT 'customer',
  is_active         BOOLEAN DEFAULT TRUE,
  is_verified       BOOLEAN DEFAULT FALSE,
  preferred_language TEXT DEFAULT 'en',
  currency          TEXT DEFAULT 'INR',
  referral_code     TEXT UNIQUE DEFAULT UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 8)),
  referred_by       UUID REFERENCES profiles(id),
  total_orders      INT DEFAULT 0,
  total_spent       NUMERIC(12,2) DEFAULT 0,
  last_login_at     TIMESTAMPTZ,
  deleted_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_phone ON profiles(phone);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_referral_code ON profiles(referral_code);
CREATE INDEX idx_profiles_deleted_at ON profiles(deleted_at) WHERE deleted_at IS NULL;

-- 2.2 roles
CREATE TABLE roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  is_system   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_roles_updated_at BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2.3 permissions
CREATE TABLE permissions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  resource    TEXT NOT NULL,
  action      TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_permissions_resource ON permissions(resource);

-- 2.4 role_permissions
CREATE TABLE role_permissions (
  role_id       UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted_at    TIMESTAMPTZ DEFAULT NOW(),
  granted_by    UUID REFERENCES profiles(id),
  PRIMARY KEY (role_id, permission_id)
);

-- 2.5 user_addresses
CREATE TABLE user_addresses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type            address_type_enum DEFAULT 'home',
  label           TEXT,
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  address_line1   TEXT NOT NULL,
  address_line2   TEXT,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  country         TEXT NOT NULL DEFAULT 'India',
  pincode         TEXT NOT NULL,
  landmark        TEXT,
  latitude        NUMERIC(10,7),
  longitude       NUMERIC(10,7),
  is_default      BOOLEAN DEFAULT FALSE,
  is_billing      BOOLEAN DEFAULT FALSE,
  is_shipping     BOOLEAN DEFAULT TRUE,
  deleted_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_user_addresses_updated_at BEFORE UPDATE ON user_addresses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_pincode ON user_addresses(pincode);
CREATE INDEX idx_user_addresses_deleted ON user_addresses(deleted_at) WHERE deleted_at IS NULL;

-- 2.6 login_history
CREATE TABLE login_history (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ip_address  INET,
  user_agent  TEXT,
  device_type TEXT,
  os          TEXT,
  browser     TEXT,
  country     TEXT,
  city        TEXT,
  success     BOOLEAN DEFAULT TRUE,
  failure_reason TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_login_history_user_id ON login_history(user_id);
CREATE INDEX idx_login_history_created_at ON login_history(created_at DESC);
CREATE INDEX idx_login_history_ip ON login_history(ip_address);

-- 2.7 session_management
CREATE TABLE user_sessions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  refresh_token TEXT UNIQUE,
  device_id     TEXT,
  device_name   TEXT,
  ip_address    INET,
  user_agent    TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  expires_at    TIMESTAMPTZ NOT NULL,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active, expires_at);

-- =============================================================================
-- SECTION 3: PRODUCT CATALOG
-- =============================================================================

-- 3.1 brands
CREATE TABLE brands (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  logo_url    TEXT,
  description TEXT,
  website_url TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  deleted_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_brands_updated_at BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_brands_slug ON brands(slug);

-- 3.2 categories (top-level)
CREATE TABLE categories (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT,
  short_description TEXT,
  image_url        TEXT,
  banner_url       TEXT,
  icon_url         TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  parent_id        UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order       INT DEFAULT 0,
  is_active        BOOLEAN DEFAULT TRUE,
  is_featured      BOOLEAN DEFAULT FALSE,
  show_in_menu     BOOLEAN DEFAULT TRUE,
  deleted_at       TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = TRUE;

-- 3.3 collections
CREATE TABLE collections (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  eyebrow          TEXT,
  description      TEXT,
  image_url        TEXT,
  banner_url       TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  is_active        BOOLEAN DEFAULT TRUE,
  is_featured      BOOLEAN DEFAULT FALSE,
  starts_at        TIMESTAMPTZ,
  ends_at          TIMESTAMPTZ,
  sort_order       INT DEFAULT 0,
  deleted_at       TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_collections_updated_at BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_collections_slug ON collections(slug);

-- 3.4 products
CREATE TABLE products (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku                 TEXT NOT NULL UNIQUE,
  barcode             TEXT UNIQUE,
  name                TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  short_description   TEXT,
  description         TEXT,
  care_instructions   TEXT,
  status              product_status_enum DEFAULT 'draft',
  brand_id            UUID REFERENCES brands(id) ON DELETE SET NULL,
  category_id         UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  collection_id       UUID REFERENCES collections(id) ON DELETE SET NULL,

  -- Pricing
  price               NUMERIC(12,2) NOT NULL,
  mrp                 NUMERIC(12,2) NOT NULL,
  cost_price          NUMERIC(12,2),
  discount_percent    NUMERIC(5,2) GENERATED ALWAYS AS (
                        CASE WHEN mrp > 0 THEN ROUND(((mrp - price) / mrp) * 100, 2) ELSE 0 END
                      ) STORED,
  tax_percent         NUMERIC(5,2) DEFAULT 5.0,
  is_tax_inclusive    BOOLEAN DEFAULT TRUE,

  -- Fashion attributes
  weave               TEXT,
  fabric              TEXT,
  material            TEXT,
  occasion            TEXT,
  color               TEXT,
  pattern             TEXT,
  border_type         TEXT,
  length_meters       NUMERIC(5,2),
  blouse_included     BOOLEAN DEFAULT FALSE,

  -- Flags
  is_featured         BOOLEAN DEFAULT FALSE,
  is_new_arrival      BOOLEAN DEFAULT FALSE,
  is_bestseller       BOOLEAN DEFAULT FALSE,
  is_trending         BOOLEAN DEFAULT FALSE,
  is_on_sale          BOOLEAN DEFAULT FALSE,
  is_digital          BOOLEAN DEFAULT FALSE,
  requires_shipping   BOOLEAN DEFAULT TRUE,

  -- SEO
  meta_title          TEXT,
  meta_description    TEXT,
  meta_keywords       TEXT[],

  -- Search
  search_vector       TSVECTOR,

  -- Stats
  total_sold          INT DEFAULT 0,
  total_reviews       INT DEFAULT 0,
  average_rating      NUMERIC(3,2) DEFAULT 0,
  view_count          INT DEFAULT 0,

  -- Soft delete
  deleted_at          TIMESTAMPTZ,
  published_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_collection_id ON products(collection_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_is_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_is_new_arrival ON products(is_new_arrival) WHERE is_new_arrival = TRUE;
CREATE INDEX idx_products_is_bestseller ON products(is_bestseller) WHERE is_bestseller = TRUE;
CREATE INDEX idx_products_deleted_at ON products(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_search_vector ON products USING GIN(search_vector);
CREATE INDEX idx_products_category_status ON products(category_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_name_trgm ON products USING GIN(name gin_trgm_ops);

-- Auto-update search vector
CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.name, '')), 'A') ||
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.weave, '')), 'B') ||
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.fabric, '')), 'B') ||
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.occasion, '')), 'B') ||
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.color, '')), 'C') ||
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.description, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_search_vector
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- 3.5 product_variants (size × color combinations)
CREATE TABLE product_variants (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku           TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  color         TEXT,
  color_hex     TEXT,
  size          TEXT,
  material      TEXT,
  weight_grams  INT,
  price         NUMERIC(12,2),
  mrp           NUMERIC(12,2),
  is_default    BOOLEAN DEFAULT FALSE,
  is_active     BOOLEAN DEFAULT TRUE,
  sort_order    INT DEFAULT 0,
  deleted_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_product_variants_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON product_variants(sku);

-- 3.6 inventory
CREATE TABLE inventory (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id          UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id          UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity            INT NOT NULL DEFAULT 0,
  reserved_quantity   INT NOT NULL DEFAULT 0,
  available_quantity  INT GENERATED ALWAYS AS (quantity - reserved_quantity) STORED,
  low_stock_threshold INT DEFAULT 5,
  reorder_point       INT DEFAULT 10,
  reorder_quantity    INT DEFAULT 50,
  warehouse_location  TEXT,
  last_restocked_at   TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, variant_id)
);

CREATE TRIGGER trg_inventory_updated_at BEFORE UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_inventory_product_id ON inventory(product_id);
CREATE INDEX idx_inventory_variant_id ON inventory(variant_id);
CREATE INDEX idx_inventory_low_stock ON inventory(available_quantity, low_stock_threshold)
  WHERE available_quantity <= low_stock_threshold;

-- Alert function for low stock
CREATE OR REPLACE FUNCTION check_low_stock()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.available_quantity <= NEW.low_stock_threshold AND
     OLD.available_quantity > OLD.low_stock_threshold THEN
    INSERT INTO notifications(user_id, type, title, body, data)
    SELECT p.id, 'general', 'Low Stock Alert',
      'Product "' || pr.name || '" is low on stock (' || NEW.available_quantity || ' remaining)',
      jsonb_build_object('product_id', NEW.product_id, 'quantity', NEW.available_quantity)
    FROM profiles p
    JOIN products pr ON pr.id = NEW.product_id
    WHERE p.role IN ('admin', 'super_admin', 'warehouse')
    AND p.is_active = TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_inventory_low_stock
  AFTER UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION check_low_stock();

-- 3.7 product_images
CREATE TABLE product_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id  UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  url         TEXT NOT NULL,
  alt_text    TEXT,
  width       INT,
  height      INT,
  size_bytes  BIGINT,
  is_primary  BOOLEAN DEFAULT FALSE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_variant_id ON product_images(variant_id);
CREATE INDEX idx_product_images_primary ON product_images(product_id, is_primary) WHERE is_primary = TRUE;

-- 3.8 product_videos
CREATE TABLE product_videos (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  thumbnail_url TEXT,
  title       TEXT,
  duration_secs INT,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_videos_product_id ON product_videos(product_id);

-- 3.9 product_specifications
CREATE TABLE product_specifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  spec_key    TEXT NOT NULL,
  spec_value  TEXT NOT NULL,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_specs_product_id ON product_specifications(product_id);

-- 3.10 product_tags
CREATE TABLE product_tags (
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag         TEXT NOT NULL,
  PRIMARY KEY (product_id, tag)
);

CREATE INDEX idx_product_tags_tag ON product_tags(tag);
CREATE INDEX idx_product_tags_product_id ON product_tags(product_id);

-- 3.11 related_products
CREATE TABLE related_products (
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  related_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  relation_type TEXT NOT NULL DEFAULT 'similar',  -- similar | complementary | frequently_bought
  sort_order    INT DEFAULT 0,
  PRIMARY KEY (product_id, related_id),
  CHECK (product_id <> related_id)
);

CREATE INDEX idx_related_products_product_id ON related_products(product_id);

-- 3.12 product_collection_map
CREATE TABLE product_collections (
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  sort_order    INT DEFAULT 0,
  PRIMARY KEY (product_id, collection_id)
);

-- =============================================================================
-- SECTION 4: SEARCH & DISCOVERY
-- =============================================================================

-- 4.1 search_history
CREATE TABLE search_history (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id  TEXT,
  query       TEXT NOT NULL,
  results_count INT DEFAULT 0,
  clicked_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_search_history_user_id ON search_history(user_id);
CREATE INDEX idx_search_history_query ON search_history(query);
CREATE INDEX idx_search_history_created_at ON search_history(created_at DESC);

-- 4.2 popular_searches (materialized for performance)
CREATE TABLE popular_searches (
  query         TEXT PRIMARY KEY,
  search_count  INT DEFAULT 1,
  last_searched TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_popular_searches_count ON popular_searches(search_count DESC);

-- 4.3 recently_viewed
CREATE TABLE recently_viewed (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id  TEXT,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  viewed_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_recently_viewed_user_id ON recently_viewed(user_id);
CREATE INDEX idx_recently_viewed_product_id ON recently_viewed(product_id);
CREATE INDEX idx_recently_viewed_viewed_at ON recently_viewed(viewed_at DESC);

-- =============================================================================
-- SECTION 5: WISHLIST & CART
-- =============================================================================

-- 5.1 wishlists
CREATE TABLE wishlists (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name        TEXT DEFAULT 'My Wishlist',
  is_default  BOOLEAN DEFAULT TRUE,
  is_public   BOOLEAN DEFAULT FALSE,
  share_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_wishlists_updated_at BEFORE UPDATE ON wishlists
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);

-- 5.2 wishlist_items
CREATE TABLE wishlist_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wishlist_id   UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id    UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  added_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(wishlist_id, product_id)
);

CREATE INDEX idx_wishlist_items_wishlist_id ON wishlist_items(wishlist_id);
CREATE INDEX idx_wishlist_items_product_id ON wishlist_items(product_id);

-- 5.3 cart_sessions
CREATE TABLE cart_sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_token   TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid()::TEXT,
  coupon_id       UUID,
  coupon_code     TEXT,
  discount_amount NUMERIC(12,2) DEFAULT 0,
  gift_card_amount NUMERIC(12,2) DEFAULT 0,
  notes           TEXT,
  expires_at      TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_cart_sessions_updated_at BEFORE UPDATE ON cart_sessions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_cart_sessions_user_id ON cart_sessions(user_id);
CREATE INDEX idx_cart_sessions_token ON cart_sessions(session_token);

-- 5.4 cart_items
CREATE TABLE cart_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id         UUID NOT NULL REFERENCES cart_sessions(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id      UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity        INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price      NUMERIC(12,2) NOT NULL,
  blouse_stitching BOOLEAN DEFAULT FALSE,
  gift_wrap       BOOLEAN DEFAULT FALSE,
  gift_message    TEXT,
  saved_for_later BOOLEAN DEFAULT FALSE,
  added_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cart_id, product_id, variant_id)
);

CREATE TRIGGER trg_cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);

-- =============================================================================
-- SECTION 6: ORDERS
-- =============================================================================

-- 6.1 orders
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number        TEXT NOT NULL UNIQUE DEFAULT 'EW-' || TO_CHAR(NOW(), 'YYMM') || '-' || UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 6)),
  user_id             UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  status              order_status_enum NOT NULL DEFAULT 'pending',

  -- Addresses (snapshot at time of order)
  shipping_address    JSONB NOT NULL,
  billing_address     JSONB,

  -- Pricing
  subtotal            NUMERIC(12,2) NOT NULL,
  discount_amount     NUMERIC(12,2) DEFAULT 0,
  coupon_code         TEXT,
  coupon_discount     NUMERIC(12,2) DEFAULT 0,
  gift_card_amount    NUMERIC(12,2) DEFAULT 0,
  shipping_charge     NUMERIC(12,2) DEFAULT 0,
  tax_amount          NUMERIC(12,2) DEFAULT 0,
  blouse_stitching_charge NUMERIC(12,2) DEFAULT 0,
  gift_wrap_charge    NUMERIC(12,2) DEFAULT 0,
  total_amount        NUMERIC(12,2) NOT NULL,
  currency            TEXT DEFAULT 'INR',

  -- Payment
  payment_status      payment_status_enum DEFAULT 'pending',
  payment_method      payment_method_enum,
  payment_gateway     payment_gateway_enum,

  -- Delivery
  expected_delivery_date DATE,
  delivered_at        TIMESTAMPTZ,
  delivery_slot       TEXT,
  delivery_instructions TEXT,

  -- Gift
  is_gift             BOOLEAN DEFAULT FALSE,
  gift_message        TEXT,

  -- Source
  device_type         TEXT,
  ip_address          INET,

  -- Loyalty
  loyalty_points_earned INT DEFAULT 0,
  loyalty_points_used   INT DEFAULT 0,

  -- Soft delete / cancel
  cancelled_at        TIMESTAMPTZ,
  cancellation_reason TEXT,
  deleted_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Auto-update profile stats on order completion
CREATE OR REPLACE FUNCTION update_profile_order_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'delivered' AND OLD.status <> 'delivered' THEN
    UPDATE profiles
    SET total_orders = total_orders + 1,
        total_spent  = total_spent + NEW.total_amount
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orders_profile_stats
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_profile_order_stats();

-- 6.2 order_items
CREATE TABLE order_items (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id            UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id          UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  variant_id          UUID REFERENCES product_variants(id) ON DELETE SET NULL,

  -- Snapshot at time of order
  product_name        TEXT NOT NULL,
  product_sku         TEXT NOT NULL,
  product_image_url   TEXT,
  color               TEXT,
  size                TEXT,
  fabric              TEXT,

  quantity            INT NOT NULL CHECK (quantity > 0),
  unit_price          NUMERIC(12,2) NOT NULL,
  mrp                 NUMERIC(12,2) NOT NULL,
  discount_amount     NUMERIC(12,2) DEFAULT 0,
  tax_amount          NUMERIC(12,2) DEFAULT 0,
  total_amount        NUMERIC(12,2) NOT NULL,
  blouse_stitching    BOOLEAN DEFAULT FALSE,
  gift_wrap           BOOLEAN DEFAULT FALSE,
  is_returnable       BOOLEAN DEFAULT TRUE,
  return_window_days  INT DEFAULT 7,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- 6.3 order_status_history
CREATE TABLE order_status_history (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  from_status order_status_enum,
  to_status   order_status_enum NOT NULL,
  note        TEXT,
  changed_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_status_history_order_id ON order_status_history(order_id);

CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO order_status_history(order_id, from_status, to_status)
    VALUES (NEW.id, OLD.status, NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orders_status_history
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION log_order_status_change();

-- 6.4 shipments
CREATE TABLE shipments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id          UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  courier_name      TEXT,
  tracking_number   TEXT,
  tracking_url      TEXT,
  status            shipment_status_enum DEFAULT 'label_created',
  shipped_at        TIMESTAMPTZ,
  estimated_delivery DATE,
  delivered_at      TIMESTAMPTZ,
  weight_grams      INT,
  dimensions_cm     TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_shipments_updated_at BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_shipments_order_id ON shipments(order_id);
CREATE INDEX idx_shipments_tracking_number ON shipments(tracking_number);

-- 6.5 shipment_tracking_events
CREATE TABLE shipment_tracking_events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status      TEXT NOT NULL,
  location    TEXT,
  description TEXT,
  event_time  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shipment_tracking_shipment_id ON shipment_tracking_events(shipment_id);
CREATE INDEX idx_shipment_tracking_event_time ON shipment_tracking_events(event_time DESC);

-- 6.6 returns
CREATE TABLE returns (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id          UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  status            return_status_enum DEFAULT 'requested',
  reason            return_reason_enum NOT NULL,
  reason_detail     TEXT,
  pickup_address_id UUID REFERENCES user_addresses(id),
  pickup_scheduled_at TIMESTAMPTZ,
  pickup_done_at    TIMESTAMPTZ,
  refund_amount     NUMERIC(12,2),
  refund_method     TEXT,
  admin_notes       TEXT,
  deleted_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_returns_updated_at BEFORE UPDATE ON returns
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_returns_order_id ON returns(order_id);
CREATE INDEX idx_returns_user_id ON returns(user_id);
CREATE INDEX idx_returns_status ON returns(status);

-- 6.7 return_items
CREATE TABLE return_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  return_id   UUID NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE RESTRICT,
  quantity    INT NOT NULL DEFAULT 1,
  condition   TEXT,
  images      TEXT[],
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_return_items_return_id ON return_items(return_id);

-- 6.8 refunds
CREATE TABLE refunds (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id            UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  return_id           UUID REFERENCES returns(id) ON DELETE SET NULL,
  user_id             UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  amount              NUMERIC(12,2) NOT NULL,
  method              TEXT NOT NULL,
  gateway_refund_id   TEXT,
  status              payment_status_enum DEFAULT 'pending',
  reason              TEXT,
  processed_at        TIMESTAMPTZ,
  failure_reason      TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_refunds_updated_at BEFORE UPDATE ON refunds
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_refunds_order_id ON refunds(order_id);
CREATE INDEX idx_refunds_user_id ON refunds(user_id);
CREATE INDEX idx_refunds_status ON refunds(status);

-- =============================================================================
-- SECTION 7: PAYMENTS
-- =============================================================================

-- 7.1 payment_transactions
-- NOTE: We NEVER store raw card numbers or CVVs. Only gateway tokens.
CREATE TABLE payment_transactions (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id              UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  user_id               UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  amount                NUMERIC(12,2) NOT NULL,
  currency              TEXT DEFAULT 'INR',
  method                payment_method_enum NOT NULL,
  gateway               payment_gateway_enum NOT NULL,
  status                payment_status_enum DEFAULT 'pending',

  -- Gateway identifiers (tokens only, never raw card data)
  gateway_order_id      TEXT,
  gateway_payment_id    TEXT UNIQUE,
  gateway_signature     TEXT,

  -- UPI specific
  upi_vpa               TEXT,

  -- Card specific (tokenized, never raw)
  card_last4            TEXT,
  card_brand            TEXT,
  card_token            TEXT,  -- gateway token only

  -- Metadata
  gateway_response      JSONB,
  failure_reason        TEXT,
  refunded_amount       NUMERIC(12,2) DEFAULT 0,

  initiated_at          TIMESTAMPTZ DEFAULT NOW(),
  completed_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_payment_transactions_order_id ON payment_transactions(order_id);
CREATE INDEX idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_gateway_payment_id ON payment_transactions(gateway_payment_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX idx_payment_transactions_created_at ON payment_transactions(created_at DESC);

-- 7.2 saved_payment_methods (tokenized only)
CREATE TABLE saved_payment_methods (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  method          payment_method_enum NOT NULL,
  gateway         payment_gateway_enum NOT NULL,
  token           TEXT NOT NULL,     -- gateway-issued token, never raw card data
  display_name    TEXT NOT NULL,     -- e.g., "Visa ****4242"
  card_last4      TEXT,
  card_brand      TEXT,
  card_expiry     TEXT,              -- MM/YY format only
  upi_vpa         TEXT,
  bank_name       TEXT,
  is_default      BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, token)
);

CREATE TRIGGER trg_saved_payment_methods_updated_at BEFORE UPDATE ON saved_payment_methods
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_saved_payment_methods_user_id ON saved_payment_methods(user_id);

-- 7.3 payment_gateway_logs (for debugging and audit)
CREATE TABLE payment_gateway_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES payment_transactions(id) ON DELETE SET NULL,
  gateway     payment_gateway_enum NOT NULL,
  event_type  TEXT NOT NULL,
  direction   TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  payload     JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payment_gateway_logs_transaction_id ON payment_gateway_logs(transaction_id);
CREATE INDEX idx_payment_gateway_logs_created_at ON payment_gateway_logs(created_at DESC);

-- 7.4 wallet_transactions
CREATE TABLE wallet_transactions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  order_id        UUID REFERENCES orders(id) ON DELETE SET NULL,
  refund_id       UUID REFERENCES refunds(id) ON DELETE SET NULL,
  type            TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  amount          NUMERIC(12,2) NOT NULL,
  balance_after   NUMERIC(12,2) NOT NULL,
  description     TEXT,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wallet_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX idx_wallet_transactions_created_at ON wallet_transactions(created_at DESC);

-- =============================================================================
-- SECTION 8: REVIEWS
-- =============================================================================

-- 8.1 reviews
CREATE TABLE reviews (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id          UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  order_item_id       UUID REFERENCES order_items(id) ON DELETE SET NULL,
  rating              SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title               TEXT,
  body                TEXT,
  status              review_status_enum DEFAULT 'pending',
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count       INT DEFAULT 0,
  not_helpful_count   INT DEFAULT 0,
  admin_response      TEXT,
  admin_responded_at  TIMESTAMPTZ,
  deleted_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_verified ON reviews(is_verified_purchase);

-- Update product rating on review change
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET average_rating = (
        SELECT COALESCE(ROUND(AVG(rating)::NUMERIC, 2), 0)
        FROM reviews
        WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
          AND status = 'approved'
          AND deleted_at IS NULL
      ),
      total_reviews = (
        SELECT COUNT(*) FROM reviews
        WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
          AND status = 'approved'
          AND deleted_at IS NULL
      )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reviews_update_product_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- 8.2 review_images
CREATE TABLE review_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id   UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_review_images_review_id ON review_images(review_id);

-- 8.3 review_votes
CREATE TABLE review_votes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id   UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_helpful  BOOLEAN NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

CREATE INDEX idx_review_votes_review_id ON review_votes(review_id);

-- 8.4 review_reports
CREATE TABLE review_reports (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id   UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason      TEXT NOT NULL,
  detail      TEXT,
  resolved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

CREATE INDEX idx_review_reports_review_id ON review_reports(review_id);

-- =============================================================================
-- SECTION 9: COUPONS & PROMOTIONS
-- =============================================================================

-- 9.1 coupons
CREATE TABLE coupons (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code                TEXT NOT NULL UNIQUE,
  type                coupon_type_enum NOT NULL,
  applies_to          coupon_applies_to_enum DEFAULT 'all',
  applies_to_ids      UUID[],
  description         TEXT,
  value               NUMERIC(12,2) NOT NULL,
  max_discount_amount NUMERIC(12,2),
  min_order_amount    NUMERIC(12,2) DEFAULT 0,
  max_uses            INT,
  max_uses_per_user   INT DEFAULT 1,
  current_uses        INT DEFAULT 0,
  is_active           BOOLEAN DEFAULT TRUE,
  is_public           BOOLEAN DEFAULT TRUE,
  start_date          TIMESTAMPTZ DEFAULT NOW(),
  end_date            TIMESTAMPTZ,
  created_by          UUID REFERENCES profiles(id),
  deleted_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_coupons_updated_at BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_active ON coupons(is_active, start_date, end_date) WHERE is_active = TRUE;

-- 9.2 coupon_usage
CREATE TABLE coupon_usage (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coupon_id   UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  discount    NUMERIC(12,2) NOT NULL,
  used_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(coupon_id, order_id)
);

CREATE INDEX idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_user_id ON coupon_usage(user_id);

-- 9.3 flash_sales
CREATE TABLE flash_sales (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  description     TEXT,
  discount_percent NUMERIC(5,2),
  starts_at       TIMESTAMPTZ NOT NULL,
  ends_at         TIMESTAMPTZ NOT NULL,
  banner_url      TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_flash_sales_updated_at BEFORE UPDATE ON flash_sales
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_flash_sales_starts_ends ON flash_sales(starts_at, ends_at);

-- 9.4 flash_sale_products
CREATE TABLE flash_sale_products (
  flash_sale_id   UUID NOT NULL REFERENCES flash_sales(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id      UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  sale_price      NUMERIC(12,2) NOT NULL,
  stock_limit     INT,
  sold_count      INT DEFAULT 0,
  PRIMARY KEY (flash_sale_id, product_id)
);

-- 9.5 gift_cards
CREATE TABLE gift_cards (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT NOT NULL UNIQUE DEFAULT UPPER(gen_random_uuid()::TEXT),
  issued_to       UUID REFERENCES profiles(id),
  purchased_by    UUID REFERENCES profiles(id),
  order_id        UUID REFERENCES orders(id),
  initial_balance NUMERIC(12,2) NOT NULL,
  current_balance NUMERIC(12,2) NOT NULL,
  currency        TEXT DEFAULT 'INR',
  is_active       BOOLEAN DEFAULT TRUE,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_gift_cards_updated_at BEFORE UPDATE ON gift_cards
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_gift_cards_code ON gift_cards(code);
CREATE INDEX idx_gift_cards_issued_to ON gift_cards(issued_to);

-- 9.6 referral_codes
CREATE TABLE referral_rewards (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referred_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  order_id        UUID REFERENCES orders(id),
  referrer_credit NUMERIC(12,2) DEFAULT 0,
  referred_credit NUMERIC(12,2) DEFAULT 0,
  credited_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- =============================================================================
-- SECTION 10: LOYALTY
-- =============================================================================

-- 10.1 loyalty_accounts
CREATE TABLE loyalty_accounts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  points_balance  INT DEFAULT 0,
  tier            TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  lifetime_points INT DEFAULT 0,
  tier_expires_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_loyalty_accounts_updated_at BEFORE UPDATE ON loyalty_accounts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Auto-create loyalty account on profile creation
CREATE OR REPLACE FUNCTION create_loyalty_account_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO loyalty_accounts(user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_create_loyalty
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION create_loyalty_account_on_signup();

-- 10.2 loyalty_transactions
CREATE TABLE loyalty_transactions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id      UUID NOT NULL REFERENCES loyalty_accounts(id) ON DELETE CASCADE,
  type            loyalty_transaction_type_enum NOT NULL,
  points          INT NOT NULL,
  balance_after   INT NOT NULL,
  order_id        UUID REFERENCES orders(id),
  description     TEXT,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_loyalty_transactions_account_id ON loyalty_transactions(account_id);
CREATE INDEX idx_loyalty_transactions_order_id ON loyalty_transactions(order_id);
CREATE INDEX idx_loyalty_transactions_created_at ON loyalty_transactions(created_at DESC);

-- =============================================================================
-- SECTION 11: NOTIFICATIONS
-- =============================================================================

-- 11.1 notification_templates
CREATE TABLE notification_templates (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type        notification_type_enum NOT NULL,
  channel     notification_channel_enum NOT NULL,
  subject     TEXT,
  body        TEXT NOT NULL,
  variables   TEXT[],
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(type, channel)
);

-- 11.2 notifications
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type        notification_type_enum NOT NULL,
  channel     notification_channel_enum DEFAULT 'in_app',
  title       TEXT NOT NULL,
  body        TEXT,
  data        JSONB,
  is_read     BOOLEAN DEFAULT FALSE,
  read_at     TIMESTAMPTZ,
  sent_at     TIMESTAMPTZ,
  failed_at   TIMESTAMPTZ,
  failure_reason TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- 11.3 push_subscriptions
CREATE TABLE push_subscriptions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint    TEXT NOT NULL UNIQUE,
  p256dh      TEXT NOT NULL,
  auth_key    TEXT NOT NULL,
  device_info JSONB,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_push_subscriptions_user_id ON push_subscriptions(user_id);

-- =============================================================================
-- SECTION 12: ANALYTICS
-- =============================================================================

-- 12.1 product_analytics
CREATE TABLE product_analytics (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  date            DATE NOT NULL,
  views           INT DEFAULT 0,
  cart_adds       INT DEFAULT 0,
  wishlist_adds   INT DEFAULT 0,
  purchases       INT DEFAULT 0,
  revenue         NUMERIC(12,2) DEFAULT 0,
  returns         INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, date)
);

CREATE INDEX idx_product_analytics_product_date ON product_analytics(product_id, date DESC);

-- 12.2 audit_logs
CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  resource    TEXT NOT NULL,
  resource_id TEXT,
  old_value   JSONB,
  new_value   JSONB,
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource, resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- Generic audit trigger factory
CREATE OR REPLACE FUNCTION audit_log_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs(action, resource, resource_id, old_value, new_value)
  VALUES (
    TG_OP,
    TG_TABLE_NAME,
    CASE TG_OP WHEN 'DELETE' THEN OLD.id::TEXT ELSE NEW.id::TEXT END,
    CASE WHEN TG_OP IN ('UPDATE','DELETE') THEN TO_JSONB(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT','UPDATE') THEN TO_JSONB(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Attach audit to critical tables
CREATE TRIGGER trg_audit_orders AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER trg_audit_payment_transactions AFTER INSERT OR UPDATE ON payment_transactions
  FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER trg_audit_refunds AFTER INSERT OR UPDATE ON refunds
  FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER trg_audit_coupons AFTER INSERT OR UPDATE OR DELETE ON coupons
  FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER trg_audit_profiles AFTER UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();

-- =============================================================================
-- SECTION 13: ADMIN & SUPPORT
-- =============================================================================

-- 13.1 support_tickets
CREATE TABLE support_tickets (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number   TEXT NOT NULL UNIQUE DEFAULT 'TKT-' || UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 8)),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  order_id        UUID REFERENCES orders(id) ON DELETE SET NULL,
  subject         TEXT NOT NULL,
  status          ticket_status_enum DEFAULT 'open',
  priority        ticket_priority_enum DEFAULT 'medium',
  assigned_to     UUID REFERENCES profiles(id),
  resolved_at     TIMESTAMPTZ,
  closed_at       TIMESTAMPTZ,
  deleted_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_support_tickets_updated_at BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_assigned_to ON support_tickets(assigned_to);

-- 13.2 support_messages
CREATE TABLE support_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id   UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  body        TEXT NOT NULL,
  attachments TEXT[],
  is_internal BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_support_messages_ticket_id ON support_messages(ticket_id);

-- =============================================================================
-- SECTION 14: VIEWS & MATERIALIZED VIEWS
-- =============================================================================

-- 14.1 Active products with category and brand info
CREATE OR REPLACE VIEW v_active_products WITH (security_invoker = true) AS
SELECT
  p.id,
  p.sku,
  p.name,
  p.slug,
  p.price,
  p.mrp,
  p.discount_percent,
  p.fabric,
  p.weave,
  p.occasion,
  p.color,
  p.average_rating,
  p.total_reviews,
  p.total_sold,
  p.is_featured,
  p.is_new_arrival,
  p.is_bestseller,
  p.is_trending,
  p.is_on_sale,
  c.name AS category_name,
  c.slug AS category_slug,
  b.name AS brand_name,
  pi.url AS primary_image_url,
  inv.available_quantity,
  inv.low_stock_threshold
FROM products p
LEFT JOIN categories c ON c.id = p.category_id
LEFT JOIN brands b ON b.id = p.brand_id
LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
LEFT JOIN inventory inv ON inv.product_id = p.id AND inv.variant_id IS NULL
WHERE p.status = 'active'
  AND p.deleted_at IS NULL;

-- 14.2 Order summary view
CREATE OR REPLACE VIEW v_order_summary WITH (security_invoker = true) AS
SELECT
  o.id,
  o.order_number,
  o.user_id,
  pr.full_name AS customer_name,
  pr.email AS customer_email,
  pr.phone AS customer_phone,
  o.status,
  o.payment_status,
  o.payment_method,
  o.total_amount,
  o.currency,
  o.created_at,
  o.delivered_at,
  COUNT(oi.id) AS item_count,
  s.tracking_number,
  s.courier_name,
  s.status AS shipment_status
FROM orders o
JOIN profiles pr ON pr.id = o.user_id
LEFT JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN shipments s ON s.order_id = o.id
WHERE o.deleted_at IS NULL
GROUP BY o.id, pr.full_name, pr.email, pr.phone, s.tracking_number, s.courier_name, s.status;

-- 14.3 Materialized view: daily sales analytics
CREATE MATERIALIZED VIEW mv_daily_sales AS
SELECT
  DATE_TRUNC('day', o.created_at) AS sale_date,
  COUNT(DISTINCT o.id) AS total_orders,
  COUNT(DISTINCT o.user_id) AS unique_customers,
  SUM(o.total_amount) AS total_revenue,
  SUM(o.discount_amount + o.coupon_discount) AS total_discounts,
  SUM(o.tax_amount) AS total_tax,
  SUM(o.shipping_charge) AS total_shipping,
  AVG(o.total_amount) AS avg_order_value,
  COUNT(DISTINCT o.id) FILTER (WHERE o.status = 'delivered') AS delivered_orders,
  COUNT(DISTINCT o.id) FILTER (WHERE o.status = 'cancelled') AS cancelled_orders,
  COUNT(DISTINCT o.id) FILTER (WHERE o.status IN ('return_requested','returned')) AS returned_orders
FROM orders o
WHERE o.payment_status = 'success'
  AND o.deleted_at IS NULL
GROUP BY DATE_TRUNC('day', o.created_at)
ORDER BY sale_date DESC;

CREATE UNIQUE INDEX idx_mv_daily_sales_date ON mv_daily_sales(sale_date);

-- Refresh function
CREATE OR REPLACE FUNCTION refresh_daily_sales()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_sales;
END;
$$ LANGUAGE plpgsql;

-- 14.4 Materialized view: product leaderboard
CREATE MATERIALIZED VIEW mv_product_leaderboard AS
SELECT
  p.id,
  p.name,
  p.slug,
  p.category_id,
  p.average_rating,
  p.total_reviews,
  p.total_sold,
  p.view_count,
  COALESCE(SUM(oi.total_amount), 0) AS total_revenue,
  COUNT(DISTINCT wi.wishlist_id) AS wishlist_count
FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
LEFT JOIN orders o ON o.id = oi.order_id AND o.status = 'delivered'
LEFT JOIN wishlist_items wi ON wi.product_id = p.id
WHERE p.status = 'active' AND p.deleted_at IS NULL
GROUP BY p.id
ORDER BY total_revenue DESC;

CREATE UNIQUE INDEX idx_mv_product_leaderboard_id ON mv_product_leaderboard(id);

-- =============================================================================
-- SECTION 15: ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all user-facing tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE return_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE recently_viewed ENABLE ROW LEVEL SECURITY;

-- Helper: check if the current user is admin/super_admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
      AND is_active = TRUE
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_staff_or_above()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin', 'staff', 'warehouse')
      AND is_active = TRUE
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- ── profiles ──
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (id = auth.uid() OR is_admin());

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "profiles_insert_self" ON profiles
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_admin_all" ON profiles
  FOR ALL USING (is_admin());

-- ── user_addresses ──
CREATE POLICY "addresses_own" ON user_addresses
  FOR ALL USING (user_id = auth.uid() OR is_admin());

-- ── login_history ──
CREATE POLICY "login_history_own" ON login_history
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

-- ── user_sessions ──
CREATE POLICY "sessions_own" ON user_sessions
  FOR ALL USING (user_id = auth.uid() OR is_admin());

-- ── wishlists ──
CREATE POLICY "wishlists_own_or_public" ON wishlists
  FOR SELECT USING (user_id = auth.uid() OR is_public = TRUE OR is_admin());

CREATE POLICY "wishlists_own_write" ON wishlists
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "wishlists_own_update_delete" ON wishlists
  FOR UPDATE USING (user_id = auth.uid() OR is_admin());

-- ── wishlist_items ──
CREATE POLICY "wishlist_items_own" ON wishlist_items
  FOR ALL USING (
    wishlist_id IN (SELECT id FROM wishlists WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ── cart_sessions ──
CREATE POLICY "cart_own" ON cart_sessions
  FOR ALL USING (user_id = auth.uid() OR is_admin());

-- ── cart_items ──
CREATE POLICY "cart_items_own" ON cart_items
  FOR ALL USING (
    cart_id IN (SELECT id FROM cart_sessions WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ── orders ──
CREATE POLICY "orders_own" ON orders
  FOR SELECT USING (user_id = auth.uid() OR is_staff_or_above());

CREATE POLICY "orders_own_insert" ON orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "orders_staff_update" ON orders
  FOR UPDATE USING (is_staff_or_above());

-- ── order_items ──
CREATE POLICY "order_items_own" ON order_items
  FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
    OR is_staff_or_above()
  );

-- ── shipments ──
CREATE POLICY "shipments_own" ON shipments
  FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
    OR is_staff_or_above()
  );

-- ── returns / refunds ──
CREATE POLICY "returns_own" ON returns
  FOR ALL USING (user_id = auth.uid() OR is_staff_or_above());

CREATE POLICY "refunds_own" ON refunds
  FOR SELECT USING (user_id = auth.uid() OR is_staff_or_above());

-- ── payment_transactions ──
CREATE POLICY "payments_own" ON payment_transactions
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

-- ── saved_payment_methods ──
CREATE POLICY "saved_payment_methods_own" ON saved_payment_methods
  FOR ALL USING (user_id = auth.uid());

-- ── wallet_transactions ──
CREATE POLICY "wallet_own" ON wallet_transactions
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

-- ── reviews ──
CREATE POLICY "reviews_select_approved" ON reviews
  FOR SELECT USING (status = 'approved' OR user_id = auth.uid() OR is_admin());

CREATE POLICY "reviews_insert_own" ON reviews
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "reviews_update_own" ON reviews
  FOR UPDATE USING (user_id = auth.uid() OR is_admin());

-- ── review_votes ──
CREATE POLICY "review_votes_own" ON review_votes
  FOR ALL USING (user_id = auth.uid());

-- ── notifications ──
CREATE POLICY "notifications_own" ON notifications
  FOR ALL USING (user_id = auth.uid() OR is_admin());

-- ── loyalty ──
CREATE POLICY "loyalty_own" ON loyalty_accounts
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "loyalty_transactions_own" ON loyalty_transactions
  FOR SELECT USING (
    account_id IN (SELECT id FROM loyalty_accounts WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ── support tickets ──
CREATE POLICY "tickets_own" ON support_tickets
  FOR ALL USING (user_id = auth.uid() OR is_staff_or_above());

CREATE POLICY "ticket_messages_own" ON support_messages
  FOR SELECT USING (
    ticket_id IN (SELECT id FROM support_tickets WHERE user_id = auth.uid())
    OR is_staff_or_above()
  );

CREATE POLICY "ticket_messages_insert" ON support_messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- ── search_history ──
CREATE POLICY "search_history_own" ON search_history
  FOR ALL USING (user_id = auth.uid() OR is_admin());

-- ── recently_viewed ──
CREATE POLICY "recently_viewed_own" ON recently_viewed
  FOR ALL USING (user_id = auth.uid() OR is_admin());

-- =============================================================================
-- SECTION 16: UTILITY FUNCTIONS
-- =============================================================================

-- Calculate shipping charge based on order amount and pincode
CREATE OR REPLACE FUNCTION calculate_shipping(order_amount NUMERIC, pincode TEXT)
RETURNS NUMERIC AS $$
BEGIN
  IF order_amount >= 999 THEN
    RETURN 0;  -- Free shipping above ₹999
  END IF;
  -- Remote areas (example logic — replace with courier API in production)
  IF pincode LIKE '39%' OR pincode LIKE '49%' OR pincode LIKE '79%' THEN
    RETURN 150;
  END IF;
  RETURN 99;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Apply coupon and return discount amount
CREATE OR REPLACE FUNCTION apply_coupon(
  p_code TEXT,
  p_user_id UUID,
  p_order_amount NUMERIC
)
RETURNS TABLE(discount_amount NUMERIC, error_message TEXT) AS $$
DECLARE
  v_coupon coupons%ROWTYPE;
  v_uses_by_user INT;
BEGIN
  SELECT * INTO v_coupon
  FROM coupons
  WHERE code = UPPER(TRIM(p_code))
    AND is_active = TRUE
    AND deleted_at IS NULL
    AND (start_date IS NULL OR start_date <= NOW())
    AND (end_date IS NULL OR end_date >= NOW());

  IF NOT FOUND THEN
    RETURN QUERY SELECT 0::NUMERIC, 'Invalid or expired coupon code'::TEXT;
    RETURN;
  END IF;

  IF v_coupon.max_uses IS NOT NULL AND v_coupon.current_uses >= v_coupon.max_uses THEN
    RETURN QUERY SELECT 0::NUMERIC, 'Coupon usage limit reached'::TEXT;
    RETURN;
  END IF;

  IF p_order_amount < v_coupon.min_order_amount THEN
    RETURN QUERY SELECT 0::NUMERIC,
      ('Minimum order amount of ₹' || v_coupon.min_order_amount || ' required')::TEXT;
    RETURN;
  END IF;

  SELECT COUNT(*) INTO v_uses_by_user
  FROM coupon_usage WHERE coupon_id = v_coupon.id AND user_id = p_user_id;

  IF v_coupon.max_uses_per_user IS NOT NULL AND v_uses_by_user >= v_coupon.max_uses_per_user THEN
    RETURN QUERY SELECT 0::NUMERIC, 'You have already used this coupon'::TEXT;
    RETURN;
  END IF;

  -- Calculate discount
  RETURN QUERY SELECT
    CASE v_coupon.type
      WHEN 'percentage' THEN
        LEAST(ROUND(p_order_amount * v_coupon.value / 100, 2),
              COALESCE(v_coupon.max_discount_amount, 999999))
      WHEN 'flat' THEN
        LEAST(v_coupon.value, p_order_amount)
      WHEN 'free_shipping' THEN 99::NUMERIC
      ELSE 0::NUMERIC
    END,
    NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Full-text product search function
CREATE OR REPLACE FUNCTION search_products(
  query TEXT,
  p_category_id UUID DEFAULT NULL,
  p_min_price NUMERIC DEFAULT NULL,
  p_max_price NUMERIC DEFAULT NULL,
  p_limit INT DEFAULT 24,
  p_offset INT DEFAULT 0
)
RETURNS TABLE(
  id UUID, name TEXT, slug TEXT, price NUMERIC, mrp NUMERIC,
  average_rating NUMERIC, primary_image TEXT, discount_percent NUMERIC,
  available_quantity INT, rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id, p.name, p.slug, p.price, p.mrp,
    p.average_rating,
    pi.url AS primary_image,
    p.discount_percent,
    inv.available_quantity,
    TS_RANK(p.search_vector, TO_TSQUERY('english', REGEXP_REPLACE(query, '\s+', ':* & ', 'g') || ':*')) AS rank
  FROM products p
  LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
  LEFT JOIN inventory inv ON inv.product_id = p.id AND inv.variant_id IS NULL
  WHERE p.status = 'active'
    AND p.deleted_at IS NULL
    AND (p_category_id IS NULL OR p.category_id = p_category_id)
    AND (p_min_price IS NULL OR p.price >= p_min_price)
    AND (p_max_price IS NULL OR p.price <= p_max_price)
    AND (
      p.search_vector @@ TO_TSQUERY('english', REGEXP_REPLACE(query, '\s+', ':* & ', 'g') || ':*')
      OR p.name ILIKE '%' || query || '%'
    )
  ORDER BY rank DESC, p.total_sold DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Reserve inventory when order is placed
CREATE OR REPLACE FUNCTION reserve_inventory(p_product_id UUID, p_variant_id UUID, p_quantity INT)
RETURNS BOOLEAN AS $$
DECLARE
  v_available INT;
BEGIN
  SELECT available_quantity INTO v_available
  FROM inventory
  WHERE product_id = p_product_id
    AND (p_variant_id IS NULL OR variant_id = p_variant_id)
  FOR UPDATE;

  IF v_available < p_quantity THEN
    RETURN FALSE;
  END IF;

  UPDATE inventory
  SET reserved_quantity = reserved_quantity + p_quantity
  WHERE product_id = p_product_id
    AND (p_variant_id IS NULL OR variant_id = p_variant_id);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Release inventory on cancellation/return
CREATE OR REPLACE FUNCTION release_inventory(p_product_id UUID, p_variant_id UUID, p_quantity INT)
RETURNS VOID AS $$
BEGIN
  UPDATE inventory
  SET reserved_quantity = GREATEST(0, reserved_quantity - p_quantity),
      quantity = GREATEST(0, quantity - p_quantity)
  WHERE product_id = p_product_id
    AND (p_variant_id IS NULL OR variant_id = p_variant_id);
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- SECTION 17: SEED DATA
-- =============================================================================

-- Seed: Roles
INSERT INTO roles(name, description, is_system) VALUES
  ('super_admin', 'Full platform access', TRUE),
  ('admin', 'Admin dashboard access', TRUE),
  ('staff', 'Order and customer management', TRUE),
  ('warehouse', 'Inventory management', TRUE),
  ('customer', 'Regular customer', TRUE)
ON CONFLICT (name) DO NOTHING;

-- Seed: Brands
INSERT INTO brands(name, slug, description, is_active) VALUES
  ('ElegantlyWoven Originals', 'elegantly-woven-originals', 'Our in-house curated label', TRUE),
  ('Kanchipuram Heritage', 'kanchipuram-heritage', 'Direct from Kanchipuram weavers', TRUE),
  ('Bengal Handlooms', 'bengal-handlooms', 'Authentic Bengal handloom works', TRUE),
  ('Banaras Katan House', 'banaras-katan-house', 'Traditional Banaras silk', TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Top-level categories (women's fashion)
INSERT INTO categories(name, slug, description, is_active, is_featured, show_in_menu) VALUES
  ('Sarees', 'sarees', 'Traditional and modern sarees', TRUE, TRUE, TRUE),
  ('Kurtis & Kurtas', 'kurtis', 'Everyday and occasion kurtis', TRUE, TRUE, TRUE),
  ('Dresses', 'dresses', 'Western and fusion dresses', TRUE, TRUE, TRUE),
  ('Tops & T-shirts', 'tops', 'Casual and formal tops', TRUE, FALSE, TRUE),
  ('Jeans & Trousers', 'jeans-trousers', 'Denim, cotton and formal bottoms', TRUE, FALSE, TRUE),
  ('Leggings & Palazzos', 'leggings', 'Comfort wear bottoms', TRUE, FALSE, TRUE),
  ('Ethnic Wear', 'ethnic-wear', 'Complete ethnic sets and coordinates', TRUE, TRUE, TRUE),
  ('Western Wear', 'western-wear', 'Contemporary western fashion', TRUE, FALSE, TRUE),
  ('Footwear', 'footwear', 'Flats, heels, sandals and more', TRUE, TRUE, TRUE),
  ('Bags & Clutches', 'bags', 'Handbags, totes and clutches', TRUE, TRUE, TRUE),
  ('Jewellery', 'jewellery', 'Fashion and fine jewellery', TRUE, TRUE, TRUE),
  ('Makeup', 'makeup', 'Face, lip, eye makeup', TRUE, FALSE, TRUE),
  ('Skincare', 'skincare', 'Cleansers, moisturizers, serums', TRUE, FALSE, TRUE),
  ('Haircare', 'haircare', 'Shampoos, oils, treatments', TRUE, FALSE, TRUE),
  ('Accessories', 'accessories', 'Scarves, belts, sunglasses and more', TRUE, FALSE, TRUE),
  ('Lingerie & Innerwear', 'lingerie', 'Comfort and everyday innerwear', TRUE, FALSE, FALSE),
  ('Watches', 'watches', 'Analogue and digital watches', TRUE, FALSE, TRUE),
  ('Perfumes & Fragrances', 'perfumes', 'Eau de parfum and body mists', TRUE, FALSE, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Saree sub-categories
INSERT INTO categories(name, slug, description, parent_id, is_active, show_in_menu) VALUES
  ('Kanjivaram', 'kanjivaram', 'Pure mulberry silk Kanjivaram sarees',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE),
  ('Banarasi', 'banarasi', 'Katan silk Banarasi sarees',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE),
  ('Silk Sarees', 'silk-sarees', 'Pure silk sarees',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE),
  ('Cotton Sarees', 'cotton-sarees', 'Handloom and mill cotton sarees',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE),
  ('Linen Sarees', 'linen-sarees', 'Pure linen sarees',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE),
  ('Handloom Sarees', 'handloom-sarees', 'Weaver-direct handloom',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE),
  ('Designer Sarees', 'designer-sarees', 'Contemporary designer pieces',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE),
  ('Bridal Sarees', 'bridal-sarees', 'Heirloom bridal collection',
    (SELECT id FROM categories WHERE slug='sarees'), TRUE, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Collections
INSERT INTO collections(name, slug, eyebrow, description, is_active, is_featured) VALUES
  ('New Arrivals', 'new-arrivals', 'Just In', 'Freshly added to our catalog', TRUE, TRUE),
  ('Best Sellers', 'best-sellers', 'Signature', 'Our most loved products', TRUE, TRUE),
  ('Festival Edit', 'festival', 'Utsav', 'Luminous picks for every festival', TRUE, TRUE),
  ('Bridal Collection', 'bridal', 'The Bride', 'Heirloom bridal pieces', TRUE, TRUE),
  ('Office Essentials', 'office-wear', 'Everyday Elegance', 'Crisp and professional', TRUE, FALSE),
  ('Sale', 'sale', 'Up to 30% Off', 'Season-end pricing on select pieces', TRUE, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Notification templates
INSERT INTO notification_templates(type, channel, subject, body, variables) VALUES
  ('order_placed', 'email', 'Your ElegantlyWoven order {{order_number}} is confirmed!',
   'Hi {{customer_name}}, your order {{order_number}} has been placed successfully. Total: ₹{{total_amount}}.',
   ARRAY['order_number','customer_name','total_amount']),
  ('order_shipped', 'email', 'Your order is on its way! 📦',
   'Hi {{customer_name}}, your order {{order_number}} has been shipped via {{courier}}. Tracking: {{tracking_number}}.',
   ARRAY['customer_name','order_number','courier','tracking_number']),
  ('order_delivered', 'email', 'Your ElegantlyWoven order has been delivered ✓',
   'Hi {{customer_name}}, your order {{order_number}} has been delivered. We hope you love it!',
   ARRAY['customer_name','order_number']),
  ('order_cancelled', 'email', 'Order {{order_number}} cancelled',
   'Hi {{customer_name}}, your order {{order_number}} has been cancelled. Refund of ₹{{refund_amount}} will be processed.',
   ARRAY['customer_name','order_number','refund_amount']),
  ('refund_processed', 'email', 'Refund of ₹{{refund_amount}} processed',
   'Hi {{customer_name}}, your refund of ₹{{refund_amount}} for order {{order_number}} has been processed.',
   ARRAY['customer_name','refund_amount','order_number']),
  ('wishlist_back_in_stock', 'in_app', NULL,
   'Great news! {{product_name}} on your wishlist is back in stock.',
   ARRAY['product_name']),
  ('order_placed', 'sms', NULL,
   'ElegantlyWoven: Order {{order_number}} confirmed. Total ₹{{total_amount}}. Track at elegantlywoven.com/orders',
   ARRAY['order_number','total_amount'])
ON CONFLICT (type, channel) DO NOTHING;

-- =============================================================================
-- SECTION 18: FINAL SECURITY CONFIG
-- =============================================================================

-- Revoke direct table access from anon role (Supabase public schema)
-- Products, categories, brands, collections are public-readable
-- Everything else is behind RLS

-- Grant read access to public product data for anon users
GRANT SELECT ON products TO anon;
GRANT SELECT ON product_images TO anon;
GRANT SELECT ON product_videos TO anon;
GRANT SELECT ON product_specifications TO anon;
GRANT SELECT ON product_tags TO anon;
GRANT SELECT ON categories TO anon;
GRANT SELECT ON brands TO anon;
GRANT SELECT ON collections TO anon;
GRANT SELECT ON product_collections TO anon;
GRANT SELECT ON related_products TO anon;
GRANT SELECT ON popular_searches TO anon;
GRANT SELECT ON flash_sales TO anon;
GRANT SELECT ON flash_sale_products TO anon;
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON review_images TO anon;

-- Grant authenticated users access to their own data (RLS enforces row-level)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant service role full access for backend operations
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =============================================================================
-- DONE — ElegantlyWoven schema complete
-- Tables: 48 | Indexes: 90+ | Triggers: 18 | Functions: 10 | Views: 4
-- Materialized Views: 2 | RLS Policies: 35 | Enums: 18
-- Run: SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';
-- =============================================================================

UPDATE profiles SET role = 'admin' WHERE email = 'arjun1234agrawal@gmail.com';

-- Create the user_addresses table
CREATE TABLE IF NOT EXISTS public.user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    label VARCHAR(50) NOT NULL, -- e.g., 'Home', 'Office'
    recipient_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own addresses."
ON public.user_addresses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses."
ON public.user_addresses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses."
ON public.user_addresses FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses."
ON public.user_addresses FOR DELETE
USING (auth.uid() = user_id);

-- Optional: Create a function to ensure only one default address exists per user
CREATE OR REPLACE FUNCTION public.handle_default_address()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.is_default = true THEN
        UPDATE public.user_addresses
        SET is_default = false
        WHERE user_id = NEW.user_id AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER ensure_single_default_address
BEFORE INSERT OR UPDATE ON public.user_addresses
FOR EACH ROW
EXECUTE FUNCTION public.handle_default_address();


-- 1. Extend products table for inventory and analytics
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS color VARCHAR(50);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS size VARCHAR(50);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS views_count INT DEFAULT 0;

-- 2. Create Wishlists table (Cloud Sync)
DROP TABLE IF EXISTS public.wishlists CASCADE;
CREATE TABLE public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. Create Carts table (Cloud Sync)
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.cart_sessions CASCADE;
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. Create Notifications table (Cloud Sync)
DROP TABLE IF EXISTS public.notifications CASCADE;
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50), -- e.g., 'Package', 'Tag', 'Heart'
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. Create Orders table
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Processing', -- Processing, Shipped, Delivered, Cancelled
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address_id UUID REFERENCES public.user_addresses(id),
    phone_number VARCHAR(20) NOT NULL, -- Mandatory phone number enforcement at DB level
    tracking_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- 6. Create Order Items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INT NOT NULL,
    price_at_time DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE public.orders.id = order_items.order_id AND public.orders.user_id = auth.uid())
);
CREATE POLICY "Users can insert their order items" ON public.order_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE public.orders.id = order_items.order_id AND public.orders.user_id = auth.uid())
);
CREATE POLICY "Admins can view all order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- 7. Analytics view tracking function
CREATE OR REPLACE FUNCTION public.increment_product_views(product_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.products
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = product_id;
END;
$$;


-- Create the user_addresses table
CREATE TABLE IF NOT EXISTS public.user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    label VARCHAR(50) NOT NULL, -- e.g., 'Home', 'Office'
    recipient_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own addresses."
ON public.user_addresses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses."
ON public.user_addresses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses."
ON public.user_addresses FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses."
ON public.user_addresses FOR DELETE
USING (auth.uid() = user_id);

-- Create a function to ensure only one default address exists per user
CREATE OR REPLACE FUNCTION public.handle_default_address()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.is_default = true THEN
        UPDATE public.user_addresses
        SET is_default = false
        WHERE user_id = NEW.user_id AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

-- Note: Using DROP TRIGGER IF EXISTS prevents errors if running multiple times
DROP TRIGGER IF EXISTS ensure_single_default_address ON public.user_addresses;
CREATE TRIGGER ensure_single_default_address
BEFORE INSERT OR UPDATE ON public.user_addresses
FOR EACH ROW
EXECUTE FUNCTION public.handle_default_address();

UPDATE public.profiles
SET role = 'admin'
WHERE email = 'arjun1234agrawal@gmail.com';



-- 1. Create a trigger function to automatically create profiles for new users
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
  );
  RETURN NEW;
END;
$$;

-- 2. Attach the trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Backfill profiles for any users who already logged in (like you)
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'full_name', 
  'customer'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 4. Make you an admin!
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'arjun1234agrawal@gmail.com';

-- 5. Products table alignment for live admin & storefront
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS color VARCHAR(50);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS size VARCHAR(50);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS views_count INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS original_price NUMERIC(12,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT TRUE;

ALTER TABLE public.products ALTER COLUMN category_id DROP NOT NULL;
ALTER TABLE public.products ALTER COLUMN sku DROP NOT NULL;
ALTER TABLE public.products ALTER COLUMN mrp DROP NOT NULL;

-- 6. Enforce security_invoker = true on views to satisfy Supabase security linter
ALTER VIEW IF EXISTS public.v_active_products SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_order_summary SET (security_invoker = true);

-- 7. Products table RLS policies for admin & storefront operations
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public products read access" ON public.products;
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
DROP POLICY IF EXISTS "Anyone can delete products" ON public.products;

CREATE POLICY "Public products read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON public.products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete products" ON public.products FOR DELETE USING (true);




