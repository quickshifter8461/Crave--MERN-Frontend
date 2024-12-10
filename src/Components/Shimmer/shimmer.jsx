import React from "react";
import { Grid, Card, CardContent, Skeleton } from "@mui/material";

const ShimmerCard = () => {
  const shimmerCards = Array.from({ length: 10 }); // Create an array with 10 items

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {shimmerCards.map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="80%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShimmerCard;
