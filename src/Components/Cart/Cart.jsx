import React, { useState, useEffect } from "react";
import {
  Divider,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import CartItem from "./CartItem";
import { axiosInstance } from "../../config/api";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useApp } from "../AppContext/AppContext";

const Cart = () => {
  const { appState, setAppState } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/account/login");
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/cart/get-cart");
        setAppState((prevAppState) => ({
          ...prevAppState,
          cart: response.data.cart,
        }));
      } catch (err) {
        if (err.status === 404) {
          setAppState((prevAppState) => ({
            ...prevAppState,
            cart: null,
          }));
        } else setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const updateQuantity = async (foodId, action) => {
    try {
      const response = await axiosInstance.post("cart/update-item-quantity", {
        foodId,
        action,
      });
      if (response.status === 200) {
        toast.success("Updated cart");
        setAppState((prevAppState) => ({
          ...prevAppState,
          cart: response.data.cart,
        }));
      }
    } catch (error) {
      setError("Failed to update quantity.");
    }
  };

  const removeItem = async (foodId) => {
    try {
      const response = await axiosInstance.delete("/cart/remove", {
        data: { foodId }, // Pass foodId as part of the request body using `data`
      });
      console.log("response.data", response.data);
      if (response.status === 200) {
        toast.success("Item removed");
        setAppState((prevAppState) => ({
          ...prevAppState,
          cart: response.data.cart,
        }));
      }
    } catch (err) {
      setError("Failed to remove item.");
      console.error(err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 pb-10">Something went wrong: {error}</p>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  if (!appState.cart || appState.cart?.items.length === 0)
    return (
      <div className="text-center py-10">
        <p className="pb-10">Your cart is empty</p>
        <Button variant="contained" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    );

  return (
    <main className="py-5 px-4 sm:px-10 md:px-[120px]">
      <h1 className="text-3xl font-bold text-center mb-10">
        Your Shopping Cart
      </h1>
      <section>
        {appState.cart?.items.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
        ))}

        <Divider sx={{ marginY: "1rem" }} />

        <Box sx={{ px: 2, textAlign: "left" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", py: 2 }}>
            Bill Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Typography sx={{ color: "#6c6c6c" }}>Total Amount</Typography>
            <Typography>₹{appState.cart?.totalPrice}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/order")}
          >
            Proceed <ArrowForwardIosIcon />
          </Button>
        </Box>
      </section>
    </main>
  );
};

export default Cart;
