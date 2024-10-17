
import { useNavigate, useParams } from 'react-router-dom';

import { GiSelfLove } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, addFavoriteItem, getEventById } from "../../../redux/features/authentication/EventSlice";




import "./event-detailed-page.css";

import { useEffect, useState } from "react";

import Navbar from "../navbar/navbar";
import Footer from '../footer/eventsFooter';


const MovieList = () => {
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const { events,eachEvent } = useSelector((state: any) => state.events);
    const {users,loginUser} = useSelector((s:any) => s.users)
    const dispatch = useDispatch();
    // console.log("Login User", loginUser)
    // console.log("Users", users)
    const {userId}= users.filter((each:any) => loginUser.username === each.username )[0];
    // console.log("UserId",userId)

    
    const filterIdData = events.filter((event: any) => event.eventId === id);


    useEffect(() => {
        dispatch<any>(getEventById(id!));
     
     },[])
     

    const {
        eventId,
        imageUrl,
        eventDateTime,
        reviews,
        totalTickets,
        ticketPrice,
        eventName,
        description
    } = eachEvent;


    const dateObj = new Date(eventDateTime);

const day = dateObj.getDate(); 
const month = dateObj.getMonth() + 1;
const year = dateObj.getFullYear(); 


    const increaseTicketsCount = () => {
        if (count < totalTickets) {
            setCount(count + 1);
        }
    };

    const decreaseTicketsCount = () => {
        setCount(count > 0 ? count - 1 : 0);
    };

    const handleAddFavorites = () => {
        // dispatch(addFavoriteItem(filterIdData[0]));
        dispatch<any>(addFavorite({userId,eventId}))
    };

    const onTicketBooking=()=>{
        // const orderDetails={bookingId:eventName,eventName,location,eventDateTime,ticketPrice,category,imageUrl,totalTickets:count}
        // dispatch(postOrder(orderDetails));
        // navigate('/my-orders')
       
 
    };

    if(!eachEvent){
        return <h1>Loading....</h1>
      }
   

    return (
        <div>
            <Navbar />
            { eachEvent ?
            <div className="movies-list">
                <div className="event-container-item">
                    <div>
                        <img
                            src={imageUrl}
                            alt={eventName}
                            width="100"
                            className="event-image mb-2"
                        />
                    </div>
                    <div className="event-data-container">
                        <h3 className="mb-3">{eventName}</h3>
                        <p className="event-proper pr-1">
                            Release Date: <span className="event-proper-inner-item">{`${day}:${month}:${year}`}</span>
                        </p>
                        <p className="event-proper">
                            Reviews Count: <span className="event-proper-inner-item">{
                           eachEvent.reviews ? reviews.length : "0"
                            }</span>
                        </p>
                        <p className="event-proper">
                            Available Tickets: <span className="event-proper-inner-item">{totalTickets}</span>
                        </p>
                        <p className="event-proper">
                            Description: <span className="event-proper-inner-item">{description}</span>
                        </p>
 
                        <p className="event-proper">
                            Price: <span className="event-proper-inner-item"> &#8377; {ticketPrice}</span>
                        </p>
 
                        <div className='fav-tic-container'>
 
                            <div className="inc-des-count-container">
                                <p onClick={increaseTicketsCount} className="plus">+</p>
                                <span className="straight"></span>
                                <p className="plus">{count}</p>
                                <span className="straight"></span>
                                <p onClick={decreaseTicketsCount} className="plus">-</p>
                            </div>
                   
                        </div>
 
                        <div>
                            <button className='book-tickets-btn' onClick={onTicketBooking}>Book Tickets</button>
                            <button className='book-tickets-btn' onClick={handleAddFavorites}>Favorite <GiSelfLove /></button>
                            </div>
 
                        <strong>Reviews:</strong>
                        {eachEvent.reviews ?
                         (
                            <ul>
                                {reviews.map((review: any) => (
                                    <li key={review.user} className="p-3">
                                        <strong>{review.user.username}:</strong> {review.review} (Rating: {review.userRating})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>There are no reviews.</p>
                        )}
                    </div>
                </div>
            </div>
             :
             <h1>Loading....</h1>  
             }
 
            <Footer />
        </div>
       
    );
};

export default MovieList;
