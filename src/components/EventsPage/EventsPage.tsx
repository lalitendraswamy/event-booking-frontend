import { useEffect, useState } from "react";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer/eventsFooter";
import { EventService } from "../../services/event.service";
import { EventFilters } from "../filtersComponents/filtersComponent";
import { EventCard } from "../EventCard/eventCard";
import "./events-page.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/spinner/spinner";

const EventPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    limit: 6, // Limit of events per page
    minTicketPrice: 0,
    maxTicketPrice: 0,
    page: 1, // Start with the first page
  });
  const service = new EventService();
  
  const totalPages = Math.ceil(eventsCount / filters.limit);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await service.getAllEvents(filters);
        if(data){
            setEvents(data.events||[]);
        setEventsCount(data.totalItems||0);
        }else{
            setEvents([]);
        setEventsCount(0);
        }
        
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    setFilters({...filters, page:newPage});
  };

  return (
    <>
      <Navbar />
      <div className="event-page-container d-flex">
        <EventFilters events={events} setFilteredEvents={setEvents} setFilters={setFilters} />
        <div className="d-flex flex-column">
          {false ? (
            Spinner()
          ) : (
            <div className="filtered-data-container">
              {events.length > 0 ? (
                events.map((item: any, index: any) => (
                  <EventCard item={item} key={index} />
                ))
              ) : (
                <p style={{ fontSize: "50px", color: "#0056B3" }} className="no-events-available">
                  No Events Available!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages && (<div className="pagination-controls d-flex justify-content-center">
        <button
          className="page-btn"
          disabled={filters.page === 1}
          onClick={() => handlePageChange(filters.page - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`page-btn ${filters.page === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-btn"
          disabled={filters.page === totalPages}
          onClick={() => handlePageChange(filters.page + 1)}
        >
          Next
        </button>
      </div>)}
      
      <Footer />
    </>
  );
};

export default EventPage;
