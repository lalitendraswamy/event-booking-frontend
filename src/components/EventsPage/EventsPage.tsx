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
    const navigate = useNavigate();
    const [filteredEvents, setFilteredEvents] = useState(events);

    useEffect(() => {
        dispatch<any>(getAllEvents());
    }, [dispatch]);

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
                    {getCookie('role')==='admin'&&( <button 
                        onClick={() => navigate('/add-event')} 
                        className='add-event-btn d-flex justify-content-between align-items-center align-self-end'>
                        <IoMdAddCircleOutline className='me-2' style={{ "color": "whitesmoke", "fontSize": "30px" }} />
                        Add Event
                    </button>)}
                   
                    <div className="filtered-data-container">
                        {filteredEvents.length > 0 ? 
                            filteredEvents.map((item: any, index: any) => (
                                <EventCard item={item} key={index} />
                            )) 
                            : 
                            <p>No Events Available!</p>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventPage;
