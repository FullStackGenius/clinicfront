import React from 'react'
import { Link } from 'react-router-dom'
import Header from './layouts/partials/Header'
import ContentLoader from './Common/ContentLoader'
import Footer from './layouts/partials/Footer'

function PrivacyPolicy() {
  return (
    <>
	<Header />
		<section className="learn-banner-section">
			<div className="main-container">
				<div className="inner-banner-content">
					<h1>Privacy & policy</h1>
					<p>Find freelancers and run projects your way at the world’s work marketplace.</p>
					{/* <div className="talent-btns"><Link to="/">Find talent</Link></div> */}
				</div>
			</div>
		</section>
		<section className="learn-about-section">
			<div className="main-container">
				<div className="result-title">
				   <h2>Let’s get to work</h2>
				   <p>Build relationships and create your own Virtual Talent Bench™ for quick project turnarounds or big transformations.</p>
				</div>
				{/* <div className="learn-about-content">
					
						<div className="row align-items-center">
							<div className="colm-6">
								<div className="about-image">
									<img className="img-fluid" src={hiredata.content_image_path} alt="" title="" />
								</div>
							</div>
							<div className="colm-6">
								<div className="hm-about-content">{parse(hiredata.content)}</div>
							</div>
						</div>
					
				</div> */}
			</div>
		</section>
	  <Footer />
	</>
  )
}

export default PrivacyPolicy