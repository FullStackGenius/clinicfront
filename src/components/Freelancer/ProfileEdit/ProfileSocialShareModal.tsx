import React, { useState, useEffect } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';


interface ShareModalProps {
	url: string;
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
}

export const ProfileSocialShareModal: React.FC<ShareModalProps> = ({ url, title, description, isOpen, onClose }) => {
	const shareUrl = url; // URL to be shared
	const shareTitle = title; // Title for the share
	
	const handleClose = (e: React.MouseEvent) => {
		onClose();
		/*if (updated) {
			const result = window.confirm('Closing the modal will lose your changes?');
			if (result) onClose();
		} else {
			onClose();
		}*/
	};
	//console.log('error', error)
	return (
		<div id="edit-skill-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
         <div className="air-modal-items air-modal-import-resume-modal">
            <div className="airModal-content">
               <div className="airModal-header">
					<h2 className="airModal-title h2">Share Your Profile</h2>
					<button className="airModal-close" type="button" onClick={handleClose}>
						<div className="air-icon">
							<img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
						</div>
					</button>
               </div>
				<div className="airModal-body">
					<div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
					   {/* Facebook */}
					  <FacebookShareButton url={shareUrl} hashtag="#AmazingContent">
						<FacebookIcon size={40} round />
					  </FacebookShareButton>

					  {/* Twitter */}
					  <TwitterShareButton url={shareUrl} title={shareTitle}>
						<TwitterIcon size={40} round />
					  </TwitterShareButton>

					  {/* LinkedIn */}
					  <LinkedinShareButton url={shareUrl}>
						<LinkedinIcon size={40} round />
					  </LinkedinShareButton>

					  {/* WhatsApp */}
					  <WhatsappShareButton url={shareUrl} title={shareTitle}>
						<WhatsappIcon size={40} round />
					  </WhatsappShareButton>

					  {/* Email */}
					  <EmailShareButton url={shareUrl} subject={shareTitle} body={description}>
						<EmailIcon size={40} round />
					  </EmailShareButton>
					</div>
				</div>
            </div>
         </div>
      </div>
	);
};
