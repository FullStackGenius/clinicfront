import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setLoadData } from "../../../redux/commonSlice";
import type { AppDispatch } from '../../../redux/store';
import helpers from "../../../_helpers/common";
import ContentLoader from '../../Common/ContentLoader';
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface DurationModalProps {
	id: number;
	prescode: number;
	isOpen: boolean;
	onClose: () => void;
}

interface ScopeData {
	id: number;
	name: string;
	description: string;
}

export const EditProjectDurationModal: React.FC<DurationModalProps> = ({ id, prescode, isOpen, onClose }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [duration, setDuration] = useState<ScopeData[]>([]);
	const [selectedduration, setSelectedDuration] = useState(0);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(isOpen){
			fetchProjectInfo();
			setSelectedDuration(prescode);
		}
	}, [isOpen]);
	
	const fetchProjectInfo = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-scope-project-content',
					method: "GET"
				});
			setDuration(response.data.projectDuration);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {	
		const { name, value } = e.target;
		setSelectedDuration(Number(value));
		setError('');
	};
	
	// Validate the form
	const validate = (): boolean => {
		if (selectedduration === 0) {
			setError('Project duration is required');
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
							data: {project_id: id, edit_type: 'projectDuration', project_duration : selectedduration}
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
					{loading ? (
						<ContentLoader />
					) : (
						<>
						<div className="airModal-header">
							<h2 className="airModal-title h2">Edit Project Duration</h2>
							<button className="airModal-close" type="button" onClick={handleClose}>
								<div className="air-icon">
									<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
								</div>
							</button>
						</div>
						<div className="airModal-body">
						  <div className="project-size-content-sec">
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
														checked={selectedduration === item.id}
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
						<div className="airModal-footer">
							<div className="modal-two-btns d-flex align-items-center justify-space-between">
								<button type="button" className="air-btns btns-text-light" onClick={handleClose}>Cancel</button>
								<button type="button" className="air-btns btns-primary" onClick={saveData}>
									{submitting ? <ButtonLoader /> : 'Save'}
								</button>
							</div>
						</div>
						</>
					)}	
				</div>
			
         </div>
      </div>
	);
};
