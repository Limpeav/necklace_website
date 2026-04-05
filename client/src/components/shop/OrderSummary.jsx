import { formatCurrency } from "../../utils/format";
import FallbackImage from "../FallbackImage";

const OrderSummary = ({ items, totals }) => (
  <div className="surface-card p-6">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Order summary</p>
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        (() => {
          const displayId = item.product?.productCode || item.name || item.product?.name;

          return (
            <div key={item._id || item.product?._id} className="flex items-center gap-4">
              <FallbackImage src={item.product?.images?.[0] || item.image} alt={displayId} className="h-16 w-16 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{displayId}</p>
                <p className="text-xs text-stone-400">
                  Qty {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ""} {item.selectedLength ? `• ${item.selectedLength}` : ""}
                </p>
              </div>
              <p className="text-sm font-semibold text-white">
                {formatCurrency((item.price || item.product?.price) * item.quantity)}
              </p>
            </div>
          );
        })()
      ))}
    </div>
    <div className="mt-6 space-y-3 border-t dark-divider pt-6 text-sm text-stone-300">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(totals.itemsPrice)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{formatCurrency(totals.shippingPrice)}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax</span>
        <span>{formatCurrency(totals.taxPrice)}</span>
      </div>
      <div className="flex justify-between border-t dark-divider pt-3 text-base font-semibold text-white">
        <span>Total</span>
        <span>{formatCurrency(totals.totalPrice)}</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;
