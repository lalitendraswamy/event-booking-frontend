
import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { clearAllCookies } from '../../../utils/cookieUtils';

import { IoBagHandle } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { GiSelfLove } from "react-icons/gi";
import { Link,useNavigate } from 'react-router-dom';

import './navbar.css';

const EventNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate=useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleLogout=()=> {
        clearAllCookies();
        console.log("cookies cleared")
        navigate('/login')
    }

    return (
        <>
            <Navbar expand="lg" id='navbar-container'>
                <div className='d-flex'>
                <Navbar.Brand href="/" className='logo-container' style={{color:"whitesmoke"}}>BLP events</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto navbar-items" >
                        <Nav.Link href="/events"  style={{color:"whitesmoke"}}>Events</Nav.Link>
                        <Nav.Link href="/my-orders"  style={{color:"whitesmoke"}}>My Orders</Nav.Link>
                        <Nav.Link href="/add-user"  style={{color:"whitesmoke"}}>Add User</Nav.Link>
                        <Nav.Link href="/add-event"  style={{color:"whitesmoke"}}>Add Event</Nav.Link>
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

                        <div className='d-flex align-items-center' >
                        <p className='m-0'>Hey!</p>
                        
                        </div>
                       <img src="https://cdn.dnaindia.com/sites/default/files/2024/10/13/2657411-image-2024-10-13t181657.151.jpg?im=FitAndFill=(1200,900)" alt="Profile" className="profile-img" />
                    </div>
                    <div className='mb-2'>
                    <h5 className='order-heading'>John Doe</h5>
                    <p>Role: User or Admin</p>


                    </div>
                    <div className='orders-container'>
                        <IoBagHandle className='order-icon'/>
                        <div>
                            <h5 onClick={()=>navigate('/my-orders')} className='order-heading'>Your Orders</h5>
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
                    <div className='orders-container'>
                        <GiSelfLove className='order-icon' />
                        <div>
                            <h5 className='order-heading'>Favourites</h5>
                            <p className='order-text'>My Fovourie Events</p>
                        </div>
                    </div>
                    <div className='profile-container'>
                       <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                       <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventNavbar;

