import React, { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Header from '../layouts/partials/Header'
import axiosInstance from "../../_helpers/axiosInstance";
import PaginationHtml from '../Common/PaginationHtml';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { setProject } from '../../redux/projectSlice';
import helpers from '../../_helpers/common';
import Footer from '../layouts/partials/Footer';
import ContentLoader from '../Common/ContentLoader';
import JobsComponent from '../Common/JobsComponent';
import Loader from '../Common/Loader';
// Define TypeScript interfaces for API response
interface ClientUser {
    id: number;
    name: string;
    last_name: string;
    email: string;
    country_name: string;
    profile_image_path: string;
}

interface Project {
    id: number;
    title: string | null;
    project_status_label: string;
    description: string;
    budget_type_label: string;
    budget_type: number;
    project_status: number;
    hourly_from: number;
    hourly_to: number;
    fixed_rate: number;
    client_user: ClientUser;
    created_at: string;
    project_type_label: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Pagination {
    currentPage: number;
    lastPage: number;
    nextPage: string | null;
    prevPage: string | null;
    links: PaginationLink[];
}

interface ApiResponse {
    error: string;
    message: string;
    data: {
        projects: {
            current_page: number;
            last_page: number;
            next_page_url: string | null;
            prev_page_url: string | null;
            data: Project[];
            links: PaginationLink[];
        };
    };
}
function MyJobs() {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const dispatch = useDispatch<AppDispatch>();
    const [activeTab, setActiveTab] = useState("all");
 const [refreshKey, setRefreshKey] = useState<number>(0);
    const tabs = ["All", "Publish", "Assigned", "Draft", "Closed"];
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage, activeTab,refreshKey]);

    const fetchProjects = async (page: number) => {
        try {
            setLoading(true)
            const response: any = await axiosInstance({
                url: 'project/client-project',
                method: "GET",
                params: { page, per_page: perPage, get_status: getStatusByLabel(activeTab) }

            });

            if (response.error === "false") {
                // console.log(response)
                setProjects(response.data.projects.data); // Extract projects list
                setCurrentPage(response.data.projects.current_page);
                setLastPage(response.data.projects.last_page);

            }
            // setLoading(false)
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
            //setLoading(false);
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

    const handlePageChange = (page: any) => {
        if (page > 0 && page <= lastPage) {
            setCurrentPage(page);
        }
    };
    const viewProjectDetail = (project: any) => {
        dispatch(setProject(project));
        navigate(`/client/create-project-step-seven`);
    }
    const tabss = [
        { label: "all", status: null },
        { label: "drafted", status: 2 },
        { label: "published", status: 3 },
        { label: "closed", status: 4 },
        { label: "assigned", status: 5 },
    ];

    const getStatusByLabel = (label: string) => {
        return tabss.find((tab) => tab.label === label)?.status ?? "";
    };

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1); // increment to trigger rerender
      };
    return (
        <>
            <Loader isLoading={loading} />
            <AuthLayout>
                <Header />
                <section className="all-jobs-section">
                    <div className="main-container">
                        <div className="job-title-block">
                            <h1>My Jobs</h1>
                            {/* <div className="earnings-text">Total earnings made: <span className="earning-prices">$00.00</span></div> */}
                        </div>
                        {/* <div className="tab-title-block">
                <h3>Contracts by Stage</h3>
            </div> */}
                        <div className="jobs-tab-items">
                            <div className="tabs-horizontal-items">
                                <div className="horizontal-tab-list">
                                    <ul>
                                        {tabss.map((tab) => (
                                            <li
                                                key={tab.label}
                                                className={`air-tab-item ${activeTab === tab.label ? "is-active" : ""}`}

                                                onClick={() => {
                                                    setActiveTab(tab.label);
                                                    setCurrentPage(1);
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {helpers.toTitleCase(tab.label)}
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                            {activeTab === "all" && 

                                <JobsComponent getPagination={getPagination} viewProjectDetail={viewProjectDetail} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} projects={projects} onFormSubmit={handleRefresh} />

                            }

                            {activeTab === "published" && 

                                <JobsComponent getPagination={getPagination} viewProjectDetail={viewProjectDetail} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} projects={projects} onFormSubmit={handleRefresh}/>
                            }

                            {activeTab === "assigned" && 
                                <JobsComponent getPagination={getPagination} viewProjectDetail={viewProjectDetail} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} projects={projects} onFormSubmit={handleRefresh} />
                            }
                            {activeTab === "drafted" && 
                                <JobsComponent getPagination={getPagination} viewProjectDetail={viewProjectDetail} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} projects={projects} onFormSubmit={handleRefresh}/>
                            }

                            {activeTab === "closed" && 
                                <JobsComponent getPagination={getPagination} viewProjectDetail={viewProjectDetail} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} projects={projects} onFormSubmit={handleRefresh} />
                            }


                        </div>
                    </div>
                </section>

                <Footer />
            </AuthLayout>
        </>


    )
}

export default MyJobs

