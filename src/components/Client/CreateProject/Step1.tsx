import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import axiosInstance from "../../../_helpers/axiosInstance";
import Loader from '../../Common/Loader';

interface ProjectType {
	id: number;
	name: string;
	description: string;
}

function Step1() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	const [projecttypes, setProjectTypes] = useState<ProjectType[]>([]);
	const [projecttype, setProjectType] = useState(0);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		fetchProjectTypes();
	}, []);

	useEffect(() => {
		if (project && project.project_type_id) {
			setProjectType(project.project_type_id);
		}
	}, [project]);

	const fetchProjectTypes = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-project-type',
				method: "GET"
			});
			setProjectTypes(response.data.project_type);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);

		}
	};

	// Validate the form
	const validate = (): boolean => {
		if (projecttype === 0) {
			setError('Please select project type');
			return false;
		}
		return true;
	};

	// Save data (simulated API call)
	const saveData = async (): Promise<void> => {
		if (!project) {
			if (validate()) {
				try {
					setSubmitting(true);
					const response: any = await axiosInstance({
						url: 'project/save-project-type',
						method: "POST",
						data: { project_type: projecttype }
					});
					if (response.error === 'false') {
						dispatch(setProject(response.data.poject));
						navigate(`/client/create-project-step-two`); // Navigate to next step
					}
				} catch (error) {
					console.error("Error in API request:", error);
				} finally {
					setSubmitting(false);
				}
			}
		} else {
			navigate(`/client/create-project-step-two`);
		}
	};
	return (
		<>
			<Loader isLoading={loading} />
			<Layout backButton={false} pagetitle="How can we help you get started ?" currentStep={1} issubmitting={submitting} getStarted={saveData}>
				<div className="project-accordions">
					<div className="accordionItem is-active">
						<h3 className="accordionThumb">I want to create a new job post
							<span className="acc-arrow">
								<img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" />
							</span>
						</h3>
						<div className="accordionPanel">
							<div className="box-radio-group">

								{projecttypes && projecttypes.length > 0 ? (
									<>
										{projecttypes.map((item, index) => (
											<div key={index} className="first-button-box">
												<div className="air3-radioBtn-box">
													<input className="form-check-input"
														type="radio"
														value={item.id}
														name="project-type"
														id="radio-group-1"
														checked={projecttype === item.id}
														onChange={(e) => setProjectType(item.id)}
													/>
													<div className="form-radio-bg">
														<div className="air3-radio-label-check-icon">
															<div className="air3-checkbox-input">
																<span className="air3-radio-icon">
																	<img className="img-fluid" src="/assets/images/active-check-icon.svg" alt="" title="" />
																</span>
															</div>
														</div>
														<div className="air3-icon-lg">
															{item.id === 1 ? (
																<img className="img-fluid" src="/assets/images/project-icons.svg" alt="" title="" />
															) : (
																<img className="img-fluid" src="/assets/images/short-term-icon.svg" alt="" title="" />
															)}
														</div>
														<div className="air3-btn-box-label">
															<h4>{item.name}</h4>
															<div className="air3-btn-box-text">{item.description}</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</>
								) : (
									<p>No Content Found</p>
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
			</Layout>

		</>


	);
}

export default Step1;
