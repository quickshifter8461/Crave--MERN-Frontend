import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../config/api";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast"

const initialValue = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginCard = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post("/auth/login", values),
        {
          loading: 'Logging in...',
          success: <b>Login Successful!</b>,
          error: <b>Login Failed. Please try again.</b>,
        }
      );
      localStorage.setItem('loggedIn', true)
      setIsLoggedIn(true);
      // Redirect to home or desired page
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors({ email: error.response.data.message });
      } else {
        setErrors({ email: "An unexpected error occurred." });
      }
    } finally {
      setSubmitting(false);
      navigate("/"); 
    }
  };

  return (
    <Card
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
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Login
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          Welcome back!
        </Typography>

        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || Object.keys(errors).length > 0}
                sx={{
                  marginTop: 2,
                  padding: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
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
            onClick={() => navigate("/account/register")}
          >
            Don't have an account? Signup here.
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
