import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";


function Step3() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	const [projectrequirment, setProjectRequirment] = useState('');
	const [error, setError] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(project && project.description){
			setProjectRequirment(String(project.description));
		}
	}, [project]);
	
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {	
		const { name, value } = e.target;
		let clean_val = value;
		// Update form data with calculated service_rate and income
		setProjectRequirment(clean_val);
		// Clear error for this field if it exists
		setError('');
	};
	// Validate the form
	const validate = (): boolean => {
		if (projectrequirment === '') {
			setError('Project description is required');
			return false;
		}
		return true;
	};

	// Save data (simulated API call)
	const saveData = async (): Promise<void> => {
		//console.log('saved project', project)
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
							url: 'project/save-project-desc', 
							method: "POST",
							data: {description : projectrequirment, project_id: project?.id}
						});
				//console.log('response', response);
				if(response.error === 'false'){
					dispatch(setProject(response.data.project));
					navigate(`/client/create-project-step-four`); // Navigate to next step
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	};
	//console.log('projecttitle', projecttitle)
	return (
		<Layout backButton={false} pagetitle="Describe your hiring needs" currentStep={3} issubmitting={submitting} getStarted={saveData}>
			<div className="hiring-jobForms">
				<div className="form-listing-text">
				 <h5>Be clear about</h5>
				 <ul>
					<li><a href="#">Deliverables</a>, what type of finished products will you be expecting?</li>
					<li><a href="#">Timelines</a>, is this something you need done within a certain time frame?</li>
					<li><a href="#">Specialties</a>, do you require the accountant to have experience?</li>
					<li><a href="#">Certifications</a>, are you looking for them to be accredited in certain areas?</li>
				 </ul>
				</div>	
			  <div className="hiring-forms-items">
				 <div className="form-group">
					<label>Describe what you need</label>
                     <textarea name="message" className="form-control" style={{ textTransform: 'none'}} cols={30} rows={5} placeholder="Already have description ? paste it here"
						value={projectrequirment}
						onChange={handleChange}
					></textarea>
					<div className="air-form-message form-message-error"
					   style={{ display: error !== '' ? 'flex' : 'none' }}
					>
						<div className="air-icons">
							<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
						</div>
						<span>{error}</span>
					</div>
				 </div>
			  </div>
			</div>
	</Layout>
	);
}

export default Step3;
