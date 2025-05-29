import React from 'react';
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Header from '../layouts/partials/Header';


function ForgotPasswordEmailSent() {
	return (
		<AuthLayout>
		{/*<Header />*/}
			<section className="email-verify-sec light-bg-color">
				 <div className="smallContainer">
					<div className="email-verify-content">
					   <div className="email-image-div">
						  <img className="img-fluid" src="/assets/images/email-verify-img.svg" alt="" title="" />
					   </div>
					   <h2>Check your email</h2>
					   <p>We've sent you an email with instructions to reset your password.<br/> Please check your inbox and follow the steps provided.</p>
					   <p>Changed your mind or using another account? Head back to “Login.”</p>
					   {/* <p>If you didn’t request a password change or would like to<br/> log in to a different account, select "Return to login."</p> */}
					   <div className="send-again-btns">
						  <Link type="button" to="/sign-in" className="return-login-btn"> Return to login</Link>
					   </div>
					</div>
				 </div>
			</section>
		</AuthLayout>
	);
}

export default ForgotPasswordEmailSent;
