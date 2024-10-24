import UserManagement from "./userMangement";
import EventManagement from "./eventsMangement";
import { IoMdPerson } from "react-icons/io";
import { RiCalendarEventFill } from "react-icons/ri";
import { useState } from "react";
import "./adminDashDoard.css"

const AdminDashDoard = ()=>{
    const [activeComponent, setActiveComponent] = useState<'user' | 'admin'>('user');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleToggle = (component: 'user' | 'admin') => {
        setActiveComponent(component);
        // setSearchTerm(''); // Clear search input on switch
    };

    return(
        <div>
        <div className="user-event-management">
            <button onClick={() => handleToggle('user')}>User Management <IoMdPerson /></button>
            <button onClick={() => handleToggle('admin')}>Event Management <RiCalendarEventFill /></button>
            {/* <input 
                type="text" 
                className="search-input" 
                placeholder="Search..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            /> */}
        </div>
        {activeComponent === 'user' && <UserManagement  />}
        {activeComponent === 'admin' && <EventManagement />}
    </div>)
}

export default AdminDashDoard;