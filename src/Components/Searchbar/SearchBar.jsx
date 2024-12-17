import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Box} from "@mui/material";
const CombinedSearchField = ({
  placeholder = "Search Restaurants, cuisines or a dish",
  onSearch,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, 
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
