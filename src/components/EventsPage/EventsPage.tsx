import React, { useEffect, useState } from "react";
import Navbar from '../shared/navbar/navbar';
import Footer from '../shared/footer/eventsFooter';
import "./events-page.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/features/authentication/EventSlice";
import { EventFilters } from "../filtersComponents/filtersComponent";
import { EventCard } from "../EventCard/eventCard";


const EventPage = () => {
  
    
    const { events } = useSelector((s: any) => s.events)
    console.log(events)

    const dispatch = useDispatch();
    


    useEffect(() => {
        dispatch<any>(getAllEvents())
        // setFiltersData(events)
    },[])

    // if(events){
    //     return <h1>No Events</h1>
    // }

    return (
        <>
            <Navbar />
            <div className="event-page-container d-flex">

                <EventFilters />


                <div className="filtered-data-container">
                    { events.length> 0 ?
                        events.map((item:any, index:any) => (
                           <EventCard item = {item} key={index}  />
                        ))
                        :
                        <p>No Events Avaliable</p>
                    }
                </div>
            </div>
            <Footer />
        </>

    );
};

export default EventPage;



// const defaultFiltersData = [
//     {
//         "eventId": "temp-1",
//         "description": "A thrilling adventure movie screening.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
//         "eventName": "Adventure Night",
//         "location": "City Park, Mumbai",
//         "ticketPrice": "Free",
//         "eventDateTime": "2024-05-01",
//         "category": "Movies",
//         "duration": "2 hours",
//         "totalTickets": "500",
//         "averageRating": "4.5",
//         "organizerName": "Mumbai Film Society",
//         "organizerImage": "https://example.com/organizer1.jpg"
//     },
//     {
//         "eventId": "temp-2",
//         "description": "An exhilarating sci-fi film festival.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/interstellar-et00356724-1712566690.jpg",
//         "eventName": "Sci-Fi Spectacle",
//         "location": "Downtown Theatre, Mumbai",
//         "ticketPrice": "100 INR",
//         "eventDateTime": "2024-05-15",
//         "category": "Movies",
//         "duration": "3 hours",
//         "totalTickets": "300",
//         "averageRating": "4.8",
//         "organizerName": "Cinephile Events",
//         "organizerImage": "https://example.com/organizer2.jpg"
//     },
//     {
//         "eventId": "temp-3",
//         "description": "An enchanting evening of classic romances.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/titanic-et00356724-1712566690.jpg",
//         "eventName": "Romantic Classics Night",
//         "location": "Riverside Cinema, Mumbai",
//         "ticketPrice": "200 INR",
//         "eventDateTime": "2024-05-20",
//         "category": "Movies",
//         "duration": "2.5 hours",
//         "totalTickets": "250",
//         "averageRating": "4.6",
//         "organizerName": "Heartfelt Films",
//         "organizerImage": "https://example.com/organizer3.jpg"
//     },
//     {
//         "eventId": "temp-4",
//         "description": "A horror movie marathon for brave hearts.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/conjuring-et00356724-1712566690.jpg",
//         "eventName": "Horror Night",
//         "location": "Creepy Corner, Mumbai",
//         "ticketPrice": "Free",
//         "eventDateTime": "2024-06-01",
//         "category": "Movies",
//         "duration": "4 hours",
//         "totalTickets": "200",
//         "averageRating": "4.3",
//         "organizerName": "Spooky Screenings",
//         "organizerImage": "https://example.com/organizer4.jpg"
//     },
//     {
//         "eventId": "temp-5",
//         "description": "An inspiring documentary screening followed by a discussion.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/13th-et00356724-1712566690.jpg",
//         "eventName": "Documentary Day",
//         "location": "Knowledge Hub, Mumbai",
//         "ticketPrice": "Free",
//         "eventDateTime": "2024-06-10",
//         "category": "Movies",
//         "duration": "2 hours",
//         "totalTickets": "150",
//         "averageRating": "4.7",
//         "organizerName": "Insightful Docs",
//         "organizerImage": "https://example.com/organizer5.jpg"
//     },
//     {
//         "eventId": "temp-6",
//         "description": "A night of comedy films to make you laugh.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/step-brothers-et00356724-1712566690.jpg",
//         "eventName": "Comedy Night",
//         "location": "Laughter Lounge, Mumbai",
//         "ticketPrice": "150 INR",
//         "eventDateTime": "2024-06-15",
//         "category": "Movies",
//         "duration": "3 hours",
//         "totalTickets": "400",
//         "averageRating": "4.2",
//         "organizerName": "Funny Films Inc.",
//         "organizerImage": "https://example.com/organizer6.jpg"
//     },
//     {
//         "eventId": "temp-7",
//         "description": "A celebration of animated films for kids and families.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/toy-story-et00356724-1712566690.jpg",
//         "eventName": "Family Animation Night",
//         "location": "Kids Zone, Mumbai",
//         "ticketPrice": "Free",
//         "eventDateTime": "2024-07-01",
//         "category": "Movies",
//         "duration": "2.5 hours",
//         "totalTickets": "600",
//         "averageRating": "4.9",
//         "organizerName": "Family Fun Films",
//         "organizerImage": "https://example.com/organizer7.jpg"
//     },
//     {
//         "eventId": "temp-8",
//         "description": "A night showcasing films by independent filmmakers.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/whiplash-et00356724-1712566690.jpg",
//         "eventName": "Indie Film Showcase",
//         "location": "Art House Cinema, Mumbai",
//         "ticketPrice": "250 INR",
//         "eventDateTime": "2024-07-10",
//         "category": "Movies",
//         "duration": "3 hours",
//         "totalTickets": "180",
//         "averageRating": "4.4",
//         "organizerName": "Indie Creators",
//         "organizerImage": "https://example.com/organizer8.jpg"
//     },
//     {
//         "eventId": "temp-9",
//         "description": "A thrilling action movie night with audience favorites.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mad-max-et00356724-1712566690.jpg",
//         "eventName": "Action Packed Night",
//         "location": "Action Arena, Mumbai",
//         "ticketPrice": "300 INR",
//         "eventDateTime": "2024-07-15",
//         "category": "Movies",
//         "duration": "3.5 hours",
//         "totalTickets": "350",
//         "averageRating": "4.5",
//         "organizerName": "Action Lovers",
//         "organizerImage": "https://example.com/organizer9.jpg"
//     },
//     {
//         "eventId": "temp-10",
//         "description": "A cinematic tribute to legendary directors.",
//         "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/alfonso-et00356724-1712566690.jpg",
//         "eventName": "Director's Tribute Night",
//         "location": "Film Archive, Mumbai",
//         "ticketPrice": "Free",
//         "eventDateTime": "2024-08-01",
//         "category": "Movies",
//         "duration": "2 hours",
//         "totalTickets": "100",
//         "averageRating": "4.8",
//         "organizerName": "Cinephilia Society",
//         "organizerImage": "https://example.com/organizer10.jpg"
//     }
// ]

