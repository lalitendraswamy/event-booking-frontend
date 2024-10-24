import { MdEventSeat } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import './admin-nav.css';

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation(); 
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
        className={isActive('/admin/events') ? 'active' : ''} 
        onClick={() => navigate('/admin/events')}
      >
        <MdEventSeat
          className='me-3'
          style={{ color: isActive('/admin/events') ? 'whitesmoke' : '#0056B3', fontSize: '30px' }}
        /> 
        Events
      </button>
    </div>
  );
}
