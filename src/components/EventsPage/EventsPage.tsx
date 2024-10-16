import React, { useState } from "react";
import Navbar from '../shared/navbar/navbar';
import Footer from '../shared/footer/eventsFooter';
import "./events-page.css";

const defaultFiltersData = [
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
]


const locations = [
    "City Park, Mumbai",
    "Central Park, Delhi",
    "Wankhede Stadium, Mumbai",
    "National Gallery of Modern Art, Delhi",
    "Bangalore International Exhibition Centre, Bangalore",
    "Connaught Place, Delhi",
    "Shree Chetan Sadan, Pune",
    "Lodhi Garden, Delhi",
    "Community Hall, Chennai",
    "Central Park, Bangalore"
];

const EventPage = () => {
    const [filtersData, setFiltersData] = useState(defaultFiltersData);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleLocationChange = (e:any) => {
        setSelectedLocation(e.target.value);
        filterEvents(e.target.value, selectedPrice, selectedDate, selectedCategory);
    };

    const handlePriceFilter = (price:any) => {
        setSelectedPrice(price);
        filterEvents(selectedLocation, price, selectedDate, selectedCategory);
    };

    const handleDateChange = (e:any) => {
        setSelectedDate(e.target.value);
        filterEvents(selectedLocation, selectedPrice, e.target.value, selectedCategory);
    };

    const handleCategoryFilter = (category:any) => {
        setSelectedCategory(category);
        filterEvents(selectedLocation, selectedPrice, selectedDate, category);
    };

    const filterEvents = (location:any, price:any, date:any, category:any) => {
        let filtered = defaultFiltersData;

        if (location) {
            filtered = filtered.filter(event => event.location.includes(location));
        }

        if (price) {
            if (price === "Free") {
                filtered = filtered.filter(event => event.ticketPrice === "Free");
            } else if (price === "0-500") {
                filtered = filtered.filter(event => parseFloat(event.ticketPrice) <= 500);
            } else if (price === "501-2000") {
                filtered = filtered.filter(event => {
                    const eventPrice = parseFloat(event.ticketPrice); 
                    return eventPrice > 500 && eventPrice <= 2000;
                });
            } else if (price === "Above 2000") {
                filtered = filtered.filter(event => parseFloat(event.ticketPrice) > 2000);
            }
        }

        if (date) {
            filtered = filtered.filter(event => event.eventDateTime === date);
        }

        if (category) {
            filtered = filtered.filter(event => event.category === category);
        }

        setFiltersData(filtered);
    };

    return (
        <>
        <Navbar/>
        <div className="event-page-container d-flex">
            <div className="filters-container d-flex flex-column">
                <h3 className="heading-filters-data">Filters</h3>
                <div className="filter-item">
                    <label className="filter-item-label">Location</label>
                    <select value={selectedLocation} onChange={handleLocationChange} className="filter-item-select">
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                <label className="filter-item-label">Price</label>
                    {["Free", "0-500", "501-2000", "Above 2000"].map(price => (
                        <button
                            key={price}
                            onClick={() => handlePriceFilter(price)}
                            className={`price-button ${selectedPrice === price ? 'active' : ''}`}
                        >
                            {price}
                        </button>
                    ))}
                </div>
                <div className="filter-item">
                    <label className="filter-item-label">Date</label>
                    <input type="date" value={selectedDate}  onChange={handleDateChange} />
                </div>
                <div className="filter-item">
                <label className="filter-item-label">Categories</label>
                    {["Movies", "Concerts", "Sports", "Exhibitions", "Conferences", "Festivals", "Wellness", "Seminars", "Family"].map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryFilter(category)}
                            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="filtered-data-container">
                {filtersData.length > 0 ? (
                    filtersData.map((item, index) => (
                        <div key={index} className="filtered-item">
                            <img src={item.imageUrl} alt={item.eventName} width="100" className="filtered-item-img" />
                            <h4>{item.eventName}</h4>
                            <p>{item.description}</p>
                            <div className="view-container">
                                <p>Price: {item.ticketPrice}</p>
                                <button className='btn btn-primary view'>View</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
        <Footer/>
        </>
        
    );
};

export default EventPage;


