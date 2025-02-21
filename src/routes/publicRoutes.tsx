// src/routes/publicRoutes.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import Home from "../components/Home";
import OurFreelancer from "../components/OurFreelancer";
import FreelancerProfile from "../components/FreelancerProfile";
import LearnToHire from "../components/LearnToHire";
// Add other public routes...

const PublicRoutes = () => (
  <>
    <Route path='/' element={<Home />} />
    <Route path='/our-freelancer' element={<OurFreelancer />} />
    <Route path='/freelancer-profile' element={<FreelancerProfile />} />
    <Route path='/learn-how-to-hire' element={<LearnToHire />} />
  </>
);

export default PublicRoutes;
