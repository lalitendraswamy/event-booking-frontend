import {useEffect, useRef } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../redux/features/authentication/EventSlice';
import 'animate.css'; // Add this line at the top of your file
import './events.css';
import { getUsers } from '../../../redux/features/authentication/UserSlice';


const Events = () => {
    const sliderRef = useRef<Slider | null>(null); // Use a ref to hold the slider instance
    const dispatch = useDispatch();
    const {events} = useSelector((state:any) => state.events);
    console.log("events test",events)
  
    useEffect(() => {
      dispatch<any>(getAllEvents());
      dispatch<any>(getUsers())
    }, []);
    
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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

    if(events.length ===0){
        return(
            <div>
                <h2>Noo Events</h2>
            </div>
        )
    }

    return (
        <div className="events-container mt-5 mb-5">
            <div className='prev-next-container'>
                <button onClick={() => sliderRef.current?.slickPrev()} className="previous-btn">Previous</button>
                <button onClick={() => sliderRef.current?.slickNext()} className="next-btn">Next</button>
            </div>
            <Slider {...settings} ref={sliderRef}>
                {events.map((event:any) => (
                    <Link to={`/events/${event.eventId}`} className='underline-none' key={event.eventId}>
                        <div className="events-item">
                            <img src={event.imageUrl} alt={event.eventId} className='event-image'/>
                            <h3 className='event-title-heading'>{event.eventName}</h3>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default Events;
