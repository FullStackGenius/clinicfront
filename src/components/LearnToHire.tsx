import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';
import ContentLoader from './Common/ContentLoader';
import helpers from "../_helpers/common";
import axiosInstance from "../_helpers/axiosInstance";

interface LearnHireType {
	content: string;
	content_image: string;
	content_image_path: string;
}

function LearnToHire() {
	const [hiredata, setHireData] = useState<LearnHireType>({content: '', content_image: '', content_image_path: ''});
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
	useEffect(() => {
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			fetchPageData();
		}
	}, []);
	
	const fetchPageData = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get('get-learn-how-to-hire-page-data');
			//console.log('response', response)
			setHireData(response.data.learn_how_to_hire)
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
  return (
    <>
	<Header />
		<section className="learn-banner-section">
			<div className="main-container">
				<div className="inner-banner-content">
					<h1>Choose your way to get work done</h1>
					<p>Find freelancers and run projects your way at the world’s work marketplace.</p>
					<div className="talent-btns"><Link to="/">Find talent</Link></div>
				</div>
			</div>
		</section>
		<section className="learn-about-section">
			<div className="main-container">
				<div className="result-title">
				   <h2>Let’s get to work</h2>
				   <p>Build relationships and create your own Virtual Talent Bench™ for quick project turnarounds or big transformations.</p>
				</div>
				<div className="learn-about-content">
					{loading ? (
						<ContentLoader />
					) : (
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
					)}
				</div>
			</div>
		</section>
	  <Footer />
	</>
  );
}

export default LearnToHire;
