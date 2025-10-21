export function Footer() {
  return (
    <footer className="mt-auto bg-brand-earth text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <span className="badge-soft">botanical care</span>
            <h3 className="text-2xl font-display text-white">HairCare</h3>
            <p className="text-sm text-brand-cream/80">
              Rituals inspired by nature to nourish, calm, and elevate every strand.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-accent text-sm uppercase tracking-[0.2em] text-brand-cream/70">Shop</h4>
            <ul className="space-y-2 text-sm text-brand-cream/80">
              <li><a href="#" className="transition-colors duration-300 hover:text-white">All Products</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Shampoos</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Conditioners</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Treatments</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-accent text-sm uppercase tracking-[0.2em] text-brand-cream/70">Support</h4>
            <ul className="space-y-2 text-sm text-brand-cream/80">
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Returns</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-accent text-sm uppercase tracking-[0.2em] text-brand-cream/70">Maison</h4>
            <ul className="space-y-2 text-sm text-brand-cream/80">
              <li><a href="#" className="transition-colors duration-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Beauty Tips</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors duration-300 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-brand-cream/70">
          <p>&copy; {new Date().getFullYear()} HairCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
