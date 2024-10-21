import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PaymentFailed() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Payment Failed</h1>
      <button onClick={() => navigate("/")} className='btn btn-danger'>Go To Home</button>
    </div>
  )
}
