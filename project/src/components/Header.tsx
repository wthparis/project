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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              HairCare
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onNavigate('shop')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'shop' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'blog' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Beauty Tips
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'about' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                About
              </button>
            </nav>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          <div className="flex items-center gap-4">
            <button
              onClick={user ? () => onNavigate('account') : onOpenAuth}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="h-6 w-6" />
            </button>

            <button
              onClick={onOpenCart}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => {
                  onNavigate('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Shop
              </button>
              <button
                onClick={() => {
                  onNavigate('blog');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Beauty Tips
              </button>
              <button
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base font-medium text-gray-600 hover:text-gray-900"
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
                    className="text-left text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-base font-medium text-gray-600 hover:text-gray-900"
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
