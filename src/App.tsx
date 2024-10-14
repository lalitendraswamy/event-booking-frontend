import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MovieList from './components/shared/moviesList/moviesList';
import Events from './components/shared/events/events';
import Categories from './components/shared/categories/categories';
import EventsFooter from "./components/shared/footer/eventsFooter";
import EventNavbar from "./components/shared/navbar/navbar"

import 'bootstrap/dist/css/bootstrap.min.css';



const App: React.FC = () => {
  return (

      <Router>
         
          <AppRoutes/>  
          {/* <EventNavbar />
          <Events/>
          <Categories />
          <MovieList movies={movies} titleLength={6}/>
          <EventsFooter /> */}
      </Router>

  );
};

export default App;
