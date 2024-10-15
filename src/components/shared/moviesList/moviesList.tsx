// src/MovieList.tsx
import React from 'react';
import "./moviesList.css";

interface Review {
    user: string;
    rating: number;
    comment: string;
}

interface Movie {
    title: string;
    releaseDate: string;
    image: string;
    reviewsCount: number;
    reviews: Review[];
    ticketsCount: number;
}

interface MovieListProps {
    movies: Movie[];
    titleLength: number; // The length of titles to filter
}

const MovieList: React.FC<MovieListProps> = ({ movies, titleLength }) => {
    // Filter movies based on the length of the title
    const filteredMovies = movies.filter(movie => movie.title.length === titleLength);

    return (
        <div className='movies-list'>
            <h2>Movies with Title Length {titleLength}</h2>
            {filteredMovies.length > 0 ? (
                <ul>
                    {filteredMovies.map((movie, index) => (
                        <li key={index}>
                            <img src={movie.image} alt={movie.image} width="100" />
                            <h3>{movie.title}</h3>
                            <p>Release Date: {movie.releaseDate}</p>
                            <p>Reviews Count: {movie.reviewsCount}</p>
                            <p>Available Tickets: {movie.ticketsCount}</p>
                            <div>
                                <strong>Reviews:</strong>
                                <ul>
                                    {movie.reviews.map((review, idx) => (
                                        <li key={idx}>
                                            <strong>{review.user}:</strong> {review.comment} (Rating: {review.rating})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies found with the specified title length.</p>
            )}
        </div>
    );
};

export default MovieList;
