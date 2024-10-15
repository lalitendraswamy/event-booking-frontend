// Categories.tsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import './categories.css';

const categories = [
    "Movies",
    "Stream",
    "Events",
    "Plays",
    "Sports",
    "Activities",
    "List Your Show",
    "Corporates",
    "Offers",
    "Gift Cards",
];

const Categories= () => {
    return (
        <div className="categories-container mt-5 mb-5">
            <Marquee speed={50} gradient={false}>
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        {category}
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Categories;
