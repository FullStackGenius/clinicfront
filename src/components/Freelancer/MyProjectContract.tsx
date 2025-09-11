import React, { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Header from '../layouts/partials/Header'
import axiosInstance from "../../_helpers/axiosInstance";
import helpers from '../../_helpers/common';
import ContractComponent from '../Common/ContractComponent';
import Loader from '../Common/Loader';

interface Contract {
    id: number;
    project_id: number;
    proposal_id: number;
    freelancer_id: number;
    started_at: string;
    ended_at: string;
    type: string;
    amount: string;
    status: string;
    payment_type: string;
    project: Project;
    proposal: Proposal;
    freelancer: Freelancer;
    client: Freelancer;
}

interface Project {
    id: number;
    title: string;
    description: string;
    project_status: number;
    budget_type: number;
    hourly_from: number | null;
    hourly_to: number | null;
    fixed_rate: number;
    project_type_id: number;
    user_id: number;
    project_scope_id: number;
    project_duration_id: number;
    project_experience_id: number;
    created_at: string;
    updated_at: string;
    next_step: number;
    completed_steps: number;
    project_status_label: string;
    budget_type_label: string;
    project_type_label: string;
}

interface Proposal {
    id: number;
    project_id: number;
    freelancer_id: number;
    bid_amount: string;
    cover_letter: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Freelancer {
    id: number;
    name: string;
    last_name: string;
    username: string | null;
    user_status: number;
    accept_condition: number;
    apple_id: string | null;
    google_id: string | null;
    profile_image: string;
    email: string;
    email_verified_at: string;
    role_id: number;
    country_id: number;
    deleted_at: string | null;
    role_name: string;
    country_name: string;
    profile_image_path: string;
}

function MyProjectContract() {
    const [loading, setLoading] = useState(true);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState("all");

    const tabs = ["all", 'active', 'pending', 'completed', 'terminated'];
    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage, activeTab]);

    const fetchProjects = async (page: number) => {
        try {
            setLoading(true)
            const response: any = await axiosInstance({
                url: 'get-freelancer-contract',
                method: "GET",
                params: { page, per_page: perPage, get_status: activeTab }

            });
            if (response.error === "false") {
                setContracts(response.data.contracts.data); // Extract projects list
                setCurrentPage(response.data.contracts.current_page);
                setLastPage(response.data.contracts.last_page);

            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
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

    return (
        <>
            <Loader isLoading={loading} />
            <AuthLayout>
                <Header />


                <section className="all-jobs-section">
                    <div className="main-container">

                        <div className="job-title-block">
                            <h1>My Contract</h1>
                        </div>
                        <div className="jobs-tab-items">

                            <div className="tabs-horizontal-items">
                                <div className="horizontal-tab-list">
                                    {tabs && (<ul>
                                        {tabs.map((tab) => (
                                            <li
                                                key={tab}
                                                className={`air-tab-item ${activeTab === tab ? "is-active" : ""}`}
                                                onClick={() => {
                                                    setActiveTab(tab);
                                                    setCurrentPage(1);
                                                }}
                                                style={{ cursor: "pointer" }} // Make it clear it's clickable
                                            >
                                                {helpers.toTitleCase(tab)}
                                            </li>
                                        ))}
                                    </ul>)}
                                </div>
                            </div>
                            <div className="tab-card-section">
                                {activeTab === "all" && <ContractComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} contracts={contracts} contractPageFor="freelancer" />}
                                {activeTab === "active" && <ContractComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} contracts={contracts} contractPageFor="freelancer" />}
                                {activeTab === "pending" && <ContractComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} contracts={contracts} contractPageFor="freelancer" />}
                                {activeTab === "completed" && <ContractComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} contracts={contracts} contractPageFor="freelancer" />}
                                {activeTab === "terminated" && <ContractComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} contracts={contracts} contractPageFor="freelancer" />}
                            </div>
                        </div>
                    </div>
                </section>
            </AuthLayout>

        </>


    )
}

export default MyProjectContract