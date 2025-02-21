import React, { useState, useEffect } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface SkillModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface Skill {
  id: number;
  name: string;
}

export const EditSkillsModal: React.FC<SkillModalProps> = ({ isOpen, onClose }) => {
	const [skills, setSkills] = useState<Skill[]>([]);
	const [search, setSearch] = useState<string>('');
	const [filteredskills, setFilteredSkills] = useState<Skill[]>([]);
	const [selectedskills, setSelectedSkill] = useState<Skill[]>([]);
	const [updated, setUpdated] = useState(false);
	const [issubmiting, setIsSubmiting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');
	
	useEffect(() => {
		if (isOpen) {
			getSkillsData();
			fetchStepQuestions();
		}
	}, [isOpen]);
	
	const getSkillsData = async() => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
						url: 'get-skills',
						method: "GET"
					});
			//console.log('response', response)
			setSkills(response.data.skills);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	}
	
	const fetchStepQuestions = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-user-step-data',
					method: "POST",
					data: {name: 'step3'}
				});
			//console.log('get-user-step-data step 3', response)
			var saved_skills = response.data.details.skills;
			if(saved_skills && saved_skills.length > 0){
				setSelectedSkill(saved_skills);
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log('handle input change called')
		const { name, value } = e.target;
		//clean the value
		let clean_val = helpers.cleanString(value);
		setSearch(clean_val);
		searchSkill(clean_val);
	};
	
	const searchSkill = (term: string) => {
		//console.log('term', term)
		if(term !== ''){
			const filterBy = () => {
				const searchTerms = new RegExp(term, 'i');
				return (obj: any) => {
					for (const key of Object.keys(obj)) {
						if (searchTerms.test(obj[key])) {
							return true;
						}
					}
					return false;
				}
			}
			var filtered_skils = skills.filter(filterBy());
			setFilteredSkills(filtered_skils);
		}else{
			setFilteredSkills([]);
		}
	}
	
	const handleSkillSelected = (item: Skill) => {
		setError('');
		if(selectedskills.length !== 15){
			const exists = selectedskills.some((selectedItem) => selectedItem.id === item.id);
			if (!exists) {
			  setSelectedSkill((prevItems) => [...prevItems, item]); // Add item if not already selected
			}
		}else{
			setError('You can select up to 15 skills.');
		}
	}
	
	const handleUnselectSkill = (id: number) => {
		setError('');
		setSelectedSkill(selectedskills.filter((item) => item.id !== id));
	}
	
	const validate = (): boolean => {
		if (selectedskills.length === 0) {
			setError('At least one skill is required.');
			return false;
		}
		return true;
	};
	
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			try {
				setIsSubmiting(true);
				var result = selectedskills.map(item => item.id);
				const response: any = await axiosInstance({
							url: 'save-user-skill',
							method: "POST",
							data: {skills: result}
						});
				console.log('response', response)
				
				if(response.error === 'false'){
					onClose();
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setIsSubmiting(false);
			}
		}
	}
	
	const checkSeletced = (item_id: number) => {
		let check = selectedskills.filter((item) => item.id === item_id);
		if(check.length > 0){
			return true;
		}
		return false;
	}


	const handleClose = (e: React.MouseEvent) => {
		onClose();
		/*if (updated) {
			const result = window.confirm('Closing the modal will lose your changes?');
			if (result) onClose();
		} else {
			onClose();
		}*/
	};
	//console.log('error', error)
	return (
		<div id="edit-skill-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
               <div className="airModal-header">
					<h2 className="airModal-title h2">Skills</h2>
					<button className="airModal-close" type="button" onClick={handleClose}>
						<div className="air-icon">
							<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
						</div>
					</button>
               </div>
               <div className="airModal-body">
                  <div className="modal-resume-content">
                     <div className="skills-edit-modal-content">
                        <p className="token-label">Accountant Specialities</p>
                        <div className="specialities-sortable-list skill-certifications-items">
							<div className="skill-form-group">
								<label>Your skills</label>
								<div className="input-group">
									<input type="search" name="search_skill" id="search_skill"
										className="air-type-ahead" 
										placeholder="Enter skills here"      
										value={search}
										onChange={handleInputChange}
									/>
									{filteredskills.length > 0 ? (
										<div className="searchtype-menu-list">
											<ul>
											{filteredskills.map((item,index) => (
												<li key={index} className={checkSeletced(item.id) ? 'disabled' : ''} onClick={() => handleSkillSelected(item)}>{item.name}</li>
											))}
											</ul>
										</div>
									) : (
										null
									)}
								</div>
								<div className="skill-selector-des">
									<small>Max 15 skills</small>
								</div>
								
							</div>	
						{selectedskills.length > 0 ? (
							<div className="token-container-label">
								{selectedskills.map((item,index) => (
									<div key={index} className="air-token">
										{item.name}
										<div className="air3-icon" onClick={() => handleUnselectSkill(item.id)}>
											<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
										</div>
									</div>
								))}
							</div>	
						) : (
							null
						)}	  
                        </div>
                     </div>
                  </div>
               </div>
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
