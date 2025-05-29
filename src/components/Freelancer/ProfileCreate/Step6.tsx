import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import ButtonLoader from '../../Common/ButtonLoader';
import { AddQualificationModal } from './AddQualificationModal'; 
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";
import Loader from '../../Common/Loader';

const MySwal = withReactContent(Swal);

interface Qualification {
	id: number;
	school: string;
	degree: string;
	field_of_study: string;
	start_date_attended: string;
	end_date_attended: string;
	description: string;
}

function Step6() {
	const navigate = useNavigate();
	const [qualificationmodal, setQualificationModal] = useState<boolean>(false);
	const [qualifications, setQualifications] = useState<Qualification[]>([]);
	const [selectedrecord, setSelectedRecord] = useState<Qualification>({
		id: 0,
		school: '',
		degree: '',
		field_of_study: '',
		start_date_attended: '',
		end_date_attended: '',
		description: ''
	});
	const [loading, setLoading] = useState(true);
	const handleQualificationClick = () => {
		setQualificationModal(true);
	}
	
	//fetch the presaved data
	useEffect(() => {
		fetchPreData();
	}, []);
	
	useEffect(() => {
		if(!qualificationmodal){
			fetchPreData();
			setSelectedRecord({
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
	
	const fetchPreData = async () => {
			try {
				setLoading(true);
				const response: any = await axiosInstance({
						url: 'get-user-step-data',
						method: "POST",
						data: {name: 'step6'}
					});
				//console.log('get-user-step-data step 6', response)
				var user_education = response.data.details.user_education;
				if(user_education){
					setQualifications(user_education);
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 500);
			}
		};
	
	const moveAhead = () => {
		navigate("/freelancer/setup-profile-step-seven");
	};
	
	const editRecord = (record: Qualification) => {
		setSelectedRecord(record);
		setQualificationModal(true);
	}
	
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
		  // Call your function
		  deleteItem(id);
		} 
	};
	
	const deleteItem = async(id: number) => {
		console.log('Item deleted!');
		// Add your delete logic here
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'delete-freelancer-step-data',
					method: "POST",
					data: {type: 'education', delete_id: id}
				});
			//console.log('delete response', response)
			if(response.error === 'false'){
				MySwal.fire('Deleted!', 'Your item has been deleted.', 'success');
				fetchPreData();
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
                setLoading(false);
            }, 500);
		}
	};
  return (
	<>
		<Loader isLoading={loading} />
    <Layout backButton={true} pagetitle="" currentStep={6} issubmitting={false} getStarted={moveAhead}>
		<div className="air-wiz-body">
		  <div className="air-carousel-items">
			 <div id="step-item-6" className="air-step-items">
				<div className="step-title-container">
				   <h2>Add your Education</h2>
				   <h5 className="step-subtitle">Give us a little about your history.</h5>
				</div>
				<div className="education-items">
				   <div className="education-item-boxs">
						{qualifications.length > 0 ? (
							<>
							{qualifications.map(qualification => (
							  <div key={qualification.id} className="employment-details-fill">
								 <div className="air-card-boxs">
									<div className="card-content-block d-flex">
									   <div className="air-illustration-icon">
										  <img className="img-fluid" src="/assets/images/education-filled-icon.svg" alt="" title="" />
									   </div>
									   <div className="pl-items">
										  <div className="air-line-clamp-wrapper">
											 <div className="air-line-title">
												<h4 className="title-experience">{qualification.school}</h4>
											 </div>
										  </div>
										  <div className="air-line-clamp-wrapper">
											 <div className="air-content-info">
												<span className="degree-info">{qualification.degree}</span><br />
												<span className="area-of-study">{qualification.field_of_study}</span> <br />
												<span className="period-info">{qualification.start_date_attended+'-'+qualification.end_date_attended }</span>
											 </div>
										  </div>
										  <div className="description-text-light">
											 <p>{qualification.description}</p>
										  </div>
									   </div>
									</div>
									<div className="actions-btns">
										<button type="button" className="edit-items" onClick={() => editRecord(qualification)}>
											<img className="img-fluid" src="/assets/images/edit-icon.svg" alt="" title="" />
										</button>
										<button type="button" className="delete-items" onClick={() => handleDelete(qualification.id)}>
											<img className="img-fluid" src="/assets/images/delete-icon.svg" alt="" title="" />
										</button>
									</div>
								 </div>
							  </div>
							))}
							</>
						) : (
							null
						)}
					  <div className="employment-experience-boxs">
						 <div className="experience-link-items" onClick={() => handleQualificationClick()}>
							<div className="icon-with-text">
							   <button type="button" className="btnsSecondary-inverted">
								  <div className="airIcon">
									 <img className="img-fluid" src="/assets/images/white-plus-icon.svg" alt="" title="" />
								  </div>
							   </button>
							   <h4 className="experience-label">Add Education</h4>
							</div>
						 </div>
					  </div>
					  </div>
				   </div>
				</div>
			 </div>
		</div>
	    <AddQualificationModal selected={selectedrecord} isOpen={qualificationmodal} onClose={() => setQualificationModal(false)} />
	</Layout>
	</>
  );
}

export default Step6;
