import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Modal,
  Grid,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
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

// Initial form values and validation schema for adding a new address
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

const Cart = () => {
  // Cart items state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Burger",
      price: 200,
      quantity: 2,
      image:
        "https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_1280.jpg",
    },
    {
      id: 2,
      name: "Pizza",
      price: 350,
      quantity: 1,
      image:
        "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
    },
  ]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update quantity handler
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Submitted:", values);
    resetForm();
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 min-h-screen pt-10">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={(id, quantity) => {
                if (quantity === 0) {
                  removeItem(id);
                } else {
                  updateQuantity(id, quantity);
                }
              }}
              onRemoveItem={removeItem}
            />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item total</p>
                <p>₹{calculateTotal()}</p>
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
              <p>₹{calculateTotal() + 30 - 30}</p>
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
                  handleSelectAddress={() => console.log("Address Selected")}
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
                        touched.streetAddress && errors.streetAddress
                          ? errors.streetAddress
                          : null
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
                      error={touched.state && Boolean(errors.state)}
                      helperText={
                        touched.state && errors.state ? errors.state : null
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
                      error={touched.pincode && Boolean(errors.pincode)}
                      helperText={
                        touched.pincode && errors.pincode
                          ? errors.pincode
                          : null
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
                      error={touched.city && Boolean(errors.city)}
                      helperText={
                        touched.city && errors.city ? errors.city : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                    >
                      Deliver Here
                    </Button>
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
