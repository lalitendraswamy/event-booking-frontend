
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/HomePage/HomePage';
import LoginPage from '../components/authentication/LoginPage';
import Runway from '../components/authentication/Runaway';
import Events from '../components/shared/events/events';
import Categories from '../components/shared/categories/categories';
import MovieList from '../components/shared/EventDetailedPage/EventDeatiledPage';
import EventsPage from "../components/EventsPage/EventsPage";
import PageNotFound from '../error-pages/PageNotFound';
import MyOrdersPage from '../components/MyOrdersPage/MyOrdersPage';
import UserForm from "../components/AddUserPage/add-user";
import EventForm from '../components/AddEventPage/add-event';

import FavoriteEventCard from "../components/FavoriteEventCard/favoriteEvent";

import EditEventPage from '../components/EditEventPage/EditEventPage';
import Userpage from '../components/UsersPage/Userpage';




const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      {/* <Route path="/" element={<ProtectedRoute element={<Home/>} />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/favorite-event" element={<FavoriteEventCard />} />
      <Route path="/runway" element={<Runway/>} />
      <Route path="/home" element={<Events/>} />
      <Route path="/events" element={<EventsPage/>} />
      <Route path="/categories" element={<Categories />}/> 
      <Route path="/events/:id" element={<MovieList />} />
      <Route path="/my-orders" element={<MyOrdersPage/>} />
      <Route path="/not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />



      <Route path="/edit-event/:id" element={<EditEventPage />} />
      <Route path="/users" element={<Userpage />} />

      <Route path="/add-event" element={<EventForm />} />
      <Route path="/add-user"  element={<UserForm />} />

    </Routes>
  );
};

export default AppRoutes;
