import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";

interface AccountingCertification {
  id: number;
  name: string;
  skill_slug: string;
}

interface AccountingSector {
  id: number;
  name: string;
  slug: string;
}

interface AccountingSkill {
  id: number;
  name: string;
  slug: string;
}

interface Error {
  skillerror?: string;
  sectorerror?: string;
  certifactionerror?: string;
}

function Step4() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	//console.log('saved project', project)
	const [accountingcertifications, setAccountingCertifications] = useState<AccountingCertification[]>([]);
	const [accountingsector, setAccountingSector] = useState<AccountingSector[]>([]);
	const [accountingskill, setAccountingSkill] = useState<AccountingSkill[]>([]);
	const [selectedskill, setSelectedSkill] = useState<number[]>([]);
	const [selectedsector, setSelectedSector] = useState<number[]>([]);
	const [selectedcertifaction, setSelectedCertification] = useState<number[]>([]);
	const [projectrequirment, setProjectRequirment] = useState('');
	const [openaccordian, setOpenAccordian] = useState(1);
	const [error, setError] = useState<Error>({skillerror: '', sectorerror: '', certifactionerror: ''});
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	
	useEffect(() => {
		if(project){
			fetchProjectDetails(Number(project.id));
		}
	}, [project]);
	
	const fetchProjectDetails = async (id: number) => {
	  try {
		//setLoading(true);
		const response: any = await axiosInstance({
		  url: 'project/get-project-detail',
		  method: "POST",
		  data: { project_id: id },
		});

		// Extracting and mapping the IDs from the response
		const accounting_certifications: AccountingCertification[] = response.data.project.accounting_certifications;
		const certificationIds = accounting_certifications.map((item) => item.id);
		setSelectedCertification(certificationIds);

		const accounting_sectors: AccountingSector[] = response.data.project.accounting_sectors;
		const sectorIds = accounting_sectors.map((item) => item.id);
		setSelectedSector(sectorIds);

		const accounting_skills: AccountingSkill[] = response.data.project.accounting_skills;
		const skillIds = accounting_skills.map((item) => item.id);
		setSelectedSkill(skillIds);
	  } catch (error) {
		console.error("Error in API request:", error);
	  } finally {
		//setLoading(false);
	  }
	};

	useEffect(() => {
		fetchSkillsData();
	}, []);
	
	const fetchSkillsData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-project-desired-account',
					method: "GET"
				});
			setAccountingCertifications(response.data.accounting_certifications);
			setAccountingSector(response.data.accounting_sectors);
			setAccountingSkill(response.data.accounting_skills);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if(selectedskill.length > 0){
			setError({...error, skillerror: ''});
		}
		if(selectedsector.length > 0){
			setError({...error, sectorerror: ''});
		}
		if(selectedcertifaction.length > 0){
			setError({...error, certifactionerror: ''});
		}
	}, [selectedskill, selectedsector, selectedcertifaction]);
	
	
	// Validate the form
	const validate = (): boolean => {
		let error: Error = {};
		if (selectedskill.length === 0) {
			error.skillerror = 'Please select at least one skill';
		}
		if (selectedsector.length === 0) {
			error.sectorerror = 'Please select at least one sector';
		}
		if (selectedcertifaction.length === 0) {
			error.certifactionerror = 'Please select at least one certification';
		}
		setError(error);
		return Object.keys(error).length > 0 ? false : true;
	};


	// Save data (simulated API call)
	const saveData = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				
				const response: any = await axiosInstance({
							url: 'project/save-project-skill', 
							method: "POST",
							data: {accounting_sectors: selectedsector, accounting_skills: selectedskill, accounting_certifications: selectedcertifaction, project_id: project?.id}
						});
				if(response.error === 'false'){
					dispatch(setProject(response.data.project));
					navigate(`/client/create-project-step-five`);
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	};

	const selectUnselectSkill = (itemid: number) => {
		if (!selectedskill.includes(itemid)) {
			setSelectedSkill((prev) => [...prev, itemid]);
		} else {
			setSelectedSkill((prev) => prev.filter((item) => item !== itemid));
		}
	};

	const selectUnselectSector = (itemid: number) => {
		if (!selectedsector.includes(itemid)) {
			setSelectedSector((prev) => [...prev, itemid]);
		} else {
			setSelectedSector((prev) => prev.filter((item) => item !== itemid));
		}
	};
	
	const selectUnselectCertification = (itemid: number) => {
		if (!selectedcertifaction.includes(itemid)) {
			setSelectedCertification((prev) => [...prev, itemid]);
		} else {
			setSelectedCertification((prev) => prev.filter((item) => item !== itemid));
		}
	};

	const clearAllSelection = () => {
		setSelectedSkill([]);
		setSelectedSector([]);
		setSelectedCertification([]);
	}
	
	return (
		<Layout backButton={false} pagetitle="Tell us about your desired Accountant" currentStep={4} issubmitting={submitting} getStarted={saveData}>
			<div className="acc-with-buttons">
                <div className="skillSearch-block">
                    <div className="result-skill-text d-flex align-items-center">
                        <img className="img-fluid" src="/assets/images/skill-icon.svg" alt="" title="" /> 
						<span className="res-text">For best results please tell us the following</span>
                    </div>
                </div>
				{loading ? (
					<ContentLoader />
				) : (
					<>
					<div className="skill-accordion">
						<div className={`accordionItem ${openaccordian === 1 ? 'is-active' : ''}`} onClick={() => setOpenAccordian(1)}>
							<h3 className="accordionThumb">Accounting Skills 
								<span className="acc-arrow">
									<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
								</span>
							</h3>
							<div className="accordionPanel">
							   <div className="acc-skill-items">
								  <div className="skill-with-see">
									{accountingskill.length > 0 ? (
									 <ul className="d-flex flex-wrap align-items-center">
										{accountingskill.map((item) => (
											<li key={'skill'+item.id} className={`${selectedskill.includes(item.id) ? 'is-active' : ''}`} onClick={() => selectUnselectSkill(item.id)}>
												<span>{item.name}</span> 
												{selectedskill.includes(item.id) ? (
													<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
												) : (
													<img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" />
												)}
											</li>
										))}
									 </ul>
									) : (
										<p>No Content Found</p>
									)}
								  </div>
							   </div>
							</div>
							<div className="air-form-message form-message-error"
							   style={{ display: error.skillerror !== '' ? 'flex' : 'none' }}
							>
								<div className="air-icons">
									<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
								</div>
								<span>{error.skillerror}</span>
							</div>
						 </div>
						  <div className={`accordionItem ${openaccordian === 2 ? 'is-active' : ''}`} onClick={() => setOpenAccordian(2)}>
							<h3 className="accordionThumb">Accounting Sectors 
								<span className="acc-arrow">
									<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
								</span>
							</h3>
							<div className="accordionPanel">
								<div className="acc-skill-items">
								  <div className="skill-with-see">
									{accountingsector.length > 0 ? (
									 <ul className="d-flex flex-wrap align-items-center">
										{accountingsector.map((item) => (
											<li key={'sector'+item.id} className={`${selectedsector.includes(item.id) ? 'is-active' : ''}`} onClick={() => selectUnselectSector(item.id)}>
												<span>{item.name}</span> 
												{selectedsector.includes(item.id) ? (
													<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
												) : (
													<img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" />
												)}
											</li>
										))}
									 </ul>
									) : (
										<p>No Content Found</p>
									)}
								  </div>
							   </div>
							</div>
							<div className="air-form-message form-message-error"
							   style={{ display: error.sectorerror !== '' ? 'flex' : 'none' }}
							>
								<div className="air-icons">
									<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
								</div>
								<span>{error.sectorerror}</span>
							</div>
						</div>
						<div className={`accordionItem ${openaccordian === 3 ? 'is-active' : ''}`} onClick={() => setOpenAccordian(3)}>
							<h3 className="accordionThumb">Accounting Certifications 
								<span className="acc-arrow">
									<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
								</span>
							</h3>
							<div className="accordionPanel">
								<div className="acc-skill-items">
								  <div className="skill-with-see">
									{accountingcertifications.length > 0 ? (
									 <ul className="d-flex flex-wrap align-items-center">
										{accountingcertifications.map((item) => (
											<li key={'certifications'+item.id} className={`${selectedcertifaction.includes(item.id) ? 'is-active' : ''}`} onClick={() => selectUnselectCertification(item.id)}>
												<span>{item.name}</span> 
												{selectedcertifaction.includes(item.id) ? (
													<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
												) : (
													<img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" />
												)}
											</li>
										))}
									 </ul>
									) : (
										<p>No Content Found</p>
									)}
								  </div>
							   </div>
							</div>
							<div className="air-form-message form-message-error"
							   style={{ display: error.certifactionerror !== '' ? 'flex' : 'none' }}
							>
								<div className="air-icons">
									<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
								</div>
								<span>{error.certifactionerror}</span>
							</div>
						</div>
						</div>
						<div className="skill-cate-text">
							<div className="cate-with-text">
								<span className="d-flex align-items-center" onClick={() => clearAllSelection()}>
									<img className="img-fluid" src="/assets/images/skill-cate-icon.svg" alt="" title="" /> 
									<span>Clear Values</span>
								</span>
							</div>
						</div>
						</>
					)}
               </div>
		</Layout>
	);
}

export default Step4;
