import React, { useState } from "react";
import PaginationHtml from "./PaginationHtml";
import helpers from "../../_helpers/common";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axiosInstance from "../../_helpers/axiosInstance";
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


interface ContractComponentProps {
    contracts: Contract[];
    lastPage: number;
    getPagination: () => (string | number)[];
    currentPage: number;
    handlePageChange: (page: number) => void;
    contractPageFor: string;
}
const MySwal = withReactContent(Swal);
const ContractComponent: React.FC<ContractComponentProps> = ({ contractPageFor, contracts, lastPage, getPagination, handlePageChange, currentPage }) => {
    const user = useSelector((state: RootState) => state.user.user);
    // const [submitting, setSubmitting] = useState(false);
    const [submitting, setSubmitting] = useState<Record<number, boolean>>({});

    const handleShowTransaction = async (contractId: number) => {

        try {
            setSubmitting(prev => ({ ...prev, [contractId]: true }));
            const response: any = await axiosInstance({
                url: 'get-payment-transaction-detail',
                method: "POST",
                data: { type: "contract", data_id: contractId }

            });
            let contact = response.data.detail;
            let details = JSON.parse(response.data.detail.stripe_response);
            if (response.error === false) {
                const paymentMethodType = details?.payment_method_types?.[0] || 'N/A';
                MySwal.fire({
                    title: 'Transaction Details',
                    html: (
                        <div style={{ textAlign: 'left', fontSize: '16px' }}>
                            <p><strong>Transaction ID:</strong> {details.id}</p>
                            <p><strong>Amount Paid:</strong> ${details.amount / 100} {details.currency}</p>
                            <p><strong>Status:</strong> {details.status}</p>
                            <p><strong>Date:</strong> {contact.paid_at}</p>
                            <p><strong>Payment Method:</strong> {paymentMethodType}</p>
                            <p><strong>Description:</strong> {details.description}</p>
                            <p><strong>Reference:</strong> {contact.transfer_group}</p>
                        </div>
                    ),
                    // icon: 'info',
                    showCloseButton: true,
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#FE6002',
                    width: '500px',
                });
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
            // setSubmitting(false);
            setSubmitting(prev => ({ ...prev, [contractId]: false }));
        } finally {
            // setSubmitting(false);
            setSubmitting(prev => ({ ...prev, [contractId]: false }));

        }



    };

    return (
        <>
            <div className="tab-card-section">


                {contracts && contracts.length > 0 ? (
                    <>
                        {contracts.map((contract: any, index: number) => (
                            <div key={index} className="tab-card-items">
                                <div className="tab-grid-container">
                                    <div className="tab-span-colm-9">
                                        <div className="contract-cta-sec">
                                            <div className="contract-title-block">
                                                <h2 className="title">{helpers.toTitleCase(contract.project.title)}</h2>
                                            </div>

                                            <div className="cta-middle-content">

                                                <div className="cta-grid-container">
                                                    <div className="span-3-colm">
                                                        <div className="contract-info-content">
                                                            {(contractPageFor == "client") ? <> <Link to={`/freelancer/view-profile/${contract?.freelancer?.id}`} ><h4 className="openings-title">Hired to: {helpers.toTitleCase(contract?.freelancer?.name) + " " + contract?.freelancer?.last_name}</h4></Link> </> : <h4 className="openings-title">Posted by: {helpers.toTitleCase(contract?.client?.name) + " " + contract?.client?.last_name}</h4>}

                                                            {/* <div className="openings-text">Metric Mission</div> */}
                                                            <div className="opening-status-text">
                                                                <span>Posted on: {helpers.formatDate(contract?.project?.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="span-9-colm">
                                                        <div className="contract-feedback-info">
                                                            <div className="activity-data-info">
                                                                <div className="title-badge-onboard d-flex align-items-center badge-gaps">
                                                                    <div className="air-badge">{helpers.toTitleCase(contract.status)}</div>
                                                                    <div className="badge-text-info">
                                                                        <div className="badge-text-base">
                                                                            <span> {helpers.toTitleCase(contract.project_type_label)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="charge-rate-info">
                                                                <div className="d-flex flex-wrap rate-gaps">
                                                                    <div className="rate-text">
                                                                        <div className="text-body-rate">
                                                                            <span>Project start: {helpers.formatDate(contract.started_at)}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="hour-text">
                                                                        <div className="text-body-rate">
                                                                            <span>Project end: {helpers.formatDate(contract.ended_at)}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="month-rate-text">
                                                                        <div className="text-body-rate">
                                                                            <span>Budget Type: {helpers.toTitleCase(contract.type)}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="current-rate-text">
                                                                        <div className="text-body-rate">
                                                                            <span>Payment Type: {helpers.toTitleCase(contract.payment_type)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="job-show-description">
                                                                <p dangerouslySetInnerHTML={{ __html: contract.project.description }}></p>
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
                                                <a className="tab-view-btns" href="#" onClick={(e) => e.preventDefault()} >${contract.amount}</a>
                                                {/* {(project.project_status === 3 || project.project_status === 4 || project.project_status === 5) && (
                                                    <Link className="tab-message-btns" to={`/client/project-proposal/${project.id}`}>view Proposal</Link>
                                                )} */}

                                                {/* <a className="tab-time-btns" href="#">Time Sheet</a> */}
                                                {(contract.status === "active") ? (<>
                                                    {(contractPageFor == "client") ? <Link to={`/chat/${contract?.freelancer?.id}/${contract?.id}`}>Start chat</Link> : <Link to={`/chat/${contract?.client?.id}/${contract?.id}`}>Start chat</Link>}
                                                    {(contractPageFor == "client") ? <><Link to={`/client/contracts-details/${contract?.id}`}>Contract detail</Link><a href="#" onClick={(e) => { e.preventDefault(); handleShowTransaction(contract?.id) }} className="nav-icon">{!submitting[contract?.id] ? 'Txn Details' : 'fetching...'}</a></> : <Link to={`/freelancer/contracts-details/${contract?.id}`}>Contract detail</Link>}
                                                </>) : (<>
                                                    {user && user.role_id == 2 && <> <Link to={`/contract/payment/${contract?.id}`}>Pay now</Link>
                                                        <p style={{ color: "red" }}>payment for contract is pending</p> </>}
                                                </>)}
                                                {/* <Link to={`/chat/${contract?.client?.id}`}>Start chat</Link>
                                                <Link to={`/chat/${contract?.freelancer?.id}`}>Start chat</Link> */}
                                            </div>
                                            {/* <div className="open-action-btn">
                        <button type="button" aria-expanded="false" data-ev-label="dropdown-secondary-toggle" className="air-btn-toggle">
                          <span className="open-icon"><img className="img-fluid" src="/assets/images/three-dots-icon.svg" alt="" title="" /></span>
                        </button>
                      </div> */}
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
                                    No contract found
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

export default ContractComponent;
