import { useEffect, useState } from "react";
import Navbar from '../shared/navbar/navbar';
import Footer from '../shared/footer/eventsFooter';
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/features/authentication/EventSlice";
import { EventFilters } from "../filtersComponents/filtersComponent";
import { EventCard } from "../EventCard/eventCard";
import "./events-page.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";

const EventPage = () => {
    const { events } = useSelector((s: any) => s.events);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
    
    useEffect(() => {
        dispatch<any>(getAllEvents());
    }, []);
    
        const navigate = useNavigate();
        const [filteredEvents, setFilteredEvents] = useState(events);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        setFilteredEvents(events); // Update filteredEvents when events change
    }, [events]);

    return (
        <>
            <Navbar />
            <div className="event-page-container d-flex">
                <EventFilters 
                    events={events} 
                    setFilteredEvents={setFilteredEvents} 
                />
                <div className="d-flex flex-column">
                    {getCookie('role') === 'admin' && (
                        <button 
                            onClick={() => navigate('/add-event')} 
                            className='add-event-btn d-flex justify-content-between align-items-center align-self-end'>
                            <IoMdAddCircleOutline className='me-2' style={{ color: "whitesmoke", fontSize: "30px" }} />
                            Add Event
                        </button>
                    )}
                    
                    <div className="filtered-data-container">
                        {currentEvents.length > 0 ? 
                            currentEvents.map((item: any, index: any) => (
                                <EventCard item={item} key={index} />
                            )) 
                            : 
                            <p>No Events Available!</p>
                        }
                    </div>
                </div>
            </div>

            <div className="pagination-controls">
                {Array.from(
                    { length: Math.ceil(filteredEvents.length / eventsPerPage) },
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
            <Footer />
        </>
    );
};

export default EventPage;
