import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import FallbackImage from "../FallbackImage";

const highlights = [
  { icon: Truck, title: "Free shipping", copy: "Orders over $150" },
  { icon: ShieldCheck, title: "Easy returns", copy: "14-day window" },
  { icon: Sparkles, title: "Gift ready", copy: "Boxed every time" }
];

const HeroSection = () => (
  <section className="container-shell pt-6 md:pt-10">
    <div className="mb-4 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
      New drop live now • First order gets 15% off with code `LUNELLE15`
    </div>

    <div className="glass-panel editorial-grid relative overflow-hidden px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="absolute left-[-4rem] top-10 h-44 w-44 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="animate-rise">
          <p className="eyebrow">Modern jewelry store</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.93] text-white sm:text-6xl lg:text-[5.4rem]">
            Necklaces that feel high-end without making the site feel slow or fussy.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-stone-300 md:text-base">
            Shop best sellers, layered sets, pearl edits, and statement pieces through a clearer storefront built around browsing, offers, and conversion.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop" className="btn-primary gap-2">
              Shop Collection
              <ArrowRight size={16} />
            </Link>
            <Link to="/shop?sort=best-selling" className="btn-secondary">
              Best Sellers
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="surface-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/12 text-gold">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">{item.copy}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <FallbackImage
              src="https://images.unsplash.com/photo-1617038220903-1f61d7f6f84c?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury necklace"
              className="h-[29rem] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="eyebrow">Drop 04</p>
              <p className="mt-3 max-w-sm font-display text-4xl leading-none text-white">
                Sculpted shine, darker mood, cleaner product focus.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="surface-card p-6">
              <p className="eyebrow">Store stats</p>
              <div className="mt-5 grid gap-4 text-sm text-stone-300">
                <div className="flex items-center justify-between border-b dark-divider pb-3">
                  <span>Customer rating</span>
                  <span className="font-semibold text-white">4.8 / 5</span>
                </div>
                <div className="flex items-center justify-between border-b dark-divider pb-3">
                  <span>Fast dispatch</span>
                  <span className="font-semibold text-white">48 hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Gift-ready orders</span>
                  <span className="font-semibold text-white">Every order</span>
                </div>
              </div>
            </div>
            <FallbackImage
              src="https://images.unsplash.com/photo-1617038220632-0c2d6b2a444a?auto=format&fit=crop&w=900&q=80"
              alt="Jewelry detail"
              className="h-full min-h-56 w-full rounded-[2rem] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
