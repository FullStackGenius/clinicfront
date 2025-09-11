import { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Header from '../layouts/partials/Header'
import Footer from '../layouts/partials/Footer'
import axiosInstance from '../../_helpers/axiosInstance';
import helpers from '../../_helpers/common';
import { useParams } from 'react-router-dom';
import { HireNowModal } from './HireNowModal';
import ProjectProposalComponent from '../Common/ProjectProposalComponent';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Loader from '../Common/Loader';
const MySwal = withReactContent(Swal);


interface FreelancerUser {
    id: number;
    name: string;
    last_name: string;
    username: string | null;
    user_status: number;
    accept_condition: number;
    apple_id: string | null;
    google_id: string | null;
    profile_image: string | null;
    email: string;
    email_verified_at: string;
    role_id: number;
    country_id: number;
    deleted_at: string | null;
    role_name: string;
    country_name: string;
    profile_image_path: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    project_status: number;
    budget_type: number | null;
    hourly_from: number | null;
    hourly_to: number | null;
    fixed_rate: number | null;
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
    freelancer_user: FreelancerUser;
    project: Project;
}






function ProjectProposal() {
    const [loading, setLoading] = useState(true);
    const [proposals, setProposal] = useState<Proposal[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [perPage, setPerPage] = useState(6);
    const segment = useParams();
    const [hireNowModal, setHireNowModal] = useState(false);
    const [proposalId, setPropsalId] = useState(0);
    const [activeTab, setActiveTab] = useState("all");
    const [refresh, setRefresh] = useState(false);

    const handleHiredJobApplied = () => {
        setRefresh(prev => !prev); // Toggle state to trigger re-render
    };
    const tabs = ['all', 'pending', 'hired', 'rejected'];

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage, refresh, activeTab]);

    const fetchProjects = async (page: number) => {
        try {
            setLoading(true);
            const response: any = await axiosInstance({
                url: 'project/get-project-proposal',
                method: "GET",
                params: { page, per_page: perPage, project_id: segment.project_id, get_status: activeTab }

            });

            if (response.error === "false") {
                setProposal(response.data.proposal.data); // Extract projects list
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    const rejectProposalFun = async (proposal: any) => {
        try {
            const response: any = await axiosInstance({
                url: 'project/reject-project-proposal',
                method: "POST",
                data: { proposal_id: proposal.id, project_id: proposal.project_id }

            });

            if (response.error === "false") {
                setActiveTab('rejected');
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

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

    const rejectNowButton = (proposal: any) => {
        MySwal.fire({
            title: "Are you sure ?",
            text: "You want to reject this proposal",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                rejectProposalFun(proposal)

            }
        });

    }

    const hireNowButton = (proposal: any) => {
        setHireNowModal(true)
        setPropsalId(proposal.id)
    }


    return (
        <>
            <Loader isLoading={loading} />
            <AuthLayout>
                <Header />


                <section className="all-jobs-section">
                    <div className="main-container">

                        <div className="job-title-block">
                            <h1>Project Proposals</h1>

                        </div>



                        <div className="jobs-tab-items">

                            <div className="tabs-horizontal-items">

                                <div className="horizontal-tab-list">
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
                                </div>

                            </div>



                            <div className="tab-card-section">
                                {activeTab === "all" && <ProjectProposalComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={proposals} contractPageFor="freelancer" rejectNowButton={rejectNowButton} hireNowButton={hireNowButton} />}

                                {activeTab === "pending" && <ProjectProposalComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={proposals} contractPageFor="freelancer" rejectNowButton={rejectNowButton} hireNowButton={hireNowButton} />}


                                {activeTab === "hired" && <ProjectProposalComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={proposals} contractPageFor="freelancer" rejectNowButton={rejectNowButton} hireNowButton={hireNowButton} />}
                                {activeTab === "rejected" && <ProjectProposalComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={proposals} contractPageFor="freelancer" rejectNowButton={rejectNowButton} hireNowButton={hireNowButton} />}





                            </div>

                        </div>



                    </div>
                </section>

                <Footer />
            </AuthLayout>
            <HireNowModal onJobAppliedHired={handleHiredJobApplied} id={proposalId} isOpen={hireNowModal} onClose={() => setHireNowModal(false)} />
        </>

    )
}

export default ProjectProposal