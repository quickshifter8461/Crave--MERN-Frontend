import React from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { id, name, price, image, quantity } = item;

  // Handler for incrementing quantity
  const incrementQuantity = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  // Handler for decrementing quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      // Remove item from cart if quantity is 1
      onRemoveItem(id);
    }
  };

  // Handler for removing item completely
  const handleDelete = () => {
    onRemoveItem(id);
  };

  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={image}
            alt={name}
          />
        </div>
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{name}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <IconButton onClick={decrementQuantity}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className="w-5 h-5 text-xs flex items-center justify-center">
                  {quantity}
                </div>
                <IconButton onClick={incrementQuantity}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p>₹{price}</p>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
