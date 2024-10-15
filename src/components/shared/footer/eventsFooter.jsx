import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin,FaRegCopyright } from 'react-icons/fa';

import 'animate.css'; // Import Animate.css
import "./eventsFooter.css"; // Import your CSS file

const EventsFooter = () => {
    return (
        <div className="social-icons-container">
            <div className='logo-footer-container w-100'>
                <hr className='horizontal-line'/>
                    <h1 className='logo-container'>BLP events</h1>
                <hr className='horizontal-line'/>
            </div>
            <div>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaYoutube />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
        </a>
        </div>
        <p>Copyright 2024  <FaRegCopyright className='copy-right'/>  Bigtree Entertainment Pvt. Ltd. All Rights Reserved</p>
    </div>
    );
};

export default EventsFooter;
