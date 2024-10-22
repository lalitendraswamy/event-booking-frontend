import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/features/authentication/UserSlice';
import Navbar from "../shared/navbar/navbar";
import Footer from '../shared/footer/eventsFooter';
import UserTable from './UserTable';
import { MdGroupAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ImSearch } from "react-icons/im";
import Spinner from '../shared/spinner/spinner';
import './user-page.css';

export default function Userpage() {
    let { users,loading } = useSelector((s: any) => s.users);
   

    let [usersList, setUsersList] = useState(users);
    // usersList=usersList.filter((user: { userId: string; })=> user.userId!== getCookie('userId'))

    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch<any>(getUsers());
    }, [dispatch]);

    useEffect(() => {
        setUsersList(users);
    }, [users]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredUsers = users.filter((user: { username: string; email: string; }) => 
            user.username.toLowerCase().includes(query) || // Adjust the property based on your user object
            user.email.toLowerCase().includes(query) // Example property
        );
        setUsersList(filteredUsers);
    };

  

    return (
        <div>
            <Navbar />
            {loading ? (Spinner()):(<div className='user-page'>
                <div className='user-page-top-card d-flex justify-content-between'>
                    <h3>Users List</h3>
                    <div className='user-search'>
                       
                        <input 
                            className='h-100 me-0' 
                            type='search' 
                            value={searchQuery} 
                            onChange={handleSearch} 
                            placeholder="Search by name or email" 
                        />
                        <button>  <ImSearch  style={{"color":"#0056b3","fontSize":"30px"}} />  </button>
                    </div>
                    <button 
                        onClick={() => navigate('/add-user')} 
                        className='d-flex justify-content-between align-items-center'>
                        <MdGroupAdd className='me-2' style={{ "color": "whitesmoke", "fontSize": "30px" }} />
                        Add User
                    </button>
                </div>
                
                {usersList.length > 0 ? (
                    <UserTable users={usersList} /> // Pass the filtered users
                ) : (
                    <div className='users-not-found' style={{ "fontSize": "50px", "color": "#0056B3" }}>
                        <h3>No users found!</h3>
                    </div>
                )}
            </div>)}
            <Footer />
        </div>
    );
}
