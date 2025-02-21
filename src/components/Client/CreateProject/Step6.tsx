import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";

interface ProjectScope {
	project_scope: number | string;
	project_duration: number | string;
	project_experience: number | string;
}

interface ScopeData {
	id: number;
	name: string;
	description: string;
}

function Step6() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	const [formData, setFormData] = useState<ProjectScope>({ project_scope: 0, project_duration: 0, project_experience: 0 });
	const [errors, setErrors] = useState<Partial<ProjectScope>>({});
	const [scope, setScope] = useState<ScopeData[]>([]);
	const [experiance, setExperiance] = useState<ScopeData[]>([]);
	const [duration, setDuration] = useState<ScopeData[]>([]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(project){
			setFormData({...formData, project_scope: project.project_scope_id, project_duration: project.project_duration_id, project_experience: project.project_experience_id});
		}
	}, [project]);
	
	useEffect(() => {
		fetchProjectInfo();
	}, []);
	
	const fetchProjectInfo = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-scope-project-content',
					method: "GET"
				});
			setScope(response.data.projectScope);
			setExperiance(response.data.projectExperience);
			setDuration(response.data.projectDuration);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {	
		const { name, value } = e.target;
		const clean_val = value.replace(/\D/g, "");
		setFormData({ 
			...formData, 
			[name]: clean_val
		});
		setErrors({
		  ...errors,
		  [name]: undefined
		});
	};
	// Validate the form
	const validate = (): boolean => {
		const newErrors: Partial<ProjectScope> = {};
		if (!formData.project_scope) {
			newErrors.project_scope = 'Select size of your project';
		}
		if (!formData.project_duration) {
			newErrors.project_duration = 'Select duration of your project';
		}
		
		if (!formData.project_experience) {
			newErrors.project_experience = 'Select experiance for your project';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Save data (simulated API call)
	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const form_data = {...formData, project_id: project?.id};
				const response: any = await axiosInstance({
							url: 'project/save-project-work-scope', 
							method: "POST",
							data: form_data
						});
				if(response.error === 'false'){
					dispatch(setProject(response.data.project));
					navigate(`/client/create-project-step-seven`);
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	};

	return (
		<Layout backButton={false} pagetitle="Estimate the scope of work" subtitle="Don’t stress! You can change this at any time." currentStep={6} issubmitting={submitting} getStarted={saveData}>
			<div className="scope-work-form-items">
				{loading ? (
					<ContentLoader />
				) : (
				<div className="scope-work-radio-items">
				 <div className="sc-work-radio-boxs">
					<div className="work-titleBlock">
					   <h3>What is the estimate size of the project?</h3>
					</div>
					<div className="work-bg-colr">
						{scope.length > 0 ? (
							<>
							{scope.map((item,index) => (
								<div key={index} className="radio-check-box">
								  <div className="label-texts">
										<label className="r-text"><strong>{item.name}</strong>
										<input type="radio" 
											id="project_scope" 
											name="project_scope" 
											value={item.id} 
											onChange={(e) => handleChange(e)} 
											checked={formData.project_scope == item.id}
										/>
									 <span className="radiomark"></span>
									 </label>
								  </div>
								  <div className="rd-texts">
									 <p>{item.description}</p>
								  </div>
								</div>
							))}
							</>
						) : (
							<p>No Content Found</p>
						)}
					</div>
					<div className="air-form-message form-message-error"
					   style={{ display: errors.project_scope ? 'flex' : 'none' }}
					>
						<div className="air-icons">
							<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
						</div>
						<span>{errors.project_scope}</span>
					</div>
				 </div>
				 <div className="sc-work-radio-boxs">
					<div className="work-titleBlock">
					   <h3>What is the estimated duration of your project?</h3>
					</div>
					<div className="work-bg-colr">
					   {duration.length > 0 ? (
							<>
							{duration.map((item,index) => (
								<div key={index} className="radio-check-box">
									<div className="label-texts">
										<label className="r-text"><strong>{item.name}</strong>
											<input type="radio" 
												id="project_duration" 
												name="project_duration" 
												value={item.id} 
												onChange={(e) => handleChange(e)} 
												checked={formData.project_duration == item.id}
											/>
											<span className="radiomark"></span>
										</label>
									</div>
								</div>
							))}
							</>
						) : (
							<p>No Content Found</p>
						)}
					</div>
					<div className="air-form-message form-message-error"
					   style={{ display: errors.project_duration ? 'flex' : 'none' }}
					>
						<div className="air-icons">
							<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
						</div>
						<span>{errors.project_duration}</span>
					</div>
				 </div>
				 <div className="sc-work-radio-boxs">
					<div className="work-titleBlock">
					   <h3>What level experience you need?</h3>
					   <p>Certification levels and past work experience will also be included on each professionals page, so you can select curated talent within each category of skill level while you hire.</p>
					</div>
					<div className="work-bg-colr">
						{experiance.length > 0 ? (
							<>
							{experiance.map((item,index) => (
								<div key={index} className="radio-check-box">
									<div className="label-texts">
										<label className="r-text"><strong>{item.name}</strong>
											<input type="radio" 
												id="project_experience" 
												name="project_experience" 
												value={item.id} 
												onChange={(e) => handleChange(e)} 
												checked={formData.project_experience == item.id}
											/>
											<span className="radiomark"></span>
										</label>
									</div>
								  <div className="rd-texts">
									 <p>{item.description}</p>
								  </div>
								</div>
							))}
							</>
						) : (
							<p>No Content Found</p>
						)}
					</div>
					<div className="air-form-message form-message-error"
					   style={{ display: errors.project_experience ? 'flex' : 'none' }}
					>
						<div className="air-icons">
							<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
						</div>
						<span>{errors.project_experience}</span>
					</div>
				 </div>
				  </div>
				)}
		   </div>
		</Layout>
	);
}

export default Step6;
