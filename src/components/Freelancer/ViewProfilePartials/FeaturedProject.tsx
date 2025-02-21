import React from 'react';


function FeaturedProject() {
	
	return (
		<section className="featured-project-section">
			<div className="main-container">
				<div className="featured-pr-title">
				   <h3>Featured Projects</h3>
				   <p>6 photos</p>
				</div>
				<div className="featured-pr-items">
					<div className="featured-rows d-flex flex-wrap">
						<div className="colm-3 d-flex flex-wrap">
							<div className="featured-pr-image">
								<img className="img-fluid" src="/assets/images/featured-image.jpg" alt="" title="" />
							</div>
						</div>
						<div className="colm-3 d-flex flex-wrap">
							<div className="featured-pr-image">
								<img className="img-fluid" src="/assets/images/featured-image-02.jpg" alt="" title="" />
							</div>
						</div>
						<div className="colm-3 d-flex flex-wrap">
							<div className="featured-pr-image">
								<img className="img-fluid" src="/assets/images/featured-image.jpg" alt="" title="" />
							</div>
						</div>
						<div className="colm-3 d-flex flex-wrap">
							<div className="featured-pr-image">
								<img className="img-fluid" src="/assets/images/featured-image-02.jpg" alt="" title="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FeaturedProject;
