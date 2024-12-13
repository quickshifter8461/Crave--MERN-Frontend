import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  Button,
  CircularProgress,
} from "@mui/material";
import { axiosInstance } from "../../config/api";
import AddressCard from "../Cart/AddressCard";
import { useApp } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { appState, setAppState } = useApp();
  const navigate = useNavigate();
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

  const handleApplyCoupon = (couponCode) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      currentCheckOut: { ...prevAppState?.currentCheckOut, coupon: couponCode },
    }));
    console.log(appState);
  };

  const handleSelectAddress = (address) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      currentCheckOut: { ...prevAppState?.currentCheckOut, address: address },
    }));
    console.log(appState);
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
            <Typography variant="h6" gutterBottom>
              Cart Total: ₹{appState?.cart?.totalPrice}
            </Typography>
            {appState.currentCheckOut?.coupon ? (
              <Card sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="body1">
                  Applied Coupon: {appState.currentCheckOut.coupon?.code}
                </Typography>
              </Card>
            ) : null}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
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
                  onClick={() => navigate("/add/newAddress")}
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
                        onClick={() => handleApplyCoupon(coupon)} // Add some margin for spacing
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
