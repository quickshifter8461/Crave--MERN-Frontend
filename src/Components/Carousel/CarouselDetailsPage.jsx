import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config/api';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import RestaurantCard from '../Restaurant/RestaurantCard';

const SearchResultsPage = () => {
  const location = useLocation();
  const { title } = location.state || {};  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/restaurants/menu/${title}/search`);
        const data = response.data;
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchSearchResults();
    }
  }, [title]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom align="center">
        {title} Delivery Near You
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center" marginTop={1}>
          {results.length > 0 ? (
            results.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item._id}>
                <RestaurantCard
                  restaurantId={item.restaurant._id}
                  dishName={item.name}
                  name={item.restaurant.name}
                  image={item.image}
                  rating={item.rating}
                  cuisines={item.restaurant.cuisine}
                  isOpen={item.restaurant.status} 
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No results found
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default SearchResultsPage;
