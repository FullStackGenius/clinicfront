import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserFromAPI } from '../../redux/userSlice'; // Replace with the correct path
import type { AppDispatch } from '../../redux/store';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AuthLayout from '../layouts/AuthLayout';
import ButtonLoader from '../Common/ButtonLoader';
import ContentLoader from '../Common/ContentLoader';
import Header from '../layouts/partials/Header';
import FeaturedProject from './ViewProfilePartials/FeaturedProject';
import RatingStarSection from './ViewProfilePartials/RatingStarSection';
import SearchSection from './ViewProfilePartials/SearchSection';
import ReviewSection from './ViewProfilePartials/ReviewSection';
import { EditUserNameModal } from './ProfileEdit/EditUserNameModal';
import { EditSkillsModal } from './ProfileEdit/EditSkillsModal';
import { EditSubCategoryModal } from './ProfileEdit/EditSubCategoryModal';
import { EditProfileModal } from './ProfileEdit/EditProfileModal';
import { EditHourlyRateModal } from './ProfileEdit/EditHourlyRateModal';
import { EditLanguageModal } from './ProfileCreate/EditLanguageModal';
import { EditProfileTitleModal } from './ProfileEdit/EditProfileTitleModal';
import { EditProfileBioModal } from './ProfileEdit/EditProfileBioModal';
import { EditProfileImageModal } from './ProfileEdit/EditProfileImageModal';
import { AddQualificationModal } from './ProfileCreate/AddQualificationModal'; 
import { AddExperianceModal } from './ProfileCreate/AddExperianceModal';
import { UploadResumeModal } from './ProfileCreate/UploadResumeModal'; 
import { ProfileSocialShareModal } from './ProfileEdit/ProfileSocialShareModal'; 
import axiosInstance from "../../_helpers/axiosInstance";
import helpers from "../../_helpers/common";
import { getUserInfo } from "../../_helpers/getUserInfo";
import { checkUserLoggedIn } from "../../_helpers/checkUserLoggedIn";

const MySwal = withReactContent(Swal);

interface Resume {
  id: number;
  resume_path: string;
  resume_url: string;
}

interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

interface Skill {
  id: number;
  name: string;
}

interface Experiance {
	id: number;
	title: string;
	company: string;
	location: string;
	country_name: string;
	country_id: string;
	currently_working: string;
	start_month: string;
	start_year: string;
	end_month: string;
	end_year: string;
	description: string;
}

interface Qualification {
	id: number,
	school: string;
	degree: string;
	field_of_study: string;
	start_date_attended: string;
	end_date_attended: string;
	description: string;
}


interface Profile {
	date_of_birth: string;
	street_address: string;
	apt_suite: string;
	city: string;
	state_provience: string;
	zip_postalcode: string;
	phone_number: string;
	country: string;
}

interface Language {
	id: number;
	language_id: number;
	language_name: string;
	language_proficiency_id: number;
	Language_proficiencey_name: string;
}

function ViewProfile() {
	const navigate = useNavigate();
	const segment  = useParams();
	const dispatch = useDispatch<AppDispatch>();
	//console.log('segment', segment)
	const currentUrl = window.location.href;
	
	const [loading, setLoading] = useState(false);
	const [resume, setResume] = useState<Resume>({id: 0, resume_path: '', resume_url: ''});
	const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
	const [skills, setSkills] = useState<Skill[]>([]);
	const [profiletitle, setProfileTitle] = useState('');
	const [experiances, setExperiances] = useState<Experiance[]>([]);
	const [qualifications, setQualifications] = useState<Qualification[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [aboutyourself, setAboutyourself] = useState('');
	const [hourlyrate, setHourlyRate] = useState('0');
	const [profile, setProfile] = useState<Profile | null>(null);
	const [profileimage, setProfileImage] = useState('');
	const [username, setUserName] = useState('');
	const [usernamemodal, setUserNameModal] = useState(false);
	const [resumemodal, setResumeModal] = useState(false);
	const [skillmodal, setSkillModal] = useState(false);
	const [profiletitlemodal, setProfileTitleModal] = useState(false);
	const [profilebiomodal, setProfileBioModal] = useState(false);
	const [categorymodal, setCategoryModal] = useState(false);
	const [profilemodal, setProfileModal] = useState(false);
	const [hourlyratemodal, setHourlyRateModal] = useState(false);
	const [languagemodal, setLanguageModal] = useState(false);
	const [qualificationmodal, setQualificationModal] = useState(false);
	const [editqualification, setEditQualification] = useState<Qualification>({
		id: 0,
		school: '',
		degree: '',
		field_of_study: '',
		start_date_attended: '',
		end_date_attended: '',
		description: ''
	});
	
	const [sharemodal, setShareModal] = useState(false);
	const [experiancemodal, setExperianceModal] = useState(false);
	const [imagemodal, setImageModal] = useState(false);
	const [editexperiance, setEditExperiance] = useState<Experiance>({
		id: 0,
		title: '',
		company: '',
		location: '',
		country_name: '',
		country_id: '',
		currently_working: '',
		start_month: '',
		start_year: '',
		end_month: '',
		end_year: '',
		description: ''
	});
	const [editlanguage, setEditLanguage] = useState<Language>({
		id: 0,
		language_id: 0,
		language_name: '',
		language_proficiency_id: 0,
		Language_proficiencey_name: '',
	});
	const hasFetchedData = useRef(false);
	
	useEffect(() => {
		//console.log('fetch questio use effect')
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			fetchStepQuestions();
		}
	}, []);
	
	useEffect(() => {
		if(!qualificationmodal){
			setEditQualification({
				id: 0,
				school: '',
				degree: '',
				field_of_study: '',
				start_date_attended: '',
				end_date_attended: '',
				description: ''
			});
		}
	}, [qualificationmodal]);
	
	const fetchStepQuestions = async () => {
		try {
			setLoading(true);
			/*const response: any = await axiosInstance({
					url: 'get-user-step-data',
					method: "POST",
					data: {name: 'all'}
				});*/
			const response: any = await axiosInstance({
					url: 'get-user-step-data-profile',
					method: "POST",
					data: {user_id: segment.user_id, name: 'all'}
				});
			//console.log('get-user-step-data', response)
			var details = response.data.details;
			if(details.step1.resume){
				setResume(details.step1.resume);
			}
			if(details.step2.sub_category){
				setSubCategories(details.step2.sub_category);
			}
			if(details.step3.skills){
				setSkills(details.step3.skills);
			}
			if(details.step4.user_details.profile_headline){
				setProfileTitle(details.step4.user_details.profile_headline);
			}
			if(details.step5.user_experiences){
				setExperiances(details.step5.user_experiences);
			}
			if(details.step6.user_education){
				setQualifications(details.step6.user_education);
			}
			if(details.step7.language){
				var user_language = details.step7.language.user_language;
				setLanguages(user_language);
			}
			if(details.step8.user_details.about_yourself){
				setAboutyourself(details.step8.user_details.about_yourself);
			}
			if(details.step9.user_details.hourly_rate){
				setHourlyRate(details.step9.user_details.hourly_rate);
			}
			if(details.step10.user_details){
				//console.log('details.step10.user_details', details.step10.user_details)
				setProfile(details.step10.user_details);
				setProfileImage(details.step10.profile_image_path)
				let full_name = details.step10.name.charAt(0).toUpperCase() + details.step10.name.slice(1).toLowerCase() +' '+ details.step10.last_name
				//let full_name = details.step10.name +' '+ details.step10.last_name
				setUserName(full_name)
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	useEffect(() => {
        fetchStepQuestions();
		//handleFetchUser ();
    }, [experiancemodal, qualificationmodal, languagemodal, hourlyratemodal, profilemodal, categorymodal, profilebiomodal, profiletitlemodal, skillmodal, resumemodal, imagemodal, usernamemodal])

	useEffect(() => {
        //fetchStepQuestions();
		handleFetchUser ();
    }, [usernamemodal, imagemodal])
	
	const handleDelete = async (id: number, item_type: string) => {
		
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
		  // Call your function
		  deleteItem(id, item_type);
		} 
	};
	
	const deleteItem = async(id: number, item_type: string) => {
		console.log('Item deleted!');
		// Add your delete logic here
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'delete-freelancer-step-data',
					method: "POST",
					data: {type: item_type, delete_id: id}
				});
			//console.log('delete response', response)
			if(response.error === 'false'){
				MySwal.fire('Deleted!', 'Your item has been deleted.', 'success');
				fetchStepQuestions();
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	const editQualification = (record: Qualification) => {
		setEditQualification(record);
		setQualificationModal(true);
	}
	
	const editExperiance = (record: Experiance) => {
		setEditExperiance(record);
		setExperianceModal(true);
	}
	
	const editLanguage = (record: Language) => {
		setEditLanguage(record);
		setLanguageModal(true);
	}
	
	const showControl = () => {
		const active_user = getUserInfo('id'); // Assuming this returns a string or undefined
		const current_user_id = String(segment.user_id); // Convert user_id to a string
		//console.log('active_user', active_user);
		//console.log('current_user_id', current_user_id);
		if(active_user){
			return current_user_id.toString() === active_user.toString() ? true : false;
		}
		return false;
		
	}
	
	//when we update user profile data then we must update local storage data
	const handleFetchUser  = () => {
		const loggedIn = checkUserLoggedIn();
		if(loggedIn){
			dispatch(fetchUserFromAPI());
		}
	};
	
	return (
		<AuthLayout>
			<Header />
			<section className="project-details-section" style={{ position: 'relative' }}>
				 <div className="main-container">
					<div className="pr-details-ingo d-flex flex-wrap">
						{loading && (
							<div className="loader-wrapper-content">
								<ContentLoader />
							</div>
						)}
					   <div className="colm-8 pr-content-colm">
						  <div className="about-project-info">
							 <div className="user-top-info-sec">
								<div className="pr-user-badge d-flex flex-wrap align-items-center">
								   <div className="pr-badge-image">
										<img className="img-fluid" src={profileimage} alt="" title="" />
										{showControl() && (
											<button className="edit_Link" type="button" onClick={() => setImageModal(true)}>
												<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
											</button>
										)}
								   </div>
									
								   <div className="pr-user-badge-text">
										<div className="icon-title-wrapper-items d-flex align-items-center">
										<h1>{username}</h1>
										{showControl() && (
											<button className="edit_Link" onClick={() => setUserNameModal(true)}>
												<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
											</button>
										)}
									</div>
									  
									  <div className="pr-fl-rating d-flex align-items-center">
										 <span className="fl-rating-text">Exelent 4.9</span> <span className="fl-rating-icon"><img className="img-fluid" src="/assets/images/exelent-rating-icon.svg" alt="" title="" /></span>
									  </div>
									  <div className="user-badge-quality d-flex align-items-center">
										 <span><img className="img-fluid" src="/assets/images/top-pro-icon.svg" /></span>Top Pro
									  </div>
									  <div className="pr-share-btns d-flex align-items-center flex-wrap">
										 <button className="share-btns" type="button" onClick={() => setShareModal(true)}><img className="img-fluid" src="/assets/images/share-icon.svg" alt="" title="" /> Share</button>
									  </div>
								   </div>
								</div>
								<div className="pr-user-intros">
									<div className="icon-title-wrapper-items d-flex align-items-center">
										<h3>{profiletitle}</h3>
										{showControl() && (
											<button className="edit_Link" onClick={() => setProfileTitleModal(true)}>
												<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
											</button>
										)}
									</div>
								   <div className="d-flex justify-space-between profile-bio-content">
										<p>{aboutyourself}</p>
										{showControl() && (
											<button className="edit_Link" type="button" onClick={() => setProfileBioModal(true)}>
												<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
											</button>
										)}
								   </div>
								</div>
							 </div>
							 <div className="pr-overview-infos">
								<div className="d-flex flex-wrap pr-payment-info-sec">
								   <div className="colm-6">
									  <div className="all-profile-info-sec left-info-contents">
											
										<div className="profile-resume-btns">
											{resume.id > 0 && (
											<Link className="view-resume-btns outline-border-btns" to={resume.resume_path} target={'_blank'}> View Resume</Link>
											)}
											{showControl() && (
												<button className="change-resume-btns bg-back-btns" type="button" onClick={() => setResumeModal(true)}> Change Resume</button>
											)}
										</div>
											
										 <div className="certifications-specialities-items">
											<div className="icon-title-wrapper-items d-flex align-items-center justify-space-between">
												<h4>Specialties</h4>
												{showControl() && (
													<div className="edit_Link" onClick={() => setCategoryModal(true)}>
														<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
													</div>
												)}
											</div>
											{subcategories.length > 0 ? (
												<ul>
													{subcategories.map(subcat => (
														<li key={subcat.id}>{subcat.name}</li>
													))}
												</ul>
											) : (
												null
											)}
										 </div>
										 <div className="accountant-specialities-items">
											<div className="icon-title-wrapper-items d-flex align-items-center justify-space-between">
											   <h4>Skills</h4>
											   {showControl() && (
													<div className="edit_Link" onClick={() => setSkillModal(true)} >
														<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
													</div>
												)}
											</div>
											{skills.length > 0 ? (
												<ul>
													{skills.map(skill => (
														<li key={skill.id}>{skill.name}</li>
													))}
												</ul>
											) : (
												null
											)}
										 </div>
										 <div className="profile-experience-info">
											<div className="icon-title-wrapper-items d-flex align-items-center justify-space-between">
												<h4>Experience</h4>
												{showControl() && (
													<button className="plus_link outline-icon-btn" type="button" onClick={() => setExperianceModal(true)}>
														<img className="img-fluid" src="/assets/images/plus-pink-icon.svg" alt="" title="" />
													</button>
												)}
											</div>
											<div className="experience_infos">
												{experiances.length > 0 ? (
													<ul>
														{experiances.map(experiance => (
														  <li key={experiance.id} className="d-flex justify-space-between">
															<div>
																<h5 className="tille-text">{experiance.title}</h5>
																<div className="text-light-info">{experiance.company}</div>
																<div className="text-light-on-info">{experiance.start_month+'-'+experiance.start_year +'/'+experiance.end_month+'-'+experiance.end_year}</div>
																<div className="text-light-on-info">{experiance.description}</div>
															</div>
															{showControl() && (
																<div className="d-flex two-icon-btns">
																	<button className="edit_Link outline-icon-btn" type="button" onClick={() => editExperiance(experiance)}>
																		<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
																	</button>
																	<button className="delete_link outline-icon-btn" type="button" onClick={() => handleDelete(experiance.id, 'experience')}>
																		<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
																	</button>
																</div>
															)}
														  </li>
														))}
													</ul>
												) : (
													null
												)}
											</div>
										 </div>
									  </div>
								   </div>
								   <div className="colm-6">
									  <div className="payment-content-div">
										 <div className="all-profile-info-sec">
											<div className="profile-experience-info">
											   <div className="icon-title-wrapper-items d-flex align-items-center justify-space-between">
													<h4>Education</h4>
													{showControl() && (
														<button className="plus_link outline-icon-btn" type="button" onClick={() => setQualificationModal(true)}>
															<img className="img-fluid" src="/assets/images/plus-pink-icon.svg" alt="" title="" />
														</button>
													)}
											   </div>
											   <div className="experience_infos">
											   {qualifications.length > 0 ? (
													<ul>
														{qualifications.map(qualification => (
														  <li key={qualification.id} className="d-flex justify-space-between">
															 <div>
																<h5 className="tille-text">{qualification.school}</h5>
																<div className="text-light-info">{qualification.degree}</div>
																<div className="text-light-info">{qualification.field_of_study}</div>
																<div className="text-light-on-info">{qualification.start_date_attended+'-'+qualification.end_date_attended }</div>
																<div className="text-light-on-info">{qualification.description}</div>
															 </div>
															{showControl() && ( 
																<div className="d-flex two-icon-btns">
																	<button className="edit_Link outline-icon-btn" type="button" onClick={() => editQualification(qualification)}>
																		<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
																	</button> 
																	<button className="delete_link outline-icon-btn" type="button" onClick={() => handleDelete(qualification.id, 'education')}>
																		<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
																	</button>
																</div>
															)}
														  </li>
														))}
													</ul>
												) : (
													null
												)}
											   </div>
											</div>
											<div className="language-experience-info">
											   <div className="icon-title-wrapper-items d-flex align-items-center justify-space-between">
												  <h4>Language</h4>
													{showControl() && (
														<div className="d-flex two-icon-btns">
															<button className="plus_link outline-icon-btn" type="button" onClick={() => setLanguageModal(true)}>
																<img className="img-fluid" src="/assets/images/plus-pink-icon.svg" alt="" title="" />
															</button>
														</div>
													)}
											   </div>
											   <div>
												 {languages.length > 0 ? (
													<ul>
													  {languages.map(item => (
														<li key={item.id}>
															 <div className="d-flex justify-space-between align-items-center">
																<div>
																   <strong>{item.language_name}:</strong> {item.Language_proficiencey_name}
																</div>
																{showControl() && ( 
																<div className="d-flex two-icon-btns">
																	<button className="edit_Link outline-icon-btn" type="button" onClick={() => editLanguage(item)}>
																		<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
																	</button> 
																	<button className="delete_link outline-icon-btn" type="button" onClick={() => handleDelete(item.id, 'language')}>
																		<img className="img-fluid" src="/assets/images/delete-color-icon.svg" alt="" title="" />
																	</button>
																</div>
																)}
															 </div>
														</li>
													  ))}
													</ul>
												  ) : (
													null
												  )}
												</div>  
											</div>
											<div className="profile-experience-content">
												<div className="icon-title-wrapper-items d-flex align-items-center justify-space-between">
													<h4>Profile Info</h4>
													{showControl() && (
														<button className="edit_Link" type="button" onClick={() => setProfileModal(true)}>
															<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
														</button>
													)}
											   </div>
											   {profile ? (
											   <ul>
												  <li><strong>Date of Birth:</strong> {profile?.date_of_birth}</li>
												  <li><strong>Country:</strong> {profile?.country}</li>
												  <li><strong>Street Address:</strong> {profile?.street_address}</li>
												  <li><strong>Apt/Suite:</strong> {profile?.apt_suite}</li>
												  <li><strong>City:</strong> {profile?.city}</li>
												  <li><strong>Stat Province:</strong> {profile?.state_provience}</li>
												  <li><strong>Zip Postal Code:</strong>{profile?.zip_postalcode} </li>
												  <li><strong>Phone Number:</strong> {profile?.phone_number}</li>
											   </ul>
											   ) : (
											      null
											   )}
											</div>
										 </div>
									  </div>
								   </div>
								</div>
								<div className="overview-two-btns">
								   <div className="d-flex align-items-center view-btns-items justify-space-between">
									  <a className="btn msg-btn" href="#"><span><img className="img-fluid" src="/assets/images/message-icon.svg" alt="" title="" /></span>Message</a>
									  <a className="btn call-btn" href="#"><span><img className="img-fluid" src="/assets/images/call-icon.svg" alt="" title="" /></span>Request  a call</a>
								   </div>
								</div>
							 </div>
						  </div>
					   </div>
					   <div className="colm-4 pr-sidebar-colm">
						  <div className="pr-detail-sidebar">
							 <div className="pr-sidebar-boxs">
								<div className="custom-title-and-description">
									<div className="icon-title-wrapper-items d-flex align-items-center justify-space-between">
										<h3>${hourlyrate}/Hour</h3>
										{showControl() && (
											<button className="edit_Link" type="button" onClick={() => setHourlyRateModal(true)}>
												<img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" />
											</button>
										)}
									</div>
								</div>
								<div className="pr-gurantee-boxs">
								   <div className="pr-gurantee-img-boxs d-flex align-items-center">
									  <span className="gurantee-icon"> <img className="img-fluid" src="/assets/images/gurantee-icon.svg" alt="" title="" /></span>
									  <h3>Our Guarantee</h3>
								   </div>
								   <p>We stand by our accountants. No work is paid for that is not completed as agreed.</p>
								</div>
								
								<div className="availiblity-btns">
								   <a href="#">Check Availiblity</a>
								</div>
								<div className="response-message d-flex align-items-center justify-content-center">
								   <span className="message-icon"><img src="/assets/images/comment-icon.svg" alt="" title="" /></span>
								   <p>Respont in about <strong>1 hour</strong></p>
								</div>
								<div className="overview-content-div">
								   <h3>Overview</h3>
								   <div className="overview-listing">
									  <ul>
										 <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/current-pro-icon.svg" alt="" title="" /></span> <span className="over-list-text">Current top pro</span></li>
										 <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/trophy-icon.svg" alt="" title="" /></span> <span className="over-list-text">Hire 171 times</span></li>
										 <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/over-location-icon.svg" alt="" title="" /></span> <span className="over-list-text">6 Similar jobs near you</span></li>
										 <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/user-checked-icon.svg" alt="" title="" /></span> <span className="over-list-text">Background Checked</span></li>
										 <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/employ-icon.svg" alt="" title="" /></span> <span className="over-list-text">1 Employ</span></li>
										 <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/time-line-icon.svg" alt="" title="" /></span> <span className="over-list-text">2 years in bussiness</span></li>
									  </ul>
								   </div>
								</div>
							 </div>
						  </div>
					   </div>
					</div>
				 </div>
			  </section>
			{/*Featured Section*/}
			<FeaturedProject />
			<section id="pr-reviews-section">
				<div className="main-container">
					<div className="pr-reviews-content">
						<div className="distribution-by-stars">
							<RatingStarSection />
							<SearchSection />
						</div>
					</div>
					<ReviewSection />	
				</div>
			</section>
			{/*Social Share Modal*/}
			<ProfileSocialShareModal url={currentUrl} title={profiletitle} description={aboutyourself} isOpen={sharemodal} onClose={() => setShareModal(false)}  />
			 {/*Edit User Name Modal*/}
			<EditUserNameModal isOpen={usernamemodal} onClose={() => setUserNameModal(false)}  />
			 {/*Edit User Image Modal*/}
			<EditProfileImageModal isOpen={imagemodal} onClose={() => setImageModal(false)}  />
			{/*Edit User Resume Modal*/}
			<UploadResumeModal isOpen={resumemodal} onClose={() => setResumeModal(false)}  />
			{/*Edit User Title Modal*/}
		    <EditProfileTitleModal isOpen={profiletitlemodal} onClose={() => setProfileTitleModal(false)}/>
			{/*Edit User Bio Modal*/}
		    <EditProfileBioModal isOpen={profilebiomodal} onClose={() => setProfileBioModal(false)}/>
			{/*Edit User Skills Modal*/}
		    <EditSkillsModal isOpen={skillmodal} onClose={() => setSkillModal(false)}/>
			{/*Edit User Subcategory Modal*/}
		    <EditSubCategoryModal isOpen={categorymodal} onClose={() => setCategoryModal(false)}/>
			{/*Edit User Profile Modal*/}
		    <EditProfileModal isOpen={profilemodal} onClose={() => setProfileModal(false)}/>
			{/*Edit User Hourly Rate Modal*/}
		    <EditHourlyRateModal isOpen={hourlyratemodal} onClose={() => setHourlyRateModal(false)}/>
			{/*Edit User Language Modal*/}
		    <EditLanguageModal selected={editlanguage} isOpen={languagemodal} onClose={() => setLanguageModal(false)}/>
			{/*Edit User Qualifiaction Modal*/}
			<AddQualificationModal selected={editqualification} isOpen={qualificationmodal} onClose={() => setQualificationModal(false)} />
			{/*Edit User Experiance Modal*/}
			<AddExperianceModal selected={editexperiance} isOpen={experiancemodal} onClose={() => setExperianceModal(false)}  />
		</AuthLayout>
	);
}

export default ViewProfile;
