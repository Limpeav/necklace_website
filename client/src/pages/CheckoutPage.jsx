import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import OrderSummary from "../components/shop/OrderSummary";
import { useStore } from "../context/StoreContext";
import { getEffectivePrice } from "../utils/format";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useStore();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });

  const items = cart.items || [];
  const itemsPrice = items.reduce((sum, item) => sum + getEffectivePrice(item.product) * item.quantity, 0);
  const shippingPrice = itemsPrice > 250 ? 0 : 15;
  const taxPrice = Number((itemsPrice * 0.08).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrder = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/orders", {
      shippingAddress,
      paymentMethod: "Stripe / PayPal placeholder"
    });
    setCart({ items: [] });
    navigate("/orders", { state: { newOrderId: data._id } });
  };

  return (
    <section className="container-shell py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={placeOrder} className="surface-card p-8">
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-3 font-display text-5xl text-white">Shipping details</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Object.keys(shippingAddress).map((field) => (
              <input
                key={field}
                className={`input ${field === "addressLine1" || field === "addressLine2" ? "md:col-span-2" : ""}`}
                placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase())}
                value={shippingAddress[field]}
                onChange={(e) => setShippingAddress((current) => ({ ...current, [field]: e.target.value }))}
                required={field !== "addressLine2"}
              />
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-gold/20 bg-gold/10 p-5 text-sm leading-7 text-stone-200">
            Payment integration is still a placeholder, but the checkout UI now matches the redesigned storefront instead of dropping back to the previous soft-card layout.
          </div>
          <button className="btn-primary mt-8">Place order</button>
        </form>

        <OrderSummary items={items} totals={{ itemsPrice, shippingPrice, taxPrice, totalPrice }} />
      </div>
    </section>
  );
};

export default CheckoutPage;
