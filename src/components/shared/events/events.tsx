import {useEffect, useRef } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../redux/features/authentication/EventSlice';
import 'animate.css'; // Add this line at the top of your file
import './events.css';

const Events = () => {
    const sliderRef = useRef<Slider | null>(null); // Use a ref to hold the slider instance
    // const dispatch = useDispatch();
    // const eventData = useSelector((state:any) => state.events)

    
    // console.log(eventData);

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

    // const events = [
    //     {   
    //         id: 1,
    //         title: "Pushpa: The Rule",
    //         image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
    //     },
    //     {
    //         id: 2,
    //         title: "Devara",
    //         image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICAyOTguMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00310216-tluebxpafx-portrait.jpg",
    //     },
    //     {
    //         id: 3,
    //         title: "KGF: Chapter 2",
    //         image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg",
    //     },
    //     {
    //         id: 4,
    //         title: "RRR",
    //         image: "https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/rrr-et00094579-1700135873.jpg",
    //     },
    //     {
    //         id: 5,
    //         title: "Vettaiyan - The Hunter",
    //         image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vettaiyan-the-hunter-et00412743-1728048350.jpg",
    //     },
    //     {
    //         id: 6,
    //         title: "Lubber Pandhu",
    //         image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS41LzEwICA1NC41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00409924-fhqlnmfgyt-portrait.jpg",
    //     }
    // ];

    // const events = [{
    //     "eventId": "temp-1",
    //     "description": "A thrilling adventure movie screening.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
    //     "eventName": "Adventure Night",
    //     "location": "City Park, Mumbai",
    //     "ticketPrice": "Free",
    //     "eventDateTime": "2024-05-01",
    //     "category": "Movies",
    //     "duration": "2 hours",
    //     "totalTickets": "500",
    //     "averageRating": "4.5",
    //     "organizerName": "Mumbai Film Society",
    //     "organizerImage": "https://example.com/organizer1.jpg"
    // },
    // {
    //     "eventId": "temp-2",
    //     "description": "An exhilarating sci-fi film festival.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/interstellar-et00356724-1712566690.jpg",
    //     "eventName": "Sci-Fi Spectacle",
    //     "location": "Downtown Theatre, Mumbai",
    //     "ticketPrice": "100 INR",
    //     "eventDateTime": "2024-05-15",
    //     "category": "Movies",
    //     "duration": "3 hours",
    //     "totalTickets": "300",
    //     "averageRating": "4.8",
    //     "organizerName": "Cinephile Events",
    //     "organizerImage": "https://example.com/organizer2.jpg"
    // },
    // {
    //     "eventId": "temp-3",
    //     "description": "An enchanting evening of classic romances.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/titanic-et00356724-1712566690.jpg",
    //     "eventName": "Romantic Classics Night",
    //     "location": "Riverside Cinema, Mumbai",
    //     "ticketPrice": "200 INR",
    //     "eventDateTime": "2024-05-20",
    //     "category": "Movies",
    //     "duration": "2.5 hours",
    //     "totalTickets": "250",
    //     "averageRating": "4.6",
    //     "organizerName": "Heartfelt Films",
    //     "organizerImage": "https://example.com/organizer3.jpg"
    // },
    // {
    //     "eventId": "temp-4",
    //     "description": "A horror movie marathon for brave hearts.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/conjuring-et00356724-1712566690.jpg",
    //     "eventName": "Horror Night",
    //     "location": "Creepy Corner, Mumbai",
    //     "ticketPrice": "Free",
    //     "eventDateTime": "2024-06-01",
    //     "category": "Movies",
    //     "duration": "4 hours",
    //     "totalTickets": "200",
    //     "averageRating": "4.3",
    //     "organizerName": "Spooky Screenings",
    //     "organizerImage": "https://example.com/organizer4.jpg"
    // },
    // {
    //     "eventId": "temp-5",
    //     "description": "An inspiring documentary screening followed by a discussion.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/13th-et00356724-1712566690.jpg",
    //     "eventName": "Documentary Day",
    //     "location": "Knowledge Hub, Mumbai",
    //     "ticketPrice": "Free",
    //     "eventDateTime": "2024-06-10",
    //     "category": "Movies",
    //     "duration": "2 hours",
    //     "totalTickets": "150",
    //     "averageRating": "4.7",
    //     "organizerName": "Insightful Docs",
    //     "organizerImage": "https://example.com/organizer5.jpg"
    // },
    // {
    //     "eventId": "temp-6",
    //     "description": "A night of comedy films to make you laugh.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/step-brothers-et00356724-1712566690.jpg",
    //     "eventName": "Comedy Night",
    //     "location": "Laughter Lounge, Mumbai",
    //     "ticketPrice": "150 INR",
    //     "eventDateTime": "2024-06-15",
    //     "category": "Movies",
    //     "duration": "3 hours",
    //     "totalTickets": "400",
    //     "averageRating": "4.2",
    //     "organizerName": "Funny Films Inc.",
    //     "organizerImage": "https://example.com/organizer6.jpg"
    // },
    // {
    //     "eventId": "temp-7",
    //     "description": "A celebration of animated films for kids and families.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/toy-story-et00356724-1712566690.jpg",
    //     "eventName": "Family Animation Night",
    //     "location": "Kids Zone, Mumbai",
    //     "ticketPrice": "Free",
    //     "eventDateTime": "2024-07-01",
    //     "category": "Movies",
    //     "duration": "2.5 hours",
    //     "totalTickets": "600",
    //     "averageRating": "4.9",
    //     "organizerName": "Family Fun Films",
    //     "organizerImage": "https://example.com/organizer7.jpg"
    // },
    // {
    //     "eventId": "temp-8",
    //     "description": "A night showcasing films by independent filmmakers.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/whiplash-et00356724-1712566690.jpg",
    //     "eventName": "Indie Film Showcase",
    //     "location": "Art House Cinema, Mumbai",
    //     "ticketPrice": "250 INR",
    //     "eventDateTime": "2024-07-10",
    //     "category": "Movies",
    //     "duration": "3 hours",
    //     "totalTickets": "180",
    //     "averageRating": "4.4",
    //     "organizerName": "Indie Creators",
    //     "organizerImage": "https://example.com/organizer8.jpg"
    // },
    // {
    //     "eventId": "temp-9",
    //     "description": "A thrilling action movie night with audience favorites.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mad-max-et00356724-1712566690.jpg",
    //     "eventName": "Action Packed Night",
    //     "location": "Action Arena, Mumbai",
    //     "ticketPrice": "300 INR",
    //     "eventDateTime": "2024-07-15",
    //     "category": "Movies",
    //     "duration": "3.5 hours",
    //     "totalTickets": "350",
    //     "averageRating": "4.5",
    //     "organizerName": "Action Lovers",
    //     "organizerImage": "https://example.com/organizer9.jpg"
    // },
    // {
    //     "eventId": "temp-10",
    //     "description": "A cinematic tribute to legendary directors.",
    //     "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/alfonso-et00356724-1712566690.jpg",
    //     "eventName": "Director's Tribute Night",
    //     "location": "Film Archive, Mumbai",
    //     "ticketPrice": "Free",
    //     "eventDateTime": "2024-08-01",
    //     "category": "Movies",
    //     "duration": "2 hours",
    //     "totalTickets": "100",
    //     "averageRating": "4.8",
    //     "organizerName": "Cinephilia Society",
    //     "organizerImage": "https://example.com/organizer10.jpg"
    // }]

    const dispatch = useDispatch();
    const {events} = useSelector((state:any) => state.events);
    console.log("In events",events)
  
    useEffect(() => {
      dispatch<any>(getAllEvents());
    }, []);
  
    // if (loading) return <p>Loading events...</p>;

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
