import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './components/Home';
import FamousMovies from './components/FamousMovies';
import TopPage from './components/TopPage';
import UpcomedPage from './components/UpcomedPage';
import SingleMovie from './components/SingleMovie';
import SearchedMovie from './components/SearchedMovie';

const RoutesConfig = () => {
  return (
    <Router>
      <Navbar /> {/* Ensure the Navbar is properly imported and rendered */}
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<FamousMovies />} />
        <Route path="/top-rated" element={<TopPage />} />
        <Route path="/upcoming" element={<UpcomedPage />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/search" element={<SearchedMovie />} />
        
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
