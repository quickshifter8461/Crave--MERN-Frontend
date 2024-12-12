import { Button, Card, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex gap-5 w-64 p-5" sx={{ mb: 2 }}>
      <HomeIcon />
      <div className="space-y-3 text-gray-500">
        <Typography variant="h6" color="white">
          {item.name}
        </Typography>
        <Typography variant="body2" color="gray">
          {`${item.street}, ${item.city}, ${item.state} - ${item.postalCode}`}
        </Typography>
        {showButton && (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => handleSelectAddress(item)}
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
