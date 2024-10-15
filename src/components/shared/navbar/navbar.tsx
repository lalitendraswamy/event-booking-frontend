
import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { IoBagHandle } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import './navbar.css';

const EventNavbar: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Navbar expand="lg" id='navbar-container'>
                <div className='d-flex'>
                <Navbar.Brand href="#home" className='logo-container' style={{color:"whitesmoke"}}>BLP events</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto navbar-items" >
                        <Nav.Link href="/"  style={{color:"whitesmoke"}}>Home</Nav.Link>
                        <Nav.Link href="/events"  style={{color:"whitesmoke"}}>Events</Nav.Link>                      
                        <Nav.Link href="/my-orders"  style={{color:"whitesmoke"}}>My orders</Nav.Link>
                        <Nav.Link href="/contact"  style={{color:"whitesmoke"}}>Contact</Nav.Link>
                        <Nav.Link href="/add-event"  style={{color:"whitesmoke"}}>Add Event</Nav.Link>
                        <Nav.Link href="/add-user"  style={{color:"whitesmoke"}}>Add User</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </div>
                <Nav.Link onClick={handleShow}>
                    <img src="https://cdn.dnaindia.com/sites/default/files/2024/10/13/2657411-image-2024-10-13t181657.151.jpg?im=FitAndFill=(1200,900)" alt="Profile" className="profile-img" />
                </Nav.Link>
            </Navbar>

        {/* Sidebar for Profile Information */}
            <div className={`sidebar ${showModal ? 'show' : ''}`}>
                <div className="sidebar-content">
                    <div className='profile-container'>
                        <div >
                        <p className='m-0'>Hey!</p>
                        <p className='m-0'>Edit Your Profile &gt; </p>
                        </div>
                       <img src="https://cdn.dnaindia.com/sites/default/files/2024/10/13/2657411-image-2024-10-13t181657.151.jpg?im=FitAndFill=(1200,900)" alt="Profile" className="profile-img" />
                    </div>
                    <div className='mb-2'>
                    <h5 className='order-heading'>Name: John Doe</h5>
                    <p>Email: johndoe@example.com</p>
                    </div>
                    <div className='orders-container'>
                        <IoBagHandle className='order-icon'/>
                        <div>
                            <h5 className='order-heading'>Your Orders</h5>
                            <p className='order-text'>View all your booking & purchese</p>
                        </div>
                    </div>
                    <div className='orders-container'>
                        <BiSolidMessageSquareDetail className='order-icon' />
                        <div>
                            <h5 className='order-heading'>Help & Support</h5>
                            <p className='order-text'>We will get back to you</p>
                        </div>
                    </div>
                    <div className='profile-container'>
                       <button className='btn btn-primary'>Sigout</button>
                       <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventNavbar;

