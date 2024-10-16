import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer/eventsFooter";
import "../AddEventPage/add-event.css";

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

// Sample API data
const api_data = {
  eventName: "Music Festival 2024",
  description: "An amazing music festival featuring top artists.",
  eventDateTime: "2024-12-15T18:00:00",
  duration: "180", 
  totalTickets: "500",
  location: "Los Angeles, CA",
  averageRating: "4.5",
  organizerName: "XYZ Events",
  organizerImage: "https://example.com/images/xyz_events.jpg",
  imageUrl: "https://example.com/images/music_festival.jpg",
  ticketPrice: "75",
};

// Initial values derived from API data
const initialValues: EventFormValues = {
  eventName: api_data.eventName,
  description: api_data.description,
  eventDateTime: api_data.eventDateTime,
  duration: api_data.duration ? Number(api_data.duration) : undefined,
  totalTickets: api_data.totalTickets ? Number(api_data.totalTickets) : undefined,
  location: api_data.location,
  averageRating: api_data.averageRating ? Number(api_data.averageRating) : undefined,
  organizerName: api_data.organizerName,
  organizerImage: api_data.organizerImage,
  imageUrl: api_data.imageUrl,
  ticketPrice: api_data.ticketPrice ? Number(api_data.ticketPrice) : undefined,
};

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

  const updateEvent = (values: EventFormValues) => {
    console.log("Form data:", values);
    //api call to update an event


  };

  return (
    <>
      <Navbar />
      <div className="event-container mt-5">
        <h2 className="event-heading">Event Registration</h2>
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
      </div>
      <Footer />
    </>
  );
};

export default EditEventPage;
