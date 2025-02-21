import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';
import ContentLoader from './Common/ContentLoader';
import helpers from "../_helpers/common";
import axiosInstance from "../_helpers/axiosInstance";

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
interface AccountSectionFirstType{
	content:string;
	content_image_path:string;
}
interface FlexibleSection{
	content:string;
	content_image_path:string;
}
interface RealAccountSection{
	id:number;
	name:string;
	last_name:string;
	country_name:string;
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
	const [loadingsub, setLoadingSub] = useState(false);
	const hasFetchedData = useRef(false);
	const [accountSectionFirst, setAccountSectionFirst] = useState<AccountSectionFirstType>({content:"",content_image_path:""});
	const [flexibleSection, setFlexibleSection] = useState<FlexibleSection>({content:"",content_image_path:""});
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
			//console.log('response', response)
			// console.log('account_section_first',response.data.account_section_first);
			setAccountSectionFirst(response.data.account_section_first);
			setFlexibleSection(response.data.flexible_section_section);
			setHelpToday(response.data.get_help_today_section_skill);
			setTestimonial(response.data.testimonials_section);
			setContractInfo(response.data.contract_section_section);
			setCategories(response.data.category_subcategory_data_under_search_section);
			setRealAccountSection(response.data.real_accountants_section);
			// console.log(response.data.real_accountants_section);
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};
	
	useEffect(() => {
		if(selectedcategory > 0){
			setLoadingSub(true);
			const filtered_sub_cat = categories.filter((item) => item.id === selectedcategory);
			if (filtered_sub_cat.length > 0) {
				const filtered_data = filtered_sub_cat[0].sub_categories || [];
				//console.log('filtered_data', filtered_data);
				if (Array.isArray(filtered_data) && filtered_data.length > 0) {
					setSubCategories(filtered_data as unknown as SubCategory[]);
				} else {
					setSubCategories([]);
				}
			} else {
				setSubCategories([]);
			}
			setLoadingSub(false);
		}
	}, [selectedcategory]);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {	
		const { name, value } = e.target;
		let clean_val = value;
		setSearchString(clean_val);
	};
	
	const handleSerach = () => {
		// alert('test');
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

	 let skillsData =  helptoday;
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
		<Header />	
			<section className="banner-section">
				 <div className="main-container">
					<div className="banner-content">
					   <div className="banner-description">
						  <div className="verify-btns">
							 <span className="free-badge"><img className="img-fluid" src="/assets/images/verify-icon.svg" alt="" title="" /> #1 free marketplace For Accounting</span>
						  </div>
						  <div className="banner-title-block">
							 <div className="final-head">
								<span className="yellow-star"><img className="img-fluid" src="/assets/images/yellow-star.svg" alt="" title="" /></span>
								<h1>Finally, the Cure for Accounting</h1>
								<span className="pink-star"><img className="img-fluid" src="/assets/images/pink-star.svg" alt="" title="" /></span>
							 </div>
							 <p>Browse from over 671,855 on-demand certified public accountants.</p>
						  </div>
					   </div>
					   <div className="banner-form">
						  <div className="banner-search-block">
							 <form className="banner-search-form" method="post">
								<span className="banner-search-icon"><img className="img-fluid" src="/assets/images/hm-search-icon.svg" alt="" title="" /></span>
								<input type="search" 
									name="search" 
									placeholder="Find qualified talent" 
									// value={searchstring}
									className="form-control"
									// onChange={handleChange}
									value={query}
									onChange={handleInputChange}
									autoComplete="off" 
									/>
									
								<button  disabled={!query.trim()} type="button" onClick={() => handleSerach()}>Search</button>
							 </form>
							 {query.trim() && filteredSkills.length > 0 && (
							 <div  className="hm-search-result-block">
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
								{loading ? (
									<ContentLoader />
								) : (
									<div className="custom-rows d-flex flex-wrap">
										{categories.map((item,index) => (
											<div  key={index} className="colm-6 d-flex flex-wrap" onClick={() => setSelectedCategory(item.id)}>
											  <div  className={`public-boxs ${selectedcategory === item.id ? "active" : ""}`}>
												 <div className="image-boxs">
													<div className="icon">
													   <img className="img-fluid" src="/assets/images/money-bag-icon.svg" alt="" title="" />
													</div>
												 </div>
												 <h5>{item.name}</h5>
											  </div>
											</div>
										))}
									</div>
								)}
							 </div>
							 <div className="public-bottm-block">
								{loadingsub ? (
									<ContentLoader />
								) : (
								  <ul>
									{subcategories.map((item,index) => (
										<li  key={index} className="talent-tag"><Link to={`/our-freelancer?q=${item.slug}`}>{item.name}</Link></li>
									))}
								  </ul>
								)}
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
							 <img className="img-fluid" src={accountSectionFirst.content_image_path} alt="" title="" />
						  </div>
					   </div>
					   <div className="colm-5">
						  <div className="hm-about-content">
						  <div  dangerouslySetInnerHTML={{ __html: accountSectionFirst.content }} />
							 {/* <div className="hm-sub-heading">Where accounting gets done</div>
							 <h2>Count on Us to Account for You.</h2>
							 <div className="hm-about-info">
								<div className="about-listing">
								   <div className="hire-listing-block">
									  <div className="hire-list-text d-flex align-items-center">
										 <span className="air3-icon"><img className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" /></span>
										 <h5>On-Demand</h5>
									  </div>
									  <p>Hire for what you need, when you need it.</p>
								   </div>
								   <div className="hire-listing-block">
									  <div className="hire-list-text d-flex align-items-center">
										 <span className="air3-icon"><img className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" /></span>
										 <h5>Flexible Pricing</h5>
									  </div>
									  <p>Set your budget to find affordable talent.</p>
								   </div>
								   <div className="hire-listing-block">
									  <div className="hire-list-text d-flex align-items-center">
										 <span className="air3-icon"><img className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" /></span>
										 <h5>Satisfaction Guaranteed</h5>
									  </div>
									  <p>Pay when projects are completed to your satisfaction. Not before.</p>
								   </div>
								</div>
							 </div> */}
							 <div className="hm-about-btns d-flex flex-wrap">
								<Link className="btn" to="/sign-in">Sign Up Free</Link>
								<Link className="btn border-btn" to="/learn-how-to-hire">Learn how to hire</Link>
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
					{loading ? (
							<ContentLoader />
						) : (
					   <div className="custom-rows d-flex flex-wrap">
					
							{realAccountSection.map((item:RealAccountSection,index) => (
						  <div  key={index} className="colm-3 d-flex flex-wrap">
							 <div className="account-result-boxs"   onClick={() => handleRedirect(item)}
            style={{ cursor: "pointer" }}>
								<h3>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} { (item.last_name)?item.last_name.charAt(0).toUpperCase()+".":"" } {(item.country_name)?", "+item.country_name:""}</h3>
								<div className="result-rating d-flex flex-wrap align-items-center">
								   <div className="col-6">
									  <div className="rating-texts d-flex align-items-center"><img className="img-fluid" src="/assets/images/orange-star-icon.svg" alt="" title="" /> {item.ratings.length > 0 ? item.ratings[0].average_rating : 0}/5</div>
								   </div>
								   <div className="col-6">
									  <div className="hour-texts">5,970 Hours </div>
								   </div>
								</div>
							 </div>
							
						  </div>
						  	))}
					   </div>
					     )}
					</div>
				 </div>
			  </section>

			  <section className="hm-testimonial-section">
      <div className="main-container">
        <div className="testimonial-title-block">
          <div className="hm-sub-heading">Testimonials</div>
          <h2>What Our Customer’s Say</h2>
        </div>

        <div className="hm-testimonial-slider">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="testi-similar-slider-wrapper" ref={sliderRef}>
              {testimonial.map((item, index) => (
                <div key={index} className="testi-slider-items">
                  <div className="slider-bg-boxs">
                    <div className="author-with-contents">
                      <div className="testimonial-author">
                        <div className="author-img">
                          <img className="img-fluid" src={item.client_image_path} alt="" title="" />
                          <span className="quote-icon pink-quote">
                            <img className="img-fluid" src="/assets/images/testimonial-quote-icon.svg" alt="" title="" />
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
              ))}
            </div>
          )}

          {testimonial.length > 0 && (
            <div className="carousel-list-testimonial">
              <div className="btn-prev" onClick={slidePrev}>
                <img className="img-fluid" src="/assets/images/left-arrow-icon.svg" alt="Previous" />
              </div>
              <div className="btn-next" onClick={slideNext}>
                <img className="img-fluid" src="/assets/images/right-arrow-icon.svg" alt="Next" />
              </div>
            </div>
          )}
        </div>
      </div>

      <style >{`
        .testi-similar-slider-wrapper {
          display: flex;
          overflow-x: scroll;
          scroll-behavior: smooth;
        }
        .testi-similar-slider-wrapper::-webkit-scrollbar {
          display: none;
        }
        .testi-slider-items {
          min-width: 300px;
          margin-right: 15px;
          box-sizing: border-box;
        }
        .carousel-list-testimonial {
          display: flex;
          justify-content: space-between;
          max-width: 100px;
          margin: 20px auto;
        }
        .btn-prev,
        .btn-next {
          cursor: pointer;
        }
      `}</style>
    </section>
			  {/* <section className="hm-testimonial-section">
				 <div className="main-container">
					<div className="testimonial-title-block">
					   <div className="hm-sub-heading">Testimonials</div>
					   <h2>What Our Customer’s Say</h2>
					</div>
					<div className="hm-testimonial-slider">
						{loading ? (
							<ContentLoader />
						) : (
							<div className="testi-similar-slider">
								{testimonial.map((item:TestimonialType,index) => (
									<div  key={index} className="testi-slider-items">
										<div className="slider-bg-boxs">
											<div className="author-with-contents">
											   <div className="testimonial-author">
												  <div className="author-img">
													 <img className="img-fluid" src={item.client_image_path} alt="" title="" />
													 <span className="quote-icon pink-quote"><img className="img-fluid" src="/assets/images/testimonial-quote-icon.svg" alt="" title="" /></span>
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
								))}
							</div>
						)}
						{testimonial.length > 0 ? (
							<div className="carousel-list-testimonial">
							  <div className="btn-prev">
								 <img className="img-fluid" src="/assets/images/left-arrow-icon.svg" alt="" title="" />
							  </div>
							  <div className="btn-next">
								 <img className="img-fluid" src="/assets/images/right-arrow-icon.svg" alt="" title="" />
							  </div>
							</div>
						) : (
							null
						)}
					</div>
				 </div>
			  </section> */}
			  
			  <section className="hm-solution-section">
				 <div className="main-container">
					<div className="row">
					   <div className="colm-5">
						  <div className="hm-about-content">
						<div  dangerouslySetInnerHTML={{ __html: flexibleSection.content }} />
							 {/* <div className="hm-sub-heading">a flexible solution</div>
							 <h2>All your accounting needs, one clinic.</h2>
							 <div className="hm-about-info">
								<div className="about-listing">
								   <div className="hire-listing-block">
									  <div className="hire-list-text d-flex align-items-center">
										 <span className="air3-icon"><img className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" /></span>
										 <h5>671,855 Certified Public Accountants</h5>
									  </div>
									  <p>Get access to the complete American CPA registry</p>
								   </div>
								   <div className="hire-listing-block">
									  <div className="hire-list-text d-flex align-items-center">
										 <span className="air3-icon"><img className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" /></span>
										 <h5>Over 29 Different Specialties</h5>
									  </div>
									  <p>Select any available specialty for your specfic need</p>
								   </div>
								   <div className="hire-listing-block">
									  <div className="hire-list-text d-flex align-items-center">
										 <span className="air3-icon"><img className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" /></span>
										 <h5>Thousands of Completed Jobs</h5>
									  </div>
									  <p>Pick from curated talent reviewed by real customers</p>
								   </div>
								</div>
							 </div> */}
							 <div className="hm-about-btns d-flex flex-wrap">
								<Link className="btn" to="/sign-up">Sign Up Free</Link>
								<Link className="btn border-btn" to="/learn-how-to-hire">Learn how to hire</Link>
							 </div>
						  </div>
					   </div>
					   <div className="colm-7">
						  <div className="about-image">
							 <img className="img-fluid" src={flexibleSection.content_image_path} alt="" title="" />
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
							{loading ? (
								<ContentLoader />
							) : (
								<div className="custom-rows d-flex flex-wrap">
									{contractinfo.map((item,index) => (
										<div  key={index} className="colm-4 d-flex flex-wrap">
											 <div className="forget-boxs">
												<div className="forget-image d-flex flex-wrap align-items-center">
												   <div className="icon-div">
													  <img className="img-fluid" src="/assets/images/check-circle-icon.svg" alt="" title="" />
												   </div>
												   <div className="forget-title-image">
													  <h3>{item.title}</h3>
												   </div>
												</div>
												<p>{item.content}</p>
											</div>
										</div>
									))}
								</div>	  
							)}
					</div>
				 </div>
			  </section>
			  <section className="get-help-section">
				 <div className="main-container">
					<div className="gethelp-title-block">
					   <div className="hm-sub-heading">Tittle Here</div>
					   <h2>Get help today</h2>
					</div>
					<div className="get-help-listing">
					   <div className="public-bottm-block">
						{loading ? (
							<ContentLoader />
						) : (
						  <ul>
							{helptoday.map((item,index) => (
								<li  key={index} className="talent-tag"><Link to={`/our-freelancer?q=${item.skill_slug}`}>{item.name}</Link></li>
							))}
						  </ul>
						)}
					   </div>
					</div>
				 </div>
			  </section>
		<Footer />
	</>  
  );
}

export default Home;
