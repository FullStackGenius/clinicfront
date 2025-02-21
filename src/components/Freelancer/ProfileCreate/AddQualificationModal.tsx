import React, { useState, useEffect } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";

interface Qualification {
	id: number;
	school: string;
	degree: string;
	field_of_study: string;
	start_date_attended: string;
	end_date_attended: string;
	description: string;
}

interface QualificationModalProps {
	selected: Qualification;
	isOpen: boolean;
	onClose: () => void;
}

interface QualificationFormState {
	school: string;
	degree: string;
	field_of_study: string;
	start_date_attended: string;
	end_date_attended: string;
	description: string;
}

export const AddQualificationModal: React.FC<QualificationModalProps> = ({ selected, isOpen, onClose }) => {
	const months = helpers.monthArray();
	const years = helpers.yearArray(0, 60);
	const [formData, setFormData] = useState<QualificationFormState>({
		school: '',
		degree: '',
		field_of_study: '',
		start_date_attended: '',
		end_date_attended: '',
		description: ''
	});
	const [errors, setErrors] = useState<Partial<QualificationFormState>>({});
	const [updated, setUpdated] = useState(false);
	const [issubmiting, setIsSubmiting] = useState(false);
	
	//console.log('selected', selected)
	
	useEffect(() => {
		updateEditFormState();
	}, [isOpen]);
	
	const updateEditFormState = () => {
		//if (selected && selected.id > 0) {
			setFormData({
				school: selected.school || '',
				degree: selected.degree || '',
				field_of_study: selected.field_of_study || '',
				start_date_attended: selected.start_date_attended || '',
				end_date_attended: selected.end_date_attended || '',
				description: selected.description || ''
			});
		//}
	};
	
	/*Handle Form Element Value Changed*/
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		// Optional: You can add some custom cleaning logic for specific types (e.g., input)
		let cleanValue = value;
		if (type === 'text') {
			//cleanValue = helpers.cleanString(value); // Clean the value if needed (e.g., for text inputs)
		}
		// Clear error for this field if it exists
		setErrors({
			...errors,
			[name]: undefined
		});
		
		setFormData({ ...formData, [name]: cleanValue, });
		setUpdated(true);
	};
	
	/*Validate Form*/
	const validate = (): boolean => {
		const newErrors: Partial<QualificationFormState> = {};
		if (!formData.school) {
			newErrors.school = 'School/College is required';
		}
		if (!formData.degree) {
			newErrors.degree = 'Degree is required';
		}
		if (!formData.field_of_study) {
			newErrors.field_of_study = 'Specilization in field is required';
		}
		if (!formData.start_date_attended) {
			newErrors.start_date_attended = 'Start year is required';
		}
		if (!formData.end_date_attended) {
			newErrors.end_date_attended = 'End year is required';
		}
		if(formData.start_date_attended !== '' && formData.end_date_attended !== ''){
			if(formData.end_date_attended < formData.start_date_attended){
				newErrors.end_date_attended = 'End year cannot be less then start date';
			}
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	/*Submit Form*/
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			setIsSubmiting(true);
			try {
				const updatedData: { [key: string]: any } = {
					...formData
				};

				// Add properties only if `selected` exists and has a valid id
				if (selected.id > 0) {
					updatedData.user_education_id  = selected.id;
					updatedData.type = 'edit';
				}
				const response: any = await axiosInstance({
					url: "save-user-education",
					method: "POST",
					data: updatedData
				});
				//console.log('response', response)
				//after successfull reset form
				if(response.error === 'false'){
					setFormData({
						school: '',
						degree: '',
						field_of_study: '',
						start_date_attended: '',
						end_date_attended: '',
						description: ''
					});
					setUpdated(false);
					onClose();
				}
			} catch (error) {
				console.error("Error in api request:", error);
			} finally {
				setIsSubmiting(false);
			}
		}
	};
	
	const handleClose = (e: React.MouseEvent) => {
		setFormData({
			school: '',
			degree: '',
			field_of_study: '',
			start_date_attended: '',
			end_date_attended: '',
			description: ''
		});
		onClose();
		/*if(updated){
			const result = window.confirm('Closing the modal will loose your changes ?');
			if (result) {
				onClose();
			} else {
				// User clicked "Cancel"
				console.log('Action canceled');
			}
		}else{
			onClose();
		}*/
	};
	
	//console.log('form field errors', errors);
	return (
		<div id="upload-experience-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none'}}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
               <div className="airModal-header">
                  <h2 className="airModal-title h2">{selected.id > 0 ? 'Edit' : 'Add'} Qualification</h2>
                  <button className="airModal-close" type="button" data-ev-label="modal_close">
                     <div className="air-icon" data-test="close-button" onClick={(e) => handleClose(e)}>
                        <img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title=""/>
                     </div>
                  </button>
               </div>
               <div className="airModal-body">
                  <div className="employment-experience-form">
                     <form className="employment-forms">
                        <div className="exp-forms-item">
                           <div className="from-group">
								<label>School/College*</label>
								<input type="text" name="school" id="school" 
									className="form-control"
									placeholder="Enter Your School/College Name"
									value={formData.school}
									onChange={handleChange}
								/>
								<div
								  className="air-form-message form-message-error"
								  style={{ display: errors.school ? 'flex' : 'none' }}
								>
									<div className="air-icons">
									   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
									</div>
									<span>{errors.school}</span>
								</div>
                           </div>
                           <div className="from-group">
								<label>Degree*</label>
								<input type="text" name="degree" id="degree" 
								  className="form-control"
								  placeholder="Enter Degree Name"
								  value={formData.degree}
								  onChange={handleChange}
								/>
								<div
								  className="air-form-message form-message-error"
								  style={{ display: errors.degree ? 'flex' : 'none' }}
								>
									<div className="air-icons">
									   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
									</div>
									<span>{errors.degree}</span>
								</div>
							</div>
							<div className="from-group">  
								<label>Field Of Study*</label>
								<input type="text" name="field_of_study" id="field_of_study" 
								  className="form-control"
								  placeholder="Enter Degree Name"
								  value={formData.field_of_study}
								  onChange={handleChange}
								/>
								<div
								  className="air-form-message form-message-error"
								  style={{ display: errors.field_of_study ? 'flex' : 'none' }}
								>
									<div className="air-icons">
									   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
									</div>
									<span>{errors.field_of_study}</span>
								</div>
							</div>
							
                           <div className="form-grid-container">
                              <div className="from-group">
                                 <label>Start Date*</label>
                                 <div className="">
                                    <div className="month-items">
                                        <select className="form-select" id="start_date_attended" name="start_date_attended"
										  value={formData.start_date_attended}
									      onChange={handleChange}	
									      style={{backgroundImage: `url('/assets/images/date-arrow-icon.svg')`}}
										>
											<option value="">year</option>
											{years.map((x) => {return(<option key={x} value={x}>{x}</option>)})}
                                        </select>
                                    </div>
                                 </div>
                                <div
								  className="air-form-message form-message-error"
								  style={{ display: errors.start_date_attended ? 'flex' : 'none' }}
								>
									<div className="air-icons">
									   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
									</div>
									<span>{errors.start_date_attended}</span>
								</div>
                              </div>
                              <div className="from-group">
                                 <label>End Date*</label>
                                 <div className="">
                                    <div className="month-items">
                                        <select className="form-select" id="end_date_attended" name="end_date_attended" 
										  value={formData.end_date_attended}
									      onChange={handleChange}
									      style={{backgroundImage: `url('/assets/images/date-arrow-icon.svg')`}}
										>
											<option value="">year</option>
											{years.map((x) => {return(<option key={x} value={x}>{x}</option>)})}
                                        </select>
                                    </div>
                                 </div>
								<div
								  className="air-form-message form-message-error"
								  style={{ display: errors.end_date_attended ? 'flex' : 'none' }}
								>
									<div className="air-icons">
									   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
									</div>
									<span>{errors.end_date_attended}</span>
								</div>	 
                              </div>
                           </div>
							<div className="from-group"> 
								<label>Description</label>
								<textarea name="description" className="form-control" id="description" 
							      style={{textTransform: 'none'}} 
								  cols={30} 
								  rows={5}  
								  placeholder="Description"
								  value={formData.description}
								  onChange={handleChange}
								>
								</textarea>
							</div>
                        </div>
                     </form>
                  </div>
               </div>
				<div className="airModal-footer">
					<div className="modal-two-btns d-flex align-items-center justify-space-between">
						<button type="button" className="air-btns btns-text-light" onClick={(e) => handleClose(e)}>Cancel</button>
						<button type="button" className="air-btns btns-primary" onClick={() => handleSubmit()}>
							{!issubmiting ? (
								'Save'
							) : (
								<ButtonLoader />
							)}
						</button>
					</div>
				</div>
            </div>
         </div>
      </div>
	);
};
