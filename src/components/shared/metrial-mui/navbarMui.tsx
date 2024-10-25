// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, Chip, Grid } from '@mui/material';

// export interface Event {
//     eventId: any;
//     eventName: string;
//     category: string;
//     description: string;
//     eventDataTime: string;
//     duration: string | number;
//     totalTickets: string | number;
//     averageRating: string | number;
//     organizerName: string;
//     organizerImage: string;
//     imageUrl: string;
//     ticketPrice: string | number;
// }

// interface EventCardProps {
//     events: Event[];
//     onRegister: (eventId: any) => void; // Function to handle registration or other actions
// }

// const events:Event[] = [
//     {
//         eventId: 1,
//         eventName: "Music Concert",
//         category: "Music",
//         description: "Enjoy an evening of live music!",
//         eventDataTime: "2024-11-20T19:00:00",
//         duration: "3",
//         totalTickets: "100",
//         averageRating: "4.5",
//         organizerName: "Live Nation",
//         organizerImage: "",
//         imageUrl: "https://via.placeholder.com/150",
//         ticketPrice: "50"
//     },
//     {
//         eventId: 2,
//         eventName: "Art Exhibition",
//         category: "Art",
//         description: "Explore stunning artworks from local artists.",
//         eventDataTime: "2024-11-22T10:00:00",
//         duration: "4",
//         totalTickets: "50",
//         averageRating: "4.7",
//         organizerName: "Art Gallery",
//         organizerImage: "",
//         imageUrl: "https://via.placeholder.com/150",
//         ticketPrice: "25"
//     }
// ];


// export const EventCard:any = () => {
//     return (
//         <Grid container spacing={2}>
//             {events.map((event:any) => (
//                 <Grid item xs={12} sm={6} md={4} key={event.eventId}>
//                     <Card sx={{ maxWidth: 345, margin: 2 }}>
//                         <CardMedia
//                             component="img"
//                             alt={event.eventName}
//                             height="140"
//                             image={event.imageUrl}
//                         />
//                         <CardContent>
//                             <Typography gutterBottom variant="h5" component="div">
//                                 {event.eventName}
//                             </Typography>
//                             <Chip label={event.category} color="primary" />
//                             <Typography variant="body2" color="text.secondary">
//                                 {event.description}
//                             </Typography>
//                             <Typography variant="body2" color="text.primary">
//                                 Organizer: {event.organizerName}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Date & Time: {new Date(event.eventDataTime).toLocaleString()}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Duration: {event.duration} hours
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Tickets Available: {event.totalTickets}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Price: ${event.ticketPrice}
//                             </Typography>
//                             <Button 
//                                 variant="contained" 
//                                 color="primary" 
//                                 // onClick={() => onRegister(event.eventId)}
//                                 sx={{ marginTop: 2 }}
//                             >
//                                 Register
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// };


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Example event data (replace with actual data fetching logic)
const eventData = {
    eventId: 'b3fe7b3a-d73b-448e-afac-ab0991e9e5de',
    eventName: "Art Exhibition",
    category: "Art",
    description: "Explore stunning artworks from local artists.",
    eventDataTime: "2024-11-22T10:00:00",
    duration: "4",
    totalTickets: "50",
    averageRating: "4.7",
    organizerName: "Art Gallery",
    imageUrl: "https://via.placeholder.com/600",
    ticketPrice: "25"
};

// Styled Card with bounce in animation
const AnimatedCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    opacity: 0,
    animation: 'fadeIn 0.5s forwards, bounceIn 0.5s forwards',
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
    '@keyframes bounceIn': {
        '0%': { transform: 'scale(0)' },
        '50%': { transform: 'scale(1.05)' },
        '100%': { transform: 'scale(1)' },
    },
}));

const EventDetail: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<any>(null); // Change 'any' to your specific event type

    useEffect(() => {
        // Simulating data fetching (in real scenario, fetch event by eventId)
        setEvent(eventData); // Replace with actual fetch logic
    }, [eventId]);

    if (!event) {
        return <Typography variant="h6" color="error">Event not found!</Typography>;
    }

    return (
        <AnimatedCard sx={{ margin: 'auto' }}>
            <CardMedia
                component="img"
                alt={event.eventName}
                height="100%"
                image={event.imageUrl}
                sx={{ width: '50%', objectFit: 'cover', borderRadius: '8px 0 0 8px' }}
            />
            <CardContent sx={{ width: '50%', padding: 4 }}>
                <Typography gutterBottom variant="h4" component="div">
                    {event.eventName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Category:</strong> {event.category}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Description:</strong> {event.description}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Organizer:</strong> {event.organizerName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Date & Time:</strong> {new Date(event.eventDataTime).toLocaleString()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Duration:</strong> {event.duration} hours
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Tickets Available:</strong> {event.totalTickets}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Price:</strong> ${event.ticketPrice}
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Register
                </Button>
            </CardContent>
        </AnimatedCard>
    );
};

export default EventDetail;
