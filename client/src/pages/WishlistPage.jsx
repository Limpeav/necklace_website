import { Link } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";
import { useStore } from "../context/StoreContext";

const WishlistPage = () => {
  const { wishlist } = useStore();

  return (
    <section className="container-shell py-14">
      <div className="max-w-3xl">
        <p className="eyebrow">Wishlist</p>
        <h1 className="section-title mt-3">Saved pieces, now in the same store system.</h1>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {wishlist.products?.length ? wishlist.products.map((product) => <ProductCard key={product._id} product={product} />) : (
          <div className="surface-card col-span-full p-8">
            <p className="text-sm text-stone-300">Your wishlist is empty.</p>
            <Link to="/shop" className="btn-primary mt-6">Browse necklaces</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
