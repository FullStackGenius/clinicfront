import { useEffect, useState } from 'react'
import Loader from '../Common/Loader';
import Header from '../layouts/partials/Header';
import Footer from '../layouts/partials/Footer';
import axiosInstance from '../../_helpers/axiosInstance';
import ButtonLoader from '../Common/ButtonLoader';

function PaymentSetting() {

    const [loading, setLoading] = useState(true);
    const [checkConnected, setCheckConnected] = useState(false);
    const [accountOnboardlink, setAccountOnboardlink] = useState('');
    const [checkAccountFitToTransfer, setCheckAccountFitToTransfer] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getStripeAccountInfo();
    }, []);

    const getStripeAccountInfo = async () => {
        try {
            setLoading(true);

            const response: any = await axiosInstance({
                url: 'stripe/info',
                method: "GET"
            });

            setCheckAccountFitToTransfer(response.data.checkFreeLancerAccountFitToTransfer);
            setAccountOnboardlink(response.data.regenerateOnboardingLink);
            if (response.data.user.stripe_account_id) {
                setCheckConnected(true);

            } else {
                setCheckConnected(false)
            }
        } catch (error) {
            console.error("Error in API request:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    }

    const createAccount = async (e: any) => {
        setSubmitting(true)
        e.preventDefault();
        try {

            const response: any = await axiosInstance({
                url: 'stripe/account',
                method: "POST",
            });
            if (response.error === false) {
                window.location.href = response.data.onboard_link
                setSubmitting(false)
            }
        } catch (error) {
            console.error("Error in API request:", error);
        } finally {

        }
    };

    const navigateToStripeOnBoardLink = () => {
        window.location.href = accountOnboardlink;
    }
    return (
        <>
            <Loader isLoading={loading} />
            <Header />
            <section className="billing-payment-section">
                <div className="main-container">
                    <div className="billing-banner-content">
                        <div className="small-container">
                            <h1>Stripe Payment setting</h1>
                        </div>
                    </div>

                    <div className="billing-method-card-section">
                        <div className="billing-card-grid">
                            <div className="billing-left-colms">
                                <div className="custom-project-content">
                                    <h3>Connect your account with Stripe</h3>
                                    <h5>Verify Stripe Payout Setup</h5>
                                    <p>Ensure your Stripe account is ready to receive payouts.</p>
                                    <div className="customer-offer-btns">
                                        {checkConnected ? (
                                            <>
                                                <a href="#" >Account connected</a>
                                                {(checkAccountFitToTransfer === false) ? (<><div className='account-not-verified'><p className="not-verify-messages">Your account is not fully verified.  <span className='click-texts' style={{ cursor: 'pointer' }} onClick={navigateToStripeOnBoardLink} >Click to complete onboarding</span></p></div></>) : (<div className='verified-message' >Your account is already ready to receive payouts!</div>)}
                                            </>
                                        ) : (
                                            <a href="#" onClick={createAccount} >
                                                {!submitting ? 'connect your account With Stripe' : <ButtonLoader />}   C
                                            </a>
                                        )}</div>
                                </div>
                            </div>
                            <div className="billing-right-colms">
                                <div className="image-block">
                                    <img className="img-fluid" src="/assets/images/billing-img.png" alt="" title="" />
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

export default PaymentSetting