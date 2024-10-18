import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

import './contact-us.css';
import EventNavbar from '../shared/navbar/navbar';
import EventsFooter from '../shared/footer/eventsFooter';
import { useNavigate } from 'react-router-dom';

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  contactNumber: Yup.string().matches(/^[0-9]{10}$/, 'Must be a 10-digit number').required('Required'),
  issueDescription: Yup.string().min(10, 'Must be at least 10 characters').required('Required'),
});

const ContactUs: React.FC = () => {
  const initialValues = {
    email: '',
    contactNumber: '',
    issueDescription: '',
  };

  const navigate=useNavigate();

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.9,
    },
  };

  const socialIconVariants = {
    hover: { scale: 1.3, transition: { type: 'spring', stiffness: 300 } },
  };

  const handleSubmit = (values: any) => {
    console.log('Form Submitted:', values);
    alert('Form submitted successfully!');
    navigate('/')

  };

  return (
    <div>
        <EventNavbar />
    <div className='d-flex contact-us-container'>
       <motion.div
      className="contact-container m-5 d-flex flex-column h-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

        <h2>Connect with Us</h2>
        <h1 className='logo-container'>BLP events</h1>
        <div className='align-items-container'>
            <p className='contact-us-email'>Email: <span>blpenvents@gmail.com</span></p>
            <p className='contact-us-email'>Contact: <span>+91 99988887771</span></p>
        </div>
       
      <motion.div className="contact-container-social-icons">
        <motion.a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants} 
        >
          <FaFacebook size={30} />
        </motion.a>
        <motion.a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants}
        >
          <FaTwitter size={30} />
        </motion.a>
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants}
        >
          <FaInstagram size={30} />
        </motion.a>
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={socialIconVariants}
        >
          <FaLinkedin size={30} />
        </motion.a>
      </motion.div>

      <motion.p
        className="contact-container-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1 } }}
      >
        Follow us on social media for updates and more! We're active on Facebook, Twitter, Instagram, and LinkedIn.
      </motion.p>
        </motion.div>

   
    <motion.div
      className="contact-container m-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
        <div>
      <h2>We Will Contact Us</h2>
      <motion.p>
        If you're experiencing any issues or have any questions, please fill out the form below. We will get back to you as soon as possible!
      </motion.p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="contact-container-form">
            <div className="contact-container-field">
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" placeholder="Your email" />
              <ErrorMessage name="email" component="div" className="contact-container-error" />
            </div>

            <div className="contact-container-field">
              <label htmlFor="contactNumber">Contact Number:</label>
              <Field name="contactNumber" type="tel" placeholder="Your contact number" />
              <ErrorMessage name="contactNumber" component="div" className="contact-container-error" />
            </div>

            <div className="contact-container-field">
              <label htmlFor="issueDescription">Issue Description:</label>
              <Field
                name="issueDescription"
                as="textarea"
                placeholder="Describe your issue"
                rows={5}
              />
              <ErrorMessage name="issueDescription" component="div" className="contact-container-error" />
            </div>

            <motion.button
              type="submit"
              className="contact-container-submit-btn"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Submit
            </motion.button>
          </Form>
        )}
      </Formik>
      </div>
     
    </motion.div>
    </div>
    <EventsFooter />
    </div>
  );
};

export default ContactUs;
