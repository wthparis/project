import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Check } from '../components/icons';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'] & {
  profiles: { full_name: string | null };
};

interface ProductPageProps {
  slug: string;
  onNavigate: (page: string) => void;
  onOpenAuth: () => void;
}

export function ProductPage({ slug, onNavigate, onOpenAuth }: ProductPageProps) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (productError) throw productError;
      if (!productData) {
        onNavigate('shop');
        return;
      }

      setProduct(productData);

      const { data: reviewData, error: reviewError } = await supabase
        .from('reviews')
        .select('*, profiles(full_name)')
        .eq('product_id', productData.id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (reviewError) throw reviewError;
      setReviews(reviewData as Review[]);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      await addItem(product.id, quantity);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !product) {
      onOpenAuth();
      return;
    }

    try {
      const { error } = await supabase.from('reviews').insert({
        product_id: product.id,
        user_id: user.id,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
      });

      if (error) throw error;

      setShowReviewForm(false);
      setReviewForm({ rating: 5, title: '', comment: '' });
      loadProduct();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-brand-cream/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse rounded-3xl border border-brand-cream/80 bg-white/80 p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="aspect-square rounded-3xl bg-brand-cream"></div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded-full bg-brand-cream" />
                <div className="h-4 w-1/2 rounded-full bg-brand-cream" />
                <div className="h-24 rounded-2xl bg-brand-cream" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="flex-1 bg-brand-cream/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-brand-cream/80 bg-white/90 p-4 md:p-10 shadow-soft">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <div className="mb-4 aspect-square overflow-hidden rounded-3xl bg-brand-cream">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-brand-earth/60">
                    No image
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-2xl border-2 transition-colors ${
                        selectedImage === index ? 'border-brand-rose' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <span className="badge-soft">signature</span>
                <h1 className="text-3xl font-display text-brand-charcoal">{product.name}</h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating_average)
                          ? 'fill-brand-rose text-brand-rose'
                          : 'text-brand-cream'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-brand-earth/70">
                  {product.rating_average.toFixed(1)} ({product.rating_count} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-display text-brand-earth">${product.price.toFixed(2)}</span>
                {product.original_price && product.original_price > product.price && (
                  <>
                    <span className="text-xl text-brand-earth/50 line-through">${product.original_price.toFixed(2)}</span>
                    <span className="rounded-full bg-brand-rose px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      SAVE {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {product.short_description && (
                <p className="text-brand-earth/80">{product.short_description}</p>
              )}

              {product.stock_quantity > 0 ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Quantity</label>
                    <div className="flex items-center rounded-full border border-brand-sage/60 bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-brand-earth/70 transition-colors duration-300 hover:bg-brand-powder/60 hover:text-brand-earth"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-brand-charcoal">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                        className="px-4 py-2 text-brand-earth/70 transition-colors duration-300 hover:bg-brand-powder/60 hover:text-brand-earth"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="btn-primary flex-1 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {addingToCart ? (
                        'Adding...'
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5" />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <button className="btn-secondary flex-1 justify-center">
                      <Heart className="h-6 w-6" />
                    </button>
                  </div>

                  {product.stock_quantity < 10 && (
                    <p className="text-xs font-accent uppercase tracking-[0.2em] text-brand-rose">
                      Only {product.stock_quantity} left in stock!
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-brand-rose/40 bg-brand-powder/70 p-5">
                  <p className="font-display text-brand-rose">Out of Stock</p>
                  <p className="text-sm text-brand-earth/80">This product is currently unavailable.</p>
                </div>
              )}

              {product.description && (
                <div className="border-t border-brand-cream pt-6">
                  <h2 className="text-lg font-display text-brand-charcoal">Description</h2>
                  <p className="mt-3 whitespace-pre-line text-brand-earth/80">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-4 md:p-10 shadow-soft">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-display text-brand-charcoal">Customer Reviews</h2>
            {user && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn-secondary"
              >
                Write a Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-6 rounded-2xl border border-brand-cream/70 bg-white/80 p-6">
              <div className="mb-4">
                <label className="text-sm font-accent uppercase tracking-[0.2em] text-brand-earth/70">Rating</label>
                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating })}
                      className="p-1"
                    >
                      <Star className={`h-8 w-8 ${rating <= reviewForm.rating ? 'fill-brand-rose text-brand-rose' : 'text-brand-cream'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-accent uppercase tracking-[0.2em] text-brand-earth/70">Title</label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                  placeholder="Sum up your experience"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-accent uppercase tracking-[0.2em] text-brand-earth/70">Comment</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                  placeholder="Tell us about your experience with this product"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
                <button type="button" onClick={() => setShowReviewForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-brand-cream pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-brand-charcoal">
                          {review.profiles?.full_name || 'Anonymous'}
                        </span>
                        {review.is_verified_purchase && (
                          <span className="flex items-center gap-1 rounded-full bg-brand-sage/60 px-2 py-1 text-xs font-semibold text-brand-earth">
                            <Check className="h-3 w-3" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'fill-brand-rose text-brand-rose' : 'text-brand-cream'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-brand-earth/60">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {review.title && <h3 className="mb-2 font-display text-brand-charcoal">{review.title}</h3>}
                  {review.comment && <p className="text-brand-earth/80">{review.comment}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-brand-earth/70">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
