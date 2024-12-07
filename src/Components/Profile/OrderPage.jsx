import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
} from "@mui/material";

const orders = [
  {
    orderId: "ORD001",
    restaurant: "Thali Time",
    items: ["Thali Set", "Paneer Butter Masala", "Naan"],
    orderDate: "2024-11-28",
    orderStatus: "Delivered",
    totalPrice: 250,
    deliveryType: "Delivery",
  },
  {
    orderId: "ORD002",
    restaurant: "Babbu's Galaxy Restaurant",
    items: ["Chicken Biryani", "Raita", "Naan"],
    orderDate: "2024-11-20",
    orderStatus: "Pending",
    totalPrice: 300,
    deliveryType: "Pickup",
  },
  {
    orderId: "ORD003",
    restaurant: "Thali Express",
    items: ["Veg Thali", "Chapati"],
    orderDate: "2024-11-10",
    orderStatus: "Delivered",
    totalPrice: 180,
    deliveryType: "Delivery",
  },
];

const OrderPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Previous Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
                {/* Order Details */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">Order #{order.orderId}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.restaurant}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.items.join(", ")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: order.orderStatus === "Delivered" ? "success.main" : "error.main",
                      marginTop: 1,
                    }}
                  >
                    {order.orderStatus}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Order Date: {order.orderDate}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Total Price: ₹{order.totalPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Delivery Type: {order.deliveryType}
                  </Typography>
                </Box>
              </CardContent>

              <Divider />
              {/* Order Details Button */}
              <Box sx={{ padding: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="warning">
                  View Order Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderPage;
