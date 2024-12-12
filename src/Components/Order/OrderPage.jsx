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
import { axiosInstance } from "../../config/api"; // Update the path if needed
import AddressCard from "../Cart/AddressCard";

const OrderPage = () => {
  const [cart, setCart] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartResponse, couponsResponse, addressesResponse] =
          await Promise.all([
            axiosInstance.get("/cart/get-cart"),
            axiosInstance.get("/coupon/get-coupons"),
            axiosInstance.get("/auth/addresses"),
          ]);

        setCart(cartResponse.data.cart[0]);
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

  const handleAddNewAddress = () => {
    console.log("Add new address");
  };

  const handleSelectAddress = (address) => {
    console.log("Selected Address:", address);
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
    <Box sx={{ mt: 5, px: { xs: 2, md: 10 } }}>
      <Typography variant="h4" gutterBottom>
        Your Order
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              backgroundColor: "#1E1E1E",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cart Details
            </Typography>
            {cart.items.map((item) => (
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
              Cart Total: ₹{cart.totalPrice}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>

        {/* Address and Coupons Section */}
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={3}>
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
                    <Grid item xs={12} sm={6} md={4} key={address._id}>
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
                  onClick={handleAddNewAddress}
                >
                  Add New Address
                </Button>
              </Paper>
            </Grid>

            {/* Coupons */}
            <Grid item>
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
                    <Box>
                      <Typography variant="body1" color="textPrimary">
                        {coupon.code}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {coupon.description}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ ml: 2 }} // Add some margin for spacing
                    >
                      Apply
                    </Button>
                  </Card>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderPage;
