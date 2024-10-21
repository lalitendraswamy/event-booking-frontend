import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { clearAllCookies,getCookie } from '../../../utils/cookieUtils';
import { IoBagHandle } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { GiSelfLove } from "react-icons/gi";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profileImg from "../../../assets/images/no-profile-image.webp";
import './navbar.css';

const EventNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { loginUser } = useSelector((state: any) => state.users);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleLogout = () => {
        clearAllCookies();
        // navigate('/login');
        const azureLogoutUrl = `https://login.microsoftonline.com/${
            process.env.REACT_APP_TENANT_ID
          }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
            "http://localhost:3000/login" // Set the login page after logout
          )}`;
       
          // Redirect to Azure AD logout URL
          window.location.href = azureLogoutUrl;
    }

    return (
        <>
            <Navbar expand="lg" id='navbar-container'>
                <div className='d-flex'>

                    <Navbar.Brand onClick={()=>navigate('/')} style={{"cursor":"pointer","color":"whitesmoke"}} className='logo-container' ><i>BLP_events</i></Navbar.Brand>
                    

                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto navbar-items" >
                        <Nav.Link  onClick={()=>navigate('/events')} style={{ color: getCookie('role')==='admin' ? "#FB8500" : "whitesmoke" }}                     >Events</Nav.Link>
                        <Nav.Link  onClick={()=>navigate('/my-orders')} style={{color:"whitesmoke"}}>My Orders</Nav.Link>
                        <Nav.Link  onClick={()=>navigate('/contact')} style={{color:"whitesmoke"}}>Contact Us</Nav.Link>
                        
                        {getCookie('role')==='admin'&&(<Nav.Link  onClick={()=>navigate('/users')}  style={{color:"#FB8500"}}>Users</Nav.Link>)}
                        
                        
                        
                    </Nav>
                </Navbar.Collapse>

                </div>
                <Nav.Link onClick={handleShow}>
                    <img 
                        src={loginUser.userImageUrl || profileImg} 
                        alt="Profile" 
                        className="profile-img-nav" 
                    />
                </Nav.Link>
            </Navbar>

            {/* Sidebar for Profile Information */}
            <div className={`sidebar ${showModal ? 'show' : ''}`}>
                <div className="sidebar-content">
                    <div >
                        <div className='profile-data'>
                        <div className='profile-container'>
                            <img 
                                src={loginUser.userImageUrl || profileImg} 
                                alt="Profile" 
                                className="profile-img" 
                            />
                        </div>
                        <div className='mb-2'>
                            <h5 className='order-heading'>{loginUser.username || 'User'}</h5>
                            <p>Role: <b className='ms-1' > {getCookie('role').toUpperCase() || 'User or Admin'}</b></p>
                        </div>
                        </div>
                        <div className='orders-container mt-3'>
                            <IoBagHandle className='order-icon' />
                            <div>
                                <h5 onClick={() => navigate('/my-orders')} className='order-heading'>Your Orders</h5>
                                <p className='order-text'>View all your bookings & purchases</p>
                            </div>
                        </div>
                        <Link to="/contact-us" className='text-button-underline-none'><div className='orders-container'>
                            <BiSolidMessageSquareDetail className='order-icon' />
                            <div>
                                <h5  onClick={() => navigate('/contact')} className='order-heading'>Help & Support</h5>
                                <p className='order-text'>We will get back to you</p>
                            </div>
                        </div></Link>
                        <Link to="/favorite-event" className='text-button-underline-none'>
                            <div className='orders-container'>
                                <GiSelfLove className='order-icon' />
                                <div>
                                    <h5 className='order-heading'>Favourites</h5>
                                    <p className='order-text'>My Favourite Events</p>
                                </div>
                            </div>
                        </Link>
                        <div className='profile-container'>
                            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventNavbar;
