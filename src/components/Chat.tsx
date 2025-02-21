import React from 'react';
import { Link } from "react-router-dom";
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';

function FreelancerProfile() {
  return (
	<div id="chat-nuxt">
         <div id="chat-layouts">
            <div className="chat-desktop-layout">
               <div className="chat-layout-body">
                  <div className="chat-layout-index">
                     <div className="sidebar-panel">
                        <div className="chat-logo-with-content">
                           <div className="chat-header-log">
                              <img className="img--fluid" src="/assets/images/chat-logo.svg" alt="" title="" />
                           </div>
                           <div className="sidebar-profile-with-filter d-flex flex-wrap align-items-center justify-space-between">
                              <div className="sidebar-profile d-flex align-items-center">
                                 <div className="up-avatar">
                                    <div className="avatar-content">
                                       <img className="img--fluid" src="/assets/images/zakk-img.png" alt="" title="" />
                                    </div>
                                 </div>
                                 <div className="profile-text-content">
                                    <h4>Zakk Wylde</h4>
                                    <p>Senior developer</p>
                                 </div>
                              </div>
                              <div className="pr-side-filter">
                                 <span className="more-messages"><img className="img-fluid" src="/assets/images/filter-dot-icon.svg" alt="" title="" /></span>
                              </div>
                           </div>
                           <div className="sidebar-panel-list">
                              <div className="header-row">
                                 <h2 className="sidebar-row-header">Messages</h2>
                              </div>
                              <div className="sticky-sidebar-panel-header">
                                 <div className="search-row">
                                    <div className="info-search">
                                       <span className="search-btns"><img className="img-fluid" src="/assets/images/fi-search-icon.svg" alt="" title="" /></span>
                                       <input id="rooms-panel-header-search-primary" type="search" placeholder="Search" className="air3-input air3-input-round" />
                                       <div className="search-close"></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="sidebar-panel-body">
                           <div className="sidebar-panel-section sidebar-container">
                              <div className="sidebar-panel-room-list sidebar-panel-items">
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}>
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">Suzana Colin</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">Chris Martin reacted with </div>
                                             </div>
                                          </div>
                                          <div className="indicators-item">
                                             <div className="air3-badge-notification">2</div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}>
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">Christina Ker</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">thank a lot for your good recommendati...</div>
                                             </div>
                                          </div>
                                          <div className="indicators-item">
                                             <div className="air3-badge-notification">1</div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}>
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">Charles May</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">Chris Martin reacted with </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}> 
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">John Hope</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">i just sad, we may have a good couple.</div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}> 
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">Suzana Colin</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">Chris Martin reacted with</div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}>
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">Christina Ker</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">thank a lot for your good recommendati</div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}>
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">Charles May</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">Chris Martin reacted with</div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="sidebar-list-item" target="_self" id="">
                                    <div className="up-avatar">
                                       <div className="avatar-content" style={{ height: "36px", width: "36px", backgroundImage: "url('/assets/images/suzana-img.png')"}}> 
                                          <span className="status offline"></span> 
                                       </div>
                                    </div>
                                    <div className="right-content">
                                       <div className="header-row">
                                          <h4 className="item-title">John Hope</h4>
                                          <div className="times-tamp">Dec 15</div>
                                       </div>
                                       <div className="body-row">
                                          <div className="item-descriptions">
                                             <div className="message-last">
                                                <div className="message-up">i just sad, we may have a good couple.</div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="chat-layout-room">
                     <div className="chat-room">
                        <div className="chat-room-layout">
                           <div className="height-div">
                              <div className="up-room desktop-view">
                                 <div className="chat-room-section">
                                    <div className="top-chat-content">
                                       <header className="up-chat-header chat-header">
                                          <a className="chat-header-back" href="#"><span className="back-button-wrapper"><img className="img-fluid" src="/assets/images/back-icon.svg" alt="" title="" /></span></a>
                                          <div className="chat-header-body">
                                             <div className="up-avatar">
                                                <div className="avatar-content-person">
                                                   <img className="img-fluid" src="/assets/images/avatar-person-img.png" alt="" title=""/>
                                                </div>
                                             </div>
                                             <div className="text-info-container">
                                                <h4 className="chat-header-title">Christopher Campbell</h4>
                                                <div className="chat-subtitle">
                                                   <span className="chat-time">Last seen 02:55 pm</span>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="up-chat-header-actions">
                                             <div className="chat-video-call">
                                                <span className="air3-icon"><img className="img-fluid" src="/assets/images/video-call-icon.svg" alt="" title="" /></span>
                                             </div>
                                             <div className="chat-start-call">
                                                <span className="air3-icon"><img className="img-fluid" src="/assets/images/chat-call-icon.svg" alt="" title="" /></span>
                                             </div>
                                             <div className="more-messages-options">
                                                <span className="air3-icon"><img className="img-fluid" src="/assets/images/more-icons.svg" alt="" title="" /></span>
                                             </div>
                                          </div>
                                       </header>
                                       <div className="story-scroll-wrapper">
                                          <div className="chat-rooms-body">
                                             <div className="story-listing">
                                                <div className="client-message-item with-header">
                                                   <div className="story-day-header" style={{ display: 'none' }}>
                                                      <span className="header-times-tamp">Sunday, Oct 01, 2023</span>
                                                      <div className="separator-line"></div>
                                                   </div>
                                                   <div className="chat-room-story">
                                                      <div className="story-inner top">
                                                         <div className="avatar-section">
                                                            <div className="story-avatar">
                                                               <span className="avatar-content">SL</span>
                                                            </div>
                                                         </div>
                                                         <div className="chat-story-section">
                                                            <div className="chat-story-message">
                                                               <div className="chat-up-message">
                                                                  <p>Hello! I’m your personal AI Assistant Slothpilot.</p>
                                                               </div>
                                                               <span className="times-tamp">10:25 <img className="read-icon" src="/assets/images/tick-icons.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="up-story-item top">
                                                   <div className="chat-room-story">
                                                      <div className="story-inner top">
                                                         <div className="chat-story-section">
                                                            <div className="chat-story-message">
                                                               <div className="chat-up-message">
                                                                  <p>Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco,</p>
                                                               </div>
                                                               <span className="times-tamp">10:25 <img className="read-icon" src="/assets/images/read-icon.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                         <div className="avatar-section">
                                                            <div className="story-avatar">
                                                               <span className="avatar-content"><img className="img-fluid" src="/assets/images/person-logo.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="client-message-item with-header">
                                                   <div className="story-day-header" style={{ display: 'none' }}>
                                                      <span className="header-times-tamp">Sunday, Oct 01, 2023</span>
                                                      <div className="separator-line"></div>
                                                   </div>
                                                   <div className="chat-room-story">
                                                      <div className="story-inner top">
                                                         <div className="avatar-section">
                                                            <div className="story-avatar">
                                                               <span className="avatar-content">SL</span>
                                                            </div>
                                                         </div>
                                                         <div className="chat-story-section">
                                                            <div className="chat-story-message">
                                                               <div className="chat-up-message">
                                                                  <p>Hello! I’m your personal AI Assistant Slothpilot.</p>
                                                               </div>
                                                               <span className="times-tamp">10:25 <img className="read-icon" src="/assets/images/tick-icons.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="up-story-item top">
                                                   <div className="chat-room-story">
                                                      <div className="story-inner top">
                                                         <div className="chat-story-section">
                                                            <div className="chat-story-message">
                                                               <div className="chat-up-message">
                                                                  <p>Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco,</p>
                                                               </div>
                                                               <span className="times-tamp">10:25 <img className="read-icon" src="/assets/images/read-icon.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                         <div className="avatar-section">
                                                            <div className="story-avatar">
                                                               <span className="avatar-content"><img className="img-fluid" src="/assets/images/person-logo.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="client-message-item with-header">
                                                   <div className="story-day-header" style={{ display: 'none' }}>
                                                      <span className="header-times-tamp">Sunday, Oct 01, 2023</span>
                                                      <div className="separator-line"></div>
                                                   </div>
                                                   <div className="chat-room-story">
                                                      <div className="story-inner top">
                                                         <div className="avatar-section">
                                                            <div className="story-avatar">
                                                               <span className="avatar-content">SL</span>
                                                            </div>
                                                         </div>
                                                         <div className="chat-story-section">
                                                            <div className="chat-story-message">
                                                               <div className="chat-up-message">
                                                                  <p>Hello! I’m your personal AI Assistant Slothpilot.</p>
                                                               </div>
                                                               <span className="times-tamp">10:25 <img className="read-icon" src="/assets/images/tick-icons.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="up-story-item top">
                                                   <div className="chat-room-story">
                                                      <div className="story-inner top">
                                                         <div className="chat-story-section">
                                                            <div className="chat-story-message">
                                                               <div className="chat-up-message">
                                                                  <p>Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco,</p>
                                                               </div>
                                                               <span className="times-tamp">10:25 <img className="read-icon" src="/assets/images/read-icon.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                         <div className="avatar-section">
                                                            <div className="story-avatar">
                                                               <span className="avatar-content"><img className="img-fluid" src="/assets/images/person-logo.svg" alt="" title="" /></span>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="composer-container">
                                          <div className="up-composer">
                                             <div className="input-area">
                                                <div className="composer-wrapper">
                                                   <div className="composer">
                                                      <textarea name="message" className="form-control" id="message" style={{textTransform: 'none'}} cols={30} rows={5} placeholder="Type text here..."></textarea>
                                                      <div className="file-attachment">
                                                         <span className="composer-button"><img className="img-fluid" src="/assets/images/atteched-lick-icon.svg" alt="" title="" /></span>
                                                      </div>
                                                      <div className="composer-actions-section">
                                                         <div className="smile-emoji">
                                                            <span className="emoji-icon"><img className="img-fluid" src="/assets/images/smile-emoji-icon.svg" alt="" title="" /></span>
                                                         </div>
                                                         <div className="audio-btns">
                                                            <span className="audio-icon"><img className="img-fluid" src="/assets/images/audio-icon.svg" alt="" title="" /></span>
                                                         </div>
                                                         <div className="send-message-section">
                                                            <a href="#"><span>Send</span> <img className="img-fluid" src="/assets/images/send-icon.svg" alt="" title="" /></a>
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
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
  );
}

export default FreelancerProfile;
