import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';

function OnBoarding() {
  return (
    <>
	<Header />
	 <section className="all-jobs-section">
         <div className="main-container">
            <div className="job-title-block">
               <h1>My jobs</h1>
               <div className="earnings-text">Total earnings made: <span className="earning-prices">$00.00</span></div>
            </div>
            <div className="tab-title-block">
               <h3>Contracts by Stage</h3>
            </div>
            <div className="jobs-tab-items">
               <div className="tabs-horizontal-items">
                  <div className="horizontal-tab-list">
                     <ul>
                        <li className="air-tab-item">All</li>
                        <li className="air-tab-item is-active">Onboarding 1</li>
                        <li className="air-tab-item">Active</li>
                        <li className="air-tab-item">Submitted</li>
                        <li className="air-tab-item">Completed</li>
                     </ul>
                  </div>
               </div>
               <div className="tab-card-section">
                  <div className="tab-card-items">
                     <div className="tab-grid-container">
                        <div className="tab-span-colm-9">
                           <div className="contract-cta-sec">
                              <div className="contract-title-block">
                                 <h2 className="title">Figma Prototyping Tutoring Needed</h2>
                              </div>
                              <div className="cta-middle-content">
                                 <div className="cta-grid-container">
                                    <div className="span-3-colm">
                                       <div className="contract-info-content">
                                          <h4 className="openings-title">Hired by Connor</h4>
                                          <div className="openings-text">Metric Mission</div>
                                          <div className="opening-status-text">
                                             <span>Oct 17 - Present</span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="span-9-colm">
                                       <div className="contract-feedback-info">
                                          <div className="activity-data-info">
                                             <div className="title-badge-onboard d-flex align-items-center badge-gaps">
                                                <div className="air-badge">Onboarding</div>
                                                <div className="badge-text-info">
                                                   <div className="badge-text-base">
                                                      <span>Waiting to start milestone. Please contact your client.</span>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="charge-rate-info">
                                             <div className="d-flex flex-wrap rate-gaps">
                                                <div className="rate-text">
                                                   <div className="text-body-rate">
                                                      <span>Rate: $80/hr</span>
                                                   </div>
                                                </div>
                                                <div className="hour-text">
                                                   <div className="text-body-rate">
                                                      <span>Monthly Hour Limit: 40</span>
                                                   </div>
                                                </div>
                                                <div className="month-rate-text">
                                                   <div className="text-body-rate">
                                                      <span>Hours this Month: 15</span>
                                                   </div>
                                                </div>
                                                <div className="current-rate-text">
                                                   <div className="text-body-rate">
                                                      <span>Current Escrow: $10,000</span>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-span-colm-3">
                           <div className="d-flex tab-btns-grid">
                              <div className="tab-btns-items">
                                 <a className="tab-view-btns" href="#">View Job</a>
                                 <a className="tab-message-btns" href="#">Message</a>
                                 <a className="tab-time-btns" href="#">Time Sheet</a>
                              </div>
                              <div className="open-action-btn">
                                 <button type="button" aria-expanded="false" data-ev-label="dropdown-secondary-toggle" className="air-btn-toggle">
                                 <span className="open-icon"><img className="img-fluid" src="/assets/images/three-dots-icon.svg" alt="" title=""/></span>
                                 </button>
                              </div>
                           </div>
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

export default OnBoarding;
