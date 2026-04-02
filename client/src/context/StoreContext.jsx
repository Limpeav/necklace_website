import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [wishlist, setWishlist] = useState({ products: [] });

  const syncProtectedState = async () => {
    const token = localStorage.getItem("lunelle_token");
    if (!token) {
      setCart({ items: [] });
      setWishlist({ products: [] });
      return;
    }

    try {
      const [cartRes, wishlistRes] = await Promise.all([api.get("/cart"), api.get("/wishlist")]);
      setCart(cartRes.data);
      setWishlist(wishlistRes.data);
    } catch {
      setCart({ items: [] });
      setWishlist({ products: [] });
    }
  };

  useEffect(() => {
    syncProtectedState();
  }, []);

  const addToCart = async (payload) => {
    if (!localStorage.getItem("lunelle_token")) {
      throw new Error("Authentication required");
    }
    const { data } = await api.post("/cart", payload);
    setCart(data);
  };

  const updateCartItem = async (itemId, quantity) => {
    const { data } = await api.put(`/cart/${itemId}`, { quantity });
    setCart(data);
  };

  const removeCartItem = async (itemId) => {
    const { data } = await api.delete(`/cart/${itemId}`);
    setCart(data);
  };

  const toggleWishlist = async (productId) => {
    if (!localStorage.getItem("lunelle_token")) {
      throw new Error("Authentication required");
    }
    const { data } = await api.post("/wishlist/toggle", { productId });
    setWishlist(data);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        syncProtectedState,
        addToCart,
        updateCartItem,
        removeCartItem,
        toggleWishlist,
        setCart
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
