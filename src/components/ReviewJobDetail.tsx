import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';

function ReviewJobDetail() {
  return (
    <>
	<Header />
	 <section className="re-jobDetail-section light-bg-color">
         <div className="smallContainer">
            <div className="re-jobDetail-content">
               <div className="pr-forms-title-block">
                  <h1>Review Job Details</h1>
               </div>
               <div className="book-work-items">
                  <div className="d-flex align-items-center justify-space-between icon-title-wrapper">
                     <h4 className="mb-2h">Seeking Super Great Accountant for Supplemental Book Work</h4>
                     <span className="edit_Link"><img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" /></span>
                  </div>
               </div>
               <div className="text-work-block">
                  <div className="d-flex align-items-center justify-space-between icon-title-wrapper">
                     <p className="mp-2h">I need help with our business’ XYZ accounting needs. Timeline is ASAP. Must have CPA.</p>
                     <span className="edit_Link"><img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title="" /></span>
                  </div>
               </div>
               <div className="jobDetails-items d-flex flex-column">
                  <div className="icon-title-wrapper">
                     <div className="title-text-boxs d-flex align-items-center justify-space-between">
                        <h4 className="mb-2h">Category</h4>
                        <span className="edit_Link"><img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/></span>
                     </div>
                     <p className="mp-2h">accounting</p>
                  </div>
                  <div className="icon-title-wrapper">
                     <div className="title-text-boxs d-flex align-items-center justify-space-between">
                        <h4 className="mb-2h">Skill</h4>
                        <span className="edit_Link"><img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/></span>
                     </div>
                     <p className="mp-2h">accounting</p>
                  </div>
                  <div className="icon-title-wrapper">
                     <div className="title-text-boxs d-flex align-items-center justify-space-between">
                        <h4 className="mb-2h">Scope</h4>
                        <span className="edit_Link"><img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/></span>
                     </div>
                     <p className="mp-2h">medion 3-6 month entry level not planning to hire full time</p>
                  </div>
                  <div className="icon-title-wrapper">
                     <div className="title-text-boxs d-flex align-items-center justify-space-between">
                        <h4 className="mb-2h">Location Preffrence</h4>
                        <span className="edit_Link"><img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/></span>
                     </div>
                     <p className="mp-2h">Us only</p>
                  </div>
                  <div className="icon-title-wrapper">
                     <div className="title-text-boxs d-flex align-items-center justify-space-between">
                        <h4 className="mb-2h">Budget</h4>
                        <span className="edit_Link"><img className="img-fluid" src="/assets/images/edit-light-icon.svg" alt="" title=""/></span>
                     </div>
                     <p className="mp-2h">$30.00 to /$60.0</p>
                  </div>
               </div>
               <div className="reJob-faq">
                  <div className="air3-card-sec">
                     <div className="d-flex align-items-center justify-space-between reJob-title">
                        <h4 className="mb-2h">Screening question (optional)</h4>
                        <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title=""/></span>
                     </div>
                     <div className="ac-Panel">
                        <p>medion 3-6 month entry level not planning to hire full time</p>
                     </div>
                  </div>
                  <div className="air3-card-sec">
                     <div className="d-flex align-items-center justify-space-between reJob-title">
                        <h4 className="mb-2h">Advance preference (optional)</h4>
                        <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title=""/></span>
                     </div>
                     <div className="ac-Panel">
                        <p>medion 3-6 month entry level not planning to hire full time</p>
                     </div>
                  </div>
                  <div className="air3-card-sec">
                     <div className="d-flex align-items-center justify-space-between reJob-title">
                        <h4 className="mb-2h">Job post preference (optional)</h4>
                        <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title=""/></span>
                     </div>
                     <div className="ac-Panel">
                        <p>medion 3-6 month entry level not planning to hire full time</p>
                     </div>
                  </div>
               </div>
               <div className="air3-card-footer">
                  <div className="d-flex align-items-center ft-btns-items">
                     <div className="d-flex align-items-center left-btn-colm">
                        <a className="cta-back-btns" href="#">Back</a>
                        <a className="cta-save-btns" href="#">Save as Draft</a>
                     </div>
                     <div className="right-btn-colm">
                        <a className="cta-job-btns" href="#">Post job</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
	</>
  );
}

export default ReviewJobDetail;
