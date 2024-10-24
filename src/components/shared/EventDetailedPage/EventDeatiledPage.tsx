import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../../utils/cookieUtils";
import { loadStripe } from "@stripe/stripe-js";
import { GiSelfLove } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import {  createOrder,  getOrders,  postOrder,} from "../../../redux/features/authentication/OrderSlice";
import {  addFavorite,  getEventById,  getFavorite,} from "../../../redux/features/authentication/EventSlice";
import { PaymentService } from "../../../services/paymentService";
import "./event-detailed-page.css";

import { useEffect, useState } from "react";

import Navbar from "../navbar/navbar";
import Footer from "../footer/eventsFooter";
import axios from "axios";
import { number } from "yup";

const MovieList = () => {
  const [count, setCount] = useState(1);
  const [eventInFav, setEventInFav] = useState(false);
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupNegetive, setShowPopupNegetive] = useState(false);
  const [textOfNumberTickets,setTextOfNumberTickets] = useState('')
  const { events, eachEvent, favorites } = useSelector(
    (state: any) => state.events
  );

  const navigate = useNavigate();
  const paymentService= new PaymentService();

  const { users, loginUser } = useSelector((s: any) => s.users);
  const { orders } = useSelector((s: any) => s.orders);
  const dispatch = useDispatch();

const userId=getCookie('userId');

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
console.log("Each event",eachEvent)

   
  const dateObj = new Date(eventDateTime);


  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  // const increaseTicketsCount = () => {
  //   if (count < totalTickets) {
  //     if (count >= 9) {
  //       setShowPopup(true);
  //       // Automatically close the popup after 4 seconds
  //       setTimeout(() => {
  //         setShowPopup(false);
  //       }, 4000);
  //     } else {
  //       setCount(count + 1);
  //     }
  //   }
  // };

  // const decreaseTicketsCount = () => {
  //   if(count > 1){
  //     setCount(count-1)
  //   }else{
  //     setCount(1)
  //     setShowPopupNegetive(true);
  //     setTimeout(() => {
  //       setShowPopupNegetive(false);
  //     }, 4000);
  //   }
  //   // setCount(count > 1 ? count - 1 : 1);
  // };

  const handleAddFavorites = () => {
    setEventInFav(!eventInFav)
    dispatch<any>(addFavorite({ userId, eventId:id }));
  };

  const onTicketBooking = async() => {
    console.log(count)
    
  //   if (count >= 1 && count <= totalTickets) {
  //     setCount(count);
  // } else if (count < 1) {
  //     setCount(1); // Reset to 1 if less than 1
  // } else if (count > totalTickets) {
  //     setCount(totalTickets); // Reset to totalTickets if greater
  // }

    if(count <= totalTickets){
    const stripe= await loadStripe("pk_test_51Q8hB3Rq55caQ1GVNs8aridgq68od48i1WReyiMfSUfAabTzhs6YIgMnzzl1Ltxi9GjCcFlzB4YgqRY9hMbFROmW00ov315VSU");

    const orderDetails = {
      numberOfTickets: count,
      ticketPrice,
      eventId,
      imageUrl,
      eventName,
      location,
      category,
      userId,
    };

    console.log(orderDetails,"ordersp")

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
  }else{
    setTextOfNumberTickets(`Number of Total Tickets is ${totalTickets}`);
    setShowPopup(true)
    setCount(totalTickets)
  }
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
              <p className="event-proper">
                Description:{" "}
                <span className="event-proper-inner-item">{description}</span>
              </p>
              
              <p className="event-proper">
                Category:{" "}
                <span className="event-proper-inner-item">
                  {eachEvent.category}
                </span>
              </p>
              <p className="event-proper pr-1">
                Release Date: {" "}
                <span className="event-proper-inner-item">{`${day}/ ${month} / ${year}`}</span>
              </p>
              <p className="event-proper pr-1">
                Location: {" "}
                <span className="event-proper-inner-item">{location}</span>
              </p>
              <p className="event-proper">
                Available Tickets:{" "}
                <span className="event-proper-inner-item">{totalTickets}</span>
              </p>
              

              <p className="event-proper">
                Price:{" "}
                <span className="event-proper-inner-item">
                  {" "}
                  &#8377; {ticketPrice}
                </span>
              </p>

              {/* <div className="fav-tic-container">
                <div className="inc-des-count-container">
                  <button onClick={decreaseTicketsCount} className={showPopupNegetive ? "disabled" : "plus"}>
                    -
                  </button>
                  <span className="straight"></span>
                  <p className="count-tickets">{count}</p>
                  <span className="straight"></span>
                  <button onClick={increaseTicketsCount} className={showPopup ? "disabled" : "plus"} >
                    +
                  </button>
                </div>
              </div>
              {showPopup && (
                   <div className="popup bounce-in-up">
                      <p>You can't increase the count more than 9!</p>
                    </div>
                   )}
                   {showPopupNegetive && (
                   <div className="popup bounce-in-up">
                      <p>You can't Decrease the count less than 1!!</p>
                    </div>
                   )} */}  
                  <div className="d-flex flex-column">
                    <label htmlFor="tickets-count">Enter Number Of Tickets</label>
                    <input 
                type="number" 
                onChange={(e:any)=>setCount(e.target.value)}
                min="1" 
                max={totalTickets} 
                placeholder="Enter Number Tickets" 
                id="tickets-count" 
                className="number-of-tickets" 
                value={count}
            />
                    {/* <input type="number" onChange={(e:any)=>setCount(e.target.value)}  min="1" max={totalTickets} placeholder="Enter Number Tickets" id="tickets-count" className="number-of-tickets"/> */}
                  </div>
                  {showPopup && <p className="bounce-in-up">{textOfNumberTickets}</p>}
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