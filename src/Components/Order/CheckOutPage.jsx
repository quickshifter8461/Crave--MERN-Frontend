import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  Button,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";
import { axiosInstance } from "../../config/api";
import AddressCard from "../Cart/AddressCard";
import { useApp } from "../AppContext/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRazorpay } from "react-razorpay";
import CloseIcon from "@mui/icons-material/Close";
const CheckOutPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { appState, setAppState } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [couponsResponse, addressesResponse] = await Promise.all([
          axiosInstance.get("/coupon/get-coupons"),
          axiosInstance.get("/auth/addresses"),
        ]);

        setCoupons(couponsResponse.data.coupons);
        setAddresses(addressesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const { error, isLoading, Razorpay } = useRazorpay();

  const handleCheckout = async () => {
    const checkoutData = {
      restaurant: appState.cart.restaurantId._id,
      cartId: appState.cart._id,
      coupon: appState.currentCheckOut?.coupon?._id || null,
      deliveryAddress: appState.currentCheckOut?.address?._id,
    };
    try {
      const response = await axiosInstance.post(
        "/order/place-order",
        checkoutData
      );

      // Create payment
      const payment = await axiosInstance.post(
        `/order/${response.data.order?._id}/create-payment`
      );
      console.log("payment", payment);
      console.log(appState);
      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_ID_KEY}`,
        amount: payment.data.razorpayOrder.amount,
        currency: "INR",
        name: "Crave",
        description: "Crave",
        order_id: payment.data.razorpayOrder.id, // Generate order_id on server
        handler: async (response) => {
          try {
            const verifyPayment = await axiosInstance.post(
              "/order/verify-payment",
              response
            );
            setAppState((prevAppState) => ({
              ...prevAppState,
              cart: {},
              addresses: {},
              coupon: {},
            }));
            navigate("/");
            toast.success("Your order is placed successfully");
          } catch (error) {
            console.error("verification:", error);
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: appState.user?.name,
          email: appState.user?.email,
          contact: appState.user?.contact,
        },
        theme: {
          color: "#1E1E1E",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.log("Error:", error);
      console.error(
        "Failed to place the order:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Error while placing the order."
      );
    }
  };

  const handleApplyCoupon = async (couponCode) => {
    try {
      const response = await axiosInstance.post("/coupon/apply-coupon", {
        code: couponCode.code,
        orderValue: appState.cart.totalPrice,
      });
      const { discount, finalPrice } = response.data;
      setAppState((prevAppState) => ({
        ...prevAppState,
        currentCheckOut: {
          ...prevAppState?.currentCheckOut,
          coupon: couponCode,
          discount,
          finalPrice,
        },
      }));
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleSelectAddress = (address) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      currentCheckOut: { ...prevAppState?.currentCheckOut, address: address },
    }));
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading order details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, px: { xs: 2, md: 10 }, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Order
      </Typography>

      <Grid container spacing={2}>
        {/* Cart Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,

              backgroundColor: "#1E1E1E",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cart Details
            </Typography>
            {appState.cart?.items.map((item) => (
              <Card
                key={item.foodId._id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="textPrimary">
                  {item.foodId.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ₹{item.foodId.price} | Quantity: {item.quantity} |
                  Total: ₹{item.totalItemPrice}
                </Typography>
              </Card>
            ))}
            <Divider />
            {appState.currentCheckOut?.coupon ? (
              <Card
                sx={{
                  p: 2,
                  my: 2,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  Applied Coupon: {appState.currentCheckOut.coupon?.code}
                </Typography>
                <IconButton
                  aria-label="remove coupon"
                  onClick={() => {
                    // Logic to remove the coupon
                    setAppState((prev) => ({
                      ...prev,
                      currentCheckOut: {
                        ...prev.currentCheckOut,
                        coupon: null,
                      },
                    }));
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Card>
            ) : null}
            <Typography variant="h6" gutterBottom>
              {`Total: ₹${
                appState.currentCheckOut?.coupon
                  ? appState.currentCheckOut.finalPrice
                  : appState?.cart?.totalPrice
              }`}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleCheckout}
              disabled={appState.currentCheckOut?.address ? false : true}
            >
              {appState.currentCheckOut?.address
                ? "Checkout"
                : "Select address to checkout"}
            </Button>
          </Paper>
          <Grid item sx={{ mt: 2 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Delivering to
              </Typography>

              {appState.currentCheckOut?.address ? (
                <Card sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="body1">
                    {appState.currentCheckOut.address.street},{" "}
                    {appState.currentCheckOut.address.city}
                  </Typography>
                  <Typography variant="body2">
                    {appState.currentCheckOut.address.state} -{" "}
                    {appState.currentCheckOut.address.postalCode}
                  </Typography>
                </Card>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No address selected.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Address and Coupons Section */}
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={1}>
            {/* Addresses */}
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Saved Addresses
                </Typography>
                <Grid container spacing={2}>
                  {addresses.map((address) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={12}
                      lg={6}
                      xl={4}
                      key={address._id}
                    >
                      <AddressCard
                        item={address}
                        showButton
                        handleSelectAddress={handleSelectAddress}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() =>
                    navigate("/add/newAddress", {
                      state: { from: location.pathname },
                    })
                  }
                >
                  Add New Address
                </Button>
              </Paper>
              <Grid item sx={{ mt: 2 }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Available Coupons
                  </Typography>
                  {coupons.map((coupon) => (
                    <Card
                      key={coupon._id}
                      sx={{
                        p: 2,
                        mb: 2,
                        display: "flex",
                        alignItems: "center", // Vertically center the content
                        justifyContent: "space-between", // Space out the content
                        borderRadius: 2,
                      }}
                    >
                      <Box display={"flex"} gap={2}>
                        <Typography variant="body1" color="textPrimary">
                          {coupon.code}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Discount Percentage: {coupon.discountPercentage}%
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Minimum Order Value: ₹{coupon.minOrderValue}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ ml: 2 }}
                        onClick={() => handleApplyCoupon(coupon)}
                      >
                        Apply
                      </Button>
                    </Card>
                  ))}
                </Paper>
              </Grid>
            </Grid>

            {/* Coupons */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckOutPage;
