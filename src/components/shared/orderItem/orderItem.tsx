import React from 'react'
import './order-item.css'
import QRimg from '../../../assets/images/qr-img.png'

export default function OrderItem() {

    const eventObj={
        name:"Late Night Jokes!",
        location:"Visakhapatnam",
        date:"04-Jul-2024",
        time:"09:00pm",
        price:"499",
        category:"Stand Up Comedy",
        url:"https://in.bmscdn.com/Events/moviecard/ET00374903.jpg",
        tickets:1
    }
    const {name,url,location,date,price,time,category,tickets}=eventObj;

  return (
    <li className='order-item-card p-3'>
        <div className='order-info'>
            <img src={url} />
            <div className=' p-2' >
                <h3>{name}</h3>
                <h4>Location: {location}</h4>
                <h4>Quatity: {tickets}</h4>
                <h4>Amount Paid: {price}</h4>
                <button className='btn btn-danger' >Cancel</button>
            </div>
        
        </div>
        <div className='order-ticket'>
            <img src={QRimg} />
            <h6>Booking ID</h6>
            <p><b>BUCV00DACS5NZ0</b></p>

        </div>

      
    </li>
  )
}
