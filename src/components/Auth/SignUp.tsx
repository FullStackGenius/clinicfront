import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { googleLogout, useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { appleAuthHelpers } from 'react-apple-signin-auth';
import axios from 'axios';
import toast from "react-hot-toast";
import ButtonLoader from '../Common/ButtonLoader';
import AuthLayout from "../layouts/AuthLayout";
import helpers from "../../_helpers/common";
import axiosInstance from "../../_helpers/axiosInstance";

interface SignupFormState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface GoogleUser {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  id_token?: string;
}

interface GoogleProfile {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  [key: string]: any; // Allow additional dynamic keys if needed
}

interface CustomTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  id_token?: string; // Optional
}

interface FormData {
  type?: string;
  email?: string;
  password?: string;
  [key: string]: any; // Allow dynamic keys
}

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const role = location.state?.role;
	console.log('role', role)
	//check if role exist from previous step otherwise redirect back to select role
	if(!role) navigate('/sign-up-as');
	const [ user, setUser ] = useState<GoogleUser | null>(null);
    const [ profile, setProfile ] = useState<GoogleProfile | null>(null);
	const [ formData, setFormData ] = useState<SignupFormState>({ first_name: '', last_name: '', email: '', password: '' });
	const [ registertype, setRegisterType ] = useState('credential');
	const [errors, setErrors] = useState<Partial<SignupFormState>>({});
	const [issubmiting, setIsSubmiting] = useState(false);
	
	/*Handle Form Element Value Changed*/
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		//clean the value
		//let clean_val = helpers.cleanString(value);
		let clean_val = value;
		// Clear error for this field if it exists
		setErrors({
			...errors,
			[name]: undefined
		});
		//set form data in state
		setFormData({
		  ...formData,
		  [name]: clean_val,
		});
	};
	
	/*Validate Form*/
	const validate = (): boolean => {
		if(registertype !== 'credential'){
			return true;
		}
		//console.log('validate form data');
		const newErrors: Partial<SignupFormState> = {};
		if (formData.first_name === '') {
			newErrors.first_name = 'First name is required';
		}
		if (formData.last_name === '') {
			newErrors.last_name = 'Last name is required';
		}
		if (formData.email === '') {
			newErrors.email = 'Email is required';
		} else if (!helpers.isValidEmail(formData.email)) {
			newErrors.email = 'Invalid email address';
		}
		if (formData.password === '') {
			newErrors.password = 'Password is required';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	/*Submit Form*/
	const handleSubmit = async (): Promise<void> => {
		if (validate()) {
			setIsSubmiting(true);
			var form_data = await prepareRequestData();
			try {
				const response = await axiosInstance({
					url: "register",
					method: "POST",
					data: form_data
				});
				
				//check type and procced corespondingly
				if(form_data.type === 'credential'){
					//after successfull credential signup navigate verify email page
					navigate('/verify-email', { state: {resend_verify_email: response.data.emailVerifyResendLink}})
				}else{
					//after successfull social signup navigate verify details and procced corespondingly
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('user', JSON.stringify(response.data.details));
					let details = response.data.details;
					if(!details.role_name){
						navigate('/sign-up-as');
					}else{
						if(response.data.details.role_name === "freelancer"){
							let steps = response.data.steps;
							//console.log('steps', steps);
							if(steps){
								let redirect_path = helpers.getRedirectPath(steps);
								console.log('redirect_path', redirect_path);
								navigate(redirect_path);
							}else{
								navigate('/');
							}
							//navigate('/freelancer/next-big-opertunity');
						}else{
							navigate('/');
						}
					}
				}
			} catch (error) {
				console.error("Error in api request:", error);
			} finally {
				setIsSubmiting(false);
			}
		}
	};
	
	const prepareRequestData = async() => {
		let form_data: FormData = {};
		if(registertype === 'credential'){
			form_data.type = 'credential';
			form_data.first_name = formData.first_name;
			form_data.last_name  = formData.last_name;
			form_data.email      = formData.email;
			form_data.password   = formData.password;
			form_data.role_id       = role;
		} else if (registertype === 'google' && profile) {
			form_data.type       = 'google';
			form_data.id         = profile.id;
			form_data.email      = profile.email;
			form_data.name       = profile.name;
			form_data.role_id       = role;
			form_data.first_name = profile.given_name;
			form_data.last_name  = profile.family_name;
			//form_data.password   = 'Test@1234';
		}
		return form_data;
	}
  
    /*Handle Google Login*/ 
	const googleLogin = useGoogleLogin({
	  onSuccess: (codeResponse: CustomTokenResponse) => {
			setUser({
				access_token: codeResponse.access_token,
				token_type: codeResponse.token_type,
				scope: codeResponse.scope,
				expires_in: codeResponse.expires_in,
				id_token: codeResponse.id_token, // Optional
			})
			setRegisterType('google');
		},
		onError: (error) => {
			console.log('Google Login Failed:', error)
			const errorMessage = error.error_description || error.error || 'An unknown error occurred';
			toast.error(`Error : ${errorMessage}`, { duration: 9000, style: { minWidth: '250px' } });	
		},
	});

    /*Once user is retrived from google fetch user profile*/
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                   .catch((error) => {
						console.log('Get Google Profile Error', error)
						toast.error(`Error : ${error.message}`, { duration: 9000, style: { minWidth: '250px' } });
					});
            }
        },
        [ user ]
    );
	
	useEffect(() => {
		if(profile){
			handleSubmit();
		}
    }, [ profile ]);
	
	/** promisified version - promise resolves with response on success or undefined on error -- note that this only work with usePopup: true */
	const appleLogin = async() => {
		/*const response = await appleAuthHelpers.signIn({
		  authOptions: {
			// same as above
		  },
		  onError: (error) => console.error(error),
		});

		if (response) {
		  console.log(response);
		} else {
		  console.error('Error performing apple signin.');
		}*/
	}

  return (
	<AuthLayout>
    <section className="customer-login customer-register">
         <div className="colm-6 form-colm">
            <div className="sign-in-content">
               <div className="login-top-content">
                  <h3>Sign Up</h3>
                  <p>Join the largest accounting network</p>
               </div>
				<div className="aplle-google-btns d-flex flex-column">
					<div className="login-google-button">
						<button className="btn" type="button" onClick={() => googleLogin()}>
							<img className="img-fluid" src="/assets/images/google-icon.png" alt="" title="" /> Continue with Google
						</button>
					</div>
					<div className="login-apple-button">
						<button className="btn" type="button" onClick={() => appleLogin()}>
							<img className="img-fluid" src="/assets/images/apple-icon.png" alt="" title="" /> Continue with Apple
						</button>
					</div>
				</div>
				<div className="separator-text">
                  <span>or</span>
				</div>
               <div className="login-form">
                  <form className="register-form" method="post">
                     <p className="form-row form-row-first">
                        <label htmlFor="first_name">First Name</label>
                        <input
						  type="text"
						  name="first_name"
						  id="first_name"
						  className="form-control"
						  placeholder="First Name"
						  value={formData.first_name}
						  onChange={handleInputChange}
						/>
						<div
						  className="air-form-message form-message-error"
						  style={{ display: errors.first_name ? 'flex' : 'none' }}
						>
							<div className="air-icons">
							   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
							</div>
							<span>{errors.first_name}</span>
						</div>
                     </p>
                     <p className="form-row form-row-last">
                        <label htmlFor="last_name">Last Name</label>
                        <input
						  type="text"
						  name="last_name"
						  id="last_name"
						  className="form-control"
						  placeholder="Last Name"
						  value={formData.last_name}
						  onChange={handleInputChange}
						/>
						<div
						  className="air-form-message form-message-error"
						  style={{ display: errors.last_name ? 'flex' : 'none' }}
						>
							<div className="air-icons">
							   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
							</div>
							<span>{errors.last_name}</span>
						</div>
                     </p>
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
                     <p className="form-row">
                        <label htmlFor="password">Password</label>
                        <input
						  className="form-control"
						  type="password"
						  name="password"
						  id="password"
						  placeholder="Password"
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
                     </p>
                     <p className="form-row form-btns">
						<button
						  type="button"
						  className="login__submit"
						  name="login"
						  value="Create my account"
						  onClick={() => handleSubmit()}
						>
						  {!issubmiting ? (
							'Create my account'
						  ) : (
							<ButtonLoader />
						  )}
						</button>
                     </p>
                  </form>
                  <div className="term-text-block">
                     <p>By clicking “Sign up” you’re agreeing to our <a href="javascript;;">Terms & Conditions</a>.</p>
                  </div>
                  <div className="have-account">
                     <p>Have an account? <Link to="/sign-in">Sign In</Link></p>
                  </div>
               </div>
            </div>
         </div>
         <div className="colm-6 image-colm d-none d-md-flex">
            <div className="login-right-image" style={{
				  backgroundImage: `url("/assets/images/login-right-image.jpg")`,
				  backgroundPosition: "center",
				  backgroundSize: "cover",
				}}>
			</div>
         </div>
      </section>
	</AuthLayout>  
  );
}

export default SignUp;
