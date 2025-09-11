import { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Header from '../layouts/partials/Header'
import axiosInstance from "../../_helpers/axiosInstance";
import helpers from '../../_helpers/common';
import AppliedJobComponent from '../Common/AppliedJobComponent';
import Loader from '../Common/Loader';
import { EditApplicationModal } from './EditApplicationModal';

interface Proposal {
    id: number;
    project_id: number;
    freelancer_id: number;
    bid_amount: string;
    cover_letter: string;
    status: string;
    created_at: string;
    updated_at: string;
    project: Project;
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
    client_user: ClientUser;
}

interface ClientUser {
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



function MyAppliedJob() {
    const [loading, setLoading] = useState(true);
    const [appliedJob, setAppliedJob] = useState<Proposal[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState("all");
    const [applicationModal, setApplicationModal] = useState(false);
    const [applicationId, setApplicationId] = useState<number>(0);
    const [coverLetterData, setCoverLetterData] = useState('');
    const [stateChangeTrigger, setStateChangeTrigger] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const tabs = ["all", "pending", "hired", "rejected"];
    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage, activeTab, applicationModal]);

    const fetchProjects = async (page: number) => {
        try {
            if (!stateChangeTrigger) {
                setLoading(true); // Show loader only on first load
            }

            const response: any = await axiosInstance({
                url: 'get-freelancer-project-proposal',
                method: "GET",
                params: { page, per_page: perPage, get_status: activeTab }

            });
            if (response.error === "false") {
                setAppliedJob(response.data.proposals.data); // Extract projects list
                setCurrentPage(response.data.proposals.current_page);
                setLastPage(response.data.proposals.last_page);

            }

        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setStateChangeTrigger(true);
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
    const editMyApplication = (proposal: any) => {
        setIsEdit(true);
        setApplicationModal(true)
        setApplicationId(proposal.id)
        setCoverLetterData(proposal.cover_letter);

    }

    const reApplyApplication = (proposal: any) => {
        setIsEdit(false);
        setApplicationModal(true)
        setApplicationId(proposal.id)
        setCoverLetterData(proposal.cover_letter);

    }

    return (
        <>
            <Loader isLoading={loading} />
            <AuthLayout>
                <Header />
                <section className="all-jobs-section">
                    <div className="main-container">

                        <div className="job-title-block">
                            <h1>Applied Jobs</h1>
                        </div>
                        <div className="jobs-tab-items">
                            <div className="tabs-horizontal-items">
                                <div className="horizontal-tab-list">
                                    {tabs && (
                                        <ul>
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
                                        </ul>
                                    )}
                                </div>
                            </div>
                            {activeTab === "all" &&
                                <AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} editMyApplication={editMyApplication} reApplyApplication={reApplyApplication} />
                            }

                            {activeTab === "pending" && <AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} editMyApplication={editMyApplication} reApplyApplication={reApplyApplication} />}

                            {activeTab === "hired" && <AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} editMyApplication={editMyApplication} reApplyApplication={reApplyApplication} />}

                            {activeTab === "rejected" && <AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} editMyApplication={editMyApplication} reApplyApplication={reApplyApplication} />}
                        </div>
                    </div>
                </section>
            </AuthLayout>
            <EditApplicationModal coverLetterData={coverLetterData} isEdit={isEdit} id={applicationId} isOpen={applicationModal} onClose={() => { setApplicationModal(false); setStateChangeTrigger(true); }} />
        </>

    )
}

export default MyAppliedJob