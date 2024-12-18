import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { axiosInstance } from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  

 
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/auth/addresses");
        setAddresses(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const handleEditAddress = (address) => {
    navigate("/add/newAddress", {
      state: { addressDetails: address, from: location.pathname },
    });
  };
  

  const handleDeleteAddress = async (id) => {
    try {
      await toast.promise(
        axiosInstance.delete(`/auth/address/${id}`),
        {
          loading: "Deleting address...",
          success: "Address deleted successfully!",
          error: "Failed to delete address.",
        }
      );
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Addresses..
        </Typography>
      </Box>
    );
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
            <IconButton
              onClick={() => navigate("/add/newAddress",{
                state: { from: location.pathname }, 
              })}
              color="primary"
              size="large"
            >
              <AddIcon fontSize="large" />
            </IconButton>
            <Typography>Add Address</Typography>
          </Card>
        </Grid>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{address.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.street}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.postalCode}
                </Typography>
                <div style={{ marginTop: "10px" }}>
                  <Button size="small" color="secondary" onClick={() => handleEditAddress(address)} >
                    Edit
                  </Button>
                  <Button size="small" color="primary" onClick={()=>handleDeleteAddress(address._id)}>
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
