
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/HomePage/HomePage';
import LoginPage from '../components/authentication/LoginPage';
import Runway from '../components/authentication/Runaway';
import Events from '../components/shared/events/events';
import Categories from '../components/shared/categories/categories';
import MovieList from '../components/shared/moviesList/moviesList';
import EventsPage from "../components/EventsPage/EventsPage";
import PageNotFound from '../error-pages/PageNotFound';
import MyOrdersPage from '../components/MyOrdersPage/MyOrdersPage';
import UserForm from "../components/AddUserPage/add-user";
import EventForm from '../components/AddEventPage/add-event';
import EditEventPage from '../components/EditEventPage/EditEventPage';

  const event = [
    // {   
    //     id: '1',
    //     title: "Pushpa: The Rule",
    //     releaseDate: "2023-12-15",
    //     image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
    //     reviewsCount: 1200,
    //     reviews: [
    //         { user: "Alice", rating: 4.5, comment: "Amazing visuals!" },
    //         { user: "Bob", rating: 4.0, comment: "Great storyline." }
    //     ],
    //     ticketsCount: 1500,
    // },
    // {
    //     id: '2',
    //     title: "Devara",
    //     releaseDate: "2024-01-10",
    //     image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICAyOTguMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00310216-tluebxpafx-portrait.jpg",
    //     reviewsCount: 850,
    //     reviews: [
    //         { user: "Charlie", rating: 5.0, comment: "A must-watch!" },
    //         { user: "David", rating: 3.5, comment: "It was okay." }
    //     ],
    //     ticketsCount: 900,
    // },
    // {
    //     id: '3',
    //     title: "KGF: Chapter 2",
    //     releaseDate: "2022-04-14",
    //     image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg",
    //     reviewsCount: 2000,
    //     reviews: [
    //         { user: "Eve", rating: 4.8, comment: "Incredible action!" },
    //         { user: "Frank", rating: 4.2, comment: "Loved it!" }
    //     ],
    //     ticketsCount: 2500,
    // },
    // {
    //     id: '4',
    //     title: "RRR",
    //     releaseDate: "2022-03-25",
    //     image: "https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/rrr-et00094579-1700135873.jpg",
    //     reviewsCount: 1800,
    //     reviews: [
    //         { user: "Grace", rating: 4.9, comment: "Epic film!" },
    //         { user: "Henry", rating: 4.0, comment: "Good performances." }
    //     ],
    //     ticketsCount: 2100,
    // },
    // {
    //     id:'5',
    //     title: "Vettaiyan - The Hunter",
    //     releaseDate: "2023-11-20",
    //     image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vettaiyan-the-hunter-et00412743-1728048350.jpg",
    //     reviewsCount: 500,
    //     reviews: [
    //         { user: "Ivy", rating: 3.8, comment: "Interesting plot." },
    //         { user: "Jack", rating: 4.1, comment: "Well made." }
    //     ],
    //     ticketsCount: 600,
    // },
    // {
    //     id: '6',
    //     title: "Lubber Pandhu",
    //     releaseDate: "2023-08-15",
    //     image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS41LzEwICA1NC41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00409924-fhqlnmfgyt-portrait.jpg",
    //     reviewsCount: 300,
    //     reviews: [
    //         { user: "Kathy", rating: 4.3, comment: "Fun watch!" },
    //         { user: "Leo", rating: 3.5, comment: "Not bad." }
    //     ],
    //     ticketsCount: 350,
    // }
        {
            "eventId": "temp-1",
            "description": "A thrilling adventure movie screening.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
            "eventName": "Adventure Night",
            "location": "City Park, Mumbai",
            "ticketPrice": "Free",
            "eventDateTime": "2024-05-01",
            "category": "Movies",
            "duration": "2 hours",
            "totalTickets": "500",
            "averageRating": "4.5",
            "organizerName": "Mumbai Film Society",
            "organizerImage": "https://example.com/organizer1.jpg"
        },
        {
            "eventId": "temp-2",
            "description": "An exhilarating sci-fi film festival.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/interstellar-et00356724-1712566690.jpg",
            "eventName": "Sci-Fi Spectacle",
            "location": "Downtown Theatre, Mumbai",
            "ticketPrice": "100 INR",
            "eventDateTime": "2024-05-15",
            "category": "Movies",
            "duration": "3 hours",
            "totalTickets": "300",
            "averageRating": "4.8",
            "organizerName": "Cinephile Events",
            "organizerImage": "https://example.com/organizer2.jpg"
        },
        {
            "eventId": "temp-3",
            "description": "An enchanting evening of classic romances.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/titanic-et00356724-1712566690.jpg",
            "eventName": "Romantic Classics Night",
            "location": "Riverside Cinema, Mumbai",
            "ticketPrice": "200 INR",
            "eventDateTime": "2024-05-20",
            "category": "Movies",
            "duration": "2.5 hours",
            "totalTickets": "250",
            "averageRating": "4.6",
            "organizerName": "Heartfelt Films",
            "organizerImage": "https://example.com/organizer3.jpg"
        },
        {
            "eventId": "temp-4",
            "description": "A horror movie marathon for brave hearts.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/conjuring-et00356724-1712566690.jpg",
            "eventName": "Horror Night",
            "location": "Creepy Corner, Mumbai",
            "ticketPrice": "Free",
            "eventDateTime": "2024-06-01",
            "category": "Movies",
            "duration": "4 hours",
            "totalTickets": "200",
            "averageRating": "4.3",
            "organizerName": "Spooky Screenings",
            "organizerImage": "https://example.com/organizer4.jpg"
        },
        {
            "eventId": "temp-5",
            "description": "An inspiring documentary screening followed by a discussion.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/13th-et00356724-1712566690.jpg",
            "eventName": "Documentary Day",
            "location": "Knowledge Hub, Mumbai",
            "ticketPrice": "Free",
            "eventDateTime": "2024-06-10",
            "category": "Movies",
            "duration": "2 hours",
            "totalTickets": "150",
            "averageRating": "4.7",
            "organizerName": "Insightful Docs",
            "organizerImage": "https://example.com/organizer5.jpg"
        },
        {
            "eventId": "temp-6",
            "description": "A night of comedy films to make you laugh.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/step-brothers-et00356724-1712566690.jpg",
            "eventName": "Comedy Night",
            "location": "Laughter Lounge, Mumbai",
            "ticketPrice": "150 INR",
            "eventDateTime": "2024-06-15",
            "category": "Movies",
            "duration": "3 hours",
            "totalTickets": "400",
            "averageRating": "4.2",
            "organizerName": "Funny Films Inc.",
            "organizerImage": "https://example.com/organizer6.jpg"
        },
        {
            "eventId": "temp-7",
            "description": "A celebration of animated films for kids and families.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/toy-story-et00356724-1712566690.jpg",
            "eventName": "Family Animation Night",
            "location": "Kids Zone, Mumbai",
            "ticketPrice": "Free",
            "eventDateTime": "2024-07-01",
            "category": "Movies",
            "duration": "2.5 hours",
            "totalTickets": "600",
            "averageRating": "4.9",
            "organizerName": "Family Fun Films",
            "organizerImage": "https://example.com/organizer7.jpg"
        },
        {
            "eventId": "temp-8",
            "description": "A night showcasing films by independent filmmakers.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/whiplash-et00356724-1712566690.jpg",
            "eventName": "Indie Film Showcase",
            "location": "Art House Cinema, Mumbai",
            "ticketPrice": "250 INR",
            "eventDateTime": "2024-07-10",
            "category": "Movies",
            "duration": "3 hours",
            "totalTickets": "180",
            "averageRating": "4.4",
            "organizerName": "Indie Creators",
            "organizerImage": "https://example.com/organizer8.jpg"
        },
        {
            "eventId": "temp-9",
            "description": "A thrilling action movie night with audience favorites.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mad-max-et00356724-1712566690.jpg",
            "eventName": "Action Packed Night",
            "location": "Action Arena, Mumbai",
            "ticketPrice": "300 INR",
            "eventDateTime": "2024-07-15",
            "category": "Movies",
            "duration": "3.5 hours",
            "totalTickets": "350",
            "averageRating": "4.5",
            "organizerName": "Action Lovers",
            "organizerImage": "https://example.com/organizer9.jpg"
        },
        {
            "eventId": "temp-10",
            "description": "A cinematic tribute to legendary directors.",
            "imageUrl": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/alfonso-et00356724-1712566690.jpg",
            "eventName": "Director's Tribute Night",
            "location": "Film Archive, Mumbai",
            "ticketPrice": "Free",
            "eventDateTime": "2024-08-01",
            "category": "Movies",
            "duration": "2 hours",
            "totalTickets": "100",
            "averageRating": "4.8",
            "organizerName": "Cinephilia Society",
            "organizerImage": "https://example.com/organizer10.jpg"
        }
];


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      {/* <Route path="/" element={<ProtectedRoute element={<Home/>} />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/runway" element={<Runway/>} />
      <Route path="/home" element={<Events/>} />
      <Route path="/events" element={<EventsPage/>} />
      <Route path="/categories" element={<Categories />}/> 
      <Route path="/events/:id" element={<MovieList />} />
      <Route path="/my-orders" element={<MyOrdersPage/>} />
      <Route path="/not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />

      <Route path="/edit-event/:id" element={<EditEventPage />} />
      <Route path="/add-event" element={<EventForm />} />
      <Route path="/add-user"  element={<UserForm />} />
    </Routes>
  );
};

export default AppRoutes;
