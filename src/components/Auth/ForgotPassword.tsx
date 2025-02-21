import React, { useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ButtonLoader from '../Common/ButtonLoader';
import helpers from "../../_helpers/common";
import axiosInstance from "../../_helpers/axiosInstance";

interface ForgotFormState {
  email: string;
}


const ForgotPassword: React.FC = () => {
	const navigate = useNavigate();
	const [ formData, setFormData ] = useState<ForgotFormState>({ email: '' });
	const [errors, setErrors] = useState<Partial<ForgotFormState>>({});
	const [issubmiting, setIsSubmiting] = useState(false);

	/*Handle Form Element Value Changed*/
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log('handle input change called')
		const { name, value } = e.target;
		//clean the value
		let clean_val = helpers.cleanString(value);
		setFormData({
		  ...formData,
		  [name]: clean_val,
		});
	};
	
	/*Validate Form*/
	const validate = (): boolean => {
		//console.log('validate form data');
		const newErrors: Partial<ForgotFormState> = {};
		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!helpers.isValidEmail(formData.email)) {
			newErrors.email = 'Invalid email address';
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	/*Submit Form*/
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			setIsSubmiting(true);
			try {
				const response = await axiosInstance({
					url: "send-forgot-password-link",
					method: "POST",
					data: formData
				});
				//console.log('forgot password response', response);
				navigate('/forgot-password-email-sent');
			} catch (error) {
				console.error("Error in api request:", error);
			} finally {
				setIsSubmiting(false);
			}
		}
	};
	
  return (
	<AuthLayout>
		<section className="customer-login customer-register">
         <div className="colm-6 form-colm">
            <div className="sign-in-content">
               <div className="login-top-content">
                  <h3>Reset you password</h3>
                  <p>Join the largest accounting network</p>
               </div>
               <div className="login-form">
                  <form className="register-form">
                     <p className="form-row">
						<label htmlFor="email">Email</label>
						<input
						  type="text"
						  name="email"
						  id="email"
						  className="form-control"
						  placeholder="Email Address"
						  value={formData.email}
						  onChange={handleInputChange}
						/>
						<div
						  className="air-form-message form-message-error"
						  style={{ display: errors.email ? 'flex' : 'none' }}
						>
							<div className="air-icons">
							   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
							</div>
							<span>{errors.email}</span>
						</div>
					  </p>
                     <p className="form-row form-btns">
                        <button type="button" className="login__submit" name="Reset password" onClick={() => handleSubmit()}>
							{!issubmiting ? (
								'Reset password'
							) : (
								<ButtonLoader />
							)}
						</button>
                     </p>
                  </form>
                  <div className="have-account">
                     <p><Link to="/sign-in">Return to login</Link></p>
                  </div>
               </div>
            </div>
         </div>
         <div className="colm-6 image-colm d-none d-md-flex">
			<div
			  className="login-right-image"
			  style={{
				backgroundImage: `url("/assets/images/login-right-image.jpg")`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			  }}
			></div>
		  </div>
      </section>
	</AuthLayout>
  );
};

export default ForgotPassword;
