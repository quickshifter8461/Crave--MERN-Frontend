import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiCamera, FiEye, FiEyeOff } from "react-icons/fi";
import { axiosInstance } from "../../config/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const EditProfileForm = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const location = useLocation();
  const redirectTo = location.state?.from
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile");
        const { name, email, phone, profilePic } = response.data;

        formik.setValues({
          name,
          email,
          phone,
          password: "",
          confirmPassword: "",
        });

        setPreviewImage(profilePic || "https://example.com/default-avatar.jpg");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        if (values.profilePic) {
          formData.append("profilePic", values.profilePic);
        }
        const response = await toast.promise(
          axiosInstance.put("/auth/update-profile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Updating profile...",
            success: <b>Profile updated successfully!</b>,
            error: <b>Profile update failed. Please try again.</b>,
          }
        );
        setLoading(false);
        navigate(redirectTo)
      } catch (error) {
        setLoading(false);
        console.error("Error updating profile:", error);
      }
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        formik.setFieldValue("profilePic", file);
      };
      reader.readAsDataURL(file);
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
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{ marginBottom: "1.5rem", color: "#E1E1E1", textAlign: "center" }}
      >
        Edit Profile
      </Typography>

      {/* Form Start */}
      <Box component="form" onSubmit={formik.handleSubmit}>
        {/* Avatar Section */}
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "1.5rem",
            position: "relative",
          }}
        >
          <Avatar
            src={previewImage}
            alt="Profile Picture"
            sx={{
              width: theme.spacing(15),
              height: theme.spacing(15),
              margin: "0 auto",
              border: "4px solid #fff",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
          <input
            accept="image/*"
            type="file"
            id="profile-picture"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="profile-picture">
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                right: "50%",
                transform: "translate(50%, 50%)",
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
            >
              <FiCamera />
            </IconButton>
          </label>
        </Box>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Full Name"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email Address"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          margin="normal"
        />
        <TextField
          fullWidth
          label="New Password"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "1.5rem" }}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfileForm;
