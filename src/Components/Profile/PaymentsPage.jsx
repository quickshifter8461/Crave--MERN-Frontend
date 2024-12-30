import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { axiosInstance } from "../../config/api";

const PaymentsPage = () => {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/order/all-payments");
        const sortedPayments = response.data.payments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPayments(sortedPayments);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, []);
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const filteredPayments =
    filter === "All"
      ? payments
      : payments.filter((payment) => payment.status === filter);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payments
      </Typography>
      <FormControl sx={{ marginBottom: 3, minWidth: 200 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Status"
          sx={{ backgroundColor: "background" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="pending">Failed</MenuItem>
        </Select>
      </FormControl>

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
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{payment.restaurant}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Order ID: {payment.orderId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Order Date:
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ marginRight: 3 }}>
                  {payment.amount}
                </Typography>

                <Chip
                  label={payment.status}
                  color={payment.status === "success" ? "success" : "error"}
                  sx={{
                    backgroundColor:
                      payment.status === "success" ? green[100] : red[100],
                    color: payment.status === "success" ? green[800] : red[800],
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
