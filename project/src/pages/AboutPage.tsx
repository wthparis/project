import { Heart, Award, Truck } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="flex-1">
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About HairCare
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're passionate about helping you achieve beautiful, healthy hair through premium
              products and expert guidance. Our carefully curated selection features the finest
              hair care products from trusted brands worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To empower everyone to feel confident and beautiful by providing access to the
                best hair care products and expert knowledge.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Promise</h3>
              <p className="text-gray-600">
                Every product in our store is carefully selected and tested to meet our high
                standards for quality and effectiveness.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                We understand you want your products quickly. That's why we offer fast, reliable
                shipping to get your order to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded with a passion for hair care excellence, HairCare has grown from a small
                  boutique into a trusted destination for premium hair care products. Our journey
                  began with a simple belief: everyone deserves access to high-quality products
                  that work.
                </p>
                <p>
                  Today, we partner with leading brands and hair care experts to bring you a
                  carefully curated selection of products. From everyday essentials to specialized
                  treatments, we're here to help you find exactly what your hair needs.
                </p>
                <p>
                  Our commitment goes beyond just selling products. We believe in education,
                  transparency, and building lasting relationships with our customers. That's why
                  we provide detailed product information, expert tips, and personalized
                  recommendations to help you make informed choices.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hair?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our collection of premium hair care products and start your journey to
            healthier, more beautiful hair today.
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}
