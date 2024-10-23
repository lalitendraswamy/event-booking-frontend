import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer/eventsFooter";
import { useDispatch } from "react-redux";
import { addEvent } from "../../redux/features/authentication/EventSlice";
import "./add-event.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AdminNav from "../shared/adminNav/adminNav";
 
interface EventFormValues {
  eventName: string;
  description: string;
  eventDateTime: string;
  category:string;
  duration: number; // Changed to number (no undefined)
  totalTickets: number; // Changed to number (no undefined)
  location: string;
  organizerName: string;
  organizerImage: string;
  imageUrl: string;
  ticketPrice: number; // Changed to number (no undefined)
}
 
const initialValues: EventFormValues = {
  eventName: "",
  description: "",
  eventDateTime: new Date().toISOString().split("T")[0],
  category:"",
  duration: 0, // Initialized to 0 instead of undefined
  totalTickets: 0, // Initialized to 0 instead of undefined
  location: "",
  organizerName: "",
  organizerImage: "",
  imageUrl: "",
  ticketPrice: 0, // Initialized to 0 instead of undefined
};

const currentDateTime = new Date().toISOString();
 
const validationSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  description: Yup.string().required("Description is required"),
  eventDateTime: Yup.string()
  .required("Event Date and Time are required")
  .test('is-future', 'Event Date and Time must be in the future', function(value) {
    const { allowPastDates } = this.parent; // Get the value of allowPastDates
    if (allowPastDates) return true; // If past dates are allowed, skip validation
    return value ? new Date(value) >= new Date(currentDateTime) : false;
  }),
  category:Yup.string().required("category required"),
  duration: Yup.number()
    .min(0, "Duration must be greater than or equal to 0")
    .required("Duration is required"),
  totalTickets: Yup.number()
    .min(1, "Total Tickets must be at least 1")
    .required("Total Tickets are required"),
  location: Yup.string().required("Location is required"),
 
  organizerName: Yup.string().required("Organizer Name is required"),
 organizerImage: Yup.mixed()
    .required("Organizer image is required"),
  ticketPrice: Yup.number()
    .min(0, "Ticket Price must be greater than or equal to 0")
    .required("Ticket Price is required"),
});
 
const EventForm = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
 
  const handleSubmit = (values: any,{ resetForm }: { resetForm: () => void }) => {
    dispatch<any>(addEvent(values));
    toast.success("Event added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

   
    console.log("Form data:", values);
    resetForm();
  };
 
  return (
 
 
      <div>
      <Navbar/>
      <div className='admin-bg p-3'>
       <AdminNav/>
        <div className='admin-content'>
        <div className="event-container">
        <h2 className="event-heading">Event Registration</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <label className="event-label" htmlFor="eventName">
                    Event Name
                  </label>
                  <Field
                    className="event-input"
                    type="text"
                    id="eventName"
                    name="eventName"
                  />
                  <ErrorMessage className="event-error" name="eventName" component="div" />
                </div>
                <div className="col-md-6">
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
              </div>
         
              <div className="row">
                <div className="col-md-6">
                  <label className="event-label" htmlFor="eventDateTime">
                    Event Date and Time
                  </label>
                  <Field
                    className="event-input"
                    type="datetime-local"
                    id="eventDateTime"
                    name="eventDateTime"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <ErrorMessage
                    className="event-error"
                    name="eventDateTime"
                    component="div"
                  />
                </div>
         
                <div className="col-md-6">
                  <label className="event-label" htmlFor="category">
                    Category
                  </label>
                  <Field
                    className="event-input"
                    type="text"
                    id="category"
                    name="category"
                  />
                  <ErrorMessage
                    className="event-error"
                    name="category"
                    component="div"
                  />
                </div>
              </div>
         
              <div className="row">
                <div className="col-md-6">
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
         
                <div className="col-md-6">
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
              </div>
         
              <div className="row">
                <div className="col-md-6">
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
         
                <div className="col-md-6">
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
                <div className="col-md-6">
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
 
                <div className="col-md-6">
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
 
              </div>
         
           
         
              <div className="row">
               
         
                <div className="col-md-6">
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
              </div>
         
              <div className="row">
                <div className="col-md-12 text-center">
                  <button className="event-button" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
         
          )}
        </Formik>
      </div>
        </div>
      </div>
    <Footer/>
    <ToastContainer/>
    </div>
 
   
  );
};
 
export default EventForm;