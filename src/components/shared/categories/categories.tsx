import Marquee from 'react-fast-marquee';
import { useSelector} from 'react-redux';
import './categories.css';

const Categories= () => {
    const {events} = useSelector((state:any)=> state.events)
    console.log("c",events)
    return (
        <div className="categories-container mt-5 mb-5">
            <Marquee speed={50} gradient={false}>
                {events.map((event:any) => (
                    <div key={event.eventId} className="category-item">
                        {/* <img src={event.organizerImage} className='organizar-img' /> */}
                        <div className='event-data-orgaizer'>
                           {/* <p>{event.organizerName}</p> */}
                           <p>{event.category}</p>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Categories;
