import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';

function DescribeHiringNeed() {
  return (
    <>
	<Header />
	 <section className="job-conversation-sec light-bg-color">
         <div className="smallContainer">
            <div className="hireJob-Content">
               <div className="pr-forms-title-block">
                  <h1>Describe your hiring needs</h1>
               </div>
               <div className="hiring-jobForms">
                  <div className="form-listing-text">
                     <h5>Be clear about</h5>
                     <ul>
                        <li><a href="#">Deliverables</a>, what type of finished products will you be expecting?</li>
                        <li><a href="#">Timelines</a>, is this something you need done within a certain time frame?</li>
                        <li><a href="#">Specialties</a>, do you require the accountant to have experience?</li>
                        <li><a href="#">Certifications</a>, are you looking for them to be accredited in certain areas?</li>
                     </ul>
                  </div>
                  <div className="hiring-forms-items">
                     <div className="form-group">
                        <label>Describe what you need</label>
                        <textarea name="message" className="form-control" id="message" style={{textTransform: 'none'}} cols={30} rows={5} placeholder="Already have description ? paste it here"></textarea>
                     </div>
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

export default DescribeHiringNeed;
