import { useEffect, useState } from "react";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer/eventsFooter";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/features/authentication/EventSlice";
import { EventFilters } from "../filtersComponents/filtersComponent";
import { EventCard } from "../EventCard/eventCard";
import "./admin-events.css"
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import Spinner from "../shared/spinner/spinner";
import AdminNav from "../shared/adminNav/adminNav";

const EventPage = () => {
  const { events, loading } = useSelector((s: any) => s.events);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);

  useEffect(() => {
    dispatch<any>(getAllEvents());
  }, []);

  const navigate = useNavigate();
  let [filteredEvents, setFilteredEvents] = useState(events);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  if(!filteredEvents){
    filteredEvents=[]
  }
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredEvents(events); // Update filteredEvents when events change
  }, [events]);

  return (


      <div>
        <Navbar />
        <div className="admin-bg p-3">
          <AdminNav />
          <div className="admin-content">

          <>
      
      <div className="event-page-container d-flex">
        
        <div className="d-flex flex-column">
         

          {loading ? (
            Spinner()
          ) : (
            <div className="filtered-data-container">
              {currentEvents.length > 0 ? (
                currentEvents.map((item: any, index: any) => (
                  <EventCard item={item} key={index} />
                ))
              ) : (
                <p style={{ fontSize: "50px", color: "#0056B3" }}>
                  No Events Available!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pagination-controls mb-3">
        {Array.from(
          { length: Math.ceil(filteredEvents.length / eventsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      </>

          </div>
         
        </div>
        <Footer />
      </div>
   
  );
};

export default EventPage;
