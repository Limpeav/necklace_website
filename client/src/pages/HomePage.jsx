import { Link } from "react-router-dom";
import api from "../api/client";
import FallbackImage from "../components/FallbackImage";
import HeroSection from "../components/home/HeroSection";
import PromoBanner from "../components/home/PromoBanner";
import TestimonialSection from "../components/home/TestimonialSection";
import ProductCard from "../components/shop/ProductCard";
import useAsync from "../hooks/useAsync";
import "../styles/HomePage.css";

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

      <section className="container-shell home-section">
        <div className="home-section-header">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2 className="section-title mt-3">Best sellers and editorial picks in one clean grid.</h2>
          </div>
          <Link to="/shop" className="btn-secondary" style={{ display: "inline-flex" }}>
            View all products
          </Link>
        </div>

        <div className="home-grid">
          {loading && Array.from({ length: 4 }).map((_, index) => (
            <div key={index} style={{ height: "440px", borderRadius: "2rem", backgroundColor: "rgba(255,255,255,0.05)", animation: "pulse 2s infinite" }} />
          ))}
          {featured?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-shell home-section">
        <div className="home-split">
          <div className="surface-card p-8 md:p-10">
            <p className="eyebrow">Shop by style</p>
            <h2 className="home-split-title">
              Fewer generic blocks. More useful collection entry points.
            </h2>
            <p className="home-split-desc">
              Each collection block is visual, distinct, and clearly tied to shopping intent instead of decorative filler.
            </p>
          </div>
          <div className="home-category-grid">
            {categoryCards.map((item) => (
              <Link key={item.title} to={item.link} className="category-card group">
                <FallbackImage src={item.image} alt={item.title} className="category-image" />
                <div className="category-overlay" />
                <div className="category-text-container">
                  <p className="eyebrow">{item.title}</p>
                  <h3 className="category-title">{item.title}</h3>
                  <p className="category-desc">{item.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />

      <section className="container-shell home-section">
        <div className="surface-card newsletter-card">
          <div>
            <p className="eyebrow">Email list</p>
            <h2 className="newsletter-title">
              Restock notices, new drops, and gift edits without the bland newsletter look.
            </h2>
          </div>
          <div>
            <p className="newsletter-desc">
              The signup block now matches the store system and works as a proper retention surface instead of an afterthought.
            </p>
            <div className="newsletter-form">
              <input className="input" placeholder="Enter your email" />
              <button className="btn-primary" style={{ whiteSpace: "nowrap" }}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
