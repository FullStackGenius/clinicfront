import React, { useState, useEffect, useRef } from 'react';
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';
import axiosInstance from "../_helpers/axiosInstance";
import ResourcesPartComponent from './Common/ResourcesPartComponent';
import ResourcePaginationHtml from './Common/ResourcePaginationHtml';
import Loader from './Common/Loader';

interface ResourceCategory {
	id: number;
	name: string;
	status: string;
	created_at: string;
	updated_at: string;
}

interface Resource {
	id: number;
	title: string;
	resource_category_id: number;
	short_description: string;
	description: string;
	resource_image: string;
	status: string;
	created_at: string;
	updated_at: string;
	resource_image_path: string;
	resource_category: ResourceCategory;
}

interface PaginationLink {
	url: string | null;
	label: string;
	active: boolean;
}

interface Category {
	id: number;
	name: string;
	status: string;
	created_at: string;
	updated_at: string;
}

function AllResources() {

	const [resources, setResources] = useState<Resource[]>([]);
	const [category, setCategory] = useState<Category[]>([]);
	const [jobtype, setJobType] = useState('');
	const [querms, setQuerms] = useState('');
	const [sortby, setSortBy] = useState('');
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(0);
	const [perPage, setPerPage] = useState(9);
	const searchTimeout = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		if (!hasFetchedData.current) {
			hasFetchedData.current = true
			fetchPageData();
		}
	}, []);

	const fetchPageData = async (page = 1) => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
				url: 'get-resources',
				method: "GET",
				params: { sort_by: sortby, category: jobtype, per_page: perPage, page: page, q: querms }
			});
			setResources(response.data.resource.data)
			setCurrentPage(response.data.resource.current_page);
			setLastPage(response.data.resource.last_page);
			setCategory(response.data.category)
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};

	useEffect(() => {
		fetchPageData(currentPage);
	}, [jobtype, sortby, currentPage, querms]);

	const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setQuerms('');
		setJobType(e.target.value);
		setCurrentPage(1);
	};

	const handleSortingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setQuerms('');
		setSortBy(e.target.value);
		setCurrentPage(1);

	};


	const handlePageChange = (page: any) => {
		if (page > 0 && page <= lastPage) {
			setCurrentPage(page);
		}
	};


	const getPagination = () => {
		const pages: (number | string)[] = [];
		pages.push(1);
		if (currentPage > 3) {
			pages.push("...");
		}
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(lastPage - 1, currentPage + 1);
			i++
		) {
			pages.push(i);
		}
		if (currentPage < lastPage - 2) {
			pages.push("...");
		}
		pages.push(lastPage);
		return pages;
	};


	const searchByKeyword = (e: any) => {
		const value = e.target.value;
		setQuerms(value);
		setCurrentPage(1);

		// Debounce API call
		if (searchTimeout.current) {
			clearTimeout(searchTimeout.current);
		}

		searchTimeout.current = setTimeout(() => {
			fetchPageData(1);
		}, 500); // Adjust debounce delay as needed
	}
	return (
		<>
			<Loader isLoading={loading} />
			<Header />
			<section className="resources-page-section">
				<div className="main-container">
					<div className="resources-banner-content">
						<div className="inner-banner-content">
							<h1>Resources</h1>
							<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly</p>
						</div>
					</div>

					<div className="resources-filter-section">

						<div className="resources-filter-content">
							<div className="filter-gird-container">
								<div className="filter-input-block">
									<div className="form-group">
										<input type="search" onKeyDown={searchByKeyword} name="search" placeholder="Search" className="form-control" autoComplete="off" />
									</div>
								</div>
								<div className="filter-input-block">
									<div className="form-group label-infos">
										<label>Filter by:</label>
										<select
											className="form-control"
											style={{
												backgroundImage: `url("/assets/images/down-arrow-icon.svg")`,
												backgroundRepeat: "no-repeat",

											}}
											value={jobtype}
											onChange={handleCategoryChange}
										>
											<option value="">Category</option>
											{category && category.map((cat, index) => (
												<option key={index} value={cat.id}>
													{cat.name}
												</option>
											))}
										</select>

									</div>
								</div>
								<div className="filter-input-block">
									<div className="form-group label-infos">
										<label>Filter by:</label>
										<select className="form-control" aria-label="Default select example"
											value={sortby}
											onChange={handleSortingChange}
											style={{
												backgroundImage: `url("/assets/images/down-arrow-icon.svg")`,
												backgroundRepeat: "no-repeat",

											}}
										>
											<option style={{ color: "#574F4A" }} value="">Sort by</option>
											<option value="desc" >Newest</option>
											<option value="asc">Oldest</option>
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="resources-blog-section">

							<div className="blog-grid-container">
								{resources && resources.length > 0 ? (
									resources.map((resource) => (
										<ResourcesPartComponent key={resource.id} resource={resource} />
									))
								) : (
									<div className="no-data-found">
										<p>No resources found.</p>
									</div>
								)}
							</div>

							{resources && lastPage > 1 && (<ResourcePaginationHtml lastPage={lastPage} getPagination={getPagination} currentPage={currentPage} handlePageChange={handlePageChange} />)}
						</div>


					</div>

				</div>
			</section>

			<Footer />

		</>

	);
}

export default AllResources;
