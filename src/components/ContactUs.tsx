import Header from './layouts/partials/Header'
import Footer from './layouts/partials/Footer'

function ContactUs() {
	return (
		<>
			<Header />
			<section className="learn-banner-section">
				<div className="main-container">
					<div className="inner-banner-content">
						<h1>Contact Us</h1>
						<p>Find freelancers and run projects your way at the world’s work marketplace.</p>
					</div>
				</div>
			</section>
			<section className="learn-about-section">
				<div className="main-container">
					<div className="result-title">
						<h2>Let’s get to work</h2>
						<p>Build relationships and create your own Virtual Talent Bench™ for quick project turnarounds or big transformations.</p>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}

export default ContactUs