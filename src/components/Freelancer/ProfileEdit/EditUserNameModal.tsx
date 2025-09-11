import React, { useState, useEffect } from "react";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface TitleModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface Profile {
	first_name: string;
	last_name: string;
}

export const EditUserNameModal: React.FC<TitleModalProps> = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState<Profile>({ first_name: '', last_name: '' });
	const [errors, setErrors] = useState<Partial<Profile>>({});
	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isOpen) {
			fetchStepQuestions();
		}
	}, [isOpen]);

	const fetchStepQuestions = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-user-step-data',
				method: "POST",
				data: { name: 'step10' }
			});
			let profile_name = response.data.details.name;
			if (profile_name) {
				setFormData({
					...formData,
					first_name: profile_name,
					last_name: response.data.details.last_name,
				});
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		let clean_val = value;

		setFormData({
			...formData,
			[name]: clean_val // Update the current field
		});

		setErrors({
			...errors,
			[name]: undefined
		});
	};

	const validate = (): boolean => {
		const newErrors: Partial<Profile> = {};
		if (!formData.first_name) {
			newErrors.first_name = 'First name is required';
		}
		if (!formData.last_name) {
			newErrors.last_name = 'Last name is required';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			setSubmitting(true);
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
					url: 'update-user-info',
					method: "POST",
					data: { name: formData.first_name, last_name: formData.last_name }
				});
				if (response.error === 'false') {
					onClose();
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	}

	const handleClose = (e: React.MouseEvent) => {
		onClose();
	};
	return (
		<div id="edit-skill-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
			<div className="air-modal-items air-modal-import-resume-modal">
				<div className="airModal-content">
					<div className="airModal-header">
						<h2 className="airModal-title h2">Update User Name</h2>
						<button className="airModal-close" type="button" onClick={handleClose}>
							<div className="air-icon">
								<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
							</div>
						</button>
					</div>
					<div className="airModal-body">
						<div className="profile-forms-items">
							<div className="form-grid-container">
								<div className="up-grid-address-row">
									<div className="span-colm-6">
										<div className="form-group">
											<label className="label">First Name *</label>
											<input type="text"
												name="first_name"
												id="first_name"
												className="air-input"
												placeholder="Enter First Name"
												value={formData.first_name}
												onChange={handleChange}
											/>
										</div>
										<div className="air-form-message form-message-error"
											style={{ display: errors.first_name ? 'flex' : 'none' }}
										>
											<div className="air-icons">
												<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
											</div>
											<span>{errors.first_name}</span>
										</div>
									</div>
									<div className="span-colm-6">
										<div className="form-group">
											<label className="label">Last Name *</label>
											<input type="text"
												name="last_name"
												id="last_name"
												className="air3-input"
												placeholder="Enter Last Name"
												value={formData.last_name}
												onChange={handleChange}
											/>
										</div>
										<div className="air-form-message form-message-error"
											style={{ display: errors.last_name ? 'flex' : 'none' }}
										>
											<div className="air-icons">
												<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
											</div>
											<span>{errors.last_name}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="airModal-footer">
						<div className="modal-two-btns d-flex align-items-center justify-space-between">
							<button type="button" className="air-btns btns-text-light" onClick={handleClose}>Cancel</button>
							<button type="button" className="air-btns btns-primary" onClick={handleSubmit}>
								{submitting ? <ButtonLoader /> : 'Save'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
