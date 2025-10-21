/*
  # Sample Data for E-commerce Platform

  This migration adds sample categories, brands, and products to help you get started.
  You can modify or remove this data as needed.
*/

-- Insert sample categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Shampoos', 'shampoos', 'Cleansing formulas for every hair type', 1),
  ('Conditioners', 'conditioners', 'Moisturizing and detangling treatments', 2),
  ('Hair Masks', 'hair-masks', 'Deep conditioning and repair treatments', 3),
  ('Hair Oils', 'hair-oils', 'Nourishing oils for shine and protection', 4),
  ('Styling', 'styling', 'Products for styling and finishing', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample brands
INSERT INTO brands (name, slug, description) VALUES
  ('Natural Beauty', 'natural-beauty', 'Premium natural hair care products'),
  ('Pro Hair Care', 'pro-hair-care', 'Professional salon-quality products'),
  ('Organic Essentials', 'organic-essentials', '100% organic hair care solutions')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  original_price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_featured,
  is_active,
  images,
  specifications
)
SELECT
  'Moisturizing Shampoo',
  'moisturizing-shampoo',
  'A gentle, sulfate-free shampoo that deeply cleanses while maintaining your hair''s natural moisture balance. Infused with argan oil and vitamin E, it leaves hair soft, shiny, and manageable. Perfect for dry or damaged hair.',
  'Gentle sulfate-free formula with argan oil',
  24.99,
  29.99,
  c.id,
  b.id,
  50,
  'SHP-001',
  true,
  true,
  '["https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg"]'::jsonb,
  '{"volume": "300ml", "hair_type": "Dry/Damaged", "ingredients": "Argan Oil, Vitamin E, Aloe Vera"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'shampoos' AND b.slug = 'natural-beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_featured,
  is_active,
  images,
  specifications
)
SELECT
  'Hydrating Conditioner',
  'hydrating-conditioner',
  'This luxurious conditioner provides intense hydration and detangles even the most stubborn knots. Enriched with shea butter and coconut oil, it repairs damage and prevents breakage while leaving your hair silky smooth.',
  'Deep hydration with shea butter',
  22.99,
  c.id,
  b.id,
  45,
  'CND-001',
  true,
  true,
  '["https://images.pexels.com/photos/7428100/pexels-photo-7428100.jpeg"]'::jsonb,
  '{"volume": "300ml", "hair_type": "All Types", "ingredients": "Shea Butter, Coconut Oil, Keratin"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'conditioners' AND b.slug = 'natural-beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  original_price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_featured,
  is_active,
  images,
  specifications
)
SELECT
  'Repair Hair Mask',
  'repair-hair-mask',
  'An intensive weekly treatment that deeply repairs and restores damaged hair. This professional-grade mask penetrates the hair shaft to rebuild strength from within. Ideal for chemically treated or heat-damaged hair.',
  'Weekly intensive repair treatment',
  34.99,
  39.99,
  c.id,
  b.id,
  30,
  'MSK-001',
  true,
  true,
  '["https://images.pexels.com/photos/7797353/pexels-photo-7797353.jpeg"]'::jsonb,
  '{"volume": "250ml", "hair_type": "Damaged/Chemically Treated", "ingredients": "Keratin Complex, Amino Acids, Argan Oil"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'hair-masks' AND b.slug = 'pro-hair-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_featured,
  is_active,
  images,
  specifications
)
SELECT
  'Nourishing Hair Oil',
  'nourishing-hair-oil',
  'A lightweight, non-greasy hair oil that adds brilliant shine and tames frizz. This blend of precious oils protects against heat damage and environmental stress while promoting healthy hair growth.',
  'Lightweight shine and protection',
  19.99,
  c.id,
  b.id,
  60,
  'OIL-001',
  true,
  true,
  '["https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg"]'::jsonb,
  '{"volume": "100ml", "hair_type": "All Types", "ingredients": "Argan Oil, Jojoba Oil, Vitamin E"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'hair-oils' AND b.slug = 'organic-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_active,
  images,
  specifications
)
SELECT
  'Volumizing Shampoo',
  'volumizing-shampoo',
  'Give your hair body and bounce with this lightweight volumizing shampoo. Formulated with biotin and collagen, it lifts hair from the roots without weighing it down. Perfect for fine or limp hair.',
  'Adds volume and body',
  26.99,
  c.id,
  b.id,
  40,
  'SHP-002',
  true,
  '["https://images.pexels.com/photos/7755515/pexels-photo-7755515.jpeg"]'::jsonb,
  '{"volume": "300ml", "hair_type": "Fine/Limp", "ingredients": "Biotin, Collagen, Rice Protein"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'shampoos' AND b.slug = 'pro-hair-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_active,
  images,
  specifications
)
SELECT
  'Smoothing Conditioner',
  'smoothing-conditioner',
  'Control frizz and achieve salon-smooth hair with this advanced smoothing conditioner. Its anti-humidity formula keeps your hair sleek and manageable all day long, even in humid conditions.',
  'Anti-frizz smoothing formula',
  24.99,
  c.id,
  b.id,
  35,
  'CND-002',
  true,
  '["https://images.pexels.com/photos/3997985/pexels-photo-3997985.jpeg"]'::jsonb,
  '{"volume": "300ml", "hair_type": "Frizzy/Unruly", "ingredients": "Smoothing Complex, Silk Proteins, Moringa Oil"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'conditioners' AND b.slug = 'pro-hair-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_active,
  images,
  specifications
)
SELECT
  'Color Protection Shampoo',
  'color-protection-shampoo',
  'Specially formulated to preserve color vibrancy and prevent fading. This sulfate-free shampoo gently cleanses while sealing in color molecules, keeping your color-treated hair looking fresh and vibrant for longer.',
  'Extends color vibrancy',
  28.99,
  c.id,
  b.id,
  25,
  'SHP-003',
  true,
  '["https://images.pexels.com/photos/4046314/pexels-photo-4046314.jpeg"]'::jsonb,
  '{"volume": "300ml", "hair_type": "Color-Treated", "ingredients": "UV Filters, Antioxidants, Sunflower Extract"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'shampoos' AND b.slug = 'organic-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  name,
  slug,
  description,
  short_description,
  price,
  category_id,
  brand_id,
  stock_quantity,
  sku,
  is_active,
  images,
  specifications
)
SELECT
  'Curl Defining Cream',
  'curl-defining-cream',
  'Define and enhance your natural curls with this lightweight styling cream. It provides flexible hold, reduces frizz, and adds shine without crunch or stiffness. Works beautifully on all curl types.',
  'Define curls without crunch',
  21.99,
  c.id,
  b.id,
  55,
  'STY-001',
  true,
  '["https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"]'::jsonb,
  '{"volume": "200ml", "hair_type": "Curly/Wavy", "ingredients": "Shea Butter, Aloe Vera, Coconut Oil"}'::jsonb
FROM categories c, brands b
WHERE c.slug = 'styling' AND b.slug = 'natural-beauty'
ON CONFLICT (slug) DO NOTHING;
