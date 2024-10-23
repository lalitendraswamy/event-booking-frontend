import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

interface User {
    id: string;
    userName: string;
    userEmail: string;
    userImage: File | null;
    role: string;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        // Adding some default users
        const defaultUsers = [
            { id: '1', userName: 'Alice', userEmail: 'alice@example.com', userImage: null, role: 'user' },
            { id: '2', userName: 'Bob', userEmail: 'bob@example.com', userImage: null, role: 'admin' },
            { id: '3', userName: 'Charlie', userEmail: 'charlie@example.com', userImage: null, role: 'user' },
            { id: '4', userName: 'David', userEmail: 'david@example.com', userImage: null, role: 'admin' },
        ];
        setUsers(defaultUsers);
    }, []);

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("User Name is required"),
        userEmail: Yup.string().email("Invalid email format").required("User Email is required"),
        userImage: Yup.mixed().required("User Image is required"),
        role: Yup.string().required("Role is required"),
    });

    const handleSubmit = (values: any) => {
        const newUser = { ...values, id: (users.length + 1).toString() };
        if (editIndex !== null) {
            const updatedUsers = [...users];
            updatedUsers[editIndex] = { ...newUser, id: updatedUsers[editIndex].id }; // Preserve ID
            setUsers(updatedUsers);
        } else {
            setUsers([...users, newUser]);
        }
        resetForm();
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        const user = users[index];
        setSearchTerm(user.userEmail); // Pre-fill search with email for context
        setIsModalOpen(true); // Open modal for editing
    };

    const handleDelete = (index: number) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    const resetForm = () => {
        setEditIndex(null);
        setSearchTerm('');
        setIsModalOpen(false); // Close modal
    };

    const filteredUsers = users.filter(user => 
        user.userName.includes(searchTerm) || user.userEmail.includes(searchTerm)
    );

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search by Name or Email" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                <MdAdd /> Add User
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Formik
                            initialValues={{
                                userName: editIndex !== null ? users[editIndex].userName : '',
                                userEmail: editIndex !== null ? users[editIndex].userEmail : '',
                                userImage: null,
                                role: editIndex !== null ? users[editIndex].role : 'user',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <h3>{editIndex !== null ? 'Edit User' : 'Add User'}</h3>
                                    <div>
                                        <label>User Name</label>
                                        <Field name="userName" />
                                        <ErrorMessage name="userName" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>User Email</label>
                                        <Field name="userEmail" />
                                        <ErrorMessage name="userEmail" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>User Image</label>
                                        <input
                                            type="file"
                                            onChange={(event) => {
                                                if (event.currentTarget.files) {
                                                    setFieldValue("userImage", event.currentTarget.files[0]);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="userImage" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label>Role</label>
                                        <Field as="select" name="role">
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </Field>
                                        <ErrorMessage name="role" component="div" className="error" />
                                    </div>
                                    <button type="submit">{editIndex !== null ? 'Update User' : 'Add User'}</button>
                                    <button type="button" onClick={resetForm}>Cancel</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}

            <h3>User List</h3>
            <ul>
                {filteredUsers.map((user, index) => (
                    <li key={user.id}>
                        <div>
                            {user.userName} - {user.userEmail} - {user.role}
                            <div className="button-group">
                                <button className='btn btn-primary' onClick={() => handleEdit(index)}>
                                    <MdEdit />
                                </button>
                                <button className='btn btn-danger' onClick={() => handleDelete(index)}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;




