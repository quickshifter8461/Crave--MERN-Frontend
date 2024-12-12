import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";






const Address = () => {
  const [addresses, setAddresses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/auth/addresses");
      setAddresses(response.data.cart[0]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);
  if (loading) {
    return <ShimmerCard />;
  }
  
  if (error) {
    return <p className="text-red-500">Something went wrong: {error}</p>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        My addresses
      </Typography>
      <Grid container spacing={3}>
        {/* Add Address Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <IconButton color="primary" size="large">
              <AddIcon fontSize="large" />
            </IconButton>
            <Typography>Add Address</Typography>
          </Card>
        </Grid>

        {/* Address Cards */}
        {addresses.map((address, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{address.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.address}
                </Typography>
                <div style={{ marginTop: "10px" }}>
                  <Button size="small" color="secondary">
                    Edit
                  </Button>
                  <Button size="small" color="primary">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Address;
