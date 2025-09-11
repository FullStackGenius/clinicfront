import { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Header from '../layouts/partials/Header'
import Footer from '../layouts/partials/Footer'
import axiosInstance from '../../_helpers/axiosInstance';
import helpers from '../../_helpers/common';
import { useNavigate, useParams } from 'react-router-dom';
import ContractQverviewComponent from '../Common/ContractQverviewComponent';
import ContractDetailComponent from '../Common/ContractDetailComponent';
import Loader from '../Common/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


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

function ContractDetail() {
    const [loading, setLoading] = useState(true);
    const segment = useParams();
    const [segmentId, setSegmentId] = useState<string | number | undefined>('');
    const [contractData, setContractData] = useState<Contract | null>(null);
    const [contractMilestone, setContractMilestone] = useState<Milestone[]>([]);
    const [contractPaymentDetail, setContractPaymentDetail] = useState<ContractPaymentDetail | null>(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const user = useSelector((state: RootState) => state.user.user);


    const tabs = ['overview', 'contract details'];

    const navigate = useNavigate();

    useEffect(() => {
        fetchContractDetail();
    }, [activeTab, refreshKey]);

    const fetchContractDetail = async () => {
        setLoading(true);
        try {

            const response: any = await axiosInstance({
                url: 'jobs/get-contract-details',
                method: "POST",
                params: { contract_id: segment.contract_id }

            });

            if (response.error === "false") {
                //console.log(response);
                setContractData(response.data.contract)
                setContractMilestone(response.data.milestones);

                setContractPaymentDetail(response.data.contractPaymentDetail)
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);

        }
    };

    const getFormattedTime = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        return new Date().toLocaleString("en-US", options);
    };

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1); // increment to trigger rerender
    };

    return (
        <>
            <Loader isLoading={loading} />
            <AuthLayout>
                <Header />
                <section className="profile-overview-section">
                    <div className="main-container">
                        <div className="overview-profile-items">
                            <div className="profile-top-items">
                                <div className="overview-profile-info">

                                    <div className="qa-title-block">
                                        <h1>{helpers.toTitleCase(contractData?.project?.title)}</h1>
                                    </div>

                                    <div className="qa-opposite-info">

                                        <div className="qa-user-info d-flex align-items-center">
                                            <div className="qa-up-avatar">
                                                <div className="qa-user-person">
                                                    <img className="img-fluid" src={contractData?.freelancer.profile_image_path} alt="" title="" />
                                                </div>
                                            </div>
                                            <div className="qa-media-body">
                                                <div className="qa-user-name">{helpers.toTitleCase(contractData?.freelancer.name)} {contractData?.freelancer.last_name}</div>
                                                <span className="country-time">
                                                    <span className="qa-user-country">{helpers.toTitleCase(contractData?.freelancer.country_name)}</span> - <span className="qa-local-time">{getFormattedTime()}</span>
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="qa-tabs-header">
                                        <div className="qa-tabs-horizontal">
                                            <ul>
                                                {tabs.map((tab) => (
                                                    <li
                                                        key={tab}
                                                        className={`qa-tab-list-item ${activeTab === tab ? "is-active" : ""}`}
                                                        onClick={() => { setActiveTab(tab) }}
                                                    >
                                                        <button className="qa-tab-btn" id="overview-tab">{helpers.toTitleCase(tab)}</button>
                                                    </li>
                                                ))}
                                                {user && user.role_id == 2 ? (<> <li className="qa-tab-list-item">
                                                    <button className="qa-tab-btn" id="details-tab" onClick={() => navigate(`/chat/${contractData?.freelancer.id}/${contractData?.id}`)}>Messages</button>
                                                </li></>) : (<>
                                                    <li className="qa-tab-list-item">
                                                        <button className="qa-tab-btn" id="details-tab" onClick={() => navigate(`/chat/${contractData?.client.id}/${contractData?.id}`)}>Messages</button>
                                                    </li>
                                                </>)}

                                            </ul>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            {activeTab === "overview" && <>
                                {contractData && <ContractQverviewComponent contractMilestone={contractMilestone} contractData={contractData} contractPaymentDetail={contractPaymentDetail} onFormSubmit={handleRefresh} />}


                            </>}

                            {activeTab === "contract details" &&
                                <>{contractData && <ContractDetailComponent contractData={contractData} />}</>

                            }
                        </div>
                    </div>
                </section>
                <Footer />
            </AuthLayout>



        </>
    )
}

export default ContractDetail