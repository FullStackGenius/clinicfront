import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../_helpers/axiosInstance";
import { checkUserLoggedIn } from "../../_helpers/checkUserLoggedIn";
import helpers from "../../_helpers/common";
import ContentLoader from '../Common/ContentLoader';
import ButtonLoader from '../Common/ButtonLoader';
import AuthLayout from "../layouts/AuthLayout";

interface AccountType {
  id: number;
  name: string;
  description: string;
}

function SignUpAs() {
	const navigate = useNavigate();
	const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [selected, setSelected] = useState<number | null>(null);
	const [error, setError] = useState<string | ''>('');
	
	useEffect(() => {
        getAccountType();
    }, [ ]);
	
	//Get Account Type
	const getAccountType = async() => {
        try {
			const response = await axiosInstance({
				url: "account-type",
				method: "GET",
			});
			//console.log('response', response)
			setAccountTypes(response.data.roles);
		} catch (error) {
			console.error("Error in api request:", error);
		} finally {
			setLoading(false);
		}
    };
	
	//Move to next step or save user role
	const moveToNextStep = () => {
		if(!selected){
			setError('Kindly choose an option to continue.');
		}else{
			setSubmitting(true);
			const loggedIn = checkUserLoggedIn();
			if(!loggedIn){
				navigate('/sign-up', { state: {role: selected}})
			}else{
				updateUserRole();
			}
		}
	}
	
	//Update user role request
	const updateUserRole = async() => {
		try {
			const response = await axiosInstance({
				url: "save-user-role",
				method: "POST",
				data: {role: selected}
			});
			//console.log('response', response)
			localStorage.setItem('user', JSON.stringify(response.data.user));
			if(response.data.user.role_name === "freelancer"){
				let steps = response.data.steps;
				//console.log('steps', steps);
				if(steps){
					let redirect_path = helpers.getRedirectPath(steps);
					//console.log('redirect_path', redirect_path);
					navigate(redirect_path);
				}else{
					navigate('/');
				}
				//navigate('/freelancer/next-big-opertunity');
			}else{
				navigate('/');
			}
		} catch (error) {
			console.error("Error in api request:", error);
		} finally {
			//setSubmitting(false);
		}
	}
	
  return (
	<AuthLayout>
    <section className="customer-login client-customer-register">
        <div className="colm-6 form-colm">
            <div className="sign-in-content">
				<div className="login-top-content">
					<h3>As Client or Freelancer</h3>
					<p>Please identify whether you are looking to hire an Accountant, or currently are one?</p>
				</div>
				<div className="login-form">
					<form className="register-form">
						{!loading ? (
							<>
								<div className="tw-radio-btns">
									{accountTypes.map((item,index) => (
										<div key={index} className="air3-radioBtn-box" onClick={() => setSelected(item.id)}>
										   <input className="form-check-input" type="radio" name="account_type" id="account_type" />
										   <div className="form-radio-bg">
											  <div className="air3-radio-label-check-icon">
												 <div className="air3-checkbox-input">
													<span className="air3-radio-icon">
														<img className="img-fluid" src="/assets/images/active-check-icon.svg" alt="" title="" />
													</span>
												 </div>
											  </div>
											  <div className="air3-icon-lg">
												 <img className="img-fluid" src="/assets/images/account-icon.svg" alt="" title="" />
											  </div>
											  <div className="air3-btn-box-label">
												 <h4>{item.description}</h4>
											  </div>
										   </div>
										</div>
									))}
									<div
									  className="air-form-message form-message-error"
									  style={{ display: error ? 'flex' : 'none' }}
									>
										<div className="air-icons">
										   <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title=""/>
										</div>
										<span>{error}</span>
									</div>
								</div>
								<p className="form-row form-btns">
									<button type="button" className="login__submit" onClick={() => moveToNextStep()}>
										{!submitting ? 'Create my account' : <ButtonLoader />}
									</button>
								</p>
							</>
						) : (
							<div className="tw-radio-btns">
								<ContentLoader />
							</div>
						)}
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

export default SignUpAs;
