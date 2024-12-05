import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

// Sample data (Replace this with your fetched data)
const menuData = [
  {
    category: "Value Treat",
    items: [
      {
        id: 1,
        name: "8 Pcs Hot Wings",
        price: 299,
        rating: 4.5,
        description: "8 Pcs Hot & Crispy Wings",
        image: "https://via.placeholder.com/150",
        bestseller: true,
      },
      {
        id: 2,
        name: "4 Pcs Chicken",
        price: 449,
        rating: 4.4,
        description: "4 Pcs Fried / Grilled Chicken",
        image: "https://via.placeholder.com/150",
        bestseller: false,
      },
    ],
  },
  {
    category: "Crunchies",
    items: [
      {
        id: 3,
        name: "Crispy Nuggets",
        price: 199,
        rating: 4.2,
        description: "12 Pcs Crispy Nuggets",
        image: "https://via.placeholder.com/150",
        bestseller: false,
      },
    ],
  },
];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].category);
  const [search, setSearch] = useState("");

  // Get items for the selected category
  const categoryItems =
    menuData.find((cat) => cat.category === selectedCategory)?.items || [];

  // Filter items based on the search query
  const filteredItems = categoryItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 border-r p-4">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <List>
          {menuData.map((category, index) => (
            <ListItem
              button
              key={index}
              onClick={() => setSelectedCategory(category.category)}
              selected={selectedCategory === category.category}
            >
              <ListItemText primary={`${category.category} (${category.items.length})`} />
            </ListItem>
          ))}
        </List>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search within menu"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Category Content */}
        <h2 className="text-xl font-bold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-lg font-bold text-red-600">₹{item.price}</p>
                <p className="text-yellow-500">
                  Rating: {item.rating} ⭐
                </p>
                {item.bestseller && (
                  <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                    BESTSELLER
                  </span>
                )}
              </div>
            ))
          ) : (
            <p>No items found for "{search}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
