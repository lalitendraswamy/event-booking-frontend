import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MovieList from './components/moviesList/moviesList';
import Events from './components/events/events';
import Categories from './components/categories/categories';
import EventsFooter from "./components/eventsFooter/eventsFooter";
import EventNavbar from "./components/navbar/navbar"
import 'bootstrap/dist/css/bootstrap.min.css';


const movies = [
  {
    id: 1,
    title: "Pushpa: The Rule",
    releaseDate: "2024-12-22",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
    reviewsCount: 1500,
    reviews: [
      { user: "Rajesh Kumar", rating: 5, comment: "Amazing movie! A must-watch!" },
      { user: "Priya", rating: 4, comment: "Great action sequences." }
    ],
    ticketsCount: 800
  },
  {
    id: 2,
    title: "Salaar",
    releaseDate: "2024-09-28",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
    reviewsCount: 800,
    reviews: [
      { user: "Kiran Yadav", rating: 5, comment: "Excited for this one!" },
      { user: "Ravi", rating: 4, comment: "Looks promising!" }
    ],
    ticketsCount: 600
  },
  {
    id: 3,
    title: "NTR 30",
    releaseDate: "2024-10-01",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ntr-30-et00356725-1712566691.jpg",
    reviewsCount: 1200,
    reviews: [
      { user: "Suresh", rating: 5, comment: "Can't wait!" },
      { user: "Anjali", rating: 3, comment: "Hyped but cautious." }
    ],
    ticketsCount: 500
  },
  {
    id: 4,
    title: "Varasudu",
    releaseDate: "2024-11-10",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/varasudu-et00356729-1712566688.jpg",
    reviewsCount: 300,
    reviews: [],
    ticketsCount: 700
  },
  {
    id: 5,
    title: "Jersey",
    releaseDate: "2022-04-22",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jersey-et00356727-1712566689.jpg",
    reviewsCount: 900,
    reviews: [
      { user: "Sunil", rating: 4, comment: "A heartwarming story." }
    ],
    ticketsCount: 400
  },
  {
    id: 6,
    title: "K.G.F: Chapter 2",
    releaseDate: "2022-04-14",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00356726-1712566692.jpg",
    reviewsCount: 1200,
    reviews: [
      { user: "Deepak", rating: 5, comment: "Epic!" }
    ],
    ticketsCount: 1000
  },
  {
    id: 7,
    title: "Dasara",
    releaseDate: "2023-03-30",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/dasara-et00356732-1712566667.jpg",
    reviewsCount: 500,
    reviews: [
      { user: "Pranay", rating: 4, comment: "Great action!" }
    ],
    ticketsCount: 300
  },
  {
    id: 8,
    title: "Adipurush",
    releaseDate: "2023-06-16",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/adipurush-et00356728-1712566687.jpg",
    reviewsCount: 700,
    reviews: [],
    ticketsCount: 450
  },
  {
    id: 9,
    title: "Fighter",
    releaseDate: "2024-01-25",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/fighter-et00356731-1712566678.jpg",
    reviewsCount: 200,
    reviews: [
      { user: "Anil", rating: 4, comment: "Thrilling!" }
    ],
    ticketsCount: 500
  },
  {
    id: 10,
    title: "Rudrangi",
    releaseDate: "2023-08-25",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/rudrangi-et00356730-1712566679.jpg",
    reviewsCount: 250,
    reviews: [
      { user: "Meena", rating: 3, comment: "Interesting!" }
    ],
    ticketsCount: 300
  }
];


const App: React.FC = () => {
  return (

      <Router>
         
          <AppRoutes/>  
          <EventNavbar />
          <Events />
          <Categories />
          <MovieList movies={movies} titleLength={6}/>
          <EventsFooter />
      </Router>

  );
};

export default App;
