import { useState, useEffect } from 'react';
import { Package, User } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './AccountPage.css';

export function AccountPage({ onNavigate }) {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;

    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;
          return { ...order, items: items || [] };
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex-1 bg-brand-cream/60 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-brand-earth/70">Please sign in to view your account</p>
          <button onClick={() => onNavigate('home')} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-brand-sage/60 text-brand-earth';
      case 'shipped':
        return 'bg-brand-powder/70 text-brand-earth';
      case 'processing':
        return 'bg-brand-rose/20 text-brand-rose';
      case 'cancelled':
        return 'bg-brand-charcoal/10 text-brand-charcoal';
      default:
        return 'bg-brand-cream text-brand-earth';
    }
  };

  return (
    <div className="account-page flex-1 bg-brand-cream/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-display text-brand-charcoal">My Account</h1>

        <div className="account-layout flex flex-col md:flex-row gap-8">
          <aside className="md:w-64">
            <div className="tab-card space-y-2 rounded-3xl border border-brand-cream/80 bg-white/90 p-4 shadow-soft">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 font-accent transition-all duration-300 ${
                  activeTab === 'orders'
                    ? 'bg-brand-rose text-white shadow-soft'
                    : 'text-brand-earth/80 hover:bg-brand-powder/60 hover:text-brand-earth'
                }`}
              >
                <Package className="h-5 w-5" />
                My Orders
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 font-accent transition-all duration-300 ${
                  activeTab === 'profile'
                    ? 'bg-brand-rose text-white shadow-soft'
                    : 'text-brand-earth/80 hover:bg-brand-powder/60 hover:text-brand-earth'
                }`}
              >
                <User className="h-5 w-5" />
                Profile
              </button>
            </div>
          </aside>

          <main className="flex-1">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse rounded-3xl border border-brand-cream/80 bg-white/80 p-6">
                        <div className="mb-4 h-6 w-1/4 rounded-full bg-brand-cream"></div>
                        <div className="h-4 w-1/2 rounded-full bg-brand-cream"></div>
                      </div>
                    ))}
                  </div>
                ) : orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.id} className="rounded-3xl border border-brand-cream/80 bg-white/90 p-6 shadow-soft">
                      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="mb-1 text-lg font-display text-brand-charcoal">
                            Order {order.order_number}
                          </h3>
                          <p className="text-sm text-brand-earth/70">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`self-start rounded-full px-4 py-2 text-xs font-accent uppercase tracking-[0.2em] ${getStatusColor(order.status)} md:self-auto`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-3 border-t border-brand-cream pt-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-cream">
                              {item.product_image && (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 font-display text-brand-charcoal">
                                {item.product_name}
                              </p>
                              <p className="text-sm text-brand-earth/70">Quantity: {item.quantity}</p>
                              <p className="text-sm font-semibold text-brand-earth">
                                ${item.subtotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-brand-cream pt-4">
                        <span className="font-accent text-brand-earth">Total:</span>
                        <span className="text-xl font-display text-brand-charcoal">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-12 text-center shadow-soft">
                    <Package className="mx-auto mb-4 h-16 w-16 text-brand-sage" />
                    <h3 className="mb-2 text-xl font-display text-brand-charcoal">No orders yet</h3>
                    <p className="mb-6 text-brand-earth/70">Start shopping to see your orders here</p>
                    <button onClick={() => onNavigate('shop')} className="btn-primary">
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-6 shadow-soft">
                <h2 className="mb-6 text-xl font-display text-brand-charcoal">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Full Name</label>
                    <p className="mt-1 text-brand-charcoal">{profile?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Email</label>
                    <p className="mt-1 text-brand-charcoal">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Phone</label>
                    <p className="mt-1 text-brand-charcoal">{profile?.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-accent uppercase tracking-[0.2em] text-brand-earth/70">Member Since</label>
                    <p className="mt-1 text-brand-charcoal">
                      {profile?.created_at && new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
