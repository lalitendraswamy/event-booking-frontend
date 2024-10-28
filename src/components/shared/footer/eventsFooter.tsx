import { FaFacebook, FaTwitter, FaLinkedin,FaRegCopyright} from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';
import { motion } from 'framer-motion';
import {  FaInstagram } from 'react-icons/fa';
import 'animate.css'; 
import "./eventsFooter.css"; 

const EventsFooter = () => {
    const socialIconVariants = {
        hover: {
            scale: 1.1,
            transition: { duration: 0.3 },
        },
        initial: { scale: 1 },
    };
    
    return (
        <div className="social-icons-container">
            <div className='logo-footer-container w-100'>
                <hr className='horizontal-line'/>
                    <h1 className='logo-container'>BLP Events</h1>
                <hr className='horizontal-line'/>
            </div>
            <div>
        <motion.div className="contact-container-social-icons">
        <motion.a
          href="https://www.youtube.com/@G7CRCloudDivision/playlists"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants} 
        >
          <BsYoutube size={30} />
        </motion.a>
        <motion.a
          href="https://x.com/G7CRtech"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants}
        >
          <FaTwitter size={30} />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/g7crtechnologies/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants}
        >
          <FaInstagram size={30} />
        </motion.a>
        <motion.a
          href="https://in.linkedin.com/company/g7cr-technologies"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants}
        >
          <FaLinkedin size={30} />
        </motion.a>
      </motion.div>
        </div>
        <p> <FaRegCopyright className='copy-right'/>copyright 2024, BLP Entertainments Pvt. Ltd. @all rights are reserved</p>
    </div>
    );
};

export default EventsFooter;
