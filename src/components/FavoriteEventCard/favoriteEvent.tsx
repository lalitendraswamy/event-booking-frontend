import { motion } from 'framer-motion';
import EventNavbar from "../shared/navbar/navbar";
import EventsFooter from "../shared/footer/eventsFooter";
import { useSelector, UseSelector } from 'react-redux';
import './favoriteEvent.css'; 

const FavoriteEventCard = ({ event }:any) => {
  const favoriteData = useSelector((state:any)=> state.events.favorites)
    console.log(event,favoriteData,"prasanna")
  return (
    <>
    <EventNavbar />
    <div
      className="favorite-event-card"
    //   initial={{ opacity: 0, scale: 0.8 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   exit={{ opacity: 0, scale: 0.8 }}
    //   transition={{ duration: 0.3 }}
      // initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
      // animate={{ opacity: 1, scale: 1, rotate: 0 }}
      // exit={{ opacity: 0, scale: 0.9, rotate: 10 }}
      // transition={{ 
      //   duration: 0.4, 
      //   type: "spring", 
      //   stiffness: 300, 
      //   damping: 20 
      // }}
    >{
      favoriteData.map((favoriteItem:any)=>(
        <motion.div
         className="favorite-event-card"
          initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
        >
          <div className='favorite-card-item'>
            <div className='w-60'>
            <h3>{favoriteItem.eventName}</h3>
      <p>{favoriteItem.description}</p>
      <p>Date & Time: {new Date(favoriteItem.eventDateTime).toLocaleString()}</p>
      <p>Location: {favoriteItem.location}</p>
      <p>Organizer: {favoriteItem.organizerName}</p>
      <p>Rating: {favoriteItem.averageRating}</p>
      <p>Ticket Price: ${favoriteItem.ticketPrice}</p>
      </div>
      <img src={favoriteItem.imageUrl} alt={favoriteItem.eventName} className="event-image" />
      </div>
     
        </motion.div>
      ))
    }
    </div>
    <EventsFooter />
    </>
  );
};

export default FavoriteEventCard;
