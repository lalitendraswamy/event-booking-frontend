import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './add-event.css'; 

interface EventFormValues {
    eventName: string;
    description: string;
    eventDateTime: string;
    duration: number|undefined;
    totalTickets: number|undefined;
    location: string;
    averageRating: number|undefined;
    organizerName: string;
    organizerImage: string;
    imageUrl: string;
    ticketPrice: number|undefined;
}

const initialValues: EventFormValues = {
    eventName: '',
    description: '',
    eventDateTime: '',
    duration: undefined,
    totalTickets: undefined,
    location: '',
    averageRating: undefined,
    organizerName: '',
    organizerImage: '',
    imageUrl: '',
    ticketPrice: undefined,
};

const validationSchema = Yup.object({
    eventName: Yup.string().required('Event Name is required'),
    description: Yup.string().required('Description is required'),
    eventDateTime: Yup.string().required('Event Date and Time are required'),
    duration: Yup.number().min(0, 'Duration must be greater than or equal to 0').required('Duration is required'),
    totalTickets: Yup.number().min(1, 'Total Tickets must be at least 1').required('Total Tickets are required'),
    location: Yup.string().required('Location is required'),
    averageRating: Yup.number().min(0, 'Average Rating must be at least 0').max(5, 'Average Rating cannot exceed 5').required('Average Rating is required'),
    organizerName: Yup.string().required('Organizer Name is required'),
    organizerImage: Yup.string().url('Invalid URL').required('Organizer Image URL is required'),
    imageUrl: Yup.string().url('Invalid URL').required('Event Image URL is required'),
    ticketPrice: Yup.number().min(0, 'Ticket Price must be greater than or equal to 0').required('Ticket Price is required'),
});

const EventForm = () => {
    const handleSubmit = (values: EventFormValues) => {
        console.log('Form data:', values);
    };

    return (
        <div className="event-container mt-5">
            <h1 className="event-heading">Event Registration</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div>
                            <label className="event-label" htmlFor="eventName">Event Name</label>
                            <Field className="event-input" type="text" id="eventName" name="eventName" />
                            <ErrorMessage className="event-error" name="eventName" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="description">Description</label>
                            <Field className="event-textarea" as="textarea" id="description" name="description" />
                            <ErrorMessage className="event-error" name="description" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="eventDateTime">Event Date and Time</label>
                            <Field className="event-input" type="datetime-local" id="eventDateTime" name="eventDateTime" />
                            <ErrorMessage className="event-error" name="eventDateTime" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="duration">Duration (minutes)</label>
                            <Field className="event-input" type="number" id="duration" name="duration" />
                            <ErrorMessage className="event-error" name="duration" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="totalTickets">Total Tickets</label>
                            <Field className="event-input" type="number" id="totalTickets" name="totalTickets" />
                            <ErrorMessage className="event-error" name="totalTickets" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="location">Location</label>
                            <Field className="event-input" type="text" id="location" name="location" />
                            <ErrorMessage className="event-error" name="location" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="averageRating">Average Rating</label>
                            <Field className="event-input" type="number" id="averageRating" name="averageRating" step="0.1" />
                            <ErrorMessage className="event-error" name="averageRating" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="organizerName">Organizer Name</label>
                            <Field className="event-input" type="text" id="organizerName" name="organizerName" />
                            <ErrorMessage className="event-error" name="organizerName" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="organizerImage">Organizer Image URL</label>
                            <Field className="event-input" type="text" id="organizerImage" name="organizerImage" />
                            <ErrorMessage className="event-error" name="organizerImage" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="imageUrl">Event Image URL</label>
                            <Field className="event-input" type="text" id="imageUrl" name="imageUrl" />
                            <ErrorMessage className="event-error" name="imageUrl" component="div" />
                        </div>
                        
                        <div>
                            <label className="event-label" htmlFor="ticketPrice">Ticket Price</label>
                            <Field className="event-input" type="number" id="ticketPrice" name="ticketPrice" />
                            <ErrorMessage className="event-error" name="ticketPrice" component="div" />
                        </div>
                        <div className='event-button-container'>
                           <button className="event-button" type="submit">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EventForm;

