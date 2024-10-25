import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer/eventsFooter";
import { useDispatch } from "react-redux";
import { addEvent } from "../../redux/features/authentication/EventSlice";
import "./add-event.css";
import { useNavigate } from "react-router-dom";
import AdminNav from "../shared/adminNav/adminNav";
import EventManagement from "../AdminDashDoard/eventsMangement";


const EventForm = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleSubmit = (values: any) => {
    dispatch<any>(addEvent(values));
    
    console.log("Form data:", values);
  };

  return (
 

      <div>
      <Navbar/>
      <div className='admin-bg p-3'>
       <AdminNav/>
        <div className='admin-content'>
          <EventManagement/>
        </div>
      </div>
    <Footer/>
    </div>

   
  );
};

export default EventForm;
