import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import EventNavbar from '../shared/navbar/navbar';
import EventsFooter from '../shared/footer/eventsFooter';
import { Modal, Button } from 'react-bootstrap';
import "./eventsManegement.css"

interface Event {
    id: string;
    eventName: string;
    description: string;
    eventDateTime: string;
    category: string;
    duration: string;
    totalTickets: number;
    location: string;
    organizerName: string;
    organizerImage: File | null;
    imageUrl: string;
    ticketPrice: number;
}

const EventManagement: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle cancel confirmation
  const handleCancelOrder = () => {
    // dispatch<any>(cancelOrderThunk(bookingId));
    setShowModal(false); // Close the modal after cancel action
  };

    useEffect(() => {
        const defaultEvents = [
            {
                id: '1',
                eventName: 'Concert',
                description: 'Live concert featuring popular bands.',
                eventDateTime: '2024-10-30T20:00',
                category: 'Music',
                duration: '3 hours',
                totalTickets: 500,
                location: 'City Arena',
                organizerName: 'Event Org',
                organizerImage: null,
                imageUrl: 'https://example.com/concert.jpg',
                ticketPrice: 50,
            },
            // Add more default events if needed
        ];
        setEvents(defaultEvents);
    }, []);

    const validationSchema = Yup.object().shape({
        eventName: Yup.string().required("Event Name is required"),
        description: Yup.string().required("Description is required"),
        eventDateTime: Yup.string().required("Event Date and Time is required"),
        category: Yup.string().required("Category is required"),
        duration: Yup.string().required("Duration is required"),
        totalTickets: Yup.number().required("Total Tickets is required").positive().integer(),
        location: Yup.string().required("Location is required"),
        organizerName: Yup.string().required("Organizer Name is required"),
        organizerImage: Yup.mixed().required("Organizer Image is required"),
        imageUrl: Yup.string().url("Invalid URL format").required("Image URL is required"),
        ticketPrice: Yup.number().required("Ticket Price is required").positive(),
    });

    const handleSubmit = (values: any) => {
        const newEvent = { ...values, id: (events.length + 1).toString() };
        if (editIndex !== null) {
            const updatedEvents = [...events];
            updatedEvents[editIndex] = { ...newEvent, id: updatedEvents[editIndex].id }; // Preserve ID
            setEvents(updatedEvents);
        } else {
            setEvents([...events, newEvent]);
        }
        resetForm();
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setShowModal(true); // Open modal for editing
    };

    const handleDelete = (index: number) => {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
    };

    const resetForm = () => {
        setEditIndex(null);
        // setIsModalOpen(false); // Close modal
    };

    const filteredEvents = events.filter(event => 
        event.eventName.includes(searchTerm) || event.description.includes(searchTerm)
    );

    return (
        <div>
            <EventNavbar />
        <div className="event-management-container h-100">
            <h2>Event Management</h2>
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search by Event Name or Description" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="btn btn-primary" onClick={handleShowModal}>
                <MdAdd /> Add Event
            </button>

            <Modal show={showModal} onHide={handleCloseModal} className='confirmation-popup' centered>
        <Modal.Header className="modal-header-custom" closeButton>
          <Modal.Title>Cancel Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Formik
                            initialValues={{
                                eventName: editIndex !== null ? events[editIndex].eventName : '',
                                description: editIndex !== null ? events[editIndex].description : '',
                                eventDateTime: editIndex !== null ? events[editIndex].eventDateTime : '',
                                category: editIndex !== null ? events[editIndex].category : '',
                                duration: editIndex !== null ? events[editIndex].duration : '',
                                totalTickets: editIndex !== null ? events[editIndex].totalTickets : 0,
                                location: editIndex !== null ? events[editIndex].location : '',
                                organizerName: editIndex !== null ? events[editIndex].organizerName : '',
                                organizerImage: null,
                                imageUrl: editIndex !== null ? events[editIndex].imageUrl : '',
                                ticketPrice: editIndex !== null ? events[editIndex].ticketPrice : 0,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <h3>{editIndex !== null ? 'Edit Event' : 'Add Event'}</h3>
                                    <div>
                                        <label>Event Name</label>
                                        <Field name="eventName" />
                                        <ErrorMessage name="eventName" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <Field name="description" />
                                        <ErrorMessage name="description" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Event Date & Time</label>
                                        <Field type="datetime-local" name="eventDateTime" />
                                        <ErrorMessage name="eventDateTime" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Category</label>
                                        <Field name="category" />
                                        <ErrorMessage name="category" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Duration</label>
                                        <Field name="duration" />
                                        <ErrorMessage name="duration" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Total Tickets</label>
                                        <Field type="number" name="totalTickets" />
                                        <ErrorMessage name="totalTickets" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Location</label>
                                        <Field name="location" />
                                        <ErrorMessage name="location" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Organizer Name</label>
                                        <Field name="organizerName" />
                                        <ErrorMessage name="organizerName" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Organizer Image</label>
                                        <input
                                            type="file"
                                            onChange={(event) => {
                                                if (event.currentTarget.files) {
                                                    setFieldValue("organizerImage", event.currentTarget.files[0]);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="organizerImage" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Image URL</label>
                                        <Field name="imageUrl" />
                                        <ErrorMessage name="imageUrl" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Ticket Price</label>
                                        <Field type="number" name="ticketPrice" />
                                        <ErrorMessage name="ticketPrice" component="div" className="error" />
                                    </div>
                                    <button type="submit">{editIndex !== null ? 'Update Event' : 'Add Event'}</button>
                                    <button type="button" onClick={resetForm}>Cancel</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

                </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className="btn-custom-confirm" onClick={handleCancelOrder}>
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>

            <h3>Event List</h3>
            <ul>
                {filteredEvents.map((event, index) => (
                    <li key={event.id}>
                        <div>
                            {event.eventName} - {event.description} - {event.eventDateTime}
                            <div className="button-group">
                                <button className='btn btn-primary' onClick={()=>handleEdit(index)}>
                                    <MdEdit />
                                </button>
                                <button className='btn btn-danger' onClick={() => handleDelete(index)}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <EventsFooter />
        </div>
    );
};

export default EventManagement;
