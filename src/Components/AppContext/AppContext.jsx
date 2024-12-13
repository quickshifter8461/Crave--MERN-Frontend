import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../../config/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({});
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await axiosInstance.get("/cart/get-cart");
        if (data.data.cart) {
          data.data.cart.items.length;
          setAppState({...appState, cart: data.data.cart });
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
