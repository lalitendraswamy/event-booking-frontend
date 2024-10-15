 
// const movies = [
//     {
//         title: "Pushpa: The Rule",
//         image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
//     },
//     {
//         title: "Devara",
//         image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICAyOTguMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00310216-tluebxpafx-portrait.jpg",
//     },
//     {
//         title: "KGF: Chapter 2",
//         image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg",
//     },
//     {
//         title: "RRR",
//         image: "https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/rrr-et00094579-1700135873.jpg",
//     },
//     {
//         title: "Vettaiyan - The Hunter",
//         image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vettaiyan-the-hunter-et00412743-1728048350.jpg",
//     },
//     {
//         title: "Lubber Pandhu",
//         image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS41LzEwICA1NC41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00409924-fhqlnmfgyt-portrait.jpg",
//     }
// ];

import React, { useState } from 'react';
import Slider from 'react-slick';
import {Link} from "react-router-dom";
import 'animate.css'; // Add this line at the top of your file
import './events.css';

const Events = () => {
    const [slider, setSlider] = useState(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const events = [
                {   
                    id:1,
                    title: "Pushpa: The Rule",
                    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1712566690.jpg",
                },
                {
                    id:2,
                    title: "Devara",
                    image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICAyOTguMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00310216-tluebxpafx-portrait.jpg",
                },
                {
                    id:3,
                    title: "KGF: Chapter 2",
                    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg",
                },
                {
                    id:4,
                    title: "RRR",
                    image: "https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/rrr-et00094579-1700135873.jpg",
                },
                {
                    id:5,
                    title: "Vettaiyan - The Hunter",
                    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vettaiyan-the-hunter-et00412743-1728048350.jpg",
                },
                {
                    id:6,
                    title: "Lubber Pandhu",
                    image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS41LzEwICA1NC41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00409924-fhqlnmfgyt-portrait.jpg",
                }
    ];

    return (
        <div className="events-container mt-5 mb-5">
            <div className='prev-next-container'>
               <button onClick={() => slider?.slickPrev()} className="previous-btn">Previous</button>
               <button onClick={() => slider?.slickNext()} className="next-btn">Next</button>
            </div>
            <Slider {...settings} ref={setSlider}>
                {events.map((event, index) => (
                    <Link to={`/events/${event.id}`} className='underline-none' key={index}><div  className="events-item" >
                        <img src={event.image} alt={event.title} className='event-image'/>
                        <h3 className='title-headeing'>{event.title}</h3>
                    </div></Link>
                ))}
            </Slider>
        </div>
    );
};

export default Events;


