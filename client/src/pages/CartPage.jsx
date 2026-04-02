import { Link, useNavigate } from "react-router-dom";
import FallbackImage from "../components/FallbackImage";
import { useStore } from "../context/StoreContext";
import { formatCurrency, getEffectivePrice } from "../utils/format";

const CartPage = () => {
  const { cart, updateCartItem, removeCartItem } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.items?.reduce((sum, item) => sum + getEffectivePrice(item.product) * item.quantity, 0) || 0;

  return (
    <section className="container-shell py-14">
      <div>
        <p className="eyebrow">Your cart</p>
        <h1 className="section-title mt-3">Review selected pieces before checkout.</h1>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {cart.items?.length ? (
            cart.items.map((item) => (
              <article key={item._id} className="surface-card flex flex-col gap-6 p-6 md:flex-row md:items-center">
                <FallbackImage src={item.product.images[0]} alt={item.product.productCode || item.product.name} className="h-28 w-28 rounded-[1.5rem] object-cover" />
                <div className="flex-1">
                  <p className="font-display text-3xl text-white">{item.product.productCode || item.product.name}</p>
                  <p className="mt-2 text-sm text-stone-400">{item.selectedColor} {item.selectedLength ? `• ${item.selectedLength}` : ""}</p>
                  <p className="mt-3 text-sm font-semibold text-white">{formatCurrency(getEffectivePrice(item.product))}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input type="number" min="1" className="input w-24" value={item.quantity} onChange={(e) => updateCartItem(item._id, Number(e.target.value))} />
                  <button onClick={() => removeCartItem(item._id)} className="text-sm font-semibold text-red-300 transition hover:text-red-200">
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="surface-card p-8">
              <p className="text-sm text-stone-300">Your cart is empty.</p>
              <Link to="/shop" className="btn-primary mt-6">Continue shopping</Link>
            </div>
          )}
        </div>

        <div className="surface-card h-fit p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Totals</p>
          <div className="mt-6 space-y-4 text-sm text-stone-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated shipping</span>
              <span>{formatCurrency(subtotal > 250 ? 0 : 15)}</span>
            </div>
            <div className="flex justify-between border-t dark-divider pt-4 text-base font-semibold text-white">
              <span>Total</span>
              <span>{formatCurrency(subtotal + (subtotal > 250 ? 0 : 15))}</span>
            </div>
          </div>
          <button onClick={() => navigate("/checkout")} disabled={!cart.items?.length} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50">
            Proceed to checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
