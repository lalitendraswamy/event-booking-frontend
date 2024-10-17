import { useEffect} from "react";
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
    
    useEffect(() => {
        dispatch<any>(getAllEvents())
    },[])

    return (
        <>
            <Navbar />
            <div className="event-page-container d-flex">
                <EventFilters />
                <div className="filtered-data-container">
                    { events.length> 0 ?
                        events.map((item:any, index:any) => (
                           <EventCard item = {item} key={index}  />
                        ))
                        :
                        <p>No Events Avaliable</p>
                    }
                </div>
            </div>
            <Footer />
        </>

    );
};

export default EventPage;



