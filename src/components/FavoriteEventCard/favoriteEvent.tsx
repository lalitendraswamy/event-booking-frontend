import { motion } from 'framer-motion';
import EventNavbar from "../shared/navbar/navbar";
import EventsFooter from "../shared/footer/eventsFooter";
import { useSelector, useDispatch } from 'react-redux';
import {removeFavoriteItem} from "../../redux/features/authentication/EventSlice";
import './favoriteEvent.css';

const FavoriteEventCard = () => {
  const dispatch = useDispatch();
  const favoriteData = useSelector((state: any) => state.events.favorites);

  const handleRemoveFavItem = (eventId:any) =>{
       dispatch<any>(removeFavoriteItem(eventId));
  }

  return (
    <>
      <EventNavbar />
      <div
        className="favorite-event-card"
      >{
          favoriteData.map((favoriteItem: any) => (
            <div key={favoriteItem.eventId}>
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
                  <p>Location: {favoriteItem.location}</p>
                  <p>Rating: {favoriteItem.averageRating}</p>
                  <button className='book-tickets-btn' onClick={()=>handleRemoveFavItem(favoriteItem.eventId)}>Remove From Favorites</button>
                </div>
                <img src={favoriteItem.imageUrl} alt={favoriteItem.eventName} className="event-image" />
              </div>

            </motion.div>
          </div>
          ))
        }
      </div>
      <EventsFooter />
    </>
  );
};

export default FavoriteEventCard;
