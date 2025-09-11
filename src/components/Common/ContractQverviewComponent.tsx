import React, { useState } from 'react'
import axiosInstance from '../../_helpers/axiosInstance';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ButtonLoader from './ButtonLoader';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
const MySwal = withReactContent(Swal);
interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    country_name: string;
    profile_image_path: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    budget_type_label: string;
    project_type_label: string;
}

interface Contract {
    id: number;
    type: string;
    amount: string;
    status: string;
    payment_type: string;
    started_at: string;
    ended_at: string;
    freelancer: User;
    client: User;
    project: Project;
}
interface MilestonePayment {
    id: number;
    transferred_at: string;
    created_at: string;
    updated_at: string;
}

interface Milestone {
    id: number;
    contract_id: number;
    title: string;
    description: string;
    amount: string;
    completion_percentage: string;
    status: "pending" | "completed" | "paid";
    milestone_payments: MilestonePayment[];
}

interface ContractPaymentDetail {
    in_enscrow: number;
    total_earning: number;
}
interface ContractQverviewProps {
    contractData: Contract | null;
    contractMilestone: Milestone[];
    contractPaymentDetail: ContractPaymentDetail | null;
    onFormSubmit: () => void;

}

const ContractQverviewComponent: React.FC<ContractQverviewProps> = ({ contractMilestone, contractData, contractPaymentDetail, onFormSubmit }) => {
    const [loadingMilestones, setLoadingMilestones] = useState<{ [key: number]: boolean }>({});
    const user = useSelector((state: RootState) => state.user.user);

    const releasPayment = async (contractId: number, milestoneId: number) => {
        setLoadingMilestones(prev => ({ ...prev, [milestoneId]: true }));
        try {
            const response: any = await axiosInstance({
                url: 'release-payment-to-freelancer',
                method: "POST",
                data: {
                    contract_id: contractId,
                    milestone_id: milestoneId,

                }
            });

            if (response.error == false) {
                Swal.fire({
                    title: "Milestone payment  successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                onFormSubmit();
            }
        } catch (error) {
            console.error("Error in API request:", error);
        } finally {
            setLoadingMilestones(prev => ({ ...prev, [milestoneId]: false }));
        }
    }

    const submitRequestToCompleteMilestone = async (milestoneId: number) => {
        setLoadingMilestones(prev => ({ ...prev, [milestoneId]: true }));
        try {
            const response: any = await axiosInstance({
                url: 'jobs/request-to-release-milestone-payment',
                method: "POST",
                data: {
                    milestone_id: milestoneId,
                }
            });
            console.log(response);
            if (response.error === "false") {
                Swal.fire({
                    title: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                onFormSubmit();
            }
        } catch (error) {
            console.error("Error in API request:", error);
        } finally {
            setLoadingMilestones(prev => ({ ...prev, [milestoneId]: false }));
        }
    }

    const handleShowTransaction = async (milestoneId: number) => {
        try {
            const response: any = await axiosInstance({
                url: 'get-payment-transaction-detail',
                method: "POST",
                data: { type: "milestone", data_id: milestoneId }

            });
            let milestoneRes = response.data.detail;
            let details = JSON.parse(response.data.detail.raw_data);
            if (response.error === false) {

                MySwal.fire({
                    title: 'Transaction Details',
                    html: (
                        <div style={{ textAlign: 'left', fontSize: '16px' }}>
                            <p><strong>Transaction ID:</strong> {details.id}</p>
                            <p><strong>Amount Paid:</strong> ${milestoneRes.actual_milestone_amount} {details.currency}</p>
                            <p><strong>Date:</strong> {milestoneRes.transferred_at}</p>
                            <p><strong>Payment Method:</strong> {details.source_type}</p>
                            <p><strong>Reference:</strong> {milestoneRes.transfer_group}</p>
                        </div>
                    ),
                    showCloseButton: true,
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#FE6002',
                    width: '500px',
                });
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
        }
    };

    return (
        <>
            <div className="qa-tab-card-sec">
                <div className="overview-tab-content">
                    <div className="overview-grid-container">
                        <div className="span-lg-colm-9">
                            <div className="amount-group-container">
                                <div className="amount-cell-items span-6-colm">
                                    <div className="amount-header">Project price</div>
                                    <div className="amount-value">${contractData?.amount}</div>
                                </div>
                                <div className="amount-cell-items span-6-colm">
                                    <div className="amount-header">In Enscrow</div>
                                    <div className="amount-value">${contractPaymentDetail?.in_enscrow}</div>
                                </div>
                                <div className="amount-cell-items span-6-colm font-bold">
                                    <div className="amount-header">Milestones Paid ({contractMilestone
                                        ?.filter((milestone: any) => milestone.status === 'paid').length})</div>
                                    <div className="amount-value">
                                        ${contractMilestone
                                            ?.filter((milestone: any) => milestone.status === 'paid')
                                            .reduce((total: number, milestone: any) => total + Number(milestone.amount), 0)
                                        }
                                    </div>
                                </div>
                                <div className="amount-cell-items span-6-colm font-bold">
                                    <div className="amount-header">Milestones Pending ({contractMilestone
                                        ?.filter((milestone: any) => milestone.status === 'pending').length})</div>
                                    <div className="amount-value">
                                        ${contractMilestone
                                            ?.filter((milestone: any) => milestone.status === 'pending')
                                            .reduce((total: number, milestone: any) => total + Number(milestone.amount), 0)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="span-lg-colm-3">
                            <div className="amount-cell-items">
                                <div className="amount-header">Total Charges</div>
                                <div className="amount-value">${contractPaymentDetail?.total_earning}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="milestones-items">
                    <div className="milestones-gird-container">
                        <div className="span-lg-colm-7">
                            <div className="milestones-timeline-items">
                                <div className="mile-timeline-title">
                                    <h2>Milestone timeline</h2>
                                </div>
                                <div className="timeline-step-vertical">
                                    <ol className="milestone-steps-container">
                                        {contractMilestone && contractMilestone.map((milestone: any, index: number) => (
                                            <li key={index} className="step-vertical-item">
                                                <div className="step-indicator-item is-completed" >
                                                    <div className="step-circle">
                                                        <div className="step-vertical-item-icon">
                                                            <div className="complete-step-icon">
                                                                <img className="img-fluid" src="/assets/images/completed-icon.svg" alt="" title="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="steps-content">
                                                        <div className="milestone-des">
                                                            <div className="milestone-title">{milestone.title}</div>
                                                            <div className="milestone-title">{milestone.description}</div>
                                                            <div className="d-flex align-items-center badge-with-prices">
                                                                <span data-test="milestone-amount" className="milestone-deposit">${milestone.amount}</span>
                                                                {(milestone.status == 'paid') ? <>
                                                                    <span className="air-badge-bars">
                                                                        <span className="air-badge bg-light">Paid <i className="fa-solid fa-circle-info"></i> </span>  <span style={{ cursor: "pointer" }} onClick={() => handleShowTransaction(milestone?.id)}><img className="img-fluid" src="/assets/images/icons8-info-black.svg" alt="" title="" /> </span>
                                                                    </span>
                                                                </> : ""}
                                                            </div>
                                                            {milestone.status === 'pending' ? (
                                                                <>
                                                                    {user && user.role_id === 2 ? (
                                                                        <div className="release-payment-btns">
                                                                            <button
                                                                                className="qa-release-payment"
                                                                                onClick={() => releasPayment(milestone.contract_id, milestone.id)}
                                                                                disabled={loadingMilestones[milestone.id]}
                                                                            >
                                                                                {loadingMilestones[milestone.id] ? <ButtonLoader /> : 'Release Payment'}
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <span className="air-badge-bars">
                                                                            {
                                                                                milestone ? (
                                                                                    milestone.track_milestone_request ? (
                                                                                        <span className="air-badge bg-light">Request Sent</span>
                                                                                    ) : (
                                                                                        <span
                                                                                            className="air-badge bg-light"
                                                                                            onClick={() => submitRequestToCompleteMilestone(milestone.id)}
                                                                                            style={{ cursor: 'pointer' }}
                                                                                        >
                                                                                            {loadingMilestones[milestone.id] ? 'Sending...' : 'Send request to complete milestone'}
                                                                                        </span>
                                                                                    )
                                                                                ) : ""
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}


                                                            <br />
                                                            {(milestone.status == 'paid') ? <>
                                                                <div className="milestone-date-block d-flex align-items-center">
                                                                    <div className="date-icon"><img className="img-fluid" src="/assets/images/date-icon.svg" alt="" title="" /></div> <span>Paid on: {milestone.milestone_payments.transferred_at}</span>
                                                                </div>
                                                            </> : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>))}
                                        <li className="step-vertical-item step-add-item">
                                            <div className="step-indicator-item">
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContractQverviewComponent