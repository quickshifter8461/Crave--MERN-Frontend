import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { green, red } from "@mui/material/colors";

const payments = [
  {
    id: 1,
    orderId: "ORD12345",
    restaurant: "Thali Time",
    date: "2024-12-01",
    amount: "₹450",
    status: "Success",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    orderId: "ORD12346",
    restaurant: "Babbu's Galaxy Restaurant",
    date: "2024-11-28",
    amount: "₹600",
    status: "Failed",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    orderId: "ORD12347",
    restaurant: "Traffic Jam Food Junction",
    date: "2024-11-25",
    amount: "₹350",
    status: "Success",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    orderId: "ORD12348",
    restaurant: "Thali Express",
    date: "2024-11-20",
    amount: "₹250",
    status: "Success",
    image: "https://via.placeholder.com/50",
  },
];

const PaymentsPage = () => {
  // State for selected filter
  const [filter, setFilter] = useState("All");

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtered payments based on the selected filter
  const filteredPayments =
    filter === "All"
      ? payments
      : payments.filter((payment) => payment.status === filter);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payments
      </Typography>

      {/* Filter Dropdown */}
      <FormControl sx={{ marginBottom: 3, minWidth: 200 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Status"
          sx={{ backgroundColor: "background" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Success">Success</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
        </Select>
      </FormControl>

      {/* Payments List */}
      {filteredPayments.length > 0 ? (
        <Grid container spacing={3}>
          {filteredPayments.map((payment) => (
            <Grid item xs={12} key={payment.id}>
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 2,
                  transition: "0.3s",
                  ":hover": { boxShadow: 4 },
                }}
              >
                {/* Avatar */}
                <Avatar
                  src={payment.image}
                  alt={payment.restaurant}
                  sx={{ width: 50, height: 50, marginRight: 2 }}
                />

                {/* Payment Details */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{payment.restaurant}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Order ID: {payment.orderId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {payment.date}
                  </Typography>
                </Box>

                {/* Amount */}
                <Typography variant="h6" sx={{ marginRight: 3 }}>
                  {payment.amount}
                </Typography>

                {/* Status Chip */}
                <Chip
                  label={payment.status}
                  color={payment.status === "Success" ? "success" : "error"}
                  sx={{
                    backgroundColor:
                      payment.status === "Success" ? green[100] : red[100],
                    color: payment.status === "Success" ? green[800] : red[800],
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No payments found.
        </Typography>
      )}
    </Box>
  );
};

export default PaymentsPage;
