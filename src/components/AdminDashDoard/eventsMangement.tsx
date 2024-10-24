import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import EventNavbar from '../shared/navbar/navbar';
import EventsFooter from '../shared/footer/eventsFooter';
import { Modal } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEvents, getEventById, addEvent, deleteEvent, updateEvent } from "../../redux/features/authentication/EventSlice";
import 'react-toastify/dist/ReactToastify.css';
import "./eventsManegement.css";

const EventManagement: React.FC = () => {
    const [editIndex, setEditIndex] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const { eachEvent, events } = useSelector((state: any) => state.events);
    const dispatch = useDispatch();
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const validationSchema = Yup.object().shape({
        eventName: Yup.string().required("Event Name is required"),
        description: Yup.string().required("Description is required"),
        eventDateTime: Yup.string().required("Event Date and Time is required"),
        category: Yup.string().required("Category is required"),
        duration: Yup.string().required("Duration is required"),
        totalTickets: Yup.number().required("Total Tickets is required").positive().integer(),
        location: Yup.string().required("Location is required"),
        organizerName: Yup.string().required("Organizer Name is required"),
        // organizerImage: Yup.mixed().required("Organizer Image is required"),
        organizerImage: Yup.string().url("Invalid URL format").required("Image URL is required"),
        imageUrl: Yup.string().url("Invalid URL format").required("Image URL is required"),
        ticketPrice: Yup.number().required("Ticket Price is required").positive(),
    });

    const handleSubmit = (values: any) => {
        const eventIsThere = events.filter((event: any) => event.eventId === values.editIndex);
        if (eventIsThere === true || editIndex !== null) {
            dispatch<any>(updateEvent({ eventId: editIndex, values: values }));
            toast.info("Event updated successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            dispatch<any>(addEvent(values));
            toast.success("Event added successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        resetForm();
        setShowModal(false);
    };

    const handleEdit = (index: string) => {
        setEditIndex(index);
        dispatch<any>(getEventById(index)).then(() => {
            setShowModal(true);
        });
    };

    const handleDelete = async (index: string) => {

        await dispatch<any>(deleteEvent(index));
        toast.error("Event deleted successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

    };

    const resetForm = () => {
        setEditIndex(null);
    };

    const filteredEvents = events.filter((event: any) =>
        event.eventName.includes(searchTerm) || event.description.includes(searchTerm)
    );

    // useEffect(() => {

    // }, [dispatch, handleDelete, handleSubmit, handleEdit]);

    useEffect(() => {
        dispatch<any>(getAllEvents());
    }, []);

    return (
        <div>
            <EventNavbar />
            <div className="event-management-container h-100">
                <div className='search-add-container mb-2'>
                    <div className="search-container">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="book-tickets-btn ms-2" onClick={handleShowModal}>
                        <MdAdd /> Add Event
                    </button>

                </div>
                <Modal show={showModal} onHide={handleCloseModal} className='confirmation-popup popup-container w-100' centered>
                    <Modal.Header className="modal-header-custom w-200" closeButton>
                        <Modal.Title style={{ color: "#0056b3" }}>{editIndex !== null ? 'Edit Event' : 'Add Event'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-custom">
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <Formik
                                    initialValues={{
                                        eventName: editIndex !== null ? eachEvent.eventName : '',
                                        description: editIndex !== null ? eachEvent.description : '',
                                        eventDateTime: editIndex !== null ? eachEvent.eventDateTime : '',
                                        category: editIndex !== null ? eachEvent.category : '',
                                        duration: editIndex !== null ? eachEvent.duration : '',
                                        totalTickets: editIndex !== null ? eachEvent.totalTickets : 0,
                                        location: editIndex !== null ? eachEvent.location : '',
                                        organizerName: editIndex !== null ? eachEvent.organizerName : '',
                                        organizerImage: null,
                                        imageUrl: editIndex !== null ? eachEvent.imageUrl : '',
                                        ticketPrice: editIndex !== null ? eachEvent.ticketPrice : 0,
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ setFieldValue }) => (
                                        <Form>

                                            <div className='event-input-conatiner'>
                                                <label>Event Name</label>
                                                <Field name="eventName" />
                                                <ErrorMessage name="eventName" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Description</label>
                                                <Field as="textarea" name="description" />
                                                <ErrorMessage name="description" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Event Date & Time</label>
                                                <Field type="datetime-local" name="eventDateTime" min={new Date().toISOString().slice(0, 16)} />
                                                <ErrorMessage name="eventDateTime" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Category</label>
                                                <Field name="category" />
                                                <ErrorMessage name="category" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Duration</label>
                                                <Field name="duration" />
                                                <ErrorMessage name="duration" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Total Tickets</label>
                                                <Field type="number" name="totalTickets" />
                                                <ErrorMessage name="totalTickets" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Location</label>
                                                <Field name="location" />
                                                <ErrorMessage name="location" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Organizer Name</label>
                                                <Field name="organizerName" />
                                                <ErrorMessage name="organizerName" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Organizer Image</label>
                                                <Field name="organizerImage" />
                                                <ErrorMessage name="organizerImage" component="div" className="error" />
                                            </div>
                                            {/* <div className='event-input-conatiner'>
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
                                    </div> */}
                                            <div className='event-input-conatiner'>
                                                <label>Image URL</label>
                                                <Field name="imageUrl" />
                                                <ErrorMessage name="imageUrl" component="div" className="error" />
                                            </div>
                                            <div className='event-input-conatiner'>
                                                <label>Ticket Price</label>
                                                <Field type="number" name="ticketPrice" />
                                                <ErrorMessage name="ticketPrice" component="div" className="error" />
                                            </div>
                                            <button className="book-tickets-btn ms-2" type="submit">{editIndex !== null ? 'Update Event' : 'Add Event'}</button>
                                            <button type="button" onClick={resetForm} className="book-tickets-btn ms-2">Cancel</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

                <h3>Event List</h3>
                {/* {loading ? (
      Spinner() 
    ) : ( */}
                <div className='w-100 wid'>
                    {events.length === 0 ? (
                        <div className='d-flex justify-content-center align-items-center '>
                            <h2 style={{ color: "#0056b3" }}>No Events</h2>
                        </div>
                    ) : (
                        <>
                            {filteredEvents.map((event: any) => (
                                <div key={event.eventId} className='events-data-container'>
                                    <div className='events'>
                                        <div className='event-data-container-admin'>
                                            <h1 className='event-data-container-heading'>{event.eventName}</h1>
                                            <p className='event-data-container-description'>{event.category}</p>
                                            <p className='event-data-container-description'>{event.location}</p>
                                        </div>
                                        <div className="button-group">
                                            <button className='btn btn-primary' onClick={() => handleEdit(event.eventId)}>
                                                <MdEdit />
                                            </button>
                                            <button className='btn btn-danger' onClick={() => handleDelete(event.eventId)}>
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </div>
                                    <hr className='hr-line' />
                                </div>
                            ))}
                        </>)}</div>
                <ToastContainer />
            </div>
            <EventsFooter />
        </div>
    );
};

export default EventManagement;
