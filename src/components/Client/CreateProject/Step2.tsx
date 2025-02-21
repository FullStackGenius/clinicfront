import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
//import type { AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";


function Step2() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	const [projecttitle, setProjectTitle] = useState('');
	const [error, setError] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(project && project.title){
			setProjectTitle(String(project.title));
		}
	}, [project]);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {	
		const { name, value } = e.target;
		let clean_val = value;
		// Update form data with calculated service_rate and income
		setProjectTitle(clean_val);
		// Clear error for this field if it exists
		setError('');
	};
	// Validate the form
	const validate = (): boolean => {
		if (projecttitle === '') {
			setError('Project title is required');
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
							url: 'project/save-project-title', 
							method: "POST",
							data: {title : projecttitle, project_id: project?.id}
						});
				//console.log('response', response);
				if(response.error === 'false'){
					dispatch(setProject(response.data.poject));
					navigate(`/client/create-project-step-three`); // Navigate to next step
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
		<Layout backButton={false} pagetitle="Give your job a strong title" subtitle="Don’t stress! You can change this at any time." currentStep={2} issubmitting={submitting} getStarted={saveData}>
			<div className="job-postForms">
			  <div className="job-forms-items">
				 <div className="form-group">
					<label>Write a title for your job post</label>
					<input className="form-control" type="text" placeholder="Seeking Super Great Accountant for Supplemental Book Work" 	value={projecttitle}
						onChange={handleChange}
					/>
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
			  <div className="form-listing-text">
				 <h5>Examples</h5>
				 <ul>
					<li>General Book Keeping</li>
					<li>Financial Audit for M&A</li>
					<li>Accounting Data Organization</li>
				 </ul>
			  </div>
			</div>
	</Layout>
	);
}

export default Step2;
