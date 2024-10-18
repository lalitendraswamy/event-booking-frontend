
import React from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link,useNavigate } from "react-router-dom";
import { EventService } from "../../services/event.service";
import { getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../redux/features/authentication/EventSlice";


export const EventCard = ({ item }: any) => {

  const navigate=useNavigate();
  const service= new EventService();
  const dispatch = useDispatch()

  const onDelete=async(id:string)=>{
    let response= await service.deleteEvent(id);
      dispatch<any>(getAllEvents())
    console.log("delete Event",response);
    navigate('/events')
  }


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
        {getCookie('role')==='admin'&&(<button onClick={()=> navigate(`/edit-event/${item.eventId}`)} className="admin-event-card-button">
          <MdModeEdit className="order-icon" />
        </button>)}
        {getCookie('role')==='admin'&&(<button onClick={()=>onDelete(item.eventId)} className="admin-event-card-button">
          <RiDeleteBinFill className="order-icon" />
        </button>)}
        
        
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
