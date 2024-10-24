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

export const EventFilters = ({ events, setFilteredEvents,setFilters }:any) => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const updateFiltersState = (newFilters: any) => {
        setFilters((prevFilters: any) => ({
          ...prevFilters,
          ...newFilters,
        }));
      };
    
      const handleLocationChange = (e: any) => {
        const location = e.target.value;
        setSelectedLocation(location);
        updateFiltersState({ location });
      };
    
      const handlePriceFilter = (price: any) => {
        setSelectedPrice(price);
        updateFiltersState({ minTicketPrice: 0, maxTicketPrice: 0 });
        if (price === "0-500") updateFiltersState({ minTicketPrice: 0, maxTicketPrice: 500 });
        if (price === "501-2000") updateFiltersState({ minTicketPrice: 501, maxTicketPrice: 2000 });
        if (price === "Above 2000") updateFiltersState({ minTicketPrice: 2001, maxTicketPrice: Infinity });
      };
    
      const handleDateChange = (e: any) => {
        const date = e.target.value;
        setSelectedDate(date);
        updateFiltersState({ date });
      };
    
      const handleCategoryFilter = (category: any) => {
        setSelectedCategory(category);
        updateFiltersState({ category });
      };
    
      const onRemoveFilters = () => {
        setSelectedLocation("");
        setSelectedPrice(null);
        setSelectedDate("");
        setSelectedCategory("");
        setFilters({ location: "", category: "", limit: 6, minTicketPrice: 0, maxTicketPrice: 0 });
        setFilteredEvents(events);
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
                min={new Date().toISOString().split("T")[0]} // Sets the minimum date to today
               
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
