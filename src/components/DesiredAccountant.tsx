import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';

function DesiredAccountant() {
  return (
    <>
	<Header />
	<section className="skillProject-section">
         <div className="smallContainer">
            <div className="project-forms">
               <div className="pr-forms-title-block">
                  <h1>Tell us about your desired Accountant</h1>
               </div>
               <div className="acc-with-buttons">
                  <div className="skillSearch-block">
                     <div className="skill-search-form">
                        <form>
                           <div className="from-group">
                              <input type="search" name="q" placeholder="Search here" value="" className="search-input" />
                           </div>
                           <button type="submit" className="skill-search-btns"><img className="img-fluid" src="/assets/images/skill-search-icon.svg" alt="" title="" /></button>
                        </form>
                     </div>
                     <div className="result-skill-text d-flex align-items-center">
                        <img className="img-fluid" src="/assets/images/skill-icon.svg" alt="" title="" /> <span className="res-text">For best result add 3-5 skills</span>
                     </div>
                  </div>
                  <div className="skill-accordion">
                     <div className="accordionItem is-active">
                        <h3 className="accordionThumb">Accounting Skills <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" /></span></h3>
                        <div className="accordionPanel">
                           <div className="acc-skill-items">
                              <div className="skill-with-see">
                                 <ul className="d-flex flex-wrap align-items-center">
                                    <li><a href="javascript;;"><span>Accounting</span> <img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" /></a></li>
                                    <li><a href="javascript;;"><span>Accounts pable</span> <img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" /></a></li>
                                    <li><a href="javascript;;"><span>Microsoft Exel</span> <img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" /></a></li>
                                    <li><a href="javascript;;"><span>Account Reconcilliation</span> <img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" /></a></li>
                                    <li><a href="javascript;;"><span>General Ledger</span> <img className="img-fluid" src="/assets/images/plus-icons.svg" alt="" title="" /></a></li>
                                    <li className="see-skill"><a href="javascript;;">See More</a></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="accordionItem">
                        <h3 className="accordionThumb">Accounting Sectors <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" /></span></h3>
                        <div className="accordionPanel">
                        </div>
                     </div>
                     <div className="accordionItem">
                        <h3 className="accordionThumb">Accounting Certifications <span className="acc-arrow"><img className="img-fluid" src="/assets/images/accordion-icon.svg" alt="" title="" /></span></h3>
                        <div className="accordionPanel">
                        </div>
                     </div>
                  </div>
                  <div className="skill-cate-text">
                     <div className="cate-with-text">
                        <a className="d-flex align-items-center" href="#">
                        <img className="img-fluid" src="/assets/images/skill-cate-icon.svg" alt="" title="" /> <span>Change all skill category</span>
                        </a>
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

export default DesiredAccountant;
