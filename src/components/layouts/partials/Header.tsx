import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
//import { useSelector } from 'react-redux';
//import { selectUser } from '../../../redux/userSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { checkUserLoggedIn } from "../../../_helpers/checkUserLoggedIn";
import { getUserInfo } from "../../../_helpers/getUserInfo";
import helpers from "../../../_helpers/common";
import axiosInstance from "../../../_helpers/axiosInstance";

function Header() {
	const navigate = useNavigate();
	const loggedIn = checkUserLoggedIn();
	//const user = useSelector(selectUser);
	const user = useSelector((state: RootState) => state.user.user);
	//console.log('header user', user)
	useEffect(() => {
		if(loggedIn){
			let role = getUserInfo('role_name');
			//console.log('role', role)
			if(!role){
				navigate('/sign-up-as');
			}
		}
    }, [ ]);
	
	const logoutUser = async() => {
		try {
			const response = await axiosInstance({
				url: "logout",
				method: "POST"
			});
			//after successfull logout clear local storage
			localStorage.clear();
			//after successfull logout navigate sign-in page
			navigate('/')
		} catch (error) {
			console.error("Error in api request:", error);
		} finally {
			
		}
	}
	
	return (
		<header>
         <section className="header-section">
            <div className="main-container">
               <div className="header-row d-flex flex-wrap align-items-center">
                  <div className="header-logo">
                     <button className="nav-toogle-menu" type="button">
                        <div className="nav-toggle-box">
                           <span className="icon-bar"></span>
                        </div>
                     </button>
                     <Link to="/"><img className="img-fluid" height="50px" width="50px" src="/assets/images/logo-icon.png" alt="" title="" /></Link>
                  </div>
                  <div className="header-menu">
                     <div className="header-nav-items">
                        <nav className="nav-right">
                           <ul>
                              <li className="nav-dropdown">
                                 <button type="button" data-cy="menu-trigger" className="nav-btn-item">
                                 <span className="nav-item-label">Find Talent</span>
                                 <span className="up-nav-caret">
                                 <img className="img-fluid menu_icons" src="/assets/images/menu-icon.svg" alt="" title="" />
                                 </span>
                                 </button>
                                 <ul className="nav-dropdown-menu">
                                    <li className="find-work-v2 plus-items">
                                       <div className="nav-container">
                                          <div className="content treatment-1">
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text">Talent Marketplace </div>
                                                      <span className="vs-text-small"> Learn about working with talent or explore your specific hiring needs.</span>
                                                   </a>
                                                </li>
                                             </ul>
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text">Project Catalog </div>
                                                      <span className="vs-text-small"> Browse and buy projects that have a clear scope and price.</span>
                                                   </a>
                                                </li>
                                             </ul>
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text">Consultations </div>
                                                      <span className="vs-text-small"> Explore what is possible with an industry expert. See their availability and book a time that works for you.</span>
                                                   </a>
                                                </li>
                                             </ul>
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text">Ways to earn </div>
                                                      <span className="vs-text-small">Learn why Upwork has the right opportunities for you.</span>
                                                   </a>
                                                </li>
                                             </ul>
                                          </div>
                                       </div>
                                    </li>
                                 </ul>
                              </li>
                              <li className="nav-dropdown">
                                 <button type="button" data-cy="menu-trigger" className="nav-btn-item">
                                 <span className="nav-item-label">Find work</span>
                                 <span className="up-nav-caret">
                                 <img className="img-fluid menu_icons" src="/assets/images/menu-icon.svg" alt="" title=""/>
                                 </span>
                                 </button>
                                 <ul className="nav-dropdown-menu">
                                    <li className="find-work-v2 plus-items">
                                       <div className="nav-container">
                                          <div className="content treatment-1">
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text"> Ways to earn </div>
                                                      <span className="vs-text-small"> Learn why Upwork has the right opportunities for you. </span>
                                                   </a>
                                                </li>
                                             </ul>
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text"> Find work for your skills </div>
                                                      <span className="vs-text-small"> Explore the kind of work available in your field. </span>
                                                   </a>
                                                </li>
                                             </ul>
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text"> Win work with ads </div>
                                                      <span className="vs-text-small"> Get noticed by the right client. </span>
                                                   </a>
                                                </li>
                                             </ul>
                                             <ul className="pr_8x">
                                                <li>
                                                   <a href="#">
                                                      <div className="vs-text">Join Freelancer Plus </div>
                                                      <span className="vs-text-small"> Access more Connects, get strategic insights on competitors, and try out the latest tools.</span>
                                                   </a>
                                                </li>
                                             </ul>
                                          </div>
                                       </div>
                                    </li>
                                 </ul>
                              </li>
                           </ul>
                        </nav>
                        <div className="navbar-cta-btns">
							<Link className="account-btn" to="/sign-up-as">Create account</Link>
                        </div>
						<div className="navbar-cta-btns">
							<Link className="account-btn" to="/client/create-project" >Post a Job</Link>
						</div>
                     </div>
					 {loggedIn ? (
						 <div className="user-nav-btns">
							{user?.role_name === 'client' && (
								<span className="account-btn">
									<Link className="account-btn" to="/client/create-project-step-one" >Post a Job</Link>
								</span>
							)}
							<ul>
							   <li className="user-menu nav-dropdown">
									<button type="button" data-cy="menu-trigger" className="nav-btn-item">
										<img className="img-fluid" src={user?.profile_image_path} alt="" title="" />
									</button>
									<ul className="nav-dropdown-account-menu">
										<li className="nav-user-info">
											<a className="d-flex align-items-center" href="#">
												<img className="img-fluid" src={user?.profile_image_path} key={user?.profile_image} alt="" title="" />
												<div className="nav-user-info-wrapper d-flex">
													<div className="nav-user-label"> {user?.name} </div>
													<div className="nav-user-type"> {helpers.toTitleCase(user?.role_name)} </div>
												</div>
											</a>
										</li>
										<li>
											<div className="nav-separator-item"></div>
										</li>
										{user?.role_name === 'freelancer' && (
											<li>
												<Link className="nav-menu-item" to={`/freelancer/view-profile/${getUserInfo('id')}`}>
												<span className="nav-icon">
												<img className="img-fluid" src="/assets/images/account-nav-icon.svg" alt="" title="" />
												</span> Your profile</Link>
											</li>
										)}
										<li>
											<button className="link-logout-btns" onClick={() => logoutUser()}>
												<span className="nav-icon">
													<img className="img-fluid" src="/assets/images/logout-icon.svg" alt="" title="" />
												</span> Log out 
											</button>
										</li>
									</ul>
								</li>
							</ul>
						 </div>
					 ): (
						<div className="header-btns">
							<span className="login-menu-btns hidden-on-mobile"><Link to="/sign-in">Login</Link></span>
							<span className="account-btn"><Link to="/sign-up-as">Create account</Link></span>
						</div>
					)}
                  </div>
               </div>
            </div>
         </section>
      </header>
	);
}

export default Header;
