import React, { useEffect } from 'react'
import Navbar from '../shared/navbar/navbar'
import Footer from '../shared/footer/eventsFooter'
import OrderItem from '../shared/orderItem/orderItem'
import { getAllOrders } from '../../redux/features/authentication/OrderSlice'
import './my-orders-page.css'
import { useSelector } from 'react-redux'

export default function MyOrdersPage() {
  const orders = useSelector((state: any) => state.orders.orders);

  
  if(orders.length===0){
    return (
      <div>
        <Navbar/>
        <div className='my-orders-page' style={{"fontSize":"50px","color":"#0056B3"}}>
                You have No Orders!
        </div>
        <Footer/>      
    </div>
    )
  }

  return (
    <div>
        <Navbar/>
        <div className='my-orders-page'>

               {orders.map((order:any)=>(
                <OrderItem key={order.bookingId} order={order} />
               ))}
                {/* <OrderItem />
                <OrderItem/>
                <OrderItem/>
                <OrderItem/> */}
        </div>
        <Footer/>      
    </div>
  )
}
