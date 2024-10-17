import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/features/authentication/UserSlice';
import Navbar from "../shared/navbar/navbar";
import Footer from '../shared/footer/eventsFooter';
import UserTable from './UserTable';
import { MdGroupAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './user-page.css';
import Spinner from '../shared/spinner/spinner';

export default function Userpage() {
    const { users } = useSelector((s: any) => s.users);
    const dispatch = useDispatch();
    const navigate= useNavigate();

    useEffect(() => {
        dispatch<any>(getUsers());
    }, []);

    if(users.length===0){
        return(<Spinner/>)
    }

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
                    <div className='user-page' style={{"fontSize":"50px","color":"#0056B3"}}><p>No users found.</p></div>
                    
                )}
            </div>
            <Footer />
        </div>
    );
}
