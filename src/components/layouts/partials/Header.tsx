import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { checkUserLoggedIn } from "../../../_helpers/checkUserLoggedIn";
import { getUserInfo } from "../../../_helpers/getUserInfo";
import helpers from "../../../_helpers/common";
import axiosInstance from "../../../_helpers/axiosInstance";
import { setProject } from '../../../redux/projectSlice';

interface Setting {
   id: number;
   website_logo: string;
   website_logo_path: string;
   facebook_link: string;
   instagram_link: string;
   twitter_link: string;
   linkedin_link: string;
}
function Header() {
   const navigate = useNavigate();
   const loggedIn = checkUserLoggedIn();
   const user = useSelector((state: RootState) => state.user.user);
   const [isActive, setIsActive] = useState<boolean>(false);
   const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
   const [navDropdowns, setNavDropdowns] = useState<Record<string, boolean>>({});
   const [loading, setLoading] = useState(true);
   const [setting, setSetting] = useState<Setting>({ id: 0, website_logo: '', website_logo_path: '', facebook_link: '', instagram_link: '', twitter_link: '', linkedin_link: '' });
   const hasFetchedData = useRef(false);
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      if (loggedIn) {
         let role = getUserInfo('role_name');
         if (!role) {
            navigate('/sign-up-as');
         }
      }
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

   const logoutUser = async () => {
      try {
         const response = await axiosInstance({
            url: "logout",
            method: "POST"
         });
         localStorage.clear();
         navigate('/')
      } catch (error) {
         console.error("Error in api request:", error);
      } finally {

      }
   }

   const handleRedirectToSignup = (roleId: number): void => {
      navigate(`/sign-up?role=${roleId}`);
   };

   const toggleMenu = () => {
      setIsActive(!isActive);
      setIsDropdownActive(false);
   };

   const toggleDropdown = () => {
      setIsDropdownActive(!isDropdownActive);
      setIsActive(false);
   };

   const toggleNavDropdown = (key: string) => {
      setNavDropdowns((prev) => ({
         ...prev,
         [key]: !prev[key],
      }));
   };


   return (
      <header>


         <section className={`header-section ${isActive ? "active_menu" : ""}`}>
            <div className="main-container">
               <div className="header-row d-flex flex-wrap align-items-center">

                  <div className="header-logo">
                     <button className="nav-toogle-menu" type="button" onClick={toggleMenu}>
                        <div className="nav-toggle-box">
                           <span className="icon-bar"></span>
                        </div>
                     </button>

                     {setting && setting.website_logo_path && <Link to="/"><img loading="lazy" className="img-fluid" height="50px" width="50px" src={setting.website_logo_path} alt="" title="" /></Link>}
                  </div>
                  <div className="header-menu">
                     <div className="header-nav-items">
                        <nav className="nav-right">
                           <ul>
                              {!loggedIn && <>
                                 <li className="nav-dropdown">
                                    <button type="button" data-cy="menu-trigger" className="nav-btn-item" onClick={() => toggleNavDropdown('findTalent')}>
                                       <span className="nav-item-label">Find Talent</span>
                                       <span className="up-nav-caret">
                                          <img loading="lazy" className="img-fluid menu_icons" src="/assets/images/menu-icon.svg" alt="" title="" />
                                       </span>
                                    </button>
                                    <ul className={`nav-dropdown-menu ${navDropdowns['findTalent'] ? "active_menu" : ""}`}>
                                       <li className="find-work-v2 plus-items">
                                          <div className="nav-container">
                                             <div className="content treatment-1">
                                                <ul className="pr_8x">
                                                   <li>
                                                      <Link to="/our-freelancer">
                                                         <div className="vs-text">Talent Marketplace </div>
                                                         <span className="vs-text-small"> Learn about working with talent or explore your specific hiring needs.</span>
                                                      </Link>
                                                   </li>
                                                </ul>

                                                <ul className="pr_8x">
                                                   <li onClick={() => handleRedirectToSignup(2)}><a onClick={() => handleRedirectToSignup(2)} ><div className="vs-text">Consultations </div><span className="vs-text-small"> Explore what is possible with an industry expert. See their availability and book a time that works for you.</span></a></li>
                                                </ul>
                                                <ul className="pr_8x">
                                                   <li>
                                                      <Link to="/our-prices">
                                                         <div className="vs-text">Our Prices</div>
                                                         <span className="vs-text-small"> Check out our transparent and competitive pricing plans.</span>
                                                      </Link>
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </li>
                                    </ul>
                                 </li>
                                 <li className="nav-dropdown">
                                    <button type="button" data-cy="menu-trigger" className="nav-btn-item" onClick={() => toggleNavDropdown('findWork')}>
                                       <span className="nav-item-label">Find work</span>
                                       <span className="up-nav-caret">
                                          <img loading="lazy" className="img-fluid menu_icons" src="/assets/images/menu-icon.svg" alt="" title="" />
                                       </span>
                                    </button>
                                    <ul className={`nav-dropdown-menu ${navDropdowns['findWork'] ? "active_menu" : ""}`}>
                                       <li className="find-work-v2 plus-items">
                                          <div className="nav-container">
                                             <div className="content treatment-1">
                                                <ul className="pr_8x">
                                                   <li>
                                                      <Link to="/way-to-earn">
                                                         <div className="vs-text"> Ways to earn </div>
                                                         <span className="vs-text-small"> Learn why Accountant Clinic has the right opportunities for you. </span>
                                                      </Link>
                                                   </li>
                                                </ul>
                                                <ul className="pr_8x">
                                                   <li onClick={() => handleRedirectToSignup(3)}>
                                                      <a onClick={() => handleRedirectToSignup(3)}><div className="vs-text">Apply as a freelancer</div><span className="vs-text-small"> Access more Connects, get strategic insights on competitors, and try out the latest tools.</span>
                                                      </a>
                                                   </li>
                                                </ul>
                                                <ul className="pr_8x">
                                                   <li onClick={() => handleRedirectToSignup(2)}>
                                                      <a onClick={() => handleRedirectToSignup(2)} ><div className="vs-text"> Find work for your skills</div><span className="vs-text-small"> Explore the kind of work available in your field. </span>
                                                      </a>
                                                   </li>
                                                </ul>

                                             </div>
                                          </div>
                                       </li>
                                    </ul>
                                 </li>
                              </>
                              }
                              {loggedIn && Number(user?.role_id) === 2 &&
                                 <li className="nav-dropdown">
                                    <button type="button" data-cy="menu-trigger" className="nav-btn-item" onClick={() => toggleNavDropdown('findTalent')}>
                                       <span className="nav-item-label">Find Talent</span>
                                       <span className="up-nav-caret">
                                          <img loading="lazy" className="img-fluid menu_icons" src="/assets/images/menu-icon.svg" alt="" title="" />
                                       </span>
                                    </button>
                                    <ul className={`nav-dropdown-menu ${navDropdowns['findTalent'] ? "active_menu" : ""}`}>
                                       <li className="find-work-v2 plus-items">
                                          <div className="nav-container">
                                             <div className="content treatment-1">
                                                <ul className="pr_8x">
                                                   <li>
                                                      <Link to="/our-freelancer">
                                                         <div className="vs-text">Talent Marketplace </div>
                                                         <span className="vs-text-small"> Learn about working with talent or explore your specific hiring needs.</span>
                                                      </Link>
                                                   </li>
                                                </ul>
                                                <ul className="pr_8x">
                                                   <li>
                                                      <Link to="/our-prices">
                                                         <div className="vs-text">Our Prices</div>
                                                         <span className="vs-text-small"> Check out our transparent and competitive pricing plans.</span>
                                                      </Link>
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </li>
                                    </ul>
                                 </li>}
                              {loggedIn && Number(user?.role_id) === 3 && <li className="nav-dropdown">
                                 <button type="button" data-cy="menu-trigger" className="nav-btn-item" onClick={() => toggleNavDropdown('findWork')}>
                                    <span className="nav-item-label">Find work</span>
                                    <span className="up-nav-caret">
                                       <img loading="lazy" className="img-fluid menu_icons" src="/assets/images/menu-icon.svg" alt="" title="" />
                                    </span>
                                 </button>
                                 <ul className={`nav-dropdown-menu ${navDropdowns['findWork'] ? "active_menu" : ""}`}>
                                    <li className="find-work-v2 plus-items">
                                       <div className="nav-container">
                                          <div className="content treatment-1">
                                             <ul className="pr_8x">
                                                <li>
                                                   <Link to="/way-to-earn">
                                                      <div className="vs-text"> Ways to earn </div>
                                                      <span className="vs-text-small"> Learn why Accountant Clinic has the right opportunities for you. </span>
                                                   </Link>
                                                </li>
                                             </ul>
                                             <ul className="pr_8x">
                                                <li >
                                                   <Link to="/projects" ><div className="vs-text"> Find work for your skills</div><span className="vs-text-small"> Explore the kind of work available in your field. </span>
                                                   </Link>
                                                </li>
                                             </ul>

                                          </div>
                                       </div>
                                    </li>
                                 </ul>
                              </li>}
                           </ul>
                        </nav>

                        {user?.role_name === 'client' && (<div className="navbar-cta-btns"><Link onClick={() => dispatch(setProject(null))} className="account-btn" to="/client/create-project-step-one" data-discover="true">Post a Job</Link></div>)}


                     </div>
                     {loggedIn ? (<div className="user-nav-btns">
                        {user?.role_name === 'client' && (<span className="account-btn"><Link onClick={() => dispatch(setProject(null))} to="/client/create-project-step-one">Post a Job </Link></span>)}
                        <ul>
                           <li className="user-menu nav-dropdown">
                              <button type="button" data-cy="menu-trigger" className="nav-btn-item" onClick={toggleDropdown}>
                                 <img loading="lazy" className="img-fluid" src={user?.profile_image_path} alt="" title="" />
                              </button>

                              <ul className={`nav-dropdown-account-menu ${isDropdownActive ? "active" : ""}`}>
                                 <li className="nav-user-info">
                                    <a className="d-flex align-items-center" href="#">
                                       <img loading="lazy" className="img-fluid" src={user?.profile_image_path} key={user?.profile_image} alt="" title="" />
                                       <div className="nav-user-info-wrapper d-flex">
                                          <div className="nav-user-label"> {helpers.toTitleCase(user?.name)}  {(user?.last_name) ? user?.last_name : ""}</div>
                                          <div className="nav-user-type">  {helpers.toTitleCase(user?.role_name)} </div>
                                       </div>
                                    </a>
                                 </li>
                                 <li>
                                    <div className="nav-separator-item"></div>
                                 </li>
                                 {user?.role_name === 'freelancer' && (<li>

                                    <Link className="nav-menu-item" to={`/freelancer/view-profile/${getUserInfo('id')}`}>
                                       <span className="nav-icon">
                                          <img loading="lazy" className="img-fluid" src="/assets/images/account-nav-icon.svg" alt="" title="" />
                                       </span> Your profile</Link>
                                 </li>)}
                                 {user?.role_name === 'client' && (
                                    <>
                                       <li>
                                          <Link className="nav-menu-item" to="/client/my-jobs">
                                             <span className="nav-icon">
                                                <img loading="lazy" className="img-fluid" src="/assets/images/account-nav-icon.svg" alt="" title="" />
                                             </span> My Jobs</Link>
                                       </li>
                                       <li>
                                          <Link className="nav-menu-item" to="/client/job-contracts">
                                             <span className="nav-icon">
                                                <img loading="lazy" className="img-fluid" src="/assets/images/account-nav-icon.svg" alt="" title="" />
                                             </span>All Contracts</Link>
                                       </li>
                                    </>
                                 )}

                                 {user?.role_name === 'freelancer' && (
                                    <>
                                       <li>
                                          <Link className="nav-menu-item" to="/freelancer/applied-jobs">
                                             <span className="nav-icon">
                                                <img loading="lazy" className="img-fluid" src="/assets/images/account-nav-icon.svg" alt="" title="" />
                                             </span>Applied jobs</Link>
                                       </li>
                                       <li>
                                          <Link className="nav-menu-item" to="/freelancer/job-contracts">
                                             <span className="nav-icon">
                                                <img loading="lazy" className="img-fluid" src="/assets/images/account-nav-icon.svg" alt="" title="" />
                                             </span>All Contracts</Link>
                                       </li>
                                       <li >
                                          <Link to="/payment-setting" className="link-logout-btns" >
                                             <span className="nav-icon">
                                                <img loading="lazy" className="img-fluid" src="/assets/images/logout-icon.svg" alt="" title="" />
                                             </span> Payment Setting
                                          </Link>
                                       </li>
                                    </>
                                 )}
                                 {loggedIn && (
                                    <li>
                                       <Link className="nav-menu-item" to="/chat">
                                          <span className="nav-icon">
                                             <img loading="lazy" className="img-fluid" src="/assets/images/chat-svg.svg" alt="" title="" />
                                          </span> Chat</Link>
                                    </li>
                                 )}


                                 <li onClick={() => logoutUser()}>
                                    <a href="#" className="link-logout-btns" >
                                       <span className="nav-icon">
                                          <img loading="lazy" className="img-fluid" src="/assets/images/logout-icon.svg" alt="" title="" />
                                       </span> Log out
                                    </a>
                                 </li>
                              </ul>

                           </li>

                        </ul>
                     </div>
                     ) : (
                        <div className="header-btns">
                           <span className="login-menu-btns"><Link to="/sign-in">Login</Link></span>
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
