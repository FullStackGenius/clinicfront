import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../layouts/partials/Header';
import { getUserInfo } from "../../../_helpers/getUserInfo";

function NextBigOpertunity() {
	const navigate = useNavigate();
	const [username, setUserName] = useState<string>('');
	const [sliderItem, setSliderItem] = useState<number>(3);
	const [activeSlider, setActiveSlider] = useState<number>(1);
	
	useEffect(() => {
		var fullname = getUserInfo('fullname') || '';
		setUserName(fullname);
	}, []);	
	
	const changeSlider = (direction: string) => {
    if (direction === 'next') {
      if (activeSlider < sliderItem) {
        setActiveSlider(activeSlider + 1); // Move to the next slider
      }
    } else if (direction === 'prev') {
      if (activeSlider > 1) {
        setActiveSlider(activeSlider - 1); // Move to the previous slider
      }
    }
  };
	
  return (
    <>
	<Header />
	 <section className="big-opportunity-section profile-bg-section">
         <div className="main-container">
            <div className="pr-forms-title-block">
               <h1>Hey {username}, ready for your next big opportunity?</h1>
            </div>
            <div className="d-flex flex-wrap opportunity-content-sec">
               <div className="opportunity-left-colm">
                  <div className="opport-content">
                     <div className="opportunity-block">
                        <div className="opp-faq-items">
                           <h4 className="opp-faq-header"><span className="opp-faq-icon"><img className="img-fluid" src="/assets/images/account-user-icon.svg" alt="" title="" /></span> Answer a few questions and start building your profile</h4>
                        </div>
                        <div className="opp-faq-items">
                           <h4 className="opp-faq-header"><span className="opp-faq-icon"><img className="img-fluid" src="/assets/images/user-email-icon.svg" alt="" title="" /></span> Get selected to work remote contracting jobs </h4>
                        </div>
                        <div className="opp-faq-items">
                           <h4 className="opp-faq-header"><span className="opp-faq-icon"><img className="img-fluid" src="/assets/images/dollar-icon.svg" alt="" title="" /></span> Get paid the amount you deserve </h4>
                        </div>
                     </div>
                     <div className="time-texts">
                        <p>This will take 5 to 10 minutes to complete</p>
                     </div>
                     <div className="get-started-btns">
                        <button type="button" className="started-air-btn" onClick={() => navigate('/freelancer/inital-setup')}><span>Get started</span></button>
                     </div>
                  </div>
               </div>
               <div className="opportunity-right-colm">
                  <div className="profile-slider">
					{/*Slider Item 1*/}
                     <div className="pr-slider-items" style={{ display: activeSlider !== 1 ? 'none' : '' }}>
                        <div className="pr-slider-boxs">
                           <div className="pr-image">
                              <div className="avatarImage">
                                 <img className="img-fluid" src="/assets/images/sasheen-m-img.png" />
                                 <span className="client-online"></span>
                              </div>
                           </div>
                           <div className="flex-top-items">
                              <div className="pr-up-title">Sasheen M.</div>
                              <div className="pr-sub-title">Customen Experience Consultant..</div>
                           </div>
                           <div className="up-badge-rows">
                              <div className="up-badge-conatiner">
                                 <div className="info-badges info-badge-rates">
                                    <span className="air-icon"><img className="img-fluid" src="/assets/images/orange-star-img.svg" alt="" title="" /></span>
                                    <span className="feedback-score">5.05 </span>
                                 </div>
                                 <div className="info-badges">
                                    <span className="rate-per-hour">$320.0/hr</span>
                                 </div>
                                 <div className="info-badges">
                                    <span className="total-jobs">(32 jobs)</span>
                                 </div>
                              </div>
                           </div>
                           <div className="pr-short-content">
                              <p>“Accountant Clinic has given me the<br/> opportunity to finally make the<br/> income my schooling and<br/> certifications were for.“</p>
                           </div>
                        </div>
                     </div>
					 {/*Slider Item 2*/}
					 <div className="pr-slider-items" style={{ display: activeSlider !== 2 ? 'none' : '' }}>
                        <div className="pr-slider-boxs">
                           <div className="pr-image">
                              <div className="avatarImage">
                                 <img className="img-fluid" src="/assets/images/sasheen-m-img.png" />
                                 <span className="client-online"></span>
                              </div>
                           </div>
                           <div className="flex-top-items">
                              <div className="pr-up-title">John</div>
                              <div className="pr-sub-title">Customen Experience Consultant..</div>
                           </div>
                           <div className="up-badge-rows">
                              <div className="up-badge-conatiner">
                                 <div className="info-badges info-badge-rates">
                                    <span className="air-icon"><img className="img-fluid" src="/assets/images/orange-star-img.svg" alt="" title="" /></span>
                                    <span className="feedback-score">5.05 </span>
                                 </div>
                                 <div className="info-badges">
                                    <span className="rate-per-hour">$120.0/hr</span>
                                 </div>
                                 <div className="info-badges">
                                    <span className="total-jobs">(32 jobs)</span>
                                 </div>
                              </div>
                           </div>
                           <div className="pr-short-content">
                              <p>“Accountant Clinic has given me the<br/> opportunity to finally make the<br/> income my schooling and<br/> certifications were for.“</p>
                           </div>
                        </div>
                     </div>
					 {/*Slider Item 3*/}
					 <div className="pr-slider-items" style={{ display: activeSlider !== 3 ? 'none' : '' }}>
                        <div className="pr-slider-boxs">
                           <div className="pr-image">
                              <div className="avatarImage">
                                 <img className="img-fluid" src="/assets/images/sasheen-m-img.png" />
                                 <span className="client-online"></span>
                              </div>
                           </div>
                           <div className="flex-top-items">
                              <div className="pr-up-title">Adam.</div>
                              <div className="pr-sub-title">Customen Experience Consultant..</div>
                           </div>
                           <div className="up-badge-rows">
                              <div className="up-badge-conatiner">
                                 <div className="info-badges info-badge-rates">
                                    <span className="air-icon"><img className="img-fluid" src="/assets/images/orange-star-img.svg" alt="" title="" /></span>
                                    <span className="feedback-score">5.05 </span>
                                 </div>
                                 <div className="info-badges">
                                    <span className="rate-per-hour">$120.0/hr</span>
                                 </div>
                                 <div className="info-badges">
                                    <span className="total-jobs">(32 jobs)</span>
                                 </div>
                              </div>
                           </div>
                           <div className="pr-short-content">
                              <p>“Accountant Clinic has given me the<br/> opportunity to finally make the<br/> income my schooling and<br/> certifications were for.“</p>
                           </div>
                        </div>
                     </div>
                     <div className="carousel-list-controls">
                        <div className="btn-prev" onClick={() => changeSlider('prev')}>
                           <img className="img-fluid" src="/assets/images/left-arrow-icon.svg" alt="" title="" />
                        </div>
                        <div className="btn-next" onClick={() => changeSlider('next')}>
                           <img className="img-fluid" src="/assets/images/right-arrow-icon.svg" alt="" title="" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
	</>
  );
}

export default NextBigOpertunity;