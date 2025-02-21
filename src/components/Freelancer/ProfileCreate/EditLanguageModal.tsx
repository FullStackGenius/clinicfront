import React, { useState, useEffect } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";

interface Language {
	id: number;
	language_id: number;
	language_name: string;
	language_proficiency_id: number;
	Language_proficiencey_name: string;
}


interface LanguageList {
  id: number;
  name: string;
}

interface ProfiencyList {
  id: number;
  name: string;
}

interface LanguageModalProps {
	selected: Language;
	isOpen: boolean;
	onClose: () => void;
}

interface LanguageFormState {
	language: number;
	proficiency: number;
}

interface ValidationErrors {
    language?: string;
    proficiency?: string;
}

interface FormData {
  language: number;
  language_proficiency: number;
  user_language_id?: number; // Optional property
  type?: string; // Optional property
}

export const EditLanguageModal: React.FC<LanguageModalProps> = ({ selected, isOpen, onClose }) => {
	const [languagelist, setLanguageList] = useState<LanguageList[]>([]); // LanguageList
	const [profiencylist, setProfiencyList] = useState<ProfiencyList[]>([]); // ProfiencyList
	const [formData, setFormData] = useState<LanguageFormState>({
			language: 0,
			proficiency: 0,
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [updated, setUpdated] = useState(false);
	const [issubmiting, setIsSubmiting] = useState(false);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		updateEditFormState();
		fetchLanguageData();
	}, [isOpen]);
	
	const updateEditFormState = () => {
		setFormData({
			language: selected.language_id || 0,
			proficiency: selected.language_proficiency_id || 0
		});
	};

	const fetchLanguageData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-language-page-data',
					method: "GET",
				});
			//console.log('get-user-step-data step 7', response)
			setLanguageList(response.data.language);
			setProfiencyList(response.data.LanguageProficiency);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	  const { name, value } = e.target;
	  let cleanValue: string | boolean = value;
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
		const newErrors: ValidationErrors = {};
		if (!formData.language) newErrors.language = 'Language is required';
		if (!formData.proficiency) newErrors.proficiency = 'Proficiency is required';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	
	// Save data (simulated API call)
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			try {
				setIsSubmiting(true);
				// Transform languages array to desired format
				/*const formattedLanguages = languages.reduce((acc, { language, proficiency }) => {
					if (language && proficiency) {
					  acc[language.toLowerCase()] = proficiency.toLowerCase(); // Ensure both keys and values are lowercase
					}
					return acc;
				}, {} as { [key: string]: string });*/
				
				let form_data: FormData = { 
				  language: formData.language, 
				  language_proficiency: formData.proficiency 
				};

				if (selected.id > 0) {
				  form_data = {
					...form_data, // Spread the existing form_data
					user_language_id: selected.id,
					type: 'edit',
				  };
				}
				const response: any = await axiosInstance({
							url: 'save-language', // Endpoint to save languages
							method: "POST",
							data: form_data // Pass languages array as data
						});
				console.log('response', response);

				if(response.error === 'false'){
					onClose();
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setIsSubmiting(false);
			}
		}
	};
	
	const handleClose = (e: React.MouseEvent) => {
		onClose();
		/*if (updated) {
			const result = window.confirm('Closing the modal will lose your changes?');
			if (result) onClose();
		} else {
			onClose();
		}*/
	};
	
	return (
		<div id="edit-language-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none'}}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
               <div className="airModal-header">
                  <h2 className="airModal-title h2">{selected.id > 0 ? 'Edit' : 'Add'} language</h2>
                  <button className="airModal-close" type="button" data-ev-label="modal_close">
                     <div className="air-icon" data-test="close-button" onClick={(e) => handleClose(e)}>
                        <img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title=""/>
                     </div>
                  </button>
               </div>
               <div className="airModal-body">
                  <div className="modal-resume-content">
                     <div className="language-step-items">
                        <div className="language-grid-container">
                           <div className="english-title-items">
							 <div className="from-grup">
								<label>Language</label>
								<select 
									name="language"
									value={formData.language}
									onChange={handleChange}
									style={{backgroundImage: `url('/assets/images/date-arrow-icon.svg')`}}
								>
									<option value="0">Choose Language</option>
									{languagelist.map((lang) => (
										<option key={lang.id} value={lang.id}>{lang.name}</option>
									))}
								</select>
								{/* Show error below language select */}
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
								<label>Proftiency</label>
								<select className="form-control" 
									name="proficiency"
									value={formData.proficiency}
									onChange={handleChange}
									style={{backgroundImage: `url('/assets/images/date-arrow-icon.svg')`}}
								>
								   <option value="0">Choose Proficiency</option>
									{profiencylist.map((prof) => (
										<option key={prof.id} value={prof.id}>{prof.name}</option>
									))}
								</select>
								{/* Show error below proficiency select */}
								<div className="air-form-message form-message-error" style={{ display: errors.proficiency ? 'flex' : 'none' }}>
								   <div className="air-icons">
									  <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
								   </div>
								   <span>{errors.proficiency}</span>
								</div>
							 </div>
                           </div>
                        </div>
                     </div>
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
