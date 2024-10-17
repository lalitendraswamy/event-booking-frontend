import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { GiSelfLove } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteItem } from "../../../redux/features/authentication/EventSlice";
import Navbar from "../navbar/navbar";
import Footer from '../footer/eventsFooter';
import "./moviesList.css";

const MovieList = () => {
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const { events } = useSelector((state: any) => state.events);
    const dispatch = useDispatch();
    
    const filterIdData = events.filter((event: any) => event.eventId === id);
    
    if (filterIdData.length === 0) {
        return <div>No event found</div>; // Handle case where no event is found
    }

    const {
        eventId,
        imageUrl,
        eventDateTime,
        reviews,
        totalTickets,
        eventName,
        description
    } = filterIdData[0];


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
        dispatch(addFavoriteItem(filterIdData[0]));
    };

    return (
        <div>
            <Navbar />
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
                            Reviews Count: <span className="event-proper-inner-item">{reviews.length}</span>
                        </p>
                        <p className="event-proper">
                            Available Tickets: <span className="event-proper-inner-item">{totalTickets}</span>
                        </p>
                        <p className="event-proper">
                            Description: <span className="event-proper-inner-item">{description}</span>
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
                            <button className='book-tickets-btn' onClick={() => alert('Tickets booked!')}>Book Tickets</button>
                            <button className='book-tickets-btn' onClick={handleAddFavorites}>Favorite <GiSelfLove /></button>
                            </div>

                        <strong>Reviews:</strong>
                        {reviews.length > 0 ? (
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
            <Footer />
        </div>
    );
};

export default MovieList;
