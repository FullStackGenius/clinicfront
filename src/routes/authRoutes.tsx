// src/routes/authRoutes.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import SignUpAs from "../components/Auth/SignUpAs";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ForgotPasswordEmailSent from "../components/Auth/ForgotPasswordEmailSent";
import ResetPassword from "../components/Auth/ResetPassword";
import VerifyEmail from "../components/Auth/VerifyEmail";

const AuthRoutes = () => (
  <>
    <Route path='/sign-in' element={<Login />} />
    <Route path='/verify-email' element={<VerifyEmail />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/forgot-password-email-sent' element={<ForgotPasswordEmailSent />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/sign-up-as' element={<SignUpAs />} />
  </>
);

export default AuthRoutes;