import { useState } from 'react';
import axiosInstance from '../_helpers/axiosInstance';

const AdminPayout = () => {
  const [freelancerId, setFreelancerId] = useState('');
  const [amount, setAmount] = useState('');
  const [transferGroup, setTransferGroup] = useState('');

  const releasePayment = async () => {
    try {
      const response: any = await axiosInstance({
        url: 'stripe/account',
        method: "POST",
        data: {
          freelancer_id: freelancerId,
          amount: parseFloat(amount),
          transfer_group: transferGroup,
        }
      });
      alert('Payout released!');

    } catch (error) {
      console.error("Error in API request:", error);
    } finally {
    }

  };

  return (
    <div>
      <input
        placeholder="Freelancer ID"
        value={freelancerId}
        onChange={(e) => setFreelancerId(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Transfer Group (e.g., ORDER_123)"
        value={transferGroup}
        onChange={(e) => setTransferGroup(e.target.value)}
      />
      <button onClick={releasePayment}>Release Payout</button>
    </div>
  );
};

export default AdminPayout;
