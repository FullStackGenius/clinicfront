import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import ButtonLoader from '../../Common/ButtonLoader'; 
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";

function Step4() {
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState(false);
	
	//fetch the presaved data
	useEffect(() => {
		const fetchStepQuestions = async () => {
			try {
				setLoading(true);
				const response: any = await axiosInstance({
						url: 'get-user-step-data',
						method: "POST",
						data: {name: 'step4'}
					});
				//console.log('get-user-step-data step 4', response)
				var profile_title = response.data.details.user_details.profile_headline;
				if(profile_title){
					setTitle(profile_title);
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStepQuestions();
	}, []);
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log('handle input change called')
		const { name, value } = e.target;
		//clean the value
		//let clean_val = helpers.cleanString(value);
		//setTitle(clean_val);
		setTitle(value);
		setError('');
	};
	
	const validate = (): boolean => {
		if (title === '') {
			setError('Enter your title please!.');
			return false;
		}
		return true;
	};
	
	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
							url: 'save-profile-headline',
							method: "POST",
							data: {headline: title}
						});
				//console.log('response', response)
				
				if(response.error === 'false'){
					navigate("/freelancer/setup-profile-step-five");
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	}
	
  return (
    <Layout backButton={true} pagetitle="" currentStep={4} issubmitting={submitting} getStarted={saveData}>
	    <div className="air-wiz-body">
		  <div className="air-carousel-items">
			 <div id="step-item-4" className="air-step-items">
				<div className="step-title-container">
				   <h2>Got it . Now, add a tittle to tell the world what you do </h2>
				   <h5 className="step-subtitle">The let us know how much help to give you along the way.we wont share your answer with anyone else including potential clients.</h5>
				</div>
				<div className="profesional-role-items">
					<div className="profesional-input">
						<label>Your Professional role</label>
						<div className="input-group">
							<input aria-required="true" type="text" className="air-input" name="title"
							   placeholder="Enter Your Title" 
							   value={title}
							   onChange={handleInputChange} 
							/>
						 </div>
					</div>
				</div>
				{error !== '' ? (
					<div className="air-form-message form-message-error">
						<div className="air-icons">
						   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
						</div>
						<span>{error}</span>
					</div>
				) : (
					null
				)}
			 </div>
		  </div>
		</div>         
	</Layout>
  );
}

export default Step4;
