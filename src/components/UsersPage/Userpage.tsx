import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/features/authentication/UserSlice';
import Navbar from "../shared/navbar/navbar";
import Footer from '../shared/footer/eventsFooter';
import UserTable from './UserTable';
import { MdGroupAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './user-page.css';

export default function Userpage() {
    const { users } = useSelector((s: any) => s.users);
    const dispatch = useDispatch();
    const navigate= useNavigate();

    useEffect(() => {
        dispatch<any>(getUsers());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className='user-page'>
                <div className='user-page-top-card  d-flex justify-content-between'>
                <h3>Users List</h3>
                <button onClick={()=> navigate('/add-user')} className='d-flex justify-content-between align-items-center'>< MdGroupAdd className='me-2' style={{"color":"whitesmoke","fontSize":"30px"}} />Add User</button>
                </div>
                
                {users.length > 0 ? (
                    <UserTable users={users} /> // Use the UserTable component
                ) : (
                    <p>No users found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
