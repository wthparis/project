import { useState, useEffect } from 'react';
import { Filter, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Brand = Database['public']['Tables']['brands']['Row'];

interface ShopPageProps {
  onNavigate: (page: string) => void;
  searchQuery?: string;
}

export function ShopPage({ onNavigate, searchQuery }: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadData();
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadProducts(), loadCategories(), loadBrands()]);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    if (selectedBrand) {
      query = query.eq('brand_id', selectedBrand);
    }

    query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);

    switch (sortBy) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating_average', { ascending: false });
        break;
      default:
        query = query.order('name', { ascending: true });
    }

    const { data, error } = await query;
    if (error) throw error;
    setProducts(data || []);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');

    if (error) throw error;
    setCategories(data || []);
  };

  const loadBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name');

    if (error) throw error;
    setBrands(data || []);
  };

  return (
    <div className="flex-1 bg-brand-cream/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-soft">boutique</span>
            <h1 className="mt-4 text-3xl font-display text-brand-charcoal">Shop All Products</h1>
            {searchQuery && (
              <p className="text-brand-earth/70">Showing results for "{searchQuery}"</p>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden btn-secondary"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-6 shadow-soft">
              <h3 className="font-accent text-sm uppercase tracking-[0.2em] text-brand-earth/70 mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-6 shadow-soft">
              <h3 className="font-accent text-sm uppercase tracking-[0.2em] text-brand-earth/70 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full rounded-2xl px-4 py-2 text-left transition-all duration-300 ${
                    selectedCategory === null
                      ? 'bg-brand-rose text-white shadow-soft'
                      : 'text-brand-earth/80 hover:bg-brand-powder/60 hover:text-brand-earth'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full rounded-2xl px-4 py-2 text-left transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-brand-rose text-white shadow-soft'
                        : 'text-brand-earth/80 hover:bg-brand-powder/60 hover:text-brand-earth'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-6 shadow-soft">
              <h3 className="font-accent text-sm uppercase tracking-[0.2em] text-brand-earth/70 mb-4">Brands</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`w-full rounded-2xl px-4 py-2 text-left transition-all duration-300 ${
                    selectedBrand === null
                      ? 'bg-brand-rose text-white shadow-soft'
                      : 'text-brand-earth/80 hover:bg-brand-powder/60 hover:text-brand-earth'
                  }`}
                >
                  All Brands
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`w-full rounded-2xl px-4 py-2 text-left transition-all duration-300 ${
                      selectedBrand === brand.id
                        ? 'bg-brand-rose text-white shadow-soft'
                        : 'text-brand-earth/80 hover:bg-brand-powder/60 hover:text-brand-earth'
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-3xl border border-brand-cream/60 bg-white/80 p-5">
                    <div className="mb-4 aspect-square rounded-2xl bg-brand-cream/70"></div>
                    <div className="mb-2 h-4 rounded-full bg-brand-cream"></div>
                    <div className="h-4 w-2/3 rounded-full bg-brand-cream"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => onNavigate(`product/${product.slug}`)}
                    className="group overflow-hidden rounded-3xl border border-brand-cream/80 bg-white/90 text-left shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-cream">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-brand-earth/50">No image</div>
                      )}
                      {product.original_price && product.original_price > product.price && (
                        <div className="absolute right-3 top-3 rounded-full bg-brand-rose px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="space-y-3 p-5">
                      <h3 className="line-clamp-2 font-display text-lg text-brand-charcoal">{product.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-brand-earth/70">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-brand-rose text-brand-rose" />
                          <span className="ml-1">{product.rating_average.toFixed(1)}</span>
                        </div>
                        <span>({product.rating_count})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-brand-earth">${product.price.toFixed(2)}</span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-sm text-brand-earth/50 line-through">
                            ${product.original_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                        <p className="text-xs font-accent uppercase tracking-[0.2em] text-brand-rose">
                          Only {product.stock_quantity} left!
                        </p>
                      )}
                      {product.stock_quantity === 0 && (
                        <p className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/60">Out of stock</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-brand-cream/80 bg-white/90 py-12 text-center">
                <p className="mb-4 text-brand-earth/70">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                  }}
                  className="font-accent text-brand-earth transition-colors duration-300 hover:text-brand-rose"
                >
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
