import React, { useState } from "react";

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
    "Central Park, Bangalore",
    "HSR Layout, Bangalore",
    "Pune, Maharashtra",
    "Bangalore, Karnataka",
    "Bangalore",
    "Karnataka",
  ];

export const EventFilters = ({ events, setFilteredEvents }:any) => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleLocationChange = (e: any) => {
        const location = e.target.value;
        setSelectedLocation(location);
        filterEvents(location, selectedPrice, selectedDate, selectedCategory);
    };
    

    const handlePriceFilter = (price: any) => {
        setSelectedPrice(price);
        filterEvents(selectedLocation, price, selectedDate, selectedCategory);
    };

    const handleDateChange = (e: any) => {
        const date = e.target.value;
        console.log(date);
        setSelectedDate(date);
        filterEvents(selectedLocation, selectedPrice, date, selectedCategory);
    };

    const handleCategoryFilter = (category: any) => {
        setSelectedCategory(category);
        filterEvents(selectedLocation, selectedPrice, selectedDate, category);
    };

    const filterEvents = (location: any, price: any, date: any, category: any) => {
        let filtered = events;

        if (location) {
            filtered = filtered.filter((event: any) => event.location.includes(location));
        }
        if (price) {
            if (price === "Free") {
                filtered = filtered.filter(
                  (event: any) => event.ticketPrice === "Free"
                );
              } else if (price === "0-500") {
                filtered = filtered.filter(
                  (event: any) => parseFloat(event.ticketPrice) <= 500
                );
              } else if (price === "501-2000") {
                filtered = filtered.filter((event: any) => {
                  const eventPrice = parseFloat(event.ticketPrice);
                  return eventPrice > 500 && eventPrice <= 2000;
                });
              } else if (price === "Above 2000") {
                filtered = filtered.filter(
                  (event: any) => parseFloat(event.ticketPrice) > 2000
                );
              }
        }
        if (date) {
            const selectedDate = new Date(date);
        filtered = filtered.filter((event: any) => {
            const eventDate = new Date(event.eventDateTime);
            return eventDate >= selectedDate; // Filter events from the selected date onwards
        });
        }
        if (category) {
            filtered = filtered.filter((event: any) => event.category === category);
        }

        setFilteredEvents(filtered);
    };

    const onRemoveFilters = () => {
        setSelectedLocation("");
        setSelectedPrice(null);
        setSelectedDate("");
        setSelectedCategory("");
        setFilteredEvents(events); // Reset to all events
    };

    return (
        <div className="filters-container d-flex flex-column">
            <h3 className="heading-filters-data">Filters</h3>
            <div className="filter-item">
                <label className="filter-item-label">Location</label>
                <select value={selectedLocation} onChange={handleLocationChange} className="filter-item-select">
                    {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <div className="filter-item">
                <label className="filter-item-label">Price</label>
                {["Free", "0-500", "501-2000", "Above 2000"].map((price) => (
                    <button
                        key={price}
                        onClick={() => handlePriceFilter(price)}
                        className={`price-button ${selectedPrice === price ? "active" : ""}`}
                    >
                        {price}
                    </button>
                ))}
            </div>
            <div className="filter-item">
                <label className="filter-item-label">Date</label>
                <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                
            />
            </div>
            <div className="filter-item">
                <label className="filter-item-label">Categories</label>
                {["Music", "Concerts", "Arts", "Exhibitions", "Conferences", "Festivals", "Wellness", "Seminars", "Comedy"].map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`category-button ${selectedCategory === category ? "active" : ""}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="filter-item">
                <label className="filter-item-label">
                    <button type="button" onClick={onRemoveFilters}>Remove Filters</button>
                </label>
            </div>
        </div>
    );
};
