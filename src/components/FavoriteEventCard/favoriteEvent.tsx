import { motion } from 'framer-motion';
import EventNavbar from "../shared/navbar/navbar";
import EventsFooter from "../shared/footer/eventsFooter";
import { useSelector, useDispatch } from 'react-redux';
import {deleteFavorite, getFavorite, removeFavoriteItem} from "../../redux/features/authentication/EventSlice";
import './favoriteEvent.css';
import { useEffect } from 'react';

const FavoriteEventCard = () => {
  const dispatch = useDispatch();
  const favoriteData = useSelector((state: any) => state.events.favorites);

  const handleRemoveFavItem = (eventId:any) =>{
       dispatch<any>(deleteFavorite(eventId));
       dispatch(removeFavoriteItem(eventId))
      //  dispatch<any>(getFavorite());
       
      
  }

  useEffect(() =>{
    dispatch<any>(getFavorite());
  },[])

  console.log("Faavvv",favoriteData)

  return (
    <>
      <EventNavbar />
     { favoriteData.length > 0 ?
      
      <div
        
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
              <div className='favorite-card-item '>
                <div className='w-60 bounceInLeft'>
                  <h3>{favoriteItem.event.eventName}</h3>
                  <p>{favoriteItem.event.description}</p>
                  <p>Location: {favoriteItem.event.location}</p>
                  <p>Rating: {favoriteItem.event.averageRating}</p>
                  <button className='book-tickets-btn' onClick={()=>handleRemoveFavItem(favoriteItem.eventId)}>Remove From Favorites</button>
                </div>
                <img src={favoriteItem.event.imageUrl} alt={favoriteItem.event.eventName} className="favorite-event-image bounceInRight" />
              </div>
             
            </motion.div>
          </div>
          ))
        }
      </div>
      :
      <div className="fav-eve-page-no-fav" >No Favorites !</div>
      }
      <EventsFooter />
    </>
  );
};

export default FavoriteEventCard;
