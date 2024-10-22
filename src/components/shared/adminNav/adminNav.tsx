import React from 'react';
import './admin-nav.css';
import { MdGroupAdd, MdEventSeat } from "react-icons/md";
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaUsers } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Function to check if the current path matches a given route
  const isActive = (path:string) => location.pathname === path;

  return (
    <div className='admin-nav'>
      <button 
        className={isActive('/admin/users') ? 'active' : ''} 
        onClick={() => navigate('/admin/users')}
      >
        <FaUsers
          className='me-3'
          style={{ color: isActive('/admin/users') ? 'whitesmoke' : '#0056B3', fontSize: '30px' }}
        /> 
        Users
      </button>

      <button 
        className={isActive('/admin/add-user') ? 'active' : ''} 
        onClick={() => navigate('/admin/add-user')}
      >
        <MdGroupAdd
          className='me-3'
          style={{ color: isActive('/admin/add-user') ? 'whitesmoke' : '#0056B3', fontSize: '30px' }}
        /> 
        Add User
      </button>

      <button 
        className={isActive('/admin/events') ? 'active' : ''} 
        onClick={() => navigate('/admin/events')}
      >
        <MdEventSeat
          className='me-3'
          style={{ color: isActive('/admin/events') ? 'whitesmoke' : '#0056B3', fontSize: '30px' }}
        /> 
        Events
      </button>

      <button 
        className={isActive('/admin/add-event') ? 'active' : ''} 
        onClick={() => navigate('/admin/add-event')}
      >
        <IoMdAddCircleOutline
          className='me-3'
          style={{ color: isActive('/admin/add-event') ? 'whitesmoke' : '#0056B3', fontSize: '30px' }}
        /> 
        Add Event
      </button>
    </div>
  );
}
