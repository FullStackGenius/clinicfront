import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setLoadData } from "../../../redux/commonSlice";
import type { AppDispatch } from '../../../redux/store';
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface TitleModalProps {
	id: number;
	title: string;
	isOpen: boolean;
	onClose: () => void;
}

export const EditTitleModal: React.FC<TitleModalProps> = ({ id, title, isOpen, onClose }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [projecttitle, setProjectTitle] = useState('');
	const [error, setError] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setProjectTitle(title ? title : "");
		}
	}, [isOpen, title]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let clean_val = value;
		setProjectTitle(clean_val);
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

	// Save data
	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
					url: 'project/edit-project-details',
					method: "POST",
					data: { project_id: id, edit_type: 'title', title: projecttitle }
				});
				if (response.error === 'false') {
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
						<h2 className="airModal-title h2">Edit Title</h2>
						<button className="airModal-close" type="button" onClick={handleClose}>
							<div className="air-icon">
								<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
							</div>
						</button>
					</div>
					<div className="airModal-body">
						<div className="modal-resume-content">
							<div className="project-title-edit-options">
								<div className="job-forms-items">
									<div className="form-group">
										<label>Write a title for your job post</label>
										<input className="form-control" type="text"
											placeholder="Seeking Super Great Accountant for Supplemental Book Work"
											value={projecttitle ?? ""}
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
										<li>Financial Audit for M&amp;A</li>
										<li>Accounting Data Organization</li>
									</ul>
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
