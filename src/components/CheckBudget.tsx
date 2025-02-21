import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';

function CheckBudget() {
  return (
    <>
	<Header />
	<section className="about-budget-section light-bg-color">
         <div className="smallContainer">
            <div className="budget-forms">
               <div className="pr-forms-title-block">
                  <h1>Tell us about your budget</h1>
               </div>
               <div className="budget-forms-items">
                  <div className="budget-radio-items">
                     <div className="radio-btns-conatiner">
                        <div className="air3-radioBtn-box">
                           <input className="form-check-input" type="radio" name="radio-group-3" id="radio-groups-1" checked />
                           <div className="form-radio-bg">
                              <div className="air3-radio-label-check-icon">
                                 <div className="air3-checkbox-input">
                                    <span className="air3-radio-icon"><img className="img-fluid" src="/assets/images/active-check-icon.svg" alt="" title="" /></span>
                                 </div>
                              </div>
                              <div className="air3-icon-lg">
                                 <img className="img-fluid" src="/assets/images/hour-rate-icons.svg" alt="" title="" />
                              </div>
                              <div className="air3-btn-box-label">
                                 <h4>Hourly Rate</h4>
                              </div>
                           </div>
                        </div>
                        <div className="air3-radioBtn-box">
                           <input className="form-check-input" type="radio" name="radio-group-3" id="radio-groups-2" />
                           <div className="form-radio-bg">
                              <div className="air3-radio-label-check-icon">
                                 <div className="air3-checkbox-input">
                                    <span className="air3-radio-icon"><img className="img-fluid" src="/assets/images/active-check-icon.svg" alt="" title="" /></span>
                                 </div>
                              </div>
                              <div className="air3-icon-lg">
                                 <img className="img-fluid" src="/assets/images/fixed-rate-icon.svg" alt="" title="" />
                              </div>
                              <div className="air3-btn-box-label">
                                 <h4>Fixed Rate</h4>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="budget-currency-items">
                     <div className="form-group">
                        <label>From</label>
                        <div className="currency-inputs">
                           <input id="step-rate" type="text" placeholder="$0.00" data-test="currency-input" data-ev-label="currency_input" data-ev-locale="en-us" data-ev-currency="USD" className="air3-input" />
                           <span id="currency-hourly" className="sr-only">/hr</span>
                        </div>
                     </div>
                     <div className="form-group">
                        <label>To</label>
                        <div className="currency-inputs">
                           <input id="fee-rate" type="text" placeholder="$0.00" data-test="currency-input" data-ev-label="currency_input" data-ev-locale="en-us" data-ev-currency="USD" className="air3-input" />
                           <span id="currency-hourly" className="sr-only">/hr</span>
                        </div>
                     </div>
                  </div>
                  <div className="budget-content-info">
                     <div className="bd-content-container">
                        <p>Please select your desired rate range.</p>
                        <p>Professionals tend <strong>$75 - $350</strong> hour USD for accounting projects depending on their expertise and experience.</p>
                        <div className="hour-rate-text">Not ready to set hourly rate. You can leave it blank and discuss with your talent.</div>
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

export default CheckBudget;
