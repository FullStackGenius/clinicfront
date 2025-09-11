import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Layout from './Layout';
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import { EditLanguageModal } from './EditLanguageModal';
import Loader from '../../Common/Loader';

const MySwal = withReactContent(Swal);


interface LanguageProp {
	language: number;
	proficiency: number;
}

interface ValidationErrors {
	language?: string;
	proficiency?: string;
}

type SavedLanguage = {
	id: number;
	language_id: number;
	language_name: string;
	language_proficiency_id: number;
	Language_proficiencey_name: string;
};

interface LanguageList {
	id: number;
	name: string;
}

interface ProfiencyList {
	id: number;
	name: string;
}

function Step7() {
	const navigate = useNavigate();
	const [languagelist, setLanguageList] = useState<LanguageList[]>([]); // LanguageList
	const [profiencylist, setProfiencyList] = useState<ProfiencyList[]>([]); // ProfiencyList
	const [formData, setFormData] = useState<LanguageProp>({ language: 0, proficiency: 0 });
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [languagemodal, setLanguageModal] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [savedlanguages, setSavedLanguages] = useState<SavedLanguage[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedrecord, setSelectedRecord] = useState<SavedLanguage>({
		id: 0,
		language_id: 0,
		language_name: '',
		language_proficiency_id: 0,
		Language_proficiencey_name: '',
	});

	const editRecord = (record: SavedLanguage) => {
		setSelectedRecord(record);
		setLanguageModal(true);
	}

	useEffect(() => {
		fetchPreData();
	}, [languagemodal]);

	//fetch the presaved data
	useEffect(() => {
		fetchPreData();
		fetchLanguageData();
	}, []);

	const fetchPreData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-user-step-data',
				method: "POST",
				data: { name: 'step7' }
			});
			const user_language = response.data.details.language.user_language;
			if (user_language) {
				setSavedLanguages(user_language);
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};

	const fetchLanguageData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-language-page-data',
				method: "GET",
			});
			setLanguageList(response.data.language);
			setProfiencyList(response.data.LanguageProficiency);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};

	// Handle input change for each language/proficiency
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		let cleanValue = value;
		setFormData({
			...formData,
			[name]: cleanValue,
		});

		// Clear error for this field if it exists
		setErrors({
			...errors,
			[name]: undefined,
		});
	};


	// Validate the form
	const validate = (): boolean => {
		const newErrors: ValidationErrors = {};
		if (!formData.language) newErrors.language = 'Language is required';
		if (!formData.proficiency) newErrors.proficiency = 'Proficiency is required';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};


	// Save data (simulated API call)
	const saveData = async (): Promise<void> => {

		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
					url: 'save-language', // Endpoint to save languages
					method: "POST",
					data: { language: formData.language, language_proficiency: formData.proficiency }
				});
				if (response.error === 'false') {
					fetchPreData();
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	};



	const moveAhead = () => {
		navigate("/freelancer/setup-profile-step-eight");
	};

	const handleDelete = async (id: number) => {

		// Show the confirmation dialog
		const result = await MySwal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete this item?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
		});

		// Check user response
		if (result.isConfirmed) {
			deleteItem(id);
		}
	};

	const deleteItem = async (id: number) => {
		console.log('Item deleted!');
		// Add your delete logic here
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'delete-freelancer-step-data',
				method: "POST",
				data: { type: 'language', delete_id: id }
			});
			if (response.error === 'false') {
				MySwal.fire('Deleted!', 'Your item has been deleted.', 'success');
				fetchPreData();
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<Loader isLoading={loading} />
			<Layout backButton={true} pagetitle="" currentStep={7} issubmitting={false} getStarted={moveAhead}>
				<div className="air-wiz-body">
					<div className="air-carousel-items">
						<div id="step-item-7" className="air-step-items">
							<div className="step-title-container">
								<h2>What languages do you speak?</h2>
								<h5 className="step-subtitle">You never know who you’ll be working with. Add your languages.</h5>
							</div>
							<div className="language-step-items">
								<div className="language-grid-container">
									<div className="english-title-items">
										<div className="from-grup">
											<label>Language</label>
											<select
												name="language"
												value={formData.language}
												onChange={handleChange}
												style={{ backgroundImage: `url('/assets/images/date-arrow-icon.svg')` }}
											>
												<option value="0">Choose Language</option>
												{languagelist.map((lang) => (
													<option key={lang.id} value={lang.id}>{lang.name}</option>
												))}
											</select>
											<div className="air-form-message form-message-error" style={{ display: errors.language ? 'flex' : 'none' }}>
												<div className="air-icons">
													<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
												</div>
												<span>{errors.language}</span>
											</div>

										</div>
									</div>
									<div className="proftiency-title-items">
										<div className="from-grup">
											<label>Proficiency</label>
											<select className="form-control"
												name="proficiency"
												value={formData.proficiency}
												onChange={handleChange}
												style={{ backgroundImage: `url('/assets/images/date-arrow-icon.svg')` }}
											>
												<option value="0">Choose Proficiency</option>
												{profiencylist.map((prof) => (
													<option key={prof.id} value={prof.id}>{prof.name}</option>
												))}
											</select>
											<div className="air-form-message form-message-error" style={{ display: errors.proficiency ? 'flex' : 'none' }}>
												<div className="air-icons">
													<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
												</div>
												<span>{errors.proficiency}</span>
											</div>
										</div>
									</div>
								</div>
								<div className="landscape-btns-block">
									{!submitting ? (
										<button className="air-btns-secondary" onClick={saveData}>
											Add a language
											<div className="air-icon">
												<img className="img-fluid" src="/assets/images/orange-plus-icon.svg" alt="" title="" />
											</div>
										</button>
									) : (
										<button className="air-btns-secondary"><ButtonLoader /></button>
									)}
								</div>
								{savedlanguages.length > 0 && (
									<div className="language-list-items">
										<ul>
											{savedlanguages.map(item => (
												<li key={item.id}>
													<div className="language-grid-container">
														<div className="english-title-items">
															<div className="from-grup">
																<label>Selected language</label>
																<input className="form-control" type="text" value={item.language_name} placeholder="English" disabled={true} />
															</div>
														</div>
														<div className="proftiency-title-items">
															<div className="from-grup">
																<label>Proftiency</label>
																<input className="form-control" type="text" value={item.Language_proficiencey_name} placeholder="Basic" disabled={true} />
															</div>
														</div>
														<div className="language-actions-btns-items">
															<button className="save_link outline-icon-btn" type="button" onClick={() => editRecord(item)}>
																<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
															</button>
															<button className="delete_link outline-icon-btn" type="button" onClick={() => handleDelete(item.id)}>
																<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
															</button>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<EditLanguageModal selected={selectedrecord} isOpen={languagemodal} onClose={() => setLanguageModal(false)} />
			</Layout>
		</>
	);
}

export default Step7;