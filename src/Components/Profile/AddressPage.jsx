import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
const addresses = [
  {
    title: "Varanasi",
    address:
      "C-1 first floor Anandam Homestay, Brij Enclave Colony, Sundarpur, Nagwa",
  },
  {
    title: "Home",
    address: "Prarthana Poyil Chelavoor, Chelavoor, Kozhikode",
  },
  {
    title: "Home",
    address: "Platform 6, YESHWANTHPUR RAILWAY STATION, Railway Station",
  },
  {
    title: "Home",
    address:
      "Madeena apartment Maruthi Nagar, 3rd floor, Old Madivala, Cashier Layout",
  },
  {
    title: "Work",
    address: "I Energizer, ITI Layout, Sector 7, Somasundarapalya",
  },
];
const Address = () => {
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
