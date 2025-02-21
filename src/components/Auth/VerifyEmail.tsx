import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';
import ButtonLoader from '../Common/ButtonLoader';
import AuthLayout from "../layouts/AuthLayout";
import Header from '../layouts/partials/Header';


function VerifyEmail() {
	const location = useLocation();
	const resend_email_link = location.state.resend_verify_email;
	//const resend_email_link = '';
	const [issending, setIsSending] = useState(false);
	const [notrecivedemail, setNotRecivedEmail] = useState(false);
	const resendEmail = async (): Promise<void> => {
		setIsSending(true);
		axios.get(resend_email_link)
			.then((res) => {
				//console.log('resend email', res)
				setIsSending(false);
				toast.success(res.data.message, { duration: 9000, style: { minWidth: '250px' } });
			})
			.catch((error) => {
				console.log('Get Google Profile Error', error)
				toast.error(`Error : ${error.message}`, { duration: 9000, style: { minWidth: '250px' } });
			});
	};
	
	useEffect(() => {
		const timeoutId = setTimeout(() => {
		  setNotRecivedEmail(false);
		}, 10000);

		return () => clearTimeout(timeoutId);
	}, [notrecivedemail]);

	
	return (
		<AuthLayout>
		<Header />
			 <section className="email-verify-sec light-bg-color">
				 <div className="smallContainer">
					<div className="email-verify-content">
					   <div className="email-image-div">
						  <img className="img-fluid" src="/assets/images/email-verify-img.svg" alt="" title=""/>
					   </div>
					   <h2>Verify your email to continue</h2>
					   <p>You will just sent the address to <span>yourourallemail.com</span><br/>
						  please check your email and select the link profile to verify your address
					   </p>
						<div className="send-again-btns">
							<button onClick={() => resendEmail() }>
								{!issending ? (
									'Send Again'
								) : (
									<ButtonLoader />
								)}
							</button>
						</div>
						<div className="" style={{display: !notrecivedemail ? 'none' : ''}}>
							<p>We noticed you haven't received the email. Please check your spam or junk folder, ensure your email address is correct, or try resending the email.</p>
						</div>
						<div className="quik-right-btn">
							<button className="skip-air-btn" onClick={() => setNotRecivedEmail(true)}>Don’t Received Email</button>
						</div>
					</div>
				 </div>
			  </section>
		</AuthLayout>
	);
}

export default VerifyEmail;
