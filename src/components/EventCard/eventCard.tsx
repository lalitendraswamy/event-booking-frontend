import React from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link,useNavigate } from "react-router-dom";

export const EventCard = ({ item }: any) => {

  const navigate=useNavigate();

  return (
    
    <div className="filtered-item">
      <img
        src={item.imageUrl}
        alt={item.eventName}
        width="100"
        className="filtered-item-img"
      />
      <h4>{item.eventName}</h4>
      <p>{item.description}</p>
      <div className="view-container">
        <p>Price: {item.ticketPrice}</p>
        <button onClick={()=> navigate(`/edit-event/${item.eventId}`)} className="admin-event-card-button">
          <MdModeEdit className="order-icon" />
        </button>
        <button  className="admin-event-card-button">
          <RiDeleteBinFill className="order-icon" />
        </button>
        <Link
          to={`/events/${item.eventId}`}
          className="underline-none"
          key={item.eventId}
        >
          <button className="btn btn-primary view">View</button>
        </Link>
      </div>
    </div>
  );
};
