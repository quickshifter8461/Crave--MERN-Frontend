import React from 'react'
import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Navbar from './Components/Navbar/Navbar'
import { darkTheme } from './Theme/DarkTheme'
import Home from './Components/Home/Home'
import RestaurantDetails from './Components/Restaurant/RestaurantDetails'
import MenuPage from './Components/Restaurant/MenuPage'
import ReviewsPage from './Components/Reviews/ReviewsPage'
import Footer from './Components/Footer/Footer'
import CombinedSearchField from './Components/Searchbar/SearchBar'
import Cart from './Components/Cart/Cart'

const App = () => {
  return (
   <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Navbar/>
     {/* <Home/> */}
    {/* <RestaurantDetails/> */}
    {/* <Cart/> */}
    <Footer/>
   </ThemeProvider> 
  )
}

export default App