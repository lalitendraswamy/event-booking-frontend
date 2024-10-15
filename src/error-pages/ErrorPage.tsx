import React from 'react';
import './error-page.css'; // Optional: Add styles
import ErrImg from '../../src/assets/images/error-page-img.png'

interface ErrorPageProps {
    errorCode: number;
    errorMessage?: string; // Optional additional message
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, errorMessage }) => {
    const renderContent = () => {
        switch (errorCode) {
            case 404:
                return {
                    title: "Oops! Page Not Found",
                    message: "The page you are looking for does not exist.",
                    suggestions: ["Go to Homepage"],
                };
            case 500:
                return {
                    title: "Internal Server Error",
                    message: "We’re having trouble processing your request.",
                    suggestions: ["Try Again Later", "Contact Support"],
                };
            case 400:
                return {
                    title: "Bad Request",
                    message: "Your request was invalid.",
                    suggestions: ["Check the URL", "Return to Previous Page"],
                };
            case 403:
                return {
                    title: "Access Denied",
                    message: "You don't have permission to view this page.",
                    suggestions: ["Login", "Contact Support"],
                };
            default:
                return {
                    title: "Error",
                    message: errorMessage || "An unexpected error occurred.",
                    suggestions: ["Go to Homepage", "Contact Support"],
                };
        }
    };

    const { title, message, suggestions } = renderContent();

    const handleSuggestionClick = (suggestion: string) => {
        switch (suggestion) {
            case "Go to Homepage":
                window.location.href = '/';
                break;
            case "Search for Events":
                window.location.href = '/search';
                break;
            case "Try Again Later":
                window.location.reload();
                break;
            case "Contact Support":
                window.location.href = '/support';
                break;
            case "Login":
                window.location.href = '/login';
                break;
            default:
                break;
        }
    };

    return (
        <section className="error-page">
            <img src={ErrImg} />
            <h1>{title}</h1>
            <p>{message}</p>
            <ul>
                {suggestions.map((suggestion: string, index: number) => (
                    <li key={index}>
                        <button type="button" onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ErrorPage;
