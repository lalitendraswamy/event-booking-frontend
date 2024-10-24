import {useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../redux/features/authentication/EventSlice';
import Spinner from "../spinner/spinner";
import 'animate.css'; 
import './events.css';


const Events = () => {
    const sliderRef = useRef<Slider | null>(null); // Use a ref to hold the slider instance
    const dispatch = useDispatch();
    const {events,loading} = useSelector((state:any) => state.events);

    useEffect(() => {
      dispatch<any>(getAllEvents());
      
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, 3000); // Change slides every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // if(events.length ===0){
    //     return(
    //         <div className='d-flex justify-content-center aligin-items-center'>
    //             <h2 style={{color:"#0056b3"}}>No Events</h2>
    //         </div>
    //     )
    // }


    return (
        <div className="events-container mt-5 mb-5">
           
            {/* {loading ? ():<Slider {...settings} ref={sliderRef}>
                {events.map((event:any) => (
                    <Link to={`/events/${event.eventId}`} className='underline-none' key={event.eventId}>
                        <div className="events-item">
                            <img src={event.imageUrl} alt={event.eventId} className='event-image'/>
                            <h3 className='event-title-heading'>{event.eventName}</h3>
                        </div>
                    </Link>
                ))}
            </Slider>} */}
            {loading ? (
      Spinner() 
    ) : (
        <div>
             <div className='prev-next-container'>
                <button onClick={() => sliderRef.current?.slickPrev()} className="previous-btn">Previous</button>
                <button onClick={() => sliderRef.current?.slickNext()} className="next-btn">Next</button>
            </div>
      {/* <Slider {...settings} ref={sliderRef}>
        {events.length === 0 ? ( <div className='d-flex justify-content-center aligin-items-center'>
                <h2 style={{color:"#0056b3"}}>No Events</h2>
            </div>):({events.map((event: any) => (
          <Link to={`/events/${event.eventId}`} className='underline-none' key={event.eventId}>
            <div className="events-item">
              <img src={event.imageUrl} alt={event.eventName} className='event-image' />
              <h3 className='event-title-heading'>{event.eventName}</h3>
            </div>
          </Link>
        ))})
      </Slider> */}
       <Slider {...settings} ref={sliderRef}>
      {events.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center'>
          <h2 style={{ color: "#0056b3" }}>No Events</h2>
        </div>
      ) : (
        events.map((event: any) => (
          <Link to={`/events/${event.eventId}`} className='underline-none' key={event.eventId}>
            <div className="events-item">
              <img src={event.imageUrl} alt={event.eventName} className='event-image' />
              <h3 className='event-title-heading'>{event.eventName}</h3>
            </div>
          </Link>
        ))
      )}
    </Slider>
    </div>)}
        </div>
    );
};

export default Events;
