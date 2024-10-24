import { motion } from 'framer-motion';
import EventNavbar from "../shared/navbar/navbar";
import EventsFooter from "../shared/footer/eventsFooter";
import { useSelector, useDispatch } from 'react-redux';
import {deleteFavorite, getFavorite, removeFavoriteItem} from "../../redux/features/authentication/EventSlice";
import './favoriteEvent.css';
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from 'react';
import fav from '../../assets/images/favorite.gif';
import { getCookie } from "../../utils/cookieUtils"
import { useNavigate } from 'react-router-dom';
import { PaymentService } from "../../services/paymentService";

const FavoriteEventCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoriteData = useSelector((state: any) => state.events.favorites);
  const paymentService= new PaymentService();
  const { eachEvent} = useSelector(
    (state: any) => state.events
  );
  const handleRemoveFavItem = (eventId:any) =>{
       dispatch<any>(deleteFavorite(eventId));
      //  dispatch(removeFavoriteItem(eventId))
      dispatch<any>(getFavorite())
      //  dispatch<any>(getFavorite()); 
  }

  useEffect(() =>{
    dispatch<any>(getFavorite());
  },[])

  const {
    eventId,
    imageUrl,
    eventDateTime,
    reviews,
    totalTickets,
    ticketPrice,
    eventName,
    location,
        description,
        category,
    } = eachEvent;

  const onTicketBooking = async() => {
    const userId=getCookie('userId');

    const stripe= await loadStripe("pk_test_51Q8hB3Rq55caQ1GVNs8aridgq68od48i1WReyiMfSUfAabTzhs6YIgMnzzl1Ltxi9GjCcFlzB4YgqRY9hMbFROmW00ov315VSU");

    const orderDetails = {
      numberOfTickets: 1,
      ticketPrice,
      eventId,
      imageUrl,
      eventName,
      location,
      category,
      userId,
    };

    const body = {
      ticketPrice: orderDetails.ticketPrice,
      numberOfTickets: orderDetails.numberOfTickets,
  };

    const response =await paymentService.goToCheckout(orderDetails);
    console.log('session',response);

    
    const session= response;
    console.log(session,'session');
    const result=stripe?.redirectToCheckout({
      sessionId:session.id
    })

    if(!result){
      console.log('result')
    }
  };

  console.log("Faavvv",favoriteData)

  return (
    <>
      <EventNavbar />
     { favoriteData.length > 0 ?
      
      <div className='card-container'
        
      >{
          favoriteData.map((favoriteItem: any) => (
            
            <motion.div
              className="favorite-event-card"
              key={favoriteItem.eventId}
              style={{flexWrap:"wrap"}}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className='favorite-card-item'>
                <div className='bounceInLeft'>
                  <h3 style={{color:"#0056b3"}}>{favoriteItem.event.eventName}</h3>
                  {/* <p>{favoriteItem.event.description}</p> */}
                  <p>Location: {favoriteItem.event.location}</p>
                  <p>Category: {favoriteItem.event.category}</p>
                  <p>{String.fromCharCode(0x20B9)} {favoriteItem.event.ticketPrice}</p>
                  <button className="book-tickets-btn" onClick={onTicketBooking}>
                  Book Tickets
                </button>
                  <button className='book-tickets-btn' onClick={()=>handleRemoveFavItem(favoriteItem.eventId)}>Remove</button>
                </div>
                <img src={favoriteItem.event.imageUrl} alt={favoriteItem.event.eventName} className="favorite-event-image bounceInRight" />
              </div>
             
            </motion.div>
         
          ))
        }
      </div>
      :
      <div className="fav-eve-page-no-fav" >
          <img src={fav} className='me-5' alt='fav' style={{"width":"500px"}} />
          <div className='m-2 text-center'>
          <p className='text-danger' >No Favourites !!!</p>
          <button className='btn btn-danger ' onClick={() => navigate("/events")}>Browse Events</button>
          </div>
      </div>
      }
      <EventsFooter />
    </>
  );
};

export default FavoriteEventCard;
