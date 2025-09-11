import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './layouts/partials/Header'
import Footer from './layouts/partials/Footer'
import Loader from './Common/Loader'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const MySwal = withReactContent(Swal);
function OurPrices() {

    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);


    const handlePriceClick = (e: React.MouseEvent) => {

        if (!user) {
            e.preventDefault();

            MySwal.fire({
                title: "Sign up",
                text: "To proceed, you’ll need to create an account. Sign up now and connect with top freelancers to bring your project to life!",
                icon: "info",
                confirmButtonText: "OK",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/sign-up", { state: { role: 2 } });
                }
            });

        }

    };

    return (
        <>
            <Loader isLoading={loading} />
            <Header />

            <section className="pricing-page-section">
                <div className="main-container">

                    <div className="pricing-banner-content">
                        <div className="small-container">
                            <h1>Flexible Pricing for<br /> Every Stage of Growth</h1>
                            <p>The best place to discover & hire the best accounting talent on-demand. With every type of specialty certification available to your needs.</p>
                        </div>
                    </div>

                    <div className="pricing-project-section">
                        <div className="pricing-grid-conatiner">
                            <div className="pricing-left-colms">
                                <div className="custom-project-content">
                                    <h3>Need a custom project? No problem.</h3>
                                    <p>Request a custom offer and meet with us directly, if you feel your project does not fit within the pricing model below.</p>
                                    <div className="customer-offer-btns">
                                        <a href="#">Create Custom Offer</a>
                                    </div>
                                </div>
                            </div>
                            <div className="pricing-right-colms">
                                <div className="image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/saving-img.png" alt="" title="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pricing-table-sec">

                        <div className="gtms-container gtms-grid">
                            <div className="gtms-pricing-plans-holder">
                                <div className="gtm-plans-wrapper">



                                    <div className="gtms-plan-grid">

                                        <div className="plans-left-blocks">
                                            <div className="pr-top-blocks">
                                                <div className="purple-boxs">
                                                    <h5 className="body-texts">Rate</h5>
                                                </div>
                                            </div>
                                            <div className="gtms-p-content cost-text">
                                                <h5 className="body-texts">Monthly Cost</h5>
                                            </div>
                                            <div className="gtms-p-content light-purple-bg">
                                                <h5 className="body-texts">Typical Services</h5>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Daily Transaction Recording</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Bank Statement Reconciliation</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Accounts Payable &amp; Receivable Management</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Payroll Processing &amp; Management</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Financial Record &amp; Ledger Maintenance</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">1099 &amp; W-2 Form Preperation for Employees
                                                    <br /> &amp; Contractors</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">Monthly financial statement preparation
                                                    <br /> (profit &amp; loss, balance sheet, cash flow).</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Budget tracking and variance analysis.</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">Monthly/quarterly tax filing (e.g., sales tax,
                                                    <br /> VAT, estimated tax payments).</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Monitoring tax compliance deadlines.</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">End-of-year financial reconciliations and adjustments.</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">Support for audits or reviews initiated in fiscal Q1 or Q2.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Financial forecasting and planning.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Business formation or restructuring.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Quarterly financial review and potential tax estimates.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Mid-year tax planning and review.</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">Preparation for year-end close (preliminary
                                                    <br /> financial cleanup).</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">Tax strategy updates before year-end
                                                    <br /> (e.g., retirement contributions, capital purchases).</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Year-end close of accounts.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Preparation of annual budgets for the upcoming year.</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">Filing of financial statements for regulatory
                                                    <br /> purposes (e.g., annual corporate filings).</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Ongoing financial strategy consulting.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Performance monitoring and KPI analysis.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Cash flow management advice.</p>
                                            </div>
                                            <div className="gtms-p-content two-line-content">
                                                <p className="body-texts">Specialized tax amnesty applications, back tax filings,
                                                    <br /> international tax compliance, or tax restructuring</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Annual income tax preparation and filing</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Extension income tax preperation and filing</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Strategic tax strategy and planning.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">High-level consulting and strategy development.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Oversight of large or complex tax filings and audits.</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Expert Audits and Forensic Accounting</p>
                                            </div>
                                            <div className="gtms-p-content">
                                                <p className="body-texts">Mergers, Acquisitions, or Sales</p>
                                            </div>
                                        </div>


                                        <div className="SpanColm-5 first-plans-block" onClick={(e) => handlePriceClick(e)}>
                                            <div className="prices-top-text">Staff
                                                <br /> Accountant</div>
                                            <div className="gtms-plans-cells price-top-texts">
                                                <div className="prices-texts">$1,677</div>
                                            </div>
                                            <div className="gtms-plans-cells include-blocks">
                                                <div className="include-texts">Included</div>
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>

                                        </div>


                                        <div className="SpanColm-5 second-plans-block" onClick={(e) => handlePriceClick(e)}>
                                            <div className="prices-top-text">Senior
                                                <br /> Accountant</div>
                                            <div className="gtms-plans-cells price-top-texts">
                                                <div className="prices-texts">$3,000</div>
                                            </div>
                                            <div className="gtms-plans-cells include-blocks">
                                                <div className="include-texts">Included</div>
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>

                                        </div>

                                        <div className="SpanColm-5 third-plans-block" onClick={(e) => handlePriceClick(e)}>
                                            <div className="prices-top-text">Managerial
                                                <br /> Accountant</div>
                                            <div className="gtms-plans-cells price-top-texts">
                                                <div className="prices-texts"> $4,333</div>
                                            </div>
                                            <div className="gtms-plans-cells include-blocks">
                                                <div className="include-texts">Included</div>
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>

                                        </div>



                                        <div className="SpanColm-5 fourth-plans-block" onClick={(e) => handlePriceClick(e)}>
                                            <div className="prices-top-text">Executive
                                                <br /> Accountant</div>
                                            <div className="gtms-plans-cells price-top-texts">
                                                <div className="prices-texts">$6,250</div>
                                            </div>
                                            <div className="gtms-plans-cells include-blocks">
                                                <div className="include-texts">Included</div>
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-close-icon.svg" alt="" />
                                            </div>

                                        </div>


                                        <div className="SpanColm-5 fivth-plans-block" onClick={(e) => handlePriceClick(e)}>
                                            <div className="prices-top-text">Enterprise
                                                <br /> Accountant</div>
                                            <div className="gtms-plans-cells price-top-texts">
                                                <div className="prices-texts">$9,000</div>
                                            </div>
                                            <div className="gtms-plans-cells include-blocks">
                                                <div className="include-texts">Included</div>
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells two-line-content">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>
                                            <div className="gtms-plans-cells">
                                                <img loading="lazy" className="cell-check-icon" src="/assets/images/table-check-icon.svg" alt="" />
                                            </div>

                                        </div>


                                    </div>



                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    )
}

export default OurPrices