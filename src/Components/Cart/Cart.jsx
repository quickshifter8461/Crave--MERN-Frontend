import {
  Box,
  Button,
  Card,
  Divider,
  Modal,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};
const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};
const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.number().required("Pincode is required"),
  city: Yup.string().required("City is required"),
});
const handleSubmit = (values, { resetForm }) => {
  console.log("Form Submitted:", values);
  resetForm();
};
const Items = [1, 2, 4, 6, 7];
const Cart = () => {
  const selectAddress = () => {
    console.log("clicked");
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg: min-h-screen pt-10">
          {Items.map((item) => (
            <CartItem key={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item total</p>
                <p>₹3999</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Charges</p>
                <p>₹30</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Coupon Discount</p>
                <p>₹30</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total Amount</p>
              <p>₹5999</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Select an address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 3, 4].map((item, index) => (
                <AddressCard
                  key={`${item}-${index}`} // Ensure uniqueness
                  handleSelectAddress={selectAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button variant="outlined" fullWidth onClick={handleOpen}>
                    ADD
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={
                      touched.streetAddress && Boolean(errors.streetAddress)
                    }
                    helperText={
                      touched.streetAddress && errors.streetAddress ? (
                        <span className="text-red">{errors.streetAddress}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={
                      touched.state && Boolean(errors.state)
                    }
                    helperText={
                      touched.streetAddress && errors.streetAddress ? (
                        <span className="text-red">{errors.streetAddress}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    error={
                      touched.pincode && Boolean(errors.pincode)
                    }
                    helperText={
                      touched.streetAddress && errors.streetAddress ? (
                        <span className="text-red">{errors.streetAddress}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={
                      touched.city && Boolean(errors.city)
                    }
                    helperText={
                      touched.streetAddress && errors.streetAddress ? (
                        <span className="text-red">{errors.streetAddress}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit" color="primary">Deliver Here</Button>
                </Grid>
              </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
