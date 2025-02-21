import React, { useState, useEffect, useRef } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";


interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const EditProfileImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose }) => {
	const imageref = useRef<HTMLInputElement>(null);
	const [selectedimage, setSelectedImage] = useState<File | null>(null);
	const [selectedpreview, setSelectedPreview] = useState<string | null>(null);
	const [submiting, setSubmitting] = useState(false);
	
	/*Handle Profile Image Upload*/
	
	useEffect(() => {
        if (!selectedimage) {
            //setPreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(selectedimage)
        setSelectedPreview(objectUrl);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedimage])
	
	const handleImageClick = () => {
		if (imageref.current) {
			imageref.current.click();
		}
	};
	
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			var regex = new RegExp("(.*?)\.(png|jpg|jpeg|bmp|gif)$");
			const file = e.target.files[0];
			if(!(regex.test(file.name))) {
				alert('Please select a valid from png | jpg | jpeg | bmp | gif file.');
				return;
			}
			if (file.size > 5 * 1024 * 1024) {
				alert('File size should not exceed 5MB.');
				return;
			}
			setSelectedImage(e.target.files[0]);
		}
	};
	
	const handleSubmit = async (): Promise<void> => {
		try {
			setSubmitting(true);
			let formData = new FormData();
			// Check if resumefile is not null before appending
			if (selectedimage) {
			  formData.append('profile_image', selectedimage);
			} else {
			  console.error('No file selected');
			  alert('No file selected to upload');
			  // You can handle this case by showing an error or preventing form submission
			}
			const response: any = await axiosInstance({
						url: 'save-profile-image', 
						method: "POST",
						data: formData,
						headers: {
						  "Content-Type": "multipart/form-data",
						},
					});
			//console.log('response', response);
			if(response.error === 'false'){
				setSelectedImage(null);
				setSelectedPreview(null);
				onClose();
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setSubmitting(false);
		}
	};
	
	
	const handleClose = (e: React.MouseEvent) => {
		onClose();
		/*if (updated) {
			const result = window.confirm('Closing the modal will lose your changes?');
			if (result) onClose();
		} else {
			onClose();
		}*/
	};
	//console.log('error', error)
	return (
		<div id="edit-profile-image-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
               <div className="airModal-header">
					<h2 className="airModal-title h2">Edit photo</h2>
					<button className="airModal-close" type="button" onClick={handleClose}>
						<div className="air-icon" data-test="close-button">
							<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
						</div>
					</button>
               </div>
               <div className="airModal-body">
                  <div className="modal-resume-content">
                     <div className="profile-image-input">
							{selectedpreview ? (
								<img src={selectedpreview} alt="profile-image" />
							) : (
								<label className="profile-image-label" onClick={() => handleImageClick()}>
								Attach or Drop<br /> photo here
								</label>
							)}
						
                        <input id="profile-image-crop-label" type="file" accept="image/*" name="imageUpload" 
						className="up-profile-image" ref={imageref} onChange={handleImageChange} />
                     </div>
                     <div className="profile-image-input-text">
                        <div id="profile-image-desc"> 250x250 Min <span className="sr-only">size</span>/ 5 MB Max<span className="sr-only">size</span></div>
                     </div>
                  </div>
               </div>
               <div className="modal-two-btns d-flex align-items-center justify-space-between">
					<button type="button" className="air-btns btns-text-light" onClick={handleClose}>Cancel</button>
					<button type="button" className="air-btns btns-primary" onClick={handleSubmit}>
						{submiting ? <ButtonLoader /> : 'Save'}
					</button>
               </div>
            </div>
         </div>
      </div>
	);
};
