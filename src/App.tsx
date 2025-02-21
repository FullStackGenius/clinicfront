// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserRedux } from './redux/userSlice';
import { AppDispatch } from './redux/store';
import './style.css';
import './custom_style.css';

// Import route files
import AuthRoutes from './routes/authRoutes';
import FreelancerRoutes from './routes/freelancerRoutes';
import PublicRoutes from './routes/publicRoutes';
import ClientRoutes from './routes/clientRoutes';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const localUser = localStorage.getItem('user'); // Get the item from local storage
    if (localUser) {
      const parsedUser = JSON.parse(localUser); // Parse only if it's not null
      dispatch(setUserRedux(parsedUser));
    }
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
			{/* Public Routes */}
			{PublicRoutes()}

			{/* Auth Routes */}
			{AuthRoutes()}

			{/* Freelancer Routes (Protected Routes for freelancers) */}
			{FreelancerRoutes()}

			{/* Client Routes (Protected Routes for clients) */}	
			{ClientRoutes()}	
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;