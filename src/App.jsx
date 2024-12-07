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
import UserRoute from './Routers/UserRoute'

const App = () => {
  return (
   <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    {/* <Navbar isLoggedIn={false}/> */}
     {/* <Home/> */}
    {/* <RestaurantDetails/> */}
    {/* <Cart/> */}
    {/* <Profile/> */}
    {/* <Footer/> */}
    <UserRoute/>
   </ThemeProvider> 
  )
}

export default App