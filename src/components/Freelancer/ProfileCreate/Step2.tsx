import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import axiosInstance from "../../../_helpers/axiosInstance";
import Loader from '../../Common/Loader';

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

function Step2() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
	const [selectedcategory, setSelectedCategory] = useState<number>(0);
	const [selectedsubcat, setSelectedSubCat] = useState<number[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingsub, setLoadingSub] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string>('');
	const hasFetchedData = useRef(false);

	useEffect(() => {
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			getCategoryData();
		}
	}, []);

	const getCategoryData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-category',
				method: "GET"
			});
			setCategories(response.data.categories);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	}
	//fetch the presaved data
	useEffect(() => {
		const fetchStepQuestions = async () => {
			try {
				setLoading(true);
				const response: any = await axiosInstance({
					url: 'get-user-step-data',
					method: "POST",
					data: { name: 'step2' }
				});
				var saved_sub_cat = response.data.details.sub_category;
				if (saved_sub_cat && saved_sub_cat.length > 0) {
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

		fetchStepQuestions();
	}, []);

	useEffect(() => {
		if (selectedcategory > 0) {
			setLoadingSub(true);
			const filtered_sub_cat = categories.filter((item) => item.id === selectedcategory);
			if (filtered_sub_cat.length > 0) {
				const filtered_data = filtered_sub_cat[0].sub_categories || [];
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

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checkedId = Number(e.target.value); // Ensure it's a number
		setError('');
		if (e.target.checked) {
			if (selectedsubcat) {
				setSelectedSubCat([...selectedsubcat, checkedId]);
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

	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
					url: 'save-user-subcategory',
					method: "POST",
					data: { sub_category: selectedsubcat }
				});
				if (response.error === 'false') {
					navigate("/freelancer/setup-profile-step-three");
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	}



	return (
		<>
			<Loader isLoading={loading} />
			<Layout backButton={true} pagetitle="" currentStep={2} issubmitting={submitting} getStarted={saveData}>
				<div className="air-wiz-body">
					<div className="air-carousel-items">
						<div id="step-item-2" className="air-step-items">
							<div className="step-title-container">
								<h2>Great! What type of work are you here to do?</h2>
							</div>
							<div className="categories-steps">
								<div className="air-categories-items desktop-items-display">
									<div className="left d-flex flex-column">
										{categories && <>
											<div className="tip-title">Select Your Categories</div>
											<nav>
												<ul className="cat air-list-nav">
													{categories.map((item) => (
														<li key={item.id}
															className={`list-nav-item ${selectedcategory === item.id ? "active" : ""}`} onClick={() => setSelectedCategory(item.id)}
														>
															<span className="air-list-nav-link">{item.name}</span>
														</li>
													))}
												</ul>
											</nav>
										</>
										}
									</div>
									<div className="right d-flex flex-column">
										<div className="tip-title">Select Specialties Based on Categories</div>
										<div className="specialties-items">
											{subcategories && <>
												<fieldset>
													{subcategories.map(subcat => (
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
											</>
											}
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
										{selectedsubcat.length > 0 ? (
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
								<div className="air-categories-items mobile-items-display">
									<div className="tip-title">Select 1 category</div>
									<div className="air-list-nav-items active">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle" >
											<span>Acconting consulting</span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
										<div className="cat-faq-content">
											<div className="tip-title">Now, select 1 to 3 specialties</div>
											<div className="specialties-items">
												<fieldset>
													<label data-test="checkbox-label" className="air-checkbox-label">
														<input type="checkbox" className="air-checkbox-input" name="" value="digital" />
														<span className="cat-checkbox-input">
															<div className="airIcon">
																<img className="img-fluid" src="/assets/images/input-checkbox-icon.svg" alt="" title="" />
															</div>
														</span>
														Digital Marketing
													</label>
													<label data-test="checkbox-label" className="air-checkbox-label">
														<input type="checkbox" className="air-checkbox-input" name="" value="training" />
														<span className="cat-checkbox-input">
															<div className="airIcon">
																<img className="img-fluid" src="/assets/images/input-checkbox-icon.svg" alt="" title="" />
															</div>
														</span>
														Lead Generating Training
													</label>
													<label data-test="checkbox-label" className="air-checkbox-label">
														<input type="checkbox" className="air-checkbox-input" name="" value="marketing" />
														<span className="cat-checkbox-input">
															<div className="airIcon">
																<img className="img-fluid" src="/assets/images/input-checkbox-icon.svg" alt="" title="" />
															</div>
														</span>
														Marketing PR &amp; Brand Startegy
													</label>
												</fieldset>
												<div className="air-form-message form-message-error">
													<div className="air-icons">
														<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
													</div>
													<span>You must select at least one service.</span>
												</div>
											</div>
										</div>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Admin support </span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Customer services </span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Data science Analytics</span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Logo</span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Design and creative</span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Engenearing</span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Sale & Marketing  <span className="counter ml-1x"> (2) </span></span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>Tarnslation</span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="air-list-nav-items">
										<button type="button" className="category-toggle air-collapse-toggle" data-ev-label="category_toggle">
											<span>It & Networking</span>
											<div className="air-arrow-icon">
												<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
											</div>
										</button>
									</div>
									<div className="clear-btns-items">
										<a className="clear-text d-flex align-items-center">
											<div className="air-icon">
												<img className="img-fluid" src="/assets/images/close-color-icon.svg" alt="" title="" />
											</div>
											Clear selections
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Step2;
