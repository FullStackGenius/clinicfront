import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';

function FreelancerProfile() {
  return (
	<>
	  <Header />	
      <section className="project-details-section">
         <div className="main-container">
            <div className="pr-details-ingo d-flex flex-wrap">
               <div className="colm-8 pr-content-colm">
                  <div className="about-project-info">
                     <div className="user-top-info-sec">
                        <div className="pr-user-badge d-flex flex-wrap align-items-center">
                           <div className="pr-badge-image">
                              <img className="img-fluid" src="/assets/images/drain-frog-image.png" alt="" title="" />
                           </div>
                           <div className="pr-user-badge-text">
                              <h1>Drain Frog</h1>
                              <div className="pr-fl-rating d-flex align-items-center">
                                 <span className="fl-rating-text">Exelent 4.9</span> <span className="fl-rating-icon"><img className="img-fluid" src="/assets/images/exelent-rating-icon.svg" alt="" title="" /></span>
                              </div>
                              <div className="user-badge-quality d-flex align-items-center">
                                 <span><img className="img-fluid" src="/assets/images/top-pro-icon.svg" /></span>Top Pro
                              </div>
                              <div className="pr-share-btns">
                                 <a href="#"><img className="img-fluid" src="/assets/images/share-icon.svg" alt="" title="" /> Share</a>
                              </div>
                           </div>
                        </div>
                        <div className="pr-user-intros">
                           <p>The best place to discover & apply to the coolest start up jobs</p>
                           <h3>introduction</h3>
                           <p>The best place to discover & apply to the coolest start up jobs The best place to discover & apply to the coolest start up jobsThe best place to discover & apply to the coolest start up jobsThe best place to </p>
                        </div>
                     </div>
                     <div className="pr-overview-infos">
                        <div className="d-flex flex-wrap pr-payment-info-sec">
                           <div className="colm-6">
                              <div className="overview-content-div">
                                 <h3>Overview</h3>
                                 <div className="overview-listing">
                                    <ul>
                                       <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/current-pro-icon.svg" alt="" title="" /></span> <span className="over-list-text">Current top pro</span></li>
                                       <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/trophy-icon.svg" alt="" title="" /></span> <span className="over-list-text">Hire 171 times</span></li>
                                       <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/over-location-icon.svg" alt="" title="" /></span> <span className="over-list-text">6 Similar jobs near you</span></li>
                                       <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/user-checked-icon.svg" alt="" title="" /></span> <span className="over-list-text">Background Checked</span></li>
                                       <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/employ-icon.svg" alt="" title="" /></span> <span className="over-list-text">1 Employ</span></li>
                                       <li className="d-flex align-items-center pr-listing"><span className="over-list-icon"><img className="img-fluid" src="/assets/images/time-line-icon.svg" alt="" title="" /></span> <span className="over-list-text">2 years in bussiness</span></li>
                                    </ul>
                                 </div>
                                 <div className="overview-hour">
                                    <h3>Overview</h3>
                                    <div className="hour-blocks">
                                       <div className="hour-boxs">
                                          <ul>
                                             <li className="d-flex justify-space-between">
                                                <span className="waek-text">Sun</span>
                                                <span className="time-text">8:00 am- 4:00 pm</span>
                                             </li>
                                             <li className="d-flex justify-space-between">
                                                <span className="waek-text">Mon</span>
                                                <span className="time-text">8:00 am- 4:00 pm</span>
                                             </li>
                                          </ul>
                                          <div className="hr-read-btns">
                                             <a href="javascript;;">Read more</a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="colm-6">
                              <div className="payment-content-div">
                                 <div className="over-payment-block">
                                    <h3>Payment methods</h3>
                                    <p>The best place to discover & apply to the coolest start up jobs The best place to discover & apply to the coolest start up jobsThe best place to discover & apply </p>
                                 </div>
                                 <div className="over-social-block">
                                    <h3>Social media</h3>
                                    <ul>
                                       <li><a href="javascript;;">Facebook</a></li>
                                    </ul>
                                 </div>
                                 <div className="over-topPro-block">
                                    <h3>Top Pro Status</h3>
                                    <p>The best place to discover & apply to the coolest start up jobs The best place to discover & apply</p>
                                    <div className="over-award">
                                       <div className="award-icons">
                                          <div className="award-image-block">
                                             <img className="img-fluid" src="/assets/images/pro-status-icon.svg" alt="" title="" />
                                             <p>2023</p>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="overview-two-btns">
                           <div className="d-flex align-items-center view-btns-items justify-space-between">
                              <a className="btn msg-btn" href="#"><span><img className="img-fluid" src="/assets/images/message-icon.svg" alt="" title="" /></span>Message</a>
                              <a className="btn call-btn" href="#"><span><img className="img-fluid" src="/assets/images/call-icon.svg" alt="" title="" /></span>Request  a call</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="colm-4 pr-sidebar-colm">
                  <div className="pr-detail-sidebar">
                     <div className="pr-sidebar-boxs">
                        <div className="custom-title-and-description">
                           <h3>$70/servicesmcall</h3>
                           <p>(waived if hired)</p>
                           <div className="view_btns">
                              <a href="#">view details</a>
                           </div>
                        </div>
                        <div className="address-details-form">
                           <div className="add-form-group">
                              <label>Zip code</label>
                              <input className="form-control" type="text" name="zip-code" placeholder="19130" />
                           </div>
                           <div className="add-form-group">
                              <label>Drain Problems</label>
                              <select className="form-select" aria-label="Default select example">
                                 <option value="">Select answer (s)</option>
                                 <option value="1">Select answer (s)</option>
                                 <option value="2">Select answer (s)</option>
                                 <option value="3">Select answer (s)</option>
                              </select>
                           </div>
                           <div className="availiblity-btns">
                              <a href="javascript;;">Check Availiblity</a>
                           </div>
                        </div>
                        <div className="response-message d-flex align-items-center justify-content-center">
                           <span className="message-icon"><img src="/assets/images/comment-icon.svg" alt="" title="" /></span>
                           <p>Respont in about <strong>1 hour</strong></p>
                        </div>
                        <div className="pr-gurantee-boxs">
                           <div className="pr-gurantee-img-boxs d-flex align-items-center">
                              <span className="gurantee-icon"> <img className="img-fluid" src="/assets/images/gurantee-icon.svg" alt="" title="" /></span>
                              <h3>Thumbtack Gurantee</h3>
                           </div>
                           <p>The best place to discover & apply to the coolest start up jobs The best place <a href="javascript;;">Learn More</a></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="featured-project-section">
         <div className="main-container">
            <div className="featured-pr-title">
               <h3>Featured Projects</h3>
               <p>6 photos</p>
            </div>
            <div className="featured-pr-items">
               <div className="featured-rows d-flex flex-wrap">
                  <div className="colm-3 d-flex flex-wrap">
                     <div className="featured-pr-image">
                        <img className="img-fluid" src="/assets/images/featured-image.jpg" alt="" title="" />
                     </div>
                  </div>
                  <div className="colm-3 d-flex flex-wrap">
                     <div className="featured-pr-image">
                        <img className="img-fluid" src="/assets/images/featured-image-02.jpg" alt="" title="" />
                     </div>
                  </div>
                  <div className="colm-3 d-flex flex-wrap">
                     <div className="featured-pr-image">
                        <img className="img-fluid" src="/assets/images/featured-image.jpg" alt="" title="" />
                     </div>
                  </div>
                  <div className="colm-3 d-flex flex-wrap">
                     <div className="featured-pr-image">
                        <img className="img-fluid" src="/assets/images/featured-image-02.jpg" alt="" title="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section id="pr-reviews-section">
         <div className="main-container">
            <div className="pr-reviews-content">
               <div className="distribution-by-stars">
                  <div className="reviews-guidline">
                     <div className="dist-rating">
                        <h3>Reviews</h3>
                        <p>Custumeers rated their Pro highly for <strong>responsiveness, professionalism, and work quality</strong></p>
                     </div>
                     <div className="distribution-by-rating d-flex flex-wrap">
                        <div className="span-colm-5">
                           <div className="distribution-by-stars-heading">
                              <h3>Exelent 4.9</h3>
                              <div className="air3-rating">
                                 <ul>
                                    <li><img className="img-fluid" src="/assets/images/review-star.svg" alt="" title="" /></li>
                                    <li><img className="img-fluid" src="/assets/images/review-star.svg" alt="" title="" /></li>
                                    <li><img className="img-fluid" src="/assets/images/review-star.svg" alt="" title="" /></li>
                                    <li><img className="img-fluid" src="/assets/images/review-star.svg" alt="" title="" /></li>
                                    <li><img className="img-fluid" src="/assets/images/review-star.svg" alt="" title="" /></li>
                                 </ul>
                              </div>
                              <p>77 reviews</p>
                           </div>
                        </div>
                        <div className="span-colm-7">
                           <div className="distribution-mt d-flex flex-column">
                              <div className="tws-rating-row">
                                 <div className="rating-st d-flex align-items-center">
                                    <span className="tws-title">5</span><span className="tws-rate"><img src="/assets/images/review-small-star-icon.svg" alt="" title="" /></span>
                                 </div>
                                 <div className="air3-progress">
                                    <div className="air3-progress-bar">
                                       <div className="air3-progress-bar-complete" style={{width: "90%"}}></div>
                                    </div>
                                 </div>
                                 <div className="distribution-count">95%</div>
                              </div>
                              <div className="tws-rating-row">
                                 <div className="rating-st d-flex align-items-center">
                                    <span className="tws-title">4</span><span className="tws-rate"><img src="/assets/images/review-small-star-icon.svg" alt="" title="" /></span>
                                 </div>
                                 <div className="air3-progress">
                                    <div className="air3-progress-bar">
                                       <div className="air3-progress-bar-complete" style={{width: "5%"}}></div>
                                    </div>
                                 </div>
                                 <div className="distribution-count">5%</div>
                              </div>
                              <div className="tws-rating-row">
                                 <div className="rating-st d-flex align-items-center">
                                    <span className="tws-title">3</span><span className="tws-rate"><img src="/assets/images/review-small-star-icon.svg" alt="" title="" /></span>
                                 </div>
                                 <div className="air3-progress">
                                    <div className="air3-progress-bar">
                                       <div className="air3-progress-bar-complete" style={{width: "0%"}}></div>
                                    </div>
                                 </div>
                                 <div className="distribution-count">0%</div>
                              </div>
                              <div className="tws-rating-row">
                                 <div className="rating-st d-flex align-items-center">
                                    <span className="tws-title">2</span><span className="tws-rate"><img src="/assets/images/review-small-star-icon.svg" alt="" title="" /></span>
                                 </div>
                                 <div className="air3-progress">
                                    <div className="air3-progress-bar">
                                       <div className="air3-progress-bar-complete" style={{width: "0%"}}></div>
                                    </div>
                                 </div>
                                 <div className="distribution-count">0%</div>
                              </div>
                              <div className="tws-rating-row">
                                 <div className="rating-st d-flex align-items-center">
                                    <span className="tws-title">1</span><span className="tws-rate"><img src="/assets/images/review-small-star-icon.svg" alt="" title="" /></span>
                                 </div>
                                 <div className="air3-progress">
                                    <div className="air3-progress-bar">
                                       <div className="air3-progress-bar-complete" style={{width: "0%"}}></div>
                                    </div>
                                 </div>
                                 <div className="distribution-count">0%</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="pr-reviews-search">
                     <div className="pr-search-text">
                        <p>Your trust is everything to us. <strong>Learn About our review guidlines</strong></p>
                     </div>
                     <div className="review-search">
                        <form className="review-search-form">
                           <div className="nav-search-input">
                              <input maxLength={100} autoComplete="off" type="search" name="q" placeholder="Search......." value="" className="search-input" />
                              <button type="submit" aria-label="Search" className="rev-btn-icon">
                              <img className="img-fluid" src="/assets/images/review-search-icon.svg" alt="" title="" />
                              </button>
                           </div>
                           <div className="review-search-dropdown">
                              <select className="form-select" aria-label="Default select example">
                                 <option value="">Most revants</option>
                                 <option value="1">Most revants</option>
                                 <option value="2">Most revants</option>
                                 <option value="3">Most revants</option>
                              </select>
                           </div>
                        </form>
                        <div className="fl-project-spec-choices">
                           <ul>
                              <li className="air3-btn-sm"><a href="#">Plumbing . 10</a></li>
                              <li className="air3-btn-sm"><a href="#">toilet . 4</a></li>
                              <li className="air3-btn-sm"><a href="#">Plumber . 4</a></li>
                              <li className="air3-btn-sm"><a href="#">issue . 4</a></li>
                              <li className="air3-btn-sm"><a href="#">clog . 3</a></li>
                              <li className="air3-btn-sm"><a href="#">problem . 11</a></li>
                              <li className="air3-btn-sm"><a href="#">fix . 2</a></li>
                              <li className="air3-btn-sm"><a href="#">pipe . 2</a></li>
                              <li className="air3-btn-sm"><a href="#">sink . 2</a></li>
                              <li className="air3-btn-sm"><a href="#">Plumbing . 10</a></li>
                              <li className="air3-btn-sm"><a href="#">toilet . 4</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="all-projects-reviews">
               <div className="air-review-container">
                  <div className="pr-reviewsItems">
                     <div className="review-revamped">
                        <div className="re-revamped-items">
                           <div className="header-review d-flex flex-wrap align-items-center">
                              <div className="avatar-re">
                                 <img className="img-fluid" src="/assets/images/avatar-img.png" alt="" title="" />
                              </div>
                              <div className="company-re">
                                 <div className="re-user-title">Drain john</div>
                                 <div className="company-description-re d-flex flex-wrap justify-space-between align-items-center">
                                    <div className="company-rating-re d-flex flex-wrap align-items-center">
                                       <div className="rating-re-image">
                                          <img className="img-fluid" src="/assets/images/five-star.svg" alt="" title="" />
                                       </div>
                                       <span className="separate-dot"></span>
                                       <div className="pr-gurantee-img-boxs d-flex align-items-center">
                                          <span className="gurantee-icon"> <img className="img-fluid" src="/assets/images/gurantee-icon.svg" alt="" title="" /></span>
                                          <p>Thumbtack Gurantee</p>
                                       </div>
                                    </div>
                                    <div className="regular-company-location">May 22, 2024</div>
                                 </div>
                              </div>
                           </div>
                           <div className="description-re">
                              <p>KaiB was amazing with our cats!!  This was our first time using a pet-sitting service, so we were naturally quite anxious. We took a chance on Kai and completely lucked out! We booked Kai to come twice a day for three days. Kai spent a considerable amount of time playing and engaging with our cats. She also sent us very funny and detailed reports at the end of each session... <span className="read-link-text"><a href="javascript;;">Read More</a></span></p>
                              <div className="rev-heading">Plumbing Repair</div>
                           </div>
                        </div>
                        <div className="review-feedback">
                           <div className="feedback-description">
                              <h5>Drain Frog  reply</h5>
                              <p>KaiB was amazing with our cats!!  This was our first time using a pet-sitting service, so we were naturally quite anxious. We took a chance on Kai and completely lucked out! We booked Kai to come twice a day for three days. Kai spent a considerable amount of time playing and engaging with our cats. She also sent us very funny and detailed reports at the end of each session... <span className="read-link-text"><a href="javascript;;">Read More</a></span></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
	  <Footer />
	</>  
  );
}

export default FreelancerProfile;
