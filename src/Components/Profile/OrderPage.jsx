import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { axiosInstance } from "../../config/api";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/order/get-all-orders");
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 pb-10">Something went wrong: {error}</p>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Previous Orders
      </Typography>
      <Grid container spacing={1}>
        {orders.map((order) => (
          <Card
            sx={{
              maxWidth: 400,
              margin: "20px auto",
              padding: "16px",
              boxShadow: 3,
            }}
            key={order._id}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order ID: {order._id}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                Restaurant: {order.restaurant.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Order status: {order.status}
              </Typography>
              <Divider sx={{ margin: "8px 0" }} />

              <Typography variant="body1" gutterBottom>
                <strong>Ordered Items:</strong>
              </Typography>
              <Box
                component="ul"
                sx={{ padding: 0, margin: 0, listStyle: "none" }}
              >
                {order.cartId.items.map((item) => (
                  <Box sx={{ display: "flex", gap: 5 }} key={item.foodId._id}>
                    <Typography
                      variant="body2"
                      component="li"
                      sx={{ marginBottom: "4px" }}
                    >
                      {item.foodId.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="li"
                      sx={{ marginBottom: "4px" }}
                    >
                      {item.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="li"
                      sx={{ marginBottom: "4px" }}
                    >
                      {item.totalItemPrice}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ margin: "8px 0" }} />

              <Typography variant="body2" color="text.secondary">
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Price:</strong> ₹{order.finalPrice}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderPage;
