import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './redux/store';
import { setUserRedux } from './redux/userSlice';
import { checkUserLoggedIn } from "./_helpers/checkUserLoggedIn";
import { getUserInfo } from "./_helpers/getUserInfo";
import './style.css';
import './custom_style.css';
import Home from "./components/Home";
import ProtectedRoute from './components/ProtectedRoute'; // Adjust the path
//Auth
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import SignUpAs from "./components/Auth/SignUpAs";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ForgotPasswordEmailSent from "./components/Auth/ForgotPasswordEmailSent";
import ResetPassword from "./components/Auth/ResetPassword";
import VerifyEmail from "./components/Auth/VerifyEmail";
import OurFreelancer from "./components/OurFreelancer";
import FreelancerProfile from "./components/FreelancerProfile";
import Chat from "./components/Chat";
import HelpGetStarted from "./components/HelpGetStarted";
import DesiredAccountant from "./components/DesiredAccountant";
import CheckBudget from "./components/CheckBudget";
import ScopeOfWork from "./components/ScopeOfWork";
import JobStrongTitle from "./components/JobStrongTitle";
import DescribeHiringNeed from "./components/DescribeHiringNeed";
import ReviewJobDetail from "./components/ReviewJobDetail";
//freelancer 
import NextBigOpertunity from "./components/Freelancer/Setup/NextBigOpertunity";
import InitalSetup from "./components/Freelancer/Setup/InitalSetup";
//freelancer profile
import CreateProfileStep1 from "./components/Freelancer/ProfileCreate/Step1";
import CreateProfileStep2 from "./components/Freelancer/ProfileCreate/Step2";
import CreateProfileStep3 from "./components/Freelancer/ProfileCreate/Step3";
import CreateProfileStep4 from "./components/Freelancer/ProfileCreate/Step4";
import CreateProfileStep5 from "./components/Freelancer/ProfileCreate/Step5";
import CreateProfileStep6 from "./components/Freelancer/ProfileCreate/Step6";
import CreateProfileStep7 from "./components/Freelancer/ProfileCreate/Step7";
import CreateProfileStep8 from "./components/Freelancer/ProfileCreate/Step8";
import CreateProfileStep9 from "./components/Freelancer/ProfileCreate/Step9";
import CreateProfileStep10 from "./components/Freelancer/ProfileCreate/Step10";
import ViewFreelancerProfile from "./components/Freelancer/ViewProfile";
import ViewFreelancerResume from "./components/Freelancer/ResumePreview";
import StartConversation from "./components/StartConversation";
import OnBoarding from "./components/OnBoarding";

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
		<BrowserRouter >
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/sign-in' element={<Login/>} />
				<Route path='/verify-email' element={<VerifyEmail/>} />
				<Route path='/forgot-password' element={<ForgotPassword/>} />
				<Route path='/forgot-password-email-sent' element={<ForgotPasswordEmailSent/>} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />
				<Route path='/sign-up' element={<SignUp/>} />
				<Route path='/sign-up-as' element={<SignUpAs/>} />
				<Route path='/our-freelancer' element={<OurFreelancer/>} />
				<Route path='/freelancer-profile' element={<FreelancerProfile/>} />
				<Route path='/chat' element={<Chat/>} />
				<Route path='/how-we-can-help-get-started' element={<HelpGetStarted/>} />
				<Route path='/tell-us-about-desired-accountant' element={<DesiredAccountant/>} />
				<Route path='/check-your-budget' element={<CheckBudget/>} />
				<Route path='/scope-of-work' element={<ScopeOfWork/>} />
				<Route path='/job-strong-title' element={<JobStrongTitle/>} />
				<Route path='/describe-hiring-need' element={<DescribeHiringNeed/>} />
				<Route path='/review-job-detail' element={<ReviewJobDetail/>} />
				{/*Freelancr Routes*/}
				<Route path='/freelancer/next-big-opertunity' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <NextBigOpertunity />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/inital-setup' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <InitalSetup />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-one' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep1 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-two' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep2 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-three' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep3 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-four' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep4 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-five' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep5 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-six' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep6 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-seven' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep7 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-eight' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep8 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-nine' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep9 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/setup-profile-step-ten' 
						element={
                        <ProtectedRoute allowedRoles={['freelancer']}>
                            <CreateProfileStep10 />
                        </ProtectedRoute>
                    }
				/>
				<Route path='/freelancer/view-profile/:user_id' element={<ViewFreelancerProfile/>} />
				<Route path='/freelancer/view-resume' element={<ViewFreelancerResume/>} />
				<Route path='/start-conversation' element={<StartConversation/>} />
				<Route path='/on-boarding' element={<OnBoarding/>} />
			</Routes>
		</BrowserRouter >
    </div>
  );
}

export default App;
