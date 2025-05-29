import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { setProject } from '../../../redux/projectSlice';
import Layout from './Layout';
import ContentLoader from '../../Common/ContentLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";
import JoditEditor from 'jodit-react';
import Loader from '../../Common/Loader';


function Step3() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const project = useSelector((state: RootState) => state.project.project);
	const [projectrequirment, setProjectRequirment] = useState('');
	const [error, setError] = useState<string>('');
	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(true);
	const editor = useRef(null);
	useEffect(() => {
		if(project && project.description){
			fetchProjectDetails(project.id);
			//setProjectRequirment(String(project.description));
		}
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [project]);

	const [placeholder, setPlaceholder] = useState<string>("Describe what you need");

	// Jodit Editor Configuration
	const config = useMemo(
	  () => ({
		readonly: false,
		placeholder: (projectrequirment)?placeholder:"",
		askBeforePasteHTML: false, //  Disable paste confirmation popup
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_clear_html" as const, //  Fix TypeScript error
        pasteHTMLActionList: [
            { value: "insert", text: "Insert" },
            { value: "insert_clear_html", text: "Insert Clean HTML" },
            { value: "insert_only_text", text: "Insert as Text" }
        ],
        toolbarAdaptive: false,
		height: 350,
        disablePlugins: "about",
		buttons: [
            "bold", "italic", "underline", "strikethrough", 
            "|",
            "ul", "ol", 
            "|",
            "link", "image", 
            "|",
            "align", "undo", "redo"
        ],
	  }),
	  [placeholder]
	);
	
	const handleChange = (newContent: string) => {	
		// const { name, value } = e.target;
		// let clean_val = value;
		// Update form data with calculated service_rate and income
		setProjectRequirment(newContent);
		// Clear error for this field if it exists
		setError('');
	};
	// Validate the form
	const validate = (): boolean => {
		if (projectrequirment === '') {
			setError('Project description is required');
			return false;
		}
		return true;
	};

	// Save data (simulated API call)
	const saveData = async (): Promise<void> => {
		//console.log('saved project', project)
		if (validate()) {
			try {
				setSubmitting(true);
				const response: any = await axiosInstance({
							url: 'project/save-project-desc', 
							method: "POST",
							data: {description : projectrequirment, project_id: project?.id}
						});
				//console.log('response', response);
				if(response.error === 'false'){
					dispatch(setProject(response.data.project));
					navigate(`/client/create-project-step-four`); // Navigate to next step
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				
					setTimeout(() => {
						
						setLoading(false);
					}, 500);
		
			}
		}
	};

	const fetchProjectDetails = async (id: number) => {
		try {
			setLoading(true)
		  // Ensure axiosInstance is properly configured
		  const response = await axiosInstance.post("project/get-project-detail", { project_id: id });
	  
		  // Ensure response exists before proceeding
		  if (!response || !response.data || !response.data.project) {
			throw new Error("Invalid response structure");
		  }
	  
		  const saved_data = response.data.project;
		  setProjectRequirment(String(saved_data.description));
		} catch (error) {
		  console.error("Error fetching project details:", error);
		}finally {
			setTimeout(() => {
				
				setLoading(false);
			}, 500);
		}
	  };
	  
	//console.log('projecttitle', projecttitle)
	return (
		<>
		<Loader isLoading={loading} />
		<Layout backButton={false} pagetitle="Describe your hiring needs" currentStep={3} issubmitting={submitting} getStarted={saveData}>
			<div className="hiring-jobForms">
				<div className="form-listing-text">
				 <h5>Be clear about</h5>
				 <ul>
					<li>Deliverables, what type of finished products will you be expecting?</li>
					<li>Timelines, is this something you need done within a certain time frame?</li>
					<li>Specialties, do you require the accountant to have experience?</li>
					<li>Certifications, are you looking for them to be accredited in certain areas?</li>
				 </ul>
				</div>	
			  <div className="hiring-forms-items">
				 <div className="form-group">
					<label>Describe what you need</label>
					<JoditEditor
			ref={editor}
			value={projectrequirment}
			onBlur={handleChange}
			className="form-control"
			config={config}
			
		/>
                     {/* <textarea name="message" className="form-control" style={{ textTransform: 'none'}} cols={30} rows={5} placeholder="Already have description ? paste it here"
						value={projectrequirment}
						onChange={() =>handleChange}
					></textarea> */}
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

export default Step3;
