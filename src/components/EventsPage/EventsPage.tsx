// import "./events-page.css";

// const defaultFiltersData = [
//     {
//         description: "A thrilling adventure movie screening.",
//         eventImage: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
//         name: "Adventure Night",
//         location: "City Park",
//         price: "Free",
//         date: "2024-05-01",
//         category: "Movies"
//     },
//     {
//         description: "A relaxing music concert.",
//         eventImage: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
//         name: "Music in the Park",
//         location: "Central Park",
//         price: "$10",
//         date: "2024-06-15",
//         category: "Concerts"
//     },
//     // Add more events as needed
// ];

// const EventPage = ({ filtersData = defaultFiltersData }) => {
//     return (
//         <div className="event-page-container d-flex">
//             <div className="filters-container d-flex flex-column">
//                 <h3>Filters</h3>
//                 <div className="filter-item">
//                     <label>Location:</label>
//                     <select>
//                         <option value="City Park">City Park</option>
//                         <option value="Central Park">Central Park</option>
//                     </select>
//                 </div>
//                 <div className="filter-item">
//                     <h1>filter based on the price</h1>
//                     <button className="btn btn-primary">Free</button>
//                     <button>0-500</button>
//                     <button>501-2000</button>
//                     <button>Above 2000</button>
//                 </div>
//                 <div className="filter-item">
//                     <label>Date:</label>
//                     <input type="date" />
//                 </div>
//                 <div className="filter-item">
//                     {defaultFiltersData.map((each)=> <button>{each.category}</button>)}
//                 </div>
//             </div>
//             <div className="filtered-data-container">
//                 {filtersData.length > 0 ? (
//                     filtersData.map((item, index) => (
//                         <div key={index} className="filtered-item">
//                             <img src={item.eventImage} alt={item.name} width="100" className="filtered-item-img"/>
//                             <h4>{item.name}</h4>
//                             <p>{item.description}</p>
//                             <div className="view-container">
//                                <p>Price: {item.price}</p>
//                                <button className='btn btn-primary view'>View</button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No events found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EventPage;


import React, { useState } from "react";
import "./events-page.css";

const defaultFiltersData = [
    {
        description: "A thrilling adventure movie screening.",
        eventImage: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
        name: "Adventure Night",
        location: "City Park, Mumbai",
        price: "Free",
        date: "2024-05-01",
        category: "Movies"
    },
    {
        description: "A relaxing music concert.",
        eventImage: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
        name: "Music in the Park",
        location: "Central Park, Delhi",
        price: "450",
        date: "2024-06-15",
        category: "Concerts"
    },
    {
        description: "An exciting cricket match between local teams.",
        eventImage: "https://example.com/cricket-match.jpg",
        name: "Local League Match",
        location: "Wankhede Stadium, Mumbai",
        price: "1200",
        date: "2024-06-10",
        category: "Sports"
    },
    {
        description: "A wonderful art exhibition featuring local artists.",
        eventImage: "https://example.com/art-exhibition.jpg",
        name: "Art in the City",
        location: "National Gallery of Modern Art, Delhi",
        price: "300",
        date: "2024-05-20",
        category: "Exhibitions"
    },
    {
        description: "Join us for a tech conference with industry leaders.",
        eventImage: "https://example.com/tech-conference.jpg",
        name: "Tech Innovations 2024",
        location: "Bangalore International Exhibition Centre, Bangalore",
        price: "3000",
        date: "2024-05-30",
        category: "Conferences"
    },
    {
        description: "A culinary festival showcasing local cuisines.",
        eventImage: "https://example.com/food-festival.jpg",
        name: "Foodie Fest",
        location: "Connaught Place, Delhi",
        price: "1500",
        date: "2024-07-01",
        category: "Festivals"
    },
    {
        description: "A classic rock band reunion concert.",
        eventImage: "https://example.com/rock-concert.jpg",
        name: "Rock Legends Live",
        location: "Shree Chetan Sadan, Pune",
        price: "2000",
        date: "2024-07-15",
        category: "Concerts"
    },
    {
        description: "An outdoor yoga session for wellness enthusiasts.",
        eventImage: "https://example.com/yoga-session.jpg",
        name: "Yoga in the Park",
        location: "Lodhi Garden, Delhi",
        price: "Free",
        date: "2024-06-05",
        category: "Wellness"
    },
    {
        description: "An engaging seminar on personal finance.",
        eventImage: "https://example.com/finance-seminar.jpg",
        name: "Money Matters",
        location: "Community Hall, Chennai",
        price: "1000",
        date: "2024-08-01",
        category: "Seminars"
    },
    {
        description: "A magical night of storytelling for all ages.",
        eventImage: "https://example.com/storytelling-night.jpg",
        name: "Storytime Under the Stars",
        location: "Central Park, Bangalore",
        price: "Free",
        date: "2024-08-10",
        category: "Family"
    }
];

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
                filtered = filtered.filter(event => event.price === "Free");
            } else if (price === "0-500") {
                filtered = filtered.filter(event => parseFloat(event.price) <= 500);
            } else if (price === "501-2000") {
                filtered = filtered.filter(event => {
                    const eventPrice = parseFloat(event.price);
                    return eventPrice > 500 && eventPrice <= 2000;
                });
            } else if (price === "Above 2000") {
                filtered = filtered.filter(event => parseFloat(event.price) > 2000);
            }
        }

        if (date) {
            filtered = filtered.filter(event => event.date === date);
        }

        if (category) {
            filtered = filtered.filter(event => event.category === category);
        }

        setFiltersData(filtered);
    };

    return (
        <div className="event-page-container d-flex">
            <div className="filters-container d-flex flex-column">
                <h3 className="heading-filters-data">Filters</h3>
                <div className="filter-item">
                    <label className="filter-item-label">Location:</label>
                    <select value={selectedLocation} onChange={handleLocationChange} className="filter-item-select">
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                    <h1 className="heading-filters-data">Filter based on the price</h1>
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
                    <label className="filter-item-label">Date:</label>
                    <input type="date" value={selectedDate} onChange={handleDateChange} />
                </div>
                <div className="filter-item">
                    <h1 className="heading-filters-data">Categories</h1>
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
                            <img src={item.eventImage} alt={item.name} width="100" className="filtered-item-img" />
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <div className="view-container">
                                <p>Price: {item.price}</p>
                                <button className='btn btn-primary view'>View</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default EventPage;

