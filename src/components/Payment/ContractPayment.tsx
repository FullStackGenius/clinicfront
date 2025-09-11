import { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axiosInstance from '../../_helpers/axiosInstance';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import helpers from '../../_helpers/common';
import ButtonLoader from '../Common/ButtonLoader';

const MySwal = withReactContent(Swal);

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
interface ContractPaymentProps {
  amount: number;
  contractId: number;
  contractDetail: Contract | null;
}
const ContractPayment: React.FC<ContractPaymentProps> = ({ amount, contractId, contractDetail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (contractDetail?.status == 'active' || contractDetail?.status == 'completed' || contractDetail?.status == 'terminated') {
      navigate(`/client/contracts-details/${contractDetail?.id}`);
    } else {
      createAccount();
    }
  }, []);

  const createAccount = async () => {

    try {

      const response: any = await axiosInstance({
        url: 'payment-intent',
        method: "POST",
        data: { amount, contract_id: contractId }
      });

      setClientSecret(response.data.clientSecret)
    } catch (error) {
      console.error("Error in API request:", error);
    } finally {
    }
  };

  const storePaymentDetail = async (result: any) => {

    try {

      const response: any = await axiosInstance({
        url: 'contract-payment/store',
        method: "POST",
        data: {
          payment_intent_id: result.paymentIntent.id,
          contract_id: contractId,
          amount: amount,
        }
      });


    } catch (error) {
      console.error("Error in API request:", error);
    } finally {
      setSubmitting(false)
    }
  };



  const handlePayment = async () => {
    try {
      setSubmitting(true);

      // Validate Stripe and Elements are ready
      if (!stripe || !elements) {
        MySwal.fire({
          icon: 'error',
          title: 'Stripe not initialized',
          text: 'Please wait for the page to fully load before submitting payment.',
        });
        setSubmitting(false);
        return;
      }

      // Get card element instance
      const card = elements.getElement(CardElement);
      if (!card) {
        MySwal.fire({
          icon: 'error',
          title: 'Missing Card Details',
          text: 'Please enter your card details before submitting.',
        });
        setSubmitting(false);
        return;
      }

      // Validate clientSecret
      if (!clientSecret || clientSecret.trim() === "") {
        MySwal.fire({
          icon: 'error',
          title: 'Missing Payment Information',
          text: 'Payment cannot be processed. Please refresh the page and try again.',
        });
        setSubmitting(false);
        return;
      }

      // Attempt payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      // Handle Stripe errors (e.g. declined card, invalid details)
      if (result.error) {
        MySwal.fire({
          icon: 'error',
          title: 'Payment Error',
          text: result.error.message || 'An error occurred while processing your payment.',
        });
        setSubmitting(false);
        return;
      }

      // Check payment success status
      if (result.paymentIntent?.status === 'succeeded') {
        storePaymentDetail(result); // Custom callback to save to DB

        MySwal.fire({
          title: 'Success!',
          text: 'Contract has been successfully funded.',
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false,
          timer: 1500,
        }).then((swalResult) => {
          if (swalResult.dismiss === Swal.DismissReason.timer) {
            navigate(`/client/contracts-details/${contractId}`);
          }
        });

      } else {
        // Catch all other non-success payment statuses
        MySwal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Payment could not be completed. Please try again.',
        });
      }

    } catch (error: any) {
      console.error("Unexpected Payment Error:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: error.message || 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setSubmitting(false); // Always reset button/loading state
    }
  };


  return (
    <div className="payment-container" >
      <div className="payment-card">
        <h2 className="payment-title">Payment Details</h2>

        <div className="showProjectDetail">
          <div className="show-payment-info">
            <table>
              <tbody>
                <tr>
                  <td>Project</td>
                  <td>{contractDetail?.project.title}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>${contractDetail?.amount}</td>
                </tr>
                <tr>
                  <td>Clinet</td>
                  <td>{helpers.toTitleCase(contractDetail?.client.name)} {(contractDetail?.freelancer.last_name) ? contractDetail?.client.last_name : ""}</td>
                </tr>
                <tr>
                  <td>Freelancer</td>
                  <td>{helpers.toTitleCase(contractDetail?.freelancer.name)} {(contractDetail?.freelancer.last_name) ? contractDetail?.freelancer.last_name : ""}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-element-wrapper">


          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "18px",
                  color: "#32325d",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "500",
                  letterSpacing: "0.8px",
                  '::placeholder': {
                    color: "#aab7c4"
                  },
                  iconColor: "#666ee8"
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a"
                }
              }
            }}
          />

        </div>
        <div className='pay-btns'>
          <button className="pay-button" onClick={handlePayment} disabled={submitting || !clientSecret}>
            {!submitting ? ' Pay Now' : <ButtonLoader />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractPayment;
