import { useEffect, useState } from 'react'
import Footer from '../layouts/partials/Footer';
import Loader from '../Common/Loader';
import Header from '../layouts/partials/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../_helpers/axiosInstance';
import ContractPayment from './ContractPayment';

interface Contract {
    id: number;
    project_id: number;
    proposal_id: number;
    freelancer_id: number;
    client_id: number;
    started_at: string;
    ended_at: string;
    type: string;
    amount: string;
    status: string;
    payment_type: string;
    proposal: Proposal;
    project: Project;
    freelancer: User;
    client: User;
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

interface User {
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
    stripe_account_id: string;
    star_rating: string | null;
    total_hours: number | null;
    email_verified_at: string;
    role_id: number;
    country_id: number;
    deleted_at: string | null;
    role_name: string;
    country_name: string;
    profile_image_path: string;
}
function MakeContractPayment() {
    const segment = useParams();
    const [loading, setLoading] = useState(true);
    const [contractId, setcontractId] = useState(Number(segment.contract_id));
    const navigate = useNavigate();
    const [contractDetail, setContractDetail] = useState<Contract | null>(null);
    useEffect(() => {
        getStripeAccountInfo();
    }, []);

    const getStripeAccountInfo = async () => {
        try {
            setLoading(true);
            const response: any = await axiosInstance({
                url: 'jobs/get-contract-details',
                method: "POST",
                data: { contract_id: contractId }
            });
            if (response.error == "false") {
                setContractDetail(response.data.contract);
            }
        } catch (error) {
            if (error) {
                navigate("/client/job-contracts");
            }
            console.error("Error in API request:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    }
    return (
        <>
            <Loader isLoading={loading} />
            <Header />
            <section className="payments-page-section">
                <div className="main-container">
                    <div className="pricing-banner-content">

                        {contractDetail &&
                            <ContractPayment contractDetail={contractDetail} amount={Number(contractDetail?.amount)} contractId={contractId} />
                        }
                    </div>
                </div>
            </section>

            <Footer />
        </>

    )
}

export default MakeContractPayment