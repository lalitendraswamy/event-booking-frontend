import { useParams } from "react-router-dom";
import { useState } from "react";
import "./event-detailed-page.css";
import Navbar from "../navbar/navbar";
import Footer from '../footer/eventsFooter';
import { useSelector } from "react-redux";

const MovieList = () => {
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const { events } = useSelector((s: any) => s.events);

  const filterIdData = events.filter((event: any) => event.eventId === id);
  console.log(filterIdData, id);
  const {
    eventId,
    imageUrl,
    eventDateTime,
    reviews,
    // reviewsCount,
    totalTickets,
    eventName,
    description,
  } = filterIdData[0];

  const increaseTicketsCount = () => {
    setCount(count + 1);
  };

  const decreaseTicketsCount = () => {
    setCount(count === 0 ? 0 : count - 1);
  };

  return (
    <>
    <Navbar/>
      <div className="movies-list">
        <div className="event-container-item">
          <div>
            <img
              src={imageUrl}
              alt={eventId}
              width="100"
              className="event-image mb-2"
            />
          </div>
          <div className="event-data-container">
            <h3 className="mb-3">{eventName}</h3>
            <p className="event-proper">
              Release Date:{" "}
              <span className="event-proper-inner-item">{eventDateTime}</span>
            </p>
            <p className="event-proper">
              Reviews Count:{" "}
              <span className="event-proper-inner-item">{reviews.length}</span>
            </p>
            <p className="event-proper">
              Available Tickets:{" "}
              <span className="event-proper-inner-item">{totalTickets}</span>
            </p>
            <p className="event-proper">
              Description:{" "}
              <span className="event-proper-inner-item">{description}</span>
            </p>

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

            <div>
              <button className="book-tickets-btn">Book Tickets</button>
            </div>
          </div>
        </div>
        <strong>Reviews:</strong>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review: any) => (
              <li key={review.user} className="p-3">
                <strong>{review.user.username}:</strong> {review.review}{" "}
                (Rating: {review.userRating})
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no reviews.</p>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default MovieList;
