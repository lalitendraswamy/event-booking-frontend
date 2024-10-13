// // Navbar.tsx
// import React from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import './navbar.css';

// const EventNavbar = () => {
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Navbar.Brand href="#home">MyApp</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="ml-auto">
//                     <Nav.Link href="/">Home</Nav.Link>
//                     <Nav.Link href="/about">About</Nav.Link>
//                     <Nav.Link href="/services">Services</Nav.Link>
//                     <Nav.Link href="/contact">Contact</Nav.Link>
//                     <NavDropdown title="Profile" id="basic-nav-dropdown">
//                         <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
//                         <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
//                         <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
//                     </NavDropdown>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     );
// };

// export default EventNavbar;

// import React, { useState } from 'react';
// import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
// import './navbar.css';

// const EventNavbar: React.FC = () => {
//     const [showModal, setShowModal] = useState(false);

//     const handleClose = () => setShowModal(false);
//     const handleShow = () => setShowModal(true);

//     return (
//         <>
//             <Navbar bg="dark" variant="dark" expand="lg">
//                 <Navbar.Brand href="#home">MyApp</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ml-auto">
//                         <Nav.Link href="/">Home</Nav.Link>
//                         <Nav.Link href="/about">About</Nav.Link>
//                         <Nav.Link href="/services">Services</Nav.Link>
//                         <Nav.Link href="/contact">Contact</Nav.Link>
//                         <NavDropdown title={<img src="https://via.placeholder.com/30" alt="Profile" className="profile-img" />} id="basic-nav-dropdown">
//                             <NavDropdown.Item onClick={handleShow}>My Profile</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>



//             {/* Modal for Profile Information */}
//             <Modal show={showModal} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>User Profile</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <h5>Name: John Doe</h5>
//                     <p>Email: johndoe@example.com</p>
//                     <p>Role: User</p>
//                     <p>Joined: January 1, 2020</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default EventNavbar;


import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
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
                        <Nav.Link href="/about"  style={{color:"whitesmoke"}}>About</Nav.Link>
                        <Nav.Link href="/services"  style={{color:"whitesmoke"}}>Services</Nav.Link>
                        <Nav.Link href="/contact"  style={{color:"whitesmoke"}}>Contact</Nav.Link>
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
                    <h5>Name: John Doe</h5>
                    <p>Email: johndoe@example.com</p>
                    <p>Role: User</p>
                    <p>Joined: January 1, 2020</p>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </>
    );
};

export default EventNavbar;

