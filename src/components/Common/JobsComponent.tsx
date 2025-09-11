import React, { useState } from "react";
import PaginationHtml from "./PaginationHtml";
import helpers from "../../_helpers/common";
import { Link } from "react-router-dom";
import axiosInstance from "../../_helpers/axiosInstance";
import Swal from "sweetalert2";


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

interface JobsComponentProps {
    projects: Project[];
    viewProjectDetail: any;
    lastPage: number;
    getPagination: () => (string | number)[];
    currentPage: number;
    handlePageChange: (page: number) => void;
    onFormSubmit: () => void;
}

const JobsComponent: React.FC<JobsComponentProps> = ({ projects, lastPage, getPagination, handlePageChange, currentPage, viewProjectDetail, onFormSubmit }) => {

    const [submitting, setSubmitting] = useState(false);

    const deleteYourJob = async (event: React.MouseEvent, jobId: number) => {
        event.stopPropagation(); // Prevent click event from bubbling up

        Swal.fire({
            title: "Do you really want to delete this project?",
            text: "Once deleted, you will not be able to recover it.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setSubmitting(true);
                    const response: any = await axiosInstance({
                        url: 'project/delete-your-project',
                        method: "POST",
                        data: {
                            project_id: jobId,
                        }
                    });


                    if (response.error === false) {
                        Swal.fire({
                            title: response.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                onFormSubmit();
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error in API request:", error);
                } finally {
                    setSubmitting(false);
                }
            }
        });
    }

    return (
        <>
            <div className="tab-card-section">


                {projects && projects.length > 0 ? (
                    <>
                        {projects.map((project: any, index: number) => (
                            <div key={index} className="tab-card-items">
                                <div className="tab-grid-container">
                                    <div className="tab-span-colm-9">
                                        <div className="contract-cta-sec">
                                            <div className="contract-title-block">
                                                <h2 className="title">{helpers.toTitleCase(project.title)}</h2>
                                            </div>

                                            <div className="cta-middle-content">

                                                <div className="cta-grid-container">
                                                    <div className="span-3-colm">
                                                        <div className="contract-info-content">
                                                            <h4 className="openings-title">Posted by: {helpers.toTitleCase(project?.client_user?.name) + " " + project?.client_user?.last_name}</h4>
                                                            <div className="opening-status-text">
                                                                <span>Posted on:{helpers.formatDate(project?.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="span-9-colm">
                                                        <div className="contract-feedback-info">
                                                            <div className="activity-data-info">
                                                                <div className="title-badge-onboard d-flex align-items-center badge-gaps">
                                                                    <div className="air-badge">
                                                                        {project.project_status_label === 'publish'
                                                                            ? 'Published'
                                                                            : project.project_status_label === 'assign'
                                                                                ? 'Assigned'
                                                                                : project.project_status_label === 'draft'
                                                                                    ? 'Drafted' : helpers.toTitleCase(project.project_status_label)
                                                                        }
                                                                    </div>
                                                                    <div className="badge-text-info">
                                                                        <div className="badge-text-base">
                                                                            <span> {helpers.toTitleCase(project.project_type_label)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="job-show-description">
                                                                <p dangerouslySetInnerHTML={{ __html: project.description }}  ></p>
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
                                                <a className="tab-view-btns" href="#" onClick={() => viewProjectDetail(project)}>View Job</a>
                                                {(project.project_status === 3 || project.project_status === 4 || project.project_status === 5) && (
                                                    <Link className="tab-message-btns" to={`/client/project-proposal/${project.id}`}>View Proposal</Link>
                                                )}
                                                {(project.project_status === 1 || project.project_status === 2 || project.project_status === 3) && (
                                                    <a className="tab-view-btns" href="#" onClick={(e) => deleteYourJob(e, project.id)}>Delete Job</a>
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

export default JobsComponent;
