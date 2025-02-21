import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";

function Step8() {
	const navigate = useNavigate();
	const [description, setDescription] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		fetchPreData();
	}, []);
	
	const fetchPreData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-user-step-data',
					method: "POST",
					data: {name: 'step8'}
				});
			//console.log('get-user-step-data step 8', response)
			var about_yourself = response.data.details.user_details.about_yourself;
			
			if(about_yourself){
				
				setDescription(about_yourself);
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		//console.log('handle input change called')
		const { name, value } = e.target;
		//clean the value
		//let clean_val = helpers.cleanString(value);
		//setTitle(clean_val);
		setDescription(value);
		setError('');
	};
	
	const validate = (): boolean => {
		if (description === '') {
			setError('Please enter few words about yourself!.');
			return false;
		}
		return true;
	};
	
	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
							url: 'save-about-yourself',
							method: "POST",
							data: {about_yourself: description}
						});
			//	console.log('response', response)
				
				if(response.error === 'false'){
					navigate("/freelancer/setup-profile-step-nine");
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	}
	
	const handleNextStep = () => {
		navigate("/freelancer/setup-profile-step-nine");
	};

	const handlePreviousStep = () => {
		navigate("/freelancer/setup-profile-step-seven");;
	};
  return (
		<Layout backButton={true} pagetitle="" currentStep={8} issubmitting={submitting} getStarted={saveData}>
	        <div className="bio-content-section">
			  <div className="bio-grid-container">
				 <div className="span-md-8">
					<div className="bio-left-boxs">
					   <div className="air-wiz-body">
						  <div className="air-carousel-items">
							 <div id="step-item-8" className="air-step-items">
								<div className="step-title-container">
								   <h2>Great now write a bio to tell about yourself.</h2>
								   <h5 className="step-subtitle">Tell the world who you are, what types of work you enjoy working on, specific problems you’ve solved that you’re proud of, etc.</h5>
								</div>
								<div className="overview-box-items">
								   <div className="overview-box">
										<label>Description</label>
										<textarea className="air3-textarea" 
										  name="description"
										  id="description"
										  rows={6}
										  placeholder="Bio"
										  value={description}
										  onChange={handleChange}
										>
										</textarea>
										<div
										  className="air-form-message form-message-error"
										  style={{ display: error ? 'flex' : 'none' }}
										>
											<div className="air-icons">
											   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
											</div>
											<span>{error}</span>
										</div>
								   </div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
				 <div className="span-md-4">
					<div className="profile-testimonial">
					   <div className="profile-slider">
						  <div className="pr-slider-items">
							 <div className="pr-slider-boxs">
								<div className="pr-image">
								   <div className="avatarImage">
									  <img className="img-fluid" src="/assets/images/sasheen-m-img.png" />
									  <span className="client-online"></span>
								   </div>
								</div>
								<div className="flex-top-items">
								   <div className="pr-up-title">Sasheen M.</div>
								   <div className="pr-sub-title">Customen Experience Consultant..</div>
								</div>
								<div className="up-badge-rows">
								   <div className="up-badge-conatiner">
									  <div className="info-badges info-badge-rates">
										 <span className="air-icon"><img className="img-fluid" src="/assets/images/orange-star-img.svg" alt="" title="" /></span>
										 <span className="feedback-score">5.05 </span>
									  </div>
									  <div className="info-badges">
										 <span className="rate-per-hour">$320.0/hr</span>
									  </div>
									  <div className="info-badges">
										 <span className="total-jobs">(32 jobs)</span>
									  </div>
								   </div>
								</div>
								<div className="pr-short-content">
								   <p>“Upwork has  enable me  to increase  my rates i know what i am bringing to the tablee and love the feeling of being able to help a veriety of clients. “</p>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
			  </div>
		   </div>                   
		</Layout>
	);
}

export default Step8;
