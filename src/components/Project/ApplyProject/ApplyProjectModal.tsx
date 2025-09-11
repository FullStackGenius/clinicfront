import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setLoadData } from "../../../redux/commonSlice";
import type { AppDispatch } from '../../../redux/store';
import ButtonLoader from '../../Common/ButtonLoader';
import axiosInstance from "../../../_helpers/axiosInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
interface TitleModalProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    onJobApplied: () => void;

}

export const ApplyProjectModal: React.FC<TitleModalProps> = ({ id, isOpen, onClose, onJobApplied }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [bidAmount, setBidAmount] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [errorCoverLetter, setErrorCoverLetter] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);

    const validateForm = (): boolean => {
        let isValid = true;
        if (!coverLetter.trim()) {
            setErrorCoverLetter('Application Notes is required');
            isValid = false;
        } else {
            setErrorCoverLetter(''); // ✅ Hide error once filled
        }
        return isValid;
    };



    const handleCoverLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCoverLetter(e.target.value);
        if (e.target.value.trim()) {
            setErrorCoverLetter(''); // ✅ Hide error when value is entered
        }
    };
    // ✅ Save data function
    const saveData = async (): Promise<void> => {
        if (!validateForm()) return; // Stop if validation fails

        try {
            setSubmitting(true);
            const response: any = await axiosInstance({
                url: 'send-project-proposal',
                method: "POST",
                data: { project_id: id, bid_amount: bidAmount, cover_letter: coverLetter }
            });
            if (response.error === 'false') {
                dispatch(setLoadData(true));
                onClose();
                setBidAmount("");
                setCoverLetter("");
                onJobApplied();
                MySwal.fire({
                    title: "Job applied successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error in API request:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = (e: React.MouseEvent) => {
        onClose();
    };

    return (
        <div id="pr-title-edit-popup" className="air-modal-popup" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="air-modal-items air-modal-import-resume-modal">
                <div className="airModal-content">
                    <div className="airModal-header">
                        <h2 className="airModal-title h2">Apply now</h2>
                        <button className="airModal-close" type="button" onClick={handleClose}>
                            <div className="air-icon">
                                <img className="img-fluid" src="/assets/images/close-icon.svg" alt="" title="" />
                            </div>
                        </button>
                    </div>
                    <div className="airModal-body">
                        <div className="modal-resume-content">
                            <div className="project-title-edit-options">
                                <div className="apply-job-forms-items">
                                    <div className="form-group">
                                        <label>Application Notes</label>
                                        <textarea name="message" className="form-control" style={{ textTransform: 'none' }} cols={30} rows={5} placeholder="Application Notes"
                                            value={coverLetter}
                                            onChange={handleCoverLetterChange}
                                        ></textarea>

                                        <div className="air-form-message form-message-error"
                                            style={{ display: errorCoverLetter !== '' ? 'flex' : 'none' }}
                                        >
                                            <div className="air-icons">
                                                <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                                            </div>
                                            <span>{errorCoverLetter}</span>
                                        </div>
                                    </div>
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
