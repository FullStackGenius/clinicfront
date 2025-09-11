import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Layout from './Layout';
import { AddExperianceModal } from './AddExperianceModal';
import axiosInstance from "../../../_helpers/axiosInstance";
import Loader from '../../Common/Loader';

const MySwal = withReactContent(Swal);

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

function Step5() {
	const navigate = useNavigate();
	const [experiancemodal, setExperianceModal] = useState<boolean>(false);
	const [experiances, setExperiances] = useState<Experiance[]>([]);
	const [selectedrecord, setSelectedRecord] = useState<Experiance>({
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
	const [loading, setLoading] = useState(true);
	const handleExperianceClick = () => {
		setExperianceModal(true);
	}

	useEffect(() => {
		fetchPreData();
	}, [experiancemodal]);

	//fetch the presaved data
	useEffect(() => {
		fetchPreData();
	}, []);

	useEffect(() => {
		if (!experiancemodal) {
			fetchPreData();
			setSelectedRecord({
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
		}
	}, [experiancemodal]);

	const fetchPreData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-user-step-data',
				method: "POST",
				data: { name: 'step5' }
			});
			var user_experiences = response.data.details.user_experiences;
			if (user_experiences) {
				setExperiances(user_experiences);
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
		navigate("/freelancer/setup-profile-step-six");
	};

	const editRecord = (record: Experiance) => {
		setSelectedRecord(record);
		setExperianceModal(true);
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
			deleteItem(id);
		}
	};

	const deleteItem = async (id: number) => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'delete-freelancer-step-data',
				method: "POST",
				data: { type: 'experience', delete_id: id }
			});
			if (response.error === 'false') {
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
			<Layout backButton={true} pagetitle="" currentStep={5} issubmitting={false} getStarted={moveAhead}>
				<div className="air-wiz-body">
					<div className="air-carousel-items">
						<div id="step-item-5" className="air-step-items">
							<div className="step-title-container">
								<h2>Employment History</h2>
								<h5 className="step-subtitle">Give us a little about your history.</h5>
							</div>
							<div className="education-items">
								<div className="education-item-boxs">
									{experiances.length > 0 ? (
										<>
											{experiances.map(experiance => (
												<div key={experiance.id} className="employment-details-fill">
													<div className="air-card-boxs">
														<div className="card-content-block d-flex">
															<div className="air-illustration-icon">
																<img className="img-fluid" src="/assets/images/education-filled-icon.svg" alt="" title="" />
															</div>
															<div className="pl-items">
																<div className="air-line-clamp-wrapper">
																	<div className="air-line-title">
																		<h4 className="title-experience">{experiance.title}</h4>
																	</div>
																</div>
																<div className="air-line-clamp-wrapper">
																	<div className="air-content-info">
																		<span className="company-info">{experiance.company}</span> |  <span className="period-info">{experiance.start_month + '-' + experiance.start_year}{(experiance?.end_month && experiance?.end_year) ? '/' + experiance.end_month + '-' + experiance.end_year : ''}
																		</span>
																	</div>
																	<div className="air-city-info">
																		<span className="city">{experiance.location},</span><span className="country">{experiance.country_name}</span>
																	</div>
																</div>
																<div className="description-text-light">
																	<p>{experiance.description}</p>
																</div>
															</div>
														</div>
														<div className="actions-btns">
															<button type="button" className="edit-items" onClick={() => editRecord(experiance)}>
																<img className="img-fluid" src="/assets/images/edit-icon.svg" alt="" title="" />
															</button>
															<button type="button" className="delete-items" onClick={() => handleDelete(experiance.id)}>
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
										<div className="experience-link-items" onClick={() => handleExperianceClick()}>
											<div className="icon-with-text">
												<button type="button" className="btnsSecondary-inverted">
													<div className="airIcon">
														<img className="img-fluid" src="/assets/images/white-plus-icon.svg" alt="" title="" />
													</div>
												</button>
												<h4 className="experience-label">Add Experience</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<AddExperianceModal selected={selectedrecord} isOpen={experiancemodal} onClose={() => setExperianceModal(false)} />
			</Layout>
		</>
	);
}

export default Step5;
