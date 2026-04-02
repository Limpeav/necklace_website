import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative mt-28 overflow-hidden pb-10 pt-20">
    <div className="container-shell">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="surface-card relative overflow-hidden px-8 py-10 md:px-10 md:py-12">
          <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
          <p className="eyebrow">Store system</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-none text-white">
            A darker, cleaner storefront built to feel sharper and more intentional.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-300">
            Category-led browsing, stronger product cards, clearer actions, and less decorative clutter across the customer journey.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">
              Shop now
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">Navigation</p>
            <div className="mt-5 space-y-3 text-sm text-stone-200">
              <Link to="/shop" className="block transition hover:text-gold">Shop</Link>
            </div>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">Customer care</p>
            <div className="mt-5 space-y-3 text-sm text-stone-300">
              <p>Free shipping on orders over $150</p>
              <p>14-day returns</p>
              <p>care@vetastore.com</p>
              <p>Mon to Fri, 9 AM to 6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
