import React from 'react';


function RatingStarSection() {
	
	return (
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
							   <div className="air3-progress-bar-complete" style={{width: '90%'}}></div>
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
									<div className="air3-progress-bar-complete" style={{width: '5%'}}></div>
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
									<div className="air3-progress-bar-complete" style={{width: '0%'}}></div>
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
									<div className="air3-progress-bar-complete" style={{width: '0%'}}></div>
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
									<div className="air3-progress-bar-complete" style={{width: '0%'}}></div>
								</div>
							</div>
							<div className="distribution-count">0%</div>
						</div>
				   </div>
				</div>
			 </div>
		  </div>
	);
}

export default RatingStarSection;
