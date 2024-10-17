import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filteredEvents, getAllEvents } from '../../redux/features/authentication/EventSlice';


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

export const  EventFilters = () => {
       const dispatch = useDispatch();
    const { events } = useSelector((s: any) => s.events)
    const [filtersData, setFiltersData] = useState(events);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleLocationChange = (e: any) => {
        setSelectedLocation(e.target.value);
        filterEvents(e.target.value, selectedPrice, selectedDate, selectedCategory);
    };

    const handlePriceFilter = (price: any) => {
        setSelectedPrice(price);
        filterEvents(selectedLocation, price, selectedDate, selectedCategory);
    };

    const handleDateChange = (e: any) => {
        setSelectedDate(e.target.value);
        filterEvents(selectedLocation, selectedPrice, e.target.value, selectedCategory);
    };

    const handleCategoryFilter = (category: any) => {
        setSelectedCategory(category);
        filterEvents(selectedLocation, selectedPrice, selectedDate, category);
    };

    
    const filterEvents = (location: any, price: any, date: any, category: any) => {
        let filtered = events;

        if (location && filtered) {
            filtered = filtered.filter((event:any) => event.location.includes(location));
        }

        if (price && filtered) {
            if (price === "Free") {
                filtered = filtered.filter((event:any) => event.ticketPrice === "Free");
            } else if (price === "0-500") {
                filtered = filtered.filter((event:any) => parseFloat(event.ticketPrice) <= 500);
            } else if (price === "501-2000") {
                filtered = filtered.filter((event:any) => {
                    const eventPrice = parseFloat(event.ticketPrice);
                    return eventPrice > 500 && eventPrice <= 2000;
                });
            } else if (price === "Above 2000") {
                filtered = filtered.filter((event:any) => parseFloat(event.ticketPrice) > 2000);
            }
        }

        if (date&& filtered) {
            filtered = filtered.filter((event:any) => event.eventDateTime === date);
        }

        if (category && filtered) {
            filtered = filtered.filter((event:any) => event.category === category);
        }
        console.log("filtered",filtered);
        // dispatch(getAllEvents())
        dispatch<any>(filteredEvents(filtered))
        setFiltersData(filtered);
    };

    const onRemoveFilters = () =>{
        setSelectedLocation("");
        setSelectedPrice(null);
        setSelectedDate("");
        setSelectedCategory("")
        dispatch<any>(getAllEvents())
    }

  return (
    
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
        <input type="date" value={selectedDate} onChange={handleDateChange} />
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
    <div className="filter-item">
    <label className="filter-item-label"><button type='button'  onClick={onRemoveFilters}>Remove Filters</button></label>
    
    </div>
</div>


  )
}


