import React, { useEffect } from 'react'
import Navbar from '../shared/navbar/navbar'
import Footer from '../shared/footer/eventsFooter'
import OrderItem from '../shared/orderItem/orderItem'
import { getAllOrders, getOrders } from '../../redux/features/authentication/OrderSlice'
import './my-orders-page.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../../utils/cookieUtils'

export default function MyOrdersPage() {
  const {orders} = useSelector((state: any) => state.orders);
  const dispatch = useDispatch()
  const userId = getCookie('userId');
  useEffect(() => {
    dispatch<any>(getOrders(userId))
  },[])

  
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
                
        </div>
      
        <Footer/>      
    </div>
  )
}
