import React from 'react'
import Navbar from '../shared/navbar/navbar'
import Footer from '../shared/footer/eventsFooter'
import OrderItem from '../shared/orderItem/orderItem'
import './my-orders-page.css'

export default function MyOrdersPage() {
  return (
    <div>
        <Navbar/>
        <div className='my-orders-page'>
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
        </div>
        <Footer/>      
    </div>
  )
}
