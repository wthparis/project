import { useState, useEffect } from 'react';
import { ArrowRight, Droplet, Leaf, Sparkles, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(4);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-cream to-brand-sage/30 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-powder/60 blur-3xl" />
          <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-brand-sage/40 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <span className="badge-soft mx-auto">artisan hair rituals</span>
            <h1 className="text-4xl md:text-6xl font-display text-brand-charcoal">
              Discover Your Perfect
              <span className="block text-brand-earth">Botanical Ritual</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-brand-earth/80">
              Premium, sensorielle formulas to nourish, strengthen, and illuminate your hair with the calm elegance of nature.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button onClick={() => onNavigate('shop')} className="btn-primary">
                Shop the Collection
                <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => onNavigate('blog')} className="btn-secondary">
                Beauty Tips
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/90 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-brand-cream/70 bg-white/90 p-8 text-center shadow-soft">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-powder/70">
                <Sparkles className="h-8 w-8 text-brand-rose" />
              </div>
              <h3 className="mb-3 text-xl font-display text-brand-charcoal">Premium Quality</h3>
              <p className="text-sm text-brand-earth/80">Curated formulations from trusted artisans for silky, healthy hair.</p>
            </div>
            <div className="rounded-3xl border border-brand-cream/70 bg-white/90 p-8 text-center shadow-soft">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-powder/70">
                <Leaf className="h-8 w-8 text-brand-rose" />
              </div>
              <h3 className="mb-3 text-xl font-display text-brand-charcoal">Holistic Guidance</h3>
              <p className="text-sm text-brand-earth/80">Beauty rituals and expert advice tailored to your natural texture.</p>
            </div>
            <div className="rounded-3xl border border-brand-cream/70 bg-white/90 p-8 text-center shadow-soft">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-powder/70">
                <Droplet className="h-8 w-8 text-brand-rose" />
              </div>
              <h3 className="mb-3 text-xl font-display text-brand-charcoal">Thoughtful Delivery</h3>
              <p className="text-sm text-brand-earth/80">From our atelier to your home with care, speed, and eco-conscious packaging.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="badge-soft mx-auto">essentials</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display text-brand-charcoal">Featured Botanical Care</h2>
            <p className="mt-3 text-brand-earth/80">Discover the sensorial staples our community is loving right now.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-3xl border border-brand-cream/60 bg-white/80 p-5">
                  <div className="mb-4 aspect-square rounded-2xl bg-brand-cream/70" />
                  <div className="mb-2 h-4 rounded-full bg-brand-cream" />
                  <div className="h-4 w-2/3 rounded-full bg-brand-cream" />
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onNavigate(`product/${product.slug}`)}
                  className="group overflow-hidden rounded-3xl border border-brand-cream/80 bg-white/90 text-left shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden rounded-3xl bg-brand-cream">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-brand-earth/50">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 p-5">
                    <h3 className="line-clamp-2 font-display text-lg text-brand-charcoal">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-brand-earth/70">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-brand-rose text-brand-rose" />
                        <span>{product.rating_average.toFixed(1)}</span>
                      </div>
                      <span>({product.rating_count})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-brand-earth">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-brand-earth/50 line-through">
                          ${product.original_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-brand-cream/70 bg-white/80 py-12 text-center">
              <p className="text-brand-earth/70">No featured products available at the moment.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <button onClick={() => onNavigate('shop')} className="btn-secondary">
              View All Products
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-brand-olive py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="badge-soft mx-auto bg-white/20 text-white">newsletter</span>
          <h2 className="mt-6 text-3xl font-display">Join Our Beauty Community</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Receive expert rituals, early access to new creations, and exclusive offers crafted for mindful self-care.
          </p>
          <form className="mx-auto mt-10 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-transparent bg-white/90 px-6 py-3 text-brand-charcoal placeholder:text-brand-earth/60 transition-all duration-300 focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/40"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
