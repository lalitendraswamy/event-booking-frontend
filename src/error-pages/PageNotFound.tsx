// App.tsx
import React from 'react';
import ErrorPage from './ErrorPage';
import Navbar from '../components/shared/navbar/navbar'
import Footer from '../components/shared/footer/eventsFooter'

const Page404: React.FC = () => {
    // Simulate an error for demonstration purposes
    const errorCode = 404; // Example error code
    const errorMessage = "The requested page could not be found."; // Additional info

    return (
        <div>
            {/* Replace with your routing logic */}
            <Navbar/>
            <ErrorPage errorCode={errorCode} errorMessage={errorMessage} />
            <Footer/>
        </div>
    );
};

export default Page404;
