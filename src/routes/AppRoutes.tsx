
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

  const event = [
    {   
        id: '1',
        title: "Pushpa: The Rule",
        releaseDate: "2023-12-15",
        image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
        reviewsCount: 1200,
        reviews: [
            { user: "Alice", rating: 4.5, comment: "Amazing visuals!" },
            { user: "Bob", rating: 4.0, comment: "Great storyline." }
        ],
        ticketsCount: 1500,
    },
    {
        id: '2',
        title: "Devara",
        releaseDate: "2024-01-10",
        image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICAyOTguMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00310216-tluebxpafx-portrait.jpg",
        reviewsCount: 850,
        reviews: [
            { user: "Charlie", rating: 5.0, comment: "A must-watch!" },
            { user: "David", rating: 3.5, comment: "It was okay." }
        ],
        ticketsCount: 900,
    },
    {
        id: '3',
        title: "KGF: Chapter 2",
        releaseDate: "2022-04-14",
        image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg",
        reviewsCount: 2000,
        reviews: [
            { user: "Eve", rating: 4.8, comment: "Incredible action!" },
            { user: "Frank", rating: 4.2, comment: "Loved it!" }
        ],
        ticketsCount: 2500,
    },
    {
        id: '4',
        title: "RRR",
        releaseDate: "2022-03-25",
        image: "https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/rrr-et00094579-1700135873.jpg",
        reviewsCount: 1800,
        reviews: [
            { user: "Grace", rating: 4.9, comment: "Epic film!" },
            { user: "Henry", rating: 4.0, comment: "Good performances." }
        ],
        ticketsCount: 2100,
    },
    {
        id:'5',
        title: "Vettaiyan - The Hunter",
        releaseDate: "2023-11-20",
        image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vettaiyan-the-hunter-et00412743-1728048350.jpg",
        reviewsCount: 500,
        reviews: [
            { user: "Ivy", rating: 3.8, comment: "Interesting plot." },
            { user: "Jack", rating: 4.1, comment: "Well made." }
        ],
        ticketsCount: 600,
    },
    {
        id: '6',
        title: "Lubber Pandhu",
        releaseDate: "2023-08-15",
        image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS41LzEwICA1NC41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00409924-fhqlnmfgyt-portrait.jpg",
        reviewsCount: 300,
        reviews: [
            { user: "Kathy", rating: 4.3, comment: "Fun watch!" },
            { user: "Leo", rating: 3.5, comment: "Not bad." }
        ],
        ticketsCount: 350,
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
      <Route path="/events/:id" element={<MovieList  events={event} />} />
      <Route path="/my-orders" element={<MyOrdersPage/>} />
      <Route path="/not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />

      <Route path="/add-event" element={<EventForm />} />
      <Route path="/add-user"  element={<UserForm />} />
    </Routes>
  );
};

export default AppRoutes;
