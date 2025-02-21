import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';

function JobStrongTitle() {
  return (
    <>
	<Header />
	 <section className="joob-post-pr-sec light-bg-color">
         <div className="smallContainer">
            <div className="joobPost-Content">
               <div className="pr-forms-title-block">
                  <h1>Give your project a strong title</h1>
                  <p>Don’t stress! You can change this at any time.</p>
               </div>
               <div className="job-postForms">
                  <div className="job-forms-items">
                     <div className="form-group">
                        <label>Write a title for your job post</label>
                        <input className="form-control" type="text" placeholder="Seeking Super Great Accountant for Supplemental Book Work" />
                     </div>
                  </div>
                  <div className="form-listing-text">
                     <h5>Examples</h5>
                     <ul>
                        <li>General Book Keeping</li>
                        <li>Financial Audit for M&A</li>
                        <li>Accounting Data Organization</li>
                     </ul>
                  </div>
                  <div className="back-continue-btns d-flex align-items-center view-btns-items justify-space-between">
                     <a className="btn border-btn" href="#">back</a>
                     <a className="btn color-btn" href="#">Continue</a>
                  </div>
               </div>
            </div>
         </div>
      </section>
	</>
  );
}

export default JobStrongTitle;
