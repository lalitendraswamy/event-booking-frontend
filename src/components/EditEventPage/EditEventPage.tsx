import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer/eventsFooter";
import "../AddEventPage/add-event.css";
import { EventService } from "../../services/event.service";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getEventById } from "../../redux/features/authentication/EventSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const service = new EventService();

interface EventFormValues {
  eventName: string;
  description: string;
  eventDateTime: string;
  duration: number | undefined;
  totalTickets: number | undefined;
  location: string;
  averageRating: number | undefined;
  organizerName: string;
  organizerImage: string;
  imageUrl: string;
  ticketPrice: number | undefined;
}

const validationSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  description: Yup.string().required("Description is required"),
  eventDateTime: Yup.string().required("Event Date and Time are required"),
  duration: Yup.number()
    .min(0, "Duration must be greater than or equal to 0")
    .required("Duration is required"),
  totalTickets: Yup.number()
    .min(1, "Total Tickets must be at least 1")
    .required("Total Tickets are required"),
  location: Yup.string().required("Location is required"),
  averageRating: Yup.number()
    .min(0, "Average Rating must be at least 0")
    .max(5, "Average Rating cannot exceed 5")
    .required("Average Rating is required"),
  organizerName: Yup.string().required("Organizer Name is required"),
  organizerImage: Yup.string()
    .url("Invalid URL")
    .required("Organizer Image URL is required"),
  imageUrl: Yup.string()
    .url("Invalid URL")
    .required("Event Image URL is required"),
  ticketPrice: Yup.number()
    .min(0, "Ticket Price must be greater than or equal to 0")
    .required("Ticket Price is required"),
});

const EditEventPage = () => {
  const eventId = useParams().id;
  const { eachEvent } = useSelector((state: any) => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<EventFormValues | null>(null);

  useEffect(() => {
    dispatch<any>(getEventById(eventId!));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (eachEvent) {
      setInitialValues({
        eventName: eachEvent.eventName,
        description: eachEvent.description,
        eventDateTime: eachEvent.eventDateTime,
        duration: eachEvent.duration ? Number(eachEvent.duration) : undefined,
        totalTickets: eachEvent.totalTickets ? Number(eachEvent.totalTickets) : undefined,
        location: eachEvent.location,
        averageRating: eachEvent.averageRating ? Number(eachEvent.averageRating) : undefined,
        organizerName: eachEvent.organizerName,
        organizerImage: eachEvent.organizerImage,
        imageUrl: eachEvent.imageUrl,
        ticketPrice: eachEvent.ticketPrice ? Number(eachEvent.ticketPrice) : undefined,
      });
    }
  }, [eachEvent]);

  const updateEvent = async (values: EventFormValues) => {
    console.log("Form data:", values);
    console.log("id", eachEvent.eventId);
    const response = await service.updateEvent(eachEvent.eventId, values);
    dispatch<any>(getAllEvents());
    console.log('upd_res', response);
    navigate(`/events/${eventId}`);
  };

  return (
    <>
      <Navbar />
      <div className="event-container mt-5">
        <h2 className="event-heading">Event Registration</h2>
        {initialValues ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateEvent}
          >
            {() => (
              <Form>
                <div>
                  <label className="event-label" htmlFor="eventName">
                    Event Name
                  </label>
                  <Field
                    className="event-input"
                    type="text"
                    id="eventName"
                    name="eventName"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="eventName"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="description">
                    Description
                  </label>
                  <Field
                    className="event-textarea"
                    as="textarea"
                    id="description"
                    name="description"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="description"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="eventDateTime">
                    Event Date and Time
                  </label>
                  <Field
                    className="event-input"
                    type="datetime-local"
                    id="eventDateTime"
                    name="eventDateTime"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="eventDateTime"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="duration">
                    Duration (hours)
                  </label>
                  <Field
                    className="event-input"
                    type="number"
                    id="duration"
                    name="duration"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="duration"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="totalTickets">
                    Total Tickets
                  </label>
                  <Field
                    className="event-input"
                    type="number"
                    id="totalTickets"
                    name="totalTickets"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="totalTickets"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="location">
                    Location
                  </label>
                  <Field
                    className="event-input"
                    type="text"
                    id="location"
                    name="location"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="location"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="averageRating">
                    Average Rating
                  </label>
                  <Field
                    className="event-input"
                    type="number"
                    id="averageRating"
                    name="averageRating"
                    step="0.1"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="averageRating"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="organizerName">
                    Organizer Name
                  </label>
                  <Field
                    className="event-input"
                    type="text"
                    id="organizerName"
                    name="organizerName"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="organizerName"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="organizerImage">
                    Organizer Image URL
                  </label>
                  <Field
                    className="event-input"
                    type="text"
                    id="organizerImage"
                    name="organizerImage"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="organizerImage"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="imageUrl">
                    Event Image URL
                  </label>
                  <Field
                    className="event-input"
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="imageUrl"
                    component="div"
                  />
                </div>

                <div>
                  <label className="event-label" htmlFor="ticketPrice">
                    Ticket Price
                  </label>
                  <Field
                    className="event-input"
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="ticketPrice"
                    component="div"
                  />
                </div>
                <div className="event-button-container">
                  <button className="event-button" type="submit">
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};   

export default EditEventPage;
