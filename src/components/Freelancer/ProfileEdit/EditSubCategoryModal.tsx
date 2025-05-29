import React, { useState, useEffect } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface CategoryModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface Category {
  id: number;
  name: string;
  sub_categories: string[];
}

interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

export const EditSubCategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
	const [selectedcategory, setSelectedCategory] = useState<number>(0);
	const [selectedsubcat, setSelectedSubCat] = useState<number[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadingsub, setLoadingSub] = useState(false);
	const [issubmiting, setSubmitting] = useState(false);
	const [error, setError] = useState<string>('');
	
	useEffect(() => {
		if (isOpen) {
			getCategoryData();
			fetchStepQuestions();
		}
	}, [isOpen]);
	
	useEffect(() => {
		if(selectedcategory > 0){
			setLoadingSub(true);
			const filtered_sub_cat = categories.filter((item) => item.id === selectedcategory);
			if (filtered_sub_cat.length > 0) {
				const filtered_data = filtered_sub_cat[0].sub_categories || [];
				//console.log('filtered_data', filtered_data);
				if (Array.isArray(filtered_data) && filtered_data.length > 0) {
					setSubCategories(filtered_data as unknown as SubCategory[]);
				} else {
					setSubCategories([]);
				}
			} else {
				setSubCategories([]);
			}
			setLoadingSub(false);
		}
	}, [selectedcategory]);
	
	const getCategoryData = async() => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
						url: 'get-category',
						method: "GET"
					});
			//console.log('response', response)
			setCategories(response.data.categories);
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
					data: {name: 'step2'}
				});
			//console.log('get-user-step-data step 2', response)
			var saved_sub_cat = response.data.details.sub_category;
			//console.log('saved_sub_cat', saved_sub_cat)
			if(saved_sub_cat && saved_sub_cat.length > 0){
				//setSubCategories(saved_sub_cat);
				setSelectedCategory(saved_sub_cat[0].category_id)
				const ids = saved_sub_cat.map((item: SubCategory) => item.id);
				setSelectedSubCat(ids)
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checkedId = Number(e.target.value); // Ensure it's a number
		//console.log('checkedId', checkedId);
		//clear error message
		setError('');
		if (e.target.checked) {
			if(selectedsubcat.length < 3){
				setSelectedSubCat([...selectedsubcat, checkedId]);
			}else{
				setError('You can select up to 3 services only.');
			}
		} else {
			setSelectedSubCat(selectedsubcat.filter(id => id !== checkedId));
		}
	};
	
	const validate = (): boolean => {
		if (selectedsubcat.length === 0) {
			setError('You must select at least one service.');
			return false;
		}
		return true;
	};
	
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
							url: 'save-user-subcategory',
							method: "POST",
							data: {sub_category: selectedsubcat}
						});
				//console.log('response', response)
				
				if(response.error === 'false'){
					onClose();
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	}
	
	const clearSelection = () => {
		setSelectedSubCat([]);
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
	//console.log('subcategories', subcategories)
	return (
		<div id="edit-skill-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
				<div className="airModal-header">
					<h2 className="airModal-title h2">Specialties</h2>
					<button className="airModal-close" type="button" onClick={handleClose}>
						<div className="air-icon">
							<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
						</div>
					</button>
				</div>
				<div className="airModal-body">
					<div className="modal-resume-content">
						<div className="skills-edit-modal-content">
							<div className="categories-steps">
				   <div className="air-categories-items desktop-items-display">
						<div className="left d-flex flex-column">
						
							 <div className="tip-title">Select 1 category</div>
							 <nav>
								<ul className="cat air-list-nav">
									{categories && categories.map((item) => (
										<li key={item.id} 
										  className={`list-nav-item ${selectedcategory === item.id ? "active" : ""}`} onClick={() => setSelectedCategory(item.id)}
										>
											<span className="air-list-nav-link">{item.name}</span>
										</li>
								   ))}
								</ul>
							 </nav>
							
						</div>
						<div className="right d-flex flex-column">
							<div className="tip-title">Now, select 1 to 3 specialties</div>
							<div className="specialties-items">
								<fieldset>
								   {subcategories && subcategories.map(subcat => (
										<label key={subcat.id} className="air-checkbox-label">
											<input type="checkbox" 
											  className="air-checkbox-input" 
											  value={subcat.id} 
											  checked={selectedsubcat.includes(subcat.id)}
											  onChange={(event) => { handleCheckboxChange(event) }}
											/>
										  <span className="cat-checkbox-input">
											<div className="airIcon">
											  <img className="img-fluid" src="/assets/images/input-checkbox-icon.svg" alt="" title="" />
											</div>
										  </span>
										  {subcat.name}  {/* Render the name here */}
										</label>
									))}
								</fieldset>
								{error ? (
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
							{selectedsubcat && selectedsubcat.length > 0 ? (
								<div className="clear-text d-flex align-items-center" onClick={() => setSelectedSubCat([])}>
									<div className="air-icon">
									   <img className="img-fluid" src="/assets/images/close-color-icon.svg" alt="" title="" />
									</div>
									Clear selections
								</div>
							) : (
								null
							)}
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
							{issubmiting ? <ButtonLoader /> : 'Save'}
						</button>
					</div>
				</div>
            </div>
         </div>
      </div>
	);
};
