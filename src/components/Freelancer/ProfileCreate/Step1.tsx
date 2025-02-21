import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Layout from './Layout';
import { UploadResumeModal } from './UploadResumeModal'; 
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";

interface Resume {
  id: number;
  resume_path: string;
  resume_url: string;
}

function Step1() {
	const navigate = useNavigate();
	const [resumemodal, setResumeModal] = useState<boolean>(false);
	const [resume, setResume] = useState<Resume>({id: 0, resume_path: '', resume_url: ''});
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		fetchStepQuestions();
	}, []);
	
	const fetchStepQuestions = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-user-step-data',
					method: "POST",
					data: {name: 'step1'}
				});
			//console.log('get-user-step-data', response)
			var details = response.data.details;
			//console.log('details.resume', details.resume)
			if(details.resume){
				setResume(details.resume);
			}
			
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	const handleResumeClick = () => {
		setResumeModal(true);
	}
	
	
	const saveData = () => {
		navigate("/freelancer/setup-profile-step-two");
	}
	
	return (
		<Layout backButton={false} pagetitle="Create your profile" currentStep={1} issubmitting={false} getStarted={saveData}>
		   <div className="air-wiz-body">
			  <div className="air-carousel-items">
				 <div id="step-item-1" className="air-step-items">
					<div className="step-title-container">
					   <h2>How would you like to tell us about yourself?</h2>
					</div>
					<div className="airGrid-container">
					   <div className="btn-left-colm">
						  <div className="resume-import-content">
							 <div className="d-flex flex-column btns-gaps">
							 {/*<button data-ev-label="resume_import_linkedin_btn" className="air-btns-secondary" type="button">
								   <div className="air-icons">
									  <img className="img-fluid" src="/assets/images/linkedin-color-icon.svg" alt="" title="" />
								   </div>
								   Import from LinkedIn
							 </button>*/}
								<button className="air-btns-secondary" type="button" onClick={() => handleResumeClick()}>
								   <div className="air-icons">
									  <img className="img-fluid" src="/assets/images/upload-icon.svg" alt="" title="" />
								   </div>
								   Upload your resume
								</button>
								{/*<button className="air-btns-secondary" type="button">
								<span>Fill out manually (15 min)</span>
								</button>*/}
								<div className="profile-resume-btns">
									{resume.id > 0 && (
										<>
											<Link className="view-resume-btns outline-border-btns" to={resume.resume_path} target={'_blank'}> View Resume</Link>
											<button className="change-resume-btns bg-back-btns" type="button" onClick={() => handleResumeClick()}> Change Resume</button>
										</>
									)}
								</div>
							 </div>
						  </div>
					   </div>
					   <div className="right-colm-bio">
						  <div className="work-bio-info">
							 <div className="bio-profile">
								<img className="img-fluid" src="/assets/images/bio-image.png" alt="" title="" />
							 </div>
							 <blockquote className="h4">“Upwork has  enable me  to increase  my rates i know what i am bringing to the tablee and love the feeling of being able to help a veriety of clients. “</blockquote>
						  </div>
					   </div>
					</div>
				 </div>
			  </div>
		   </div>		
		<UploadResumeModal isOpen={resumemodal} onClose={() => setResumeModal(false)}  />
	</Layout>
	);
}

export default Step1;
