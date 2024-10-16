import React from 'react'
import { Link } from 'react-router-dom'

export const EventCard = ({item}:any) => {

    


  return (
    <div className="filtered-item">
    <img src={item.imageUrl} alt={item.eventName} width="100" className="filtered-item-img" />
    <h4>{item.eventName}</h4>
    <p>{item.description}</p>
    <div className="view-container">
        <p>Price: {item.ticketPrice}</p>
        <Link to={`/events/${item.eventId}`} className='underline-none' key={item.eventId}>
         <button className='btn btn-primary view'>View</button>
         </Link>
    </div>
</div>
  )
}

