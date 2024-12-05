import React, { useState } from "react";
import { Button, Avatar, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

// Sample review data (Replace this with data from your API)
const reviewsData = [
  {
    id: 1,
    user: "Malu",
    reviews: 0,
    followers: 0,
    deliveryRating: 3,
    comment: "",
    time: "yesterday",
    votesHelpful: 0,
    votesComments: 0,
    avatar: "",
  },
  {
    id: 2,
    user: "Shihab Huzain",
    reviews: 0,
    followers: 0,
    deliveryRating: 1,
    comment: "",
    time: "yesterday",
    votesHelpful: 0,
    votesComments: 0,
    avatar: "",
  },
  {
    id: 3,
    user: "Geethu Saju",
    reviews: 0,
    followers: 0,
    deliveryRating: 1,
    comment: "Very very delay",
    time: "5 days ago",
    votesHelpful: 0,
    votesComments: 0,
    avatar: "",
  },
  {
    id: 4,
    user: "Ajay Bhoi",
    reviews: 0,
    followers: 2,
    deliveryRating: 4,
    comment: "",
    time: "8 days ago",
    votesHelpful: 0,
    votesComments: 0,
    avatar: "https://via.placeholder.com/150",
  },
];

const ReviewsPage = () => {
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (order) => {
    setSortOrder(order);
    setAnchorEl(null);
  };

  return (
    <div className="p-4">
      {/* Reviews Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chicking Reviews</h2>
        <div>
          <Button
            variant="text"
            endIcon={<MoreVert />}
            onClick={handleSortClick}
          >
            {sortOrder}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSortClose("Newest First")}>
              Newest First
            </MenuItem>
            <MenuItem onClick={() => handleSortClose("Oldest First")}>
              Oldest First
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <div className="flex items-center mb-2">
              <Avatar
                src={review.avatar || "https://via.placeholder.com/150"}
                alt={review.user}
                className="mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-bold">{review.user}</h3>
                <p className="text-sm text-gray-600">
                  {review.reviews} reviews • {review.followers} Followers
                </p>
              </div>
              <Button
                variant="outlined"
                size="small"
                className="text-red-500 border-red-500"
              >
                Follow
              </Button>
            </div>
            <div className="flex items-center text-sm mb-2">
              <span
                className={`px-2 py-1 rounded text-white ${
                  review.deliveryRating >= 4
                    ? "bg-green-500"
                    : review.deliveryRating >= 2
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {review.deliveryRating}★ DELIVERY
              </span>
              <span className="ml-4 text-gray-500">{review.time}</span>
            </div>
            {review.comment && <p className="mb-2">{review.comment}</p>}
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-4">{review.votesHelpful} Votes for helpful</span>
              <span className="mr-4">{review.votesComments} Comments</span>
              <Button variant="text" size="small" className="text-gray-500">
                Share
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
