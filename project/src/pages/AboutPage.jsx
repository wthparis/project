import { Heart, Award, Truck } from '../components/icons';
import './AboutPage.css';

export function AboutPage() {
  return (
    <div className="about-page flex-1">
      <section className="about-hero relative overflow-hidden bg-gradient-to-br from-white via-brand-cream to-brand-sage/30 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-powder/60 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-brand-sage/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-soft">maison haircare</span>
            <h1 className="mt-6 text-4xl md:text-5xl font-display text-brand-charcoal">About HairCare</h1>
            <p className="mt-6 text-lg text-brand-earth/80">
              We craft serene hair rituals that balance nature, science, and artisanal know-how so every gesture feels like a luxury spa moment at home.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/90 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="rounded-3xl border border-brand-cream/70 bg-white/90 p-8 text-center shadow-soft">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-powder/70">
                <Heart className="h-8 w-8 text-brand-rose" />
              </div>
              <h3 className="mb-3 text-xl font-display text-brand-charcoal">Our Mission</h3>
              <p className="text-brand-earth/80">
                To empower every person to feel confident and radiant by sharing premium formulas and mindful guidance.
              </p>
            </div>

            <div className="rounded-3xl border border-brand-cream/70 bg-white/90 p-8 text-center shadow-soft">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-powder/70">
                <Award className="h-8 w-8 text-brand-rose" />
              </div>
              <h3 className="mb-3 text-xl font-display text-brand-charcoal">Quality Promise</h3>
              <p className="text-brand-earth/80">
                Every elixir is tested and chosen for its efficacy, sensoriality, and respect for both hair and planet.
              </p>
            </div>

            <div className="rounded-3xl border border-brand-cream/70 bg-white/90 p-8 text-center shadow-soft">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-powder/70">
                <Truck className="h-8 w-8 text-brand-rose" />
              </div>
              <h3 className="mb-3 text-xl font-display text-brand-charcoal">Thoughtful Delivery</h3>
              <p className="text-brand-earth/80">
                From our atelier to your home, we deliver swiftly with eco-conscious packaging and delicate care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream/60 py-20 about-story">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-display text-brand-charcoal">Our Story</h2>
              <div className="space-y-4 text-brand-earth/80">
                <p>
                  Born from a desire to elevate daily rituals, HairCare evolved from a small Parisian studio into a trusted destination for botanical luxuries. Our belief is simple: exceptional care should feel effortless and sensorial.
                </p>
                <p>
                  We collaborate with master formulators and hair artisans worldwide to curate products that respect every texture. From everyday essentials to targeted treatments, each selection is guided by transparency and efficacy.
                </p>
                <p>
                  Beyond products, we nurture a community. Through education, storytelling, and personalized rituals, we guide you to choose with intention and indulge without compromise.
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-3xl bg-brand-powder/60">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-olive py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display">Ready to Transform Your Hair?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Explore our curated rituals and invite calm, shine, and strength into your everyday routine.
          </p>
          <button className="btn-primary mt-8">Shop Now</button>
        </div>
      </section>
    </div>
  );
}
