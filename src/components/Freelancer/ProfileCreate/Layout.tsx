import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { checkUserLoggedIn } from "../../../_helpers/checkUserLoggedIn";
import { getUserInfo } from "../../../_helpers/getUserInfo";
import helpers from "../../../_helpers/common";
import Header from '../../layouts/partials/Header';
import ButtonLoader from '../../Common/ButtonLoader';

interface LayoutProps {
    children: React.ReactNode;
	backButton: boolean;
	pagetitle: string;
	currentStep: number;
	issubmitting: boolean;
	getStarted: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, backButton, pagetitle, currentStep, issubmitting, getStarted }) => {
	const navigate = useNavigate();
	const pages = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
	/*const pages = [
		{ pade_id: 0, page_path: "/freelancer/next-big-opertunity" },
		{ pade_id: 1, page_path: "/freelancer/inital-setup" },
		{ pade_id: 2, page_path: "/freelancer/inital-setup" },
		{ pade_id: 3, page_path: "/freelancer/inital-setup" },
		{ pade_id: 4, page_path: "/freelancer/setup-profile-step-one" },
		{ pade_id: 5, page_path: "/freelancer/setup-profile-step-two" },
		{ pade_id: 6, page_path: "/freelancer/setup-profile-step-three" },
		{ pade_id: 7, page_path: "/freelancer/setup-profile-step-four" },
		{ pade_id: 8, page_path: "/freelancer/setup-profile-step-five" },
		{ pade_id: 9, page_path: "/freelancer/setup-profile-step-six" },
		{ pade_id: 10, page_path: "/freelancer/setup-profile-step-seven" },
		{ pade_id: 11, page_path: "/freelancer/setup-profile-step-eight" },
		{ pade_id: 12, page_path: "/freelancer/setup-profile-step-nine" },
		{ pade_id: 13, page_path: "/freelancer/setup-profile-step-ten" }
	];*/
	
	useEffect(() => {
        const loggedIn = checkUserLoggedIn();
		if(!loggedIn){
			navigate('/sign-in');
		}
    }, [ ]);
	
	//console.log('currentStep', currentStep);
	
	const handleNextStep = () => {
		//let next_step = currentStep + 1;
		let next_step = currentStep;
		if (next_step < pages.length) { // Ensure it doesn't go out of bounds
			let page_is = pages[next_step];
			navigate("/freelancer/setup-profile-step-" + page_is); // Replace with your next page route
		}else{
			let profile_link = "/freelancer/view-profile/"+getUserInfo('id');
			navigate(profile_link)
		}
	};

	const handlePreviousStep = () => {
		if (currentStep > 0) { // Ensure currentStep doesn't go below 0
			let previous_step = currentStep - 2;
			console.log('previous_step', previous_step)
			let page_is = pages[previous_step];
			navigate("/freelancer/setup-profile-step-" + page_is);
		}
	};
	
	return (
    <>
		<Header />
		<section className="profile-step-section">
		<div className="up-profile-content">
			<div className="main-container">
				<div className="airWiz-container">
					<div className="airWiz-inline">
						<div className="air-wiz">
							<div className="air-wiz-content main-container">
							    <div className="progressBar">
								    <div className="air-progress air-progress-bar">
									    <div className="air-progress-bar">
											<div className="air-progress-bar-complete" 
											  style={{width: helpers.calculateStepPercent(10, currentStep)}}
											>
											</div>
									    </div>
								    </div>
							    </div>
							    <div className="air-wiz-step-status-container">
								    <div className="air-wiz-step-status">
										<span className="text-base-sm">{currentStep}/10</span>
										<span className="step-status-title">{pagetitle}</span>
								    </div>
							    </div>
							    <>{children}</>
								<div className="air-wiz-footer">
									<div className="main-container">
										<div className="quik-left-btn">
											{backButton ? (<button className="back-air-btn outline-border-btns" onClick={handlePreviousStep}>Back</button>) : (null)}
										</div>
										<div className="quik-right-btn">
											<button className="skip-air-btn" onClick={handleNextStep}>Skip for Now</button>
											<button className="started-air-btn bg-back-btns" onClick={getStarted}>
												{!issubmitting ? 'Next' : <ButtonLoader />}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		</section>
	</>
  );
}

export default Layout;
