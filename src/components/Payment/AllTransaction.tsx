import React, { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Header from '../layouts/partials/Header'
import axiosInstance from "../../_helpers/axiosInstance";
import Loader from '../Common/Loader';

export interface User {
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

export interface MilestonePaymentDetail {
    id: number;
    milestone_id: number;
    contract_id: number;
    freelancer_id: number;
    project_id: number;
    transfer_id: string;
    destination_account: string;
    destination_payment: string;
    balance_transaction_id: string;
    currency: string;
    amount: string;
    actual_milestone_amount: string;
    platform_fee_charges: string;
    transfer_group: string;
    reversed: number;
    transferred_at: string;
    raw_data: string;
    created_at: string;
    updated_at: string;
}

export interface ContractPayment {
    id: number;
    contract_id: number;
    project_id: number;
    client_id: number;
    payment_intent_id: string;
    amount: string;
    currency: string;
    status: string;
    paid_at: string;
    transfer_group: string;
    stripe_response: string;
    created_at: string;
    updated_at: string;
}

export interface PaymentTransaction {
    id: number;
    payer_id: number;
    receiver_id: number | null;
    payment_for: string;
    payable_type: string;
    payable_id: number;
    created_at: string;
    updated_at: string;
    payer: User;
    receiver: User | null;
    payable: MilestonePaymentDetail | ContractPayment;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedTransactionResponse {
    current_page: number;
    data: PaymentTransaction[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}


function AllTransaction() {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState("all");
    const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);



    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage, activeTab]);

    const fetchProjects = async (page: number) => {
        try {
            setLoading(true);
            const response: any = await axiosInstance({
                url: 'show-all-transaction',
                method: "GET",
                params: { page, per_page: perPage }

            });
            if (response.error === false) {
                setTransactions(response.data.data);
            }

        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    const cellStyle: React.CSSProperties = {
        border: "1px solid #ccc",
        padding: "10px",
        textAlign: "center",
    };

    return (
        <>
            <Loader isLoading={loading} />
            <AuthLayout>
                <Header />


                <section className="all-jobs-section">
                    <div className="main-container">

                        <div className="job-title-block">
                            <h1>Payment Transactions</h1>
                        </div>
                        <div className="jobs-tab-items">
                            <div
                                style={{
                                    maxWidth: "1000px",
                                    margin: "20px auto",
                                    padding: "10px",
                                    fontFamily: "Arial, sans-serif",
                                }}
                            >
                                <h2
                                    style={{
                                        textAlign: "center",
                                        marginBottom: "20px",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Payment Transactions
                                </h2>

                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            {["#", "Payer", "Receiver", "Payment For", "Amount", "Currency", "Date"].map((heading) => (
                                                <th
                                                    key={heading}
                                                    style={{
                                                        border: "1px solid #ccc",
                                                        padding: "10px",
                                                        backgroundColor: "#f2f2f2",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {transactions.map((txn, index) => (
                                            <tr
                                                key={txn.id}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                                                    transition: "background-color 0.3s",
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "#fff")}
                                            >
                                                <td style={cellStyle}>{index + 1}</td>
                                                <td style={cellStyle}>
                                                    {txn.payer.name} {txn.payer.last_name}
                                                </td>
                                                <td style={cellStyle}>
                                                    {txn.receiver ? `${txn.receiver.name} ${txn.receiver.last_name}` : "—"}
                                                </td>
                                                <td style={cellStyle}>{txn.payment_for}</td>
                                                <td style={cellStyle}>
                                                    {(txn.payable as any).amount}
                                                </td>
                                                <td style={cellStyle}>
                                                    {(txn.payable as any).currency}
                                                </td>
                                                <td style={cellStyle}>{new Date(txn.created_at).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </AuthLayout>


        </>

    )
}

export default AllTransaction