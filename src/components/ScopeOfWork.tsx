import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';

function ScopeOfWork() {
  return (
    <>
	<Header />
	<section className="about-budget-section light-bg-color">
         <div className="smallContainer">
            <div className="scope-work-form">
               <div className="pr-forms-title-block">
                  <h1>Estimate the scope of work</h1>
                  <p>Don’t stress! You can change this at any time.</p>
               </div>
               <div className="scope-work-form-items">
                  <div className="scope-work-radio-items">
                     <div className="sc-work-radio-boxs">
                        <div className="work-bg-colr">
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Large
                                 <input type="radio" id="large" name="fav_language" value="large" />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                              <div className="rd-texts">
                                 <p>You might require a small agency, or a single person dedicated to your project alone. The deliverable may require weekly meetings, detailed reviews, and ongoing advice.</p>
                              </div>
                           </div>
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Medium
                                 <input type="radio" id="medium" name="fav_language" value="medium" checked />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                              <div className="rd-texts">
                                 <p>Your freelancer might have a few clients. You’re okay if they take a day or two to get back to you. This person might be supplemental to an existing accountant staff you employ.</p>
                              </div>
                           </div>
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Small
                                 <input type="radio" id="small" name="fav_language" value="small" />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                              <div className="rd-texts">
                                 <p>You need a quick task done that doesn’t require a high level of accounting expertise. You can provide clear instructions and don’t need ongoing meetings for particular advise or recurring support.</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="sc-work-radio-boxs">
                        <div className="work-titleBlock">
                           <h3>What is the estimated duration of your project?</h3>
                        </div>
                        <div className="work-bg-colr">
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Greater than 6 months
                                 <input type="radio" id="greater" name="fav-lg" value="months" />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                           </div>
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">3 to 6 months
                                 <input type="radio" id="greater-month" name="fav-lg" value="months" checked />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                           </div>
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Less than 3 months
                                 <input type="radio" id="greater-less" name="fav-lg" value="months" />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="sc-work-radio-boxs">
                        <div className="work-titleBlock">
                           <h3>What is the estimated duration of your project?</h3>
                           <p>Certification levels and past work experience will also be included on each professionals page, so you can select curated talent within each category of skill level while you hire.</p>
                        </div>
                        <div className="work-bg-colr">
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Entry
                                 <input type="radio" id="entry-fav" name="fav-entry" value="Entry" />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                              <div className="some-texts">
                                 <p>Someone who can take instruction and complete basic tasks, 0 to 3 years of experience.</p>
                              </div>
                           </div>
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Intermediate
                                 <input type="radio" id="intermediate-fav" name="fav-entry" value="Intermediate" checked />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                              <div className="some-texts">
                                 <p>Someone who can advice you on most financial accounting and executive, 3 to 6 years of experience.</p>
                              </div>
                           </div>
                           <div className="radio-check-box">
                              <div className="label-texts">
                                 <label className="r-text">Expert
                                 <input type="radio" id="expert-fav" name="fav-entry" value="Expert" />
                                 <span className="radiomark"></span>
                                 </label>
                              </div>
                              <div className="some-texts">
                                 <p>Someone who can advice you on most financial accounting and executive, 3 to 6 years of experience.</p>
                              </div>
                           </div>
                        </div>
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

export default ScopeOfWork;
