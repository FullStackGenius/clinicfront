import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";
import Loader from '../../Common/Loader';

interface Skill {
	id: number;
	name: string;
}

function Step3() {
	const navigate = useNavigate();
	const [skills, setSkills] = useState<Skill[]>([]);
	const [popularskills, setPolpularSkills] = useState<Skill[]>([]);
	const [search, setSearch] = useState<string>('');
	const [filteredskills, setFilteredSkills] = useState<Skill[]>([]);
	const [selectedskills, setSelectedSkill] = useState<Skill[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string>('');
	const hasFetchedData = useRef(false);

	useEffect(() => {
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			getSkillsData();
		}
	}, []);

	const getSkillsData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-skills',
				method: "GET"
			});
			//console.log('response', response)
			setSkills(response.data.skills);

			var popular_skills = response.data.skills.length > 8 ? response.data.skills.slice(0, 8) : response.data.skills;
			setPolpularSkills(popular_skills);
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
					data: { name: 'step3' }
				});
				//console.log('get-user-step-data step 3', response)
				var saved_skills = response.data.details.skills;
				if (saved_skills && saved_skills.length > 0) {
					setSelectedSkill(saved_skills);
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 500);
			}
		};

		fetchStepQuestions();
	}, []);

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
		if (term !== '') {
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
		} else {
			setFilteredSkills([]);
		}
	}

	const handleSkillSelected = (item: Skill) => {
		setError('');
		if (selectedskills.length !== 15) {
			const exists = selectedskills.some((selectedItem) => selectedItem.id === item.id);
			if (!exists) {
				setSelectedSkill((prevItems) => [...prevItems, item]); // Add item if not already selected
			}
		} else {
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

	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				var result = selectedskills.map(item => item.id);
				const response: any = await axiosInstance({
					url: 'save-user-skill',
					method: "POST",
					data: { skills: result }
				});
				//console.log('response', response)

				if (response.error === 'false') {
					navigate("/freelancer/setup-profile-step-four");
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	}

	const checkSeletced = (item_id: number) => {
		let check = selectedskills.filter((item) => item.id === item_id);
		if (check.length > 0) {
			return true;
		}
		return false;
	}

	return (
		<>
			<Loader isLoading={loading} />
			<Layout backButton={true} pagetitle="" currentStep={3} issubmitting={submitting} getStarted={saveData}>
				<div className="air-wiz-body">
					<div className="air-carousel-items">
						<div id="step-item-3" className="air-step-items">
							<div className="step-title-container">
								<h2>Identify your certifications.</h2>
								<h5 className="step-subtitle">The let us know how much help to give you along the way.we wont share your answer with anyone else including potential clients.</h5>
								<div className="carefull-btns">
									<p >Why choosing carefully matters</p>
								</div>
							</div>
							<div className="profile-skills-items">
								<div className="skill-small-container">
									<div className="skill-form-group">
										<label>Your skills</label>
										<div className="input-group">
											<input type="search" name="search_skill" id="search_skill"
												className="air-type-ahead"
												placeholder="Enter skills here"
												value={search}
												onChange={handleInputChange}
											/>
										</div>
										<div className="skill-selector-des">
											<small>Max 15 skills</small>
										</div>
										{filteredskills && filteredskills.length > 0 ? (
											<div className="searchtype-menu-list">
												<ul>
													{filteredskills.map((item, index) => (
														<li key={index} className={checkSeletced(item.id) ? 'disabled' : ''} onClick={() => handleSkillSelected(item)}>{item.name}</li>
													))}
												</ul>
											</div>
										) : (
											null
										)}
										{selectedskills && selectedskills.length > 0 ? (
											<div className="suggest-skills-items">
												<p className="token-label">Selected Skills</p>
												<div className="token-container-label seleted-skill">
													{selectedskills.map((item, index) => (
														<div key={index} role="button" className="air-token air-token-multi-select" onClick={() => handleUnselectSkill(item.id)}>
															{item.name}
															<div className="air3-icon">
																<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
															</div>
														</div>
													))}
												</div>
											</div>
										) : (
											null
										)}
										{error !== '' ? (
											<div className="air-form-message form-message-error">
												<div className="air-icons">
													<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
												</div>
												<span>At least one skill is required.</span>
											</div>
										) : (
											null
										)}
									</div>
									<div className="suggest-skills-items">
										<p className="token-label">popular Skills</p>
										<div className="token-container-label">
											{/* {popularskills.map((item,index) => (
									<div key={index} role="button" className="air-token air-token-multi-select" onClick={() => handleSkillSelected(item)}>
									{item.name}
									   <div className="air3-icon">
										  <img className="img-fluid" src="/assets/images/plus-black-icon.svg" alt="" title=""/>
									   </div>
									</div>
								))} */}

											{popularskills
												.filter(item => !selectedskills.some(skill => skill.id === item.id))
												.map((item, index) => (
													<div
														key={index}
														role="button"
														className="air-token air-token-multi-select"
														onClick={() => handleSkillSelected(item)}
													>
														{item.name}
														<div className="air3-icon">
															<img
																className="img-fluid"
																src="/assets/images/plus-black-icon.svg"
																alt="Add"
																title="Add"
															/>
														</div>
													</div>
												))}


										

										</div>
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

export default Step3;
