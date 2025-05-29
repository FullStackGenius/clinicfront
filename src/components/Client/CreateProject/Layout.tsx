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
	subtitle?: string;
	currentStep: number;
	issubmitting: boolean;
	getStarted: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, backButton, pagetitle, subtitle, currentStep, issubmitting, getStarted }) => {
	const navigate = useNavigate();
	const pages = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
	
	
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
			navigate("/client/create-project-step-" + page_is); // Replace with your next page route
		}else{
			let profile_link = "/";
			navigate(profile_link)
		}
	};

	const handlePreviousStep = () => {
		if (currentStep > 0) { // Ensure currentStep doesn't go below 0
			let previous_step = currentStep - 2;
			//console.log('previous_step', previous_step)
			let page_is = pages[previous_step];
			if (page_is !== undefined) {
			navigate("/client/create-project-step-" + page_is);
			}
		}
	};
	// Check if handlePreviousStep is defined and page_is is not undefined
	
const previous_step = currentStep - 2;
const page_is = pages[previous_step];
const isPreviousStepAvailable = 
    typeof handlePreviousStep === 'function' && 
    page_is !== undefined;

// Conditional rendering of the button
	return (
    <>
		<Header />
		<section className="help-project-form-sec">
			<div className="smallContainer">
				<div className="project-forms">
					<div className="pr-forms-title-block">
						<h1>{pagetitle}</h1>
						<p>{subtitle}</p>
					</div>
					<div className="acc-with-buttons">
						{children}
						<div className="back-continue-btns d-flex align-items-center view-btns-items justify-space-between">
						{isPreviousStepAvailable && (<button type="button" className="backs-air-btn outline-border-btns" onClick={handlePreviousStep}>Back</button>    )}
							<button type="button" className="continue-air-btn bg-back-btns" onClick={getStarted}>
								{!issubmitting ? 'Continue' : <ButtonLoader />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</>
  );
}

export default Layout;
