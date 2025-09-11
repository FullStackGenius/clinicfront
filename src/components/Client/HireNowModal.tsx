import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../_helpers/axiosInstance";
import { setLoadData } from "../../redux/commonSlice";
import ButtonLoader from "../Common/ButtonLoader";
import { useNavigate, useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);
interface TitleModalProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    onJobAppliedHired: () => void;
}

interface ApiResponse {
    error: string;
    message: string;
    data: ProposalData;
}

interface ProposalData {
    id: number;
    project_id: number;
    freelancer_id: number;
    bid_amount: string;
    cover_letter: string;
    status: string;
    created_at: string; // ISO date format
    updated_at: string; // ISO date format
}


export const HireNowModal: React.FC<TitleModalProps> = ({ onJobAppliedHired, id, isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const segment = useParams();
    const [projectStartDate, setProjectStartDate] = useState<string>("");
    const [projectEndDate, setProjectEndDate] = useState<string>("");
    const [proposalStatus, setProposalStatus] = useState<string>("");
    const [contractType, setContractType] = useState<string>("");
    const [paymentType, setPaymentType] = useState<string>("");
    const [projectAmount, setProjectAmount] = useState<number | undefined>(undefined);
    const [errors, setErrors] = useState<Record<string, string>>({ proposalStatus: "", projectStartDate: "", projectEndDate: "", contractType: "", paymentType: "", projectAmount: "" });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [milestones, setMilestones] = useState<{ title: string; amount: string; description: string }[]>([
        { title: "", amount: "", description: "" }
    ]);
    const [milestoneErrors, setMilestoneErrors] = useState<{ title: string; amount: string; description: string }[]>([
        { title: "", amount: "", description: "" }
    ]);
    const [totalAmountError, setTotalAmountError] = useState<string>("");
    const addMilestone = () => {
        setMilestones([...milestones, { title: "", amount: "", description: "" }]);
        setMilestoneErrors([...milestoneErrors, { title: "", amount: "", description: "" }]);
    };

    const updateMilestone = (index: number, field: string, value: string) => {
        const updatedMilestones = [...milestones];
        updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
        setMilestones(updatedMilestones);

        // Validate individual field
        const updatedErrors = [...milestoneErrors];
        updatedErrors[index] = {
            ...updatedErrors[index],
            [field]: value.trim() === "" ? `${field} is required` : ""
        };
        setMilestoneErrors(updatedErrors);

        // Recalculate total amount
        validateTotalAmount(updatedMilestones);
    };

    const removeMilestone = (index: number) => {
        const updatedMilestones = milestones.filter((_, i) => i !== index);
        const updatedErrors = milestoneErrors.filter((_, i) => i !== index);
        setMilestones(updatedMilestones);
        setMilestoneErrors(updatedErrors);

        // Recalculate total amount
        validateTotalAmount(updatedMilestones);
    };

    const validateTotalAmount = (milestones: { title: string; amount: string; description: string }[]) => {
        const total = milestones.reduce((sum, milestone) => sum + (parseFloat(milestone.amount) || 0), 0);
        if ((projectAmount !== undefined && total > projectAmount)) {
            setTotalAmountError(`Total amount cannot exceed ${projectAmount}.`);
        } else {
            setTotalAmountError("");
        }
    };

    const handleSubmit = () => {
        let isValid = true;
        // Validate each field
        const newErrors = milestones.map(milestone => {
            const errorObj = {
                title: milestone.title.trim() === "" ? "Title is required" : "",
                amount: milestone.amount.trim() === "" ? "Amount is required" : isNaN(parseFloat(milestone.amount)) ? "Amount must be a number" : "",
                description: milestone.description.trim() === "" ? "Description is required" : ""
            };
            if (errorObj.title || errorObj.amount || errorObj.description) {
                isValid = false;
            }
            return errorObj;
        });
        setMilestoneErrors(newErrors);
        // Check total amount
        const total = milestones.reduce((sum, milestone) => sum + (parseFloat(milestone.amount) || 0), 0);
        if ((projectAmount !== undefined && total > projectAmount)) {
            setTotalAmountError(`Total amount cannot exceed ${projectAmount}.`);
            isValid = false;
        } else {
            setTotalAmountError("");
        }
        if (!isValid) {
            return false;
        } else {
            return true;
        }
    };

    const validate = (): boolean => {
        let tempErrors: Record<string, string> = {};

        if (!projectStartDate) {
            tempErrors.projectStartDate = "Project Start Date is required.";
        }

        if (!projectEndDate) {
            tempErrors.projectEndDate = "Project End Date is required.";
        } else if (projectStartDate && new Date(projectEndDate) < new Date(projectStartDate)) {
            tempErrors.projectEndDate = "Project End Date must be after or equal to the Start Date.";
        } else if (new Date(projectEndDate) > new Date('2099-12-31')) {
            tempErrors.projectEndDate = "Project End Date must be valid.";
        }
        if (!contractType) {
            tempErrors.contractType = "Contract Type is required.";
        }
        if (!paymentType) {
            tempErrors.paymentType = "Payment Type is required.";
        }

        if (!projectAmount) {
            tempErrors.projectAmount = "Project Amount is required.";
        } else if (isNaN(Number(projectAmount))) {
            tempErrors.projectAmount = "Project Amount must be a number.";
        }
        if (!proposalStatus) {
            tempErrors.proposalStatus = "Proposal status is required.";
        }
        setErrors(tempErrors);
        const hasErrors = Object.keys(tempErrors).length > 0;
        // undo below code for milestone validation
        const otherCondition = handleSubmit(); // Replace with actual condition
        return !(hasErrors || !otherCondition);
    };


    const saveData = async (): Promise<void> => {
        if (!validate()) return;
        try {
            setSubmitting(true);
            const response: any = await axiosInstance({
                url: 'jobs/response-to-proposal',
                method: "POST",
                data: {
                    proposal_id: id,
                    proposal_status: proposalStatus,
                    project_id: segment.chat_id,
                    type: contractType,
                    payment_type: paymentType,
                    started_at: projectStartDate,
                    ended_at: projectEndDate,
                    amount: projectAmount,
                    milestones: milestones
                }
            });
            if (response.error === "false") {
                dispatch(setLoadData(true));
                onClose();
                resetForm();
                onJobAppliedHired();
                setMilestones([{ title: "", amount: "", description: "" }]);
                setMilestoneErrors([{ title: "", amount: "", description: "" }]);
                setTotalAmountError("");
                let contractId = response.data.contract.id;
                navigate(`/contract/payment/${contractId}`);
            }
        } catch (error) {
            console.error("Error in API request:", error);
            setMilestones([{ title: "", amount: "", description: "" }]);
            setMilestoneErrors([{ title: "", amount: "", description: "" }]);
            setTotalAmountError("");
            onClose();
            resetForm();

        } finally {
            setSubmitting(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setProjectStartDate("");
        setProjectEndDate("");
        setContractType("");
        setPaymentType("");
        setProposalStatus("");
        setProjectAmount(undefined);
        setErrors({});
    };


    const handleClose = (e: React.MouseEvent) => {
        onClose();
    };
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers and decimals
        setProjectAmount(Number(value))
    };

    return (
        <div id="pr-title-edit-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="air-modal-items air-modal-import-resume-modal">
                <div className="airModal-content">
                    <div className="airModal-header">
                        <h2 className="airModal-title h2">Hired Now</h2>
                        <button className="airModal-close" type="button" onClick={handleClose}>
                            <div className="air-icon">
                                <img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
                            </div>
                        </button>
                    </div>
                    <div className="airModal-body">
                        <div className="modal-resume-content">
                            <div className="project-title-edit-options">
                                <div className="form-grid-containers">
                                    <div className="job-forms-items">
                                        <div className="form-group">
                                            <label>Project Start Date:</label>
                                            <input className="form-control" type="date"
                                                placeholder="Project Start Date"

                                                value={projectStartDate}
                                                onChange={(e) => setProjectStartDate(e.target.value)}
                                                min="2000-01-01"
                                                max="2099-12-31"

                                            />
                                            <div className="air-form-message form-message-error"
                                                style={{ display: errors?.projectStartDate ? 'flex' : 'none' }}
                                            >
                                                <div className="air-icons">
                                                    <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                                                </div>
                                                <span>{errors.projectStartDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="job-forms-items">
                                        <div className="form-group">
                                            <label>Project End Date:</label>
                                            <input className="form-control" type="date"
                                                placeholder="Project End Date"

                                                value={projectEndDate}
                                                onChange={(e) => setProjectEndDate(e.target.value)}
                                                max="2099-12-31" // 👈 restrict end date to a safe MySQL-compatible date


                                            />
                                            <div className="air-form-message form-message-error"
                                                style={{ display: errors?.projectEndDate ? 'flex' : 'none' }}
                                            >
                                                <div className="air-icons">
                                                    <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                                                </div>
                                                <span>{errors.projectEndDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-grid-containers">
                                    <div className="job-forms-items">
                                        <div className="form-group">
                                            <label>Proposal Staus:</label>
                                            <select className="form-control" value={proposalStatus}
                                                onChange={(e) => setProposalStatus(e.target.value)}>
                                                <option value="">Select</option>
                                                <option value="hired">Hired</option>
                                            </select>
                                            <div className="air-form-message form-message-error"
                                                style={{ display: errors?.proposalStatus ? 'flex' : 'none' }}
                                            >
                                                <div className="air-icons">
                                                    <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                                                </div>
                                                <span>{errors.proposalStatus}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="job-forms-items">
                                        <div className="form-group">
                                            <label>Contract Type:</label>
                                            <select className="form-control" value={contractType}
                                                onChange={(e) => setContractType(e.target.value)}>
                                                <option value="">Select</option>
                                                <option value="fixed">Fixed</option>
                                            </select>
                                            <div className="air-form-message form-message-error"
                                                style={{ display: errors?.contractType ? 'flex' : 'none' }}
                                            >
                                                <div className="air-icons">
                                                    <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                                                </div>
                                                <span>{errors.contractType}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-grid-containers">
                                    <div className="job-forms-items">
                                        <div className="form-group">
                                            <label>Payment Type:</label>
                                            <select className="form-control" value={paymentType}
                                                onChange={(e) => setPaymentType(e.target.value)}>
                                                <option value="">Select</option>
                                                <option value="milestone">Milestone</option>
                                            </select>
                                            <div className="air-form-message form-message-error"
                                                style={{ display: errors?.paymentType ? 'flex' : 'none' }}
                                            >
                                                <div className="air-icons">
                                                    <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                                                </div>
                                                <span>{errors.paymentType}</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="job-forms-items">
                                        <div className="form-group">
                                            <label>Project Amount:</label>
                                            <input className="form-control" type="text"
                                                placeholder="$0.00"
                                                value={projectAmount ? `$${projectAmount}` : ""}
                                                onChange={handlePriceChange}
                                            />
                                            <div className="air-form-message form-message-error"
                                                style={{ display: errors?.projectAmount ? 'flex' : 'none' }}
                                            >
                                                <div className="air-icons">
                                                    <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                                                </div>
                                                <span>{errors.projectAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-forms-items">

                                    <div className="MilestoneDivider">
                                        {milestones.map((milestone, index) => (
                                            <div className="MilestoneDiv" key={index}>
                                                <h3>Milestones</h3>
                                                <div className="milestone-item">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Title"
                                                        value={milestone.title}
                                                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                                                    />
                                                    {milestoneErrors[index]?.title && <div className="air-form-message form-message-error" style={{ display: "flex" }}><div className="air-icons"><img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" /></div><span>{milestoneErrors[index].title}</span></div>}

                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="$0.00"
                                                        value={milestone.amount ? `$${milestone.amount}` : ""}

                                                        onChange={(e) => updateMilestone(index, 'amount', e.target.value.replace(/\D/g, ""))}
                                                    />
                                                    {milestoneErrors[index]?.amount && <div className="air-form-message form-message-error" style={{ display: "flex" }}><div className="air-icons"><img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" /></div><span>{milestoneErrors[index].amount}</span></div>}

                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Description"
                                                        value={milestone.description}
                                                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                                                    />
                                                    {milestoneErrors[index]?.description && <div className="air-form-message form-message-error" style={{ display: "flex" }}><div className="air-icons"><img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" /></div><span>{milestoneErrors[index].description}</span></div>}

                                                    {index > 0 && (
                                                        <button className="form-control removed-btns" type="button" onClick={() => removeMilestone(index)}>
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    {totalAmountError && <div className="air-form-message form-message-error" style={{ display: "flex" }}><div className="air-icons"><img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" /></div><span>{totalAmountError}</span></div>}

                                    <button className="form-control add-more-btns" type="button" onClick={addMilestone}>
                                        Add More
                                    </button>
                                </div>




                            </div>
                        </div>
                    </div>
                    <div className="airModal-footer">
                        <div className="modal-two-btns d-flex align-items-center justify-space-between">
                            <button type="button" className="air-btns btns-text-light" onClick={handleClose}>Cancel</button>
                            <button type="button" className="air-btns btns-primary" onClick={saveData}>
                                {submitting ? <ButtonLoader /> : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
