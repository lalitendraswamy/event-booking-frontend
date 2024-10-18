import { useNavigate, useParams } from "react-router-dom";

import { GiSelfLove } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import {
  createOrder,
  getOrders,
  postOrder,
} from "../../../redux/features/authentication/OrderSlice";
import {
  addFavorite,
  getEventById,
  getFavorite,
} from "../../../redux/features/authentication/EventSlice";

import "./event-detailed-page.css";

import { useEffect, useState } from "react";

import Navbar from "../navbar/navbar";
import Footer from "../footer/eventsFooter";

const MovieList = () => {
  const [count, setCount] = useState(1);
  const [eventInFav, setEventInFav] = useState(false);
  const { id } = useParams();
  const { events, eachEvent, favorites } = useSelector(
    (state: any) => state.events
  );

  const navigate = useNavigate();

  const { users, loginUser } = useSelector((s: any) => s.users);
  const { orders } = useSelector((s: any) => s.orders);
  const dispatch = useDispatch();

  const { userId } = users.filter(
    (each: any) => loginUser.username === each.username
  )[0];

  useEffect(() => {
    dispatch<any>(getEventById(id!));
  }, []);

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
    setCount(count > 1 ? count - 1 : 1);
  };

  const handleAddFavorites = () => {
    setEventInFav(!eventInFav)
    dispatch<any>(addFavorite({ userId, eventId }));
  };

  const onTicketBooking = () => {
    const orderDetails = {
      numberOfTickets: count,
      ticketPrice,
      status: "booked",
      eventId,
      userId,
    };
    // dispatch(postOrder(orderDetails));
    dispatch<any>(createOrder(orderDetails));
    dispatch<any>(getOrders());
    navigate("/my-orders");
  };

  if (!eachEvent) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <Navbar />
      {eachEvent ? (
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
                Release Date: {" "}
                <span className="event-proper-inner-item">{`${day}:${month}:${year}`}</span>
              </p>
              <p className="event-proper">
                Category:{" "}
                <span className="event-proper-inner-item">
                  {eachEvent.category}
                </span>
              </p>
              <p className="event-proper">
                Available Tickets:{" "}
                <span className="event-proper-inner-item">{totalTickets}</span>
              </p>
              <p className="event-proper">
                Description:{" "}
                <span className="event-proper-inner-item">{description}</span>
              </p>

              <p className="event-proper">
                Price:{" "}
                <span className="event-proper-inner-item">
                  {" "}
                  &#8377; {ticketPrice}
                </span>
              </p>

              <div className="fav-tic-container">
                <div className="inc-des-count-container">
                  <p onClick={increaseTicketsCount} className="plus">
                    +
                  </p>
                  <span className="straight"></span>
                  <p className="plus">{count}</p>
                  <span className="straight"></span>
                  <p onClick={decreaseTicketsCount} className="plus">
                    -
                  </p>
                </div>
              </div>

              <div>
                <button className="book-tickets-btn" onClick={onTicketBooking}>
                  Book Tickets
                </button>
                {!eventInFav && ( <button
                  className="book-tickets-btn"
                  onClick={handleAddFavorites}
                >
                  Favorite <GiSelfLove />
                </button>) }
               
              </div>

              
              {/* {eachEvent.reviews ? (
                
                <ul>
                  <strong>Reviews:</strong>
                  {reviews.map((review: any) => (
                    <li key={review.user} className="p-3">
                      <strong>{review.user.username}:</strong> {review.review}{" "}
                      (Rating: {review.userRating})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>There are no reviews.</p>
              )} */}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}

      <Footer />
    </div>
  );
};

export default MovieList;
