
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/HomePage/HomePage';
import LoginPage from '../components/authentication/LoginPage';
import Runway from '../components/authentication/Runaway';
import MovieList from '../components/shared/EventDetailedPage/EventDeatiledPage';
import EventsPage from "../components/EventsPage/EventsPage";
import PageNotFound from '../error-pages/PageNotFound';
import MyOrdersPage from '../components/MyOrdersPage/MyOrdersPage';
import UserForm from "../components/AddUserPage/add-user";
import EventForm from '../components/AddEventPage/add-event';
import EditEventPage from '../components/EditEventPage/EditEventPage';
import ContactUs from "../components/ContactUsPage/contact-us";
import FavoriteEventCard from "../components/FavoriteEventCard/favoriteEvent";
import Userpage from '../components/UsersPage/Userpage';
import ProtectedRoute from './ProtectedRoute';




const AppRoutes: React.FC = () => {
  return (
    <Routes>

        {/* authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/runway" element={<Runway/>} />

        {/* user routes */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/favorite-event" element={<ProtectedRoute element={<FavoriteEventCard />} />} />
        <Route path="/events" element={<ProtectedRoute element={<EventsPage />} />} />
        <Route path="/contact-us" element={<ProtectedRoute element={<ContactUs />} />} />
        <Route path="/events/:id" element={<ProtectedRoute element={<MovieList />} />} />
        <Route path="/my-orders" element={<ProtectedRoute element={<MyOrdersPage />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<ContactUs />} />} />


        {/* admin routes */}
        <Route path="/edit-event/:id" element={<ProtectedRoute  role='admin' element={<EditEventPage />} />} />
        <Route path="/users" element={<ProtectedRoute  role='admin'  element={<Userpage />} />} />
        <Route path="/add-event" element={<ProtectedRoute  role='admin'  element={<EventForm />} />} />
        <Route path="/add-user" element={<ProtectedRoute  role='admin'  element={<UserForm />} />} />


        {/* not found routes */}
        <Route path="/not-found" element={<ProtectedRoute element={<PageNotFound />} />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />

    </Routes>
  );
};

export default AppRoutes;
