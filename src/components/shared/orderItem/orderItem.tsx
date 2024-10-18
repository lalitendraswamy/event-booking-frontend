import React from 'react'
import './order-item.css'
import QRimg from '../../../assets/images/qr-img.png'
import { cancelOrder, deleteOrder } from '../../../redux/features/authentication/OrderSlice'
import { useDispatch } from 'react-redux'


const convertDateTimeToNormal=(dateTime:string)=>{
    const date = new Date(dateTime);
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true, // Change to false for 24-hour format
});

const formattedDate = formatter.format(date);
return formattedDate;
}

export default function OrderItem({order}:any) {
    console.log(order)
    const dispatch=useDispatch();
    const {bookingId,numberOfTickets} = order;
    const {eventName,imageUrl,location,eventDateTime,ticketPrice,category,totalTickets}=order.event;
    const formattedDateTime=convertDateTimeToNormal(eventDateTime);

  return (
    <li className='order-item-card p-3'>
        <div className='order-info'>
            <img src={imageUrl} />
            <div className=' p-2' >
                <h3>{eventName}</h3>
                <h6>Location: {location}</h6>
                <h6>Date: {formattedDateTime}</h6>
                <h6>Ticket Price:  &#8377; {ticketPrice}</h6>
                <h6>Quatity: {numberOfTickets}</h6>
                <h6>Amount Paid: <b style={{"color":"#0056B3"}} >&#8377; {ticketPrice * numberOfTickets}</b></h6>
                <button onClick={()=>dispatch<any>(deleteOrder(bookingId))} className='btn btn-danger' >Cancel</button>
            </div>
        
        </div>
        <div className='order-ticket'>
            <img src={QRimg} />
            <h6>Booking ID</h6>
            <p className='text-center'><b>{`${bookingId}`.toUpperCase()}</b></p>

        </div>

      
    </li>
  )
}
