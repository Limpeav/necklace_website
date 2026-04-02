import { Link } from "react-router-dom";
import api from "../api/client";
import FallbackImage from "../components/FallbackImage";
import HeroSection from "../components/home/HeroSection";
import PromoBanner from "../components/home/PromoBanner";
import TestimonialSection from "../components/home/TestimonialSection";
import ProductCard from "../components/shop/ProductCard";
import useAsync from "../hooks/useAsync";

const categoryCards = [
  {
    title: "Minimal",
    copy: "Clean pendants and quieter shine.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
    link: "/shop"
  },
  {
    title: "Pearl",
    copy: "Luminous pieces for events and gifting.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
    link: "/shop"
  },
  {
    title: "Layered",
    copy: "Pre-styled sets that stack properly.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80",
    link: "/shop"
  }
];

const HomePage = () => {
  const { data: featured, loading } = useAsync(async () => {
    const { data } = await api.get("/products/featured/list");
    return data;
  }, []);

  return (
    <>
      <HeroSection />
      <PromoBanner />

      <section className="container-shell mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2 className="section-title mt-3">Best sellers and editorial picks in one clean grid.</h2>
          </div>
          <Link to="/shop" className="btn-secondary hidden md:inline-flex">
            View all products
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {loading && Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[440px] animate-pulse rounded-[2rem] bg-white/5" />
          ))}
          {featured?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-card p-8 md:p-10">
            <p className="eyebrow">Shop by style</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-white">
              Fewer generic blocks. More useful collection entry points.
            </h2>
            <p className="mt-5 text-sm leading-7 text-stone-300">
              Each collection block is visual, distinct, and clearly tied to shopping intent instead of decorative filler.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {categoryCards.map((item) => (
              <Link key={item.title} to={item.link} className="group relative overflow-hidden rounded-[2rem] border border-white/10">
                <FallbackImage src={item.image} alt={item.title} className="h-[25rem] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow">{item.title}</p>
                  <h3 className="mt-3 font-display text-4xl leading-none text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-200">{item.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />

      <section className="container-shell mt-24">
        <div className="surface-card grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <p className="eyebrow">Email list</p>
            <h2 className="mt-3 max-w-xl font-display text-5xl leading-none text-white">
              Restock notices, new drops, and gift edits without the bland newsletter look.
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm leading-7 text-stone-300">
              The signup block now matches the store system and works as a proper retention surface instead of an afterthought.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input className="input" placeholder="Enter your email" />
              <button className="btn-primary whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
