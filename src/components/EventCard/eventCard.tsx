import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { EventService } from "../../services/event.service";
import { getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../redux/features/authentication/EventSlice";
import { Modal, Button } from "react-bootstrap";
import "./eventCard.css"

const convertDateTimeToNormal = (dateTime: string): any => {
  const date = new Date(dateTime);
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
};

export const EventCard = ({ item }: any) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const service = new EventService();
  const dispatch = useDispatch();

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleShowModal = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEventId(null);
  };

  const handleDelete = async () => {
    if (selectedEventId) {
      await service.deleteEvent(selectedEventId);
      dispatch<any>(getAllEvents());
      setShowModal(false);
      navigate('/admin/events');
    }
  };

  // Check if the current path includes "/admin/events"
  const isAdminPath = location.pathname.includes("/admin/events");

  return (
    <>
      <div className="filtered-item">
        <img
          src={item.imageUrl}
          alt={item.eventName}
          width="100"
          className="filtered-item-img"
        />
        <h5 className="mt-2">{item.eventName}</h5>
        <p>{convertDateTimeToNormal(item.eventDateTime)}</p>
      
        <p className="">
            {item.location}
          </p>

          <p className="">
            {item.category}
          </p>
          
     
            <p> &#8377;{item.ticketPrice} onwards </p>
        <div className="view-container">
         
          {isAdminPath && ( // Use isAdminPath to conditionally render buttons
            <>
              <button
                onClick={() => navigate(`/edit-event/${item.eventId}`)}
                className="admin-event-card-button"
              >
                <MdModeEdit className="order-icon" />
              </button>
              <button
                onClick={() => handleShowModal(item.eventId)}
                className="admin-event-card-button"
              >
                <RiDeleteBinFill className="order-icon" />
              </button>
            </>
          )}

          <Link
            to={`/events/${item.eventId}`}
            className="underline-none"
            key={item.eventId}
          >
            <button className="btn btn-primary view">View</button>
          </Link>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header className="modal-header-custom" closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <p>Are you sure you want to delete this event?</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className="btn-custom-confirm" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
  );
};