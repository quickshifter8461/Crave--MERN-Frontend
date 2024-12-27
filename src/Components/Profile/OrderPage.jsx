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
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";
import { axiosInstance } from "../../config/api";

const OrderPage = () => {
  // State management
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [reviews, setReviews] = useState([]);

  // Fetch orders
  useEffect(() => {
    fetchOrders();
    fetchAllReviews();
  }, []);

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

  const fetchAllReviews = async () => {
    try {
      const response = await axiosInstance.get("/review/all-reviews");
      setReviews(response.data.reviews);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  // Review handlers
  const handleReviewSubmit = async () => {
    try {
      await axiosInstance.post("/review/add-review", {
        menuId: selectedItem.foodId._id,
        orderId: selectedItem.orderId,
        rating: review.rating,
        comment: review.comment,
      });
      await fetchAllReviews(); // Refresh orders to show new review
      handleCloseDialog();
    } catch (err) {
      setError(err.message || "Failed to submit review");
    }
  };

  const handleOpenDialog = (item, orderId) => {
    setSelectedItem({ ...item, orderId });
    setReview({ rating: 0, comment: "" }); // Reset review form
    setOpenReviewDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenReviewDialog(false);
    setSelectedItem(null);
    setReview({ rating: 0, comment: "" });
  };

  // Render helpers
  const renderOrderedItem = (item, orderId) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        py: 1,
        borderBottom: "1px solid #eee",
      }}
      key={item.foodId._id}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          {item.foodId.name}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Quantity: {item.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{item.totalItemPrice}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          minWidth: "200px",
        }}
      >
        {reviews.find(
          (review) =>
            review.menuId === item.foodId._id && review.orderId === orderId
        ) ? (
          <Box sx={{ p: 1, borderRadius: 1 }}>
            <Rating
              value={
                reviews.find(
                  (review) =>
                    review.menuId === item.foodId._id &&
                    review.orderId === orderId
                ).rating
              }
              readOnly
              size="small"
            />
            <Typography variant="caption" display="block">
              {
                reviews.find(
                  (review) =>
                    review.menuId === item.foodId._id &&
                    review.orderId === orderId
                ).comment
              }
            </Typography>
          </Box>
        ) : (
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpenDialog(item, orderId)}
          >
            Add Review
          </Button>
        )}
      </Box>
    </Box>
  );

  const renderOrder = (order) => (
    <Grid item xs={12} md={6} lg={4} key={order._id}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order #{order._id.slice(-6)}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {order.restaurant.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Status: {order.status}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 2 }}>
            {order.cartId.items.map((item) =>
              renderOrderedItem(item, order._id)
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Ordered on: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
              Total: ₹{order.finalPrice}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  // Loading and error states
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={fetchOrders}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Your Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map(renderOrder)}
      </Grid>

      {/* Review Dialog */}
      <Dialog
        open={openReviewDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <Typography variant="body1" fontWeight="medium">
              {selectedItem?.foodId.name}
            </Typography>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Rating
              </Typography>
              <Rating
                value={review.rating}
                onChange={(_, newValue) =>
                  setReview((prev) => ({ ...prev, rating: newValue }))
                }
                size="large"
              />
            </Box>
            <TextField
              multiline
              rows={4}
              label="Your Review"
              value={review.comment}
              onChange={(e) =>
                setReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleReviewSubmit}
            variant="contained"
            disabled={!review.rating || !review.comment.trim()}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderPage;
