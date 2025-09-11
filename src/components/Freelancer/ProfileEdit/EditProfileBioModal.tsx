import React, { useState, useEffect } from "react";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface BioModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const EditProfileBioModal: React.FC<BioModalProps> = ({ isOpen, onClose }) => {
	const [description, setDescription] = useState<string>('');
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
				data: { name: 'step8' }
			});
			var about_yourself = response.data.details.user_details.about_yourself;

			if (about_yourself) {

				setDescription(about_yourself);
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setDescription(value);
		setError('');
	};

	const validate = (): boolean => {
		if (description === '') {
			setError('Please enter few words about yourself!.');
			return false;
		}
		return true;
	};

	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
					url: 'save-about-yourself',
					method: "POST",
					data: { about_yourself: description }
				});
				console.log('response', response)

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
						<h2 className="airModal-title h2">Update Profile Bio</h2>
						<button className="airModal-close" type="button" onClick={handleClose}>
							<div className="air-icon">
								<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
							</div>
						</button>
					</div>
					<div className="airModal-body">
						<div className="overview-box-items">
							<div className="overview-box">
								<label>Description</label>
								<textarea className="air3-textarea"
									name="description"
									id="description"
									rows={6}
									placeholder="Bio"
									value={description}
									onChange={handleChange}
								>
								</textarea>
								<div
									className="air-form-message form-message-error"
									style={{ display: error ? 'flex' : 'none' }}
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
