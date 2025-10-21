import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartSidebar } from './components/CartSidebar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parseRoute = () => {
    const parts = currentPage.split('/');
    return {
      page: parts[0],
      param: parts[1],
    };
  };

  const route = parseRoute();

  const renderPage = () => {
    const searchParams = new URLSearchParams(currentPage.split('?')[1]);
    const searchQuery = searchParams.get('search') || undefined;

    switch (route.page) {
      case 'shop':
        return <ShopPage onNavigate={handleNavigate} searchQuery={searchQuery} />;
      case 'product':
        return route.param ? (
          <ProductPage
            slug={route.param}
            onNavigate={handleNavigate}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        ) : (
          <ShopPage onNavigate={handleNavigate} />
        );
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <Header
            onNavigate={handleNavigate}
            onOpenCart={() => setCartOpen(true)}
            onOpenAuth={() => setAuthModalOpen(true)}
            currentPage={route.page}
          />

          {renderPage()}

          <Footer />

          <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

          <CartSidebar
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            onNavigate={handleNavigate}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
