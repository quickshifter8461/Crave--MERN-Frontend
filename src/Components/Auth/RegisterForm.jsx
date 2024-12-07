import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValue = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Please select a role"),
});

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Submitted", values);
    setSubmitting(false); // Simulate async behavior
  };

  return (
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: 600 }, // Responsive width
        bgcolor: "background.paper",
        outline: "none",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Register
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          Sign up now and dive into a world of mouthwatering dishes with Crave!
        </Typography>

        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValue}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Full Name */}
              <Field
                as={TextField}
                name="fullName"
                label="Full Name"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                error={touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
              />

              {/* Email Address */}
              <Field
                as={TextField}
                name="email"
                label="Email Address"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              {/* Password */}
              <Field
                as={TextField}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              {/* Confirm Password */}
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label="toggle confirm password visibility"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              {/* Role Selection */}
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.role && !!errors.role}
              >
                <InputLabel>Role</InputLabel>
                <Field as={Select} name="role" label="Role" fullWidth>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="restaurant manager">
                    Restaurant Manager
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  style={{ color: "red", fontSize: "0.875rem", marginTop: 4 }}
                />
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 2,
                  padding: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>

        {/* Navigation to Login */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 2 }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
            onClick={() => navigate("/account/login")}
          >
            Already have an account? Login here.
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
