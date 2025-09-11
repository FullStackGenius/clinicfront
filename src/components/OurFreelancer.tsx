import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';

import axiosInstance from "../_helpers/axiosInstance";
import PaginationHtml from './Common/PaginationHtml';
import Loader from './Common/Loader';

interface Category {
	id: number;
	name: string;
	slug: string;
	category_id: number;
	get_category: object;
}

interface UserDetails {
	about_yourself: string;
	apt_suite: string;
	city: string;
	completed_steps: number;
	date_of_birth: string;
	hourly_rate: number;
	id: number;
	income_per_hour: number;
	next_step: number;
	phone_number: string;
	profile_headline: string;
	services_rate: number;
	state_provience: string;
	street_address: string;
	user_id: number;
	your_experience_id: number | null;
	your_goal_id: number | null;
	your_goal_name: string | null;
	zip_postalcode: string;
}

interface Freelancer {
	completed_jobs_count: number;
	country_id: number;
	country_name: string;
	email: string;
	get_how_like_to_work: string | null;
	id: number;
	last_name: string;
	name: string;
	profile_image_path: string;
	ratings: any[];
	role_id: number;
	role_name: string;
	skills: any[];
	sub_category: Category[];
	user_details: UserDetails;
}

interface PaginationLinks {
	url: string;
	label: string;
	active: boolean;
}

interface DataResponse {
	freelancers: {
		current_page: number;
		data: Freelancer[];
		first_page_url: string;
		from: number;
		last_page: number;
		last_page_url: string;
		links: PaginationLinks[];
		next_page_url: string | null;
		path: string;
		per_page: number;
		prev_page_url: string | null;
		to: number;
		total: number;
	};
}

interface ApiResponse {
	error: string;
	message: string;
	data: DataResponse;
}


function OurFreelancer() {
	const search = useLocation().search;
	//console.log('path', search);
	const q = new URLSearchParams(search).get("q");
	const pagesToShow = 3;
	//console.log(q);
	const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
	const [jobtype, setJobType] = useState('');
	const [sortby, setSortBy] = useState('');
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
	const [quarms, setQuarms] = useState(q);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(0);
	const [perPage, setPerPage] = useState(8);
	const [stateChangeTrigger, setStateChangeTrigger] = useState(false);
	useEffect(() => {
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			fetchPageData();
		}
	}, []);

	const fetchPageData = async (page = 1) => {
		try {
			//setLoading(true);
			if (!stateChangeTrigger) {
				setLoading(true); // Show loader only on first load
			}
			const response: any = await axiosInstance({
				url: 'get-freelancers',
				method: "GET",
				params: { q: quarms, sort_by: sortby, job_type: jobtype, per_page: perPage, page }
			});

			setFreelancers(response.data.freelancers.data)
			setCurrentPage(response.data.freelancers.current_page);
			setLastPage(response.data.freelancers.last_page);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
				setStateChangeTrigger(true);
				setLoading(false);
			}, 200);

		}
	};

	useEffect(() => {
		fetchPageData(currentPage);
	}, [jobtype, sortby, currentPage]);

	const handleSortingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		let clean_val = value;
		setSortBy(clean_val);
	};
	const handleClearFilters = () => {

		setQuarms('');
		setSortBy('');
		setJobType('');
		fetchPageData();
		window.history.replaceState(null, '', '/our-freelancer');
	};

	const getUserRating = (rating: any) => {
		if (rating.length > 0) {
			return rating[0].average_rating;
		}
		return 0;
	}

	const handlePageChange = (page: any) => {
		if (page > 0 && page <= lastPage) {
			setCurrentPage(page);
		}
	};


	const getPagination = () => {
		const pages: (number | string)[] = [];

		// Always show the first page
		pages.push(1);

		// Show ellipsis before current page range if needed
		if (currentPage > 3) {
			pages.push("...");
		}

		// Show the 3 pages in the middle
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(lastPage - 1, currentPage + 1);
			i++
		) {
			pages.push(i);
		}

		// Show ellipsis after current page range if needed
		if (currentPage < lastPage - 2) {
			pages.push("...");
		}

		// Always show the last page
		pages.push(lastPage);

		return pages;
	};


	return (

		<>
			<Loader isLoading={loading} />
			<Header />
			<section className="freelancer-banner-section">
				<div className="main-container">
					<div className="project-banner-description">
						<h1>Our freelancers</h1>
						<p>The best place to discover & hire the best accounting talent on-demand. With every type of specialty certification available to your needs.</p>
					</div>
					<div className="main-projects">
						<div className="project-filter-bar">
							<div className="filter-blocks">
								<div className="pr-filter-boxs" onClick={() => setJobType('full-time')}>
									<div className={`filter-time d-flex align-items-center ${(jobtype === 'full-time') ? "job-time-filter" : ""}`} >
										{jobtype === 'full-time' ? (
											<img loading="lazy" className="img-fluid" src="/assets/images/orange-check-circle-icon.svg" alt="" title="" />
										) : (
											<img loading="lazy" className="img-fluid" src="/assets/images/black-circle-icons.svg" alt="" title="" />
										)}
										<span>Full time</span>
									</div>
								</div>
								<div className="pr-filter-boxs" onClick={() => setJobType('part-time')}>
									<div className={`freelance-filter-block d-flex align-items-center ${(jobtype === 'part-time') ? "job-time-filter" : ""} `} >
										{jobtype === 'part-time' ? (
											<img loading="lazy" className="img-fluid" src="/assets/images/orange-check-circle-icon.svg" alt="" title="" />
										) : (
											<img loading="lazy" className="img-fluid" src="/assets/images/black-circle-icons.svg" alt="" title="" />
										)}
										<span>Part time</span>
									</div>
								</div>
								<div className={`newest-filter-block ${sortby ? "sortByActive" : ""}`}>
									<select className="form-select" aria-label="Default select example"
										value={sortby}
										onChange={handleSortingChange}
									>
										<option style={{ color: "#574F4A" }} value="">Sort by</option>
										<option style={{ color: sortby === "newest" ? "#fe6002" : "#574F4A" }} value="newest" >Newest</option>
										<option style={{ color: sortby === "oldest" ? "#fe6002" : "#574F4A" }} value="oldest">Oldest</option>
									</select>
								</div>

								<div className="pr-filter-boxs" onClick={handleClearFilters}>
									<div className="freelance-filter-block d-flex align-items-center" >
										<span> Clear Filters</span>
									</div>
								</div>
							</div>
						</div>
						<div className="project-filter-items" >
							<div className="project-rows d-flex flex-wrap">

								{freelancers.length > 0 ? (
									<>
										{freelancers.map((item, index) => (
											<div key={index} className="colm-3 d-flex flex-wrap">
												<div className="project-items-boxs">
													<div className="project-infos">
														<div className="pr-hour">
															<p>${item?.user_details?.hourly_rate}/hr</p>
														</div>
														<div className="pr-content">
															<div className="pr-profile">
																<img loading="lazy" className="img-fluid" src={item.profile_image_path} alt="" title="" />
															</div>
															<h5>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} {item.last_name}</h5>
															<p>{item?.user_details?.profile_headline}</p>
															<div className="pr-user-rating d-flex align-items-center justify-content-center">
																<div className="pr-rating-icon">
																	<img loading="lazy" className="img-fluid" src="/assets/images/small-star-icon.svg" alt="" title="" />
																</div>
																<span className="pr-text-body-sm">{getUserRating(item.ratings)}</span>
																<span className="pr-text-body-sm">({item.completed_jobs_count} jobs)</span>
															</div>
															{item.skills.length > 0 && (
																<div className="pr-tags d-flex flex-wrap align-items-center justify-content-center">
																	{item.skills.map((item, index) => (
																		<a key={index} href="#">{item.name}</a>
																	))}
																</div>
															)}
														</div>
													</div>
													<div className="pr-learn-btns">
														<Link to={`/freelancer/view-profile/${item.id}`}>Learn More</Link>
													</div>
												</div>
											</div>
										))}
									</>
								) : (
									<div className="colm-3 d-flex flex-wrap">
										<div className="project-items-boxs">
											<div className="project-infos">
												<p>No Freelancer Found</p>
											</div>
										</div>
									</div>
								)}


							</div>
						</div>
					</div>
					{freelancers && lastPage > 1 && (<PaginationHtml lastPage={lastPage} getPagination={getPagination} currentPage={currentPage} handlePageChange={handlePageChange} />)}
				</div>
			</section>

			<Footer />
		</>

	);
}

export default OurFreelancer;
