# HairCare E-commerce Platform

A full-featured e-commerce application for selling hair care products, built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Customer Features
- **Product Catalog**: Browse products with advanced filtering by category, brand, and price
- **Product Search**: Find products quickly with full-text search
- **Product Details**: View detailed product information, images, specifications, and customer reviews
- **Shopping Cart**: Add products to cart and manage quantities
- **Checkout**: Complete purchases with shipping information and payment methods
- **User Authentication**: Sign up and sign in with email/password
- **User Account**: View order history and manage profile information
- **Product Reviews**: Read and write product reviews with ratings
- **Blog**: Read beauty tips and hair care advice articles

### Admin Features (via database)
- Manage products, categories, and brands
- Update order statuses
- Approve product reviews
- Publish blog posts

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, Authentication, Row Level Security)
- **Icons**: Lucide React
- **State Management**: React Context API

## Database Schema

The application includes a comprehensive database schema with the following tables:

- **profiles**: User profiles and roles
- **categories**: Product categories with hierarchical support
- **brands**: Product brands
- **products**: Product catalog with images, pricing, and inventory
- **addresses**: Customer shipping addresses
- **orders**: Order information with status tracking
- **order_items**: Individual items in orders
- **reviews**: Product reviews and ratings
- **blog_posts**: Blog articles for beauty tips
- **cart_items**: Shopping cart items

## Setup Instructions

### 1. Database Setup

Run the SQL migrations in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the migrations in order:
   - `supabase/migrations/001_initial_schema.sql` - Creates all tables and security policies
   - `supabase/migrations/002_sample_data.sql` - Adds sample products (optional)

### 2. Environment Variables

The `.env` file is already configured with your Supabase credentials:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Usage

### For Customers

1. **Browse Products**: Navigate to the Shop page to see all products
2. **Search**: Use the search bar to find specific products
3. **Filter**: Use category and brand filters to narrow down products
4. **View Details**: Click on a product to see full details and reviews
5. **Add to Cart**: Select quantity and add products to your cart
6. **Checkout**: Review your cart and complete the checkout process
7. **Track Orders**: View order history in your account page
8. **Write Reviews**: Share your experience with products you've purchased

### For Admins

To create an admin user, update the `role` field in the `profiles` table:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

Admin users can then:
- Manage products through database queries
- Update order statuses
- Approve product reviews
- Publish blog posts

## Key Components

### Context Providers
- `AuthContext`: Manages user authentication state and operations
- `CartContext`: Handles shopping cart state and operations

### Pages
- `HomePage`: Landing page with featured products
- `ShopPage`: Product catalog with filtering and search
- `ProductPage`: Detailed product view with reviews
- `CheckoutPage`: Checkout form and order processing
- `AccountPage`: User profile and order history
- `BlogPage`: Beauty tips and advice articles
- `AboutPage`: Company information

### Components
- `Header`: Navigation with search and cart
- `Footer`: Site footer with links
- `AuthModal`: Sign in/sign up modal
- `CartSidebar`: Shopping cart sidebar

## Security

The application implements Row Level Security (RLS) in Supabase to ensure:
- Users can only access their own data (orders, cart, addresses)
- Product reviews require approval before appearing publicly
- Admin operations are restricted to users with admin role
- All database operations are secured at the database level

## Sample Data

The application includes sample data for:
- 5 product categories (Shampoos, Conditioners, Hair Masks, Hair Oils, Styling)
- 3 brands (Natural Beauty, Pro Hair Care, Organic Essentials)
- 8 products with images from Pexels

## Customization

### Adding Products

Insert products directly into the database:

```sql
INSERT INTO products (name, slug, description, short_description, price, category_id, brand_id, stock_quantity, sku, is_active, images)
VALUES (
  'Product Name',
  'product-slug',
  'Full description',
  'Short description',
  29.99,
  (SELECT id FROM categories WHERE slug = 'category-slug'),
  (SELECT id FROM brands WHERE slug = 'brand-slug'),
  50,
  'SKU-001',
  true,
  '["https://example.com/image.jpg"]'::jsonb
);
```

### Customizing Design

The application uses Tailwind CSS. Update colors and styling in:
- `tailwind.config.js`: Global theme configuration
- Component files: Individual component styling

### Adding Features

The codebase is organized for easy extension:
- Add new pages in `src/pages/`
- Add new components in `src/components/`
- Update routing in `src/App.tsx`

## Production Deployment

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables in your hosting platform
4. Ensure Supabase project is in production mode

## Support

For issues or questions about this codebase, refer to the official documentation:
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
