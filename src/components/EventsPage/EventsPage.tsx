import { useEffect, useState} from "react";
import Navbar from '../shared/navbar/navbar';
import Footer from '../shared/footer/eventsFooter';
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/features/authentication/EventSlice";
import { EventFilters } from "../filtersComponents/filtersComponent";
import { EventCard } from "../EventCard/eventCard";
import "./events-page.css";

const EventPage = () => {
    const { events } = useSelector((s: any) => s.events)
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
    
    useEffect(() => {
        dispatch<any>(getAllEvents())
    },[])

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    

    return (
        <>
            <Navbar />
            <div className="event-page-container d-flex">
                <EventFilters />
                <div className="filtered-data-container">
                    { currentEvents.length> 0 ?
                        currentEvents.map((item:any, index:any) => (
                           <EventCard item = {item} key={index}  />
                        ))
                        :
                        <p>No Events Avaliable</p>
                    }

                </div>
            </div>
                    <div className="pagination-controls">
                        {Array.from(
                            { length: Math.ceil(events.length / eventsPerPage) },
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



