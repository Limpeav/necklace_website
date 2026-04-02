import api from "../api/client";
import useAsync from "../hooks/useAsync";
import { formatCurrency } from "../utils/format";

const OrderHistoryPage = () => {
  const { data: orders = [], loading } = useAsync(async () => {
    const { data } = await api.get("/orders/mine");
    return data;
  }, []);

  return (
    <section className="container-shell py-14">
      <p className="eyebrow">Orders</p>
      <h1 className="section-title mt-3">Your order history</h1>
      <div className="mt-10 space-y-5">
        {loading && <div className="h-40 animate-pulse rounded-[2rem] bg-white/5" />}
        {orders.map((order) => (
          <article key={order._id} className="surface-card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Order #{order._id.slice(-6).toUpperCase()}</p>
                <p className="mt-2 text-sm text-stone-400">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{order.status}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200">{order.paymentStatus}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {order.items.map((item) => (
                <div key={item.product} className="flex items-center justify-between text-sm text-stone-300">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t dark-divider pt-4 text-sm font-semibold text-white">Total: {formatCurrency(order.totalPrice)}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OrderHistoryPage;
