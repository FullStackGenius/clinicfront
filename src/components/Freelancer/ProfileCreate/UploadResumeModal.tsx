import React, { useState, useRef } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const MySwal = withReactContent(Swal);
interface ResumeModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const UploadResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
	const [resumefile, setResume] = useState<File | null>(null);
	const [issubmitting, setSubmitting] = useState(false);
	const resumeref = useRef<HTMLInputElement>(null);
	
	if (!isOpen) return null;
	
	const handleResumeClick = () => {
		if (resumeref.current) {
			resumeref.current.click();
		}
	};
	
	const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			var regex = new RegExp("(.*?)\.(pdf|docx|doc)$");
			const file = e.target.files[0];
			if(!(regex.test(file.name))) {
				alert('Please select a valid from pdf|docx|doc file.');
				return;
			}
			if (file.size > 5 * 1024 * 1024) {
				alert('File size should not exceed 5MB.');
				return;
			}
			setResume(e.target.files[0]);
		}
	};
	
	const getResumeIcon = (name: string) => {
		let icon_type = helpers.getFileType(name);
		if(icon_type === 'pdf'){
			return '/assets/images/pdf-icon.png';
		}else{
			return '/assets/images/ms-word-icon.png';
		}
	}

	const handleClose = (e: React.MouseEvent) => {
		if(resumefile){
			const result = window.confirm('Closing the modal will loose your changes ?');
			if (result) {
				setResume(null);
				onClose();
			} else {
				// User clicked "Cancel"
				console.log('Action canceled');
			}
		}else{
			onClose();
		}
	};
	
	const handleSubmit = async (): Promise<void> => {
		try {
			setSubmitting(true);
			let formData = new FormData();
			// Check if resumefile is not null before appending
			if (resumefile) {
			  formData.append('resume', resumefile);
			} else {
			  console.error('No file selected');
			  alert('No file selected to upload');
			  // You can handle this case by showing an error or preventing form submission
			}
			const response: any = await axiosInstance({
						url: 'save-freelancer-resume', 
						method: "POST",
						data: formData,
						headers: {
						  "Content-Type": "multipart/form-data",
						},
					});
			//console.log('response', response);
			if(response.error === 'false'){
				MySwal.fire({
					title: "Success!",
					text: "Your Resume has been uploaded.",
					icon: "success",
					timer: 1500, // Closes after 2 seconds
					showConfirmButton: false,
				  });
				  
				setResume(null);
				onClose();
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div id="upload-resume-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none'}}>
			<div className="air-modal-items air-modal-import-resume-modal">
				<div className="airModal-content">
					<div className="airModal-header">
						<h2 className="airModal-title h2">Add your resume</h2>
						<button className="airModal-close" type="button" data-ev-label="modal_close">
							<div className="air-icon" data-test="close-button" onClick={(e) => handleClose(e)}>
								<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
							</div>
						</button>
					</div>
					<div className="airModal-body">
						<div className="modal-resume-content">
							<p className="text-info">Use a PDF, Word doc, or rich text file – make sure it’s 5MB or less.</p>
							<div className="upload-step-resume">
								<div className="label d-flex justify-content-center drop-area-boxs">
								
									<div className="text-resume-light" onClick={() => handleResumeClick()}>
										<div className="air-illustration-icon">
											<img className="img-fluid" src="/assets/images/upload-cv-icon.svg" alt="" title="" />
										</div>
										<p className="text-body-sm">Drag and drop or <span className="fe-upload-btn upload-btn"><a className="up-n-link" href="javascript:" data-ev-label="choose_file_link">choose file</a>
										<input type="file" accept=".pdf,.doc,.docx,.rtf" ref={resumeref} onChange={handleResumeChange}/></span></p>
									</div>
									{resumefile && (
										<div className="kb-attach-box">
											<div className="file-atc-box">
												<div className="file-image"> 
													<img className="img-responsive" src={getResumeIcon(resumefile.name)} alt="" title="" />
												</div>
												<div className="file-detail">
													<h6>{resumefile.name}</h6>
													<p>
														<span>Size : { resumefile.size > 1024 * 1024 ? (resumefile.size / (1024 * 1024)).toFixed(2) + ' MB' : (resumefile.size / 1024).toFixed(2) + ' KB' }</span> <br />
														<span className="left-ml">Modified Time : {helpers.convertTimestampToDateTime(resumefile.lastModified)}</span>
													</p>
													<div className="file-actions">
														<button type="button" className="file-action-btn" onClick={() => setResume(null)}>Delete</button>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="airModal-footer">
						<button
						  type="button"
						  className="air-btns-primary"
						  name="Continue"
						  value="Continue"
						  onClick={() => handleSubmit()}
						>
						  {!issubmitting ? (
							'Continue'
						  ) : (
							<ButtonLoader />
						  )}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
