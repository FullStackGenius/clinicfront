import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../_helpers/axiosInstance";
import { checkUserLoggedIn } from '../../../_helpers/checkUserLoggedIn';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface Setting {
	id: number;
	website_logo: string;
	website_logo_path: string;
	facebook_link: string;
	instagram_link: string;
	twitter_link: string;
	linkedin_link: string;
}

function Footer() {
	const [setting, setSetting] = useState<Setting>({id: 0, website_logo: '', website_logo_path: '', facebook_link: '', instagram_link: '', twitter_link: '', linkedin_link: ''});
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
	const navigate = useNavigate();
	 const loggedIn = checkUserLoggedIn();
	 const user = useSelector((state: RootState) => state.user.user);
	useEffect(() => {
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			fetchSettingData();
		}
	}, []);
	
	const fetchSettingData = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get('get-website-setting');
			setSetting(response.data.settings);
			
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleRedirectToSignup = (roleId: number): void => {
		navigate(`/sign-up?role=${roleId}`);
	 };
	
	return (
		<footer>
			 <section className="footer-section">
				<div className="main-container">
				   <div className="footer-items d-flex flex-wrap">
					  <div className="footer-one">
						 <div className="footer-contact-info">
							{ setting && setting.website_logo_path && <div className="footer-logo">
							   <img loading="lazy" className="img-fluid" src={setting.website_logo_path} alt="" title="" height="50px" width="50px"/>
							</div> }
							<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							<div className="footer-social">
							   <ul>
									<li>
										<Link to={setting.facebook_link} target={'_blank'}>
											<img loading="lazy" className="img-fluid" src="/assets/images/facebook-icon.svg" alt="" title="" />
										</Link>
									</li>
									<li>
										<Link to={setting.instagram_link} target={'_blank'}>
											<img loading="lazy" className="img-fluid" src="/assets/images/instagram-icon.svg" alt="" title="" />
										</Link>
									</li>
									<li>
										<Link to={setting.twitter_link} target={'_blank'}>
											<img loading="lazy" className="img-fluid" src="/assets/images/twitter-icon.svg" alt="" title="" />
										</Link>
									</li>
									<li>
										<Link to={setting.linkedin_link} target={'_blank'}>
											<img loading="lazy" className="img-fluid" src="/assets/images/linkedin-icon.svg" alt="" title="" />
										</Link>
									</li>
								  <li></li>
								  <li></li>
								  <li></li>
							   </ul>
							</div>
						 </div>
					  </div>
					{ !loggedIn  && <>
					<div className="footer-two">
						 <div className="footer-menu">
							<h3>Freelancers</h3>
							<div className="menu-items">
							   <ul>
								  <li><Link to="/way-to-earn">Ways to Earn</Link></li>
								  <li style={{ cursor: "pointer" }} onClick={() => handleRedirectToSignup(3)} ><a onClick={() => handleRedirectToSignup(3)} >Find Work</a></li>
								  <li style={{ cursor: "pointer" }}  onClick={() => handleRedirectToSignup(3)} ><a  onClick={() => handleRedirectToSignup(3)} >Apply</a></li>
								 
								
							   </ul>
							</div>
						 </div>
					  </div>
					  <div className="footer-three">
						 <div className="footer-menu">
							<h3>Clients</h3>
							<div className="menu-items">
							   <ul>
								  <li><Link to="/our-freelancer">Talent Marketplace</Link></li>
								  <li style={{ cursor: "pointer" }} onClick={() => handleRedirectToSignup(2)}><a  onClick={() => handleRedirectToSignup(2)} >Consultations</a></li>
								  <li><Link to="/our-prices">Pricing</Link></li>
								  {/* <li><a href="#">Text here</a></li> */}
							   </ul>
							</div>
						 </div>
					  </div> </> }

					  {loggedIn && Number(user?.role_id) === 2 && <>
						<div className="footer-three">
						 <div className="footer-menu">
							<h3>Clients</h3>
							<div className="menu-items">
							   <ul>
								  <li><Link to="/our-freelancer">Talent Marketplace</Link></li>
								 
								  <li><Link to="/our-prices">Pricing</Link></li>
								 
							   </ul>
							</div>
						 </div>
					  </div>
					  </>}

					  {loggedIn && Number(user?.role_id) === 3 && <>
						<div className="footer-two">
						 <div className="footer-menu">
							<h3>Freelancers</h3>
							<div className="menu-items">
							   <ul>
								  <li><Link to="/way-to-earn">Ways to Earn</Link></li>
								  <li style={{ cursor: "pointer" }}><Link to="/projects" >Find Work</Link></li>
								  
								
							   </ul>
							</div>
						 </div>
					  </div>
</>}

					  <div className="footer-four">
						 <div className="footer-menu">
							<h3>Company</h3>
							<div className="menu-items">
							   <ul>
								  <li><Link to="/contact-us">Contact Us</Link></li>
								  <li><Link to="/resources">Resources</Link></li>
								  <li><Link to="/privacy-policy">Legal Documents</Link></li>
								
							   </ul>
							</div>
						 </div>
					  </div>
				   </div>
				</div>
			 </section>
			 <section className="footer-copyright">
				<div className="main-container">
				   <div className="copyright-block">
					  <div className="copyright-text">
						 <p>Copyright © {new Date().getFullYear()}  Company name</p>
					  </div>
					  <div className="right-text">
						 <p>All Rights Reserved {new Date().getFullYear()}</p>
					  </div>
				   </div>
				</div>
			 </section>
		</footer> 
  );
}

export default Footer;
