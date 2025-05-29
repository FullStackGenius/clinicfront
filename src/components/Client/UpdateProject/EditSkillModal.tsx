import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setLoadData } from "../../../redux/commonSlice";
import type { AppDispatch } from '../../../redux/store';
import helpers from "../../../_helpers/common";
import ContentLoader from '../../Common/ContentLoader';
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import Loader from "../../Common/Loader";


interface SkillModalProps {
	id: number;
	isOpen: boolean;
	onClose: () => void;
}

interface AccountingSkill {
  id: number;
  name: string;
  slug: string;
}

export const EditSkillModal: React.FC<SkillModalProps> = ({ id, isOpen, onClose }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [accountingskill, setAccountingSkill] = useState<AccountingSkill[]>([]);
	const [selectedskill, setSelectedSkill] = useState<AccountingSkill[]>([]);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(isOpen){
			fetchProjectDetails(id);
			fetchSkillsData();
		}
	}, [isOpen]);
	
	const fetchProjectDetails = async (id: number) => {
		try {
			//setLoading(true);
			const response: any = await axiosInstance({
			  url: 'project/get-project-detail',
			  method: "POST",
			  data: { project_id: id },
			});
			setSelectedSkill(response.data.project.accounting_skills);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			//setLoading(false);
		}
	};
	
	const fetchSkillsData = async () => {
		try {
			//setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-project-desired-account',
					method: "GET"
				});
			setAccountingSkill(response.data.accounting_skills);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			//setLoading(false);
		}
	};
	
	const selectUnselectSkill = (item: AccountingSkill) => {
		setError('');
		const exists = selectedskill.some((selectedItem) => selectedItem.id === item.id);
		if (!exists) {
			// Add item if not already selected
			setSelectedSkill((prevItems) => [...prevItems, item]);
		} else {
			// Remove item if it exists
			setSelectedSkill((prevItems) => prevItems.filter((selectedItem) => selectedItem.id !== item.id));
		}
	};

	
	// Validate the form
	const validate = (): boolean => {
		if (selectedskill.length === 0) {
			setError('Please select at least one skill'); 
			return false;
		}
		return true;
	};

	// Save data
	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const skillIds = selectedskill.map((item) => item.id);
				const response: any = await axiosInstance({
							url: 'project/edit-project-details', 
							method: "POST",
							data: {project_id: id, edit_type: 'accountingSkills', accounting_skills: skillIds}
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
	
	const checkSeletced = (item_id: number) => {
		let check = selectedskill.filter((item) => item.id === item_id);
		if(check.length > 0){
			return true;
		}
		return false;
	}
	return (
		<>
			<Loader isLoading={loading} />
		<div id="pr-title-edit-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
			
               <div className="airModal-header">
					<h2 className="airModal-title h2">Edit Skills</h2>
					<button className="airModal-close" type="button" onClick={handleClose}>
						<div className="air-icon">
							<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
						</div>
					</button>
               </div>
               <div className="airModal-body">
                  <div className="project-skill-edit-content">
                     <div className="project-selected-skill">
                        <h3>Selected skills</h3>
                        <div className="accordionPanel">
                           <div className="acc-skill-items">
                              <div className="skill-with-see">
									{selectedskill && selectedskill.length > 0 ? (
									 <ul className="d-flex flex-wrap align-items-center">
										{selectedskill.map((item) => (
											<li key={'skill'+item.id} className={`is-active`} onClick={() => selectUnselectSkill(item)}>
												<span>{item.name}</span> 
												<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
											</li>
										))}
									 </ul>
									) : (
										<p>No Skill Selected</p>
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
                     <div className="edit-pr-skill-items">
                        <div className="accordion-skill-items">
                           <h3>Accounting Skills</h3>
                           <div className="accordionPanel">
                              <div className="acc-skill-items">
                                 <div className="skill-with-see">
                                    {accountingskill.length > 0 ? (
									 <ul className="d-flex flex-wrap align-items-center">
										{accountingskill.map((item) => (
											<>
											{!checkSeletced(item.id) && (
												<li key={'skill'+item.id} onClick={() => selectUnselectSkill(item)}>
													<span>{item.name}</span> 
													<img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" />
												</li>
											)}
											</>
										))}
									 </ul>
									) : (
										<p>No Skill Found</p>
									)}
                                 </div>
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
	  </>
	);
};
