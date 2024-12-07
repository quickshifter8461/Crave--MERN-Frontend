import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Box, MenuItem, Select } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
const CombinedSearchField = ({
  placeholder = "Search Restaurants, cuisines or a dish",
  onSearch,
  addresses = [],
  onGetLocation,
}) => {
  const [selectedAddress, setSelectedAddress] = React.useState("");

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setSelectedAddress(value);
    if (value === "getLocation") {
      onGetLocation();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
        alignItems: "center",
        gap: 2,
        width: "100%",
        backgroundColor: "#1E1E1E",
        borderRadius: "8px",
        padding: "4px 15px",
        margin: "2px",
        border: "1px solid #333333",
        "&:hover": {
          borderColor: "#FFC107",
        },
        "&:focus-within": {
          borderColor: "#E63946",
        },
      }}
    >
      <InputAdornment position="start" padding="">
        <HomeIcon sx={{ color: "#FFC107" }} />
      </InputAdornment>
      <Select
        value={selectedAddress}
        onChange={handleAddressChange}
        displayEmpty
        sx={{
          width: { xs: "100%", sm: "50%" }, // Full width on small screens, half width on larger screens
          backgroundColor: "transparent",
          color: "#E1E1E1",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        <MenuItem value="" disabled>
          Select Address
        </MenuItem>
        {addresses.map((address, index) => (
          <MenuItem key={index} value={address}>
            {address}
          </MenuItem>
        ))}
        <MenuItem value="getLocation">
          <LocationOnIcon sx={{ marginRight: 1 }} />
          Get Location
        </MenuItem>
      </Select>

      <TextField
      
        fullWidth
        variant="standard"
        placeholder={placeholder}
        onChange={onSearch}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#FFC107" }} />
            </InputAdornment>
          ),
        }}
        inputProps={{
          style: { color: "#E1E1E1" },
        }}
        sx={{
          backgroundColor: "transparent",
          "& .MuiInputBase-input": {
            padding: "8px",
          },
        }}
      />
    </Box>
  );
};

export default CombinedSearchField;
