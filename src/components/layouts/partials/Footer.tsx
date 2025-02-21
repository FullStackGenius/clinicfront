import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import ContentLoader from '../../Common/ContentLoader';
import helpers from "../../../_helpers/common";
import axiosInstance from "../../../_helpers/axiosInstance";

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
			//console.log('response', response)
			setSetting(response.data.settings);
			
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	return (
		<footer>
			 <section className="footer-section">
				<div className="main-container">
				   <div className="footer-items d-flex flex-wrap">
					  <div className="footer-one">
						 <div className="footer-contact-info">
							<div className="footer-logo">
							   <img className="img-fluid" src="/assets/images/logo-img.svg" alt="" title="" />
							</div>
							<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							<div className="footer-social">
							   <ul>
									<li>
										<Link to={setting.facebook_link} target={'_blank'}>
											<img className="img-fluid" src="/assets/images/facebook-icon.svg" alt="" title="" />
										</Link>
									</li>
									<li>
										<Link to={setting.instagram_link} target={'_blank'}>
											<img className="img-fluid" src="/assets/images/instagram-icon.svg" alt="" title="" />
										</Link>
									</li>
									<li>
										<Link to={setting.twitter_link} target={'_blank'}>
											<img className="img-fluid" src="/assets/images/twitter-icon.svg" alt="" title="" />
										</Link>
									</li>
									<li>
										<Link to={setting.linkedin_link} target={'_blank'}>
											<img className="img-fluid" src="/assets/images/linkedin-icon.svg" alt="" title="" />
										</Link>
									</li>
								  <li></li>
								  <li></li>
								  <li></li>
							   </ul>
							</div>
						 </div>
					  </div>
					  <div className="footer-two">
						 <div className="footer-menu">
							<h3>quick Links</h3>
							<div className="menu-items">
							   <ul>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Contact</a></li>
							   </ul>
							</div>
						 </div>
					  </div>
					  <div className="footer-three">
						 <div className="footer-menu">
							<h3>Company</h3>
							<div className="menu-items">
							   <ul>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
							   </ul>
							</div>
						 </div>
					  </div>
					  <div className="footer-four">
						 <div className="footer-menu">
							<h3>Information</h3>
							<div className="menu-items">
							   <ul>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
								  <li><a href="#">Text here</a></li>
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
						 <p>Copyright © 2024  Company name</p>
					  </div>
					  <div className="right-text">
						 <p>All Rights Reserved</p>
					  </div>
				   </div>
				</div>
			 </section>
		</footer> 
  );
}

export default Footer;
