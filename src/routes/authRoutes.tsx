import { Route } from 'react-router-dom';
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import SignUpAs from "../components/Auth/SignUpAs";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ForgotPasswordEmailSent from "../components/Auth/ForgotPasswordEmailSent";
import ResetPassword from "../components/Auth/ResetPassword";
import VerifyEmail from "../components/Auth/VerifyEmail";
import ProtectAuthPages from '../components/ProtectAuthPages';

const AuthRoutes = () => (

  <>
    <Route path='/sign-in' element={<ProtectAuthPages><Login /> </ProtectAuthPages>} />
    <Route path='/verify-email' element={<ProtectAuthPages><VerifyEmail /></ProtectAuthPages>} />
    <Route path='/forgot-password' element={<ProtectAuthPages><ForgotPassword /></ProtectAuthPages>} />
    <Route path='/forgot-password-email-sent' element={<ProtectAuthPages><ForgotPasswordEmailSent /></ProtectAuthPages>} />
    <Route path="/reset-password/:token" element={<ProtectAuthPages><ResetPassword /></ProtectAuthPages>} />
    <Route path='/sign-up' element={<ProtectAuthPages><SignUp /></ProtectAuthPages>} />
    <Route path='/sign-up-as' element={<ProtectAuthPages><SignUpAs /></ProtectAuthPages>} />

  </>
);

export default AuthRoutes;