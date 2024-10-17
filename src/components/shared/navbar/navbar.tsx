
import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { clearAllCookies } from '../../../utils/cookieUtils';
import { useSelector, UseSelector } from 'react-redux';
import { IoBagHandle } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { GiSelfLove } from "react-icons/gi";
import { useNavigate , Link} from 'react-router-dom';
import profileImg from "../../../assets/images/vector-flat-illustration-grayscale-avatar-600nw-2264922221.webp";

import './navbar.css';

const EventNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate=useNavigate();
    const {loginUser} = useSelector((state:any)=>state.users);
    console.log(loginUser,profileImg);
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
                {(loginUser.userImageUrl === undefined) ? <img src={profileImg} alt="Profile" className="profile-img-nav"/>:
                    <img src={loginUser.userImageUrl} alt="Profile" className="profile-img-nav" />}
                </Nav.Link>
            </Navbar>

        {/* Sidebar for Profile Information */}   
            <div className={`sidebar ${showModal ? 'show' : ''}`}>
                <div className="sidebar-content">
                    <div className='profile-data'>
                    <div className='profile-container'>
                    {(loginUser.userImageUrl === undefined) ? <img src={profileImg} alt="Profile" className="profile-img"/>:
                    <img src={loginUser.userImageUrl} alt="Profile" className="profile-img" />}
                    </div>
                    <div className='mb-2'>
                    <h5 className='order-heading'>{loginUser.username}</h5>
                    <p>Role: {loginUser.role}</p>
                    </div>
                    </div>
                    <div className='orders-container mt-3'>
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
                    <Link to="/favorite-event" className='text-button-underline-none'><div className='orders-container'>
                        <GiSelfLove className='order-icon' />
                        <div>
                            <h5 className='order-heading'>Favourites</h5>
                            <p className='order-text'>My Fovourie Events</p>
                        </div>
                    </div></Link>
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

