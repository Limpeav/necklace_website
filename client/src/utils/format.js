export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value || 0);

export const getEffectivePrice = (product) => product.discountPrice || product.price;
