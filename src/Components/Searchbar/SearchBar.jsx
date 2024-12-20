import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography } from "@mui/material";
import { axiosInstance } from "../../config/api";
import { useNavigate } from "react-router-dom";

const CombinedSearchField = ({
  placeholder = "Search Restaurants or a Dish",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchBoxRef = useRef(null);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/restaurants/search/combined/${value}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleClick = (item) => {
    if (!item.price) {
      navigate(`/restaurant/${item._id}`);
    } else {
      navigate(`/restaurant/${item.restaurant._id}`);
    }
    setQuery("");
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setQuery("");
      setResults([]);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box ref={searchBoxRef}>
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
          value={query}
          onChange={(e) => {
            handleSearch(e);
            setIsOpen(true);
          }}
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
      {isOpen && (
        <>
          {results.length > 0 ? (
            <Box
              sx={{
                marginTop: "10px",
                backgroundColor: "#2C2C2C",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {results.map((item) => (
                <Box
                  onClick={() => handleClick(item)}
                  key={item._id}
                  sx={{
                    padding: "8px 0",
                    borderBottom: "1px solid #444",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.address}
                  </Typography>

                  {item.cuisine ? (
                    <Typography variant="body2" color="text.secondary">
                      Cuisine: {item.cuisine}
                    </Typography>
                  ) : null}

                  {item.restaurant?.name ? (
                    <Typography variant="body2" color="text.secondary">
                      {item.restaurant.name}
                    </Typography>
                  ) : null}
                </Box>
              ))}
            </Box>
          ) : query.trim() !== "" ? (
            <Box
              sx={{
                marginTop: "10px",
                backgroundColor: "#2C2C2C",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <Typography>No restaurants or menu found</Typography>
            </Box>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default CombinedSearchField;
