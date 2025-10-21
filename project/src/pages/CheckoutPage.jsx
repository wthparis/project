import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Check } from '../components/icons';
import './CheckoutPage.css';

export function CheckoutPage({ onNavigate }) {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: 'France',
    paymentMethod: 'card',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || items.length === 0) return;

    setLoading(true);
    try {
      const orderNum = `ORD-${Date.now()}`;
      const shippingCost = 5.99;
      const tax = total * 0.2;
      const orderTotal = total + shippingCost + tax;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNum,
          user_id: user.id,
          status: 'pending',
          subtotal: total,
          shipping_cost: shippingCost,
          tax: tax,
          total: orderTotal,
          payment_method: formData.paymentMethod,
          payment_status: 'completed',
          shipping_address: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        product_image: item.product.images?.[0] || null,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

      if (itemsError) throw itemsError;

      await clearCart();
      setOrderNumber(orderNum);
      setOrderComplete(true);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex-1 bg-brand-cream/60 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-brand-earth/70">Please sign in to continue</p>
          <button onClick={() => onNavigate('home')} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex-1 bg-brand-cream/60 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-brand-earth/70">Your cart is empty</p>
          <button onClick={() => onNavigate('shop')} className="btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="checkout-page flex-1 bg-brand-cream/60 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-8 text-center shadow-soft">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-sage/60">
              <Check className="h-10 w-10 text-brand-earth" />
            </div>
            <h1 className="mb-4 text-3xl font-display text-brand-charcoal">Order Confirmed!</h1>
            <p className="mb-6 text-brand-earth/80">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            <div className="mb-6 rounded-2xl border border-brand-cream/80 bg-white/80 p-6">
              <p className="text-sm font-accent uppercase tracking-[0.2em] text-brand-earth/70">Order Number</p>
              <p className="mt-2 text-2xl font-display text-brand-charcoal">{orderNumber}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button onClick={() => onNavigate('account')} className="btn-primary">
                View Orders
              </button>
              <button onClick={() => onNavigate('shop')} className="btn-secondary">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const shippingCost = 5.99;
  const tax = total * 0.2;
  const orderTotal = total + shippingCost + tax;

  return (
    <div className="checkout-page flex-1 bg-brand-cream/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-display text-brand-charcoal">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="checkout-form space-y-8 rounded-3xl border border-brand-cream/80 bg-white/90 p-6 shadow-soft">
              <div>
                <h2 className="text-xl font-display text-brand-charcoal">Shipping Information</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Country *</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Address Line 1 *</label>
                    <input
                      type="text"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Address Line 2</label>
                    <input
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Postal Code *</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-brand-sage/60 bg-white px-4 py-3 text-sm text-brand-charcoal focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-display text-brand-charcoal">Payment Method</h2>
                <div className="mt-4 space-y-3">
                  <label className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 transition-colors duration-300 ${
                    formData.paymentMethod === 'card' ? 'border-brand-rose bg-brand-powder/60' : 'border-brand-cream hover:border-brand-rose'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="h-4 w-4 text-brand-rose focus:ring-brand-rose"
                    />
                    <span className="font-accent text-brand-charcoal">Credit/Debit Card</span>
                  </label>
                  <label className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 transition-colors duration-300 ${
                    formData.paymentMethod === 'paypal' ? 'border-brand-rose bg-brand-powder/60' : 'border-brand-cream hover:border-brand-rose'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="h-4 w-4 text-brand-rose focus:ring-brand-rose"
                    />
                    <span className="font-accent text-brand-charcoal">PayPal</span>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div>
            <div className="order-summary sticky top-24 rounded-3xl border border-brand-cream/80 bg-white/90 p-6 shadow-soft">
              <h2 className="text-xl font-display text-brand-charcoal">Order Summary</h2>

              <div className="mt-6 mb-6 max-h-64 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-cream">
                      {item.product.images?.[0] && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-display text-brand-charcoal">{item.product.name}</p>
                      <p className="text-sm text-brand-earth/70">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-brand-earth">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-brand-cream pt-4 text-sm text-brand-earth/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-charcoal">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-brand-charcoal">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (20%)</span>
                  <span className="font-semibold text-brand-charcoal">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-brand-cream pt-3 text-base font-display text-brand-charcoal">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
