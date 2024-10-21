import React from 'react'
import { useNavigate } from 'react-router-dom';
import paymentFailed from "../../../assets/images/payment-failed.jpg";
import "./payment.css";

export default function PaymentFailed() {
  const navigate = useNavigate()
  return (
<div className='payment-success'>
<div className='pay-success-container'>
   <h1 className='payment-fail-heading'>Payment Failed</h1>
   <p className='payment-fail-icon'>X</p>
   <img src={paymentFailed} alt="payment-fail" className='pay-fail-img'/>
   <button onClick={() => navigate("/")} className='book-tickets-btn'>Go To My Orders</button>
</div>

</div>
  )
}
