import React, { useState} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ButtonLoader from '../Common/ButtonLoader'; 
import helpers from "../../_helpers/common";
import axiosInstance from "../../_helpers/axiosInstance";

interface ResetFormState {
  password: string;
  repassword: string;
}


const ResetPassword: React.FC = () => {
	const navigate = useNavigate();
	const token  = useParams();
	const [ formData, setFormData ] = useState<ResetFormState>({ password: '', repassword: '' });
	const [errors, setErrors] = useState<Partial<ResetFormState>>({});
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
		const newErrors: Partial<ResetFormState> = {};
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} 
		if (!formData.repassword) {
			newErrors.repassword = 'Re Password is required';
		} 
		if((formData.password !== '' && formData.repassword !== '') && formData.password !== formData.repassword){
			newErrors.repassword = 'Re entered password must be same as entered above';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	/*Submit Form*/
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			setIsSubmiting(true);
			try {
				var form_data = {token: token, password: formData.password, repassword: formData.repassword}
				const response = await axiosInstance({
					url: "change-forgot-password",
					method: "POST",
					data: form_data
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
						<label htmlFor="password">New Password</label>
						<input
						  type="password"
						  name="password"
						  id="password"
						  className="form-control"
						  placeholder="New Password"
						  value={formData.password}
						  onChange={handleInputChange}
						/>
						<div
						  className="air-form-message form-message-error"
						  style={{ display: errors.password ? 'flex' : 'none' }}
						>
							<div className="air-icons">
							   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
							</div>
							<span>{errors.password}</span>
						</div>
						<span className="form-password-texts">Must be at least 8 characters long, including 1 number or 1 symbol.</span>
					  </p>
					  <p className="form-row">
						<label htmlFor="repassword">Re-enter password</label>
						<input
						  type="password"
						  name="repassword"
						  id="repassword"
						  className="form-control"
						  placeholder="Re-enter password"
						  value={formData.repassword}
						  onChange={handleInputChange}
						/>
						<div
						  className="air-form-message form-message-error"
						  style={{ display: errors.repassword ? 'flex' : 'none' }}
						>
							<div className="air-icons">
							   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
							</div>
							<span>{errors.repassword}</span>
						</div>
					  </p>
                     <p className="form-row form-btns">
                        <button type="button" className="login__submit" name="Change password" onClick={() => handleSubmit()}>
							{!issubmiting ? (
								'Change password'
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

export default ResetPassword;
