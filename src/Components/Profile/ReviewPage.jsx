import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Divider,
  Rating,
} from "@mui/material";

const reviews = [
  {
    restaurant: "Thali Time",
    location: "Sunderpur, Varanasi",
    rating: 5,
    review: "Nice Food",
    deliveryType: "DELIVERY",
    daysAgo: "8 days ago",
    image: "https://via.placeholder.com/50",
  },
  {
    restaurant: "Babbu's Galaxy Restaurant",
    location: "Chaoni, Nagpur",
    rating: 3.5,
    review: "Tasty biriyani",
    deliveryType: "DELIVERY",
    daysAgo: "16 days ago",
    image: "https://via.placeholder.com/50",
  },
  {
    restaurant: "Thali Expresss",
    location: "Durgakund, Varanasi",
    rating: 1,
    review: "Worst food ever",
    deliveryType: "DELIVERY",
    daysAgo: "18 days ago",
    image: "https://via.placeholder.com/50",
  },
  {
    restaurant: "Traffic Jam Food Junction",
    location: "Cantt, Jabalpur",
    rating: 4,
    review: "Nice Food",
    deliveryType: "DELIVERY",
    daysAgo: "25 days ago",
    image: "https://via.placeholder.com/50",
  },
];

const ReviewPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      <Grid container spacing={3}>
        {reviews.map((review, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
                {/* Avatar */}
                <Avatar
                  src={review.image}
                  alt={review.restaurant}
                  sx={{ width: 60, height: 60, marginRight: 2 }}
                />

                {/* Review Details */}
                <Box>
                  <Typography variant="h6">{review.restaurant}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      marginTop: 1,
                      marginBottom: 1,
                    }}
                  >
                    {review.deliveryType}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    precision={0.5}
                    readOnly
                  />
                  {review.review && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginTop: 1 }}
                    >
                      {review.review}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", marginTop: 1 }}
                  >
                    {review.daysAgo}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewPage;
