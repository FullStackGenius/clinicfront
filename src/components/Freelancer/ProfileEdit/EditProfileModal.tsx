import React, { useState, useEffect, useRef } from "react";
import helpers from "../../../_helpers/common";
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";

interface ProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
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

interface Country {
	id: number;
	name: string;
}

export const EditProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState<Profile>({ date_of_birth: '', street_address: '', apt_suite: '', city: '', state_provience: '', zip_postalcode: '', phone_number: '', country: '' });
	const [countries, setCountries] = useState<Country[]>([]);
	const [profileimage, setProfileImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [errors, setErrors] = useState<Partial<Profile>>({});
	const [issubmiting, setSubmitting] = useState(false);
	const [submittingimage, setSubmittingImage] = useState(false);
	const [preprofile, setPreProfile] = useState<Profile | null>(null);
	const [preprofileimage, setPreProfileImage] = useState('');
	const [loading, setLoading] = useState(false);
	const imageref = useRef<HTMLInputElement>(null);
	const hasFetchedData = useRef(false);
	
	useEffect(() => {
		if (isOpen) {
			fetchPreData();
			fetchCountries();
		}
	}, [isOpen]);
	
	const fetchPreData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-user-step-data',
					method: "POST",
					data: {name: 'step10'}
				});
			//console.log('get-user-step-data step 10', response)
			var user_details = response.data.details.user_details;
			var details = response.data.details;
			if(user_details){
				setPreProfile(user_details);
				setFormData({...formData,  
					date_of_birth: user_details.date_of_birth, 
					street_address: user_details.street_address, 
					apt_suite: user_details.apt_suite,
					city: user_details.city,
					state_provience: user_details.state_provience,
					zip_postalcode: user_details.zip_postalcode,
					phone_number: user_details.phone_number,
					country: details.country_id, 
				});
				setPreProfileImage(response.data.details.profile_image_path);
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	const fetchCountries = async () => {
		try {
			const response = await axiosInstance({
				url: "get-country",
				method: "GET",
			});
			setCountries(response.data.countries);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
		  //setIsSubmitting(false);
		}
	};
	
	// create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!profileimage) {
            //setPreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(profileimage)
        setPreview(objectUrl);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [profileimage])

	// Handle input change for each language/proficiency
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {	
		const { name, value } = e.target;
		let clean_val = value;
		// Update form data with calculated service_rate and income
		setFormData({ 
			...formData, 
			[name]: clean_val // Update the current field
		});
		// Clear error for this field if it exists
		setErrors({
		  ...errors,
		  [name]: undefined
		});
	};

	
	// Validate the form
	const validate = (): boolean => {
		const newErrors: Partial<Profile> = {};
		if (!formData.date_of_birth) {
			newErrors.date_of_birth = 'Date of birth is required';
		}
		if (!formData.street_address) {
			newErrors.street_address = 'Street address is required';
		}
		/*if (!formData.apt_suite) {
			newErrors.apt_suite = 'Apt/Suite is required';
		}*/
		if (!formData.city) {
			newErrors.city = 'City is required';
		}
		if (!formData.state_provience) {
			newErrors.state_provience = 'State Provience is required';
		}
		if (!formData.zip_postalcode) {
			newErrors.zip_postalcode = 'Postal code is required';
		}
		if (!formData.phone_number) {
			newErrors.phone_number = 'Phone number is required';
		}
		if(formData.phone_number !== ''){
			let checkphone = helpers.isValidPhoneNo(formData.phone_number);
			if(!checkphone){
				newErrors.phone_number = 'Please enter a valid phone number';
			}
		}
		/*if (!formData.country) {
			newErrors.country = 'Country is required';
		}*/
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Save data (simulated API call)
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			try {
				setSubmitting(true);
				
				const response: any = await axiosInstance({
							url: 'save-profile-detail', 
							method: "POST",
							data: formData
						});
				console.log('response', response);

				if(response.error === 'false'){
					onClose(); // Navigate to next step
				}
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setSubmitting(false);
			}
		}
	};
	
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
			if (file.size > 1024 * 1024) {
				alert('File size should not exceed 1MB.');
				return;
			}
			setProfileImage(e.target.files[0]);
		}
	};
	
	const handleImageUpload = async (): Promise<void> => {
		try {
			setSubmittingImage(true);
			let formData = new FormData();
			// Check if resumefile is not null before appending
			if (profileimage) {
			  formData.append('profile_image', profileimage);
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
				setProfileImage(null);
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setSubmittingImage(false);
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
		<div id="edit-profile-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
               <div className="airModal-header">
                  <h2 className="airModal-title h2">Edit Profile</h2>
                  <button className="airModal-close" type="button" onClick={handleClose}>
                     <div className="air-icon" data-test="close-button">
                        <img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
                     </div>
                  </button>
               </div>
               <div className="airModal-body">
                  <div className="modal-resume-content">
                     <div className="profile-forms-items">
                        <div className="form-grid-container">
                           <div className="up-grid-address-row">
                              <div className="span-colm-6">
                                 <div className="form-group">
									<label className="label">Date of Birth *</label>
									<input type="date" 
									  name="date_of_birth" 
									  id="date_of_birth" 
									  placeholder="yyyy-mm-dd"
									  value={formData.date_of_birth}
									  onChange={handleChange}												  
									/>
								</div>
								<div className="air-form-message form-message-error"
								   style={{ display: errors.date_of_birth ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{errors.date_of_birth}</span>
								</div>
                              </div>
                              <div className="span-colm-12">
                                 <div className="form-separate-line">
                                    <hr />
                                 </div>
                              </div>
                              <div className="span-colm-12 select-country-items">
                                 <div className="form-group">
									<label className="label">Country</label>
									<select name="country" className="form-control" id="country" 
										value={formData.country}
										onChange={handleChange}
										style={{backgroundImage: `url('/assets/images/date-arrow-icon.svg')`}}
									>
										<option value="">Select Country</option>
										{countries.map((item,index) => (
											<option key={index} value={item.id}>{item.name}</option>
										))}
									</select>
								 </div>
                              </div>
                              <div className="span-colm-6">
                                 <div className="form-group">
									<label className="label">Street Address *</label>
									<input type="text" 
									  name="street_address" 
									  id="street_address" 
									  className="air-input" 
									  placeholder="Enter street address"
									  value={formData.street_address}
									  onChange={handleChange}
									/>
								</div>
								<div className="air-form-message form-message-error"
								   style={{ display: errors.street_address ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{errors.street_address}</span>
								</div>
                              </div>
                              <div className="span-colm-6">
                                 <div className="form-group">
									<label className="label">Apt/Suite</label>
									<input type="text" 
									  name="apt_suite" 
									  id="apt_suite" 
									  className="air3-input" 
									  placeholder="Apt/Suite (Optional)" 
									  value={formData.apt_suite}
									  onChange={handleChange}
									/>
								</div>
                              </div>
                              <div className="span-colm-4">
                                 <div className="form-group">
									<label className="label">City *</label>
									<input type="search" 
									  name="city" 
									  id="city" 
									  className="air-input" 
									  placeholder="Enter city"
									  value={formData.city}
									  onChange={handleChange}	
									/>
								</div>
								<div className="air-form-message form-message-error"
								   style={{ display: errors.city ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{errors.city}</span>
								</div>
                              </div>
                              <div className="span-colm-4">
                                 <div className="form-group">
									<label className="label">State Province *</label>
									<input type="text" 
									  className="air3-input" 
									  placeholder="Enter state/province"
									  id="state_provience"
									  name="state_provience"
									  value={formData.state_provience}
									  onChange={handleChange}	
									/>
								</div>
								<div className="air-form-message form-message-error"
								   style={{ display: errors.state_provience ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{errors.state_provience}</span>
								</div>
                              </div>
                              <div className="span-colm-4 mb-span-12">
                                 <div className="form-group">
									<label className="label">Zip Postal Code *</label>
									<input type="text" 
									  id="zip_postalcode" 
									  name="zip_postalcode" 
									  className="air3-input" 
									  placeholder="Enter ZIP/Postal code"
									  value={formData.zip_postalcode}
									  onChange={handleChange}												  
									/>
								</div>
								<div className="air-form-message form-message-error"
								   style={{ display: errors.zip_postalcode ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{errors.zip_postalcode}</span>
								</div>
                              </div>
                           </div>
                           <div className="phone-grid-row">
                              <div className="ph-number-block">
                                 <div className="form-group">
								   <label className="label">Phone Number *</label>
									<input type="tel" 
										placeholder="Enter Phone No" 
										id="phone_number"
										name="phone_number"
										value={formData.phone_number}
										onChange={handleChange}
									/> 
								</div>
								<div className="air-form-message form-message-error"
								   style={{ display: errors.phone_number ? 'flex' : 'none' }}
								>
									<div className="air-icons">
										<img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
									</div>
									<span>{errors.phone_number}</span>
								</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
				<div className="airModal-footer">
					<div className="modal-two-btns d-flex align-items-center justify-space-between">
						<button type="button" className="air-btns btns-text-light" onClick={handleClose}>Cancel</button>
						<button type="button" className="air-btns btns-primary" onClick={handleSubmit}>
							{issubmiting ? <ButtonLoader /> : 'Save'}
						</button>
					</div>
				</div>
            </div>
         </div>
      </div>
	);
};
