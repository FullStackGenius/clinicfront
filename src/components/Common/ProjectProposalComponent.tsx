import React from "react";
import PaginationHtml from "./PaginationHtml";
import helpers from "../../_helpers/common";
import { Link } from "react-router-dom";
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
    // Add other properties if needed
}
interface ContractComponentProps {
    proposals: Proposal[];
    lastPage: number;
    getPagination: () => (string | number)[];
    currentPage: number;
    handlePageChange: (page: number) => void;
    hireNowButton: (proposal: Proposal) => void;
    rejectNowButton: (proposal: Proposal) => void;
    contractPageFor: string;
}

const ProjectProposalComponent: React.FC<ContractComponentProps> = ({ rejectNowButton, hireNowButton, contractPageFor, proposals, lastPage, getPagination, handlePageChange, currentPage }) => {

    return (
        <>
            <div className="tab-card-section">


                {proposals && proposals.length > 0 ? (
                    <>
                        {proposals.map((proposal: any, index: number) => (
                            <div key={index} className="tab-card-items">
                                <div className="tab-grid-container">
                                    <div className="tab-span-colm-9">
                                        <div className="contract-cta-sec">
                                            <div className="contract-title-block">
                                                <h2 className="title">{helpers.toTitleCase(proposal.project.title)}</h2>
                                            </div>

                                            <div className="cta-middle-content">

                                                <div className="cta-grid-container">
                                                    <div className="span-3-colm">
                                                        <div className="contract-info-content">
                                                            <h4 className="openings-title">Sent by: {helpers.toTitleCase(proposal?.freelancer_user?.name) + " " + proposal?.freelancer_user?.last_name}</h4>
                                                            <div className="opening-status-text">
                                                                <span>Send on: {helpers.formatDate(proposal?.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="span-9-colm">
                                                        <div className="contract-feedback-info">
                                                            <div className="activity-data-info">
                                                                <div className="title-badge-onboard d-flex align-items-center badge-gaps">
                                                                    <div className="air-badge">{helpers.toTitleCase(proposal.status)}</div>
                                                                    <div className="badge-text-info">
                                                                        <div className="badge-text-base">
                                                                            <span> {helpers.toTitleCase(proposal.project.project_type_label)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="charge-rate-info">
                                                                <div className="d-flex flex-wrap rate-gaps">

                                                                    <div className="month-rate-text">
                                                                        <div className="text-body-rate">
                                                                            <span>Budget Type: {helpers.toTitleCase(proposal.project.budget_type_label)}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="month-rate-text">
                                                                        <div className="text-body-rate">
                                                                            <span>
                                                                                Amount :{" "}
                                                                                {helpers.toTitleCase(proposal.project.budget_type_label)}{"  "}
                                                                                {proposal.project.budget_type === 1
                                                                                    ? `$${proposal.project.hourly_from} - $${proposal.project.hourly_to}/hr`
                                                                                    : `$${proposal.project.fixed_rate}`
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="current-rate-text">
                                                                        <div className="text-body-rate">
                                                                            <span>Payment Type: {helpers.toTitleCase(proposal.project.project_type_label)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="job-show-description">
                                                                <p>{helpers.toTitleCase(proposal?.cover_letter)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-span-colm-3">
                                        <div className="d-flex tab-btns-grid">
                                            <div className="tab-btns-items">
                                                {(proposal.status === "pending" || proposal.status === "rejected") && (
                                                    <a className="tab-time-btns" href="#" onClick={() => hireNowButton(proposal)}>Hire Now</a>
                                                )}
                                                {proposal.status === "pending" && (
                                                    <a className="tab-time-btns" href="#" onClick={() => rejectNowButton(proposal)}>Reject Now</a>
                                                )}
                                                <Link className="tab-view-btns" to={`/chat/${proposal.freelancer_id}`}>Start Chat</Link>
                                                <Link className="tab-view-btns" to={`/freelancer/view-profile/${proposal.freelancer_id}`}>View Applicant</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </>
                ) : (
                    <div className="tab-card-section">
                        <div className="tab-card-items">
                            <div className="tab-grid-container">
                                <div className="tab-span-colm-12">
                                    No proposal found
                                </div>
                            </div>
                        </div>
                    </div>

                )}



                <div className="pagination">
                    {lastPage > 1 && (<PaginationHtml lastPage={lastPage} getPagination={getPagination} currentPage={currentPage} handlePageChange={handlePageChange} />)}
                </div>
            </div>
        </>
    );
};

export default ProjectProposalComponent;
