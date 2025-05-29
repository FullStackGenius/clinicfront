import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { appleAuthHelpers } from 'react-apple-signin-auth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { setUserRedux } from '../../redux/userSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ButtonLoader from '../Common/ButtonLoader';
import AuthLayout from "../layouts/AuthLayout";
import helpers from "../../_helpers/common";
import axios from 'axios';
import axiosInstance from "../../_helpers/axiosInstance";
import ContentLoader from '../Common/ContentLoader';
import Loader from '../Common/Loader';

const MySwal = withReactContent(Swal);

interface LoginFormState {
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

const Login: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const [ user, setUser ] = useState<GoogleUser | null>(null);
    const [ profile, setProfile ] = useState<GoogleProfile | null>(null);
	const [ formData, setFormData ] = useState<LoginFormState>({ email: '', password: '' });
	const [ logintype, setLoginType ] = useState('credential');
	const [errors, setErrors] = useState<Partial<LoginFormState>>({});
	const [issubmiting, setIsSubmiting] = useState(false);
	const [loading, setLoading] = useState(true);

	/*Handle Form Element Value Changed*/
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log('handle input change called')
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
		if(logintype !== 'credential'){
			return true;
		}
		const newErrors: Partial<LoginFormState> = {};
		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!helpers.isValidEmail(formData.email)) {
			newErrors.email = 'Invalid email address';
		}
		if (!formData.password) {
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
				const response: any = await axiosInstance({
					url: "login",
					method: "POST",
					data: form_data
				});
				
				//console.log('login response', response.data)
				//console.log('login response message', response.message)
				//after successfull login check user and redirect him correspondingly
				if(response.message === 'Login successful'){
					localStorage.setItem('token', response.data.token);
					let details = response.data.details;
					if(details){
						localStorage.setItem('user', JSON.stringify(details));
						//set user data in redux store
						dispatch(setUserRedux(details));
					}
				
					if(!details.role_name){
						navigate('/sign-up-as')
					}else{
						if(details.role_name === "freelancer"){
							let steps = response.data.steps;
							//console.log('steps', steps);
							if(steps){
								if(steps.next_step < 14){
									let redirect_path = helpers.getRedirectPath(steps);
									//console.log('redirect_path', redirect_path);
									navigate(redirect_path);
								}else{
									navigate(`/freelancer/view-profile/${details.id}`);
								}
							}else{
								navigate('/');
							}
						}else{
							navigate('/client/create-project-step-one');
						}
					}
				}else{
					navigate('/verify-email', { state: {resend_verify_email: response.data.emailVerifyResendLink,getEmailAddress:response.data.emailAddress}})
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
		if(logintype === 'credential'){
			form_data.type = 'credential';
			form_data.email = formData.email;
			form_data.password = formData.password;
		} else if (logintype === 'google' && profile) {
			form_data.type       = 'google';
			form_data.id         = profile.id;
			form_data.email      = profile.email;
			form_data.name       = profile.name;
			form_data.role       = 3;
			form_data.first_name = profile.given_name;
			form_data.last_name  = profile.family_name;
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
		setLoginType('google');
	  },
	  onError: (error) => {
		//console.log('Google Login Failed:', error)
		const errorMessage = error.error_description || error.error || 'An unknown error occurred';
		MySwal.fire({
			text: errorMessage,
			icon: 'warning',
			showCloseButton: true,
			showConfirmButton: false,
			showCancelButton: false
		});
		//toast.error(`Error : ${errorMessage}`, { duration: 9000, style: { minWidth: '250px' } });	
	  },
	});

    /*Once user is retrived from google fetch user profile*/
    useEffect(() => {

		const params = new URLSearchParams(location.search);
		if (params.get('verified') === '1') {
		  // Show SweetAlert popup
		  Swal.fire({
			icon: 'success',
			title: 'Email Verified',
			html: '<strong>You have successfully verified your email ID.</strong>',
			showCloseButton: true,
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		  });
	
		  // Clean the URL
		  const newUrl = window.location.pathname;
		  window.history.replaceState({}, document.title, newUrl);
		}



		setLoading(true); // Start loading
	
		const delay = setTimeout(() => {
		  setLoading(false); // Stop loading after 2 seconds
		}, 500);
	
		
		if (user) {
			axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
					headers: {
						Authorization: `Bearer ${user.access_token}`,
						Accept: 'application/json'
					}
				})
				.then((res) => {
					setProfile(res.data);
				})
				.catch((error) => {
					//console.log('Get Google Profile Error', error)
					//toast.error(`Error : ${error.message}`, { duration: 9000, style: { minWidth: '250px' } });
					MySwal.fire({
						text: error.message,
						icon: 'warning',
						showCloseButton: true,
						showConfirmButton: false,
						showCancelButton: false
					});
				});
		}
		return () => clearTimeout(delay); // Cleanup timeout on unmount
    }, [ user,location ]);
	
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
	<>
<Loader isLoading={loading} />
	<AuthLayout>
		<section className="customer-login">
		  <div className="colm-6 form-colm">
			<div className="sign-in-content">
			  <div className="login-top-content">
				<h3>Sign In</h3>
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
				<form className="register-form">
				  <div className="form-row">
					<label htmlFor="email">Email</label>
					<input
					  type="text"
					  name="email"
					  id="email"
					  className="form-control"
					  placeholder="Email Address"
					  value={formData.email}
					  onChange={handleInputChange}
					   autoComplete="email"
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
				  </div>
				  <div className="form-row">
					<label htmlFor="password">Password</label>
					<input
					  className="form-control"
					  type="password"
					  name="password"
					  id="password"
					  placeholder="Password"
					  value={formData.password}
					  onChange={handleInputChange}
					   autoComplete="password"
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
				  </div>
				  <p className="forgot-password">
					<Link to="/forgot-password">Forgot password?</Link>
				  </p>
					<p className="form-row form-btns">
						<button
						  type="button"
						  className="login__submit"
						  name="login"
						  value="Sign In"
						  onClick={() => handleSubmit()}
						>
						  {!issubmiting ? (
							'Sign In'
						  ) : (
							<ButtonLoader />
						  )}
						</button>
					</p>
				</form>
				<div className="have-account">
				  <p>
					Don’t have an account? <Link to="/sign-up-as">Sign Up</Link>
				  </p>
				  <p>
					Back to <Link to="/">Home</Link>
				  </p>
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
	
	</>
      
  );
};

export default Login;
