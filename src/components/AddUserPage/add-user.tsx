import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Footer from '../shared/footer/eventsFooter';
import './add-user.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addUserError, getUsers, postUser, User } from '../../redux/features/authentication/UserSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import EventNavbar from '../shared/navbar/navbar';

const UserForm = () => {
  // const [isUserAlreadyExists,setIsUserExists] = useState(false)
  const initialValues = {
    username: '',
    email: '',
    userImageUrl: '',
    role: 'user',
  };

  const {users,loginUser,isUserAlreadyExists} = useSelector((s:any) => s.users)
  const dispatch  = useDispatch()
  const navigate= useNavigate();
  console.log("Users in redux",users);
  // console.log("Login User in redux",loginUser);
 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    userImageUrl: Yup.string().required('Image URL is required'),
    role: Yup.string().oneOf(['user', 'admin'], 'Role is required').required('Role is required'),
  });

  const handleSubmit = (values:any) => {
    console.log('Form data:', values);
    dispatch<any>(postUser(values))
    
  };



  useEffect(() => {
    if (isUserAlreadyExists) {
      toast.error('User already exists', {
        position: "top-right",
      });
    }
    dispatch(addUserError());
  }, [isUserAlreadyExists,dispatch]);
  

  return (
    <div className='user-form-data'>
     <EventNavbar />
      <h2>Add a User</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="d-flex justify-content-between align-items-center "
    >
      {() => (
        <Form className="user-form ">
         
          <div className="user-form__group">
            <label className="user-form__label" htmlFor="username">Username</label>
            <Field  className="user-form__input" name="username" type="text" />
            <ErrorMessage name="username" component="div" className="user-form__error" />
          </div>

          <div className="user-form__group">
            <label className="user-form__label" htmlFor="email">Email</label>
            <Field className="user-form__input" name="email" type="email" />
            <ErrorMessage name="email" component="div" className="user-form__error" />
          </div>

          <div className="user-form__group">
            <label className="user-form__label" htmlFor="userImageUrl">Image URL</label>
            <Field className="user-form__input" name="userImageUrl" type="text" />
            <ErrorMessage name="userImageUrl" component="div" className="user-form__error" />
          </div>

          <div className="user-form__group">
            <label className="user-form__label" htmlFor="role">Role</label>
            <Field as="select" name="role" className="user-form__select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
            <ErrorMessage name="role" component="div" className="user-form__error" />
          </div>

          <button type="submit" className="user-form__button">Add User</button>
          {/* <p>{isUserAlreadyExists ? "User Already Exists": "" }</p> */}
        </Form>
      )}
    </Formik>
    <Footer/>
    <ToastContainer />
    </div>
  );
};

export default UserForm;
