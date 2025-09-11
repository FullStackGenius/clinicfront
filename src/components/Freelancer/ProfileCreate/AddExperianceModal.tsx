import React, { useState, useEffect } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";

interface Experience {
	id: number;
	title: string;
	company: string;
	location: string;
	country_id: string;
	currently_working: string;
	start_month: string;
	start_year: string;
	end_month: string;
	end_year: string;
	description: string;
}

interface ExperianceModalProps {
	selected: Experience;
	isOpen: boolean;
	onClose: () => void;
}

interface Country {
	id: number;
	name: string;
}

interface ExperianceFormState {
	title: string;
	company: string;
	location: string;
	country: string;
	currently_working: boolean;
	start_month: string;
	start_year: string;
	end_month: string;
	end_year: string;
	description: string;
}



export const AddExperianceModal: React.FC<ExperianceModalProps> = ({ selected, isOpen, onClose }) => {
	const months = helpers.monthArray();
	const years = helpers.yearArray(0, 60);
	const [countries, setCountries] = useState<Country[]>([]);
	const [formData, setFormData] = useState<ExperianceFormState>({
		title: '',
		company: '',
		location: '',
		country: '',
		currently_working: false,
		start_month: '',
		start_year: '',
		end_month: '',
		end_year: '',
		description: ''
	});
	const [errors, setErrors] = useState<Partial<ExperianceFormState>>({});
	const [updated, setUpdated] = useState(false);
	const [issubmiting, setIsSubmiting] = useState(false);

	useEffect(() => {
		const fetchCountries = async () => {
			if (isOpen) {
				try {
					const response = await axiosInstance({
						url: "get-country",
						method: "GET",
					});
					setCountries(response.data.countries);
				} catch (error) {
					console.error("Error in API request:", error);
				}
			}
		};
		fetchCountries();
		updateEditFormState();
	}, [isOpen]);

	const updateEditFormState = () => {
		setFormData({
			title: selected.title || '',
			company: selected.company || '',
			location: selected.location || '',
			country: selected.country_id || '0',
			currently_working: Number(selected.currently_working) === 1,
			start_month: selected.start_month || '',
			start_year: selected.start_year || '',
			end_month: selected.end_month || '',
			end_year: selected.end_year || '',
			description: selected.description || ''
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;

		// Define cleanValue based on the input type
		let cleanValue: string | boolean = value;

		// Check if the input type is checkbox, then use 'checked' instead of 'value'
		if (type === 'checkbox') {
			const target = e.target as HTMLInputElement; // Cast to HTMLInputElement
			const isChecked = target.checked;
			// If the checkbox is checked, reset `end_month` and `end_year`
			setFormData((prevFormData) => ({
				...prevFormData,
				currently_working: isChecked,
				end_month: isChecked ? '' : prevFormData.end_month,
				end_year: isChecked ? '' : prevFormData.end_year
			}));

			// Reset errors for `end_month` and `end_year` if checked
			setErrors((prevErrors) => ({
				...prevErrors,
				end_month: isChecked ? undefined : prevErrors.end_month,
				end_year: isChecked ? undefined : prevErrors.end_year
			}));

			return;
		}

		setFormData({
			...formData,
			[name]: cleanValue,
		});

		// Clear error for this field if it exists
		setErrors({
			...errors,
			[name]: undefined,
		});

		setUpdated(true);
	};

	const validate = (): boolean => {
		const newErrors: Partial<ExperianceFormState> = {};
		if (!formData.title) newErrors.title = 'Title is required';
		if (!formData.company) newErrors.company = 'Company is required';
		if (!formData.location) newErrors.location = 'Location is required';
		if (!formData.country) newErrors.country = 'Country is required';
		if (!formData.start_month) newErrors.start_month = 'Start month is required';
		if (!formData.start_year) newErrors.start_year = 'Start year is required';
		if (!formData.currently_working && (!formData.end_month || !formData.end_year)) {
			newErrors.end_month = 'End month is required';
			newErrors.end_year = 'End year is required';
		}

		if (!formData.currently_working && (formData.end_month !== '' && formData.end_year !== '')) {
			let date_valid = validateDates(formData.start_month, formData.start_year, formData.end_month, formData.end_year);
			if (!date_valid) {
				newErrors.end_month = 'End month/year should be greater then start month/year';
				newErrors.end_year = 'End month/year should be greater then start month/year';
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateDates = (startMonth: string, startYear: string, endMonth: string, endYear: string) => {
		// Check if end year is less than start year
		if (endYear < startYear) {
			return false;
		}

		// If years are equal, compare the months
		if (endYear === startYear && endMonth < startMonth) {
			return false;
		}

		return true;
	}

	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			setIsSubmiting(true);
			try {
				const updatedData: { [key: string]: any } = {
					...formData,
					currently_working: formData.currently_working ? '1' : '0', // '1' if true, '0' if false
				};

				// Add properties only if `selected` exists and has a valid id
				if (selected.id > 0) {
					updatedData.user_experience_id = selected.id;
					updatedData.type = 'edit';
				}

				const response: any = await axiosInstance({
					url: "save-user-experience",
					method: "POST",
					data: updatedData,
				});
				if (response.error === 'false') {
					setFormData({
						title: '',
						company: '',
						location: '',
						country: '',
						currently_working: false,
						start_month: '',
						start_year: '',
						end_month: '',
						end_year: '',
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
			title: '',
			company: '',
			location: '',
			country: '',
			currently_working: false,
			start_month: '',
			start_year: '',
			end_month: '',
			end_year: '',
			description: ''
		});
		onClose();
	};

	return (
		<div id="upload-experience-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
			<div className="air-modal-items air-modal-import-resume-modal">
				<div className="airModal-content">
					<div className="airModal-header">
						<h2 className="airModal-title h2">{selected.id > 0 ? 'Edit' : 'Add'} Experience</h2>
						<button className="airModal-close" type="button" data-ev-label="modal_close" onClick={handleClose}>
							<div className="air-icon" data-test="close-button">
								<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
							</div>
						</button>
					</div>
					<div className="airModal-body">
						<div className="employment-experience-form">
							<form className="employment-forms">
								<div className="exp-forms-item">
									{/* Title Input */}
									<div className="from-group">
										<label>Title*</label>
										<input
											type="text"
											name="title"
											className="form-control"
											placeholder="Enter Your Title"
											value={formData.title}
											onChange={handleChange}
										/>
										<div
											className="air-form-message form-message-error"
											style={{ display: errors.title ? 'flex' : 'none' }}
										>
											<div className="air-icons">
												<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
											</div>
											<span>{errors.title}</span>
										</div>
									</div>

									{/* Company Input */}
									<div className="from-group">
										<label>Company*</label>
										<input
											type="text"
											name="company"
											className="form-control"
											placeholder="Enter Company Name"
											value={formData.company}
											onChange={handleChange}
										/>

										<div
											className="air-form-message form-message-error"
											style={{ display: errors.company ? 'flex' : 'none' }}
										>
											<div className="air-icons">
												<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
											</div>
											<span>{errors.company}</span>
										</div>
									</div>

									{/* Location and Country Inputs */}
									<div className="form-grid-container">
										<div className="from-group">
											<label>Location</label>
											<input
												type="text"
												name="location"
												className="form-control"
												placeholder="Enter Your Location"
												value={formData.location}
												onChange={handleChange}
											/>

											<div
												className="air-form-message form-message-error"
												style={{ display: errors.location ? 'flex' : 'none' }}
											>
												<div className="air-icons">
													<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
												</div>
												<span>{errors.location}</span>
											</div>
										</div>

										<div className="from-group">
											<label>Country</label>
											<select
												name="country"
												className="form-control"
												value={formData.country}
												onChange={handleChange}
											>
												<option value="">Select Country</option>
												{countries.map((item) => (
													<option key={item.id} value={item.id}>{item.name}</option>
												))}
											</select>

											<div
												className="air-form-message form-message-error"
												style={{ display: errors.country ? 'flex' : 'none' }}
											>
												<div className="air-icons">
													<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
												</div>
												<span>{errors.country}</span>
											</div>
										</div>
									</div>
									{/* Currently Working Checkbox */}
									<div className="from-group">
										<div className="currently-working-checkbox">
											<label>
												<input
													type="checkbox"
													name="currently_working"
													checked={formData.currently_working}
													onChange={handleChange}
												/>
												<span data-test="checkbox-input" className="air-checkbox-input">
													<span className="air-icon" data-test="checkbox-icon">
														<img className="img-fluid" src="/assets/images/small-check-icon.svg" alt="" title="" />
													</span>
												</span>{`I am Currently working in this Role`}
											</label>
										</div>
									</div>

									{/* Start Date */}
									<div className="form-grid-container">
										<div className="from-group">
											<label>Start Date*</label>
											<div className="two-items-form">
												<select
													name="start_month"
													className="form-select"
													value={formData.start_month}
													onChange={handleChange}
												>
													<option value="">Month</option>
													{Object.entries(months).map(([key, value]) => (
														<option key={key} value={key}>{value}</option>
													))}
												</select>
												<select
													name="start_year"
													className="form-select"
													value={formData.start_year}
													onChange={handleChange}
												>
													<option value="">Year</option>
													{years.map((year) => (
														<option key={year} value={year}>{year}</option>
													))}
												</select>
											</div>

											<div
												className="air-form-message form-message-error"
												style={{ display: (errors.start_month || errors.start_year) ? 'flex' : 'none' }}
											>
												<div className="air-icons">
													<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
												</div>
												<span>{errors.start_month || errors.start_year}</span>
											</div>
										</div>

										{/* End Date */}
										<div className="from-group">
											<label>End Date</label>
											<div className="two-items-form">
												<select
													name="end_month"
													className="form-select"
													value={formData.end_month}
													onChange={handleChange}
													disabled={formData.currently_working}
												>
													<option value="">Month</option>
													{Object.entries(months).map(([key, value]) => (
														<option key={key} value={key}>{value}</option>
													))}
												</select>
												<select
													name="end_year"
													className="form-select"
													value={formData.end_year}
													onChange={handleChange}
													disabled={formData.currently_working}
												>
													<option value="">Year</option>
													{years.map((year) => (
														<option key={year} value={year}>{year}</option>
													))}
												</select>
											</div>

											<div
												className="air-form-message form-message-error"
												style={{ display: (errors.end_month || errors.end_year) ? 'flex' : 'none' }}
											>
												<div className="air-icons">
													<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
												</div>
												<span>{errors.end_month || errors.end_year}</span>
											</div>
										</div>
									</div>

									{/* Description */}
									<div className="from-group">
										<label>Description</label>
										<textarea
											name="description"
											className="form-control"
											rows={5}
											placeholder="Enter a description"
											value={formData.description}
											onChange={handleChange}
										/>
									</div>

								</div>
							</form>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="airModal-footer">
						<div className="modal-two-btns d-flex align-items-center justify-space-between">
							<button type="button" className="air-btns btns-text-light" onClick={handleClose}>Cancel</button>
							<button type="button" className="air-btns btns-primary" onClick={handleSubmit}>
								{issubmiting ? <ButtonLoader /> : 'Save'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
