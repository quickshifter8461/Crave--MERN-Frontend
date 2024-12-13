import { Button, Card, Typography } from "@mui/material";
import React from "react";
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex gap-5 w-full p-5" sx={{ mb: 2, lg:{maxWidth: "300px"},  }}>
      <div className="space-y-3 text-gray-500 min-w-[100%] flex flex-col justify-evenly">
        <Typography variant="h6" color="white">
          <MarkunreadMailboxIcon /> {item.name}
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
