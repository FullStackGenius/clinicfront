import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import Header from '../../layouts/partials/Header';
import ButtonLoader from '../../Common/ButtonLoader';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";
import { EditTitleModal } from '../UpdateProject/EditTitleModal';
import { EditDescriptionModal } from '../UpdateProject/EditDescriptionModal';
import { EditSkillModal } from '../UpdateProject/EditSkillModal';
import { EditSectorModal } from '../UpdateProject/EditSectorModal';
import { EditCertificationModal } from '../UpdateProject/EditCertificationModal';
import { EditProjectSizeModal } from '../UpdateProject/EditProjectSizeModal';
import { EditProjectDurationModal } from '../UpdateProject/EditProjectDurationModal';
import { EditProjectExperianceModal } from '../UpdateProject/EditProjectExperianceModal';

import Loader from '../../Common/Loader';

const MySwal = withReactContent(Swal);

interface ProjectScope {
	id: number;
	title: string;
	description: string;
	project_scope: number;
	project_duration: number;
	project_experience: number;
}

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


function Step7() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	const loaddata = useSelector((state: RootState) => state.common.loaddata);
	//console.log('saved project', project)
	const [projectData, setProjectData] = useState<ProjectScope>({ id: 0, title: '', description: '', project_scope: 0, project_duration: 0, project_experience: 0 });
	const [accountingcertifications, setAccountingCertifications] = useState<AccountingCertification[]>([]);
	const [accountingsector, setAccountingSector] = useState<AccountingSector[]>([]);
	const [accountingskill, setAccountingSkill] = useState<AccountingSkill[]>([]);
	const [duration, setDuration] = useState({id: 0, name: ''});
	const [experiance, setExperiance] = useState({id: 0, name: ''});
	const [scope, setScope] = useState({id: 0, name: ''});
	const [titlemodal, setTitleModal] = useState(false);
	const [descriptionmodal, setDescriptionModal] = useState(false);
	const [skillmodal, setSkillModal] = useState(false);
	const [sectormodal, setSectorModal] = useState(false);
	const [certificationmodal, setCertificationModal] = useState(false);
	const [sizemodal, setSizeModal] = useState(false);
	const [durationmodal, setDurationModal] = useState(false);
	const [experiencemodal, setExperienceModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [stateChangeTrigger, setStateChangeTrigger] = useState(false);
	
	useEffect(() => {
		if(project){
			fetchProjectDetails(Number(project.id));
		}else{
			setLoading(false); 
		}
	}, [project,titlemodal,descriptionmodal,skillmodal,sectormodal,certificationmodal,sizemodal,durationmodal,experiencemodal]);
	
	// useEffect(() => {
	// 	//fetchProjectDetails(36);
	// }, []);
	
	useEffect(() => {
		if(loaddata){
			if(project){
				fetchProjectDetails(Number(project.id));
			}
		}
	}, [loaddata,titlemodal,descriptionmodal,skillmodal,sectormodal,certificationmodal,sizemodal,durationmodal,experiencemodal]);
	

	const fetchProjectDetails = async (id: number) => {
	
		try {
			//setLoading(true);
			if (!stateChangeTrigger) {
				setLoading(true); // Show loader only on first load
			}
	
			// Ensure axiosInstance is properly configured
			const response = await axiosInstance.post("project/get-project-detail", { project_id: id });
	
			// Ensure response exists before proceeding
			if (!response || !response.data || !response.data.project) {
				throw new Error("Invalid response structure");
			}
	
			const saved_data = response.data.project;
			// console.log("saved_data", saved_data);
	
			// Update states using the previous state pattern
			setDuration((prev) => ({
				...prev,
				id: saved_data.project_duration?.id,
				name: saved_data.project_duration?.name,
			}));
	
			setExperiance((prev) => ({
				...prev,
				id: saved_data.project_experience?.id,
				name: saved_data.project_experience?.name,
			}));
	
			setScope((prev) => ({
				...prev,
				id: saved_data.project_scope?.id,
				name: saved_data.project_scope?.name,
			}));
	
			setAccountingCertifications(saved_data.accounting_certifications || []);
			setAccountingSector(saved_data.accounting_sectors || []);
			setAccountingSkill(saved_data.accounting_skills || []);
	
			setProjectData((prev) => ({
				...prev,
				id: saved_data.id,
				title: saved_data.title,
				description: saved_data.description,
				project_scope: saved_data.project_scope_id,
				project_duration: saved_data.project_duration_id,
				project_experience: saved_data.project_experience_id,
			}));
		} catch (error) {
			console.error("Error fetching project details:", error);
		} finally {
			setTimeout(() => {
				setStateChangeTrigger(true);
				setLoading(false);
			}, 500);
		}
	};
	
	const saveProjectStatus = async(status: number) => {
		try {
			setSubmitting(true);
			const response: any = await axiosInstance({
						url: 'project/edit-project-details', 
						method: "POST",
						data: {project_id: projectData.id, edit_type: 'projectStatus', project_status: status}
					});
					
			if(status === 3){
				MySwal.fire({
					title: `Success`,
					text: 'Thank You for posting the job',
					icon: 'success',
					showCloseButton: true,
					showConfirmButton: false,
					showCancelButton: false,
					timer: 1500, // Closes after 2 seconds
				});
				navigate("/client/my-jobs");
			}		
			if(status === 2){
				MySwal.fire({
					title: `Success`,
					text: 'Job save as draft',
					icon: 'success',
					showCloseButton: true,
					showConfirmButton: false,
					showCancelButton: false,
					timer: 1500, // Closes after 2 seconds
				});
				navigate("/client/my-jobs");
			}	
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setSubmitting(false);
		}
	}
	
	const handlePreviousStep = () => {
		navigate("/client/create-project-step-six");
	};
	
	return (
		<>
			<Loader isLoading={loading} />
		<Header />
		<section className="re-jobDetail-section light-bg-color">
         <div className="smallContainer">
            <div className="re-jobDetail-content">
				<div className="pr-forms-title-block">
					<h1>Review Job Details</h1>
				</div>
				<div className="book-work-items">
					<div className="d-flex align-items-center justify-space-between icon-title-wrapper">
						<h4 className="mb-2h">{projectData.title}</h4>
						<span className="edit_Link" onClick={() => setTitleModal(true) }>
							<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
						</span>
					</div>
				</div>
				<div className="text-work-block">
					<div className="d-flex align-items-center justify-space-between icon-title-wrapper">
					<p className="mp-2h" dangerouslySetInnerHTML={{ __html: projectData.description }}></p>
						{/* <p className="mp-2h">{projectData.description}</p> */}
						<span className="edit_Link" onClick={() => setDescriptionModal(true) }>
							<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
						</span>
					</div>
				</div>
				<div className="jobDetails-items d-flex flex-column">
					<div className="icon-title-wrapper">
						<div className="title-text-boxs d-flex align-items-center justify-space-between">
							<h4 className="mb-2h">Skills</h4>
							<span className="edit_Link" onClick={() => setSkillModal(true) }>
								<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/>
							</span>
						</div>
						{accountingskill && accountingskill.length > 0 ? (
							 <>
								{accountingskill.map((item,index) => (
									<p key={index} className="mp-2h">{item.name}</p>
								))}
							 </>
						) : (
							<p>No Skills Selected</p>
						)}
					</div>
					<div className="icon-title-wrapper">
						<div className="title-text-boxs d-flex align-items-center justify-space-between">
							<h4 className="mb-2h">Sectors</h4>
							<span className="edit_Link" onClick={() => setSectorModal(true)}>
								<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/>
							</span>
						</div>
						{accountingsector && accountingsector.length > 0 ? (
							 <>
								{accountingsector.map((item,index) => (
									<p key={index} className="mp-2h">{item.name}</p>
								))}
							 </>
						) : (
							<p>No Sector Selected</p>
						)}
					</div>
					<div className="icon-title-wrapper">
						<div className="title-text-boxs d-flex align-items-center justify-space-between">
							<h4 className="mb-2h">Certifications</h4>
							<span className="edit_Link" onClick={() => setCertificationModal(true) }>
								<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/>
							</span>
						</div>
						{accountingcertifications && accountingcertifications.length > 0 ? (
							 <>
								{accountingcertifications.map((item,index) => (
									<p key={index} className="mp-2h">{item.name}</p>
								))}
							 </>
						) : (
							<p>No Certification Selected</p>
						)}
					</div>
				{ false && 	<div className="icon-title-wrapper">
						<div className="title-text-boxs d-flex align-items-center justify-space-between">
							<h4 className="mb-2h">Project Size</h4>
							<span className="edit_Link" onClick={() => setSizeModal(true) }>
								<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/>
							</span>
						</div>
						<p className="mp-2h">{scope.name}</p>
					</div> }
					<div className="icon-title-wrapper">
						<div className="title-text-boxs d-flex align-items-center justify-space-between">
							<h4 className="mb-2h">Project Duration</h4>
							<span className="edit_Link" onClick={() =>  setDurationModal(true) }>
								<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/>
							</span>
						</div>
						<p className="mp-2h">{duration.name}</p>
					</div>
					<div className="icon-title-wrapper">
						<div className="title-text-boxs d-flex align-items-center justify-space-between">
							<h4 className="mb-2h">Experiance Required</h4>
							<span className="edit_Link" onClick={() => setExperienceModal(true)}>
								<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/>
							</span>
						</div>
						<p className="mp-2h">{experiance.name}</p>
					</div>
					</div>
					{/*
						<div className="reJob-faq">
						  <div className="air3-card-sec">
							 <div className="reJob-tp-items">
								<div className="reJob-title">
								   <h4 className="mb-2h">
									  <button id="cardButton-questions" type="button" className="collapse-toggle text-left-btns">
									  Screening question (optional) <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" /></span>
									  </button>
								   </h4>
								</div>
								<div className="ac-Panel">
								   <p>medion 3-6 month entry level not planning to hire full time</p>
								</div>
							 </div>
						</div>
						<div className="air3-card-sec">
							<div className="reJob-tp-items">
								<div className="reJob-title">
								   <h4 className="mb-2h">
									  <button id="cardButton-advanced-preferences" type="button" className="collapse-toggle text-left-btns">Advance preference (optional)<span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" /></span>
									  </button>
								   </h4>
								</div>
								<div className="ac-Panel">
								   <p>medion 3-6 month entry level not planning to hire full time</p>
								</div>
							</div>
						</div>
						<div className="air3-card-sec">
							<div className="reJob-tp-items">
								<div className="reJob-title">
								   <h4 className="mb-2h">
									  <button id="cardButton-job-preferences" type="button" className="collapse-toggle text-left-btns"> Job post preference (optional) <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" /></span>
									  </button>
								   </h4>
								</div>
								<div className="ac-Panel">
								   <p>medion 3-6 month entry level not planning to hire full time</p>
								</div>
							</div>
						</div>
					</div>*/}
					<div className="air3-card-footer">
					  <div className="d-flex align-items-center ft-btns-items">
						{submitting ? (
							<button className="post-job-air-btn bg-back-btns" type="button"><ButtonLoader /></button>
						) : (
							<>
							<div className="d-flex align-items-center left-btn-colm">
								<button className="back-air-btn outline-border-btns" type="button" onClick={() => handlePreviousStep()}>Back</button>
								<button className="draft-air-btn draft-border-btns" type="button" onClick={() => saveProjectStatus(2)}>Save as Draft</button>
							</div>
							<div className="right-btn-colm">
								<button className="post-job-air-btn bg-back-btns" type="button" onClick={() => saveProjectStatus(3)}>Post job</button>
							</div>
							</>
						)}
					  </div>
					</div>
				</div>
			</div>
		</section>
		{/*Edit Project Title Modal*/}
		<EditTitleModal id={projectData.id} title={projectData.title} isOpen={titlemodal} onClose={() => setTimeout(() => setTitleModal(false), 200) }/>
		{/*Edit Project Description Modal*/}
		<EditDescriptionModal id={projectData.id} description={projectData.description} isOpen={descriptionmodal} onClose={() => setTimeout(() => setDescriptionModal(false), 200) }/>
		{/*Edit Project Skill Modal*/}
		<EditSkillModal id={projectData.id} isOpen={skillmodal} onClose={() => setTimeout(() => setSkillModal(false), 200) }/>
		{/*Edit Project Sector Modal*/}
		<EditSectorModal id={projectData.id} isOpen={sectormodal} onClose={() => setTimeout(() => setSectorModal(false), 200) }/>
		{/*Edit Project Certification Modal*/}
		<EditCertificationModal id={projectData.id} isOpen={certificationmodal} onClose={() => setTimeout(() => setCertificationModal(false), 200) }/>
		{/*Edit Project Size Modal*/}
		<EditProjectSizeModal id={projectData.id} prescode={projectData.project_scope} isOpen={sizemodal} onClose={() => setTimeout(() => setSizeModal(false), 200) }/>
		{/*Edit Project Duration Modal*/}
		<EditProjectDurationModal id={projectData.id} prescode={projectData.project_duration} isOpen={durationmodal} onClose={() =>  setTimeout(() => setDurationModal(false), 200) }/>
		{/*Edit Project Experiance Modal*/}
		<EditProjectExperianceModal id={projectData.id} prescode={projectData.project_experience} isOpen={experiencemodal} onClose={() => setTimeout(() => setExperienceModal(false), 200) }/>
	</>
	);
}

export default Step7;
