import React, { useState, useEffect } from "react";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface TitleModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const EditProfileTitleModal: React.FC<TitleModalProps> = ({ isOpen, onClose }) => {
	const [title, setTitle] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string>('');
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
				data: { name: 'step4' }
			});
			var profile_title = response.data.details.user_details.profile_headline;
			if (profile_title) {
				setTitle(profile_title);
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTitle(value);
		setError('');
	};

	const validate = (): boolean => {
		if (title === '') {
			setError('Enter your title please!.');
			return false;
		}
		return true;
	};

	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
					url: 'save-profile-headline',
					method: "POST",
					data: { headline: title }
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
						<h2 className="airModal-title h2">Update Profile Title</h2>
						<button className="airModal-close" type="button" onClick={handleClose}>
							<div className="air-icon">
								<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
							</div>
						</button>
					</div>
					<div className="airModal-body">
						<div id="step-item-4" className="air-step-items">
							<div className="profesional-role-items">
								<div className="profesional-input">
									<label>Your Professional role</label>
									<div className="input-group">
										<input aria-required="true" type="text" className="air-input" name="title"
											placeholder="Enter Your Title"
											value={title}
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>
							{error !== '' ? (
								<div className="air-form-message form-message-error">
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{error}</span>
								</div>
							) : (
								null
							)}

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
