import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PaymentSuccess() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Payment Successful</h1>
      <button onClick={() => navigate("/my-orders")} className='btn btn-info'>Go To My Orders</button>
    </div>
  )
}
