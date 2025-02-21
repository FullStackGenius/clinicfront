import React from 'react';


function SearchSection() {
	
	return (
		<div className="pr-reviews-search">
			<div className="pr-search-text">
				<p>Your trust is everything to us. <strong>Learn About our review guidlines</strong></p>
			</div>
			<div className="review-search">
				<form className="review-search-form">
				   <div className="nav-search-input">
					  <input type="search" name="q" placeholder="Search......." className="search-input" />
					  <button type="submit" aria-label="Search" className="rev-btn-icon">
					  <img className="img-fluid" src="/assets/images/review-search-icon.svg" alt="" title="" />
					  </button>
				   </div>
				   <div className="review-search-dropdown">
					  <select className="form-select" aria-label="Default select example">
						 <option value="mostRelevant">Most revants</option>
						 <option value="highestRated">Highest rated</option>
						 <option value="lowestRated">Lowest rated</option>
						 <option value="newestFirst">Newest first</option>
						 <option value="oldestFirst">Oldest first</option>
					  </select>
				   </div>
				</form>
				<div className="fl-project-spec-choices">
				   <ul>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">Plumbing . 10</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">toilet . 4</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">Plumber . 4</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">issue . 4</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">clog . 3</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">problem . 11</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">fix . 2</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">pipe . 2</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">sink . 2</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">Plumbing . 10</button></li>
					  <li className="air3-btn-sm"><button type="button" className="pill-btns">toilet . 4</button></li>
				   </ul>
				</div>
			</div>
		</div>
	);
}

export default SearchSection;
