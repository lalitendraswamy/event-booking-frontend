
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../shared/footer/eventsFooter';
import './add-user.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addUserError, getUsers, postUser, User } from '../../redux/features/authentication/UserSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import EventNavbar from '../shared/navbar/navbar';

import AdminNav from "../shared/adminNav/adminNav";
import addUserImg from '../../assets/images/add-user.png'
import Navbar from '../shared/navbar/navbar';


const UserForm = () => {
  const initialValues = {
    username: "",
    email: "",
    userImageUrl: "",
    role: "user",
    
  };

  const { isUserAlreadyExists, addUserResponse } = useSelector(
    (s: any) => s.users
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .test("is-g7cr-domain", "Email must be from the G7CR domain", (value) => {
        return value ? value.endsWith("@g7cr.com") : false;
      })
      .required("Email is required"),
    userImageUrl: Yup.string().required("Image URL is required"),
    role: Yup.string()
      .oneOf(["user", "admin"], "Role must be either 'user' or 'admin'")
      .required("Role is required"),
  });

  const handleSubmit = (values: any, { resetForm }: { resetForm: () => void }) => {
    dispatch<any>(postUser(values)).then(() => {
      dispatch<any>(getUsers());
      resetForm(); 
    });
  };
  

  useEffect(() => {
    if (addUserResponse === 201) {
      toast.success("User added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
     
    } else if (isUserAlreadyExists) {
      toast.error("User already exists", {
        position: "top-right",
      });
      dispatch(addUserError()); // Reset the error state
    }
  }, [addUserResponse, isUserAlreadyExists, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="admin-bg p-3">
        <AdminNav />
        <div className="admin-content add-user-bg">
          <div>
            <h2 className="event-heading">Add User</h2>
            <img src={addUserImg} alt='add-user-img' />

          </div>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            className="d-flex justify-content-between align-items-center "
          >
            {() => (
              <Form className="user-form ">
                <div className="user-form__group">
                  <label className="user-form__label" htmlFor="username">
                    Username
                  </label>
                  <Field
                    className="user-form__input"
                    name="username"
                    type="text"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="user-form__error"
                  />
                </div>

                <div className="user-form__group">
                  <label className="user-form__label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="user-form__input"
                    name="email"
                    type="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="user-form__error"
                  />
                </div>

                <div className="user-form__group">
                  <label className="user-form__label" htmlFor="userImageUrl">
                    Image URL
                  </label>
                  <Field
                    className="user-form__input"
                    name="userImageUrl"
                    type="text"
                  />
                  <ErrorMessage
                    name="userImageUrl"
                    component="div"
                    className="user-form__error"
                  />
                </div>

                <div className="user-form__group">
                  <label className="user-form__label" htmlFor="role">
                    Role
                  </label>
                  <Field as="select" name="role" className="user-form__select">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="user-form__error"
                  />
                </div>

                <button type="submit" className="user-form__button">
                  Add User
                </button>
                {/* <p>{isUserAlreadyExists ? "User Already Exists": "" }</p> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default UserForm;
