import React from "react";
import PaginationHtml from "./PaginationHtml";
import helpers from "../../_helpers/common";
interface ClientUser {
    id: number;
    name: string;
    last_name: string;
    profile_image_path: string;
}

interface Project {
    id: number;
    title: string;
    project_type_label: string;
    budget_type_label: string;
    client_user: ClientUser;
    budget_type: number;
    hourly_from: number | null;
    hourly_to: number | null;
    fixed_rate: number;
}

interface Proposal {
    id: number;
    bid_amount: string;
    cover_letter: string;
    status: string;
    project: Project;
}

interface JobsComponentProps {
    proposals: Proposal[];
    lastPage: number;
    getPagination: () => (string | number)[];
    currentPage: number;
    handlePageChange: (page: number) => void;
    editMyApplication: (proposal: Proposal) => void;
    reApplyApplication: (proposal: Proposal) => void;

}

const AppliedJobComponent: React.FC<JobsComponentProps> = ({ proposals, lastPage, getPagination, handlePageChange, currentPage, editMyApplication, reApplyApplication }) => {
    return (
        <>
            <div className="tab-card-section">


                {proposals && proposals.length > 0 ? (
                    <>
                        {proposals.map((project: any, index: number) => (
                            <div key={index} className="tab-card-items">
                                <div className="tab-grid-container">
                                    <div className="tab-span-colm-9">
                                        <div className="contract-cta-sec">
                                            <div className="contract-title-block">
                                                <h2 className="title">{helpers.toTitleCase(project.project.title)}</h2>
                                            </div>

                                            <div className="cta-middle-content">

                                                <div className="cta-grid-container">
                                                    <div className="span-3-colm">
                                                        <div className="contract-info-content">
                                                            <h4 className="openings-title">Posted by: {helpers.toTitleCase(project?.project?.client_user?.name) + " " + (project?.project?.client_user?.last_name != "") ? project?.project?.client_user?.last_name : ""}</h4>
                                                            <div className="opening-status-text">
                                                                <span>Posted on:{helpers.formatDate(project?.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="span-9-colm">
                                                        <div className="contract-feedback-info">
                                                            <div className="activity-data-info">
                                                                <div className="title-badge-onboard d-flex align-items-center badge-gaps">
                                                                    <div className="air-badge">{helpers.toTitleCase(project.status)}</div>
                                                                    <div className="badge-text-info">
                                                                        <div className="badge-text-base">
                                                                            <span> {helpers.toTitleCase(project.project_type_label)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="job-show-description">
                                                                <p>{helpers.toTitleCase(project.cover_letter)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-span-colm-3 applied-job-button">
                                        <div className="d-flex tab-btns-grid">
                                            <div className="tab-btns-items">
                                                {project.project.fixed_rate && <a className="tab-view-btns" href="#" onClick={(e) => e.preventDefault()} >Fixed - <span>${project.project.fixed_rate}/hr</span></a>}
                                                {project.project.hourly_from && project.project.hourly_to && <a className="tab-view-btns" href="#" onClick={(e) => e.preventDefault()} >Hourly - <span>${project.project.hourly_from} to ${project.project.hourly_to}/hr</span></a>}
                                                {(project.status === 'pending' || project.status === 'shortlisted' || project.status === 'interview' || project.status === 'rejected') && (
                                                    <a onClick={() => editMyApplication(project)} className="tab-time-btns" href="#">Edit </a>
                                                )}
                                                {project.status === 'rejected' && (
                                                    <a onClick={() => reApplyApplication(project)} className="tab-time-btns" href="#">Re-Apply </a>
                                                )}
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
                                    No job found
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

export default AppliedJobComponent;
