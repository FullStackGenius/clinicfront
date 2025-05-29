import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";
import Loader from '../../Common/Loader';

interface Budget {
	budget_type: number;
	hourly_from: number | string;
	hourly_to: number | string;
	fixed_rate: number | string;
}


function Step5() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	//console.log('saved project', project)
	const [formData, setFormData] = useState<Budget>({ budget_type: 1, hourly_from: '', hourly_to: '', fixed_rate: '' });
	//const [budgettype, setBudgetType] = useState(1);
	const [error, setError] = useState('');
	const [fromerror, setFromError] = useState('');
	const [toerror, setToError] = useState('');
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(project){
			fetchProjectDetails(Number(project.id));
			// let pre_budget_type = project.budget_type ? project.budget_type : 1;
			// setFormData({...formData, budget_type: pre_budget_type, hourly_from: project.hourly_from, hourly_to: project.hourly_to, fixed_rate: project.fixed_rate});
		}
	}, [project]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {	
		const { name, value } = e.target;
		const clean_val = value.replace(/\D/g, "");
		setFormData({ 
			...formData, 
			[name]: clean_val 
		});
	};
	// Validate the form
	const validate = (): boolean => {
		var error = true;
		if(formData.budget_type === 0){
			setError('Please select project budget type');
			error = false;
		}
		if(Number(formData.budget_type) === 1){
			if(formData.hourly_from !== '' || formData.hourly_to !== ''){
				if(formData.hourly_from === ''){
					setFromError('Please enter hourly starting price range');
					error = false;
				}
				if(formData.hourly_to === ''){
					setToError('Please enter hourly end price range');
					error = false;
				}
				if(formData.hourly_to !== '' && Number(formData.hourly_to) > 0){
					if(formData.hourly_from !== '' && Number(formData.hourly_to) < Number(formData.hourly_from)){
						setToError('Hourly end rate cannot be less then start rate');
						error = false;
					}
				}
			}	
		}
		return error;
	};

	// Save data (simulated API call)
	const saveData = async (): Promise<void> => {
		//console.log('saved project', project)
		if (validate()) {
			try {
				setSubmitting(true);
				const form_data = {...formData, project_id: project?.id};
				const response: any = await axiosInstance({
							url: 'project/save-project-budget', 
							method: "POST",
							data: form_data
						});
				if(response.error === 'false'){
					dispatch(setProject(response.data.project));
					navigate(`/client/create-project-step-six`);
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	};


	const fetchProjectDetails = async (id: number) => {
		try {
		  // Fetch data from API
		  setLoading(true);
		  const response = await axiosInstance.post("project/get-project-detail", { project_id: id });
	  
		  // Ensure response exists before proceeding
		  if (!response || !response.data || !response.data.project) {
			throw new Error("Invalid response structure");
		  }
	  
		  const saved_data = response.data.project;
		 
		 
	  
		  // Set form data using functional update pattern to avoid stale state issues
		  setFormData((prev) => ({
			...prev,
			budget_type: saved_data.budget_type ?? 1, // Default to 1 if undefined/null
			hourly_from: saved_data.hourly_from,
			hourly_to: saved_data.hourly_to,
			fixed_rate: saved_data.fixed_rate,
		  }));
		} catch (error) {
		  console.error("Error fetching project details:", error);
		}finally {
			setTimeout(() => {
				
				setLoading(false);
			}, 500);
		}
	  };

	  

	return (
		<>
		<Loader isLoading={loading} />
		<Layout backButton={false} pagetitle="Tell us about your budget" currentStep={5} issubmitting={submitting} getStarted={saveData}>
			<div className="budget-forms-items">
                  <div className="budget-radio-items">
                     <div className="radio-btns-conatiner">
                        <div className="air3-radioBtn-box">
							<input 
							  className="form-check-input" 
							  type="radio" 
							  name="budget_type" 
							  value={1} 
							  id="radio-groups-1" 
							  onChange={(e) => handleChange(e)} 
							  checked={Number(formData.budget_type) === 1} 
							/>
							<div className="form-radio-bg">
                              <div className="air3-radio-label-check-icon">
                                 <div className="air3-checkbox-input">
                                    <span className="air3-radio-icon">
										<img className="img-fluid" src="/assets/images/active-check-icon.svg" alt="" title="" />
									</span>
                                 </div>
                              </div>
                              <div className="air3-icon-lg">
                                 <img className="img-fluid" src="/assets/images/hour-rate-icons.svg" alt="" title="" />
                              </div>
                              <div className="air3-btn-box-label">
                                 <h4>Hourly Rate</h4>
                              </div>
							</div>
                        </div>
                        <div className="air3-radioBtn-box">
							<input 
							  className="form-check-input" 
							  type="radio" 
							  name="budget_type" 
							  value={2} 
							  id="radio-groups-2" 
							  onChange={(e) => handleChange(e)} 
							  checked={Number(formData.budget_type) === 2} 
							/>
                           <div className="form-radio-bg">
                              <div className="air3-radio-label-check-icon">
                                 <div className="air3-checkbox-input">
                                    <span className="air3-radio-icon"><img className="img-fluid" src="/assets/images/active-check-icon.svg" alt="" title="" /></span>
                                 </div>
                              </div>
                              <div className="air3-icon-lg">
                                 <img className="img-fluid" src="/assets/images/fixed-rate-icon.svg" alt="" title="" />
                              </div>
                              <div className="air3-btn-box-label">
                                 <h4>Fixed Price</h4>
                              </div>
                           </div>
                        </div>
                     </div>
					<div className="air-form-message form-message-error"
					   style={{ display: error !== '' ? 'flex' : 'none' }}
					>
						<div className="air-icons">
							<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
						</div>
						<span>{error}</span>
					</div>
                  </div>
                  <div className="budget-currency-text-sec">
					{Number(formData.budget_type) === 1 ? (
						<div className="budget-currency-items">
							<div className="form-group">
								<label>From</label>
								<div className="currency-inputs">
									<input type="text" 
										name="hourly_from" 
										id="hourly_from" 
										placeholder="$0.00" 
										className="air3-input"
										// value={(formData.hourly_from)?formData.hourly_from:""}
										value={formData.hourly_from ? `$${formData.hourly_from}` : ""}
										onChange={(e) => handleChange(e)}
									/>
									<span id="currency-hourly" className="sr-only">total</span>
								</div>
								<div className="air-form-message form-message-error"
								   style={{ display: fromerror !== '' ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{fromerror}</span>
								</div>
							</div>
							<div className="form-group">
								<label>To</label>
								<div className="currency-inputs">
									<input type="text" 
										name="hourly_to" 
										id="hourly_to" 
										placeholder="$0.00" 
										className="air3-input"
										// value={(formData.hourly_to)?formData.hourly_to:""}
										value={formData.hourly_to ? `$${formData.hourly_to}` : ""}
										onChange={(e) => handleChange(e)}
									/>
								  <span id="currency-hourly" className="sr-only">total</span>
							   </div>
								<div className="air-form-message form-message-error"
								   style={{ display: toerror !== '' ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{toerror}</span>
								</div>
							</div>
						</div>
					) : (
						<div className="budget-currency-items">
							<div className="form-group">
								<label>Fixed Price</label>
								<div className="currency-inputs">
									<input type="text" 
										name="fixed_rate" 
										id="fixed_rate" 
										placeholder="$0.00" 
										className="air3-input"
										//value={(formData.fixed_rate)?formData.fixed_rate:""}
										value={formData.fixed_rate ? `$${formData.fixed_rate}` : ""}
										onChange={(e) => handleChange(e)}
									/>
									<span id="currency-hourly" className="sr-only">total</span>
								</div>
							</div>
						</div>
					)}
                     <div className="budget-content-info">
                        <div className="bd-content-container">
                           <p>Please select your desired rate range.</p>
                           <p>Professionals range from <strong>$75 - $350</strong> hour USD for accounting projects depending on their expertise, certifications, and experience.</p>
                           {Number(formData.budget_type) === 1 && <div className="hour-rate-text">Not ready to set hourly rate? You can leave it blank and discuss with your talent.</div> }
                        </div>
                     </div>
                  </div>
               </div>
		</Layout>
		</>
	);
}

export default Step5;
