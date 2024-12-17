import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, MenuItem, TextField, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/api";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string()
    .matches(/^[0-9]{5,6}$/, "Must be a valid postal code")
    .required("Postal code is required"),
});

const AddAddressForm = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const addressToEdit = location.state?.addressDetails;
  const redirectTo = location.state?.from || "/";
  const initialValues = addressToEdit
    ? { 
        name: addressToEdit.name, 
        street: addressToEdit.street, 
        city: addressToEdit.city, 
        state: addressToEdit.state, 
        postalCode: addressToEdit.postalCode 
      }
    : { name: "", street: "", city: "", state: "", postalCode: "" };

  // Handle form submission for Add/Edit
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      if (addressToEdit) {
        await toast.promise(
          axiosInstance.put(`/auth/address/${addressToEdit._id}/update`, values),
          {
            loading: "Updating Address...",
            success: "Address updated successfully!",
            error: "Failed to update address. Please try again.",
          }
        );
      } else {
        await toast.promise(
          axiosInstance.post("/auth/add-address", values),
          {
            loading: "Saving New Address...",
            success: "Address added successfully!",
            error: "Failed to add address. Please try again.",
          }
        );
      }
      navigate(redirectTo);
    } catch (error) {
      setErrors({ name: error.response?.data?.message || "An error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isSmallScreen ? "90%" : 400,
        bgcolor: "background.paper",
        outline: "none",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: "1rem", color: "#E1E1E1" }}
      >
        {addressToEdit ? "Edit Address" : "Add New Address"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              select
              fullWidth
              id="name"
              name="name"
              label="Save address as *"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              margin="normal"
            >
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Field>
            <Field
              as={TextField}
              fullWidth
              id="street"
              name="street"
              label="Street"
              error={touched.street && Boolean(errors.street)}
              helperText={touched.street && errors.street}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              id="city"
              name="city"
              label="City"
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              id="state"
              name="state"
              label="State"
              error={touched.state && Boolean(errors.state)}
              helperText={touched.state && errors.state}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              error={touched.postalCode && Boolean(errors.postalCode)}
              helperText={touched.postalCode && errors.postalCode}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "1rem" }}
              disabled={isSubmitting}
            >
              {addressToEdit ? "Update Address" : "Add Address"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddAddressForm;
