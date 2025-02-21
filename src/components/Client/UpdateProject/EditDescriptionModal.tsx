import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setLoadData } from "../../../redux/commonSlice";
import type { AppDispatch } from '../../../redux/store';
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface DescriptionModalProps {
	id: number;
	description: string;
	isOpen: boolean;
	onClose: () => void;
}

export const EditDescriptionModal: React.FC<DescriptionModalProps> = ({ id, description, isOpen, onClose }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [projectrequirment, setProjectRequirment] = useState('');
	const [error, setError] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(isOpen){
			setProjectRequirment(String(description));
		}
	}, [isOpen]);
	
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {	
		const { name, value } = e.target;
		let clean_val = value;
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

	// Save data
	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
							url: 'project/edit-project-details', 
							method: "POST",
							data: {project_id: id, edit_type: 'description', description : projectrequirment}
						});
				if(response.error === 'false'){
					dispatch(setLoadData(true));
					onClose();
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	};
	
	const handleClose = (e: React.MouseEvent) => {
		onClose();
	};
	
	return (
		<div id="pr-title-edit-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
               <div className="airModal-header">
					<h2 className="airModal-title h2">Edit Description</h2>
					<button className="airModal-close" type="button" onClick={handleClose}>
						<div className="air-icon">
							<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
						</div>
					</button>
               </div>
               <div className="airModal-body">
                  <div className="pr-edit-des-content">
                     <div className="modal-resume-content">
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
                  </div>
               </div>
				<div className="airModal-footer">
					<div className="modal-two-btns d-flex align-items-center justify-space-between">
						<button type="button" className="air-btns btns-text-light" onClick={handleClose}>Cancel</button>
						<button type="button" className="air-btns btns-primary" onClick={saveData}>
							{submitting ? <ButtonLoader /> : 'Save'}
						</button>
					</div>
				</div>
            </div>
         </div>
      </div>
	);
};
