import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onOpenAuth: () => void;
}

export function CartSidebar({ isOpen, onClose, onNavigate, onOpenAuth }: CartSidebarProps) {
  const { user } = useAuth();
  const { items, updateQuantity, removeItem, total } = useCart();

  const handleCheckout = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    onClose();
    onNavigate('checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-brand-charcoal/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white/95 shadow-soft">
        <div className="flex items-center justify-between border-b border-brand-cream/70 px-6 py-6">
          <div className="space-y-1">
            <span className="badge-soft">your basket</span>
            <h2 className="text-2xl font-display text-brand-charcoal">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-brand-earth/60 transition-colors duration-300 hover:bg-brand-powder/60 hover:text-brand-earth"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-2xl bg-brand-cream/70 p-4">
                    <div className="h-24 w-24 overflow-hidden rounded-2xl bg-brand-cream flex-shrink-0">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-brand-earth/60">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 line-clamp-2 font-semibold text-brand-charcoal">
                        {item.product.name}
                      </h3>
                      <p className="mb-3 font-display text-lg text-brand-earth">
                        ${item.product.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="rounded-full bg-white/80 p-2 text-brand-earth/70 transition-colors duration-300 hover:bg-brand-powder/70 hover:text-brand-earth"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-accent text-sm text-brand-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock_quantity}
                          className="rounded-full bg-white/80 p-2 text-brand-earth/70 transition-colors duration-300 hover:bg-brand-powder/70 hover:text-brand-earth disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="ml-auto text-sm font-accent text-brand-earth/70 transition-colors duration-300 hover:text-brand-earth"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-brand-cream/70 px-6 py-6">
              <div className="flex items-center justify-between text-lg font-semibold text-brand-charcoal">
                <span>Total</span>
                <span className="font-display">${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="btn-primary w-full">
                Proceed to Checkout
              </button>

              <button onClick={onClose} className="btn-secondary w-full">
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-20 w-20 text-brand-sage" />
            <div className="space-y-2">
              <h3 className="text-2xl font-display text-brand-charcoal">Your cart is empty</h3>
              <p className="text-sm text-brand-earth/70">Add some products to begin your ritual.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigate('shop');
              }}
              className="btn-primary"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </>
  );
}
