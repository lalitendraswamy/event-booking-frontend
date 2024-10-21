import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RiWechatPayFill } from "react-icons/ri";
import paymentImage from "../../../assets/images/9774810.jpg";
import "./payment.css";

export default function PaymentSuccess() {
  const navigate = useNavigate()
  return (
    <div className='payment-success'>
      <div className='pay-success-container'>
         <h1 className='payment-heading'>Payment Successful</h1>
         <RiWechatPayFill  className='payment-icon'/>
         <button onClick={() => navigate("/my-orders")} className='book-tickets-btn'>Go To My Orders</button>
      </div>
     <div>
       <img src={paymentImage} alt="payment-success" className='pay-success-img'/>
     </div>
    </div>
  )
}