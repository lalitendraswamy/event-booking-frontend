import React, { useState } from 'react';
import './order-item.css';
import QRimg from '../../../assets/images/qr-img.png';
import { cancelOrderThunk } from '../../../redux/features/authentication/OrderSlice';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import QRCode from 'react-qr-code';

interface QRCodeGeneratorProps {
  bookingId: string;
}

const convertDateTimeToNormal = (dateTime: string) => {
  const date = new Date(dateTime);
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return formatter.format(date);
};

export default function OrderItem({ order }: any) {
  const dispatch = useDispatch();
  const { bookingId, numberOfTickets } = order;
  const { eventName, imageUrl, location, eventDateTime, ticketPrice } = order.event;
  const formattedDateTime = convertDateTimeToNormal(eventDateTime);

  // State for showing/hiding confirmation modal
  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle cancel confirmation
  const handleCancelOrder = () => {
    dispatch<any>(cancelOrderThunk(bookingId));
    setShowModal(false); // Close the modal after cancel action
  };

  return (
    <>
      <li className="order-item-card p-3">
        <div className="order-info">
          <img src={imageUrl} alt="Event" />
          <div className="p-1">
            <h3>{eventName}</h3>
            <h6>Location: {location}</h6>
            <h6>Date: {formattedDateTime}</h6>
            <h6>Ticket Price: &#8377; {ticketPrice}</h6>
            <h6>Quantity: {numberOfTickets}</h6>
            <h6>
              Amount Paid:{' '}
              <b style={{ color: '#0056B3' }}>
                &#8377; {ticketPrice * numberOfTickets}
              </b>
            </h6>
            {order.status === 'cancelled' ? (
              <span className="text-danger">Ticket Cancelled</span>
            ) : (
              <button onClick={handleShowModal} className="btn btn-danger">
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className="order-ticket">
        {/* {bookingId ? (
          <>
           <QRCode value={bookingId} size={256} />
           <p>QR Code for Booking ID: {bookingId}</p>
          </>
      
      ) : (
        <p>Please provide a booking ID to generate the QR code.</p>
      )} */}
          <img src={QRimg} alt="QR Code" />
          <h6>Booking ID</h6>
          <p className="text-center">
            <b>{bookingId.toUpperCase()}</b>
          </p>
        </div>
      </li>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} className='confirmation-popup' centered>
        <Modal.Header className="modal-header-custom" closeButton>
          <Modal.Title>Cancel Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <p>Are you sure you want to cancel this booking?</p>
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
    </>
  );
}
