import React, { useState, useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axiosInstance from "../../_helpers/axiosInstance";
import ButtonLoader from "../Common/ButtonLoader";

const MySwal = withReactContent(Swal);
interface TitleModalProps {
    id: number;
    coverLetterData: string;
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;

}

export const EditApplicationModal: React.FC<TitleModalProps> = ({ id, coverLetterData, isOpen, onClose, isEdit }) => {
    const [coverLetter, setCoverLetter] = useState<string>(isEdit ? coverLetterData : '');
    const [errorCoverLetter, setErrorCoverLetter] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit && coverLetterData) {
            setCoverLetter(coverLetterData);
        } else if (!isEdit) {
            setCoverLetter('');
        }
    }, [coverLetterData, isEdit]);

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
                url: 'edit-project-proposal',
                method: "POST",
                data: { proposal_id: id, cover_letter: coverLetter, isEdit: isEdit }
            });
            if (response.error === false) {
                MySwal.fire({
                    title: (isEdit) ? "Application Update successfully" : "Application re-apply  successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                onClose();
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
                        <h2 className="airModal-title h2">{(isEdit) ? "Edit Applied Job" : "Re-Apply for This Job"} </h2>
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
