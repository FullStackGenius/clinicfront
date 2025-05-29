import React, { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Header from '../layouts/partials/Header'
import axiosInstance from "../../_helpers/axiosInstance";
import PaginationHtml from '../Common/PaginationHtml';
import helpers from '../../_helpers/common';
import ContentLoader from '../Common/ContentLoader';
import AppliedJobComponent from '../Common/AppliedJobComponent';
import Loader from '../Common/Loader';
// Define TypeScript interfaces for API response


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
    const [appliedJob, setAppliedJob] = useState<PaymentTransaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState("all");
    const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
    const tabs = ["all", "pending", "hired", "rejected"];



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
            console.log(response)
            if (response.error === false) {
                console.log(response)
                setTransactions(response.data.data);
                // setAppliedJob(response.data.proposals.data); // Extract projects list
                // setCurrentPage(response.data.proposals.current_page);
                // setLastPage(response.data.proposals.last_page);

            }
            //setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
            //setLoading(false);
        }
    };

    const getPagination = () => {
        const pages: (number | string)[] = [];

        // Always show the first page
        pages.push(1);

        // Show ellipsis before current page range if needed
        if (currentPage > 3) {
            pages.push("...");
        }

        // Show the 3 pages in the middle
        for (
            let i = Math.max(2, currentPage - 1);
            i <= Math.min(lastPage - 1, currentPage + 1);
            i++
        ) {
            pages.push(i);
        }

        // Show ellipsis after current page range if needed
        if (currentPage < lastPage - 2) {
            pages.push("...");
        }

        // Always show the last page
        pages.push(lastPage);

        return pages;
    };

    const handlePageChange = (page: any) => {
        if (page > 0 && page <= lastPage) {
            setCurrentPage(page);
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
                            {/* <div className="earnings-text">Total earnings made: <span className="earning-prices">$00.00</span></div> */}
                        </div>

                        {/* <div className="tab-title-block">
                <h3>Contracts by Stage</h3>
            </div> */}

                        <div className="jobs-tab-items">
                            {/* <div className="tabs-horizontal-items">
                                <div className="horizontal-tab-list">
                                    {tabs && (
                                        <ul>
                                            {tabs.map((tab) => (
                                                <li
                                                    key={tab}
                                                    className={`air-tab-item ${activeTab === tab ? "is-active" : ""}`}
                                                    onClick={() => {
                                                        setActiveTab(tab);
                                                        setCurrentPage(1);
                                                    }}
                                                    style={{ cursor: "pointer" }} // Make it clear it's clickable
                                                >
                                                    {helpers.toTitleCase(tab)}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div> */}

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


                            {/* {activeTab === "all" && 
                               <AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} />
                                }

                            {activeTab === "pending" && <AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} />}

                            {activeTab === "hired" && <AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} />}

                            {activeTab === "rejected" &&<AppliedJobComponent getPagination={getPagination} lastPage={lastPage} handlePageChange={handlePageChange} currentPage={currentPage} proposals={appliedJob} />} */}


                            {/* <div className="tab-card-section">

                                <div className="tab-card-items">
                                    <div className="tab-grid-container">
                                        <div className="tab-span-colm-9">
                                            <div className="contract-cta-sec">
                                                <div className="contract-title-block">
                                                    <h2 className="title">Figma Prototyping Tutoring Needed</h2>
                                                </div>

                                                <div className="cta-middle-content">

                                                    <div className="cta-grid-container">
                                                        <div className="span-3-colm">
                                                            <div className="contract-info-content">
                                                                <h4 className="openings-title">Hired by Connor</h4>
                                                                <div className="openings-text">Metric Mission</div>
                                                                <div className="opening-status-text">
                                                                    <span>Oct 17 - Present</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="span-9-colm">
                                                            <div className="contract-feedback-info">
                                                                <div className="activity-data-info">
                                                                    <div className="title-badge-onboard d-flex align-items-center badge-gaps">
                                                                        <div className="air-badge">Onboarding</div>
                                                                        <div className="badge-text-info">
                                                                            <div className="badge-text-base">
                                                                                <span>Waiting to start milestone. Please contact your client.</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="charge-rate-info">
                                                                    <div className="d-flex flex-wrap rate-gaps">
                                                                        <div className="rate-text">
                                                                            <div className="text-body-rate">
                                                                                <span>Rate: $80/hr</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="hour-text">
                                                                            <div className="text-body-rate">
                                                                                <span>Monthly Hour Limit: 40</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="month-rate-text">
                                                                            <div className="text-body-rate">
                                                                                <span>Hours this Month: 15</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="current-rate-text">
                                                                            <div className="text-body-rate">
                                                                                <span>Current Escrow: $10,000</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
                                                    <a className="tab-view-btns" href="#">View Job</a>
                                                    <a className="tab-message-btns" href="#">Message</a>
                                                    <a className="tab-time-btns" href="#">Time Sheet</a>
                                                </div>
                                                <div className="open-action-btn">
                                                    <button type="button" aria-expanded="false" data-ev-label="dropdown-secondary-toggle" className="air-btn-toggle">
                                                        <span className="open-icon"><img className="img-fluid" src="images/three-dots-icon.svg" alt="" title="" /></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>





                            </div> */}


                        </div>



                    </div>
                </section>
            </AuthLayout>
            

        </>

    )
}

export default AllTransaction