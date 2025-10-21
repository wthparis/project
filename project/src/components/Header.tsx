import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  currentPage: string;
}

export function Header({ onNavigate, onOpenCart, onOpenAuth, currentPage }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-cream/80 bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl md:text-3xl font-display text-brand-charcoal transition-colors duration-300 ease-out hover:text-brand-earth"
            >
              HairCare
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onNavigate('shop')}
                className={`rounded-full px-3 py-2 text-sm font-accent transition-all duration-300 ease-out ${
                  currentPage === 'shop'
                    ? 'bg-brand-powder/70 text-brand-charcoal shadow-soft'
                    : 'text-brand-earth/70 hover:bg-brand-powder/50 hover:text-brand-earth'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className={`rounded-full px-3 py-2 text-sm font-accent transition-all duration-300 ease-out ${
                  currentPage === 'blog'
                    ? 'bg-brand-powder/70 text-brand-charcoal shadow-soft'
                    : 'text-brand-earth/70 hover:bg-brand-powder/50 hover:text-brand-earth'
                }`}
              >
                Beauty Tips
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`rounded-full px-3 py-2 text-sm font-accent transition-all duration-300 ease-out ${
                  currentPage === 'about'
                    ? 'bg-brand-powder/70 text-brand-charcoal shadow-soft'
                    : 'text-brand-earth/70 hover:bg-brand-powder/50 hover:text-brand-earth'
                }`}
              >
                About
              </button>
            </nav>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search botanical rituals..."
                className="w-full rounded-full border border-brand-sage/50 bg-white/70 pl-12 pr-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-earth/50 shadow-inner focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30 transition-all duration-300 ease-out"
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-earth/60" />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <button
              onClick={user ? () => onNavigate('account') : onOpenAuth}
              className="rounded-full p-2.5 text-brand-earth/70 transition-colors duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth"
            >
              <User className="h-6 w-6" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative rounded-full p-2.5 text-brand-earth/70 transition-colors duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-rose text-[11px] font-bold text-white shadow-soft">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2.5 text-brand-earth/70 transition-colors duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth md:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden space-y-2 border-t border-brand-cream/70 py-4">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('shop');
                  setMobileMenuOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-left font-accent text-brand-earth/80 transition-all duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth"
              >
                Shop
              </button>
              <button
                onClick={() => {
                  onNavigate('blog');
                  setMobileMenuOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-left font-accent text-brand-earth/80 transition-all duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth"
              >
                Beauty Tips
              </button>
              <button
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-left font-accent text-brand-earth/80 transition-all duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth"
              >
                About
              </button>
              {user && (
                <>
                  <button
                    onClick={() => {
                      onNavigate('account');
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-xl px-4 py-3 text-left font-accent text-brand-earth/80 transition-all duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-xl px-4 py-3 text-left font-accent text-brand-earth/80 transition-all duration-300 ease-out hover:bg-brand-powder/60 hover:text-brand-earth"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
