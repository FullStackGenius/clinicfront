import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';
import axiosInstance from "../_helpers/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from './Common/Loader';
import StarRating from './StarRating';

interface HelpTodayType {
	id: number;
	name: string;
	skill_slug: string;
}

interface TestimonialType {
	id: number;
	name: string;
	designation: string;
	feedback: string;
	client_image_path: string;
}

interface ContractInfoType {
	title: string;
	content: string;
}

interface Category {
	id: number;
	name: string;
	slug: string;
	sub_categories: string[];
}

interface SubCategory {
	id: number;
	name: string;
	slug: string;
	category_id: number;
}
interface AccountSectionFirstType {
	content: string;
	content_image_path: string;
}
interface FlexibleSection {
	content: string;
	content_image_path: string;
}
interface RealAccountSection {
	id: number;
	name: string;
	last_name: string;
	star_rating: number;
	country_name: string;
	total_hours: number;
	ratings: { user_id: number; average_rating: number }[];
}

function Home() {
	const navigate = useNavigate();
	const [helptoday, setHelpToday] = useState<HelpTodayType[]>([]);
	const [testimonial, setTestimonial] = useState<TestimonialType[]>([]);
	const [contractinfo, setContractInfo] = useState<ContractInfoType[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedcategory, setSelectedCategory] = useState<number>(0);
	const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
	const [searchstring, setSearchString] = useState('');
	const [loading, setLoading] = useState(true);

	const hasFetchedData = useRef(false);
	const [accountSectionFirst, setAccountSectionFirst] = useState<AccountSectionFirstType>({ content: "", content_image_path: "" });
	const [flexibleSection, setFlexibleSection] = useState<FlexibleSection>({ content: "", content_image_path: "" });
	const [realAccountSection, setRealAccountSection] = useState<RealAccountSection[]>([]);

	useEffect(() => {
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			fetchHomePageData();
		}
	}, []);

	const fetchHomePageData = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get('get-home-page-data');
			setAccountSectionFirst(response.data.account_section_first);
			setFlexibleSection(response.data.flexible_section_section);
			setHelpToday(response.data.get_help_today_section_skill);
			setTestimonial(response.data.testimonials_section);
			setContractInfo(response.data.contract_section_section);
			setCategories(response.data.category_subcategory_data_under_search_section);
			setRealAccountSection(response.data.real_accountants_section);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};

	useEffect(() => {
		if (selectedcategory > 0) {

			const filtered_sub_cat = categories.filter((item) => item.id === selectedcategory);
			if (filtered_sub_cat.length > 0) {
				const filtered_data = filtered_sub_cat[0].sub_categories || [];
				if (Array.isArray(filtered_data) && filtered_data.length > 0) {
					setSubCategories(filtered_data as unknown as SubCategory[]);
				} else {
					setSubCategories([]);
				}
			} else {
				setSubCategories([]);
			}

		}
	}, [selectedcategory]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		let clean_val = value;
		setSearchString(clean_val);
	};

	const handleSerach = () => {
		navigate(`/our-freelancer?q=${query}`)
	}

	const handleRedirect = (item: RealAccountSection) => {
		navigate(`/freelancer/view-profile/${item.id}`);
	};
	const sliderRef = useRef<HTMLDivElement | null>(null);

	const slideNext = () => {
		if (sliderRef.current) {
			const containerWidth = sliderRef.current.clientWidth;
			sliderRef.current.scrollBy({ left: containerWidth, behavior: "smooth" });
		}
	};

	const slidePrev = () => {
		if (sliderRef.current) {
			const containerWidth = sliderRef.current.clientWidth;
			sliderRef.current.scrollBy({ left: -containerWidth, behavior: "smooth" });
		}
	};

	let skillsData = helptoday;
	const [query, setQuery] = useState<string>("");
	const [filteredSkills, setFilteredSkills] = useState<typeof skillsData>([]);


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);

		if (value.length > 0) {
			const suggestions = skillsData.filter((skill) =>
				skill.name.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredSkills(suggestions);
		} else {
			setFilteredSkills([]);
		}
	};

	const handleSelectSkill = (skill: { name: string; skill_slug: string }) => {
		setQuery(skill.name);
		setFilteredSkills([]);
		navigate(`/our-freelancer?q=${skill.skill_slug}`);
	};
	return (


		<>
			<Loader isLoading={loading} />
			<Header />
			<section className="banner-section">
				<div className="main-container">
					<div className="banner-content">
						<div className="banner-description">
							<div className="verify-btns">
								<span className="free-badge"><img loading="lazy" className="img-fluid" src="/assets/images/verify-icon.svg" alt="" title="" /> #1 free marketplace For Accounting</span>
							</div>
							<div className="banner-title-block">
								<div className="final-head">
									<span className="yellow-star"><img loading="lazy" className="img-fluid" src="/assets/images/yellow-star.svg" alt="" title="" /></span>
									<h1>Finally, the Cure for Accounting</h1>
									<span className="pink-star"><img loading="lazy" className="img-fluid" src="/assets/images/pink-star.svg" alt="" title="" /></span>
								</div>
								<p>Browse from over 671,855 on-demand certified public accountants.</p>
							</div>
						</div>
						<div className="banner-form">
							<div className="banner-search-block">
								<form className="banner-search-form" method="post">
									<span className="banner-search-icon"><img loading="lazy" className="img-fluid" src="/assets/images/hm-search-icon.svg" alt="" title="" /></span>
									<input type="search"
										name="search"
										placeholder="Find qualified talent"
										className="form-control"
										value={query}
										onChange={handleInputChange}
										autoComplete="off"
									/>

									<button disabled={!query.trim()} type="button" onClick={() => handleSerach()}>Search</button>
								</form>
								{query.trim() && filteredSkills.length > 0 && (
									<div className="hm-search-result-block">
										<div className="searchtype-menu-list">
											{filteredSkills.length > 0 && (
												<ul className="absolute bg-white border rounded w-full mt-1 max-h-40 overflow-auto">
													{filteredSkills.map((skill) => (
														<li
															key={skill.id}
															className="p-2 hover:bg-gray-100 cursor-pointer"
															onClick={() => handleSelectSkill(skill)}
														>
															{skill.name}
														</li>
													))}
												</ul>
											)}
										</div>
									</div>
								)
								}
							</div>
							<div className="public-acount-block">
								<div className="public-top-block">
									{categories &&
										<div className="custom-rows d-flex flex-wrap">
											{categories.map((item, index) => (
												<div key={index} className="colm-6 d-flex flex-wrap" onClick={() => setSelectedCategory(item.id)}>
													<div className={`public-boxs ${selectedcategory === item.id ? "active" : ""}`}>
														<div className="image-boxs">
															<div className="icon">
																<img loading="lazy" className="img-fluid" src="/assets/images/money-bag-icon.svg" alt="" title="" />
															</div>
														</div>
														<h5>{item.name}</h5>
													</div>
												</div>
											))}
										</div>
									}
								</div>
								<div className="public-bottm-block">
									{subcategories &&
										<ul>
											{subcategories.map((item, index) => (
												<li key={index} className="talent-tag"><Link to={`/our-freelancer?q=${item.slug}`}>{item.name}</Link></li>
											))}
										</ul>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="hm-about-section">
				<div className="main-container">
					<div className="row">
						<div className="colm-7">
							<div className="about-image">
								<img loading="lazy" className="img-fluid" src={accountSectionFirst.content_image_path} alt="" title="" />
							</div>
						</div>
						<div className="colm-5">
							<div className="hm-about-content">
								<div dangerouslySetInnerHTML={{ __html: accountSectionFirst.content }} />
								<div className="hm-about-btns d-flex flex-wrap">
									<Link className="btn" to="/sign-up-as">Sign Up Free</Link>
									<a className="btn border-btn" onClick={(e) => e.preventDefault()}>Learn how to hire</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="accountants-result-section">
				<div className="main-container">
					<div className="result-title">
						<div className="hm-sub-heading">real accountants real results</div>
						<h2>Our Numbers Speak for Themselves</h2>
					</div>
					<div className="account-result-items">
						{realAccountSection &&
							<div className="custom-rows d-flex flex-wrap">

								{realAccountSection.map((item: RealAccountSection, index) => (
									// 	<div key={index} className="colm-3 d-flex flex-wrap">
									// 	<div className="account-result-boxs" onClick={() => handleRedirect(item)}
									// 		style={{ cursor: "pointer" }}>
									// 		<h3>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} {(item.last_name) ? item.last_name.charAt(0).toUpperCase() + "." : ""} {(item.country_name) ? ", " + item.country_name : ""}</h3>
									// 		<div className="result-rating d-flex flex-wrap align-items-center">
									// 			<div className="col-6">
									// 				<div className="rating-texts d-flex align-items-center"><img loading="lazy" className="img-fluid" src="/assets/images/orange-star-icon.svg" alt="" title="" /> {item.ratings.length > 0 ? item.ratings[0].average_rating : 0}/5</div>
									// 			</div>
									// 			<div className="col-6">
									// 				<div className="hour-texts">5,970 Hours </div>
									// 			</div>
									// 		</div>
									// 	</div>

									// </div>
									<div key={index} className="colm-3 d-flex flex-wrap">
										<div className="account-result-boxs" onClick={() => handleRedirect(item)}
											style={{ cursor: "pointer" }}>
											<h3>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} {(item.last_name) ? item.last_name : ""} </h3>
											<div className="result-rating d-flex flex-wrap align-items-center">
												<div className="col-6">
													<div className="rating-texts d-flex align-items-center">
														{/* <img loading="lazy" className="img-fluid" src="/assets/images/orange-star-icon.svg" alt="" title="" /> {item.star_rating}/5  */}
														<StarRating rating={Number(item.star_rating)} />
													</div>
												</div>
												<div className="col-6">
													<div className="hour-texts">{item.total_hours?.toLocaleString()} Hours </div>
												</div>
											</div>
										</div>

									</div>
								))}
							</div>
						}
					</div>
				</div>
			</section>
			<section className="hm-testimonial-section">
				<div className="main-container">
					<div className="testimonial-title-block">
						<div className="hm-sub-heading">Testimonials</div>
						<h2>What Our Customer’s Say</h2>
					</div>
					{testimonial.length > 0 && (
						<div className="carousel-list-testimonial">
							<div className="swiper-button-prev2">
								<img loading="lazy" className="img-fluid" src="/assets/images/left-arrow-icon.svg" alt="Previous" />
							</div>
							<div className="swiper-button-next2">
								<img loading="lazy" className="img-fluid" src="/assets/images/right-arrow-icon.svg" alt="Next" />
							</div>
						</div>
					)}
				</div>


				<div className="hm-testimonial-slider">
					<div className="main-container">
						{loading ? (
							<></>
						) : (
							<Swiper
								modules={[Navigation, Pagination]}
								speed={500}
								slidesPerView={3}
								spaceBetween={0}
								loop={true}
								observer={true}
								observeParents={true}
								navigation={{
									nextEl: '.swiper-button-next2',
									prevEl: '.swiper-button-prev2',
								}}
								pagination={false}  // Removed active dots

								breakpoints={{
									1301: { slidesPerView: 3.6 },
									992: { slidesPerView: 3 },
									768: { slidesPerView: 2 },
									320: { slidesPerView: 1 },
								}}
							>


								{testimonial.map((item, index) => (
									<SwiperSlide key={index}>
										<div className="testi-slider-items">
											<div className="slider-bg-boxs">
												<div className="author-with-contents">
													<div className="testimonial-author">
														<div className="author-img">
															<img loading="lazy" className="img-fluid" src={item.client_image_path} alt={item.name} />
															<span className="quote-icon pink-quote">
																<img loading="lazy" className="img-fluid" src="/assets/images/testimonial-quote-icon.svg" alt="Quote" />
															</span>
														</div>
													</div>
													<div className="short-description">
														<p>{item.feedback}</p>
													</div>
												</div>
												<div className="slide-basic-info">
													<span className="testimonial-dot pink-dot"></span>
													<div className="slide-info">
														<span className="slide-title">{item.name}</span>
														<span className="slide-subtitle">{item.designation}</span>
													</div>
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						)}


					</div>
				</div>
			</section>

			<section className="hm-solution-section">
				<div className="main-container">
					<div className="row">
						<div className="colm-5">
							<div className="hm-about-content">
								<div dangerouslySetInnerHTML={{ __html: flexibleSection.content }} />

								<div className="hm-about-btns d-flex flex-wrap">
									<Link className="btn" to="/sign-up-as">Sign Up Free</Link>
								</div>
							</div>
						</div>
						<div className="colm-7">
							<div className="about-image">
								<img loading="lazy" className="img-fluid" src={flexibleSection.content_image_path} alt="" title="" />
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="hm-forget-section">
				<div className="main-container">
					<div className="forget-title-block">
						<div className="hm-sub-heading">The cure for accounting</div>
						<h2>Contract the best, forget the rest.</h2>
					</div>
					<div className="hm-forget-items">
						{contractinfo &&
							<div className="custom-rows d-flex flex-wrap">
								{contractinfo.map((item, index) => (
									<div key={index} className="colm-4 d-flex flex-wrap">
										<div className="forget-boxs">
											<div className="forget-image d-flex flex-wrap align-items-center">
												<div className="icon-div">
													<img loading="lazy" className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" />
												</div>
												<div className="forget-title-image">
													<h3>{item.title}</h3>
												</div>
											</div>
											<p dangerouslySetInnerHTML={{ __html: item.content }}></p>
										</div>
									</div>
								))}
							</div>
						}
					</div>
				</div>
			</section>
			<section className="get-help-section">
				<div className="main-container">
					<div className="gethelp-title-block">
						<div className="hm-sub-heading">ACCESS OUR NETWORK OF CURATED ACCOUNTANTS</div>
						<h2>Get help today</h2>
					</div>
					<div className="get-help-listing">
						<div className="public-bottm-block">
							{helptoday &&
								<ul>
									{helptoday.map((item, index) => (
										<li key={index} className="talent-tag"><Link to={`/our-freelancer?q=${item.skill_slug}`}>{item.name}</Link></li>
									))}
								</ul>
							}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>


	);
}

export default Home;
