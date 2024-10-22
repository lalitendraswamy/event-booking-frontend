import React from 'react';
import { RiDeleteBinFill } from "react-icons/ri";
import { UserService } from '../../services/user-service';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/features/authentication/UserSlice';
import { getCookie } from '../../utils/cookieUtils';

interface User {
    userId: string;
    username: string;
    email: string;
    role: string;
    userImageUrl: string | null;
}

interface UserTableProps {
    users: User[];
}

const service= new UserService();

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    
    const dispatch = useDispatch()
const onDeleteUser= async (id:string)=>{
    
    dispatch<any>(deleteUser(id));
}
;
    
    return (
        <table className='user-table'>
            <thead>
                <tr>
                    <th>User Image</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Delete</th>
                    
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.userId}>
                       <td>
                            {user.userImageUrl ? (
                                <img src={user.userImageUrl} alt={user.username} className='user-image' />
                            ) : (
                                'No Image'
                            )}
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td style={{"color":"#0056B3"}} >{user.role.toUpperCase()}</td>
                        <td> <button className='user-delete-btn' disabled={ user.userId === getCookie('userId') } style={{ cursor: user.userId === getCookie('userId') ? 'not-allowed' : 'pointer' }} onClick={()=>onDeleteUser(user.userId)} ><RiDeleteBinFill style={{"color":"#0056b3", "fontSize":"30px",}} /></button> </td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
