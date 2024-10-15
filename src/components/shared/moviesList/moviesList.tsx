import { useParams } from 'react-router-dom';
import { useState } from 'react';
import "./moviesList.css";

// interface Review {
//     user: string;
//     rating: number;
//     comment: string;
// }

// interface Movie {
//     id:string;
//     title: string;
//     releaseDate: string;
//     image: string;
//     reviewsCount: number;
//     reviews: Review[];
//     ticketsCount: number;
// }

// interface MovieListProps {
//     events: Movie[];
// }

const MovieList = ({ events }: any) => {
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const filterIdData = events.filter((event: any) => event.id === id);
    const {
        image,
        releaseDate,
        reviews,
        reviewsCount,
        ticketsCount,
        title
    } = filterIdData[0];

    const increaseTicketsCount =()=>{
        setCount(count+1)
    }

    const decreaseTicketsCount =()=>{
        setCount(count === 0 ? 0 :count -1)
    }

    return (
        <div className='movies-list'>
            <div className='event-container-item'>
                <div>
                    <img src={image} alt={title} width="100" className='event-image mb-2' />
                </div>
                <div className='event-data-container'>
                    <h3 className='mb-3'>{title}</h3>
                    <p className='event-proper'>Release Date: <span className='event-proper-inner-item'>{releaseDate}</span></p>
                    <p className='event-proper'>Reviews Count: <span className='event-proper-inner-item'>{reviewsCount}</span></p>
                    <p className='event-proper'>Available Tickets: <span className='event-proper-inner-item'>{ticketsCount}</span></p>
                    <p className='event-proper'>Description: <span className='event-proper-inner-item'>"Pushpa: The Rule" is an anticipated sequel to the blockbuster film "Pushpa: The Rise." Directed by Sukumar and featuring Allu Arjun in the titular role, this film delves deeper into the gritty world of red sandalwood smuggling, focusing on the challenges faced by the protagonist, Pushpa Raj.</span></p>
                    <div className='inc-des-count-container'>
                       <p onClick={increaseTicketsCount} className='plus'>+</p>
                       <span className='straight'></span>
                       <p className='plus'>{count}</p>
                       <span className='straight'></span>
                       <p onClick={decreaseTicketsCount} className='plus'>-</p>
                    </div>
                    <div>
                        <button className='book-tickets-btn'>Book Tickets</button>
                    </div>
                    {/* <div className="container">
                        <div className="center">
                            <button className="btn">
                                <svg viewBox="0 0 180 60">
                                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                                </svg>
                                <span>Book Ticket</span>
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
            <div>
                <strong>Reviews:</strong>
                <ul>
                    {reviews.map((review: any) => (
                        <li key={review.user} className='p-3'>
                            <strong>{review.user}:</strong> {review.comment} (Rating: {review.rating})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MovieList;
